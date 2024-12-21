[**@dex-toolkit/utils v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/utils](../README.md) / isVersionInRange

# Function: isVersionInRange()

> **isVersionInRange**(`version`, `range`): `boolean`

Checks if a version falls within a version range (inclusive).

## Parameters

• **version**: `Version` \| \`$\{number\}-$\{number\}-$\{number\}\`

Version to check

• **range**

Object containing min and max versions

• **range.max**: `Version` \| \`$\{number\}-$\{number\}-$\{number\}\`

• **range.min**: `Version` \| \`$\{number\}-$\{number\}-$\{number\}\`

## Returns

`boolean`

True if version is within range, false otherwise

## Defined in

[packages/utils/src/utils/version.utils.ts:337](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/utils/src/utils/version.utils.ts#L337)
