[**@dex-toolkit/utils v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/utils](../README.md) / filterTradingTokens

# Function: filterTradingTokens()

> **filterTradingTokens**(`params`): `Token`[]

Filters out any tokens that are the same as the from or to token.

## Parameters

• **params**

The parameters required to filter trading tokens.

• **params.fromToken**: `Token`

The from token.

• **params.toToken**: `Token`

The to token.

• **params.tokens**: `Token`[]

An array of tokens to filter.

## Returns

`Token`[]

An array of tokens excluding the from and to tokens.

## Defined in

[packages/utils/src/utils/token.utils.ts:164](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/utils/src/utils/token.utils.ts#L164)
