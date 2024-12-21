[**@dex-toolkit/utils v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/utils](../README.md) / parseDexConfigsByDexFromDexContext

# Function: parseDexConfigsByDexFromDexContext()

> **parseDexConfigsByDexFromDexContext**(`params`): `DexConfigsByDex`

Parses a `DexContext` into a `DexConfigsByDex` object, where the keys are `dexType` values.
This function combines the processes of converting a `DexContext` to a `DexConfigContext`
and then mapping it into a `DexConfigsByDex` object.

## Parameters

• **params**

The parameters for the parsing.

• **params.chainId**: `number`

The chain id

• **params.dexContext**: `DexContext`

The `DexContext` to parse, which can be a single `DexChainConfig` or `DexConfigBase`, or an array of them.

• **params.protocolSettings?**: `ProtocolSettings`

The protocol settings (optional)

## Returns

`DexConfigsByDex`

A `DexConfigsByDex` object where each `dexType` is a key and the corresponding `DexConfigBase` is the value.

## Throws

If no matching `DexConfig` is found for a `DexChainConfig`, or if the context is invalid.

## Defined in

[packages/utils/src/exchanges/dexConfigs.ts:222](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/utils/src/exchanges/dexConfigs.ts#L222)
