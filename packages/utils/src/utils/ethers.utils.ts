import type { EthersProvider } from '@ethereum-multicall/types'
import {
  type ExternalProvider,
  JsonRpcProvider,
  Web3Provider,
  Provider,
} from '@ethersproject/providers'
import { BigNumber, type BigNumberish, type BytesLike } from 'ethers'
import { isBytesLike, isHexString, toUtf8String } from 'ethers/lib/utils'

/**
 * Decodes a hex string to a UTF-8 string using ethers.js.
 * @param value - The hex string to decode.
 * @returns The decoded UTF-8 string.
 */
export function decodeHexString(value?: string): string {
  if (!value || !value.startsWith('0x')) {
    return value || ''
  }
  return toUtf8String(value)
}

/**
 * Decodes a hex string to a numeric string using BigNumber.js.
 * @param value - The hex string to decode.
 * @returns The numeric string representation of the hex value.
 */
export function decodeHexToNumber(value?: string): string {
  if (!value || !value.startsWith('0x')) {
    return value || '0'
  }
  return BigNumber.from(value).toString()
}

// ------------------------
// Type Guards
// ------------------------

/**
 * Determines whether the provided value is a BigNumber object representation, not a BigNumber instance.
 * Useful for checking a value coming back from an external API.
 *
 * @param obj - The value to check.
 * @returns True if the value is a BigNumber object, otherwise false.
 */
export function isBigNumberObject(obj: any): boolean {
  return obj?.type === 'BigNumber' && isHexString(obj?.hex)
}

/**
 * Type guard to check if the value is an array of `BytesLike`.
 * @param value - The value to check.
 * @returns A boolean indicating whether the value is an array of `BytesLike`.
 */
export function isArrayOfBytesLike(value: any): value is BytesLike[] {
  return Array.isArray(value) && value.every(isBytesLike)
}

/**
 * Type guard to check if the value is a `BigNumberish`.
 * @param value - The value to check.
 * @returns A boolean indicating whether the value is a `BigNumberish`.
 */
export function isBigNumberish(value: any): value is BigNumberish {
  return (
    BigNumber.isBigNumber(value) ||
    typeof value === 'string' ||
    typeof value === 'number' ||
    typeof value === 'bigint' ||
    isBytesLike(value)
  )
}

/**
 * Type guard to check if the value is an array of `BigNumberish`.
 * @param value - The value to check.
 * @returns A boolean indicating whether the value is an array of `BigNumberish`.
 */
export function isArrayOfBigNumberish(value: any): value is BigNumberish[] {
  return (
    Array.isArray(value) &&
    value.every(
      (v) =>
        typeof v === 'string' ||
        typeof v === 'number' ||
        v instanceof Uint8Array ||
        v instanceof BigInt,
    )
  )
}

/**
 * Checks if the provided object is an instance of `Provider`.
 *
 * @param provider - The object to check.
 * @returns True if the object is a `Provider`, otherwise false.
 */
export function isProvider(provider: any): provider is Provider {
  return provider instanceof Provider && provider?._isProvider
}

/**
 * Checks if the provided `EthersProvider` is an instance of `JsonRpcProvider`.
 *
 * @param provider - The provider to check.
 * @returns True if the provider is a `JsonRpcProvider`, otherwise false.
 */
export function isJsonRpcProvider(
  provider: EthersProvider,
): provider is JsonRpcProvider {
  return provider instanceof JsonRpcProvider && 'connection' in provider
}

/**
 * Checks if the provided `EthersProvider` is an instance of `Web3Provider`.
 *
 * @param provider - The provider to check.
 * @returns True if the provider is a `Web3Provider`, otherwise false.
 */
export function isWeb3Provider(
  provider: EthersProvider,
): provider is Web3Provider {
  return provider instanceof Web3Provider && 'provider' in provider
}

/**
 * Checks if the provided object is an `ExternalProvider`.
 *
 * @param provider - The object to check.
 * @returns True if the object is an `ExternalProvider`, otherwise false.
 */
export function isExternalProvider(
  provider: any,
): provider is ExternalProvider {
  return (
    typeof provider === 'object' &&
    'host' in provider &&
    !('_isProvider' in provider)
  )
}
