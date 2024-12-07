[**@dex-toolkit/utils v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/utils](../README.md) / prepareTokenCallContext

# Function: prepareTokenCallContext()

> **prepareTokenCallContext**\<`TOption`\>(`params`): `TokenCallContext`\<`TOption`\>

Creates a token call context array based on the specified parameters.
The call context is used to prepare the contract call requests for various token-related methods
like `symbol`, `decimals`, `name`, `balanceOf`, `allowanceV2`, and `allowanceV3`.

## Type Parameters

• **TOption** *extends* `TokenCallOption`[]

## Parameters

• **params**: `TokenParams`\<`TOption`\>

An object containing the parameters for creating the call context.

## Returns

`TokenCallContext`\<`TOption`\>

An array of `CallContext` objects, each representing a method call to be made on the token contract.

## Defined in

packages/utils/src/multicall/token-multicall.utils.ts:31
