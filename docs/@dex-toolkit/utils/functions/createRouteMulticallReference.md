[**@dex-toolkit/utils v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/utils](../README.md) / createRouteMulticallReference

# Function: createRouteMulticallReference()

> **createRouteMulticallReference**(`params`): `string`

Creates a route multicall reference string from the provided information.

## Parameters

• **params**

The parameters for creating the route multicall reference.

• **params.dexTag**: `string`

The dex tag.

• **params.feeTier?**: `number`

The fee amount for V3.

• **params.fromToken?**: `Token`

The from token.

• **params.protocol**: `DexProtocol`

The protocol of the DEX (v2, v3, etc.).

• **params.toToken?**: `Token`

The to token.

• **params.versionTag**: \`$\{number\}-$\{number\}-$\{number\}\`

The version represented as a string.

## Returns

`string`

The route reference string.

## Defined in

[packages/utils/src/multicall/router-multicall.utils.ts:24](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/utils/src/multicall/router-multicall.utils.ts#L24)
