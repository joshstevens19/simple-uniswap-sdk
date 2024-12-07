import type { ChainId } from '@ethereum-multicall/types'

import {
  type AllChainId,
  allChains,
  dexChains,
  dexTestChains,
} from './chainIds'
import { DexError, ErrorCodes } from '../errors'

/**
 * Chain ID type guards
 */

export const isAllChainId = (value: any): value is AllChainId => {
  return allChains.includes(value as AllChainId)
}

export const isDexChainId = (value: any): value is AllChainId => {
  return dexChains.includes(value as AllChainId)
}

export const isDexTestChainId = (value: any): value is AllChainId => {
  return dexTestChains.includes(value as AllChainId)
}

export const isChainId = (value: any): value is AllChainId => {
  return typeof value === 'number' && Number.isInteger(value) && value > 0
}

/**
 * Asserts that the provided value is a valid `ChainId`.
 *
 * @param value - The value to check.
 * @param errorCode - Optional error code to throw if assertion fails.
 * @throws `DexError` if the value is undefined or not a valid `ChainId`.
 */
export function assertChainId(
  value: any,
  errorCode = ErrorCodes.functionArgumentError,
): asserts value is ChainId {
  if (value === undefined || value === null) {
    throw new DexError('Must provide chainId', errorCode)
  }

  if (isChainId(isChainId)) {
    throw new DexError('Invalid fee tier provided', errorCode)
  }
}
