[**@dex-toolkit/types v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/types](../README.md) / TokenCallContext

# Type Alias: TokenCallContext\<T\>

> **TokenCallContext**\<`T`\>: `T` *extends* [infer First, `...(infer Rest)`] ? `First` *extends* [`TokenCallOption`](TokenCallOption.md) ? `Rest` *extends* [`TokenCallOption`](TokenCallOption.md)[] ? [`TokenMethodCallMap`](TokenMethodCallMap.md)\<`First`\> & [`TokenCallContext`](TokenCallContext.md)\<`Rest`\> : [`TokenMethodCallMap`](TokenMethodCallMap.md)\<`First`\> : `never` : `Record`\<`string`, `never`\>

Creates a context type for token calls based on provided options.

## Type Parameters

• **T** *extends* [`TokenCallOption`](TokenCallOption.md)[]

Array of token call options

## Defined in

[packages/types/src/token-multicall.types.ts:75](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/token-multicall.types.ts#L75)
