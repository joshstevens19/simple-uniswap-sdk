[**@dex-toolkit/types v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/types](../README.md) / MultiTokenAllowancesAndBalance

# Type Alias: MultiTokenAllowancesAndBalance\<TFormat\>

> **MultiTokenAllowancesAndBalance**\<`TFormat`\>: `object`

Represents allowances and balances for a pair of tokens across multiple DEXes.

## Type Parameters

• **TFormat** *extends* [`TradeFormat`](TradeFormat.md)

## Type declaration

### fromToken

> **fromToken**: [`MultiDexTokenWithAllowanceInfo`](MultiDexTokenWithAllowanceInfo.md)\<`TFormat`\>

The source token information including balances and allowances.

### toToken

> **toToken**: [`MultiDexTokenWithAllowanceInfo`](MultiDexTokenWithAllowanceInfo.md)\<`TFormat`\>

The destination token information including balances and allowances.

## Defined in

[packages/types/src/token.types.ts:110](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/token.types.ts#L110)
