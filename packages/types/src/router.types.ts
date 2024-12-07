import type { Address } from '@multicall-toolkit/types'

import type { IDexNumber } from './dex-number.types'
import type { DexTag, DexProtocol } from './dex.types'
import type { Token } from './token.types'
import type {
  DexTransaction,
  TradeDirection,
  TradeInternalArgs,
  TradeFormat,
  TradeSettings,
} from './trade.types'
import type { Version } from './version.types'

// ------------------------
// Router Factory Args
// ------------------------

/**
 * Represents the arguments for the router, including the two tokens and optional trade settings.
 */
export type RouterSenderArgs = {
  /** The token being exchanged from. */
  fromToken: Token
  /** The token being received. */
  toToken: Token
  /** (Optional) Settings for the trade such as slippage and deadline. */
  settings?: Partial<TradeSettings>
}

/**
 * Represents the public arguments for the router using their addresses instead of token objects.
 */
export type RouterSenderPublicArgs = {
  /** The address of the token being exchanged from. */
  fromTokenAddress: Address
  /** The address of the token being received. */
  toTokenAddress: Address
  /** (Optional) Settings for the trade such as slippage and deadline. */
  settings?: Partial<TradeSettings>
}

/**
 * Represents the internal arguments for the router, combining base arguments, sender arguments, and the DEX provider.
 */
export type RouterInternalArgs<TFormat extends TradeFormat> =
  TradeInternalArgs<TFormat>

// ------------------------
// Route Quotes
// ------------------------

/**
 * Represents a quote for a route within a trade, including information about the expected converted amount, transaction details, and path tokens.
 */
export type RouteQuote = {
  /** The DEX tag representing the decentralized exchange. Undefined when wrapping/unwrapping tokens. */
  dexTag: DexTag
  /** The protocol of the DEX used for the quote. Undefined when wrapping/unwrapping tokens. */
  protocol: DexProtocol
  /** The version of the DEX used for the quote. Undefined when wrapping/unwrapping tokens. */
  version: Version
  /** The expected amount of the token after the conversion. */
  expectedConvertQuote: IDexNumber
  /** The maximum amount after applying slippage. */
  expectedConvertQuoteOrTokenAmountInMaxWithSlippage: IDexNumber
  /** The transaction details for the route quote. */
  transaction: DexTransaction
  /** The timestamp for when the trade expires. */
  tradeExpires: number
  /** The tokens involved in the route path. */
  routePathTokens: Token[]
  /** The text description of the route path. */
  routePathText: string
  /** The addresses involved in the route path. */
  routePathAddresses: Address[]
  /** The addresses of the pairs involved in the trade. */
  pairAddresses: Address[]
  /** The percentage of the liquidity provider fee. */
  liquidityProviderFeePercent: number | number[]
  /** The direction of the trade (buy/sell). */
  tradeDirection: TradeDirection
  /** The estimated gas price for the transaction, if set. Undefined if gas settings are not provided. */
  gasPriceEstimatedBy?: IDexNumber
}

/**
 * Represents a collection of route quotes, categorized by DEX tags.
 */
export type RouteQuotesByDex = {
  [key: DexTag]: RouteQuote[]
}

/**
 * Represents the context of the best route quote in a trade, including all attempted route quotes, balance, and allowance information.
 */
export type BestRouteQuoteContext = {
  /** The best route quote selected for the trade. */
  bestRouteQuote: RouteQuote
  /** All route quotes attempted for the trade, categorized by DEX. */
  attemptedRouteQuotes: RouteQuotesByDex
  /** The current allowance for the trade. */
  allowance: IDexNumber
  /** Whether the allowance is sufficient for the trade. */
  hasEnoughAllowance: boolean
  /** Whether the token has the maximum allowance */
  isMaxAllowance: boolean
  /** Whether the balance is sufficient for the trade. */
  hasEnoughBalance: boolean
  /** The balance of the token being traded from. */
  fromBalance: IDexNumber
  /** The value of the token being traded from, in a fiat or other currency. */
  fromValue?: number
  /** The balance of the token being traded to. */
  toBalance: IDexNumber
  /** The value of the token being traded to, in a fiat or other currency. */
  toValue?: number
}

/**
 * Represents the context of a route quote in a trade.
 */
export type RouteQuoteTradeContext = {
  /** The protocol of the DEX used for the trade. */
  protocol: DexProtocol
  /** The addresses involved in the route path. */
  routePathAddresses: Address[]
  /** The percentage of the liquidity provider fee. */
  liquidityProviderFeePercent: number | number[]
  /** Whether the token has a fee on transfer (used for deflationary tokens). */
  hasFeeOnTransfer?: boolean
  /**
   * The current sqrt price in Q64.96 format
   * Single-hop trades will have a single value
   * Multi-hop trades will have an array of values, one for each hop
   */
  sqrtPriceX96AfterOrList?: IDexNumber | IDexNumber[]
}

// ------------------------
// Route Paths
// ------------------------

/**
 * Represents a route path in a trade, including the tokens and pair addresses involved.
 */
export type RoutePath = {
  /** The DEX tag representing the decentralized exchange. Undefined when wrapping/unwrapping tokens. */
  dexTag: DexTag
  /** The protocol of the DEX used for the quote. Undefined when wrapping/unwrapping tokens. */
  protocol: DexProtocol
  /** The version of the DEX used for the quote. Undefined when wrapping/unwrapping tokens. */
  version: Version
  /** The tokens involved in the route. */
  route: Token[]
  /** The addresses of the pairs involved in the route. */
  pairAddresses: Address[]
  /** The percentage of the liquidity provider fee. */
  liquidityProviderFeePercent: number | number[]
}

/**
 * Represents a collection of route paths, categorized by DEX tags.
 */
export type RoutePathsByDex = Record<DexTag, RoutePath[]>

/**
 * Represents route paths for both v2 and v3 versions of a DEX.
 */
export type VersionedRoutePaths = {
  /** The route paths for v2 DEX version. */
  protocolV2: RoutePath[]
  /** The route paths for v3 DEX version. */
  protocolV3: RoutePath[]
}

/**
 * Represents a collection of versioned route paths, categorized by DEX tags.
 */
export type VersionedRoutePathsByDex = Record<DexTag, VersionedRoutePaths>

// ------------------------
// Route Pools
// ------------------------

/**
 * The available fee tiers for a pool.
 */
export type FeeTier = number

/**
 * Represents the reserves of a pool for two tokens, including the pair address.
 */
export type PoolReserve = {
  /** The address of the pair contract. */
  pairAddress: Address
  /** The reserve information for the first token in the pair. */
  token0: {
    /** The address of the first token. */
    address: Address
    /** The reserve amount for the first token. */
    reserve: IDexNumber
  }
  /** The reserve information for the second token in the pair. */
  token1: {
    /** The address of the second token. */
    address: Address
    /** The reserve amount for the second token. */
    reserve: IDexNumber
  }
}

/**
 * Represents a pool containing a paired token and its associated information.
 */
export type Pool = {
  /** The token paired with the liquidity pool. */
  pairedToken: Token
  /** The address of the pair contract. */
  pairAddress: Address
  /** The fee tier associated with the pool (if applicable). */
  fee?: FeeTier
}

/**
 * Represents a token and its available liquidity pools.
 */
export type TokenAvailablePools = {
  /** The token for which liquidity pools are available. */
  token: Token
  /** The available liquidity pools for the token. */
  pools: Pool[]
}
