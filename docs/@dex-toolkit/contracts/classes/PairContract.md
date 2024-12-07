[**@dex-toolkit/contracts v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/contracts](../README.md) / PairContract

# Class: PairContract

## Extends

- `DexProviderBase`

## Implements

- `Contract`

## Constructors

### new PairContract()

> **new PairContract**(`dexProviderContext`, `contractDetailContext`): [`PairContract`](PairContract.md)

#### Parameters

• **dexProviderContext**: `DexMulticallProviderContext`

• **contractDetailContext**: `ContractDetailWithAddressContext`

#### Returns

[`PairContract`](PairContract.md)

#### Overrides

`DexProviderBase.constructor`

#### Defined in

packages/contracts/src/pair/pair.contract.ts:48

## Properties

### \_contract

> `protected` **\_contract**: `ContractContext`

#### Defined in

packages/contracts/src/pair/pair.contract.ts:44

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

packages/contracts/src/pair/pair.contract.ts:46

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

### methodNames

> `get` **methodNames**(): `MethodNameMap`

Get the method names

#### Returns

`MethodNameMap`

#### Defined in

packages/contracts/src/pair/pair.contract.ts:128

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

### pairContract

> `get` **pairContract**(): `ContractContext`

Get the pair contract

#### Returns

`ContractContext`

#### Defined in

packages/contracts/src/pair/pair.contract.ts:123

## Methods

### DOMAIN\_SEPARATOR()

> **DOMAIN\_SEPARATOR**(): `Promise`\<`string`\>

Returns the domain separator.

#### Returns

`Promise`\<`string`\>

The domain separator.

#### Implementation of

`UniswapPairV2Types.Contract.DOMAIN_SEPARATOR`

#### Defined in

packages/contracts/src/pair/pair.contract.ts:288

***

### DOMAIN\_SEPARATORCallContext()

> **DOMAIN\_SEPARATORCallContext**(): `MethodCall`\<`Contract`, `"DOMAIN_SEPARATOR"`\>

Returns the call context for the DOMAIN_SEPARATOR method.

#### Returns

`MethodCall`\<`Contract`, `"DOMAIN_SEPARATOR"`\>

The call context.

#### Defined in

packages/contracts/src/pair/pair.contract.ts:296

***

### MINIMUM\_LIQUIDITY()

> **MINIMUM\_LIQUIDITY**(): `Promise`\<`BigNumber`\>

Returns the minimum liquidity.

#### Returns

`Promise`\<`BigNumber`\>

The minimum liquidity.

#### Implementation of

`UniswapPairV2Types.Contract.MINIMUM_LIQUIDITY`

#### Defined in

packages/contracts/src/pair/pair.contract.ts:307

***

### MINIMUM\_LIQUIDITYCallContext()

> **MINIMUM\_LIQUIDITYCallContext**(): `MethodCall`\<`Contract`, `"MINIMUM_LIQUIDITY"`\>

Returns the call context for the MINIMUM_LIQUIDITY method.

#### Returns

`MethodCall`\<`Contract`, `"MINIMUM_LIQUIDITY"`\>

The call context.

#### Defined in

packages/contracts/src/pair/pair.contract.ts:315

***

### PERMIT\_TYPEHASH()

> **PERMIT\_TYPEHASH**(): `Promise`\<`string`\>

Returns the PERMIT_TYPEHASH.

#### Returns

`Promise`\<`string`\>

The PERMIT_TYPEHASH.

#### Implementation of

`UniswapPairV2Types.Contract.PERMIT_TYPEHASH`

#### Defined in

packages/contracts/src/pair/pair.contract.ts:326

***

### PERMIT\_TYPEHASHCallContext()

> **PERMIT\_TYPEHASHCallContext**(): `MethodCall`\<`Contract`, `"PERMIT_TYPEHASH"`\>

Returns the call context for the PERMIT_TYPEHASH method.

#### Returns

`MethodCall`\<`Contract`, `"PERMIT_TYPEHASH"`\>

The call context.

#### Defined in

packages/contracts/src/pair/pair.contract.ts:334

***

### allowance()

> **allowance**(`owner`, `spender`): `Promise`\<`BigNumber`\>

Returns the allowance for a given owner and spender.

#### Parameters

• **owner**: `string`

The address of the token owner.

• **spender**: `string`

The address of the spender.

#### Returns

`Promise`\<`BigNumber`\>

The allowance.

#### Implementation of

`UniswapPairV2Types.Contract.allowance`

#### Defined in

packages/contracts/src/pair/pair.contract.ts:347

***

### allowanceCallContext()

> **allowanceCallContext**(`owner`, `spender`): `MethodCall`\<`Contract`, `"allowance"`\>

Returns the call context for the allowance method.

#### Parameters

• **owner**: `string`

The address of the token owner.

• **spender**: `string`

The address of the spender.

#### Returns

`MethodCall`\<`Contract`, `"allowance"`\>

The call context.

#### Defined in

packages/contracts/src/pair/pair.contract.ts:357

***

### approve()

> **approve**(`spender`, `value`, `overrides`?): `Promise`\<`ContractTransaction`\>

Approves a spender to spend a specified amount.

#### Parameters

• **spender**: `string`

The address of the spender.

• **value**: `BigNumberish`

The amount to approve.

• **overrides?**: `ContractTransactionOverrides`

Optional transaction overrides.

#### Returns

`Promise`\<`ContractTransaction`\>

The contract transaction.

#### Implementation of

`UniswapPairV2Types.Contract.approve`

#### Defined in

packages/contracts/src/pair/pair.contract.ts:773

***

### balanceOf()

> **balanceOf**(`parameter0`): `Promise`\<`BigNumber`\>

Returns the balance of a given address.

#### Parameters

• **parameter0**: `string`

The address to check the balance of.

#### Returns

`Promise`\<`BigNumber`\>

The balance.

#### Implementation of

`UniswapPairV2Types.Contract.balanceOf`

#### Defined in

packages/contracts/src/pair/pair.contract.ts:582

***

### balanceOfCallContext()

> **balanceOfCallContext**(`parameter0`): `MethodCall`\<`Contract`, `"balanceOf"`\>

Returns the call context for the balanceOf method.

#### Parameters

• **parameter0**: `string`

The address to check the balance of.

#### Returns

`MethodCall`\<`Contract`, `"balanceOf"`\>

The call context.

#### Defined in

packages/contracts/src/pair/pair.contract.ts:591

***

### burn()

> **burn**(`to`, `overrides`?): `Promise`\<`ContractTransaction`\>

Burns liquidity tokens.

#### Parameters

• **to**: `string`

The address to which the underlying tokens will be sent.

• **overrides?**: `ContractTransactionOverrides`

Optional transaction overrides.

#### Returns

`Promise`\<`ContractTransaction`\>

The contract transaction.

#### Implementation of

`UniswapPairV2Types.Contract.burn`

#### Defined in

packages/contracts/src/pair/pair.contract.ts:478

***

### call()

> **call**\<`TCalls`\>(`calls`, `options`): `Promise`\<`ExecutionResult`\<`Contract`, `TCalls`\>\>

Executes a multicall for the given contract methods.

#### Type Parameters

• **TCalls** *extends* `Record`\<`string`, `MethodCall`\<`Contract`, `"symbol"`\> \| `MethodCall`\<`Contract`, `"name"`\> \| `MethodCall`\<`Contract`, `"swap"`\> \| `MethodCall`\<`Contract`, `"sync"`\> \| `MethodCall`\<`Contract`, `"initialize"`\> \| `MethodCall`\<`Contract`, `"factory"`\> \| `MethodCall`\<`Contract`, `"allowance"`\> \| `MethodCall`\<`Contract`, `"approve"`\> \| `MethodCall`\<`Contract`, `"balanceOf"`\> \| `MethodCall`\<`Contract`, `"decimals"`\> \| `MethodCall`\<`Contract`, `"totalSupply"`\> \| `MethodCall`\<`Contract`, `"transfer"`\> \| `MethodCall`\<`Contract`, `"transferFrom"`\> \| `MethodCall`\<`Contract`, `"DOMAIN_SEPARATOR"`\> \| `MethodCall`\<`Contract`, `"MINIMUM_LIQUIDITY"`\> \| `MethodCall`\<`Contract`, `"PERMIT_TYPEHASH"`\> \| `MethodCall`\<`Contract`, `"burn"`\> \| `MethodCall`\<`Contract`, `"getReserves"`\> \| `MethodCall`\<`Contract`, `"kLast"`\> \| `MethodCall`\<`Contract`, `"mint"`\> \| `MethodCall`\<`Contract`, `"nonces"`\> \| `MethodCall`\<`Contract`, `"permit"`\> \| `MethodCall`\<`Contract`, `"price0CumulativeLast"`\> \| `MethodCall`\<`Contract`, `"price1CumulativeLast"`\> \| `MethodCall`\<`Contract`, `"skim"`\> \| `MethodCall`\<`Contract`, `"token0"`\> \| `MethodCall`\<`Contract`, `"token1"`\>\>

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

packages/contracts/src/pair/pair.contract.ts:250

***

### decimals()

> **decimals**(): `Promise`\<`number`\>

Returns the number of decimals used by the token.

#### Returns

`Promise`\<`number`\>

The number of decimals.

#### Implementation of

`UniswapPairV2Types.Contract.decimals`

#### Defined in

packages/contracts/src/pair/pair.contract.ts:693

***

### decimalsCallContext()

> **decimalsCallContext**(): `MethodCall`\<`Contract`, `"decimals"`\>

Returns the call context for the decimals method.

#### Returns

`MethodCall`\<`Contract`, `"decimals"`\>

The call context.

#### Defined in

packages/contracts/src/pair/pair.contract.ts:701

***

### encodeApprove()

> **encodeApprove**(`spender`, `value`): `string`

Encodes the function data to approve a spender.

#### Parameters

• **spender**: `string`

The address of the spender.

• **value**: `BigNumberish`

The amount to approve.

#### Returns

`string`

The encoded function data.

#### Defined in

packages/contracts/src/pair/pair.contract.ts:791

***

### encodeBurn()

> **encodeBurn**(`to`): `string`

Encodes the function data to burn liquidity tokens.

#### Parameters

• **to**: `string`

The address to which the underlying tokens will be sent.

#### Returns

`string`

The encoded function data.

#### Defined in

packages/contracts/src/pair/pair.contract.ts:490

***

### encodeInitialize()

> **encodeInitialize**(`_token0`, `_token1`): `string`

Encodes the function data for initializing the pair contract.

#### Parameters

• **\_token0**: `string`

The address of token 0.

• **\_token1**: `string`

The address of token 1.

#### Returns

`string`

The encoded function data.

#### Defined in

packages/contracts/src/pair/pair.contract.ts:446

***

### encodeMint()

> **encodeMint**(`to`): `string`

Encodes the function data to mint new liquidity tokens.

#### Parameters

• **to**: `string`

The address to which the liquidity tokens will be sent.

#### Returns

`string`

The encoded function data.

#### Defined in

packages/contracts/src/pair/pair.contract.ts:468

***

### encodePermit()

> **encodePermit**(`owner`, `spender`, `value`, `deadline`, `v`, `r`, `s`): `string`

Encodes the function data for the permit method.

#### Parameters

• **owner**: `string`

The address of the token owner.

• **spender**: `string`

The address of the spender.

• **value**: `BigNumberish`

The amount to transfer.

• **deadline**: `BigNumberish`

The deadline timestamp.

• **v**: `BigNumberish`

The recovery byte of the signature.

• **r**: `BytesLike`

The first 32 bytes of the signature.

• **s**: `BytesLike`

The second 32 bytes of the signature.

#### Returns

`string`

The encoded function data.

#### Defined in

packages/contracts/src/pair/pair.contract.ts:906

***

### encodeSkim()

> **encodeSkim**(`to`): `string`

Encodes the function data to skim token balances.

#### Parameters

• **to**: `string`

The address to which the skimmed tokens will be sent.

#### Returns

`string`

The encoded function data.

#### Defined in

packages/contracts/src/pair/pair.contract.ts:554

***

### encodeSwap()

> **encodeSwap**(`amount0Out`, `amount1Out`, `to`, `data`): `string`

Encodes the function data to swap tokens.

#### Parameters

• **amount0Out**: `BigNumberish`

The amount of token 0 to swap out.

• **amount1Out**: `BigNumberish`

The amount of token 1 to swap out.

• **to**: `string`

The address to which the swapped tokens will be sent.

• **data**: `BytesLike`

Additional data for the swap.

#### Returns

`string`

The encoded function data.

#### Defined in

packages/contracts/src/pair/pair.contract.ts:527

***

### encodeSync()

> **encodeSync**(): `string`

Encodes the function data to synchronize reserves.

#### Returns

`string`

The encoded function data.

#### Defined in

packages/contracts/src/pair/pair.contract.ts:573

***

### encodeTransfer()

> **encodeTransfer**(`to`, `value`): `string`

Encodes the function data to transfer tokens.

#### Parameters

• **to**: `string`

The address to transfer to.

• **value**: `BigNumberish`

The amount to transfer.

#### Returns

`string`

The encoded function data.

#### Defined in

packages/contracts/src/pair/pair.contract.ts:820

***

### encodeTransferFrom()

> **encodeTransferFrom**(`from`, `to`, `value`): `string`

Encodes the function data to transfer tokens from a specified address.

#### Parameters

• **from**: `string`

The address to transfer from.

• **to**: `string`

The address to transfer to.

• **value**: `BigNumberish`

The amount to transfer.

#### Returns

`string`

The encoded function data.

#### Defined in

packages/contracts/src/pair/pair.contract.ts:853

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

### factory()

> **factory**(): `Promise`\<`string`\>

Returns the factory address.

#### Returns

`Promise`\<`string`\>

The factory address.

#### Implementation of

`UniswapPairV2Types.Contract.factory`

#### Defined in

packages/contracts/src/pair/pair.contract.ts:390

***

### factoryCallContext()

> **factoryCallContext**(): `MethodCall`\<`Contract`, `"factory"`\>

Returns the call context for the factory method.

#### Returns

`MethodCall`\<`Contract`, `"factory"`\>

The call context.

#### Defined in

packages/contracts/src/pair/pair.contract.ts:398

***

### getReserves()

> **getReserves**(): `Promise`\<`GetReservesResponse`\>

Returns the reserves of the pair.

#### Returns

`Promise`\<`GetReservesResponse`\>

The reserves of the pair.

#### Implementation of

`UniswapPairV2Types.Contract.getReserves`

#### Defined in

packages/contracts/src/pair/pair.contract.ts:368

***

### getReservesCallContext()

> **getReservesCallContext**(): `MethodCall`\<`Contract`, `"getReserves"`\>

Returns the call context for the getReserves method.

#### Returns

`MethodCall`\<`Contract`, `"getReserves"`\>

The call context.

#### Defined in

packages/contracts/src/pair/pair.contract.ts:379

***

### initialize()

> **initialize**(`_token0`, `_token1`, `overrides`?): `Promise`\<`ContractTransaction`\>

Initializes the pair contract with token addresses.

#### Parameters

• **\_token0**: `string`

The address of token 0.

• **\_token1**: `string`

The address of token 1.

• **overrides?**: `ContractTransactionOverrides`

Optional transaction overrides.

#### Returns

`Promise`\<`ContractTransaction`\>

The contract transaction.

#### Implementation of

`UniswapPairV2Types.Contract.initialize`

#### Defined in

packages/contracts/src/pair/pair.contract.ts:428

***

### kLast()

> **kLast**(): `Promise`\<`BigNumber`\>

Returns the kLast value.

#### Returns

`Promise`\<`BigNumber`\>

The kLast value.

#### Implementation of

`UniswapPairV2Types.Contract.kLast`

#### Defined in

packages/contracts/src/pair/pair.contract.ts:409

***

### kLastCallContext()

> **kLastCallContext**(): `MethodCall`\<`Contract`, `"kLast"`\>

Returns the call context for the kLast method.

#### Returns

`MethodCall`\<`Contract`, `"kLast"`\>

The call context.

#### Defined in

packages/contracts/src/pair/pair.contract.ts:417

***

### mint()

> **mint**(`to`, `overrides`?): `Promise`\<`ContractTransaction`\>

Mints new liquidity tokens.

#### Parameters

• **to**: `string`

The address to which the liquidity tokens will be sent.

• **overrides?**: `ContractTransactionOverrides`

Optional transaction overrides.

#### Returns

`Promise`\<`ContractTransaction`\>

The contract transaction.

#### Implementation of

`UniswapPairV2Types.Contract.mint`

#### Defined in

packages/contracts/src/pair/pair.contract.ts:456

***

### name()

> **name**(): `Promise`\<`string`\>

Returns the name of the token.

#### Returns

`Promise`\<`string`\>

The name of the token.

#### Implementation of

`UniswapPairV2Types.Contract.name`

#### Defined in

packages/contracts/src/pair/pair.contract.ts:658

***

### nameCallContext()

> **nameCallContext**(): `MethodCall`\<`Contract`, `"name"`\>

Returns the call context for the name method.

#### Returns

`MethodCall`\<`Contract`, `"name"`\>

The call context.

#### Defined in

packages/contracts/src/pair/pair.contract.ts:666

***

### nonces()

> **nonces**(`parameter0`): `Promise`\<`BigNumber`\>

Returns the nonce for a given address.

#### Parameters

• **parameter0**: `string`

The address to check the nonce of.

#### Returns

`Promise`\<`BigNumber`\>

The nonce.

#### Implementation of

`UniswapPairV2Types.Contract.nonces`

#### Defined in

packages/contracts/src/pair/pair.contract.ts:751

***

### noncesCallContext()

> **noncesCallContext**(`parameter0`): `MethodCall`\<`Contract`, `"nonces"`\>

Returns the call context for the nonces method.

#### Parameters

• **parameter0**: `string`

The address to check the nonce of.

#### Returns

`MethodCall`\<`Contract`, `"nonces"`\>

The call context.

#### Defined in

packages/contracts/src/pair/pair.contract.ts:760

***

### permit()

> **permit**(`owner`, `spender`, `value`, `deadline`, `v`, `r`, `s`, `overrides`?): `Promise`\<`ContractTransaction`\>

Allows a spender to transfer tokens using a permit.

#### Parameters

• **owner**: `string`

The address of the token owner.

• **spender**: `string`

The address of the spender.

• **value**: `BigNumberish`

The amount to transfer.

• **deadline**: `BigNumberish`

The deadline timestamp.

• **v**: `BigNumberish`

The recovery byte of the signature.

• **r**: `BytesLike`

The first 32 bytes of the signature.

• **s**: `BytesLike`

The second 32 bytes of the signature.

• **overrides?**: `ContractTransactionOverrides`

Optional transaction overrides.

#### Returns

`Promise`\<`ContractTransaction`\>

The contract transaction.

#### Implementation of

`UniswapPairV2Types.Contract.permit`

#### Defined in

packages/contracts/src/pair/pair.contract.ts:873

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

packages/contracts/src/pair/pair.contract.ts:178

***

### prepareContractContext()

> **prepareContractContext**\<`TCalls`, `TCustomData`\>(`calls`, `customData`?): `ContractContext`\<`Contract`, `TCalls`, `TCustomData`\>

Helper function to dynamically prepare a contract context based on custom or default method names.

#### Type Parameters

• **TCalls** *extends* `Record`\<`string`, `MethodCall`\<`Contract`, `"symbol"`\> \| `MethodCall`\<`Contract`, `"name"`\> \| `MethodCall`\<`Contract`, `"swap"`\> \| `MethodCall`\<`Contract`, `"sync"`\> \| `MethodCall`\<`Contract`, `"initialize"`\> \| `MethodCall`\<`Contract`, `"factory"`\> \| `MethodCall`\<`Contract`, `"allowance"`\> \| `MethodCall`\<`Contract`, `"approve"`\> \| `MethodCall`\<`Contract`, `"balanceOf"`\> \| `MethodCall`\<`Contract`, `"decimals"`\> \| `MethodCall`\<`Contract`, `"totalSupply"`\> \| `MethodCall`\<`Contract`, `"transfer"`\> \| `MethodCall`\<`Contract`, `"transferFrom"`\> \| `MethodCall`\<`Contract`, `"DOMAIN_SEPARATOR"`\> \| `MethodCall`\<`Contract`, `"MINIMUM_LIQUIDITY"`\> \| `MethodCall`\<`Contract`, `"PERMIT_TYPEHASH"`\> \| `MethodCall`\<`Contract`, `"burn"`\> \| `MethodCall`\<`Contract`, `"getReserves"`\> \| `MethodCall`\<`Contract`, `"kLast"`\> \| `MethodCall`\<`Contract`, `"mint"`\> \| `MethodCall`\<`Contract`, `"nonces"`\> \| `MethodCall`\<`Contract`, `"permit"`\> \| `MethodCall`\<`Contract`, `"price0CumulativeLast"`\> \| `MethodCall`\<`Contract`, `"price1CumulativeLast"`\> \| `MethodCall`\<`Contract`, `"skim"`\> \| `MethodCall`\<`Contract`, `"token0"`\> \| `MethodCall`\<`Contract`, `"token1"`\>\>

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

packages/contracts/src/pair/pair.contract.ts:207

***

### price0CumulativeLast()

> **price0CumulativeLast**(): `Promise`\<`BigNumber`\>

Returns the cumulative price of token0.

#### Returns

`Promise`\<`BigNumber`\>

The cumulative price of token0.

#### Implementation of

`UniswapPairV2Types.Contract.price0CumulativeLast`

#### Defined in

packages/contracts/src/pair/pair.contract.ts:712

***

### price0CumulativeLastCallContext()

> **price0CumulativeLastCallContext**(): `MethodCall`\<`Contract`, `"price0CumulativeLast"`\>

Returns the call context for the price0CumulativeLast method.

#### Returns

`MethodCall`\<`Contract`, `"price0CumulativeLast"`\>

The call context.

#### Defined in

packages/contracts/src/pair/pair.contract.ts:720

***

### price1CumulativeLast()

> **price1CumulativeLast**(): `Promise`\<`BigNumber`\>

Returns the cumulative price of token1.

#### Returns

`Promise`\<`BigNumber`\>

The cumulative price of token1.

#### Implementation of

`UniswapPairV2Types.Contract.price1CumulativeLast`

#### Defined in

packages/contracts/src/pair/pair.contract.ts:731

***

### price1CumulativeLastCallContext()

> **price1CumulativeLastCallContext**(): `MethodCall`\<`Contract`, `"price1CumulativeLast"`\>

Returns the call context for the price1CumulativeLast method.

#### Returns

`MethodCall`\<`Contract`, `"price1CumulativeLast"`\>

The call context.

#### Defined in

packages/contracts/src/pair/pair.contract.ts:739

***

### skim()

> **skim**(`to`, `overrides`?): `Promise`\<`ContractTransaction`\>

Skims the token balances to the specified address.

#### Parameters

• **to**: `string`

The address to which the skimmed tokens will be sent.

• **overrides?**: `ContractTransactionOverrides`

Optional transaction overrides.

#### Returns

`Promise`\<`ContractTransaction`\>

The contract transaction.

#### Implementation of

`UniswapPairV2Types.Contract.skim`

#### Defined in

packages/contracts/src/pair/pair.contract.ts:542

***

### swap()

> **swap**(`amount0Out`, `amount1Out`, `to`, `data`, `overrides`?): `Promise`\<`ContractTransaction`\>

Swaps tokens.

#### Parameters

• **amount0Out**: `BigNumberish`

The amount of token 0 to swap out.

• **amount1Out**: `BigNumberish`

The amount of token 1 to swap out.

• **to**: `string`

The address to which the swapped tokens will be sent.

• **data**: `BytesLike`

Additional data for the swap.

• **overrides?**: `ContractTransactionOverrides`

Optional transaction overrides.

#### Returns

`Promise`\<`ContractTransaction`\>

The contract transaction.

#### Implementation of

`UniswapPairV2Types.Contract.swap`

#### Defined in

packages/contracts/src/pair/pair.contract.ts:503

***

### symbol()

> **symbol**(): `Promise`\<`string`\>

Returns the symbol of the token.

#### Returns

`Promise`\<`string`\>

The symbol of the token.

#### Implementation of

`UniswapPairV2Types.Contract.symbol`

#### Defined in

packages/contracts/src/pair/pair.contract.ts:674

***

### symbolCallContext()

> **symbolCallContext**(): `MethodCall`\<`Contract`, `"symbol"`\>

Returns the call context for the symbol method.

#### Returns

`MethodCall`\<`Contract`, `"symbol"`\>

The call context.

#### Defined in

packages/contracts/src/pair/pair.contract.ts:682

***

### sync()

> **sync**(`overrides`?): `Promise`\<`ContractTransaction`\>

Synchronizes the reserves of the pair.

#### Parameters

• **overrides?**: `ContractTransactionOverrides`

Optional transaction overrides.

#### Returns

`Promise`\<`ContractTransaction`\>

The contract transaction.

#### Implementation of

`UniswapPairV2Types.Contract.sync`

#### Defined in

packages/contracts/src/pair/pair.contract.ts:563

***

### token0()

> **token0**(): `Promise`\<`string`\>

Returns the address of token0.

#### Returns

`Promise`\<`string`\>

The address of token0.

#### Implementation of

`UniswapPairV2Types.Contract.token0`

#### Defined in

packages/contracts/src/pair/pair.contract.ts:601

***

### token0CallContext()

> **token0CallContext**(): `MethodCall`\<`Contract`, `"token0"`\>

Returns the call context for the token0 method.

#### Returns

`MethodCall`\<`Contract`, `"token0"`\>

The call context.

#### Defined in

packages/contracts/src/pair/pair.contract.ts:609

***

### token1()

> **token1**(): `Promise`\<`string`\>

Returns the address of token1.

#### Returns

`Promise`\<`string`\>

The address of token1.

#### Implementation of

`UniswapPairV2Types.Contract.token1`

#### Defined in

packages/contracts/src/pair/pair.contract.ts:620

***

### token1CallContext()

> **token1CallContext**(): `MethodCall`\<`Contract`, `"token1"`\>

Returns the call context for the token1 method.

#### Returns

`MethodCall`\<`Contract`, `"token1"`\>

The call context.

#### Defined in

packages/contracts/src/pair/pair.contract.ts:628

***

### totalSupply()

> **totalSupply**(): `Promise`\<`BigNumber`\>

Returns the total supply of liquidity tokens.

#### Returns

`Promise`\<`BigNumber`\>

The total supply.

#### Implementation of

`UniswapPairV2Types.Contract.totalSupply`

#### Defined in

packages/contracts/src/pair/pair.contract.ts:639

***

### totalSupplyCallContext()

> **totalSupplyCallContext**(): `MethodCall`\<`Contract`, `"totalSupply"`\>

Returns the call context for the totalSupply method.

#### Returns

`MethodCall`\<`Contract`, `"totalSupply"`\>

The call context.

#### Defined in

packages/contracts/src/pair/pair.contract.ts:647

***

### transfer()

> **transfer**(`to`, `value`, `overrides`?): `Promise`\<`ContractTransaction`\>

Transfers tokens to a specified address.

#### Parameters

• **to**: `string`

The address to transfer to.

• **value**: `BigNumberish`

The amount to transfer.

• **overrides?**: `ContractTransactionOverrides`

Optional transaction overrides.

#### Returns

`Promise`\<`ContractTransaction`\>

The contract transaction.

#### Implementation of

`UniswapPairV2Types.Contract.transfer`

#### Defined in

packages/contracts/src/pair/pair.contract.ts:802

***

### transferFrom()

> **transferFrom**(`from`, `to`, `value`, `overrides`?): `Promise`\<`ContractTransaction`\>

Transfers tokens from a specified address to another address.

#### Parameters

• **from**: `string`

The address to transfer from.

• **to**: `string`

The address to transfer to.

• **value**: `BigNumberish`

The amount to transfer.

• **overrides?**: `ContractTransactionOverrides`

Optional transaction overrides.

#### Returns

`Promise`\<`ContractTransaction`\>

The contract transaction.

#### Implementation of

`UniswapPairV2Types.Contract.transferFrom`

#### Defined in

packages/contracts/src/pair/pair.contract.ts:832
