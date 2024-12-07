[**@dex-toolkit/types v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/types](../README.md) / IDexProvider

# Interface: IDexProvider

Interface representing a DEX provider, which manages interaction with a blockchain provider.

## Extends

- `IMulticallProvider`

## Properties

### \_chainConfig

> **\_chainConfig**: `undefined` \| [`ChainConfig`](../type-aliases/ChainConfig.md)

#### Defined in

packages/types/src/dex-provider.types.ts:63

***

### \_ethersProvider

> **\_ethersProvider**: `BaseProvider`

The internal blockchain provider.

#### Inherited from

`IMulticallProvider._ethersProvider`

#### Defined in

submodules/ethereum-multicall/packages/types/dist/esm/multicall-provider.types.d.ts:38

***

### \_multicall

> **\_multicall**: `IMulticall`

The Multicall instance.

#### Inherited from

`IMulticallProvider._multicall`

#### Defined in

submodules/ethereum-multicall/packages/types/dist/esm/multicall-provider.types.d.ts:42

***

### \_providerContext

> **\_providerContext**: `ProviderContext`

The provider context, which includes chain and network details.

#### Inherited from

`IMulticallProvider._providerContext`

#### Defined in

submodules/ethereum-multicall/packages/types/dist/esm/multicall-provider.types.d.ts:40

## Accessors

### chainConfig

> `get` **chainConfig**(): `undefined` \| [`ChainConfig`](../type-aliases/ChainConfig.md)

Retrieves the chain configuration for the provider.

#### Returns

`undefined` \| [`ChainConfig`](../type-aliases/ChainConfig.md)

#### Defined in

packages/types/src/dex-provider.types.ts:69

***

### chainName

> `get` **chainName**(): `string`

Retrieves the name of the chain associated with the provider.

#### Returns

`string`

#### Defined in

packages/types/src/dex-provider.types.ts:75

***

### customNetwork

> `get` **customNetwork**(): `undefined` \| [`DexCustomNetwork`](../type-aliases/DexCustomNetwork.md)

Retrieves the custom network configuration, if any.

#### Returns

`undefined` \| [`DexCustomNetwork`](../type-aliases/DexCustomNetwork.md)

#### Overrides

`IMulticallProvider.customNetwork`

#### Defined in

packages/types/src/dex-provider.types.ts:72

***

### network

> `get` **network**(): `Network`

Retrieves the network details for the blockchain provider.

#### Returns

`Network`

#### Inherited from

`IMulticallProvider.network`

#### Defined in

submodules/ethereum-multicall/packages/types/dist/esm/multicall-provider.types.d.ts:48

***

### provider

> `get` **provider**(): `BaseProvider`

Retrieves the blockchain provider instance.

#### Returns

`BaseProvider`

#### Inherited from

`IMulticallProvider.provider`

#### Defined in

submodules/ethereum-multicall/packages/types/dist/esm/multicall-provider.types.d.ts:44

***

### signer

> `get` **signer**(): `undefined` \| `Signer`

Retrieves the signer with the attached provider

#### Returns

`undefined` \| `Signer`

#### Defined in

packages/types/src/dex-provider.types.ts:66

## Methods

### call()

> **call**\<`TContractContexts`\>(`contractCallContexts`, `contractCallOptions`): `Promise`\<`MulticallResults`\<`TContractContexts`\>\>

Executes multiple contract calls in a single transaction using the Multicall pattern.
This method aggregates multiple calls to different contracts or methods and returns
their results in a structured format.

#### Type Parameters

• **TContractContexts** *extends* `ReferencedContracts`

#### Parameters

• **contractCallContexts**: `TContractContexts`

• **contractCallOptions**: `ContractContextOptions`

#### Returns

`Promise`\<`MulticallResults`\<`TContractContexts`\>\>

#### Inherited from

`IMulticallProvider.call`

#### Defined in

submodules/ethereum-multicall/packages/types/dist/esm/multicall-provider.types.d.ts:61

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

#### Inherited from

`IMulticallProvider.createCallContext`

#### Defined in

submodules/ethereum-multicall/packages/types/dist/esm/multicall-provider.types.d.ts:69

***

### getCoinBalance()

> **getCoinBalance**\<`TFormat`\>(`params`): `Promise`\<[`TradeFormatValue`](../type-aliases/TradeFormatValue.md)\<`TFormat`\>\>

Retrieves the native coin balance for a specific wallet address.

#### Type Parameters

• **TFormat** *extends* [`TradeFormat`](../type-aliases/TradeFormat.md)

#### Parameters

• **params**

The parameters for retrieving the native coin balance.

• **params.format**: [`TradeFormatOptions`](../type-aliases/TradeFormatOptions.md)\<`TFormat`\>

The format in which the balance value is returned.

• **params.walletAddress**: `string`

The address of the wallet.

#### Returns

`Promise`\<[`TradeFormatValue`](../type-aliases/TradeFormatValue.md)\<`TFormat`\>\>

A promise that resolves to the native coin balance as an IDexNumber.

#### Defined in

packages/types/src/dex-provider.types.ts:86

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

#### Inherited from

`IMulticallProvider.getContract`

#### Defined in

submodules/ethereum-multicall/packages/types/dist/esm/multicall-provider.types.d.ts:55
