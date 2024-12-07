[**@dex-toolkit/types v1.0.0**](../../../README.md) • **Docs**

***

[Documentation v1.0.0](../../../../../packages.md) / [@dex-toolkit/types](../../../README.md) / [UniswapFactoryV3Types](../README.md) / Contract

# Interface: Contract

## Methods

### createPool()

> **createPool**(`tokenA`, `tokenB`, `fee`, `overrides`?): `Promise`\<`ContractTransaction`\>

Payable: false
Constant: false
StateMutability: nonpayable
Type: function

#### Parameters

• **tokenA**: `string`

Type: address, Indexed: false

• **tokenB**: `string`

Type: address, Indexed: false

• **fee**: `BigNumberish`

Type: uint24, Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

packages/types/src/abis/uniswap-factory-v3.types.ts:77

***

### enableFeeTier()

> **enableFeeTier**(`fee`, `tickSpacing`, `overrides`?): `Promise`\<`ContractTransaction`\>

Payable: false
Constant: false
StateMutability: nonpayable
Type: function

#### Parameters

• **fee**: `BigNumberish`

Type: uint24, Indexed: false

• **tickSpacing**: `BigNumberish`

Type: int24, Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

packages/types/src/abis/uniswap-factory-v3.types.ts:91

***

### feeTierTickSpacing()

> **feeTierTickSpacing**(`parameter0`, `overrides`?): `Promise`\<`number`\>

Payable: false
Constant: true
StateMutability: view
Type: function

#### Parameters

• **parameter0**: `BigNumberish`

Type: uint24, Indexed: false

• **overrides?**: [`ContractCallOverrides`](../../../type-aliases/ContractCallOverrides.md)

#### Returns

`Promise`\<`number`\>

#### Defined in

packages/types/src/abis/uniswap-factory-v3.types.ts:103

***

### getPool()

> **getPool**(`parameter0`, `parameter1`, `parameter2`, `overrides`?): `Promise`\<`string`\>

Payable: false
Constant: true
StateMutability: view
Type: function

#### Parameters

• **parameter0**: `string`

Type: address, Indexed: false

• **parameter1**: `string`

Type: address, Indexed: false

• **parameter2**: `BigNumberish`

Type: uint24, Indexed: false

• **overrides?**: [`ContractCallOverrides`](../../../type-aliases/ContractCallOverrides.md)

#### Returns

`Promise`\<`string`\>

#### Defined in

packages/types/src/abis/uniswap-factory-v3.types.ts:116

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

packages/types/src/abis/uniswap-factory-v3.types.ts:128

***

### parameters()

> **parameters**(`overrides`?): `Promise`\<[`ParametersResponse`](ParametersResponse.md)\>

Payable: false
Constant: true
StateMutability: view
Type: function

#### Parameters

• **overrides?**: [`ContractCallOverrides`](../../../type-aliases/ContractCallOverrides.md)

#### Returns

`Promise`\<[`ParametersResponse`](ParametersResponse.md)\>

#### Defined in

packages/types/src/abis/uniswap-factory-v3.types.ts:135

***

### setOwner()

> **setOwner**(`_owner`, `overrides`?): `Promise`\<`ContractTransaction`\>

Payable: false
Constant: false
StateMutability: nonpayable
Type: function

#### Parameters

• **\_owner**: `string`

Type: address, Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

packages/types/src/abis/uniswap-factory-v3.types.ts:143
