[**@dex-toolkit/utils v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/utils](../README.md) / calculateExpectedShareAfterAddV3

# Function: calculateExpectedShareAfterAddV3()

> **calculateExpectedShareAfterAddV3**(`params`): `DexNumber`

Calculates the expected share of pool after adding liquidity to a V3 position.
The calculation considers whether the new liquidity will be active at the current tick.

## Parameters

• **params**

The parameters for the calculation.

• **params.currentTick**: `number`

The pool's current tick.

• **params.decimals?**: `number` = `18`

The decimal precision to use for the calculation (default: 18).

• **params.liquidityToAdd**: `DexNumber`

The amount of liquidity being added to the position.

• **params.poolLiquidity**: `DexNumber`

The total active liquidity in the pool at the current tick.

• **params.positionLiquidity?**: `DexNumber`

The current liquidity in the position (if it exists).

• **params.tickLower**: `number`

The lower tick boundary of the position's price range.

• **params.tickUpper**: `number`

The upper tick boundary of the position's price range.

## Returns

`DexNumber`

A DexNumber representing the expected share of the pool as a percentage after adding liquidity.

## Defined in

packages/utils/src/utils/liquidity.utils.ts:257
