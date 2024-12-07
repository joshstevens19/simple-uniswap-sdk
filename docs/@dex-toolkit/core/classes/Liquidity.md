[**@dex-toolkit/core v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/core](../README.md) / Liquidity

# Class: Liquidity\<TFormat\>

Represents a liquidity management abstraction for interacting with DEX liquidity pools.
This class supports adding and removing liquidity in both V2 and V3 protocols.

## Extends

- [`LiquidityAbstract`](LiquidityAbstract.md)\<`TFormat`\>

## Type Parameters

• **TFormat** *extends* `TradeFormat` = `"dexnumber"`

The type of format used for numeric values in the class methods.

## Constructors

### new Liquidity()

> **new Liquidity**\<`TFormat`\>(`args`): [`Liquidity`](Liquidity.md)\<`TFormat`\>

#### Parameters

• **args**: [`LiquidityProtocolArgs`](../type-aliases/LiquidityProtocolArgs.md)\<`TFormat`\>

#### Returns

[`Liquidity`](Liquidity.md)\<`TFormat`\>

#### Overrides

[`LiquidityAbstract`](LiquidityAbstract.md).[`constructor`](LiquidityAbstract.md#constructors)

#### Defined in

packages/core/src/liquidity/liquidity.ts:72

## Properties

### \_dexConfigsByDex

> `protected` **\_dexConfigsByDex**: `DexConfigsByDex`

DEX configurations indexed by DEX tag.

#### Inherited from

[`LiquidityAbstract`](LiquidityAbstract.md).[`_dexConfigsByDex`](LiquidityAbstract.md#_dexconfigsbydex)

#### Defined in

packages/core/src/liquidity/liquidity.abstract.ts:124

***

### \_dexProvider

> `protected` **\_dexProvider**: `DexProvider`

The DEX provider for managing blockchain interactions.

#### Inherited from

[`LiquidityAbstract`](LiquidityAbstract.md).[`_dexProvider`](LiquidityAbstract.md#_dexprovider)

#### Defined in

packages/core/src/liquidity/liquidity.abstract.ts:114

***

### \_format

> `protected` **\_format**: `TradeFormatOptions`\<`TFormat`\>

#### Defined in

packages/core/src/liquidity/liquidity.ts:65

***

### \_lastProcessedBlock

> `protected` **\_lastProcessedBlock**: `number` = `0`

#### Defined in

packages/core/src/liquidity/liquidity.ts:61

***

### \_liquidityV2?

> `protected` `optional` **\_liquidityV2**: [`LiquidityProtocolV2`](LiquidityProtocolV2.md)\<`TFormat`\>

#### Defined in

packages/core/src/liquidity/liquidity.ts:57

***

### \_liquidityV3?

> `protected` `optional` **\_liquidityV3**: [`LiquidityProtocolV3`](LiquidityProtocolV3.md)\<`TFormat`\>

#### Defined in

packages/core/src/liquidity/liquidity.ts:59

***

### \_listener

> `protected` **\_listener**: `Listener`

#### Defined in

packages/core/src/liquidity/liquidity.ts:70

***

### \_multiPriceContext

> `protected` **\_multiPriceContext**: `MultiPriceContext`

Context for handling multiple price-related operations.

#### Inherited from

[`LiquidityAbstract`](LiquidityAbstract.md).[`_multiPriceContext`](LiquidityAbstract.md#_multipricecontext)

#### Defined in

packages/core/src/liquidity/liquidity.abstract.ts:129

***

### \_nativeCurrencyInfo

> `protected` **\_nativeCurrencyInfo**: `NativeCurrencyInfo`

Information about the native currency for the current network.

#### Inherited from

[`LiquidityAbstract`](LiquidityAbstract.md).[`_nativeCurrencyInfo`](LiquidityAbstract.md#_nativecurrencyinfo)

#### Defined in

packages/core/src/liquidity/liquidity.abstract.ts:104

***

### \_nativeWrappedTokenInfo

> `protected` **\_nativeWrappedTokenInfo**: `NativeWrappedTokenInfo`

Information about the wrapped native token for the current network.

#### Inherited from

[`LiquidityAbstract`](LiquidityAbstract.md).[`_nativeWrappedTokenInfo`](LiquidityAbstract.md#_nativewrappedtokeninfo)

#### Defined in

packages/core/src/liquidity/liquidity.abstract.ts:109

***

### \_settings

> `protected` **\_settings**: `LiquiditySettings`

Configuration settings for liquidity operations.

#### Inherited from

[`LiquidityAbstract`](LiquidityAbstract.md).[`_settings`](LiquidityAbstract.md#_settings)

#### Defined in

packages/core/src/liquidity/liquidity.abstract.ts:119

***

### \_subscriptions

> `protected` **\_subscriptions**: `Map`\<`string`, `LiquiditySubscription`\<`TFormat`\>\>

#### Defined in

packages/core/src/liquidity/liquidity.ts:67

***

### \_tokenA

> `protected` **\_tokenA**: `Token`

The "from" token in liquidity operations.

#### Inherited from

[`LiquidityAbstract`](LiquidityAbstract.md).[`_tokenA`](LiquidityAbstract.md#_tokena)

#### Defined in

packages/core/src/liquidity/liquidity.abstract.ts:84

***

### \_tokenAContract

> `protected` **\_tokenAContract**: [`TokenContract`](TokenContract.md)

The contract instance for the "from" token.

#### Inherited from

[`LiquidityAbstract`](LiquidityAbstract.md).[`_tokenAContract`](LiquidityAbstract.md#_tokenacontract)

#### Defined in

packages/core/src/liquidity/liquidity.abstract.ts:94

***

### \_tokenB

> `protected` **\_tokenB**: `Token`

The "to" token in liquidity operations.

#### Inherited from

[`LiquidityAbstract`](LiquidityAbstract.md).[`_tokenB`](LiquidityAbstract.md#_tokenb)

#### Defined in

packages/core/src/liquidity/liquidity.abstract.ts:89

***

### \_tokenBContract

> `protected` **\_tokenBContract**: [`TokenContract`](TokenContract.md)

The contract instance for the "to" token.

#### Inherited from

[`LiquidityAbstract`](LiquidityAbstract.md).[`_tokenBContract`](LiquidityAbstract.md#_tokenbcontract)

#### Defined in

packages/core/src/liquidity/liquidity.abstract.ts:99

***

### \_tokens

> `protected` **\_tokens**: [`Tokens`](Tokens.md)

Factory for managing token-related operations.

#### Inherited from

[`LiquidityAbstract`](LiquidityAbstract.md).[`_tokens`](LiquidityAbstract.md#_tokens)

#### Defined in

packages/core/src/liquidity/liquidity.abstract.ts:134

***

### \_walletAddress

> `protected` **\_walletAddress**: `string`

The wallet address associated with the liquidity operations.

#### Inherited from

[`LiquidityAbstract`](LiquidityAbstract.md).[`_walletAddress`](LiquidityAbstract.md#_walletaddress)

#### Defined in

packages/core/src/liquidity/liquidity.abstract.ts:79

***

### \_watchingBlocks

> `protected` **\_watchingBlocks**: `boolean` = `false`

#### Defined in

packages/core/src/liquidity/liquidity.ts:63

## Accessors

### dexProvider

> `get` **dexProvider**(): `DexProvider`

Get the dex provider

#### Returns

`DexProvider`

#### Inherited from

[`LiquidityAbstract`](LiquidityAbstract.md).[`dexProvider`](LiquidityAbstract.md#dexprovider)

#### Defined in

packages/core/src/liquidity/liquidity.abstract.ts:288

***

### nativeCurrency

> `get` **nativeCurrency**(): `NativeCurrencyInfo`

Retrieves the native currency information for the current network.

#### Returns

`NativeCurrencyInfo`

The native currency information.

#### Inherited from

[`LiquidityAbstract`](LiquidityAbstract.md).[`nativeCurrency`](LiquidityAbstract.md#nativecurrency)

#### Defined in

packages/core/src/liquidity/liquidity.abstract.ts:306

***

### nativeWrappedTokenInfo

> `get` **nativeWrappedTokenInfo**(): `NativeWrappedTokenInfo`

Retrieves the native wrapped token information for the current network.

#### Returns

`NativeWrappedTokenInfo`

The native wrapped token information.

#### Inherited from

[`LiquidityAbstract`](LiquidityAbstract.md).[`nativeWrappedTokenInfo`](LiquidityAbstract.md#nativewrappedtokeninfo)

#### Defined in

packages/core/src/liquidity/liquidity.abstract.ts:297

***

### protocolV2

> `get` **protocolV2**(): `undefined` \| [`LiquidityProtocolV2`](LiquidityProtocolV2.md)\<`TFormat`\>

Getter method for retrieving the liquidity protocol V2 instance.

#### Returns

`undefined` \| [`LiquidityProtocolV2`](LiquidityProtocolV2.md)\<`TFormat`\>

The liquidity protocol V2 instance, if it exists; otherwise, undefined.

#### Defined in

packages/core/src/liquidity/liquidity.ts:166

***

### protocolV3

> `get` **protocolV3**(): `undefined` \| [`LiquidityProtocolV3`](LiquidityProtocolV3.md)\<`TFormat`\>

Getter method for retrieving the liquidity protocol V3 instance.

#### Returns

`undefined` \| [`LiquidityProtocolV3`](LiquidityProtocolV3.md)\<`TFormat`\>

The liquidity protocol V3 instance, if it exists; otherwise, undefined.

#### Defined in

packages/core/src/liquidity/liquidity.ts:175

***

### tokenA

> `get` **tokenA**(): `Token`

Get the from token

#### Returns

`Token`

#### Inherited from

[`LiquidityAbstract`](LiquidityAbstract.md).[`tokenA`](LiquidityAbstract.md#tokena)

#### Defined in

packages/core/src/liquidity/liquidity.abstract.ts:260

***

### tokenAContract

> `get` **tokenAContract**(): [`TokenContract`](TokenContract.md)

Getter method for retrieving the token factory for token A.

#### Returns

[`TokenContract`](TokenContract.md)

The factory responsible for operations on token A.

#### Defined in

packages/core/src/liquidity/liquidity.ts:148

***

### tokenB

> `get` **tokenB**(): `Token`

Get the to token

#### Returns

`Token`

#### Inherited from

[`LiquidityAbstract`](LiquidityAbstract.md).[`tokenB`](LiquidityAbstract.md#tokenb)

#### Defined in

packages/core/src/liquidity/liquidity.abstract.ts:267

***

### tokenBContract

> `get` **tokenBContract**(): [`TokenContract`](TokenContract.md)

Getter method for retrieving the token factory for token B.

#### Returns

[`TokenContract`](TokenContract.md)

The factory responsible for operations on token B.

#### Defined in

packages/core/src/liquidity/liquidity.ts:157

***

### tokenList

> `get` **tokenList**(): `undefined` \| [`TokenList`](TokenList.md)

Get the token list factory

#### Returns

`undefined` \| [`TokenList`](TokenList.md)

#### Inherited from

[`LiquidityAbstract`](LiquidityAbstract.md).[`tokenList`](LiquidityAbstract.md#tokenlist)

#### Defined in

packages/core/src/liquidity/liquidity.abstract.ts:281

***

### tokensFactory

> `get` **tokensFactory**(): [`Tokens`](Tokens.md)

Get the tokens factory

#### Returns

[`Tokens`](Tokens.md)

#### Inherited from

[`LiquidityAbstract`](LiquidityAbstract.md).[`tokensFactory`](LiquidityAbstract.md#tokensfactory)

#### Defined in

packages/core/src/liquidity/liquidity.abstract.ts:274

## Methods

### addLiquidity()

> **addLiquidity**(`params`): `Promise`\<`LiquidityContext`\<`TFormat`\>\>

Adds liquidity to a DEX.
This method generates the necessary liquidity context and starts monitoring block changes.

#### Parameters

• **params**: `AddLiquidityParams`\<`"decimal"`\>

#### Returns

`Promise`\<`LiquidityContext`\<`TFormat`\>\>

#### Defined in

packages/core/src/liquidity/liquidity.ts:187

***

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

packages/core/src/liquidity/liquidity.ts:708

***

### createExecuteFunction()

> `protected` **createExecuteFunction**(`context`): `undefined` \| (`__namedParameters`) => `Promise`\<`object`\>

Creates a function to execute the liquidity operation.
This function handles approvals and main transactions, returning the receipts of each.

#### Parameters

• **context**: `InternalLiquidityContext`\<`"dexnumber"`\>

The liquidity context to execute

#### Returns

`undefined` \| (`__namedParameters`) => `Promise`\<`object`\>

A function that executes the liquidity operation

#### Defined in

packages/core/src/liquidity/liquidity.ts:580

***

### createObservable()

> `protected` **createObservable**(`context`, `originParams`): `object`

Creates an observable for liquidity quote updates with proper cleanup handling.
Sets up the subscription and returns an observable that will emit quote updates,
along with an unsubscribe function for manual cleanup.

#### Parameters

• **context**: `InternalLiquidityContext`\<`"dexnumber"`\>

The initial liquidity context in DexNumber format

• **originParams**: `AddLiquidityParams`\<`"decimal"`\> \| `RemoveLiquidityParams`\<`"decimal"`\>

#### Returns

`object`

An object containing:
- observer$: The Observable that emits quote updates
- unsubscribe: Function to manually clean up the subscription

##### observer$

> **observer$**: `Observable`\<`ObservableLiquidityContext`\<`TFormat`\>\>

##### unsubscribe()

> **unsubscribe**: () => `void`

###### Returns

`void`

#### Remarks

The observable automatically handles cleanup when unsubscribed using RxJS finalize operator.
The context is maintained internally in DexNumber format for accurate comparisons.

#### Defined in

packages/core/src/liquidity/liquidity.ts:543

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

packages/core/src/liquidity/liquidity.ts:760

***

### generateApproveRouterAllowanceTransaction()

> **generateApproveRouterAllowanceTransaction**(`params`): `Promise`\<`undefined` \| `DexTransaction`\>

Generates a transaction to approve the router contract to spend the maximum allowance for a token.

#### Parameters

• **params**

The parameters for generating the approval transaction

• **params.amount?**: `string`

The amount to approve. If not provided, the maximum amount will be used.

• **params.dexTag**: `string`

The identifier/tag for the specific DEX configuration

• **params.protocol**: `DexProtocol`

The protocol of the DEX (v2, v3, etc.)

• **params.token**: `"A"` \| `"B"`

The token to approve ('A' or 'B')

• **params.version**: `Version`

The version of the DEX

#### Returns

`Promise`\<`undefined` \| `DexTransaction`\>

Promise resolving to the transaction data, or undefined if approval is not needed (e.g., for native coins)

#### Throws

- If required parameters are missing or invalid
- If DEX configuration is not found
- If contract details are missing
- If router address is invalid
- If token configuration is invalid

#### Inherited from

[`LiquidityAbstract`](LiquidityAbstract.md).[`generateApproveRouterAllowanceTransaction`](LiquidityAbstract.md#generateapproverouterallowancetransaction)

#### Defined in

packages/core/src/liquidity/liquidity.abstract.ts:448

***

### generateContext()

> `protected` **generateContext**\<`TProtocol`, `TDirection`\>(`params`): `Promise`\<`InternalLiquidityContext`\<`"dexnumber"`\>\>

Generate the liquidity context based on the protocol and direction.

#### Type Parameters

• **TProtocol** *extends* `DexProtocol`

• **TDirection** *extends* `LiquidityDirection`

#### Parameters

• **params**

The parameters for the liquidity operation.

• **params.id?**: `string`

The quote ID.

• **params.liquidityDirection**: `TDirection`

The direction of the liquidity operation.

• **params.params**: `TProtocol` *extends* `"protocolV2"` ? `TDirection` *extends* `"add"` ? `AddLiquidityParamsV2`\<`"dexnumber"`\> : `RemoveLiquidityParamsV2`\<`"dexnumber"`\> : `TProtocol` *extends* `"protocolV3"` ? `TDirection` *extends* `"add"` ? `AddLiquidityParamsV3`\<`"dexnumber"`\> : `RemoveLiquidityParamsV3`\<`"dexnumber"`\> : `never`

The parameters for the liquidity operation.

• **params.protocol**: `TProtocol`

The protocol to use for the liquidity.

#### Returns

`Promise`\<`InternalLiquidityContext`\<`"dexnumber"`\>\>

A promise that resolves to the LiquidityContext.

#### Throws

DexError if the protocol is not supported or if the liquidity context could not be generated.

#### Defined in

packages/core/src/liquidity/liquidity.ts:281

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

[`LiquidityAbstract`](LiquidityAbstract.md).[`getCoinBalance`](LiquidityAbstract.md#getcoinbalance)

#### Defined in

packages/core/src/liquidity/liquidity.abstract.ts:317

***

### getTokenABalanceOf()

> **getTokenABalanceOf**\<`TFormatOverride`\>(`format`?): `Promise`\<`TradeFormatValue`\<`TFormatOverride`\>\>

Retrieves the balance of token A for the current wallet.

#### Type Parameters

• **TFormatOverride** *extends* `TradeFormat` = `TFormat`

The type of format to override the classes format

#### Parameters

• **format?**: `TradeFormatOptions`\<`TFormatOverride`\>

The format in which the balance value is returned.

#### Returns

`Promise`\<`TradeFormatValue`\<`TFormatOverride`\>\>

A promise resolving to the balance of token A.

#### Defined in

packages/core/src/liquidity/liquidity.ts:374

***

### getTokenBBalanceOf()

> **getTokenBBalanceOf**\<`TFormatOverride`\>(`format`?): `Promise`\<`TradeFormatValue`\<`TFormatOverride`\>\>

Retrieves the balance of token B for the current wallet.

#### Type Parameters

• **TFormatOverride** *extends* `TradeFormat` = `TFormat`

The type of format to override the classes format.

#### Parameters

• **format?**: `TradeFormatOptions`\<`TFormatOverride`\>

The format in which the balance value is returned.

#### Returns

`Promise`\<`TradeFormatValue`\<`TFormatOverride`\>\>

A promise resolving to the balance of token B.

#### Defined in

packages/core/src/liquidity/liquidity.ts:392

***

### getTokenPrices()

> **getTokenPrices**(): `Promise`\<`Record`\<`string`, `number`\>\>

Get the token prices for the from and to tokens, indexed by contract address.

#### Returns

`Promise`\<`Record`\<`string`, `number`\>\>

#### Inherited from

[`LiquidityAbstract`](LiquidityAbstract.md).[`getTokenPrices`](LiquidityAbstract.md#gettokenprices)

#### Defined in

packages/core/src/liquidity/liquidity.abstract.ts:411

***

### getTradeSubscription()

> `protected` **getTradeSubscription**(`id`): `Subject`\<`ObservableLiquidityContext`\<`TFormat`\>\>

Retrieves the RxJS Subject for a specific quote subscription.

#### Parameters

• **id**: `string`

The unique identifier of the subscription

#### Returns

`Subject`\<`ObservableLiquidityContext`\<`TFormat`\>\>

The Subject associated with the subscription

#### Throws

If the subscription is not found

#### Remarks

This should never throw in normal operation as subscriptions are created
before they're accessed. If it throws, it indicates an internal state issue.

#### Defined in

packages/core/src/liquidity/liquidity.ts:733

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

packages/core/src/liquidity/liquidity.ts:858

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

[`LiquidityAbstract`](LiquidityAbstract.md).[`hasGotEnoughFromBalance`](LiquidityAbstract.md#hasgotenoughfrombalance)

#### Defined in

packages/core/src/liquidity/liquidity.abstract.ts:379

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

The allowance you want to add.

• **params.amount**: `DexNumber`

The amount you want to add.

• **params.format**: `TradeFormatOptions`\<`TFormat`\>

The format in which the allowance value is returned.

#### Returns

`TokenAllowanceInfo`\<`TFormat`\>

A `TokenBalanceInfo` object containing the allowance and a boolean indicating if it has enough allowance.

#### Inherited from

[`LiquidityAbstract`](LiquidityAbstract.md).[`hasGotEnoughFromTokenAllowance`](LiquidityAbstract.md#hasgotenoughfromtokenallowance)

#### Defined in

packages/core/src/liquidity/liquidity.abstract.ts:336

***

### processSubscriptionUpdate()

> `protected` **processSubscriptionUpdate**(`subscription`, `currentBlockNumber`?): `Promise`\<`void`\>

Processes an update for a single subscription, generating and emitting new quotes if needed.
This is the core update mechanism that generates new liquidity quotes when conditions change.

#### Parameters

• **subscription**: `LiquiditySubscription`\<`TFormat`\>

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

packages/core/src/liquidity/liquidity.ts:789

***

### removeLiquidity()

> **removeLiquidity**(`params`): `Promise`\<`LiquidityContext`\<`TFormat`\>\>

Removes liquidity from a DEX.
This method generates the necessary liquidity context and starts monitoring block changes.

#### Parameters

• **params**: `RemoveLiquidityParams`\<`"decimal"`\>

#### Returns

`Promise`\<`LiquidityContext`\<`TFormat`\>\>

#### Defined in

packages/core/src/liquidity/liquidity.ts:227

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

packages/core/src/liquidity/liquidity.ts:419

***

### setupLiquiditySubscription()

> `protected` **setupLiquiditySubscription**(`params`): `void`

Sets up a subscription for liquidity quote updates.
Creates a new subscription entry with the provided subject and context,
and starts block watching if needed.

#### Parameters

• **params**: `Omit`\<`LiquiditySubscription`\<`TFormat`\>, `"isActive"`\>

The subscription setup parameters

#### Returns

`void`

#### Remarks

The context is cloned to prevent external modifications affecting the internal state.
Block watching is started unless explicitly disabled in settings.

#### Defined in

packages/core/src/liquidity/liquidity.ts:472

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

packages/core/src/liquidity/liquidity.ts:453

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

packages/core/src/liquidity/liquidity.ts:436
