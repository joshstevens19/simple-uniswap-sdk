[**@dex-toolkit/types v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/types](../README.md) / AllowanceAndBalanceOf

# Type Alias: AllowanceAndBalanceOf\<TFormat\>

> **AllowanceAndBalanceOf**\<`TFormat`\>: `object`

Represents the balance and allowances of a token for a specific DEX.

## Type Parameters

• **TFormat** *extends* [`TradeFormat`](TradeFormat.md)

## Type declaration

### allowanceInfoByDex

> **allowanceInfoByDex**: [`AllowancesByDex`](AllowancesByDex.md)\<`TFormat`\>

The allowances of the token across multiple DEXes.

### balanceInfo

> **balanceInfo**: [`TokenBalanceInfo`](TokenBalanceInfo.md)\<`TFormat`\>

The balance of the token.

## Defined in

packages/types/src/token.types.ts:91
