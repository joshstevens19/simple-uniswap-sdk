[**@dex-toolkit/utils v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/utils](../README.md) / isLiquiditySettings

# Function: isLiquiditySettings()

> **isLiquiditySettings**(`settings`): `settings is LiquiditySettings`

Type guard to check if the provided settings are of type `LiquiditySettings`.

`LiquiditySettings` are considered a subset of `DexSettings` and do not include
trade-specific properties such as `disablePriceImpact` or `hasFeeOnTransfer`.

## Parameters

• **settings**: `any`

The settings object to check.

## Returns

`settings is LiquiditySettings`

A boolean indicating whether the settings object is of type `LiquiditySettings`.

## Defined in

[packages/utils/src/utils/liquidity.utils.ts:1529](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/utils/src/utils/liquidity.utils.ts#L1529)
