[**@dex-toolkit/utils v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/utils](../README.md) / calculateMultiPositionShareOfPoolV3

# Function: calculateMultiPositionShareOfPoolV3()

> **calculateMultiPositionShareOfPoolV3**(`params`): `DexNumber`

Calculates the total share of pool across multiple V3 positions.
Only includes liquidity from positions that are active at the current tick.

## Parameters

• **params**

The parameters for the calculation.

• **params.currentTick**: `number`

The pool's current tick.

• **params.decimals?**: `number` = `18`

The decimal precision to use for the calculation (default: 18).

• **params.poolLiquidity**: `DexNumber`

The total active liquidity in the pool at the current tick.

• **params.positions**: `object`[]

Array of position objects containing liquidity amounts and tick ranges.

## Returns

`DexNumber`

A DexNumber representing the combined share of all active positions as a percentage of the pool.

## Defined in

packages/utils/src/utils/liquidity.utils.ts:362
