import type { AuthenticatedProviderType, ChainId } from '@chain-toolkit/schemas'
import type {
  Address,
  BaseProviderContext,
  ChainIdAndProviderContext,
  EthersProviderContext,
  IMulticallProvider,
} from '@multicall-toolkit/types'
import type { Signer } from 'ethers'

import type { ChainConfig } from './chain.types'
import type {
  DexCustomNetwork,
  TradeFormat,
  TradeFormatOptions,
  TradeFormatValue,
} from './trade.types'

/** Context for a Provider when connecting to a chain with an authenticated provider */
export type DexAuthenticatedProviderContext = BaseProviderContext & {
  /** The chain ID of the network. */
  chainId: ChainId
  /** Type of provider, e.g. 'infura' */
  providerType: AuthenticatedProviderType
  /** API key for the provider */
  apiKey: string
}

/** Modified DexChainIdAndProviderContext with optional rpcUrl */
export type DexChainIdAndProviderContext = Omit<
  ChainIdAndProviderContext,
  'rpcUrl'
> & {
  /** The custom RPC URL for the chain (optional). */
  rpcUrl?: string
}

/**
 * Context for an Ethers Signer.
 * Use to enable the certain functionality of the library.
 * - Execute transactions on behalf of the user.
 * - Sign messages like permits.
 */
export type EthersSignerContext = BaseProviderContext & {
  /** The Singer instance */
  ethersSigner: Signer
}

/** DEX Provider context */
export type DexProviderContext =
  | DexChainIdAndProviderContext
  | DexAuthenticatedProviderContext
  | EthersProviderContext
  | EthersSignerContext

/** DEX provider context, which can be an IDexProvider instance or a provider context. */
export type DexMulticallProviderContext = IDexProvider | DexProviderContext

/**
 * Interface representing a DEX provider, which manages interaction with a blockchain provider.
 */
export interface IDexProvider extends IMulticallProvider {
  _chainConfig: ChainConfig | undefined

  /** Retrieves the signer with the attached provider */
  get signer(): Signer | undefined

  /** Retrieves the chain configuration for the provider. */
  get chainConfig(): ChainConfig | undefined

  /** Retrieves the custom network configuration, if any. */
  get customNetwork(): DexCustomNetwork | undefined

  /** Retrieves the name of the chain associated with the provider. */
  get chainName(): string

  /**
   * Retrieves the native coin balance for a specific wallet address.
   *
   * @param params - The parameters for retrieving the native coin balance.
   * @param params.walletAddress - The address of the wallet.
   * @param params.format - The format in which the balance value is returned.
   *
   * @returns A promise that resolves to the native coin balance as an IDexNumber.
   */
  getCoinBalance<TFormat extends TradeFormat>({
    walletAddress,
    format,
  }: {
    walletAddress: Address
    format: TradeFormatOptions<TFormat>
  }): Promise<TradeFormatValue<TFormat>>
}
