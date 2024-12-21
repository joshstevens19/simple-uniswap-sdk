[**@dex-toolkit/types v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/types](../README.md) / DexAuthenticatedProviderContext

# Type Alias: DexAuthenticatedProviderContext

> **DexAuthenticatedProviderContext**: `BaseProviderContext` & `object`

Context for a Provider when connecting to a chain with an authenticated provider

## Type declaration

### apiKey

> **apiKey**: `string`

API key for the provider

### chainId

> **chainId**: `ChainId`

The chain ID of the network.

### providerType

> **providerType**: `AuthenticatedProviderType`

Type of provider, e.g. 'infura'

## Defined in

[packages/types/src/dex-provider.types.ts:20](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/dex-provider.types.ts#L20)
