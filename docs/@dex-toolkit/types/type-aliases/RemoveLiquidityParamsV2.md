[**@dex-toolkit/types v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/types](../README.md) / RemoveLiquidityParamsV2

# Type Alias: RemoveLiquidityParamsV2\<TFormat\>

> **RemoveLiquidityParamsV2**\<`TFormat`\>: [`DexKey`](DexKey.md) & `object`

Parameters for removing liquidity from a v2 DEX pool.

## Type declaration

### lpTokenAmount?

> `optional` **lpTokenAmount**: [`TradeFormatValue`](TradeFormatValue.md)\<`TFormat`\>

The amount of LP tokens to remove from the liquidity pool.

### minTokenAAmount?

> `optional` **minTokenAAmount**: [`TradeFormatValue`](TradeFormatValue.md)\<`TFormat`\>

The minimum amount of token A that the user is willing to accept when removing liquidity.

### minTokenBAmount?

> `optional` **minTokenBAmount**: [`TradeFormatValue`](TradeFormatValue.md)\<`TFormat`\>

The minimum amount of token B that the user is willing to accept when removing liquidity.

### permit?

> `optional` **permit**: [`RemoveLiquidityPermitOptions`](RemoveLiquidityPermitOptions.md)

Optional permit data for approving the transaction off-chain.

### protocol

> **protocol**: `"protocolV2"`

The protocol of the DEX

### supportFeeOnTransferTokens?

> `optional` **supportFeeOnTransferTokens**: `boolean`

Flag to indicate if fee-on-transfer tokens are supported.
Fee-on-transfer tokens incur a small fee when transferred.

## Type Parameters

• **TFormat** *extends* [`TradeFormat`](TradeFormat.md)

## Defined in

[packages/types/src/liquidity.types.ts:244](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/liquidity.types.ts#L244)
