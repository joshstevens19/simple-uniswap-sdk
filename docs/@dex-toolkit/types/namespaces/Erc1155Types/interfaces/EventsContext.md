[**@dex-toolkit/types v1.0.0**](../../../README.md) • **Docs**

***

[Documentation v1.0.0](../../../../../packages.md) / [@dex-toolkit/types](../../../README.md) / [Erc1155Types](../README.md) / EventsContext

# Interface: EventsContext

## Methods

### ApprovalForAll()

> **ApprovalForAll**(`account`, `operator`, `approved`): [`EventFilter`](../../../type-aliases/EventFilter.md)

#### Parameters

• **account**: `string`

• **operator**: `string`

• **approved**: `boolean`

#### Returns

[`EventFilter`](../../../type-aliases/EventFilter.md)

#### Defined in

packages/types/src/abis/erc1155.types.ts:27

***

### TransferBatch()

> **TransferBatch**(`operator`, `from`, `to`, `ids`, `values`): [`EventFilter`](../../../type-aliases/EventFilter.md)

#### Parameters

• **operator**: `string`

• **from**: `string`

• **to**: `string`

• **ids**: `BigNumberish`[]

• **values**: `BigNumberish`[]

#### Returns

[`EventFilter`](../../../type-aliases/EventFilter.md)

#### Defined in

packages/types/src/abis/erc1155.types.ts:32

***

### TransferSingle()

> **TransferSingle**(`operator`, `from`, `to`, `id`, `value`): [`EventFilter`](../../../type-aliases/EventFilter.md)

#### Parameters

• **operator**: `string`

• **from**: `string`

• **to**: `string`

• **id**: `BigNumberish`

• **value**: `BigNumberish`

#### Returns

[`EventFilter`](../../../type-aliases/EventFilter.md)

#### Defined in

packages/types/src/abis/erc1155.types.ts:39

***

### URI()

> **URI**(`value`, `id`): [`EventFilter`](../../../type-aliases/EventFilter.md)

#### Parameters

• **value**: `string`

• **id**: `BigNumberish`

#### Returns

[`EventFilter`](../../../type-aliases/EventFilter.md)

#### Defined in

packages/types/src/abis/erc1155.types.ts:46
