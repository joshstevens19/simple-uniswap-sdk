[**@dex-toolkit/utils v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/utils](../README.md) / isFeeTier

# Function: isFeeTier()

> **isFeeTier**(`feeTier`, `dexConfig`, `versionTag`, `errorCode`): `feeTier is number`

Type guard to check if the value is a valid `FeeTier`.

This function checks if a provided number is a recognized fee tier within a specified DEX configuration and version.
If `feeTier`, `dexConfig`, or `versionTag` is missing, a `DexError` is thrown.

## Parameters

• **feeTier**: `undefined` \| `number`

The fee tier to validate.

• **dexConfig**: `undefined` \| `DexConfigBase`

The DEX configuration object containing protocol fee tiers.

• **versionTag**: `undefined` \| \`$\{number\}-$\{number\}-$\{number\}\`

The protocol version tag to check within the configuration.

• **errorCode**: [`ErrorCodes`](../enumerations/ErrorCodes.md) = `ErrorCodes.functionArgumentError`

Optional error code to use in the thrown error if a required argument is missing.

## Returns

`feeTier is number`

A boolean indicating whether the `feeTier` is valid within the specified configuration.

## Throws

`DexError` if `feeTier`, `dexConfig`, or `versionTag` is undefined.

## Example

```
const isTierValid = isFeeTier(3000, dexConfig, 'v3');
console.log(isTierValid); // true if 3000 is a valid tier in dexConfig under 'v3'
```

## Defined in

[packages/utils/src/utils/router.utils.ts:226](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/utils/src/utils/router.utils.ts#L226)
