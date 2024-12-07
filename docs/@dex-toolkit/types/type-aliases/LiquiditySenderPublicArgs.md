[**@dex-toolkit/types v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/types](../README.md) / LiquiditySenderPublicArgs

# Type Alias: LiquiditySenderPublicArgs

> **LiquiditySenderPublicArgs**: `object`

Represents the public arguments for sending liquidity tokens using their addresses instead of token objects.

## Type declaration

### settings?

> `optional` **settings**: `Partial`\<[`LiquiditySettings`](LiquiditySettings.md)\>

(Optional) Partial liquidity settings for customizing the operation.

### tokenAAddress

> **tokenAAddress**: `Address`

The address of the first token involved in the liquidity operation.

### tokenBAddress

> **tokenBAddress**: `Address`

The address of the second token involved in the liquidity operation.

## Defined in

packages/types/src/liquidity.types.ts:108
