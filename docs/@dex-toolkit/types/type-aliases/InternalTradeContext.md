[**@dex-toolkit/types v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/types](../README.md) / InternalTradeContext

# Type Alias: InternalTradeContext\<TFormat\>

> **InternalTradeContext**\<`TFormat`\>: `Omit`\<[`TradeContext`](TradeContext.md)\<`TFormat`\>, `"observer$"` \| `"unsubscribe"` \| `"execute"`\>

A subset of the TradeContext properties that are currently being traded.
Used internally by the Trade class.

## Type Parameters

• **TFormat** *extends* [`TradeFormat`](TradeFormat.md)

## Defined in

packages/types/src/trade.types.ts:425
