[**@dex-toolkit/provider v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/provider](../README.md) / DexProviderBase

# Class: `abstract` DexProviderBase

## Extends

- `MulticallProviderBase`

## Constructors

### new DexProviderBase()

> **new DexProviderBase**(`dexProviderContext`, `contractDetail`?): [`DexProviderBase`](DexProviderBase.md)

#### Parameters

• **dexProviderContext**: `DexMulticallProviderContext`

• **contractDetail?**: `ContractDetail`

Returns the contract details.

#### Returns

[`DexProviderBase`](DexProviderBase.md)

#### Overrides

`MulticallProviderBase.constructor`

#### Defined in

[packages/provider/src/dex-provider-base.ts:10](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/provider/src/dex-provider-base.ts#L10)

## Properties

### \_contractDetail

> `protected` **\_contractDetail**: `ContractDetail`

#### Inherited from

`MulticallProviderBase._contractDetail`

#### Defined in

submodules/multicall-toolkit/packages/provider/dist/esm/multicall-provider-base.d.ts:4

***

### \_multicallProvider

> `protected` **\_multicallProvider**: [`DexProvider`](DexProvider.md)

#### Overrides

`MulticallProviderBase._multicallProvider`

#### Defined in

[packages/provider/src/dex-provider-base.ts:8](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/provider/src/dex-provider-base.ts#L8)

## Accessors

### contractDetail

> `get` **contractDetail**(): `ContractDetail`

Returns the contract details.

#### Returns

`ContractDetail`

The contract details of the concrete class.

#### Inherited from

`MulticallProviderBase.contractDetail`

#### Defined in

submodules/multicall-toolkit/packages/provider/dist/esm/multicall-provider-base.d.ts:18

***

### dexProvider

> `get` **dexProvider**(): [`DexProvider`](DexProvider.md)

Returns the underlying `DexProvider`.

#### Returns

[`DexProvider`](DexProvider.md)

#### Defined in

[packages/provider/src/dex-provider-base.ts:24](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/provider/src/dex-provider-base.ts#L24)

***

### multicallProvider

> `get` **multicallProvider**(): `MulticallProvider`

Returns the underlying `MulticallProvider`.

#### Returns

`MulticallProvider`

The `MulticallProvider` instance used by this class.

#### Inherited from

`MulticallProviderBase.multicallProvider`

#### Defined in

submodules/multicall-toolkit/packages/provider/dist/esm/multicall-provider-base.d.ts:12

## Methods

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

`MulticallProviderBase.executeCall`

#### Defined in

submodules/multicall-toolkit/packages/provider/dist/esm/multicall-provider-base.d.ts:31
