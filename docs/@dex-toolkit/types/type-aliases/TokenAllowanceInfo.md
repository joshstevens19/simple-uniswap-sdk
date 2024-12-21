[**@dex-toolkit/types v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/types](../README.md) / TokenAllowanceInfo

# Type Alias: TokenAllowanceInfo\<TFormat\>

> **TokenAllowanceInfo**\<`TFormat`\>: `object`

Represents the balance information of a token, including whether the balance is sufficient for the trade.

## Type Parameters

• **TFormat** *extends* [`TradeFormat`](TradeFormat.md)

## Type declaration

### allowance

> **allowance**: [`TradeFormatValue`](TradeFormatValue.md)\<`TFormat`\>

The allowance of the token.

### hasEnoughAllowance?

> `optional` **hasEnoughAllowance**: `boolean`

Indicates whether the allowance is sufficient for the trade.

### isMaxAllowance

> **isMaxAllowance**: `boolean`

Whether the token has the maximum allowance

## Defined in

[packages/types/src/token.types.ts:56](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/token.types.ts#L56)
