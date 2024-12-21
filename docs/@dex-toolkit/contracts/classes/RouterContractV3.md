[**@dex-toolkit/contracts v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/contracts](../README.md) / RouterContractV3

# Class: RouterContractV3

## Extends

- `DexProviderBase`

## Implements

- `Contract`

## Constructors

### new RouterContractV3()

> **new RouterContractV3**(`dexProviderContext`, `contractDetailContext`): [`RouterContractV3`](RouterContractV3.md)

#### Parameters

• **dexProviderContext**: `DexMulticallProviderContext`

• **contractDetailContext**: `ContractDetailContext`

#### Returns

[`RouterContractV3`](RouterContractV3.md)

#### Overrides

`DexProviderBase.constructor`

#### Defined in

[packages/contracts/src/router/router-v3.contract.ts:45](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/contracts/src/router/router-v3.contract.ts#L45)

## Properties

### \_contract

> `protected` **\_contract**: `ContractContext`

#### Defined in

[packages/contracts/src/router/router-v3.contract.ts:41](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/contracts/src/router/router-v3.contract.ts#L41)

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

[packages/contracts/src/router/router-v3.contract.ts:43](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/contracts/src/router/router-v3.contract.ts#L43)

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

[packages/contracts/src/router/router-v3.contract.ts:113](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/contracts/src/router/router-v3.contract.ts#L113)

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

### routerContract

> `get` **routerContract**(): `ContractContext`

Get the router contract

#### Returns

`ContractContext`

#### Defined in

[packages/contracts/src/router/router-v3.contract.ts:108](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/contracts/src/router/router-v3.contract.ts#L108)

## Methods

### WETH9()

> **WETH9**(): `Promise`\<`string`\>

Returns the WETH9 address.

#### Returns

`Promise`\<`string`\>

The WETH9 address.

#### Implementation of

`UniswapRouterV3Types.Contract.WETH9`

#### Defined in

[packages/contracts/src/router/router-v3.contract.ts:256](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/contracts/src/router/router-v3.contract.ts#L256)

***

### WETH9CallContext()

> **WETH9CallContext**(): `MethodCall`\<`Contract`, `"WETH9"`\>

Returns the call context for the WETH9 method.

#### Returns

`MethodCall`\<`Contract`, `"WETH9"`\>

The call context.

#### Defined in

[packages/contracts/src/router/router-v3.contract.ts:264](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/contracts/src/router/router-v3.contract.ts#L264)

***

### approveMax()

> **approveMax**(`token`, `overrides`?): `Promise`\<`ContractTransaction`\>

Approves the maximum token allowance.

#### Parameters

• **token**: `string`

The address of the token to approve.

• **overrides?**: `ContractTransactionOverrides`

Optional transaction overrides.

#### Returns

`Promise`\<`ContractTransaction`\>

The contract transaction.

#### Implementation of

`UniswapRouterV3Types.Contract.approveMax`

#### Defined in

[packages/contracts/src/router/router-v3.contract.ts:277](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/contracts/src/router/router-v3.contract.ts#L277)

***

### approveMaxMinusOne()

> **approveMaxMinusOne**(`token`, `overrides`?): `Promise`\<`ContractTransaction`\>

Approves the maximum token allowance minus one.

#### Parameters

• **token**: `string`

The address of the token to approve.

• **overrides?**: `ContractTransactionOverrides`

Optional transaction overrides.

#### Returns

`Promise`\<`ContractTransaction`\>

The contract transaction.

#### Implementation of

`UniswapRouterV3Types.Contract.approveMaxMinusOne`

#### Defined in

[packages/contracts/src/router/router-v3.contract.ts:302](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/contracts/src/router/router-v3.contract.ts#L302)

***

### approveZeroThenMax()

> **approveZeroThenMax**(`token`, `overrides`?): `Promise`\<`ContractTransaction`\>

Approves zero tokens and then sets the maximum token allowance.

#### Parameters

• **token**: `string`

The address of the token to approve.

• **overrides?**: `ContractTransactionOverrides`

Optional transaction overrides.

#### Returns

`Promise`\<`ContractTransaction`\>

The contract transaction.

#### Implementation of

`UniswapRouterV3Types.Contract.approveZeroThenMax`

#### Defined in

[packages/contracts/src/router/router-v3.contract.ts:327](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/contracts/src/router/router-v3.contract.ts#L327)

***

### approveZeroThenMaxMinusOne()

> **approveZeroThenMaxMinusOne**(`token`, `overrides`?): `Promise`\<`ContractTransaction`\>

Approves zero tokens and then sets the maximum token allowance minus one.

#### Parameters

• **token**: `string`

The address of the token to approve.

• **overrides?**: `ContractTransactionOverrides`

Optional transaction overrides.

#### Returns

`Promise`\<`ContractTransaction`\>

The contract transaction.

#### Implementation of

`UniswapRouterV3Types.Contract.approveZeroThenMaxMinusOne`

#### Defined in

[packages/contracts/src/router/router-v3.contract.ts:352](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/contracts/src/router/router-v3.contract.ts#L352)

***

### call()

> **call**\<`TCalls`\>(`calls`, `options`): `Promise`\<`ExecutionResult`\<`Contract`, `TCalls`\>\>

Executes a multicall for the given contract methods.

#### Type Parameters

• **TCalls** *extends* `Record`\<`string`, `MethodCall`\<`Contract`, `"factory"`\> \| `MethodCall`\<`Contract`, `"swapExactTokensForTokens"`\> \| `MethodCall`\<`Contract`, `"swapTokensForExactTokens"`\> \| `MethodCall`\<`Contract`, `"increaseLiquidity"`\> \| `MethodCall`\<`Contract`, `"mint"`\> \| `MethodCall`\<`Contract`, `"multicall"`\> \| `MethodCall`\<`Contract`, `"selfPermit"`\> \| `MethodCall`\<`Contract`, `"selfPermitAllowed"`\> \| `MethodCall`\<`Contract`, `"selfPermitAllowedIfNecessary"`\> \| `MethodCall`\<`Contract`, `"selfPermitIfNecessary"`\> \| `MethodCall`\<`Contract`, `"sweepToken"`\> \| `MethodCall`\<`Contract`, `"exactInput"`\> \| `MethodCall`\<`Contract`, `"exactInputSingle"`\> \| `MethodCall`\<`Contract`, `"exactOutput"`\> \| `MethodCall`\<`Contract`, `"exactOutputSingle"`\> \| `MethodCall`\<`Contract`, `"sweepTokenWithFee"`\> \| `MethodCall`\<`Contract`, `"WETH9"`\> \| `MethodCall`\<`Contract`, `"refundETH"`\> \| `MethodCall`\<`Contract`, `"unwrapWETH9"`\> \| `MethodCall`\<`Contract`, `"uniswapV3SwapCallback"`\> \| `MethodCall`\<`Contract`, `"approveMax"`\> \| `MethodCall`\<`Contract`, `"approveMaxMinusOne"`\> \| `MethodCall`\<`Contract`, `"approveZeroThenMax"`\> \| `MethodCall`\<`Contract`, `"approveZeroThenMaxMinusOne"`\> \| `MethodCall`\<`Contract`, `"callPositionManager"`\> \| `MethodCall`\<`Contract`, `"checkOracleSlippage"`\> \| `MethodCall`\<`Contract`, `"factoryV2"`\> \| `MethodCall`\<`Contract`, `"getApprovalType"`\> \| `MethodCall`\<`Contract`, `"positionManager"`\> \| `MethodCall`\<`Contract`, `"pull"`\> \| `MethodCall`\<`Contract`, `"unwrapWETH9WithFee"`\> \| `MethodCall`\<`Contract`, `"wrapETH"`\>\>

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

[packages/contracts/src/router/router-v3.contract.ts:237](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/contracts/src/router/router-v3.contract.ts#L237)

***

### callPositionManager()

> **callPositionManager**(`data`, `overrides`?): `Promise`\<`ContractTransaction`\>

Calls the position manager with the provided data.

#### Parameters

• **data**: `BytesLike`

The data to pass to the position manager.

• **overrides?**: `ContractTransactionOverrides`

Optional transaction overrides.

#### Returns

`Promise`\<`ContractTransaction`\>

The contract transaction.

#### Implementation of

`UniswapRouterV3Types.Contract.callPositionManager`

#### Defined in

[packages/contracts/src/router/router-v3.contract.ts:377](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/contracts/src/router/router-v3.contract.ts#L377)

***

### checkOracleSlippage()

#### checkOracleSlippage(paths, amounts, maximumTickDivergence, secondsAgo, overrides)

> **checkOracleSlippage**(`paths`, `amounts`, `maximumTickDivergence`, `secondsAgo`, `overrides`?): `Promise`\<`void`\>

Checks for oracle slippage with multiple paths.

##### Parameters

• **paths**: `BytesLike`[]

The array of paths to check.

• **amounts**: `BigNumberish`[]

The array of amounts corresponding to each path.

• **maximumTickDivergence**: `BigNumberish`

The maximum allowed tick divergence.

• **secondsAgo**: `BigNumberish`

The number of seconds ago to consider for the oracle data.

• **overrides?**: `ContractCallOverrides`

Optional call overrides.

##### Returns

`Promise`\<`void`\>

A promise that resolves when the check is complete.

##### Implementation of

`UniswapRouterV3Types.Contract.checkOracleSlippage`

##### Defined in

[packages/contracts/src/router/router-v3.contract.ts:405](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/contracts/src/router/router-v3.contract.ts#L405)

#### checkOracleSlippage(path, maximumTickDivergence, secondsAgo, overrides)

> **checkOracleSlippage**(`path`, `maximumTickDivergence`, `secondsAgo`, `overrides`?): `Promise`\<`void`\>

Checks for oracle slippage with a single path.

##### Parameters

• **path**: `BytesLike`

The path to check.

• **maximumTickDivergence**: `BigNumberish`

The maximum allowed tick divergence.

• **secondsAgo**: `BigNumberish`

The number of seconds ago to consider for the oracle data.

• **overrides?**: `ContractCallOverrides`

Optional call overrides.

##### Returns

`Promise`\<`void`\>

A promise that resolves when the check is complete.

##### Implementation of

`UniswapRouterV3Types.Contract.checkOracleSlippage`

##### Defined in

[packages/contracts/src/router/router-v3.contract.ts:421](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/contracts/src/router/router-v3.contract.ts#L421)

***

### checkOracleSlippageSingle()

> **checkOracleSlippageSingle**(`path`, `maximumTickDivergence`, `secondsAgo`, `overrides`?): `Promise`\<`void`\>

Checks for oracle slippage with a single path.

#### Parameters

• **path**: `BytesLike`

The path to check.

• **maximumTickDivergence**: `BigNumberish`

The maximum allowed tick divergence.

• **secondsAgo**: `BigNumberish`

The number of seconds ago to consider for the oracle data.

• **overrides?**: `ContractTransactionOverrides`

Optional call overrides.

#### Returns

`Promise`\<`void`\>

A promise that resolves when the check is complete.

#### Defined in

[packages/contracts/src/router/router-v3.contract.ts:535](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/contracts/src/router/router-v3.contract.ts#L535)

***

### encodeApproveMax()

> **encodeApproveMax**(`token`): `string`

Encodes the function data for approving the maximum token allowance.

#### Parameters

• **token**: `string`

The address of the token to approve.

#### Returns

`string`

The encoded function data.

#### Defined in

[packages/contracts/src/router/router-v3.contract.ts:292](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/contracts/src/router/router-v3.contract.ts#L292)

***

### encodeApproveMaxMinusOne()

> **encodeApproveMaxMinusOne**(`token`): `string`

Encodes the function data for approving the maximum token allowance minus one.

#### Parameters

• **token**: `string`

The address of the token to approve.

#### Returns

`string`

The encoded function data.

#### Defined in

[packages/contracts/src/router/router-v3.contract.ts:317](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/contracts/src/router/router-v3.contract.ts#L317)

***

### encodeApproveZeroThenMax()

> **encodeApproveZeroThenMax**(`token`): `string`

Encodes the function data for approving zero tokens and then setting the maximum token allowance.

#### Parameters

• **token**: `string`

The address of the token to approve.

#### Returns

`string`

The encoded function data.

#### Defined in

[packages/contracts/src/router/router-v3.contract.ts:342](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/contracts/src/router/router-v3.contract.ts#L342)

***

### encodeApproveZeroThenMaxMinusOne()

> **encodeApproveZeroThenMaxMinusOne**(`token`): `string`

Encodes the function data for approving zero tokens and then setting the maximum token allowance minus one.

#### Parameters

• **token**: `string`

The address of the token to approve.

#### Returns

`string`

The encoded function data.

#### Defined in

[packages/contracts/src/router/router-v3.contract.ts:367](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/contracts/src/router/router-v3.contract.ts#L367)

***

### encodeCallPositionManager()

> **encodeCallPositionManager**(`data`): `string`

Encodes the function data for calling the position manager.

#### Parameters

• **data**: `BytesLike`

The data to pass to the position manager.

#### Returns

`string`

The encoded function data.

#### Defined in

[packages/contracts/src/router/router-v3.contract.ts:392](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/contracts/src/router/router-v3.contract.ts#L392)

***

### encodeCheckOracleSlippage()

#### encodeCheckOracleSlippage(paths, amounts, maximumTickDivergence, secondsAgo)

> **encodeCheckOracleSlippage**(`paths`, `amounts`, `maximumTickDivergence`, `secondsAgo`): `string`

Encodes the function data for checking oracle slippage with multiple paths.

##### Parameters

• **paths**: `BytesLike`[]

The array of paths to check.

• **amounts**: `BigNumberish`[]

The array of amounts corresponding to each path.

• **maximumTickDivergence**: `BigNumberish`

The maximum allowed tick divergence.

• **secondsAgo**: `BigNumberish`

The number of seconds ago to consider for the oracle data.

##### Returns

`string`

The encoded function data.

##### Defined in

[packages/contracts/src/router/router-v3.contract.ts:474](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/contracts/src/router/router-v3.contract.ts#L474)

#### encodeCheckOracleSlippage(path, maximumTickDivergence, secondsAgo)

> **encodeCheckOracleSlippage**(`path`, `maximumTickDivergence`, `secondsAgo`): `string`

Encodes the function data for checking oracle slippage with a single path.

##### Parameters

• **path**: `BytesLike`

The path to check.

• **maximumTickDivergence**: `BigNumberish`

The maximum allowed tick divergence.

• **secondsAgo**: `BigNumberish`

The number of seconds ago to consider for the oracle data.

##### Returns

`string`

The encoded function data.

##### Defined in

[packages/contracts/src/router/router-v3.contract.ts:488](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/contracts/src/router/router-v3.contract.ts#L488)

***

### encodeCheckOracleSlippageSingle()

> **encodeCheckOracleSlippageSingle**(`path`, `maximumTickDivergence`, `secondsAgo`): `string`

Encodes the function data for checking oracle slippage with a single path.

#### Parameters

• **path**: `BytesLike`

The path to check.

• **maximumTickDivergence**: `BigNumberish`

The maximum allowed tick divergence.

• **secondsAgo**: `BigNumberish`

The number of seconds ago to consider for the oracle data.

#### Returns

`string`

The encoded function data.

#### Defined in

[packages/contracts/src/router/router-v3.contract.ts:556](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/contracts/src/router/router-v3.contract.ts#L556)

***

### encodeExactInput()

> **encodeExactInput**(`params`): `string`

Encodes the function data for an exact input swap.

#### Parameters

• **params**: `ExactInputParamsRequest`

The swap parameters.

#### Returns

`string`

The encoded function data.

#### Defined in

[packages/contracts/src/router/router-v3.contract.ts:589](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/contracts/src/router/router-v3.contract.ts#L589)

***

### encodeExactInputSingle()

> **encodeExactInputSingle**(`params`): `string`

Encodes the function data for an exact input single swap.

#### Parameters

• **params**: `ExactInputSingleParamsRequest`

The swap parameters.

#### Returns

`string`

The encoded function data.

#### Defined in

[packages/contracts/src/router/router-v3.contract.ts:616](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/contracts/src/router/router-v3.contract.ts#L616)

***

### encodeExactOutput()

> **encodeExactOutput**(`params`): `string`

Encodes the function data for an exact output swap.

#### Parameters

• **params**: `ExactOutputParamsRequest`

The swap parameters.

#### Returns

`string`

The encoded function data.

#### Defined in

[packages/contracts/src/router/router-v3.contract.ts:643](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/contracts/src/router/router-v3.contract.ts#L643)

***

### encodeExactOutputSingle()

> **encodeExactOutputSingle**(`params`): `string`

Encodes the function data for an exact output single swap.

#### Parameters

• **params**: `ExactOutputSingleParamsRequest`

The swap parameters.

#### Returns

`string`

The encoded function data.

#### Defined in

[packages/contracts/src/router/router-v3.contract.ts:670](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/contracts/src/router/router-v3.contract.ts#L670)

***

### encodeGetApprovalType()

> **encodeGetApprovalType**(`token`, `amount`): `string`

Encodes the function data for getting the approval type.

#### Parameters

• **token**: `string`

The address of the token.

• **amount**: `BigNumberish`

The amount to approve.

#### Returns

`string`

The encoded function data.

#### Defined in

[packages/contracts/src/router/router-v3.contract.ts:739](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/contracts/src/router/router-v3.contract.ts#L739)

***

### encodeIncreaseLiquidity()

> **encodeIncreaseLiquidity**(`params`): `string`

Encodes the function data for increasing liquidity.

#### Parameters

• **params**: `IncreaseLiquidityParamsRequest`

The parameters for increasing liquidity.

#### Returns

`string`

The encoded function data.

#### Defined in

[packages/contracts/src/router/router-v3.contract.ts:764](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/contracts/src/router/router-v3.contract.ts#L764)

***

### encodeMint()

> **encodeMint**(`params`): `string`

Encodes the function data for minting a new position.

#### Parameters

• **params**: `MintParamsRequest`

The parameters for minting.

#### Returns

`string`

The encoded function data.

#### Defined in

[packages/contracts/src/router/router-v3.contract.ts:791](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/contracts/src/router/router-v3.contract.ts#L791)

***

### encodeMulticall()

#### encodeMulticall(data)

> **encodeMulticall**(`data`): `string`

Encodes the function data for a multicall.

##### Parameters

• **data**: `BytesLike`[]

An array of calldata.

##### Returns

`string`

The encoded function data.

##### Defined in

[packages/contracts/src/router/router-v3.contract.ts:856](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/contracts/src/router/router-v3.contract.ts#L856)

#### encodeMulticall(deadline, data)

> **encodeMulticall**(`deadline`, `data`): `string`

Encodes the function data for a multicall with a deadline.

##### Parameters

• **deadline**: `BigNumberish`

The deadline for the multicall.

• **data**: `BytesLike`[]

An array of calldata.

##### Returns

`string`

The encoded function data.

##### Defined in

[packages/contracts/src/router/router-v3.contract.ts:864](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/contracts/src/router/router-v3.contract.ts#L864)

#### encodeMulticall(previousBlockhash, data)

> **encodeMulticall**(`previousBlockhash`, `data`): `string`

Encodes the function data for a multicall with a previous blockhash.

##### Parameters

• **previousBlockhash**: `BytesLike`

The previous blockhash for the multicall.

• **data**: `BytesLike`[]

An array of calldata.

##### Returns

`string`

The encoded function data.

##### Defined in

[packages/contracts/src/router/router-v3.contract.ts:872](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/contracts/src/router/router-v3.contract.ts#L872)

***

### encodePull()

> **encodePull**(`token`, `value`): `string`

Encodes the function data for pulling tokens from the contract.

#### Parameters

• **token**: `string`

The address of the token to pull.

• **value**: `BigNumberish`

The amount of tokens to pull.

#### Returns

`string`

The encoded function data.

#### Defined in

[packages/contracts/src/router/router-v3.contract.ts:932](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/contracts/src/router/router-v3.contract.ts#L932)

***

### encodeRefundETH()

> **encodeRefundETH**(): `string`

Encodes the function data to refund any excess ETH sent in a transaction.

#### Returns

`string`

The encoded function data.

#### Defined in

[packages/contracts/src/router/router-v3.contract.ts:953](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/contracts/src/router/router-v3.contract.ts#L953)

***

### encodeSelfPermit()

> **encodeSelfPermit**(`token`, `value`, `deadline`, `v`, `r`, `s`): `string`

Encodes the function data to permit a token transfer on behalf of the user.

#### Parameters

• **token**: `string`

The address of the token.

• **value**: `BigNumberish`

The amount of tokens to permit.

• **deadline**: `BigNumberish`

The deadline for the permit.

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

[packages/contracts/src/router/router-v3.contract.ts:998](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/contracts/src/router/router-v3.contract.ts#L998)

***

### encodeSelfPermitAllowed()

> **encodeSelfPermitAllowed**(`token`, `nonce`, `expiry`, `v`, `r`, `s`): `string`

Encodes the function data to permit a token transfer on behalf of the user, using nonce and expiry.

#### Parameters

• **token**: `string`

The address of the token.

• **nonce**: `BigNumberish`

The permit nonce.

• **expiry**: `BigNumberish`

The expiry time.

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

[packages/contracts/src/router/router-v3.contract.ts:1057](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/contracts/src/router/router-v3.contract.ts#L1057)

***

### encodeSelfPermitAllowedIfNecessary()

> **encodeSelfPermitAllowedIfNecessary**(`token`, `nonce`, `expiry`, `v`, `r`, `s`): `string`

Encodes the function data to permit a token transfer on behalf of the user, if necessary, using nonce and expiry.

#### Parameters

• **token**: `string`

The address of the token.

• **nonce**: `BigNumberish`

The permit nonce.

• **expiry**: `BigNumberish`

The expiry time.

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

[packages/contracts/src/router/router-v3.contract.ts:1165](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/contracts/src/router/router-v3.contract.ts#L1165)

***

### encodeSelfPermitIfNecessary()

> **encodeSelfPermitIfNecessary**(`token`, `value`, `deadline`, `v`, `r`, `s`): `string`

Encodes the function data to permit a token transfer on behalf of the user, if necessary.

#### Parameters

• **token**: `string`

The address of the token.

• **value**: `BigNumberish`

The amount of tokens to permit.

• **deadline**: `BigNumberish`

The deadline for the permit.

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

[packages/contracts/src/router/router-v3.contract.ts:1111](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/contracts/src/router/router-v3.contract.ts#L1111)

***

### encodeSwapExactTokensForTokens()

> **encodeSwapExactTokensForTokens**(`amountIn`, `amountOutMin`, `path`, `to`): `string`

Encodes the function data for swapping exact input tokens for output tokens.

#### Parameters

• **amountIn**: `BigNumberish`

The amount of input tokens.

• **amountOutMin**: `BigNumberish`

The minimum amount of output tokens.

• **path**: `string`[]

The path of the swap.

• **to**: `string`

The recipient address.

#### Returns

`string`

The encoded function data.

#### Defined in

[packages/contracts/src/router/router-v3.contract.ts:1213](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/contracts/src/router/router-v3.contract.ts#L1213)

***

### encodeSwapTokensForExactTokens()

> **encodeSwapTokensForExactTokens**(`amountOut`, `amountInMax`, `path`, `to`): `string`

Encodes the function data for swapping tokens for exact output tokens.

#### Parameters

• **amountOut**: `BigNumberish`

The desired amount of output tokens.

• **amountInMax**: `BigNumberish`

The maximum amount of input tokens.

• **path**: `string`[]

The path of the swap.

• **to**: `string`

The recipient address.

#### Returns

`string`

The encoded function data.

#### Defined in

[packages/contracts/src/router/router-v3.contract.ts:1257](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/contracts/src/router/router-v3.contract.ts#L1257)

***

### encodeSweepToken()

> **encodeSweepToken**(`token`, `amountMinimum`, `recipientOrOverrides`?): `string`

Encodes the function data to sweep the specified token to the recipient's address.

#### Parameters

• **token**: `string`

The address of the token.

• **amountMinimum**: `BigNumberish`

The minimum amount of tokens to sweep.

• **recipientOrOverrides?**: `string` \| `ContractTransactionOverrides`

The address to receive the tokens.

#### Returns

`string`

The encoded function data.

#### Defined in

[packages/contracts/src/router/router-v3.contract.ts:1328](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/contracts/src/router/router-v3.contract.ts#L1328)

***

### encodeSweepTokenWithFee()

> **encodeSweepTokenWithFee**(`token`, `amountMinimum`, `feeBipsOrRecipient`, `feeRecipientOrFeeBips`, `feeRecipient`?): `string`

Encodes the function data to sweep the specified token to the recipient's address with a fee.

#### Parameters

• **token**: `string`

The address of the token.

• **amountMinimum**: `BigNumberish`

The minimum amount of tokens to sweep.

• **feeBipsOrRecipient**: `BigNumberish`

The fee in basis points, or the address to receive the tokens.

• **feeRecipientOrFeeBips**: `BigNumberish`

The address to receive the fee, or the fee in basis points.

• **feeRecipient?**: `string` \| `ContractTransactionOverrides`

The address to receive the fee.

#### Returns

`string`

The encoded function data.

#### Defined in

[packages/contracts/src/router/router-v3.contract.ts:1417](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/contracts/src/router/router-v3.contract.ts#L1417)

***

### encodeUniswapV3SwapCallback()

> **encodeUniswapV3SwapCallback**(`amount0Delta`, `amount1Delta`, `_data`): `string`

Encodes the function data for the Uniswap V3 swap callback.

#### Parameters

• **amount0Delta**: `BigNumberish`

The change in amount0.

• **amount1Delta**: `BigNumberish`

The change in amount1.

• **\_data**: `BytesLike`

The swap data.

#### Returns

`string`

The encoded function data.

#### Defined in

[packages/contracts/src/router/router-v3.contract.ts:1636](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/contracts/src/router/router-v3.contract.ts#L1636)

***

### encodeUnwrapWETH9()

> **encodeUnwrapWETH9**(`amountMinimum`, `recipient`?): `string`

Encodes the function data to unwrap WETH9 and send ETH to the recipient's address.

#### Parameters

• **amountMinimum**: `BigNumberish`

The minimum amount of WETH9 to unwrap.

• **recipient?**: `string`

The address to receive the ETH.

#### Returns

`string`

The encoded function data.

#### Defined in

[packages/contracts/src/router/router-v3.contract.ts:1491](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/contracts/src/router/router-v3.contract.ts#L1491)

***

### encodeUnwrapWETH9WithFee()

#### encodeUnwrapWETH9WithFee(amountMinimum, feeBips, feeRecipient)

> **encodeUnwrapWETH9WithFee**(`amountMinimum`, `feeBips`, `feeRecipient`): `string`

Encodes the function data to unwrap WETH9 and send ETH to the recipient's address with a fee.

##### Parameters

• **amountMinimum**: `BigNumberish`

The minimum amount of WETH9 to unwrap.

• **feeBips**: `BigNumberish`

The fee in basis points.

• **feeRecipient**: `string`

The address to receive the fee.

##### Returns

`string`

The contract transaction.

##### Defined in

[packages/contracts/src/router/router-v3.contract.ts:1566](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/contracts/src/router/router-v3.contract.ts#L1566)

#### encodeUnwrapWETH9WithFee(amountMinimum, recipient, feeBips, feeRecipient)

> **encodeUnwrapWETH9WithFee**(`amountMinimum`, `recipient`, `feeBips`, `feeRecipient`): `string`

Encodes the function data to unwrap WETH9 and send ETH to the recipient's address with a fee.

##### Parameters

• **amountMinimum**: `BigNumberish`

The minimum amount of WETH9 to unwrap.

• **recipient**: `string`

The address to receive the ETH.

• **feeBips**: `BigNumberish`

The fee in basis points.

• **feeRecipient**: `string`

The address to receive the fee.

##### Returns

`string`

The contract transaction.

##### Defined in

[packages/contracts/src/router/router-v3.contract.ts:1580](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/contracts/src/router/router-v3.contract.ts#L1580)

***

### encodeWrapETH()

> **encodeWrapETH**(`value`): `string`

Encodes the function data to wrap ETH into WETH9.

#### Parameters

• **value**: `BigNumberish`

The amount of ETH to wrap.

#### Returns

`string`

The encoded function data.

#### Defined in

[packages/contracts/src/router/router-v3.contract.ts:1669](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/contracts/src/router/router-v3.contract.ts#L1669)

***

### exactInput()

> **exactInput**(`params`, `overrides`?): `Promise`\<`ContractTransaction`\>

Executes an exact input swap.

#### Parameters

• **params**: `ExactInputParamsRequest`

The swap parameters.

• **overrides?**: `ContractTransactionOverrides`

Optional transaction overrides.

#### Returns

`Promise`\<`ContractTransaction`\>

The contract transaction.

#### Implementation of

`UniswapRouterV3Types.Contract.exactInput`

#### Defined in

[packages/contracts/src/router/router-v3.contract.ts:574](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/contracts/src/router/router-v3.contract.ts#L574)

***

### exactInputSingle()

> **exactInputSingle**(`params`, `overrides`?): `Promise`\<`ContractTransaction`\>

Executes an exact input single swap.

#### Parameters

• **params**: `ExactInputSingleParamsRequest`

The swap parameters.

• **overrides?**: `ContractTransactionOverrides`

Optional transaction overrides.

#### Returns

`Promise`\<`ContractTransaction`\>

The contract transaction.

#### Implementation of

`UniswapRouterV3Types.Contract.exactInputSingle`

#### Defined in

[packages/contracts/src/router/router-v3.contract.ts:601](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/contracts/src/router/router-v3.contract.ts#L601)

***

### exactOutput()

> **exactOutput**(`params`, `overrides`?): `Promise`\<`ContractTransaction`\>

Executes an exact output swap.

#### Parameters

• **params**: `ExactOutputParamsRequest`

The swap parameters.

• **overrides?**: `ContractTransactionOverrides`

Optional transaction overrides.

#### Returns

`Promise`\<`ContractTransaction`\>

The contract transaction.

#### Implementation of

`UniswapRouterV3Types.Contract.exactOutput`

#### Defined in

[packages/contracts/src/router/router-v3.contract.ts:628](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/contracts/src/router/router-v3.contract.ts#L628)

***

### exactOutputSingle()

> **exactOutputSingle**(`params`, `overrides`?): `Promise`\<`ContractTransaction`\>

Executes an exact output single swap.

#### Parameters

• **params**: `ExactOutputSingleParamsRequest`

The swap parameters.

• **overrides?**: `ContractTransactionOverrides`

Optional transaction overrides.

#### Returns

`Promise`\<`ContractTransaction`\>

The contract transaction.

#### Implementation of

`UniswapRouterV3Types.Contract.exactOutputSingle`

#### Defined in

[packages/contracts/src/router/router-v3.contract.ts:655](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/contracts/src/router/router-v3.contract.ts#L655)

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

`UniswapRouterV3Types.Contract.factory`

#### Defined in

[packages/contracts/src/router/router-v3.contract.ts:680](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/contracts/src/router/router-v3.contract.ts#L680)

***

### factoryCallContext()

> **factoryCallContext**(): `MethodCall`\<`Contract`, `"factory"`\>

Returns the call context for the factory method.

#### Returns

`MethodCall`\<`Contract`, `"factory"`\>

The call context.

#### Defined in

[packages/contracts/src/router/router-v3.contract.ts:688](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/contracts/src/router/router-v3.contract.ts#L688)

***

### factoryV2()

> **factoryV2**(): `Promise`\<`string`\>

Returns the V2 factory address.

#### Returns

`Promise`\<`string`\>

The V2 factory address.

#### Implementation of

`UniswapRouterV3Types.Contract.factoryV2`

#### Defined in

[packages/contracts/src/router/router-v3.contract.ts:699](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/contracts/src/router/router-v3.contract.ts#L699)

***

### factoryV2CallContext()

> **factoryV2CallContext**(): `MethodCall`\<`Contract`, `"factoryV2"`\>

Returns the call context for the factoryV2 method.

#### Returns

`MethodCall`\<`Contract`, `"factoryV2"`\>

The call context.

#### Defined in

[packages/contracts/src/router/router-v3.contract.ts:707](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/contracts/src/router/router-v3.contract.ts#L707)

***

### getApprovalType()

> **getApprovalType**(`token`, `amount`, `overrides`?): `Promise`\<`ContractTransaction`\>

Gets the approval type for a token and amount.

#### Parameters

• **token**: `string`

The address of the token.

• **amount**: `BigNumberish`

The amount to approve.

• **overrides?**: `ContractTransactionOverrides`

Optional transaction overrides.

#### Returns

`Promise`\<`ContractTransaction`\>

The contract transaction.

#### Implementation of

`UniswapRouterV3Types.Contract.getApprovalType`

#### Defined in

[packages/contracts/src/router/router-v3.contract.ts:721](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/contracts/src/router/router-v3.contract.ts#L721)

***

### increaseLiquidity()

> **increaseLiquidity**(`params`, `overrides`?): `Promise`\<`ContractTransaction`\>

Increases liquidity for a specific position.

#### Parameters

• **params**: `IncreaseLiquidityParamsRequest`

The parameters for increasing liquidity.

• **overrides?**: `ContractTransactionOverrides`

Optional transaction overrides.

#### Returns

`Promise`\<`ContractTransaction`\>

The contract transaction.

#### Implementation of

`UniswapRouterV3Types.Contract.increaseLiquidity`

#### Defined in

[packages/contracts/src/router/router-v3.contract.ts:749](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/contracts/src/router/router-v3.contract.ts#L749)

***

### mint()

> **mint**(`params`, `overrides`?): `Promise`\<`ContractTransaction`\>

Mints a new position.

#### Parameters

• **params**: `MintParamsRequest`

The parameters for minting.

• **overrides?**: `ContractTransactionOverrides`

Optional transaction overrides.

#### Returns

`Promise`\<`ContractTransaction`\>

The contract transaction.

#### Implementation of

`UniswapRouterV3Types.Contract.mint`

#### Defined in

[packages/contracts/src/router/router-v3.contract.ts:776](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/contracts/src/router/router-v3.contract.ts#L776)

***

### multicall()

#### multicall(data, overrides)

> **multicall**(`data`, `overrides`?): `Promise`\<`ContractTransaction`\>

Executes a multicall with an array of calldata.

##### Parameters

• **data**: `BytesLike`[]

An array of calldata.

• **overrides?**: `ContractTransactionOverrides`

Optional transaction overrides.

##### Returns

`Promise`\<`ContractTransaction`\>

The contract transaction.

##### Implementation of

`UniswapRouterV3Types.Contract.multicall`

##### Defined in

[packages/contracts/src/router/router-v3.contract.ts:801](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/contracts/src/router/router-v3.contract.ts#L801)

#### multicall(deadline, data, overrides)

> **multicall**(`deadline`, `data`, `overrides`?): `Promise`\<`ContractTransaction`\>

Executes a multicall with a deadline and an array of calldata.

##### Parameters

• **deadline**: `BigNumberish`

The deadline for the multicall.

• **data**: `BytesLike`[]

An array of calldata.

• **overrides?**: `ContractTransactionOverrides`

Optional transaction overrides.

##### Returns

`Promise`\<`ContractTransaction`\>

The contract transaction.

##### Implementation of

`UniswapRouterV3Types.Contract.multicall`

##### Defined in

[packages/contracts/src/router/router-v3.contract.ts:813](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/contracts/src/router/router-v3.contract.ts#L813)

#### multicall(previousBlockhash, data, overrides)

> **multicall**(`previousBlockhash`, `data`, `overrides`?): `Promise`\<`ContractTransaction`\>

Executes a multicall with a previous blockhash and an array of calldata.

##### Parameters

• **previousBlockhash**: `BytesLike`

The previous blockhash for the multicall.

• **data**: `BytesLike`[]

An array of calldata.

• **overrides?**: `ContractTransactionOverrides`

Optional transaction overrides.

##### Returns

`Promise`\<`ContractTransaction`\>

The contract transaction.

##### Implementation of

`UniswapRouterV3Types.Contract.multicall`

##### Defined in

[packages/contracts/src/router/router-v3.contract.ts:826](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/contracts/src/router/router-v3.contract.ts#L826)

***

### positionManager()

> **positionManager**(): `Promise`\<`string`\>

Returns the position manager address.

#### Returns

`Promise`\<`string`\>

The position manager address.

#### Implementation of

`UniswapRouterV3Types.Contract.positionManager`

#### Defined in

[packages/contracts/src/router/router-v3.contract.ts:892](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/contracts/src/router/router-v3.contract.ts#L892)

***

### positionManagerCallContext()

> **positionManagerCallContext**(): `MethodCall`\<`Contract`, `"positionManager"`\>

Returns the call context for the positionManager method.

#### Returns

`MethodCall`\<`Contract`, `"positionManager"`\>

The call context.

#### Defined in

[packages/contracts/src/router/router-v3.contract.ts:900](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/contracts/src/router/router-v3.contract.ts#L900)

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

[packages/contracts/src/router/router-v3.contract.ts:163](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/contracts/src/router/router-v3.contract.ts#L163)

***

### prepareContractContext()

> **prepareContractContext**\<`TCalls`, `TCustomData`\>(`calls`, `customData`?): `ContractContext`\<`Contract`, `TCalls`, `TCustomData`\>

Helper function to dynamically prepare a contract context based on custom or default method names.

#### Type Parameters

• **TCalls** *extends* `Record`\<`string`, `MethodCall`\<`Contract`, `"factory"`\> \| `MethodCall`\<`Contract`, `"swapExactTokensForTokens"`\> \| `MethodCall`\<`Contract`, `"swapTokensForExactTokens"`\> \| `MethodCall`\<`Contract`, `"increaseLiquidity"`\> \| `MethodCall`\<`Contract`, `"mint"`\> \| `MethodCall`\<`Contract`, `"multicall"`\> \| `MethodCall`\<`Contract`, `"selfPermit"`\> \| `MethodCall`\<`Contract`, `"selfPermitAllowed"`\> \| `MethodCall`\<`Contract`, `"selfPermitAllowedIfNecessary"`\> \| `MethodCall`\<`Contract`, `"selfPermitIfNecessary"`\> \| `MethodCall`\<`Contract`, `"sweepToken"`\> \| `MethodCall`\<`Contract`, `"exactInput"`\> \| `MethodCall`\<`Contract`, `"exactInputSingle"`\> \| `MethodCall`\<`Contract`, `"exactOutput"`\> \| `MethodCall`\<`Contract`, `"exactOutputSingle"`\> \| `MethodCall`\<`Contract`, `"sweepTokenWithFee"`\> \| `MethodCall`\<`Contract`, `"WETH9"`\> \| `MethodCall`\<`Contract`, `"refundETH"`\> \| `MethodCall`\<`Contract`, `"unwrapWETH9"`\> \| `MethodCall`\<`Contract`, `"uniswapV3SwapCallback"`\> \| `MethodCall`\<`Contract`, `"approveMax"`\> \| `MethodCall`\<`Contract`, `"approveMaxMinusOne"`\> \| `MethodCall`\<`Contract`, `"approveZeroThenMax"`\> \| `MethodCall`\<`Contract`, `"approveZeroThenMaxMinusOne"`\> \| `MethodCall`\<`Contract`, `"callPositionManager"`\> \| `MethodCall`\<`Contract`, `"checkOracleSlippage"`\> \| `MethodCall`\<`Contract`, `"factoryV2"`\> \| `MethodCall`\<`Contract`, `"getApprovalType"`\> \| `MethodCall`\<`Contract`, `"positionManager"`\> \| `MethodCall`\<`Contract`, `"pull"`\> \| `MethodCall`\<`Contract`, `"unwrapWETH9WithFee"`\> \| `MethodCall`\<`Contract`, `"wrapETH"`\>\>

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

[packages/contracts/src/router/router-v3.contract.ts:194](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/contracts/src/router/router-v3.contract.ts#L194)

***

### pull()

> **pull**(`token`, `value`, `overrides`?): `Promise`\<`ContractTransaction`\>

Pulls tokens from the contract.

#### Parameters

• **token**: `string`

The address of the token to pull.

• **value**: `BigNumberish`

The amount of tokens to pull.

• **overrides?**: `ContractTransactionOverrides`

Optional transaction overrides.

#### Returns

`Promise`\<`ContractTransaction`\>

The contract transaction.

#### Implementation of

`UniswapRouterV3Types.Contract.pull`

#### Defined in

[packages/contracts/src/router/router-v3.contract.ts:914](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/contracts/src/router/router-v3.contract.ts#L914)

***

### refundETH()

> **refundETH**(`overrides`?): `Promise`\<`ContractTransaction`\>

Refunds any excess ETH sent in a transaction.

#### Parameters

• **overrides?**: `ContractTransactionOverrides`

Optional transaction overrides.

#### Returns

`Promise`\<`ContractTransaction`\>

The contract transaction.

#### Implementation of

`UniswapRouterV3Types.Contract.refundETH`

#### Defined in

[packages/contracts/src/router/router-v3.contract.ts:941](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/contracts/src/router/router-v3.contract.ts#L941)

***

### selfPermit()

> **selfPermit**(`token`, `value`, `deadline`, `v`, `r`, `s`, `overrides`?): `Promise`\<`ContractTransaction`\>

Permits a token transfer on behalf of the user.

#### Parameters

• **token**: `string`

The address of the token.

• **value**: `BigNumberish`

The amount of tokens to permit.

• **deadline**: `BigNumberish`

The deadline for the permit.

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

`UniswapRouterV3Types.Contract.selfPermit`

#### Defined in

[packages/contracts/src/router/router-v3.contract.ts:968](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/contracts/src/router/router-v3.contract.ts#L968)

***

### selfPermitAllowed()

> **selfPermitAllowed**(`token`, `nonce`, `expiry`, `v`, `r`, `s`, `overrides`?): `Promise`\<`ContractTransaction`\>

Permits a token transfer on behalf of the user, using nonce and expiry.

#### Parameters

• **token**: `string`

The address of the token.

• **nonce**: `BigNumberish`

The permit nonce.

• **expiry**: `BigNumberish`

The expiry time.

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

`UniswapRouterV3Types.Contract.selfPermitAllowed`

#### Defined in

[packages/contracts/src/router/router-v3.contract.ts:1027](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/contracts/src/router/router-v3.contract.ts#L1027)

***

### selfPermitAllowedIfNecessary()

> **selfPermitAllowedIfNecessary**(`token`, `nonce`, `expiry`, `v`, `r`, `s`, `overrides`?): `Promise`\<`ContractTransaction`\>

Permits a token transfer on behalf of the user, if necessary, using nonce and expiry.

#### Parameters

• **token**: `string`

The address of the token.

• **nonce**: `BigNumberish`

The permit nonce.

• **expiry**: `BigNumberish`

The expiry time.

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

`UniswapRouterV3Types.Contract.selfPermitAllowedIfNecessary`

#### Defined in

[packages/contracts/src/router/router-v3.contract.ts:1140](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/contracts/src/router/router-v3.contract.ts#L1140)

***

### selfPermitIfNecessary()

> **selfPermitIfNecessary**(`token`, `value`, `deadline`, `v`, `r`, `s`, `overrides`?): `Promise`\<`ContractTransaction`\>

Permits a token transfer on behalf of the user, if necessary.

#### Parameters

• **token**: `string`

The address of the token.

• **value**: `BigNumberish`

The amount of tokens to permit.

• **deadline**: `BigNumberish`

The deadline for the permit.

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

`UniswapRouterV3Types.Contract.selfPermitIfNecessary`

#### Defined in

[packages/contracts/src/router/router-v3.contract.ts:1086](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/contracts/src/router/router-v3.contract.ts#L1086)

***

### swapExactTokensForTokens()

> **swapExactTokensForTokens**(`amountIn`, `amountOutMin`, `path`, `to`, `overrides`?): `Promise`\<`ContractTransaction`\>

Executes a token swap with exact input tokens.

#### Parameters

• **amountIn**: `BigNumberish`

The amount of input tokens.

• **amountOutMin**: `BigNumberish`

The minimum amount of output tokens.

• **path**: `string`[]

The path of the swap.

• **to**: `string`

The recipient address.

• **overrides?**: `ContractTransactionOverrides`

Optional transaction overrides.

#### Returns

`Promise`\<`ContractTransaction`\>

The contract transaction.

#### Implementation of

`UniswapRouterV3Types.Contract.swapExactTokensForTokens`

#### Defined in

[packages/contracts/src/router/router-v3.contract.ts:1192](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/contracts/src/router/router-v3.contract.ts#L1192)

***

### swapTokensForExactTokens()

> **swapTokensForExactTokens**(`amountOut`, `amountInMax`, `path`, `to`, `overrides`?): `Promise`\<`ContractTransaction`\>

Executes a token swap for exact output tokens.

#### Parameters

• **amountOut**: `BigNumberish`

The desired amount of output tokens.

• **amountInMax**: `BigNumberish`

The maximum amount of input tokens.

• **path**: `string`[]

The path of the swap.

• **to**: `string`

The recipient address.

• **overrides?**: `ContractTransactionOverrides`

Optional transaction overrides.

#### Returns

`Promise`\<`ContractTransaction`\>

The contract transaction.

#### Implementation of

`UniswapRouterV3Types.Contract.swapTokensForExactTokens`

#### Defined in

[packages/contracts/src/router/router-v3.contract.ts:1236](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/contracts/src/router/router-v3.contract.ts#L1236)

***

### sweepToken()

#### sweepToken(token, amountMinimum, overrides)

> **sweepToken**(`token`, `amountMinimum`, `overrides`?): `Promise`\<`ContractTransaction`\>

Sweeps the specified token to the recipient's address.

##### Parameters

• **token**: `string`

The address of the token.

• **amountMinimum**: `BigNumberish`

The minimum amount of tokens to sweep.

• **overrides?**: `ContractTransactionOverrides`

Optional transaction overrides.

##### Returns

`Promise`\<`ContractTransaction`\>

The contract transaction.

##### Implementation of

`UniswapRouterV3Types.Contract.sweepToken`

##### Defined in

[packages/contracts/src/router/router-v3.contract.ts:1278](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/contracts/src/router/router-v3.contract.ts#L1278)

#### sweepToken(token, amountMinimum, recipient, overrides)

> **sweepToken**(`token`, `amountMinimum`, `recipient`, `overrides`?): `Promise`\<`ContractTransaction`\>

Sweeps the specified token to the recipient's address.

##### Parameters

• **token**: `string`

The address of the token.

• **amountMinimum**: `BigNumberish`

The minimum amount of tokens to sweep.

• **recipient**: `string`

The address to receive the tokens.

• **overrides?**: `ContractTransactionOverrides`

Optional transaction overrides.

##### Returns

`Promise`\<`ContractTransaction`\>

The contract transaction.

##### Implementation of

`UniswapRouterV3Types.Contract.sweepToken`

##### Defined in

[packages/contracts/src/router/router-v3.contract.ts:1292](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/contracts/src/router/router-v3.contract.ts#L1292)

***

### sweepTokenWithFee()

#### sweepTokenWithFee(token, amountMinimum, feeBips, feeRecipient, overrides)

> **sweepTokenWithFee**(`token`, `amountMinimum`, `feeBips`, `feeRecipient`, `overrides`?): `Promise`\<`ContractTransaction`\>

Sweeps the specified token to the recipient's address with a fee.

##### Parameters

• **token**: `string`

The address of the token.

• **amountMinimum**: `BigNumberish`

The minimum amount of tokens to sweep.

• **feeBips**: `BigNumberish`

The fee in basis points.

• **feeRecipient**: `string`

The address to receive the fee.

• **overrides?**: `ContractTransactionOverrides`

Optional transaction overrides.

##### Returns

`Promise`\<`ContractTransaction`\>

The contract transaction.

##### Implementation of

`UniswapRouterV3Types.Contract.sweepTokenWithFee`

##### Defined in

[packages/contracts/src/router/router-v3.contract.ts:1353](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/contracts/src/router/router-v3.contract.ts#L1353)

#### sweepTokenWithFee(token, amountMinimum, recipient, feeBips, feeRecipient, overrides)

> **sweepTokenWithFee**(`token`, `amountMinimum`, `recipient`, `feeBips`, `feeRecipient`, `overrides`?): `Promise`\<`ContractTransaction`\>

Sweeps the specified token to the recipient's address with a fee.

##### Parameters

• **token**: `string`

The address of the token.

• **amountMinimum**: `BigNumberish`

The minimum amount of tokens to sweep.

• **recipient**: `string`

The address to receive the tokens.

• **feeBips**: `BigNumberish`

The fee in basis points.

• **feeRecipient**: `string`

The address to receive the fee.

• **overrides?**: `ContractTransactionOverrides`

Optional transaction overrides.

##### Returns

`Promise`\<`ContractTransaction`\>

The contract transaction.

##### Implementation of

`UniswapRouterV3Types.Contract.sweepTokenWithFee`

##### Defined in

[packages/contracts/src/router/router-v3.contract.ts:1371](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/contracts/src/router/router-v3.contract.ts#L1371)

***

### uniswapV3SwapCallback()

> **uniswapV3SwapCallback**(`amount0Delta`, `amount1Delta`, `_data`, `overrides`?): `Promise`\<`ContractTransaction`\>

Callback function for Uniswap V3 swaps.

#### Parameters

• **amount0Delta**: `BigNumberish`

The change in amount0.

• **amount1Delta**: `BigNumberish`

The change in amount1.

• **\_data**: `BytesLike`

The swap data.

• **overrides?**: `ContractTransactionOverrides`

Optional transaction overrides.

#### Returns

`Promise`\<`ContractTransaction`\>

The contract transaction.

#### Implementation of

`UniswapRouterV3Types.Contract.uniswapV3SwapCallback`

#### Defined in

[packages/contracts/src/router/router-v3.contract.ts:1617](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/contracts/src/router/router-v3.contract.ts#L1617)

***

### unwrapWETH9()

#### unwrapWETH9(amountMinimum, overrides)

> **unwrapWETH9**(`amountMinimum`, `overrides`?): `Promise`\<`ContractTransaction`\>

Unwraps WETH9 and sends ETH to the recipient's address.

##### Parameters

• **amountMinimum**: `BigNumberish`

The minimum amount of WETH9 to unwrap.

• **overrides?**: `ContractTransactionOverrides`

Optional transaction overrides.

##### Returns

`Promise`\<`ContractTransaction`\>

The contract transaction.

##### Implementation of

`UniswapRouterV3Types.Contract.unwrapWETH9`

##### Defined in

[packages/contracts/src/router/router-v3.contract.ts:1448](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/contracts/src/router/router-v3.contract.ts#L1448)

#### unwrapWETH9(amountMinimum, recipient, overrides)

> **unwrapWETH9**(`amountMinimum`, `recipient`, `overrides`?): `Promise`\<`ContractTransaction`\>

Unwraps WETH9 and sends ETH to the recipient's address.

##### Parameters

• **amountMinimum**: `BigNumberish`

The minimum amount of WETH9 to unwrap.

• **recipient**: `string`

The address to receive the ETH.

• **overrides?**: `ContractTransactionOverrides`

Optional transaction overrides.

##### Returns

`Promise`\<`ContractTransaction`\>

The contract transaction.

##### Implementation of

`UniswapRouterV3Types.Contract.unwrapWETH9`

##### Defined in

[packages/contracts/src/router/router-v3.contract.ts:1460](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/contracts/src/router/router-v3.contract.ts#L1460)

***

### unwrapWETH9WithFee()

#### unwrapWETH9WithFee(amountMinimum, feeBips, feeRecipient, overrides)

> **unwrapWETH9WithFee**(`amountMinimum`, `feeBips`, `feeRecipient`, `overrides`?): `Promise`\<`ContractTransaction`\>

Unwraps WETH9 and sends ETH to the recipient's address with a fee.

##### Parameters

• **amountMinimum**: `BigNumberish`

The minimum amount of WETH9 to unwrap.

• **feeBips**: `BigNumberish`

The fee in basis points.

• **feeRecipient**: `string`

The address to receive the fee.

• **overrides?**: `ContractTransactionOverrides`

Optional transaction overrides.

##### Returns

`Promise`\<`ContractTransaction`\>

The contract transaction.

##### Implementation of

`UniswapRouterV3Types.Contract.unwrapWETH9WithFee`

##### Defined in

[packages/contracts/src/router/router-v3.contract.ts:1510](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/contracts/src/router/router-v3.contract.ts#L1510)

#### unwrapWETH9WithFee(amountMinimum, recipient, feeBips, feeRecipient, overrides)

> **unwrapWETH9WithFee**(`amountMinimum`, `recipient`, `feeBips`, `feeRecipient`, `overrides`?): `Promise`\<`ContractTransaction`\>

Unwraps WETH9 and sends ETH to the recipient's address with a fee.

##### Parameters

• **amountMinimum**: `BigNumberish`

The minimum amount of WETH9 to unwrap.

• **recipient**: `string`

The address to receive the ETH.

• **feeBips**: `BigNumberish`

The fee in basis points.

• **feeRecipient**: `string`

The address to receive the fee.

• **overrides?**: `ContractTransactionOverrides`

Optional transaction overrides.

##### Returns

`Promise`\<`ContractTransaction`\>

The contract transaction.

##### Implementation of

`UniswapRouterV3Types.Contract.unwrapWETH9WithFee`

##### Defined in

[packages/contracts/src/router/router-v3.contract.ts:1526](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/contracts/src/router/router-v3.contract.ts#L1526)

***

### wrapETH()

> **wrapETH**(`value`, `overrides`?): `Promise`\<`ContractTransaction`\>

Wraps ETH into WETH9.

#### Parameters

• **value**: `BigNumberish`

The amount of ETH to wrap.

• **overrides?**: `ContractTransactionOverrides`

Optional transaction overrides.

#### Returns

`Promise`\<`ContractTransaction`\>

The contract transaction.

#### Implementation of

`UniswapRouterV3Types.Contract.wrapETH`

#### Defined in

[packages/contracts/src/router/router-v3.contract.ts:1654](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/contracts/src/router/router-v3.contract.ts#L1654)
