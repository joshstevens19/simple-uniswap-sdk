[**@dex-toolkit/types v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/types](../README.md) / DexNumberUnit

# Type Alias: DexNumberUnit

> **DexNumberUnit**: `"wei"` \| `"kwei"` \| `"mwei"` \| `"gwei"` \| `"szabo"` \| `"finney"` \| `"ether"`

Represents the units of measurement for Ethereum-based values.
These units follow the standard Ethereum denomination scheme, where each unit
is related to the next by a factor of 1000.

- 'wei': The smallest unit (1 wei)
- 'kwei': 1,000 wei (10^3)
- 'mwei': 1,000,000 wei (10^6)
- 'gwei': 1,000,000,000 wei (10^9), commonly used for gas prices
- 'szabo': 1,000,000,000,000 wei (10^12)
- 'finney': 1,000,000,000,000,000 wei (10^15)
- 'ether': 1,000,000,000,000,000,000 wei (10^18), the main unit of Ethereum

## Defined in

[packages/types/src/dex-number.types.ts:58](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/dex-number.types.ts#L58)
