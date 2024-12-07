import type {
  IDexProvider,
  DexChainIdAndProviderContext,
  DexAuthenticatedProviderContext,
} from '@dex-toolkit/types'
import type { EthersProviderContext } from '@ethereum-multicall/types'

// ------------------------
// Type Guards
// ------------------------

/**
 * Checks if the provided context is a `DexAuthenticatedProviderContext`.
 *
 * @param context - The context to check.
 * @returns True if the context is a `DexAuthenticatedProviderContext`, otherwise false.
 */
export function isDexAuthenticatedProviderContext(
  context: any,
): context is DexAuthenticatedProviderContext {
  return (
    context !== null &&
    typeof context === 'object' &&
    'chainId' in context &&
    context.chainId !== undefined &&
    'providerType' in context &&
    context.providerType !== undefined &&
    'apiKey' in context &&
    context.apiKey !== undefined
  )
}

/**
 * Checks if the provider context is a `EthersProviderContext`.
 *
 * @param context - The context to check.
 * @returns True if the context is a `EthersProviderContext`, otherwise false.
 */
export function isEthersSignerContext(
  context: any,
): context is EthersProviderContext {
  return 'ethersProvider' in context && context.ethersProvider !== undefined
}

/**
 * Checks if the provided context is a `DexChainIdAndProviderContext`.
 *
 * @param context - The context to check.
 * @returns True if the context is a `DexChainIdAndProviderContext`, otherwise false.
 */
export function isDexChainIdAndProviderContext(
  context: any,
): context is DexChainIdAndProviderContext {
  return 'chainId' in context && context.chainId !== undefined
}

/**
 * Checks if the provided context is an `EthersProviderContext`.
 *
 * @param context - The context to check.
 * @returns True if the context is an `EthersProviderContext`, otherwise false.
 */
export function isEthersProviderContext(
  context: any,
): context is EthersProviderContext {
  return 'ethersProvider' in context && context.ethersProvider !== undefined
}

/**
 * Checks if the provided object is an instance of `IDexProvider`.
 *
 * @param provider - The object to check.
 * @returns True if the object is a `IDexProvider`, otherwise false.
 */
export function isDexProvider(provider: any): provider is IDexProvider {
  return 'getCoinBalance' in provider && 'getContract' in provider
}
