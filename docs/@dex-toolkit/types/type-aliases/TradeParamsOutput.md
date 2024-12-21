[**@dex-toolkit/types v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/types](../README.md) / TradeParamsOutput

# Type Alias: TradeParamsOutput

> **TradeParamsOutput**: `object`

Trade parameters for output direction

## Type declaration

### direction

> **direction**: `"output"`

The direction of the trade (output).
When `direction` is "output", the `toAmount` is provided, and the input token amount will be calculated.

### toAmount

> **toAmount**: [`TradeParamsAmount`](TradeParamsAmount.md)

The amount of tokens to receive as output.
This value should be provided as a string (e.g., '1.23').

## Defined in

[packages/types/src/trade.types.ts:151](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/trade.types.ts#L151)
