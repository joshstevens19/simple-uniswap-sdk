[**@dex-toolkit/core v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/core](../README.md) / LiquidityProtocolArgs

# Type Alias: LiquidityProtocolArgs\<TFormat\>

> **LiquidityProtocolArgs**\<`TFormat`\>: `LiquidityInternalArgs`\<`TFormat`\> & `object`

Arguments required to initialize a liquidity protocol instance.

## Type declaration

### tokenAContract?

> `optional` **tokenAContract**: [`TokenContract`](../classes/TokenContract.md)

Optional token contract for the "from" token.

### tokenBContract?

> `optional` **tokenBContract**: [`TokenContract`](../classes/TokenContract.md)

Optional token contract for the "to" token.

### tokens?

> `optional` **tokens**: [`Tokens`](../classes/Tokens.md)

Optional `Tokens` factory for managing token-related operations.

## Type Parameters

• **TFormat** *extends* `TradeFormat`

The trade format type.

## Defined in

[packages/core/src/liquidity/liquidity.abstract.ts:52](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/core/src/liquidity/liquidity.abstract.ts#L52)
