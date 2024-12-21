[**@dex-toolkit/utils v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/utils](../README.md) / convertDexConfigContextToByDex

# Function: convertDexConfigContextToByDex()

> **convertDexConfigContextToByDex**(`context`): `DexConfigsByDex`

Converts a DexConfigContext (either a single DexConfigBase or an array of DexConfigBase objects) into a DexConfigsByDex object where the keys are the dexType values.

## Parameters

• **context**: `DexConfigContext`

The DexConfigContext to convert, which can be a single DexConfigBase object or an array of DexConfigBase objects.

## Returns

`DexConfigsByDex`

A DexConfigsByDex object where each dexType is a key and the corresponding DexConfigBase is the value.

## Defined in

[packages/utils/src/exchanges/dexConfigs.ts:193](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/utils/src/exchanges/dexConfigs.ts#L193)
