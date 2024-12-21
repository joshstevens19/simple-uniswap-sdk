[**@dex-toolkit/core v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/core](../README.md) / parseTokenListFromTokenListContext

# Function: parseTokenListFromTokenListContext()

> **parseTokenListFromTokenListContext**(`params`): [`TokenList`](../classes/TokenList.md) \| `undefined`

Parses the `TokenListContext` and creates an instance of `TokenList` or returns the provided `ITokenList` instance.

## Parameters

• **params**

The parameters required to parse the token list.

• **params.dexProvider**: `DexProvider`

The `DexProvider` instance providing network details and custom network configuration.

• **params.tokenListContext?**: `TokenListContext`

The context for the token list. It can be:
- An instance of `ITokenList`.
- An array of `TokenListSource` objects.
- `undefined` to disable the token list.

## Returns

[`TokenList`](../classes/TokenList.md) \| `undefined`

An instance of `TokenList` if the context is valid, or `undefined` if the token list is disabled.

## Defined in

[packages/core/src/token-list.ts:192](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/core/src/token-list.ts#L192)
