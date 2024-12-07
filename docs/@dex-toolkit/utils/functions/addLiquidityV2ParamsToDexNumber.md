[**@dex-toolkit/utils v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/utils](../README.md) / addLiquidityV2ParamsToDexNumber

# Function: addLiquidityV2ParamsToDexNumber()

> **addLiquidityV2ParamsToDexNumber**(`params`): `AddLiquidityParamsV2`\<`"dexnumber"`\>

Converts liquidity parameters from decimal string format to DexNumber format for V2 DEX pools.
This includes validating the token amounts are positive and converting them to the appropriate decimal precision.

## Parameters

• **params**

Parameters for the conversion

• **params.params**: `AddLiquidityParamsV2`\<`"decimal"`\>

The original parameters in decimal string format to be converted

• **params.tokenA**: `Token`

Token A information including contract address and decimals

• **params.tokenB**: `Token`

Token B information including contract address and decimals

## Returns

`AddLiquidityParamsV2`\<`"dexnumber"`\>

The parameters converted to DexNumber format while preserving all other properties

## Throws

If token amounts are not positive numbers

## Defined in

packages/utils/src/utils/liquidity.utils.ts:799
