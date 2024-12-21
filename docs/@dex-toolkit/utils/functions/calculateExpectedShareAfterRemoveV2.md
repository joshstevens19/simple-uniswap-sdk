[**@dex-toolkit/utils v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/utils](../README.md) / calculateExpectedShareAfterRemoveV2

# Function: calculateExpectedShareAfterRemoveV2()

> **calculateExpectedShareAfterRemoveV2**(`params`): `DexNumber`

Calculate expected share of pool after removing liquidity

## Parameters

• **params**

The parameters required to calculate the expected share of pool after removing liquidity.

• **params.currentTotalSupply**: `DexNumber`

The current total supply of the LP token.

• **params.liquidityToRemove**: `DexNumber`

The amount of liquidity to remove.

• **params.lpTokenBalance?**: `DexNumber`

The current LP token balance.

• **params.lpTokenDecimals**: `number`

The number of decimal places for the LP token.

## Returns

`DexNumber`

The expected share of pool as a decimal.

## Throws

Error if any input is zero/negative.

## Defined in

[packages/utils/src/utils/liquidity.utils.ts:175](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/utils/src/utils/liquidity.utils.ts#L175)
