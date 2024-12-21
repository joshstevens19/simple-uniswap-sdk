[**@dex-toolkit/utils v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/utils](../README.md) / sortRouteQuotes

# Function: sortRouteQuotes()

> **sortRouteQuotes**(`params`): `RouteQuote`[]

Sorts the route quotes based on the trade direction.

## Parameters

• **params**

The parameters required to sort the route quotes.

• **params.routeQuotes**: `RouteQuote`[]

The route quotes to sort.

• **params.tradeDirection**: `TradeDirection`

The trade direction.

## Returns

`RouteQuote`[]

The sorted route quotes from best quote to worst quote

## Throws

If the route quotes or trade direction is not provided.

## Defined in

[packages/utils/src/utils/trade.utils.ts:263](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/utils/src/utils/trade.utils.ts#L263)
