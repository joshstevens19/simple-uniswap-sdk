[**@dex-toolkit/types v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/types](../README.md) / RouterSenderArgs

# Type Alias: RouterSenderArgs

> **RouterSenderArgs**: `object`

Represents the arguments for the router, including the two tokens and optional trade settings.

## Type declaration

### fromToken

> **fromToken**: [`Token`](Token.md)

The token being exchanged from.

### settings?

> `optional` **settings**: `Partial`\<[`TradeSettings`](TradeSettings.md)\>

(Optional) Settings for the trade such as slippage and deadline.

### toToken

> **toToken**: [`Token`](Token.md)

The token being received.

## Defined in

packages/types/src/router.types.ts:22
