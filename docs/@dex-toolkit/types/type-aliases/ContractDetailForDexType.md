[**@dex-toolkit/types v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/types](../README.md) / ContractDetailForDexType

# Type Alias: ContractDetailForDexType

> **ContractDetailForDexType**: [`ContractDetailBase`](ContractDetailBase.md) & `object`

Represents contract details based on the DEX type and version, including the contract type (e.g., 'pair', 'router').

## Type declaration

### contractType

> **contractType**: [`ContractDetailType`](ContractDetailType.md)

The type of contract (e.g., 'pair', 'router', 'factory', 'quoter').

### version

> **version**: [`Version`](Version.md)

The version of the dex contracts

## Defined in

[packages/types/src/contract-detail.types.ts:68](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/contract-detail.types.ts#L68)
