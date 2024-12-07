[**@dex-toolkit/contracts v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/contracts](../README.md) / FactoryContractV3

# Class: FactoryContractV3

## Extends

- `DexProviderBase`

## Implements

- `Contract`

## Constructors

### new FactoryContractV3()

> **new FactoryContractV3**(`dexProviderContext`, `contractDetailContext`): [`FactoryContractV3`](FactoryContractV3.md)

#### Parameters

• **dexProviderContext**: `DexMulticallProviderContext`

• **contractDetailContext**: `ContractDetailContext`

#### Returns

[`FactoryContractV3`](FactoryContractV3.md)

#### Overrides

`DexProviderBase.constructor`

#### Defined in

packages/contracts/src/factory/factory-v3.contract.ts:42

## Properties

### \_contract

> `protected` **\_contract**: `ContractContext`

#### Defined in

packages/contracts/src/factory/factory-v3.contract.ts:38

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

packages/contracts/src/factory/factory-v3.contract.ts:40

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

packages/contracts/src/factory/factory-v3.contract.ts:106

***

### methodNames

> `get` **methodNames**(): `MethodNameMap`

Get the method names

#### Returns

`MethodNameMap`

#### Defined in

packages/contracts/src/factory/factory-v3.contract.ts:111

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

### call()

> **call**\<`TCalls`\>(`calls`, `options`): `Promise`\<`ExecutionResult`\<`Contract`, `TCalls`\>\>

Executes a multicall for the given contract methods.

#### Type Parameters

• **TCalls** *extends* `Record`\<`string`, `MethodCall`\<`Contract`, `"owner"`\> \| `MethodCall`\<`Contract`, `"createPool"`\> \| `MethodCall`\<`Contract`, `"enableFeeTier"`\> \| `MethodCall`\<`Contract`, `"feeTierTickSpacing"`\> \| `MethodCall`\<`Contract`, `"getPool"`\> \| `MethodCall`\<`Contract`, `"parameters"`\> \| `MethodCall`\<`Contract`, `"setOwner"`\>\>

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

packages/contracts/src/factory/factory-v3.contract.ts:233

***

### createPool()

> **createPool**(`tokenA`, `tokenB`, `fee`, `overrides`?): `Promise`\<`ContractTransaction`\>

Creates a pool.

#### Parameters

• **tokenA**: `string`

The address of token A.

• **tokenB**: `string`

The address of token B.

• **fee**: `BigNumberish`

The fee amount.

• **overrides?**: `ContractTransactionOverrides`

Optional transaction overrides.

#### Returns

`Promise`\<`ContractTransaction`\>

The contract transaction.

#### Implementation of

`UniswapFactoryV3Types.Contract.createPool`

#### Defined in

packages/contracts/src/factory/factory-v3.contract.ts:275

***

### enableFeeTier()

> **enableFeeTier**(`fee`, `tickSpacing`, `overrides`?): `Promise`\<`ContractTransaction`\>

Enables a fee amount.

#### Parameters

• **fee**: `BigNumberish`

The fee amount.

• **tickSpacing**: `BigNumberish`

The tick spacing.

• **overrides?**: `ContractTransactionOverrides`

Optional transaction overrides.

#### Returns

`Promise`\<`ContractTransaction`\>

The contract transaction.

#### Implementation of

`UniswapFactoryV3Types.Contract.enableFeeTier`

#### Defined in

packages/contracts/src/factory/factory-v3.contract.ts:311

***

### encodeCreatePool()

> **encodeCreatePool**(`tokenA`, `tokenB`, `fee`): `string`

Encodes the function data to create a pool.

#### Parameters

• **tokenA**: `string`

The address of token A.

• **tokenB**: `string`

The address of token B.

• **fee**: `BigNumberish`

The fee amount.

#### Returns

`string`

The encoded function data.

#### Defined in

packages/contracts/src/factory/factory-v3.contract.ts:296

***

### encodeEnableFeeTier()

> **encodeEnableFeeTier**(`fee`, `tickSpacing`): `string`

Encodes the function data to enable a fee amount.

#### Parameters

• **fee**: `BigNumberish`

The fee amount.

• **tickSpacing**: `BigNumberish`

The tick spacing.

#### Returns

`string`

The encoded function data.

#### Defined in

packages/contracts/src/factory/factory-v3.contract.ts:329

***

### encodeSetOwner()

> **encodeSetOwner**(`_owner`): `string`

Encodes the function data to set the owner of the factory.

#### Parameters

• **\_owner**: `string`

The new owner address.

#### Returns

`string`

The encoded function data.

#### Defined in

packages/contracts/src/factory/factory-v3.contract.ts:456

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

### feeTierTickSpacing()

> **feeTierTickSpacing**(`parameter0`): `Promise`\<`number`\>

Returns the tick spacing for a fee amount.

#### Parameters

• **parameter0**: `BigNumberish`

The fee amount.

#### Returns

`Promise`\<`number`\>

The tick spacing.

#### Implementation of

`UniswapFactoryV3Types.Contract.feeTierTickSpacing`

#### Defined in

packages/contracts/src/factory/factory-v3.contract.ts:341

***

### feeTierTickSpacingCallContext()

> **feeTierTickSpacingCallContext**(`parameter0`): `MethodCall`\<`Contract`, `"feeTierTickSpacing"`\>

Returns the call context for the feeTierTickSpacing method.

#### Parameters

• **parameter0**: `BigNumberish`

The fee amount.

#### Returns

`MethodCall`\<`Contract`, `"feeTierTickSpacing"`\>

The call context.

#### Defined in

packages/contracts/src/factory/factory-v3.contract.ts:350

***

### getPool()

> **getPool**(`parameter0`, `parameter1`, `parameter2`): `Promise`\<`string`\>

Returns the address of the pool for the given tokens and fee.

#### Parameters

• **parameter0**: `string`

The address of token 0.

• **parameter1**: `string`

The address of token 1.

• **parameter2**: `BigNumberish`

The fee amount.

#### Returns

`Promise`\<`string`\>

The address of the pool.

#### Implementation of

`UniswapFactoryV3Types.Contract.getPool`

#### Defined in

packages/contracts/src/factory/factory-v3.contract.ts:363

***

### getPoolCallContext()

> **getPoolCallContext**(`parameter0`, `parameter1`, `parameter2`): `MethodCall`\<`Contract`, `"getPool"`\>

Returns the call context for the getPool method.

#### Parameters

• **parameter0**: `string`

The address of token 0.

• **parameter1**: `string`

The address of token 1.

• **parameter2**: `BigNumberish`

The fee amount.

#### Returns

`MethodCall`\<`Contract`, `"getPool"`\>

The call context.

#### Defined in

packages/contracts/src/factory/factory-v3.contract.ts:382

***

### owner()

> **owner**(): `Promise`\<`string`\>

Returns the owner of the factory.

#### Returns

`Promise`\<`string`\>

The owner address.

#### Implementation of

`UniswapFactoryV3Types.Contract.owner`

#### Defined in

packages/contracts/src/factory/factory-v3.contract.ts:398

***

### ownerCallContext()

> **ownerCallContext**(): `MethodCall`\<`Contract`, `"owner"`\>

Returns the call context for the owner method.

#### Returns

`MethodCall`\<`Contract`, `"owner"`\>

The call context.

#### Defined in

packages/contracts/src/factory/factory-v3.contract.ts:406

***

### parameters()

> **parameters**(): `Promise`\<`ParametersResponse`\>

Returns the parameters of the factory.

#### Returns

`Promise`\<`ParametersResponse`\>

The factory parameters.

#### Implementation of

`UniswapFactoryV3Types.Contract.parameters`

#### Defined in

packages/contracts/src/factory/factory-v3.contract.ts:417

***

### parametersCallContext()

> **parametersCallContext**(): `MethodCall`\<`Contract`, `"parameters"`\>

Returns the call context for the parameters method.

#### Returns

`MethodCall`\<`Contract`, `"parameters"`\>

The call context.

#### Defined in

packages/contracts/src/factory/factory-v3.contract.ts:428

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

packages/contracts/src/factory/factory-v3.contract.ts:161

***

### prepareContractContext()

> **prepareContractContext**\<`TCalls`, `TCustomData`\>(`calls`, `customData`?): `ContractContext`\<`Contract`, `TCalls`, `TCustomData`\>

Helper function to dynamically prepare a contract context based on custom or default method names.

#### Type Parameters

• **TCalls** *extends* `Record`\<`string`, `MethodCall`\<`Contract`, `"owner"`\> \| `MethodCall`\<`Contract`, `"createPool"`\> \| `MethodCall`\<`Contract`, `"enableFeeTier"`\> \| `MethodCall`\<`Contract`, `"feeTierTickSpacing"`\> \| `MethodCall`\<`Contract`, `"getPool"`\> \| `MethodCall`\<`Contract`, `"parameters"`\> \| `MethodCall`\<`Contract`, `"setOwner"`\>\>

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

packages/contracts/src/factory/factory-v3.contract.ts:190

***

### setOwner()

> **setOwner**(`_owner`, `overrides`?): `Promise`\<`ContractTransaction`\>

Sets the owner of the factory.

#### Parameters

• **\_owner**: `string`

The new owner address.

• **overrides?**: `ContractTransactionOverrides`

Optional transaction overrides.

#### Returns

`Promise`\<`ContractTransaction`\>

The contract transaction.

#### Implementation of

`UniswapFactoryV3Types.Contract.setOwner`

#### Defined in

packages/contracts/src/factory/factory-v3.contract.ts:441
