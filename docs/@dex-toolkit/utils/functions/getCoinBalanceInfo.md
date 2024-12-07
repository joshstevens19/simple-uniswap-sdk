[**@dex-toolkit/utils v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/utils](../README.md) / getCoinBalanceInfo

# Function: getCoinBalanceInfo()

> **getCoinBalanceInfo**\<`TFormat`\>(`params`): `Promise`\<`MultiDexTokenWithAllowanceInfo`\<`TFormat`\>\>

Retrieves the balance information for the native coin of the current chain.
This method is used when the provided token contract address corresponds to the native coin rather than a token contract.

## Type Parameters

• **TFormat** *extends* `TradeFormat`

The format in which the balance and allowance values are returned.

## Parameters

• **params**

The parameters for retrieving the balance information.

• **params.dexConfigsByDex**: `DexConfigsByDex`

The dexConfigsByDex object containing the contract details for each DEX type.

• **params.dexProvider**: `IDexProvider`

The dex provider

• **params.format**: `TradeFormatOptions`\<`TFormat`\>

The format in which the balance and allowance values are returned.

• **params.walletAddress**: `string`

The address of the wallet to retrieve balance information for.

## Returns

`Promise`\<`MultiDexTokenWithAllowanceInfo`\<`TFormat`\>\>

A promise that resolves to a MultiDexTokenWithAllowanceInfo object containing the balance and a fixed allowance value.

## Throws

If the native currency cannot be found for the provided chain ID.

## Defined in

packages/utils/src/utils/balance.utils.ts:52
