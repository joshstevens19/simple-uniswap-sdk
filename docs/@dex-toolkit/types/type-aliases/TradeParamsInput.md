[**@dex-toolkit/types v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/types](../README.md) / TradeParamsInput

# Type Alias: TradeParamsInput

> **TradeParamsInput**: `object`

Trade parameters for input direction

## Type declaration

### direction

> **direction**: `"input"`

The direction of the trade (input).
When `direction` is "input", the `fromAmount` is provided, and the output token amount will be calculated.

### fromAmount

> **fromAmount**: [`TradeParamsAmount`](TradeParamsAmount.md)

The amount of tokens to trade as input.
This value should be provided as a string (e.g., '1.23').

## Defined in

packages/types/src/trade.types.ts:137
