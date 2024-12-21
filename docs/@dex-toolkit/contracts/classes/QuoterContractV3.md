[**@dex-toolkit/contracts v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/contracts](../README.md) / QuoterContractV3

# Class: QuoterContractV3

## Extends

- `DexProviderBase`

## Implements

- `Contract`

## Constructors

### new QuoterContractV3()

> **new QuoterContractV3**(`dexProviderContext`, `contractDetailContext`): [`QuoterContractV3`](QuoterContractV3.md)

#### Parameters

• **dexProviderContext**: `DexMulticallProviderContext`

• **contractDetailContext**: `ContractDetailContext`

#### Returns

[`QuoterContractV3`](QuoterContractV3.md)

#### Overrides

`DexProviderBase.constructor`

#### Defined in

[packages/contracts/src/quoter/quoter.contract.ts:42](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/contracts/src/quoter/quoter.contract.ts#L42)

## Properties

### \_contract

> `protected` **\_contract**: `ContractContext`

#### Defined in

[packages/contracts/src/quoter/quoter.contract.ts:38](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/contracts/src/quoter/quoter.contract.ts#L38)

***

### \_contractDetail

> `protected` **\_contractDetail**: `ContractDetail`

#### Inherited from

`DexProviderBase._contractDetail`

#### Defined in

submodules/multicall-toolkit/packages/provider/dist/esm/multicall-provider-base.d.ts:4

***

### \_methodNames

> `protected` **\_methodNames**: `MethodNameMap`

#### Defined in

[packages/contracts/src/quoter/quoter.contract.ts:40](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/contracts/src/quoter/quoter.contract.ts#L40)

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

submodules/multicall-toolkit/packages/provider/dist/esm/multicall-provider-base.d.ts:18

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

[packages/contracts/src/quoter/quoter.contract.ts:109](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/contracts/src/quoter/quoter.contract.ts#L109)

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

submodules/multicall-toolkit/packages/provider/dist/esm/multicall-provider-base.d.ts:12

***

### quoterContract

> `get` **quoterContract**(): `ContractContext`

Get the quoter contract

#### Returns

`ContractContext`

#### Defined in

[packages/contracts/src/quoter/quoter.contract.ts:104](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/contracts/src/quoter/quoter.contract.ts#L104)

## Methods

### WETH9()

> **WETH9**(): `Promise`\<`string`\>

Returns the WETH9 address.

#### Returns

`Promise`\<`string`\>

The WETH9 address.

#### Implementation of

`UniswapQuoterV3Types.Contract.WETH9`

#### Defined in

[packages/contracts/src/quoter/quoter.contract.ts:279](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/contracts/src/quoter/quoter.contract.ts#L279)

***

### WETH9CallContext()

> **WETH9CallContext**(): `MethodCall`\<`Contract`, `"WETH9"`\>

Returns the call context for the WETH9 method.

#### Returns

`MethodCall`\<`Contract`, `"WETH9"`\>

The call context.

#### Defined in

[packages/contracts/src/quoter/quoter.contract.ts:287](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/contracts/src/quoter/quoter.contract.ts#L287)

***

### call()

> **call**\<`TCalls`\>(`calls`, `options`): `Promise`\<`ExecutionResult`\<`Contract`, `TCalls`\>\>

Executes a multicall for the given contract methods.

#### Type Parameters

• **TCalls** *extends* `Record`\<`string`, `MethodCall`\<`Contract`, `"factory"`\> \| `MethodCall`\<`Contract`, `"quoteExactInput"`\> \| `MethodCall`\<`Contract`, `"quoteExactInputSingle"`\> \| `MethodCall`\<`Contract`, `"quoteExactOutput"`\> \| `MethodCall`\<`Contract`, `"quoteExactOutputSingle"`\> \| `MethodCall`\<`Contract`, `"WETH9"`\> \| `MethodCall`\<`Contract`, `"uniswapV3SwapCallback"`\>\>

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

[packages/contracts/src/quoter/quoter.contract.ts:231](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/contracts/src/quoter/quoter.contract.ts#L231)

***

### encodeQuoteExactInput()

> **encodeQuoteExactInput**(`path`, `amountIn`): `string`

Encodes the function data to quote the exact input for a given path and amount.

#### Parameters

• **path**: `BytesLike`

The path for the swap.

• **amountIn**: `BigNumberish`

The input amount.

#### Returns

`string`

The encoded function data.

#### Defined in

[packages/contracts/src/quoter/quoter.contract.ts:337](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/contracts/src/quoter/quoter.contract.ts#L337)

***

### encodeQuoteExactInputSingle()

> **encodeQuoteExactInputSingle**(`tokenIn`, `tokenOut`, `fee`, `amountIn`, `sqrtPriceLimitX96`): `string`

Encodes the function data to quote the exact input for a single path.

#### Parameters

• **tokenIn**: `string`

The address of the input token.

• **tokenOut**: `string`

The address of the output token.

• **fee**: `BigNumberish`

The fee for the swap.

• **amountIn**: `BigNumberish`

The input amount.

• **sqrtPriceLimitX96**: `BigNumberish`

The price limit.

#### Returns

`string`

The encoded function data.

#### Defined in

[packages/contracts/src/quoter/quoter.contract.ts:384](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/contracts/src/quoter/quoter.contract.ts#L384)

***

### encodeQuoteExactOutput()

> **encodeQuoteExactOutput**(`path`, `amountOut`): `string`

Encodes the function data to quote the exact output for a given path and amount.

#### Parameters

• **path**: `BytesLike`

The path for the swap.

• **amountOut**: `BigNumberish`

The output amount.

#### Returns

`string`

The encoded function data.

#### Defined in

[packages/contracts/src/quoter/quoter.contract.ts:451](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/contracts/src/quoter/quoter.contract.ts#L451)

***

### encodeQuoteExactOutputSingle()

> **encodeQuoteExactOutputSingle**(`tokenIn`, `tokenOut`, `fee`, `amountOut`, `sqrtPriceLimitX96`): `string`

Encodes the function data to quote the exact output for a single path.

#### Parameters

• **tokenIn**: `string`

The address of the input token.

• **tokenOut**: `string`

The address of the output token.

• **fee**: `BigNumberish`

The fee for the swap.

• **amountOut**: `BigNumberish`

The output amount.

• **sqrtPriceLimitX96**: `BigNumberish`

The price limit.

#### Returns

`string`

The encoded function data.

#### Defined in

[packages/contracts/src/quoter/quoter.contract.ts:498](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/contracts/src/quoter/quoter.contract.ts#L498)

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

submodules/multicall-toolkit/packages/provider/dist/esm/multicall-provider-base.d.ts:31

***

### factory()

> **factory**(): `Promise`\<`string`\>

Returns the factory address.

#### Returns

`Promise`\<`string`\>

The factory address.

#### Implementation of

`UniswapQuoterV3Types.Contract.factory`

#### Defined in

[packages/contracts/src/quoter/quoter.contract.ts:298](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/contracts/src/quoter/quoter.contract.ts#L298)

***

### factoryCallContext()

> **factoryCallContext**(): `MethodCall`\<`Contract`, `"factory"`\>

Returns the call context for the factory method.

#### Returns

`MethodCall`\<`Contract`, `"factory"`\>

The call context.

#### Defined in

[packages/contracts/src/quoter/quoter.contract.ts:306](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/contracts/src/quoter/quoter.contract.ts#L306)

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

[packages/contracts/src/quoter/quoter.contract.ts:159](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/contracts/src/quoter/quoter.contract.ts#L159)

***

### prepareContractContext()

> **prepareContractContext**\<`TCalls`, `TCustomData`\>(`calls`, `customData`?): `ContractContext`\<`Contract`, `TCalls`, `TCustomData`\>

Helper function to dynamically prepare a contract context based on custom or default method names.

#### Type Parameters

• **TCalls** *extends* `Record`\<`string`, `MethodCall`\<`Contract`, `"factory"`\> \| `MethodCall`\<`Contract`, `"quoteExactInput"`\> \| `MethodCall`\<`Contract`, `"quoteExactInputSingle"`\> \| `MethodCall`\<`Contract`, `"quoteExactOutput"`\> \| `MethodCall`\<`Contract`, `"quoteExactOutputSingle"`\> \| `MethodCall`\<`Contract`, `"WETH9"`\> \| `MethodCall`\<`Contract`, `"uniswapV3SwapCallback"`\>\>

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

[packages/contracts/src/quoter/quoter.contract.ts:188](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/contracts/src/quoter/quoter.contract.ts#L188)

***

### quoteExactInput()

> **quoteExactInput**(`path`, `amountIn`, `overrides`?): `Promise`\<`QuoteExactInputResponse`\>

Quotes the exact input for a given path and amount.

#### Parameters

• **path**: `BytesLike`

The path for the swap.

• **amountIn**: `BigNumberish`

The input amount.

• **overrides?**: `ContractTransactionOverrides`

Optional transaction overrides.

#### Returns

`Promise`\<`QuoteExactInputResponse`\>

Quote information including output amount, sqrt price after, ticks crossed, and gas estimate.

#### Implementation of

`UniswapQuoterV3Types.Contract.quoteExactInput`

#### Defined in

[packages/contracts/src/quoter/quoter.contract.ts:320](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/contracts/src/quoter/quoter.contract.ts#L320)

***

### quoteExactInputCallContext()

> **quoteExactInputCallContext**(`path`, `amountIn`): `MethodCall`\<`Contract`, `"quoteExactInput"`\>

Prepares the CallContext for the `quoteExactInput` method.
This method is used to quote the exact input for a given path and amount.

#### Parameters

• **path**: `BytesLike`

The encoded path for the swap, typically a series of token addresses.

• **amountIn**: `BigNumberish`

The amount of the input token to be swapped.

#### Returns

`MethodCall`\<`Contract`, `"quoteExactInput"`\>

The CallContext object to be used with Multicall.

#### Defined in

[packages/contracts/src/quoter/quoter.contract.ts:352](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/contracts/src/quoter/quoter.contract.ts#L352)

***

### quoteExactInputSingle()

> **quoteExactInputSingle**(`params`, `overrides`?): `Promise`\<`QuoteExactInputSingleResponse`\>

Quotes the exact input for a single path.

#### Parameters

• **params**: `QuoteExactInputSingleParamsRequest`

The quote parameters including tokens, fee, amount and price limit.

• **overrides?**: `ContractTransactionOverrides`

Optional transaction overrides.

#### Returns

`Promise`\<`QuoteExactInputSingleResponse`\>

Quote information including output amount, sqrt price after, ticks crossed, and gas estimate.

#### Implementation of

`UniswapQuoterV3Types.Contract.quoteExactInputSingle`

#### Defined in

[packages/contracts/src/quoter/quoter.contract.ts:365](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/contracts/src/quoter/quoter.contract.ts#L365)

***

### quoteExactInputSingleCallContext()

> **quoteExactInputSingleCallContext**(`tokenIn`, `tokenOut`, `fee`, `amountIn`, `sqrtPriceLimitX96`): `MethodCall`\<`Contract`, `"quoteExactInputSingle"`\>

Prepares the CallContext for the `quoteExactInputSingle` method.
This method is used to quote the exact input for a single token pair.

#### Parameters

• **tokenIn**: `string`

The address of the input token.

• **tokenOut**: `string`

The address of the output token.

• **fee**: `BigNumberish`

The fee tier for the Uniswap V3 pool.

• **amountIn**: `BigNumberish`

The amount of the input token to be swapped.

• **sqrtPriceLimitX96**: `BigNumberish`

The price limit for the swap.

#### Returns

`MethodCall`\<`Contract`, `"quoteExactInputSingle"`\>

The CallContext object to be used with Multicall.

#### Defined in

[packages/contracts/src/quoter/quoter.contract.ts:411](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/contracts/src/quoter/quoter.contract.ts#L411)

***

### quoteExactOutput()

> **quoteExactOutput**(`path`, `amountOut`, `overrides`?): `Promise`\<`QuoteExactOutputResponse`\>

Quotes the exact output for a given path and amount.

#### Parameters

• **path**: `BytesLike`

The path for the swap.

• **amountOut**: `BigNumberish`

The output amount.

• **overrides?**: `ContractTransactionOverrides`

Optional transaction overrides.

#### Returns

`Promise`\<`QuoteExactOutputResponse`\>

Quote information including input amount, sqrt price after, ticks crossed, and gas estimate.

#### Implementation of

`UniswapQuoterV3Types.Contract.quoteExactOutput`

#### Defined in

[packages/contracts/src/quoter/quoter.contract.ts:434](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/contracts/src/quoter/quoter.contract.ts#L434)

***

### quoteExactOutputCallContext()

> **quoteExactOutputCallContext**(`path`, `amountOut`): `MethodCall`\<`Contract`, `"quoteExactOutput"`\>

Prepares the CallContext for the `quoteExactOutput` method.
This method is used to quote the exact output for a given path and amount.

#### Parameters

• **path**: `BytesLike`

The encoded path for the swap, typically a series of token addresses.

• **amountOut**: `BigNumberish`

The amount of the output token to be received.

#### Returns

`MethodCall`\<`Contract`, `"quoteExactOutput"`\>

The CallContext object to be used with Multicall.

#### Defined in

[packages/contracts/src/quoter/quoter.contract.ts:466](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/contracts/src/quoter/quoter.contract.ts#L466)

***

### quoteExactOutputSingle()

> **quoteExactOutputSingle**(`params`, `overrides`?): `Promise`\<`QuoteExactOutputSingleResponse`\>

Quotes the exact output for a single path.

#### Parameters

• **params**: `QuoteExactOutputSingleParamsRequest`

The quote parameters including tokens, fee, amount and sqrtPriceLimitX96.

• **overrides?**: `ContractTransactionOverrides`

Optional transaction overrides.

#### Returns

`Promise`\<`QuoteExactOutputSingleResponse`\>

The contract transaction.

#### Implementation of

`UniswapQuoterV3Types.Contract.quoteExactOutputSingle`

#### Defined in

[packages/contracts/src/quoter/quoter.contract.ts:479](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/contracts/src/quoter/quoter.contract.ts#L479)

***

### quoteExactOutputSingleCallContext()

> **quoteExactOutputSingleCallContext**(`tokenIn`, `tokenOut`, `fee`, `amountOut`, `sqrtPriceLimitX96`): `MethodCall`\<`Contract`, `"quoteExactOutputSingle"`\>

Prepares the CallContext for the `quoteExactOutputSingle` method.
This method is used to quote the exact output for a single token pair.

#### Parameters

• **tokenIn**: `string`

The address of the input token.

• **tokenOut**: `string`

The address of the output token.

• **fee**: `BigNumberish`

The fee tier for the Uniswap V3 pool.

• **amountOut**: `BigNumberish`

The amount of the output token to be received.

• **sqrtPriceLimitX96**: `BigNumberish`

The price limit for the swap.

#### Returns

`MethodCall`\<`Contract`, `"quoteExactOutputSingle"`\>

The CallContext object to be used with Multicall.

#### Defined in

[packages/contracts/src/quoter/quoter.contract.ts:525](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/contracts/src/quoter/quoter.contract.ts#L525)

***

### uniswapV3SwapCallback()

> **uniswapV3SwapCallback**(`amount0Delta`, `amount1Delta`, `path`): `Promise`\<`void`\>

Callback function for the Uniswap V3 swap.

#### Parameters

• **amount0Delta**: `BigNumberish`

The amount delta of token0.

• **amount1Delta**: `BigNumberish`

The amount delta of token1.

• **path**: `BytesLike`

The path of the swap.

#### Returns

`Promise`\<`void`\>

The callback result.

#### Implementation of

`UniswapQuoterV3Types.Contract.uniswapV3SwapCallback`

#### Defined in

[packages/contracts/src/quoter/quoter.contract.ts:548](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/contracts/src/quoter/quoter.contract.ts#L548)

***

### uniswapV3SwapCallbackCallContext()

> **uniswapV3SwapCallbackCallContext**(`amount0Delta`, `amount1Delta`, `path`): `MethodCall`\<`Contract`, `"uniswapV3SwapCallback"`\>

Returns the call context for the uniswapV3SwapCallback method.

#### Parameters

• **amount0Delta**: `BigNumberish`

The amount delta of token0.

• **amount1Delta**: `BigNumberish`

The amount delta of token1.

• **path**: `BytesLike`

The path of the swap.

#### Returns

`MethodCall`\<`Contract`, `"uniswapV3SwapCallback"`\>

The call context.

#### Defined in

[packages/contracts/src/quoter/quoter.contract.ts:567](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/contracts/src/quoter/quoter.contract.ts#L567)
