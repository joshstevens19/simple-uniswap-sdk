[**@dex-toolkit/utils v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/utils](../README.md) / calculateLiquidityAmount

# Function: calculateLiquidityAmount()

> **calculateLiquidityAmount**(`params`): `DexNumber`

Calculates the liquidity amount for a Uniswap V3 position.

## Parameters

• **params**

The parameters for the calculation.

• **params.sqrtPriceX96**: `DexNumber`

The current sqrt price of the pool.

• **params.tickLower**: `number`

The lower tick of the position.

• **params.tickUpper**: `number`

The upper tick of the position.

• **params.tokenA**: `Token`

The first token in the pair.

• **params.tokenAAmount**: `DexNumber`

The amount of token A to add to the position.

• **params.tokenB**: `Token`

The second token in the pair.

• **params.tokenBAmount**: `DexNumber`

The amount of token B to add to the position.

## Returns

`DexNumber`

The liquidity amount as a DexNumber.

## Defined in

packages/utils/src/utils/liquidity.utils.ts:487
