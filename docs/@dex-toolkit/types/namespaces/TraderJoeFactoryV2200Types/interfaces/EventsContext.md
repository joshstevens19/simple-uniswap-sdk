[**@dex-toolkit/types v1.0.0**](../../../README.md) • **Docs**

***

[Documentation v1.0.0](../../../../../packages.md) / [@dex-toolkit/types](../../../README.md) / [TraderJoeFactoryV2200Types](../README.md) / EventsContext

# Interface: EventsContext

## Methods

### FactoryLockedStatusUpdated()

> **FactoryLockedStatusUpdated**(`unlocked`): [`EventFilter`](../../../type-aliases/EventFilter.md)

#### Parameters

• **unlocked**: `boolean`

#### Returns

[`EventFilter`](../../../type-aliases/EventFilter.md)

#### Defined in

[packages/types/src/abis/traderJoe-factory-v2-2-0-0.types.ts:31](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-factory-v2-2-0-0.types.ts#L31)

***

### FeeParametersSet()

> **FeeParametersSet**(`sender`, `LBPair`, `binStep`, `baseFactor`, `filterPeriod`, `decayPeriod`, `reductionFactor`, `variableFeeControl`, `protocolShare`, `maxVolatilityAccumulated`): [`EventFilter`](../../../type-aliases/EventFilter.md)

#### Parameters

• **sender**: `string`

• **LBPair**: `string`

• **binStep**: `BigNumberish`

• **baseFactor**: `BigNumberish`

• **filterPeriod**: `BigNumberish`

• **decayPeriod**: `BigNumberish`

• **reductionFactor**: `BigNumberish`

• **variableFeeControl**: `BigNumberish`

• **protocolShare**: `BigNumberish`

• **maxVolatilityAccumulated**: `BigNumberish`

#### Returns

[`EventFilter`](../../../type-aliases/EventFilter.md)

#### Defined in

[packages/types/src/abis/traderJoe-factory-v2-2-0-0.types.ts:32](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-factory-v2-2-0-0.types.ts#L32)

***

### FeeRecipientSet()

> **FeeRecipientSet**(`oldRecipient`, `newRecipient`): [`EventFilter`](../../../type-aliases/EventFilter.md)

#### Parameters

• **oldRecipient**: `string`

• **newRecipient**: `string`

#### Returns

[`EventFilter`](../../../type-aliases/EventFilter.md)

#### Defined in

[packages/types/src/abis/traderJoe-factory-v2-2-0-0.types.ts:44](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-factory-v2-2-0-0.types.ts#L44)

***

### FlashLoanFeeSet()

> **FlashLoanFeeSet**(`oldFlashLoanFee`, `newFlashLoanFee`): [`EventFilter`](../../../type-aliases/EventFilter.md)

#### Parameters

• **oldFlashLoanFee**: `BigNumberish`

• **newFlashLoanFee**: `BigNumberish`

#### Returns

[`EventFilter`](../../../type-aliases/EventFilter.md)

#### Defined in

[packages/types/src/abis/traderJoe-factory-v2-2-0-0.types.ts:45](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-factory-v2-2-0-0.types.ts#L45)

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

[packages/types/src/abis/traderJoe-factory-v2-2-0-0.types.ts:49](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-factory-v2-2-0-0.types.ts#L49)

***

### LBPairIgnoredStateChanged()

> **LBPairIgnoredStateChanged**(`LBPair`, `ignored`): [`EventFilter`](../../../type-aliases/EventFilter.md)

#### Parameters

• **LBPair**: `string`

• **ignored**: `boolean`

#### Returns

[`EventFilter`](../../../type-aliases/EventFilter.md)

#### Defined in

[packages/types/src/abis/traderJoe-factory-v2-2-0-0.types.ts:56](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-factory-v2-2-0-0.types.ts#L56)

***

### LBPairImplementationSet()

> **LBPairImplementationSet**(`oldLBPairImplementation`, `LBPairImplementation`): [`EventFilter`](../../../type-aliases/EventFilter.md)

#### Parameters

• **oldLBPairImplementation**: `string`

• **LBPairImplementation**: `string`

#### Returns

[`EventFilter`](../../../type-aliases/EventFilter.md)

#### Defined in

[packages/types/src/abis/traderJoe-factory-v2-2-0-0.types.ts:57](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-factory-v2-2-0-0.types.ts#L57)

***

### OwnershipTransferred()

> **OwnershipTransferred**(`previousOwner`, `newOwner`): [`EventFilter`](../../../type-aliases/EventFilter.md)

#### Parameters

• **previousOwner**: `string`

• **newOwner**: `string`

#### Returns

[`EventFilter`](../../../type-aliases/EventFilter.md)

#### Defined in

[packages/types/src/abis/traderJoe-factory-v2-2-0-0.types.ts:61](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-factory-v2-2-0-0.types.ts#L61)

***

### PendingOwnerSet()

> **PendingOwnerSet**(`pendingOwner`): [`EventFilter`](../../../type-aliases/EventFilter.md)

#### Parameters

• **pendingOwner**: `string`

#### Returns

[`EventFilter`](../../../type-aliases/EventFilter.md)

#### Defined in

[packages/types/src/abis/traderJoe-factory-v2-2-0-0.types.ts:62](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-factory-v2-2-0-0.types.ts#L62)

***

### PresetRemoved()

> **PresetRemoved**(`binStep`): [`EventFilter`](../../../type-aliases/EventFilter.md)

#### Parameters

• **binStep**: `BigNumberish`

#### Returns

[`EventFilter`](../../../type-aliases/EventFilter.md)

#### Defined in

[packages/types/src/abis/traderJoe-factory-v2-2-0-0.types.ts:63](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-factory-v2-2-0-0.types.ts#L63)

***

### PresetSet()

> **PresetSet**(`binStep`, `baseFactor`, `filterPeriod`, `decayPeriod`, `reductionFactor`, `variableFeeControl`, `protocolShare`, `maxVolatilityAccumulated`, `sampleLifetime`): [`EventFilter`](../../../type-aliases/EventFilter.md)

#### Parameters

• **binStep**: `BigNumberish`

• **baseFactor**: `BigNumberish`

• **filterPeriod**: `BigNumberish`

• **decayPeriod**: `BigNumberish`

• **reductionFactor**: `BigNumberish`

• **variableFeeControl**: `BigNumberish`

• **protocolShare**: `BigNumberish`

• **maxVolatilityAccumulated**: `BigNumberish`

• **sampleLifetime**: `BigNumberish`

#### Returns

[`EventFilter`](../../../type-aliases/EventFilter.md)

#### Defined in

[packages/types/src/abis/traderJoe-factory-v2-2-0-0.types.ts:64](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-factory-v2-2-0-0.types.ts#L64)

***

### QuoteAssetAdded()

> **QuoteAssetAdded**(`quoteAsset`): [`EventFilter`](../../../type-aliases/EventFilter.md)

#### Parameters

• **quoteAsset**: `string`

#### Returns

[`EventFilter`](../../../type-aliases/EventFilter.md)

#### Defined in

[packages/types/src/abis/traderJoe-factory-v2-2-0-0.types.ts:75](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-factory-v2-2-0-0.types.ts#L75)

***

### QuoteAssetRemoved()

> **QuoteAssetRemoved**(`quoteAsset`): [`EventFilter`](../../../type-aliases/EventFilter.md)

#### Parameters

• **quoteAsset**: `string`

#### Returns

[`EventFilter`](../../../type-aliases/EventFilter.md)

#### Defined in

[packages/types/src/abis/traderJoe-factory-v2-2-0-0.types.ts:76](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-factory-v2-2-0-0.types.ts#L76)
