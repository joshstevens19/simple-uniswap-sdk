[**@dex-toolkit/utils v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/utils](../README.md) / formatVersionForDisplay

# Function: formatVersionForDisplay()

> **formatVersionForDisplay**(`version`): `string`

Formats a version for display in logs and error messages using dot notation.
Converts either a Version object or VersionTag string into the format "major.minor.patch".

## Parameters

• **version**: `Version` \| \`$\{number\}-$\{number\}-$\{number\}\`

Version to format (Version object or VersionTag string)

## Returns

`string`

A string in the format "major.minor.patch"

## Example

```ts
formatVersionForDisplay({ major: 1, minor: 2, patch: 3 }) // returns "1.2.3"
formatVersionForDisplay("1-2-3") // returns "1.2.3"

// Usage in error messages:
throw new DexError(
  `Fee not found for dexTag ${dexTag} and version ${formatVersionForDisplay(version)}`,
  ErrorCodes.internalError
)
```

## Defined in

packages/utils/src/utils/version.utils.ts:365
