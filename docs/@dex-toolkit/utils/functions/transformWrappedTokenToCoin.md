[**@dex-toolkit/utils v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/utils](../README.md) / transformWrappedTokenToCoin

# Function: transformWrappedTokenToCoin()

> **transformWrappedTokenToCoin**(`token`, `nativeCurrencyInfo`?): `Token`

Transforms a wrapped token into its coin representation by modifying its contract address and optionally
updating its symbol and name to match the native currency info.

## Parameters

• **token**: `Token`

The wrapped token to transform.

• **nativeCurrencyInfo?**: `NativeCurrencyInfo`

Optional native currency information to use for updating the token's symbol and name.

## Returns

`Token`

A new token object representing the coin.

## Throws

DexError if the token's chain ID is not natively supported or if the native currency cannot be found.

## Defined in

packages/utils/src/utils/wrapped.utils.ts:27
