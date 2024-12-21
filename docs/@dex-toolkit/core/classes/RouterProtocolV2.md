[**@dex-toolkit/core v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/core](../README.md) / RouterProtocolV2

# Class: RouterProtocolV2\<TFormat\>

## Extends

- [`RouterProtocolAbstract`](RouterProtocolAbstract.md)\<`TFormat`\>

## Type Parameters

• **TFormat** *extends* `TradeFormat`

## Constructors

### new RouterProtocolV2()

> **new RouterProtocolV2**\<`TFormat`\>(`context`): [`RouterProtocolV2`](RouterProtocolV2.md)\<`TFormat`\>

#### Parameters

• **context**: `TradeInternalArgs`\<`TFormat`\>

#### Returns

[`RouterProtocolV2`](RouterProtocolV2.md)\<`TFormat`\>

#### Overrides

[`RouterProtocolAbstract`](RouterProtocolAbstract.md).[`constructor`](RouterProtocolAbstract.md#constructors)

#### Defined in

[packages/core/src/router/router.protocol.v2.ts:82](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/core/src/router/router.protocol.v2.ts#L82)

## Properties

### \_dexConfigsByDex

> `protected` **\_dexConfigsByDex**: `DexConfigsByDex`

#### Inherited from

[`RouterProtocolAbstract`](RouterProtocolAbstract.md).[`_dexConfigsByDex`](RouterProtocolAbstract.md#_dexconfigsbydex)

#### Defined in

[packages/core/src/router/router.abstract.ts:82](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/core/src/router/router.abstract.ts#L82)

***

### \_dexProvider

> `protected` **\_dexProvider**: `DexProvider`

#### Inherited from

[`RouterProtocolAbstract`](RouterProtocolAbstract.md).[`_dexProvider`](RouterProtocolAbstract.md#_dexprovider)

#### Defined in

[packages/core/src/router/router.abstract.ts:78](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/core/src/router/router.abstract.ts#L78)

***

### \_factoryContractByDex

> `protected` **\_factoryContractByDex**: `Record`\<`string`, `Record`\<\`$\{number\}-$\{number\}-$\{number\}\`, `FactoryContractV2`\>\> = `{}`

#### Defined in

[packages/core/src/router/router.protocol.v2.ts:77](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/core/src/router/router.protocol.v2.ts#L77)

***

### \_fromToken

> `protected` **\_fromToken**: `Token`

#### Inherited from

[`RouterProtocolAbstract`](RouterProtocolAbstract.md).[`_fromToken`](RouterProtocolAbstract.md#_fromtoken)

#### Defined in

[packages/core/src/router/router.abstract.ts:68](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/core/src/router/router.abstract.ts#L68)

***

### \_liquidityProviderFeeByDex

> `protected` **\_liquidityProviderFeeByDex**: `Record`\<`string`, `Record`\<\`$\{number\}-$\{number\}-$\{number\}\`, `number`\>\> = `{}`

#### Defined in

[packages/core/src/router/router.protocol.v2.ts:67](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/core/src/router/router.protocol.v2.ts#L67)

***

### \_multiPriceContext

> `protected` **\_multiPriceContext**: `MultiPriceContext`

#### Inherited from

[`RouterProtocolAbstract`](RouterProtocolAbstract.md).[`_multiPriceContext`](RouterProtocolAbstract.md#_multipricecontext)

#### Defined in

[packages/core/src/router/router.abstract.ts:84](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/core/src/router/router.abstract.ts#L84)

***

### \_nativeCurrencyInfo

> `protected` **\_nativeCurrencyInfo**: `NativeCurrencyInfo`

#### Inherited from

[`RouterProtocolAbstract`](RouterProtocolAbstract.md).[`_nativeCurrencyInfo`](RouterProtocolAbstract.md#_nativecurrencyinfo)

#### Defined in

[packages/core/src/router/router.abstract.ts:72](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/core/src/router/router.abstract.ts#L72)

***

### \_nativeWrappedTokenInfo

> `protected` **\_nativeWrappedTokenInfo**: `NativeWrappedTokenInfo`

#### Inherited from

[`RouterProtocolAbstract`](RouterProtocolAbstract.md).[`_nativeWrappedTokenInfo`](RouterProtocolAbstract.md#_nativewrappedtokeninfo)

#### Defined in

[packages/core/src/router/router.abstract.ts:74](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/core/src/router/router.abstract.ts#L74)

***

### \_routerContractByDex

> `protected` **\_routerContractByDex**: `Record`\<`string`, `Record`\<\`$\{number\}-$\{number\}-$\{number\}\`, `RouterContractV2`\>\> = `{}`

#### Defined in

[packages/core/src/router/router.protocol.v2.ts:72](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/core/src/router/router.protocol.v2.ts#L72)

***

### \_settings

> `protected` **\_settings**: `TradeSettings`

#### Inherited from

[`RouterProtocolAbstract`](RouterProtocolAbstract.md).[`_settings`](RouterProtocolAbstract.md#_settings)

#### Defined in

[packages/core/src/router/router.abstract.ts:80](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/core/src/router/router.abstract.ts#L80)

***

### \_toToken

> `protected` **\_toToken**: `Token`

#### Inherited from

[`RouterProtocolAbstract`](RouterProtocolAbstract.md).[`_toToken`](RouterProtocolAbstract.md#_totoken)

#### Defined in

[packages/core/src/router/router.abstract.ts:70](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/core/src/router/router.abstract.ts#L70)

***

### \_tokensFactory

> `protected` **\_tokensFactory**: [`Tokens`](Tokens.md)

#### Inherited from

[`RouterProtocolAbstract`](RouterProtocolAbstract.md).[`_tokensFactory`](RouterProtocolAbstract.md#_tokensfactory)

#### Defined in

[packages/core/src/router/router.abstract.ts:86](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/core/src/router/router.abstract.ts#L86)

***

### \_walletAddress

> `protected` **\_walletAddress**: `string`

#### Inherited from

[`RouterProtocolAbstract`](RouterProtocolAbstract.md).[`_walletAddress`](RouterProtocolAbstract.md#_walletaddress)

#### Defined in

[packages/core/src/router/router.abstract.ts:66](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/core/src/router/router.abstract.ts#L66)

***

### \_wrappedContract

> `protected` **\_wrappedContract**: `WrappedContract`

#### Inherited from

[`RouterProtocolAbstract`](RouterProtocolAbstract.md).[`_wrappedContract`](RouterProtocolAbstract.md#_wrappedcontract)

#### Defined in

[packages/core/src/router/router.abstract.ts:76](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/core/src/router/router.abstract.ts#L76)

## Accessors

### allPairs

> `get` `protected` **allPairs**(): `Token`[][][]

Retrieves all possible pairs for the trade.

#### Returns

`Token`[][][]

An array of all possible pairs for the trade.

#### Inherited from

[`RouterProtocolAbstract`](RouterProtocolAbstract.md).[`allPairs`](RouterProtocolAbstract.md#allpairs)

#### Defined in

[packages/core/src/router/router.abstract.ts:943](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/core/src/router/router.abstract.ts#L943)

***

### allTokens

> `get` `protected` **allTokens**(): `Token`[]

Retrieves all tokens including the `fromToken`, `toToken`, and the base tokens.

#### Returns

`Token`[]

An array of all tokens including the `fromToken`, `toToken`, and the base tokens.

#### Inherited from

[`RouterProtocolAbstract`](RouterProtocolAbstract.md).[`allTokens`](RouterProtocolAbstract.md#alltokens)

#### Defined in

[packages/core/src/router/router.abstract.ts:896](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/core/src/router/router.abstract.ts#L896)

***

### dexConfigsByDex

> `get` **dexConfigsByDex**(): `DexConfigsByDex`

Retrieves the dex configs by dex type.

#### Returns

`DexConfigsByDex`

The dex configs by dex type.

#### Inherited from

[`RouterProtocolAbstract`](RouterProtocolAbstract.md).[`dexConfigsByDex`](RouterProtocolAbstract.md#dexconfigsbydex)

#### Defined in

[packages/core/src/router/router.abstract.ts:273](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/core/src/router/router.abstract.ts#L273)

***

### dexProvider

> `get` **dexProvider**(): `DexProvider`

Get the dex provider

#### Returns

`DexProvider`

#### Inherited from

[`RouterProtocolAbstract`](RouterProtocolAbstract.md).[`dexProvider`](RouterProtocolAbstract.md#dexprovider)

#### Defined in

[packages/core/src/router/router.abstract.ts:246](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/core/src/router/router.abstract.ts#L246)

***

### fromPairs

> `get` `protected` **fromPairs**(): `Token`[][]

Generates all possible pairs involving the `fromToken` and the base tokens.

#### Returns

`Token`[][]

A two-dimensional array where each sub-array is a pair involving the `fromToken`.

#### Inherited from

[`RouterProtocolAbstract`](RouterProtocolAbstract.md).[`fromPairs`](RouterProtocolAbstract.md#frompairs)

#### Defined in

[packages/core/src/router/router.abstract.ts:1000](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/core/src/router/router.abstract.ts#L1000)

***

### fromToken

> `get` **fromToken**(): `Token`

Get the from token

#### Returns

`Token`

#### Inherited from

[`RouterProtocolAbstract`](RouterProtocolAbstract.md).[`fromToken`](RouterProtocolAbstract.md#fromtoken)

#### Defined in

[packages/core/src/router/router.abstract.ts:218](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/core/src/router/router.abstract.ts#L218)

***

### intermediatePairs

> `get` `protected` **intermediatePairs**(): `Token`[][][]

Generates all possible token pairs from the base tokens.

#### Returns

`Token`[][][]

A three-dimensional array where each sub-array contains pairs of tokens.

#### Inherited from

[`RouterProtocolAbstract`](RouterProtocolAbstract.md).[`intermediatePairs`](RouterProtocolAbstract.md#intermediatepairs)

#### Defined in

[packages/core/src/router/router.abstract.ts:959](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/core/src/router/router.abstract.ts#L959)

***

### nativeCurrency

> `get` **nativeCurrency**(): `NativeCurrencyInfo`

Retrieves the native currency information for the current network.

#### Returns

`NativeCurrencyInfo`

The native currency information.

#### Inherited from

[`RouterProtocolAbstract`](RouterProtocolAbstract.md).[`nativeCurrency`](RouterProtocolAbstract.md#nativecurrency)

#### Defined in

[packages/core/src/router/router.abstract.ts:264](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/core/src/router/router.abstract.ts#L264)

***

### nativeWrappedTokenInfo

> `get` **nativeWrappedTokenInfo**(): `NativeWrappedTokenInfo`

Retrieves the native wrapped token information for the current network.

#### Returns

`NativeWrappedTokenInfo`

The native wrapped token information.

#### Inherited from

[`RouterProtocolAbstract`](RouterProtocolAbstract.md).[`nativeWrappedTokenInfo`](RouterProtocolAbstract.md#nativewrappedtokeninfo)

#### Defined in

[packages/core/src/router/router.abstract.ts:255](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/core/src/router/router.abstract.ts#L255)

***

### protocol

> `get` **protocol**(): `DexProtocol`

Get the dex protocol

#### Returns

`DexProtocol`

#### Overrides

[`RouterProtocolAbstract`](RouterProtocolAbstract.md).[`protocol`](RouterProtocolAbstract.md#protocol)

#### Defined in

[packages/core/src/router/router.protocol.v2.ts:168](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/core/src/router/router.protocol.v2.ts#L168)

***

### toPairs

> `get` `protected` **toPairs**(): `Token`[][]

Generates all possible pairs involving the `toToken` and the base tokens.

#### Returns

`Token`[][]

A two-dimensional array where each sub-array is a pair involving the `toToken`.

#### Inherited from

[`RouterProtocolAbstract`](RouterProtocolAbstract.md).[`toPairs`](RouterProtocolAbstract.md#topairs)

#### Defined in

[packages/core/src/router/router.abstract.ts:1041](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/core/src/router/router.abstract.ts#L1041)

***

### toToken

> `get` **toToken**(): `Token`

Get the to token

#### Returns

`Token`

#### Inherited from

[`RouterProtocolAbstract`](RouterProtocolAbstract.md).[`toToken`](RouterProtocolAbstract.md#totoken)

#### Defined in

[packages/core/src/router/router.abstract.ts:225](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/core/src/router/router.abstract.ts#L225)

***

### tokenList

> `get` **tokenList**(): `undefined` \| [`TokenList`](TokenList.md)

Get the token list factory

#### Returns

`undefined` \| [`TokenList`](TokenList.md)

#### Inherited from

[`RouterProtocolAbstract`](RouterProtocolAbstract.md).[`tokenList`](RouterProtocolAbstract.md#tokenlist)

#### Defined in

[packages/core/src/router/router.abstract.ts:239](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/core/src/router/router.abstract.ts#L239)

***

### tokensFactory

> `get` **tokensFactory**(): [`Tokens`](Tokens.md)

Get the tokens factory

#### Returns

[`Tokens`](Tokens.md)

#### Inherited from

[`RouterProtocolAbstract`](RouterProtocolAbstract.md).[`tokensFactory`](RouterProtocolAbstract.md#tokensfactory)

#### Defined in

[packages/core/src/router/router.abstract.ts:232](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/core/src/router/router.abstract.ts#L232)

***

### tradePath

> `get` **tradePath**(): `TradePath`

Get the trade path

#### Returns

`TradePath`

#### Inherited from

[`RouterProtocolAbstract`](RouterProtocolAbstract.md).[`tradePath`](RouterProtocolAbstract.md#tradepath)

#### Defined in

[packages/core/src/router/router.abstract.ts:280](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/core/src/router/router.abstract.ts#L280)

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

#### Inherited from

[`RouterProtocolAbstract`](RouterProtocolAbstract.md).[`allBaseTokens`](RouterProtocolAbstract.md#allbasetokens)

#### Defined in

[packages/core/src/router/router.abstract.ts:912](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/core/src/router/router.abstract.ts#L912)

***

### buildRouteQuote()

> **buildRouteQuote**(`params`): `RouteQuote`

Build up the route quote based on the trade path (Token to Token, Coin to Token, or Token to Coin).

#### Parameters

• **params**

The parameters required to build the route quote.

• **params.dexTag**: `string`

The dex tag

• **params.methodCallResult**: `MethodResult`\<`Contract`, `MethodCallUnion`\<`Contract`, `"getAmountsIn"` \| `"getAmountsOut"`\>\>

The call return context

• **params.routeContext**: `RoutePath`

The route context

• **params.tokenAmount**: `DexNumber`

The amount to trade

• **params.tradeDirection**: `TradeDirection`

The direction you want to get the quote from

#### Returns

`RouteQuote`

#### Overrides

[`RouterProtocolAbstract`](RouterProtocolAbstract.md).[`buildRouteQuote`](RouterProtocolAbstract.md#buildroutequote)

#### Defined in

[packages/core/src/router/router.protocol.v2.ts:1078](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/core/src/router/router.protocol.v2.ts#L1078)

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

#### Inherited from

[`RouterProtocolAbstract`](RouterProtocolAbstract.md).[`buildRouteQuoteForCoinToWrapped`](RouterProtocolAbstract.md#buildroutequoteforcointowrapped)

#### Defined in

[packages/core/src/router/router.abstract.ts:377](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/core/src/router/router.abstract.ts#L377)

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

#### Inherited from

[`RouterProtocolAbstract`](RouterProtocolAbstract.md).[`buildRouteQuoteForWrappedToCoin`](RouterProtocolAbstract.md#buildroutequoteforwrappedtocoin)

#### Defined in

[packages/core/src/router/router.abstract.ts:432](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/core/src/router/router.abstract.ts#L432)

***

### buildUpTransactionCoinDirectionFrom()

> `protected` **buildUpTransactionCoinDirectionFrom**(`params`): `DexTransaction`

Build up a transaction for coin from

#### Parameters

• **params**

The parameters required to build the transaction.

• **params.coinAmount**: `DexNumber`

The coin value.

• **params.data**: `string`

The data.

• **params.dexTag**: `string`

The dex tag.

• **params.versionTag**: \`$\{number\}-$\{number\}-$\{number\}\`

The dex version tag.

#### Returns

`DexTransaction`

The transaction.

#### Inherited from

[`RouterProtocolAbstract`](RouterProtocolAbstract.md).[`buildUpTransactionCoinDirectionFrom`](RouterProtocolAbstract.md#builduptransactioncoindirectionfrom)

#### Defined in

[packages/core/src/router/router.protocol.abstract.ts:125](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/core/src/router/router.protocol.abstract.ts#L125)

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

#### Inherited from

[`RouterProtocolAbstract`](RouterProtocolAbstract.md).[`buildUpTransactionCoinToWrapped`](RouterProtocolAbstract.md#builduptransactioncointowrapped)

#### Defined in

[packages/core/src/router/router.abstract.ts:304](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/core/src/router/router.abstract.ts#L304)

***

### buildUpTransactionTokenDirectionFrom()

> `protected` **buildUpTransactionTokenDirectionFrom**(`params`): `DexTransaction`

Build up a transaction for token from

#### Parameters

• **params**

The parameters required to build the transaction.

• **params.data**: `string`

The data.

• **params.dexTag**: `string`

The dex tag.

• **params.versionTag**: \`$\{number\}-$\{number\}-$\{number\}\`

The dex version tag.

#### Returns

`DexTransaction`

The transaction.

#### Inherited from

[`RouterProtocolAbstract`](RouterProtocolAbstract.md).[`buildUpTransactionTokenDirectionFrom`](RouterProtocolAbstract.md#builduptransactiontokendirectionfrom)

#### Defined in

[packages/core/src/router/router.protocol.abstract.ts:67](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/core/src/router/router.protocol.abstract.ts#L67)

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

#### Inherited from

[`RouterProtocolAbstract`](RouterProtocolAbstract.md).[`buildUpTransactionWrappedToCoin`](RouterProtocolAbstract.md#builduptransactionwrappedtocoin)

#### Defined in

[packages/core/src/router/router.abstract.ts:345](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/core/src/router/router.abstract.ts#L345)

***

### encodeTradeData()

> `protected` **encodeTradeData**(`params`): `string`

Generates the trade data for various trade paths and directions.
The trade data is generated based on the provided route context, deadline, trade path, trade direction, and values.

#### Parameters

• **params**

The parameters required to generate the trade data.

• **params.deadline**: `string`

The deadline for the trade to be executed, in UNIX timestamp format.

• **params.dexTag**: `string`

The dex tag.

• **params.fromAmount**: `DexNumber`

The amount for the from token or coin.

• **params.routeQuoteTradeContext**: `RouteQuoteTradeContext`

The context of the route quote trade.

• **params.toAmount**: `DexNumber`

The amount for the to token or coin.

• **params.tradeDirection**: `TradeDirection`

The trade direction, indicating whether the trade is input or output based.

• **params.versionTag**: \`$\{number\}-$\{number\}-$\{number\}\`

The dex version tag.

#### Returns

`string`

The encoded trade data string.

#### Throws

Throws an error if any of the required parameters are missing or if an invalid trade path or direction is provided.

#### Inherited from

[`RouterProtocolAbstract`](RouterProtocolAbstract.md).[`encodeTradeData`](RouterProtocolAbstract.md#encodetradedata)

#### Defined in

[packages/core/src/router/router.protocol.abstract.ts:203](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/core/src/router/router.protocol.abstract.ts#L203)

***

### encodeTradeDataForExactInput()

> **encodeTradeDataForExactInput**(`params`): `string`

Generate trade data

#### Parameters

• **params**

The parameters required to generate the trade data.

• **params.deadline**: `string`

The deadline it expiries unix time.

• **params.dexTag**: `string`

The dex tag.

• **params.fromAmount**: `DexNumber`

The token/coin amount in.

• **params.routeQuoteTradeContext**: `RouteQuoteTradeContext`

The route quote trade context.

• **params.toAmount**: `DexNumber`

The token/coin amount out.

• **params.versionTag**: \`$\{number\}-$\{number\}-$\{number\}\`

The dex version tag.

#### Returns

`string`

#### Overrides

[`RouterProtocolAbstract`](RouterProtocolAbstract.md).[`encodeTradeDataForExactInput`](RouterProtocolAbstract.md#encodetradedataforexactinput)

#### Defined in

[packages/core/src/router/router.protocol.v2.ts:233](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/core/src/router/router.protocol.v2.ts#L233)

***

### encodeTradeDataForExactOutput()

> **encodeTradeDataForExactOutput**(`params`): `string`

Generate trade data

#### Parameters

• **params**

The parameters required to generate the trade data.

• **params.deadline**: `string`

The deadline it expiries unix time.

• **params.dexTag**: `string`

The dex tag.

• **params.fromAmount**: `DexNumber`

The token/coin amount in.

• **params.routeQuoteTradeContext**: `RouteQuoteTradeContext`

The route quote trade context.

• **params.toAmount**: `DexNumber`

The token/coin amount out.

• **params.versionTag**: \`$\{number\}-$\{number\}-$\{number\}\`

The dex version tag.

#### Returns

`string`

#### Overrides

[`RouterProtocolAbstract`](RouterProtocolAbstract.md).[`encodeTradeDataForExactOutput`](RouterProtocolAbstract.md#encodetradedataforexactoutput)

#### Defined in

[packages/core/src/router/router.protocol.v2.ts:364](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/core/src/router/router.protocol.v2.ts#L364)

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

#### Inherited from

[`RouterProtocolAbstract`](RouterProtocolAbstract.md).[`filterRouteQuotesWithTransactionFees`](RouterProtocolAbstract.md#filterroutequoteswithtransactionfees)

#### Defined in

[packages/core/src/router/router.abstract.ts:631](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/core/src/router/router.abstract.ts#L631)

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

#### Inherited from

[`RouterProtocolAbstract`](RouterProtocolAbstract.md).[`findBestRouteQuote`](RouterProtocolAbstract.md#findbestroutequote)

#### Defined in

[packages/core/src/router/router.abstract.ts:507](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/core/src/router/router.abstract.ts#L507)

***

### findValidRoutePathConnections()

> **findValidRoutePathConnections**(`params`): `RoutePath`[]

Works out every possible route path it can take with the provided pools

#### Parameters

• **params**

The parameters required to find valid route paths.

• **params.dexTag**: `string`

The dex tag

• **params.fromTokenAvailablePools**: `TokenAvailablePools`

All pools that include the from token

• **params.intermediatePools**: `TokenAvailablePools`[]

All pools found from the base tokens

• **params.toTokenAvailablePools**: `TokenAvailablePools`

All pools that include the to token

• **params.versionTag**: \`$\{number\}-$\{number\}-$\{number\}\`

The version tag

#### Returns

`RoutePath`[]

#### Overrides

[`RouterProtocolAbstract`](RouterProtocolAbstract.md).[`findValidRoutePathConnections`](RouterProtocolAbstract.md#findvalidroutepathconnections)

#### Defined in

[packages/core/src/router/router.protocol.v2.ts:676](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/core/src/router/router.protocol.v2.ts#L676)

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

#### Inherited from

[`RouterProtocolAbstract`](RouterProtocolAbstract.md).[`generatePairsForToken`](RouterProtocolAbstract.md#generatepairsfortoken)

#### Defined in

[packages/core/src/router/router.abstract.ts:875](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/core/src/router/router.abstract.ts#L875)

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

#### Inherited from

[`RouterProtocolAbstract`](RouterProtocolAbstract.md).[`getBestRouteQuotesHops`](RouterProtocolAbstract.md#getbestroutequoteshops)

#### Defined in

[packages/core/src/router/router.abstract.ts:734](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/core/src/router/router.abstract.ts#L734)

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

#### Inherited from

[`RouterProtocolAbstract`](RouterProtocolAbstract.md).[`getCoinBalance`](RouterProtocolAbstract.md#getcoinbalance)

#### Defined in

[packages/core/src/router/router.abstract.ts:1084](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/core/src/router/router.abstract.ts#L1084)

***

### getConvertQuoteUnshifted()

> **getConvertQuoteUnshifted**(`params`): `object`

Get the convert quote unformatted (wei) from the call return context

#### Parameters

• **params**

The parameters required to get the convert quote.

• **params.methodCallResult**: `MethodResult`\<`Contract`, `MethodCallUnion`\<`Contract`, `"getAmountsIn"` \| `"getAmountsOut"`\>\>

The call return context

• **params.tradeDirection**: `TradeDirection`

The direction you want to get the quote from

#### Returns

`object`

##### quote

> **quote**: `DexNumber`

##### sqrtPriceX96After?

> `optional` **sqrtPriceX96After**: `DexNumber` \| `DexNumber`[]

#### Overrides

[`RouterProtocolAbstract`](RouterProtocolAbstract.md).[`getConvertQuoteUnshifted`](RouterProtocolAbstract.md#getconvertquoteunshifted)

#### Defined in

[packages/core/src/router/router.protocol.v2.ts:1246](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/core/src/router/router.protocol.v2.ts#L1246)

***

### getExpectedConvertQuoteOrTokenAmountInMaxWithSlippage()

> `protected` **getExpectedConvertQuoteOrTokenAmountInMaxWithSlippage**(`params`): `DexNumber`

Work out the expected convert quote taking off slippage

#### Parameters

• **params**

The parameters required to get the expected convert quote.

• **params.expectedConvertQuote**: `DexNumber`

The expected convert quote

• **params.tradeDirection**: `TradeDirection`

The trade direction

#### Returns

`DexNumber`

#### Inherited from

[`RouterProtocolAbstract`](RouterProtocolAbstract.md).[`getExpectedConvertQuoteOrTokenAmountInMaxWithSlippage`](RouterProtocolAbstract.md#getexpectedconvertquoteortokenamountinmaxwithslippage)

#### Defined in

[packages/core/src/router/router.protocol.abstract.ts:670](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/core/src/router/router.protocol.abstract.ts#L670)

***

### getFactoryContract()

> **getFactoryContract**(`dexTag`, `versionTag`): `FactoryContractV2`

#### Parameters

• **dexTag**: `string`

• **versionTag**: \`$\{number\}-$\{number\}-$\{number\}\`

#### Returns

`FactoryContractV2`

#### Defined in

[packages/core/src/router/router.protocol.v2.ts:210](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/core/src/router/router.protocol.v2.ts#L210)

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

#### Inherited from

[`RouterProtocolAbstract`](RouterProtocolAbstract.md).[`getFromAndToTokenAllowancesAndBalance`](RouterProtocolAbstract.md#getfromandtotokenallowancesandbalance)

#### Defined in

[packages/core/src/router/router.abstract.ts:1191](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/core/src/router/router.abstract.ts#L1191)

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

#### Inherited from

[`RouterProtocolAbstract`](RouterProtocolAbstract.md).[`getFromAndToTokenBalanceAndFromTokenAllowances`](RouterProtocolAbstract.md#getfromandtotokenbalanceandfromtokenallowances)

#### Defined in

[packages/core/src/router/router.abstract.ts:1243](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/core/src/router/router.abstract.ts#L1243)

***

### getLiquidityProviderFee()

> **getLiquidityProviderFee**(`dexTag`, `versionTag`): `number`

#### Parameters

• **dexTag**: `string`

• **versionTag**: \`$\{number\}-$\{number\}-$\{number\}\`

#### Returns

`number`

#### Defined in

[packages/core/src/router/router.protocol.v2.ts:172](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/core/src/router/router.protocol.v2.ts#L172)

***

### getPoolReserves()

> **getPoolReserves**(`params`): `Promise`\<`PoolReserve`[]\>

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

#### Overrides

[`RouterProtocolAbstract`](RouterProtocolAbstract.md).[`getPoolReserves`](RouterProtocolAbstract.md#getpoolreserves)

#### Defined in

[packages/core/src/router/router.protocol.v2.ts:1395](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/core/src/router/router.protocol.v2.ts#L1395)

***

### getPools()

> **getPools**(`params`): `Pool`[]

Retrieves the available token pairs based on the given token and valid pair contexts.

#### Parameters

• **params**

The parameters required to get the pools.

• **params.token**: `Token`

The token for which to find available pairs.

• **params.validPairContexts**: `Record`\<`string`, `ContractResults`\<`Contract`, `Record`\<`string`, `MethodCall`\<`Contract`, `"getPair"`\>\>\>\>

The contexts returned from the contract calls representing valid token pairs.

#### Returns

`Pool`[]

An array of `Pool` objects representing the available token pairs. Will return an empty array if no pairs are found.

#### Overrides

[`RouterProtocolAbstract`](RouterProtocolAbstract.md).[`getPools`](RouterProtocolAbstract.md#getpools)

#### Defined in

[packages/core/src/router/router.protocol.v2.ts:1315](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/core/src/router/router.protocol.v2.ts#L1315)

***

### getPriceImpact()

> **getPriceImpact**(`params`): `Promise`\<`PriceImpactInfo`\>

Executes the main logic to fetch reserves and calculate price impact.

#### Parameters

• **params**

The parameters required to calculate price impact.

• **params.dexTag**: `string`

The dex tag.

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

• **params.versionTag**: \`$\{number\}-$\{number\}-$\{number\}\`

The dex version tag.

#### Returns

`Promise`\<`PriceImpactInfo`\>

A promise that resolves to the price impact percentage as a string.

#### Inherited from

[`RouterProtocolAbstract`](RouterProtocolAbstract.md).[`getPriceImpact`](RouterProtocolAbstract.md#getpriceimpact)

#### Defined in

[packages/core/src/router/router.protocol.abstract.ts:343](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/core/src/router/router.protocol.abstract.ts#L343)

***

### getRoutePathsByDex()

> **getRoutePathsByDex**(): `Promise`\<`RoutePathsByDex`\>

Get all possible routes will only go up to 4 due to gas increase the more routes you go.

#### Returns

`Promise`\<`RoutePathsByDex`\>

#### Inherited from

[`RouterProtocolAbstract`](RouterProtocolAbstract.md).[`getRoutePathsByDex`](RouterProtocolAbstract.md#getroutepathsbydex)

#### Defined in

[packages/core/src/router/router.protocol.abstract.ts:447](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/core/src/router/router.protocol.abstract.ts#L447)

***

### getRouteQuotes()

> **getRouteQuotes**(`params`): `Promise`\<`RouteQuote`[]\>

Get all possible routes with the quotes

#### Parameters

• **params**

The parameters required to get route quotes.

• **params.tokenAmount**: `DexNumber`

The amount to trade.

• **params.tradeDirection**: `TradeDirection` = `tradeDirectionMap.input`

The direction you want to get the quote from.

#### Returns

`Promise`\<`RouteQuote`[]\>

A promise that resolves to an array of `RouteQuote` objects representing the possible routes with quotes.

#### Inherited from

[`RouterProtocolAbstract`](RouterProtocolAbstract.md).[`getRouteQuotes`](RouterProtocolAbstract.md#getroutequotes)

#### Defined in

[packages/core/src/router/router.protocol.abstract.ts:568](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/core/src/router/router.protocol.abstract.ts#L568)

***

### getRouterContract()

> **getRouterContract**(`dexTag`, `versionTag`): `RouterContractV2`

#### Parameters

• **dexTag**: `string`

• **versionTag**: \`$\{number\}-$\{number\}-$\{number\}\`

#### Returns

`RouterContractV2`

#### Defined in

[packages/core/src/router/router.protocol.v2.ts:191](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/core/src/router/router.protocol.v2.ts#L191)

***

### getTokenPrices()

> **getTokenPrices**(): `Promise`\<`Record`\<`string`, `number`\>\>

Get the token prices for the from and to tokens, indexed by contract address.

#### Returns

`Promise`\<`Record`\<`string`, `number`\>\>

#### Inherited from

[`RouterProtocolAbstract`](RouterProtocolAbstract.md).[`getTokenPrices`](RouterProtocolAbstract.md#gettokenprices)

#### Defined in

[packages/core/src/router/router.abstract.ts:1424](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/core/src/router/router.abstract.ts#L1424)

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

#### Inherited from

[`RouterProtocolAbstract`](RouterProtocolAbstract.md).[`hasGotEnoughFromBalance`](RouterProtocolAbstract.md#hasgotenoughfrombalance)

#### Defined in

[packages/core/src/router/router.abstract.ts:1152](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/core/src/router/router.abstract.ts#L1152)

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

#### Inherited from

[`RouterProtocolAbstract`](RouterProtocolAbstract.md).[`hasGotEnoughFromTokenAllowance`](RouterProtocolAbstract.md#hasgotenoughfromtokenallowance)

#### Defined in

[packages/core/src/router/router.abstract.ts:1103](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/core/src/router/router.abstract.ts#L1103)

***

### prepareRoutePathsCallContext()

> **prepareRoutePathsCallContext**(): `Record`\<`string`, `ContractContext`\<`Contract`, `Record`\<`string`, `MethodCall`\<`Contract`, `"getPair"`\>\>\>\>

Get all possible routes will only go up to 4 due to gas increase the more routes you go.

#### Returns

`Record`\<`string`, `ContractContext`\<`Contract`, `Record`\<`string`, `MethodCall`\<`Contract`, `"getPair"`\>\>\>\>

#### Overrides

[`RouterProtocolAbstract`](RouterProtocolAbstract.md).[`prepareRoutePathsCallContext`](RouterProtocolAbstract.md#prepareroutepathscallcontext)

#### Defined in

[packages/core/src/router/router.protocol.v2.ts:475](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/core/src/router/router.protocol.v2.ts#L475)

***

### prepareRouteQuotesCallContext()

> **prepareRouteQuotesCallContext**(`params`): `Record`\<`string`, `ContractContext`\<`Contract`, `Record`\<`string`, `MethodCallUnion`\<`Contract`, `"getAmountsIn"` \| `"getAmountsOut"`\>\>\>\>

Get all possible routes with the quotes

#### Parameters

• **params**

The parameters required to get route quotes.

• **params.routePathsByDex**: `RoutePathsByDex`

All possible routes keyed by dex type

• **params.tokenAmount**: `DexNumber`

The amount to trade

• **params.tradeDirection**: `TradeDirection` = `tradeDirectionMap.input`

The direction you want to get the quote from

#### Returns

`Record`\<`string`, `ContractContext`\<`Contract`, `Record`\<`string`, `MethodCallUnion`\<`Contract`, `"getAmountsIn"` \| `"getAmountsOut"`\>\>\>\>

#### Overrides

[`RouterProtocolAbstract`](RouterProtocolAbstract.md).[`prepareRouteQuotesCallContext`](RouterProtocolAbstract.md#prepareroutequotescallcontext)

#### Defined in

[packages/core/src/router/router.protocol.v2.ts:869](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/core/src/router/router.protocol.v2.ts#L869)

***

### processRoutePathsCallResults()

> **processRoutePathsCallResults**(`contractCallResults`): `RoutePathsByDex`

Generates all possible trading routes based on the valid pair contexts.

This method processes the valid pair contexts obtained from the Multicall
results.

#### Parameters

• **contractCallResults**: `MulticallResults`\<`Record`\<`string`, `ContractContext`\<`Contract`, `Record`\<`string`, `MethodCall`\<`Contract`, `"getPair"`\>\>\>\>\>

The results of the Multicall call

#### Returns

`RoutePathsByDex`

An array of `RoutePath` objects representing all possible trading routes.

#### Overrides

[`RouterProtocolAbstract`](RouterProtocolAbstract.md).[`processRoutePathsCallResults`](RouterProtocolAbstract.md#processroutepathscallresults)

#### Defined in

[packages/core/src/router/router.protocol.v2.ts:551](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/core/src/router/router.protocol.v2.ts#L551)

***

### processRouteQuotesCallResults()

> **processRouteQuotesCallResults**(`params`): `RouteQuote`[]

Build up route quotes from results
Expects the ContractCallResults key (reference) to be the DexTag

#### Parameters

• **params**

The parameters required to process route quotes.

• **params.contractCallResults**: `MulticallResults`\<`Record`\<`string`, `ContractContext`\<`Contract`, `Record`\<`string`, `MethodCallUnion`\<`Contract`, `"getAmountsIn"` \| `"getAmountsOut"`\>\>, `Record`\<`string`, `RoutePath`\>\>\>\>

The contract call results

• **params.tokenAmount**: `DexNumber`

The amount to trade

• **params.tradeDirection**: `TradeDirection`

The direction you want to get the quote from

#### Returns

`RouteQuote`[]

#### Overrides

[`RouterProtocolAbstract`](RouterProtocolAbstract.md).[`processRouteQuotesCallResults`](RouterProtocolAbstract.md#processroutequotescallresults)

#### Defined in

[packages/core/src/router/router.protocol.v2.ts:986](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/core/src/router/router.protocol.v2.ts#L986)
