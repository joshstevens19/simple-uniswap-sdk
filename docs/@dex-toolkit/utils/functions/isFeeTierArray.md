[**@dex-toolkit/utils v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/utils](../README.md) / isFeeTierArray

# Function: isFeeTierArray()

> **isFeeTierArray**(`feeTiers`, `dexConfig`, `versionTag`): `feeTiers is number[]`

Type guard to check if a value is an array of valid `FeeTier` values.

This function checks if every element in an array is a recognized fee tier within a specified DEX configuration
and version.

## Parameters

• **feeTiers**: `undefined` \| `number`[]

An array of numbers representing potential fee tiers.

• **dexConfig**: `undefined` \| `DexConfigBase`

The DEX configuration object containing protocol fee tiers.

• **versionTag**: `undefined` \| \`$\{number\}-$\{number\}-$\{number\}\`

The protocol version tag to check within the configuration.

## Returns

`feeTiers is number[]`

A boolean indicating if all values in `feeTiers` are valid within the specified configuration.

## Example

```
const areTiersValid = isFeeTierArray([500, 3000], dexConfig, 'v3');
console.log(areTiersValid); // true if both 500 and 3000 are valid in dexConfig under 'v3'
```

## Defined in

[packages/utils/src/utils/router.utils.ts:307](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/utils/src/utils/router.utils.ts#L307)
