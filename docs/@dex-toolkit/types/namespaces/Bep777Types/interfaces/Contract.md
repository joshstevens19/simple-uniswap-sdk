[**@dex-toolkit/types v1.0.0**](../../../README.md) • **Docs**

***

[Documentation v1.0.0](../../../../../packages.md) / [@dex-toolkit/types](../../../README.md) / [Bep777Types](../README.md) / Contract

# Interface: Contract

## Methods

### allowance()

> **allowance**(`spender`, `overrides`?): `Promise`\<`BigNumber`\>

Payable: false
Constant: true
StateMutability: view
Type: function

#### Parameters

• **spender**: `string`

Type: address, Indexed: false

• **overrides?**: [`ContractCallOverrides`](../../../type-aliases/ContractCallOverrides.md)

#### Returns

`Promise`\<`BigNumber`\>

#### Defined in

packages/types/src/abis/bep777.types.ts:122

***

### approve()

> **approve**(`spender`, `value`, `overrides`?): `Promise`\<`ContractTransaction`\>

Payable: false
Constant: false
StateMutability: nonpayable
Type: function

#### Parameters

• **spender**: `string`

Type: address, Indexed: false

• **value**: `BigNumberish`

Type: uint256, Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

packages/types/src/abis/bep777.types.ts:134

***

### authorizeOperator()

> **authorizeOperator**(`tokenHolder`, `operator`, `overrides`?): `Promise`\<`boolean`\>

Payable: false
Constant: true
StateMutability: view
Type: function

#### Parameters

• **tokenHolder**: `string`

Type: address, Indexed: false

• **operator**: `string`

Type: address, Indexed: false

• **overrides?**: [`ContractCallOverrides`](../../../type-aliases/ContractCallOverrides.md)

#### Returns

`Promise`\<`boolean`\>

#### Defined in

packages/types/src/abis/bep777.types.ts:255

***

### balanceOf()

> **balanceOf**(`tokenOwner`, `overrides`?): `Promise`\<`BigNumber`\>

Payable: false
Constant: true
StateMutability: view
Type: function

#### Parameters

• **tokenOwner**: `string`

Type: address, Indexed: false

• **overrides?**: [`ContractCallOverrides`](../../../type-aliases/ContractCallOverrides.md)

#### Returns

`Promise`\<`BigNumber`\>

#### Defined in

packages/types/src/abis/bep777.types.ts:111

***

### decimals()

> **decimals**(`overrides`?): `Promise`\<`number` \| `BigNumber`\>

Payable: false
Constant: true
StateMutability: view
Type: function

#### Parameters

• **overrides?**: [`ContractCallOverrides`](../../../type-aliases/ContractCallOverrides.md)

#### Returns

`Promise`\<`number` \| `BigNumber`\>

#### Defined in

packages/types/src/abis/bep777.types.ts:103

***

### decreaseAllowance()

> **decreaseAllowance**(`spender`, `subtractedValue`, `overrides`?): `Promise`\<`ContractTransaction`\>

Payable: false
Constant: false
StateMutability: nonpayable
Type: function

#### Parameters

• **spender**: `string`

Type: address, Indexed: false

• **subtractedValue**: `BigNumberish`

Type: uint256, Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

packages/types/src/abis/bep777.types.ts:162

***

### defaultOperators()

> **defaultOperators**(`tokenHolder`, `overrides`?): `Promise`\<`string`[]\>

Payable: false
Constant: true
StateMutability: view
Type: function

#### Parameters

• **tokenHolder**: `string`

Type: address, Indexed: false

• **overrides?**: [`ContractCallOverrides`](../../../type-aliases/ContractCallOverrides.md)

#### Returns

`Promise`\<`string`[]\>

#### Defined in

packages/types/src/abis/bep777.types.ts:232

***

### defaultOperatorsSend()

> **defaultOperatorsSend**(`tokenHolder`, `operator`, `overrides`?): `Promise`\<`void`\>

Payable: false
Constant: true
StateMutability: view
Type: function

#### Parameters

• **tokenHolder**: `string`

Type: address, Indexed: false

• **operator**: `string`

Type: address, Indexed: false

• **overrides?**: [`ContractCallOverrides`](../../../type-aliases/ContractCallOverrides.md)

#### Returns

`Promise`\<`void`\>

#### Defined in

packages/types/src/abis/bep777.types.ts:305

***

### increaseAllowance()

> **increaseAllowance**(`spender`, `addedValue`, `overrides`?): `Promise`\<`ContractTransaction`\>

Payable: false
Constant: false
StateMutability: nonpayable
Type: function

#### Parameters

• **spender**: `string`

Type: address, Indexed: false

• **addedValue**: `BigNumberish`

Type: uint256, Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

packages/types/src/abis/bep777.types.ts:175

***

### isOperatorFor()

> **isOperatorFor**(`operator`, `tokenHolder`, `overrides`?): `Promise`\<`boolean`\>

Payable: false
Constant: true
StateMutability: view
Type: function

#### Parameters

• **operator**: `string`

Type: address, Indexed: false

• **tokenHolder**: `string`

Type: address, Indexed: false

• **overrides?**: [`ContractCallOverrides`](../../../type-aliases/ContractCallOverrides.md)

#### Returns

`Promise`\<`boolean`\>

#### Defined in

packages/types/src/abis/bep777.types.ts:279

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

packages/types/src/abis/bep777.types.ts:89

***

### operatorSend()

> **operatorSend**(`operator`, `from`, `amount`, `userData`, `operatorData`, `overrides`?): `Promise`\<`ContractTransaction`\>

Payable: false
Constant: false
StateMutability: nonpayable
Type: function

#### Parameters

• **operator**: `string`

Type: address, Indexed: false

• **from**: `string`

Type: address, Indexed: false

• **amount**: `BigNumberish`

Type: uint256, Indexed: false

• **userData**: `BytesLike`

Type: bytes, Indexed: false

• **operatorData**: `BytesLike`

Type: bytes, Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

packages/types/src/abis/bep777.types.ts:217

***

### revokeDefaultOperators()

> **revokeDefaultOperators**(`defaultOperators`, `revokedOperator`, `overrides`?): `Promise`\<`ContractTransaction`\>

Payable: false
Constant: false
StateMutability: nonpayable
Type: function

#### Parameters

• **defaultOperators**: `string`[]

Type: address[], Indexed: false

• **revokedOperator**: `string`

Type: address, Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

packages/types/src/abis/bep777.types.ts:292

***

### revokeOperator()

> **revokeOperator**(`operator`, `overrides`?): `Promise`\<`ContractTransaction`\>

Payable: false
Constant: false
StateMutability: nonpayable
Type: function

#### Parameters

• **operator**: `string`

Type: address, Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

packages/types/src/abis/bep777.types.ts:267

***

### send()

> **send**(`amount`, `userData`, `overrides`?): `Promise`\<`ContractTransaction`\>

Payable: false
Constant: false
StateMutability: nonpayable
Type: function

#### Parameters

• **amount**: `BigNumberish`

Type: uint256, Indexed: false

• **userData**: `BytesLike`

Type: bytes, Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

packages/types/src/abis/bep777.types.ts:201

***

### setDefaultOperators()

> **setDefaultOperators**(`newDefaultOperators`, `overrides`?): `Promise`\<`ContractTransaction`\>

Payable: false
Constant: false
StateMutability: nonpayable
Type: function

#### Parameters

• **newDefaultOperators**: `string`[]

Type: address[], Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

packages/types/src/abis/bep777.types.ts:243

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

packages/types/src/abis/bep777.types.ts:96

***

### transfer()

#### transfer(from, to, value, overrides)

> **transfer**(`from`, `to`, `value`, `overrides`?): `Promise`\<`ContractTransaction`\>

Payable: false
Constant: false
StateMutability: nonpayable
Type: function

##### Parameters

• **from**: `string`

Type: address, Indexed: false

• **to**: `string`

Type: address, Indexed: false

• **value**: `BigNumberish`

Type: uint256, Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

##### Returns

`Promise`\<`ContractTransaction`\>

##### Defined in

packages/types/src/abis/bep777.types.ts:148

#### transfer(to, value, overrides)

> **transfer**(`to`, `value`, `overrides`?): `Promise`\<`ContractTransaction`\>

Payable: false
Constant: false
StateMutability: nonpayable
Type: function

##### Parameters

• **to**: `string`

Type: address, Indexed: false

• **value**: `BigNumberish`

Type: uint256, Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

##### Returns

`Promise`\<`ContractTransaction`\>

##### Defined in

packages/types/src/abis/bep777.types.ts:188
