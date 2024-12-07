import { DexNumber } from '@dex-toolkit/number'
import type {
  DexProtocol,
  FeeTier,
  RouteQuote,
  RouteQuotesByDex,
  RoutePathsByDex,
  VersionedRoutePathsByDex,
  RoutePath,
  UniswapRouterV2Types,
  UniswapRouterV3Types,
  VersionTag,
  DexConfigBase,
} from '@dex-toolkit/types'

import { assertVersionTag } from './version.utils'
import { DexError, ErrorCodes } from '../errors'

/**
 * (V3 ONLY) Converts a `FeeTier` to its percentage representation as a `number`.
 *
 * This function calculates the percentage representation of a fee tier in basis points (bps).
 * The calculation is performed using `BigInt` for precision but returns the result as a `number`.
 *
 * @param feeTier - The fee amount to convert, in basis points (e.g., 500, 3000, 10000).
 * @returns The percentage value as a `number`.
 *
 * @example
 * ```
 * const feeTier500 = feeToPercent(500); // 0.0005
 * const feeTier3000 = feeToPercent(3000); // 0.003
 * const feeTier10000 = feeToPercent(10000); // 0.01
 * console.log(feeTier500, feeTier3000, feeTier10000);
 * ```
 */
export const feeToPercent = (feeTier: FeeTier): number => {
  const scale = 10n ** 18n // Scale factor for precision
  const result = (BigInt(feeTier) * scale) / 1_000_000n
  return Number(result) / 1e18
}

/**
 * (V3 ONLY) Converts a percentage representation back to its `FeeTier` basis point equivalent as a `number`.
 *
 * This function reverts the percentage back to basis points using `BigInt` for precision, but returns a `number`.
 *
 * @param percent - The percentage to convert as a `number`.
 * @returns The corresponding FeeTier in basis points as a `number`.
 *
 * @example
 * ```
 * const percent500 = percentToFeeTier(0.0005); // 500
 * const percent3000 = percentToFeeTier(0.003); // 3000
 * const percent10000 = percentToFeeTier(0.01); // 10000
 * console.log(percent500, percent3000, percent10000);
 * ```
 */
export const percentToFeeTier = (percent: number): FeeTier => {
  const scale = 10n ** 18n // Scale factor for precision
  const result = (BigInt(Math.round(percent * 1e18)) * 1_000_000n) / scale
  return Number(result)
}

/**
 * Calculates the sqrt price limit for a V3 swap to protect against excessive slippage
 *
 * @param params - The parameters required to calculate the price limit
 * @param params.currentSqrtPriceX96 - The current sqrt price of the pool in Q64.96 format
 * @param params.slippageTolerance - The maximum acceptable slippage as a decimal (e.g., 0.01 for 1%)
 * @param params.isExactInput - Whether this is an exact input swap
 * @returns The sqrtPriceX96 limit or 0 if price limiting is disabled
 */
export function calculateSwapPriceLimit({
  currentSqrtPriceX96,
  slippageTolerance,
  isExactInput,
}: {
  currentSqrtPriceX96: DexNumber
  slippageTolerance: number
  isExactInput: boolean
}): DexNumber {
  // For exact input trades, the price can only get worse by going up
  // For exact output trades, the price can only get worse by going down
  const multiplier = DexNumber.fromUnshifted(1)[
    isExactInput ? 'plus' : 'minus'
  ](DexNumber.fromUnshifted(slippageTolerance))
  return currentSqrtPriceX96.times(multiplier)
}

// ------------------------
// Route Path Helpers
// ------------------------

/**
 * Helper function to avoid duplicate routes
 *
 * @param route - The route to check.
 * @param existingRoutes - The existing routes to check against.
 * @returns A boolean indicating whether the route is unique.
 */
export function isUniqueRoute(
  route: RoutePath,
  existingRoutes: RoutePath[],
): boolean {
  return !existingRoutes.some((existingRoute) => {
    const routePath = route.route
      .map((token) => token.contractAddress)
      .join('-')
    const existingPath = existingRoute.route
      .map((token) => token.contractAddress)
      .join('-')
    return routePath === existingPath
  })
}

// ------------------------
// Route Quote Helpers
// ------------------------

/**
 * Converts a RouteQuote[] to a RouteQuotesByDex to organize by dexTag.
 *
 * @param routeQuotes - The RouteQuote[] to convert.
 * @returns A RouteQuotesByDex object.
 */
export function routeQuotesToRouteQuotesByDex(
  routeQuotes: RouteQuote[],
): RouteQuotesByDex {
  const routeQuotesByDex: RouteQuotesByDex = {} as RouteQuotesByDex

  for (const routeQuote of routeQuotes) {
    if (!routeQuote.dexTag) {
      continue
    }

    if (routeQuote.dexTag) {
      if (!routeQuotesByDex[routeQuote.dexTag]) {
        routeQuotesByDex[routeQuote.dexTag] = []
      }

      routeQuotesByDex[routeQuote.dexTag]!.push(routeQuote)
    }
  }

  return routeQuotesByDex
}

/**
 * Gets the best route quote .
 *
 * @param routeQuotesByDex - The RouteQuotesByDex object.
 * @returns The best route quote, or undefined if no route quotes are found.
 */
export function getBestQuoteFromRouteQuotesByDex(
  routeQuotesByDex: RouteQuotesByDex,
): RouteQuote | undefined {
  let bestRouteQuote: RouteQuote | undefined

  for (const routes of Object.values(routeQuotesByDex)) {
    for (const route of routes) {
      if (
        !bestRouteQuote ||
        route.expectedConvertQuote.isGreaterThan(
          bestRouteQuote.expectedConvertQuote,
        )
      ) {
        bestRouteQuote = route
      }
    }
  }

  return bestRouteQuote
}

/**
 * Converts a `VersionedRoutePathsByDex` object into a `RoutePathsByDex` object by selecting the route paths
 * from the specified DEX protocol (v2 or v3) for each DEX type.
 *
 * @param versionedRoutePathsByDex - The `VersionedRoutePathsByDex` object containing route paths categorized by DEX type and protocol.
 * @param protocol - The protocol of the DEX (v2, v3, etc.).
 * @returns A `RoutePathsByDex` object where route paths for the specified DEX protocol are selected for each DEX type.
 */
export function convertVersionedRoutePathsByDexToRoutePathsByDex(
  versionedRoutePathsByDex: VersionedRoutePathsByDex,
  protocol: DexProtocol,
): RoutePathsByDex {
  const keyedConfigs: RoutePathsByDex = {} as RoutePathsByDex

  for (const [dexTag, versionedPaths] of Object.entries(
    versionedRoutePathsByDex,
  )) {
    const routePaths = versionedPaths[protocol]

    if (routePaths) {
      keyedConfigs[dexTag as keyof RoutePathsByDex] = routePaths
    }
  }

  return keyedConfigs
}

// ------------------------
// Type Guards
// ------------------------

/**
 * Type guard to check if the value is a valid `FeeTier`.
 *
 * This function checks if a provided number is a recognized fee tier within a specified DEX configuration and version.
 * If `feeTier`, `dexConfig`, or `versionTag` is missing, a `DexError` is thrown.
 *
 * @param feeTier - The fee tier to validate.
 * @param dexConfig - The DEX configuration object containing protocol fee tiers.
 * @param versionTag - The protocol version tag to check within the configuration.
 * @param errorCode - Optional error code to use in the thrown error if a required argument is missing.
 * @returns A boolean indicating whether the `feeTier` is valid within the specified configuration.
 *
 * @throws `DexError` if `feeTier`, `dexConfig`, or `versionTag` is undefined.
 *
 * @example
 * ```
 * const isTierValid = isFeeTier(3000, dexConfig, 'v3');
 * console.log(isTierValid); // true if 3000 is a valid tier in dexConfig under 'v3'
 * ```
 */
export function isFeeTier(
  feeTier: number | undefined,
  dexConfig: DexConfigBase | undefined,
  versionTag: VersionTag | undefined,
  errorCode = ErrorCodes.functionArgumentError,
): feeTier is FeeTier {
  if (feeTier === undefined || feeTier === null) {
    throw new DexError('Fee tier is required but was not provided', errorCode)
  }

  if (!dexConfig) {
    throw new DexError('Dex config is required but was not provided', errorCode)
  }

  if (!versionTag) {
    throw new DexError(
      'Version tag is required but was not provided',
      errorCode,
    )
  }

  const { feeTiers } = dexConfig?.protocols.protocolV3?.[versionTag] ?? {}

  if (!feeTiers) {
    return false
  }

  return feeTiers.includes(feeTier)
}

/**
 * Asserts that the provided value is a valid `FeeTier`.
 *
 * This function throws a `DexError` if the provided `feeTier` is invalid within the specified DEX configuration
 * and version. Use this for runtime validation of fee tier values.
 *
 * @param feeTier - The fee tier value to validate.
 * @param dexConfig - The DEX configuration object containing protocol fee tiers.
 * @param versionTag - The protocol version tag within the configuration.
 * @param errorCode - Optional error code to use in the thrown error.
 *
 * @throws `DexError` if the `feeTier` is not valid within the specified DEX configuration and version.
 *
 * @example
 * ```
 * assertFeeTier(500, dexConfig, 'v3'); // Throws DexError if 500 is not valid in the provided config
 * ```
 */
export function assertFeeTier(
  feeTier: number | undefined,
  dexConfig: DexConfigBase | undefined,
  versionTag: VersionTag | undefined,
  errorCode = ErrorCodes.functionArgumentError,
): asserts feeTier is FeeTier {
  assertVersionTag(versionTag)

  if (!isFeeTier(feeTier, dexConfig, versionTag)) {
    throw new DexError(
      `Invalid fee tier: ${feeTier}. Expected one of: ${dexConfig?.protocols.protocolV3?.[versionTag]?.feeTiers}`,
      errorCode,
    )
  }
}

/**
 * Type guard to check if a value is an array of valid `FeeTier` values.
 *
 * This function checks if every element in an array is a recognized fee tier within a specified DEX configuration
 * and version.
 *
 * @param feeTiers - An array of numbers representing potential fee tiers.
 * @param dexConfig - The DEX configuration object containing protocol fee tiers.
 * @param versionTag - The protocol version tag to check within the configuration.
 * @returns A boolean indicating if all values in `feeTiers` are valid within the specified configuration.
 *
 * @example
 * ```
 * const areTiersValid = isFeeTierArray([500, 3000], dexConfig, 'v3');
 * console.log(areTiersValid); // true if both 500 and 3000 are valid in dexConfig under 'v3'
 * ```
 */
export function isFeeTierArray(
  feeTiers: number[] | undefined,
  dexConfig: DexConfigBase | undefined,
  versionTag: VersionTag | undefined,
): feeTiers is FeeTier[] {
  return (
    Array.isArray(feeTiers) &&
    feeTiers.every((feeTier) => isFeeTier(feeTier, dexConfig, versionTag))
  )
}

/**
 * Asserts that the provided value is a valid array of `FeeTier` values.
 *
 * This function throws a `DexError` if the provided array contains any invalid fee tiers within the specified
 * DEX configuration and version. Use this for runtime validation of fee tier arrays.
 *
 * @param feeTiers - An array of numbers representing potential fee tiers.
 * @param dexConfig - The DEX configuration object containing protocol fee tiers.
 * @param versionTag - The protocol version tag within the configuration.
 * @param errorCode - Optional error code to use in the thrown error.
 *
 * @throws `DexError` if the array contains any invalid fee tiers within the specified configuration and version.
 *
 * @example
 * ```
 * assertFeeTierArray([500, 3000], dexConfig, 'v3'); // Throws DexError if any element is invalid
 * ```
 */
export function assertFeeTierArray(
  feeTiers: number[] | undefined,
  dexConfig: DexConfigBase | undefined,
  versionTag: VersionTag | undefined,
  errorCode = ErrorCodes.functionArgumentError,
): asserts feeTiers is FeeTier[] {
  if (!isFeeTierArray(feeTiers, dexConfig, versionTag)) {
    throw new DexError(
      `Invalid fee tier array provided: ${feeTiers}`,
      errorCode,
    )
  }
}

/**
 * Type guard to check if the `liquidityProviderFee` is a string, indicating it is used for v2.
 *
 * @param fee - The liquidity provider fee, which can be a string or an array of strings.
 * @returns A boolean indicating whether the `liquidityProviderFee` is a single string (v2).
 */
export function isLiquidityProviderFeeV2(
  fee: string | string[],
): fee is string {
  return typeof fee === 'string'
}

/**
 * Type guard to check if the `liquidityProviderFee` is an array of strings, indicating it is used for v3.
 *
 * @param fee - The liquidity provider fee, which can be a string or an array of strings.
 * @returns A boolean indicating whether the `liquidityProviderFee` is an array of strings (v3).
 */
export function isLiquidityProviderFeeV3(
  fee: string | string[],
): fee is string[] {
  return Array.isArray(fee)
}

/**
 * Type guard to check if the `liquidityProviderFeePercent` is a number, indicating it is used for v2.
 *
 * @param fee - The liquidity provider fee, which can be a number or an array of numbers.
 * @returns A boolean indicating whether the `liquidityProviderFeePercent` is a single number (v2).
 */
export function isLiquidityProviderFeePercentV2(
  fee: number | number[],
): fee is number {
  return typeof fee === 'number'
}

/**
 * Type guard to check if the `liquidityProviderFeePercent` is an array of numbers, indicating it is used for v3.
 *
 * @param fee - The liquidity provider fee, which can be a number or an array of numbers.
 * @returns A boolean indicating whether the `liquidityProviderFeePercent` is an array of numbers (v3).
 */
export function isLiquidityProviderFeePercentV3(
  fee: number | number[],
): fee is number[] {
  return Array.isArray(fee)
}

// ------------------------
// Method Names
// ------------------------

export const defaultRouterMethodMapV2: UniswapRouterV2Types.MethodNameMap = {
  WETH: 'WETH',
  addLiquidity: 'addLiquidity',
  addLiquidityETH: 'addLiquidityETH',
  factory: 'factory',
  getAmountIn: 'getAmountIn',
  getAmountOut: 'getAmountOut',
  getAmountsIn: 'getAmountsIn',
  getAmountsOut: 'getAmountsOut',
  quote: 'quote',
  removeLiquidity: 'removeLiquidity',
  removeLiquidityETH: 'removeLiquidityETH',
  removeLiquidityETHSupportingFeeOnTransferTokens:
    'removeLiquidityETHSupportingFeeOnTransferTokens',
  removeLiquidityETHWithPermit: 'removeLiquidityETHWithPermit',
  removeLiquidityETHWithPermitSupportingFeeOnTransferTokens:
    'removeLiquidityETHWithPermitSupportingFeeOnTransferTokens',
  removeLiquidityWithPermit: 'removeLiquidityWithPermit',
  swapETHForExactTokens: 'swapETHForExactTokens',
  swapExactETHForTokens: 'swapExactETHForTokens',
  swapExactETHForTokensSupportingFeeOnTransferTokens:
    'swapExactETHForTokensSupportingFeeOnTransferTokens',
  swapExactTokensForETH: 'swapExactTokensForETH',
  swapExactTokensForETHSupportingFeeOnTransferTokens:
    'swapExactTokensForETHSupportingFeeOnTransferTokens',
  swapExactTokensForTokens: 'swapExactTokensForTokens',
  swapExactTokensForTokensSupportingFeeOnTransferTokens:
    'swapExactTokensForTokensSupportingFeeOnTransferTokens',
  swapTokensForExactETH: 'swapTokensForExactETH',
  swapTokensForExactTokens: 'swapTokensForExactTokens',
} as const

export const defaultRouterMethodMapV3: UniswapRouterV3Types.MethodNameMap = {
  WETH9: 'WETH9',
  approveMax: 'approveMax',
  approveMaxMinusOne: 'approveMaxMinusOne',
  approveZeroThenMax: 'approveZeroThenMax',
  approveZeroThenMaxMinusOne: 'approveZeroThenMaxMinusOne',
  callPositionManager: 'callPositionManager',
  checkOracleSlippage: 'checkOracleSlippage',
  exactInput: 'exactInput',
  exactInputSingle: 'exactInputSingle',
  exactOutput: 'exactOutput',
  exactOutputSingle: 'exactOutputSingle',
  factory: 'factory',
  factoryV2: 'factoryV2',
  getApprovalType: 'getApprovalType',
  increaseLiquidity: 'increaseLiquidity',
  mint: 'mint',
  multicall: 'multicall',
  positionManager: 'positionManager',
  pull: 'pull',
  refundETH: 'refundETH',
  selfPermit: 'selfPermit',
  selfPermitAllowed: 'selfPermitAllowed',
  selfPermitAllowedIfNecessary: 'selfPermitAllowedIfNecessary',
  selfPermitIfNecessary: 'selfPermitIfNecessary',
  swapExactTokensForTokens: 'swapExactTokensForTokens',
  swapTokensForExactTokens: 'swapTokensForExactTokens',
  sweepToken: 'sweepToken',
  sweepTokenWithFee: 'sweepTokenWithFee',
  uniswapV3SwapCallback: 'uniswapV3SwapCallback',
  unwrapWETH9: 'unwrapWETH9',
  unwrapWETH9WithFee: 'unwrapWETH9WithFee',
  wrapETH: 'wrapETH',
} as const
