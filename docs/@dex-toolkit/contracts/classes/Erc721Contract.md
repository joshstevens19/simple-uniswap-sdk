[**@dex-toolkit/contracts v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/contracts](../README.md) / Erc721Contract

# Class: Erc721Contract

## Extends

- `DexProviderBase`

## Implements

- `Contract`

## Constructors

### new Erc721Contract()

> **new Erc721Contract**(`multicallProviderContext`, `contractDetail`): [`Erc721Contract`](Erc721Contract.md)

#### Parameters

• **multicallProviderContext**: `DexMulticallProviderContext`

• **contractDetail**: `ContractDetailToken`

Returns the contract details.

#### Returns

[`Erc721Contract`](Erc721Contract.md)

#### Overrides

`DexProviderBase.constructor`

#### Defined in

packages/contracts/src/token/erc721.contract.ts:40

## Properties

### \_contract

> `protected` **\_contract**: `ContractContext`

#### Defined in

packages/contracts/src/token/erc721.contract.ts:36

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

packages/contracts/src/token/erc721.contract.ts:38

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

### erc721Contract

> `get` **erc721Contract**(): `ContractContext`

Get the ERC721 contract

#### Returns

`ContractContext`

#### Defined in

packages/contracts/src/token/erc721.contract.ts:61

***

### methodNames

> `get` **methodNames**(): `MethodNameMap`

Get the method names

#### Returns

`MethodNameMap`

#### Defined in

packages/contracts/src/token/erc721.contract.ts:66

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

### approve()

> **approve**(`to`, `tokenId`, `overrides`?): `Promise`\<`ContractTransaction`\>

Approves the specified token ID for the specified address.

#### Parameters

• **to**: `string`

The address to approve.

• **tokenId**: `BigNumberish`

The token ID to approve.

• **overrides?**: `ContractTransactionOverrides`

Optional transaction overrides.

#### Returns

`Promise`\<`ContractTransaction`\>

The contract transaction.

#### Implementation of

`Erc721Types.Contract.approve`

#### Defined in

packages/contracts/src/token/erc721.contract.ts:222

***

### balanceOf()

> **balanceOf**(`owner`): `Promise`\<`BigNumber`\>

Returns the balance of tokens owned by the specified address.

#### Parameters

• **owner**: `string`

The address to query.

#### Returns

`Promise`\<`BigNumber`\>

The balance of tokens owned by the specified address.

#### Implementation of

`Erc721Types.Contract.balanceOf`

#### Defined in

packages/contracts/src/token/erc721.contract.ts:249

***

### balanceOfCallContext()

> **balanceOfCallContext**(`owner`): `MethodCall`\<`Contract`, `"balanceOf"`\>

Returns the call context for the balanceOf method.

#### Parameters

• **owner**: `string`

The address to query.

#### Returns

`MethodCall`\<`Contract`, `"balanceOf"`\>

The call context.

#### Defined in

packages/contracts/src/token/erc721.contract.ts:258

***

### call()

> **call**\<`TCalls`\>(`calls`, `options`): `Promise`\<`ExecutionResult`\<`Contract`, `TCalls`\>\>

Executes a multicall for the given contract methods.

#### Type Parameters

• **TCalls** *extends* `Record`\<`string`, `MethodCall`\<`Contract`, `"symbol"`\> \| `MethodCall`\<`Contract`, `"name"`\> \| `MethodCall`\<`Contract`, `"owner"`\> \| `MethodCall`\<`Contract`, `"approve"`\> \| `MethodCall`\<`Contract`, `"balanceOf"`\> \| `MethodCall`\<`Contract`, `"transferFrom"`\> \| `MethodCall`\<`Contract`, `"isApprovedForAll"`\> \| `MethodCall`\<`Contract`, `"safeTransferFrom"`\> \| `MethodCall`\<`Contract`, `"setApprovalForAll"`\> \| `MethodCall`\<`Contract`, `"supportsInterface"`\> \| `MethodCall`\<`Contract`, `"getApproved"`\> \| `MethodCall`\<`Contract`, `"ownerOf"`\> \| `MethodCall`\<`Contract`, `"renounceOwnership"`\> \| `MethodCall`\<`Contract`, `"tokenId"`\> \| `MethodCall`\<`Contract`, `"tokenURI"`\> \| `MethodCall`\<`Contract`, `"transferOwnership"`\> \| `MethodCall`\<`Contract`, `"mintNFT"`\>\>

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

packages/contracts/src/token/erc721.contract.ts:183

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

packages/contracts/src/token/erc721.contract.ts:76

***

### encodeApprove()

> **encodeApprove**(`to`, `tokenId`): `string`

Encodes the function data for approving a token ID.

#### Parameters

• **to**: `string`

The address to approve.

• **tokenId**: `BigNumberish`

The token ID to approve.

#### Returns

`string`

The encoded function data.

#### Defined in

packages/contracts/src/token/erc721.contract.ts:240

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

packages/contracts/src/token/erc721.contract.ts:100

***

### encodeMintNFT()

> **encodeMintNFT**(`recipient`, `tokenURI`): `string`

Encodes the function data for minting a new NFT.

#### Parameters

• **recipient**: `string`

The address to receive the minted NFT.

• **tokenURI**: `string`

The URI for the minted NFT's metadata.

#### Returns

`string`

The encoded function data.

#### Defined in

packages/contracts/src/token/erc721.contract.ts:679

***

### encodeRenounceOwnership()

> **encodeRenounceOwnership**(`overrides`?): `string`

Encodes the function call to renounce ownership of the contract.

#### Parameters

• **overrides?**: `ContractTransactionOverrides`

Optional transaction overrides.

#### Returns

`string`

The encoded data as a string.

#### Defined in

packages/contracts/src/token/erc721.contract.ts:415

***

### encodeSafeTransferFrom()

> **encodeSafeTransferFrom**(`from`, `to`, `tokenId`, `dataOrOverrides`?, `overrides`?): `string`

Encodes the function data for the `safeTransferFrom` method of the contract.

#### Parameters

• **from**: `string`

The address to transfer the token from.

• **to**: `string`

The address to transfer the token to.

• **tokenId**: `BigNumberish`

The ID of the token to transfer.

• **dataOrOverrides?**: `BytesLike` \| `ContractTransactionOverrides`

(Optional) Additional data to include with the transfer, or transaction overrides if no additional data is provided.

• **overrides?**: `ContractTransactionOverrides`

(Optional) Transaction overrides for gas, nonce, etc.

#### Returns

`string`

The encoded function data as a string.

#### Defined in

packages/contracts/src/token/erc721.contract.ts:492

***

### encodeSetApprovalForAll()

> **encodeSetApprovalForAll**(`operator`, `approved`): `string`

Encodes the function data for setting or unsetting the approval of a given operator.

#### Parameters

• **operator**: `string`

The operator to set the approval for.

• **approved**: `boolean`

Whether to approve or remove the operator.

#### Returns

`string`

The encoded function data.

#### Defined in

packages/contracts/src/token/erc721.contract.ts:548

***

### encodeTransferFrom()

> **encodeTransferFrom**(`from`, `to`, `tokenId`): `string`

Encodes the function data for transferring a token from one address to another.

#### Parameters

• **from**: `string`

The address to transfer from.

• **to**: `string`

The address to transfer to.

• **tokenId**: `BigNumberish`

The token ID to transfer.

#### Returns

`string`

The encoded function data.

#### Defined in

packages/contracts/src/token/erc721.contract.ts:621

***

### encodeTransferOwnership()

> **encodeTransferOwnership**(`newOwner`): `string`

Encodes the function data for transferring ownership of the contract to a new owner.

#### Parameters

• **newOwner**: `string`

The address of the new owner.

#### Returns

`string`

The encoded function data.

#### Defined in

packages/contracts/src/token/erc721.contract.ts:650

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

### getApproved()

> **getApproved**(`tokenId`): `Promise`\<`string`\>

Returns the address approved for the specified token ID.

#### Parameters

• **tokenId**: `BigNumberish`

The token ID to query.

#### Returns

`Promise`\<`string`\>

The address approved for the specified token ID.

#### Implementation of

`Erc721Types.Contract.getApproved`

#### Defined in

packages/contracts/src/token/erc721.contract.ts:269

***

### getApprovedCallContext()

> **getApprovedCallContext**(`tokenId`): `MethodCall`\<`Contract`, `"getApproved"`\>

Returns the call context for the getApproved method.

#### Parameters

• **tokenId**: `BigNumberish`

The token ID to query.

#### Returns

`MethodCall`\<`Contract`, `"getApproved"`\>

The call context.

#### Defined in

packages/contracts/src/token/erc721.contract.ts:278

***

### isApprovedForAll()

> **isApprovedForAll**(`owner`, `operator`): `Promise`\<`boolean`\>

Checks if an operator is approved to manage all tokens of a specified owner.

#### Parameters

• **owner**: `string`

The address of the owner.

• **operator**: `string`

The address of the operator.

#### Returns

`Promise`\<`boolean`\>

True if the operator is approved for all tokens, false otherwise.

#### Implementation of

`Erc721Types.Contract.isApprovedForAll`

#### Defined in

packages/contracts/src/token/erc721.contract.ts:290

***

### isApprovedForAllCallContext()

> **isApprovedForAllCallContext**(`owner`, `operator`): `MethodCall`\<`Contract`, `"isApprovedForAll"`\>

Returns the call context for the isApprovedForAll method.

#### Parameters

• **owner**: `string`

The address of the owner.

• **operator**: `string`

The address of the operator.

#### Returns

`MethodCall`\<`Contract`, `"isApprovedForAll"`\>

The call context.

#### Defined in

packages/contracts/src/token/erc721.contract.ts:306

***

### mintNFT()

> **mintNFT**(`recipient`, `tokenURI`, `overrides`?): `Promise`\<`ContractTransaction`\>

Mints a new NFT and assigns it to the recipient.

#### Parameters

• **recipient**: `string`

The address to receive the minted NFT.

• **tokenURI**: `string`

The URI for the minted NFT's metadata.

• **overrides?**: `ContractTransactionOverrides`

Optional transaction overrides.

#### Returns

`Promise`\<`ContractTransaction`\>

The contract transaction.

#### Implementation of

`Erc721Types.Contract.mintNFT`

#### Defined in

packages/contracts/src/token/erc721.contract.ts:661

***

### name()

> **name**(): `Promise`\<`string`\>

Returns the name of the token.

#### Returns

`Promise`\<`string`\>

The name of the token.

#### Implementation of

`Erc721Types.Contract.name`

#### Defined in

packages/contracts/src/token/erc721.contract.ts:317

***

### nameCallContext()

> **nameCallContext**(): `MethodCall`\<`Contract`, `"name"`\>

Returns the call context for the name method.

#### Returns

`MethodCall`\<`Contract`, `"name"`\>

The call context.

#### Defined in

packages/contracts/src/token/erc721.contract.ts:325

***

### owner()

> **owner**(): `Promise`\<`string`\>

Returns the owner of the contract.

#### Returns

`Promise`\<`string`\>

The owner of the contract.

#### Implementation of

`Erc721Types.Contract.owner`

#### Defined in

packages/contracts/src/token/erc721.contract.ts:365

***

### ownerCallContext()

> **ownerCallContext**(): `MethodCall`\<`Contract`, `"owner"`\>

Returns the call context for the owner method.

#### Returns

`MethodCall`\<`Contract`, `"owner"`\>

The call context.

#### Defined in

packages/contracts/src/token/erc721.contract.ts:373

***

### ownerOf()

> **ownerOf**(`tokenId`): `Promise`\<`string`\>

Returns the owner of the specified token ID.

#### Parameters

• **tokenId**: `BigNumberish`

The token ID to query.

#### Returns

`Promise`\<`string`\>

The owner of the specified token ID.

#### Implementation of

`Erc721Types.Contract.ownerOf`

#### Defined in

packages/contracts/src/token/erc721.contract.ts:382

***

### ownerOfCallContext()

> **ownerOfCallContext**(`tokenId`): `MethodCall`\<`Contract`, `"ownerOf"`\>

Returns the call context for the ownerOf method.

#### Parameters

• **tokenId**: `BigNumberish`

The token ID to query.

#### Returns

`MethodCall`\<`Contract`, `"ownerOf"`\>

The call context.

#### Defined in

packages/contracts/src/token/erc721.contract.ts:391

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

packages/contracts/src/token/erc721.contract.ts:116

***

### prepareContractContext()

> **prepareContractContext**\<`TCalls`, `TCustomData`\>(`calls`, `customData`?): `ContractContext`\<`Contract`, `TCalls`, `TCustomData`\>

Helper function to dynamically prepare a contract context based on custom or default method names.

#### Type Parameters

• **TCalls** *extends* `Record`\<`string`, `MethodCall`\<`Contract`, `"symbol"`\> \| `MethodCall`\<`Contract`, `"name"`\> \| `MethodCall`\<`Contract`, `"owner"`\> \| `MethodCall`\<`Contract`, `"approve"`\> \| `MethodCall`\<`Contract`, `"balanceOf"`\> \| `MethodCall`\<`Contract`, `"transferFrom"`\> \| `MethodCall`\<`Contract`, `"isApprovedForAll"`\> \| `MethodCall`\<`Contract`, `"safeTransferFrom"`\> \| `MethodCall`\<`Contract`, `"setApprovalForAll"`\> \| `MethodCall`\<`Contract`, `"supportsInterface"`\> \| `MethodCall`\<`Contract`, `"getApproved"`\> \| `MethodCall`\<`Contract`, `"ownerOf"`\> \| `MethodCall`\<`Contract`, `"renounceOwnership"`\> \| `MethodCall`\<`Contract`, `"tokenId"`\> \| `MethodCall`\<`Contract`, `"tokenURI"`\> \| `MethodCall`\<`Contract`, `"transferOwnership"`\> \| `MethodCall`\<`Contract`, `"mintNFT"`\>\>

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

packages/contracts/src/token/erc721.contract.ts:143

***

### renounceOwnership()

> **renounceOwnership**(`overrides`?): `Promise`\<`ContractTransaction`\>

Renounces ownership of the contract.

#### Parameters

• **overrides?**: `ContractTransactionOverrides`

Optional transaction overrides.

#### Returns

`Promise`\<`ContractTransaction`\>

The contract transaction.

#### Implementation of

`Erc721Types.Contract.renounceOwnership`

#### Defined in

packages/contracts/src/token/erc721.contract.ts:402

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

`Erc721Types.Contract.safeTransferFrom`

##### Defined in

packages/contracts/src/token/erc721.contract.ts:429

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

`Erc721Types.Contract.safeTransferFrom`

##### Defined in

packages/contracts/src/token/erc721.contract.ts:445

***

### setApprovalForAll()

> **setApprovalForAll**(`operator`, `approved`, `overrides`?): `Promise`\<`ContractTransaction`\>

Sets or un-sets the approval of a given operator.

#### Parameters

• **operator**: `string`

The operator to set the approval for.

• **approved**: `boolean`

Whether to approve or remove the operator.

• **overrides?**: `ContractTransactionOverrides`

Optional transaction overrides.

#### Returns

`Promise`\<`ContractTransaction`\>

The contract transaction.

#### Implementation of

`Erc721Types.Contract.setApprovalForAll`

#### Defined in

packages/contracts/src/token/erc721.contract.ts:530

***

### supportsInterface()

> **supportsInterface**(`interfaceId`): `Promise`\<`boolean`\>

Checks if a contract implements an interface.

#### Parameters

• **interfaceId**: `BytesLike`

The interface ID to check.

#### Returns

`Promise`\<`boolean`\>

True if the contract implements the interface, false otherwise.

#### Implementation of

`Erc721Types.Contract.supportsInterface`

#### Defined in

packages/contracts/src/token/erc721.contract.ts:557

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

packages/contracts/src/token/erc721.contract.ts:566

***

### symbol()

> **symbol**(): `Promise`\<`string`\>

Returns the symbol of the token.

#### Returns

`Promise`\<`string`\>

The symbol of the token.

#### Implementation of

`Erc721Types.Contract.symbol`

#### Defined in

packages/contracts/src/token/erc721.contract.ts:333

***

### symbolCallContext()

> **symbolCallContext**(): `MethodCall`\<`Contract`, `"symbol"`\>

Returns the call context for the symbol method.

#### Returns

`MethodCall`\<`Contract`, `"symbol"`\>

The call context.

#### Defined in

packages/contracts/src/token/erc721.contract.ts:341

***

### tokenId()

> **tokenId**(): `Promise`\<`BigNumber`\>

Gets the token ID of the contract.

#### Returns

`Promise`\<`BigNumber`\>

The token ID as a BigNumber.

#### Implementation of

`Erc721Types.Contract.tokenId`

#### Defined in

packages/contracts/src/token/erc721.contract.ts:349

***

### tokenIdCallContext()

> **tokenIdCallContext**(): `MethodCall`\<`Contract`, `"tokenId"`\>

Generates the call context for retrieving the token ID of the contract.

#### Returns

`MethodCall`\<`Contract`, `"tokenId"`\>

The call context for the method.

#### Defined in

packages/contracts/src/token/erc721.contract.ts:357

***

### tokenURI()

> **tokenURI**(`tokenId`): `Promise`\<`string`\>

Returns the token URI for the specified token ID.

#### Parameters

• **tokenId**: `BigNumberish`

The token ID to query.

#### Returns

`Promise`\<`string`\>

The token URI.

#### Implementation of

`Erc721Types.Contract.tokenURI`

#### Defined in

packages/contracts/src/token/erc721.contract.ts:577

***

### tokenURICallContext()

> **tokenURICallContext**(`tokenId`): `MethodCall`\<`Contract`, `"tokenURI"`\>

Returns the call context for the tokenURI method.

#### Parameters

• **tokenId**: `BigNumberish`

The token ID to query.

#### Returns

`MethodCall`\<`Contract`, `"tokenURI"`\>

The call context.

#### Defined in

packages/contracts/src/token/erc721.contract.ts:586

***

### transferFrom()

> **transferFrom**(`from`, `to`, `tokenId`, `overrides`?): `Promise`\<`ContractTransaction`\>

Transfers a token from one address to another.

#### Parameters

• **from**: `string`

The address to transfer from.

• **to**: `string`

The address to transfer to.

• **tokenId**: `BigNumberish`

The token ID to transfer.

• **overrides?**: `ContractTransactionOverrides`

Optional transaction overrides.

#### Returns

`Promise`\<`ContractTransaction`\>

The contract transaction.

#### Implementation of

`Erc721Types.Contract.transferFrom`

#### Defined in

packages/contracts/src/token/erc721.contract.ts:600

***

### transferOwnership()

> **transferOwnership**(`newOwner`, `overrides`?): `Promise`\<`ContractTransaction`\>

Transfers ownership of the contract to a new owner.

#### Parameters

• **newOwner**: `string`

The address of the new owner.

• **overrides?**: `ContractTransactionOverrides`

Optional transaction overrides.

#### Returns

`Promise`\<`ContractTransaction`\>

The contract transaction.

#### Implementation of

`Erc721Types.Contract.transferOwnership`

#### Defined in

packages/contracts/src/token/erc721.contract.ts:635
