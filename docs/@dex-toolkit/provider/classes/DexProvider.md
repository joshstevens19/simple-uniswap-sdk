[**@dex-toolkit/provider v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/provider](../README.md) / DexProvider

# Class: DexProvider

## Extends

- `MulticallProvider`

## Implements

- `IDexProvider`

## Constructors

### new DexProvider()

> **new DexProvider**(`_providerContext`): [`DexProvider`](DexProvider.md)

#### Parameters

• **\_providerContext**: `DexProviderContext`

#### Returns

[`DexProvider`](DexProvider.md)

#### Overrides

`MulticallProvider.constructor`

#### Defined in

[packages/provider/src/dex-provider.ts:32](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/provider/src/dex-provider.ts#L32)

## Properties

### \_chainConfig

> **\_chainConfig**: `undefined` \| `ChainConfig`

#### Implementation of

`IDexProvider._chainConfig`

#### Defined in

[packages/provider/src/dex-provider.ts:28](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/provider/src/dex-provider.ts#L28)

***

### \_ethersProvider

> **\_ethersProvider**: `BaseProvider`

The internal blockchain provider.

#### Implementation of

`IDexProvider._ethersProvider`

#### Inherited from

`MulticallProvider._ethersProvider`

#### Defined in

submodules/multicall-toolkit/packages/provider/dist/esm/multicall-provider.d.ts:5

***

### \_multicall

> **\_multicall**: `Multicall`

The Multicall instance.

#### Implementation of

`IDexProvider._multicall`

#### Inherited from

`MulticallProvider._multicall`

#### Defined in

submodules/multicall-toolkit/packages/provider/dist/esm/multicall-provider.d.ts:7

***

### \_providerContext

> **\_providerContext**: `ProviderContext`

The provider context, which includes chain and network details.

#### Implementation of

`IDexProvider._providerContext`

#### Inherited from

`MulticallProvider._providerContext`

#### Defined in

submodules/multicall-toolkit/packages/provider/dist/esm/multicall-provider.d.ts:6

***

### \_signer?

> `optional` **\_signer**: `Signer`

#### Defined in

[packages/provider/src/dex-provider.ts:30](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/provider/src/dex-provider.ts#L30)

## Accessors

### chainConfig

> `get` **chainConfig**(): `undefined` \| `ChainConfig`

Retrieves the chain configuration for the provider.

#### Returns

`undefined` \| `ChainConfig`

#### Implementation of

`IDexProvider.chainConfig`

#### Defined in

[packages/provider/src/dex-provider.ts:213](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/provider/src/dex-provider.ts#L213)

***

### chainName

> `get` **chainName**(): `string`

Retrieves the name of the chain associated with the provider.

#### Returns

`string`

#### Implementation of

`IDexProvider.chainName`

#### Defined in

[packages/provider/src/dex-provider.ts:221](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/provider/src/dex-provider.ts#L221)

***

### customNetwork

> `get` **customNetwork**(): `undefined` \| `DexCustomNetwork`

#### Returns

`undefined` \| `DexCustomNetwork`

#### Implementation of

`IDexProvider.customNetwork`

#### Overrides

`MulticallProvider.customNetwork`

#### Defined in

[packages/provider/src/dex-provider.ts:217](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/provider/src/dex-provider.ts#L217)

***

### network

> `get` **network**(): `Network`

Retrieves the network details for the blockchain provider.

#### Returns

`Network`

#### Implementation of

`IDexProvider.network`

#### Inherited from

`MulticallProvider.network`

#### Defined in

submodules/multicall-toolkit/packages/provider/dist/esm/multicall-provider.d.ts:11

***

### provider

> `get` **provider**(): `BaseProvider`

Retrieves the blockchain provider instance.

#### Returns

`BaseProvider`

#### Implementation of

`IDexProvider.provider`

#### Inherited from

`MulticallProvider.provider`

#### Defined in

submodules/multicall-toolkit/packages/provider/dist/esm/multicall-provider.d.ts:9

***

### signer

> `get` **signer**(): `undefined` \| `Signer`

Retrieves the signer with the attached provider

#### Returns

`undefined` \| `Signer`

#### Implementation of

`IDexProvider.signer`

#### Defined in

[packages/provider/src/dex-provider.ts:209](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/provider/src/dex-provider.ts#L209)

## Methods

### call()

> **call**\<`TContractContexts`\>(`contractCallContexts`, `contractCallOptions`?): `Promise`\<`MulticallResults`\<`TContractContexts`\>\>

Executes multiple contract calls in a single transaction using the Multicall pattern.
This method aggregates multiple calls to different contracts or methods and returns
their results in a structured format.

#### Type Parameters

• **TContractContexts** *extends* `ReferencedContracts`

#### Parameters

• **contractCallContexts**: `TContractContexts`

• **contractCallOptions?**: `ContractContextOptions`

#### Returns

`Promise`\<`MulticallResults`\<`TContractContexts`\>\>

#### Implementation of

`IDexProvider.call`

#### Inherited from

`MulticallProvider.call`

#### Defined in

submodules/multicall-toolkit/packages/provider/dist/esm/multicall-provider.d.ts:14

***

### createCallContext()

> **createCallContext**\<`TContract`, `TCustomData`\>(): \<`TCalls`\>(`context`) => `ContractContext`\<`TContract`, `TCalls`, `TCustomData`\>

Creates and returns a contract call context to be used in multicall executions.

#### Type Parameters

• **TContract** *extends* `Record`\<`string`, `any`\>

The type of the contract being interacted with.

• **TCustomData** = `unknown`

Custom data to be associated with the call context.

#### Returns

`Function`

A function that creates the contract call context.

##### Type Parameters

• **TCalls** *extends* `Record`\<`string`, `DiscriminatedMethodCalls`\<`TContract`\>\[`MethodNames`\<`TContract`\>\]\>

##### Parameters

• **context**: `ContractContext`\<`TContract`, `TCalls`, `TCustomData`\>

##### Returns

`ContractContext`\<`TContract`, `TCalls`, `TCustomData`\>

#### Implementation of

`IDexProvider.createCallContext`

#### Inherited from

`MulticallProvider.createCallContext`

#### Defined in

submodules/multicall-toolkit/packages/provider/dist/esm/multicall-provider.d.ts:13

***

### getCoinBalance()

> **getCoinBalance**\<`TFormat`\>(`params`): `Promise`\<`TradeFormatValue`\<`TFormat`\>\>

Retrieves the native coin balance for a specific wallet address.

#### Type Parameters

• **TFormat** *extends* `TradeFormat`

#### Parameters

• **params**

The parameters for retrieving the native coin balance.

• **params.format**: `TradeFormatOptions`\<`TFormat`\>

The format in which the balance value is returned.

• **params.walletAddress**: `string`

The address of the wallet.

#### Returns

`Promise`\<`TradeFormatValue`\<`TFormat`\>\>

A promise that resolves to the native coin balance as an IDexNumber.

#### Implementation of

`IDexProvider.getCoinBalance`

#### Defined in

[packages/provider/src/dex-provider.ts:238](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/provider/src/dex-provider.ts#L238)

***

### getContract()

> **getContract**\<`TGeneratedTypedContext`\>(`contractDetail`): `TGeneratedTypedContext`

Creates and returns a contract instance based on the provided contract details.

#### Type Parameters

• **TGeneratedTypedContext**

#### Parameters

• **contractDetail**: `ContractDetail`

The details of the contract to interact with.

#### Returns

`TGeneratedTypedContext`

The generated contract instance of the specified type.

#### Implementation of

`IDexProvider.getContract`

#### Inherited from

`MulticallProvider.getContract`

#### Defined in

submodules/multicall-toolkit/packages/provider/dist/esm/multicall-provider.d.ts:12
