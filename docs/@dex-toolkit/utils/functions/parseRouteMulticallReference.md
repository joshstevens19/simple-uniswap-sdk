[**@dex-toolkit/utils v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/utils](../README.md) / parseRouteMulticallReference

# Function: parseRouteMulticallReference()

> **parseRouteMulticallReference**(`reference`): `object`

Parses a route multicall reference string into an object with the necessary information.

## Parameters

• **reference**: `string`

The reference string in the format `${dexTag}_${protocol}_${versionTag}_${fromToken.contractAddress}_${toToken.contractAddress}_${fromToken.symbol}_${toToken.symbol}`.

## Returns

`object`

An object containing the information extracted from the reference string.

### dexTag

> **dexTag**: `DexTag`

### feeTier?

> `optional` **feeTier**: `FeeTier`

### fromTokenAddress?

> `optional` **fromTokenAddress**: `Address`

### pairSymbols?

> `optional` **pairSymbols**: `string`

### protocol

> **protocol**: `DexProtocol`

### toTokenAddress?

> `optional` **toTokenAddress**: `Address`

### versionTag

> **versionTag**: `VersionTag`

## Defined in

[packages/utils/src/multicall/router-multicall.utils.ts:60](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/utils/src/multicall/router-multicall.utils.ts#L60)
