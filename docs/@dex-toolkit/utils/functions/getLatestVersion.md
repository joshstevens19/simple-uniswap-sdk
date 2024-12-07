[**@dex-toolkit/utils v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/utils](../README.md) / getLatestVersion

# Function: getLatestVersion()

> **getLatestVersion**(`versions`): `Version`

Finds the highest version from an array of versions using semantic versioning rules.
Accepts both Version objects and VersionTag strings.

## Parameters

• **versions**: (`Version` \| \`$\{number\}-$\{number\}-$\{number\}\`)[]

Array of versions to compare (can mix Version objects and VersionTag strings)

## Returns

`Version`

The highest version as a Version object

## Throws

Error if the versions array is empty

## Defined in

packages/utils/src/utils/version.utils.ts:206
