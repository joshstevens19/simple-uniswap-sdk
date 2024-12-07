[**@dex-toolkit/utils v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/utils](../README.md) / formatLiquidityParams

# Function: formatLiquidityParams()

> **formatLiquidityParams**\<`TProtocol`, `TDirection`\>(`params`): `TProtocol` *extends* `"protocolV2"` ? `TDirection` *extends* `"add"` ? `AddLiquidityParamsV2`\<`"dexnumber"`\> : `RemoveLiquidityParamsV2`\<`"dexnumber"`\> : `TProtocol` *extends* `"protocolV3"` ? `TDirection` *extends* `"add"` ? `AddLiquidityParamsV3`\<`"dexnumber"`\> : `RemoveLiquidityParamsV3`\<`"dexnumber"`\> : `never`

Formats liquidity parameters based on protocol version and direction (add/remove).
This is a type-safe wrapper that routes to the appropriate conversion function based on the protocol and direction.

## Type Parameters

• **TProtocol** *extends* `DexProtocol`

The DEX protocol type (V2 or V3)

• **TDirection** *extends* `LiquidityDirection`

The direction of the liquidity operation (add or remove)

## Parameters

• **params**

The formatting parameters

• **params.liquidityDirection**: `TDirection`

Whether adding or removing liquidity

• **params.lpTokenDecimals?**: `TDirection` *extends* `"remove"` ? `number` : `never`

LP token decimals (required only when removing liquidity)

• **params.params**: `TProtocol` *extends* `"protocolV2"` ? `TDirection` *extends* `"add"` ? `AddLiquidityParamsV2`\<`"decimal"`\> : `RemoveLiquidityParamsV2`\<`"decimal"`\> : `TProtocol` *extends* `"protocolV3"` ? `TDirection` *extends* `"add"` ? `AddLiquidityParamsV3`\<`"decimal"`\> : `RemoveLiquidityParamsV3`\<`"decimal"`\> : `never`

The liquidity parameters to format

• **params.protocol**: `TProtocol`

The DEX protocol being used

• **params.tokenA**: `Token`

Token A information

• **params.tokenB**: `Token`

Token B information

## Returns

`TProtocol` *extends* `"protocolV2"` ? `TDirection` *extends* `"add"` ? `AddLiquidityParamsV2`\<`"dexnumber"`\> : `RemoveLiquidityParamsV2`\<`"dexnumber"`\> : `TProtocol` *extends* `"protocolV3"` ? `TDirection` *extends* `"add"` ? `AddLiquidityParamsV3`\<`"dexnumber"`\> : `RemoveLiquidityParamsV3`\<`"dexnumber"`\> : `never`

Formatted parameters in DexNumber format appropriate for the protocol and direction

## Throws

If parameters are invalid or if lpTokenDecimals is missing when removing liquidity

## Defined in

packages/utils/src/utils/liquidity.utils.ts:1033
