[**@dex-toolkit/utils v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/utils](../README.md) / percentToFeeTier

# Function: percentToFeeTier()

> **percentToFeeTier**(`percent`): `number`

(V3 ONLY) Converts a percentage representation back to its `FeeTier` basis point equivalent as a `number`.

This function reverts the percentage back to basis points using `BigInt` for precision, but returns a `number`.

## Parameters

• **percent**: `number`

The percentage to convert as a `number`.

## Returns

`number`

The corresponding FeeTier in basis points as a `number`.

## Example

```
const percent500 = percentToFeeTier(0.0005); // 500
const percent3000 = percentToFeeTier(0.003); // 3000
const percent10000 = percentToFeeTier(0.01); // 10000
console.log(percent500, percent3000, percent10000);
```

## Defined in

packages/utils/src/utils/router.utils.ts:58
