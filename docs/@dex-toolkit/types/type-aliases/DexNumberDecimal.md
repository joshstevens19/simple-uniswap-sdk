[**@dex-toolkit/types v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/types](../README.md) / DexNumberDecimal

# Type Alias: DexNumberDecimal

> **DexNumberDecimal**: `BigNumber.Value` \| [`DexNumberUnit`](DexNumberUnit.md) \| `EthersBigNumber`

Represents the possible decimal types that can be used in DexNumber operations.
Combines multiple value types to provide flexible decimal specification.

## Example

```typescript
// Using numeric value
const dec1: DexNumberDecimal = 18

// Using Ethereum unit
const dec2: DexNumberDecimal = 'ether'

// Using BigNumber
const dec3: DexNumberDecimal = BigNumber.from('1000000000000000000')
```

## Defined in

[packages/types/src/dex-number.types.ts:87](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/dex-number.types.ts#L87)
