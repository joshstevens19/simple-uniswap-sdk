[**@dex-toolkit/utils v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/utils](../README.md) / removeLiquidityV2ParamsToDexNumber

# Function: removeLiquidityV2ParamsToDexNumber()

> **removeLiquidityV2ParamsToDexNumber**(`params`): `RemoveLiquidityParamsV2`\<`"dexnumber"`\>

Converts remove liquidity parameters from decimal string format to DexNumber format for V2 DEX pools.
This includes validating amounts are positive and converting values to appropriate decimal precision.

## Parameters

• **params**

Parameters for the conversion

• **params.lpTokenDecimals**: `number`

Number of decimal places for the liquidity pool token

• **params.params**: `RemoveLiquidityParamsV2`\<`"decimal"`\>

The original parameters in decimal string format to be converted

• **params.tokenA**: `Token`

Token A information including contract address and decimals

• **params.tokenB**: `Token`

Token B information including contract address and decimals

## Returns

`RemoveLiquidityParamsV2`\<`"dexnumber"`\>

The parameters converted to DexNumber format while preserving all other properties

## Throws

If any amounts are not positive numbers

## Defined in

[packages/utils/src/utils/liquidity.utils.ts:901](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/utils/src/utils/liquidity.utils.ts#L901)
