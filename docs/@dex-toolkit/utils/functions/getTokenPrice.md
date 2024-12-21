[**@dex-toolkit/utils v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/utils](../README.md) / getTokenPrice

# Function: getTokenPrice()

> **getTokenPrice**(`token`, `baseToken`, `allPoolReserves`, `maxHops`): `DexNumber`

Fetches the price of a token using a route through multiple pools if necessary.

## Parameters

• **token**: `Token`

The token to price

• **baseToken**: `Token`

The token to price against (e.g., USDT)

• **allPoolReserves**: `PoolReserve`[]

All available pool reserves

• **maxHops**: `number` = `3`

Maximum number of hops to consider (default: 3)

## Returns

`DexNumber`

The price of the token in terms of the base token

## Defined in

[packages/utils/src/utils/price.utils.ts:65](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/utils/src/utils/price.utils.ts#L65)
