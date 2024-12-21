[**@dex-toolkit/types v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/types](../README.md) / TokenBalanceInfo

# Type Alias: TokenBalanceInfo\<TFormat\>

> **TokenBalanceInfo**\<`TFormat`\>: `object`

Represents the balance information of a token, including whether the balance is sufficient for the trade.

## Type Parameters

• **TFormat** *extends* [`TradeFormat`](TradeFormat.md)

## Type declaration

### balance

> **balance**: [`TradeFormatValue`](TradeFormatValue.md)\<`TFormat`\>

The balance of the token.

### hasEnoughBalance?

> `optional` **hasEnoughBalance**: `boolean`

Indicates whether the balance is sufficient for the trade.

## Defined in

[packages/types/src/token.types.ts:68](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/token.types.ts#L68)
