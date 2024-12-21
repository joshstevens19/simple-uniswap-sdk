[**@dex-toolkit/types v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/types](../README.md) / TradeFromTokenInfo

# Type Alias: TradeFromTokenInfo\<TFormat\>

> **TradeFromTokenInfo**\<`TFormat`\>: [`TradeTokenInfo`](TradeTokenInfo.md)\<`TFormat`\> & `object`

The token information, including the token itself, token value, and its balance and allowance information.

## Type declaration

### allowance

> **allowance**: [`TradeFormatValue`](TradeFormatValue.md)\<`TFormat`\>

The allowance for the token

### hasEnoughAllowance?

> `optional` **hasEnoughAllowance**: `boolean`

Whether the token has an allowance for the trade

### hasEnoughBalance?

> `optional` **hasEnoughBalance**: `boolean`

Whether the token has a balance for the trade

### isMaxAllowance

> **isMaxAllowance**: `boolean`

Whether the token has the maximum allowance

## Type Parameters

• **TFormat** *extends* [`TradeFormat`](TradeFormat.md)

## Defined in

[packages/types/src/trade.types.ts:293](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/trade.types.ts#L293)
