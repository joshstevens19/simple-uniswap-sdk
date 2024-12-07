[**@dex-toolkit/utils v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/utils](../README.md) / getVersionFromVersionTag

# Function: getVersionFromVersionTag()

> **getVersionFromVersionTag**(`versionTag`): `Version`

Converts a version tag string into a Version object.
Format: "major-minor-patch"

## Parameters

• **versionTag**: \`$\{number\}-$\{number\}-$\{number\}\`

The version tag string in the format "major-minor-patch"

## Returns

`Version`

A Version object containing major, minor, and patch numbers

## Throws

Error if version tag is invalid

## Example

```ts
getVersionFromVersionTag("1-2-3") // returns { major: 1, minor: 2, patch: 3 }
```

## Defined in

packages/utils/src/utils/version.utils.ts:112
