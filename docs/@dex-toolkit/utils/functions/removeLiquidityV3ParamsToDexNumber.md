[**@dex-toolkit/utils v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/utils](../README.md) / removeLiquidityV3ParamsToDexNumber

# Function: removeLiquidityV3ParamsToDexNumber()

> **removeLiquidityV3ParamsToDexNumber**(`params`): `RemoveLiquidityParamsV3`\<`"dexnumber"`\>

Converts remove liquidity parameters from decimal string format to DexNumber format for V3 DEX pools.
This includes validating amounts are positive and converting values to appropriate decimal precision.
For V3 pools, this handles NFT position token IDs and maintains fee tier information.

## Parameters

• **params**

Parameters for the conversion

• **params.lpTokenDecimals**: `number`

Number of decimal places for the liquidity position

• **params.params**: `RemoveLiquidityParamsV3`\<`"decimal"`\>

The original parameters in decimal string format to be converted

• **params.tokenA**: `Token`

Token A information including contract address and decimals

• **params.tokenB**: `Token`

Token B information including contract address and decimals

## Returns

`RemoveLiquidityParamsV3`\<`"dexnumber"`\>

The parameters converted to DexNumber format while preserving all other properties

## Throws

If any amounts are not positive numbers

## Defined in

packages/utils/src/utils/liquidity.utils.ts:966
