[**@dex-toolkit/types v1.0.0**](../../../README.md) • **Docs**

***

[Documentation v1.0.0](../../../../../packages.md) / [@dex-toolkit/types](../../../README.md) / [QuickswapFactoryV3Types](../README.md) / Contract

# Interface: Contract

## Methods

### baseFeeConfiguration()

> **baseFeeConfiguration**(`overrides`?): `Promise`\<[`BaseFeeConfigurationResponse`](BaseFeeConfigurationResponse.md)\>

Payable: false
Constant: true
StateMutability: view
Type: function

#### Parameters

• **overrides?**: [`ContractCallOverrides`](../../../type-aliases/ContractCallOverrides.md)

#### Returns

`Promise`\<[`BaseFeeConfigurationResponse`](BaseFeeConfigurationResponse.md)\>

#### Defined in

[packages/types/src/abis/quickswap-factory-v3.types.ts:107](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/quickswap-factory-v3.types.ts#L107)

***

### createPool()

> **createPool**(`tokenA`, `tokenB`, `overrides`?): `Promise`\<`ContractTransaction`\>

Payable: false
Constant: false
StateMutability: nonpayable
Type: function

#### Parameters

• **tokenA**: `string`

Type: address, Indexed: false

• **tokenB**: `string`

Type: address, Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

[packages/types/src/abis/quickswap-factory-v3.types.ts:118](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/quickswap-factory-v3.types.ts#L118)

***

### farmingAddress()

> **farmingAddress**(`overrides`?): `Promise`\<`string`\>

Payable: false
Constant: true
StateMutability: view
Type: function

#### Parameters

• **overrides?**: [`ContractCallOverrides`](../../../type-aliases/ContractCallOverrides.md)

#### Returns

`Promise`\<`string`\>

#### Defined in

[packages/types/src/abis/quickswap-factory-v3.types.ts:129](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/quickswap-factory-v3.types.ts#L129)

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

[packages/types/src/abis/quickswap-factory-v3.types.ts:136](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/quickswap-factory-v3.types.ts#L136)

***

### poolByPair()

> **poolByPair**(`parameter0`, `parameter1`, `overrides`?): `Promise`\<`string`\>

Payable: false
Constant: true
StateMutability: view
Type: function

#### Parameters

• **parameter0**: `string`

Type: address, Indexed: false

• **parameter1**: `string`

Type: address, Indexed: false

• **overrides?**: [`ContractCallOverrides`](../../../type-aliases/ContractCallOverrides.md)

#### Returns

`Promise`\<`string`\>

#### Defined in

[packages/types/src/abis/quickswap-factory-v3.types.ts:145](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/quickswap-factory-v3.types.ts#L145)

***

### poolDeployer()

> **poolDeployer**(`overrides`?): `Promise`\<`string`\>

Payable: false
Constant: true
StateMutability: view
Type: function

#### Parameters

• **overrides?**: [`ContractCallOverrides`](../../../type-aliases/ContractCallOverrides.md)

#### Returns

`Promise`\<`string`\>

#### Defined in

[packages/types/src/abis/quickswap-factory-v3.types.ts:156](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/quickswap-factory-v3.types.ts#L156)

***

### setBaseFeeConfiguration()

> **setBaseFeeConfiguration**(`alpha1`, `alpha2`, `beta1`, `beta2`, `gamma1`, `gamma2`, `volumeBeta`, `volumeGamma`, `baseFee`, `overrides`?): `Promise`\<`ContractTransaction`\>

Payable: false
Constant: false
StateMutability: nonpayable
Type: function

#### Parameters

• **alpha1**: `BigNumberish`

Type: uint16, Indexed: false

• **alpha2**: `BigNumberish`

Type: uint16, Indexed: false

• **beta1**: `BigNumberish`

Type: uint32, Indexed: false

• **beta2**: `BigNumberish`

Type: uint32, Indexed: false

• **gamma1**: `BigNumberish`

Type: uint16, Indexed: false

• **gamma2**: `BigNumberish`

Type: uint16, Indexed: false

• **volumeBeta**: `BigNumberish`

Type: uint32, Indexed: false

• **volumeGamma**: `BigNumberish`

Type: uint16, Indexed: false

• **baseFee**: `BigNumberish`

Type: uint16, Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

[packages/types/src/abis/quickswap-factory-v3.types.ts:172](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/quickswap-factory-v3.types.ts#L172)

***

### setFarmingAddress()

> **setFarmingAddress**(`_farmingAddress`, `overrides`?): `Promise`\<`ContractTransaction`\>

Payable: false
Constant: false
StateMutability: nonpayable
Type: function

#### Parameters

• **\_farmingAddress**: `string`

Type: address, Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

[packages/types/src/abis/quickswap-factory-v3.types.ts:191](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/quickswap-factory-v3.types.ts#L191)

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

[packages/types/src/abis/quickswap-factory-v3.types.ts:202](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/quickswap-factory-v3.types.ts#L202)

***

### setVaultAddress()

> **setVaultAddress**(`_vaultAddress`, `overrides`?): `Promise`\<`ContractTransaction`\>

Payable: false
Constant: false
StateMutability: nonpayable
Type: function

#### Parameters

• **\_vaultAddress**: `string`

Type: address, Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

[packages/types/src/abis/quickswap-factory-v3.types.ts:213](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/quickswap-factory-v3.types.ts#L213)

***

### vaultAddress()

> **vaultAddress**(`overrides`?): `Promise`\<`string`\>

Payable: false
Constant: true
StateMutability: view
Type: function

#### Parameters

• **overrides?**: [`ContractCallOverrides`](../../../type-aliases/ContractCallOverrides.md)

#### Returns

`Promise`\<`string`\>

#### Defined in

[packages/types/src/abis/quickswap-factory-v3.types.ts:223](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/quickswap-factory-v3.types.ts#L223)
