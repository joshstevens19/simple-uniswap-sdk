[**@dex-toolkit/types v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/types](../README.md) / TokenClass

# Type Alias: TokenClass

> **TokenClass**: `object`

Represents a class that provides token information for different chains.

## Type declaration

### getTokenForChainId()

> **getTokenForChainId**: (`chainId`) => [`Token`](Token.md) \| `undefined`

Retrieves the token for the specified chain ID.

#### Parameters

• **chainId**: `ChainId`

The ID of the chain to get the token for.

#### Returns

[`Token`](Token.md) \| `undefined`

The token associated with the specified chain ID, or undefined if not found.

## Defined in

[packages/types/src/token.types.ts:12](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/token.types.ts#L12)
