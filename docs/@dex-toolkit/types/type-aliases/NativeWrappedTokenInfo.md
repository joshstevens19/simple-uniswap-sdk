[**@dex-toolkit/types v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/types](../README.md) / NativeWrappedTokenInfo

# Type Alias: NativeWrappedTokenInfo

> **NativeWrappedTokenInfo**: [`Token`](Token.md) & `object`

Information about the wrapped version of the native currency for a custom network.

## Type declaration

### abi?

> `optional` **abi**: `JsonFragment`[]

(Optional) ABI of the wrapped token contract.

### methods?

> `optional` **methods**: `Partial`\<[`MethodNameMap`](../namespaces/WrappedTypes/type-aliases/MethodNameMap.md)\>

(Optional) Methods available on the wrapped token contract.

## Defined in

[packages/types/src/trade.types.ts:187](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/trade.types.ts#L187)
