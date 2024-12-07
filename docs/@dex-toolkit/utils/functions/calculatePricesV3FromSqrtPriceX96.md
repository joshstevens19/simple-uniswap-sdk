[**@dex-toolkit/utils v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/utils](../README.md) / calculatePricesV3FromSqrtPriceX96

# Function: calculatePricesV3FromSqrtPriceX96()

> **calculatePricesV3FromSqrtPriceX96**(`sqrtPriceX96`, `tokenA`, `tokenB`): `LiquidityPrices`\<`"dexnumber"`\>

Calculates the prices of Token A in terms of Token B and vice versa directly from the reserves.

## Parameters

• **sqrtPriceX96**: `DexNumber`

The sqrt price of the pool.

• **tokenA**: `Token`

Token A.

• **tokenB**: `Token`

Token B.

## Returns

`LiquidityPrices`\<`"dexnumber"`\>

An object containing the prices of token A in terms of token B and vice versa.

## Defined in

packages/utils/src/utils/liquidity.utils.ts:407
