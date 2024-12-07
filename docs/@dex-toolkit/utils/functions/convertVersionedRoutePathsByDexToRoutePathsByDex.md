[**@dex-toolkit/utils v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/utils](../README.md) / convertVersionedRoutePathsByDexToRoutePathsByDex

# Function: convertVersionedRoutePathsByDexToRoutePathsByDex()

> **convertVersionedRoutePathsByDexToRoutePathsByDex**(`versionedRoutePathsByDex`, `protocol`): `RoutePathsByDex`

Converts a `VersionedRoutePathsByDex` object into a `RoutePathsByDex` object by selecting the route paths
from the specified DEX protocol (v2 or v3) for each DEX type.

## Parameters

• **versionedRoutePathsByDex**: `VersionedRoutePathsByDex`

The `VersionedRoutePathsByDex` object containing route paths categorized by DEX type and protocol.

• **protocol**: `DexProtocol`

The protocol of the DEX (v2, v3, etc.).

## Returns

`RoutePathsByDex`

A `RoutePathsByDex` object where route paths for the specified DEX protocol are selected for each DEX type.

## Defined in

packages/utils/src/utils/router.utils.ts:183
