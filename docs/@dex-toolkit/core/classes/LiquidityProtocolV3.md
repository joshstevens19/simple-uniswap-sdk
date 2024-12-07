[**@dex-toolkit/core v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/core](../README.md) / LiquidityProtocolV3

# Class: LiquidityProtocolV3\<TFormat\>

Abstract class for managing liquidity-related operations in a decentralized exchange (DEX).

## Extends

- [`LiquidityAbstract`](LiquidityAbstract.md)\<`TFormat`\>

## Type Parameters

• **TFormat** *extends* `TradeFormat`

The format type.

## Constructors

### new LiquidityProtocolV3()

> **new LiquidityProtocolV3**\<`TFormat`\>(`context`): [`LiquidityProtocolV3`](LiquidityProtocolV3.md)\<`TFormat`\>

Initializes a new instance of the LiquidityProtocolV3 class.

#### Parameters

• **context**: [`LiquidityProtocolArgs`](../type-aliases/LiquidityProtocolArgs.md)\<`TFormat`\>

Contains internal arguments needed for setting up liquidity in the protocol.

#### Returns

[`LiquidityProtocolV3`](LiquidityProtocolV3.md)\<`TFormat`\>

#### Throws

DexError - If the required V3 contract details are missing in any DEX config.

#### Overrides

[`LiquidityAbstract`](LiquidityAbstract.md).[`constructor`](LiquidityAbstract.md#constructors)

#### Defined in

packages/core/src/liquidity/liquidity.protocol.v3.ts:111

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

> `protected` **\_factoryContractByDex**: `Record`\<`string`, `Record`\<\`$\{number\}-$\{number\}-$\{number\}\`, `FactoryContractV3`\>\> = `{}`

#### Defined in

packages/core/src/liquidity/liquidity.protocol.v3.ts:81

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

### \_poolContractInfoByDex

> `protected` **\_poolContractInfoByDex**: `Record`\<`string`, `Record`\<\`$\{number\}-$\{number\}-$\{number\}\`, `object`\>\> = `{}`

Holds cached pool contract factory by dex tag
Should not call directly, use `getPoolContract` instead

#### Defined in

packages/core/src/liquidity/liquidity.protocol.v3.ts:100

***

### \_positionManagerContractByDex

> `protected` **\_positionManagerContractByDex**: `Record`\<`string`, `Record`\<\`$\{number\}-$\{number\}-$\{number\}\`, `PositionManagerContractV3`\>\> = `{}`

#### Defined in

packages/core/src/liquidity/liquidity.protocol.v3.ts:91

***

### \_quoterContractByDex

> `protected` **\_quoterContractByDex**: `Record`\<`string`, `Record`\<\`$\{number\}-$\{number\}-$\{number\}\`, `QuoterContractV3`\>\> = `{}`

#### Defined in

packages/core/src/liquidity/liquidity.protocol.v3.ts:86

***

### \_routerContractByDex

> `protected` **\_routerContractByDex**: `Record`\<`string`, `Record`\<\`$\{number\}-$\{number\}-$\{number\}\`, `RouterContractV3`\>\> = `{}`

#### Defined in

packages/core/src/liquidity/liquidity.protocol.v3.ts:76

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

packages/core/src/liquidity/liquidity.protocol.v3.ts:224

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

### generateAddContextV3()

> **generateAddContextV3**(`params`, `id`?): `Promise`\<`InternalLiquidityContext`\<`"dexnumber"`\>\>

Generates the context required for adding liquidity in a Uniswap V3-style DEX.
This method validates token amounts, calculates liquidity based on price ranges (ticks), fetches pool reserves, and prepares the transaction for adding liquidity.

#### Parameters

• **params**: `AddLiquidityParamsV3`\<`"dexnumber"`\>

The parameters required to add liquidity:
 - `tokenAAmount`: The amount of token A to add.
 - `tokenBAmount`: The amount of token B to add.
 - `dexTag`: The identifier for the DEX (e.g., 'uniswapV3').
 - `feeTier`: The fee tier for the liquidity pool.
 - `priceRange` (optional): The tick range for the liquidity position.
 - `lpTokenId` (optional): The token ID for an existing liquidity position.

• **id?**: `string`

Optional unique identifier for the context

#### Returns

`Promise`\<`InternalLiquidityContext`\<`"dexnumber"`\>\>

A `InternalLiquidityContext<TFormat>` object with:
 - Token information, including balances, allowances, and amounts.
 - Calculated liquidity and price information.
 - Transactions required to approve allowances or add liquidity.

#### Throws

If any parameters are invalid or if pool reserves are missing.

#### Defined in

packages/core/src/liquidity/liquidity.protocol.v3.ts:1686

***

### generateAddLiquidityTransaction()

> **generateAddLiquidityTransaction**(`params`): `Promise`\<`DexTransaction`\>

Generates an Add Liquidity transaction for Uniswap V3.
If liquidity already exists for the pool, it calls `generateIncreaseLiquidityTransaction`.
Otherwise, it proceeds with adding a new liquidity position via `encodeMint`.

#### Parameters

• **params**

The parameters required to add liquidity.

• **params.dexTag**: `string`

The identifier of the DEX to interact with.

• **params.feeTier**: `number`

The fee tier for the Uniswap V3 pool (required if no `tokenId` is provided).

• **params.tickLower**: `number`

The lower tick of the position.

• **params.tickUpper**: `number`

The upper tick of the position.

• **params.tokenA**: `Token`

• **params.tokenAAmount**: `DexNumber`

The amount of token A to add to the pool.

• **params.tokenB**: `Token`

• **params.tokenBAmount**: `DexNumber`

The amount of token B to add to the pool.

• **params.tokenId?**: `string`

(Optional) The tokenId representing the existing liquidity position.

• **params.versionTag**: \`$\{number\}-$\{number\}-$\{number\}\`

The version of the DEX to interact with.

#### Returns

`Promise`\<`DexTransaction`\>

A DexTransaction object containing the transaction data.

#### Defined in

packages/core/src/liquidity/liquidity.protocol.v3.ts:1220

***

### generateApproveMaxPositionManagerAllowanceTransaction()

> **generateApproveMaxPositionManagerAllowanceTransaction**(`params`): `Promise`\<`DexTransaction`\>

Generates a transaction to approve the router contract to spend the maximum allowance for a token.

#### Parameters

• **params**

Parameters for approving the router contract.

• **params.dexTag**: `string`

The identifier/tag for the specific DEX configuration.

• **params.tokenContract**: [`TokenContract`](TokenContract.md)

The token factory contract.

• **params.versionTag**: \`$\{number\}-$\{number\}-$\{number\}\`

The version tag.

#### Returns

`Promise`\<`DexTransaction`\>

A promise resolving to the transaction data.

#### Defined in

packages/core/src/liquidity/liquidity.protocol.v3.ts:696

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

### generateCollectFeesTransaction()

> **generateCollectFeesTransaction**(`params`): `Promise`\<`DexTransaction`\>

Generates a transaction to collect fees from an existing Uniswap V3 liquidity position.

#### Parameters

• **params**

Parameters for collecting fees.

• **params.amount0Max**: `DexNumber`

Maximum amount of token A to collect.

• **params.amount1Max**: `DexNumber`

Maximum amount of token B to collect.

• **params.dexTag**: `string`

Identifier for the DEX where fees will be collected.

• **params.tokenId**: `string`

The NFT token ID representing the liquidity position.

• **params.versionTag**: \`$\{number\}-$\{number\}-$\{number\}\`

The version tag.

#### Returns

`Promise`\<`DexTransaction`\>

The generated transaction object.

#### Throws

Throws an error if the position manager contract is not found for the given DEX tag.

#### Defined in

packages/core/src/liquidity/liquidity.protocol.v3.ts:621

***

### generateCreateAndInitializePoolTransaction()

> **generateCreateAndInitializePoolTransaction**(`params`): `Promise`\<`DexTransaction`\>

Generates a transaction to create and initialize a Uniswap V3 pool if it does not already exist.
This method should be called when adding liquidity to a pool that might not yet exist or is uninitialized.

#### Parameters

• **params**

The parameters required to create and initialize the pool.

• **params.dexTag**: `string`

The identifier of the DEX to interact with.

• **params.feeTier**: `number`

The fee tier for the pool (e.g., 500, 3000, 10000).

• **params.sqrtPriceX96**: `DexNumber`

The initial price of the pool represented as a square root value scaled by 2^96.

• **params.token0**: `string`

The address of the first token in the pool.

• **params.token1**: `string`

The address of the second token in the pool.

• **params.versionTag**: \`$\{number\}-$\{number\}-$\{number\}\`

The version tag.

#### Returns

`Promise`\<`DexTransaction`\>

A DexTransaction object containing the transaction data.

#### Throws

Throws an error if the position manager contract is not found for the given DEX tag.

#### Defined in

packages/core/src/liquidity/liquidity.protocol.v3.ts:543

***

### generateDecreaseLiquidityTransaction()

> **generateDecreaseLiquidityTransaction**(`params`): `Promise`\<`DexTransaction`\>

Generates a transaction to decrease liquidity in an existing Uniswap V3 position.

#### Parameters

• **params**

Parameters for decreasing liquidity.

• **params.dexTag**: `string`

Identifier for the DEX where liquidity will be decreased.

• **params.liquidityAmount**: `DexNumber`

Amount of liquidity to remove from the position.

• **params.minTokenAAmount**: `DexNumber`

Minimum amount of token A to receive after removing liquidity.

• **params.minTokenBAmount**: `DexNumber`

Minimum amount of token B to receive after removing liquidity.

• **params.tokenId**: `string`

The NFT token ID representing the liquidity position.

• **params.versionTag**: \`$\{number\}-$\{number\}-$\{number\}\`

Identifier for the version of the DEX protocol.

#### Returns

`Promise`\<`DexTransaction`\>

The generated transaction object.

#### Throws

Throws an error if the position manager contract is not found for the given DEX tag.

#### Defined in

packages/core/src/liquidity/liquidity.protocol.v3.ts:1588

***

### generateIncreaseLiquidityTransaction()

> **generateIncreaseLiquidityTransaction**(`params`): `Promise`\<`DexTransaction`\>

Generates a transaction to increase liquidity in an existing Uniswap V3 position.

#### Parameters

• **params**

Parameters for increasing liquidity.

• **params.dexTag**: `string`

Identifier for the DEX where liquidity will be increased.

• **params.tokenAAmount**: `DexNumber`

Amount of token A to add to the position.

• **params.tokenBAmount**: `DexNumber`

Amount of token B to add to the position.

• **params.tokenId**: `string`

The NFT token ID representing the liquidity position.

• **params.versionTag**: \`$\{number\}-$\{number\}-$\{number\}\`

Identifier for the version of the DEX.

#### Returns

`Promise`\<`DexTransaction`\>

The generated transaction object.

#### Throws

Throws an error if the position manager contract is not found for the given DEX tag.

#### Defined in

packages/core/src/liquidity/liquidity.protocol.v3.ts:1388

***

### generateRemoveContextV3()

> **generateRemoveContextV3**(`params`, `id`?): `Promise`\<`InternalLiquidityContext`\<`"dexnumber"`\>\>

Generates the context required for removing liquidity in a Uniswap V3-style DEX.
This method validates liquidity amounts, calculates pool shares and prices, fetches allowances
and balances, and prepares the transaction for removing liquidity.

#### Parameters

• **params**: `RemoveLiquidityParamsV3`\<`"dexnumber"`\>

The parameters required to remove liquidity:
 - `lpTokenId`: The token ID of the liquidity position to remove.
 - `minTokenAAmount`: The minimum amount of token A to remove from the pool.
 - `minTokenBAmount`: The minimum amount of token B to remove from the pool.
 - `dexTag`: The identifier for the DEX (e.g., 'uniswapV3').

• **id?**: `string`

Optional unique identifier for the context

#### Returns

`Promise`\<`InternalLiquidityContext`\<`"dexnumber"`\>\>

A `InternalLiquidityContext<TFormat>` object containing:
 - Token and liquidity pool information.
 - Pool share calculations before and after liquidity removal.
 - Transactions required to approve the NFT transfer or remove liquidity.

#### Throws

If any parameters are invalid or if no liquidity position is found.

#### Defined in

packages/core/src/liquidity/liquidity.protocol.v3.ts:1979

***

### generateRemoveLiquidityTransaction()

> **generateRemoveLiquidityTransaction**(`params`): `Promise`\<`DexTransaction`\>

Generates a Remove Liquidity transaction for Uniswap V3.
If the entire liquidity is being removed, it calls `burn` to burn the LP token.
If only part of the liquidity is being removed, it calls `generateDecreaseLiquidityTransaction`.

#### Parameters

• **params**

The parameters required to remove liquidity.

• **params.dexTag**: `string`

The identifier of the DEX to interact with.

• **params.liquidityAmount**: `DexNumber`

The amount of liquidity to remove.

• **params.minTokenAAmount**: `DexNumber`

The minimum amount of token A to receive.

• **params.minTokenBAmount**: `DexNumber`

The minimum amount of token B to receive.

• **params.tokenId**: `string`

The NFT token ID representing the liquidity position.

• **params.versionTag**: \`$\{number\}-$\{number\}-$\{number\}\`

The version of the DEX to interact with.

#### Returns

`Promise`\<`DexTransaction`\>

A DexTransaction object containing the transaction data.

#### Defined in

packages/core/src/liquidity/liquidity.protocol.v3.ts:1478

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

> **getFactoryContract**(`dexTag`, `versionTag`): `FactoryContractV3`

Retrieves the factory contract associated with a specific DEX and version.

#### Parameters

• **dexTag**: `string`

Identifier for the DEX.

• **versionTag**: \`$\{number\}-$\{number\}-$\{number\}\`

Version of the DEX.

#### Returns

`FactoryContractV3`

FactoryContractV3 instance for the DEX and version.

#### Throws

DexError - If dexTag, versionTag, or the factory contract is invalid or not found.

#### Defined in

packages/core/src/liquidity/liquidity.protocol.v3.ts:263

***

### getLiquidityPoolDetails()

> **getLiquidityPoolDetails**(`params`): `Promise`\<`object`\>

Retrieves liquidity pool details for a specific DEX tag, version, and fee tier.

#### Parameters

• **params**

The parameters for obtaining pool details.

• **params.dexTag**: `string`

• **params.feeTier**: `number`

• **params.priceRange?**: `LiquidityPriceRange`

• **params.versionTag**: \`$\{number\}-$\{number\}-$\{number\}\`

#### Returns

`Promise`\<`object`\>

Object with various pool attributes including liquidity and ticks.

##### currentTick

> **currentTick**: `number`

##### feeProtocol

> **feeProtocol**: `number`

##### observationCardinality

> **observationCardinality**: `number`

##### observationCardinalityNext

> **observationCardinalityNext**: `number`

##### observationIndex

> **observationIndex**: `number`

##### sqrtPriceX96

> **sqrtPriceX96**: `DexNumber`

##### tickLower

> **tickLower**: `number`

##### tickUpper

> **tickUpper**: `number`

##### totalLiquidity

> **totalLiquidity**: `DexNumber`

##### unlocked

> **unlocked**: `boolean`

#### Throws

DexError - If any parameter is invalid or the pool details retrieval fails.

#### Defined in

packages/core/src/liquidity/liquidity.protocol.v3.ts:832

***

### getLiquidityPoolReserves()

> **getLiquidityPoolReserves**(`params`): `Promise`\<`object`\>

Fetches the liquidity pool reserves for a given DEX tag.

#### Parameters

• **params**

The parameters required to fetch the liquidity pool reserves.

• **params.dexTag**: `string`

The identifier of the DEX to interact with.

• **params.versionTag**: \`$\{number\}-$\{number\}-$\{number\}\`

The version of the DEX to interact with.

#### Returns

`Promise`\<`object`\>

An object containing the pool information and total LP token supply.

##### poolInfo

> **poolInfo**: `PoolReserve`

##### totalLPTokenSupply

> **totalLPTokenSupply**: `DexNumber`

#### Defined in

packages/core/src/liquidity/liquidity.protocol.v3.ts:421

***

### getLiquidityPositionByLpTokenId()

> **getLiquidityPositionByLpTokenId**(`params`): `Promise`\<`undefined` \| `object`\>

Fetches the liquidity position by a given tokenId using the Uniswap V3 position manager contract.

#### Parameters

• **params**

The parameters required to fetch the liquidity position.

• **params.dexTag**: `string`

The identifier of the DEX to interact with.

• **params.tokenId**: `string`

The NFT token ID representing the liquidity position.

• **params.versionTag**: \`$\{number\}-$\{number\}-$\{number\}\`

The version tag.

#### Returns

`Promise`\<`undefined` \| `object`\>

The liquidity position details if found, otherwise returns undefined.

#### Throws

DexError if the position manager contract is not found for the provided dexTag.

#### Defined in

packages/core/src/liquidity/liquidity.protocol.v3.ts:937

***

### getPoolContract()

> **getPoolContract**(`dexTag`, `versionTag`, `feeTier`): `Promise`\<`PoolContractV3`\>

Retrieves or initializes a pool contract for a specified DEX tag, version, and fee tier.

#### Parameters

• **dexTag**: `string`

DEX identifier.

• **versionTag**: \`$\{number\}-$\{number\}-$\{number\}\`

Version of the DEX protocol.

• **feeTier**: `number`

Fee tier for the pool.

#### Returns

`Promise`\<`PoolContractV3`\>

The PoolContractV3 instance for the specified parameters.

#### Throws

DexError - If any parameter is missing or invalid, or if pool contract details are unavailable.

#### Defined in

packages/core/src/liquidity/liquidity.protocol.v3.ts:346

***

### getPositionManagerContract()

> **getPositionManagerContract**(`dexTag`, `versionTag`): `PositionManagerContractV3`

Fetches the position manager contract for a specified DEX and version.

#### Parameters

• **dexTag**: `string`

Identifier for the DEX.

• **versionTag**: \`$\{number\}-$\{number\}-$\{number\}\`

Version of the DEX protocol.

#### Returns

`PositionManagerContractV3`

PositionManagerContractV3 instance.

#### Throws

DexError - If dexTag or versionTag is invalid or the contract is not found.

#### Defined in

packages/core/src/liquidity/liquidity.protocol.v3.ts:317

***

### getQuoterContractV3()

> **getQuoterContractV3**(`dexTag`, `versionTag`): `QuoterContractV3`

Retrieves the quoter contract for a given DEX and version.

#### Parameters

• **dexTag**: `string`

DEX identifier.

• **versionTag**: \`$\{number\}-$\{number\}-$\{number\}\`

DEX version.

#### Returns

`QuoterContractV3`

QuoterContractV3 instance for specified DEX and version.

#### Throws

DexError - If dexTag or versionTag is invalid or the quoter contract is not found.

#### Defined in

packages/core/src/liquidity/liquidity.protocol.v3.ts:290

***

### getRouterContract()

> **getRouterContract**(`dexTag`, `versionTag`): `RouterContractV3`

Retrieves the router contract associated with a given DEX tag and version.

#### Parameters

• **dexTag**: `string`

Identifier for the specific DEX.

• **versionTag**: \`$\{number\}-$\{number\}-$\{number\}\`

The version of the DEX protocol.

#### Returns

`RouterContractV3`

RouterContractV3 instance for the specified DEX and version.

#### Throws

DexError - If dexTag or versionTag is invalid or if the router contract is not found.

#### Defined in

packages/core/src/liquidity/liquidity.protocol.v3.ts:236

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
