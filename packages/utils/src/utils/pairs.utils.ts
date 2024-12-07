import { DexNumber } from '@dex-toolkit/number'
import type {
  TradeDirection,
  PoolReserve,
  PriceImpactInfo,
  Token,
  UniswapPairV2Types,
} from '@dex-toolkit/types'

import { isSameAddress } from './address.utils'
import {
  isLiquidityProviderFeePercentV2,
  isLiquidityProviderFeePercentV3,
} from './router.utils'
import { tradeDirectionMap } from './trade.utils'
import { DexError, ErrorCodes } from '../errors'

/**
 * Calculates the liquidity provider fee based on the trade direction and version of the DEX.
 *
 * @param params - The parameters required to calculate the liquidity provider fee.
 * @param params.tradeDirection - The direction of the trade (input or output).
 * @param params.baseConvertRequest - The base amount to be converted.
 * @param params.expectedConvertQuote - The expected amount after conversion.
 * @param params.liquidityProviderFeePercent - The liquidity provider fee, which can be a number (v2) or an array of numbers (v3).
 * @param params.fromTokenDecimals - The number of decimals of the "from" token.
 *
 * @returns The calculated liquidity provider fee as a string or an array of strings.
 * @throws DexError if the trade direction is invalid or the liquidity provider fee type is invalid.
 */
export function calculateLiquidityProviderFee({
  tradeDirection,
  baseConvertRequest,
  expectedConvertQuote,
  liquidityProviderFeePercent,
  fromTokenDecimals,
}: {
  tradeDirection: TradeDirection
  baseConvertRequest: DexNumber
  expectedConvertQuote: DexNumber
  liquidityProviderFeePercent: number | number[]
  fromTokenDecimals: number
}): string | string[] {
  // Initialize the calculated fee
  let calculatedLiquidityProviderFee: string | string[] = '0'

  // Handle V2 liquidity provider fee (single percentage)
  if (isLiquidityProviderFeePercentV2(liquidityProviderFeePercent)) {
    switch (tradeDirection) {
      case tradeDirectionMap.input:
        calculatedLiquidityProviderFee = baseConvertRequest
          .times(liquidityProviderFeePercent)
          .toFixed(fromTokenDecimals)
        break
      case tradeDirectionMap.output:
        calculatedLiquidityProviderFee = expectedConvertQuote
          .times(liquidityProviderFeePercent)
          .toFixed(fromTokenDecimals)
        break
      default:
        throw new DexError(
          `Invalid trade direction: ${tradeDirection}`,
          ErrorCodes.functionArgumentError,
        )
    }
  }

  // Handle V3 liquidity provider fees (array of percentages)
  else if (isLiquidityProviderFeePercentV3(liquidityProviderFeePercent)) {
    calculatedLiquidityProviderFee = liquidityProviderFeePercent.map(
      (fee: number) => {
        switch (tradeDirection) {
          case tradeDirectionMap.input:
            return baseConvertRequest.times(fee).toFixed(fromTokenDecimals)
          case tradeDirectionMap.output:
            return expectedConvertQuote.times(fee).toFixed(fromTokenDecimals)
          default:
            throw new DexError(
              `Invalid trade direction: ${tradeDirection}`,
              ErrorCodes.functionArgumentError,
            )
        }
      },
    )
  }

  // Throw error if fee type is invalid
  else {
    throw new DexError(
      `Invalid liquidityProviderFeePercent type: ${typeof liquidityProviderFeePercent}`,
      ErrorCodes.functionArgumentError,
    )
  }

  return calculatedLiquidityProviderFee
}

/**
 * Calculates the price impact of a trade based on the input/output amounts and reserves.
 *
 * @param params - The parameters required to calculate the price impact.
 * @param params.tokenAmount - The initial amount of the input token being traded.
 * @param params.expectedOutputAmount - The total expected output amount from the trade.
 * @param params.reserves - An array of tuples containing the reserves of token0 and token1 for each pair in the route.
 * @param params.routePathTokens - The tokens involved in the route path.
 * @param params.liquidityProviderFeePercent - The liquidity provider fee as a percentage.
 *
 * @returns A promise that resolves to a string representing the overall price impact percentage.
 */
export async function calculatePriceImpact({
  tokenAmount,
  expectedOutputAmount,
  reserves,
  routePathTokens,
  liquidityProviderFeePercent,
}: {
  tokenAmount: DexNumber
  expectedOutputAmount: DexNumber
  reserves: PoolReserve[]
  routePathTokens: Token[]
  liquidityProviderFeePercent: number | number[]
}): Promise<PriceImpactInfo> {
  if (tokenAmount.isZero() || expectedOutputAmount.isZero()) {
    return {
      percentage: '0',
      isMinimal: false,
    }
  }

  let inputAmount = tokenAmount
  let cumulativeImpact = DexNumber.fromUnshifted(0, tokenAmount.decimals)
  let outputAmount: DexNumber

  for (let i = 0; i < reserves.length; i++) {
    const routeToken0 = routePathTokens[i]
    const routeToken1 = routePathTokens[i + 1]

    if (!routeToken0) {
      throw new DexError(
        'Token0 not found for pair',
        ErrorCodes.functionArgumentError,
      )
    }

    if (!routeToken1) {
      throw new DexError(
        'Token1 not found for pair',
        ErrorCodes.functionArgumentError,
      )
    }

    let { token0, token1 } = reserves[i] ?? {}

    if (!token0) {
      throw new DexError(
        'Token0 not found for pair',
        ErrorCodes.functionArgumentError,
      )
    }

    if (!token1) {
      throw new DexError(
        'Token1 not found for pair',
        ErrorCodes.functionArgumentError,
      )
    }

    if (!isSameAddress(token0.address, routeToken0.contractAddress)) {
      ;[token0, token1] = [token1, token0]
    }

    const token0Decimals = routeToken0.decimals
    const token1Decimals = routeToken1.decimals

    if (!token0Decimals || !token1Decimals) {
      throw new DexError(
        `Token decimals not found for token: ${token0.address} or ${token1.address}`,
        ErrorCodes.functionArgumentError,
      )
    }

    const spotPriceBefore = token1.reserve.dividedBy(token0.reserve)

    const fee = Array.isArray(liquidityProviderFeePercent)
      ? liquidityProviderFeePercent[i]
      : liquidityProviderFeePercent

    inputAmount = inputAmount.times(
      DexNumber.fromUnshifted(1 - (fee ?? 0), tokenAmount.decimals),
    )

    outputAmount = inputAmount
      .times(token1.reserve)
      .dividedBy(token0.reserve.plus(inputAmount))

    const newInputReserve = token0.reserve.plus(inputAmount)
    const newOutputReserve = token1.reserve.minus(outputAmount)

    if (newOutputReserve.isNegative()) {
      return {
        percentage: '0',
        isMinimal: true,
      }
    }

    const spotPriceAfter = newOutputReserve.dividedBy(newInputReserve)

    const priceImpact = spotPriceBefore
      .minus(spotPriceAfter)
      .dividedBy(spotPriceBefore)
      .times(100)

    cumulativeImpact = cumulativeImpact.plus(priceImpact.abs())
    inputAmount = outputAmount
  }

  // HACK: Result was always x2 what it should have been in multiple scenarios, even when doing different hop counts, so we dividedBy by 2 to get the correct result
  const percentage = cumulativeImpact.dividedBy(2)

  return {
    percentage: percentage.toDecimalString(2),
    isMinimal: percentage.lt(0.01),
  }
}

/**
 * Calculates the price of a token in USD by routing through a stablecoin like USDT or USDC.
 *
 * @param params - The parameters required to calculate the price of a token in USD.
 * @param params.fromToken - The token whose price is being calculated.
 * @param params.toStablecoin - The stablecoin used as a reference (e.g., USDT, USDC).
 * @param params.reserves - An array of tuples containing the reserves of token0 and token1 for each pair in the route.
 * @param params.routePathTokens - The tokens involved in the route path.
 *
 * @returns A promise that resolves to a string representing the price of the fromToken in USD.
 */
export async function calculateTokenPriceInUSD({
  fromToken,
  toStablecoin,
  reserves,
  routePathTokens,
}: {
  fromToken: Token
  toStablecoin: Token
  reserves: PoolReserve[]
  routePathTokens: Token[]
}): Promise<string> {
  const firstToken = routePathTokens[0]
  const lastToken = routePathTokens[routePathTokens.length - 1]

  if (!firstToken || !lastToken) {
    throw new DexError(
      'Tokens not found for route path',
      ErrorCodes.functionArgumentError,
    )
  }

  // Ensure the fromToken is the first token in the route, and toStablecoin is the last
  if (
    !isSameAddress(firstToken.contractAddress, fromToken.contractAddress) ||
    !isSameAddress(lastToken.contractAddress, toStablecoin.contractAddress)
  ) {
    throw new DexError(
      `Route path does not match fromToken and toStablecoin. Ensure the first token in the path is ${fromToken.symbol} and the last token is ${toStablecoin.symbol}`,
      ErrorCodes.functionArgumentError,
    )
  }

  // Use 1 unit of the fromToken to calculate the price in USD
  let inputAmount = DexNumber.fromUnshifted(1, fromToken.decimals)
  let outputAmount = DexNumber.fromUnshifted(0, fromToken.decimals)

  for (let i = 0; i < reserves.length; i++) {
    const routeToken0 = routePathTokens[i]
    const routeToken1 = routePathTokens[i + 1]

    if (!routeToken0) {
      throw new DexError(
        'routeToken0 missing from routePathTokens',
        ErrorCodes.functionArgumentError,
      )
    }

    if (!routeToken1) {
      throw new DexError(
        'routeToken1 missing from routePathTokens',
        ErrorCodes.functionArgumentError,
      )
    }

    let { token0, token1 } = reserves[i] ?? {}

    if (!token0) {
      throw new DexError(
        'token0 missing from reserves',
        ErrorCodes.functionArgumentError,
      )
    }

    if (!token1) {
      throw new DexError(
        'token1 missing from reserves',
        ErrorCodes.functionArgumentError,
      )
    }

    // Ensure token0 and token1 match the routePathTokens order
    if (!isSameAddress(token0.address, routeToken0.contractAddress)) {
      // Swap token0 and token1 in the reserves to match the routePathTokens order
      ;[token0, token1] = [token1, token0]
    }

    const token0Decimals = routeToken0.decimals
    const token1Decimals = routeToken1.decimals

    if (!token0Decimals || !token1Decimals) {
      throw new DexError(
        `Token decimals not found for token: ${token0.address} or ${token1.address}`,
        ErrorCodes.functionArgumentError,
      )
    }

    // Scale reserves by their respective token decimals
    const token0ReserveScaled = token0.reserve.shiftedBy(-token0Decimals)
    const token1ReserveScaled = token1.reserve.shiftedBy(-token1Decimals)

    // Calculate the output amount for this hop using the constant product formula
    outputAmount = inputAmount
      .times(token1ReserveScaled)
      .dividedBy(token0ReserveScaled.plus(inputAmount))

    // Update inputAmount for the next hop (output of the current hop becomes the input for the next)
    inputAmount = outputAmount
  }

  return outputAmount.toReadableString(6)
}

// ------------------------
// Method Names
// ------------------------

/**
 * Default method map for V2 pairs.
 */
export const defaultPairMethodMapV2: UniswapPairV2Types.MethodNameMap = {
  DOMAIN_SEPARATOR: 'DOMAIN_SEPARATOR',
  MINIMUM_LIQUIDITY: 'MINIMUM_LIQUIDITY',
  PERMIT_TYPEHASH: 'PERMIT_TYPEHASH',
  allowance: 'allowance',
  approve: 'approve',
  balanceOf: 'balanceOf',
  burn: 'burn',
  decimals: 'decimals',
  factory: 'factory',
  getReserves: 'getReserves',
  initialize: 'initialize',
  kLast: 'kLast',
  mint: 'mint',
  name: 'name',
  nonces: 'nonces',
  permit: 'permit',
  price0CumulativeLast: 'price0CumulativeLast',
  price1CumulativeLast: 'price1CumulativeLast',
  skim: 'skim',
  swap: 'swap',
  symbol: 'symbol',
  sync: 'sync',
  token0: 'token0',
  token1: 'token1',
  totalSupply: 'totalSupply',
  transfer: 'transfer',
  transferFrom: 'transferFrom',
} as const
