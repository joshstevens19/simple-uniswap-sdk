[**@dex-toolkit/utils v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/utils](../README.md) / assertDexContext

# Function: assertDexContext()

> **assertDexContext**(`context`, `errorCode`): `asserts context is DexContext`

Asserts that the provided context is a valid `DexContext`.

## Parameters

• **context**: `any`

The context to check.

• **errorCode**: [`ErrorCodes`](../enumerations/ErrorCodes.md) = `ErrorCodes.functionArgumentError`

Optional error code to throw if assertion fails.

## Returns

`asserts context is DexContext`

## Throws

`DexError` if the context is not provided or is not a valid `DexContext`.

## Defined in

packages/utils/src/exchanges/dexConfigs.ts:170
