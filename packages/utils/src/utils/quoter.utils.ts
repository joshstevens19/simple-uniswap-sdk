import type { UniswapQuoterV3Types } from '@dex-toolkit/types'
import { BigNumber } from 'ethers'

// ------------------------
// Type Guards
// ------------------------

/**
 * Type guard to check if an object is of type QuoteExactInputResponse
 */
export function isQuoteExactInputResponse(
  obj: any,
): obj is UniswapQuoterV3Types.QuoteExactInputResponse {
  return (
    obj &&
    'amountOut' in obj &&
    BigNumber.isBigNumber(obj.amountOut) &&
    'sqrtPriceX96AfterList' in obj &&
    Array.isArray(obj.sqrtPriceX96AfterList)
  )
}

/**
 * Type guard to check if an object is of type QuoteExactInputSingleResponse
 */
export function isQuoteExactInputSingleResponse(
  obj: any,
): obj is UniswapQuoterV3Types.QuoteExactInputSingleResponse {
  return (
    obj &&
    'amountOut' in obj &&
    BigNumber.isBigNumber(obj.amountOut) &&
    'sqrtPriceX96After' in obj &&
    BigNumber.isBigNumber(obj.sqrtPriceX96After)
  )
}

/**
 * Type guard to check if an object is of type QuoteExactOutputResponse
 */
export function isQuoteExactOutputResponse(
  obj: any,
): obj is UniswapQuoterV3Types.QuoteExactOutputResponse {
  return (
    obj &&
    'amountIn' in obj &&
    BigNumber.isBigNumber(obj.amountIn) &&
    'sqrtPriceX96AfterList' in obj &&
    Array.isArray(obj.sqrtPriceX96AfterList)
  )
}

/**
 * Type guard to check if an object is of type QuoteExactOutputSingleResponse
 */
export function isQuoteExactOutputSingleResponse(
  obj: any,
): obj is UniswapQuoterV3Types.QuoteExactOutputSingleResponse {
  return (
    obj &&
    'amountIn' in obj &&
    BigNumber.isBigNumber(obj.amountIn) &&
    'sqrtPriceX96After' in obj &&
    BigNumber.isBigNumber(obj.sqrtPriceX96After)
  )
}

// ------------------------
// Method Names
// ------------------------

export const defaultQuoterMethodMapV3: UniswapQuoterV3Types.MethodNameMap = {
  WETH9: 'WETH9',
  factory: 'factory',
  quoteExactInput: 'quoteExactInput',
  quoteExactInputSingle: 'quoteExactInputSingle',
  quoteExactOutput: 'quoteExactOutput',
  quoteExactOutputSingle: 'quoteExactOutputSingle',
  uniswapV3SwapCallback: 'uniswapV3SwapCallback',
} as const
