[**@dex-toolkit/types v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/types](../README.md) / ContractDetailsV3

# Type Alias: ContractDetailsV3\<TRouter, TFactory, TQuoter, TPositionManager, TPool\>

> **ContractDetailsV3**\<`TRouter`, `TFactory`, `TQuoter`, `TPositionManager`, `TPool`\>: `object`

Represents the contract details for Uniswap V3, including the router, factory, quoter, and position manager contracts.
The generic parameters allow overriding the default method name mappings.

## Type Parameters

• **TRouter** = [`MethodNameMap`](../namespaces/UniswapRouterV3Types/type-aliases/MethodNameMap.md)

• **TFactory** = [`MethodNameMap`](../namespaces/UniswapFactoryV3Types/type-aliases/MethodNameMap.md)

• **TQuoter** = [`MethodNameMap`](../namespaces/UniswapQuoterV3Types/type-aliases/MethodNameMap.md)

• **TPositionManager** = [`MethodNameMap`](../namespaces/UniswapPositionManagerV3Types/type-aliases/MethodNameMap.md)

• **TPool** = [`MethodNameMap`](../namespaces/UniswapPoolV3Types/type-aliases/MethodNameMap.md)

## Type declaration

### factory

> **factory**: `ContractDetail`\<`TFactory`\>

The Uniswap V3 factory contract details, which can have overridden methods.

### feeTiers

> **feeTiers**: readonly `number`[]

The fee tiers for the pool.

### pool

> **pool**: [`ContractDetailUnknown`](ContractDetailUnknown.md)\<`TPool`\>

The Uniswap V3 pool contract details, which can have overridden methods.

### positionManager

> **positionManager**: `ContractDetail`\<`TPositionManager`\>

The Uniswap V3 position manager contract details, which can have overridden methods.

### quoter

> **quoter**: `ContractDetail`\<`TQuoter`\>

The Uniswap V3 quoter contract details, which can have overridden methods.

### router

> **router**: `ContractDetail`\<`TRouter`\>

The Uniswap V3 router contract details, which can have overridden methods.

## Defined in

packages/types/src/contract-detail.types.ts:117
