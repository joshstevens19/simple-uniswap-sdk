[**@dex-toolkit/utils v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/utils](../README.md) / calculateTokenPrice

# Function: calculateTokenPrice()

> **calculateTokenPrice**(`token`, `baseToken`, `poolReserves`): `DexNumber`

Calculates the price of a token in terms of another token based on pool reserves.

## Parameters

• **token**: `Token`

The token to price

• **baseToken**: `Token`

The token to price against (e.g., USDT)

• **poolReserves**: `PoolReserve`

The reserves of the pool

## Returns

`DexNumber`

The price of the token in terms of the base token

## Defined in

[packages/utils/src/utils/price.utils.ts:16](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/utils/src/utils/price.utils.ts#L16)
