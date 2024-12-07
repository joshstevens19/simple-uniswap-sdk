[**@dex-toolkit/types v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/types](../README.md) / ObservableLiquidityContext

# Type Alias: ObservableLiquidityContext\<TFormat\>

> **ObservableLiquidityContext**\<`TFormat`\>: `object`

A subset of the LiquidityContext properties and block number that are currently being traded.
This is the callback from the observer$ subscribe() function.

## Type Parameters

• **TFormat** *extends* [`TradeFormat`](TradeFormat.md)

## Type declaration

### blockNumber?

> `optional` **blockNumber**: `number`

### latestQuote

> **latestQuote**: [`InternalLiquidityContext`](InternalLiquidityContext.md)\<`TFormat`\>

## Defined in

packages/types/src/liquidity.types.ts:402
