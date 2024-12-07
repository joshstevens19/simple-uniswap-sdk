[**@dex-toolkit/utils v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/utils](../README.md) / getLiquidityForAmount0

# Function: getLiquidityForAmount0()

> **getLiquidityForAmount0**(`sqrtRatioAX96`, `sqrtRatioBX96`, `amount0`): `DexNumber`

Calculates liquidity for a given amount of token0.

## Parameters

• **sqrtRatioAX96**: `DexNumber`

The sqrt price at tick A.

• **sqrtRatioBX96**: `DexNumber`

The sqrt price at tick B.

• **amount0**: `DexNumber`

The amount of token0.

## Returns

`DexNumber`

The liquidity as a BigNumber.

## Defined in

packages/utils/src/utils/liquidity.utils.ts:667
