[**@dex-toolkit/utils v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/utils](../README.md) / DexMulticall

# Class: DexMulticall

## Extends

- `Multicall`

## Constructors

### new DexMulticall()

> **new DexMulticall**(`dexProvider`): [`DexMulticall`](DexMulticall.md)

#### Parameters

• **dexProvider**: `IDexProvider`

#### Returns

[`DexMulticall`](DexMulticall.md)

#### Overrides

`Multicall.constructor`

#### Defined in

packages/utils/src/multicall/dex-multicall.ts:8

## Properties

### \_executionType

> **\_executionType**: `MulticallExecutionType`

The type of execution for this Multicall instance.

#### Inherited from

`Multicall._executionType`

#### Defined in

submodules/ethereum-multicall/packages/core/dist/esm/multicall.d.ts:9

***

### \_options

> **\_options**: `MulticallOptions`

The options for this Multicall instance.

#### Inherited from

`Multicall._options`

#### Defined in

submodules/ethereum-multicall/packages/core/dist/esm/multicall.d.ts:11

## Methods

### buildAggregateCallContext()

> **buildAggregateCallContext**\<`TContractContexts`\>(`contractCallContexts`): `AggregateCallContext`[]

Builds the aggregate call context from the given contract call contexts.

#### Type Parameters

• **TContractContexts** *extends* `ReferencedContracts`

The type of the contract contexts.

#### Parameters

• **contractCallContexts**: `TContractContexts`\[keyof `TContractContexts`\][]

The contract call contexts to build from.

#### Returns

`AggregateCallContext`[]

An array of aggregate call contexts.

#### Inherited from

`Multicall.buildAggregateCallContext`

#### Defined in

submodules/ethereum-multicall/packages/core/dist/esm/multicall.d.ts:51

***

### buildFailureAggregateResponse()

> **buildFailureAggregateResponse**(`calls`, `error`): `AggregateResponse`

Builds a failure aggregate response for a batch that failed entirely.

#### Parameters

• **calls**: `AggregateCallContext`[]

The calls that failed.

• **error**

The error details.

• **error.code**: `string` \| `number`

• **error.message**: `string`

#### Returns

`AggregateResponse`

The aggregate response.

#### Inherited from

`Multicall.buildFailureAggregateResponse`

#### Defined in

submodules/ethereum-multicall/packages/core/dist/esm/multicall.d.ts:126

***

### buildSuccessfulAggregateResponse()

> **buildSuccessfulAggregateResponse**(`contractResponse`, `calls`): `AggregateResponse`

Builds a successful aggregate response from the contract response.

#### Parameters

• **contractResponse**: `AggregateContractResponse`

The response from the contract.

• **calls**: `AggregateCallContext`[]

The original calls made.

#### Returns

`AggregateResponse`

The built aggregate response.

#### Inherited from

`Multicall.buildSuccessfulAggregateResponse`

#### Defined in

submodules/ethereum-multicall/packages/core/dist/esm/multicall.d.ts:119

***

### call()

> **call**\<`TContractContexts`\>(`contractCallContexts`, `contractCallOptions`?): `Promise`\<`object`\>

Executes multiple contract calls, with optional batching support.

#### Type Parameters

• **TContractContexts** *extends* `ReferencedContracts`

#### Parameters

• **contractCallContexts**: `TContractContexts`

• **contractCallOptions?**: `ContractContextOptions`

#### Returns

`Promise`\<`object`\>

##### batchCount

> **batchCount**: `number`

##### blockNumber

> **blockNumber**: `number`

##### contracts

> **contracts**: \{ \[KContractReference in string \| number \| symbol\]: TContractContexts\[KContractReference\] extends ContractContext\<TContract, TCalls, TCustomData\> ? ContractResults\<TContract, TCalls, TCustomData\> : never \}

#### Inherited from

`Multicall.call`

#### Defined in

submodules/ethereum-multicall/packages/core/dist/esm/multicall.d.ts:28

***

### combineResponses()

> **combineResponses**(`responses`): `AggregateResponse`

#### Parameters

• **responses**: `AggregateResponse`[]

#### Returns

`AggregateResponse`

#### Inherited from

`Multicall.combineResponses`

#### Defined in

submodules/ethereum-multicall/packages/core/dist/esm/multicall.d.ts:43

***

### createBatches()

> **createBatches**(`calls`): `AggregateCallContext`[][]

#### Parameters

• **calls**: `AggregateCallContext`[]

#### Returns

`AggregateCallContext`[][]

#### Inherited from

`Multicall.createBatches`

#### Defined in

submodules/ethereum-multicall/packages/core/dist/esm/multicall.d.ts:42

***

### createCallContext()

> **createCallContext**\<`TContract`, `TCustomData`\>(): \<`TCalls`\>(`context`) => `ContractContext`\<`TContract`, `TCalls`, `TCustomData`\>

Creates a call context for a contract.

#### Type Parameters

• **TContract** *extends* `Record`\<`string`, `any`\>

The type of the contract.

• **TCustomData** = `unknown`

The type of custom data.

#### Returns

`Function`

A function that creates a call context for the specified contract.

##### Type Parameters

• **TCalls** *extends* `Record`\<`string`, `DiscriminatedMethodCalls`\<`TContract`\>\[`MethodNames`\<`TContract`\>\]\>

##### Parameters

• **context**: `ContractContext`\<`TContract`, `TCalls`, `TCustomData`\>

##### Returns

`ContractContext`\<`TContract`, `TCalls`, `TCustomData`\>

#### Inherited from

`Multicall.createCallContext`

#### Defined in

submodules/ethereum-multicall/packages/core/dist/esm/multicall.d.ts:24

***

### decodeBytes32IfNecessary()

> **decodeBytes32IfNecessary**(`returnData`, `outputTypes`): `any`

Attempts to decode a value as `bytes32` if standard decoding fails.

#### Parameters

• **returnData**: `any`

The raw return data from the contract call.

• **outputTypes**: `AbiOutput`[]

The expected output types from the ABI.

#### Returns

`any`

The decoded value or `undefined` if decoding fails.

#### Inherited from

`Multicall.decodeBytes32IfNecessary`

#### Defined in

submodules/ethereum-multicall/packages/core/dist/esm/multicall.d.ts:70

***

### execute()

> **execute**(`calls`, `options`): `Promise`\<`AggregateResponse`\>

Executes the multicall based on the execution type.

#### Parameters

• **calls**: `AggregateCallContext`[]

The calls to execute.

• **options**: `ContractContextOptions`

The options for the execution.

#### Returns

`Promise`\<`AggregateResponse`\>

A promise that resolves to the aggregate response.

#### Inherited from

`Multicall.execute`

#### Defined in

submodules/ethereum-multicall/packages/core/dist/esm/multicall.d.ts:84

***

### executeBatchesSequentially()

> **executeBatchesSequentially**(`batches`, `contractCallOptions`): `Promise`\<`AggregateResponse`[]\>

Executes batches of contract calls sequentially, stopping if an error occurs (unless `tryAggregate` is enabled).
Each batch is processed one after the other to maintain sequential order and error handling.

#### Parameters

• **batches**: `AggregateCallContext`[][]

An array of call batches to be executed, each batch containing multiple `AggregateCallContext` items.

• **contractCallOptions**: `ContractContextOptions`

Options for each contract call execution, such as block number and aggregation settings.

#### Returns

`Promise`\<`AggregateResponse`[]\>

A promise that resolves to an array of `AggregateResponse`.

#### Inherited from

`Multicall.executeBatchesSequentially`

#### Defined in

submodules/ethereum-multicall/packages/core/dist/esm/multicall.d.ts:41

***

### executeOnChain()

> **executeOnChain**(`calls`, `options`): `Promise`\<`AggregateResponse`\>

Executes the multicall using Ethers, Web3, or a custom JSON-RPC provider.

#### Parameters

• **calls**: `AggregateCallContext`[]

The aggregated call contexts to be executed.

• **options**: `ContractContextOptions`

Optional configuration for the contract call.

#### Returns

`Promise`\<`AggregateResponse`\>

A promise that resolves to an object containing the block number,
         origin context, and the results of each method call.

#### Remarks

This method allows batch calling of multiple contract methods in a single transaction.
It uses the multicall provider to execute all calls efficiently.
The results are typed according to the return types of the called methods.

#### Inherited from

`Multicall.executeOnChain`

#### Defined in

submodules/ethereum-multicall/packages/core/dist/esm/multicall.d.ts:98

***

### executeWithEthersOrNodeUrl()

> **executeWithEthersOrNodeUrl**(`calls`, `options`): `Promise`\<`AggregateResponse`\>

Executes the multicall using Ethers or a custom JSON-RPC provider.

#### Parameters

• **calls**: `AggregateCallContext`[]

The calls to execute.

• **options**: `ContractContextOptions`

The options for the execution.

#### Returns

`Promise`\<`AggregateResponse`\>

A promise that resolves to the aggregate response.

#### Inherited from

`Multicall.executeWithEthersOrNodeUrl`

#### Defined in

submodules/ethereum-multicall/packages/core/dist/esm/multicall.d.ts:112

***

### executeWithWeb3()

> **executeWithWeb3**(`calls`, `options`): `Promise`\<`AggregateResponse`\>

Executes the multicall using Web3.

#### Parameters

• **calls**: `AggregateCallContext`[]

The calls to execute.

• **options**: `ContractContextOptions`

The options for the execution.

#### Returns

`Promise`\<`AggregateResponse`\>

A promise that resolves to the aggregate response.

#### Inherited from

`Multicall.executeWithWeb3`

#### Defined in

submodules/ethereum-multicall/packages/core/dist/esm/multicall.d.ts:105

***

### findOutputTypesFromAbi()

> **findOutputTypesFromAbi**(`abi`, `methodName`): `undefined` \| `AbiOutput`[]

Finds the output types from an ABI for a given method name.

#### Parameters

• **abi**: (`JsonFragment` \| `AbiItem`)[]

The ABI to search.

• **methodName**: `string`

The name of the method to find output types for.

#### Returns

`undefined` \| `AbiOutput`[]

An array of ABI outputs or undefined if not found.

#### Inherited from

`Multicall.findOutputTypesFromAbi`

#### Defined in

submodules/ethereum-multicall/packages/core/dist/esm/multicall.d.ts:77

***

### formatReturnValues()

> **formatReturnValues**(`decodedReturnValues`): `any`

Formats the decoded return values.

#### Parameters

• **decodedReturnValues**: `any`

The decoded return values to format.

#### Returns

`any`

The formatted return values.

#### Inherited from

`Multicall.formatReturnValues`

#### Defined in

submodules/ethereum-multicall/packages/core/dist/esm/multicall.d.ts:63

***

### getReturnDataFromResult()

> **getReturnDataFromResult**(`result`): `any`

Gets the return data from a result.

#### Parameters

• **result**: `any`

The result to get the return data from.

#### Returns

`any`

The return data.

#### Inherited from

`Multicall.getReturnDataFromResult`

#### Defined in

submodules/ethereum-multicall/packages/core/dist/esm/multicall.d.ts:57

***

### mapCallContextToMatchContractFormat()

> **mapCallContextToMatchContractFormat**(`calls`): `object`[]

Maps the call context to match the contract format.

#### Parameters

• **calls**: `AggregateCallContext`[]

The calls to map.

#### Returns

`object`[]

An array of objects with target and callData properties.

#### Inherited from

`Multicall.mapCallContextToMatchContractFormat`

#### Defined in

submodules/ethereum-multicall/packages/core/dist/esm/multicall.d.ts:135

***

### processResponse()

> **processResponse**\<`TContractContexts`\>(`response`, `contextArray`): `MulticallResults`\<`TContractContexts`\>

#### Type Parameters

• **TContractContexts** *extends* `ReferencedContracts`

#### Parameters

• **response**: `AggregateResponse`

• **contextArray**: [`string`, `ContractContext`\<`any`, `any`, `any`\>][]

#### Returns

`MulticallResults`\<`TContractContexts`\>

#### Inherited from

`Multicall.processResponse`

#### Defined in

submodules/ethereum-multicall/packages/core/dist/esm/multicall.d.ts:44
