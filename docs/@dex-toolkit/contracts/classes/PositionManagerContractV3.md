[**@dex-toolkit/contracts v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/contracts](../README.md) / PositionManagerContractV3

# Class: PositionManagerContractV3

## Extends

- `DexProviderBase`

## Implements

- `Contract`

## Constructors

### new PositionManagerContractV3()

> **new PositionManagerContractV3**(`dexProviderContext`, `contractDetailContext`): [`PositionManagerContractV3`](PositionManagerContractV3.md)

#### Parameters

• **dexProviderContext**: `DexMulticallProviderContext`

• **contractDetailContext**: `ContractDetailContext`

#### Returns

[`PositionManagerContractV3`](PositionManagerContractV3.md)

#### Overrides

`DexProviderBase.constructor`

#### Defined in

packages/contracts/src/position/position-manager.contract.ts:48

## Properties

### \_contract

> `protected` **\_contract**: `ContractContext`

#### Defined in

packages/contracts/src/position/position-manager.contract.ts:44

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

packages/contracts/src/position/position-manager.contract.ts:46

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

packages/contracts/src/position/position-manager.contract.ts:114

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

### positionManagerContract

> `get` **positionManagerContract**(): `ContractContext`

Get the position manager contract

#### Returns

`ContractContext`

#### Defined in

packages/contracts/src/position/position-manager.contract.ts:109

## Methods

### DOMAIN\_SEPARATOR()

> **DOMAIN\_SEPARATOR**(): `Promise`\<`string`\>

Returns the DOMAIN_SEPARATOR used in the permit function.

#### Returns

`Promise`\<`string`\>

The DOMAIN_SEPARATOR.

#### Implementation of

`UniswapPositionManagerV3Types.Contract.DOMAIN_SEPARATOR`

#### Defined in

packages/contracts/src/position/position-manager.contract.ts:298

***

### DOMAIN\_SEPARATORCallContext()

> **DOMAIN\_SEPARATORCallContext**(): `MethodCall`\<`Contract`, `"DOMAIN_SEPARATOR"`\>

Returns the call context for the DOMAIN_SEPARATOR method.

#### Returns

`MethodCall`\<`Contract`, `"DOMAIN_SEPARATOR"`\>

The call context.

#### Defined in

packages/contracts/src/position/position-manager.contract.ts:306

***

### PERMIT\_TYPEHASH()

> **PERMIT\_TYPEHASH**(): `Promise`\<`string`\>

Returns the PERMIT_TYPEHASH used in the permit function.

#### Returns

`Promise`\<`string`\>

The PERMIT_TYPEHASH.

#### Implementation of

`UniswapPositionManagerV3Types.Contract.PERMIT_TYPEHASH`

#### Defined in

packages/contracts/src/position/position-manager.contract.ts:317

***

### PERMIT\_TYPEHASHCallContext()

> **PERMIT\_TYPEHASHCallContext**(): `MethodCall`\<`Contract`, `"PERMIT_TYPEHASH"`\>

Returns the call context for the PERMIT_TYPEHASH method.

#### Returns

`MethodCall`\<`Contract`, `"PERMIT_TYPEHASH"`\>

The call context.

#### Defined in

packages/contracts/src/position/position-manager.contract.ts:325

***

### WETH9()

> **WETH9**(): `Promise`\<`string`\>

Returns the WETH9 address.

#### Returns

`Promise`\<`string`\>

The WETH9 address.

#### Implementation of

`UniswapPositionManagerV3Types.Contract.WETH9`

#### Defined in

packages/contracts/src/position/position-manager.contract.ts:336

***

### WETH9CallContext()

> **WETH9CallContext**(): `MethodCall`\<`Contract`, `"WETH9"`\>

Returns the call context for the WETH9 method.

#### Returns

`MethodCall`\<`Contract`, `"WETH9"`\>

The call context.

#### Defined in

packages/contracts/src/position/position-manager.contract.ts:344

***

### approve()

> **approve**(`to`, `tokenId`, `overrides`?): `Promise`\<`ContractTransaction`\>

Approves a spender to transfer a specific NFT.

#### Parameters

• **to**: `string`

The address to approve.

• **tokenId**: `BigNumberish`

The ID of the token to approve.

• **overrides?**: `ContractTransactionOverrides`

Optional transaction overrides.

#### Returns

`Promise`\<`ContractTransaction`\>

The contract transaction.

#### Implementation of

`UniswapPositionManagerV3Types.Contract.approve`

#### Defined in

packages/contracts/src/position/position-manager.contract.ts:358

***

### balanceOf()

> **balanceOf**(`owner`): `Promise`\<`BigNumber`\>

Returns the number of tokens owned by an address.

#### Parameters

• **owner**: `string`

The address to check.

#### Returns

`Promise`\<`BigNumber`\>

The number of tokens owned.

#### Implementation of

`UniswapPositionManagerV3Types.Contract.balanceOf`

#### Defined in

packages/contracts/src/position/position-manager.contract.ts:385

***

### balanceOfCallContext()

> **balanceOfCallContext**(`owner`): `MethodCall`\<`Contract`, `"balanceOf"`\>

Returns the call context for the balanceOf method.

#### Parameters

• **owner**: `string`

The address to check.

#### Returns

`MethodCall`\<`Contract`, `"balanceOf"`\>

The call context.

#### Defined in

packages/contracts/src/position/position-manager.contract.ts:394

***

### baseURI()

> **baseURI**(): `Promise`\<`string`\>

Returns the base URI for computing {tokenURI}.

#### Returns

`Promise`\<`string`\>

The base URI.

#### Implementation of

`UniswapPositionManagerV3Types.Contract.baseURI`

#### Defined in

packages/contracts/src/position/position-manager.contract.ts:404

***

### baseURICallContext()

> **baseURICallContext**(): `MethodCall`\<`Contract`, `"baseURI"`\>

Returns the call context for the baseURI method.

#### Returns

`MethodCall`\<`Contract`, `"baseURI"`\>

The call context.

#### Defined in

packages/contracts/src/position/position-manager.contract.ts:412

***

### burn()

> **burn**(`tokenId`, `overrides`?): `Promise`\<`ContractTransaction`\>

Burns a token.

#### Parameters

• **tokenId**: `BigNumberish`

The ID of the token to burn.

• **overrides?**: `ContractTransactionOverrides`

Optional transaction overrides.

#### Returns

`Promise`\<`ContractTransaction`\>

The contract transaction.

#### Implementation of

`UniswapPositionManagerV3Types.Contract.burn`

#### Defined in

packages/contracts/src/position/position-manager.contract.ts:425

***

### call()

> **call**\<`TCalls`\>(`calls`, `options`): `Promise`\<`ExecutionResult`\<`Contract`, `TCalls`\>\>

Executes a multicall for the given contract methods.

#### Type Parameters

• **TCalls** *extends* `Record`\<`string`, `MethodCall`\<`Contract`, `"symbol"`\> \| `MethodCall`\<`Contract`, `"name"`\> \| `MethodCall`\<`Contract`, `"baseURI"`\> \| `MethodCall`\<`Contract`, `"factory"`\> \| `MethodCall`\<`Contract`, `"approve"`\> \| `MethodCall`\<`Contract`, `"balanceOf"`\> \| `MethodCall`\<`Contract`, `"totalSupply"`\> \| `MethodCall`\<`Contract`, `"transferFrom"`\> \| `MethodCall`\<`Contract`, `"isApprovedForAll"`\> \| `MethodCall`\<`Contract`, `"safeTransferFrom"`\> \| `MethodCall`\<`Contract`, `"setApprovalForAll"`\> \| `MethodCall`\<`Contract`, `"supportsInterface"`\> \| `MethodCall`\<`Contract`, `"getApproved"`\> \| `MethodCall`\<`Contract`, `"ownerOf"`\> \| `MethodCall`\<`Contract`, `"tokenURI"`\> \| `MethodCall`\<`Contract`, `"DOMAIN_SEPARATOR"`\> \| `MethodCall`\<`Contract`, `"PERMIT_TYPEHASH"`\> \| `MethodCall`\<`Contract`, `"burn"`\> \| `MethodCall`\<`Contract`, `"mint"`\> \| `MethodCall`\<`Contract`, `"permit"`\> \| `MethodCall`\<`Contract`, `"collect"`\> \| `MethodCall`\<`Contract`, `"positions"`\> \| `MethodCall`\<`Contract`, `"WETH9"`\> \| `MethodCall`\<`Contract`, `"createAndInitializePoolIfNecessary"`\> \| `MethodCall`\<`Contract`, `"decreaseLiquidity"`\> \| `MethodCall`\<`Contract`, `"increaseLiquidity"`\> \| `MethodCall`\<`Contract`, `"multicall"`\> \| `MethodCall`\<`Contract`, `"refundETH"`\> \| `MethodCall`\<`Contract`, `"selfPermit"`\> \| `MethodCall`\<`Contract`, `"selfPermitAllowed"`\> \| `MethodCall`\<`Contract`, `"selfPermitAllowedIfNecessary"`\> \| `MethodCall`\<`Contract`, `"selfPermitIfNecessary"`\> \| `MethodCall`\<`Contract`, `"sweepToken"`\> \| `MethodCall`\<`Contract`, `"tokenByIndex"`\> \| `MethodCall`\<`Contract`, `"tokenOfOwnerByIndex"`\> \| `MethodCall`\<`Contract`, `"uniswapV3MintCallback"`\> \| `MethodCall`\<`Contract`, `"unwrapWETH9"`\>\>

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

packages/contracts/src/position/position-manager.contract.ts:242

***

### collect()

> **collect**(`params`, `overrides`?): `Promise`\<`ContractTransaction`\>

Collects tokens owed to a specific position.

#### Parameters

• **params**: `CollectParamsRequest`

The parameters for collecting tokens.

• **overrides?**: `ContractTransactionOverrides`

Optional transaction overrides.

#### Returns

`Promise`\<`ContractTransaction`\>

The contract transaction.

#### Implementation of

`UniswapPositionManagerV3Types.Contract.collect`

#### Defined in

packages/contracts/src/position/position-manager.contract.ts:450

***

### createAndInitializePoolIfNecessary()

> **createAndInitializePoolIfNecessary**(`token0`, `token1`, `fee`, `sqrtPriceX96`, `overrides`?): `Promise`\<`ContractTransaction`\>

Creates and initializes a pool if necessary.

#### Parameters

• **token0**: `string`

The address of the first token.

• **token1**: `string`

The address of the second token.

• **fee**: `BigNumberish`

The fee tier of the pool.

• **sqrtPriceX96**: `BigNumberish`

The initial square root price of the pool.

• **overrides?**: `ContractTransactionOverrides`

Optional transaction overrides.

#### Returns

`Promise`\<`ContractTransaction`\>

The contract transaction.

#### Implementation of

`UniswapPositionManagerV3Types.Contract.createAndInitializePoolIfNecessary`

#### Defined in

packages/contracts/src/position/position-manager.contract.ts:480

***

### decreaseLiquidity()

> **decreaseLiquidity**(`params`, `overrides`?): `Promise`\<`ContractTransaction`\>

Decreases the liquidity of a position.

#### Parameters

• **params**: `DecreaseLiquidityParamsRequest`

The parameters for decreasing liquidity.

• **overrides?**: `ContractTransactionOverrides`

Optional transaction overrides.

#### Returns

`Promise`\<`ContractTransaction`\>

The contract transaction.

#### Implementation of

`UniswapPositionManagerV3Types.Contract.decreaseLiquidity`

#### Defined in

packages/contracts/src/position/position-manager.contract.ts:521

***

### encodeApprove()

> **encodeApprove**(`to`, `tokenId`): `string`

Encodes the function data for approving a spender to transfer a specific NFT.

#### Parameters

• **to**: `string`

The address to approve.

• **tokenId**: `BigNumberish`

The ID of the token to approve.

#### Returns

`string`

The encoded function data.

#### Defined in

packages/contracts/src/position/position-manager.contract.ts:376

***

### encodeBurn()

> **encodeBurn**(`tokenId`): `string`

Encodes the function data for burning a token.

#### Parameters

• **tokenId**: `BigNumberish`

The ID of the token to burn.

#### Returns

`string`

The encoded function data.

#### Defined in

packages/contracts/src/position/position-manager.contract.ts:440

***

### encodeCollect()

> **encodeCollect**(`params`): `string`

Encodes the function data for collecting tokens owed to a specific position.

#### Parameters

• **params**: `CollectParamsRequest`

The parameters for collecting tokens.

#### Returns

`string`

The encoded function data.

#### Defined in

packages/contracts/src/position/position-manager.contract.ts:465

***

### encodeCreateAndInitializePoolIfNecessary()

> **encodeCreateAndInitializePoolIfNecessary**(`token0`, `token1`, `fee`, `sqrtPriceX96`): `string`

Encodes the function data for creating and initializing a pool if necessary.

#### Parameters

• **token0**: `string`

The address of the first token.

• **token1**: `string`

The address of the second token.

• **fee**: `BigNumberish`

The fee tier of the pool.

• **sqrtPriceX96**: `BigNumberish`

The initial square root price of the pool.

#### Returns

`string`

The encoded function data.

#### Defined in

packages/contracts/src/position/position-manager.contract.ts:501

***

### encodeDecreaseLiquidity()

> **encodeDecreaseLiquidity**(`params`): `string`

Encodes the function data for decreasing the liquidity of a position.

#### Parameters

• **params**: `DecreaseLiquidityParamsRequest`

The parameters for decreasing liquidity.

#### Returns

`string`

The encoded function data.

#### Defined in

packages/contracts/src/position/position-manager.contract.ts:536

***

### encodeIncreaseLiquidity()

> **encodeIncreaseLiquidity**(`params`): `string`

Encodes the function data for increasing the liquidity of a position.

#### Parameters

• **params**: `IncreaseLiquidityParamsRequest`

The parameters for increasing liquidity.

#### Returns

`string`

The encoded function data.

#### Defined in

packages/contracts/src/position/position-manager.contract.ts:602

***

### encodeMint()

> **encodeMint**(`params`): `string`

Encodes the function data for minting a new position.

#### Parameters

• **params**: `MintParamsRequest`

The parameters for minting a position.

#### Returns

`string`

The encoded function data.

#### Defined in

packages/contracts/src/position/position-manager.contract.ts:658

***

### encodeMulticall()

> **encodeMulticall**(`data`): `string`

Encodes the function data for executing multiple method calls in a single transaction.

#### Parameters

• **data**: `BytesLike`[]

An array of encoded function calls.

#### Returns

`string`

The encoded function data.

#### Defined in

packages/contracts/src/position/position-manager.contract.ts:685

***

### encodePermit()

> **encodePermit**(`spender`, `tokenId`, `deadline`, `v`, `r`, `s`): `string`

Encodes the function data for permitting a spender to manage a token.

#### Parameters

• **spender**: `string`

The address that will be approved.

• **tokenId**: `BigNumberish`

The ID of the token to approve.

• **deadline**: `BigNumberish`

The deadline timestamp by which the call must be mined.

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

packages/contracts/src/position/position-manager.contract.ts:769

***

### encodeRefundETH()

> **encodeRefundETH**(): `string`

Encodes the function data for refunding any ETH balance held by this contract.

#### Returns

`string`

The encoded function data.

#### Defined in

packages/contracts/src/position/position-manager.contract.ts:829

***

### encodeSafeTransferFrom()

#### encodeSafeTransferFrom(from, to, tokenId, overrides)

> **encodeSafeTransferFrom**(`from`, `to`, `tokenId`, `overrides`?): `string`

Encodes the function data for the `safeTransferFrom` method without additional data.

##### Parameters

• **from**: `string`

The address to transfer the token from.

• **to**: `string`

The address to transfer the token to.

• **tokenId**: `BigNumberish`

The ID of the token to transfer.

• **overrides?**: `ContractTransactionOverrides`

Optional transaction overrides.

##### Returns

`string`

The encoded function data as a string.

##### Defined in

packages/contracts/src/position/position-manager.contract.ts:899

#### encodeSafeTransferFrom(from, to, tokenId, data, overrides)

> **encodeSafeTransferFrom**(`from`, `to`, `tokenId`, `data`, `overrides`?): `string`

Encodes the function data for the `safeTransferFrom` method with additional data.

##### Parameters

• **from**: `string`

The address to transfer the token from.

• **to**: `string`

The address to transfer the token to.

• **tokenId**: `BigNumberish`

The ID of the token to transfer.

• **data**: `BytesLike`

Additional data to include with the transfer.

• **overrides?**: `ContractTransactionOverrides`

Optional transaction overrides.

##### Returns

`string`

The encoded function data as a string.

##### Defined in

packages/contracts/src/position/position-manager.contract.ts:915

***

### encodeSafeTransferFromWithData()

> **encodeSafeTransferFromWithData**(`from`, `to`, `tokenId`, `_data`): `string`

Encodes the function data for safely transferring the ownership of a given token ID with additional data.

#### Parameters

• **from**: `string`

The current owner of the token.

• **to**: `string`

The address to receive the ownership of the given token ID.

• **tokenId**: `BigNumberish`

The ID of the token to be transferred.

• **\_data**: `BytesLike`

Additional data with no specified format to be sent along with the transfer.

#### Returns

`string`

The encoded function data.

#### Defined in

packages/contracts/src/position/position-manager.contract.ts:964

***

### encodeSelfPermit()

> **encodeSelfPermit**(`token`, `value`, `deadline`, `v`, `r`, `s`): `string`

Encodes the function data for approving a token transfer on behalf of the user.

#### Parameters

• **token**: `string`

The address of the token.

• **value**: `BigNumberish`

The amount of tokens to permit.

• **deadline**: `BigNumberish`

The deadline for the permit.

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

packages/contracts/src/position/position-manager.contract.ts:1019

***

### encodeSelfPermitAllowed()

> **encodeSelfPermitAllowed**(`token`, `nonce`, `expiry`, `v`, `r`, `s`): `string`

Encodes the function data for approving a token allowance on behalf of the user.

#### Parameters

• **token**: `string`

The address of the token.

• **nonce**: `BigNumberish`

The current nonce of the owner.

• **expiry**: `BigNumberish`

The timestamp at which the permit expires.

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

packages/contracts/src/position/position-manager.contract.ts:1078

***

### encodeSelfPermitAllowedIfNecessary()

> **encodeSelfPermitAllowedIfNecessary**(`token`, `nonce`, `expiry`, `v`, `r`, `s`): `string`

Encodes the function data for approving a token allowance on behalf of the user if necessary.

#### Parameters

• **token**: `string`

The address of the token.

• **nonce**: `BigNumberish`

The current nonce of the owner.

• **expiry**: `BigNumberish`

The timestamp at which the permit expires.

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

packages/contracts/src/position/position-manager.contract.ts:1132

***

### encodeSelfPermitIfNecessary()

> **encodeSelfPermitIfNecessary**(`token`, `value`, `deadline`, `v`, `r`, `s`): `string`

Encodes the function data for approving a token transfer on behalf of the user if necessary.

#### Parameters

• **token**: `string`

The address of the token.

• **value**: `BigNumberish`

The amount of tokens to permit.

• **deadline**: `BigNumberish`

The deadline for the permit.

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

packages/contracts/src/position/position-manager.contract.ts:1186

***

### encodeSetApprovalForAll()

> **encodeSetApprovalForAll**(`operator`, `approved`): `string`

Encodes the function data for setting or unsetting the approval of a given operator.

#### Parameters

• **operator**: `string`

Address to set the approval for.

• **approved**: `boolean`

True if the operator is approved, false to revoke approval.

#### Returns

`string`

The encoded function data.

#### Defined in

packages/contracts/src/position/position-manager.contract.ts:1229

***

### encodeSweepToken()

> **encodeSweepToken**(`token`, `amountMinimum`, `recipient`): `string`

Encodes the function data for sweeping tokens to a recipient address.

#### Parameters

• **token**: `string`

The address of the token to sweep.

• **amountMinimum**: `BigNumberish`

The minimum amount of tokens to sweep.

• **recipient**: `string`

The address that will receive the tokens.

#### Returns

`string`

The encoded function data.

#### Defined in

packages/contracts/src/position/position-manager.contract.ts:1282

***

### encodeTransferFrom()

> **encodeTransferFrom**(`from`, `to`, `tokenId`): `string`

Encodes the function data for transferring the ownership of a given token ID.

#### Parameters

• **from**: `string`

The current owner of the token.

• **to**: `string`

The address to receive the ownership of the given token ID.

• **tokenId**: `BigNumberish`

The ID of the token to be transferred.

#### Returns

`string`

The encoded function data.

#### Defined in

packages/contracts/src/position/position-manager.contract.ts:1430

***

### encodeUniswapV3MintCallback()

> **encodeUniswapV3MintCallback**(`amount0Owed`, `amount1Owed`, `data`): `string`

Encodes the function data for the uniswapV3MintCallback.

#### Parameters

• **amount0Owed**: `BigNumberish`

The amount of token0 due to the pool for the minted liquidity.

• **amount1Owed**: `BigNumberish`

The amount of token1 due to the pool for the minted liquidity.

• **data**: `BytesLike`

Any data passed through by the caller via the IUniswapV3PoolActions#mint call.

#### Returns

`string`

The encoded function data.

#### Defined in

packages/contracts/src/position/position-manager.contract.ts:1465

***

### encodeUnwrapWETH9()

> **encodeUnwrapWETH9**(`amountMinimum`, `recipient`): `string`

Encodes the function data for unwrapping the contract's WETH9 balance.

#### Parameters

• **amountMinimum**: `BigNumberish`

The minimum amount of WETH9 to unwrap.

• **recipient**: `string`

The address receiving ETH.

#### Returns

`string`

The encoded function data.

#### Defined in

packages/contracts/src/position/position-manager.contract.ts:1502

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

`UniswapPositionManagerV3Types.Contract.factory`

#### Defined in

packages/contracts/src/position/position-manager.contract.ts:546

***

### factoryCallContext()

> **factoryCallContext**(): `MethodCall`\<`Contract`, `"factory"`\>

Returns the call context for the factory method.

#### Returns

`MethodCall`\<`Contract`, `"factory"`\>

The call context.

#### Defined in

packages/contracts/src/position/position-manager.contract.ts:554

***

### getApproved()

> **getApproved**(`tokenId`): `Promise`\<`string`\>

Returns the approved address for a token ID, or zero if no address set.

#### Parameters

• **tokenId**: `BigNumberish`

The ID of the token to query.

#### Returns

`Promise`\<`string`\>

The currently approved address for this token.

#### Implementation of

`UniswapPositionManagerV3Types.Contract.getApproved`

#### Defined in

packages/contracts/src/position/position-manager.contract.ts:566

***

### getApprovedCallContext()

> **getApprovedCallContext**(`tokenId`): `MethodCall`\<`Contract`, `"getApproved"`\>

Returns the call context for the getApproved method.

#### Parameters

• **tokenId**: `BigNumberish`

The ID of the token to query.

#### Returns

`MethodCall`\<`Contract`, `"getApproved"`\>

The call context.

#### Defined in

packages/contracts/src/position/position-manager.contract.ts:575

***

### increaseLiquidity()

> **increaseLiquidity**(`params`, `overrides`?): `Promise`\<`ContractTransaction`\>

Increases the liquidity of a position.

#### Parameters

• **params**: `IncreaseLiquidityParamsRequest`

The parameters for increasing liquidity.

• **overrides?**: `ContractTransactionOverrides`

Optional transaction overrides.

#### Returns

`Promise`\<`ContractTransaction`\>

The contract transaction.

#### Implementation of

`UniswapPositionManagerV3Types.Contract.increaseLiquidity`

#### Defined in

packages/contracts/src/position/position-manager.contract.ts:587

***

### isApprovedForAll()

> **isApprovedForAll**(`owner`, `operator`): `Promise`\<`boolean`\>

Returns if an address is approved to manage all of the assets of another address.

#### Parameters

• **owner**: `string`

The address that owns the assets.

• **operator**: `string`

The address that acts on behalf of the owner.

#### Returns

`Promise`\<`boolean`\>

True if `operator` is an approved operator for `owner`, false otherwise.

#### Implementation of

`UniswapPositionManagerV3Types.Contract.isApprovedForAll`

#### Defined in

packages/contracts/src/position/position-manager.contract.ts:614

***

### isApprovedForAllCallContext()

> **isApprovedForAllCallContext**(`owner`, `operator`): `MethodCall`\<`Contract`, `"isApprovedForAll"`\>

Returns the call context for the isApprovedForAll method.

#### Parameters

• **owner**: `string`

The address that owns the assets.

• **operator**: `string`

The address that acts on behalf of the owner.

#### Returns

`MethodCall`\<`Contract`, `"isApprovedForAll"`\>

The call context.

#### Defined in

packages/contracts/src/position/position-manager.contract.ts:630

***

### mint()

> **mint**(`params`, `overrides`?): `Promise`\<`ContractTransaction`\>

Creates a new pool if it does not exist, then initializes if not initialized.

#### Parameters

• **params**: `MintParamsRequest`

The parameters for minting a position.

• **overrides?**: `ContractTransactionOverrides`

Optional transaction overrides.

#### Returns

`Promise`\<`ContractTransaction`\>

The contract transaction.

#### Implementation of

`UniswapPositionManagerV3Types.Contract.mint`

#### Defined in

packages/contracts/src/position/position-manager.contract.ts:643

***

### multicall()

> **multicall**(`data`, `overrides`?): `Promise`\<`ContractTransaction`\>

Executes multiple method calls in a single transaction.

#### Parameters

• **data**: `BytesLike`[]

An array of encoded function calls.

• **overrides?**: `ContractTransactionOverrides`

Optional transaction overrides.

#### Returns

`Promise`\<`ContractTransaction`\>

The contract transaction.

#### Implementation of

`UniswapPositionManagerV3Types.Contract.multicall`

#### Defined in

packages/contracts/src/position/position-manager.contract.ts:670

***

### name()

> **name**(): `Promise`\<`string`\>

Returns the name of the token.

#### Returns

`Promise`\<`string`\>

The name of the token.

#### Implementation of

`UniswapPositionManagerV3Types.Contract.name`

#### Defined in

packages/contracts/src/position/position-manager.contract.ts:693

***

### nameCallContext()

> **nameCallContext**(): `MethodCall`\<`Contract`, `"name"`\>

Returns the call context for the name method.

#### Returns

`MethodCall`\<`Contract`, `"name"`\>

The call context.

#### Defined in

packages/contracts/src/position/position-manager.contract.ts:701

***

### ownerOf()

> **ownerOf**(`tokenId`): `Promise`\<`string`\>

Returns the owner of the token.

#### Parameters

• **tokenId**: `BigNumberish`

The ID of the token to query.

#### Returns

`Promise`\<`string`\>

The address of the owner of the token.

#### Implementation of

`UniswapPositionManagerV3Types.Contract.ownerOf`

#### Defined in

packages/contracts/src/position/position-manager.contract.ts:713

***

### ownerOfCallContext()

> **ownerOfCallContext**(`tokenId`): `MethodCall`\<`Contract`, `"ownerOf"`\>

Returns the call context for the ownerOf method.

#### Parameters

• **tokenId**: `BigNumberish`

The ID of the token to query.

#### Returns

`MethodCall`\<`Contract`, `"ownerOf"`\>

The call context.

#### Defined in

packages/contracts/src/position/position-manager.contract.ts:722

***

### permit()

> **permit**(`spender`, `tokenId`, `deadline`, `v`, `r`, `s`, `overrides`?): `Promise`\<`ContractTransaction`\>

Permit a spender to manage a token.

#### Parameters

• **spender**: `string`

The address that will be approved.

• **tokenId**: `BigNumberish`

The ID of the token to approve.

• **deadline**: `BigNumberish`

The deadline timestamp by which the call must be mined.

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

`UniswapPositionManagerV3Types.Contract.permit`

#### Defined in

packages/contracts/src/position/position-manager.contract.ts:739

***

### positions()

> **positions**(`tokenId`): `Promise`\<`PositionsResponse`\>

Returns the position information associated with a given token ID.

#### Parameters

• **tokenId**: `BigNumberish`

The ID of the token that represents the position.

#### Returns

`Promise`\<`PositionsResponse`\>

The position information.

#### Implementation of

`UniswapPositionManagerV3Types.Contract.positions`

#### Defined in

packages/contracts/src/position/position-manager.contract.ts:792

***

### positionsCallContext()

> **positionsCallContext**(`tokenId`): `MethodCall`\<`Contract`, `"positions"`\>

Returns the call context for the positions method.

#### Parameters

• **tokenId**: `BigNumberish`

The ID of the token that represents the position.

#### Returns

`MethodCall`\<`Contract`, `"positions"`\>

The call context.

#### Defined in

packages/contracts/src/position/position-manager.contract.ts:806

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

packages/contracts/src/position/position-manager.contract.ts:204

***

### prepareContractContext()

> **prepareContractContext**\<`TCalls`, `TCustomData`\>(`calls`, `customData`?): `ContractContext`\<`Contract`, `TCalls`, `TCustomData`\>

Helper function to dynamically prepare a contract context based on custom or default method names.

#### Type Parameters

• **TCalls** *extends* `Record`\<`string`, `MethodCall`\<`Contract`, `"symbol"`\> \| `MethodCall`\<`Contract`, `"name"`\> \| `MethodCall`\<`Contract`, `"baseURI"`\> \| `MethodCall`\<`Contract`, `"factory"`\> \| `MethodCall`\<`Contract`, `"approve"`\> \| `MethodCall`\<`Contract`, `"balanceOf"`\> \| `MethodCall`\<`Contract`, `"totalSupply"`\> \| `MethodCall`\<`Contract`, `"transferFrom"`\> \| `MethodCall`\<`Contract`, `"isApprovedForAll"`\> \| `MethodCall`\<`Contract`, `"safeTransferFrom"`\> \| `MethodCall`\<`Contract`, `"setApprovalForAll"`\> \| `MethodCall`\<`Contract`, `"supportsInterface"`\> \| `MethodCall`\<`Contract`, `"getApproved"`\> \| `MethodCall`\<`Contract`, `"ownerOf"`\> \| `MethodCall`\<`Contract`, `"tokenURI"`\> \| `MethodCall`\<`Contract`, `"DOMAIN_SEPARATOR"`\> \| `MethodCall`\<`Contract`, `"PERMIT_TYPEHASH"`\> \| `MethodCall`\<`Contract`, `"burn"`\> \| `MethodCall`\<`Contract`, `"mint"`\> \| `MethodCall`\<`Contract`, `"permit"`\> \| `MethodCall`\<`Contract`, `"collect"`\> \| `MethodCall`\<`Contract`, `"positions"`\> \| `MethodCall`\<`Contract`, `"WETH9"`\> \| `MethodCall`\<`Contract`, `"createAndInitializePoolIfNecessary"`\> \| `MethodCall`\<`Contract`, `"decreaseLiquidity"`\> \| `MethodCall`\<`Contract`, `"increaseLiquidity"`\> \| `MethodCall`\<`Contract`, `"multicall"`\> \| `MethodCall`\<`Contract`, `"refundETH"`\> \| `MethodCall`\<`Contract`, `"selfPermit"`\> \| `MethodCall`\<`Contract`, `"selfPermitAllowed"`\> \| `MethodCall`\<`Contract`, `"selfPermitAllowedIfNecessary"`\> \| `MethodCall`\<`Contract`, `"selfPermitIfNecessary"`\> \| `MethodCall`\<`Contract`, `"sweepToken"`\> \| `MethodCall`\<`Contract`, `"tokenByIndex"`\> \| `MethodCall`\<`Contract`, `"tokenOfOwnerByIndex"`\> \| `MethodCall`\<`Contract`, `"uniswapV3MintCallback"`\> \| `MethodCall`\<`Contract`, `"unwrapWETH9"`\>\>

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

packages/contracts/src/position/position-manager.contract.ts:166

***

### refundETH()

> **refundETH**(`overrides`?): `Promise`\<`ContractTransaction`\>

Refunds any ETH balance held by this contract to the `msg.sender`.

#### Parameters

• **overrides?**: `ContractTransactionOverrides`

Optional transaction overrides.

#### Returns

`Promise`\<`ContractTransaction`\>

The contract transaction.

#### Implementation of

`UniswapPositionManagerV3Types.Contract.refundETH`

#### Defined in

packages/contracts/src/position/position-manager.contract.ts:817

***

### safeTransferFrom()

#### safeTransferFrom(from, to, tokenId, overrides)

> **safeTransferFrom**(`from`, `to`, `tokenId`, `overrides`?): `Promise`\<`ContractTransaction`\>

Safely transfers a token from one address to another.

##### Parameters

• **from**: `string`

The address to transfer from.

• **to**: `string`

The address to transfer to.

• **tokenId**: `BigNumberish`

The token ID to transfer.

• **overrides?**: `ContractTransactionOverrides`

Optional transaction overrides.

##### Returns

`Promise`\<`ContractTransaction`\>

The contract transaction.

##### Implementation of

`UniswapPositionManagerV3Types.Contract.safeTransferFrom`

##### Defined in

packages/contracts/src/position/position-manager.contract.ts:841

#### safeTransferFrom(from, to, tokenId, data, overrides)

> **safeTransferFrom**(`from`, `to`, `tokenId`, `data`, `overrides`?): `Promise`\<`ContractTransaction`\>

Safely transfers a token from one address to another with additional data.

##### Parameters

• **from**: `string`

The address to transfer from.

• **to**: `string`

The address to transfer to.

• **tokenId**: `BigNumberish`

The token ID to transfer.

• **data**: `BytesLike`

Additional data to include with the transfer.

• **overrides?**: `ContractTransactionOverrides`

Optional transaction overrides.

##### Returns

`Promise`\<`ContractTransaction`\>

The contract transaction.

##### Implementation of

`UniswapPositionManagerV3Types.Contract.safeTransferFrom`

##### Defined in

packages/contracts/src/position/position-manager.contract.ts:857

***

### selfPermit()

> **selfPermit**(`token`, `value`, `deadline`, `v`, `r`, `s`, `overrides`?): `Promise`\<`ContractTransaction`\>

Approves a token transfer on behalf of the user.

#### Parameters

• **token**: `string`

The address of the token.

• **value**: `BigNumberish`

The amount of tokens to permit.

• **deadline**: `BigNumberish`

The deadline for the permit.

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

`UniswapPositionManagerV3Types.Contract.selfPermit`

#### Defined in

packages/contracts/src/position/position-manager.contract.ts:989

***

### selfPermitAllowed()

> **selfPermitAllowed**(`token`, `nonce`, `expiry`, `v`, `r`, `s`, `overrides`?): `Promise`\<`ContractTransaction`\>

Approves a token allowance on behalf of the user.

#### Parameters

• **token**: `string`

The address of the token.

• **nonce**: `BigNumberish`

The current nonce of the owner.

• **expiry**: `BigNumberish`

The timestamp at which the permit expires.

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

`UniswapPositionManagerV3Types.Contract.selfPermitAllowed`

#### Defined in

packages/contracts/src/position/position-manager.contract.ts:1048

***

### selfPermitAllowedIfNecessary()

> **selfPermitAllowedIfNecessary**(`token`, `nonce`, `expiry`, `v`, `r`, `s`, `overrides`?): `Promise`\<`ContractTransaction`\>

Approves a token allowance on behalf of the user if necessary.

#### Parameters

• **token**: `string`

The address of the token.

• **nonce**: `BigNumberish`

The current nonce of the owner.

• **expiry**: `BigNumberish`

The timestamp at which the permit expires.

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

`UniswapPositionManagerV3Types.Contract.selfPermitAllowedIfNecessary`

#### Defined in

packages/contracts/src/position/position-manager.contract.ts:1107

***

### selfPermitIfNecessary()

> **selfPermitIfNecessary**(`token`, `value`, `deadline`, `v`, `r`, `s`, `overrides`?): `Promise`\<`ContractTransaction`\>

Approves a token transfer on behalf of the user if necessary.

#### Parameters

• **token**: `string`

The address of the token.

• **value**: `BigNumberish`

The amount of tokens to permit.

• **deadline**: `BigNumberish`

The deadline for the permit.

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

`UniswapPositionManagerV3Types.Contract.selfPermitIfNecessary`

#### Defined in

packages/contracts/src/position/position-manager.contract.ts:1161

***

### setApprovalForAll()

> **setApprovalForAll**(`operator`, `approved`, `overrides`?): `Promise`\<`ContractTransaction`\>

Sets or unsets the approval of a given operator.

#### Parameters

• **operator**: `string`

Address to set the approval for.

• **approved**: `boolean`

True if the operator is approved, false to revoke approval.

• **overrides?**: `ContractTransactionOverrides`

Optional transaction overrides.

#### Returns

`Promise`\<`ContractTransaction`\>

The contract transaction.

#### Implementation of

`UniswapPositionManagerV3Types.Contract.setApprovalForAll`

#### Defined in

packages/contracts/src/position/position-manager.contract.ts:1211

***

### supportsInterface()

> **supportsInterface**(`interfaceId`): `Promise`\<`boolean`\>

Returns true if this contract implements the interface defined by `interfaceId`.

#### Parameters

• **interfaceId**: `BytesLike`

The interface identifier, as specified in ERC-165.

#### Returns

`Promise`\<`boolean`\>

True if the contract implements `interfaceId`.

#### Implementation of

`UniswapPositionManagerV3Types.Contract.supportsInterface`

#### Defined in

packages/contracts/src/position/position-manager.contract.ts:1238

***

### supportsInterfaceCallContext()

> **supportsInterfaceCallContext**(`interfaceId`): `MethodCall`\<`Contract`, `"supportsInterface"`\>

Returns the call context for the supportsInterface method.

#### Parameters

• **interfaceId**: `BytesLike`

The interface identifier, as specified in ERC-165.

#### Returns

`MethodCall`\<`Contract`, `"supportsInterface"`\>

The call context.

#### Defined in

packages/contracts/src/position/position-manager.contract.ts:1247

***

### sweepToken()

> **sweepToken**(`token`, `amountMinimum`, `recipient`, `overrides`?): `Promise`\<`ContractTransaction`\>

Sweeps tokens to a recipient address.

#### Parameters

• **token**: `string`

The address of the token to sweep.

• **amountMinimum**: `BigNumberish`

The minimum amount of tokens to sweep.

• **recipient**: `string`

The address that will receive the tokens.

• **overrides?**: `ContractTransactionOverrides`

Optional transaction overrides.

#### Returns

`Promise`\<`ContractTransaction`\>

The contract transaction.

#### Implementation of

`UniswapPositionManagerV3Types.Contract.sweepToken`

#### Defined in

packages/contracts/src/position/position-manager.contract.ts:1261

***

### symbol()

> **symbol**(): `Promise`\<`string`\>

Returns the symbol of the token.

#### Returns

`Promise`\<`string`\>

The symbol of the token.

#### Implementation of

`UniswapPositionManagerV3Types.Contract.symbol`

#### Defined in

packages/contracts/src/position/position-manager.contract.ts:1298

***

### symbolCallContext()

> **symbolCallContext**(): `MethodCall`\<`Contract`, `"symbol"`\>

Returns the call context for the symbol method.

#### Returns

`MethodCall`\<`Contract`, `"symbol"`\>

The call context.

#### Defined in

packages/contracts/src/position/position-manager.contract.ts:1306

***

### tokenByIndex()

> **tokenByIndex**(`index`): `Promise`\<`BigNumber`\>

Returns a token ID at a given index of all the tokens stored by the contract.

#### Parameters

• **index**: `BigNumberish`

A counter less than `totalSupply()`.

#### Returns

`Promise`\<`BigNumber`\>

The token ID at the given index of all the tokens stored by the contract.

#### Implementation of

`UniswapPositionManagerV3Types.Contract.tokenByIndex`

#### Defined in

packages/contracts/src/position/position-manager.contract.ts:1318

***

### tokenByIndexCallContext()

> **tokenByIndexCallContext**(`index`): `MethodCall`\<`Contract`, `"tokenByIndex"`\>

Returns the call context for the tokenByIndex method.

#### Parameters

• **index**: `BigNumberish`

A counter less than `totalSupply()`.

#### Returns

`MethodCall`\<`Contract`, `"tokenByIndex"`\>

The call context.

#### Defined in

packages/contracts/src/position/position-manager.contract.ts:1327

***

### tokenOfOwnerByIndex()

> **tokenOfOwnerByIndex**(`owner`, `index`): `Promise`\<`BigNumber`\>

Returns a token ID owned by `owner` at a given `index` of its token list.

#### Parameters

• **owner**: `string`

The address that owns the tokens.

• **index**: `BigNumberish`

A counter less than `balanceOf(owner)`.

#### Returns

`Promise`\<`BigNumber`\>

The token ID owned by `owner` at the given `index` of its token list.

#### Implementation of

`UniswapPositionManagerV3Types.Contract.tokenOfOwnerByIndex`

#### Defined in

packages/contracts/src/position/position-manager.contract.ts:1339

***

### tokenOfOwnerByIndexCallContext()

> **tokenOfOwnerByIndexCallContext**(`owner`, `index`): `MethodCall`\<`Contract`, `"tokenOfOwnerByIndex"`\>

Returns the call context for the tokenOfOwnerByIndex method.

#### Parameters

• **owner**: `string`

The address that owns the tokens.

• **index**: `BigNumberish`

A counter less than `balanceOf(owner)`.

#### Returns

`MethodCall`\<`Contract`, `"tokenOfOwnerByIndex"`\>

The call context.

#### Defined in

packages/contracts/src/position/position-manager.contract.ts:1355

***

### tokenURI()

> **tokenURI**(`tokenId`): `Promise`\<`string`\>

Returns the Uniform Resource Identifier (URI) for `tokenId` token.

#### Parameters

• **tokenId**: `BigNumberish`

The ID of the token to query.

#### Returns

`Promise`\<`string`\>

The Uniform Resource Identifier (URI) for `tokenId` token.

#### Implementation of

`UniswapPositionManagerV3Types.Contract.tokenURI`

#### Defined in

packages/contracts/src/position/position-manager.contract.ts:1367

***

### tokenURICallContext()

> **tokenURICallContext**(`tokenId`): `MethodCall`\<`Contract`, `"tokenURI"`\>

Returns the call context for the tokenURI method.

#### Parameters

• **tokenId**: `BigNumberish`

The ID of the token to query.

#### Returns

`MethodCall`\<`Contract`, `"tokenURI"`\>

The call context.

#### Defined in

packages/contracts/src/position/position-manager.contract.ts:1376

***

### totalSupply()

> **totalSupply**(): `Promise`\<`BigNumber`\>

Returns the total amount of tokens stored by the contract.

#### Returns

`Promise`\<`BigNumber`\>

The total amount of tokens.

#### Implementation of

`UniswapPositionManagerV3Types.Contract.totalSupply`

#### Defined in

packages/contracts/src/position/position-manager.contract.ts:1386

***

### totalSupplyCallContext()

> **totalSupplyCallContext**(): `MethodCall`\<`Contract`, `"totalSupply"`\>

Returns the call context for the totalSupply method.

#### Returns

`MethodCall`\<`Contract`, `"totalSupply"`\>

The call context.

#### Defined in

packages/contracts/src/position/position-manager.contract.ts:1394

***

### transferFrom()

> **transferFrom**(`from`, `to`, `tokenId`, `overrides`?): `Promise`\<`ContractTransaction`\>

Transfers the ownership of a given token ID to another address.

#### Parameters

• **from**: `string`

The current owner of the token.

• **to**: `string`

The address to receive the ownership of the given token ID.

• **tokenId**: `BigNumberish`

The ID of the token to be transferred.

• **overrides?**: `ContractTransactionOverrides`

Optional transaction overrides.

#### Returns

`Promise`\<`ContractTransaction`\>

The contract transaction.

#### Implementation of

`UniswapPositionManagerV3Types.Contract.transferFrom`

#### Defined in

packages/contracts/src/position/position-manager.contract.ts:1409

***

### uniswapV3MintCallback()

> **uniswapV3MintCallback**(`amount0Owed`, `amount1Owed`, `data`, `overrides`?): `Promise`\<`ContractTransaction`\>

Called to `msg.sender` after minting liquidity to a position from IUniswapV3Pool#mint.

#### Parameters

• **amount0Owed**: `BigNumberish`

The amount of token0 due to the pool for the minted liquidity.

• **amount1Owed**: `BigNumberish`

The amount of token1 due to the pool for the minted liquidity.

• **data**: `BytesLike`

Any data passed through by the caller via the IUniswapV3PoolActions#mint call.

• **overrides?**: `ContractTransactionOverrides`

Optional transaction overrides.

#### Returns

`Promise`\<`ContractTransaction`\>

The contract transaction.

#### Implementation of

`UniswapPositionManagerV3Types.Contract.uniswapV3MintCallback`

#### Defined in

packages/contracts/src/position/position-manager.contract.ts:1446

***

### unwrapWETH9()

> **unwrapWETH9**(`amountMinimum`, `recipient`, `overrides`?): `Promise`\<`ContractTransaction`\>

Unwraps the contract's WETH9 balance and sends it to recipient as ETH.

#### Parameters

• **amountMinimum**: `BigNumberish`

The minimum amount of WETH9 to unwrap.

• **recipient**: `string`

The address receiving ETH.

• **overrides?**: `ContractTransactionOverrides`

Optional transaction overrides.

#### Returns

`Promise`\<`ContractTransaction`\>

The contract transaction.

#### Implementation of

`UniswapPositionManagerV3Types.Contract.unwrapWETH9`

#### Defined in

packages/contracts/src/position/position-manager.contract.ts:1484
