[**@dex-toolkit/utils v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/utils](../README.md) / fetchAndCalculateFiatPrices

# Function: fetchAndCalculateFiatPrices()

> **fetchAndCalculateFiatPrices**(`params`): `Promise`\<`Record`\<`string`, `number`\>\>

Fetches and calculates fiat prices from multiple price contexts.

## Parameters

• **params**

The parameters required to fetch and calculate fiat prices.

• **params.chainId**: `number`

The chain ID.

• **params.contractAddresses**: `string`[]

An array of contract addresses to fetch prices for.

• **params.multiPriceContext**: `MultiPriceContext`

The multi price context containing multiple price contexts and a calculation method.

## Returns

`Promise`\<`Record`\<`string`, `number`\>\>

A promise that resolves to an object with contract addresses as keys and their calculated prices as values.

## Defined in

[packages/utils/src/price-source/price-source.utils.ts:88](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/utils/src/price-source/price-source.utils.ts#L88)
