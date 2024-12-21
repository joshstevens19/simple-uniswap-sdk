[**@dex-toolkit/types v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/types](../README.md) / LiquidityPrices

# Type Alias: LiquidityPrices\<TFormat\>

> **LiquidityPrices**\<`TFormat`\>: `object`

Represents the prices between two tokens in a liquidity pool.

## Type Parameters

• **TFormat** *extends* [`TradeFormat`](TradeFormat.md)

## Type declaration

### aTokenPerBToken

> **aTokenPerBToken**: [`TradeFormatValue`](TradeFormatValue.md)\<`TFormat`\>

The price of Token A per Token B.

### bTokenPerAToken

> **bTokenPerAToken**: [`TradeFormatValue`](TradeFormatValue.md)\<`TFormat`\>

The price of Token B per Token A.

## Defined in

[packages/types/src/liquidity.types.ts:48](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/liquidity.types.ts#L48)
