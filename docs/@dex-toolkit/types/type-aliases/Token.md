[**@dex-toolkit/types v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/types](../README.md) / Token

# Type Alias: Token

> **Token**: `object`

Represents a token on the blockchain.

## Type declaration

### backgroundColor?

> `optional` **backgroundColor**: `string`

The background color associated with the token.

### chainId

> **chainId**: `ChainId`

The chain ID on which the token exists.

### color?

> `optional` **color**: `string`

The primary color associated with the token.

### contractAddress

> **contractAddress**: `Address`

The contract address of the token.

### decimals

> **decimals**: `number`

The number of decimals the token uses.

### hasFeeOnTransfer?

> `optional` **hasFeeOnTransfer**: `boolean`

Indicates whether the token has a fee on transfer.

### logoUri?

> `optional` **logoUri**: `string`

The URI for the token's logo.

### name

> **name**: `string`

The name of the token.

### standard

> **standard**: [`StandardToken`](StandardToken.md)

The standard of the token (e.g., ERC20, ERC721).

### symbol

> **symbol**: `string`

The symbol of the token (e.g., "ETH", "DAI").

## Defined in

packages/types/src/token.types.ts:29
