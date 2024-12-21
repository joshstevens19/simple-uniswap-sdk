[**@dex-toolkit/types v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/types](../README.md) / ContractTransactionOverrides

# Type Alias: ContractTransactionOverrides

> **ContractTransactionOverrides**: `object`

## Type declaration

### chainId?

> `optional` **chainId**: `number`

The chain ID (or network ID) to use

### gasLimit?

> `optional` **gasLimit**: `number`

The maximum units of gas for the transaction to use

### gasPrice?

> `optional` **gasPrice**: `BigNumber` \| `string` \| `number` \| `Promise`\<`any`\>

The price (in wei) per unit of gas

### nonce?

> `optional` **nonce**: `number`

The nonce to use in the transaction

### value?

> `optional` **value**: `BigNumber` \| `string` \| `number` \| `Promise`\<`any`\>

The amount to send with the transaction (i.e. msg.value)

## Defined in

[packages/types/src/abis/common.types.ts:10](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/common.types.ts#L10)
