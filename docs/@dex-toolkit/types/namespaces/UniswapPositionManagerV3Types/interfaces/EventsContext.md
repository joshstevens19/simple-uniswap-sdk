[**@dex-toolkit/types v1.0.0**](../../../README.md) • **Docs**

***

[Documentation v1.0.0](../../../../../packages.md) / [@dex-toolkit/types](../../../README.md) / [UniswapPositionManagerV3Types](../README.md) / EventsContext

# Interface: EventsContext

## Methods

### Approval()

> **Approval**(`owner`, `approved`, `tokenId`): [`EventFilter`](../../../type-aliases/EventFilter.md)

#### Parameters

• **owner**: `string`

• **approved**: `string`

• **tokenId**: `BigNumberish`

#### Returns

[`EventFilter`](../../../type-aliases/EventFilter.md)

#### Defined in

[packages/types/src/abis/uniswap-position-manager-v3.types.ts:29](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/uniswap-position-manager-v3.types.ts#L29)

***

### ApprovalForAll()

> **ApprovalForAll**(`owner`, `operator`, `approved`): [`EventFilter`](../../../type-aliases/EventFilter.md)

#### Parameters

• **owner**: `string`

• **operator**: `string`

• **approved**: `boolean`

#### Returns

[`EventFilter`](../../../type-aliases/EventFilter.md)

#### Defined in

[packages/types/src/abis/uniswap-position-manager-v3.types.ts:30](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/uniswap-position-manager-v3.types.ts#L30)

***

### Collect()

> **Collect**(`tokenId`, `recipient`, `amount0`, `amount1`): [`EventFilter`](../../../type-aliases/EventFilter.md)

#### Parameters

• **tokenId**: `BigNumberish`

• **recipient**: `string`

• **amount0**: `BigNumberish`

• **amount1**: `BigNumberish`

#### Returns

[`EventFilter`](../../../type-aliases/EventFilter.md)

#### Defined in

[packages/types/src/abis/uniswap-position-manager-v3.types.ts:35](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/uniswap-position-manager-v3.types.ts#L35)

***

### DecreaseLiquidity()

> **DecreaseLiquidity**(`tokenId`, `liquidity`, `amount0`, `amount1`): [`EventFilter`](../../../type-aliases/EventFilter.md)

#### Parameters

• **tokenId**: `BigNumberish`

• **liquidity**: `BigNumberish`

• **amount0**: `BigNumberish`

• **amount1**: `BigNumberish`

#### Returns

[`EventFilter`](../../../type-aliases/EventFilter.md)

#### Defined in

[packages/types/src/abis/uniswap-position-manager-v3.types.ts:41](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/uniswap-position-manager-v3.types.ts#L41)

***

### IncreaseLiquidity()

> **IncreaseLiquidity**(`tokenId`, `liquidity`, `amount0`, `amount1`): [`EventFilter`](../../../type-aliases/EventFilter.md)

#### Parameters

• **tokenId**: `BigNumberish`

• **liquidity**: `BigNumberish`

• **amount0**: `BigNumberish`

• **amount1**: `BigNumberish`

#### Returns

[`EventFilter`](../../../type-aliases/EventFilter.md)

#### Defined in

[packages/types/src/abis/uniswap-position-manager-v3.types.ts:47](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/uniswap-position-manager-v3.types.ts#L47)

***

### Transfer()

> **Transfer**(`from`, `to`, `tokenId`): [`EventFilter`](../../../type-aliases/EventFilter.md)

#### Parameters

• **from**: `string`

• **to**: `string`

• **tokenId**: `BigNumberish`

#### Returns

[`EventFilter`](../../../type-aliases/EventFilter.md)

#### Defined in

[packages/types/src/abis/uniswap-position-manager-v3.types.ts:53](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/uniswap-position-manager-v3.types.ts#L53)
