[**@dex-toolkit/types v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/types](../README.md) / MultiPriceContext

# Type Alias: MultiPriceContext

> **MultiPriceContext**: `object`

Defines the context for obtaining prices from multiple sources.

## Type declaration

### calculationMethod

> **calculationMethod**: [`PriceCalculationMethod`](PriceCalculationMethod.md)

The method for calculating the price (min, max, or median).

### currency?

> `optional` **currency**: [`PriceCurrencies`](PriceCurrencies.md)

Optional currency when including an ApiPriceContext, in which the price is quoted (USD or EUR).

### priceCtxs

> **priceCtxs**: [`PriceContext`](PriceContext.md)[]

An array of price contexts to use for the calculation.

## Defined in

[packages/types/src/price-source.types.ts:61](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/price-source.types.ts#L61)
