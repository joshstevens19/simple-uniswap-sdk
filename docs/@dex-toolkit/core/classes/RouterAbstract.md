[**@dex-toolkit/core v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/core](../README.md) / RouterAbstract

# Class: `abstract` RouterAbstract\<TFormat\>

## Extended by

- [`RouterProtocolAbstract`](RouterProtocolAbstract.md)
- [`Router`](Router.md)

## Type Parameters

• **TFormat** *extends* `TradeFormat`

## Constructors

### new RouterAbstract()

> **new RouterAbstract**\<`TFormat`\>(`__namedParameters`): [`RouterAbstract`](RouterAbstract.md)\<`TFormat`\>

#### Parameters

• **\_\_namedParameters**: `RouterInternalArgs`\<`TFormat`\>

#### Returns

[`RouterAbstract`](RouterAbstract.md)\<`TFormat`\>

#### Defined in

packages/core/src/router/router.abstract.ts:88

## Properties

### \_dexConfigsByDex

> `protected` **\_dexConfigsByDex**: `DexConfigsByDex`

#### Defined in

packages/core/src/router/router.abstract.ts:82

***

### \_dexProvider

> `protected` **\_dexProvider**: `DexProvider`

#### Defined in

packages/core/src/router/router.abstract.ts:78

***

### \_fromToken

> `protected` **\_fromToken**: `Token`

#### Defined in

packages/core/src/router/router.abstract.ts:68

***

### \_multiPriceContext

> `protected` **\_multiPriceContext**: `MultiPriceContext`

#### Defined in

packages/core/src/router/router.abstract.ts:84

***

### \_nativeCurrencyInfo

> `protected` **\_nativeCurrencyInfo**: `NativeCurrencyInfo`

#### Defined in

packages/core/src/router/router.abstract.ts:72

***

### \_nativeWrappedTokenInfo

> `protected` **\_nativeWrappedTokenInfo**: `NativeWrappedTokenInfo`

#### Defined in

packages/core/src/router/router.abstract.ts:74

***

### \_settings

> `protected` **\_settings**: `TradeSettings`

#### Defined in

packages/core/src/router/router.abstract.ts:80

***

### \_toToken

> `protected` **\_toToken**: `Token`

#### Defined in

packages/core/src/router/router.abstract.ts:70

***

### \_tokensFactory

> `protected` **\_tokensFactory**: [`Tokens`](Tokens.md)

#### Defined in

packages/core/src/router/router.abstract.ts:86

***

### \_walletAddress

> `protected` **\_walletAddress**: `string`

#### Defined in

packages/core/src/router/router.abstract.ts:66

***

### \_wrappedContract

> `protected` **\_wrappedContract**: `WrappedContract`

#### Defined in

packages/core/src/router/router.abstract.ts:76

## Accessors

### allPairs

> `get` `protected` **allPairs**(): `Token`[][][]

Retrieves all possible pairs for the trade.

#### Returns

`Token`[][][]

An array of all possible pairs for the trade.

#### Defined in

packages/core/src/router/router.abstract.ts:943

***

### allTokens

> `get` `protected` **allTokens**(): `Token`[]

Retrieves all tokens including the `fromToken`, `toToken`, and the base tokens.

#### Returns

`Token`[]

An array of all tokens including the `fromToken`, `toToken`, and the base tokens.

#### Defined in

packages/core/src/router/router.abstract.ts:896

***

### dexConfigsByDex

> `get` **dexConfigsByDex**(): `DexConfigsByDex`

Retrieves the dex configs by dex type.

#### Returns

`DexConfigsByDex`

The dex configs by dex type.

#### Defined in

packages/core/src/router/router.abstract.ts:273

***

### dexProvider

> `get` **dexProvider**(): `DexProvider`

Get the dex provider

#### Returns

`DexProvider`

#### Defined in

packages/core/src/router/router.abstract.ts:246

***

### fromPairs

> `get` `protected` **fromPairs**(): `Token`[][]

Generates all possible pairs involving the `fromToken` and the base tokens.

#### Returns

`Token`[][]

A two-dimensional array where each sub-array is a pair involving the `fromToken`.

#### Defined in

packages/core/src/router/router.abstract.ts:1000

***

### fromToken

> `get` **fromToken**(): `Token`

Get the from token

#### Returns

`Token`

#### Defined in

packages/core/src/router/router.abstract.ts:218

***

### intermediatePairs

> `get` `protected` **intermediatePairs**(): `Token`[][][]

Generates all possible token pairs from the base tokens.

#### Returns

`Token`[][][]

A three-dimensional array where each sub-array contains pairs of tokens.

#### Defined in

packages/core/src/router/router.abstract.ts:959

***

### nativeCurrency

> `get` **nativeCurrency**(): `NativeCurrencyInfo`

Retrieves the native currency information for the current network.

#### Returns

`NativeCurrencyInfo`

The native currency information.

#### Defined in

packages/core/src/router/router.abstract.ts:264

***

### nativeWrappedTokenInfo

> `get` **nativeWrappedTokenInfo**(): `NativeWrappedTokenInfo`

Retrieves the native wrapped token information for the current network.

#### Returns

`NativeWrappedTokenInfo`

The native wrapped token information.

#### Defined in

packages/core/src/router/router.abstract.ts:255

***

### toPairs

> `get` `protected` **toPairs**(): `Token`[][]

Generates all possible pairs involving the `toToken` and the base tokens.

#### Returns

`Token`[][]

A two-dimensional array where each sub-array is a pair involving the `toToken`.

#### Defined in

packages/core/src/router/router.abstract.ts:1041

***

### toToken

> `get` **toToken**(): `Token`

Get the to token

#### Returns

`Token`

#### Defined in

packages/core/src/router/router.abstract.ts:225

***

### tokenList

> `get` **tokenList**(): `undefined` \| [`TokenList`](TokenList.md)

Get the token list factory

#### Returns

`undefined` \| [`TokenList`](TokenList.md)

#### Defined in

packages/core/src/router/router.abstract.ts:239

***

### tokensFactory

> `get` **tokensFactory**(): [`Tokens`](Tokens.md)

Get the tokens factory

#### Returns

[`Tokens`](Tokens.md)

#### Defined in

packages/core/src/router/router.abstract.ts:232

***

### tradePath

> `get` **tradePath**(): `TradePath`

Get the trade path

#### Returns

`TradePath`

#### Defined in

packages/core/src/router/router.abstract.ts:280

## Methods

### allBaseTokens()

> `protected` **allBaseTokens**(`params`): `Token`[]

Retrieves the base tokens, optionally including the native wrapped token.

#### Parameters

• **params**

The parameters required to retrieve the base tokens.

• **params.includeWrappedToken**: `boolean`

If true, the native wrapped token is included in the result.

#### Returns

`Token`[]

An array of base tokens, optionally including the native wrapped token.

#### Defined in

packages/core/src/router/router.abstract.ts:912

***

### buildRouteQuoteForCoinToWrapped()

> `protected` **buildRouteQuoteForCoinToWrapped**(`params`): `RouteQuote`

Build up a route quote for coin > wrapped

#### Parameters

• **params**

The parameters required to build the route quote.

• **params.routeContext**: `RoutePath`

The route context.

• **params.tokenAmount**: `DexNumber`

The amount to trade.

• **params.tradeDirection**: `TradeDirection`

The trade direction.

#### Returns

`RouteQuote`

A promise that resolves to a `RouteQuote` object representing the route quote.

#### Defined in

packages/core/src/router/router.abstract.ts:377

***

### buildRouteQuoteForWrappedToCoin()

> `protected` **buildRouteQuoteForWrappedToCoin**(`params`): `RouteQuote`

Build up a route quote for wrapped > coin

#### Parameters

• **params**

The parameters required to build the route quote.

• **params.routeContext**: `RoutePath`

The route context.

• **params.tokenAmount**: `DexNumber`

The amount to trade.

• **params.tradeDirection**: `TradeDirection`

The trade direction.

#### Returns

`RouteQuote`

A promise that resolves to a `RouteQuote` object representing the route quote.

#### Defined in

packages/core/src/router/router.abstract.ts:432

***

### buildUpTransactionCoinToWrapped()

> `protected` **buildUpTransactionCoinToWrapped**(`params`): `DexTransaction`

Build up a transaction for wrapped

#### Parameters

• **params**

The parameters required to build the transaction.

• **params.coinAmount**: `DexNumber`

The coin value.

• **params.data**: `string`

The data.

#### Returns

`DexTransaction`

A `DexTransaction` object representing the transaction.

#### Defined in

packages/core/src/router/router.abstract.ts:304

***

### buildUpTransactionWrappedToCoin()

> `protected` **buildUpTransactionWrappedToCoin**(`data`): `DexTransaction`

Build up a transaction for wrapped

#### Parameters

• **data**: `string`

The data

#### Returns

`DexTransaction`

A `DexTransaction` object representing the transaction.

#### Defined in

packages/core/src/router/router.abstract.ts:345

***

### filterRouteQuotesWithTransactionFees()

> `protected` **filterRouteQuotesWithTransactionFees**(`params`): `Promise`\<`RouteQuote`[]\>

Filters route quotes by incorporating transaction fees to determine the most cost-effective trade in fiat value.

#### Parameters

• **params**

An object containing the necessary parameters to filter route quotes.

• **params.allRouteQuotes**: `RouteQuote`[]

An array of all possible route quotes for the trade.

• **params.fromTokenInfo**: `AllowanceAndBalanceOf`\<`"dexnumber"`\>

Balance and allowance info for the from token.

• **params.tokenPrices**: `Record`\<`string`, `number`\>

A record of token prices.

#### Returns

`Promise`\<`RouteQuote`[]\>

A promise that resolves to an array of `RouteQuote` objects, sorted by the most cost-effective routes after considering transaction fees.

#### Defined in

packages/core/src/router/router.abstract.ts:631

***

### findBestRouteQuote()

> **findBestRouteQuote**(`params`): `Promise`\<`BestRouteQuoteContext`\>

Find the best route rate out of all the route quotes

#### Parameters

• **params**

The parameters required to find the best route quote.

• **params.tokenAmount**: `DexNumber`

The amount to trade.

• **params.tradeDirection**: `TradeDirection` = `tradeDirectionMap.input`

The direction you want to get the quote from.

#### Returns

`Promise`\<`BestRouteQuoteContext`\>

A promise that resolves to a `BestRouteQuoteContext` object containing the best route quote, allowance, and all possible routes with quotes.

#### Defined in

packages/core/src/router/router.abstract.ts:507

***

### generatePairsForToken()

> `protected` **generatePairsForToken**(`params`): `Token`[][]

Generates all possible token pairs for a given token from a list of base tokens.

#### Parameters

• **params**

The parameters required to generate token pairs.

• **params.baseTokens**: `Token`[]

An array of tokens to be paired with the given token.

• **params.token**: `Token`

The token for which pairs are to be generated.

#### Returns

`Token`[][]

A two-dimensional array where each sub-array is a pair of tokens.

#### Defined in

packages/core/src/router/router.abstract.ts:875

***

### getBestRouteQuotesHops()

> `protected` **getBestRouteQuotesHops**(`params`): `RouteQuote`[]

Work out the best route quote hops aka the best direct, the best 3 hop and the best 4 hop

#### Parameters

• **params**

The parameters required to get the best route quotes.

• **params.allRouteQuotes**: `RouteQuote`[]

All the routes.

• **params.fromTokenInfo**: `AllowanceAndBalanceOf`\<`"dexnumber"`\>

Balance and allowance info for the from token.

#### Returns

`RouteQuote`[]

An array of `RouteQuote` objects representing the best route quotes.

#### Defined in

packages/core/src/router/router.abstract.ts:734

***

### getCoinBalance()

> **getCoinBalance**\<`TFormat`\>(`format`): `Promise`\<`TradeFormatValue`\<`TFormat`\>\>

Get coin balance

#### Type Parameters

• **TFormat** *extends* `TradeFormat`

#### Parameters

• **format**: `TradeFormatOptions`\<`TFormat`\>

#### Returns

`Promise`\<`TradeFormatValue`\<`TFormat`\>\>

#### Defined in

packages/core/src/router/router.abstract.ts:1084

***

### getFromAndToTokenAllowancesAndBalance()

> `protected` **getFromAndToTokenAllowancesAndBalance**\<`TFormat`\>(`format`): `Promise`\<`MultiTokenAllowancesAndBalance`\<`TFormat`\>\>

Get the allowance and balance for the from and to token (will get balance for coin as well)

#### Type Parameters

• **TFormat** *extends* `TradeFormat`

#### Parameters

• **format**: `TradeFormatOptions`\<`TFormat`\>

The format in which the allowance and balance values are returned.

#### Returns

`Promise`\<`MultiTokenAllowancesAndBalance`\<`TFormat`\>\>

A promise that resolves to an object containing the allowance and balance information for the from and to tokens.

#### Throws

DexError if the from token contract address is not found.

#### Throws

DexError if the to token contract address is not found.

#### Defined in

packages/core/src/router/router.abstract.ts:1191

***

### getFromAndToTokenBalanceAndFromTokenAllowances()

> `protected` **getFromAndToTokenBalanceAndFromTokenAllowances**\<`TFormat`\>(`params`): `Promise`\<`object`\>

Get the balance and allowance for the from and to token (will get balance for coin as well)

#### Type Parameters

• **TFormat** *extends* `TradeFormat`

#### Parameters

• **params**

The parameters required to get the balance and allowance for the from and to token.

• **params.allRouteQuotes**: `RouteQuote`[]

All valid route quotes.

• **params.format**: `TradeFormatOptions`\<`TFormat`\>

The format in which the allowance and balance values are returned.

• **params.tokenAmount**: `DexNumber`

The amount of the from token to be traded.

• **params.tradeDirection**: `TradeDirection`

The trade direction (input or output).

#### Returns

`Promise`\<`object`\>

A promise that resolves to an object containing the balance and allowance information for the from and to tokens.

##### fromTokenInfo

> **fromTokenInfo**: `AllowanceAndBalanceOf`\<`TFormat`\>

##### toTokenInfo

> **toTokenInfo**: `Pick`\<`AllowanceAndBalanceOf`\<`TFormat`\>, `"balanceInfo"`\>

#### Defined in

packages/core/src/router/router.abstract.ts:1243

***

### getPoolReserves()

> `abstract` **getPoolReserves**(`params`): `Promise`\<`PoolReserve`[]\>

Gets the pool reserves for a given token pair and DEX version.

#### Parameters

• **params**

The parameters required to get the pool reserves.

• **params.dexTag**: `string`

The dex tag.

• **params.pairAddresses**: `string`[]

The addresses of each pair in the route.

• **params.versionTag**: \`$\{number\}-$\{number\}-$\{number\}\`

The version tag.

#### Returns

`Promise`\<`PoolReserve`[]\>

A promise that resolves to an array of objects containing the reserves of token0 and token1 for each pair.

#### Defined in

packages/core/src/router/router.abstract.ts:819

***

### getPriceImpact()

> `abstract` **getPriceImpact**(`params`): `Promise`\<`PriceImpactInfo`\>

Executes the main logic to fetch reserves and calculate price impact.

#### Parameters

• **params**

The parameters required to calculate the price impact.

• **params.dexTag**: `string`

The dex tag

• **params.expectedConvertQuote**: `DexNumber`

The expected output amount from the trade.

• **params.liquidityProviderFeePercent**: `number` \| `number`[]

The liquidity provider fee as a percentage.

• **params.pairAddresses**: `string`[]

The addresses of each pair in the route.

• **params.routePathTokens**: `Token`[]

The tokens involved in the route path.

• **params.tokenAmount**: `DexNumber`

The amount of the input token being traded.

#### Returns

`Promise`\<`PriceImpactInfo`\>

A promise that resolves to the price impact percentage as a string.

#### Defined in

packages/core/src/router/router.abstract.ts:846

***

### getRouteQuotes()

> `abstract` **getRouteQuotes**(`params`): `Promise`\<`RouteQuote`[]\>

Get all possible routes with the quotes

#### Parameters

• **params**

The parameters required to get route quotes.

• **params.tokenAmount**: `DexNumber`

The amount to trade.

• **params.tradeDirection**: `TradeDirection`

The direction you want to get the quote from.

#### Returns

`Promise`\<`RouteQuote`[]\>

A promise that resolves to an array of `RouteQuote` objects representing the possible routes with quotes.

#### Defined in

packages/core/src/router/router.abstract.ts:490

***

### getTokenPrices()

> **getTokenPrices**(): `Promise`\<`Record`\<`string`, `number`\>\>

Get the token prices for the from and to tokens, indexed by contract address.

#### Returns

`Promise`\<`Record`\<`string`, `number`\>\>

#### Defined in

packages/core/src/router/router.abstract.ts:1424

***

### hasGotEnoughFromBalance()

> `protected` **hasGotEnoughFromBalance**\<`TFormat`\>(`params`): `TokenBalanceInfo`\<`TFormat`\>

Has got enough balance to do the trade (token check only)

#### Type Parameters

• **TFormat** *extends* `TradeFormat`

#### Parameters

• **params**

The parameters required to check if the balance is enough.

• **params.amount**: `DexNumber`

The amount you want to swap.

• **params.balance**: `DexNumber`

The balance you want to swap.

• **params.format**: `TradeFormatOptions`\<`TFormat`\>

The format in which the balance value is returned.

#### Returns

`TokenBalanceInfo`\<`TFormat`\>

A `TokenBalanceInfo` object containing the balance and a boolean indicating if it has enough balance.

#### Throws

DexError if the amount is not provided.

#### Throws

DexError if the balance is not provided.

#### Defined in

packages/core/src/router/router.abstract.ts:1152

***

### hasGotEnoughFromTokenAllowance()

> `protected` **hasGotEnoughFromTokenAllowance**\<`TFormat`\>(`params`): `TokenAllowanceInfo`\<`TFormat`\>

Has got enough allowance to do the trade

#### Type Parameters

• **TFormat** *extends* `TradeFormat`

#### Parameters

• **params**

The parameters required to check if the allowance is enough.

• **params.allowance**: `DexNumber`

The allowance you want to swap.

• **params.amount**: `DexNumber`

The amount you want to swap.

• **params.format**: `TradeFormatOptions`\<`TFormat`\>

The format in which the allowance value is returned.

#### Returns

`TokenAllowanceInfo`\<`TFormat`\>

A `TokenBalanceInfo` object containing the allowance and a boolean indicating if it has enough allowance.

#### Defined in

packages/core/src/router/router.abstract.ts:1103
