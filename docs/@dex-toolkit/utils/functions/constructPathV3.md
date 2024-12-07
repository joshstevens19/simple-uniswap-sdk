[**@dex-toolkit/utils v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/utils](../README.md) / constructPathV3

# Function: constructPathV3()

> **constructPathV3**(`params`): `string`

Constructs the swap path for V3, taking into account WETH9 for intermediate swaps.

## Parameters

• **params**

The parameters required to construct the swap path.

• **params.WETH9**: `string`

The WETH9 token address for the chain.

• **params.token0**: `string`

The first token address.

• **params.token1**: `string`

The second token address.

## Returns

`string`

The path array for the swap.

## Defined in

packages/utils/src/utils/trade.utils.ts:399
