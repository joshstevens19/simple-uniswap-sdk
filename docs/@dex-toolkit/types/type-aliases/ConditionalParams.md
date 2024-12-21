[**@dex-toolkit/types v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/types](../README.md) / ConditionalParams

# Type Alias: ConditionalParams\<TOption\>

> **ConditionalParams**\<`TOption`\>: `TOption` *extends* [`TokenCallOption`](TokenCallOption.md)[] ? `"balanceOf"` *extends* `TOption`\[`number`\] ? `object` : `object` & `"allowance"` *extends* `TOption`\[`number`\] ? `object` : `object` : `never`

Defines additional parameters required based on which token call options are included.
Adds wallet address for balance checks and router/protocol details for allowance checks.

## Type Parameters

• **TOption** *extends* [`TokenCallOption`](TokenCallOption.md)[]

Array of token call options

## Defined in

[packages/types/src/token-multicall.types.ts:102](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/token-multicall.types.ts#L102)
