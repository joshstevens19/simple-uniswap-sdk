[**@dex-toolkit/types v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/types](../README.md) / LPTokenInfoV2

# Type Alias: LPTokenInfoV2\<TFormat\>

> **LPTokenInfoV2**\<`TFormat`\>: [`LiquidityTokenInfo`](LiquidityTokenInfo.md)\<`TFormat`\> & `object`

Represents liquidity pool (LP) token information for a V2 liquidity pool.
This is an alias for `LiquidityTokenInfo`, parameterized by the trade format type.

## Type declaration

### totalSupply

> **totalSupply**: [`TradeFormatValue`](TradeFormatValue.md)\<`TFormat`\>

The total supply of the LP token.

## Type Parameters

• **TFormat** *extends* [`TradeFormat`](TradeFormat.md)

## Defined in

[packages/types/src/liquidity.types.ts:59](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/liquidity.types.ts#L59)
