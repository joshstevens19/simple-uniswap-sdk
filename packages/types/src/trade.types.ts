import type { JsonFragment } from '@ethersproject/abi'
import type { Address, CustomNetwork } from '@multicall-toolkit/types'
import type BigNumber from 'bignumber.js'
import type {
  ContractReceipt,
  BigNumber as EthersBigNumber,
  Transaction,
} from 'ethers'
import type { Observable, Subject } from 'rxjs'

import type { WrappedTypes } from './abis'
import type { HexString, IDexNumber } from './dex-number.types'
import type { IDexProvider } from './dex-provider.types'
import type {
  DexFactoryBaseArgs,
  DexProtocol,
  DexSettings,
  DexTag,
} from './dex.types'
import type { RouteQuotesByDex } from './router.types'
import type { Token } from './token.types'
import type { Version } from './version.types'

// ------------------------
// General
// ------------------------

/**
 * Represents the direction of a trade, either an input (buy) or output (sell) operation.
 */
export type TradeDirection = 'input' | 'output'

/**
 * Represents the different trade paths that can be used for a trade.
 */
export type TradePath =
  | 'coinToToken'
  | 'tokenToCoin'
  | 'tokenToToken'
  | 'coinToWrapped'
  | 'wrappedToCoin'

/**
 * A subset of the Transaction interface used to represent the transaction details of a trade.
 */
export type DexTransaction = Pick<Transaction, 'to' | 'from' | 'data'> & {
  /** The value of the transaction as a hex string. */
  value: string
}

// ------------------------
// Trade Args
// ------------------------

/**
 * Represents the arguments for sending the trade, including the two tokens and optional trade settings.
 */
export type TradeSenderArgs = {
  /** The token being exchanged from. */
  fromToken: Token
  /** The token being received. */
  toToken: Token
  /** (Optional) Settings for the trade such as slippage and deadline. */
  settings?: Partial<TradeSettings>
}

/**
 * Represents the public arguments for sending the trade using their addresses instead of token objects.
 */
export type TradeSenderPublicArgs = {
  /** The address of the token being exchanged from. */
  fromTokenAddress: Address
  /** The address of the token being received. */
  toTokenAddress: Address
  /** (Optional) Settings for the trade such as slippage and deadline. */
  settings?: Partial<TradeSettings>
}

/**
 * Represents the internal arguments for the Trade, combining base arguments, sender arguments, and the DEX provider.
 */
export type TradeInternalArgs<TFormat extends TradeFormat> =
  DexFactoryBaseArgs<TFormat> &
    TradeSenderArgs & {
      /** The DEX provider responsible for handling the trade execution. */
      dexProvider: IDexProvider
    }

// ------------------------
// Trade Settings
// ------------------------

// export type PaymentSplitterRecipient = {
//   /** The address of the recipient */
//   address: Address
//   /** The percentage of the output amount that will be sent recipient */
//   percentage: number
// }

// export type PaymentSplitter = ContractDetail<PaymentSplitterMethods> & {
//   recipients: PaymentSplitterRecipient[]
// }

/**
 * Trade settings for customizing the behavior of a trade.
 * Extends the base {@link DexSettings} with additional trade-specific options.
 */
export type TradeSettings = DexSettings & {
  /**
   * When `true`, disables the price impact calculation for the trade.
   * Price impact refers to the effect of the trade on the overall price of the asset in the pool.
   *
   * @default false
   */
  disablePriceImpact: boolean

  /**
   * When `true`, enables support for fee-on-transfer tokens (commonly used by deflationary tokens).
   * Fee-on-transfer tokens automatically deduct a percentage as a fee upon each transfer.
   *
   * @default false
   */
  hasFeeOnTransfer?: boolean
}

// ------------------------
// Trade Params
// ------------------------

/**
 * Trade parameter for amount
 * Will set `tradeDirection` to `input`
 */
export type TradeParamsAmount = string | number

/** Trade parameters for input direction */
export type TradeParamsInput = {
  /**
   * The direction of the trade (input).
   * When `direction` is "input", the `fromAmount` is provided, and the output token amount will be calculated.
   */
  direction: 'input'
  /**
   * The amount of tokens to trade as input.
   * This value should be provided as a string (e.g., '1.23').
   */
  fromAmount: TradeParamsAmount
}

/** Trade parameters for output direction */
export type TradeParamsOutput = {
  /**
   * The direction of the trade (output).
   * When `direction` is "output", the `toAmount` is provided, and the input token amount will be calculated.
   */
  direction: 'output'
  /**
   * The amount of tokens to receive as output.
   * This value should be provided as a string (e.g., '1.23').
   */
  toAmount: TradeParamsAmount
}

/** Combined trade parameters type */
export type TradeParams =
  | TradeParamsAmount
  | TradeParamsInput
  | TradeParamsOutput

// ------------------------
// Custom Network
// ------------------------

/**
 * Information about the native currency for a custom network.
 */
export type NativeCurrencyInfo = {
  /** The name of the native currency. */
  name: string
  /** The symbol of the native currency. */
  symbol: string
}

/**
 * Information about the wrapped version of the native currency for a custom network.
 */
export type NativeWrappedTokenInfo = Token & {
  /** (Optional) ABI of the wrapped token contract. */
  abi?: JsonFragment[]
  /** (Optional) Methods available on the wrapped token contract. */
  methods?: Partial<WrappedTypes.MethodNameMap>
}

/**
 * Represents a custom network configuration.
 */
export type DexCustomNetwork = CustomNetwork & {
  /** Information about the native currency of the custom network. */
  nativeCurrency: NativeCurrencyInfo
  /** Information about the wrapped version of the native currency. */
  nativeWrappedTokenInfo: NativeWrappedTokenInfo
  /** (Optional) A list of tokens available on the custom network. */
  tokens?: Token[]
}

// ------------------------
// Trade Format
// ------------------------

/**
 * The format in which the trade context's number values will be returned.
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
export type TradeFormat =
  | 'readable'
  | 'hex'
  | 'decimal'
  | 'wei'
  | 'dexnumber'
  | 'bignumber'
  | 'ethers'
  | 'bigint'

/** Options for formatting a number. */
export type FormatOptions = {
  /** The number of decimal places to display. */
  decimalPlaces?: number
  /** The rounding mode to use when rounding the number. */
  roundingMode?: BigNumber.RoundingMode
  /**
   * (Optional) Locale string or array of locales for Intl.NumberFormat.
   * Only used for `readable` format.
   * Defaults to 'en'
   */
  locales?: Intl.LocalesArgument
}

/** Options for formatting a trade number. */
export type TradeFormatOptions<TFormat extends TradeFormat> = {
  type: TFormat
  options?: FormatOptions
}

/**
 * Maps TradeFormat to its corresponding return type.
 */
export type TradeFormatValue<TFormat extends TradeFormat> =
  TFormat extends 'readable'
    ? string
    : TFormat extends 'hex'
      ? HexString
      : TFormat extends 'decimal'
        ? string
        : TFormat extends 'wei'
          ? string
          : TFormat extends 'dexnumber'
            ? IDexNumber
            : TFormat extends 'bignumber'
              ? BigNumber
              : TFormat extends 'ethers'
                ? EthersBigNumber
                : TFormat extends 'bigint'
                  ? bigint
                  : never

// ------------------------
// Trade Context
// ------------------------

/**
 * The token information, including the token itself, token value, and its balance information.
 */
export type TradeTokenInfo<TFormat extends TradeFormat> = {
  /** The token */
  token: Token
  /** The balance of the token */
  balance: TradeFormatValue<TFormat>
  /** Value of the token in currency, eg: USD or EUR */
  value?: number
}

/**
 * The token information, including the token itself, token value, and its balance and allowance information.
 */
export type TradeFromTokenInfo<TFormat extends TradeFormat> =
  TradeTokenInfo<TFormat> & {
    /** Whether the token has a balance for the trade */
    hasEnoughBalance?: boolean
    /** The allowance for the token */
    allowance: TradeFormatValue<TFormat>
    /** Whether the token has an allowance for the trade */
    hasEnoughAllowance?: boolean
    /** Whether the token has the maximum allowance */
    isMaxAllowance: boolean
  }

/**
 * The token information, including the token itself, token value, and its balance information.
 */
export type TradeToTokenInfo<TFormat extends TradeFormat> =
  TradeTokenInfo<TFormat>

/**
 * The impact of the trade on the price of the assets being traded.
 */
export type PriceImpactInfo = {
  /**
   * The 100-based percentage representing the price impact of the trade.
   * Undefined when price impact is disabled in the trade settings.
   */
  percentage: string
  /**
   * Whether the price impact is considered minimal, less than "0.01%".
   */
  isMinimal: boolean
}

/**
 * Represents the context of a trade, containing various details about the trade process,
 * including the dex tag, version, trade direction, and other relevant trade information.
 */
export type TradeContext<TFormat extends TradeFormat> = {
  /** The unique ID for the context */
  id: string
  /** The tag of decentralized exchange (DEX) used for the trade. */
  dexTag: DexTag
  /** The protocol of the DEX used for the trade. */
  protocol: DexProtocol
  /** The version of the DEX used for the trade. */
  version: Version
  /** The direction of the trade, indicating whether the trade is an input (buy) or output (sell) operation. */
  tradeDirection: TradeDirection
  /** The base amount to be converted in the trade, represented as a string. */
  baseConvertRequest: TradeFormatValue<TFormat>
  /**
   * The minimum amount to receive from the trade, accounting for slippage.
   * Undefined when the trade direction is output.
   */
  minAmountConvertQuote?: TradeFormatValue<TFormat>
  /**
   * The maximum amount that can be sent for the trade.
   * Undefined when the trade direction is input.
   */
  maximumSent?: TradeFormatValue<TFormat>
  /** The expected amount to be received or converted from the trade. */
  expectedConvertQuote: TradeFormatValue<TFormat>
  /**
   * The liquidity provider fee for the trade, which can be a single number (v2) or an array of numbers (v3).
   * Undefined when wrapping/unwrapping tokens.
   */
  liquidityProviderFee?: string | string[]
  /**
   * The liquidity provider fee as a percentage for the trade, which can be a single number (v2) or an array of numbers (v3).
   * Undefined when wrapping/unwrapping tokens.
   */
  liquidityProviderFeePercent?: number | number[]
  /** The Unix timestamp indicating when the trade expires. */
  tradeExpires: number
  /**
   * The impact of the trade on the price of the assets being traded.
   */
  priceImpact?: PriceImpactInfo
  /** The tokens involved in the route path of the trade. */
  routePathTokens: Token[]
  /** A human-readable representation of the route path for the trade. */
  routePathText: string
  /** The addresses of the tokens involved in the route path of the trade. */
  routePathAddresses: Address[]
  /** The addresses of the pairs involved in the trade. */
  pairAddresses: Address[]
  /** A collection of attempted route quotes categorized by DEX type. */
  attemptedRouteQuotes: RouteQuotesByDex
  /**
   * The transaction required for approving the maximum allowance.
   * Undefined when no approval is needed.
   */
  approvalTransaction?: DexTransaction
  /** The info for the token being traded from (the input token). */
  fromTokenInfo: TradeFromTokenInfo<TFormat>
  /** The info for the token being traded to (the output token). */
  toTokenInfo: TradeToTokenInfo<TFormat>
  /** The transaction object representing the trade. */
  transaction: DexTransaction
  /**
   * The source of the estimated gas price for the trade.
   * Undefined when gas settings were not set in the trade settings.
   */
  gasPriceEstimatedBy?: TradeFormatValue<TFormat>
  /** A stream that emits updates whenever the trade quote changes. */
  observer$: Observable<ObservableTradeContext<TFormat>>
  /** A function to clean up resources and subscriptions when the context is no longer needed. */
  unsubscribe: () => void
  /**
   * Executes the trade operation by handling all necessary transactions (approvals and main transaction).
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
    approvalReceipt?: ContractReceipt
    transactionReceipt?: ContractReceipt
  }>
}

/**
 * A subset of the TradeContext properties that are currently being traded.
 * Used internally by the Trade class.
 */
export type InternalTradeContext<TFormat extends TradeFormat> = Omit<
  TradeContext<TFormat>,
  'observer$' | 'unsubscribe' | 'execute'
>

/**
 * A subset of the TradeContext properties and block number that are currently being traded.
 * Used internally by the Trade class.
 */
export type ObservableTradeContext<TFormat extends TradeFormat> = {
  blockNumber?: number
  latestQuote: InternalTradeContext<TFormat>
}

// ------------------------
// Trade Observer
// ------------------------

/**
 * Internal subscription tracking
 */
export type TradeSubscription<TFormat extends TradeFormat> = {
  /** The subject for the quote */
  subject: Subject<ObservableTradeContext<TFormat>>
  /** The quote context */
  context: InternalTradeContext<'dexnumber'>
  /** Whether the subscription is active */
  isActive: boolean
}
