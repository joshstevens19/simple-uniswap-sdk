[**@dex-toolkit/utils v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/utils](../README.md) / getVersionTagFromVersion

# Function: getVersionTagFromVersion()

> **getVersionTagFromVersion**(`version`): `VersionTag`

Converts a Version object into a standardized version tag string.
Format: "major-minor-patch"

## Parameters

• **version**: `Version`

The version object containing major, minor, and patch numbers

## Returns

`VersionTag`

A string in the format "major-minor-patch"

## Throws

Error if version object is invalid

## Example

```ts
getVersionTagFromVersion({ major: 1, minor: 2, patch: 3 }) // returns "1-2-3"
```

## Defined in

packages/utils/src/utils/version.utils.ts:94
