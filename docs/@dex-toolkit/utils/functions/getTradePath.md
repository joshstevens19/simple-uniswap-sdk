[**@dex-toolkit/utils v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/utils](../README.md) / getTradePath

# Function: getTradePath()

> **getTradePath**(`params`): `TradePath`

Determines the trade path between two tokens, which is used to decide the method of conversion.

## Parameters

• **params**

The parameters required to get the trade path.

• **params.chainId**: `number`

The chain ID where the trade is taking place.

• **params.customNetworkNativeWrappedTokenInfo?**: `Token`

Optional custom network's native wrapped token information.

• **params.fromToken**: `Token`

The token being swapped from.

• **params.toToken**: `Token`

The token being swapped to.

## Returns

`TradePath`

The trade path as `TradePath` which can be one of `coinToToken`, `tokenToCoin`, `tokenToToken`,
`wrappedToCoin`, or `coinToWrapped`.

## Throws

If native wrapped token information cannot be found for the specified chain ID.

## Defined in

[packages/utils/src/utils/trade.utils.ts:126](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/utils/src/utils/trade.utils.ts#L126)
