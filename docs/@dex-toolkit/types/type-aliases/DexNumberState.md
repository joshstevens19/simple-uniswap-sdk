[**@dex-toolkit/types v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/types](../README.md) / DexNumberState

# Type Alias: DexNumberState

> **DexNumberState**: `"unshifted"` \| `"neutral"` \| `"shifted"`

Represents the state of a DexNumber object.

This state indicates whether the DexNumber instance has been shifted or unshifted,
or if it's in a neutral state where no shifting operation has been applied yet.

- `unshifted`: The DexNumber is in its human-readable form, typically used when
               interacting with users or when displaying values (e.g., 1 Ether instead of 1e18 Wei).

- `shifted`: The DexNumber has been shifted, meaning it represents a value in its smallest unit,
             such as Wei in Ethereum or the smallest token unit for ERC-20 tokens (e.g., 1 Ether in Wei is 1e18).

- `neutral`: The DexNumber has not been explicitly shifted or unshifted, representing a state where
             the value is neither converted to its smallest unit nor its human-readable form.

This state helps track whether the value has been transformed to or from its smallest unit (e.g., Wei) and ensures that the correct operations are applied when performing calculations, conversions, or displaying values.

## Defined in

packages/types/src/dex-number.types.ts:43
