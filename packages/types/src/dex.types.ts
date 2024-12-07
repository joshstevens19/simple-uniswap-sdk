import type { Address, ChainId } from '@multicall-toolkit/types'

import type { Protocols } from './contract-detail.types'
import type { DexMulticallProviderContext } from './dex-provider.types'
import type { MultiPriceContext } from './price-source.types'
import type { TokenListContext } from './token-list.types'
import type { TradeFormat, TradeFormatOptions } from './trade.types'
import type { Version } from './version.types'

/** Represents the types of decentralized exchanges (DEX) supported. */
export type DexType =
  | 'DOVESWAP'
  | 'ENERGISWAP'
  | 'PANCAKESWAP'
  | 'PANGOLIN'
  | 'PULSEX'
  | 'QUICKSWAP'
  | 'SUSHISWAP'
  | 'TRADERJOE'
  | 'UNISWAP'
  | 'YETISWAP'

/** Represents the type for custom DEX configurations. */
export type CustomDexType = DexType | 'CUSTOM'

/** Represents a tag used to identify DEX instances, which can be a standard DEX or a custom string. */
export type DexTag = DexType | string

/** Represents the version of the DEX, such as v2 or v3. */
export type DexProtocol = 'protocolV2' | 'protocolV3'

/** Represents a key for a DEX configuration. */
export type DexKey = {
  /**
   * A tag or identifier for the specific DEX configuration.
   */
  dexTag: DexTag
  /**
   * The protocol of the DEX (e.g., 'protocolV2', 'protocolV3').
   */
  protocol: DexProtocol
  /**
   * The dex version.
   */
  version: Version
}

/** Represents the base configuration for a DEX. */
export type DexConfigBase = {
  /** The type of the DEX. */
  dexType: DexType
  /** Multi-contract details used for interacting with the DEX. */
  protocols: Protocols
  /** The tag used to identify the DEX instance. */
  dexTag: DexTag
}

/** A mapping of DEX tags to their respective configurations. */
export type DexConfigsByDex = Record<DexTag, DexConfigBase>

/** Represents the configuration of a DEX for a specific chain. */
export type DexChainConfig = {
  /** The type of the DEX. */
  dexType: DexType
  /** The chain ID of the network the DEX is operating on. */
  chainId: ChainId
}

/** Represents the context for a DEX and its associated chain configurations. */
export type DexChainContext = DexChainConfig | DexChainConfig[]

/** Represents the context for one or more DEX configurations. */
export type DexConfigContext = DexConfigBase | DexConfigBase[]

/** Represents the base context for a DEX configuration. */
export type DexConfigBaseContext =
  | {
      /** The type of the DEX. */
      dexType: DexType
      /** Multi-contract details used for interacting with the DEX. */
      protocols: Protocols
      /**
       * Optional tag to identify the DEX.
       * If not provided, it will use the `dexType`.
       */
      dexTag?: DexTag
    }
  | {
      /** Represents a custom DEX type. */
      dexType: 'CUSTOM'
      /** Multi-contract details used for interacting with the custom DEX. */
      protocols: Protocols
      /** The tag used to identify the custom DEX. */
      dexTag: DexTag
    }

/** Represents the overall context of a DEX, including its type and configuration. */
export type DexContext =
  | DexType
  | DexConfigBaseContext
  | (DexType | DexConfigBaseContext)[]

/** Represents the full configuration for a DEX. */
export type DexConfig = DexConfigBase & {
  /** The title or name of the DEX. */
  title: string
  /** The chain ID of the network the DEX operates on. */
  chainId: ChainId
  /** Optional logo URL for the DEX. */
  logoUrl?: string
  /** Optional color for branding the DEX. */
  color?: string
  /** Default input/output token pairs used on the DEX. */
  defaultPairs?: {
    /** The address of the input token. */
    inputAddress: Address
    /** The address of the output token. */
    outputAddress: Address
  }
}

// ------------------------
// Dex Settings
// ------------------------

/**
 * Settings related to gas for the trade.
 */
export type GasSettings = {
  /** Must return the gas price in GWEI. */
  getGasPrice: () => Promise<string>
}

export type ProtocolSettings = {
  [keyof in DexProtocol]?: {
    enabled: boolean
    includeVersions?: Version[]
    excludeVersions?: Version[]
  }
}

/**
 * Configuration settings for DEX operations.
 */
export type DexSettings = {
  /**
   * The address that will receive the output tokens or LP tokens.
   * If not provided, the default is to send the output tokens to the address initiating the swap.
   *
   * @default ''
   */
  recipient: Address
  /**
   * Slippage tolerance in percentage, e.g., 0.005 represents 0.5% slippage.
   *
   * @default 0.005
   */
  slippage: number
  /**
   * The number of minutes before the transaction expires.
   *
   * @default 20
   */
  deadlineMinutes: number
  /**
   * Disable multihops, forcing direct routes.
   *
   * @default false
   */
  disableMultihops: boolean
  /**
   * Prevent the built-in block listener from observing changes.
   *
   * @default false
   */
  disableObserver: boolean
  /**
   * Number of blocks to skip between each quote, reducing the number of calls to the node.
   *
   * @default 0
   */
  observerBlockSkip: number
  /**
   * Filter to choose which DEX versions to use. Defaults to all.
   *
   * @default All protocols of targeted DEXs
   */
  protocolSettings: ProtocolSettings
  /**
   * Gas price settings, where the `getGasPrice` function returns the gas price in GWEI.
   *
   * @default undefined
   */
  gasSettings?: GasSettings
  /**
   * Whether to approve the the maximum token amount, or the exact token amount.
   *
   * @default true
   */
  approveMax?: boolean
  /**
   * Multiplier for the token approval amount to add a buffer.
   * Only applies when `approveMax` is false.
   * For example, a value of 1.05 represents a 5% buffer.
   *
   * @default 1.05
   */
  approvalBufferFactor?: number
}

// ------------------------
// Dex Factory Args
// ------------------------

/**
 * Represents the base arguments required for the DexFactory.
 */
export type DexFactoryBaseArgs<TFormat extends TradeFormat = 'readable'> = {
  /** The wallet address of the user initiating the liquidity operation. */
  walletAddress: Address
  /** The context of the DEX (Decentralized Exchange) where the operation is performed. */
  dexContext: DexContext
  /** (Optional) The price context for multiple tokens. */
  multiPriceContext?: MultiPriceContext
  /** (Optional) The context of the token list to be used. Provide an empty array to disable the token list. */
  tokenListContext?: TokenListContext
  /**
   * The format in which the liquidity context's number values will be returned.
   * Defaults to { type: `readable`, options: { locales: 'en' }}
   *
   * - `'readable'`: Returns a human-readable string with grouping (thousands separators) and specified decimal places (e.g., "1,234.567").
   * - `'decimal'`: Outputs a precise decimal string representation without grouping, maintaining the decimal places specified (e.g., "1234.567").
   * - `'wei'`: Outputs the value in its smallest unit, suitable for precise blockchain interactions (e.g., "1000000000000000000" for 1 Ether).
   * - `'hex'`: Returns a hexadecimal string representation, useful for encoding values in blockchain transactions (e.g., "0x158e460913d000000000").
   * - `'dexnumber'`: Returns the current instance as a `DexNumber` object.
   * - `'bignumber'`: Returns an instance of `BigNumber` from `bignumber.js`.
   * - `'ethers'`: Returns a `BigNumber` instance from `ethers.js`.
   * - `'bigint'`: Converts and returns the value as a native JavaScript `BigInt`.
   */
  format?: TradeFormatOptions<TFormat>
}

/**
 * Public arguments used to initialize a Dex Factory.
 */
export type DexArgs<TFormat extends TradeFormat = 'readable'> =
  DexFactoryBaseArgs<TFormat> & { providerContext: DexMulticallProviderContext }
