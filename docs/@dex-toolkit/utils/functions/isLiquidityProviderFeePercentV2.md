[**@dex-toolkit/utils v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/utils](../README.md) / isLiquidityProviderFeePercentV2

# Function: isLiquidityProviderFeePercentV2()

> **isLiquidityProviderFeePercentV2**(`fee`): `fee is number`

Type guard to check if the `liquidityProviderFeePercent` is a number, indicating it is used for v2.

## Parameters

• **fee**: `number` \| `number`[]

The liquidity provider fee, which can be a number or an array of numbers.

## Returns

`fee is number`

A boolean indicating whether the `liquidityProviderFeePercent` is a single number (v2).

## Defined in

[packages/utils/src/utils/router.utils.ts:380](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/utils/src/utils/router.utils.ts#L380)
