[**@dex-toolkit/types v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/types](../README.md) / ObservableTradeContext

# Type Alias: ObservableTradeContext\<TFormat\>

> **ObservableTradeContext**\<`TFormat`\>: `object`

A subset of the TradeContext properties and block number that are currently being traded.
Used internally by the Trade class.

## Type Parameters

• **TFormat** *extends* [`TradeFormat`](TradeFormat.md)

## Type declaration

### blockNumber?

> `optional` **blockNumber**: `number`

### latestQuote

> **latestQuote**: [`InternalTradeContext`](InternalTradeContext.md)\<`TFormat`\>

## Defined in

[packages/types/src/trade.types.ts:434](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/trade.types.ts#L434)
