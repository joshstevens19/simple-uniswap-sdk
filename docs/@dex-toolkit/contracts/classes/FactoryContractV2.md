[**@dex-toolkit/contracts v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/contracts](../README.md) / FactoryContractV2

# Class: FactoryContractV2

## Extends

- `DexProviderBase`

## Implements

- `Contract`

## Constructors

### new FactoryContractV2()

> **new FactoryContractV2**(`dexProviderContext`, `contractDetailContext`): [`FactoryContractV2`](FactoryContractV2.md)

#### Parameters

• **dexProviderContext**: `DexMulticallProviderContext`

• **contractDetailContext**: `ContractDetailContext`

#### Returns

[`FactoryContractV2`](FactoryContractV2.md)

#### Overrides

`DexProviderBase.constructor`

#### Defined in

packages/contracts/src/factory/factory-v2.contract.ts:40

## Properties

### \_contract

> `protected` **\_contract**: `ContractContext`

#### Defined in

packages/contracts/src/factory/factory-v2.contract.ts:36

***

### \_contractDetail

> `protected` **\_contractDetail**: `ContractDetail`

#### Inherited from

`DexProviderBase._contractDetail`

#### Defined in

submodules/ethereum-multicall/packages/provider/dist/esm/multicall-provider-base.d.ts:4

***

### \_methodNames

> `protected` **\_methodNames**: `MethodNameMap`

#### Defined in

packages/contracts/src/factory/factory-v2.contract.ts:38

***

### \_multicallProvider

> `protected` **\_multicallProvider**: `DexProvider`

#### Inherited from

`DexProviderBase._multicallProvider`

#### Defined in

packages/provider/dist/esm/dex-provider-base.d.ts:6

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

### factoryContract

> `get` **factoryContract**(): `ContractContext`

Get the factory contract

#### Returns

`ContractContext`

#### Defined in

packages/contracts/src/factory/factory-v2.contract.ts:114

***

### methodNames

> `get` **methodNames**(): `MethodNameMap`

Get the method names

#### Returns

`MethodNameMap`

#### Defined in

packages/contracts/src/factory/factory-v2.contract.ts:119

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

## Methods

### allPairs()

> **allPairs**(`parameter0`): `Promise`\<`string`\>

Returns the address of the pair at the specified index.

#### Parameters

• **parameter0**: `BigNumberish`

The index of the pair.

#### Returns

`Promise`\<`string`\>

The address of the pair.

#### Implementation of

`UniswapFactoryV2Types.Contract.allPairs`

#### Defined in

packages/contracts/src/factory/factory-v2.contract.ts:279

***

### allPairsCallContext()

> **allPairsCallContext**(`parameter0`): `MethodCall`\<`Contract`, `"allPairs"`\>

Returns the call context for the allPairs method.

#### Parameters

• **parameter0**: `BigNumberish`

The index of the pair.

#### Returns

`MethodCall`\<`Contract`, `"allPairs"`\>

The call context.

#### Defined in

packages/contracts/src/factory/factory-v2.contract.ts:288

***

### allPairsLength()

> **allPairsLength**(): `Promise`\<`BigNumber`\>

Returns the number of pairs created by the factory.

#### Returns

`Promise`\<`BigNumber`\>

The number of pairs.

#### Implementation of

`UniswapFactoryV2Types.Contract.allPairsLength`

#### Defined in

packages/contracts/src/factory/factory-v2.contract.ts:298

***

### allPairsLengthCallContext()

> **allPairsLengthCallContext**(): `MethodCall`\<`Contract`, `"allPairsLength"`\>

Returns the call context for the allPairsLength method.

#### Returns

`MethodCall`\<`Contract`, `"allPairsLength"`\>

The call context.

#### Defined in

packages/contracts/src/factory/factory-v2.contract.ts:306

***

### call()

> **call**\<`TCalls`\>(`calls`, `options`): `Promise`\<`ExecutionResult`\<`Contract`, `TCalls`\>\>

Executes a multicall for the given contract methods.

#### Type Parameters

• **TCalls** *extends* `Record`\<`string`, `MethodCall`\<`Contract`, `"allPairs"`\> \| `MethodCall`\<`Contract`, `"allPairsLength"`\> \| `MethodCall`\<`Contract`, `"createPair"`\> \| `MethodCall`\<`Contract`, `"feeTo"`\> \| `MethodCall`\<`Contract`, `"feeToSetter"`\> \| `MethodCall`\<`Contract`, `"getPair"`\> \| `MethodCall`\<`Contract`, `"setFeeTo"`\> \| `MethodCall`\<`Contract`, `"setFeeToSetter"`\>\>

The type of the calls object.

#### Parameters

• **calls**: `TCalls`

An object describing the methods to call and their parameters.

• **options**: `ContractContextOptions` = `{}`

Optional configuration for the contract call.

#### Returns

`Promise`\<`ExecutionResult`\<`Contract`, `TCalls`\>\>

A promise that resolves to an object containing the block number,
         origin context, and the results of each method call.

#### Remarks

This method allows batch calling of multiple contract methods in a single transaction.
It uses the multicall provider to execute all calls efficiently.
The results are typed according to the return types of the called methods.

#### Defined in

packages/contracts/src/factory/factory-v2.contract.ts:241

***

### createPair()

> **createPair**(`tokenA`, `tokenB`, `overrides`?): `Promise`\<`ContractTransaction`\>

Creates a pair of tokens.

#### Parameters

• **tokenA**: `string`

The address of token A.

• **tokenB**: `string`

The address of token B.

• **overrides?**: `ContractTransactionOverrides`

Optional transaction overrides

#### Returns

`Promise`\<`ContractTransaction`\>

The contract transaction.

#### Implementation of

`UniswapFactoryV2Types.Contract.createPair`

#### Defined in

packages/contracts/src/factory/factory-v2.contract.ts:320

***

### encodeCreatePair()

> **encodeCreatePair**(`tokenA`, `tokenB`): `string`

Encodes the function data to create a pair of tokens.

#### Parameters

• **tokenA**: `string`

The address of token A.

• **tokenB**: `string`

The address of token B.

#### Returns

`string`

The encoded function data.

#### Defined in

packages/contracts/src/factory/factory-v2.contract.ts:338

***

### encodeSetFeeTo()

> **encodeSetFeeTo**(`_feeTo`): `string`

Encodes the function data to set the fee recipient.

#### Parameters

• **\_feeTo**: `string`

The address of the new fee recipient.

#### Returns

`string`

The encoded function data.

#### Defined in

packages/contracts/src/factory/factory-v2.contract.ts:424

***

### encodeSetFeeToSetter()

> **encodeSetFeeToSetter**(`_feeToSetter`): `string`

Encodes the function data to set the fee setter.

#### Parameters

• **\_feeToSetter**: `string`

The address of the new fee setter.

#### Returns

`string`

The encoded function data.

#### Defined in

packages/contracts/src/factory/factory-v2.contract.ts:449

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

### feeTo()

> **feeTo**(): `Promise`\<`string`\>

Returns the address to which the fees are sent.

#### Returns

`Promise`\<`string`\>

The fee recipient address.

#### Implementation of

`UniswapFactoryV2Types.Contract.feeTo`

#### Defined in

packages/contracts/src/factory/factory-v2.contract.ts:346

***

### feeToCallContext()

> **feeToCallContext**(): `MethodCall`\<`Contract`, `"feeTo"`\>

Returns the call context for the feeTo method.

#### Returns

`MethodCall`\<`Contract`, `"feeTo"`\>

The call context.

#### Defined in

packages/contracts/src/factory/factory-v2.contract.ts:354

***

### feeToSetter()

> **feeToSetter**(): `Promise`\<`string`\>

Returns the address of the fee setter.

#### Returns

`Promise`\<`string`\>

The fee setter address.

#### Implementation of

`UniswapFactoryV2Types.Contract.feeToSetter`

#### Defined in

packages/contracts/src/factory/factory-v2.contract.ts:365

***

### feeToSetterCallContext()

> **feeToSetterCallContext**(): `MethodCall`\<`Contract`, `"feeToSetter"`\>

Returns the call context for the feeToSetter method.

#### Returns

`MethodCall`\<`Contract`, `"feeToSetter"`\>

The call context.

#### Defined in

packages/contracts/src/factory/factory-v2.contract.ts:373

***

### getPair()

> **getPair**(`token0`, `token1`): `Promise`\<`string`\>

Returns the address of the pair for the given tokens.

#### Parameters

• **token0**: `string`

The address of token 0.

• **token1**: `string`

The address of token 1.

#### Returns

`Promise`\<`string`\>

The address of the pair.

#### Implementation of

`UniswapFactoryV2Types.Contract.getPair`

#### Defined in

packages/contracts/src/factory/factory-v2.contract.ts:386

***

### getPairCallContext()

> **getPairCallContext**(`token0`, `token1`): `MethodCall`\<`Contract`, `"getPair"`\>

Returns the call context for the getPair method.

#### Parameters

• **token0**: `string`

The address of token 0.

• **token1**: `string`

The address of token 1.

#### Returns

`MethodCall`\<`Contract`, `"getPair"`\>

The call context.

#### Defined in

packages/contracts/src/factory/factory-v2.contract.ts:396

***

### prepareCallContext()

> `protected` **prepareCallContext**\<`TMethod`\>(`methodName`, `methodParameters`): `MethodCall`\<`Contract`, `TMethod`\>

Helper function to dynamically prepare a call context based on custom or default method names.

#### Type Parameters

• **TMethod** *extends* keyof `Contract`

#### Parameters

• **methodName**: `TMethod`

The name of the method to invoke.

• **methodParameters**: `any`[] = `[]`

The method parameters.

#### Returns

`MethodCall`\<`Contract`, `TMethod`\>

The call context.

#### Defined in

packages/contracts/src/factory/factory-v2.contract.ts:203

***

### prepareContractContext()

> **prepareContractContext**\<`TCalls`, `TCustomData`\>(`calls`, `customData`?): `ContractContext`\<`Contract`, `TCalls`, `TCustomData`\>

Helper function to dynamically prepare a contract context based on custom or default method names.

#### Type Parameters

• **TCalls** *extends* `Record`\<`string`, `MethodCall`\<`Contract`, `"allPairs"`\> \| `MethodCall`\<`Contract`, `"allPairsLength"`\> \| `MethodCall`\<`Contract`, `"createPair"`\> \| `MethodCall`\<`Contract`, `"feeTo"`\> \| `MethodCall`\<`Contract`, `"feeToSetter"`\> \| `MethodCall`\<`Contract`, `"getPair"`\> \| `MethodCall`\<`Contract`, `"setFeeTo"`\> \| `MethodCall`\<`Contract`, `"setFeeToSetter"`\>\>

• **TCustomData** = `unknown`

#### Parameters

• **calls**: `TCalls`

An object containing method calls, each mapped to its parameters.

• **customData?**: `TCustomData`

Optional custom data to include in the context.

#### Returns

`ContractContext`\<`Contract`, `TCalls`, `TCustomData`\>

The contract context, including the address, ABI, calls, and optional custom data.

#### Defined in

packages/contracts/src/factory/factory-v2.contract.ts:169

***

### setFeeTo()

> **setFeeTo**(`_feeTo`, `overrides`?): `Promise`\<`ContractTransaction`\>

Sets the fee recipient.

#### Parameters

• **\_feeTo**: `string`

The address of the new fee recipient.

• **overrides?**: `ContractTransactionOverrides`

Optional transaction overrides.

#### Returns

`Promise`\<`ContractTransaction`\>

The contract transaction.

#### Implementation of

`UniswapFactoryV2Types.Contract.setFeeTo`

#### Defined in

packages/contracts/src/factory/factory-v2.contract.ts:409

***

### setFeeToSetter()

> **setFeeToSetter**(`_feeToSetter`, `overrides`?): `Promise`\<`ContractTransaction`\>

Sets the fee setter.

#### Parameters

• **\_feeToSetter**: `string`

The address of the new fee setter.

• **overrides?**: `ContractTransactionOverrides`

Optional transaction overrides.

#### Returns

`Promise`\<`ContractTransaction`\>

The contract transaction.

#### Implementation of

`UniswapFactoryV2Types.Contract.setFeeToSetter`

#### Defined in

packages/contracts/src/factory/factory-v2.contract.ts:434
