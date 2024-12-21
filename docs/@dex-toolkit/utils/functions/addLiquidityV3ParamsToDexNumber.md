[**@dex-toolkit/utils v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/utils](../README.md) / addLiquidityV3ParamsToDexNumber

# Function: addLiquidityV3ParamsToDexNumber()

> **addLiquidityV3ParamsToDexNumber**(`params`): `AddLiquidityParamsV3`\<`"dexnumber"`\>

Converts liquidity parameters from decimal string format to DexNumber format for V3 DEX pools.
This includes validating the token amounts are positive and converting them to the appropriate decimal precision.
For V3 pools, this also preserves fee tier and price range information.

## Parameters

• **params**

Parameters for the conversion

• **params.params**: `AddLiquidityParamsV3`\<`"decimal"`\>

The original parameters in decimal string format to be converted

• **params.tokenA**: `Token`

Token A information including contract address and decimals

• **params.tokenB**: `Token`

Token B information including contract address and decimals

## Returns

`AddLiquidityParamsV3`\<`"dexnumber"`\>

The parameters converted to DexNumber format while preserving all other properties

## Throws

If token amounts are not positive numbers

## Defined in

[packages/utils/src/utils/liquidity.utils.ts:850](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/utils/src/utils/liquidity.utils.ts#L850)
