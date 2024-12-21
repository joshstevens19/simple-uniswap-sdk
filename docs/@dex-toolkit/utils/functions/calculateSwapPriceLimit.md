[**@dex-toolkit/utils v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/utils](../README.md) / calculateSwapPriceLimit

# Function: calculateSwapPriceLimit()

> **calculateSwapPriceLimit**(`params`): `DexNumber`

Calculates the sqrt price limit for a V3 swap to protect against excessive slippage

## Parameters

• **params**

The parameters required to calculate the price limit

• **params.currentSqrtPriceX96**: `DexNumber`

The current sqrt price of the pool in Q64.96 format

• **params.isExactInput**: `boolean`

Whether this is an exact input swap

• **params.slippageTolerance**: `number`

The maximum acceptable slippage as a decimal (e.g., 0.01 for 1%)

## Returns

`DexNumber`

The sqrtPriceX96 limit or 0 if price limiting is disabled

## Defined in

[packages/utils/src/utils/router.utils.ts:73](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/utils/src/utils/router.utils.ts#L73)
