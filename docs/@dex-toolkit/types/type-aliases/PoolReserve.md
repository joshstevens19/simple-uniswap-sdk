[**@dex-toolkit/types v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/types](../README.md) / PoolReserve

# Type Alias: PoolReserve

> **PoolReserve**: `object`

Represents the reserves of a pool for two tokens, including the pair address.

## Type declaration

### pairAddress

> **pairAddress**: `Address`

The address of the pair contract.

### token0

> **token0**: `object`

The reserve information for the first token in the pair.

### token0.address

> **token0.address**: `Address`

The address of the first token.

### token0.reserve

> **token0.reserve**: [`IDexNumber`](../interfaces/IDexNumber.md)

The reserve amount for the first token.

### token1

> **token1**: `object`

The reserve information for the second token in the pair.

### token1.address

> **token1.address**: `Address`

The address of the second token.

### token1.reserve

> **token1.reserve**: [`IDexNumber`](../interfaces/IDexNumber.md)

The reserve amount for the second token.

## Defined in

packages/types/src/router.types.ts:194
