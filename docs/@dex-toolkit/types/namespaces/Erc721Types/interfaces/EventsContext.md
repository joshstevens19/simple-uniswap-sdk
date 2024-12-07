[**@dex-toolkit/types v1.0.0**](../../../README.md) • **Docs**

***

[Documentation v1.0.0](../../../../../packages.md) / [@dex-toolkit/types](../../../README.md) / [Erc721Types](../README.md) / EventsContext

# Interface: EventsContext

## Methods

### Approval()

> **Approval**(`owner`, `approved`, `tokenId`): [`EventFilter`](../../../type-aliases/EventFilter.md)

#### Parameters

• **owner**: `string`

• **approved**: `string`

• **tokenId**: `BigNumberish`

#### Returns

[`EventFilter`](../../../type-aliases/EventFilter.md)

#### Defined in

packages/types/src/abis/erc721.types.ts:29

***

### ApprovalForAll()

> **ApprovalForAll**(`owner`, `operator`, `approved`): [`EventFilter`](../../../type-aliases/EventFilter.md)

#### Parameters

• **owner**: `string`

• **operator**: `string`

• **approved**: `boolean`

#### Returns

[`EventFilter`](../../../type-aliases/EventFilter.md)

#### Defined in

packages/types/src/abis/erc721.types.ts:30

***

### BatchMetadataUpdate()

> **BatchMetadataUpdate**(`_fromTokenId`, `_toTokenId`): [`EventFilter`](../../../type-aliases/EventFilter.md)

#### Parameters

• **\_fromTokenId**: `BigNumberish`

• **\_toTokenId**: `BigNumberish`

#### Returns

[`EventFilter`](../../../type-aliases/EventFilter.md)

#### Defined in

packages/types/src/abis/erc721.types.ts:35

***

### MetadataUpdate()

> **MetadataUpdate**(`_tokenId`): [`EventFilter`](../../../type-aliases/EventFilter.md)

#### Parameters

• **\_tokenId**: `BigNumberish`

#### Returns

[`EventFilter`](../../../type-aliases/EventFilter.md)

#### Defined in

packages/types/src/abis/erc721.types.ts:39

***

### OwnershipTransferred()

> **OwnershipTransferred**(`previousOwner`, `newOwner`): [`EventFilter`](../../../type-aliases/EventFilter.md)

#### Parameters

• **previousOwner**: `string`

• **newOwner**: `string`

#### Returns

[`EventFilter`](../../../type-aliases/EventFilter.md)

#### Defined in

packages/types/src/abis/erc721.types.ts:40

***

### Transfer()

> **Transfer**(`from`, `to`, `tokenId`): [`EventFilter`](../../../type-aliases/EventFilter.md)

#### Parameters

• **from**: `string`

• **to**: `string`

• **tokenId**: `BigNumberish`

#### Returns

[`EventFilter`](../../../type-aliases/EventFilter.md)

#### Defined in

packages/types/src/abis/erc721.types.ts:41
