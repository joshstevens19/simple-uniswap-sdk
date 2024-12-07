[**@dex-toolkit/types v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/types](../README.md) / NodeProviders

# Type Alias: NodeProviders

> **NodeProviders**: `object`

Groups of node providers

## Type declaration

### authenticated?

> `optional` **authenticated**: `Partial`\<`Record`\<[`AuthenticatedProviderType`](AuthenticatedProviderType.md), [`AuthenticatedNodeConfig`](AuthenticatedNodeConfig.md)\>\>

Node providers that require API keys/authentication

### public?

> `optional` **public**: [`NodeConfig`](NodeConfig.md)[]

Public node providers that don't require authentication

## Defined in

packages/types/src/chain.types.ts:52
