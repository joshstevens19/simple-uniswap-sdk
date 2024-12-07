[**@dex-toolkit/types v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/types](../README.md) / ContractDetailUnknown

# Type Alias: ContractDetailUnknown\<TMethods\>

> **ContractDetailUnknown**\<`TMethods`\>: `object`

Represents the details of a contract, including its address, ABI, and optional method mappings.

## Type Parameters

• **TMethods** = `Record`\<`string`, `string`\>

## Type declaration

### abi

> **abi**: `JsonFragment`[]

The ABI of the contract.

### methods?

> `optional` **methods**: `Partial`\<`TMethods`\>

Optional custom method names or overrides for the contract's methods.

## Template

A mapping of method names to custom names or overrides for contract methods.

## Defined in

packages/types/src/contract-detail.types.ts:39
