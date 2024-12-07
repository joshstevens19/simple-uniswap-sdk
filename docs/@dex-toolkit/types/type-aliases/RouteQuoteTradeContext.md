[**@dex-toolkit/types v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/types](../README.md) / RouteQuoteTradeContext

# Type Alias: RouteQuoteTradeContext

> **RouteQuoteTradeContext**: `object`

Represents the context of a route quote in a trade.

## Type declaration

### hasFeeOnTransfer?

> `optional` **hasFeeOnTransfer**: `boolean`

Whether the token has a fee on transfer (used for deflationary tokens).

### liquidityProviderFeePercent

> **liquidityProviderFeePercent**: `number` \| `number`[]

The percentage of the liquidity provider fee.

### protocol

> **protocol**: [`DexProtocol`](DexProtocol.md)

The protocol of the DEX used for the trade.

### routePathAddresses

> **routePathAddresses**: `Address`[]

The addresses involved in the route path.

### sqrtPriceX96AfterOrList?

> `optional` **sqrtPriceX96AfterOrList**: [`IDexNumber`](../interfaces/IDexNumber.md) \| [`IDexNumber`](../interfaces/IDexNumber.md)[]

The current sqrt price in Q64.96 format
Single-hop trades will have a single value
Multi-hop trades will have an array of values, one for each hop

## Defined in

packages/types/src/router.types.ts:123
