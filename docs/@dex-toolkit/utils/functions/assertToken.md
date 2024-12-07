[**@dex-toolkit/utils v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/utils](../README.md) / assertToken

# Function: assertToken()

> **assertToken**(`value`, `errorCode`): `asserts value is Token`

Asserts that the provided value is a valid `Token`.

## Parameters

• **value**: `any`

The value to check.

• **errorCode**: [`ErrorCodes`](../enumerations/ErrorCodes.md) = `ErrorCodes.functionArgumentError`

Optional error code to throw if assertion fails.

## Returns

`asserts value is Token`

## Throws

`DexError` if the value is not provided or is not a valid `Token`.

## Defined in

packages/utils/src/utils/token.utils.ts:266
