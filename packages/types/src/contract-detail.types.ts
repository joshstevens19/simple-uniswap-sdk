import type {
  Address,
  ChainId,
  ContractDetail,
} from '@ethereum-multicall/types'
import type { JsonFragment } from '@ethersproject/abi'

import type {
  UniswapFactoryV2Types,
  UniswapFactoryV3Types,
  UniswapPairV2Types,
  UniswapQuoterV3Types,
  UniswapRouterV2Types,
  UniswapRouterV3Types,
  UniswapPositionManagerV3Types,
  UniswapPoolV3Types,
} from './abis'
import type { DexType, DexProtocol } from './dex.types'
import type { Version, VersionTag } from './version.types'

// ------------------------
// Contract Detail
// ------------------------

/**
 * Type of contract detail.
 */
export type ContractDetailType =
  | 'pair'
  | 'router'
  | 'factory'
  | 'quoter'
  | 'positionManager'

/**
 * Represents the details of a contract, including its address, ABI, and optional method mappings.
 * @template T - A mapping of method names to custom names or overrides for contract methods.
 */
export type ContractDetailUnknown<TMethods = Record<string, string>> = {
  /** The ABI of the contract. */
  abi: JsonFragment[]
  /** Optional custom method names or overrides for the contract's methods. */
  methods?: Partial<TMethods>
}

/**
 * Represents basic contract details that include the chain ID, DEX type, and DEX version.
 */
export type ContractDetailBase = {
  /** The chain ID the contract is deployed on. */
  chainId: ChainId
  /** The type of decentralized exchange (DEX) (e.g., Uniswap, Sushiswap). */
  dexType: DexType
  /** The protocol of the decentralized exchange (DEX) (e.g., V2, V3). */
  protocol: DexProtocol
}

/**
 * Represents contract details associated with a specific pair address.
 */
export type ContractDetailForAddress = ContractDetailBase & {
  /** The address of the contract. */
  address: Address
  /** The version of the dex contracts */
  version: Version
}

/**
 * Represents contract details based on the DEX type and version, including the contract type (e.g., 'pair', 'router').
 */
export type ContractDetailForDexType = ContractDetailBase & {
  /** The type of contract (e.g., 'pair', 'router', 'factory', 'quoter'). */
  contractType: ContractDetailType
  /** The version of the dex contracts */
  version: Version
}

/**
 * Context for contract details, which can either be full contract details or details based on the DEX type and version.
 */
export type ContractDetailContext = ContractDetail | ContractDetailForDexType

/**
 * Context for contract details, which can either be full contract details or details associated with a pair address.
 */
export type ContractDetailWithAddressContext =
  | ContractDetail
  | ContractDetailForAddress

// ------------------------
// Contract Details
// ------------------------

/**
 * Represents the contract details for Uniswap V2, including the router, factory, and pair contracts.
 * The generic parameters allow overriding the default method name mappings.
 */
export type ContractDetailsV2<
  TRouter = UniswapRouterV2Types.MethodNameMap,
  TFactory = UniswapFactoryV2Types.MethodNameMap,
  TPair = UniswapPairV2Types.MethodNameMap,
> = {
  /** The fee percent for the Uniswap V2 pair. */
  feePercent: number
  /** The Uniswap V2 router contract details, which can have overridden methods. */
  router: ContractDetail<TRouter>
  /** The Uniswap V2 factory contract details, which can have overridden methods. */
  factory: ContractDetail<TFactory>
  /** The Uniswap V2 pair contract details, which can have overridden methods. */
  pair: ContractDetailUnknown<TPair>
}

/**
 * Represents the contract details for Uniswap V3, including the router, factory, quoter, and position manager contracts.
 * The generic parameters allow overriding the default method name mappings.
 */
export type ContractDetailsV3<
  TRouter = UniswapRouterV3Types.MethodNameMap,
  TFactory = UniswapFactoryV3Types.MethodNameMap,
  TQuoter = UniswapQuoterV3Types.MethodNameMap,
  TPositionManager = UniswapPositionManagerV3Types.MethodNameMap,
  TPool = UniswapPoolV3Types.MethodNameMap,
> = {
  /** The fee tiers for the pool. */
  feeTiers: readonly number[]
  /** The Uniswap V3 router contract details, which can have overridden methods. */
  router: ContractDetail<TRouter>
  /** The Uniswap V3 factory contract details, which can have overridden methods. */
  factory: ContractDetail<TFactory>
  /** The Uniswap V3 quoter contract details, which can have overridden methods. */
  quoter: ContractDetail<TQuoter>
  /** The Uniswap V3 position manager contract details, which can have overridden methods. */
  positionManager: ContractDetail<TPositionManager>
  /** The Uniswap V3 pool contract details, which can have overridden methods. */
  pool: ContractDetailUnknown<TPool>
}

/**
 * Represents the protocol configurations for a DEX, supporting both V2 and V3 protocol versions.
 * Each protocol version can have multiple version-tagged contract configurations with optional custom method mappings.
 */
export type Protocols<
  TV2Router = UniswapRouterV2Types.MethodNameMap,
  TV2Factory = UniswapFactoryV2Types.MethodNameMap,
  TV2Pair = UniswapPairV2Types.MethodNameMap,
  TV3Router = UniswapRouterV3Types.MethodNameMap,
  TV3Factory = UniswapFactoryV3Types.MethodNameMap,
  TV3Quoter = UniswapQuoterV3Types.MethodNameMap,
  TV3PositionManager = UniswapPositionManagerV3Types.MethodNameMap,
  TV3Pool = UniswapPoolV3Types.MethodNameMap,
> = {
  /**
   * V2 protocol configurations mapped by version tag.
   * Each version contains contract details for router, factory, and pair contracts.
   */
  protocolV2?: Record<
    VersionTag,
    ContractDetailsV2<TV2Router, TV2Factory, TV2Pair>
  >

  /**
   * V3 protocol configurations mapped by version tag.
   * Each version contains contract details for router, factory, quoter,
   * position manager, and pool contracts.
   */
  protocolV3?: Record<
    VersionTag,
    ContractDetailsV3<
      TV3Router,
      TV3Factory,
      TV3Quoter,
      TV3PositionManager,
      TV3Pool
    >
  >
}
