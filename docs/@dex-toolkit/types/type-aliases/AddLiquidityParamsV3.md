[**@dex-toolkit/types v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/types](../README.md) / AddLiquidityParamsV3

# Type Alias: AddLiquidityParamsV3\<TFormat\>

> **AddLiquidityParamsV3**\<`TFormat`\>: [`AddLiquidityParamsBase`](AddLiquidityParamsBase.md)\<`TFormat`\> & `object`

Parameters for adding liquidity to a v3 DEX pool.

## Type declaration

### feeTier

> **feeTier**: [`FeeTier`](FeeTier.md)

The fee tier for the Uniswap V3 pool.
This determines the fee charged on trades in the pool.

### lpTokenId?

> `optional` **lpTokenId**: `string`

Optional ID of the LP token that represents an existing liquidity position.
If not provided, extra calls may be made to fetch or create this token.

### priceRange

> **priceRange**: [`LiquidityPriceRange`](LiquidityPriceRange.md)

The price range for the liquidity position.
This includes the lower and upper bounds for the price of the pair.

### protocol

> **protocol**: `"protocolV3"`

The protocol of the DEX

## Type Parameters

• **TFormat** *extends* [`TradeFormat`](TradeFormat.md)

## Defined in

packages/types/src/liquidity.types.ts:189
