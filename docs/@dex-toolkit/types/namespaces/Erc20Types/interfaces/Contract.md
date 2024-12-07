[**@dex-toolkit/types v1.0.0**](../../../README.md) • **Docs**

***

[Documentation v1.0.0](../../../../../packages.md) / [@dex-toolkit/types](../../../README.md) / [Erc20Types](../README.md) / Contract

# Interface: Contract

## Methods

### allowance()

> **allowance**(`_owner`, `_spender`, `overrides`?): `Promise`\<`BigNumber`\>

Payable: false
Constant: true
StateMutability: view
Type: function

#### Parameters

• **\_owner**: `string`

Type: address, Indexed: false

• **\_spender**: `string`

Type: address, Indexed: false

• **overrides?**: [`ContractCallOverrides`](../../../type-aliases/ContractCallOverrides.md)

#### Returns

`Promise`\<`BigNumber`\>

#### Defined in

packages/types/src/abis/erc20.types.ts:133

***

### approve()

> **approve**(`_spender`, `_value`, `overrides`?): `Promise`\<`ContractTransaction`\>

Payable: false
Constant: false
StateMutability: nonpayable
Type: function

#### Parameters

• **\_spender**: `string`

Type: address, Indexed: false

• **\_value**: `BigNumberish`

Type: uint256, Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

packages/types/src/abis/erc20.types.ts:60

***

### balanceOf()

> **balanceOf**(`_owner`, `overrides`?): `Promise`\<`BigNumber`\>

Payable: false
Constant: true
StateMutability: view
Type: function

#### Parameters

• **\_owner**: `string`

Type: address, Indexed: false

• **overrides?**: [`ContractCallOverrides`](../../../type-aliases/ContractCallOverrides.md)

#### Returns

`Promise`\<`BigNumber`\>

#### Defined in

packages/types/src/abis/erc20.types.ts:101

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

packages/types/src/abis/erc20.types.ts:93

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

packages/types/src/abis/erc20.types.ts:51

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

packages/types/src/abis/erc20.types.ts:111

***

### totalSupply()

> **totalSupply**(`overrides`?): `Promise`\<`BigNumber`\>

Payable: false
Constant: true
StateMutability: view
Type: function

#### Parameters

• **overrides?**: [`ContractCallOverrides`](../../../type-aliases/ContractCallOverrides.md)

#### Returns

`Promise`\<`BigNumber`\>

#### Defined in

packages/types/src/abis/erc20.types.ts:71

***

### transfer()

> **transfer**(`_to`, `_value`, `overrides`?): `Promise`\<`ContractTransaction`\>

Payable: false
Constant: false
StateMutability: nonpayable
Type: function

#### Parameters

• **\_to**: `string`

Type: address, Indexed: false

• **\_value**: `BigNumberish`

Type: uint256, Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

packages/types/src/abis/erc20.types.ts:120

***

### transferFrom()

> **transferFrom**(`_from`, `_to`, `_value`, `overrides`?): `Promise`\<`ContractTransaction`\>

Payable: false
Constant: false
StateMutability: nonpayable
Type: function

#### Parameters

• **\_from**: `string`

Type: address, Indexed: false

• **\_to**: `string`

Type: address, Indexed: false

• **\_value**: `BigNumberish`

Type: uint256, Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

packages/types/src/abis/erc20.types.ts:81
