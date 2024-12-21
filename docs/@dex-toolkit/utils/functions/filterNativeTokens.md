[**@dex-toolkit/utils v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/utils](../README.md) / filterNativeTokens

# Function: filterNativeTokens()

> **filterNativeTokens**(`params`): `Token`[]

Filters out the native currency and native wrapped token from an array of tokens.

## Parameters

• **params**

The parameters required to filter native tokens.

• **params.nativeWrappedTokenInfo**: `NativeWrappedTokenInfo`

The native wrapped token information.

• **params.tokens**: `Token`[]

An array of tokens that may contain the native currency and native wrapped token.

## Returns

`Token`[]

An array of tokens excluding the native currency and native wrapped token.

## Throws

Throws an error if the native currency or wrapped token information is missing.

## Defined in

[packages/utils/src/utils/token.utils.ts:137](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/utils/src/utils/token.utils.ts#L137)
