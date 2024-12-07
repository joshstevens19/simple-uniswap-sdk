[**@dex-toolkit/types v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/types](../README.md) / FormatOptions

# Type Alias: FormatOptions

> **FormatOptions**: `object`

Options for formatting a number.

## Type declaration

### decimalPlaces?

> `optional` **decimalPlaces**: `number`

The number of decimal places to display.

### locales?

> `optional` **locales**: `Intl.LocalesArgument`

(Optional) Locale string or array of locales for Intl.NumberFormat.
Only used for `readable` format.
Defaults to 'en'

### roundingMode?

> `optional` **roundingMode**: `BigNumber.RoundingMode`

The rounding mode to use when rounding the number.

## Defined in

packages/types/src/trade.types.ts:233
