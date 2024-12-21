[**@dex-toolkit/utils v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/utils](../README.md) / calculateCurrentShareOfPoolV2

# Function: calculateCurrentShareOfPoolV2()

> **calculateCurrentShareOfPoolV2**(`params`): `DexNumber`

Calculate share of pool for a given LP token balance

## Parameters

• **params**

The parameters required to calculate the share of pool.

• **params.lpTokenBalance?**: `DexNumber`

The LP token balance.

• **params.lpTokenDecimals**: `number`

The number of decimal places for the LP token.

• **params.totalSupply**: `DexNumber`

The total supply of the LP token.

## Returns

`DexNumber`

The share of pool as a decimal.

## Throws

Error if any input is zero/negative.

## Defined in

[packages/utils/src/utils/liquidity.utils.ts:112](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/utils/src/utils/liquidity.utils.ts#L112)
