[**@dex-toolkit/utils v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/utils](../README.md) / calculateSlippageAmount

# Function: calculateSlippageAmount()

> **calculateSlippageAmount**(`params`): `DexNumber`

Calculates the minimum or maximum amount considering the slippage tolerance.

## Parameters

• **params**

The parameters required to calculate the slippage amount.

• **params.amount**: `DexNumber`

The original amount, either as a DexNumber.

• **params.isMaximum**: `boolean`

If true, calculates the maximum amount (for input amounts).
                   If false, calculates the minimum amount (for output amounts).

• **params.slippage**: `number`

The slippage tolerance as a decimal (e.g., 0.01 for 1%).

## Returns

`DexNumber`

The calculated amount after applying slippage.

## Throws

Error if slippage is negative or amount is zero/negative.

## Defined in

packages/utils/src/utils/liquidity.utils.ts:75
