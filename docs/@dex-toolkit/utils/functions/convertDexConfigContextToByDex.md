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

packages/utils/src/exchanges/dexConfigs.ts:193
