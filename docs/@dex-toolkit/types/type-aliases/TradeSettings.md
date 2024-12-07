[**@dex-toolkit/types v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/types](../README.md) / TradeSettings

# Type Alias: TradeSettings

> **TradeSettings**: [`DexSettings`](DexSettings.md) & `object`

Trade settings for customizing the behavior of a trade.
Extends the base [DexSettings](DexSettings.md) with additional trade-specific options.

## Type declaration

### disablePriceImpact

> **disablePriceImpact**: `boolean`

When `true`, disables the price impact calculation for the trade.
Price impact refers to the effect of the trade on the overall price of the asset in the pool.

#### Default

```ts
false
```

### hasFeeOnTransfer?

> `optional` **hasFeeOnTransfer**: `boolean`

When `true`, enables support for fee-on-transfer tokens (commonly used by deflationary tokens).
Fee-on-transfer tokens automatically deduct a percentage as a fee upon each transfer.

#### Default

```ts
false
```

## Defined in

packages/types/src/trade.types.ts:108
