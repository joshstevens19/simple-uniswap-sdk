[**@dex-toolkit/types v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/types](../README.md) / LiquiditySubscription

# Type Alias: LiquiditySubscription\<TFormat\>

> **LiquiditySubscription**\<`TFormat`\>: `object`

Internal subscription tracking

## Type Parameters

• **TFormat** *extends* [`TradeFormat`](TradeFormat.md)

## Type declaration

### context

> **context**: [`InternalLiquidityContext`](InternalLiquidityContext.md)\<`"dexnumber"`\>

The quote context

### isActive

> **isActive**: `boolean`

Whether the subscription is active

### originParams

> **originParams**: [`AddLiquidityParams`](AddLiquidityParams.md)\<`"decimal"`\> \| [`RemoveLiquidityParams`](RemoveLiquidityParams.md)\<`"decimal"`\>

The original params

### subject

> **subject**: `Subject`\<[`ObservableLiquidityContext`](ObservableLiquidityContext.md)\<`TFormat`\>\>

The subject for the quote

## Defined in

[packages/types/src/liquidity.types.ts:414](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/liquidity.types.ts#L414)
