[**@dex-toolkit/types v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/types](../README.md) / TradeTokenInfo

# Type Alias: TradeTokenInfo\<TFormat\>

> **TradeTokenInfo**\<`TFormat`\>: `object`

The token information, including the token itself, token value, and its balance information.

## Type Parameters

• **TFormat** *extends* [`TradeFormat`](TradeFormat.md)

## Type declaration

### balance

> **balance**: [`TradeFormatValue`](TradeFormatValue.md)\<`TFormat`\>

The balance of the token

### token

> **token**: [`Token`](Token.md)

The token

### value?

> `optional` **value**: `number`

Value of the token in currency, eg: USD or EUR

## Defined in

[packages/types/src/trade.types.ts:281](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/trade.types.ts#L281)
