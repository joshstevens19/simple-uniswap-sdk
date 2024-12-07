[**@dex-toolkit/core v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/core](../README.md) / TokenList

# Class: TokenList

Represents a collection of tokens for a specific chain and provides utility methods
to fetch and manage token metadata.

## Implements

- `ITokenList`

## Constructors

### new TokenList()

> **new TokenList**(`__namedParameters`): [`TokenList`](TokenList.md)

#### Parameters

• **\_\_namedParameters**

• **\_\_namedParameters.chainId**: `number`

• **\_\_namedParameters.customNetwork?**: `DexCustomNetwork`

• **\_\_namedParameters.tokenListSources?**: `TokenListSource`[]

#### Returns

[`TokenList`](TokenList.md)

#### Defined in

packages/core/src/token-list.ts:47

## Properties

### \_chainId

> **\_chainId**: `number`

The chain ID for which the token list is relevant.

#### Implementation of

`ITokenList._chainId`

#### Defined in

packages/core/src/token-list.ts:30

***

### \_customNetwork?

> `optional` **\_customNetwork**: `DexCustomNetwork`

Custom network configuration, if applicable.

#### Implementation of

`ITokenList._customNetwork`

#### Defined in

packages/core/src/token-list.ts:35

***

### \_tokenListSources

> **\_tokenListSources**: `TokenListSource`[]

A list of token list sources providing token metadata.

#### Implementation of

`ITokenList._tokenListSources`

#### Defined in

packages/core/src/token-list.ts:40

***

### \_tokens

> **\_tokens**: `Token`[] = `[]`

An internal cache of fetched tokens.

#### Implementation of

`ITokenList._tokens`

#### Defined in

packages/core/src/token-list.ts:45

## Methods

### fetchTokenLists()

> **fetchTokenLists**(): `Promise`\<`Token`[]\>

Fetches token data from all configured token list sources.

#### Returns

`Promise`\<`Token`[]\>

A promise resolving to an array of `Token` objects retrieved from the sources.

#### Implementation of

`ITokenList.fetchTokenLists`

#### Defined in

packages/core/src/token-list.ts:143

***

### getPredefinedToken()

> **getPredefinedToken**(`contractAddress`): `undefined` \| `Token`

Retrieves a predefined token based on the provided contract address.

#### Parameters

• **contractAddress**

The contract address of the token to look up.

• **contractAddress.contractAddress**: `string`

#### Returns

`undefined` \| `Token`

The matching `Token` object if found; otherwise, `undefined`.

#### Implementation of

`ITokenList.getPredefinedToken`

#### Defined in

packages/core/src/token-list.ts:63

***

### getTokens()

> **getTokens**(): `Promise`\<`Token`[]\>

Retrieves the list of tokens, either from the cache or by fetching from sources.

#### Returns

`Promise`\<`Token`[]\>

A promise resolving to an array of `Token` objects.

#### Implementation of

`ITokenList.getTokens`

#### Defined in

packages/core/src/token-list.ts:103

***

### removeDuplicateTokens()

> **removeDuplicateTokens**(`tokens`): `Token`[]

Removes duplicate tokens based on their contract addresses.

#### Parameters

• **tokens**: `Token`[]

The array of tokens to deduplicate.

#### Returns

`Token`[]

An array of unique `Token` objects.

#### Implementation of

`ITokenList.removeDuplicateTokens`

#### Defined in

packages/core/src/token-list.ts:166
