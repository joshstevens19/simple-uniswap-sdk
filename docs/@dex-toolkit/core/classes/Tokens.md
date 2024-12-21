[**@dex-toolkit/core v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/core](../README.md) / Tokens

# Class: Tokens

A utility class for interacting with tokens in the DEX ecosystem.
It provides functionalities to retrieve token details, balances, allowances, and more.

## Constructors

### new Tokens()

> **new Tokens**(`__namedParameters`): [`Tokens`](Tokens.md)

#### Parameters

• **\_\_namedParameters**

• **\_\_namedParameters.dexContext**: `DexContext`

• **\_\_namedParameters.dexProviderContext**: `DexMulticallProviderContext`

• **\_\_namedParameters.protocolSettings?**: `ProtocolSettings`

• **\_\_namedParameters.tokenList?**: [`TokenList`](TokenList.md)

#### Returns

[`Tokens`](Tokens.md)

#### Defined in

[packages/core/src/tokens.ts:60](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/core/src/tokens.ts#L60)

## Properties

### \_dexConfigsByDex

> `protected` **\_dexConfigsByDex**: `DexConfigsByDex`

DEX configurations grouped by DEX tag.

#### Defined in

[packages/core/src/tokens.ts:53](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/core/src/tokens.ts#L53)

***

### \_dexProvider

> `protected` **\_dexProvider**: `DexProvider`

The underlying `DexProvider` instance for interacting with the blockchain.

#### Defined in

[packages/core/src/tokens.ts:48](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/core/src/tokens.ts#L48)

***

### \_tokenList

> `protected` **\_tokenList**: [`TokenList`](TokenList.md)

An instance of `TokenList` for managing token metadata.

#### Defined in

[packages/core/src/tokens.ts:58](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/core/src/tokens.ts#L58)

## Accessors

### dexConfigsByDex

> `get` **dexConfigsByDex**(): `DexConfigsByDex`

Get the dex configs keyed

#### Returns

`DexConfigsByDex`

#### Defined in

[packages/core/src/tokens.ts:103](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/core/src/tokens.ts#L103)

***

### dexProvider

> `get` **dexProvider**(): `DexProvider`

Returns the underlying `DexProvider`.

#### Returns

`DexProvider`

#### Defined in

[packages/core/src/tokens.ts:98](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/core/src/tokens.ts#L98)

***

### tokenList

> `get` **tokenList**(): [`TokenList`](TokenList.md)

Get the token list factory

#### Returns

[`TokenList`](TokenList.md)

#### Defined in

[packages/core/src/tokens.ts:108](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/core/src/tokens.ts#L108)

## Methods

### getAllowancesAndBalanceOf()

> **getAllowancesAndBalanceOf**\<`TFormat`, `TAddress`\>(`params`): `Promise`\<`Record`\<`TAddress`\[`number`\], `MultiDexTokenWithAllowanceInfo`\<`TFormat`\>\>\>

Retrieves allowance and balance information for a specified list of token contract addresses.
Includes both v2 and v3 data if available.

#### Type Parameters

• **TFormat** *extends* `TradeFormat`

The trade format type.

• **TAddress** *extends* readonly `string`[]

The array of token contract addresses.

#### Parameters

• **params**

The parameters for fetching allowance and balance information.

• **params.format**: `TradeFormatOptions`\<`TFormat`\>

The desired format for balance and allowance values.

• **params.tokenContractAddresses**: `TAddress`

A list of token contract addresses to query.

• **params.walletAddress**: `string`

The wallet address to fetch data for.

#### Returns

`Promise`\<`Record`\<`TAddress`\[`number`\], `MultiDexTokenWithAllowanceInfo`\<`TFormat`\>\>\>

A promise resolving to an object mapping token contract addresses to their corresponding information.

#### Defined in

[packages/core/src/tokens.ts:207](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/core/src/tokens.ts#L207)

***

### getTokenListWithAllowancesAndBalance()

> **getTokenListWithAllowancesAndBalance**\<`TFormat`\>(`params`): `Promise`\<`MultiDexTokenWithAllowanceInfo`\<`TFormat`\>[]\>

Retrieves the allowances and balances for the provided list of tokens.

#### Type Parameters

• **TFormat** *extends* `TradeFormat`

The trade format type.

#### Parameters

• **params**

The parameters for fetching token allowances and balances.

• **params.format**: `TradeFormatOptions`\<`TFormat`\>

The desired format for balance and allowance values.

• **params.includeAllowance?**: `boolean` = `false`

Whether to include allowances in the response.

• **params.walletAddress**: `string`

The wallet address to fetch data for.

#### Returns

`Promise`\<`MultiDexTokenWithAllowanceInfo`\<`TFormat`\>[]\>

A promise resolving to an array of `MultiDexTokenWithAllowanceInfo` objects.

#### Defined in

[packages/core/src/tokens.ts:124](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/core/src/tokens.ts#L124)

***

### getTokens()

> **getTokens**(`tokenContractAddresses`): `Promise`\<`Record`\<`string`, `Token`\>\>

Retrieves metadata and details for a given list of token contract addresses.

#### Parameters

• **tokenContractAddresses**: `string`[]

A list of token contract addresses to query.

#### Returns

`Promise`\<`Record`\<`string`, `Token`\>\>

A promise resolving to an object mapping token contract addresses to `Token` objects.

#### Throws

if the token standard or ABI is not found.

#### Throws

if contract call contexts are not available.

#### Defined in

[packages/core/src/tokens.ts:311](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/core/src/tokens.ts#L311)
