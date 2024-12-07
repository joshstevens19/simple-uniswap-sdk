[**@dex-toolkit/types v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/types](../README.md) / RemoveLiquidityPermit

# Type Alias: RemoveLiquidityPermit

> **RemoveLiquidityPermit**: `object`

Parameters for a permit when removing liquidity for v2

## Type declaration

### approveMax

> **approveMax**: `boolean`

Whether to approve the maximum amount of liquidity.

### permitData

> **permitData**: `object`

The permit signature data for the off-chain approval.

### permitData.r

> **permitData.r**: `string`

The `r` value of the permit signature.

### permitData.s

> **permitData.s**: `string`

The `s` value of the permit signature.

### permitData.v

> **permitData.v**: `number`

The recovery ID for the permit signature.

## Defined in

packages/types/src/liquidity.types.ts:218
