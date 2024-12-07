[**@dex-toolkit/types v1.0.0**](../../../README.md) • **Docs**

***

[Documentation v1.0.0](../../../../../packages.md) / [@dex-toolkit/types](../../../README.md) / [UniswapFactoryV3Types](../README.md) / EventsContext

# Interface: EventsContext

## Methods

### FeeTierEnabled()

> **FeeTierEnabled**(`fee`, `tickSpacing`): [`EventFilter`](../../../type-aliases/EventFilter.md)

#### Parameters

• **fee**: `BigNumberish`

• **tickSpacing**: `BigNumberish`

#### Returns

[`EventFilter`](../../../type-aliases/EventFilter.md)

#### Defined in

packages/types/src/abis/uniswap-factory-v3.types.ts:18

***

### OwnerChanged()

> **OwnerChanged**(`oldOwner`, `newOwner`): [`EventFilter`](../../../type-aliases/EventFilter.md)

#### Parameters

• **oldOwner**: `string`

• **newOwner**: `string`

#### Returns

[`EventFilter`](../../../type-aliases/EventFilter.md)

#### Defined in

packages/types/src/abis/uniswap-factory-v3.types.ts:19

***

### PoolCreated()

> **PoolCreated**(`token0`, `token1`, `fee`, `tickSpacing`, `pool`): [`EventFilter`](../../../type-aliases/EventFilter.md)

#### Parameters

• **token0**: `string`

• **token1**: `string`

• **fee**: `BigNumberish`

• **tickSpacing**: `BigNumberish`

• **pool**: `string`

#### Returns

[`EventFilter`](../../../type-aliases/EventFilter.md)

#### Defined in

packages/types/src/abis/uniswap-factory-v3.types.ts:20
