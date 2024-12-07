[**@dex-toolkit/types v1.0.0**](../../../README.md) • **Docs**

***

[Documentation v1.0.0](../../../../../packages.md) / [@dex-toolkit/types](../../../README.md) / [Bep777Types](../README.md) / EventsContext

# Interface: EventsContext

## Methods

### AuthorizedOperator()

> **AuthorizedOperator**(`operator`, `tokenHolder`): [`EventFilter`](../../../type-aliases/EventFilter.md)

#### Parameters

• **operator**: `string`

• **tokenHolder**: `string`

#### Returns

[`EventFilter`](../../../type-aliases/EventFilter.md)

#### Defined in

packages/types/src/abis/bep777.types.ts:27

***

### DefaultOperatorsSet()

> **DefaultOperatorsSet**(`operator`, `tokenHolder`, `newDefaultOperators`): [`EventFilter`](../../../type-aliases/EventFilter.md)

#### Parameters

• **operator**: `string`

• **tokenHolder**: `string`

• **newDefaultOperators**: `string`[]

#### Returns

[`EventFilter`](../../../type-aliases/EventFilter.md)

#### Defined in

packages/types/src/abis/bep777.types.ts:35

***

### RevokedOperator()

> **RevokedOperator**(`operator`, `tokenHolder`): [`EventFilter`](../../../type-aliases/EventFilter.md)

#### Parameters

• **operator**: `string`

• **tokenHolder**: `string`

#### Returns

[`EventFilter`](../../../type-aliases/EventFilter.md)

#### Defined in

packages/types/src/abis/bep777.types.ts:28

***

### Sent()

> **Sent**(`from`, `to`, `value`, `userData`): [`EventFilter`](../../../type-aliases/EventFilter.md)

#### Parameters

• **from**: `string`

• **to**: `string`

• **value**: `BigNumberish`

• **userData**: `BytesLike`

#### Returns

[`EventFilter`](../../../type-aliases/EventFilter.md)

#### Defined in

packages/types/src/abis/bep777.types.ts:29
