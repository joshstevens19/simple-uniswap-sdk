[**@dex-toolkit/types v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/types](../README.md) / TokenMethodCallMap

# Type Alias: TokenMethodCallMap\<T\>

> **TokenMethodCallMap**\<`T`\>: `T` *extends* `"symbol"` ? `object` : `T` *extends* `"decimals"` ? `object` : `T` *extends* `"name"` ? `object` : `T` *extends* `"balanceOf"` ? `object` : `T` *extends* `"allowanceV2"` ? `object` : `T` *extends* `"allowanceV3"` ? `object` : `never`

Maps individual token method call options to their corresponding method calls.
Provides specific method call mappings for each supported token operation.

## Type Parameters

• **T** *extends* [`TokenCallOption`](TokenCallOption.md)

Token call option defining which method mapping to use

## Defined in

[packages/types/src/token-multicall.types.ts:56](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/token-multicall.types.ts#L56)
