[**@dex-toolkit/utils v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/utils](../README.md) / calculatePricesV3

# Function: calculatePricesV3()

> **calculatePricesV3**(`reserveA`, `reserveB`): `LiquidityPrices`\<`"dexnumber"`\>

Calculates the prices of Token A in terms of Token B and vice versa directly from the reserves.

## Parameters

• **reserveA**: `DexNumber`

Reserve of Token A (token0 in the pool).

• **reserveB**: `DexNumber`

Reserve of Token B (token1 in the pool).

## Returns

`LiquidityPrices`\<`"dexnumber"`\>

An object containing the prices of token A in terms of token B and vice versa.

## Defined in

[packages/utils/src/utils/liquidity.utils.ts:440](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/utils/src/utils/liquidity.utils.ts#L440)
