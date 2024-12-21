[**@dex-toolkit/types v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/types](../README.md) / CoinMarketCapResponse

# Type Alias: CoinMarketCapResponse

> **CoinMarketCapResponse**: `object`

Represents the response from the CoinMarketCap API.

## Type declaration

### data

> **data**: `object`

Contains the price and market data for each token.

#### Index Signature

 \[`key`: `Address`\]: `object`

### status

> **status**: `object`

Contains metadata about the API request.

### status.credit\_count

> **status.credit\_count**: `number`

### status.elapsed

> **status.elapsed**: `number`

### status.error\_code

> **status.error\_code**: `number`

### status.error\_message?

> `optional` **status.error\_message**: `string`

### status.timestamp

> **status.timestamp**: `string`

## Defined in

[packages/types/src/price-source.types.ts:81](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/price-source.types.ts#L81)
