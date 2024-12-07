[**@dex-toolkit/utils v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/utils](../README.md) / calculateSqrtPriceLimit

# Function: calculateSqrtPriceLimit()

> **calculateSqrtPriceLimit**(`params`): `DexNumber`

Calculates the sqrt price limit in Q64.96 format from the given price range.

## Parameters

• **params**

The parameters required to calculate the sqrt price limit.

• **params.currentTick**: `number`

The current tick of the pool.

• **params.tickLower**: `number`

The lower tick of the position's price range.

• **params.tickUpper**: `number`

The upper tick of the position's price range.

• **params.tradeDirection**: `"input"` \| `"output"`

The trade direction (input or output).

## Returns

`DexNumber`

The sqrt price limit as a DexNumber in Q64.96 format.

## Defined in

packages/utils/src/utils/liquidity.utils.ts:745
