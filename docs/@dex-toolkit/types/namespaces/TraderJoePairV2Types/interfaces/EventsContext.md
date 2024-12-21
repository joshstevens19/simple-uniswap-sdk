[**@dex-toolkit/types v1.0.0**](../../../README.md) • **Docs**

***

[Documentation v1.0.0](../../../../../packages.md) / [@dex-toolkit/types](../../../README.md) / [TraderJoePairV2Types](../README.md) / EventsContext

# Interface: EventsContext

## Methods

### ApprovalForAll()

> **ApprovalForAll**(`account`, `sender`, `approved`): [`EventFilter`](../../../type-aliases/EventFilter.md)

#### Parameters

• **account**: `string`

• **sender**: `string`

• **approved**: `boolean`

#### Returns

[`EventFilter`](../../../type-aliases/EventFilter.md)

#### Defined in

[packages/types/src/abis/traderJoe-pair-v2.types.ts:36](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-pair-v2.types.ts#L36)

***

### CollectedProtocolFees()

> **CollectedProtocolFees**(`feeRecipient`, `protocolFees`): [`EventFilter`](../../../type-aliases/EventFilter.md)

#### Parameters

• **feeRecipient**: `string`

• **protocolFees**: `BytesLike`

#### Returns

[`EventFilter`](../../../type-aliases/EventFilter.md)

#### Defined in

[packages/types/src/abis/traderJoe-pair-v2.types.ts:41](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-pair-v2.types.ts#L41)

***

### CompositionFees()

> **CompositionFees**(`sender`, `id`, `totalFees`, `protocolFees`): [`EventFilter`](../../../type-aliases/EventFilter.md)

#### Parameters

• **sender**: `string`

• **id**: `BigNumberish`

• **totalFees**: `BytesLike`

• **protocolFees**: `BytesLike`

#### Returns

[`EventFilter`](../../../type-aliases/EventFilter.md)

#### Defined in

[packages/types/src/abis/traderJoe-pair-v2.types.ts:45](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-pair-v2.types.ts#L45)

***

### DepositedToBins()

> **DepositedToBins**(`sender`, `to`, `ids`, `amounts`): [`EventFilter`](../../../type-aliases/EventFilter.md)

#### Parameters

• **sender**: `string`

• **to**: `string`

• **ids**: `BigNumberish`[]

• **amounts**: `BytesLike`[]

#### Returns

[`EventFilter`](../../../type-aliases/EventFilter.md)

#### Defined in

[packages/types/src/abis/traderJoe-pair-v2.types.ts:51](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-pair-v2.types.ts#L51)

***

### FlashLoan()

> **FlashLoan**(`sender`, `receiver`, `activeId`, `amounts`, `totalFees`, `protocolFees`): [`EventFilter`](../../../type-aliases/EventFilter.md)

#### Parameters

• **sender**: `string`

• **receiver**: `string`

• **activeId**: `BigNumberish`

• **amounts**: `BytesLike`

• **totalFees**: `BytesLike`

• **protocolFees**: `BytesLike`

#### Returns

[`EventFilter`](../../../type-aliases/EventFilter.md)

#### Defined in

[packages/types/src/abis/traderJoe-pair-v2.types.ts:57](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-pair-v2.types.ts#L57)

***

### ForcedDecay()

> **ForcedDecay**(`sender`, `idReference`, `volatilityReference`): [`EventFilter`](../../../type-aliases/EventFilter.md)

#### Parameters

• **sender**: `string`

• **idReference**: `BigNumberish`

• **volatilityReference**: `BigNumberish`

#### Returns

[`EventFilter`](../../../type-aliases/EventFilter.md)

#### Defined in

[packages/types/src/abis/traderJoe-pair-v2.types.ts:65](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-pair-v2.types.ts#L65)

***

### HooksParametersSet()

> **HooksParametersSet**(`sender`, `hooksParameters`): [`EventFilter`](../../../type-aliases/EventFilter.md)

#### Parameters

• **sender**: `string`

• **hooksParameters**: `BytesLike`

#### Returns

[`EventFilter`](../../../type-aliases/EventFilter.md)

#### Defined in

[packages/types/src/abis/traderJoe-pair-v2.types.ts:70](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-pair-v2.types.ts#L70)

***

### Initialized()

> **Initialized**(`version`): [`EventFilter`](../../../type-aliases/EventFilter.md)

#### Parameters

• **version**: `BigNumberish`

#### Returns

[`EventFilter`](../../../type-aliases/EventFilter.md)

#### Defined in

[packages/types/src/abis/traderJoe-pair-v2.types.ts:71](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-pair-v2.types.ts#L71)

***

### OracleLengthIncreased()

> **OracleLengthIncreased**(`sender`, `oracleLength`): [`EventFilter`](../../../type-aliases/EventFilter.md)

#### Parameters

• **sender**: `string`

• **oracleLength**: `BigNumberish`

#### Returns

[`EventFilter`](../../../type-aliases/EventFilter.md)

#### Defined in

[packages/types/src/abis/traderJoe-pair-v2.types.ts:72](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-pair-v2.types.ts#L72)

***

### StaticFeeParametersSet()

> **StaticFeeParametersSet**(`sender`, `baseFactor`, `filterPeriod`, `decayPeriod`, `reductionFactor`, `variableFeeControl`, `protocolShare`, `maxVolatilityAccumulator`): [`EventFilter`](../../../type-aliases/EventFilter.md)

#### Parameters

• **sender**: `string`

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

[packages/types/src/abis/traderJoe-pair-v2.types.ts:73](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-pair-v2.types.ts#L73)

***

### Swap()

> **Swap**(`sender`, `to`, `id`, `amountsIn`, `amountsOut`, `volatilityAccumulator`, `totalFees`, `protocolFees`): [`EventFilter`](../../../type-aliases/EventFilter.md)

#### Parameters

• **sender**: `string`

• **to**: `string`

• **id**: `BigNumberish`

• **amountsIn**: `BytesLike`

• **amountsOut**: `BytesLike`

• **volatilityAccumulator**: `BigNumberish`

• **totalFees**: `BytesLike`

• **protocolFees**: `BytesLike`

#### Returns

[`EventFilter`](../../../type-aliases/EventFilter.md)

#### Defined in

[packages/types/src/abis/traderJoe-pair-v2.types.ts:83](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-pair-v2.types.ts#L83)

***

### TransferBatch()

> **TransferBatch**(`sender`, `from`, `to`, `ids`, `amounts`): [`EventFilter`](../../../type-aliases/EventFilter.md)

#### Parameters

• **sender**: `string`

• **from**: `string`

• **to**: `string`

• **ids**: `BigNumberish`[]

• **amounts**: `BigNumberish`[]

#### Returns

[`EventFilter`](../../../type-aliases/EventFilter.md)

#### Defined in

[packages/types/src/abis/traderJoe-pair-v2.types.ts:93](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-pair-v2.types.ts#L93)

***

### WithdrawnFromBins()

> **WithdrawnFromBins**(`sender`, `to`, `ids`, `amounts`): [`EventFilter`](../../../type-aliases/EventFilter.md)

#### Parameters

• **sender**: `string`

• **to**: `string`

• **ids**: `BigNumberish`[]

• **amounts**: `BytesLike`[]

#### Returns

[`EventFilter`](../../../type-aliases/EventFilter.md)

#### Defined in

[packages/types/src/abis/traderJoe-pair-v2.types.ts:100](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-pair-v2.types.ts#L100)
