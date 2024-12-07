[**@dex-toolkit/types v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/types](../README.md) / BestRouteQuoteContext

# Type Alias: BestRouteQuoteContext

> **BestRouteQuoteContext**: `object`

Represents the context of the best route quote in a trade, including all attempted route quotes, balance, and allowance information.

## Type declaration

### allowance

> **allowance**: [`IDexNumber`](../interfaces/IDexNumber.md)

The current allowance for the trade.

### attemptedRouteQuotes

> **attemptedRouteQuotes**: [`RouteQuotesByDex`](RouteQuotesByDex.md)

All route quotes attempted for the trade, categorized by DEX.

### bestRouteQuote

> **bestRouteQuote**: [`RouteQuote`](RouteQuote.md)

The best route quote selected for the trade.

### fromBalance

> **fromBalance**: [`IDexNumber`](../interfaces/IDexNumber.md)

The balance of the token being traded from.

### fromValue?

> `optional` **fromValue**: `number`

The value of the token being traded from, in a fiat or other currency.

### hasEnoughAllowance

> **hasEnoughAllowance**: `boolean`

Whether the allowance is sufficient for the trade.

### hasEnoughBalance

> **hasEnoughBalance**: `boolean`

Whether the balance is sufficient for the trade.

### isMaxAllowance

> **isMaxAllowance**: `boolean`

Whether the token has the maximum allowance

### toBalance

> **toBalance**: [`IDexNumber`](../interfaces/IDexNumber.md)

The balance of the token being traded to.

### toValue?

> `optional` **toValue**: `number`

The value of the token being traded to, in a fiat or other currency.

## Defined in

packages/types/src/router.types.ts:97
