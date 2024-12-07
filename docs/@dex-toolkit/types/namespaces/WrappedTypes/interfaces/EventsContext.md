[**@dex-toolkit/types v1.0.0**](../../../README.md) • **Docs**

***

[Documentation v1.0.0](../../../../../packages.md) / [@dex-toolkit/types](../../../README.md) / [WrappedTypes](../README.md) / EventsContext

# Interface: EventsContext

## Methods

### Approval()

> **Approval**(`src`, `guy`, `wad`): [`EventFilter`](../../../type-aliases/EventFilter.md)

#### Parameters

• **src**: `string`

• **guy**: `string`

• **wad**: `BigNumberish`

#### Returns

[`EventFilter`](../../../type-aliases/EventFilter.md)

#### Defined in

packages/types/src/abis/wrapped.types.ts:18

***

### Deposit()

> **Deposit**(`dst`, `wad`): [`EventFilter`](../../../type-aliases/EventFilter.md)

#### Parameters

• **dst**: `string`

• **wad**: `BigNumberish`

#### Returns

[`EventFilter`](../../../type-aliases/EventFilter.md)

#### Defined in

packages/types/src/abis/wrapped.types.ts:20

***

### Transfer()

> **Transfer**(`src`, `dst`, `wad`): [`EventFilter`](../../../type-aliases/EventFilter.md)

#### Parameters

• **src**: `string`

• **dst**: `string`

• **wad**: `BigNumberish`

#### Returns

[`EventFilter`](../../../type-aliases/EventFilter.md)

#### Defined in

packages/types/src/abis/wrapped.types.ts:19

***

### Withdrawal()

> **Withdrawal**(`src`, `wad`): [`EventFilter`](../../../type-aliases/EventFilter.md)

#### Parameters

• **src**: `string`

• **wad**: `BigNumberish`

#### Returns

[`EventFilter`](../../../type-aliases/EventFilter.md)

#### Defined in

packages/types/src/abis/wrapped.types.ts:21
