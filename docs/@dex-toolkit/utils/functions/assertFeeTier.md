[**@dex-toolkit/utils v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/utils](../README.md) / assertFeeTier

# Function: assertFeeTier()

> **assertFeeTier**(`feeTier`, `dexConfig`, `versionTag`, `errorCode`): `asserts feeTier is number`

Asserts that the provided value is a valid `FeeTier`.

This function throws a `DexError` if the provided `feeTier` is invalid within the specified DEX configuration
and version. Use this for runtime validation of fee tier values.

## Parameters

• **feeTier**: `undefined` \| `number`

The fee tier value to validate.

• **dexConfig**: `undefined` \| `DexConfigBase`

The DEX configuration object containing protocol fee tiers.

• **versionTag**: `undefined` \| \`$\{number\}-$\{number\}-$\{number\}\`

The protocol version tag within the configuration.

• **errorCode**: [`ErrorCodes`](../enumerations/ErrorCodes.md) = `ErrorCodes.functionArgumentError`

Optional error code to use in the thrown error.

## Returns

`asserts feeTier is number`

## Throws

`DexError` if the `feeTier` is not valid within the specified DEX configuration and version.

## Example

```
assertFeeTier(500, dexConfig, 'v3'); // Throws DexError if 500 is not valid in the provided config
```

## Defined in

packages/utils/src/utils/router.utils.ts:274
