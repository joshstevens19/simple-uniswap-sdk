[**@dex-toolkit/types v1.0.0**](../../../README.md) • **Docs**

***

[Documentation v1.0.0](../../../../../packages.md) / [@dex-toolkit/types](../../../README.md) / [UniswapRouterV3Types](../README.md) / Contract

# Interface: Contract

## Methods

### WETH9()

> **WETH9**(`overrides`?): `Promise`\<`string`\>

Payable: false
Constant: true
StateMutability: view
Type: function

#### Parameters

• **overrides?**: [`ContractCallOverrides`](../../../type-aliases/ContractCallOverrides.md)

#### Returns

`Promise`\<`string`\>

#### Defined in

packages/types/src/abis/uniswap-router-v3.types.ts:107

***

### approveMax()

> **approveMax**(`token`, `overrides`?): `Promise`\<`ContractTransaction`\>

Payable: true
Constant: false
StateMutability: payable
Type: function

#### Parameters

• **token**: `string`

Type: address, Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

packages/types/src/abis/uniswap-router-v3.types.ts:115

***

### approveMaxMinusOne()

> **approveMaxMinusOne**(`token`, `overrides`?): `Promise`\<`ContractTransaction`\>

Payable: true
Constant: false
StateMutability: payable
Type: function

#### Parameters

• **token**: `string`

Type: address, Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

packages/types/src/abis/uniswap-router-v3.types.ts:126

***

### approveZeroThenMax()

> **approveZeroThenMax**(`token`, `overrides`?): `Promise`\<`ContractTransaction`\>

Payable: true
Constant: false
StateMutability: payable
Type: function

#### Parameters

• **token**: `string`

Type: address, Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

packages/types/src/abis/uniswap-router-v3.types.ts:137

***

### approveZeroThenMaxMinusOne()

> **approveZeroThenMaxMinusOne**(`token`, `overrides`?): `Promise`\<`ContractTransaction`\>

Payable: true
Constant: false
StateMutability: payable
Type: function

#### Parameters

• **token**: `string`

Type: address, Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

packages/types/src/abis/uniswap-router-v3.types.ts:148

***

### callPositionManager()

> **callPositionManager**(`data`, `overrides`?): `Promise`\<`ContractTransaction`\>

Payable: true
Constant: false
StateMutability: payable
Type: function

#### Parameters

• **data**: `BytesLike`

Type: bytes, Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

packages/types/src/abis/uniswap-router-v3.types.ts:159

***

### checkOracleSlippage()

#### checkOracleSlippage(paths, amounts, maximumTickDivergence, secondsAgo, overrides)

> **checkOracleSlippage**(`paths`, `amounts`, `maximumTickDivergence`, `secondsAgo`, `overrides`?): `Promise`\<`void`\>

Payable: false
Constant: true
StateMutability: view
Type: function

##### Parameters

• **paths**: `BytesLike`[]

Type: bytes[], Indexed: false

• **amounts**: `BigNumberish`[]

Type: uint128[], Indexed: false

• **maximumTickDivergence**: `BigNumberish`

Type: uint24, Indexed: false

• **secondsAgo**: `BigNumberish`

Type: uint32, Indexed: false

• **overrides?**: [`ContractCallOverrides`](../../../type-aliases/ContractCallOverrides.md)

##### Returns

`Promise`\<`void`\>

##### Defined in

packages/types/src/abis/uniswap-router-v3.types.ts:173

#### checkOracleSlippage(path, maximumTickDivergence, secondsAgo, overrides)

> **checkOracleSlippage**(`path`, `maximumTickDivergence`, `secondsAgo`, `overrides`?): `Promise`\<`void`\>

Payable: false
Constant: true
StateMutability: view
Type: function

##### Parameters

• **path**: `BytesLike`

Type: bytes, Indexed: false

• **maximumTickDivergence**: `BigNumberish`

Type: uint24, Indexed: false

• **secondsAgo**: `BigNumberish`

Type: uint32, Indexed: false

• **overrides?**: [`ContractCallOverrides`](../../../type-aliases/ContractCallOverrides.md)

##### Returns

`Promise`\<`void`\>

##### Defined in

packages/types/src/abis/uniswap-router-v3.types.ts:189

***

### exactInput()

> **exactInput**(`params`, `overrides`?): `Promise`\<`ContractTransaction`\>

Payable: true
Constant: false
StateMutability: payable
Type: function

#### Parameters

• **params**: [`ExactInputParamsRequest`](ExactInputParamsRequest.md)

Type: tuple, Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

packages/types/src/abis/uniswap-router-v3.types.ts:202

***

### exactInputSingle()

> **exactInputSingle**(`params`, `overrides`?): `Promise`\<`ContractTransaction`\>

Payable: true
Constant: false
StateMutability: payable
Type: function

#### Parameters

• **params**: [`ExactInputSingleParamsRequest`](ExactInputSingleParamsRequest.md)

Type: tuple, Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

packages/types/src/abis/uniswap-router-v3.types.ts:213

***

### exactOutput()

> **exactOutput**(`params`, `overrides`?): `Promise`\<`ContractTransaction`\>

Payable: true
Constant: false
StateMutability: payable
Type: function

#### Parameters

• **params**: [`ExactOutputParamsRequest`](ExactOutputParamsRequest.md)

Type: tuple, Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

packages/types/src/abis/uniswap-router-v3.types.ts:224

***

### exactOutputSingle()

> **exactOutputSingle**(`params`, `overrides`?): `Promise`\<`ContractTransaction`\>

Payable: true
Constant: false
StateMutability: payable
Type: function

#### Parameters

• **params**: [`ExactOutputSingleParamsRequest`](ExactOutputSingleParamsRequest.md)

Type: tuple, Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

packages/types/src/abis/uniswap-router-v3.types.ts:235

***

### factory()

> **factory**(`overrides`?): `Promise`\<`string`\>

Payable: false
Constant: true
StateMutability: view
Type: function

#### Parameters

• **overrides?**: [`ContractCallOverrides`](../../../type-aliases/ContractCallOverrides.md)

#### Returns

`Promise`\<`string`\>

#### Defined in

packages/types/src/abis/uniswap-router-v3.types.ts:245

***

### factoryV2()

> **factoryV2**(`overrides`?): `Promise`\<`string`\>

Payable: false
Constant: true
StateMutability: view
Type: function

#### Parameters

• **overrides?**: [`ContractCallOverrides`](../../../type-aliases/ContractCallOverrides.md)

#### Returns

`Promise`\<`string`\>

#### Defined in

packages/types/src/abis/uniswap-router-v3.types.ts:252

***

### getApprovalType()

> **getApprovalType**(`token`, `amount`, `overrides`?): `Promise`\<`ContractTransaction`\>

Payable: false
Constant: false
StateMutability: nonpayable
Type: function

#### Parameters

• **token**: `string`

Type: address, Indexed: false

• **amount**: `BigNumberish`

Type: uint256, Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

packages/types/src/abis/uniswap-router-v3.types.ts:261

***

### increaseLiquidity()

> **increaseLiquidity**(`params`, `overrides`?): `Promise`\<`ContractTransaction`\>

Payable: true
Constant: false
StateMutability: payable
Type: function

#### Parameters

• **params**: [`IncreaseLiquidityParamsRequest`](IncreaseLiquidityParamsRequest.md)

Type: tuple, Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

packages/types/src/abis/uniswap-router-v3.types.ts:273

***

### mint()

> **mint**(`params`, `overrides`?): `Promise`\<`ContractTransaction`\>

Payable: true
Constant: false
StateMutability: payable
Type: function

#### Parameters

• **params**: [`MintParamsRequest`](MintParamsRequest.md)

Type: tuple, Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

packages/types/src/abis/uniswap-router-v3.types.ts:284

***

### multicall()

#### multicall(previousBlockhash, data, overrides)

> **multicall**(`previousBlockhash`, `data`, `overrides`?): `Promise`\<`ContractTransaction`\>

Payable: true
Constant: false
StateMutability: payable
Type: function

##### Parameters

• **previousBlockhash**: `BytesLike`

Type: bytes32, Indexed: false

• **data**: `BytesLike`[]

Type: bytes[], Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

##### Returns

`Promise`\<`ContractTransaction`\>

##### Defined in

packages/types/src/abis/uniswap-router-v3.types.ts:296

#### multicall(deadline, data, overrides)

> **multicall**(`deadline`, `data`, `overrides`?): `Promise`\<`ContractTransaction`\>

Payable: true
Constant: false
StateMutability: payable
Type: function

##### Parameters

• **deadline**: `BigNumberish`

Type: uint256, Indexed: false

• **data**: `BytesLike`[]

Type: bytes[], Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

##### Returns

`Promise`\<`ContractTransaction`\>

##### Defined in

packages/types/src/abis/uniswap-router-v3.types.ts:309

#### multicall(data, overrides)

> **multicall**(`data`, `overrides`?): `Promise`\<`ContractTransaction`\>

Payable: true
Constant: false
StateMutability: payable
Type: function

##### Parameters

• **data**: `BytesLike`[]

Type: bytes[], Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

##### Returns

`Promise`\<`ContractTransaction`\>

##### Defined in

packages/types/src/abis/uniswap-router-v3.types.ts:321

***

### positionManager()

> **positionManager**(`overrides`?): `Promise`\<`string`\>

Payable: false
Constant: true
StateMutability: view
Type: function

#### Parameters

• **overrides?**: [`ContractCallOverrides`](../../../type-aliases/ContractCallOverrides.md)

#### Returns

`Promise`\<`string`\>

#### Defined in

packages/types/src/abis/uniswap-router-v3.types.ts:331

***

### pull()

> **pull**(`token`, `value`, `overrides`?): `Promise`\<`ContractTransaction`\>

Payable: true
Constant: false
StateMutability: payable
Type: function

#### Parameters

• **token**: `string`

Type: address, Indexed: false

• **value**: `BigNumberish`

Type: uint256, Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

packages/types/src/abis/uniswap-router-v3.types.ts:340

***

### refundETH()

> **refundETH**(`overrides`?): `Promise`\<`ContractTransaction`\>

Payable: true
Constant: false
StateMutability: payable
Type: function

#### Parameters

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

packages/types/src/abis/uniswap-router-v3.types.ts:351

***

### selfPermit()

> **selfPermit**(`token`, `value`, `deadline`, `v`, `r`, `s`, `overrides`?): `Promise`\<`ContractTransaction`\>

Payable: true
Constant: false
StateMutability: payable
Type: function

#### Parameters

• **token**: `string`

Type: address, Indexed: false

• **value**: `BigNumberish`

Type: uint256, Indexed: false

• **deadline**: `BigNumberish`

Type: uint256, Indexed: false

• **v**: `BigNumberish`

Type: uint8, Indexed: false

• **r**: `BytesLike`

Type: bytes32, Indexed: false

• **s**: `BytesLike`

Type: bytes32, Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

packages/types/src/abis/uniswap-router-v3.types.ts:366

***

### selfPermitAllowed()

> **selfPermitAllowed**(`token`, `nonce`, `expiry`, `v`, `r`, `s`, `overrides`?): `Promise`\<`ContractTransaction`\>

Payable: true
Constant: false
StateMutability: payable
Type: function

#### Parameters

• **token**: `string`

Type: address, Indexed: false

• **nonce**: `BigNumberish`

Type: uint256, Indexed: false

• **expiry**: `BigNumberish`

Type: uint256, Indexed: false

• **v**: `BigNumberish`

Type: uint8, Indexed: false

• **r**: `BytesLike`

Type: bytes32, Indexed: false

• **s**: `BytesLike`

Type: bytes32, Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

packages/types/src/abis/uniswap-router-v3.types.ts:387

***

### selfPermitAllowedIfNecessary()

> **selfPermitAllowedIfNecessary**(`token`, `nonce`, `expiry`, `v`, `r`, `s`, `overrides`?): `Promise`\<`ContractTransaction`\>

Payable: true
Constant: false
StateMutability: payable
Type: function

#### Parameters

• **token**: `string`

Type: address, Indexed: false

• **nonce**: `BigNumberish`

Type: uint256, Indexed: false

• **expiry**: `BigNumberish`

Type: uint256, Indexed: false

• **v**: `BigNumberish`

Type: uint8, Indexed: false

• **r**: `BytesLike`

Type: bytes32, Indexed: false

• **s**: `BytesLike`

Type: bytes32, Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

packages/types/src/abis/uniswap-router-v3.types.ts:408

***

### selfPermitIfNecessary()

> **selfPermitIfNecessary**(`token`, `value`, `deadline`, `v`, `r`, `s`, `overrides`?): `Promise`\<`ContractTransaction`\>

Payable: true
Constant: false
StateMutability: payable
Type: function

#### Parameters

• **token**: `string`

Type: address, Indexed: false

• **value**: `BigNumberish`

Type: uint256, Indexed: false

• **deadline**: `BigNumberish`

Type: uint256, Indexed: false

• **v**: `BigNumberish`

Type: uint8, Indexed: false

• **r**: `BytesLike`

Type: bytes32, Indexed: false

• **s**: `BytesLike`

Type: bytes32, Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

packages/types/src/abis/uniswap-router-v3.types.ts:429

***

### swapExactTokensForTokens()

> **swapExactTokensForTokens**(`amountIn`, `amountOutMin`, `path`, `to`, `overrides`?): `Promise`\<`ContractTransaction`\>

Payable: true
Constant: false
StateMutability: payable
Type: function

#### Parameters

• **amountIn**: `BigNumberish`

Type: uint256, Indexed: false

• **amountOutMin**: `BigNumberish`

Type: uint256, Indexed: false

• **path**: `string`[]

Type: address[], Indexed: false

• **to**: `string`

Type: address, Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

packages/types/src/abis/uniswap-router-v3.types.ts:448

***

### swapTokensForExactTokens()

> **swapTokensForExactTokens**(`amountOut`, `amountInMax`, `path`, `to`, `overrides`?): `Promise`\<`ContractTransaction`\>

Payable: true
Constant: false
StateMutability: payable
Type: function

#### Parameters

• **amountOut**: `BigNumberish`

Type: uint256, Indexed: false

• **amountInMax**: `BigNumberish`

Type: uint256, Indexed: false

• **path**: `string`[]

Type: address[], Indexed: false

• **to**: `string`

Type: address, Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

packages/types/src/abis/uniswap-router-v3.types.ts:465

***

### sweepToken()

#### sweepToken(token, amountMinimum, recipient, overrides)

> **sweepToken**(`token`, `amountMinimum`, `recipient`, `overrides`?): `Promise`\<`ContractTransaction`\>

Payable: true
Constant: false
StateMutability: payable
Type: function

##### Parameters

• **token**: `string`

Type: address, Indexed: false

• **amountMinimum**: `BigNumberish`

Type: uint256, Indexed: false

• **recipient**: `string`

Type: address, Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

##### Returns

`Promise`\<`ContractTransaction`\>

##### Defined in

packages/types/src/abis/uniswap-router-v3.types.ts:481

#### sweepToken(token, amountMinimum, overrides)

> **sweepToken**(`token`, `amountMinimum`, `overrides`?): `Promise`\<`ContractTransaction`\>

Payable: true
Constant: false
StateMutability: payable
Type: function

##### Parameters

• **token**: `string`

Type: address, Indexed: false

• **amountMinimum**: `BigNumberish`

Type: uint256, Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

##### Returns

`Promise`\<`ContractTransaction`\>

##### Defined in

packages/types/src/abis/uniswap-router-v3.types.ts:495

***

### sweepTokenWithFee()

#### sweepTokenWithFee(token, amountMinimum, feeBips, feeRecipient, overrides)

> **sweepTokenWithFee**(`token`, `amountMinimum`, `feeBips`, `feeRecipient`, `overrides`?): `Promise`\<`ContractTransaction`\>

Payable: true
Constant: false
StateMutability: payable
Type: function

##### Parameters

• **token**: `string`

Type: address, Indexed: false

• **amountMinimum**: `BigNumberish`

Type: uint256, Indexed: false

• **feeBips**: `BigNumberish`

Type: uint256, Indexed: false

• **feeRecipient**: `string`

Type: address, Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

##### Returns

`Promise`\<`ContractTransaction`\>

##### Defined in

packages/types/src/abis/uniswap-router-v3.types.ts:510

#### sweepTokenWithFee(token, amountMinimum, recipient, feeBips, feeRecipient, overrides)

> **sweepTokenWithFee**(`token`, `amountMinimum`, `recipient`, `feeBips`, `feeRecipient`, `overrides`?): `Promise`\<`ContractTransaction`\>

Payable: true
Constant: false
StateMutability: payable
Type: function

##### Parameters

• **token**: `string`

Type: address, Indexed: false

• **amountMinimum**: `BigNumberish`

Type: uint256, Indexed: false

• **recipient**: `string`

Type: address, Indexed: false

• **feeBips**: `BigNumberish`

Type: uint256, Indexed: false

• **feeRecipient**: `string`

Type: address, Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

##### Returns

`Promise`\<`ContractTransaction`\>

##### Defined in

packages/types/src/abis/uniswap-router-v3.types.ts:528

***

### uniswapV3SwapCallback()

> **uniswapV3SwapCallback**(`amount0Delta`, `amount1Delta`, `_data`, `overrides`?): `Promise`\<`ContractTransaction`\>

Payable: false
Constant: false
StateMutability: nonpayable
Type: function

#### Parameters

• **amount0Delta**: `BigNumberish`

Type: int256, Indexed: false

• **amount1Delta**: `BigNumberish`

Type: int256, Indexed: false

• **\_data**: `BytesLike`

Type: bytes, Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

packages/types/src/abis/uniswap-router-v3.types.ts:545

***

### unwrapWETH9()

#### unwrapWETH9(amountMinimum, recipient, overrides)

> **unwrapWETH9**(`amountMinimum`, `recipient`, `overrides`?): `Promise`\<`ContractTransaction`\>

Payable: true
Constant: false
StateMutability: payable
Type: function

##### Parameters

• **amountMinimum**: `BigNumberish`

Type: uint256, Indexed: false

• **recipient**: `string`

Type: address, Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

##### Returns

`Promise`\<`ContractTransaction`\>

##### Defined in

packages/types/src/abis/uniswap-router-v3.types.ts:559

#### unwrapWETH9(amountMinimum, overrides)

> **unwrapWETH9**(`amountMinimum`, `overrides`?): `Promise`\<`ContractTransaction`\>

Payable: true
Constant: false
StateMutability: payable
Type: function

##### Parameters

• **amountMinimum**: `BigNumberish`

Type: uint256, Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

##### Returns

`Promise`\<`ContractTransaction`\>

##### Defined in

packages/types/src/abis/uniswap-router-v3.types.ts:571

***

### unwrapWETH9WithFee()

#### unwrapWETH9WithFee(amountMinimum, recipient, feeBips, feeRecipient, overrides)

> **unwrapWETH9WithFee**(`amountMinimum`, `recipient`, `feeBips`, `feeRecipient`, `overrides`?): `Promise`\<`ContractTransaction`\>

Payable: true
Constant: false
StateMutability: payable
Type: function

##### Parameters

• **amountMinimum**: `BigNumberish`

Type: uint256, Indexed: false

• **recipient**: `string`

Type: address, Indexed: false

• **feeBips**: `BigNumberish`

Type: uint256, Indexed: false

• **feeRecipient**: `string`

Type: address, Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

##### Returns

`Promise`\<`ContractTransaction`\>

##### Defined in

packages/types/src/abis/uniswap-router-v3.types.ts:585

#### unwrapWETH9WithFee(amountMinimum, feeBips, feeRecipient, overrides)

> **unwrapWETH9WithFee**(`amountMinimum`, `feeBips`, `feeRecipient`, `overrides`?): `Promise`\<`ContractTransaction`\>

Payable: true
Constant: false
StateMutability: payable
Type: function

##### Parameters

• **amountMinimum**: `BigNumberish`

Type: uint256, Indexed: false

• **feeBips**: `BigNumberish`

Type: uint256, Indexed: false

• **feeRecipient**: `string`

Type: address, Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

##### Returns

`Promise`\<`ContractTransaction`\>

##### Defined in

packages/types/src/abis/uniswap-router-v3.types.ts:601

***

### wrapETH()

> **wrapETH**(`value`, `overrides`?): `Promise`\<`ContractTransaction`\>

Payable: true
Constant: false
StateMutability: payable
Type: function

#### Parameters

• **value**: `BigNumberish`

Type: uint256, Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

packages/types/src/abis/uniswap-router-v3.types.ts:614
