import { DexNumber } from '@dex-toolkit/number'
import type {
  Token,
  TradePath,
  TradeDirection,
  RouteQuote,
  TradeSettings,
  TradeFormat,
  TradeFormatValue,
  DexSettings,
  TradeFormatOptions,
  TradeFromTokenInfo,
  TradeToTokenInfo,
  InternalTradeContext,
  TradeParamsAmount,
  TradeParamsInput,
  TradeParamsOutput,
} from '@dex-toolkit/types'
import type { Address, ChainId } from '@ethereum-multicall/types'
import BigNumber from 'bignumber.js'
import { BigNumber as EthersBigNumber } from 'ethers'

import { isSameAddress } from './address.utils'
import { transformWrappedAddressToCoinAddress } from './address.utils'
import {
  isLiquidityProviderFeePercentV2,
  isLiquidityProviderFeePercentV3,
} from './router.utils'
import { getChainConfig } from '../chains/chainConfigs'
import { DexError } from '../errors/dex-error'
import { ErrorCodes } from '../errors/error-codes'

/**
 * Map of trade directions.
 */
export const tradeDirectionMap: { [key in TradeDirection]: TradeDirection } = {
  input: 'input',
  output: 'output',
}

/**
 * Array of trade directions.
 */
export const tradeDirections: TradeDirection[] = [
  tradeDirectionMap.input,
  tradeDirectionMap.output,
] as const

/**
 * Map of trade paths.
 */
export const tradePathMap: { [key in TradePath]: TradePath } = {
  coinToToken: 'coinToToken',
  tokenToCoin: 'tokenToCoin',
  tokenToToken: 'tokenToToken',
  coinToWrapped: 'coinToWrapped',
  wrappedToCoin: 'wrappedToCoin',
}

/**
 * Array of trade paths.
 */
export const tradePaths: TradePath[] = [
  tradePathMap.coinToToken,
  tradePathMap.tokenToCoin,
  tradePathMap.tokenToToken,
  tradePathMap.coinToWrapped,
  tradePathMap.wrappedToCoin,
] as const

/**
 * Default trade settings.
 */
export const defaultTradeSettings: Required<
  Omit<TradeSettings, 'gasSettings'>
> = {
  recipient: '',
  slippage: 0.005,
  deadlineMinutes: 20,
  disableMultihops: false,
  disableObserver: false,
  disablePriceImpact: true,
  hasFeeOnTransfer: false,
  observerBlockSkip: 0,
  protocolSettings: {
    protocolV2: {
      enabled: true,
    },
    protocolV3: {
      enabled: true,
    },
  },
  approveMax: true,
  approvalBufferFactor: 1.05,
}

/**
 * Populate trade settings with default settings
 * @param settings The settings
 * @returns The populated settings
 */
export function populateTradeSettings(
  settings?: Partial<TradeSettings>,
): TradeSettings {
  return {
    ...defaultTradeSettings,
    ...settings,
  }
}

/**
 * Determines the trade path between two tokens, which is used to decide the method of conversion.
 *
 * @param params - The parameters required to get the trade path.
 * @param params.chainId - The chain ID where the trade is taking place.
 * @param params.fromToken - The token being swapped from.
 * @param params.toToken - The token being swapped to.
 * @param params.customNetworkNativeWrappedTokenInfo - Optional custom network's native wrapped token information.
 *
 * @returns The trade path as `TradePath` which can be one of `coinToToken`, `tokenToCoin`, `tokenToToken`,
 * `wrappedToCoin`, or `coinToWrapped`.
 *
 * @throws If native wrapped token information cannot be found for the specified chain ID.
 */
export function getTradePath({
  chainId,
  fromToken,
  toToken,
  customNetworkNativeWrappedTokenInfo,
}: {
  chainId: ChainId
  fromToken: Token
  toToken: Token
  customNetworkNativeWrappedTokenInfo?: Token
}): TradePath {
  const { nativeWrappedTokenInfo } = getChainConfig(chainId) ?? {}

  const wrappedAddress =
    customNetworkNativeWrappedTokenInfo?.contractAddress ??
    nativeWrappedTokenInfo?.contractAddress

  if (!wrappedAddress) {
    if (customNetworkNativeWrappedTokenInfo) {
      throw new DexError(
        `No nativeWrappedTokenInfo found for custom network`,
        ErrorCodes.canNotFindChainId,
      )
    }

    throw new DexError(
      `No nativeWrappedTokenInfo found for chainId ${chainId}`,
      ErrorCodes.canNotFindChainId,
    )
  }

  const coinAddress = transformWrappedAddressToCoinAddress(wrappedAddress)

  if (isSameAddress(fromToken.contractAddress, coinAddress)) {
    if (isSameAddress(toToken.contractAddress, wrappedAddress)) {
      return tradePathMap.coinToWrapped
    }

    return tradePathMap.coinToToken
  }

  if (isSameAddress(toToken.contractAddress, coinAddress)) {
    if (isSameAddress(fromToken.contractAddress, wrappedAddress)) {
      return tradePathMap.wrappedToCoin
    }

    return tradePathMap.tokenToCoin
  }

  return tradePathMap.tokenToToken
}

/**
 * Selects the amount to trade based on the trade direction.
 *
 * @param params - The parameters required to amount to trade.
 * @param params.fromToken - The token being swapped from.
 * @param params.toToken - The token being swapped to.
 * @param params.amountToTrade - The amount being traded as a string.
 * @param params.tradeDirection - The direction of the trade (input or output).
 *
 * @returns The trade amount as a `DexNumber` object.
 *
 * @throws If the amount to trade or trade direction is not provided.
 * @throws If the trade path is unsupported.
 */
export function amountToTradeToDexNumber({
  fromToken,
  toToken,
  amountToTrade,
  tradeDirection,
}: {
  fromToken: Token
  toToken: Token
  amountToTrade: TradeParamsAmount
  tradeDirection: TradeDirection
}): DexNumber {
  if (!amountToTrade) {
    throw new DexError(
      'Must provide a valid amount to trade',
      ErrorCodes.functionArgumentError,
    )
  }

  assertTradeDirection(tradeDirection)

  if (isSameAddress(fromToken.contractAddress, toToken.contractAddress)) {
    throw new DexError(
      'fromToken and toToken must have a different contract address',
      ErrorCodes.functionArgumentError,
    )
  }

  switch (tradeDirection) {
    case tradeDirectionMap.input: {
      const value = DexNumber.fromUnshifted(amountToTrade, fromToken.decimals)

      if (value.lte(0)) {
        throw new DexError(
          'Must provide a valid amount to trade',
          ErrorCodes.functionArgumentError,
        )
      }

      return value
    }
    case tradeDirectionMap.output: {
      const value = DexNumber.fromUnshifted(amountToTrade, toToken.decimals)

      if (value.lte(0)) {
        throw new DexError(
          'Must provide a valid amount to trade',
          ErrorCodes.functionArgumentError,
        )
      }

      return value
    }
    default:
      throw new DexError(
        `Trade direction ${tradeDirection} is not supported`,
        ErrorCodes.tradePathIsNotSupported,
      )
  }
}

/**
 * Sorts the route quotes based on the trade direction.
 *
 * @param params - The parameters required to sort the route quotes.
 * @param params.routeQuotes - The route quotes to sort.
 * @param params.tradeDirection - The trade direction.
 *
 * @returns The sorted route quotes from best quote to worst quote
 *
 * @throws If the route quotes or trade direction is not provided.
 */
export function sortRouteQuotes({
  routeQuotes,
  tradeDirection,
}: {
  routeQuotes: RouteQuote[]
  tradeDirection: TradeDirection
}): RouteQuote[] {
  if (!routeQuotes) {
    throw new DexError(
      'Must provide route quotes',
      ErrorCodes.functionArgumentError,
    )
  }

  assertTradeDirection(tradeDirection)

  switch (tradeDirection) {
    case tradeDirectionMap.input:
      return routeQuotes.sort((a, b) => {
        if (a.expectedConvertQuote.isGreaterThan(b.expectedConvertQuote)) {
          return -1
        }
        return a.expectedConvertQuote.isLessThan(b.expectedConvertQuote) ? 1 : 0
      })
    case tradeDirectionMap.output:
      return routeQuotes.sort((a, b) => {
        if (a.expectedConvertQuote.isLessThan(b.expectedConvertQuote)) {
          return -1
        }
        return a.expectedConvertQuote.isGreaterThan(b.expectedConvertQuote)
          ? 1
          : 0
      })
    default:
      throw new DexError(
        `Invalid trade direction ${tradeDirection}`,
        ErrorCodes.functionArgumentError,
      )
  }
}

/**
 * Compare two trade format values of the same type.
 *
 * @param a The first value to compare.
 * @param b The second value to compare.
 *
 * @returns True if the values are equal, otherwise false.
 *
 * @throws DexError if the input types are unsupported or do not match.
 */
export function compareTradeValues(
  a: TradeFormatValue<TradeFormat>,
  b: TradeFormatValue<TradeFormat>,
): boolean {
  // Handle string comparison ('readable', 'decimal', 'hex')
  if (typeof a === 'string' && typeof b === 'string') {
    return a.toLowerCase() === b.toLowerCase()
  }

  // Handle bigint comparison
  if (typeof a === 'bigint' && typeof b === 'bigint') {
    return a === b
  }

  // Handle DexNumber comparison
  if (a instanceof DexNumber && b instanceof DexNumber) {
    return a.toFixed() === b.toFixed()
  }

  // Handle BigNumber comparison (BigNumber.js)
  if (a instanceof BigNumber && b instanceof BigNumber) {
    return a.isEqualTo(b)
  }

  // Handle Ethers BigNumber comparison (ethers.js)
  if (a instanceof EthersBigNumber && b instanceof EthersBigNumber) {
    return a.eq(b)
  }

  // Handle unsupported types
  throw new DexError(
    'Unsupported or mismatched TradeFormatValue types',
    ErrorCodes.internalError,
  )
}

/**
 * Compares the cached liquidity provider fee with the new liquidity provider fee to determine if they are the same.
 *
 * - For v2 liquidity fees (a single number), it performs a direct comparison.
 * - For v3 liquidity fees (an array of numbers), it compares each fee in the array individually.
 *
 * @param cachedLiquidity - The cached liquidity provider fee (either a single number or an array of numbers).
 * @param newLiquidity - The new liquidity provider fee to compare (either a single number or an array of numbers).
 *
 * @returns `true` if the fees are the same, otherwise `false`.
 *
 * @throws DexError if the cached or new liquidity fee is in an unexpected format or is missing.
 */
export function compareLiquidityProviderFee(
  cachedLiquidity: number | number[],
  newLiquidity: number | number[] | undefined,
): boolean {
  if (!newLiquidity) return true

  if (isLiquidityProviderFeePercentV2(newLiquidity)) {
    return newLiquidity === cachedLiquidity
  }

  if (isLiquidityProviderFeePercentV3(newLiquidity)) {
    return newLiquidity.every((fee, i) => {
      if (
        !cachedLiquidity ||
        !isLiquidityProviderFeePercentV3(cachedLiquidity)
      ) {
        throw new DexError(
          'liquidityProviderFeePercent is missing or not an array',
          ErrorCodes.liquidityProviderFeeNotFound,
        )
      }
      return fee === cachedLiquidity[i]
    })
  }

  return false
}

/**
 * Constructs the swap path for V3, taking into account WETH9 for intermediate swaps.
 *
 * @param params - The parameters required to construct the swap path.
 * @param params.token0 - The first token address.
 * @param params.token1 - The second token address.
 * @param params.WETH9 - The WETH9 token address for the chain.
 * @returns The path array for the swap.
 */
export function constructPathV3({
  token0,
  token1,
  WETH9,
}: {
  token0: Address
  token1: Address
  WETH9: Address
}): string {
  if (!token0) {
    throw new DexError('token0 is required', ErrorCodes.functionArgumentError)
  }

  if (!token1) {
    throw new DexError('token1 is required', ErrorCodes.functionArgumentError)
  }

  if (!WETH9) {
    throw new DexError('WETH9 is required', ErrorCodes.functionArgumentError)
  }

  const token0Lower = token0.toLowerCase()
  const token1Lower = token1.toLowerCase()
  const WETH9Lower = WETH9.toLowerCase()

  if (token0Lower === WETH9Lower || token1Lower === WETH9Lower) {
    return token0Lower < token1Lower
      ? token0Lower + token1Lower
      : token1Lower + token0Lower
  } else {
    return token0Lower < token1Lower
      ? token0Lower + WETH9Lower + token1Lower
      : token1Lower + WETH9Lower + token0Lower
  }
}

// ------------------------
// Formatting
// ------------------------

/**
 * Formats a trade context by converting all DexNumber values to the specified format type.
 * This includes formatting token information, pool shares, prices, and other numeric values.
 *
 * @template TFormat - The target format type for the converted values
 * @param context - The internal trade context containing DexNumber values
 * @param format - The format specification to convert values to
 * @returns A new context with all numeric values converted to the specified format
 */
export function formatTradeContext<TFormat extends TradeFormat>(
  context: InternalTradeContext<'dexnumber'>,
  format: TradeFormatOptions<TFormat>,
): InternalTradeContext<TFormat> {
  const {
    baseConvertRequest,
    minAmountConvertQuote,
    maximumSent,
    expectedConvertQuote,
    liquidityProviderFee,
    fromTokenInfo,
    toTokenInfo,
    gasPriceEstimatedBy,
    ...rest
  } = context

  return {
    ...rest,
    baseConvertRequest: baseConvertRequest.toTradeFormat(format),
    minAmountConvertQuote: minAmountConvertQuote?.toTradeFormat(format),
    maximumSent: maximumSent?.toTradeFormat(format),
    expectedConvertQuote: expectedConvertQuote.toTradeFormat(format),
    liquidityProviderFee,
    fromTokenInfo: formatTradeFromTokenInfo(fromTokenInfo, format),
    toTokenInfo: formatTradeToTokenInfo(toTokenInfo, format),
    gasPriceEstimatedBy: gasPriceEstimatedBy?.toTradeFormat(format),
  } as InternalTradeContext<TFormat>
}

/**
 * Formats token information by converting DexNumber values to the specified format type.
 * This includes amount, balance, and allowance values while preserving other token properties.
 *
 * @template TFormat - The target format type for the converted values
 * @param info - The token information containing DexNumber values
 * @param format - The format specification to convert values to
 * @returns New token information with numeric values converted to the specified format
 */
function formatTradeFromTokenInfo<TFormat extends TradeFormat>(
  info: TradeFromTokenInfo<'dexnumber'>,
  format: TradeFormatOptions<TFormat>,
): TradeFromTokenInfo<TFormat> {
  return {
    ...info,
    balance: info.balance.toTradeFormat(format),
    allowance: info.allowance.toTradeFormat(format),
  }
}

/**
/**
 * Formats token information by converting DexNumber values to the specified format type.
 * This includes amount, balance, and allowance values while preserving other token properties.
 *
 * @template TFormat - The target format type for the converted values
 * @param info - The token information containing DexNumber values
 * @param format - The format specification to convert values to
 * @returns New token information with numeric values converted to the specified format
 */
function formatTradeToTokenInfo<TFormat extends TradeFormat>(
  info: TradeToTokenInfo<'dexnumber'>,
  format: TradeFormatOptions<TFormat>,
): TradeToTokenInfo<TFormat> {
  return {
    ...info,
    balance: info.balance.toTradeFormat(format),
  }
}

// ------------------------
// Type Guards
// ------------------------

/**
 * Type guard to check if the provided value is a valid trade direction.
 */
export function isTradeDirection(value: any): value is TradeDirection {
  return tradeDirections.includes(value)
}

/**
 * Type guard to check if the trade direction is "input".
 *
 * @param value - The value to check.
 * @returns A boolean indicating whether the value is "input".
 */
export function isTradeDirectionInput(value: any): value is TradeDirection {
  return value?.tradeDirection === 'input'
}

/**
 * Type guard to check if the trade direction is "output".
 *
 * @param value - The value to check.
 * @returns A boolean indicating whether the value is "output".
 */
export function isTradeDirectionOutput(value: any): value is TradeDirection {
  return value?.tradeDirection === 'output'
}

/**
 * Asserts that the provided value is a valid TradeDirection.
 *
 * @param value - The value to check.
 * @throws DexError if the value is undefined or not a valid TradeDirection.
 */
export function assertTradeDirection(
  value: any,
): asserts value is TradeDirection {
  if (value === undefined) {
    throw new DexError(
      'Trade direction is undefined',
      ErrorCodes.functionArgumentError,
    )
  }

  if (!isTradeDirection(value)) {
    throw new DexError(
      'Invalid trade direction',
      ErrorCodes.functionArgumentError,
    )
  }
}

/**
 * Asserts that the provided value is a valid TradeDirection.
 *
 * @param value - The value to check.
 * @throws DexError if the value is undefined or not a valid TradeDirection.
 */
export function assertTradeDirectionInput(
  value: any,
): asserts value is TradeDirection {
  if (value === undefined || !isTradeDirectionInput(value)) {
    throw new DexError(
      'Trade direction is not "input" or value is undefined',
      ErrorCodes.functionArgumentError,
    )
  }
}

/**
 * Asserts that the provided value is a valid TradeDirection.
 *
 * @param value - The value to check.
 * @throws DexError if the value is undefined or not a valid TradeDirection.
 */
export function assertTradeDirectionOutput(
  value: any,
): asserts value is TradeDirection {
  if (value === undefined || !isTradeDirectionOutput(value)) {
    throw new DexError(
      'Trade direction is not "output" or value is undefined',
      ErrorCodes.functionArgumentError,
    )
  }
}

/**
 * Type guard to check if the provided value is a valid `TradeParamsAmount`.
 *
 * @param value - The value to check.
 * @returns A boolean indicating whether the value is a `TradeParamsAmount` (string or number).
 */
export function isTradeParamsAmount(value: any): value is TradeParamsAmount {
  return typeof value === 'string' || typeof value === 'number'
}

/**
 * Type guard to check if the provided value is a valid `TradeParamsInput`.
 *
 * @param value - The value to check.
 * @returns A boolean indicating whether the value is a `TradeParamsInput`.
 */
export function isTradeParamsInput(value: any): value is TradeParamsInput {
  return (
    typeof value === 'object' &&
    value !== null &&
    'direction' in value &&
    value.direction === 'input' &&
    'fromAmount' in value &&
    isTradeParamsAmount(value.fromAmount)
  )
}

/**
 * Type guard to check if the provided value is a valid `TradeParamsOutput`.
 *
 * @param value - The value to check.
 * @returns A boolean indicating whether the value is a `TradeParamsOutput`.
 */
export function isTradeParamsOutput(value: any): value is TradeParamsOutput {
  return (
    typeof value === 'object' &&
    value !== null &&
    'direction' in value &&
    value.direction === 'output' &&
    'toAmount' in value &&
    isTradeParamsAmount(value.toAmount)
  )
}

/**
 * Type guard to check if the provided settings are of type `TradeSettings`.
 *
 * `TradeSettings` includes additional properties like `disablePriceImpact`
 * and `hasFeeOnTransfer`, which differentiate it from `LiquiditySettings`.
 *
 * @param settings - The settings object to check.
 * @returns A boolean indicating whether the settings object is of type `TradeSettings`.
 */
export function isTradeSettings(
  settings: DexSettings,
): settings is TradeSettings {
  return 'disablePriceImpact' in settings || 'hasFeeOnTransfer' in settings
}

/**
 * Determines if the provided trade path involves converting from a coin (native cryptocurrency).
 *
 * @param tradePath - The trade path to check.
 *
 * @returns A boolean indicating whether the trade path is from a coin (either to a token or wrapped coin).
 */
export function isTradePathFromCoin(tradePath: TradePath): boolean {
  return (
    tradePath === tradePathMap.coinToToken ||
    tradePath === tradePathMap.coinToWrapped
  )
}

/**
 * Determines if the provided trade path involves converting to a coin (native cryptocurrency).
 *
 * @param tradePath - The trade path to check.
 *
 * @returns A boolean indicating whether the trade path is to a coin (from a token or wrapped coin).
 */
export function isTradePathToCoin(tradePath: TradePath): boolean {
  return (
    tradePath === tradePathMap.tokenToCoin ||
    tradePath === tradePathMap.wrappedToCoin
  )
}

/**
 * Determines if the provided trade path involves converting from a token.
 *
 * @param tradePath - The trade path to check.
 *
 * @returns A boolean indicating whether the trade path is from a token (to either a token or coin).
 */
export function isTradePathFromToken(tradePath: TradePath): boolean {
  return (
    tradePath === tradePathMap.tokenToToken ||
    tradePath === tradePathMap.tokenToCoin ||
    tradePath === tradePathMap.wrappedToCoin
  )
}

/**
 * Determines if the provided trade path involves converting to a token.
 *
 * @param tradePath - The trade path to check.
 *
 * @returns A boolean indicating whether the trade path is to a token (from either a token or coin).
 */
export function isTradePathToToken(tradePath: TradePath): boolean {
  return (
    tradePath === tradePathMap.tokenToToken ||
    tradePath === tradePathMap.tokenToCoin ||
    tradePath === tradePathMap.coinToWrapped
  )
}

/**
 * Determines if the provided trade path involves converting from or to a token.
 *
 * @param tradePath - The trade path to check.
 *
 * @returns A boolean indicating whether the trade path is from or to a token (either a token or coin).
 */
export function isTradePathSwapping(tradePath: TradePath): boolean {
  return (
    tradePath === tradePathMap.coinToToken ||
    tradePath === tradePathMap.tokenToCoin ||
    tradePath === tradePathMap.tokenToToken
  )
}

/**
 * Determines if the provided trade path involves wrapping or unwrapping a coin.
 *
 * @param tradePath - The trade path to check.
 *
 * @returns A boolean indicating whether the trade path is wrapping or unwrapping a coin (either to a token or wrapped coin).
 */
export function isTradePathWrappingOrUnwrapping(tradePath: TradePath): boolean {
  return (
    tradePath === tradePathMap.coinToWrapped ||
    tradePath === tradePathMap.wrappedToCoin
  )
}

/**
 * Determines if the provided trade path involves converting from a wrapped token.
 *
 * @param tradePath - The trade path to check.
 *
 * @returns A boolean indicating whether the trade path is from a wrapped token (to either a token or coin).
 */
export function isTradePathFromWrappedToken(tradePath: TradePath): boolean {
  return tradePath === tradePathMap.wrappedToCoin
}

/**
 * Determines if the provided trade path involves converting to a wrapped token.
 *
 * @param tradePath - The trade path to check.
 *
 * @returns A boolean indicating whether the trade path is to a wrapped token (from either a token or coin).
 */
export function isTradePathToWrappedToken(tradePath: TradePath): boolean {
  return tradePath === tradePathMap.coinToWrapped
}
