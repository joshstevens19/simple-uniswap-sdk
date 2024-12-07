[**@dex-toolkit/utils v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/utils](../README.md) / formatTokenInfo

# Function: formatTokenInfo()

> **formatTokenInfo**\<`TFormat`\>(`info`, `format`): `LiquidityTokenInfo`\<`TFormat`\>

Formats token information by converting DexNumber values to the specified format type.
This includes amount, balance, and allowance values while preserving other token properties.

## Type Parameters

• **TFormat** *extends* `TradeFormat`

The target format type for the converted values

## Parameters

• **info**: `LiquidityTokenInfo`\<`"dexnumber"`\>

The token information containing DexNumber values

• **format**: `TradeFormatOptions`\<`TFormat`\>

The format specification to convert values to

## Returns

`LiquidityTokenInfo`\<`TFormat`\>

New token information with numeric values converted to the specified format

## Defined in

packages/utils/src/utils/liquidity.utils.ts:1202
