[**@dex-toolkit/utils v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/utils](../README.md) / feeToPercent

# Function: feeToPercent()

> **feeToPercent**(`feeTier`): `number`

(V3 ONLY) Converts a `FeeTier` to its percentage representation as a `number`.

This function calculates the percentage representation of a fee tier in basis points (bps).
The calculation is performed using `BigInt` for precision but returns the result as a `number`.

## Parameters

• **feeTier**: `number`

The fee amount to convert, in basis points (e.g., 500, 3000, 10000).

## Returns

`number`

The percentage value as a `number`.

## Example

```
const feeTier500 = feeToPercent(500); // 0.0005
const feeTier3000 = feeToPercent(3000); // 0.003
const feeTier10000 = feeToPercent(10000); // 0.01
console.log(feeTier500, feeTier3000, feeTier10000);
```

## Defined in

packages/utils/src/utils/router.utils.ts:36
