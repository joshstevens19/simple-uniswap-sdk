[**@dex-toolkit/types v1.0.0**](../../../README.md) • **Docs**

***

[Documentation v1.0.0](../../../../../packages.md) / [@dex-toolkit/types](../../../README.md) / [TraderJoeFactoryV2220Types](../README.md) / EventsContext

# Interface: EventsContext

## Methods

### FeeRecipientSet()

> **FeeRecipientSet**(`oldRecipient`, `newRecipient`): [`EventFilter`](../../../type-aliases/EventFilter.md)

#### Parameters

• **oldRecipient**: `string`

• **newRecipient**: `string`

#### Returns

[`EventFilter`](../../../type-aliases/EventFilter.md)

#### Defined in

[packages/types/src/abis/traderJoe-factory-v2-2-2-0.types.ts:38](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-factory-v2-2-2-0.types.ts#L38)

***

### FlashLoanFeeSet()

> **FlashLoanFeeSet**(`oldFlashLoanFee`, `newFlashLoanFee`): [`EventFilter`](../../../type-aliases/EventFilter.md)

#### Parameters

• **oldFlashLoanFee**: `BigNumberish`

• **newFlashLoanFee**: `BigNumberish`

#### Returns

[`EventFilter`](../../../type-aliases/EventFilter.md)

#### Defined in

[packages/types/src/abis/traderJoe-factory-v2-2-2-0.types.ts:39](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-factory-v2-2-2-0.types.ts#L39)

***

### LBPairCreated()

> **LBPairCreated**(`tokenX`, `tokenY`, `binStep`, `LBPair`, `pid`): [`EventFilter`](../../../type-aliases/EventFilter.md)

#### Parameters

• **tokenX**: `string`

• **tokenY**: `string`

• **binStep**: `BigNumberish`

• **LBPair**: `string`

• **pid**: `BigNumberish`

#### Returns

[`EventFilter`](../../../type-aliases/EventFilter.md)

#### Defined in

[packages/types/src/abis/traderJoe-factory-v2-2-2-0.types.ts:43](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-factory-v2-2-2-0.types.ts#L43)

***

### LBPairIgnoredStateChanged()

> **LBPairIgnoredStateChanged**(`LBPair`, `ignored`): [`EventFilter`](../../../type-aliases/EventFilter.md)

#### Parameters

• **LBPair**: `string`

• **ignored**: `boolean`

#### Returns

[`EventFilter`](../../../type-aliases/EventFilter.md)

#### Defined in

[packages/types/src/abis/traderJoe-factory-v2-2-2-0.types.ts:50](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-factory-v2-2-2-0.types.ts#L50)

***

### LBPairImplementationSet()

> **LBPairImplementationSet**(`oldLBPairImplementation`, `LBPairImplementation`): [`EventFilter`](../../../type-aliases/EventFilter.md)

#### Parameters

• **oldLBPairImplementation**: `string`

• **LBPairImplementation**: `string`

#### Returns

[`EventFilter`](../../../type-aliases/EventFilter.md)

#### Defined in

[packages/types/src/abis/traderJoe-factory-v2-2-2-0.types.ts:51](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-factory-v2-2-2-0.types.ts#L51)

***

### OwnershipTransferStarted()

> **OwnershipTransferStarted**(`previousOwner`, `newOwner`): [`EventFilter`](../../../type-aliases/EventFilter.md)

#### Parameters

• **previousOwner**: `string`

• **newOwner**: `string`

#### Returns

[`EventFilter`](../../../type-aliases/EventFilter.md)

#### Defined in

[packages/types/src/abis/traderJoe-factory-v2-2-2-0.types.ts:55](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-factory-v2-2-2-0.types.ts#L55)

***

### OwnershipTransferred()

> **OwnershipTransferred**(`previousOwner`, `newOwner`): [`EventFilter`](../../../type-aliases/EventFilter.md)

#### Parameters

• **previousOwner**: `string`

• **newOwner**: `string`

#### Returns

[`EventFilter`](../../../type-aliases/EventFilter.md)

#### Defined in

[packages/types/src/abis/traderJoe-factory-v2-2-2-0.types.ts:56](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-factory-v2-2-2-0.types.ts#L56)

***

### PresetOpenStateChanged()

> **PresetOpenStateChanged**(`binStep`, `isOpen`): [`EventFilter`](../../../type-aliases/EventFilter.md)

#### Parameters

• **binStep**: `BigNumberish`

• **isOpen**: `boolean`

#### Returns

[`EventFilter`](../../../type-aliases/EventFilter.md)

#### Defined in

[packages/types/src/abis/traderJoe-factory-v2-2-2-0.types.ts:57](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-factory-v2-2-2-0.types.ts#L57)

***

### PresetRemoved()

> **PresetRemoved**(`binStep`): [`EventFilter`](../../../type-aliases/EventFilter.md)

#### Parameters

• **binStep**: `BigNumberish`

#### Returns

[`EventFilter`](../../../type-aliases/EventFilter.md)

#### Defined in

[packages/types/src/abis/traderJoe-factory-v2-2-2-0.types.ts:58](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-factory-v2-2-2-0.types.ts#L58)

***

### PresetSet()

> **PresetSet**(`binStep`, `baseFactor`, `filterPeriod`, `decayPeriod`, `reductionFactor`, `variableFeeControl`, `protocolShare`, `maxVolatilityAccumulator`): [`EventFilter`](../../../type-aliases/EventFilter.md)

#### Parameters

• **binStep**: `BigNumberish`

• **baseFactor**: `BigNumberish`

• **filterPeriod**: `BigNumberish`

• **decayPeriod**: `BigNumberish`

• **reductionFactor**: `BigNumberish`

• **variableFeeControl**: `BigNumberish`

• **protocolShare**: `BigNumberish`

• **maxVolatilityAccumulator**: `BigNumberish`

#### Returns

[`EventFilter`](../../../type-aliases/EventFilter.md)

#### Defined in

[packages/types/src/abis/traderJoe-factory-v2-2-2-0.types.ts:59](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-factory-v2-2-2-0.types.ts#L59)

***

### QuoteAssetAdded()

> **QuoteAssetAdded**(`quoteAsset`): [`EventFilter`](../../../type-aliases/EventFilter.md)

#### Parameters

• **quoteAsset**: `string`

#### Returns

[`EventFilter`](../../../type-aliases/EventFilter.md)

#### Defined in

[packages/types/src/abis/traderJoe-factory-v2-2-2-0.types.ts:69](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-factory-v2-2-2-0.types.ts#L69)

***

### QuoteAssetRemoved()

> **QuoteAssetRemoved**(`quoteAsset`): [`EventFilter`](../../../type-aliases/EventFilter.md)

#### Parameters

• **quoteAsset**: `string`

#### Returns

[`EventFilter`](../../../type-aliases/EventFilter.md)

#### Defined in

[packages/types/src/abis/traderJoe-factory-v2-2-2-0.types.ts:70](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-factory-v2-2-2-0.types.ts#L70)

***

### RoleAdminChanged()

> **RoleAdminChanged**(`role`, `previousAdminRole`, `newAdminRole`): [`EventFilter`](../../../type-aliases/EventFilter.md)

#### Parameters

• **role**: `BytesLike`

• **previousAdminRole**: `BytesLike`

• **newAdminRole**: `BytesLike`

#### Returns

[`EventFilter`](../../../type-aliases/EventFilter.md)

#### Defined in

[packages/types/src/abis/traderJoe-factory-v2-2-2-0.types.ts:71](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-factory-v2-2-2-0.types.ts#L71)

***

### RoleGranted()

> **RoleGranted**(`role`, `account`, `sender`): [`EventFilter`](../../../type-aliases/EventFilter.md)

#### Parameters

• **role**: `BytesLike`

• **account**: `string`

• **sender**: `string`

#### Returns

[`EventFilter`](../../../type-aliases/EventFilter.md)

#### Defined in

[packages/types/src/abis/traderJoe-factory-v2-2-2-0.types.ts:76](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-factory-v2-2-2-0.types.ts#L76)

***

### RoleRevoked()

> **RoleRevoked**(`role`, `account`, `sender`): [`EventFilter`](../../../type-aliases/EventFilter.md)

#### Parameters

• **role**: `BytesLike`

• **account**: `string`

• **sender**: `string`

#### Returns

[`EventFilter`](../../../type-aliases/EventFilter.md)

#### Defined in

[packages/types/src/abis/traderJoe-factory-v2-2-2-0.types.ts:77](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-factory-v2-2-2-0.types.ts#L77)
