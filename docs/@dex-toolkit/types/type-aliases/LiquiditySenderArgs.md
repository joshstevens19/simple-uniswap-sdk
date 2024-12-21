[**@dex-toolkit/types v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/types](../README.md) / LiquiditySenderArgs

# Type Alias: LiquiditySenderArgs

> **LiquiditySenderArgs**: `object`

Represents the arguments for sending liquidity tokens, including the two tokens and optional liquidity settings.

## Type declaration

### settings?

> `optional` **settings**: `Partial`\<[`LiquiditySettings`](LiquiditySettings.md)\>

(Optional) Partial liquidity settings for customizing the operation.

### tokenA

> **tokenA**: [`Token`](Token.md)

The first token involved in the liquidity operation.

### tokenB

> **tokenB**: [`Token`](Token.md)

The second token involved in the liquidity operation.

## Defined in

[packages/types/src/liquidity.types.ts:96](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/liquidity.types.ts#L96)
