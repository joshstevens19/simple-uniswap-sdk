[**@dex-toolkit/utils v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/utils](../README.md) / normalizeTokenAttributes

# Function: normalizeTokenAttributes()

> **normalizeTokenAttributes**(`token`): `Token`

Normalizes token attributes: name, symbol, and decimals.
- Converts decimals to a plain number.
- Decodes hex strings for name and symbol.

## Parameters

• **token**: `Token`

The token object with attributes to normalize.

## Returns

`Token`

A token object with normalized name, symbol, and decimals.

## Defined in

[packages/utils/src/utils/token.utils.ts:80](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/utils/src/utils/token.utils.ts#L80)
