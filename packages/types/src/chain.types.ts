import type { JsonFragment } from '@ethersproject/abi'
import type { ChainId } from '@multicall-toolkit/types'

import type { DexType } from './dex.types'
import type {
  Standard1155,
  Standard20,
  Standard721,
  Standard777,
} from './standard.types'
import type { Token } from './token.types'
import type { DexCustomNetwork } from './trade.types'

/**
 * Authenticated provider types
 */
export type AuthenticatedProviderType =
  | 'infura'
  | 'infuraWSS'
  | 'alchemy'
  | 'alchemyWSS'

/**
 * Base configuration for an RPC node endpoint
 */
export type NodeConfig = {
  /** Name of the node */
  name: string
  /** RPC URL for the node */
  url: string
  /** Indicates if the URL is using WebSockets */
  isWSS?: boolean
  /** Chunk limit for the node */
  chunkLimit: number
  /** Call data limit for the node */
  callDataLimit: number
}

/**
 * Configuration for a node that requires authentication
 */
export type AuthenticatedNodeConfig = NodeConfig & {
  /**
   * Indicates this node requires an API key
   */
  requiresAuth: true
}

/**
 * Groups of node providers
 */
export type NodeProviders = {
  /**
   * Node providers that require API keys/authentication
   */
  authenticated?: Partial<
    Record<AuthenticatedProviderType, AuthenticatedNodeConfig>
  >
  /**
   * Public node providers that don't require authentication
   */
  public?: NodeConfig[]
}

/**
 * API keys for authenticated node providers
 */
export type NodeAuthConfig = Record<string, string>

/**
 * Types of chains
 * Layer 1: Independent blockchains with their own consensus (ETH, AVAX)
 * Sidechain: Sidechains that run independently but bridge to L1 (BSC, Polygon PoS)
 * Rollup: Layer 2s that inherit security from L1
 */
export type ChainType = 'layer1' | 'sidechain' | 'rollup'

/**
 * Complete configuration for a blockchain network.
 * This configuration type contains all necessary information to interact with a blockchain,
 * including network details, available nodes, supported standards, and UI-related information.
 */
export type ChainConfig = Omit<Required<DexCustomNetwork>, 'nativeCurrency'> & {
  // DexCustomNetwork overrides
  nativeCurrency: Token

  // Base
  chainId: ChainId
  chainType: ChainType
  displayName: string
  chainName: string // e.g. mainnet, testnet, holesky, etc.
  symbol: string

  logoUrl?: string
  color: string

  // Transaction
  transactionTypes: ('legacy' | 'eip2930' | 'eip1559')[]
  gasUrls: {
    name: string
    url: string
  }[]

  // UI
  blockExplorerUrls: {
    name: string
    url: string
  }[]
  bridgeUrls?: {
    name: string
    url: string
  }[]
  faucets?: {
    name: string
    url: string
  }[]

  // Market Data
  marketDataIds?: {
    coinGeckoId?: string
    coinMarketCapId?: string
  }

  // Nodes
  nodes: NodeProviders

  // Standards
  standards: {
    token20: {
      standard: Standard20
      abi: JsonFragment[]
    }
    token721: {
      standard: Standard721
      abi: JsonFragment[]
    }
    token777: {
      standard: Standard777
      abi: JsonFragment[]
    }
    token1155: {
      standard: Standard1155
      abi: JsonFragment[]
    }
  }

  // DEX
  supportedDexs: DexType[]
}
