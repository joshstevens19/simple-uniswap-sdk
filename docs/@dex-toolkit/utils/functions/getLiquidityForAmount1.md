[**@dex-toolkit/utils v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/utils](../README.md) / getLiquidityForAmount1

# Function: getLiquidityForAmount1()

> **getLiquidityForAmount1**(`sqrtRatioAX96`, `sqrtRatioBX96`, `amount1`): `DexNumber`

Calculates liquidity for a given amount of token1.

## Parameters

• **sqrtRatioAX96**: `DexNumber`

The sqrt price at tick A.

• **sqrtRatioBX96**: `DexNumber`

The sqrt price at tick B.

• **amount1**: `DexNumber`

The amount of token1.

## Returns

`DexNumber`

The liquidity as a BigNumber.

## Defined in

[packages/utils/src/utils/liquidity.utils.ts:688](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/utils/src/utils/liquidity.utils.ts#L688)
