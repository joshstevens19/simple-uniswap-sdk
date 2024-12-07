[**@dex-toolkit/types v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/types](../README.md) / ChainConfig

# Type Alias: ChainConfig

> **ChainConfig**: `Omit`\<`Required`\<[`DexCustomNetwork`](DexCustomNetwork.md)\>, `"nativeCurrency"`\> & `object`

Complete configuration for a blockchain network.
This configuration type contains all necessary information to interact with a blockchain,
including network details, available nodes, supported standards, and UI-related information.

## Type declaration

### blockExplorerUrls

> **blockExplorerUrls**: `object`[]

### bridgeUrls?

> `optional` **bridgeUrls**: `object`[]

### chainId

> **chainId**: `ChainId`

### chainName

> **chainName**: `string`

### chainType

> **chainType**: [`ChainType`](ChainType.md)

### color

> **color**: `string`

### displayName

> **displayName**: `string`

### faucets?

> `optional` **faucets**: `object`[]

### gasUrls

> **gasUrls**: `object`[]

### logoUrl?

> `optional` **logoUrl**: `string`

### marketDataIds?

> `optional` **marketDataIds**: `object`

### marketDataIds.coinGeckoId?

> `optional` **marketDataIds.coinGeckoId**: `string`

### marketDataIds.coinMarketCapId?

> `optional` **marketDataIds.coinMarketCapId**: `string`

### nativeCurrency

> **nativeCurrency**: [`Token`](Token.md)

### nodes

> **nodes**: [`NodeProviders`](NodeProviders.md)

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

### supportedDexs

> **supportedDexs**: [`DexType`](DexType.md)[]

### symbol

> **symbol**: `string`

### transactionTypes

> **transactionTypes**: (`"legacy"` \| `"eip2930"` \| `"eip1559"`)[]

## Defined in

packages/types/src/chain.types.ts:83
