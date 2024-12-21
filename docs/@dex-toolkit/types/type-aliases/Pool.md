[**@dex-toolkit/types v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/types](../README.md) / Pool

# Type Alias: Pool

> **Pool**: `object`

Represents a pool containing a paired token and its associated information.

## Type declaration

### fee?

> `optional` **fee**: [`FeeTier`](FeeTier.md)

The fee tier associated with the pool (if applicable).

### pairAddress

> **pairAddress**: `Address`

The address of the pair contract.

### pairedToken

> **pairedToken**: [`Token`](Token.md)

The token paired with the liquidity pool.

## Defined in

[packages/types/src/router.types.ts:216](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/router.types.ts#L216)
