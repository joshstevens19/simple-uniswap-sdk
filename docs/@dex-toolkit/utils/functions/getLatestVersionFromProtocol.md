[**@dex-toolkit/utils v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/utils](../README.md) / getLatestVersionFromProtocol

# Function: getLatestVersionFromProtocol()

> **getLatestVersionFromProtocol**(`protocol`): `Version`

Finds the most recent version from an array of contract details using semantic versioning rules.
Extracts versions from the contract details and compares them to find the highest version number.

## Parameters

• **protocol**: `Record`\<\`$\{number\}-$\{number\}-$\{number\}\`, `ContractDetailsV2` \| `ContractDetailsV3`\>

Object containing contract details with version tags as keys

## Returns

`Version`

The highest version found as a Version object

## Throws

Error if the protocol array is empty

## Defined in

[packages/utils/src/utils/version.utils.ts:229](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/utils/src/utils/version.utils.ts#L229)
