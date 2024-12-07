[**@dex-toolkit/types v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/types](../README.md) / PriceImpactInfo

# Type Alias: PriceImpactInfo

> **PriceImpactInfo**: `object`

The impact of the trade on the price of the assets being traded.

## Type declaration

### isMinimal

> **isMinimal**: `boolean`

Whether the price impact is considered minimal, less than "0.01%".

### percentage

> **percentage**: `string`

The 100-based percentage representing the price impact of the trade.
Undefined when price impact is disabled in the trade settings.

## Defined in

packages/types/src/trade.types.ts:314
