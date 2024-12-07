[**@dex-toolkit/types v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/types](../README.md) / LPTokenInfoV3

# Type Alias: LPTokenInfoV3\<TFormat\>

> **LPTokenInfoV3**\<`TFormat`\>: `object`

Represents liquidity pool (LP) token information for a V3 liquidity pool.

## Type Parameters

• **TFormat** *extends* [`TradeFormat`](TradeFormat.md)

## Type declaration

### amount?

> `optional` **amount**: [`TradeFormatValue`](TradeFormatValue.md)\<`TFormat`\>

The amount of the tokens to be removed.

### feeTier

> **feeTier**: [`FeeTier`](FeeTier.md)

The targeted fee tier

### priceRange

> **priceRange**: [`LiquidityPriceRange`](LiquidityPriceRange.md)

The price range of the liquidity pool.

### tokenId

> **tokenId**: `string`

The unique identifier of the liquidity pool token.

### totalSupply

> **totalSupply**: [`TradeFormatValue`](TradeFormatValue.md)\<`TFormat`\>

The total supply of the LP token.

## Defined in

packages/types/src/liquidity.types.ts:68
