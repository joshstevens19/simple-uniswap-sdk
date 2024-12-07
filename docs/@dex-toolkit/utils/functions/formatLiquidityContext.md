[**@dex-toolkit/utils v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/utils](../README.md) / formatLiquidityContext

# Function: formatLiquidityContext()

> **formatLiquidityContext**\<`TFormat`\>(`context`, `format`): `InternalLiquidityContext`\<`TFormat`\>

Formats a liquidity context by converting all DexNumber values to the specified format type.
This includes formatting token information, pool shares, prices, and other numeric values.

## Type Parameters

• **TFormat** *extends* `TradeFormat`

The target format type for the converted values

## Parameters

• **context**: `InternalLiquidityContext`\<`"dexnumber"`\>

The internal liquidity context containing DexNumber values

• **format**: `TradeFormatOptions`\<`TFormat`\>

The format specification to convert values to

## Returns

`InternalLiquidityContext`\<`TFormat`\>

A new context with all numeric values converted to the specified format

## Defined in

packages/utils/src/utils/liquidity.utils.ts:1158
