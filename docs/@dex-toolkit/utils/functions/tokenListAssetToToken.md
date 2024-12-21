[**@dex-toolkit/utils v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/utils](../README.md) / tokenListAssetToToken

# Function: tokenListAssetToToken()

> **tokenListAssetToToken**(`asset`, `standard`, `hasFeeOnTransfer`?, `color`?, `backgroundColor`?): `Token`

Converts a `TokenListAsset` object to a `Token` object.

## Parameters

• **asset**: `TokenListAsset`

The `TokenListAsset` object to convert.

• **standard**: `StandardToken`

The token standard (e.g., ERC20, ERC721) to assign to the `Token` object.

• **hasFeeOnTransfer?**: `boolean`

Optional flag to indicate if the token has a fee on transfer.

• **color?**: `string`

Optional color to associate with the token.

• **backgroundColor?**: `string`

Optional background color to associate with the token.

## Returns

`Token`

The converted `Token` object.

## Defined in

[packages/utils/src/utils/token-list.utils.ts:150](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/utils/src/utils/token-list.utils.ts#L150)
