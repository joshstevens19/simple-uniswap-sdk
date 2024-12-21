[**@dex-toolkit/contracts v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/contracts](../README.md) / Erc1155Contract

# Class: Erc1155Contract

## Extends

- `DexProviderBase`

## Implements

- `Contract`

## Constructors

### new Erc1155Contract()

> **new Erc1155Contract**(`multicallProviderContext`, `contractDetail`): [`Erc1155Contract`](Erc1155Contract.md)

#### Parameters

• **multicallProviderContext**: `DexMulticallProviderContext`

• **contractDetail**: `ContractDetailToken`

Returns the contract details.

#### Returns

[`Erc1155Contract`](Erc1155Contract.md)

#### Overrides

`DexProviderBase.constructor`

#### Defined in

[packages/contracts/src/token/erc1155.contract.ts:38](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/contracts/src/token/erc1155.contract.ts#L38)

## Properties

### \_contract

> `protected` **\_contract**: `ContractContext`

#### Defined in

[packages/contracts/src/token/erc1155.contract.ts:34](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/contracts/src/token/erc1155.contract.ts#L34)

***

### \_contractDetail

> `protected` **\_contractDetail**: `ContractDetail`

#### Inherited from

`DexProviderBase._contractDetail`

#### Defined in

submodules/multicall-toolkit/packages/provider/dist/esm/multicall-provider-base.d.ts:4

***

### \_methodNames

> `protected` **\_methodNames**: `MethodNameMap`

#### Defined in

[packages/contracts/src/token/erc1155.contract.ts:36](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/contracts/src/token/erc1155.contract.ts#L36)

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

submodules/multicall-toolkit/packages/provider/dist/esm/multicall-provider-base.d.ts:18

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

### erc1155Contract

> `get` **erc1155Contract**(): `ContractContext`

Get the ERC1155 contract

#### Returns

`ContractContext`

#### Defined in

[packages/contracts/src/token/erc1155.contract.ts:59](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/contracts/src/token/erc1155.contract.ts#L59)

***

### methodNames

> `get` **methodNames**(): `MethodNameMap`

Get the method names

#### Returns

`MethodNameMap`

#### Defined in

[packages/contracts/src/token/erc1155.contract.ts:64](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/contracts/src/token/erc1155.contract.ts#L64)

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

submodules/multicall-toolkit/packages/provider/dist/esm/multicall-provider-base.d.ts:12

## Methods

### balanceOf()

> **balanceOf**(`account`, `id`): `Promise`\<`BigNumber`\>

Returns the balance of the specified account for a given token ID.

#### Parameters

• **account**: `string`

The address of the account.

• **id**: `BigNumberish`

The token ID.

#### Returns

`Promise`\<`BigNumber`\>

The balance of the account for the token ID.

#### Implementation of

`Erc1155Types.Contract.balanceOf`

#### Defined in

[packages/contracts/src/token/erc1155.contract.ts:199](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/contracts/src/token/erc1155.contract.ts#L199)

***

### balanceOfBatch()

> **balanceOfBatch**(`accounts`, `ids`): `Promise`\<`BigNumber`[]\>

Returns the balances of multiple accounts for multiple token IDs.

#### Parameters

• **accounts**: `string`[]

The array of account addresses.

• **ids**: `BigNumberish`[]

The array of token IDs.

#### Returns

`Promise`\<`BigNumber`[]\>

The array of balances.

#### Implementation of

`Erc1155Types.Contract.balanceOfBatch`

#### Defined in

[packages/contracts/src/token/erc1155.contract.ts:225](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/contracts/src/token/erc1155.contract.ts#L225)

***

### balanceOfBatchCallContext()

> **balanceOfBatchCallContext**(`accounts`, `ids`): `MethodCall`\<`Contract`, `"balanceOfBatch"`\>

Returns the call context for the balanceOfBatch method.

#### Parameters

• **accounts**: `string`[]

The array of account addresses.

• **ids**: `BigNumberish`[]

The array of token IDs.

#### Returns

`MethodCall`\<`Contract`, `"balanceOfBatch"`\>

The call context.

#### Defined in

[packages/contracts/src/token/erc1155.contract.ts:241](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/contracts/src/token/erc1155.contract.ts#L241)

***

### balanceOfCallContext()

> **balanceOfCallContext**(`account`, `id`): `MethodCall`\<`Contract`, `"balanceOf"`\>

Returns the call context for the balanceOf method.

#### Parameters

• **account**: `string`

The address of the account.

• **id**: `BigNumberish`

The token ID.

#### Returns

`MethodCall`\<`Contract`, `"balanceOf"`\>

The call context.

#### Defined in

[packages/contracts/src/token/erc1155.contract.ts:212](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/contracts/src/token/erc1155.contract.ts#L212)

***

### call()

> **call**\<`TCalls`\>(`calls`, `options`): `Promise`\<`ExecutionResult`\<`Contract`, `TCalls`\>\>

Executes a multicall for the given contract methods.

#### Type Parameters

• **TCalls** *extends* `Record`\<`string`, `MethodCall`\<`Contract`, `"uri"`\> \| `MethodCall`\<`Contract`, `"balanceOf"`\> \| `MethodCall`\<`Contract`, `"balanceOfBatch"`\> \| `MethodCall`\<`Contract`, `"isApprovedForAll"`\> \| `MethodCall`\<`Contract`, `"safeBatchTransferFrom"`\> \| `MethodCall`\<`Contract`, `"safeTransferFrom"`\> \| `MethodCall`\<`Contract`, `"setApprovalForAll"`\> \| `MethodCall`\<`Contract`, `"supportsInterface"`\>\>

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

[packages/contracts/src/token/erc1155.contract.ts:181](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/contracts/src/token/erc1155.contract.ts#L181)

***

### callContractMethod()

> `protected` **callContractMethod**\<`T`\>(`methodName`, `values`?): `Promise`\<`T`\>

Helper function to dynamically invoke a contract method based on custom or default method names.

#### Type Parameters

• **T**

#### Parameters

• **methodName**: `MethodNames`

The name of the method to invoke.

• **values?**: `any`[]

An array of values to pass as arguments to the method.

#### Returns

`Promise`\<`T`\>

The result of the contract method invocation with the appropriate return type.

#### Defined in

[packages/contracts/src/token/erc1155.contract.ts:74](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/contracts/src/token/erc1155.contract.ts#L74)

***

### encodeFunctionData()

> `protected` **encodeFunctionData**(`methodName`, `values`?): `string`

Encodes the function data for the given method name, using custom method names if provided in the contract detail.

#### Parameters

• **methodName**: `MethodNames`

The method name.

• **values?**: `any`[]

The values to encode.

#### Returns

`string`

The encoded function data.

#### Defined in

[packages/contracts/src/token/erc1155.contract.ts:98](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/contracts/src/token/erc1155.contract.ts#L98)

***

### encodeSafeBatchTransferFrom()

> **encodeSafeBatchTransferFrom**(`from`, `to`, `ids`, `amounts`, `data`): `string`

Encodes the function data for a safe batch transfer.

#### Parameters

• **from**: `string`

The address to transfer from.

• **to**: `string`

The address to transfer to.

• **ids**: `BigNumberish`[]

The array of token IDs.

• **amounts**: `BigNumberish`[]

The array of token amounts.

• **data**: `BytesLike`

Additional data to include with the transfer.

#### Returns

`string`

The encoded function data.

#### Defined in

[packages/contracts/src/token/erc1155.contract.ts:310](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/contracts/src/token/erc1155.contract.ts#L310)

***

### encodeSafeTransferFrom()

> **encodeSafeTransferFrom**(`from`, `to`, `id`, `amount`, `data`): `string`

Encodes the function data for a safe transfer.

#### Parameters

• **from**: `string`

The address to transfer from.

• **to**: `string`

The address to transfer to.

• **id**: `BigNumberish`

The token ID.

• **amount**: `BigNumberish`

The amount to transfer.

• **data**: `BytesLike`

Additional data to include with the transfer.

#### Returns

`string`

The encoded function data.

#### Defined in

[packages/contracts/src/token/erc1155.contract.ts:363](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/contracts/src/token/erc1155.contract.ts#L363)

***

### encodeSetApprovalForAll()

> **encodeSetApprovalForAll**(`operator`, `approved`): `string`

Encodes the function data for setting approval for all tokens.

#### Parameters

• **operator**: `string`

The address of the operator.

• **approved**: `boolean`

True to approve the operator, false to revoke approval.

#### Returns

`string`

The encoded function data.

#### Defined in

[packages/contracts/src/token/erc1155.contract.ts:404](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/contracts/src/token/erc1155.contract.ts#L404)

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

submodules/multicall-toolkit/packages/provider/dist/esm/multicall-provider-base.d.ts:31

***

### isApprovedForAll()

> **isApprovedForAll**(`account`, `operator`): `Promise`\<`boolean`\>

Checks if an operator is approved for all tokens of a given account.

#### Parameters

• **account**: `string`

The address of the account.

• **operator**: `string`

The address of the operator.

#### Returns

`Promise`\<`boolean`\>

True if the operator is approved for all tokens, false otherwise.

#### Implementation of

`Erc1155Types.Contract.isApprovedForAll`

#### Defined in

[packages/contracts/src/token/erc1155.contract.ts:254](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/contracts/src/token/erc1155.contract.ts#L254)

***

### isApprovedForAllCallContext()

> **isApprovedForAllCallContext**(`account`, `operator`): `MethodCall`\<`Contract`, `"isApprovedForAll"`\>

Returns the call context for the isApprovedForAll method.

#### Parameters

• **account**: `string`

The address of the account.

• **operator**: `string`

The address of the operator.

#### Returns

`MethodCall`\<`Contract`, `"isApprovedForAll"`\>

The call context.

#### Defined in

[packages/contracts/src/token/erc1155.contract.ts:270](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/contracts/src/token/erc1155.contract.ts#L270)

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

[packages/contracts/src/token/erc1155.contract.ts:114](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/contracts/src/token/erc1155.contract.ts#L114)

***

### prepareContractContext()

> **prepareContractContext**\<`TCalls`, `TCustomData`\>(`calls`, `customData`?): `ContractContext`\<`Contract`, `TCalls`, `TCustomData`\>

Helper function to dynamically prepare a contract context based on custom or default method names.

#### Type Parameters

• **TCalls** *extends* `Record`\<`string`, `MethodCall`\<`Contract`, `"uri"`\> \| `MethodCall`\<`Contract`, `"balanceOf"`\> \| `MethodCall`\<`Contract`, `"balanceOfBatch"`\> \| `MethodCall`\<`Contract`, `"isApprovedForAll"`\> \| `MethodCall`\<`Contract`, `"safeBatchTransferFrom"`\> \| `MethodCall`\<`Contract`, `"safeTransferFrom"`\> \| `MethodCall`\<`Contract`, `"setApprovalForAll"`\> \| `MethodCall`\<`Contract`, `"supportsInterface"`\>\>

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

[packages/contracts/src/token/erc1155.contract.ts:141](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/contracts/src/token/erc1155.contract.ts#L141)

***

### safeBatchTransferFrom()

> **safeBatchTransferFrom**(`from`, `to`, `ids`, `amounts`, `data`, `overrides`?): `Promise`\<`ContractTransaction`\>

Safely transfers multiple token types from one account to another.

#### Parameters

• **from**: `string`

The address to transfer from.

• **to**: `string`

The address to transfer to.

• **ids**: `BigNumberish`[]

The array of token IDs.

• **amounts**: `BigNumberish`[]

The array of token amounts.

• **data**: `BytesLike`

Additional data to include with the transfer.

• **overrides?**: `ContractTransactionOverrides`

Optional transaction overrides.

#### Returns

`Promise`\<`ContractTransaction`\>

A promise that resolves to a contract transaction.

#### Implementation of

`Erc1155Types.Contract.safeBatchTransferFrom`

#### Defined in

[packages/contracts/src/token/erc1155.contract.ts:287](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/contracts/src/token/erc1155.contract.ts#L287)

***

### safeTransferFrom()

> **safeTransferFrom**(`from`, `to`, `id`, `amount`, `data`, `overrides`?): `Promise`\<`ContractTransaction`\>

Safely transfers a single token type from one account to another.

#### Parameters

• **from**: `string`

The address to transfer from.

• **to**: `string`

The address to transfer to.

• **id**: `BigNumberish`

The token ID.

• **amount**: `BigNumberish`

The amount to transfer.

• **data**: `BytesLike`

Additional data to include with the transfer.

• **overrides?**: `ContractTransactionOverrides`

Optional transaction overrides.

#### Returns

`Promise`\<`ContractTransaction`\>

A promise that resolves to a contract transaction.

#### Implementation of

`Erc1155Types.Contract.safeTransferFrom`

#### Defined in

[packages/contracts/src/token/erc1155.contract.ts:336](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/contracts/src/token/erc1155.contract.ts#L336)

***

### setApprovalForAll()

> **setApprovalForAll**(`operator`, `approved`, `overrides`?): `Promise`\<`ContractTransaction`\>

Sets or un-sets approval for a given operator to manage all of the caller's tokens.

#### Parameters

• **operator**: `string`

The address of the operator.

• **approved**: `boolean`

True to approve the operator, false to revoke approval.

• **overrides?**: `ContractTransactionOverrides`

Optional transaction overrides.

#### Returns

`Promise`\<`ContractTransaction`\>

A promise that resolves to a contract transaction.

#### Implementation of

`Erc1155Types.Contract.setApprovalForAll`

#### Defined in

[packages/contracts/src/token/erc1155.contract.ts:386](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/contracts/src/token/erc1155.contract.ts#L386)

***

### supportsInterface()

> **supportsInterface**(`interfaceId`): `Promise`\<`boolean`\>

Checks if the contract implements a specific interface.

#### Parameters

• **interfaceId**: `BytesLike`

The interface ID to check.

#### Returns

`Promise`\<`boolean`\>

True if the contract supports the interface, false otherwise.

#### Implementation of

`Erc1155Types.Contract.supportsInterface`

#### Defined in

[packages/contracts/src/token/erc1155.contract.ts:413](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/contracts/src/token/erc1155.contract.ts#L413)

***

### supportsInterfaceCallContext()

> **supportsInterfaceCallContext**(`interfaceId`): `MethodCall`\<`Contract`, `"supportsInterface"`\>

Returns the call context for the supportsInterface method.

#### Parameters

• **interfaceId**: `BytesLike`

The interface ID to check.

#### Returns

`MethodCall`\<`Contract`, `"supportsInterface"`\>

The call context.

#### Defined in

[packages/contracts/src/token/erc1155.contract.ts:422](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/contracts/src/token/erc1155.contract.ts#L422)

***

### uri()

> **uri**(`id`): `Promise`\<`string`\>

Returns the URI for a given token ID.

#### Parameters

• **id**: `BigNumberish`

The token ID.

#### Returns

`Promise`\<`string`\>

The URI of the token.

#### Implementation of

`Erc1155Types.Contract.uri`

#### Defined in

[packages/contracts/src/token/erc1155.contract.ts:433](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/contracts/src/token/erc1155.contract.ts#L433)

***

### uriCallContext()

> **uriCallContext**(`id`): `MethodCall`\<`Contract`, `"uri"`\>

Returns the call context for the uri method.

#### Parameters

• **id**: `BigNumberish`

The token ID.

#### Returns

`MethodCall`\<`Contract`, `"uri"`\>

The call context.

#### Defined in

[packages/contracts/src/token/erc1155.contract.ts:442](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/contracts/src/token/erc1155.contract.ts#L442)
