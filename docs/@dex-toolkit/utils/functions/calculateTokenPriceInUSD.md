[**@dex-toolkit/utils v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/utils](../README.md) / calculateTokenPriceInUSD

# Function: calculateTokenPriceInUSD()

> **calculateTokenPriceInUSD**(`params`): `Promise`\<`string`\>

Calculates the price of a token in USD by routing through a stablecoin like USDT or USDC.

## Parameters

• **params**

The parameters required to calculate the price of a token in USD.

• **params.fromToken**: `Token`

The token whose price is being calculated.

• **params.reserves**: `PoolReserve`[]

An array of tuples containing the reserves of token0 and token1 for each pair in the route.

• **params.routePathTokens**: `Token`[]

The tokens involved in the route path.

• **params.toStablecoin**: `Token`

The stablecoin used as a reference (e.g., USDT, USDC).

## Returns

`Promise`\<`string`\>

A promise that resolves to a string representing the price of the fromToken in USD.

## Defined in

packages/utils/src/utils/pairs.utils.ts:237
