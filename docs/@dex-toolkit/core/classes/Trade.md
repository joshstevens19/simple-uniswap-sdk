[**@dex-toolkit/core v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/core](../README.md) / Trade

# Class: Trade\<TFormat\>

Represents a trading abstraction for DEXs, enabling users to:
- Find the best trade routes.
- Execute trades.
- Fetch detailed trade information.

## Type Parameters

• **TFormat** *extends* `TradeFormat` = `"readable"`

Specifies the format type for numeric values in class methods.

## Constructors

### new Trade()

> **new Trade**\<`TFormat`\>(`__namedParameters`): [`Trade`](Trade.md)\<`TFormat`\>

#### Parameters

• **\_\_namedParameters**: `TradeInternalArgs`\<`TFormat`\>

#### Returns

[`Trade`](Trade.md)\<`TFormat`\>

#### Defined in

packages/core/src/trade.ts:172

## Properties

### \_dexConfigsByDex

> `protected` **\_dexConfigsByDex**: `DexConfigsByDex`

Configurations for supported DEXs.

#### Defined in

packages/core/src/trade.ts:115

***

### \_dexProvider

> `protected` **\_dexProvider**: `DexProvider`

Provider instance for interacting with the blockchain and DEX.

#### Defined in

packages/core/src/trade.ts:125

***

### \_format

> `protected` **\_format**: `TradeFormatOptions`\<`TFormat`\>

Format settings for numeric values.

#### Defined in

packages/core/src/trade.ts:160

***

### \_fromToken

> `protected` **\_fromToken**: `Token`

The token being traded from.

#### Defined in

packages/core/src/trade.ts:95

***

### \_fromTokenContract

> `protected` **\_fromTokenContract**: [`TokenContract`](TokenContract.md)

Contract instance for the "from" token.

#### Defined in

packages/core/src/trade.ts:135

***

### \_lastProcessedBlock

> `protected` **\_lastProcessedBlock**: `number` = `0`

Last block number processed by the trade watcher.

#### Defined in

packages/core/src/trade.ts:150

***

### \_listener

> `protected` **\_listener**: `Listener`

Listener for new block events.

#### Defined in

packages/core/src/trade.ts:170

***

### \_nativeCurrencyInfo

> `protected` **\_nativeCurrencyInfo**: `NativeCurrencyInfo`

Information about the native currency on the network.

#### Defined in

packages/core/src/trade.ts:105

***

### \_nativeWrappedTokenInfo

> `protected` **\_nativeWrappedTokenInfo**: `NativeWrappedTokenInfo`

Information about the wrapped version of the native currency.

#### Defined in

packages/core/src/trade.ts:110

***

### \_router

> `protected` **\_router**: [`Router`](Router.md)\<`"dexnumber"`\>

Router instance for managing trade paths and operations.

#### Defined in

packages/core/src/trade.ts:145

***

### \_settings

> `protected` **\_settings**: `TradeSettings`

Configuration settings for the trade.

#### Defined in

packages/core/src/trade.ts:130

***

### \_subscriptions

> `protected` **\_subscriptions**: `Map`\<`string`, `TradeSubscription`\<`TFormat`\>\>

Active trade subscriptions.

#### Defined in

packages/core/src/trade.ts:165

***

### \_toToken

> `protected` **\_toToken**: `Token`

The token being traded to.

#### Defined in

packages/core/src/trade.ts:100

***

### \_toTokenContract

> `protected` **\_toTokenContract**: [`TokenContract`](TokenContract.md)

Contract instance for the "to" token.

#### Defined in

packages/core/src/trade.ts:140

***

### \_walletAddress

> `protected` **\_walletAddress**: `string`

The user's wallet address.

#### Defined in

packages/core/src/trade.ts:120

***

### \_watchingBlocks

> `protected` **\_watchingBlocks**: `boolean` = `false`

Flag indicating whether the trade is monitoring new blocks.

#### Defined in

packages/core/src/trade.ts:155

## Accessors

### dexProvider

> `get` **dexProvider**(): `DexProvider`

Get the dex provider

#### Returns

`DexProvider`

#### Defined in

packages/core/src/trade.ts:371

***

### fromToken

> `get` **fromToken**(): `Token`

Get the from token

#### Returns

`Token`

#### Defined in

packages/core/src/trade.ts:329

***

### fromTokenContract

> `get` **fromTokenContract**(): [`TokenContract`](TokenContract.md)

Get the from token factory

#### Returns

[`TokenContract`](TokenContract.md)

#### Defined in

packages/core/src/trade.ts:343

***

### nativeCurrency

> `get` **nativeCurrency**(): `NativeCurrencyInfo`

Retrieves the native currency information for the current network.

#### Returns

`NativeCurrencyInfo`

#### Defined in

packages/core/src/trade.ts:385

***

### nativeWrappedTokenInfo

> `get` **nativeWrappedTokenInfo**(): `NativeWrappedTokenInfo`

Retrieves the native wrapped token information for the current network.

#### Returns

`NativeWrappedTokenInfo`

#### Defined in

packages/core/src/trade.ts:378

***

### router

> `get` **router**(): [`Router`](Router.md)\<`TFormat`\>

Get the router factory

#### Returns

[`Router`](Router.md)\<`TFormat`\>

#### Defined in

packages/core/src/trade.ts:364

***

### toToken

> `get` **toToken**(): `Token`

Get the to token

#### Returns

`Token`

#### Defined in

packages/core/src/trade.ts:336

***

### toTokenContract

> `get` **toTokenContract**(): [`TokenContract`](TokenContract.md)

Get the to token factory

#### Returns

[`TokenContract`](TokenContract.md)

#### Defined in

packages/core/src/trade.ts:350

***

### tokenList

> `get` **tokenList**(): `undefined` \| [`TokenList`](TokenList.md)

Get the token list factory

#### Returns

`undefined` \| [`TokenList`](TokenList.md)

#### Defined in

packages/core/src/trade.ts:357

***

### tradePath

> `get` **tradePath**(): `TradePath`

Get the trade path

#### Returns

`TradePath`

#### Defined in

packages/core/src/trade.ts:392

## Methods

### cleanupTradeSubscription()

> `protected` **cleanupTradeSubscription**(`id`): `void`

Cleans up a subscription and its resources.
Completes the subject, removes the subscription from tracking,
and stops block watching if no more active subscriptions exist.

#### Parameters

• **id**: `string`

The unique identifier of the subscription to clean up

#### Returns

`void`

#### Remarks

This is called automatically when:
- The observable is unsubscribed
- The unsubscribe function is called manually
- The subscription is invalidated

#### Defined in

packages/core/src/trade.ts:1427

***

### createExecuteFunction()

> `protected` **createExecuteFunction**(`context`): `undefined` \| (`__namedParameters`) => `Promise`\<`object`\>

Creates a function to execute the trade operation.
This function handles approvals and main transactions, returning the receipts of each.

#### Parameters

• **context**: `InternalTradeContext`\<`"dexnumber"`\>

The trade context to execute

#### Returns

`undefined` \| (`__namedParameters`) => `Promise`\<`object`\>

A function that executes the trade operation

#### Defined in

packages/core/src/trade.ts:1335

***

### createObservable()

> `protected` **createObservable**(`context`): `object`

Creates an observable for liquidity quote updates with proper cleanup handling.
Sets up the subscription and returns an observable that will emit quote updates,
along with an unsubscribe function for manual cleanup.

#### Parameters

• **context**: `InternalTradeContext`\<`"dexnumber"`\>

The initial liquidity context in DexNumber format

#### Returns

`object`

An object containing:
- observer$: The Observable that emits quote updates
- unsubscribe: Function to manually clean up the subscription

##### observer$

> **observer$**: `Observable`\<`ObservableTradeContext`\<`TFormat`\>\>

##### unsubscribe()

> **unsubscribe**: () => `void`

###### Returns

`void`

#### Remarks

The observable automatically handles cleanup when unsubscribed using RxJS finalize operator.
The context is maintained internally in DexNumber format for accurate comparisons.

#### Defined in

packages/core/src/trade.ts:1307

***

### destroy()

> **destroy**(): `void`

Destroys and cleans up all active subscriptions.
This provides a way to completely shut down all quote monitoring and free associated resources.

#### Returns

`void`

#### Remarks

This method:
- Completes all subscription subjects
- Removes all subscriptions from tracking
- Stops the block watcher
- Clears all internal subscription state

#### Defined in

packages/core/src/trade.ts:1479

***

### findBestRouteQuote()

> **findBestRouteQuote**(`params`): `Promise`\<`BestRouteQuoteContext`\>

Find the best route rate out of all the route quotes

#### Parameters

• **params**

The parameters required to find the best route quote.

• **params.amountToTrade**: `TradeParamsAmount`

The amount to trade.

• **params.tradeDirection**: `TradeDirection` = `tradeDirectionMap.input`

The direction you want to get the quote from.

#### Returns

`Promise`\<`BestRouteQuoteContext`\>

A promise that resolves to the best route quote.

#### Defined in

packages/core/src/trade.ts:409

***

### generateApproveRouterAllowanceTransaction()

> **generateApproveRouterAllowanceTransaction**(`params`): `Promise`\<`DexTransaction`\>

Generates transaction data to approve maximum allowance for a router to move tokens.

#### Parameters

• **params**

Configuration parameters

• **params.amount?**: `string`

The amount to approve. If not provided, the maximum amount will be used.

• **params.dexTag**: `string`

The DEX identifier

• **params.protocol**: `DexProtocol`

The protocol version (v2, v3)

• **params.version**: `Version`

The specific version configuration

#### Returns

`Promise`\<`DexTransaction`\>

Promise resolving to transaction data for approval

#### Throws

- If approval is not needed (e.g., for native coins)
- If DEX configuration is missing or invalid
- If router configuration is not found
- If token configuration is invalid

#### Defined in

packages/core/src/trade.ts:681

***

### generateContext()

> `protected` **generateContext**(`params`): `Promise`\<`InternalTradeContext`\<`"dexnumber"`\>\>

Generate the trade context based on the trade path and direction.

#### Parameters

• **params**

The parameters required to generate the trade context.

• **params.id?**: `string`

The quote ID.

• **params.tokenAmount**: `DexNumber`

The amount of tokens to be traded.

• **params.tradeDirection**: `TradeDirection`

The direction of the trade (input or output).

#### Returns

`Promise`\<`InternalTradeContext`\<`"dexnumber"`\>\>

A promise that resolves to the TradeContext.

#### Throws

DexError if the trade path is not supported or if the trade context could not be generated.

#### Defined in

packages/core/src/trade.ts:842

***

### generateContextForSwap()

> `protected` **generateContextForSwap**(`params`): `Promise`\<`InternalTradeContext`\<`"dexnumber"`\>\>

Generate the trade context for a swap operation.

#### Parameters

• **params**

The parameters required to generate the trade context for swap.

• **params.id**: `string`

The quote id.

• **params.tokenAmount**: `DexNumber`

The amount to be converted in the trade.

• **params.tradeDirection**: `TradeDirection`

The direction of the trade (input or output).

#### Returns

`Promise`\<`InternalTradeContext`\<`"dexnumber"`\>\>

A promise that resolves to the TradeContext.

#### Throws

DexError if the trade path is not supported.

#### Defined in

packages/core/src/trade.ts:896

***

### generateContextForWrapOrUnwrap()

> `protected` **generateContextForWrapOrUnwrap**(`params`): `Promise`\<`InternalTradeContext`\<`"dexnumber"`\>\>

Generate the trade context for a wrap or unwrap operation.

#### Parameters

• **params**

The parameters required to generate the trade context for wrap or unwrap.

• **params.baseConvertRequest**: `DexNumber`

The amount to be wrapped or unwrapped.

• **params.id**: `string`

The quote id.

#### Returns

`Promise`\<`InternalTradeContext`\<`"dexnumber"`\>\>

A promise that resolves to the TradeContext.

#### Throws

DexError if the trade path is not supported.

#### Defined in

packages/core/src/trade.ts:1052

***

### getFromTokenBalanceAndRouterAllowance()

> **getFromTokenBalanceAndRouterAllowance**\<`TFormatOverride`\>(`format`?): `Promise`\<`MultiDexTokenWithAllowanceInfo`\<`TFormatOverride`\>\>

Get the allowance and balance for the from token

#### Type Parameters

• **TFormatOverride** *extends* `TradeFormat`

#### Parameters

• **format?**: `TradeFormatOptions`\<`TFormatOverride`\>

The format in which the allowance and balance values are returned.

#### Returns

`Promise`\<`MultiDexTokenWithAllowanceInfo`\<`TFormatOverride`\>\>

A promise that resolves to an object containing the allowance and balance information for the from token.

#### Defined in

packages/core/src/trade.ts:635

***

### getFromTokenBalanceOf()

> **getFromTokenBalanceOf**\<`TFormatOverride`\>(`format`?): `Promise`\<`TradeFormatValue`\<`TFormatOverride`\>\>

Get the to token balance

#### Type Parameters

• **TFormatOverride** *extends* `TradeFormat`

#### Parameters

• **format?**: `TradeFormatOptions`\<`TFormatOverride`\>

The format in which the balance value is returned.

#### Returns

`Promise`\<`TradeFormatValue`\<`TFormatOverride`\>\>

A promise that resolves to the balance of the from token.

#### Defined in

packages/core/src/trade.ts:513

***

### getFromTokenRouterAllowance()

> **getFromTokenRouterAllowance**\<`TFormatOverride`\>(`params`): `Promise`\<`TradeFormatValue`\<`TFormatOverride`\>\>

Get the allowance for the amount which can be moved from the `fromToken` on the users behalf.

#### Type Parameters

• **TFormatOverride** *extends* `TradeFormat`

#### Parameters

• **params**

The parameters required to get the allowance.

• **params.dexTag**: `string`

The dex tag.

• **params.format?**: `TradeFormatOptions`\<`TFormatOverride`\>

The format in which the allowance value is returned.

• **params.protocol**: `DexProtocol`

The protocol of the DEX (v2, v3, etc.).

• **params.versionTag**: \`$\{number\}-$\{number\}-$\{number\}\`

The version tag.

#### Returns

`Promise`\<`TradeFormatValue`\<`TFormatOverride`\>\>

A promise that resolves to the allowance.

#### Defined in

packages/core/src/trade.ts:559

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

• **params.protocol**: `DexProtocol`

The protocol of the DEX (v2, v3, etc.).

• **params.version**: `Version`

The version.

#### Returns

`Promise`\<`PoolReserve`[]\>

A promise that resolves to an array of tuples containing the reserves of token0 and token1 for each pair.

#### Defined in

packages/core/src/trade.ts:480

***

### getRouteQuotes()

> **getRouteQuotes**(`params`): `Promise`\<`RouteQuote`[]\>

Get all possible routes with the quotes

#### Parameters

• **params**

The parameters required to get the route quotes.

• **params.amountToTrade**: `TradeParamsAmount`

The amount to trade

• **params.tradeDirection**: `TradeDirection` = `tradeDirectionMap.input`

The direction you want to get the quote from

#### Returns

`Promise`\<`RouteQuote`[]\>

A promise that resolves to the route quotes.

#### Defined in

packages/core/src/trade.ts:438

***

### getToTokenBalanceAndRouterAllowance()

> **getToTokenBalanceAndRouterAllowance**\<`TFormatOverride`\>(`format`?): `Promise`\<`MultiDexTokenWithAllowanceInfo`\<`TFormatOverride`\>\>

Get the allowance and balance for to from token

#### Type Parameters

• **TFormatOverride** *extends* `TradeFormat`

#### Parameters

• **format?**: `TradeFormatOptions`\<`TFormatOverride`\>

The format in which the allowance and balance values are returned.

#### Returns

`Promise`\<`MultiDexTokenWithAllowanceInfo`\<`TFormatOverride`\>\>

A promise that resolves to an object containing the allowance and balance information for the to token.

#### Defined in

packages/core/src/trade.ts:653

***

### getToTokenBalanceOf()

> **getToTokenBalanceOf**\<`TFormatOverride`\>(`format`?): `Promise`\<`TradeFormatValue`\<`TFormatOverride`\>\>

Get the to token balance

#### Type Parameters

• **TFormatOverride** *extends* `TradeFormat`

#### Parameters

• **format?**: `TradeFormatOptions`\<`TFormatOverride`\>

The format in which the balance value is returned.

#### Returns

`Promise`\<`TradeFormatValue`\<`TFormatOverride`\>\>

A promise that resolves to the balance of the to token.

#### Defined in

packages/core/src/trade.ts:535

***

### getToTokenRouterAllowance()

> **getToTokenRouterAllowance**\<`TFormatOverride`\>(`params`): `Promise`\<`TradeFormatValue`\<`TFormat`\>\>

Get the allowance for the amount which can be moved from the `toToken` on the users behalf.

#### Type Parameters

• **TFormatOverride** *extends* `TradeFormat`

#### Parameters

• **params**

The parameters required to get the allowance.

• **params.dexTag**: `string`

The dex tag.

• **params.format?**: `TradeFormatOptions`\<`TFormatOverride`\>

The format in which the allowance value is returned.

• **params.protocol**: `DexProtocol`

The protocol of the DEX (v2, v3, etc.).

• **params.versionTag**: \`$\{number\}-$\{number\}-$\{number\}\`

The version tag.

#### Returns

`Promise`\<`TradeFormatValue`\<`TFormat`\>\>

A promise that resolves to the allowance.

#### Defined in

packages/core/src/trade.ts:599

***

### getTradeSubscription()

> `protected` **getTradeSubscription**(`id`): `Subject`\<`ObservableTradeContext`\<`TFormat`\>\>

Retrieves the RxJS Subject for a specific quote subscription.

#### Parameters

• **id**: `string`

The unique identifier of the subscription

#### Returns

`Subject`\<`ObservableTradeContext`\<`TFormat`\>\>

The Subject associated with the subscription

#### Throws

If the subscription is not found

#### Remarks

This should never throw in normal operation as subscriptions are created
before they're accessed. If it throws, it indicates an internal state issue.

#### Defined in

packages/core/src/trade.ts:1452

***

### getVersionedRoutePathsByDex()

> **getVersionedRoutePathsByDex**(): `Promise`\<`VersionedRoutePathsByDex`\>

Find all possible routes

#### Returns

`Promise`\<`VersionedRoutePathsByDex`\>

#### Defined in

packages/core/src/trade.ts:461

***

### handleNewBlock()

> `protected` **handleNewBlock**(`currentBlockNumber`): `Promise`\<`void`\>

Handles updates when a new block is mined on the blockchain.
This is the main entry point for processing subscription updates based on new blocks.

#### Parameters

• **currentBlockNumber**: `number`

The number of the new block

#### Returns

`Promise`\<`void`\>

#### Remarks

The handler includes several optimizations:
- Skips processing if there are no active subscriptions
- Supports block skipping to reduce update frequency (configured via settings)
- Only processes active subscriptions
- Processes all active subscriptions in parallel

Block skipping behavior:
- If observerBlockSkip > 0, updates only occur every N blocks
- This helps reduce processing load for applications that don't need
  updates on every block

Error handling:
- Throws if there's an error processing the block
- Automatically cleans up block watching if no active subscriptions remain

#### Throws

If there's an error processing subscription updates

#### Defined in

packages/core/src/trade.ts:1616

***

### processSubscriptionUpdate()

> `protected` **processSubscriptionUpdate**(`subscription`, `currentBlockNumber`?): `Promise`\<`void`\>

Processes an update for a single subscription, generating and emitting new quotes if needed.
This is the core update mechanism that generates new liquidity quotes when conditions change.

#### Parameters

• **subscription**: `TradeSubscription`\<`TFormat`\>

The subscription to process

• **currentBlockNumber?**: `number`

Optional block number for the update

#### Returns

`Promise`\<`void`\>

#### Remarks

The process includes:
1. Checking if the subscription is still active and observed
2. Generating a new context with current data
3. Comparing with previous context to detect changes
4. Formatting and emitting updates if changes are detected

The context is maintained in DexNumber format internally for accurate comparisons,
but formatted to the user's chosen format before emission.

#### Throws

If there's an error generating or processing the new context

#### Defined in

packages/core/src/trade.ts:1508

***

### quote()

> **quote**(`params`): `Promise`\<`TradeContext`\<`TFormat`\>\>

Generates a swap quote between two tokens.

#### Parameters

• **params**: `TradeParams`

The parameters required to generate the quote.

#### Returns

`Promise`\<`TradeContext`\<`TFormat`\>\>

A promise that resolves to a `TradeContext` object containing detailed information about the trade, including the route taken, expected output, fees, and transaction data required to execute the trade.

#### Throws

If any required parameter is missing or invalid, or if the trade path is not supported.

#### Defined in

packages/core/src/trade.ts:793

***

### requote()

> **requote**(`id`, `currentBlockNumber`?): `Promise`\<`void`\>

Manually triggers a requote for a specific subscription.
This allows forcing an update of liquidity quotes outside the normal block-based update cycle.

#### Parameters

• **id**: `string`

The unique identifier of the subscription to requote

• **currentBlockNumber?**: `number`

Optional current block number to include in the update

#### Returns

`Promise`\<`void`\>

#### Throws

If the subscription cannot be processed

#### Example

```typescript
// Force an immediate requote for a specific subscription
await liquidity.requote("subscription-123", 15372648);
```

#### Defined in

packages/core/src/trade.ts:1158

***

### setupTradeSubscription()

> `protected` **setupTradeSubscription**(`params`): `void`

Sets up a subscription for trade quote updates.
Creates a new subscription entry with the provided subject and context,
and starts block watching if needed.

#### Parameters

• **params**: `Omit`\<`TradeSubscription`\<`TFormat`\>, `"isActive"`\>

The subscription setup parameters

#### Returns

`void`

#### Remarks

The context is cloned to prevent external modifications affecting the internal state.
Block watching is started unless explicitly disabled in settings.

#### Defined in

packages/core/src/trade.ts:1211

***

### unwatchBlocks()

> `protected` **unwatchBlocks**(): `void`

Stops watching for new blocks on the blockchain.
This removes the block event listener and updates the watching state.
Only stops watching if currently watching blocks.

#### Returns

`void`

#### Remarks

This is automatically called when there are no more active subscriptions
to prevent unnecessary block processing.

#### Defined in

packages/core/src/trade.ts:1192

***

### watchBlocks()

> `protected` **watchBlocks**(): `void`

Starts watching for new blocks on the blockchain.
This sets up an event listener for block updates and manages the watching state.
Only starts watching if not already watching blocks.

#### Returns

`void`

#### Remarks

This is an internal mechanism used to trigger quote updates based on new blocks.
The watcher is automatically managed based on active subscriptions.

#### Defined in

packages/core/src/trade.ts:1175
