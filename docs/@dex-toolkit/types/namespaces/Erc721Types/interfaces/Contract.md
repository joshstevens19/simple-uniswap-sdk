[**@dex-toolkit/types v1.0.0**](../../../README.md) • **Docs**

***

[Documentation v1.0.0](../../../../../packages.md) / [@dex-toolkit/types](../../../README.md) / [Erc721Types](../README.md) / Contract

# Interface: Contract

## Methods

### approve()

> **approve**(`to`, `tokenId`, `overrides`?): `Promise`\<`ContractTransaction`\>

Payable: false
Constant: false
StateMutability: nonpayable
Type: function

#### Parameters

• **to**: `string`

Type: address, Indexed: false

• **tokenId**: `BigNumberish`

Type: uint256, Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

packages/types/src/abis/erc721.types.ts:99

***

### balanceOf()

> **balanceOf**(`owner`, `overrides`?): `Promise`\<`BigNumber`\>

Payable: false
Constant: true
StateMutability: view
Type: function

#### Parameters

• **owner**: `string`

Type: address, Indexed: false

• **overrides?**: [`ContractCallOverrides`](../../../type-aliases/ContractCallOverrides.md)

#### Returns

`Promise`\<`BigNumber`\>

#### Defined in

packages/types/src/abis/erc721.types.ts:111

***

### getApproved()

> **getApproved**(`tokenId`, `overrides`?): `Promise`\<`string`\>

Payable: false
Constant: true
StateMutability: view
Type: function

#### Parameters

• **tokenId**: `BigNumberish`

Type: uint256, Indexed: false

• **overrides?**: [`ContractCallOverrides`](../../../type-aliases/ContractCallOverrides.md)

#### Returns

`Promise`\<`string`\>

#### Defined in

packages/types/src/abis/erc721.types.ts:122

***

### isApprovedForAll()

> **isApprovedForAll**(`owner`, `operator`, `overrides`?): `Promise`\<`boolean`\>

Payable: false
Constant: true
StateMutability: view
Type: function

#### Parameters

• **owner**: `string`

Type: address, Indexed: false

• **operator**: `string`

Type: address, Indexed: false

• **overrides?**: [`ContractCallOverrides`](../../../type-aliases/ContractCallOverrides.md)

#### Returns

`Promise`\<`boolean`\>

#### Defined in

packages/types/src/abis/erc721.types.ts:134

***

### mintNFT()

> **mintNFT**(`recipient`, `tokenURI`, `overrides`?): `Promise`\<`ContractTransaction`\>

Payable: false
Constant: false
StateMutability: nonpayable
Type: function

#### Parameters

• **recipient**: `string`

Type: address, Indexed: false

• **tokenURI**: `string`

Type: string, Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

packages/types/src/abis/erc721.types.ts:288

***

### name()

> **name**(`overrides`?): `Promise`\<`string`\>

Payable: false
Constant: true
StateMutability: view
Type: function

#### Parameters

• **overrides?**: [`ContractCallOverrides`](../../../type-aliases/ContractCallOverrides.md)

#### Returns

`Promise`\<`string`\>

#### Defined in

packages/types/src/abis/erc721.types.ts:145

***

### owner()

> **owner**(`overrides`?): `Promise`\<`string`\>

Payable: false
Constant: true
StateMutability: view
Type: function

#### Parameters

• **overrides?**: [`ContractCallOverrides`](../../../type-aliases/ContractCallOverrides.md)

#### Returns

`Promise`\<`string`\>

#### Defined in

packages/types/src/abis/erc721.types.ts:152

***

### ownerOf()

> **ownerOf**(`tokenId`, `overrides`?): `Promise`\<`string`\>

Payable: false
Constant: true
StateMutability: view
Type: function

#### Parameters

• **tokenId**: `BigNumberish`

Type: uint256, Indexed: false

• **overrides?**: [`ContractCallOverrides`](../../../type-aliases/ContractCallOverrides.md)

#### Returns

`Promise`\<`string`\>

#### Defined in

packages/types/src/abis/erc721.types.ts:160

***

### renounceOwnership()

> **renounceOwnership**(`overrides`?): `Promise`\<`ContractTransaction`\>

Payable: false
Constant: false
StateMutability: nonpayable
Type: function

#### Parameters

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

packages/types/src/abis/erc721.types.ts:170

***

### safeTransferFrom()

#### safeTransferFrom(from, to, tokenId, overrides)

> **safeTransferFrom**(`from`, `to`, `tokenId`, `overrides`?): `Promise`\<`ContractTransaction`\>

Payable: false
Constant: false
StateMutability: nonpayable
Type: function

##### Parameters

• **from**: `string`

Type: address, Indexed: false

• **to**: `string`

Type: address, Indexed: false

• **tokenId**: `BigNumberish`

Type: uint256, Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

##### Returns

`Promise`\<`ContractTransaction`\>

##### Defined in

packages/types/src/abis/erc721.types.ts:182

#### safeTransferFrom(from, to, tokenId, data, overrides)

> **safeTransferFrom**(`from`, `to`, `tokenId`, `data`, `overrides`?): `Promise`\<`ContractTransaction`\>

Payable: false
Constant: false
StateMutability: nonpayable
Type: function

##### Parameters

• **from**: `string`

Type: address, Indexed: false

• **to**: `string`

Type: address, Indexed: false

• **tokenId**: `BigNumberish`

Type: uint256, Indexed: false

• **data**: `BytesLike`

Type: bytes, Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

##### Returns

`Promise`\<`ContractTransaction`\>

##### Defined in

packages/types/src/abis/erc721.types.ts:198

***

### setApprovalForAll()

> **setApprovalForAll**(`operator`, `approved`, `overrides`?): `Promise`\<`ContractTransaction`\>

Payable: false
Constant: false
StateMutability: nonpayable
Type: function

#### Parameters

• **operator**: `string`

Type: address, Indexed: false

• **approved**: `boolean`

Type: bool, Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

packages/types/src/abis/erc721.types.ts:213

***

### supportsInterface()

> **supportsInterface**(`interfaceId`, `overrides`?): `Promise`\<`boolean`\>

Payable: false
Constant: true
StateMutability: view
Type: function

#### Parameters

• **interfaceId**: `BytesLike`

Type: bytes4, Indexed: false

• **overrides?**: [`ContractCallOverrides`](../../../type-aliases/ContractCallOverrides.md)

#### Returns

`Promise`\<`boolean`\>

#### Defined in

packages/types/src/abis/erc721.types.ts:225

***

### symbol()

> **symbol**(`overrides`?): `Promise`\<`string`\>

Payable: false
Constant: true
StateMutability: view
Type: function

#### Parameters

• **overrides?**: [`ContractCallOverrides`](../../../type-aliases/ContractCallOverrides.md)

#### Returns

`Promise`\<`string`\>

#### Defined in

packages/types/src/abis/erc721.types.ts:235

***

### tokenId()

> **tokenId**(`overrides`?): `Promise`\<`BigNumber`\>

Payable: false
Constant: true
StateMutability: view
Type: function

#### Parameters

• **overrides?**: [`ContractCallOverrides`](../../../type-aliases/ContractCallOverrides.md)

#### Returns

`Promise`\<`BigNumber`\>

#### Defined in

packages/types/src/abis/erc721.types.ts:242

***

### tokenURI()

> **tokenURI**(`tokenId`, `overrides`?): `Promise`\<`string`\>

Payable: false
Constant: true
StateMutability: view
Type: function

#### Parameters

• **tokenId**: `BigNumberish`

Type: uint256, Indexed: false

• **overrides?**: [`ContractCallOverrides`](../../../type-aliases/ContractCallOverrides.md)

#### Returns

`Promise`\<`string`\>

#### Defined in

packages/types/src/abis/erc721.types.ts:250

***

### transferFrom()

> **transferFrom**(`from`, `to`, `tokenId`, `overrides`?): `Promise`\<`ContractTransaction`\>

Payable: false
Constant: false
StateMutability: nonpayable
Type: function

#### Parameters

• **from**: `string`

Type: address, Indexed: false

• **to**: `string`

Type: address, Indexed: false

• **tokenId**: `BigNumberish`

Type: uint256, Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

packages/types/src/abis/erc721.types.ts:263

***

### transferOwnership()

> **transferOwnership**(`newOwner`, `overrides`?): `Promise`\<`ContractTransaction`\>

Payable: false
Constant: false
StateMutability: nonpayable
Type: function

#### Parameters

• **newOwner**: `string`

Type: address, Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

packages/types/src/abis/erc721.types.ts:276
