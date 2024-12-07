[**@dex-toolkit/provider v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/provider](../README.md) / parseDexProviderFromContext

# Function: parseDexProviderFromContext()

> **parseDexProviderFromContext**(`dexProviderContext`): [`DexProvider`](../classes/DexProvider.md)

Parses the given `dexContext` and returns an instance of `DexProvider`.

- If the context already contains an `IDexProvider`, it is returned as is.
- If the context includes a chain ID and optional custom network or RPC URL, a new `DexProvider`
  is created for that chain.
- If the context includes an `ethersProvider`, a new `DexProvider` is created using that provider.

## Parameters

• **dexProviderContext**: `DexMulticallProviderContext`

The context which can either be an object with a `dexProvider`, or a `ProviderContext`.

## Returns

[`DexProvider`](../classes/DexProvider.md)

An instance of `DexProvider` based on the provided context.

## Throws

DexError - Throws an error if the `dexContext` is not supported, or if the chain ID provided is unsupported.

## Defined in

packages/provider/src/dex-provider.ts:266
