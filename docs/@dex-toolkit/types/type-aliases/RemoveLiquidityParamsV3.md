[**@dex-toolkit/types v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/types](../README.md) / RemoveLiquidityParamsV3

# Type Alias: RemoveLiquidityParamsV3\<TFormat\>

> **RemoveLiquidityParamsV3**\<`TFormat`\>: [`DexKey`](DexKey.md) & `object`

Parameters for removing liquidity from a v3 DEX pool.

## Type declaration

### liquidityAmount?

> `optional` **liquidityAmount**: [`TradeFormatValue`](TradeFormatValue.md)\<`TFormat`\>

The amount of liquidity to remove from the position.

### lpTokenId?

> `optional` **lpTokenId**: `string`

The ID of the LP token that represents the liquidity position in the pool.

### minTokenAAmount?

> `optional` **minTokenAAmount**: [`TradeFormatValue`](TradeFormatValue.md)\<`TFormat`\>

The minimum amount of token A that the user is willing to accept when removing liquidity.

### minTokenBAmount?

> `optional` **minTokenBAmount**: [`TradeFormatValue`](TradeFormatValue.md)\<`TFormat`\>

The minimum amount of token B that the user is willing to accept when removing liquidity.

### protocol

> **protocol**: `"protocolV3"`

The protocol of the DEX

## Type Parameters

• **TFormat** *extends* [`TradeFormat`](TradeFormat.md)

## Defined in

[packages/types/src/liquidity.types.ts:263](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/liquidity.types.ts#L263)
