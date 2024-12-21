[**@dex-toolkit/types v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/types](../README.md) / TradeContext

# Type Alias: TradeContext\<TFormat\>

> **TradeContext**\<`TFormat`\>: `object`

Represents the context of a trade, containing various details about the trade process,
including the dex tag, version, trade direction, and other relevant trade information.

## Type Parameters

• **TFormat** *extends* [`TradeFormat`](TradeFormat.md)

## Type declaration

### approvalTransaction?

> `optional` **approvalTransaction**: [`DexTransaction`](DexTransaction.md)

The transaction required for approving the maximum allowance.
Undefined when no approval is needed.

### attemptedRouteQuotes

> **attemptedRouteQuotes**: [`RouteQuotesByDex`](RouteQuotesByDex.md)

A collection of attempted route quotes categorized by DEX type.

### baseConvertRequest

> **baseConvertRequest**: [`TradeFormatValue`](TradeFormatValue.md)\<`TFormat`\>

The base amount to be converted in the trade, represented as a string.

### dexTag

> **dexTag**: [`DexTag`](DexTag.md)

The tag of decentralized exchange (DEX) used for the trade.

### execute()?

> `optional` **execute**: (`{
    approvalConfirmations,
    transactionConfirmations,
  }`) => `Promise`\<`object`\>

Executes the trade operation by handling all necessary transactions (approvals and main transaction).
Uses the signer from the DEX provider to send transactions.
Must provide a signer via dexProvider to execute transactions.

#### Parameters

• **\{
    approvalConfirmations,
    transactionConfirmations,
  \}**

• **\{
    approvalConfirmations,
    transactionConfirmations,
  \}.approvalConfirmations?**: `number`

• **\{
    approvalConfirmations,
    transactionConfirmations,
  \}.transactionConfirmations?**: `number`

#### Returns

`Promise`\<`object`\>

A promise that resolves when all transactions are complete with the transaction receipts

##### approvalReceipt?

> `optional` **approvalReceipt**: `ContractReceipt`

##### transactionReceipt?

> `optional` **transactionReceipt**: `ContractReceipt`

#### Throws

If transactions fail or if no signer is available

### expectedConvertQuote

> **expectedConvertQuote**: [`TradeFormatValue`](TradeFormatValue.md)\<`TFormat`\>

The expected amount to be received or converted from the trade.

### fromTokenInfo

> **fromTokenInfo**: [`TradeFromTokenInfo`](TradeFromTokenInfo.md)\<`TFormat`\>

The info for the token being traded from (the input token).

### gasPriceEstimatedBy?

> `optional` **gasPriceEstimatedBy**: [`TradeFormatValue`](TradeFormatValue.md)\<`TFormat`\>

The source of the estimated gas price for the trade.
Undefined when gas settings were not set in the trade settings.

### id

> **id**: `string`

The unique ID for the context

### liquidityProviderFee?

> `optional` **liquidityProviderFee**: `string` \| `string`[]

The liquidity provider fee for the trade, which can be a single number (v2) or an array of numbers (v3).
Undefined when wrapping/unwrapping tokens.

### liquidityProviderFeePercent?

> `optional` **liquidityProviderFeePercent**: `number` \| `number`[]

The liquidity provider fee as a percentage for the trade, which can be a single number (v2) or an array of numbers (v3).
Undefined when wrapping/unwrapping tokens.

### maximumSent?

> `optional` **maximumSent**: [`TradeFormatValue`](TradeFormatValue.md)\<`TFormat`\>

The maximum amount that can be sent for the trade.
Undefined when the trade direction is input.

### minAmountConvertQuote?

> `optional` **minAmountConvertQuote**: [`TradeFormatValue`](TradeFormatValue.md)\<`TFormat`\>

The minimum amount to receive from the trade, accounting for slippage.
Undefined when the trade direction is output.

### observer$

> **observer$**: `Observable`\<[`ObservableTradeContext`](ObservableTradeContext.md)\<`TFormat`\>\>

A stream that emits updates whenever the trade quote changes.

### pairAddresses

> **pairAddresses**: `Address`[]

The addresses of the pairs involved in the trade.

### priceImpact?

> `optional` **priceImpact**: [`PriceImpactInfo`](PriceImpactInfo.md)

The impact of the trade on the price of the assets being traded.

### protocol

> **protocol**: [`DexProtocol`](DexProtocol.md)

The protocol of the DEX used for the trade.

### routePathAddresses

> **routePathAddresses**: `Address`[]

The addresses of the tokens involved in the route path of the trade.

### routePathText

> **routePathText**: `string`

A human-readable representation of the route path for the trade.

### routePathTokens

> **routePathTokens**: [`Token`](Token.md)[]

The tokens involved in the route path of the trade.

### toTokenInfo

> **toTokenInfo**: [`TradeToTokenInfo`](TradeToTokenInfo.md)\<`TFormat`\>

The info for the token being traded to (the output token).

### tradeDirection

> **tradeDirection**: [`TradeDirection`](TradeDirection.md)

The direction of the trade, indicating whether the trade is an input (buy) or output (sell) operation.

### tradeExpires

> **tradeExpires**: `number`

The Unix timestamp indicating when the trade expires.

### transaction

> **transaction**: [`DexTransaction`](DexTransaction.md)

The transaction object representing the trade.

### unsubscribe()

> **unsubscribe**: () => `void`

A function to clean up resources and subscriptions when the context is no longer needed.

#### Returns

`void`

### version

> **version**: [`Version`](Version.md)

The version of the DEX used for the trade.

## Defined in

[packages/types/src/trade.types.ts:330](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/trade.types.ts#L330)
