[**@dex-toolkit/utils v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/utils](../README.md) / isTradeSettings

# Function: isTradeSettings()

> **isTradeSettings**(`settings`): `settings is TradeSettings`

Type guard to check if the provided settings are of type `TradeSettings`.

`TradeSettings` includes additional properties like `disablePriceImpact`
and `hasFeeOnTransfer`, which differentiate it from `LiquiditySettings`.

## Parameters

• **settings**: `DexSettings`

The settings object to check.

## Returns

`settings is TradeSettings`

A boolean indicating whether the settings object is of type `TradeSettings`.

## Defined in

packages/utils/src/utils/trade.utils.ts:659
