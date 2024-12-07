[**@dex-toolkit/contracts v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/contracts](../README.md) / RouterContractV2

# Class: RouterContractV2

## Extends

- `DexProviderBase`

## Implements

- `Contract`

## Constructors

### new RouterContractV2()

> **new RouterContractV2**(`dexProviderContext`, `contractDetailContext`): [`RouterContractV2`](RouterContractV2.md)

#### Parameters

• **dexProviderContext**: `DexMulticallProviderContext`

• **contractDetailContext**: `ContractDetailContext`

#### Returns

[`RouterContractV2`](RouterContractV2.md)

#### Overrides

`DexProviderBase.constructor`

#### Defined in

packages/contracts/src/router/router-v2.contract.ts:47

## Properties

### \_contract

> `protected` **\_contract**: `ContractContext`

#### Defined in

packages/contracts/src/router/router-v2.contract.ts:43

***

### \_contractDetail

> `protected` **\_contractDetail**: `ContractDetail`

#### Inherited from

`DexProviderBase._contractDetail`

#### Defined in

submodules/ethereum-multicall/packages/provider/dist/esm/multicall-provider-base.d.ts:4

***

### \_methodNames

> `protected` **\_methodNames**: `MethodNameMap`

#### Defined in

packages/contracts/src/router/router-v2.contract.ts:45

***

### \_multicallProvider

> `protected` **\_multicallProvider**: `DexProvider`

#### Inherited from

`DexProviderBase._multicallProvider`

#### Defined in

packages/provider/dist/esm/dex-provider-base.d.ts:6

## Accessors

### contractDetail

> `get` **contractDetail**(): `ContractDetail`

Returns the contract details.

#### Returns

`ContractDetail`

The contract details of the concrete class.

#### Inherited from

`DexProviderBase.contractDetail`

#### Defined in

submodules/ethereum-multicall/packages/provider/dist/esm/multicall-provider-base.d.ts:18

***

### dexProvider

> `get` **dexProvider**(): `DexProvider`

Returns the underlying `DexProvider`.

#### Returns

`DexProvider`

#### Inherited from

`DexProviderBase.dexProvider`

#### Defined in

packages/provider/dist/esm/dex-provider-base.d.ts:11

***

### methodNames

> `get` **methodNames**(): `MethodNameMap`

Get the method names

#### Returns

`MethodNameMap`

#### Defined in

packages/contracts/src/router/router-v2.contract.ts:114

***

### multicallProvider

> `get` **multicallProvider**(): `MulticallProvider`

Returns the underlying `MulticallProvider`.

#### Returns

`MulticallProvider`

The `MulticallProvider` instance used by this class.

#### Inherited from

`DexProviderBase.multicallProvider`

#### Defined in

submodules/ethereum-multicall/packages/provider/dist/esm/multicall-provider-base.d.ts:12

***

### routerContract

> `get` **routerContract**(): `ContractContext`

Get the router contract

#### Returns

`ContractContext`

#### Defined in

packages/contracts/src/router/router-v2.contract.ts:109

## Methods

### WETH()

> **WETH**(): `Promise`\<`string`\>

Returns the WETH address.

#### Returns

`Promise`\<`string`\>

The WETH address.

#### Implementation of

`UniswapRouterV2Types.Contract.WETH`

#### Defined in

packages/contracts/src/router/router-v2.contract.ts:255

***

### WETHCallContext()

> **WETHCallContext**(): `MethodCall`\<`Contract`, `"WETH"`\>

Returns the call context for the WETH method.

#### Returns

`MethodCall`\<`Contract`, `"WETH"`\>

The call context.

#### Defined in

packages/contracts/src/router/router-v2.contract.ts:263

***

### addLiquidity()

> **addLiquidity**(`tokenA`, `tokenB`, `amountADesired`, `amountBDesired`, `amountAMin`, `amountBMin`, `to`, `deadline`, `overrides`?): `Promise`\<`ContractTransaction`\>

Adds liquidity to a token pair.

#### Parameters

• **tokenA**: `string`

The address of token A.

• **tokenB**: `string`

The address of token B.

• **amountADesired**: `BigNumberish`

The desired amount of token A.

• **amountBDesired**: `BigNumberish`

The desired amount of token B.

• **amountAMin**: `BigNumberish`

The minimum amount of token A.

• **amountBMin**: `BigNumberish`

The minimum amount of token B.

• **to**: `string`

The address to receive the liquidity tokens.

• **deadline**: `BigNumberish`

The deadline for the transaction.

• **overrides?**: `ContractTransactionOverrides`

Optional transaction overrides.

#### Returns

`Promise`\<`ContractTransaction`\>

The contract transaction.

#### Implementation of

`UniswapRouterV2Types.Contract.addLiquidity`

#### Defined in

packages/contracts/src/router/router-v2.contract.ts:280

***

### addLiquidityETH()

> **addLiquidityETH**(`token`, `amountTokenDesired`, `amountTokenMin`, `amountETHMin`, `to`, `deadline`, `overrides`?): `Promise`\<`ContractTransaction`\>

Adds liquidity to a token-ETH pair.

#### Parameters

• **token**: `string`

The address of the token.

• **amountTokenDesired**: `BigNumberish`

The desired amount of the token.

• **amountTokenMin**: `BigNumberish`

The minimum amount of the token.

• **amountETHMin**: `BigNumberish`

The minimum amount of ETH.

• **to**: `string`

The address to receive the liquidity tokens.

• **deadline**: `BigNumberish`

The deadline for the transaction.

• **overrides?**: `ContractTransactionOverrides`

Optional transaction overrides.

#### Returns

`Promise`\<`ContractTransaction`\>

The contract transaction.

#### Implementation of

`UniswapRouterV2Types.Contract.addLiquidityETH`

#### Defined in

packages/contracts/src/router/router-v2.contract.ts:349

***

### call()

> **call**\<`TCalls`\>(`calls`, `options`): `Promise`\<`ExecutionResult`\<`Contract`, `TCalls`\>\>

Executes a multicall for the given contract methods.

#### Type Parameters

• **TCalls** *extends* `Record`\<`string`, `MethodCall`\<`Contract`, `"factory"`\> \| `MethodCall`\<`Contract`, `"addLiquidity"`\> \| `MethodCall`\<`Contract`, `"getAmountIn"`\> \| `MethodCall`\<`Contract`, `"getAmountOut"`\> \| `MethodCall`\<`Contract`, `"getAmountsIn"`\> \| `MethodCall`\<`Contract`, `"getAmountsOut"`\> \| `MethodCall`\<`Contract`, `"quote"`\> \| `MethodCall`\<`Contract`, `"removeLiquidity"`\> \| `MethodCall`\<`Contract`, `"removeLiquidityWithPermit"`\> \| `MethodCall`\<`Contract`, `"swapExactTokensForTokens"`\> \| `MethodCall`\<`Contract`, `"swapExactTokensForTokensSupportingFeeOnTransferTokens"`\> \| `MethodCall`\<`Contract`, `"swapTokensForExactTokens"`\> \| `MethodCall`\<`Contract`, `"addLiquidityETH"`\> \| `MethodCall`\<`Contract`, `"removeLiquidityETH"`\> \| `MethodCall`\<`Contract`, `"removeLiquidityETHSupportingFeeOnTransferTokens"`\> \| `MethodCall`\<`Contract`, `"removeLiquidityETHWithPermit"`\> \| `MethodCall`\<`Contract`, `"removeLiquidityETHWithPermitSupportingFeeOnTransferTokens"`\> \| `MethodCall`\<`Contract`, `"swapETHForExactTokens"`\> \| `MethodCall`\<`Contract`, `"swapExactETHForTokens"`\> \| `MethodCall`\<`Contract`, `"swapExactETHForTokensSupportingFeeOnTransferTokens"`\> \| `MethodCall`\<`Contract`, `"swapExactTokensForETH"`\> \| `MethodCall`\<`Contract`, `"swapExactTokensForETHSupportingFeeOnTransferTokens"`\> \| `MethodCall`\<`Contract`, `"swapTokensForExactETH"`\> \| `MethodCall`\<`Contract`, `"WETH"`\>\>

The type of the calls object.

#### Parameters

• **calls**: `TCalls`

An object describing the methods to call and their parameters.

• **options**: `ContractContextOptions` = `{}`

Optional configuration for the contract call.

#### Returns

`Promise`\<`ExecutionResult`\<`Contract`, `TCalls`\>\>

A promise that resolves to an object containing the block number,
         origin context, and the results of each method call.

#### Remarks

This method allows batch calling of multiple contract methods in a single transaction.
It uses the multicall provider to execute all calls efficiently.
The results are typed according to the return types of the called methods.

#### Defined in

packages/contracts/src/router/router-v2.contract.ts:236

***

### encodeAddLiquidity()

> **encodeAddLiquidity**(`tokenA`, `tokenB`, `amountADesired`, `amountBDesired`, `amountAMin`, `amountBMin`, `to`, `deadline`): `string`

Encodes the function data to add liquidity to a token pair.

#### Parameters

• **tokenA**: `string`

The address of token A.

• **tokenB**: `string`

The address of token B.

• **amountADesired**: `BigNumberish`

The desired amount of token A.

• **amountBDesired**: `BigNumberish`

The desired amount of token B.

• **amountAMin**: `BigNumberish`

The minimum amount of token A.

• **amountBMin**: `BigNumberish`

The minimum amount of token B.

• **to**: `string`

The address to receive the liquidity tokens.

• **deadline**: `BigNumberish`

The deadline for the transaction.

#### Returns

`string`

The encoded function data.

#### Defined in

packages/contracts/src/router/router-v2.contract.ts:316

***

### encodeAddLiquidityETH()

> **encodeAddLiquidityETH**(`token`, `amountTokenDesired`, `amountTokenMin`, `amountETHMin`, `to`, `deadline`): `string`

Encodes the function data to add liquidity to a token-ETH pair.

#### Parameters

• **token**: `string`

The address of the token.

• **amountTokenDesired**: `BigNumberish`

The desired amount of the token.

• **amountTokenMin**: `BigNumberish`

The minimum amount of the token.

• **amountETHMin**: `BigNumberish`

The minimum amount of ETH.

• **to**: `string`

The address to receive the liquidity tokens.

• **deadline**: `BigNumberish`

The deadline for the transaction.

#### Returns

`string`

The encoded function data.

#### Defined in

packages/contracts/src/router/router-v2.contract.ts:379

***

### encodeRemoveLiquidity()

> **encodeRemoveLiquidity**(`tokenA`, `tokenB`, `liquidity`, `amountAMin`, `amountBMin`, `to`, `deadline`): `string`

Encodes the function data to remove liquidity from a token pair.

#### Parameters

• **tokenA**: `string`

The address of token A.

• **tokenB**: `string`

The address of token B.

• **liquidity**: `BigNumberish`

The amount of liquidity to remove.

• **amountAMin**: `BigNumberish`

The minimum amount of token A to receive.

• **amountBMin**: `BigNumberish`

The minimum amount of token B to receive.

• **to**: `string`

The address to receive the tokens.

• **deadline**: `BigNumberish`

The deadline for the transaction.

#### Returns

`string`

The encoded function data.

#### Defined in

packages/contracts/src/router/router-v2.contract.ts:629

***

### encodeRemoveLiquidityETH()

> **encodeRemoveLiquidityETH**(`token`, `liquidity`, `amountTokenMin`, `amountETHMin`, `to`, `deadline`): `string`

Encodes the function data to remove liquidity from a token-ETH pair.

#### Parameters

• **token**: `string`

The address of the token.

• **liquidity**: `BigNumberish`

The amount of liquidity to remove.

• **amountTokenMin**: `BigNumberish`

The minimum amount of the token to receive.

• **amountETHMin**: `BigNumberish`

The minimum amount of ETH to receive.

• **to**: `string`

The address to receive the tokens.

• **deadline**: `BigNumberish`

The deadline for the transaction.

#### Returns

`string`

The encoded function data.

#### Defined in

packages/contracts/src/router/router-v2.contract.ts:690

***

### encodeRemoveLiquidityETHSupportingFeeOnTransferTokens()

> **encodeRemoveLiquidityETHSupportingFeeOnTransferTokens**(`token`, `liquidity`, `amountTokenMin`, `amountETHMin`, `to`, `deadline`): `string`

Encodes the function data to remove liquidity from a token-ETH pair, supporting fee-on-transfer tokens.

#### Parameters

• **token**: `string`

The address of the token.

• **liquidity**: `BigNumberish`

The amount of liquidity to remove.

• **amountTokenMin**: `BigNumberish`

The minimum amount of the token to receive.

• **amountETHMin**: `BigNumberish`

The minimum amount of ETH to receive.

• **to**: `string`

The address to receive the tokens.

• **deadline**: `BigNumberish`

The deadline for the transaction.

#### Returns

`string`

The encoded function data.

#### Defined in

packages/contracts/src/router/router-v2.contract.ts:744

***

### encodeRemoveLiquidityETHWithPermit()

> **encodeRemoveLiquidityETHWithPermit**(`token`, `liquidity`, `amountTokenMin`, `amountETHMin`, `to`, `deadline`, `approveMax`, `v`, `r`, `s`): `string`

Encodes the function data to remove liquidity from a token-ETH pair with a permit.

#### Parameters

• **token**: `string`

The address of the token.

• **liquidity**: `BigNumberish`

The amount of liquidity to remove.

• **amountTokenMin**: `BigNumberish`

The minimum amount of the token to receive.

• **amountETHMin**: `BigNumberish`

The minimum amount of ETH to receive.

• **to**: `string`

The address to receive the tokens.

• **deadline**: `BigNumberish`

The deadline for the transaction.

• **approveMax**: `boolean`

Whether to approve the maximum amount.

• **v**: `BigNumberish`

The recovery byte of the signature.

• **r**: `BytesLike`

The first 32 bytes of the signature.

• **s**: `BytesLike`

The second 32 bytes of the signature.

#### Returns

`string`

The encoded function data.

#### Defined in

packages/contracts/src/router/router-v2.contract.ts:818

***

### encodeRemoveLiquidityETHWithPermitSupportingFeeOnTransferTokens()

> **encodeRemoveLiquidityETHWithPermitSupportingFeeOnTransferTokens**(`token`, `liquidity`, `amountTokenMin`, `amountETHMin`, `to`, `deadline`, `approveMax`, `v`, `r`, `s`): `string`

Encodes the function data to remove liquidity from a token-ETH pair with a permit, supporting fee-on-transfer tokens.

#### Parameters

• **token**: `string`

The address of the token.

• **liquidity**: `BigNumberish`

The amount of liquidity to remove.

• **amountTokenMin**: `BigNumberish`

The minimum amount of the token to receive.

• **amountETHMin**: `BigNumberish`

The minimum amount of ETH to receive.

• **to**: `string`

The address to receive the tokens.

• **deadline**: `BigNumberish`

The deadline for the transaction.

• **approveMax**: `boolean`

Whether to approve the maximum amount.

• **v**: `BigNumberish`

The recovery byte of the signature.

• **r**: `BytesLike`

The first 32 bytes of the signature.

• **s**: `BytesLike`

The second 32 bytes of the signature.

#### Returns

`string`

The encoded function data.

#### Defined in

packages/contracts/src/router/router-v2.contract.ts:904

***

### encodeRemoveLiquidityWithPermit()

> **encodeRemoveLiquidityWithPermit**(`tokenA`, `tokenB`, `liquidity`, `amountAMin`, `amountBMin`, `to`, `deadline`, `approveMax`, `v`, `r`, `s`): `string`

Encodes the function data to remove liquidity from a token pair with a permit.

#### Parameters

• **tokenA**: `string`

The address of token A.

• **tokenB**: `string`

The address of token B.

• **liquidity**: `BigNumberish`

The amount of liquidity to remove.

• **amountAMin**: `BigNumberish`

The minimum amount of token A to receive.

• **amountBMin**: `BigNumberish`

The minimum amount of token B to receive.

• **to**: `string`

The address to receive the tokens.

• **deadline**: `BigNumberish`

The deadline for the transaction.

• **approveMax**: `boolean`

Whether to approve the maximum amount.

• **v**: `BigNumberish`

The recovery byte of the signature.

• **r**: `BytesLike`

The first 32 bytes of the signature.

• **s**: `BytesLike`

The second 32 bytes of the signature.

#### Returns

`string`

The encoded function data.

#### Defined in

packages/contracts/src/router/router-v2.contract.ts:997

***

### encodeSwapETHForExactTokens()

> **encodeSwapETHForExactTokens**(`amountOut`, `path`, `to`, `deadline`): `string`

Encodes the function data to swap ETH for exact tokens.

#### Parameters

• **amountOut**: `BigNumberish`

The amount of output tokens desired.

• **path**: `string`[]

The path of token addresses.

• **to**: `string`

The address to receive the tokens.

• **deadline**: `BigNumberish`

The deadline for the transaction.

#### Returns

`string`

The encoded function data.

#### Defined in

packages/contracts/src/router/router-v2.contract.ts:1055

***

### encodeSwapExactETHForTokens()

> **encodeSwapExactETHForTokens**(`amountOutMin`, `path`, `to`, `deadline`): `string`

Encodes the function data to swap exact ETH for tokens.

#### Parameters

• **amountOutMin**: `BigNumberish`

The minimum amount of output tokens.

• **path**: `string`[]

The path of token addresses.

• **to**: `string`

The address to receive the tokens.

• **deadline**: `BigNumberish`

The deadline for the transaction.

#### Returns

`string`

The encoded function data.

#### Defined in

packages/contracts/src/router/router-v2.contract.ts:1099

***

### encodeSwapExactETHForTokensSupportingFeeOnTransferTokens()

> **encodeSwapExactETHForTokensSupportingFeeOnTransferTokens**(`amountOutMin`, `path`, `to`, `deadline`): `string`

Encodes the function data to swap exact ETH for tokens, supporting fee-on-transfer tokens.

#### Parameters

• **amountOutMin**: `BigNumberish`

The minimum amount of output tokens.

• **path**: `string`[]

The path of token addresses.

• **to**: `string`

The address to receive the tokens.

• **deadline**: `BigNumberish`

The deadline for the transaction.

#### Returns

`string`

The encoded function data.

#### Defined in

packages/contracts/src/router/router-v2.contract.ts:1143

***

### encodeSwapExactTokensForETH()

> **encodeSwapExactTokensForETH**(`amountIn`, `amountOutMin`, `path`, `to`, `deadline`): `string`

Encodes the function data to swap exact tokens for ETH.

#### Parameters

• **amountIn**: `BigNumberish`

The amount of input tokens.

• **amountOutMin**: `BigNumberish`

The minimum amount of output ETH.

• **path**: `string`[]

The path of token addresses.

• **to**: `string`

The address to receive the ETH.

• **deadline**: `BigNumberish`

The deadline for the transaction.

#### Returns

`string`

The encoded function data.

#### Defined in

packages/contracts/src/router/router-v2.contract.ts:1188

***

### encodeSwapExactTokensForETHSupportingFeeOnTransferTokens()

> **encodeSwapExactTokensForETHSupportingFeeOnTransferTokens**(`amountIn`, `amountOutMin`, `path`, `to`, `deadline`): `string`

Encodes the function data to swap exact tokens for ETH, supporting fee-on-transfer tokens.

#### Parameters

• **amountIn**: `BigNumberish`

The amount of input tokens.

• **amountOutMin**: `BigNumberish`

The minimum amount of output ETH.

• **path**: `string`[]

The path of token addresses.

• **to**: `string`

The address to receive the ETH.

• **deadline**: `BigNumberish`

The deadline for the transaction.

#### Returns

`string`

The encoded function data.

#### Defined in

packages/contracts/src/router/router-v2.contract.ts:1237

***

### encodeSwapExactTokensForTokens()

> **encodeSwapExactTokensForTokens**(`amountIn`, `amountOutMin`, `path`, `to`, `deadline`): `string`

Encodes the function data to swap exact tokens for tokens.

#### Parameters

• **amountIn**: `BigNumberish`

The amount of input tokens.

• **amountOutMin**: `BigNumberish`

The minimum amount of output tokens.

• **path**: `string`[]

The path of token addresses.

• **to**: `string`

The address to receive the output tokens.

• **deadline**: `BigNumberish`

The deadline for the transaction.

#### Returns

`string`

The encoded function data.

#### Defined in

packages/contracts/src/router/router-v2.contract.ts:1283

***

### encodeSwapExactTokensForTokensSupportingFeeOnTransferTokens()

> **encodeSwapExactTokensForTokensSupportingFeeOnTransferTokens**(`amountIn`, `amountOutMin`, `path`, `to`, `deadline`): `string`

Encodes the function data to swap exact tokens for tokens, supporting fee-on-transfer tokens.

#### Parameters

• **amountIn**: `BigNumberish`

The amount of input tokens.

• **amountOutMin**: `BigNumberish`

The minimum amount of output tokens.

• **path**: `string`[]

The path of token addresses.

• **to**: `string`

The address to receive the output tokens.

• **deadline**: `BigNumberish`

The deadline for the transaction.

#### Returns

`string`

The encoded function data.

#### Defined in

packages/contracts/src/router/router-v2.contract.ts:1332

***

### encodeSwapTokensForExactETH()

> **encodeSwapTokensForExactETH**(`amountOut`, `amountInMax`, `path`, `to`, `deadline`): `string`

Encodes the function data to swap tokens for exact ETH.

#### Parameters

• **amountOut**: `BigNumberish`

The amount of ETH desired.

• **amountInMax**: `BigNumberish`

The maximum amount of input tokens.

• **path**: `string`[]

The path of token addresses.

• **to**: `string`

The address to receive the ETH.

• **deadline**: `BigNumberish`

The deadline for the transaction.

#### Returns

`string`

The encoded function data.

#### Defined in

packages/contracts/src/router/router-v2.contract.ts:1378

***

### encodeSwapTokensForExactTokens()

> **encodeSwapTokensForExactTokens**(`amountOut`, `amountInMax`, `path`, `to`, `deadline`): `string`

Encodes the function data to swap tokens for exact tokens.

#### Parameters

• **amountOut**: `BigNumberish`

The amount of output tokens desired.

• **amountInMax**: `BigNumberish`

The maximum amount of input tokens.

• **path**: `string`[]

The path of token addresses.

• **to**: `string`

The address to receive the output tokens.

• **deadline**: `BigNumberish`

The deadline for the transaction.

#### Returns

`string`

The encoded function data.

#### Defined in

packages/contracts/src/router/router-v2.contract.ts:1427

***

### executeCall()

> `protected` **executeCall**\<`TContract`, `TCalls`\>(`calls`, `options`?): `Promise`\<`ExecutionResult`\<`TContract`, `TCalls`\>\>

Executes a multicall for the given contract methods.

#### Type Parameters

• **TContract** *extends* `Record`\<`string`, `any`\>

The contract type.

• **TCalls** *extends* `Record`\<`string`, `DiscriminatedMethodCalls`\<`TContract`\>\[`MethodNames`\<`TContract`\>\]\>

The type of the calls object.

#### Parameters

• **calls**: `TCalls`

An object describing the methods to call and their parameters.

• **options?**: `ContractContextOptions`

Optional configuration for the contract call.

#### Returns

`Promise`\<`ExecutionResult`\<`TContract`, `TCalls`\>\>

A promise that resolves to an object containing the block number,
         origin context, and the results of each method call.

#### Inherited from

`DexProviderBase.executeCall`

#### Defined in

submodules/ethereum-multicall/packages/provider/dist/esm/multicall-provider-base.d.ts:31

***

### factory()

> **factory**(): `Promise`\<`string`\>

Returns the factory address.

#### Returns

`Promise`\<`string`\>

The factory address.

#### Implementation of

`UniswapRouterV2Types.Contract.factory`

#### Defined in

packages/contracts/src/router/router-v2.contract.ts:401

***

### factoryCallContext()

> **factoryCallContext**(): `MethodCall`\<`Contract`, `"factory"`\>

Returns the call context for the factory method.

#### Returns

`MethodCall`\<`Contract`, `"factory"`\>

The call context.

#### Defined in

packages/contracts/src/router/router-v2.contract.ts:409

***

### getAmountIn()

> **getAmountIn**(`amountOut`, `reserveIn`, `reserveOut`): `Promise`\<`BigNumber`\>

Returns the amount of input tokens required to obtain a specific output amount, based on reserves.

#### Parameters

• **amountOut**: `BigNumberish`

The amount of output tokens desired.

• **reserveIn**: `BigNumberish`

The reserve of the input token.

• **reserveOut**: `BigNumberish`

The reserve of the output token.

#### Returns

`Promise`\<`BigNumber`\>

The required input amount.

#### Implementation of

`UniswapRouterV2Types.Contract.getAmountIn`

#### Defined in

packages/contracts/src/router/router-v2.contract.ts:423

***

### getAmountInCallContext()

> **getAmountInCallContext**(`amountOut`, `reserveIn`, `reserveOut`): `MethodCall`\<`Contract`, `"getAmountIn"`\>

Returns the call context for the getAmountIn method.

#### Parameters

• **amountOut**: `BigNumberish`

The amount of output tokens desired.

• **reserveIn**: `BigNumberish`

The reserve of the input token.

• **reserveOut**: `BigNumberish`

The reserve of the output token.

#### Returns

`MethodCall`\<`Contract`, `"getAmountIn"`\>

The call context.

#### Defined in

packages/contracts/src/router/router-v2.contract.ts:442

***

### getAmountOut()

> **getAmountOut**(`amountIn`, `reserveIn`, `reserveOut`): `Promise`\<`BigNumber`\>

Returns the amount of output tokens obtained for a specific input amount, based on reserves.

#### Parameters

• **amountIn**: `BigNumberish`

The amount of input tokens provided.

• **reserveIn**: `BigNumberish`

The reserve of the input token.

• **reserveOut**: `BigNumberish`

The reserve of the output token.

#### Returns

`Promise`\<`BigNumber`\>

The output amount obtained.

#### Implementation of

`UniswapRouterV2Types.Contract.getAmountOut`

#### Defined in

packages/contracts/src/router/router-v2.contract.ts:461

***

### getAmountOutCallContext()

> **getAmountOutCallContext**(`amountIn`, `reserveIn`, `reserveOut`): `MethodCall`\<`Contract`, `"getAmountOut"`\>

Returns the call context for the getAmountOut method.

#### Parameters

• **amountIn**: `BigNumberish`

The amount of input tokens provided.

• **reserveIn**: `BigNumberish`

The reserve of the input token.

• **reserveOut**: `BigNumberish`

The reserve of the output token.

#### Returns

`MethodCall`\<`Contract`, `"getAmountOut"`\>

The call context.

#### Defined in

packages/contracts/src/router/router-v2.contract.ts:480

***

### getAmountsIn()

> **getAmountsIn**(`amountOut`, `path`): `Promise`\<`BigNumber`[]\>

Returns the input amounts for each token in a path to obtain a specific output amount.

#### Parameters

• **amountOut**: `BigNumberish`

The amount of output tokens desired.

• **path**: `string`[]

The path of token addresses.

#### Returns

`Promise`\<`BigNumber`[]\>

An array of input amounts for each token in the path.

#### Implementation of

`UniswapRouterV2Types.Contract.getAmountsIn`

#### Defined in

packages/contracts/src/router/router-v2.contract.ts:498

***

### getAmountsInCallContext()

> **getAmountsInCallContext**(`amountOut`, `path`): `MethodCall`\<`Contract`, `"getAmountsIn"`\>

Returns the call context for the getAmountsIn method.

#### Parameters

• **amountOut**: `BigNumberish`

The amount of output tokens desired.

• **path**: `string`[]

The path of token addresses.

#### Returns

`MethodCall`\<`Contract`, `"getAmountsIn"`\>

The call context.

#### Defined in

packages/contracts/src/router/router-v2.contract.ts:514

***

### getAmountsOut()

> **getAmountsOut**(`amountIn`, `path`): `Promise`\<`BigNumber`[]\>

Returns the output amounts for each token in a path for a specific input amount.

#### Parameters

• **amountIn**: `BigNumberish`

The amount of input tokens provided.

• **path**: `string`[]

The path of token addresses.

#### Returns

`Promise`\<`BigNumber`[]\>

An array of output amounts for each token in the path.

#### Implementation of

`UniswapRouterV2Types.Contract.getAmountsOut`

#### Defined in

packages/contracts/src/router/router-v2.contract.ts:527

***

### getAmountsOutCallContext()

> **getAmountsOutCallContext**(`amountIn`, `path`): `MethodCall`\<`Contract`, `"getAmountsOut"`\>

Returns the call context for the getAmountsOut method.

#### Parameters

• **amountIn**: `BigNumberish`

The amount of input tokens provided.

• **path**: `string`[]

The path of token addresses.

#### Returns

`MethodCall`\<`Contract`, `"getAmountsOut"`\>

The call context.

#### Defined in

packages/contracts/src/router/router-v2.contract.ts:543

***

### prepareCallContext()

> `protected` **prepareCallContext**\<`TMethod`\>(`methodName`, `methodParameters`): `MethodCall`\<`Contract`, `TMethod`\>

Helper function to dynamically prepare a call context based on custom or default method names.

#### Type Parameters

• **TMethod** *extends* keyof `Contract`

#### Parameters

• **methodName**: `TMethod`

The name of the method to invoke.

• **methodParameters**: `any`[] = `[]`

The method parameters.

#### Returns

`MethodCall`\<`Contract`, `TMethod`\>

The call context.

#### Defined in

packages/contracts/src/router/router-v2.contract.ts:164

***

### prepareContractContext()

> **prepareContractContext**\<`TCalls`, `TCustomData`\>(`calls`, `customData`?): `ContractContext`\<`Contract`, `TCalls`, `TCustomData`\>

Helper function to dynamically prepare a contract context based on custom or default method names.

#### Type Parameters

• **TCalls** *extends* `Record`\<`string`, `MethodCall`\<`Contract`, `"factory"`\> \| `MethodCall`\<`Contract`, `"addLiquidity"`\> \| `MethodCall`\<`Contract`, `"getAmountIn"`\> \| `MethodCall`\<`Contract`, `"getAmountOut"`\> \| `MethodCall`\<`Contract`, `"getAmountsIn"`\> \| `MethodCall`\<`Contract`, `"getAmountsOut"`\> \| `MethodCall`\<`Contract`, `"quote"`\> \| `MethodCall`\<`Contract`, `"removeLiquidity"`\> \| `MethodCall`\<`Contract`, `"removeLiquidityWithPermit"`\> \| `MethodCall`\<`Contract`, `"swapExactTokensForTokens"`\> \| `MethodCall`\<`Contract`, `"swapExactTokensForTokensSupportingFeeOnTransferTokens"`\> \| `MethodCall`\<`Contract`, `"swapTokensForExactTokens"`\> \| `MethodCall`\<`Contract`, `"addLiquidityETH"`\> \| `MethodCall`\<`Contract`, `"removeLiquidityETH"`\> \| `MethodCall`\<`Contract`, `"removeLiquidityETHSupportingFeeOnTransferTokens"`\> \| `MethodCall`\<`Contract`, `"removeLiquidityETHWithPermit"`\> \| `MethodCall`\<`Contract`, `"removeLiquidityETHWithPermitSupportingFeeOnTransferTokens"`\> \| `MethodCall`\<`Contract`, `"swapETHForExactTokens"`\> \| `MethodCall`\<`Contract`, `"swapExactETHForTokens"`\> \| `MethodCall`\<`Contract`, `"swapExactETHForTokensSupportingFeeOnTransferTokens"`\> \| `MethodCall`\<`Contract`, `"swapExactTokensForETH"`\> \| `MethodCall`\<`Contract`, `"swapExactTokensForETHSupportingFeeOnTransferTokens"`\> \| `MethodCall`\<`Contract`, `"swapTokensForExactETH"`\> \| `MethodCall`\<`Contract`, `"WETH"`\>\>

• **TCustomData** = `unknown`

#### Parameters

• **calls**: `TCalls`

An object containing method calls, each mapped to its parameters.

• **customData?**: `TCustomData`

Optional custom data to include in the context.

#### Returns

`ContractContext`\<`Contract`, `TCalls`, `TCustomData`\>

The contract context, including the address, ABI, calls, and optional custom data.

#### Defined in

packages/contracts/src/router/router-v2.contract.ts:193

***

### quote()

> **quote**(`amountA`, `reserveA`, `reserveB`): `Promise`\<`BigNumber`\>

Returns the amount of token A required to obtain a specific amount of token B, based on reserves.

#### Parameters

• **amountA**: `BigNumberish`

The amount of token A.

• **reserveA**: `BigNumberish`

The reserve of token A.

• **reserveB**: `BigNumberish`

The reserve of token B.

#### Returns

`Promise`\<`BigNumber`\>

The equivalent amount of token B.

#### Implementation of

`UniswapRouterV2Types.Contract.quote`

#### Defined in

packages/contracts/src/router/router-v2.contract.ts:557

***

### quoteCallContext()

> **quoteCallContext**(`amountA`, `reserveA`, `reserveB`): `MethodCall`\<`Contract`, `"quote"`\>

Returns the call context for the quote method.

#### Parameters

• **amountA**: `BigNumberish`

The amount of token A.

• **reserveA**: `BigNumberish`

The reserve of token A.

• **reserveB**: `BigNumberish`

The reserve of token B.

#### Returns

`MethodCall`\<`Contract`, `"quote"`\>

The call context.

#### Defined in

packages/contracts/src/router/router-v2.contract.ts:576

***

### removeLiquidity()

> **removeLiquidity**(`tokenA`, `tokenB`, `liquidity`, `amountAMin`, `amountBMin`, `to`, `deadline`, `overrides`?): `Promise`\<`ContractTransaction`\>

Removes liquidity from a token pair.

#### Parameters

• **tokenA**: `string`

The address of token A.

• **tokenB**: `string`

The address of token B.

• **liquidity**: `BigNumberish`

The amount of liquidity to remove.

• **amountAMin**: `BigNumberish`

The minimum amount of token A to receive.

• **amountBMin**: `BigNumberish`

The minimum amount of token B to receive.

• **to**: `string`

The address to receive the tokens.

• **deadline**: `BigNumberish`

The deadline for the transaction.

• **overrides?**: `ContractTransactionOverrides`

Optional transaction overrides.

#### Returns

`Promise`\<`ContractTransaction`\>

The contract transaction.

#### Implementation of

`UniswapRouterV2Types.Contract.removeLiquidity`

#### Defined in

packages/contracts/src/router/router-v2.contract.ts:596

***

### removeLiquidityETH()

> **removeLiquidityETH**(`token`, `liquidity`, `amountTokenMin`, `amountETHMin`, `to`, `deadline`, `overrides`?): `Promise`\<`ContractTransaction`\>

Removes liquidity from a token-ETH pair.

#### Parameters

• **token**: `string`

The address of the token.

• **liquidity**: `BigNumberish`

The amount of liquidity to remove.

• **amountTokenMin**: `BigNumberish`

The minimum amount of the token to receive.

• **amountETHMin**: `BigNumberish`

The minimum amount of ETH to receive.

• **to**: `string`

The address to receive the tokens.

• **deadline**: `BigNumberish`

The deadline for the transaction.

• **overrides?**: `ContractTransactionOverrides`

Optional transaction overrides.

#### Returns

`Promise`\<`ContractTransaction`\>

The contract transaction.

#### Implementation of

`UniswapRouterV2Types.Contract.removeLiquidityETH`

#### Defined in

packages/contracts/src/router/router-v2.contract.ts:660

***

### removeLiquidityETHSupportingFeeOnTransferTokens()

> **removeLiquidityETHSupportingFeeOnTransferTokens**(`token`, `liquidity`, `amountTokenMin`, `amountETHMin`, `to`, `deadline`, `overrides`?): `Promise`\<`ContractTransaction`\>

Removes liquidity from a token-ETH pair, supporting fee-on-transfer tokens.

#### Parameters

• **token**: `string`

The address of the token.

• **liquidity**: `BigNumberish`

The amount of liquidity to remove.

• **amountTokenMin**: `BigNumberish`

The minimum amount of the token to receive.

• **amountETHMin**: `BigNumberish`

The minimum amount of ETH to receive.

• **to**: `string`

The address to receive the tokens.

• **deadline**: `BigNumberish`

The deadline for the transaction.

• **overrides?**: `ContractTransactionOverrides`

Optional transaction overrides.

#### Returns

`Promise`\<`ContractTransaction`\>

The contract transaction.

#### Implementation of

`UniswapRouterV2Types.Contract.removeLiquidityETHSupportingFeeOnTransferTokens`

#### Defined in

packages/contracts/src/router/router-v2.contract.ts:719

***

### removeLiquidityETHWithPermit()

> **removeLiquidityETHWithPermit**(`token`, `liquidity`, `amountTokenMin`, `amountETHMin`, `to`, `deadline`, `approveMax`, `v`, `r`, `s`, `overrides`?): `Promise`\<`ContractTransaction`\>

Removes liquidity from a token-ETH pair with a permit.

#### Parameters

• **token**: `string`

The address of the token.

• **liquidity**: `BigNumberish`

The amount of liquidity to remove.

• **amountTokenMin**: `BigNumberish`

The minimum amount of the token to receive.

• **amountETHMin**: `BigNumberish`

The minimum amount of ETH to receive.

• **to**: `string`

The address to receive the tokens.

• **deadline**: `BigNumberish`

The deadline for the transaction.

• **approveMax**: `boolean`

Whether to approve the maximum amount.

• **v**: `BigNumberish`

The recovery byte of the signature.

• **r**: `BytesLike`

The first 32 bytes of the signature.

• **s**: `BytesLike`

The second 32 bytes of the signature.

• **overrides?**: `ContractTransactionOverrides`

Optional transaction overrides.

#### Returns

`Promise`\<`ContractTransaction`\>

The contract transaction.

#### Implementation of

`UniswapRouterV2Types.Contract.removeLiquidityETHWithPermit`

#### Defined in

packages/contracts/src/router/router-v2.contract.ts:773

***

### removeLiquidityETHWithPermitSupportingFeeOnTransferTokens()

> **removeLiquidityETHWithPermitSupportingFeeOnTransferTokens**(`token`, `liquidity`, `amountTokenMin`, `amountETHMin`, `to`, `deadline`, `approveMax`, `v`, `r`, `s`, `overrides`?): `Promise`\<`ContractTransaction`\>

Removes liquidity from a token-ETH pair with a permit, supporting fee-on-transfer tokens.

#### Parameters

• **token**: `string`

The address of the token.

• **liquidity**: `BigNumberish`

The amount of liquidity to remove.

• **amountTokenMin**: `BigNumberish`

The minimum amount of the token to receive.

• **amountETHMin**: `BigNumberish`

The minimum amount of ETH to receive.

• **to**: `string`

The address to receive the tokens.

• **deadline**: `BigNumberish`

The deadline for the transaction.

• **approveMax**: `boolean`

Whether to approve the maximum amount.

• **v**: `BigNumberish`

The recovery byte of the signature.

• **r**: `BytesLike`

The first 32 bytes of the signature.

• **s**: `BytesLike`

The second 32 bytes of the signature.

• **overrides?**: `ContractTransactionOverrides`

Optional transaction overrides.

#### Returns

`Promise`\<`ContractTransaction`\>

The contract transaction.

#### Implementation of

`UniswapRouterV2Types.Contract.removeLiquidityETHWithPermitSupportingFeeOnTransferTokens`

#### Defined in

packages/contracts/src/router/router-v2.contract.ts:859

***

### removeLiquidityWithPermit()

> **removeLiquidityWithPermit**(`tokenA`, `tokenB`, `liquidity`, `amountAMin`, `amountBMin`, `to`, `deadline`, `approveMax`, `v`, `r`, `s`, `overrides`?): `Promise`\<`ContractTransaction`\>

Removes liquidity from a token pair with a permit.

#### Parameters

• **tokenA**: `string`

The address of token A.

• **tokenB**: `string`

The address of token B.

• **liquidity**: `BigNumberish`

The amount of liquidity to remove.

• **amountAMin**: `BigNumberish`

The minimum amount of token A to receive.

• **amountBMin**: `BigNumberish`

The minimum amount of token B to receive.

• **to**: `string`

The address to receive the tokens.

• **deadline**: `BigNumberish`

The deadline for the transaction.

• **approveMax**: `boolean`

Whether to approve the maximum amount.

• **v**: `BigNumberish`

The recovery byte of the signature.

• **r**: `BytesLike`

The first 32 bytes of the signature.

• **s**: `BytesLike`

The second 32 bytes of the signature.

• **overrides?**: `ContractTransactionOverrides`

Optional transaction overrides.

#### Returns

`Promise`\<`ContractTransaction`\>

The contract transaction.

#### Implementation of

`UniswapRouterV2Types.Contract.removeLiquidityWithPermit`

#### Defined in

packages/contracts/src/router/router-v2.contract.ts:949

***

### swapETHForExactTokens()

> **swapETHForExactTokens**(`amountOut`, `path`, `to`, `deadline`, `overrides`?): `Promise`\<`ContractTransaction`\>

Swaps ETH for exact tokens.

#### Parameters

• **amountOut**: `BigNumberish`

The amount of output tokens desired.

• **path**: `string`[]

The path of token addresses.

• **to**: `string`

The address to receive the tokens.

• **deadline**: `BigNumberish`

The deadline for the transaction.

• **overrides?**: `ContractTransactionOverrides`

Optional transaction overrides.

#### Returns

`Promise`\<`ContractTransaction`\>

The contract transaction.

#### Implementation of

`UniswapRouterV2Types.Contract.swapETHForExactTokens`

#### Defined in

packages/contracts/src/router/router-v2.contract.ts:1034

***

### swapExactETHForTokens()

> **swapExactETHForTokens**(`amountOutMin`, `path`, `to`, `deadline`, `overrides`?): `Promise`\<`ContractTransaction`\>

Swaps exact ETH for tokens.

#### Parameters

• **amountOutMin**: `BigNumberish`

The minimum amount of output tokens.

• **path**: `string`[]

The path of token addresses.

• **to**: `string`

The address to receive the tokens.

• **deadline**: `BigNumberish`

The deadline for the transaction.

• **overrides?**: `ContractTransactionOverrides`

Optional transaction overrides.

#### Returns

`Promise`\<`ContractTransaction`\>

The contract transaction.

#### Implementation of

`UniswapRouterV2Types.Contract.swapExactETHForTokens`

#### Defined in

packages/contracts/src/router/router-v2.contract.ts:1078

***

### swapExactETHForTokensSupportingFeeOnTransferTokens()

> **swapExactETHForTokensSupportingFeeOnTransferTokens**(`amountOutMin`, `path`, `to`, `deadline`, `overrides`?): `Promise`\<`ContractTransaction`\>

Swaps exact ETH for tokens, supporting fee-on-transfer tokens.

#### Parameters

• **amountOutMin**: `BigNumberish`

The minimum amount of output tokens.

• **path**: `string`[]

The path of token addresses.

• **to**: `string`

The address to receive the tokens.

• **deadline**: `BigNumberish`

The deadline for the transaction.

• **overrides?**: `ContractTransactionOverrides`

Optional transaction overrides.

#### Returns

`Promise`\<`ContractTransaction`\>

The contract transaction.

#### Implementation of

`UniswapRouterV2Types.Contract.swapExactETHForTokensSupportingFeeOnTransferTokens`

#### Defined in

packages/contracts/src/router/router-v2.contract.ts:1122

***

### swapExactTokensForETH()

> **swapExactTokensForETH**(`amountIn`, `amountOutMin`, `path`, `to`, `deadline`, `overrides`?): `Promise`\<`ContractTransaction`\>

Swaps exact tokens for ETH.

#### Parameters

• **amountIn**: `BigNumberish`

The amount of input tokens.

• **amountOutMin**: `BigNumberish`

The minimum amount of output ETH.

• **path**: `string`[]

The path of token addresses.

• **to**: `string`

The address to receive the ETH.

• **deadline**: `BigNumberish`

The deadline for the transaction.

• **overrides?**: `ContractTransactionOverrides`

Optional transaction overrides.

#### Returns

`Promise`\<`ContractTransaction`\>

The contract transaction.

#### Implementation of

`UniswapRouterV2Types.Contract.swapExactTokensForETH`

#### Defined in

packages/contracts/src/router/router-v2.contract.ts:1165

***

### swapExactTokensForETHSupportingFeeOnTransferTokens()

> **swapExactTokensForETHSupportingFeeOnTransferTokens**(`amountIn`, `amountOutMin`, `path`, `to`, `deadline`, `overrides`?): `Promise`\<`ContractTransaction`\>

Swaps exact tokens for ETH, supporting fee-on-transfer tokens.

#### Parameters

• **amountIn**: `BigNumberish`

The amount of input tokens.

• **amountOutMin**: `BigNumberish`

The minimum amount of output ETH.

• **path**: `string`[]

The path of token addresses.

• **to**: `string`

The address to receive the ETH.

• **deadline**: `BigNumberish`

The deadline for the transaction.

• **overrides?**: `ContractTransactionOverrides`

Optional transaction overrides.

#### Returns

`Promise`\<`ContractTransaction`\>

The contract transaction.

#### Implementation of

`UniswapRouterV2Types.Contract.swapExactTokensForETHSupportingFeeOnTransferTokens`

#### Defined in

packages/contracts/src/router/router-v2.contract.ts:1214

***

### swapExactTokensForTokens()

> **swapExactTokensForTokens**(`amountIn`, `amountOutMin`, `path`, `to`, `deadline`, `overrides`?): `Promise`\<`ContractTransaction`\>

Swaps exact tokens for tokens.

#### Parameters

• **amountIn**: `BigNumberish`

The amount of input tokens.

• **amountOutMin**: `BigNumberish`

The minimum amount of output tokens.

• **path**: `string`[]

The path of token addresses.

• **to**: `string`

The address to receive the output tokens.

• **deadline**: `BigNumberish`

The deadline for the transaction.

• **overrides?**: `ContractTransactionOverrides`

Optional transaction overrides.

#### Returns

`Promise`\<`ContractTransaction`\>

The contract transaction.

#### Implementation of

`UniswapRouterV2Types.Contract.swapExactTokensForTokens`

#### Defined in

packages/contracts/src/router/router-v2.contract.ts:1260

***

### swapExactTokensForTokensSupportingFeeOnTransferTokens()

> **swapExactTokensForTokensSupportingFeeOnTransferTokens**(`amountIn`, `amountOutMin`, `path`, `to`, `deadline`, `overrides`?): `Promise`\<`ContractTransaction`\>

Swaps exact tokens for tokens, supporting fee-on-transfer tokens.

#### Parameters

• **amountIn**: `BigNumberish`

The amount of input tokens.

• **amountOutMin**: `BigNumberish`

The minimum amount of output tokens.

• **path**: `string`[]

The path of token addresses.

• **to**: `string`

The address to receive the output tokens.

• **deadline**: `BigNumberish`

The deadline for the transaction.

• **overrides?**: `ContractTransactionOverrides`

Optional transaction overrides.

#### Returns

`Promise`\<`ContractTransaction`\>

The contract transaction.

#### Implementation of

`UniswapRouterV2Types.Contract.swapExactTokensForTokensSupportingFeeOnTransferTokens`

#### Defined in

packages/contracts/src/router/router-v2.contract.ts:1309

***

### swapTokensForExactETH()

> **swapTokensForExactETH**(`amountOut`, `amountInMax`, `path`, `to`, `deadline`, `overrides`?): `Promise`\<`ContractTransaction`\>

Swaps tokens for exact ETH.

#### Parameters

• **amountOut**: `BigNumberish`

The amount of ETH desired.

• **amountInMax**: `BigNumberish`

The maximum amount of input tokens.

• **path**: `string`[]

The path of token addresses.

• **to**: `string`

The address to receive the ETH.

• **deadline**: `BigNumberish`

The deadline for the transaction.

• **overrides?**: `ContractTransactionOverrides`

Optional transaction overrides.

#### Returns

`Promise`\<`ContractTransaction`\>

The contract transaction.

#### Implementation of

`UniswapRouterV2Types.Contract.swapTokensForExactETH`

#### Defined in

packages/contracts/src/router/router-v2.contract.ts:1355

***

### swapTokensForExactTokens()

> **swapTokensForExactTokens**(`amountOut`, `amountInMax`, `path`, `to`, `deadline`, `overrides`?): `Promise`\<`ContractTransaction`\>

Swaps tokens for exact tokens.

#### Parameters

• **amountOut**: `BigNumberish`

The amount of output tokens desired.

• **amountInMax**: `BigNumberish`

The maximum amount of input tokens.

• **path**: `string`[]

The path of token addresses.

• **to**: `string`

The address to receive the output tokens.

• **deadline**: `BigNumberish`

The deadline for the transaction.

• **overrides?**: `ContractTransactionOverrides`

Optional transaction overrides.

#### Returns

`Promise`\<`ContractTransaction`\>

The contract transaction.

#### Implementation of

`UniswapRouterV2Types.Contract.swapTokensForExactTokens`

#### Defined in

packages/contracts/src/router/router-v2.contract.ts:1404
