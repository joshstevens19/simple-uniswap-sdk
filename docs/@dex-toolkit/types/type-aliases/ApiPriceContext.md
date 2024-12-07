[**@dex-toolkit/types v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/types](../README.md) / ApiPriceContext

# Type Alias: ApiPriceContext

> **ApiPriceContext**: `object`

Defines the context for API-based price data.

## Type declaration

### apiKey?

> `optional` **apiKey**: `string`

Optional API key for accessing the data source.

### sourceType

> **sourceType**: `Exclude`\<[`PriceType`](PriceType.md), `"stablecoin"`\>

The source type (excluding 'stablecoin').

## Defined in

packages/types/src/price-source.types.ts:21
