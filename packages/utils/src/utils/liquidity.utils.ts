import { DexNumber } from '@dex-toolkit/number'
import type {
  LiquiditySettings,
  LiquidityPrices,
  LPTokenInfoV2,
  LPTokenInfoV3,
  Token,
  TradeFormat,
  LiquidityTokenInfo,
  AddLiquidityParamsV2,
  AddLiquidityParamsV3,
  RemoveLiquidityParamsV2,
  RemoveLiquidityParamsV3,
  LiquiditySettingsV3,
  LiquidityDirection,
  DexProtocol,
  InternalLiquidityContext,
  TradeFormatOptions,
} from '@dex-toolkit/types'

import { assertProtocol } from './dex.utils'
import { DexError, ErrorCodes } from '../errors'

// ------------------------
// Settings
// ------------------------

export const defaultLiquiditySettings: Required<
  Omit<LiquiditySettings, 'gasSettings' | 'priceRange' | 'feeTier'>
> = {
  recipient: '',
  slippage: 0.005,
  deadlineMinutes: 20,
  disableMultihops: false,
  disableObserver: false,
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
  enablePriceLimit: false,
}

export function populateLiquiditySettings(
  settings?: Partial<LiquiditySettings>,
): LiquiditySettings {
  return {
    ...defaultLiquiditySettings,
    ...settings,
  }
}

// ------------------------
// Calculations
// ------------------------

/**
 * Calculates the minimum or maximum amount considering the slippage tolerance.
 *
 * @param params - The parameters required to calculate the slippage amount.
 * @param params.amount - The original amount, either as a DexNumber.
 * @param params.slippage - The slippage tolerance as a decimal (e.g., 0.01 for 1%).
 * @param params.isMaximum - If true, calculates the maximum amount (for input amounts).
 *                    If false, calculates the minimum amount (for output amounts).
 *
 * @returns The calculated amount after applying slippage.
 * @throws Error if slippage is negative or amount is zero/negative.
 */
export function calculateSlippageAmount({
  amount,
  slippage,
  isMaximum,
}: {
  amount: DexNumber
  slippage: number
  isMaximum: boolean
}): DexNumber {
  if (slippage < 0) {
    throw new Error('Slippage must be non-negative')
  }

  if (amount.isLessThanOrEqualTo(0)) {
    throw new Error('Amount must be greater than zero')
  }

  if (isMaximum) {
    // For input amounts, we calculate the maximum amount we're willing to input
    return amount.multipliedBy(1 + slippage)
  } else {
    // For output amounts, we calculate the minimum amount we're willing to receive
    return amount.multipliedBy(1 - slippage)
  }
}

/**
 * Calculate share of pool for a given LP token balance
 *
 * @param params - The parameters required to calculate the share of pool.
 * @param params.lpTokenBalance - The LP token balance.
 * @param params.lpTokenDecimals - The number of decimal places for the LP token.
 * @param params.totalSupply - The total supply of the LP token.
 *
 * @returns The share of pool as a decimal.
 * @throws Error if any input is zero/negative.
 */
export function calculateCurrentShareOfPoolV2({
  lpTokenBalance,
  lpTokenDecimals,
  totalSupply,
}: {
  lpTokenBalance?: DexNumber
  lpTokenDecimals: number
  totalSupply: DexNumber
}): DexNumber {
  if (!lpTokenBalance || lpTokenBalance.isZero() || totalSupply.isZero()) {
    return DexNumber.fromUnshifted('0', lpTokenDecimals)
  }

  return lpTokenBalance.dividedBy(totalSupply).times(100)
}

/**
 * Calculate expected share of pool after adding liquidity
 *
 * @param params - The parameters required to calculate the expected share of pool after adding liquidity.
 * @param params.lpTokenBalance - The current LP token balance.
 * @param params.lpTokenDecimals - The number of decimal places for the LP token.
 * @param params.liquidityToAdd - The amount of liquidity to add.
 * @param params.currentTotalSupply - The current total supply of the LP token.
 *
 * @returns The expected share of pool as a decimal.
 * @throws Error if any input is zero/negative.
 */
export function calculateExpectedShareAfterAddV2({
  lpTokenBalance,
  lpTokenDecimals,
  liquidityToAdd,
  currentTotalSupply,
}: {
  lpTokenBalance?: DexNumber
  lpTokenDecimals: number
  liquidityToAdd: DexNumber
  currentTotalSupply: DexNumber
}): DexNumber {
  const newTotalSupply = currentTotalSupply.plus(liquidityToAdd)
  const newBalance = (
    lpTokenBalance ?? DexNumber.fromUnshifted('0', lpTokenDecimals)
  ).plus(liquidityToAdd)

  return calculateCurrentShareOfPoolV2({
    lpTokenBalance: newBalance,
    lpTokenDecimals,
    totalSupply: newTotalSupply,
  })
}

/**
 * Calculate expected share of pool after removing liquidity
 *
 * @param params - The parameters required to calculate the expected share of pool after removing liquidity.
 * @param params.lpTokenBalance - The current LP token balance.
 * @param params.lpTokenDecimals - The number of decimal places for the LP token.
 * @param params.liquidityToRemove - The amount of liquidity to remove.
 * @param params.currentTotalSupply - The current total supply of the LP token.
 *
 * @returns The expected share of pool as a decimal.
 * @throws Error if any input is zero/negative.
 */
export function calculateExpectedShareAfterRemoveV2({
  lpTokenBalance,
  lpTokenDecimals,
  liquidityToRemove,
  currentTotalSupply,
}: {
  lpTokenBalance?: DexNumber
  lpTokenDecimals: number
  liquidityToRemove: DexNumber
  currentTotalSupply: DexNumber
}): DexNumber {
  const newTotalSupply = currentTotalSupply.minus(liquidityToRemove)
  const newBalance = lpTokenBalance
    ? lpTokenBalance.minus(liquidityToRemove)
    : undefined

  const zero = DexNumber.fromUnshifted('0', lpTokenDecimals)

  return calculateCurrentShareOfPoolV2({
    lpTokenBalance: newBalance?.lt(0) ? zero : newBalance,
    lpTokenDecimals,
    totalSupply: newTotalSupply.lt(0) ? zero : newTotalSupply,
  })
}

/**
 * Calculates the current share of a Uniswap V3 liquidity position relative to the total pool liquidity.
 * The share is only calculated if the position's tick range encompasses the current tick (i.e. the position is "active").
 *
 * @param params - The parameters for the calculation.
 * @param params.positionLiquidity - The liquidity amount in the position.
 * @param params.tickLower - The lower tick boundary of the position's price range.
 * @param params.tickUpper - The upper tick boundary of the position's price range.
 * @param params.currentTick - The pool's current tick.
 * @param params.poolLiquidity - The total active liquidity in the pool at the current tick.
 * @param params.decimals - The decimal precision to use for the calculation (default: 18).
 *
 * @returns A DexNumber representing the position's share of the pool as a percentage.
 */
export function calculateCurrentShareOfPoolV3({
  positionLiquidity,
  tickLower,
  tickUpper,
  currentTick,
  poolLiquidity,
  decimals = 18,
}: {
  positionLiquidity?: DexNumber
  tickLower: number
  tickUpper: number
  currentTick: number
  poolLiquidity: DexNumber
  decimals?: number
}): DexNumber {
  if (
    !positionLiquidity ||
    positionLiquidity.isZero() ||
    poolLiquidity.isZero() ||
    currentTick < tickLower ||
    currentTick >= tickUpper
  ) {
    return DexNumber.fromUnshifted('0', decimals)
  }

  return positionLiquidity.dividedBy(poolLiquidity).times(100)
}

/**
 * Calculates the expected share of pool after adding liquidity to a V3 position.
 * The calculation considers whether the new liquidity will be active at the current tick.
 *
 * @param params - The parameters for the calculation.
 * @param params.positionLiquidity - The current liquidity in the position (if it exists).
 * @param params.tickLower - The lower tick boundary of the position's price range.
 * @param params.tickUpper - The upper tick boundary of the position's price range.
 * @param params.currentTick - The pool's current tick.
 * @param params.liquidityToAdd - The amount of liquidity being added to the position.
 * @param params.poolLiquidity - The total active liquidity in the pool at the current tick.
 * @param params.decimals - The decimal precision to use for the calculation (default: 18).
 *
 * @returns A DexNumber representing the expected share of the pool as a percentage after adding liquidity.
 */
export function calculateExpectedShareAfterAddV3({
  positionLiquidity,
  tickLower,
  tickUpper,
  currentTick,
  liquidityToAdd,
  poolLiquidity,
  decimals = 18,
}: {
  positionLiquidity?: DexNumber
  tickLower: number
  tickUpper: number
  currentTick: number
  liquidityToAdd: DexNumber
  poolLiquidity: DexNumber
  decimals?: number
}): DexNumber {
  // Only add to pool liquidity if new liquidity will be active
  const newPoolLiquidity =
    currentTick >= tickLower && currentTick < tickUpper
      ? poolLiquidity.plus(liquidityToAdd)
      : poolLiquidity

  const newPositionLiquidity = (
    positionLiquidity ?? DexNumber.fromUnshifted('0', decimals)
  ).plus(liquidityToAdd)

  return calculateCurrentShareOfPoolV3({
    positionLiquidity: newPositionLiquidity,
    tickLower,
    tickUpper,
    currentTick,
    poolLiquidity: newPoolLiquidity,
    decimals,
  })
}

/**
 * Calculates the expected share of pool after removing liquidity from a V3 position.
 * The calculation considers whether the removed liquidity is currently active.
 *
 * @param params - The parameters for the calculation.
 * @param params.positionLiquidity - The current liquidity in the position.
 * @param params.tickLower - The lower tick boundary of the position's price range.
 * @param params.tickUpper - The upper tick boundary of the position's price range.
 * @param params.currentTick - The pool's current tick.
 * @param params.liquidityToRemove - The amount of liquidity being removed from the position.
 * @param params.poolLiquidity - The total active liquidity in the pool at the current tick.
 * @param params.decimals - The decimal precision to use for the calculation (default: 18).
 *
 * @returns A DexNumber representing the expected share of the pool as a percentage after removing liquidity.
 */
export function calculateExpectedShareAfterRemoveV3({
  positionLiquidity,
  tickLower,
  tickUpper,
  currentTick,
  liquidityToRemove,
  poolLiquidity,
  decimals = 18,
}: {
  positionLiquidity?: DexNumber
  tickLower: number
  tickUpper: number
  currentTick: number
  liquidityToRemove: DexNumber
  poolLiquidity: DexNumber
  decimals?: number
}): DexNumber {
  // Only subtract from pool liquidity if removed liquidity is active
  const newPoolLiquidity =
    currentTick >= tickLower && currentTick < tickUpper
      ? poolLiquidity.minus(liquidityToRemove)
      : poolLiquidity

  const newPositionLiquidity = positionLiquidity
    ? positionLiquidity.minus(liquidityToRemove)
    : undefined

  return calculateCurrentShareOfPoolV3({
    positionLiquidity: newPositionLiquidity?.lt(0)
      ? DexNumber.fromUnshifted('0', liquidityToRemove.decimals)
      : newPositionLiquidity,
    tickLower,
    tickUpper,
    currentTick,
    poolLiquidity: newPoolLiquidity.lt(0)
      ? DexNumber.fromUnshifted('0', liquidityToRemove.decimals)
      : newPoolLiquidity,
    decimals,
  })
}

/**
 * Calculates the total share of pool across multiple V3 positions.
 * Only includes liquidity from positions that are active at the current tick.
 *
 * @param params - The parameters for the calculation.
 * @param params.positions - Array of position objects containing liquidity amounts and tick ranges.
 * @param params.currentTick - The pool's current tick.
 * @param params.poolLiquidity - The total active liquidity in the pool at the current tick.
 * @param params.decimals - The decimal precision to use for the calculation (default: 18).
 *
 * @returns A DexNumber representing the combined share of all active positions as a percentage of the pool.
 */
export function calculateMultiPositionShareOfPoolV3({
  positions,
  currentTick,
  poolLiquidity,
  decimals = 18,
}: {
  positions: Array<{
    liquidity: DexNumber
    tickLower: number
    tickUpper: number
  }>
  currentTick: number
  poolLiquidity: DexNumber
  decimals?: number
}): DexNumber {
  if (poolLiquidity.isZero()) {
    return DexNumber.fromUnshifted('0', decimals)
  }

  // Sum liquidity from all active positions
  const totalActiveLiquidity = positions.reduce(
    (sum, position) => {
      if (
        currentTick >= position.tickLower &&
        currentTick < position.tickUpper
      ) {
        return sum.plus(position.liquidity)
      }
      return sum
    },
    DexNumber.fromUnshifted('0', decimals),
  )

  return totalActiveLiquidity.dividedBy(poolLiquidity).times(100)
}

/**
 * Calculates the prices of Token A in terms of Token B and vice versa directly from the reserves.
 *
 * @param sqrtPriceX96 - The sqrt price of the pool.
 * @param tokenA - Token A.
 * @param tokenB - Token B.
 *
 * @returns An object containing the prices of token A in terms of token B and vice versa.
 */
export function calculatePricesV3FromSqrtPriceX96(
  sqrtPriceX96: DexNumber,
  tokenA: Token,
  tokenB: Token,
): LiquidityPrices<'dexnumber'> {
  const numerator = DexNumber.fromShifted(
    sqrtPriceX96.toString(),
    tokenB.decimals,
  ).pow(2)
  const Q96 = DexNumber.fromUnshifted(2).pow(96)
  const denominator = Q96.pow(2)

  // Calculate reciprocal for token price in terms of each other
  const bTokenPerAToken = numerator.dividedBy(denominator)
  const aTokenPerBToken = DexNumber.fromUnshifted(
    '1',
    tokenA.decimals,
  ).dividedBy(bTokenPerAToken)

  return {
    aTokenPerBToken,
    bTokenPerAToken,
  }
}

/**
 * Calculates the prices of Token A in terms of Token B and vice versa directly from the reserves.
 *
 * @param reserveA - Reserve of Token A (token0 in the pool).
 * @param reserveB - Reserve of Token B (token1 in the pool).
 *
 * @returns An object containing the prices of token A in terms of token B and vice versa.
 */
export function calculatePricesV3(
  reserveA: DexNumber,
  reserveB: DexNumber,
): LiquidityPrices<'dexnumber'> {
  if (reserveA.isZero() || reserveB.isZero()) {
    throw new Error('Reserves must be non-zero for price calculation.')
  }

  // Calculate the price ratio (TokenB / TokenA)
  const priceRatio = reserveB.dividedBy(reserveA)

  // Calculate sqrtPriceX96 = sqrt(priceRatio) * 2^96
  const sqrtPriceRatio = priceRatio.squareRoot()
  const Q96 = DexNumber.fromUnshifted(2).pow(96)
  const sqrtPriceX96 = sqrtPriceRatio.multipliedBy(Q96)

  // Calculate the price (price = (sqrtPriceX96^2) / (2^192))
  const numerator = sqrtPriceX96.pow(2)
  const denominator = Q96.pow(2)

  // Calculate reciprocal for token price in terms of each other
  const bTokenPerAToken = numerator.dividedBy(denominator)
  const aTokenPerBToken = DexNumber.fromUnshifted(
    '1',
    reserveA.decimals,
  ).dividedBy(bTokenPerAToken)

  return {
    aTokenPerBToken,
    bTokenPerAToken,
  }
}

/**
 * Calculates the liquidity amount for a Uniswap V3 position.
 *
 * @param params - The parameters for the calculation.
 * @param params.tokenA - The first token in the pair.
 * @param params.tokenB - The second token in the pair.
 * @param params.tokenAAmount - The amount of token A to add to the position.
 * @param params.tokenBAmount - The amount of token B to add to the position.
 * @param params.tickLower - The lower tick of the position.
 * @param params.tickUpper - The upper tick of the position.
 * @param params.sqrtPriceX96 - The current sqrt price of the pool.
 *
 * @returns The liquidity amount as a DexNumber.
 */
export function calculateLiquidityAmount(params: {
  tokenA: Token
  tokenB: Token
  tokenAAmount: DexNumber
  tokenBAmount: DexNumber
  tickLower: number
  tickUpper: number
  sqrtPriceX96: DexNumber
}): DexNumber {
  const {
    tokenA,
    tokenB,
    tokenAAmount,
    tokenBAmount,
    tickLower,
    tickUpper,
    sqrtPriceX96,
  } = params

  // Ensure we're working with unshifted amounts
  const unshiftedTokenAAmount = tokenAAmount.isShifted()
    ? tokenAAmount.unshift()
    : tokenAAmount
  const unshiftedTokenBAmount = tokenBAmount.isShifted()
    ? tokenBAmount.unshift()
    : tokenBAmount

  // Ensure tokens are ordered correctly as token0 and token1
  const [token0] = sortTokens(tokenA, tokenB)
  const [amount0, amount1] =
    tokenA.contractAddress === token0.contractAddress
      ? [unshiftedTokenAAmount, unshiftedTokenBAmount]
      : [unshiftedTokenBAmount, unshiftedTokenAAmount]

  // Convert ticks to sqrt prices
  let sqrtPriceLowerX96 = tickToSqrtPriceX96(tickLower)
  let sqrtPriceUpperX96 = tickToSqrtPriceX96(tickUpper)

  // Ensure sqrtPriceLowerX96 <= sqrtPriceUpperX96
  if (sqrtPriceLowerX96.isGreaterThan(sqrtPriceUpperX96)) {
    ;[sqrtPriceLowerX96, sqrtPriceUpperX96] = [
      sqrtPriceUpperX96,
      sqrtPriceLowerX96,
    ]
  }

  let liquidity: DexNumber

  if (sqrtPriceX96.isLessThanOrEqualTo(sqrtPriceLowerX96)) {
    // Current price is below the price range
    liquidity = getLiquidityForAmount0(
      sqrtPriceLowerX96,
      sqrtPriceUpperX96,
      amount0,
    )
  } else if (sqrtPriceX96.isGreaterThanOrEqualTo(sqrtPriceUpperX96)) {
    // Current price is above the price range
    liquidity = getLiquidityForAmount1(
      sqrtPriceLowerX96,
      sqrtPriceUpperX96,
      amount1,
    )
  } else {
    // Current price is within the price range
    const liquidity0 = getLiquidityForAmount0(
      sqrtPriceX96,
      sqrtPriceUpperX96,
      amount0,
    )
    const liquidity1 = getLiquidityForAmount1(
      sqrtPriceLowerX96,
      sqrtPriceX96,
      amount1,
    )

    liquidity = liquidity0.lte(liquidity1) ? liquidity0 : liquidity1
  }

  return liquidity.integerValue(DexNumber.ROUND_DOWN)
}

/**
 * Sorts two tokens based on their contract addresses.
 *
 * @param tokenA - The first token.
 * @param tokenB - The second token.
 *
 * @returns An array with tokens sorted as [token0, token1].
 */
export function sortTokens(tokenA: Token, tokenB: Token): [Token, Token] {
  if (
    tokenA.contractAddress.toLowerCase() < tokenB.contractAddress.toLowerCase()
  ) {
    return [tokenA, tokenB]
  } else {
    return [tokenB, tokenA]
  }
}

/**
 * Converts a tick to its corresponding sqrt price in Q64.96 format.
 *
 * @param tick - The tick to convert.
 * @returns The sqrt price as a DexNumber in Q64.96 format.
 */
export function tickToSqrtPriceX96(tick: number): DexNumber {
  const MIN_TICK = -887272
  const MAX_TICK = 887272
  const Q96 = DexNumber.fromUnshifted('2').pow(96) // Q96 = 2^96

  if (tick < MIN_TICK || tick > MAX_TICK) {
    throw new Error('Tick out of range')
  }

  let absTick = tick
  if (tick < 0) {
    absTick = -tick
  }

  // Initialize ratio to 1 << 128
  let ratio = DexNumber.fromUnshifted('1').shiftedBy(128)

  // Precomputed constants for the powers of 2
  const ratios: { [power: number]: DexNumber } = {
    1: DexNumber.fromShifted('0xfffcb933bd6fad37aa2d162d1a594001'),
    2: DexNumber.fromShifted('0xfff97272373d413259a46990580e213a'),
    4: DexNumber.fromShifted('0xfff2e50f5f656932ef12357cf3c7fdcc'),
    8: DexNumber.fromShifted('0xffe5caca7e10e4e61c3624eaa0941cd0'),
    16: DexNumber.fromShifted('0xffcb9843d60f6159c9db58835c926644'),
    32: DexNumber.fromShifted('0xff973b41fa98c081472e6896dfb254c0'),
    64: DexNumber.fromShifted('0xff2ea16466c96a3843ec78b326b52861'),
    128: DexNumber.fromShifted('0xfe5dee046a99a2a811c461f1969c3053'),
    256: DexNumber.fromShifted('0xfcbe86c7900a88aedcffc83b479aa3a4'),
    512: DexNumber.fromShifted('0xf987a7253ac413176f2b074cf7815e54'),
    1024: DexNumber.fromShifted('0xf3392b0822b70005940c7a398e4b70f3'),
    2048: DexNumber.fromShifted('0xe7159475a2c29b7443b29c7fa6e889d9'),
    4096: DexNumber.fromShifted('0xd097f3bdfd2022b8845ad8f792aa5825'),
    8192: DexNumber.fromShifted('0xa9f746462d870fdf8a65dc1f90e061e5'),
    16384: DexNumber.fromShifted('0x70d869a156d2a1b890bb3df62baf32f7'),
    32768: DexNumber.fromShifted('0x31be135f97d08fd981231505542fcfa6'),
    65536: DexNumber.fromShifted('0x9aa508b5b7a84e1c677de54f3e99bc9'),
    131072: DexNumber.fromShifted('0x5d6af8dedb81196699c329225ee604'),
    262144: DexNumber.fromShifted('0x2216e584f5fa1ea926041bedfe98'),
    524288: DexNumber.fromShifted('0x48a170391f7dc42444e8fa2'),
  }

  for (let i = 524288; i >= 1; i >>= 1) {
    if (absTick & i) {
      const ratioItem = ratios[i]

      if (!ratioItem) {
        throw new Error(`Precomputed constant for power ${i} not found`)
      }

      ratio = ratio.times(ratioItem).idiv(DexNumber.fromShifted(2).pow(128))
    }
  }

  if (tick < 0) {
    ratio = DexNumber.fromShifted(2).pow(256).idiv(ratio)
  }

  // Adjust the ratio from Q128.128 to Q64.96 format
  ratio = ratio.idiv(DexNumber.fromShifted(2).pow(32))

  // Divide by Q96 (2^96) to adjust from Q128.96 to Q32.0
  const sqrtPriceX96 = ratio.idiv(Q96)

  return sqrtPriceX96.integerValue(DexNumber.ROUND_DOWN)
}

/**
 * Calculates liquidity for a given amount of token0.
 *
 * @param sqrtRatioAX96 - The sqrt price at tick A.
 * @param sqrtRatioBX96 - The sqrt price at tick B.
 * @param amount0 - The amount of token0.
 *
 * @returns The liquidity as a BigNumber.
 */
export function getLiquidityForAmount0(
  sqrtRatioAX96: DexNumber,
  sqrtRatioBX96: DexNumber,
  amount0: DexNumber,
): DexNumber {
  if (sqrtRatioAX96.isGreaterThan(sqrtRatioBX96)) {
    ;[sqrtRatioAX96, sqrtRatioBX96] = [sqrtRatioBX96, sqrtRatioAX96]
  }
  const numerator = amount0.times(sqrtRatioAX96).times(sqrtRatioBX96)
  const denominator = sqrtRatioBX96.minus(sqrtRatioAX96)
  return numerator.idiv(denominator)
}

/**
 * Calculates liquidity for a given amount of token1.
 *
 * @param sqrtRatioAX96 - The sqrt price at tick A.
 * @param sqrtRatioBX96 - The sqrt price at tick B.
 * @param amount1 - The amount of token1.
 * @returns The liquidity as a BigNumber.
 */
export function getLiquidityForAmount1(
  sqrtRatioAX96: DexNumber,
  sqrtRatioBX96: DexNumber,
  amount1: DexNumber,
): DexNumber {
  if (sqrtRatioAX96.isGreaterThan(sqrtRatioBX96)) {
    ;[sqrtRatioAX96, sqrtRatioBX96] = [sqrtRatioBX96, sqrtRatioAX96]
  }
  return amount1.idiv(sqrtRatioBX96.minus(sqrtRatioAX96))
}

/**
 * Calculate prices between token A and token B based on the pool reserves.
 *
 * @param params - The parameters required to calculate prices.
 * @param params.tokenA - The token A.
 * @param params.tokenB - The token B.
 * @param params.reserveA - The reserve amount of token A.
 * @param params.reserveB - The reserve amount of token B.
 *
 * @returns An object with prices: aTokenPerBToken and bTokenPerAToken.
 */
export function calculatePrices({
  tokenA,
  tokenB,
  reserveA,
  reserveB,
}: {
  tokenA: Token
  tokenB: Token
  reserveA: DexNumber
  reserveB: DexNumber
}): LiquidityPrices<'dexnumber'> {
  if (reserveA.isZero() || reserveB.isZero()) {
    return {
      aTokenPerBToken: DexNumber.fromUnshifted('0', tokenB.decimals),
      bTokenPerAToken: DexNumber.fromUnshifted('0', tokenA.decimals),
    }
  }

  const aTokenPerBToken = reserveA.dividedBy(reserveB)
  const bTokenPerAToken = reserveB.dividedBy(reserveA)

  return { aTokenPerBToken, bTokenPerAToken }
}

/**
 * Calculates the sqrt price limit in Q64.96 format from the given price range.
 *
 * @param params - The parameters required to calculate the sqrt price limit.
 * @param params.currentTick - The current tick of the pool.
 * @param params.tickLower - The lower tick of the position's price range.
 * @param params.tickUpper - The upper tick of the position's price range.
 * @param params.tradeDirection - The trade direction (input or output).
 *
 * @returns The sqrt price limit as a DexNumber in Q64.96 format.
 */
export function calculateSqrtPriceLimit({
  currentTick,
  tickLower,
  tickUpper,
  tradeDirection,
}: {
  currentTick: number
  tickLower: number
  tickUpper: number
  tradeDirection: 'input' | 'output'
}): DexNumber {
  // Calculate the sqrt price for the lower and upper ticks in Q64.96 format
  const sqrtPriceLowerX96 = tickToSqrtPriceX96(tickLower)
  const sqrtPriceUpperX96 = tickToSqrtPriceX96(tickUpper)

  switch (tradeDirection) {
    case 'input':
      if (currentTick < tickLower) {
        // If current tick is below the range, return the lower price limit
        return sqrtPriceLowerX96
      } else {
        // Otherwise, return the upper price limit
        return sqrtPriceUpperX96
      }
    case 'output':
      if (currentTick >= tickUpper) {
        // If current tick is above or equal to the upper range, return the upper price limit
        return sqrtPriceUpperX96
      } else {
        // Otherwise, return the lower price limit
        return sqrtPriceLowerX96
      }
    default:
      throw new DexError('Invalid trade direction', ErrorCodes.internalError)
  }
}

// ------------------------
// Formatting
// ------------------------

/**
 * Converts liquidity parameters from decimal string format to DexNumber format for V2 DEX pools.
 * This includes validating the token amounts are positive and converting them to the appropriate decimal precision.
 *
 * @template TFormat - The format type parameter that defines how values should be formatted
 * @param params - Parameters for the conversion
 * @param params.params - The original parameters in decimal string format to be converted
 * @param params.tokenA - Token A information including contract address and decimals
 * @param params.tokenB - Token B information including contract address and decimals
 *
 * @returns The parameters converted to DexNumber format while preserving all other properties
 * @throws {DexError} If token amounts are not positive numbers
 */
export function addLiquidityV2ParamsToDexNumber({
  params,
  tokenA,
  tokenB,
}: {
  params: AddLiquidityParamsV2<'decimal'>
  tokenA: Token
  tokenB: Token
}): AddLiquidityParamsV2<'dexnumber'> {
  const tokenAAmount = params.tokenAAmount
    ? DexNumber.fromUnshifted(params.tokenAAmount, tokenA.decimals)
    : undefined
  const tokenBAmount = params.tokenBAmount
    ? DexNumber.fromUnshifted(params.tokenBAmount, tokenB.decimals)
    : undefined

  if (tokenAAmount && tokenAAmount.lte(0)) {
    throw new DexError(
      'TokenA amount must be greater than 0',
      ErrorCodes.functionArgumentError,
    )
  }

  if (tokenBAmount && tokenBAmount.lte(0)) {
    throw new DexError(
      'TokenB amount must be greater than 0',
      ErrorCodes.functionArgumentError,
    )
  }

  return {
    ...params,
    tokenAAmount,
    tokenBAmount,
  }
}

/**
 * Converts liquidity parameters from decimal string format to DexNumber format for V3 DEX pools.
 * This includes validating the token amounts are positive and converting them to the appropriate decimal precision.
 * For V3 pools, this also preserves fee tier and price range information.
 *
 * @template TFormat - The format type parameter that defines how values should be formatted
 * @param params - Parameters for the conversion
 * @param params.params - The original parameters in decimal string format to be converted
 * @param params.tokenA - Token A information including contract address and decimals
 * @param params.tokenB - Token B information including contract address and decimals
 *
 * @returns The parameters converted to DexNumber format while preserving all other properties
 * @throws {DexError} If token amounts are not positive numbers
 */
export function addLiquidityV3ParamsToDexNumber({
  params,
  tokenA,
  tokenB,
}: {
  params: AddLiquidityParamsV3<'decimal'>
  tokenA: Token
  tokenB: Token
}): AddLiquidityParamsV3<'dexnumber'> {
  const tokenAAmount = params.tokenAAmount
    ? DexNumber.fromUnshifted(params.tokenAAmount, tokenA.decimals)
    : undefined
  const tokenBAmount = params.tokenBAmount
    ? DexNumber.fromUnshifted(params.tokenBAmount, tokenB.decimals)
    : undefined

  if (tokenAAmount && tokenAAmount.lte(0)) {
    throw new DexError(
      'TokenA amount must be greater than 0',
      ErrorCodes.functionArgumentError,
    )
  }

  if (tokenBAmount && tokenBAmount.lte(0)) {
    throw new DexError(
      'TokenB amount must be greater than 0',
      ErrorCodes.functionArgumentError,
    )
  }

  return {
    ...params,
    tokenAAmount,
    tokenBAmount,
  }
}

/**
 * Converts remove liquidity parameters from decimal string format to DexNumber format for V2 DEX pools.
 * This includes validating amounts are positive and converting values to appropriate decimal precision.
 *
 * @template TFormat - The format type parameter that defines how values should be formatted
 * @param params - Parameters for the conversion
 * @param params.params - The original parameters in decimal string format to be converted
 * @param params.tokenA - Token A information including contract address and decimals
 * @param params.tokenB - Token B information including contract address and decimals
 *
 * @param params.lpTokenDecimals - Number of decimal places for the liquidity pool token
 * @returns The parameters converted to DexNumber format while preserving all other properties
 * @throws {DexError} If any amounts are not positive numbers
 */
export function removeLiquidityV2ParamsToDexNumber({
  params,
  tokenA,
  tokenB,
  lpTokenDecimals,
}: {
  params: RemoveLiquidityParamsV2<'decimal'>
  tokenA: Token
  tokenB: Token
  lpTokenDecimals: number
}): RemoveLiquidityParamsV2<'dexnumber'> {
  const lpTokenAmount = params.lpTokenAmount
    ? DexNumber.fromUnshifted(params.lpTokenAmount, lpTokenDecimals)
    : undefined
  const minTokenAAmount = params.minTokenAAmount
    ? DexNumber.fromUnshifted(params.minTokenAAmount, tokenA.decimals)
    : undefined
  const minTokenBAmount = params.minTokenBAmount
    ? DexNumber.fromUnshifted(params.minTokenBAmount, tokenB.decimals)
    : undefined

  if (lpTokenAmount && lpTokenAmount.lte(0)) {
    throw new DexError(
      'LP token amount must be greater than 0',
      ErrorCodes.functionArgumentError,
    )
  }

  if (minTokenAAmount && minTokenAAmount.lte(0)) {
    throw new DexError(
      'Minimum tokenA amount must be greater than 0',
      ErrorCodes.functionArgumentError,
    )
  }

  if (minTokenBAmount && minTokenBAmount.lte(0)) {
    throw new DexError(
      'Minimum tokenB amount must be greater than 0',
      ErrorCodes.functionArgumentError,
    )
  }

  return {
    ...params,
    lpTokenAmount,
    minTokenAAmount,
    minTokenBAmount,
  }
}

/**
 * Converts remove liquidity parameters from decimal string format to DexNumber format for V3 DEX pools.
 * This includes validating amounts are positive and converting values to appropriate decimal precision.
 * For V3 pools, this handles NFT position token IDs and maintains fee tier information.
 *
 * @template TFormat - The format type parameter that defines how values should be formatted
 * @param params - Parameters for the conversion
 * @param params.params - The original parameters in decimal string format to be converted
 * @param params.tokenA - Token A information including contract address and decimals
 * @param params.tokenB - Token B information including contract address and decimals
 * @param params.lpTokenDecimals - Number of decimal places for the liquidity position
 *
 * @returns The parameters converted to DexNumber format while preserving all other properties
 * @throws {DexError} If any amounts are not positive numbers
 */
export function removeLiquidityV3ParamsToDexNumber({
  params,
  tokenA,
  tokenB,
  lpTokenDecimals,
}: {
  params: RemoveLiquidityParamsV3<'decimal'>
  tokenA: Token
  tokenB: Token
  lpTokenDecimals: number
}): RemoveLiquidityParamsV3<'dexnumber'> {
  const liquidityAmount = params.liquidityAmount
    ? DexNumber.fromUnshifted(params.liquidityAmount, lpTokenDecimals)
    : undefined
  const minTokenAAmount = params.minTokenAAmount
    ? DexNumber.fromUnshifted(params.minTokenAAmount, tokenA.decimals)
    : undefined
  const minTokenBAmount = params.minTokenBAmount
    ? DexNumber.fromUnshifted(params.minTokenBAmount, tokenB.decimals)
    : undefined

  if (liquidityAmount && liquidityAmount.lte(0)) {
    throw new DexError(
      'Liquidity amount must be greater than 0',
      ErrorCodes.functionArgumentError,
    )
  }

  if (minTokenAAmount && minTokenAAmount.lte(0)) {
    throw new DexError(
      'Minimum tokenA amount must be greater than 0',
      ErrorCodes.functionArgumentError,
    )
  }

  if (minTokenBAmount && minTokenBAmount.lte(0)) {
    throw new DexError(
      'Minimum tokenB amount must be greater than 0',
      ErrorCodes.functionArgumentError,
    )
  }

  return {
    ...params,
    liquidityAmount,
    minTokenAAmount,
    minTokenBAmount,
  }
}

/**
 * Formats liquidity parameters based on protocol version and direction (add/remove).
 * This is a type-safe wrapper that routes to the appropriate conversion function based on the protocol and direction.
 *
 * @template TProtocol - The DEX protocol type (V2 or V3)
 * @template TDirection - The direction of the liquidity operation (add or remove)
 * @param params - The formatting parameters
 * @param params.protocol - The DEX protocol being used
 * @param params.liquidityDirection - Whether adding or removing liquidity
 * @param params.tokenA - Token A information
 * @param params.tokenB - Token B information
 * @param params.params - The liquidity parameters to format
 * @param params.lpTokenDecimals - LP token decimals (required only when removing liquidity)
 *
 * @returns Formatted parameters in DexNumber format appropriate for the protocol and direction
 * @throws {DexError} If parameters are invalid or if lpTokenDecimals is missing when removing liquidity
 */
export function formatLiquidityParams<
  TProtocol extends DexProtocol,
  TDirection extends LiquidityDirection,
>({
  protocol,
  liquidityDirection,
  tokenA,
  tokenB,
  params,
  lpTokenDecimals,
}: {
  protocol: TProtocol
  liquidityDirection: TDirection
  tokenA: Token
  tokenB: Token
  params: TProtocol extends 'protocolV2'
    ? TDirection extends 'add'
      ? AddLiquidityParamsV2<'decimal'>
      : RemoveLiquidityParamsV2<'decimal'>
    : TProtocol extends 'protocolV3'
      ? TDirection extends 'add'
        ? AddLiquidityParamsV3<'decimal'>
        : RemoveLiquidityParamsV3<'decimal'>
      : never
  lpTokenDecimals?: TDirection extends 'remove' ? number : never
}): TProtocol extends 'protocolV2'
  ? TDirection extends 'add'
    ? AddLiquidityParamsV2<'dexnumber'>
    : RemoveLiquidityParamsV2<'dexnumber'>
  : TProtocol extends 'protocolV3'
    ? TDirection extends 'add'
      ? AddLiquidityParamsV3<'dexnumber'>
      : RemoveLiquidityParamsV3<'dexnumber'>
    : never {
  assertProtocol(protocol)

  try {
    let formattedParams: ReturnType<typeof formatLiquidityParams>

    if (isLiquidityDirectionAdd(liquidityDirection)) {
      if (protocol === 'protocolV2' && isAddLiquidityParamsV2(params)) {
        formattedParams = addLiquidityV2ParamsToDexNumber({
          params,
          tokenA,
          tokenB,
        })
      } else if (protocol === 'protocolV3' && isAddLiquidityParamsV3(params)) {
        formattedParams = addLiquidityV3ParamsToDexNumber({
          params,
          tokenA,
          tokenB,
        })
      } else {
        throw new DexError(
          'Invalid protocol or parameters for adding liquidity',
          ErrorCodes.functionArgumentError,
        )
      }
    } else if (isLiquidityDirectionRemove(liquidityDirection)) {
      if (!lpTokenDecimals && lpTokenDecimals !== 0) {
        throw new DexError(
          'lpTokenDecimals is required when removing liquidity',
          ErrorCodes.functionArgumentError,
        )
      }

      if (protocol === 'protocolV2' && isRemoveLiquidityParamsV2(params)) {
        formattedParams = removeLiquidityV2ParamsToDexNumber({
          params,
          tokenA,
          tokenB,
          lpTokenDecimals,
        })
      } else if (
        protocol === 'protocolV3' &&
        isRemoveLiquidityParamsV3(params)
      ) {
        formattedParams = removeLiquidityV3ParamsToDexNumber({
          params,
          tokenA,
          tokenB,
          lpTokenDecimals,
        })
      } else {
        throw new DexError(
          'Invalid protocol or parameters for removing liquidity',
          ErrorCodes.functionArgumentError,
        )
      }
    } else {
      throw new DexError(
        'Invalid liquidity direction',
        ErrorCodes.functionArgumentError,
      )
    }

    return formattedParams as TProtocol extends 'protocolV2'
      ? TDirection extends 'add'
        ? AddLiquidityParamsV2<'dexnumber'>
        : RemoveLiquidityParamsV2<'dexnumber'>
      : TProtocol extends 'protocolV3'
        ? TDirection extends 'add'
          ? AddLiquidityParamsV3<'dexnumber'>
          : RemoveLiquidityParamsV3<'dexnumber'>
        : never
  } catch (error) {
    throw new DexError(
      'Error formatting liquidity params',
      ErrorCodes.internalError,
      { error: error instanceof Error ? error.message : 'Unknown error' },
    )
  }
}

/**
 * Formats a liquidity context by converting all DexNumber values to the specified format type.
 * This includes formatting token information, pool shares, prices, and other numeric values.
 *
 * @template TFormat - The target format type for the converted values
 *
 * @param context - The internal liquidity context containing DexNumber values
 * @param format - The format specification to convert values to
 *
 * @returns A new context with all numeric values converted to the specified format
 */
export function formatLiquidityContext<TFormat extends TradeFormat>(
  context: InternalLiquidityContext<'dexnumber'>,
  format: TradeFormatOptions<TFormat>,
): InternalLiquidityContext<TFormat> {
  const {
    tokenAInfo,
    tokenBInfo,
    lpTokenInfo,
    shareOfPool,
    prices,
    expectedShareOfPool,
    expectedLiquidity,
    minLiquidity,
    ...rest
  } = context

  return {
    ...rest,
    tokenAInfo: formatTokenInfo(tokenAInfo, format),
    tokenBInfo: formatTokenInfo(tokenBInfo, format),
    lpTokenInfo:
      lpTokenInfo && !('tokenId' in lpTokenInfo)
        ? formatLPTokenInfo(lpTokenInfo, format)
        : lpTokenInfo,
    shareOfPool: shareOfPool.toTradeFormat(format),
    expectedShareOfPool: expectedShareOfPool.toTradeFormat(format),
    prices: {
      aTokenPerBToken: prices.aTokenPerBToken.toTradeFormat(format),
      bTokenPerAToken: prices.bTokenPerAToken.toTradeFormat(format),
    },
    expectedLiquidity: expectedLiquidity.toTradeFormat(format),
    minLiquidity: minLiquidity?.toTradeFormat(format),
  } as InternalLiquidityContext<TFormat>
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
export function formatTokenInfo<TFormat extends TradeFormat>(
  info: LiquidityTokenInfo<'dexnumber'>,
  format: TradeFormatOptions<TFormat>,
): LiquidityTokenInfo<TFormat> {
  return {
    ...info,
    amount: info.amount?.toTradeFormat(format),
    balance: info.balance.toTradeFormat(format),
    allowance: info.allowance.toTradeFormat(format),
  }
}

/**
 * Formats liquidity pool token information by converting DexNumber values to the specified format type.
 * Handles both V2 and V3 LP token information, including their specific properties.
 *
 * @template TFormat - The target format type for the converted values
 *
 * @param info - The LP token information containing DexNumber values (either V2 or V3)
 * @param format - The format specification to convert values to
 *
 * @returns New LP token information with numeric values converted to the specified format
 *
 * @example
 * ```typescript
 * // For V2 LP Token Info
 * const v2Info = {
 *   token: myToken,
 *   amount: dexNumberAmount,
 *   balance: dexNumberBalance,
 *   totalSupply: dexNumberTotalSupply,
 *   // ... other properties
 * };
 * const formattedV2 = formatLPTokenInfo(v2Info, { type: 'readable' });
 *
 * // For V3 LP Token Info
 * const v3Info = {
 *   tokenId: '123',
 *   totalSupply: dexNumberTotalSupply,
 *   amount: dexNumberAmount,
 *   feeTier: 500,
 *   priceRange: { tickLower: -1000, tickUpper: 1000 }
 * };
 * const formattedV3 = formatLPTokenInfo(v3Info, { type: 'readable' });
 * ```
 */
export function formatLPTokenInfo<TFormat extends TradeFormat>(
  info: LPTokenInfoV2<'dexnumber'> | LPTokenInfoV3<'dexnumber'>,
  format: TradeFormatOptions<TFormat>,
): LPTokenInfoV2<TFormat> | LPTokenInfoV3<TFormat> {
  if (isLPTokenInfoV2(info)) {
    // Handle V2 LP token info
    return {
      ...formatTokenInfo(info, format),
      totalSupply: info.totalSupply.toTradeFormat(format),
    }
  } else if (isLPTokenInfoV3(info)) {
    // Handle V3 LP token info
    return {
      ...info,
      totalSupply: info.totalSupply.toTradeFormat(format),
      amount: info.amount?.toTradeFormat(format),
    }
  }

  // This should never happen if the type system is working correctly
  throw new DexError(
    'Invalid LP token info type provided',
    ErrorCodes.internalError,
  )
}

/**
 * Compares two liquidity contexts to determine if they are equivalent.
 * This performs deep comparison of all relevant fields, including tokens, amounts, and pool information.
 * Used primarily for determining if a new quote needs to be emitted.
 *
 * @param a - First liquidity context to compare
 * @param b - Second liquidity context to compare
 *
 * @returns true if the contexts are equivalent, false otherwise
 */
export function compareLiquidityContexts(
  a: InternalLiquidityContext<'dexnumber'>,
  b: InternalLiquidityContext<'dexnumber'>,
): boolean {
  // Compare basic properties
  if (
    a.dexTag !== b.dexTag ||
    a.protocol !== b.protocol ||
    a.version !== b.version ||
    a.liquidityDirection !== b.liquidityDirection ||
    a.slippage !== b.slippage ||
    a.deadline !== b.deadline
  ) {
    return false
  }

  // Compare token information
  if (
    !compareLiquidityTokenInfo(a.tokenAInfo, b.tokenAInfo) ||
    !compareLiquidityTokenInfo(b.tokenBInfo, b.tokenBInfo)
  ) {
    return false
  }

  // Compare LP token information
  if (a.lpTokenInfo && b.lpTokenInfo) {
    if ('tokenId' in a.lpTokenInfo && 'tokenId' in b.lpTokenInfo) {
      if (a.lpTokenInfo.tokenId !== b.lpTokenInfo.tokenId) {
        return false
      }
    } else if (!('tokenId' in a.lpTokenInfo) && !('tokenId' in b.lpTokenInfo)) {
      if (!compareLiquidityTokenInfo(a.lpTokenInfo, b.lpTokenInfo)) {
        return false
      }
    }
  } else if (a.lpTokenInfo !== b.lpTokenInfo) {
    return false
  }

  // Compare numeric values
  return (
    a.shareOfPool === b.shareOfPool &&
    a.expectedShareOfPool === b.expectedShareOfPool &&
    a.expectedLiquidity.eq(b.expectedLiquidity) &&
    (a.minLiquidity?.eq(b.minLiquidity ?? DexNumber.fromUnshifted(0)) ??
      true) &&
    a.prices.aTokenPerBToken === b.prices.aTokenPerBToken &&
    a.prices.bTokenPerAToken === b.prices.bTokenPerAToken
  )
}

/**
 * Compares two token information objects to determine if they are equivalent.
 * This includes comparing amounts, balances, allowances, and other token properties.
 *
 * @param a - First token information object to compare
 * @param b - Second token information object to compare
 *
 * @returns true if the token information objects are equivalent, false otherwise
 */
export function compareLiquidityTokenInfo(
  a: LiquidityTokenInfo<'dexnumber'>,
  b: LiquidityTokenInfo<'dexnumber'>,
): boolean {
  return (
    (a.amount?.eq(b.amount ?? DexNumber.fromUnshifted(0)) ?? true) &&
    a.balance.eq(b.balance) &&
    a.allowance.eq(b.allowance) &&
    a.hasEnoughBalance === b.hasEnoughBalance &&
    a.hasEnoughAllowance === b.hasEnoughAllowance &&
    a.isCoin === b.isCoin
  )
}

/**
 * Deserializes a liquidity context by converting all serialized DexNumber values back to DexNumber instances.
 * This is the inverse operation of formatLiquidityContext.
 *
 * @example
 * ```typescript
 * // After receiving a context from RxJS
 * subscription.pipe(
 *   map(({ latestQuote }) => deserializeLiquidityContext(latestQuote))
 * ).subscribe(context => {
 *   // context now has proper DexNumber instances
 *   context.expectedLiquidity.multipliedBy(2); // works!
 * });
 * ```
 *
 * @param context - The serialized liquidity context
 *
 * @returns A context with proper DexNumber instances
 */
export function deserializeLiquidityContext(
  context: InternalLiquidityContext<'dexnumber'>,
): InternalLiquidityContext<'dexnumber'> {
  const {
    tokenAInfo,
    tokenBInfo,
    lpTokenInfo,
    shareOfPool,
    prices,
    expectedShareOfPool,
    expectedLiquidity,
    minLiquidity,
    ...rest
  } = context

  return {
    ...rest,
    tokenAInfo: deserializeTokenInfo(tokenAInfo),
    tokenBInfo: deserializeTokenInfo(tokenBInfo),
    lpTokenInfo:
      lpTokenInfo && !('tokenId' in lpTokenInfo)
        ? deserializeTokenInfo(lpTokenInfo)
        : lpTokenInfo,
    shareOfPool: DexNumber.fromSerialized(shareOfPool),
    expectedShareOfPool: DexNumber.fromSerialized(expectedShareOfPool),
    prices: {
      aTokenPerBToken: DexNumber.fromSerialized(prices.aTokenPerBToken),
      bTokenPerAToken: DexNumber.fromSerialized(prices.bTokenPerAToken),
    },
    expectedLiquidity: DexNumber.fromSerialized(expectedLiquidity),
    minLiquidity: minLiquidity
      ? DexNumber.fromSerialized(minLiquidity)
      : undefined,
  } as InternalLiquidityContext<'dexnumber'>
}

/**
 * Deserializes a token info object by converting all its DexNumber values back to instances.
 *
 * @example
 * ```typescript
 * const serializedInfo = {
 *   token: myToken,
 *   amount: serializedDexNumber,
 *   balance: serializedDexNumber,
 *   allowance: serializedDexNumber,
 *   // ... other properties
 * };
 * const deserializedInfo = deserializeTokenInfo(serializedInfo);
 * deserializedInfo.balance.multipliedBy(2); // works!
 * ```
 *
 * @param info - The serialized token info object
 *
 * @returns Token info with proper DexNumber instances
 */
export function deserializeTokenInfo(
  info: LiquidityTokenInfo<'dexnumber'>,
): LiquidityTokenInfo<'dexnumber'> {
  return {
    ...info,
    amount: info.amount ? DexNumber.fromSerialized(info.amount) : undefined,
    balance: DexNumber.fromSerialized(info.balance),
    allowance: DexNumber.fromSerialized(info.allowance),
  }
}
// ------------------------
// Type Guards
// ------------------------

/**
 * Type guard to check if a value needs deserialization (is a plain object, not a DexNumber instance)
 *
 * @example
 * ```typescript
 * const value = someValue;
 * if (needsDeserialization(value)) {
 *   return DexNumber.fromSerialized(value);
 * }
 * return value;
 * ```
 */
export function isSerializedDexNumber(value: any): boolean {
  return (
    value &&
    typeof value === 'object' &&
    !Array.isArray(value) &&
    !(value instanceof DexNumber) &&
    'c' in value &&
    's' in value &&
    'e' in value
  )
}

/**
 * Type guard to check if a value is of type LiquidityDirection ('add' or 'remove').
 *
 * @param value - The value to check.
 * @returns True if the value is 'add' or 'remove'; otherwise, false.
 */
export function isLiquidityDirection(value: any): value is LiquidityDirection {
  return value === 'add' || value === 'remove'
}

/**
 * Type guard to check if the liquidity direction is 'add'.
 *
 * @param value - The LiquidityDirection value to check.
 * @returns True if the value is 'add'; otherwise, false.
 */
export function isLiquidityDirectionAdd(value: any): value is 'add' {
  return value === 'add'
}

/**
 * Type guard to check if the liquidity direction is 'remove'.
 *
 * @param value - The LiquidityDirection value to check.
 *
 * @returns True if the value is 'remove'; otherwise, false.
 */
export function isLiquidityDirectionRemove(value: any): value is 'remove' {
  return value === 'remove'
}

/**
 * Type guard to check if an object is of type LiquiditySettingsV3.
 *
 * @param settings - The object to check.
 *
 * @returns A boolean indicating if the object is of type LiquiditySettingsV3.
 */
export function isLiquiditySettingsV3(
  settings: any,
): settings is LiquiditySettingsV3 {
  return (
    'enablePriceLimit' in settings ||
    'priceRange' in settings ||
    'feeTier' in settings
  )
}

/**
 * Type guard to check if the provided settings are of type `LiquiditySettings`.
 *
 * `LiquiditySettings` are considered a subset of `DexSettings` and do not include
 * trade-specific properties such as `disablePriceImpact` or `hasFeeOnTransfer`.
 *
 * @param settings - The settings object to check.
 *
 * @returns A boolean indicating whether the settings object is of type `LiquiditySettings`.
 */
export function isLiquiditySettings(
  settings: any,
): settings is LiquiditySettings {
  return (
    !('disablePriceImpact' in settings) && !('hasFeeOnTransfer' in settings)
  )
}

/**
 * Type guard to check if an LPTokenInfo is of type LPTokenInfoV2.
 *
 * @param info - The LPTokenInfo object to check.
 *
 * @returns A boolean indicating if the object is of type LPTokenInfoV2.
 */
export function isLPTokenInfoV2(info: any): info is LPTokenInfoV2<TradeFormat> {
  return 'token' in info
}

/**
 * Type guard to check if an LPTokenInfo is of type LPTokenInfoV3.
 *
 * @param info - The LPTokenInfo object to check.
 *
 * @returns A boolean indicating if the object is of type LPTokenInfoV3.
 */
export function isLPTokenInfoV3(info: any): info is LPTokenInfoV3<TradeFormat> {
  return 'tokenId' in info
}

/**
 * Type guard to check if the provided parameters are for adding liquidity in a V2 protocol.
 *
 * @param params - The parameters to check.
 *
 * @returns True if the parameters are for V2; otherwise, false.
 */
export function isAddLiquidityParamsV2(
  params: any,
): params is AddLiquidityParamsV2<TradeFormat> {
  return !('feeTier' in params)
}

/**
 * Type guard to check if the provided parameters are for adding liquidity in a V3 protocol.
 *
 * @param params - The parameters to check.
 *
 * @returns True if the parameters are for V3; otherwise, false.
 */
export function isAddLiquidityParamsV3(
  params: any,
): params is AddLiquidityParamsV3<TradeFormat> {
  return 'feeTier' in params
}

/**
 * Type guard to check if the provided parameters are for removing liquidity in a V2 protocol.
 *
 * @param params - The parameters to check.
 *
 * @returns True if the parameters are for V2; otherwise, false.
 */
export function isRemoveLiquidityParamsV2(
  params: any,
): params is RemoveLiquidityParamsV2<TradeFormat> {
  return !('lpTokenId' in params)
}

/**
 * Type guard to check if the provided parameters are for removing liquidity in a V3 protocol.
 *
 * @param params - The parameters to check.
 *
 * @returns True if the parameters are for V3; otherwise, false.
 */
export function isRemoveLiquidityParamsV3(
  params: any,
): params is RemoveLiquidityParamsV3<TradeFormat> {
  return 'lpTokenId' in params
}
