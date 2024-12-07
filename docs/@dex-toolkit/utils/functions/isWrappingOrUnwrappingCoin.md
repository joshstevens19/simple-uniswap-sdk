[**@dex-toolkit/utils v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/utils](../README.md) / isWrappingOrUnwrappingCoin

# Function: isWrappingOrUnwrappingCoin()

> **isWrappingOrUnwrappingCoin**(`params`): `boolean`

Determines whether a token swap operation involves wrapping or unwrapping a coin into its native wrapped token.

## Parameters

• **params**

The parameters required to determine if a token swap involves wrapping or unwrapping a coin.

• **params.customNetwork?**: `DexCustomNetwork`

Optional custom network configuration to override the default network settings.

• **params.dexProvider**: `IDexProvider`

The dex provider instance, used to retrieve the network and chain ID.

• **params.fromToken**: `Token`

The token being swapped from, expected to be the native coin.

• **params.toToken**: `Token`

The token being swapped to, expected to be the wrapped version of the native coin.

## Returns

`boolean`

`true` if the swap is a wrapping or unwrapping operation (native coin to wrapped token or wrapped token to native coin), otherwise `false`.

## Throws

If the native currency or wrapped token information is missing for the specified chain ID.

## Defined in

packages/utils/src/utils/wrapped.utils.ts:206
