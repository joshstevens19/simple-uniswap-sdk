import type {
  DexCustomNetwork,
  IDexProvider,
  NativeCurrencyInfo,
  Token,
  WrappedTypes,
} from '@dex-toolkit/types'

import {
  isSameAddress,
  transformWrappedAddressToCoinAddress,
} from './address.utils'
import { getChainConfig } from '../chains/chainConfigs'
import { dexChains } from '../chains/chainIds'
import { DexError } from '../errors/dex-error'
import { ErrorCodes } from '../errors/error-codes'

/**
 * Transforms a wrapped token into its coin representation by modifying its contract address and optionally
 * updating its symbol and name to match the native currency info.
 *
 * @param token - The wrapped token to transform.
 * @param nativeCurrencyInfo - Optional native currency information to use for updating the token's symbol and name.
 * @returns A new token object representing the coin.
 * @throws DexError if the token's chain ID is not natively supported or if the native currency cannot be found.
 */
export const transformWrappedTokenToCoin = (
  token: Token,
  nativeCurrencyInfo?: NativeCurrencyInfo,
): Token => {
  if (!token) {
    throw new DexError('token is required', ErrorCodes.functionArgumentError)
  }

  const clone = structuredClone(token)

  clone.contractAddress = transformWrappedAddressToCoinAddress(
    token.contractAddress,
  )

  if (nativeCurrencyInfo) {
    clone.symbol = nativeCurrencyInfo.symbol
    clone.name = nativeCurrencyInfo.name
  } else {
    if (!dexChains.includes(token.chainId)) {
      throw new DexError(
        `ChainId ${token.chainId} is not natively supported, provide a custom network.`,
        ErrorCodes.nativeCoinMissingForChainId,
      )
    }

    const nativeCoin = getChainConfig(token.chainId).nativeCurrency

    if (!nativeCoin) {
      throw new DexError(
        `Could not find native currency for chain id ${token.chainId}`,
        ErrorCodes.nativeCoinMissingForChainId,
      )
    }

    clone.symbol = nativeCoin.symbol
    clone.name = nativeCoin.name
  }

  return clone
}

/**
 * Determines whether a token swap operation involves wrapping a coin into its native wrapped token.
 *
 * @param params - The parameters required to determine if a token swap involves wrapping a coin.
 * @param params.fromToken - The token being swapped from, expected to be the native coin.
 * @param params.toToken - The token being swapped to, expected to be the wrapped version of the native coin.
 * @param params.dexProvider - The dex provider instance, used to retrieve the network and chain ID.
 * @param params.customNetwork - Optional custom network configuration to override the default network settings.
 *
 * @returns `true` if the swap is a wrapping operation (native coin to wrapped token), otherwise `false`.
 *
 * @throws If the native currency or wrapped token information is missing for the specified chain ID.
 */
export function isWrappingCoin({
  fromToken,
  toToken,
  dexProvider,
  customNetwork,
}: {
  fromToken: Token
  toToken: Token
  dexProvider: IDexProvider
  customNetwork?: DexCustomNetwork
}): boolean {
  const { chainId } = dexProvider.network
  const chainConfig = getChainConfig(chainId)

  const nativeCurrencyInfo =
    customNetwork?.nativeCurrency ?? chainConfig?.nativeCurrency

  if (!nativeCurrencyInfo) {
    throw new DexError(
      `No native currency info for chainId ${chainId}`,
      ErrorCodes.chainIdNotSupported,
    )
  }

  const nativeWrappedTokenInfo =
    customNetwork?.nativeWrappedTokenInfo ?? chainConfig?.nativeWrappedTokenInfo

  if (!nativeWrappedTokenInfo) {
    throw new DexError(
      `No native wrapped token info for chainId ${chainId}`,
      ErrorCodes.chainIdNotSupported,
    )
  }

  const coin = transformWrappedTokenToCoin(
    nativeWrappedTokenInfo,
    nativeCurrencyInfo,
  )

  const isFromCoin = isSameAddress(
    fromToken.contractAddress,
    coin.contractAddress,
  )
  const isToWrapped = isSameAddress(
    toToken.contractAddress,
    nativeWrappedTokenInfo.contractAddress,
  )

  return isFromCoin && isToWrapped
}

/**
 * Determines whether a token swap operation involves unwrapping a native wrapped token into its native coin.
 *
 * @param params - The parameters required to determine if a token swap involves unwrapping a native wrapped token.
 * @param params.fromToken - The token being swapped from, expected to be the wrapped version of the native coin.
 * @param params.toToken - The token being swapped to, expected to be the native coin.
 * @param params.dexProvider - The dex provider instance, used to retrieve the network and chain ID.
 * @param params.customNetwork - Optional custom network configuration to override the default network settings.
 *
 * @returns `true` if the swap is an unwrapping operation (wrapped token to native coin), otherwise `false`.
 *
 * @throws If the native currency or wrapped token information is missing for the specified chain ID.
 */
export function isUnwrappingCoin({
  fromToken,
  toToken,
  dexProvider,
  customNetwork,
}: {
  fromToken: Token
  toToken: Token
  dexProvider: IDexProvider
  customNetwork?: DexCustomNetwork
}): boolean {
  const { chainId } = dexProvider.network
  const chainConfig = getChainConfig(chainId)

  const nativeCurrencyInfo =
    customNetwork?.nativeCurrency ?? chainConfig?.nativeCurrency

  if (!nativeCurrencyInfo) {
    throw new DexError(
      `No native currency info for chainId ${chainId}`,
      ErrorCodes.chainIdNotSupported,
    )
  }

  const nativeWrappedTokenInfo =
    customNetwork?.nativeWrappedTokenInfo ?? chainConfig?.nativeWrappedTokenInfo

  if (!nativeWrappedTokenInfo) {
    throw new DexError(
      `No native wrapped token info for chainId ${chainId}`,
      ErrorCodes.chainIdNotSupported,
    )
  }

  const coin = transformWrappedTokenToCoin(
    nativeWrappedTokenInfo,
    nativeCurrencyInfo,
  )

  const isFromWrapped = isSameAddress(
    fromToken.contractAddress,
    nativeWrappedTokenInfo.contractAddress,
  )
  const isToCoin = isSameAddress(toToken.contractAddress, coin.contractAddress)

  return isFromWrapped && isToCoin
}

/**
 * Determines whether a token swap operation involves wrapping or unwrapping a coin into its native wrapped token.
 *
 * @param params - The parameters required to determine if a token swap involves wrapping or unwrapping a coin.
 * @param params.fromToken - The token being swapped from, expected to be the native coin.
 * @param params.toToken - The token being swapped to, expected to be the wrapped version of the native coin.
 * @param params.dexProvider - The dex provider instance, used to retrieve the network and chain ID.
 * @param params.customNetwork - Optional custom network configuration to override the default network settings.
 *
 * @returns `true` if the swap is a wrapping or unwrapping operation (native coin to wrapped token or wrapped token to native coin), otherwise `false`.
 *
 * @throws If the native currency or wrapped token information is missing for the specified chain ID.
 */
export function isWrappingOrUnwrappingCoin({
  fromToken,
  toToken,
  dexProvider,
  customNetwork,
}: {
  fromToken: Token
  toToken: Token
  dexProvider: IDexProvider
  customNetwork?: DexCustomNetwork
}): boolean {
  return (
    isUnwrappingCoin({
      fromToken,
      toToken,
      dexProvider,
      customNetwork,
    }) ||
    isWrappingCoin({
      fromToken,
      toToken,
      dexProvider,
      customNetwork,
    })
  )
}

// ------------------------
// Method Names
// ------------------------

/**
 * Default method map for wrapped tokens.
 */
export const defaultWrappedMethodMap: WrappedTypes.MethodNameMap = {
  name: 'name',
  approve: 'approve',
  totalSupply: 'totalSupply',
  transferFrom: 'transferFrom',
  withdraw: 'withdraw',
  decimals: 'decimals',
  balanceOf: 'balanceOf',
  symbol: 'symbol',
  transfer: 'transfer',
  deposit: 'deposit',
  allowance: 'allowance',
} as const
