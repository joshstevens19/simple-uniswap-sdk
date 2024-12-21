[**@dex-toolkit/types v1.0.0**](../../../README.md) • **Docs**

***

[Documentation v1.0.0](../../../../../packages.md) / [@dex-toolkit/types](../../../README.md) / [Erc777Types](../README.md) / EventsContext

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

[packages/types/src/abis/erc777.types.ts:27](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/erc777.types.ts#L27)

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

[packages/types/src/abis/erc777.types.ts:36](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/erc777.types.ts#L36)

***

### RevokedOperator()

> **RevokedOperator**(`operator`, `tokenHolder`): [`EventFilter`](../../../type-aliases/EventFilter.md)

#### Parameters

• **operator**: `string`

• **tokenHolder**: `string`

#### Returns

[`EventFilter`](../../../type-aliases/EventFilter.md)

#### Defined in

[packages/types/src/abis/erc777.types.ts:28](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/erc777.types.ts#L28)

***

### Sent()

> **Sent**(`from`, `to`, `value`, `data`, `operatorData`): [`EventFilter`](../../../type-aliases/EventFilter.md)

#### Parameters

• **from**: `string`

• **to**: `string`

• **value**: `BigNumberish`

• **data**: `BytesLike`

• **operatorData**: `BytesLike`

#### Returns

[`EventFilter`](../../../type-aliases/EventFilter.md)

#### Defined in

[packages/types/src/abis/erc777.types.ts:29](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/erc777.types.ts#L29)
