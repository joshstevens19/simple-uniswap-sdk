[**@dex-toolkit/utils v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/utils](../README.md) / calculatePriceImpact

# Function: calculatePriceImpact()

> **calculatePriceImpact**(`params`): `Promise`\<`PriceImpactInfo`\>

Calculates the price impact of a trade based on the input/output amounts and reserves.

## Parameters

• **params**

The parameters required to calculate the price impact.

• **params.expectedOutputAmount**: `DexNumber`

The total expected output amount from the trade.

• **params.liquidityProviderFeePercent**: `number` \| `number`[]

The liquidity provider fee as a percentage.

• **params.reserves**: `PoolReserve`[]

An array of tuples containing the reserves of token0 and token1 for each pair in the route.

• **params.routePathTokens**: `Token`[]

The tokens involved in the route path.

• **params.tokenAmount**: `DexNumber`

The initial amount of the input token being traded.

## Returns

`Promise`\<`PriceImpactInfo`\>

A promise that resolves to a string representing the overall price impact percentage.

## Defined in

packages/utils/src/utils/pairs.utils.ts:110
