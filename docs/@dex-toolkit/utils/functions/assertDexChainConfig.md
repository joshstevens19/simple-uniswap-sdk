[**@dex-toolkit/utils v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/utils](../README.md) / assertDexChainConfig

# Function: assertDexChainConfig()

> **assertDexChainConfig**(`context`, `errorCode`): `asserts context is DexChainConfig`

Asserts that the provided context is a valid `DexChainConfig`.

## Parameters

• **context**: `any`

The context to check.

• **errorCode**: [`ErrorCodes`](../enumerations/ErrorCodes.md) = `ErrorCodes.functionArgumentError`

Optional error code to throw if assertion fails.

## Returns

`asserts context is DexChainConfig`

## Throws

`DexError` if the context is not provided or is not a valid `DexChainConfig`.

## Defined in

[packages/utils/src/exchanges/dexConfigs.ts:96](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/utils/src/exchanges/dexConfigs.ts#L96)
