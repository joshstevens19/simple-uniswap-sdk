[**@dex-toolkit/core v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/core](../README.md) / TokenContract

# Class: TokenContract

Represents a token contract on the blockchain and provides various utilities to interact with it.

## Extends

- `DexProviderBase`

## Constructors

### new TokenContract()

> **new TokenContract**(`__namedParameters`): [`TokenContract`](TokenContract.md)

#### Parameters

• **\_\_namedParameters**

• **\_\_namedParameters.dexContext**: `DexContext`

• **\_\_namedParameters.dexProviderContext**: `DexMulticallProviderContext`

• **\_\_namedParameters.protocolSettings?**: `ProtocolSettings`

• **\_\_namedParameters.tokenContractAddress**: `string`

• **\_\_namedParameters.tokenList?**: [`TokenList`](TokenList.md)

#### Returns

[`TokenContract`](TokenContract.md)

#### Overrides

`DexProviderBase.constructor`

#### Defined in

packages/core/src/token-contract.ts:81

## Properties

### \_contractDetail

> `protected` **\_contractDetail**: `ContractDetail`

#### Inherited from

`DexProviderBase._contractDetail`

#### Defined in

submodules/ethereum-multicall/packages/provider/dist/esm/multicall-provider-base.d.ts:4

***

### \_dexConfigsByDex

> `protected` **\_dexConfigsByDex**: `DexConfigsByDex`

Configuration details for different DEXs.

#### Defined in

packages/core/src/token-contract.ts:54

***

### \_multicall

> `protected` **\_multicall**: `DexMulticall`

Instance of `DexMulticall` for batch contract calls.

#### Defined in

packages/core/src/token-contract.ts:59

***

### \_multicallProvider

> `protected` **\_multicallProvider**: `DexProvider`

#### Inherited from

`DexProviderBase._multicallProvider`

#### Defined in

packages/provider/dist/esm/dex-provider-base.d.ts:6

***

### \_tokenCache?

> `protected` `optional` **\_tokenCache**: `Token`

Cache for the token details.

#### Defined in

packages/core/src/token-contract.ts:79

***

### \_tokenContract

> `protected` **\_tokenContract**: `Erc20Contract`

Instance of `Erc20Contract` for interacting with the token contract.

#### Defined in

packages/core/src/token-contract.ts:69

***

### \_tokenContractAddress

> `protected` **\_tokenContractAddress**: `string`

Address of the token contract.

#### Defined in

packages/core/src/token-contract.ts:64

***

### \_tokenList

> `protected` **\_tokenList**: [`TokenList`](TokenList.md)

Token list containing metadata about available tokens.

#### Defined in

packages/core/src/token-contract.ts:74

## Accessors

### contractDetail

> `get` **contractDetail**(): `ContractDetail`

Returns the contract details.

#### Returns

`ContractDetail`

The contract details of the concrete class.

#### Inherited from

`DexProviderBase.contractDetail`

#### Defined in

submodules/ethereum-multicall/packages/provider/dist/esm/multicall-provider-base.d.ts:18

***

### dexConfigsByDex

> `get` **dexConfigsByDex**(): `DexConfigsByDex`

Get the dex configs keyed

#### Returns

`DexConfigsByDex`

#### Defined in

packages/core/src/token-contract.ts:153

***

### dexProvider

> `get` **dexProvider**(): `DexProvider`

Returns the underlying `DexProvider`.

#### Returns

`DexProvider`

#### Inherited from

`DexProviderBase.dexProvider`

#### Defined in

packages/provider/dist/esm/dex-provider-base.d.ts:11

***

### multicallProvider

> `get` **multicallProvider**(): `MulticallProvider`

Returns the underlying `MulticallProvider`.

#### Returns

`MulticallProvider`

The `MulticallProvider` instance used by this class.

#### Inherited from

`DexProviderBase.multicallProvider`

#### Defined in

submodules/ethereum-multicall/packages/provider/dist/esm/multicall-provider-base.d.ts:12

***

### tokenContract

> `get` **tokenContract**(): `Erc20Contract`

Get the token contract

#### Returns

`Erc20Contract`

#### Defined in

packages/core/src/token-contract.ts:163

***

### tokenContractAddress

> `get` **tokenContractAddress**(): `string`

Get the token contract address

#### Returns

`string`

#### Defined in

packages/core/src/token-contract.ts:158

***

### tokenList

> `get` **tokenList**(): [`TokenList`](TokenList.md)

Get the token list factory

#### Returns

[`TokenList`](TokenList.md)

#### Defined in

packages/core/src/token-contract.ts:168

## Methods

### allowanceForRouter()

> **allowanceForRouter**\<`TFormat`\>(`params`): `Promise`\<`TradeFormatValue`\<`TFormat`\>\>

Get the allowance for the amount of tokens which can be moved by the router contract

#### Type Parameters

• **TFormat** *extends* `TradeFormat`

#### Parameters

• **params**

The parameters for getting the allowance.

• **params.dexTag**: `string`

The dex tag.

• **params.format**: `TradeFormatOptions`\<`TFormat`\>

The format in which the allowance value is returned.

• **params.protocol**: `DexProtocol`

The protocol of the DEX (v2, v3, etc.).

• **params.versionTag**: \`$\{number\}-$\{number\}-$\{number\}\`

The version tag.

• **params.walletAddress**: `string`

The users ethereum address.

#### Returns

`Promise`\<`TradeFormatValue`\<`TFormat`\>\>

The allowance for the router contract.

#### Throws

If token information is missing or invalid

#### Throws

If contract details are not found

#### Throws

If router configuration is missing

#### Defined in

packages/core/src/token-contract.ts:271

***

### balanceOf()

> **balanceOf**\<`TFormat`\>(`params`): `Promise`\<`TradeFormatValue`\<`TFormat`\>\>

Get the balance the user has of this token or coin

#### Type Parameters

• **TFormat** *extends* `TradeFormat`

#### Parameters

• **params**

The parameters for getting the balance.

• **params.format**: `TradeFormatOptions`\<`TFormat`\>

The format in which the balance value is returned.

• **params.walletAddress**: `string`

The user's Ethereum address.

#### Returns

`Promise`\<`TradeFormatValue`\<`TFormat`\>\>

The balance of the user.

#### Defined in

packages/core/src/token-contract.ts:191

***

### encodeApproveAllowanceData()

> **encodeApproveAllowanceData**(`params`): `string`

Generate the token approve data allowance to move the tokens.
This will return the data for you to send as a transaction

#### Parameters

• **params**

The parameters for generating the approve data.

• **params.amount**: `DexNumber`

The amount you want to allow them to do.

• **params.spender**: `string`

The contract address for which you are allowing to move tokens on your behalf.

#### Returns

`string`

The encoded approve data.

#### Defined in

packages/core/src/token-contract.ts:386

***

### executeCall()

> `protected` **executeCall**\<`TContract`, `TCalls`\>(`calls`, `options`?): `Promise`\<`ExecutionResult`\<`TContract`, `TCalls`\>\>

Executes a multicall for the given contract methods.

#### Type Parameters

• **TContract** *extends* `Record`\<`string`, `any`\>

The contract type.

• **TCalls** *extends* `Record`\<`string`, `DiscriminatedMethodCalls`\<`TContract`\>\[`MethodNames`\<`TContract`\>\]\>

The type of the calls object.

#### Parameters

• **calls**: `TCalls`

An object describing the methods to call and their parameters.

• **options?**: `ContractContextOptions`

Optional configuration for the contract call.

#### Returns

`Promise`\<`ExecutionResult`\<`TContract`, `TCalls`\>\>

A promise that resolves to an object containing the block number,
         origin context, and the results of each method call.

#### Inherited from

`DexProviderBase.executeCall`

#### Defined in

submodules/ethereum-multicall/packages/provider/dist/esm/multicall-provider-base.d.ts:31

***

### getAllowancesAndBalanceOf()

> **getAllowancesAndBalanceOf**\<`TFormat`\>(`params`): `Promise`\<`MultiDexTokenWithAllowanceInfo`\<`TFormat`\>\>

Get allowance and balance for a token across all DEX versions

#### Type Parameters

• **TFormat** *extends* `TradeFormat`

#### Parameters

• **params**

The parameters for getting the allowance and balance.

• **params.format**: `TradeFormatOptions`\<`TFormat`\>

The format in which the balance and allowance values are returned.

• **params.walletAddress**: `string`

The user's Ethereum address.

#### Returns

`Promise`\<`MultiDexTokenWithAllowanceInfo`\<`TFormat`\>\>

A promise that resolves to an AllowanceAndBalanceOf object

#### Defined in

packages/core/src/token-contract.ts:219

***

### getToken()

> **getToken**(): `Promise`\<`Token`\>

Get the token details

#### Returns

`Promise`\<`Token`\>

#### Defined in

packages/core/src/token-contract.ts:403

***

### totalSupply()

> **totalSupply**(): `Promise`\<`DexNumber`\>

Get the total supply of tokens which exist

#### Returns

`Promise`\<`DexNumber`\>

#### Defined in

packages/core/src/token-contract.ts:175
