[**@dex-toolkit/types v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/types](../README.md) / TokenListMetadata

# Type Alias: TokenListMetadata

> **TokenListMetadata**: `object`

Represents a token list, including metadata and the tokens themselves.

## Type declaration

### keywords

> **keywords**: `string`[]

A list of keywords associated with the token list.

### logoURI

> **logoURI**: `string`

The URI of the token list's logo.

### name

> **name**: `string`

The name of the token list.

### tags

> **tags**: `Record`\<`string`, `string`\>

A record of tags and their descriptions.

### timestamp

> **timestamp**: `string`

The timestamp of when the list was generated.

### tokens

> **tokens**: [`TokenListAsset`](TokenListAsset.md)[]

An array of tokens in the token list.

### version

> **version**: [`Version`](Version.md)

The version of the token list.

## Defined in

packages/types/src/token-list.types.ts:30
