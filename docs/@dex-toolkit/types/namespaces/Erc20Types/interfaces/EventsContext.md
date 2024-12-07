[**@dex-toolkit/types v1.0.0**](../../../README.md) • **Docs**

***

[Documentation v1.0.0](../../../../../packages.md) / [@dex-toolkit/types](../../../README.md) / [Erc20Types](../README.md) / EventsContext

# Interface: EventsContext

## Methods

### Approval()

> **Approval**(`owner`, `spender`, `value`): [`EventFilter`](../../../type-aliases/EventFilter.md)

#### Parameters

• **owner**: `string`

• **spender**: `string`

• **value**: `BigNumberish`

#### Returns

[`EventFilter`](../../../type-aliases/EventFilter.md)

#### Defined in

packages/types/src/abis/erc20.types.ts:18

***

### Transfer()

> **Transfer**(`from`, `to`, `value`): [`EventFilter`](../../../type-aliases/EventFilter.md)

#### Parameters

• **from**: `string`

• **to**: `string`

• **value**: `BigNumberish`

#### Returns

[`EventFilter`](../../../type-aliases/EventFilter.md)

#### Defined in

packages/types/src/abis/erc20.types.ts:19
