[**@dex-toolkit/utils v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/utils](../README.md) / isSameVersion

# Function: isSameVersion()

> **isSameVersion**(`versionA`, `versionB`): `boolean`

Compares two versions for equality. Accepts both Version objects and VersionTag strings.
Versions are considered equal if all their components (major, minor, patch) match.

## Parameters

• **versionA**: `Version` \| \`$\{number\}-$\{number\}-$\{number\}\`

First version to compare (Version object or VersionTag string)

• **versionB**: `Version` \| \`$\{number\}-$\{number\}-$\{number\}\`

Second version to compare (Version object or VersionTag string)

## Returns

`boolean`

True if versions are identical, false otherwise

## Example

```ts
isSameVersion({ major: 1, minor: 0, patch: 0 }, "1-0-0") // returns true
isSameVersion("1-0-0", "1-0-1") // returns false
```

## Defined in

[packages/utils/src/utils/version.utils.ts:159](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/utils/src/utils/version.utils.ts#L159)
