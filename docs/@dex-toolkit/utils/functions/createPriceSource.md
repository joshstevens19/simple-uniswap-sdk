[**@dex-toolkit/utils v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/utils](../README.md) / createPriceSource

# Function: createPriceSource()

> **createPriceSource**(`priceCtx`): [`Price`](../classes/Price.md)

Creates an instance of a price source based on the given price context.

## Parameters

• **priceCtx**: `PriceContext`

The price context containing the source type and optional API key.

## Returns

[`Price`](../classes/Price.md)

A price source instance.

## Throws

Will throw an error if the source type is unknown.

## Defined in

[packages/utils/src/price-source/price-source.utils.ts:23](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/utils/src/price-source/price-source.utils.ts#L23)
