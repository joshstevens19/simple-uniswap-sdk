[**@dex-toolkit/utils v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/utils](../README.md) / isVersionGreaterThan

# Function: isVersionGreaterThan()

> **isVersionGreaterThan**(`versionA`, `versionB`): `boolean`

Checks if one version is greater than another using semantic versioning rules.
Accepts both Version objects and VersionTag strings.

## Parameters

• **versionA**: `Version` \| \`$\{number\}-$\{number\}-$\{number\}\`

Version to check if greater (Version object or VersionTag string)

• **versionB**: `Version` \| \`$\{number\}-$\{number\}-$\{number\}\`

Version to check against (Version object or VersionTag string)

## Returns

`boolean`

True if versionA is greater than versionB, false otherwise

## Defined in

packages/utils/src/utils/version.utils.ts:181
