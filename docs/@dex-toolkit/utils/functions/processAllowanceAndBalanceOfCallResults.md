[**@dex-toolkit/utils v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/utils](../README.md) / processAllowanceAndBalanceOfCallResults

# Function: processAllowanceAndBalanceOfCallResults()

> **processAllowanceAndBalanceOfCallResults**\<`TFormat`\>(`params`): `MultiDexTokenWithAllowanceInfo`\<`TFormat`\>

Combines the allowance and balance results from both v2 and v3 contract calls into a single MultiDexTokenWithAllowanceInfo object. If data is missing for either v2 or v3, it assigns a default value of MIN_HEX_STRING.

## Type Parameters

• **TFormat** *extends* `TradeFormat`

The format in which the balance and allowance values are returned.

## Parameters

• **params**

The parameters for processing the allowance and balance call results.

• **params.chainId**: `number`

The ID of the chain the contracts are deployed on.

• **params.contractCallResults**: `MulticallResults`\<`Record`\<`string`, `ContractContext`\<`Contract`, `any`\>\>\>

The combined results from the multicall.

• **params.dexConfigsByDex**: `DexConfigsByDex`

The dexConfigsByDex object containing the contract details for each DEX type.

• **params.format**: `TradeFormatOptions`\<`TFormat`\>

The format in which the balance and allowance values are returned.

• **params.tokenContractAddress**: `string`

The address of the token contract being queried.

## Returns

`MultiDexTokenWithAllowanceInfo`\<`TFormat`\>

A MultiDexTokenWithAllowanceInfo object combining v2 and v3 data.

## Defined in

packages/utils/src/utils/balance.utils.ts:303
