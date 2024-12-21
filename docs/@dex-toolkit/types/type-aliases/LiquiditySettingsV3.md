[**@dex-toolkit/types v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/types](../README.md) / LiquiditySettingsV3

# Type Alias: LiquiditySettingsV3

> **LiquiditySettingsV3**: `object`

Trade settings for customizing the behavior of a trade for V3.
Extends the base [DexSettings](DexSettings.md) with additional trade-specific options.

## Type declaration

### enablePriceLimit?

> `optional` **enablePriceLimit**: `boolean`

When `true`, enables the use of a price limit during the trade.
A price limit helps protect against unfavorable price movements during trade execution.

#### Default

```ts
false
```

### feeTier?

> `optional` **feeTier**: [`FeeTier`](FeeTier.md)

The fee tier for the trade.

#### Default

```ts
undefined
```

### priceRange?

> `optional` **priceRange**: [`LiquidityPriceRange`](LiquidityPriceRange.md)

When `true`, enables the use of a price limit during the trade.
A price limit helps protect against unfavorable price movements during trade execution.

#### Default

```ts
undefined
```

## Defined in

[packages/types/src/liquidity.types.ts:135](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/liquidity.types.ts#L135)
