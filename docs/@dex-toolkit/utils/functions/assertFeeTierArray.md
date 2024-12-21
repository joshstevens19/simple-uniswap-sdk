[**@dex-toolkit/utils v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/utils](../README.md) / assertFeeTierArray

# Function: assertFeeTierArray()

> **assertFeeTierArray**(`feeTiers`, `dexConfig`, `versionTag`, `errorCode`): `asserts feeTiers is number[]`

Asserts that the provided value is a valid array of `FeeTier` values.

This function throws a `DexError` if the provided array contains any invalid fee tiers within the specified
DEX configuration and version. Use this for runtime validation of fee tier arrays.

## Parameters

• **feeTiers**: `undefined` \| `number`[]

An array of numbers representing potential fee tiers.

• **dexConfig**: `undefined` \| `DexConfigBase`

The DEX configuration object containing protocol fee tiers.

• **versionTag**: `undefined` \| \`$\{number\}-$\{number\}-$\{number\}\`

The protocol version tag within the configuration.

• **errorCode**: [`ErrorCodes`](../enumerations/ErrorCodes.md) = `ErrorCodes.functionArgumentError`

Optional error code to use in the thrown error.

## Returns

`asserts feeTiers is number[]`

## Throws

`DexError` if the array contains any invalid fee tiers within the specified configuration and version.

## Example

```
assertFeeTierArray([500, 3000], dexConfig, 'v3'); // Throws DexError if any element is invalid
```

## Defined in

[packages/utils/src/utils/router.utils.ts:336](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/utils/src/utils/router.utils.ts#L336)
