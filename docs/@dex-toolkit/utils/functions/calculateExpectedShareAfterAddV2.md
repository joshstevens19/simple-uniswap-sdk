[**@dex-toolkit/utils v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/utils](../README.md) / calculateExpectedShareAfterAddV2

# Function: calculateExpectedShareAfterAddV2()

> **calculateExpectedShareAfterAddV2**(`params`): `DexNumber`

Calculate expected share of pool after adding liquidity

## Parameters

• **params**

The parameters required to calculate the expected share of pool after adding liquidity.

• **params.currentTotalSupply**: `DexNumber`

The current total supply of the LP token.

• **params.liquidityToAdd**: `DexNumber`

The amount of liquidity to add.

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

packages/utils/src/utils/liquidity.utils.ts:140
