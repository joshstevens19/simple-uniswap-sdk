[**@dex-toolkit/types v1.0.0**](../../../README.md) • **Docs**

***

[Documentation v1.0.0](../../../../../packages.md) / [@dex-toolkit/types](../../../README.md) / [TraderJoePairV2Types](../README.md) / Contract

# Interface: Contract

## Methods

### approveForAll()

> **approveForAll**(`spender`, `approved`, `overrides`?): `Promise`\<`ContractTransaction`\>

Payable: false
Constant: false
StateMutability: nonpayable
Type: function

#### Parameters

• **spender**: `string`

Type: address, Indexed: false

• **approved**: `boolean`

Type: bool, Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

[packages/types/src/abis/traderJoe-pair-v2.types.ts:324](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-pair-v2.types.ts#L324)

***

### balanceOf()

> **balanceOf**(`account`, `id`, `overrides`?): `Promise`\<`BigNumber`\>

Payable: false
Constant: true
StateMutability: view
Type: function

#### Parameters

• **account**: `string`

Type: address, Indexed: false

• **id**: `BigNumberish`

Type: uint256, Indexed: false

• **overrides?**: [`ContractCallOverrides`](../../../type-aliases/ContractCallOverrides.md)

#### Returns

`Promise`\<`BigNumber`\>

#### Defined in

[packages/types/src/abis/traderJoe-pair-v2.types.ts:337](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-pair-v2.types.ts#L337)

***

### balanceOfBatch()

> **balanceOfBatch**(`accounts`, `ids`, `overrides`?): `Promise`\<`BigNumber`[]\>

Payable: false
Constant: true
StateMutability: view
Type: function

#### Parameters

• **accounts**: `string`[]

Type: address[], Indexed: false

• **ids**: `BigNumberish`[]

Type: uint256[], Indexed: false

• **overrides?**: [`ContractCallOverrides`](../../../type-aliases/ContractCallOverrides.md)

#### Returns

`Promise`\<`BigNumber`[]\>

#### Defined in

[packages/types/src/abis/traderJoe-pair-v2.types.ts:350](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-pair-v2.types.ts#L350)

***

### batchTransferFrom()

> **batchTransferFrom**(`from`, `to`, `ids`, `amounts`, `overrides`?): `Promise`\<`ContractTransaction`\>

Payable: false
Constant: false
StateMutability: nonpayable
Type: function

#### Parameters

• **from**: `string`

Type: address, Indexed: false

• **to**: `string`

Type: address, Indexed: false

• **ids**: `BigNumberish`[]

Type: uint256[], Indexed: false

• **amounts**: `BigNumberish`[]

Type: uint256[], Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

[packages/types/src/abis/traderJoe-pair-v2.types.ts:365](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-pair-v2.types.ts#L365)

***

### burn()

> **burn**(`from`, `to`, `ids`, `amountsToBurn`, `overrides`?): `Promise`\<`ContractTransaction`\>

Payable: false
Constant: false
StateMutability: nonpayable
Type: function

#### Parameters

• **from**: `string`

Type: address, Indexed: false

• **to**: `string`

Type: address, Indexed: false

• **ids**: `BigNumberish`[]

Type: uint256[], Indexed: false

• **amountsToBurn**: `BigNumberish`[]

Type: uint256[], Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

[packages/types/src/abis/traderJoe-pair-v2.types.ts:382](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-pair-v2.types.ts#L382)

***

### collectProtocolFees()

> **collectProtocolFees**(`overrides`?): `Promise`\<`ContractTransaction`\>

Payable: false
Constant: false
StateMutability: nonpayable
Type: function

#### Parameters

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

[packages/types/src/abis/traderJoe-pair-v2.types.ts:395](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-pair-v2.types.ts#L395)

***

### flashLoan()

> **flashLoan**(`receiver`, `amounts`, `data`, `overrides`?): `Promise`\<`ContractTransaction`\>

Payable: false
Constant: false
StateMutability: nonpayable
Type: function

#### Parameters

• **receiver**: `string`

Type: address, Indexed: false

• **amounts**: `BytesLike`

Type: bytes32, Indexed: false

• **data**: `BytesLike`

Type: bytes, Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

[packages/types/src/abis/traderJoe-pair-v2.types.ts:407](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-pair-v2.types.ts#L407)

***

### forceDecay()

> **forceDecay**(`overrides`?): `Promise`\<`ContractTransaction`\>

Payable: false
Constant: false
StateMutability: nonpayable
Type: function

#### Parameters

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

[packages/types/src/abis/traderJoe-pair-v2.types.ts:419](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-pair-v2.types.ts#L419)

***

### getActiveId()

> **getActiveId**(`overrides`?): `Promise`\<`number`\>

Payable: false
Constant: true
StateMutability: view
Type: function

#### Parameters

• **overrides?**: [`ContractCallOverrides`](../../../type-aliases/ContractCallOverrides.md)

#### Returns

`Promise`\<`number`\>

#### Defined in

[packages/types/src/abis/traderJoe-pair-v2.types.ts:428](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-pair-v2.types.ts#L428)

***

### getBin()

> **getBin**(`id`, `overrides`?): `Promise`\<[`GetBinResponse`](GetBinResponse.md)\>

Payable: false
Constant: true
StateMutability: view
Type: function

#### Parameters

• **id**: `BigNumberish`

Type: uint24, Indexed: false

• **overrides?**: [`ContractCallOverrides`](../../../type-aliases/ContractCallOverrides.md)

#### Returns

`Promise`\<[`GetBinResponse`](GetBinResponse.md)\>

#### Defined in

[packages/types/src/abis/traderJoe-pair-v2.types.ts:436](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-pair-v2.types.ts#L436)

***

### getBinStep()

> **getBinStep**(`overrides`?): `Promise`\<`number`\>

Payable: false
Constant: true
StateMutability: pure
Type: function

#### Parameters

• **overrides?**: [`ContractCallOverrides`](../../../type-aliases/ContractCallOverrides.md)

#### Returns

`Promise`\<`number`\>

#### Defined in

[packages/types/src/abis/traderJoe-pair-v2.types.ts:446](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-pair-v2.types.ts#L446)

***

### getFactory()

> **getFactory**(`overrides`?): `Promise`\<`string`\>

Payable: false
Constant: true
StateMutability: view
Type: function

#### Parameters

• **overrides?**: [`ContractCallOverrides`](../../../type-aliases/ContractCallOverrides.md)

#### Returns

`Promise`\<`string`\>

#### Defined in

[packages/types/src/abis/traderJoe-pair-v2.types.ts:453](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-pair-v2.types.ts#L453)

***

### getIdFromPrice()

> **getIdFromPrice**(`price`, `overrides`?): `Promise`\<`number`\>

Payable: false
Constant: true
StateMutability: pure
Type: function

#### Parameters

• **price**: `BigNumberish`

Type: uint256, Indexed: false

• **overrides?**: [`ContractCallOverrides`](../../../type-aliases/ContractCallOverrides.md)

#### Returns

`Promise`\<`number`\>

#### Defined in

[packages/types/src/abis/traderJoe-pair-v2.types.ts:461](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-pair-v2.types.ts#L461)

***

### getLBHooksParameters()

> **getLBHooksParameters**(`overrides`?): `Promise`\<`string`\>

Payable: false
Constant: true
StateMutability: view
Type: function

#### Parameters

• **overrides?**: [`ContractCallOverrides`](../../../type-aliases/ContractCallOverrides.md)

#### Returns

`Promise`\<`string`\>

#### Defined in

[packages/types/src/abis/traderJoe-pair-v2.types.ts:471](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-pair-v2.types.ts#L471)

***

### getNextNonEmptyBin()

> **getNextNonEmptyBin**(`swapForY`, `id`, `overrides`?): `Promise`\<`number`\>

Payable: false
Constant: true
StateMutability: view
Type: function

#### Parameters

• **swapForY**: `boolean`

Type: bool, Indexed: false

• **id**: `BigNumberish`

Type: uint24, Indexed: false

• **overrides?**: [`ContractCallOverrides`](../../../type-aliases/ContractCallOverrides.md)

#### Returns

`Promise`\<`number`\>

#### Defined in

[packages/types/src/abis/traderJoe-pair-v2.types.ts:480](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-pair-v2.types.ts#L480)

***

### getOracleParameters()

> **getOracleParameters**(`overrides`?): `Promise`\<[`GetOracleParametersResponse`](GetOracleParametersResponse.md)\>

Payable: false
Constant: true
StateMutability: view
Type: function

#### Parameters

• **overrides?**: [`ContractCallOverrides`](../../../type-aliases/ContractCallOverrides.md)

#### Returns

`Promise`\<[`GetOracleParametersResponse`](GetOracleParametersResponse.md)\>

#### Defined in

[packages/types/src/abis/traderJoe-pair-v2.types.ts:491](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-pair-v2.types.ts#L491)

***

### getOracleSampleAt()

> **getOracleSampleAt**(`lookupTimestamp`, `overrides`?): `Promise`\<[`GetOracleSampleAtResponse`](GetOracleSampleAtResponse.md)\>

Payable: false
Constant: true
StateMutability: view
Type: function

#### Parameters

• **lookupTimestamp**: `BigNumberish`

Type: uint40, Indexed: false

• **overrides?**: [`ContractCallOverrides`](../../../type-aliases/ContractCallOverrides.md)

#### Returns

`Promise`\<[`GetOracleSampleAtResponse`](GetOracleSampleAtResponse.md)\>

#### Defined in

[packages/types/src/abis/traderJoe-pair-v2.types.ts:501](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-pair-v2.types.ts#L501)

***

### getPriceFromId()

> **getPriceFromId**(`id`, `overrides`?): `Promise`\<`BigNumber`\>

Payable: false
Constant: true
StateMutability: pure
Type: function

#### Parameters

• **id**: `BigNumberish`

Type: uint24, Indexed: false

• **overrides?**: [`ContractCallOverrides`](../../../type-aliases/ContractCallOverrides.md)

#### Returns

`Promise`\<`BigNumber`\>

#### Defined in

[packages/types/src/abis/traderJoe-pair-v2.types.ts:512](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-pair-v2.types.ts#L512)

***

### getProtocolFees()

> **getProtocolFees**(`overrides`?): `Promise`\<[`GetProtocolFeesResponse`](GetProtocolFeesResponse.md)\>

Payable: false
Constant: true
StateMutability: view
Type: function

#### Parameters

• **overrides?**: [`ContractCallOverrides`](../../../type-aliases/ContractCallOverrides.md)

#### Returns

`Promise`\<[`GetProtocolFeesResponse`](GetProtocolFeesResponse.md)\>

#### Defined in

[packages/types/src/abis/traderJoe-pair-v2.types.ts:522](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-pair-v2.types.ts#L522)

***

### getReserves()

> **getReserves**(`overrides`?): `Promise`\<[`GetReservesResponse`](GetReservesResponse.md)\>

Payable: false
Constant: true
StateMutability: view
Type: function

#### Parameters

• **overrides?**: [`ContractCallOverrides`](../../../type-aliases/ContractCallOverrides.md)

#### Returns

`Promise`\<[`GetReservesResponse`](GetReservesResponse.md)\>

#### Defined in

[packages/types/src/abis/traderJoe-pair-v2.types.ts:531](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-pair-v2.types.ts#L531)

***

### getStaticFeeParameters()

> **getStaticFeeParameters**(`overrides`?): `Promise`\<[`GetStaticFeeParametersResponse`](GetStaticFeeParametersResponse.md)\>

Payable: false
Constant: true
StateMutability: view
Type: function

#### Parameters

• **overrides?**: [`ContractCallOverrides`](../../../type-aliases/ContractCallOverrides.md)

#### Returns

`Promise`\<[`GetStaticFeeParametersResponse`](GetStaticFeeParametersResponse.md)\>

#### Defined in

[packages/types/src/abis/traderJoe-pair-v2.types.ts:538](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-pair-v2.types.ts#L538)

***

### getSwapIn()

> **getSwapIn**(`amountOut`, `swapForY`, `overrides`?): `Promise`\<[`GetSwapInResponse`](GetSwapInResponse.md)\>

Payable: false
Constant: true
StateMutability: view
Type: function

#### Parameters

• **amountOut**: `BigNumberish`

Type: uint128, Indexed: false

• **swapForY**: `boolean`

Type: bool, Indexed: false

• **overrides?**: [`ContractCallOverrides`](../../../type-aliases/ContractCallOverrides.md)

#### Returns

`Promise`\<[`GetSwapInResponse`](GetSwapInResponse.md)\>

#### Defined in

[packages/types/src/abis/traderJoe-pair-v2.types.ts:549](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-pair-v2.types.ts#L549)

***

### getSwapOut()

> **getSwapOut**(`amountIn`, `swapForY`, `overrides`?): `Promise`\<[`GetSwapOutResponse`](GetSwapOutResponse.md)\>

Payable: false
Constant: true
StateMutability: view
Type: function

#### Parameters

• **amountIn**: `BigNumberish`

Type: uint128, Indexed: false

• **swapForY**: `boolean`

Type: bool, Indexed: false

• **overrides?**: [`ContractCallOverrides`](../../../type-aliases/ContractCallOverrides.md)

#### Returns

`Promise`\<[`GetSwapOutResponse`](GetSwapOutResponse.md)\>

#### Defined in

[packages/types/src/abis/traderJoe-pair-v2.types.ts:562](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-pair-v2.types.ts#L562)

***

### getTokenX()

> **getTokenX**(`overrides`?): `Promise`\<`string`\>

Payable: false
Constant: true
StateMutability: pure
Type: function

#### Parameters

• **overrides?**: [`ContractCallOverrides`](../../../type-aliases/ContractCallOverrides.md)

#### Returns

`Promise`\<`string`\>

#### Defined in

[packages/types/src/abis/traderJoe-pair-v2.types.ts:573](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-pair-v2.types.ts#L573)

***

### getTokenY()

> **getTokenY**(`overrides`?): `Promise`\<`string`\>

Payable: false
Constant: true
StateMutability: pure
Type: function

#### Parameters

• **overrides?**: [`ContractCallOverrides`](../../../type-aliases/ContractCallOverrides.md)

#### Returns

`Promise`\<`string`\>

#### Defined in

[packages/types/src/abis/traderJoe-pair-v2.types.ts:580](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-pair-v2.types.ts#L580)

***

### getVariableFeeParameters()

> **getVariableFeeParameters**(`overrides`?): `Promise`\<[`GetVariableFeeParametersResponse`](GetVariableFeeParametersResponse.md)\>

Payable: false
Constant: true
StateMutability: view
Type: function

#### Parameters

• **overrides?**: [`ContractCallOverrides`](../../../type-aliases/ContractCallOverrides.md)

#### Returns

`Promise`\<[`GetVariableFeeParametersResponse`](GetVariableFeeParametersResponse.md)\>

#### Defined in

[packages/types/src/abis/traderJoe-pair-v2.types.ts:587](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-pair-v2.types.ts#L587)

***

### implementation()

> **implementation**(`overrides`?): `Promise`\<`string`\>

Payable: false
Constant: true
StateMutability: view
Type: function

#### Parameters

• **overrides?**: [`ContractCallOverrides`](../../../type-aliases/ContractCallOverrides.md)

#### Returns

`Promise`\<`string`\>

#### Defined in

[packages/types/src/abis/traderJoe-pair-v2.types.ts:596](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-pair-v2.types.ts#L596)

***

### increaseOracleLength()

> **increaseOracleLength**(`newLength`, `overrides`?): `Promise`\<`ContractTransaction`\>

Payable: false
Constant: false
StateMutability: nonpayable
Type: function

#### Parameters

• **newLength**: `BigNumberish`

Type: uint16, Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

[packages/types/src/abis/traderJoe-pair-v2.types.ts:604](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-pair-v2.types.ts#L604)

***

### initialize()

> **initialize**(`baseFactor`, `filterPeriod`, `decayPeriod`, `reductionFactor`, `variableFeeControl`, `protocolShare`, `maxVolatilityAccumulator`, `activeId`, `overrides`?): `Promise`\<`ContractTransaction`\>

Payable: false
Constant: false
StateMutability: nonpayable
Type: function

#### Parameters

• **baseFactor**: `BigNumberish`

Type: uint16, Indexed: false

• **filterPeriod**: `BigNumberish`

Type: uint16, Indexed: false

• **decayPeriod**: `BigNumberish`

Type: uint16, Indexed: false

• **reductionFactor**: `BigNumberish`

Type: uint16, Indexed: false

• **variableFeeControl**: `BigNumberish`

Type: uint24, Indexed: false

• **protocolShare**: `BigNumberish`

Type: uint16, Indexed: false

• **maxVolatilityAccumulator**: `BigNumberish`

Type: uint24, Indexed: false

• **activeId**: `BigNumberish`

Type: uint24, Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

[packages/types/src/abis/traderJoe-pair-v2.types.ts:622](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-pair-v2.types.ts#L622)

***

### isApprovedForAll()

> **isApprovedForAll**(`owner`, `spender`, `overrides`?): `Promise`\<`boolean`\>

Payable: false
Constant: true
StateMutability: view
Type: function

#### Parameters

• **owner**: `string`

Type: address, Indexed: false

• **spender**: `string`

Type: address, Indexed: false

• **overrides?**: [`ContractCallOverrides`](../../../type-aliases/ContractCallOverrides.md)

#### Returns

`Promise`\<`boolean`\>

#### Defined in

[packages/types/src/abis/traderJoe-pair-v2.types.ts:641](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-pair-v2.types.ts#L641)

***

### mint()

> **mint**(`to`, `liquidityConfigs`, `refundTo`, `overrides`?): `Promise`\<`ContractTransaction`\>

Payable: false
Constant: false
StateMutability: nonpayable
Type: function

#### Parameters

• **to**: `string`

Type: address, Indexed: false

• **liquidityConfigs**: `BytesLike`[]

Type: bytes32[], Indexed: false

• **refundTo**: `string`

Type: address, Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

[packages/types/src/abis/traderJoe-pair-v2.types.ts:655](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-pair-v2.types.ts#L655)

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

[packages/types/src/abis/traderJoe-pair-v2.types.ts:667](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-pair-v2.types.ts#L667)

***

### setHooksParameters()

> **setHooksParameters**(`hooksParameters`, `onHooksSetData`, `overrides`?): `Promise`\<`ContractTransaction`\>

Payable: false
Constant: false
StateMutability: nonpayable
Type: function

#### Parameters

• **hooksParameters**: `BytesLike`

Type: bytes32, Indexed: false

• **onHooksSetData**: `BytesLike`

Type: bytes, Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

[packages/types/src/abis/traderJoe-pair-v2.types.ts:676](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-pair-v2.types.ts#L676)

***

### setStaticFeeParameters()

> **setStaticFeeParameters**(`baseFactor`, `filterPeriod`, `decayPeriod`, `reductionFactor`, `variableFeeControl`, `protocolShare`, `maxVolatilityAccumulator`, `overrides`?): `Promise`\<`ContractTransaction`\>

Payable: false
Constant: false
StateMutability: nonpayable
Type: function

#### Parameters

• **baseFactor**: `BigNumberish`

Type: uint16, Indexed: false

• **filterPeriod**: `BigNumberish`

Type: uint16, Indexed: false

• **decayPeriod**: `BigNumberish`

Type: uint16, Indexed: false

• **reductionFactor**: `BigNumberish`

Type: uint16, Indexed: false

• **variableFeeControl**: `BigNumberish`

Type: uint24, Indexed: false

• **protocolShare**: `BigNumberish`

Type: uint16, Indexed: false

• **maxVolatilityAccumulator**: `BigNumberish`

Type: uint24, Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

[packages/types/src/abis/traderJoe-pair-v2.types.ts:694](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-pair-v2.types.ts#L694)

***

### swap()

> **swap**(`swapForY`, `to`, `overrides`?): `Promise`\<`ContractTransaction`\>

Payable: false
Constant: false
StateMutability: nonpayable
Type: function

#### Parameters

• **swapForY**: `boolean`

Type: bool, Indexed: false

• **to**: `string`

Type: address, Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

[packages/types/src/abis/traderJoe-pair-v2.types.ts:712](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-pair-v2.types.ts#L712)

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

[packages/types/src/abis/traderJoe-pair-v2.types.ts:723](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-pair-v2.types.ts#L723)

***

### totalSupply()

> **totalSupply**(`id`, `overrides`?): `Promise`\<`BigNumber`\>

Payable: false
Constant: true
StateMutability: view
Type: function

#### Parameters

• **id**: `BigNumberish`

Type: uint256, Indexed: false

• **overrides?**: [`ContractCallOverrides`](../../../type-aliases/ContractCallOverrides.md)

#### Returns

`Promise`\<`BigNumber`\>

#### Defined in

[packages/types/src/abis/traderJoe-pair-v2.types.ts:731](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-pair-v2.types.ts#L731)
