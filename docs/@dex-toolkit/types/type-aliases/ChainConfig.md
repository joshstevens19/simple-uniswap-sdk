[**@dex-toolkit/types v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/types](../README.md) / ChainConfig

# Type Alias: ChainConfig

> **ChainConfig**: `Omit`\<`Required`\<[`DexCustomNetwork`](DexCustomNetwork.md)\>, `"nativeCurrency"`\> & `Omit`\<`ChainConfigBase`, `"nativeCurrency"`\> & `object`

Complete configuration for a blockchain network.
This configuration type contains all necessary information to interact with a blockchain,
including network details, available nodes, supported standards, and UI-related information.

## Type declaration

### nativeCurrency

> **nativeCurrency**: [`Token`](Token.md)

### standards

> **standards**: `object`

### standards.token1155

> **standards.token1155**: `object`

### standards.token1155.abi

> **standards.token1155.abi**: `JsonFragment`[]

### standards.token1155.standard

> **standards.token1155.standard**: [`Standard1155`](Standard1155.md)

### standards.token20

> **standards.token20**: `object`

### standards.token20.abi

> **standards.token20.abi**: `JsonFragment`[]

### standards.token20.standard

> **standards.token20.standard**: [`Standard20`](Standard20.md)

### standards.token721

> **standards.token721**: `object`

### standards.token721.abi

> **standards.token721.abi**: `JsonFragment`[]

### standards.token721.standard

> **standards.token721.standard**: [`Standard721`](Standard721.md)

### standards.token777

> **standards.token777**: `object`

### standards.token777.abi

> **standards.token777.abi**: `JsonFragment`[]

### standards.token777.standard

> **standards.token777.standard**: [`Standard777`](Standard777.md)

## Defined in

[packages/types/src/chain.types.ts:18](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/chain.types.ts#L18)
