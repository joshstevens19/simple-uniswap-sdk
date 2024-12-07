[**@dex-toolkit/types v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/types](../README.md) / RoutePath

# Type Alias: RoutePath

> **RoutePath**: `object`

Represents a route path in a trade, including the tokens and pair addresses involved.

## Type declaration

### dexTag

> **dexTag**: [`DexTag`](DexTag.md)

The DEX tag representing the decentralized exchange. Undefined when wrapping/unwrapping tokens.

### liquidityProviderFeePercent

> **liquidityProviderFeePercent**: `number` \| `number`[]

The percentage of the liquidity provider fee.

### pairAddresses

> **pairAddresses**: `Address`[]

The addresses of the pairs involved in the route.

### protocol

> **protocol**: [`DexProtocol`](DexProtocol.md)

The protocol of the DEX used for the quote. Undefined when wrapping/unwrapping tokens.

### route

> **route**: [`Token`](Token.md)[]

The tokens involved in the route.

### version

> **version**: [`Version`](Version.md)

The version of the DEX used for the quote. Undefined when wrapping/unwrapping tokens.

## Defined in

packages/types/src/router.types.ts:147
