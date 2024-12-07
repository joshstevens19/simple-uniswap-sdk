[**@dex-toolkit/utils v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/utils](../README.md) / isUnwrappingCoin

# Function: isUnwrappingCoin()

> **isUnwrappingCoin**(`params`): `boolean`

Determines whether a token swap operation involves unwrapping a native wrapped token into its native coin.

## Parameters

• **params**

The parameters required to determine if a token swap involves unwrapping a native wrapped token.

• **params.customNetwork?**: `DexCustomNetwork`

Optional custom network configuration to override the default network settings.

• **params.dexProvider**: `IDexProvider`

The dex provider instance, used to retrieve the network and chain ID.

• **params.fromToken**: `Token`

The token being swapped from, expected to be the wrapped version of the native coin.

• **params.toToken**: `Token`

The token being swapped to, expected to be the native coin.

## Returns

`boolean`

`true` if the swap is an unwrapping operation (wrapped token to native coin), otherwise `false`.

## Throws

If the native currency or wrapped token information is missing for the specified chain ID.

## Defined in

packages/utils/src/utils/wrapped.utils.ts:145
