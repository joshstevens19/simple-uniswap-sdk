[**@dex-toolkit/utils v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/utils](../README.md) / calculatePrices

# Function: calculatePrices()

> **calculatePrices**(`params`): `LiquidityPrices`\<`"dexnumber"`\>

Calculate prices between token A and token B based on the pool reserves.

## Parameters

• **params**

The parameters required to calculate prices.

• **params.reserveA**: `DexNumber`

The reserve amount of token A.

• **params.reserveB**: `DexNumber`

The reserve amount of token B.

• **params.tokenA**: `Token`

The token A.

• **params.tokenB**: `Token`

The token B.

## Returns

`LiquidityPrices`\<`"dexnumber"`\>

An object with prices: aTokenPerBToken and bTokenPerAToken.

## Defined in

packages/utils/src/utils/liquidity.utils.ts:710
