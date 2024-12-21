[**@dex-toolkit/utils v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/utils](../README.md) / calculateExpectedShareAfterRemoveV3

# Function: calculateExpectedShareAfterRemoveV3()

> **calculateExpectedShareAfterRemoveV3**(`params`): `DexNumber`

Calculates the expected share of pool after removing liquidity from a V3 position.
The calculation considers whether the removed liquidity is currently active.

## Parameters

• **params**

The parameters for the calculation.

• **params.currentTick**: `number`

The pool's current tick.

• **params.decimals?**: `number` = `18`

The decimal precision to use for the calculation (default: 18).

• **params.liquidityToRemove**: `DexNumber`

The amount of liquidity being removed from the position.

• **params.poolLiquidity**: `DexNumber`

The total active liquidity in the pool at the current tick.

• **params.positionLiquidity?**: `DexNumber`

The current liquidity in the position.

• **params.tickLower**: `number`

The lower tick boundary of the position's price range.

• **params.tickUpper**: `number`

The upper tick boundary of the position's price range.

## Returns

`DexNumber`

A DexNumber representing the expected share of the pool as a percentage after removing liquidity.

## Defined in

[packages/utils/src/utils/liquidity.utils.ts:309](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/utils/src/utils/liquidity.utils.ts#L309)
