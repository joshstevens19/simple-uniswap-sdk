[**@dex-toolkit/types v1.0.0**](../../../README.md) • **Docs**

***

[Documentation v1.0.0](../../../../../packages.md) / [@dex-toolkit/types](../../../README.md) / [QuickswapFactoryV3Types](../README.md) / EventsContext

# Interface: EventsContext

## Methods

### FarmingAddress()

> **FarmingAddress**(`newFarmingAddress`): [`EventFilter`](../../../type-aliases/EventFilter.md)

#### Parameters

• **newFarmingAddress**: `string`

#### Returns

[`EventFilter`](../../../type-aliases/EventFilter.md)

#### Defined in

[packages/types/src/abis/quickswap-factory-v3.types.ts:23](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/quickswap-factory-v3.types.ts#L23)

***

### FeeConfiguration()

> **FeeConfiguration**(`alpha1`, `alpha2`, `beta1`, `beta2`, `gamma1`, `gamma2`, `volumeBeta`, `volumeGamma`, `baseFee`): [`EventFilter`](../../../type-aliases/EventFilter.md)

#### Parameters

• **alpha1**: `BigNumberish`

• **alpha2**: `BigNumberish`

• **beta1**: `BigNumberish`

• **beta2**: `BigNumberish`

• **gamma1**: `BigNumberish`

• **gamma2**: `BigNumberish`

• **volumeBeta**: `BigNumberish`

• **volumeGamma**: `BigNumberish`

• **baseFee**: `BigNumberish`

#### Returns

[`EventFilter`](../../../type-aliases/EventFilter.md)

#### Defined in

[packages/types/src/abis/quickswap-factory-v3.types.ts:24](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/quickswap-factory-v3.types.ts#L24)

***

### Owner()

> **Owner**(`newOwner`): [`EventFilter`](../../../type-aliases/EventFilter.md)

#### Parameters

• **newOwner**: `string`

#### Returns

[`EventFilter`](../../../type-aliases/EventFilter.md)

#### Defined in

[packages/types/src/abis/quickswap-factory-v3.types.ts:35](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/quickswap-factory-v3.types.ts#L35)

***

### Pool()

> **Pool**(`token0`, `token1`, `pool`): [`EventFilter`](../../../type-aliases/EventFilter.md)

#### Parameters

• **token0**: `string`

• **token1**: `string`

• **pool**: `string`

#### Returns

[`EventFilter`](../../../type-aliases/EventFilter.md)

#### Defined in

[packages/types/src/abis/quickswap-factory-v3.types.ts:36](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/quickswap-factory-v3.types.ts#L36)

***

### VaultAddress()

> **VaultAddress**(`newVaultAddress`): [`EventFilter`](../../../type-aliases/EventFilter.md)

#### Parameters

• **newVaultAddress**: `string`

#### Returns

[`EventFilter`](../../../type-aliases/EventFilter.md)

#### Defined in

[packages/types/src/abis/quickswap-factory-v3.types.ts:37](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/quickswap-factory-v3.types.ts#L37)
