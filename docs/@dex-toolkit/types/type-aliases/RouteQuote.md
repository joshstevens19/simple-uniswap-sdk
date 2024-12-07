[**@dex-toolkit/types v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/types](../README.md) / RouteQuote

# Type Alias: RouteQuote

> **RouteQuote**: `object`

Represents a quote for a route within a trade, including information about the expected converted amount, transaction details, and path tokens.

## Type declaration

### dexTag

> **dexTag**: [`DexTag`](DexTag.md)

The DEX tag representing the decentralized exchange. Undefined when wrapping/unwrapping tokens.

### expectedConvertQuote

> **expectedConvertQuote**: [`IDexNumber`](../interfaces/IDexNumber.md)

The expected amount of the token after the conversion.

### expectedConvertQuoteOrTokenAmountInMaxWithSlippage

> **expectedConvertQuoteOrTokenAmountInMaxWithSlippage**: [`IDexNumber`](../interfaces/IDexNumber.md)

The maximum amount after applying slippage.

### gasPriceEstimatedBy?

> `optional` **gasPriceEstimatedBy**: [`IDexNumber`](../interfaces/IDexNumber.md)

The estimated gas price for the transaction, if set. Undefined if gas settings are not provided.

### liquidityProviderFeePercent

> **liquidityProviderFeePercent**: `number` \| `number`[]

The percentage of the liquidity provider fee.

### pairAddresses

> **pairAddresses**: `Address`[]

The addresses of the pairs involved in the trade.

### protocol

> **protocol**: [`DexProtocol`](DexProtocol.md)

The protocol of the DEX used for the quote. Undefined when wrapping/unwrapping tokens.

### routePathAddresses

> **routePathAddresses**: `Address`[]

The addresses involved in the route path.

### routePathText

> **routePathText**: `string`

The text description of the route path.

### routePathTokens

> **routePathTokens**: [`Token`](Token.md)[]

The tokens involved in the route path.

### tradeDirection

> **tradeDirection**: [`TradeDirection`](TradeDirection.md)

The direction of the trade (buy/sell).

### tradeExpires

> **tradeExpires**: `number`

The timestamp for when the trade expires.

### transaction

> **transaction**: [`DexTransaction`](DexTransaction.md)

The transaction details for the route quote.

### version

> **version**: [`Version`](Version.md)

The version of the DEX used for the quote. Undefined when wrapping/unwrapping tokens.

## Defined in

packages/types/src/router.types.ts:56
