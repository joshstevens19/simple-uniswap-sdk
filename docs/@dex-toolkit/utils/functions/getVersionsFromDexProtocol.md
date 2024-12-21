[**@dex-toolkit/utils v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/utils](../README.md) / getVersionsFromDexProtocol

# Function: getVersionsFromDexProtocol()

> **getVersionsFromDexProtocol**\<`T`\>(`dexConfig`, `protocol`, `asTag`?): `T` *extends* `true` ? `VersionTag`[] : `Version`[]

Retrieves and sorts versions for a specific DEX protocol from a configuration.
Returns array of Version objects sorted by semantic version (lowest to highest).

## Type Parameters

• **T** *extends* `boolean` = `false`

## Parameters

• **dexConfig**: `DexConfigBase`

The base DEX configuration containing contract details

• **protocol**: `DexProtocol`

The DEX protocol version to get configurations for

• **asTag?**: `T`

If true, returns VersionTag strings instead of Version objects

## Returns

`T` *extends* `true` ? `VersionTag`[] : `Version`[]

Sorted array of versions (as Version objects or VersionTag strings)

## Defined in

[packages/utils/src/utils/version.utils.ts:270](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/utils/src/utils/version.utils.ts#L270)
