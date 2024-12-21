[**@dex-toolkit/core v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/core](../README.md) / LiquidityAbstract

# Class: `abstract` LiquidityAbstract\<TFormat\>

Abstract class for managing liquidity-related operations in a decentralized exchange (DEX).

## Extended by

- [`LiquidityProtocolV2`](LiquidityProtocolV2.md)
- [`LiquidityProtocolV3`](LiquidityProtocolV3.md)
- [`Liquidity`](Liquidity.md)

## Type Parameters

• **TFormat** *extends* `TradeFormat`

The trade format type.

## Constructors

### new LiquidityAbstract()

> **new LiquidityAbstract**\<`TFormat`\>(`params`): [`LiquidityAbstract`](LiquidityAbstract.md)\<`TFormat`\>

Initializes a new instance of the `LiquidityAbstract` class.

#### Parameters

• **params**: [`LiquidityProtocolArgs`](../type-aliases/LiquidityProtocolArgs.md)\<`TFormat`\>

The parameters required to initialize the instance.

#### Returns

[`LiquidityAbstract`](LiquidityAbstract.md)\<`TFormat`\>

#### Defined in

[packages/core/src/liquidity/liquidity.abstract.ts:141](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/core/src/liquidity/liquidity.abstract.ts#L141)

## Properties

### \_dexConfigsByDex

> `protected` **\_dexConfigsByDex**: `DexConfigsByDex`

DEX configurations indexed by DEX tag.

#### Defined in

[packages/core/src/liquidity/liquidity.abstract.ts:124](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/core/src/liquidity/liquidity.abstract.ts#L124)

***

### \_dexProvider

> `protected` **\_dexProvider**: `DexProvider`

The DEX provider for managing blockchain interactions.

#### Defined in

[packages/core/src/liquidity/liquidity.abstract.ts:114](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/core/src/liquidity/liquidity.abstract.ts#L114)

***

### \_multiPriceContext

> `protected` **\_multiPriceContext**: `MultiPriceContext`

Context for handling multiple price-related operations.

#### Defined in

[packages/core/src/liquidity/liquidity.abstract.ts:129](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/core/src/liquidity/liquidity.abstract.ts#L129)

***

### \_nativeCurrencyInfo

> `protected` **\_nativeCurrencyInfo**: `NativeCurrencyInfo`

Information about the native currency for the current network.

#### Defined in

[packages/core/src/liquidity/liquidity.abstract.ts:104](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/core/src/liquidity/liquidity.abstract.ts#L104)

***

### \_nativeWrappedTokenInfo

> `protected` **\_nativeWrappedTokenInfo**: `NativeWrappedTokenInfo`

Information about the wrapped native token for the current network.

#### Defined in

[packages/core/src/liquidity/liquidity.abstract.ts:109](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/core/src/liquidity/liquidity.abstract.ts#L109)

***

### \_settings

> `protected` **\_settings**: `LiquiditySettings`

Configuration settings for liquidity operations.

#### Defined in

[packages/core/src/liquidity/liquidity.abstract.ts:119](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/core/src/liquidity/liquidity.abstract.ts#L119)

***

### \_tokenA

> `protected` **\_tokenA**: `Token`

The "from" token in liquidity operations.

#### Defined in

[packages/core/src/liquidity/liquidity.abstract.ts:84](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/core/src/liquidity/liquidity.abstract.ts#L84)

***

### \_tokenAContract

> `protected` **\_tokenAContract**: [`TokenContract`](TokenContract.md)

The contract instance for the "from" token.

#### Defined in

[packages/core/src/liquidity/liquidity.abstract.ts:94](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/core/src/liquidity/liquidity.abstract.ts#L94)

***

### \_tokenB

> `protected` **\_tokenB**: `Token`

The "to" token in liquidity operations.

#### Defined in

[packages/core/src/liquidity/liquidity.abstract.ts:89](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/core/src/liquidity/liquidity.abstract.ts#L89)

***

### \_tokenBContract

> `protected` **\_tokenBContract**: [`TokenContract`](TokenContract.md)

The contract instance for the "to" token.

#### Defined in

[packages/core/src/liquidity/liquidity.abstract.ts:99](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/core/src/liquidity/liquidity.abstract.ts#L99)

***

### \_tokens

> `protected` **\_tokens**: [`Tokens`](Tokens.md)

Factory for managing token-related operations.

#### Defined in

[packages/core/src/liquidity/liquidity.abstract.ts:134](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/core/src/liquidity/liquidity.abstract.ts#L134)

***

### \_walletAddress

> `protected` **\_walletAddress**: `string`

The wallet address associated with the liquidity operations.

#### Defined in

[packages/core/src/liquidity/liquidity.abstract.ts:79](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/core/src/liquidity/liquidity.abstract.ts#L79)

## Accessors

### dexProvider

> `get` **dexProvider**(): `DexProvider`

Get the dex provider

#### Returns

`DexProvider`

#### Defined in

[packages/core/src/liquidity/liquidity.abstract.ts:288](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/core/src/liquidity/liquidity.abstract.ts#L288)

***

### nativeCurrency

> `get` **nativeCurrency**(): `NativeCurrencyInfo`

Retrieves the native currency information for the current network.

#### Returns

`NativeCurrencyInfo`

The native currency information.

#### Defined in

[packages/core/src/liquidity/liquidity.abstract.ts:306](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/core/src/liquidity/liquidity.abstract.ts#L306)

***

### nativeWrappedTokenInfo

> `get` **nativeWrappedTokenInfo**(): `NativeWrappedTokenInfo`

Retrieves the native wrapped token information for the current network.

#### Returns

`NativeWrappedTokenInfo`

The native wrapped token information.

#### Defined in

[packages/core/src/liquidity/liquidity.abstract.ts:297](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/core/src/liquidity/liquidity.abstract.ts#L297)

***

### tokenA

> `get` **tokenA**(): `Token`

Get the from token

#### Returns

`Token`

#### Defined in

[packages/core/src/liquidity/liquidity.abstract.ts:260](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/core/src/liquidity/liquidity.abstract.ts#L260)

***

### tokenB

> `get` **tokenB**(): `Token`

Get the to token

#### Returns

`Token`

#### Defined in

[packages/core/src/liquidity/liquidity.abstract.ts:267](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/core/src/liquidity/liquidity.abstract.ts#L267)

***

### tokenList

> `get` **tokenList**(): `undefined` \| [`TokenList`](TokenList.md)

Get the token list factory

#### Returns

`undefined` \| [`TokenList`](TokenList.md)

#### Defined in

[packages/core/src/liquidity/liquidity.abstract.ts:281](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/core/src/liquidity/liquidity.abstract.ts#L281)

***

### tokensFactory

> `get` **tokensFactory**(): [`Tokens`](Tokens.md)

Get the tokens factory

#### Returns

[`Tokens`](Tokens.md)

#### Defined in

[packages/core/src/liquidity/liquidity.abstract.ts:274](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/core/src/liquidity/liquidity.abstract.ts#L274)

## Methods

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

#### Defined in

[packages/core/src/liquidity/liquidity.abstract.ts:448](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/core/src/liquidity/liquidity.abstract.ts#L448)

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

[packages/core/src/liquidity/liquidity.abstract.ts:317](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/core/src/liquidity/liquidity.abstract.ts#L317)

***

### getTokenPrices()

> **getTokenPrices**(): `Promise`\<`Record`\<`string`, `number`\>\>

Get the token prices for the from and to tokens, indexed by contract address.

#### Returns

`Promise`\<`Record`\<`string`, `number`\>\>

#### Defined in

[packages/core/src/liquidity/liquidity.abstract.ts:411](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/core/src/liquidity/liquidity.abstract.ts#L411)

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

[packages/core/src/liquidity/liquidity.abstract.ts:379](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/core/src/liquidity/liquidity.abstract.ts#L379)

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

#### Defined in

[packages/core/src/liquidity/liquidity.abstract.ts:336](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/core/src/liquidity/liquidity.abstract.ts#L336)
