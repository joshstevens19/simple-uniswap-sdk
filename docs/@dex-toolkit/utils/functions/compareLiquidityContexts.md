[**@dex-toolkit/utils v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/utils](../README.md) / compareLiquidityContexts

# Function: compareLiquidityContexts()

> **compareLiquidityContexts**(`a`, `b`): `boolean`

Compares two liquidity contexts to determine if they are equivalent.
This performs deep comparison of all relevant fields, including tokens, amounts, and pool information.
Used primarily for determining if a new quote needs to be emitted.

## Parameters

• **a**: `InternalLiquidityContext`\<`"dexnumber"`\>

First liquidity context to compare

• **b**: `InternalLiquidityContext`\<`"dexnumber"`\>

Second liquidity context to compare

## Returns

`boolean`

true if the contexts are equivalent, false otherwise

## Defined in

[packages/utils/src/utils/liquidity.utils.ts:1284](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/utils/src/utils/liquidity.utils.ts#L1284)
