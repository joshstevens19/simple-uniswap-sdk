[**@dex-toolkit/utils v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/utils](../README.md) / isDexSettings

# Function: isDexSettings()

> **isDexSettings**(`settings`): `settings is DexSettings`

Type guard to check if the provided settings conform to the base `DexSettings` structure.

This is useful when you want to ensure the settings object contains the base fields
required by any settings derived from `DexSettings`.

## Parameters

• **settings**: `any`

The settings object to check.

## Returns

`settings is DexSettings`

A boolean indicating whether the settings object is of type `DexSettings`.

## Defined in

[packages/utils/src/utils/dex.utils.ts:66](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/utils/src/utils/dex.utils.ts#L66)
