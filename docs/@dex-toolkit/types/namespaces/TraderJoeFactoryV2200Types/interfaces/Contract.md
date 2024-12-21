[**@dex-toolkit/types v1.0.0**](../../../README.md) • **Docs**

***

[Documentation v1.0.0](../../../../../packages.md) / [@dex-toolkit/types](../../../README.md) / [TraderJoeFactoryV2200Types](../README.md) / Contract

# Interface: Contract

## Methods

### LBPairImplementation()

> **LBPairImplementation**(`overrides`?): `Promise`\<`string`\>

Payable: false
Constant: true
StateMutability: view
Type: function

#### Parameters

• **overrides?**: [`ContractCallOverrides`](../../../type-aliases/ContractCallOverrides.md)

#### Returns

`Promise`\<`string`\>

#### Defined in

[packages/types/src/abis/traderJoe-factory-v2-2-0-0.types.ts:228](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-factory-v2-2-0-0.types.ts#L228)

***

### MAX\_BIN\_STEP()

> **MAX\_BIN\_STEP**(`overrides`?): `Promise`\<`BigNumber`\>

Payable: false
Constant: true
StateMutability: view
Type: function

#### Parameters

• **overrides?**: [`ContractCallOverrides`](../../../type-aliases/ContractCallOverrides.md)

#### Returns

`Promise`\<`BigNumber`\>

#### Defined in

[packages/types/src/abis/traderJoe-factory-v2-2-0-0.types.ts:235](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-factory-v2-2-0-0.types.ts#L235)

***

### MAX\_FEE()

> **MAX\_FEE**(`overrides`?): `Promise`\<`BigNumber`\>

Payable: false
Constant: true
StateMutability: view
Type: function

#### Parameters

• **overrides?**: [`ContractCallOverrides`](../../../type-aliases/ContractCallOverrides.md)

#### Returns

`Promise`\<`BigNumber`\>

#### Defined in

[packages/types/src/abis/traderJoe-factory-v2-2-0-0.types.ts:242](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-factory-v2-2-0-0.types.ts#L242)

***

### MAX\_PROTOCOL\_SHARE()

> **MAX\_PROTOCOL\_SHARE**(`overrides`?): `Promise`\<`BigNumber`\>

Payable: false
Constant: true
StateMutability: view
Type: function

#### Parameters

• **overrides?**: [`ContractCallOverrides`](../../../type-aliases/ContractCallOverrides.md)

#### Returns

`Promise`\<`BigNumber`\>

#### Defined in

[packages/types/src/abis/traderJoe-factory-v2-2-0-0.types.ts:249](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-factory-v2-2-0-0.types.ts#L249)

***

### MIN\_BIN\_STEP()

> **MIN\_BIN\_STEP**(`overrides`?): `Promise`\<`BigNumber`\>

Payable: false
Constant: true
StateMutability: view
Type: function

#### Parameters

• **overrides?**: [`ContractCallOverrides`](../../../type-aliases/ContractCallOverrides.md)

#### Returns

`Promise`\<`BigNumber`\>

#### Defined in

[packages/types/src/abis/traderJoe-factory-v2-2-0-0.types.ts:256](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-factory-v2-2-0-0.types.ts#L256)

***

### addQuoteAsset()

> **addQuoteAsset**(`_quoteAsset`, `overrides`?): `Promise`\<`ContractTransaction`\>

Payable: false
Constant: false
StateMutability: nonpayable
Type: function

#### Parameters

• **\_quoteAsset**: `string`

Type: address, Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

[packages/types/src/abis/traderJoe-factory-v2-2-0-0.types.ts:264](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-factory-v2-2-0-0.types.ts#L264)

***

### allLBPairs()

> **allLBPairs**(`parameter0`, `overrides`?): `Promise`\<`string`\>

Payable: false
Constant: true
StateMutability: view
Type: function

#### Parameters

• **parameter0**: `BigNumberish`

Type: uint256, Indexed: false

• **overrides?**: [`ContractCallOverrides`](../../../type-aliases/ContractCallOverrides.md)

#### Returns

`Promise`\<`string`\>

#### Defined in

[packages/types/src/abis/traderJoe-factory-v2-2-0-0.types.ts:275](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-factory-v2-2-0-0.types.ts#L275)

***

### becomeOwner()

> **becomeOwner**(`overrides`?): `Promise`\<`ContractTransaction`\>

Payable: false
Constant: false
StateMutability: nonpayable
Type: function

#### Parameters

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

[packages/types/src/abis/traderJoe-factory-v2-2-0-0.types.ts:285](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-factory-v2-2-0-0.types.ts#L285)

***

### createLBPair()

> **createLBPair**(`_tokenX`, `_tokenY`, `_activeId`, `_binStep`, `overrides`?): `Promise`\<`ContractTransaction`\>

Payable: false
Constant: false
StateMutability: nonpayable
Type: function

#### Parameters

• **\_tokenX**: `string`

Type: address, Indexed: false

• **\_tokenY**: `string`

Type: address, Indexed: false

• **\_activeId**: `BigNumberish`

Type: uint24, Indexed: false

• **\_binStep**: `BigNumberish`

Type: uint16, Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

[packages/types/src/abis/traderJoe-factory-v2-2-0-0.types.ts:298](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-factory-v2-2-0-0.types.ts#L298)

***

### creationUnlocked()

> **creationUnlocked**(`overrides`?): `Promise`\<`boolean`\>

Payable: false
Constant: true
StateMutability: view
Type: function

#### Parameters

• **overrides?**: [`ContractCallOverrides`](../../../type-aliases/ContractCallOverrides.md)

#### Returns

`Promise`\<`boolean`\>

#### Defined in

[packages/types/src/abis/traderJoe-factory-v2-2-0-0.types.ts:311](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-factory-v2-2-0-0.types.ts#L311)

***

### feeRecipient()

> **feeRecipient**(`overrides`?): `Promise`\<`string`\>

Payable: false
Constant: true
StateMutability: view
Type: function

#### Parameters

• **overrides?**: [`ContractCallOverrides`](../../../type-aliases/ContractCallOverrides.md)

#### Returns

`Promise`\<`string`\>

#### Defined in

[packages/types/src/abis/traderJoe-factory-v2-2-0-0.types.ts:318](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-factory-v2-2-0-0.types.ts#L318)

***

### flashLoanFee()

> **flashLoanFee**(`overrides`?): `Promise`\<`BigNumber`\>

Payable: false
Constant: true
StateMutability: view
Type: function

#### Parameters

• **overrides?**: [`ContractCallOverrides`](../../../type-aliases/ContractCallOverrides.md)

#### Returns

`Promise`\<`BigNumber`\>

#### Defined in

[packages/types/src/abis/traderJoe-factory-v2-2-0-0.types.ts:325](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-factory-v2-2-0-0.types.ts#L325)

***

### forceDecay()

> **forceDecay**(`_LBPair`, `overrides`?): `Promise`\<`ContractTransaction`\>

Payable: false
Constant: false
StateMutability: nonpayable
Type: function

#### Parameters

• **\_LBPair**: `string`

Type: address, Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

[packages/types/src/abis/traderJoe-factory-v2-2-0-0.types.ts:333](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-factory-v2-2-0-0.types.ts#L333)

***

### getAllBinSteps()

> **getAllBinSteps**(`overrides`?): `Promise`\<`BigNumber`[]\>

Payable: false
Constant: true
StateMutability: view
Type: function

#### Parameters

• **overrides?**: [`ContractCallOverrides`](../../../type-aliases/ContractCallOverrides.md)

#### Returns

`Promise`\<`BigNumber`[]\>

#### Defined in

[packages/types/src/abis/traderJoe-factory-v2-2-0-0.types.ts:343](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-factory-v2-2-0-0.types.ts#L343)

***

### getAllLBPairs()

> **getAllLBPairs**(`_tokenX`, `_tokenY`, `overrides`?): `Promise`\<[`GetAllLBPairsLBPairsAvailableResponse`](GetAllLBPairsLBPairsAvailableResponse.md)[]\>

Payable: false
Constant: true
StateMutability: view
Type: function

#### Parameters

• **\_tokenX**: `string`

Type: address, Indexed: false

• **\_tokenY**: `string`

Type: address, Indexed: false

• **overrides?**: [`ContractCallOverrides`](../../../type-aliases/ContractCallOverrides.md)

#### Returns

`Promise`\<[`GetAllLBPairsLBPairsAvailableResponse`](GetAllLBPairsLBPairsAvailableResponse.md)[]\>

#### Defined in

[packages/types/src/abis/traderJoe-factory-v2-2-0-0.types.ts:352](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-factory-v2-2-0-0.types.ts#L352)

***

### getLBPairInformation()

> **getLBPairInformation**(`_tokenA`, `_tokenB`, `_binStep`, `overrides`?): `Promise`\<[`LBPairInformationResponse`](LBPairInformationResponse.md)\>

Payable: false
Constant: true
StateMutability: view
Type: function

#### Parameters

• **\_tokenA**: `string`

Type: address, Indexed: false

• **\_tokenB**: `string`

Type: address, Indexed: false

• **\_binStep**: `BigNumberish`

Type: uint256, Indexed: false

• **overrides?**: [`ContractCallOverrides`](../../../type-aliases/ContractCallOverrides.md)

#### Returns

`Promise`\<[`LBPairInformationResponse`](LBPairInformationResponse.md)\>

#### Defined in

[packages/types/src/abis/traderJoe-factory-v2-2-0-0.types.ts:366](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-factory-v2-2-0-0.types.ts#L366)

***

### getNumberOfLBPairs()

> **getNumberOfLBPairs**(`overrides`?): `Promise`\<`BigNumber`\>

Payable: false
Constant: true
StateMutability: view
Type: function

#### Parameters

• **overrides?**: [`ContractCallOverrides`](../../../type-aliases/ContractCallOverrides.md)

#### Returns

`Promise`\<`BigNumber`\>

#### Defined in

[packages/types/src/abis/traderJoe-factory-v2-2-0-0.types.ts:378](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-factory-v2-2-0-0.types.ts#L378)

***

### getNumberOfQuoteAssets()

> **getNumberOfQuoteAssets**(`overrides`?): `Promise`\<`BigNumber`\>

Payable: false
Constant: true
StateMutability: view
Type: function

#### Parameters

• **overrides?**: [`ContractCallOverrides`](../../../type-aliases/ContractCallOverrides.md)

#### Returns

`Promise`\<`BigNumber`\>

#### Defined in

[packages/types/src/abis/traderJoe-factory-v2-2-0-0.types.ts:385](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-factory-v2-2-0-0.types.ts#L385)

***

### getPreset()

> **getPreset**(`_binStep`, `overrides`?): `Promise`\<[`GetPresetResponse`](GetPresetResponse.md)\>

Payable: false
Constant: true
StateMutability: view
Type: function

#### Parameters

• **\_binStep**: `BigNumberish`

Type: uint16, Indexed: false

• **overrides?**: [`ContractCallOverrides`](../../../type-aliases/ContractCallOverrides.md)

#### Returns

`Promise`\<[`GetPresetResponse`](GetPresetResponse.md)\>

#### Defined in

[packages/types/src/abis/traderJoe-factory-v2-2-0-0.types.ts:393](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-factory-v2-2-0-0.types.ts#L393)

***

### getQuoteAsset()

> **getQuoteAsset**(`_index`, `overrides`?): `Promise`\<`string`\>

Payable: false
Constant: true
StateMutability: view
Type: function

#### Parameters

• **\_index**: `BigNumberish`

Type: uint256, Indexed: false

• **overrides?**: [`ContractCallOverrides`](../../../type-aliases/ContractCallOverrides.md)

#### Returns

`Promise`\<`string`\>

#### Defined in

[packages/types/src/abis/traderJoe-factory-v2-2-0-0.types.ts:404](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-factory-v2-2-0-0.types.ts#L404)

***

### isQuoteAsset()

> **isQuoteAsset**(`_token`, `overrides`?): `Promise`\<`boolean`\>

Payable: false
Constant: true
StateMutability: view
Type: function

#### Parameters

• **\_token**: `string`

Type: address, Indexed: false

• **overrides?**: [`ContractCallOverrides`](../../../type-aliases/ContractCallOverrides.md)

#### Returns

`Promise`\<`boolean`\>

#### Defined in

[packages/types/src/abis/traderJoe-factory-v2-2-0-0.types.ts:415](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-factory-v2-2-0-0.types.ts#L415)

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

[packages/types/src/abis/traderJoe-factory-v2-2-0-0.types.ts:425](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-factory-v2-2-0-0.types.ts#L425)

***

### pendingOwner()

> **pendingOwner**(`overrides`?): `Promise`\<`string`\>

Payable: false
Constant: true
StateMutability: view
Type: function

#### Parameters

• **overrides?**: [`ContractCallOverrides`](../../../type-aliases/ContractCallOverrides.md)

#### Returns

`Promise`\<`string`\>

#### Defined in

[packages/types/src/abis/traderJoe-factory-v2-2-0-0.types.ts:432](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-factory-v2-2-0-0.types.ts#L432)

***

### removePreset()

> **removePreset**(`_binStep`, `overrides`?): `Promise`\<`ContractTransaction`\>

Payable: false
Constant: false
StateMutability: nonpayable
Type: function

#### Parameters

• **\_binStep**: `BigNumberish`

Type: uint16, Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

[packages/types/src/abis/traderJoe-factory-v2-2-0-0.types.ts:440](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-factory-v2-2-0-0.types.ts#L440)

***

### removeQuoteAsset()

> **removeQuoteAsset**(`_quoteAsset`, `overrides`?): `Promise`\<`ContractTransaction`\>

Payable: false
Constant: false
StateMutability: nonpayable
Type: function

#### Parameters

• **\_quoteAsset**: `string`

Type: address, Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

[packages/types/src/abis/traderJoe-factory-v2-2-0-0.types.ts:451](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-factory-v2-2-0-0.types.ts#L451)

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

[packages/types/src/abis/traderJoe-factory-v2-2-0-0.types.ts:461](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-factory-v2-2-0-0.types.ts#L461)

***

### revokePendingOwner()

> **revokePendingOwner**(`overrides`?): `Promise`\<`ContractTransaction`\>

Payable: false
Constant: false
StateMutability: nonpayable
Type: function

#### Parameters

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

[packages/types/src/abis/traderJoe-factory-v2-2-0-0.types.ts:470](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-factory-v2-2-0-0.types.ts#L470)

***

### setFactoryLockedState()

> **setFactoryLockedState**(`_locked`, `overrides`?): `Promise`\<`ContractTransaction`\>

Payable: false
Constant: false
StateMutability: nonpayable
Type: function

#### Parameters

• **\_locked**: `boolean`

Type: bool, Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

[packages/types/src/abis/traderJoe-factory-v2-2-0-0.types.ts:480](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-factory-v2-2-0-0.types.ts#L480)

***

### setFeeRecipient()

> **setFeeRecipient**(`_feeRecipient`, `overrides`?): `Promise`\<`ContractTransaction`\>

Payable: false
Constant: false
StateMutability: nonpayable
Type: function

#### Parameters

• **\_feeRecipient**: `string`

Type: address, Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

[packages/types/src/abis/traderJoe-factory-v2-2-0-0.types.ts:491](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-factory-v2-2-0-0.types.ts#L491)

***

### setFeesParametersOnPair()

> **setFeesParametersOnPair**(`_tokenX`, `_tokenY`, `_binStep`, `_baseFactor`, `_filterPeriod`, `_decayPeriod`, `_reductionFactor`, `_variableFeeControl`, `_protocolShare`, `_maxVolatilityAccumulated`, `overrides`?): `Promise`\<`ContractTransaction`\>

Payable: false
Constant: false
StateMutability: nonpayable
Type: function

#### Parameters

• **\_tokenX**: `string`

Type: address, Indexed: false

• **\_tokenY**: `string`

Type: address, Indexed: false

• **\_binStep**: `BigNumberish`

Type: uint16, Indexed: false

• **\_baseFactor**: `BigNumberish`

Type: uint16, Indexed: false

• **\_filterPeriod**: `BigNumberish`

Type: uint16, Indexed: false

• **\_decayPeriod**: `BigNumberish`

Type: uint16, Indexed: false

• **\_reductionFactor**: `BigNumberish`

Type: uint16, Indexed: false

• **\_variableFeeControl**: `BigNumberish`

Type: uint24, Indexed: false

• **\_protocolShare**: `BigNumberish`

Type: uint16, Indexed: false

• **\_maxVolatilityAccumulated**: `BigNumberish`

Type: uint24, Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

[packages/types/src/abis/traderJoe-factory-v2-2-0-0.types.ts:511](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-factory-v2-2-0-0.types.ts#L511)

***

### setFlashLoanFee()

> **setFlashLoanFee**(`_flashLoanFee`, `overrides`?): `Promise`\<`ContractTransaction`\>

Payable: false
Constant: false
StateMutability: nonpayable
Type: function

#### Parameters

• **\_flashLoanFee**: `BigNumberish`

Type: uint256, Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

[packages/types/src/abis/traderJoe-factory-v2-2-0-0.types.ts:531](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-factory-v2-2-0-0.types.ts#L531)

***

### setLBPairIgnored()

> **setLBPairIgnored**(`_tokenX`, `_tokenY`, `_binStep`, `_ignored`, `overrides`?): `Promise`\<`ContractTransaction`\>

Payable: false
Constant: false
StateMutability: nonpayable
Type: function

#### Parameters

• **\_tokenX**: `string`

Type: address, Indexed: false

• **\_tokenY**: `string`

Type: address, Indexed: false

• **\_binStep**: `BigNumberish`

Type: uint256, Indexed: false

• **\_ignored**: `boolean`

Type: bool, Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

[packages/types/src/abis/traderJoe-factory-v2-2-0-0.types.ts:545](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-factory-v2-2-0-0.types.ts#L545)

***

### setLBPairImplementation()

> **setLBPairImplementation**(`_LBPairImplementation`, `overrides`?): `Promise`\<`ContractTransaction`\>

Payable: false
Constant: false
StateMutability: nonpayable
Type: function

#### Parameters

• **\_LBPairImplementation**: `string`

Type: address, Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

[packages/types/src/abis/traderJoe-factory-v2-2-0-0.types.ts:559](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-factory-v2-2-0-0.types.ts#L559)

***

### setPendingOwner()

> **setPendingOwner**(`pendingOwner_`, `overrides`?): `Promise`\<`ContractTransaction`\>

Payable: false
Constant: false
StateMutability: nonpayable
Type: function

#### Parameters

• **pendingOwner\_**: `string`

Type: address, Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

[packages/types/src/abis/traderJoe-factory-v2-2-0-0.types.ts:570](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-factory-v2-2-0-0.types.ts#L570)

***

### setPreset()

> **setPreset**(`_binStep`, `_baseFactor`, `_filterPeriod`, `_decayPeriod`, `_reductionFactor`, `_variableFeeControl`, `_protocolShare`, `_maxVolatilityAccumulated`, `_sampleLifetime`, `overrides`?): `Promise`\<`ContractTransaction`\>

Payable: false
Constant: false
StateMutability: nonpayable
Type: function

#### Parameters

• **\_binStep**: `BigNumberish`

Type: uint16, Indexed: false

• **\_baseFactor**: `BigNumberish`

Type: uint16, Indexed: false

• **\_filterPeriod**: `BigNumberish`

Type: uint16, Indexed: false

• **\_decayPeriod**: `BigNumberish`

Type: uint16, Indexed: false

• **\_reductionFactor**: `BigNumberish`

Type: uint16, Indexed: false

• **\_variableFeeControl**: `BigNumberish`

Type: uint24, Indexed: false

• **\_protocolShare**: `BigNumberish`

Type: uint16, Indexed: false

• **\_maxVolatilityAccumulated**: `BigNumberish`

Type: uint24, Indexed: false

• **\_sampleLifetime**: `BigNumberish`

Type: uint16, Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

[packages/types/src/abis/traderJoe-factory-v2-2-0-0.types.ts:589](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-factory-v2-2-0-0.types.ts#L589)
