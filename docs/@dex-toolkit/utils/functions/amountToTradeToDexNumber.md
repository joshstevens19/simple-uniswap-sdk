[**@dex-toolkit/utils v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/utils](../README.md) / amountToTradeToDexNumber

# Function: amountToTradeToDexNumber()

> **amountToTradeToDexNumber**(`params`): `DexNumber`

Selects the amount to trade based on the trade direction.

## Parameters

• **params**

The parameters required to amount to trade.

• **params.amountToTrade**: `TradeParamsAmount`

The amount being traded as a string.

• **params.fromToken**: `Token`

The token being swapped from.

• **params.toToken**: `Token`

The token being swapped to.

• **params.tradeDirection**: `TradeDirection`

The direction of the trade (input or output).

## Returns

`DexNumber`

The trade amount as a `DexNumber` object.

## Throws

If the amount to trade or trade direction is not provided.

## Throws

If the trade path is unsupported.

## Defined in

[packages/utils/src/utils/trade.utils.ts:192](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/utils/src/utils/trade.utils.ts#L192)
