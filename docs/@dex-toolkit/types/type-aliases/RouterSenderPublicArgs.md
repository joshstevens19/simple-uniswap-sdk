[**@dex-toolkit/types v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/types](../README.md) / RouterSenderPublicArgs

# Type Alias: RouterSenderPublicArgs

> **RouterSenderPublicArgs**: `object`

Represents the public arguments for the router using their addresses instead of token objects.

## Type declaration

### fromTokenAddress

> **fromTokenAddress**: `Address`

The address of the token being exchanged from.

### settings?

> `optional` **settings**: `Partial`\<[`TradeSettings`](TradeSettings.md)\>

(Optional) Settings for the trade such as slippage and deadline.

### toTokenAddress

> **toTokenAddress**: `Address`

The address of the token being received.

## Defined in

[packages/types/src/router.types.ts:34](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/router.types.ts#L34)
