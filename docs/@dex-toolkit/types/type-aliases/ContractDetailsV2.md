[**@dex-toolkit/types v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/types](../README.md) / ContractDetailsV2

# Type Alias: ContractDetailsV2\<TRouter, TFactory, TPair\>

> **ContractDetailsV2**\<`TRouter`, `TFactory`, `TPair`\>: `object`

Represents the contract details for Uniswap V2, including the router, factory, and pair contracts.
The generic parameters allow overriding the default method name mappings.

## Type Parameters

• **TRouter** = [`MethodNameMap`](../namespaces/UniswapRouterV2Types/type-aliases/MethodNameMap.md)

• **TFactory** = [`MethodNameMap`](../namespaces/UniswapFactoryV2Types/type-aliases/MethodNameMap.md)

• **TPair** = [`MethodNameMap`](../namespaces/UniswapPairV2Types/type-aliases/MethodNameMap.md)

## Type declaration

### factory

> **factory**: `ContractDetail`\<`TFactory`\>

The Uniswap V2 factory contract details, which can have overridden methods.

### feePercent

> **feePercent**: `number`

The fee percent for the Uniswap V2 pair.

### pair

> **pair**: [`ContractDetailUnknown`](ContractDetailUnknown.md)\<`TPair`\>

The Uniswap V2 pair contract details, which can have overridden methods.

### router

> **router**: `ContractDetail`\<`TRouter`\>

The Uniswap V2 router contract details, which can have overridden methods.

## Defined in

packages/types/src/contract-detail.types.ts:98
