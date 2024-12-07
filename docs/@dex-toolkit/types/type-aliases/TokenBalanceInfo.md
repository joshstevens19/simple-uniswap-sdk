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

packages/types/src/token.types.ts:67
