[**@dex-toolkit/types v1.0.0**](../../../README.md) • **Docs**

***

[Documentation v1.0.0](../../../../../packages.md) / [@dex-toolkit/types](../../../README.md) / [UniswapPairV2Types](../README.md) / EventsContext

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

packages/types/src/abis/uniswap-pair-v2.types.ts:23

***

### Burn()

> **Burn**(`sender`, `amount0`, `amount1`, `to`): [`EventFilter`](../../../type-aliases/EventFilter.md)

#### Parameters

• **sender**: `string`

• **amount0**: `BigNumberish`

• **amount1**: `BigNumberish`

• **to**: `string`

#### Returns

[`EventFilter`](../../../type-aliases/EventFilter.md)

#### Defined in

packages/types/src/abis/uniswap-pair-v2.types.ts:24

***

### Mint()

> **Mint**(`sender`, `amount0`, `amount1`): [`EventFilter`](../../../type-aliases/EventFilter.md)

#### Parameters

• **sender**: `string`

• **amount0**: `BigNumberish`

• **amount1**: `BigNumberish`

#### Returns

[`EventFilter`](../../../type-aliases/EventFilter.md)

#### Defined in

packages/types/src/abis/uniswap-pair-v2.types.ts:30

***

### Swap()

> **Swap**(`sender`, `amount0In`, `amount1In`, `amount0Out`, `amount1Out`, `to`): [`EventFilter`](../../../type-aliases/EventFilter.md)

#### Parameters

• **sender**: `string`

• **amount0In**: `BigNumberish`

• **amount1In**: `BigNumberish`

• **amount0Out**: `BigNumberish`

• **amount1Out**: `BigNumberish`

• **to**: `string`

#### Returns

[`EventFilter`](../../../type-aliases/EventFilter.md)

#### Defined in

packages/types/src/abis/uniswap-pair-v2.types.ts:35

***

### Sync()

> **Sync**(`reserve0`, `reserve1`): [`EventFilter`](../../../type-aliases/EventFilter.md)

#### Parameters

• **reserve0**: `BigNumberish`

• **reserve1**: `BigNumberish`

#### Returns

[`EventFilter`](../../../type-aliases/EventFilter.md)

#### Defined in

packages/types/src/abis/uniswap-pair-v2.types.ts:43

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

packages/types/src/abis/uniswap-pair-v2.types.ts:44
