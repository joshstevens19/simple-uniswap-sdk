[**@dex-toolkit/types v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/types](../README.md) / LiquidityTokenInfo

# Type Alias: LiquidityTokenInfo\<TFormat\>

> **LiquidityTokenInfo**\<`TFormat`\>: `object`

Represents information about a token involved in a liquidity operation.

## Type Parameters

• **TFormat** *extends* [`TradeFormat`](TradeFormat.md)

## Type declaration

### allowance

> **allowance**: [`TradeFormatValue`](TradeFormatValue.md)\<`TFormat`\>

The current allowance granted to the router contract for this token, formatted according to the specified trade format.

### amount?

> `optional` **amount**: [`TradeFormatValue`](TradeFormatValue.md)\<`TFormat`\>

The amount of the token to be added or removed.

### balance

> **balance**: [`TradeFormatValue`](TradeFormatValue.md)\<`TFormat`\>

The current balance of the token in the user's wallet, formatted according to the specified trade format.

### hasEnoughAllowance?

> `optional` **hasEnoughAllowance**: `boolean`

Indicates whether the user has granted enough allowance for the operation.

### hasEnoughBalance?

> `optional` **hasEnoughBalance**: `boolean`

Indicates whether the user has enough balance for the operation.

### isCoin

> **isCoin**: `boolean`

Indicates whether the token is a native coin (e.g., ETH).

### isMaxAllowance

> **isMaxAllowance**: `boolean`

Whether the token has the maximum allowance

### token

> **token**: [`Token`](Token.md)

The token involved in the liquidity operation.

### value?

> `optional` **value**: `number`

Value of the token in currency, e.g., USD or EUR

## Defined in

[packages/types/src/liquidity.types.ts:288](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/liquidity.types.ts#L288)
