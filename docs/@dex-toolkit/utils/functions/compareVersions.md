[**@dex-toolkit/utils v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/utils](../README.md) / compareVersions

# Function: compareVersions()

> **compareVersions**(`versionA`, `versionB`): `number`

Compares version strings or objects according to semver rules.
Returns negative if versionA < versionB, 0 if equal, positive if versionA > versionB

## Parameters

• **versionA**: `Version` \| \`$\{number\}-$\{number\}-$\{number\}\`

First version to compare

• **versionB**: `Version` \| \`$\{number\}-$\{number\}-$\{number\}\`

Second version to compare

## Returns

`number`

Negative number if versionA < versionB, 0 if equal, positive if versionA > versionB

## Defined in

[packages/utils/src/utils/version.utils.ts:249](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/utils/src/utils/version.utils.ts#L249)
