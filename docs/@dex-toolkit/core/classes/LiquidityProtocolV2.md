[**@dex-toolkit/core v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/core](../README.md) / LiquidityProtocolV2

# Class: LiquidityProtocolV2\<TFormat\>

Abstract class for managing liquidity-related operations in a decentralized exchange (DEX).

## Extends

- [`LiquidityAbstract`](LiquidityAbstract.md)\<`TFormat`\>

## Type Parameters

• **TFormat** *extends* `TradeFormat`

The format type.

## Constructors

### new LiquidityProtocolV2()

> **new LiquidityProtocolV2**\<`TFormat`\>(`context`): [`LiquidityProtocolV2`](LiquidityProtocolV2.md)\<`TFormat`\>

#### Parameters

• **context**: [`LiquidityProtocolArgs`](../type-aliases/LiquidityProtocolArgs.md)\<`TFormat`\>

#### Returns

[`LiquidityProtocolV2`](LiquidityProtocolV2.md)\<`TFormat`\>

#### Overrides

[`LiquidityAbstract`](LiquidityAbstract.md).[`constructor`](LiquidityAbstract.md#constructors)

#### Defined in

packages/core/src/liquidity/liquidity.protocol.v2.ts:98

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

### \_factoryContractByDex

> `protected` **\_factoryContractByDex**: `Record`\<`string`, `Record`\<\`$\{number\}-$\{number\}-$\{number\}\`, `FactoryContractV2`\>\> = `{}`

#### Defined in

packages/core/src/liquidity/liquidity.protocol.v2.ts:84

***

### \_liquidityProviderFeeByDex

> `protected` **\_liquidityProviderFeeByDex**: `Record`\<`string`, `Record`\<\`$\{number\}-$\{number\}-$\{number\}\`, `number`\>\> = `{}`

#### Defined in

packages/core/src/liquidity/liquidity.protocol.v2.ts:74

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

### \_pairContractInfoByDex

> `protected` **\_pairContractInfoByDex**: `Record`\<`string`, `Record`\<\`$\{number\}-$\{number\}-$\{number\}\`, [`PairContractInfo`](../type-aliases/PairContractInfo.md)\>\> = `{}`

Holds cached pair contract factory by dex tag
Should not call directly, use `getPairContract` instead

#### Defined in

packages/core/src/liquidity/liquidity.protocol.v2.ts:93

***

### \_routerContractByDex

> `protected` **\_routerContractByDex**: `Record`\<`string`, `Record`\<\`$\{number\}-$\{number\}-$\{number\}\`, `RouterContractV2`\>\> = `{}`

#### Defined in

packages/core/src/liquidity/liquidity.protocol.v2.ts:79

***

### \_settings

> `protected` **\_settings**: `LiquiditySettings`

Configuration settings for liquidity operations.

#### Inherited from

[`LiquidityAbstract`](LiquidityAbstract.md).[`_settings`](LiquidityAbstract.md#_settings)

#### Defined in

packages/core/src/liquidity/liquidity.abstract.ts:119

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

### protocol

> `get` **protocol**(): `DexProtocol`

#### Returns

`DexProtocol`

#### Defined in

packages/core/src/liquidity/liquidity.protocol.v2.ts:188

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

### generateAddContextV2()

> **generateAddContextV2**(`params`, `id`): `Promise`\<`InternalLiquidityContext`\<`"dexnumber"`\>\>

Generates the context required for adding liquidity in a Uniswap V2-style DEX.
This method performs several validation checks on the provided token amounts, fetches allowance and balance details for the tokens, calculates the expected liquidity based on the pool's reserves, and prepares the transaction for adding liquidity.

#### Parameters

• **params**: `AddLiquidityParamsV2`\<`"dexnumber"`\>

The parameters required to add liquidity:
 - `tokenAAmount`: The amount of token A to add to the liquidity pool.
 - `tokenBAmount`: The amount of token B to add to the liquidity pool.
 - `dexTag`: The identifier for the DEX (e.g., 'uniswap').

• **id**: `string`

Unique identifier for the context

#### Returns

`Promise`\<`InternalLiquidityContext`\<`"dexnumber"`\>\>

A `InternalLiquidityContext<TFormat>` object containing:
 - Information about the tokens (balances, allowances, etc.).
 - The expected liquidity to be added.
 - Slippage and pool share calculations.
 - Transactions required to approve allowances or add liquidity.

#### Throws

If any of the provided parameters are invalid or if the pool reserves are zero.

#### Defined in

packages/core/src/liquidity/liquidity.protocol.v2.ts:1056

***

### generateAddLiquidityTransaction()

> **generateAddLiquidityTransaction**(`params`): `Promise`\<`DexTransaction`\>

Generates a transaction for adding liquidity to the DEX, supporting both Token-Token and Token-ETH pairs. Depending on the tokens involved (Token/Token or Token/ETH), the function encodes the appropriate call to the router contract.

#### Parameters

• **params**

The parameters required to generate the add liquidity transaction.

• **params.dexTag**: `string`

The identifier/tag for the specific DEX configuration.

• **params.tokenAAmount**: `DexNumber`

The amount of token A to add to the liquidity pool.

• **params.tokenBAmount**: `DexNumber`

The amount of token B or ETH to add to the liquidity pool.

• **params.versionTag**: \`$\{number\}-$\{number\}-$\{number\}\`

The version tag for the specific DEX configuration.

#### Returns

`Promise`\<`DexTransaction`\>

A promise that resolves to a DexTransaction object containing the transaction data.

#### Throws

DexError - Throws if token amounts are invalid or if the router contract is not found for the specified dexTag.

#### Defined in

packages/core/src/liquidity/liquidity.protocol.v2.ts:717

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

### generateLPTokenRouterAllowanceTransaction()

> **generateLPTokenRouterAllowanceTransaction**(`params`): `Promise`\<`DexTransaction`\>

Generates a transaction to approve the router contract to spend the maximum allowance for a token.

#### Parameters

• **params**

Configuration parameters

• **params.amount?**: `string`

The amount to approve. If not provided, the maximum amount will be used.

• **params.dexTag**: `string`

The identifier/tag for the specific DEX configuration

• **params.versionTag**: \`$\{number\}-$\{number\}-$\{number\}\`

The dex version tag

#### Returns

`Promise`\<`DexTransaction`\>

Promise resolving to the transaction data

#### Throws

If configuration is invalid or transaction generation fails

#### Defined in

packages/core/src/liquidity/liquidity.protocol.v2.ts:601

***

### generatePermitData()

> `protected` **generatePermitData**(`params`): `Promise`\<`RemoveLiquidityPermit`\>

Generates permit data for EIP-2612 permit signatures when removing liquidity.
This method creates permit data that allows approving LP token spending without requiring a separate transaction.

#### Parameters

• **params**

The parameters for generating the permit data

• **params.dexTag**: `string`

The identifier for the DEX (e.g., 'uniswap')

• **params.lpTokenAmount**: `DexNumber`

The amount of LP tokens to approve

• **params.versionTag**: \`$\{number\}-$\{number\}-$\{number\}\`

The version tag for the DEX

#### Returns

`Promise`\<`RemoveLiquidityPermit`\>

A promise that resolves to the permit data required for removing liquidity

#### Throws

If the signer is not available or if permit generation fails

#### Defined in

packages/core/src/liquidity/liquidity.protocol.v2.ts:1666

***

### generateRemoveContextV2()

> **generateRemoveContextV2**(`params`, `id`): `Promise`\<`InternalLiquidityContext`\<`"dexnumber"`\>\>

Generates the context required for removing liquidity in a Uniswap V2-style DEX.
This method validates the provided token amounts and liquidity amounts, fetches allowance and balance details, and prepares the transaction for removing liquidity from the pool.

#### Parameters

• **params**: `RemoveLiquidityParamsV2`\<`"dexnumber"`\>

The parameters required to remove liquidity:
 - `lpTokenAmount`: The amount of liquidity pool tokens to remove.
 - `minTokenAAmount`: The minimum amount of token A to remove from the pool.
 - `minTokenBAmount`: The minimum amount of token B to remove from the pool.
 - `dexTag`: The identifier for the DEX (e.g., 'uniswap').
 - `permit` (optional): A permit for LP tokens, if used.
 - `supportFeeOnTransferTokens` (optional): Whether to support tokens with transfer fees.

• **id**: `string`

Unique identifier for the context

#### Returns

`Promise`\<`InternalLiquidityContext`\<`"dexnumber"`\>\>

A `InternalLiquidityContext<TFormat>` object containing:
 - Information about the tokens and liquidity pool.
 - The expected liquidity to be removed.
 - Pool share and price calculations.
 - Transactions required to approve LP token transfers or remove liquidity.

#### Throws

If any of the provided parameters are invalid or if no LP token is found for the pair.

#### Defined in

packages/core/src/liquidity/liquidity.protocol.v2.ts:1377

***

### generateRemoveLiquidityTransaction()

> **generateRemoveLiquidityTransaction**(`params`): `Promise`\<`DexTransaction`\>

Generates a transaction for removing liquidity from a DEX.

#### Parameters

• **params**

The parameters required to generate the remove liquidity transaction.

• **params.dexTag**: `string`

The DEX tag identifier for the specific DEX configuration.

• **params.lpTokenAmount**: `DexNumber`

The amount of LP tokens to remove from the liquidity pool.

• **params.minTokenAAmount**: `DexNumber`

The minimum amount of token A to receive (non-ETH pair).

• **params.minTokenBAmount**: `DexNumber`

The minimum amount of token B or ETH to receive.

• **params.permitOptions?**: `RemoveLiquidityPermitOptions`

The optional permit data, used for approvals with permit signature.

• **params.supportFeeOnTransferTokens?**: `boolean` = `false`

Whether to support fee-on-transfer tokens (ETH only).

• **params.versionTag**: \`$\{number\}-$\{number\}-$\{number\}\`

The version tag identifier for the specific DEX configuration.

#### Returns

`Promise`\<`DexTransaction`\>

A promise resolving to a `DexTransaction` object containing the transaction data.

#### Throws

Throws an error if the LP token amount is less than or equal to zero, if the router or pair contract is not found, or if the LP token is not found.

#### Defined in

packages/core/src/liquidity/liquidity.protocol.v2.ts:856

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

### getFactoryContract()

> **getFactoryContract**(`dexTag`, `versionTag`): `FactoryContractV2`

#### Parameters

• **dexTag**: `string`

• **versionTag**: \`$\{number\}-$\{number\}-$\{number\}\`

#### Returns

`FactoryContractV2`

#### Defined in

packages/core/src/liquidity/liquidity.protocol.v2.ts:230

***

### getLPTokenRouterAllowance()

> **getLPTokenRouterAllowance**(`params`): `Promise`\<`string`\>

Retrieves the LP token allowance for the router contract.

#### Parameters

• **params**

Configuration parameters

• **params.dexTag**: `string`

The identifier/tag for the specific DEX configuration

• **params.versionTag**: \`$\{number\}-$\{number\}-$\{number\}\`

The dex version tag

• **params.walletAddress**: `string`

The user's wallet address

#### Returns

`Promise`\<`string`\>

Promise resolving to the router allowance

#### Throws

If configuration is invalid or allowance check fails

#### Defined in

packages/core/src/liquidity/liquidity.protocol.v2.ts:507

***

### getLiquidityPoolReserves()

> **getLiquidityPoolReserves**(`params`): `Promise`\<`object`\>

Fetches the reserves of token A and token B for a v2 liquidity pool.
Ensures reserves are aligned with the class's tokenA and tokenB order,
regardless of their order in the contract.

#### Parameters

• **params**

The parameters required to fetch the liquidity pool reserves.

• **params.dexTag**: `string`

The identifier/tag for the specific DEX configuration.

• **params.versionTag**: \`$\{number\}-$\{number\}-$\{number\}\`

The dex version tag.

#### Returns

`Promise`\<`object`\>

The pool reserve information and total LP token supply.

##### poolInfo

> **poolInfo**: `PoolReserve`

##### totalLPTokenSupply

> **totalLPTokenSupply**: `DexNumber`

#### Throws

If contracts aren't found or if token addresses don't match

#### Defined in

packages/core/src/liquidity/liquidity.protocol.v2.ts:357

***

### getLiquidityProviderFee()

> **getLiquidityProviderFee**(`dexTag`, `versionTag`): `number`

#### Parameters

• **dexTag**: `string`

• **versionTag**: \`$\{number\}-$\{number\}-$\{number\}\`

#### Returns

`number`

#### Defined in

packages/core/src/liquidity/liquidity.protocol.v2.ts:192

***

### getLpTokenContract()

> **getLpTokenContract**(`dexTag`, `versionTag`): `Promise`\<`undefined` \| [`TokenContract`](TokenContract.md)\>

#### Parameters

• **dexTag**: `string`

• **versionTag**: \`$\{number\}-$\{number\}-$\{number\}\`

#### Returns

`Promise`\<`undefined` \| [`TokenContract`](TokenContract.md)\>

#### Defined in

packages/core/src/liquidity/liquidity.protocol.v2.ts:333

***

### getPairAndLpTokenContract()

> **getPairAndLpTokenContract**(`dexTag`, `versionTag`): `Promise`\<[`PairContractInfo`](../type-aliases/PairContractInfo.md)\>

#### Parameters

• **dexTag**: `string`

• **versionTag**: \`$\{number\}-$\{number\}-$\{number\}\`

#### Returns

`Promise`\<[`PairContractInfo`](../type-aliases/PairContractInfo.md)\>

#### Defined in

packages/core/src/liquidity/liquidity.protocol.v2.ts:249

***

### getPairContract()

> **getPairContract**(`dexTag`, `versionTag`): `Promise`\<`PairContract`\>

#### Parameters

• **dexTag**: `string`

• **versionTag**: \`$\{number\}-$\{number\}-$\{number\}\`

#### Returns

`Promise`\<`PairContract`\>

#### Defined in

packages/core/src/liquidity/liquidity.protocol.v2.ts:325

***

### getRouterContract()

> **getRouterContract**(`dexTag`, `versionTag`): `RouterContractV2`

#### Parameters

• **dexTag**: `string`

• **versionTag**: \`$\{number\}-$\{number\}-$\{number\}\`

#### Returns

`RouterContractV2`

#### Defined in

packages/core/src/liquidity/liquidity.protocol.v2.ts:211

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
