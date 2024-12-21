[**@dex-toolkit/utils v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/utils](../README.md) / formatTradeContext

# Function: formatTradeContext()

> **formatTradeContext**\<`TFormat`\>(`context`, `format`): `InternalTradeContext`\<`TFormat`\>

Formats a trade context by converting all DexNumber values to the specified format type.
This includes formatting token information, pool shares, prices, and other numeric values.

## Type Parameters

• **TFormat** *extends* `TradeFormat`

The target format type for the converted values

## Parameters

• **context**: `InternalTradeContext`\<`"dexnumber"`\>

The internal trade context containing DexNumber values

• **format**: `TradeFormatOptions`\<`TFormat`\>

The format specification to convert values to

## Returns

`InternalTradeContext`\<`TFormat`\>

A new context with all numeric values converted to the specified format

## Defined in

[packages/utils/src/utils/trade.utils.ts:449](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/utils/src/utils/trade.utils.ts#L449)
