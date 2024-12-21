[**@dex-toolkit/utils v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/utils](../README.md) / calculateLiquidityProviderFee

# Function: calculateLiquidityProviderFee()

> **calculateLiquidityProviderFee**(`params`): `string` \| `string`[]

Calculates the liquidity provider fee based on the trade direction and version of the DEX.

## Parameters

• **params**

The parameters required to calculate the liquidity provider fee.

• **params.baseConvertRequest**: `DexNumber`

The base amount to be converted.

• **params.expectedConvertQuote**: `DexNumber`

The expected amount after conversion.

• **params.fromTokenDecimals**: `number`

The number of decimals of the "from" token.

• **params.liquidityProviderFeePercent**: `number` \| `number`[]

The liquidity provider fee, which can be a number (v2) or an array of numbers (v3).

• **params.tradeDirection**: `TradeDirection`

The direction of the trade (input or output).

## Returns

`string` \| `string`[]

The calculated liquidity provider fee as a string or an array of strings.

## Throws

DexError if the trade direction is invalid or the liquidity provider fee type is invalid.

## Defined in

[packages/utils/src/utils/pairs.utils.ts:31](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/utils/src/utils/pairs.utils.ts#L31)
