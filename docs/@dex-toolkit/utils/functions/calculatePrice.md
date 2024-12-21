[**@dex-toolkit/utils v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/utils](../README.md) / calculatePrice

# Function: calculatePrice()

> **calculatePrice**(`prices`, `method`): `number`

Calculates the price based on the given method.

## Parameters

• **prices**: `number`[]

An array of prices to calculate from.

• **method**: `PriceCalculationMethod`

The calculation method ('min', 'max', 'median').

## Returns

`number`

The calculated price.

## Throws

Will throw an error if the calculation method is unknown.

## Defined in

[packages/utils/src/price-source/price-source.utils.ts:50](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/utils/src/price-source/price-source.utils.ts#L50)
