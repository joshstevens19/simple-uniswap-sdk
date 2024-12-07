[**@dex-toolkit/types v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/types](../README.md) / TokenListAsset

# Type Alias: TokenListAsset

> **TokenListAsset**: `object`

Represents an asset in a token list.

## Type declaration

### address

> **address**: `Address`

The contract address of the token.

### chainId

> **chainId**: `ChainId`

The chain ID of the network where the token resides.

### decimals

> **decimals**: `number`

The number of decimal places the token uses.

### isCustom?

> `optional` **isCustom**: `boolean`

(Optional) Indicates whether the token is custom (not predefined).

### logoURI?

> `optional` **logoURI**: `string`

(Optional) The URI of the token's logo image.

### name

> **name**: `string`

The name of the token.

### symbol

> **symbol**: `string`

The symbol of the token.

## Defined in

packages/types/src/token-list.types.ts:10
