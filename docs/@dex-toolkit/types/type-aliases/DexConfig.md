[**@dex-toolkit/types v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/types](../README.md) / DexConfig

# Type Alias: DexConfig

> **DexConfig**: [`DexConfigBase`](DexConfigBase.md) & `object`

Represents the full configuration for a DEX.

## Type declaration

### chainId

> **chainId**: `ChainId`

The chain ID of the network the DEX operates on.

### color?

> `optional` **color**: `string`

Optional color for branding the DEX.

### defaultPairs?

> `optional` **defaultPairs**: `object`

Default input/output token pairs used on the DEX.

### defaultPairs.inputAddress

> **defaultPairs.inputAddress**: `Address`

The address of the input token.

### defaultPairs.outputAddress

> **defaultPairs.outputAddress**: `Address`

The address of the output token.

### logoUrl?

> `optional` **logoUrl**: `string`

Optional logo URL for the DEX.

### title

> **title**: `string`

The title or name of the DEX.

## Defined in

[packages/types/src/dex.types.ts:105](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/dex.types.ts#L105)
