[**@dex-toolkit/contracts v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/contracts](../README.md) / getContractForStandard

# Function: getContractForStandard()

> **getContractForStandard**\<`S`\>(`standard`, `dexProviderContext`, `contractDetail`): [`ContractForStandard`](../type-aliases/ContractForStandard.md)\<`S`\>

Returns an instance of a contract class based on the provided standard.

## Type Parameters

• **S** *extends* keyof [`ContractMap`](../type-aliases/ContractMap.md)

## Parameters

• **standard**: `S`

The token standard, such as ERC20, ERC777, ERC721, or ERC1155.

• **dexProviderContext**: `DexMulticallProviderContext`

The context containing provider information.

• **contractDetail**: `ContractDetailToken`

The contract details, including address and ABI.

## Returns

[`ContractForStandard`](../type-aliases/ContractForStandard.md)\<`S`\>

An instance of the corresponding contract class based on the token standard.

## Throws

If an unsupported standard is provided.

## Defined in

packages/contracts/src/token/index.ts:42
