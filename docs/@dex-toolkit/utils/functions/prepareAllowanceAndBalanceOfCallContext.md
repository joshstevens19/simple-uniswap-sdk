[**@dex-toolkit/utils v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/utils](../README.md) / prepareAllowanceAndBalanceOfCallContext

# Function: prepareAllowanceAndBalanceOfCallContext()

> **prepareAllowanceAndBalanceOfCallContext**\<`IncludeAllowance`\>(`params`): `Record`\<`string`, `ContractContext`\<`Erc20Types.Contract`, `TokenCalls`\<`true`, `IncludeAllowance`\>\>\>

Builds contract call contexts for querying token balances and allowances across multiple DEX versions.

## Type Parameters

• **IncludeAllowance** *extends* `boolean`

Whether to include allowance calls. Defaults to true.

## Parameters

• **params**

The parameters for building the contract call contexts.

• **params.dexConfigBases**: `DexConfigBase`[]

An array of `DexConfigBase` objects containing contract details for each DEX type.

• **params.dexProvider**: `IDexProvider`

The dex provider

• **params.includeAllowance?**: `IncludeAllowance` = `...`

Whether to include allowance calls. Defaults to true.

• **params.tokenContractAddress**: `string`

The address of the token contract to query.

• **params.walletAddress**: `string`

The address of the wallet to retrieve allowance and balance information for.

## Returns

`Record`\<`string`, `ContractContext`\<`Erc20Types.Contract`, `TokenCalls`\<`true`, `IncludeAllowance`\>\>\>

A `ContractCallContext` object that includes the necessary calls for querying token details, balance, and allowances for the provided DEX types.

## Throws

If no token standard is found for the current chain ID, or if no ABI is available for the token standard.

## Defined in

packages/utils/src/utils/balance.utils.ts:163
