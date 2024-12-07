[**@dex-toolkit/types v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/types](../README.md) / Protocols

# Type Alias: Protocols\<TV2Router, TV2Factory, TV2Pair, TV3Router, TV3Factory, TV3Quoter, TV3PositionManager, TV3Pool\>

> **Protocols**\<`TV2Router`, `TV2Factory`, `TV2Pair`, `TV3Router`, `TV3Factory`, `TV3Quoter`, `TV3PositionManager`, `TV3Pool`\>: `object`

Represents the protocol configurations for a DEX, supporting both V2 and V3 protocol versions.
Each protocol version can have multiple version-tagged contract configurations with optional custom method mappings.

## Type Parameters

• **TV2Router** = [`MethodNameMap`](../namespaces/UniswapRouterV2Types/type-aliases/MethodNameMap.md)

• **TV2Factory** = [`MethodNameMap`](../namespaces/UniswapFactoryV2Types/type-aliases/MethodNameMap.md)

• **TV2Pair** = [`MethodNameMap`](../namespaces/UniswapPairV2Types/type-aliases/MethodNameMap.md)

• **TV3Router** = [`MethodNameMap`](../namespaces/UniswapRouterV3Types/type-aliases/MethodNameMap.md)

• **TV3Factory** = [`MethodNameMap`](../namespaces/UniswapFactoryV3Types/type-aliases/MethodNameMap.md)

• **TV3Quoter** = [`MethodNameMap`](../namespaces/UniswapQuoterV3Types/type-aliases/MethodNameMap.md)

• **TV3PositionManager** = [`MethodNameMap`](../namespaces/UniswapPositionManagerV3Types/type-aliases/MethodNameMap.md)

• **TV3Pool** = [`MethodNameMap`](../namespaces/UniswapPoolV3Types/type-aliases/MethodNameMap.md)

## Type declaration

### protocolV2?

> `optional` **protocolV2**: `Record`\<[`VersionTag`](VersionTag.md), [`ContractDetailsV2`](ContractDetailsV2.md)\<`TV2Router`, `TV2Factory`, `TV2Pair`\>\>

V2 protocol configurations mapped by version tag.
Each version contains contract details for router, factory, and pair contracts.

### protocolV3?

> `optional` **protocolV3**: `Record`\<[`VersionTag`](VersionTag.md), [`ContractDetailsV3`](ContractDetailsV3.md)\<`TV3Router`, `TV3Factory`, `TV3Quoter`, `TV3PositionManager`, `TV3Pool`\>\>

V3 protocol configurations mapped by version tag.
Each version contains contract details for router, factory, quoter,
position manager, and pool contracts.

## Defined in

packages/types/src/contract-detail.types.ts:142
