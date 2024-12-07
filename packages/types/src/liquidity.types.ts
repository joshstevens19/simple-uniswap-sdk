import type { Address } from '@multicall-toolkit/types'
import type { ContractReceipt } from 'ethers'
import type { Observable, Subject } from 'rxjs'

import type { IDexProvider } from './dex-provider.types'
import type {
  DexFactoryBaseArgs,
  DexSettings,
  DexTag,
  DexProtocol,
  DexKey,
} from './dex.types'
import type { FeeTier } from './router.types'
import type { Token } from './token.types'
import type {
  DexTransaction,
  TradeFormat,
  TradeFormatValue,
} from './trade.types'
import type { Version } from './version.types'

// ------------------------
// General
// ------------------------

/**
 * Represents the direction of a liquidity operation, which can either be adding or removing liquidity.
 *
 * @example
 * 'add' for adding liquidity.
 * 'remove' for removing liquidity.
 */
export type LiquidityDirection = 'add' | 'remove'

/**
 * Represents a price range for a V3 liquidity operation, defined by the lower and upper ticks.
 */
export type LiquidityPriceRange = {
  /** The lower tick of the price range. */
  tickLower: number
  /** The upper tick of the price range. */
  tickUpper: number
}

/**
 * Represents the prices between two tokens in a liquidity pool.
 */
export type LiquidityPrices<TFormat extends TradeFormat> = {
  /** The price of Token A per Token B. */
  aTokenPerBToken: TradeFormatValue<TFormat>
  /** The price of Token B per Token A. */
  bTokenPerAToken: TradeFormatValue<TFormat>
}

/**
 * Represents liquidity pool (LP) token information for a V2 liquidity pool.
 * This is an alias for `LiquidityTokenInfo`, parameterized by the trade format type.
 */
export type LPTokenInfoV2<TFormat extends TradeFormat> =
  LiquidityTokenInfo<TFormat> & {
    /** The total supply of the LP token. */
    totalSupply: TradeFormatValue<TFormat>
  }

/**
 * Represents liquidity pool (LP) token information for a V3 liquidity pool.
 */
export type LPTokenInfoV3<TFormat extends TradeFormat> = {
  /** The unique identifier of the liquidity pool token. */
  tokenId: string
  /** The total supply of the LP token. */
  totalSupply: TradeFormatValue<TFormat>
  /** The targeted fee tier */
  feeTier: FeeTier
  /** The price range of the liquidity pool. */
  priceRange: LiquidityPriceRange
  /** The amount of the tokens to be removed. */
  amount?: TradeFormatValue<TFormat>
}

/**
 * Represents liquidity pool (LP) token information for both V2 and V3 liquidity pools.
 * It is a union type of `LPTokenInfoV2` and `LPTokenInfoV3`.
 */
export type LPTokenInfo<TFormat extends TradeFormat> =
  | LPTokenInfoV2<TFormat>
  | LPTokenInfoV3<TFormat>

// ------------------------
// Liquidity Factory Args
// ------------------------

/**
 * Represents the arguments for sending liquidity tokens, including the two tokens and optional liquidity settings.
 */
export type LiquiditySenderArgs = {
  /** The first token involved in the liquidity operation. */
  tokenA: Token
  /** The second token involved in the liquidity operation. */
  tokenB: Token
  /** (Optional) Partial liquidity settings for customizing the operation. */
  settings?: Partial<LiquiditySettings>
}

/**
 * Represents the public arguments for sending liquidity tokens using their addresses instead of token objects.
 */
export type LiquiditySenderPublicArgs = {
  /** The address of the first token involved in the liquidity operation. */
  tokenAAddress: Address
  /** The address of the second token involved in the liquidity operation. */
  tokenBAddress: Address
  /** (Optional) Partial liquidity settings for customizing the operation. */
  settings?: Partial<LiquiditySettings>
}

/**
 * Represents the internal arguments for the Liquidity, combining base arguments, sender arguments, and the DEX provider.
 */
export type LiquidityInternalArgs<TFormat extends TradeFormat> =
  DexFactoryBaseArgs<TFormat> &
    LiquiditySenderArgs & {
      /** The provider for the DEX where the liquidity operation is performed. */
      dexProvider: IDexProvider
    }

// ------------------------
// Liquidity Settings
// ------------------------

/**
 * Trade settings for customizing the behavior of a trade for V3.
 * Extends the base {@link DexSettings} with additional trade-specific options.
 */
export type LiquiditySettingsV3 = {
  /**
   * When `true`, enables the use of a price limit during the trade.
   * A price limit helps protect against unfavorable price movements during trade execution.
   *
   * @default false
   */
  enablePriceLimit?: boolean

  /**
   * When `true`, enables the use of a price limit during the trade.
   * A price limit helps protect against unfavorable price movements during trade execution.
   *
   * @default undefined
   */
  priceRange?: LiquidityPriceRange

  /**
   * The fee tier for the trade.
   *
   * @default undefined
   */
  feeTier?: FeeTier
}

/**
 * Settings for liquidity operations.
 */
export type LiquiditySettings = DexSettings & LiquiditySettingsV3

// ------------------------
// Liquidity Params
// ------------------------

/** Base parameters for adding liquidity to a DEX pool. */
export type AddLiquidityParamsBase<TFormat extends TradeFormat> = DexKey & {
  /**
   * The amount of the token to be added to the liquidity pool.
   */
  tokenAAmount?: TradeFormatValue<TFormat>
  /**
   * The amount of the token to be added to the liquidity pool.
   */
  tokenBAmount?: TradeFormatValue<TFormat>
}

/** Parameters for adding liquidity to a v2 DEX pool. */
export type AddLiquidityParamsV2<TFormat extends TradeFormat> =
  AddLiquidityParamsBase<TFormat> & {
    /** The protocol of the DEX */
    protocol: 'protocolV2'
  }

/** Parameters for adding liquidity to a v3 DEX pool. */
export type AddLiquidityParamsV3<TFormat extends TradeFormat> =
  AddLiquidityParamsBase<TFormat> & {
    /** The protocol of the DEX */
    protocol: 'protocolV3'
    /**
     * The fee tier for the Uniswap V3 pool.
     * This determines the fee charged on trades in the pool.
     */
    feeTier: FeeTier

    /**
     * The price range for the liquidity position.
     * This includes the lower and upper bounds for the price of the pair.
     */
    priceRange: LiquidityPriceRange

    /**
     * Optional ID of the LP token that represents an existing liquidity position.
     * If not provided, extra calls may be made to fetch or create this token.
     */
    lpTokenId?: string
  }

/** Parameters for adding liquidity, either for v2 or v3 DEX pools. */
export type AddLiquidityParams<TFormat extends TradeFormat> =
  | AddLiquidityParamsV2<TFormat>
  | AddLiquidityParamsV3<TFormat>

/** Parameters for a permit when removing liquidity for v2 */
export type RemoveLiquidityPermit = {
  /** Whether to approve the maximum amount of liquidity. */
  approveMax: boolean
  /** The permit signature data for the off-chain approval. */
  permitData: {
    /** The recovery ID for the permit signature. */
    v: number
    /** The `r` value of the permit signature. */
    r: string
    /** The `s` value of the permit signature. */
    s: string
  }
}

/** Options for a permit when removing liquidity for v2 */
export type RemoveLiquidityPermitOptions =
  /**
   * If true, the library will handle permit signature generation internally.
   * Must have passed a `Signer` into the DexFactory constructors `providerContext`.
   * If you want to approve max, set `approveMax` in the `LiquiditySettings`.
   */
  | boolean
  /** Manually apply the permit */
  | RemoveLiquidityPermit

/** Parameters for removing liquidity from a v2 DEX pool. */
export type RemoveLiquidityParamsV2<TFormat extends TradeFormat> = DexKey & {
  /** The protocol of the DEX */
  protocol: 'protocolV2'
  /** The amount of LP tokens to remove from the liquidity pool. */
  lpTokenAmount?: TradeFormatValue<TFormat>
  /** The minimum amount of token A that the user is willing to accept when removing liquidity. */
  minTokenAAmount?: TradeFormatValue<TFormat>
  /** The minimum amount of token B that the user is willing to accept when removing liquidity. */
  minTokenBAmount?: TradeFormatValue<TFormat>
  /** Optional permit data for approving the transaction off-chain. */
  permit?: RemoveLiquidityPermitOptions
  /**
   * Flag to indicate if fee-on-transfer tokens are supported.
   * Fee-on-transfer tokens incur a small fee when transferred.
   */
  supportFeeOnTransferTokens?: boolean
}

/** Parameters for removing liquidity from a v3 DEX pool. */
export type RemoveLiquidityParamsV3<TFormat extends TradeFormat> = DexKey & {
  /** The protocol of the DEX */
  protocol: 'protocolV3'
  /** The ID of the LP token that represents the liquidity position in the pool. */
  lpTokenId?: string
  /** The amount of liquidity to remove from the position. */
  liquidityAmount?: TradeFormatValue<TFormat>
  /** The minimum amount of token A that the user is willing to accept when removing liquidity. */
  minTokenAAmount?: TradeFormatValue<TFormat>
  /** The minimum amount of token B that the user is willing to accept when removing liquidity. */
  minTokenBAmount?: TradeFormatValue<TFormat>
}

/** Parameters for removing liquidity, either from a v2 or v3 DEX pool. */
export type RemoveLiquidityParams<TFormat extends TradeFormat> =
  | RemoveLiquidityParamsV2<TFormat>
  | RemoveLiquidityParamsV3<TFormat>

// ------------------------
// Liquidity Context
// ------------------------

/**
 * Represents information about a token involved in a liquidity operation.
 */
export type LiquidityTokenInfo<TFormat extends TradeFormat> = {
  /** The token involved in the liquidity operation. */
  token: Token
  /** The amount of the token to be added or removed. */
  amount?: TradeFormatValue<TFormat>
  /** The current balance of the token in the user's wallet, formatted according to the specified trade format. */
  balance: TradeFormatValue<TFormat>
  /** The current allowance granted to the router contract for this token, formatted according to the specified trade format. */
  allowance: TradeFormatValue<TFormat>
  /** Indicates whether the user has enough balance for the operation. */
  hasEnoughBalance?: boolean
  /** Indicates whether the user has granted enough allowance for the operation. */
  hasEnoughAllowance?: boolean
  /** Whether the token has the maximum allowance */
  isMaxAllowance: boolean
  /** Indicates whether the token is a native coin (e.g., ETH). */
  isCoin: boolean
  /** Value of the token in currency, e.g., USD or EUR */
  value?: number
}

/**
 * Represents the context of a liquidity operation, containing various details about the process,
 * including the DEX tag, version, liquidity direction, and other relevant information.
 */
export type LiquidityContext<TFormat extends TradeFormat> = {
  /** The unique ID for the context */
  id: string
  /** The tag of the decentralized exchange (DEX) being used. */
  dexTag: DexTag
  /** The protocol of the DEX being used. */
  protocol: DexProtocol
  /** The version of the DEX used for liquidity.  */
  version: Version
  /** The direction of the liquidity operation (add or remove). */
  liquidityDirection: LiquidityDirection
  /** Information about the first token in the liquidity pair. */
  tokenAInfo: LiquidityTokenInfo<TFormat>
  /** Information about the second token in the liquidity pair. */
  tokenBInfo: LiquidityTokenInfo<TFormat>
  /** Information about the liquidity pool (LP) token. */
  lpTokenInfo?: LPTokenInfo<TFormat>
  /** The current share of the pool. */
  shareOfPool: TradeFormatValue<TFormat>
  /** The expected share of the pool after the liquidity operation. */
  expectedShareOfPool: TradeFormatValue<TFormat>
  /** The slippage tolerance for the liquidity operation, expressed as a decimal (e.g., 0.01 for 1%). */
  slippage: number
  /** The Unix timestamp after which the transaction will revert. */
  deadline: number
  /** The current prices between the two tokens in the pool. */
  prices: LiquidityPrices<TFormat>
  /** The expected amount of liquidity to be added or removed. */
  expectedLiquidity: TradeFormatValue<TFormat>
  /** The minimum amount of liquidity acceptable for the operation, considering slippage. */
  minLiquidity?: TradeFormatValue<TFormat>
  /**
   * Set of transactions needed to enable token spending, if required.
   * V2: If removing liquidity and permit data is passed in, this will be set to undefined.
   */
  enableTransactions?: {
    /**
     * The transaction needed to enable spending of tokenA, if required.
     */
    tokenA?: DexTransaction
    /**
     * The transaction needed to enable spending of tokenB, if required.
     */
    tokenB?: DexTransaction
    /**
     * The transaction needed to enable spending of the LP token, if required.
     * V2: If permit data is passed in, this will be set to undefined.
     */
    lpToken?: DexTransaction
  }
  /** The main transaction that will perform the liquidity operation. */
  transaction?: DexTransaction
  /** An observable stream that emits updates to the liquidity context. */
  observer$: Observable<ObservableLiquidityContext<TFormat>>
  /** A function to clean up resources and subscriptions when the context is no longer needed. */
  unsubscribe: () => void
  /**
   * Executes the liquidity operation by handling all necessary transactions (approvals and main transaction).
   * Uses the signer from the DEX provider to send transactions.
   * Must provide a signer via dexProvider to execute transactions.
   *
   * @returns A promise that resolves when all transactions are complete with the transaction receipts
   * @throws {DexError} If transactions fail or if no signer is available
   */
  execute?: ({
    approvalConfirmations,
    transactionConfirmations,
  }: {
    approvalConfirmations?: number
    transactionConfirmations?: number
  }) => Promise<{
    approvalReceipts?: ContractReceipt[]
    transactionReceipt?: ContractReceipt
  }>
}

/**
 * A subset of the LiquidityContext properties that are currently being traded.
 * Used internally by the Liquidity class.
 */
export type InternalLiquidityContext<TFormat extends TradeFormat> = Omit<
  LiquidityContext<TFormat>,
  'observer$' | 'unsubscribe' | 'execute'
>

/**
 * A subset of the LiquidityContext properties and block number that are currently being traded.
 * This is the callback from the observer$ subscribe() function.
 */
export type ObservableLiquidityContext<TFormat extends TradeFormat> = {
  blockNumber?: number
  latestQuote: InternalLiquidityContext<TFormat>
}

// ------------------------
// Liquidity Observer
// ------------------------

/**
 * Internal subscription tracking
 */
export type LiquiditySubscription<TFormat extends TradeFormat> = {
  /** The subject for the quote */
  subject: Subject<ObservableLiquidityContext<TFormat>>
  /** The quote context */
  context: InternalLiquidityContext<'dexnumber'>
  /** Whether the subscription is active */
  isActive: boolean
  /** The original params */
  originParams: AddLiquidityParams<'decimal'> | RemoveLiquidityParams<'decimal'>
}
