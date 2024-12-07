[**@dex-toolkit/utils v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/utils](../README.md) / calculateCurrentShareOfPoolV3

# Function: calculateCurrentShareOfPoolV3()

> **calculateCurrentShareOfPoolV3**(`params`): `DexNumber`

Calculates the current share of a Uniswap V3 liquidity position relative to the total pool liquidity.
The share is only calculated if the position's tick range encompasses the current tick (i.e. the position is "active").

## Parameters

• **params**

The parameters for the calculation.

• **params.currentTick**: `number`

The pool's current tick.

• **params.decimals?**: `number` = `18`

The decimal precision to use for the calculation (default: 18).

• **params.poolLiquidity**: `DexNumber`

The total active liquidity in the pool at the current tick.

• **params.positionLiquidity?**: `DexNumber`

The liquidity amount in the position.

• **params.tickLower**: `number`

The lower tick boundary of the position's price range.

• **params.tickUpper**: `number`

The upper tick boundary of the position's price range.

## Returns

`DexNumber`

A DexNumber representing the position's share of the pool as a percentage.

## Defined in

packages/utils/src/utils/liquidity.utils.ts:214
