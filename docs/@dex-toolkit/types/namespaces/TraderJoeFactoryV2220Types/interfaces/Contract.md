[**@dex-toolkit/types v1.0.0**](../../../README.md) • **Docs**

***

[Documentation v1.0.0](../../../../../packages.md) / [@dex-toolkit/types](../../../README.md) / [TraderJoeFactoryV2220Types](../README.md) / Contract

# Interface: Contract

## Methods

### DEFAULT\_ADMIN\_ROLE()

> **DEFAULT\_ADMIN\_ROLE**(`overrides`?): `Promise`\<`string`\>

Payable: false
Constant: true
StateMutability: view
Type: function

#### Parameters

• **overrides?**: [`ContractCallOverrides`](../../../type-aliases/ContractCallOverrides.md)

#### Returns

`Promise`\<`string`\>

#### Defined in

[packages/types/src/abis/traderJoe-factory-v2-2-2-0.types.ts:240](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-factory-v2-2-2-0.types.ts#L240)

***

### LB\_HOOKS\_MANAGER\_ROLE()

> **LB\_HOOKS\_MANAGER\_ROLE**(`overrides`?): `Promise`\<`string`\>

Payable: false
Constant: true
StateMutability: view
Type: function

#### Parameters

• **overrides?**: [`ContractCallOverrides`](../../../type-aliases/ContractCallOverrides.md)

#### Returns

`Promise`\<`string`\>

#### Defined in

[packages/types/src/abis/traderJoe-factory-v2-2-2-0.types.ts:247](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-factory-v2-2-2-0.types.ts#L247)

***

### acceptOwnership()

> **acceptOwnership**(`overrides`?): `Promise`\<`ContractTransaction`\>

Payable: false
Constant: false
StateMutability: nonpayable
Type: function

#### Parameters

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

[packages/types/src/abis/traderJoe-factory-v2-2-2-0.types.ts:254](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-factory-v2-2-2-0.types.ts#L254)

***

### addQuoteAsset()

> **addQuoteAsset**(`quoteAsset`, `overrides`?): `Promise`\<`ContractTransaction`\>

Payable: false
Constant: false
StateMutability: nonpayable
Type: function

#### Parameters

• **quoteAsset**: `string`

Type: address, Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

[packages/types/src/abis/traderJoe-factory-v2-2-2-0.types.ts:264](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-factory-v2-2-2-0.types.ts#L264)

***

### createLBPair()

> **createLBPair**(`tokenX`, `tokenY`, `activeId`, `binStep`, `overrides`?): `Promise`\<`ContractTransaction`\>

Payable: false
Constant: false
StateMutability: nonpayable
Type: function

#### Parameters

• **tokenX**: `string`

Type: address, Indexed: false

• **tokenY**: `string`

Type: address, Indexed: false

• **activeId**: `BigNumberish`

Type: uint24, Indexed: false

• **binStep**: `BigNumberish`

Type: uint16, Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

[packages/types/src/abis/traderJoe-factory-v2-2-2-0.types.ts:278](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-factory-v2-2-2-0.types.ts#L278)

***

### forceDecay()

> **forceDecay**(`pair`, `overrides`?): `Promise`\<`ContractTransaction`\>

Payable: false
Constant: false
StateMutability: nonpayable
Type: function

#### Parameters

• **pair**: `string`

Type: address, Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

[packages/types/src/abis/traderJoe-factory-v2-2-2-0.types.ts:292](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-factory-v2-2-2-0.types.ts#L292)

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

[packages/types/src/abis/traderJoe-factory-v2-2-2-0.types.ts:302](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-factory-v2-2-2-0.types.ts#L302)

***

### getAllLBPairs()

> **getAllLBPairs**(`tokenX`, `tokenY`, `overrides`?): `Promise`\<[`GetAllLBPairsLbPairsAvailableResponse`](GetAllLBPairsLbPairsAvailableResponse.md)[]\>

Payable: false
Constant: true
StateMutability: view
Type: function

#### Parameters

• **tokenX**: `string`

Type: address, Indexed: false

• **tokenY**: `string`

Type: address, Indexed: false

• **overrides?**: [`ContractCallOverrides`](../../../type-aliases/ContractCallOverrides.md)

#### Returns

`Promise`\<[`GetAllLBPairsLbPairsAvailableResponse`](GetAllLBPairsLbPairsAvailableResponse.md)[]\>

#### Defined in

[packages/types/src/abis/traderJoe-factory-v2-2-2-0.types.ts:311](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-factory-v2-2-2-0.types.ts#L311)

***

### getFeeRecipient()

> **getFeeRecipient**(`overrides`?): `Promise`\<`string`\>

Payable: false
Constant: true
StateMutability: view
Type: function

#### Parameters

• **overrides?**: [`ContractCallOverrides`](../../../type-aliases/ContractCallOverrides.md)

#### Returns

`Promise`\<`string`\>

#### Defined in

[packages/types/src/abis/traderJoe-factory-v2-2-2-0.types.ts:322](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-factory-v2-2-2-0.types.ts#L322)

***

### getFlashLoanFee()

> **getFlashLoanFee**(`overrides`?): `Promise`\<`BigNumber`\>

Payable: false
Constant: true
StateMutability: view
Type: function

#### Parameters

• **overrides?**: [`ContractCallOverrides`](../../../type-aliases/ContractCallOverrides.md)

#### Returns

`Promise`\<`BigNumber`\>

#### Defined in

[packages/types/src/abis/traderJoe-factory-v2-2-2-0.types.ts:329](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-factory-v2-2-2-0.types.ts#L329)

***

### getLBPairAtIndex()

> **getLBPairAtIndex**(`index`, `overrides`?): `Promise`\<`string`\>

Payable: false
Constant: true
StateMutability: view
Type: function

#### Parameters

• **index**: `BigNumberish`

Type: uint256, Indexed: false

• **overrides?**: [`ContractCallOverrides`](../../../type-aliases/ContractCallOverrides.md)

#### Returns

`Promise`\<`string`\>

#### Defined in

[packages/types/src/abis/traderJoe-factory-v2-2-2-0.types.ts:337](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-factory-v2-2-2-0.types.ts#L337)

***

### getLBPairImplementation()

> **getLBPairImplementation**(`overrides`?): `Promise`\<`string`\>

Payable: false
Constant: true
StateMutability: view
Type: function

#### Parameters

• **overrides?**: [`ContractCallOverrides`](../../../type-aliases/ContractCallOverrides.md)

#### Returns

`Promise`\<`string`\>

#### Defined in

[packages/types/src/abis/traderJoe-factory-v2-2-2-0.types.ts:347](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-factory-v2-2-2-0.types.ts#L347)

***

### getLBPairInformation()

> **getLBPairInformation**(`tokenA`, `tokenB`, `binStep`, `overrides`?): `Promise`\<[`GetLBPairInformationLbPairInformationResponse`](GetLBPairInformationLbPairInformationResponse.md)\>

Payable: false
Constant: true
StateMutability: view
Type: function

#### Parameters

• **tokenA**: `string`

Type: address, Indexed: false

• **tokenB**: `string`

Type: address, Indexed: false

• **binStep**: `BigNumberish`

Type: uint256, Indexed: false

• **overrides?**: [`ContractCallOverrides`](../../../type-aliases/ContractCallOverrides.md)

#### Returns

`Promise`\<[`GetLBPairInformationLbPairInformationResponse`](GetLBPairInformationLbPairInformationResponse.md)\>

#### Defined in

[packages/types/src/abis/traderJoe-factory-v2-2-2-0.types.ts:357](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-factory-v2-2-2-0.types.ts#L357)

***

### getMaxFlashLoanFee()

> **getMaxFlashLoanFee**(`overrides`?): `Promise`\<`BigNumber`\>

Payable: false
Constant: true
StateMutability: pure
Type: function

#### Parameters

• **overrides?**: [`ContractCallOverrides`](../../../type-aliases/ContractCallOverrides.md)

#### Returns

`Promise`\<`BigNumber`\>

#### Defined in

[packages/types/src/abis/traderJoe-factory-v2-2-2-0.types.ts:369](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-factory-v2-2-2-0.types.ts#L369)

***

### getMinBinStep()

> **getMinBinStep**(`overrides`?): `Promise`\<`BigNumber`\>

Payable: false
Constant: true
StateMutability: pure
Type: function

#### Parameters

• **overrides?**: [`ContractCallOverrides`](../../../type-aliases/ContractCallOverrides.md)

#### Returns

`Promise`\<`BigNumber`\>

#### Defined in

[packages/types/src/abis/traderJoe-factory-v2-2-2-0.types.ts:376](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-factory-v2-2-2-0.types.ts#L376)

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

[packages/types/src/abis/traderJoe-factory-v2-2-2-0.types.ts:383](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-factory-v2-2-2-0.types.ts#L383)

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

[packages/types/src/abis/traderJoe-factory-v2-2-2-0.types.ts:390](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-factory-v2-2-2-0.types.ts#L390)

***

### getOpenBinSteps()

> **getOpenBinSteps**(`overrides`?): `Promise`\<`BigNumber`[]\>

Payable: false
Constant: true
StateMutability: view
Type: function

#### Parameters

• **overrides?**: [`ContractCallOverrides`](../../../type-aliases/ContractCallOverrides.md)

#### Returns

`Promise`\<`BigNumber`[]\>

#### Defined in

[packages/types/src/abis/traderJoe-factory-v2-2-2-0.types.ts:397](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-factory-v2-2-2-0.types.ts#L397)

***

### getPreset()

> **getPreset**(`binStep`, `overrides`?): `Promise`\<[`GetPresetResponse`](GetPresetResponse.md)\>

Payable: false
Constant: true
StateMutability: view
Type: function

#### Parameters

• **binStep**: `BigNumberish`

Type: uint256, Indexed: false

• **overrides?**: [`ContractCallOverrides`](../../../type-aliases/ContractCallOverrides.md)

#### Returns

`Promise`\<[`GetPresetResponse`](GetPresetResponse.md)\>

#### Defined in

[packages/types/src/abis/traderJoe-factory-v2-2-2-0.types.ts:405](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-factory-v2-2-2-0.types.ts#L405)

***

### getQuoteAssetAtIndex()

> **getQuoteAssetAtIndex**(`index`, `overrides`?): `Promise`\<`string`\>

Payable: false
Constant: true
StateMutability: view
Type: function

#### Parameters

• **index**: `BigNumberish`

Type: uint256, Indexed: false

• **overrides?**: [`ContractCallOverrides`](../../../type-aliases/ContractCallOverrides.md)

#### Returns

`Promise`\<`string`\>

#### Defined in

[packages/types/src/abis/traderJoe-factory-v2-2-2-0.types.ts:416](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-factory-v2-2-2-0.types.ts#L416)

***

### getRoleAdmin()

> **getRoleAdmin**(`role`, `overrides`?): `Promise`\<`string`\>

Payable: false
Constant: true
StateMutability: view
Type: function

#### Parameters

• **role**: `BytesLike`

Type: bytes32, Indexed: false

• **overrides?**: [`ContractCallOverrides`](../../../type-aliases/ContractCallOverrides.md)

#### Returns

`Promise`\<`string`\>

#### Defined in

[packages/types/src/abis/traderJoe-factory-v2-2-2-0.types.ts:427](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-factory-v2-2-2-0.types.ts#L427)

***

### grantRole()

> **grantRole**(`role`, `account`, `overrides`?): `Promise`\<`ContractTransaction`\>

Payable: false
Constant: false
StateMutability: nonpayable
Type: function

#### Parameters

• **role**: `BytesLike`

Type: bytes32, Indexed: false

• **account**: `string`

Type: address, Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

[packages/types/src/abis/traderJoe-factory-v2-2-2-0.types.ts:439](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-factory-v2-2-2-0.types.ts#L439)

***

### hasRole()

> **hasRole**(`role`, `account`, `overrides`?): `Promise`\<`boolean`\>

Payable: false
Constant: true
StateMutability: view
Type: function

#### Parameters

• **role**: `BytesLike`

Type: bytes32, Indexed: false

• **account**: `string`

Type: address, Indexed: false

• **overrides?**: [`ContractCallOverrides`](../../../type-aliases/ContractCallOverrides.md)

#### Returns

`Promise`\<`boolean`\>

#### Defined in

[packages/types/src/abis/traderJoe-factory-v2-2-2-0.types.ts:452](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-factory-v2-2-2-0.types.ts#L452)

***

### isQuoteAsset()

> **isQuoteAsset**(`token`, `overrides`?): `Promise`\<`boolean`\>

Payable: false
Constant: true
StateMutability: view
Type: function

#### Parameters

• **token**: `string`

Type: address, Indexed: false

• **overrides?**: [`ContractCallOverrides`](../../../type-aliases/ContractCallOverrides.md)

#### Returns

`Promise`\<`boolean`\>

#### Defined in

[packages/types/src/abis/traderJoe-factory-v2-2-2-0.types.ts:464](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-factory-v2-2-2-0.types.ts#L464)

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

[packages/types/src/abis/traderJoe-factory-v2-2-2-0.types.ts:474](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-factory-v2-2-2-0.types.ts#L474)

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

[packages/types/src/abis/traderJoe-factory-v2-2-2-0.types.ts:481](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-factory-v2-2-2-0.types.ts#L481)

***

### removeLBHooksOnPair()

> **removeLBHooksOnPair**(`tokenX`, `tokenY`, `binStep`, `overrides`?): `Promise`\<`ContractTransaction`\>

Payable: false
Constant: false
StateMutability: nonpayable
Type: function

#### Parameters

• **tokenX**: `string`

Type: address, Indexed: false

• **tokenY**: `string`

Type: address, Indexed: false

• **binStep**: `BigNumberish`

Type: uint16, Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

[packages/types/src/abis/traderJoe-factory-v2-2-2-0.types.ts:491](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-factory-v2-2-2-0.types.ts#L491)

***

### removePreset()

> **removePreset**(`binStep`, `overrides`?): `Promise`\<`ContractTransaction`\>

Payable: false
Constant: false
StateMutability: nonpayable
Type: function

#### Parameters

• **binStep**: `BigNumberish`

Type: uint16, Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

[packages/types/src/abis/traderJoe-factory-v2-2-2-0.types.ts:504](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-factory-v2-2-2-0.types.ts#L504)

***

### removeQuoteAsset()

> **removeQuoteAsset**(`quoteAsset`, `overrides`?): `Promise`\<`ContractTransaction`\>

Payable: false
Constant: false
StateMutability: nonpayable
Type: function

#### Parameters

• **quoteAsset**: `string`

Type: address, Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

[packages/types/src/abis/traderJoe-factory-v2-2-2-0.types.ts:515](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-factory-v2-2-2-0.types.ts#L515)

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

[packages/types/src/abis/traderJoe-factory-v2-2-2-0.types.ts:525](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-factory-v2-2-2-0.types.ts#L525)

***

### renounceRole()

> **renounceRole**(`role`, `callerConfirmation`, `overrides`?): `Promise`\<`ContractTransaction`\>

Payable: false
Constant: false
StateMutability: nonpayable
Type: function

#### Parameters

• **role**: `BytesLike`

Type: bytes32, Indexed: false

• **callerConfirmation**: `string`

Type: address, Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

[packages/types/src/abis/traderJoe-factory-v2-2-2-0.types.ts:536](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-factory-v2-2-2-0.types.ts#L536)

***

### revokeRole()

> **revokeRole**(`role`, `account`, `overrides`?): `Promise`\<`ContractTransaction`\>

Payable: false
Constant: false
StateMutability: nonpayable
Type: function

#### Parameters

• **role**: `BytesLike`

Type: bytes32, Indexed: false

• **account**: `string`

Type: address, Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

[packages/types/src/abis/traderJoe-factory-v2-2-2-0.types.ts:549](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-factory-v2-2-2-0.types.ts#L549)

***

### setFeeRecipient()

> **setFeeRecipient**(`feeRecipient`, `overrides`?): `Promise`\<`ContractTransaction`\>

Payable: false
Constant: false
StateMutability: nonpayable
Type: function

#### Parameters

• **feeRecipient**: `string`

Type: address, Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

[packages/types/src/abis/traderJoe-factory-v2-2-2-0.types.ts:561](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-factory-v2-2-2-0.types.ts#L561)

***

### setFeesParametersOnPair()

> **setFeesParametersOnPair**(`tokenX`, `tokenY`, `binStep`, `baseFactor`, `filterPeriod`, `decayPeriod`, `reductionFactor`, `variableFeeControl`, `protocolShare`, `maxVolatilityAccumulator`, `overrides`?): `Promise`\<`ContractTransaction`\>

Payable: false
Constant: false
StateMutability: nonpayable
Type: function

#### Parameters

• **tokenX**: `string`

Type: address, Indexed: false

• **tokenY**: `string`

Type: address, Indexed: false

• **binStep**: `BigNumberish`

Type: uint16, Indexed: false

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

[packages/types/src/abis/traderJoe-factory-v2-2-2-0.types.ts:581](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-factory-v2-2-2-0.types.ts#L581)

***

### setFlashLoanFee()

> **setFlashLoanFee**(`flashLoanFee`, `overrides`?): `Promise`\<`ContractTransaction`\>

Payable: false
Constant: false
StateMutability: nonpayable
Type: function

#### Parameters

• **flashLoanFee**: `BigNumberish`

Type: uint256, Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

[packages/types/src/abis/traderJoe-factory-v2-2-2-0.types.ts:601](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-factory-v2-2-2-0.types.ts#L601)

***

### setLBHooksParametersOnPair()

> **setLBHooksParametersOnPair**(`tokenX`, `tokenY`, `binStep`, `hooksParameters`, `onHooksSetData`, `overrides`?): `Promise`\<`ContractTransaction`\>

Payable: false
Constant: false
StateMutability: nonpayable
Type: function

#### Parameters

• **tokenX**: `string`

Type: address, Indexed: false

• **tokenY**: `string`

Type: address, Indexed: false

• **binStep**: `BigNumberish`

Type: uint16, Indexed: false

• **hooksParameters**: `BytesLike`

Type: bytes32, Indexed: false

• **onHooksSetData**: `BytesLike`

Type: bytes, Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

[packages/types/src/abis/traderJoe-factory-v2-2-2-0.types.ts:616](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-factory-v2-2-2-0.types.ts#L616)

***

### setLBPairIgnored()

> **setLBPairIgnored**(`tokenX`, `tokenY`, `binStep`, `ignored`, `overrides`?): `Promise`\<`ContractTransaction`\>

Payable: false
Constant: false
StateMutability: nonpayable
Type: function

#### Parameters

• **tokenX**: `string`

Type: address, Indexed: false

• **tokenY**: `string`

Type: address, Indexed: false

• **binStep**: `BigNumberish`

Type: uint16, Indexed: false

• **ignored**: `boolean`

Type: bool, Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

[packages/types/src/abis/traderJoe-factory-v2-2-2-0.types.ts:634](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-factory-v2-2-2-0.types.ts#L634)

***

### setLBPairImplementation()

> **setLBPairImplementation**(`newLBPairImplementation`, `overrides`?): `Promise`\<`ContractTransaction`\>

Payable: false
Constant: false
StateMutability: nonpayable
Type: function

#### Parameters

• **newLBPairImplementation**: `string`

Type: address, Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

[packages/types/src/abis/traderJoe-factory-v2-2-2-0.types.ts:648](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-factory-v2-2-2-0.types.ts#L648)

***

### setPreset()

> **setPreset**(`binStep`, `baseFactor`, `filterPeriod`, `decayPeriod`, `reductionFactor`, `variableFeeControl`, `protocolShare`, `maxVolatilityAccumulator`, `isOpen`, `overrides`?): `Promise`\<`ContractTransaction`\>

Payable: false
Constant: false
StateMutability: nonpayable
Type: function

#### Parameters

• **binStep**: `BigNumberish`

Type: uint16, Indexed: false

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

• **isOpen**: `boolean`

Type: bool, Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

[packages/types/src/abis/traderJoe-factory-v2-2-2-0.types.ts:667](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-factory-v2-2-2-0.types.ts#L667)

***

### setPresetOpenState()

> **setPresetOpenState**(`binStep`, `isOpen`, `overrides`?): `Promise`\<`ContractTransaction`\>

Payable: false
Constant: false
StateMutability: nonpayable
Type: function

#### Parameters

• **binStep**: `BigNumberish`

Type: uint16, Indexed: false

• **isOpen**: `boolean`

Type: bool, Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

[packages/types/src/abis/traderJoe-factory-v2-2-2-0.types.ts:687](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-factory-v2-2-2-0.types.ts#L687)

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

[packages/types/src/abis/traderJoe-factory-v2-2-2-0.types.ts:699](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-factory-v2-2-2-0.types.ts#L699)

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

[packages/types/src/abis/traderJoe-factory-v2-2-2-0.types.ts:710](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-factory-v2-2-2-0.types.ts#L710)
