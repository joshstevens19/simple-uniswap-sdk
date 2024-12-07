[**@dex-toolkit/types v1.0.0**](../../../README.md) • **Docs**

***

[Documentation v1.0.0](../../../../../packages.md) / [@dex-toolkit/types](../../../README.md) / [UniswapRouterV2Types](../README.md) / Contract

# Interface: Contract

## Methods

### WETH()

> **WETH**(`overrides`?): `Promise`\<`string`\>

Payable: false
Constant: true
StateMutability: pure
Type: function

#### Parameters

• **overrides?**: [`ContractCallOverrides`](../../../type-aliases/ContractCallOverrides.md)

#### Returns

`Promise`\<`string`\>

#### Defined in

packages/types/src/abis/uniswap-router-v2.types.ts:57

***

### addLiquidity()

> **addLiquidity**(`tokenA`, `tokenB`, `amountADesired`, `amountBDesired`, `amountAMin`, `amountBMin`, `to`, `deadline`, `overrides`?): `Promise`\<`ContractTransaction`\>

Payable: false
Constant: false
StateMutability: nonpayable
Type: function

#### Parameters

• **tokenA**: `string`

Type: address, Indexed: false

• **tokenB**: `string`

Type: address, Indexed: false

• **amountADesired**: `BigNumberish`

Type: uint256, Indexed: false

• **amountBDesired**: `BigNumberish`

Type: uint256, Indexed: false

• **amountAMin**: `BigNumberish`

Type: uint256, Indexed: false

• **amountBMin**: `BigNumberish`

Type: uint256, Indexed: false

• **to**: `string`

Type: address, Indexed: false

• **deadline**: `BigNumberish`

Type: uint256, Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

packages/types/src/abis/uniswap-router-v2.types.ts:72

***

### addLiquidityETH()

> **addLiquidityETH**(`token`, `amountTokenDesired`, `amountTokenMin`, `amountETHMin`, `to`, `deadline`, `overrides`?): `Promise`\<`ContractTransaction`\>

Payable: true
Constant: false
StateMutability: payable
Type: function

#### Parameters

• **token**: `string`

Type: address, Indexed: false

• **amountTokenDesired**: `BigNumberish`

Type: uint256, Indexed: false

• **amountTokenMin**: `BigNumberish`

Type: uint256, Indexed: false

• **amountETHMin**: `BigNumberish`

Type: uint256, Indexed: false

• **to**: `string`

Type: address, Indexed: false

• **deadline**: `BigNumberish`

Type: uint256, Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

packages/types/src/abis/uniswap-router-v2.types.ts:95

***

### factory()

> **factory**(`overrides`?): `Promise`\<`string`\>

Payable: false
Constant: true
StateMutability: pure
Type: function

#### Parameters

• **overrides?**: [`ContractCallOverrides`](../../../type-aliases/ContractCallOverrides.md)

#### Returns

`Promise`\<`string`\>

#### Defined in

packages/types/src/abis/uniswap-router-v2.types.ts:110

***

### getAmountIn()

> **getAmountIn**(`amountOut`, `reserveIn`, `reserveOut`, `overrides`?): `Promise`\<`BigNumber`\>

Payable: false
Constant: true
StateMutability: pure
Type: function

#### Parameters

• **amountOut**: `BigNumberish`

Type: uint256, Indexed: false

• **reserveIn**: `BigNumberish`

Type: uint256, Indexed: false

• **reserveOut**: `BigNumberish`

Type: uint256, Indexed: false

• **overrides?**: [`ContractCallOverrides`](../../../type-aliases/ContractCallOverrides.md)

#### Returns

`Promise`\<`BigNumber`\>

#### Defined in

packages/types/src/abis/uniswap-router-v2.types.ts:120

***

### getAmountOut()

> **getAmountOut**(`amountIn`, `reserveIn`, `reserveOut`, `overrides`?): `Promise`\<`BigNumber`\>

Payable: false
Constant: true
StateMutability: pure
Type: function

#### Parameters

• **amountIn**: `BigNumberish`

Type: uint256, Indexed: false

• **reserveIn**: `BigNumberish`

Type: uint256, Indexed: false

• **reserveOut**: `BigNumberish`

Type: uint256, Indexed: false

• **overrides?**: [`ContractCallOverrides`](../../../type-aliases/ContractCallOverrides.md)

#### Returns

`Promise`\<`BigNumber`\>

#### Defined in

packages/types/src/abis/uniswap-router-v2.types.ts:135

***

### getAmountsIn()

> **getAmountsIn**(`amountOut`, `path`, `overrides`?): `Promise`\<`BigNumber`[]\>

Payable: false
Constant: true
StateMutability: view
Type: function

#### Parameters

• **amountOut**: `BigNumberish`

Type: uint256, Indexed: false

• **path**: `string`[]

Type: address[], Indexed: false

• **overrides?**: [`ContractCallOverrides`](../../../type-aliases/ContractCallOverrides.md)

#### Returns

`Promise`\<`BigNumber`[]\>

#### Defined in

packages/types/src/abis/uniswap-router-v2.types.ts:149

***

### getAmountsOut()

> **getAmountsOut**(`amountIn`, `path`, `overrides`?): `Promise`\<`BigNumber`[]\>

Payable: false
Constant: true
StateMutability: view
Type: function

#### Parameters

• **amountIn**: `BigNumberish`

Type: uint256, Indexed: false

• **path**: `string`[]

Type: address[], Indexed: false

• **overrides?**: [`ContractCallOverrides`](../../../type-aliases/ContractCallOverrides.md)

#### Returns

`Promise`\<`BigNumber`[]\>

#### Defined in

packages/types/src/abis/uniswap-router-v2.types.ts:162

***

### quote()

> **quote**(`amountA`, `reserveA`, `reserveB`, `overrides`?): `Promise`\<`BigNumber`\>

Payable: false
Constant: true
StateMutability: pure
Type: function

#### Parameters

• **amountA**: `BigNumberish`

Type: uint256, Indexed: false

• **reserveA**: `BigNumberish`

Type: uint256, Indexed: false

• **reserveB**: `BigNumberish`

Type: uint256, Indexed: false

• **overrides?**: [`ContractCallOverrides`](../../../type-aliases/ContractCallOverrides.md)

#### Returns

`Promise`\<`BigNumber`\>

#### Defined in

packages/types/src/abis/uniswap-router-v2.types.ts:176

***

### removeLiquidity()

> **removeLiquidity**(`tokenA`, `tokenB`, `liquidity`, `amountAMin`, `amountBMin`, `to`, `deadline`, `overrides`?): `Promise`\<`ContractTransaction`\>

Payable: false
Constant: false
StateMutability: nonpayable
Type: function

#### Parameters

• **tokenA**: `string`

Type: address, Indexed: false

• **tokenB**: `string`

Type: address, Indexed: false

• **liquidity**: `BigNumberish`

Type: uint256, Indexed: false

• **amountAMin**: `BigNumberish`

Type: uint256, Indexed: false

• **amountBMin**: `BigNumberish`

Type: uint256, Indexed: false

• **to**: `string`

Type: address, Indexed: false

• **deadline**: `BigNumberish`

Type: uint256, Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

packages/types/src/abis/uniswap-router-v2.types.ts:195

***

### removeLiquidityETH()

> **removeLiquidityETH**(`token`, `liquidity`, `amountTokenMin`, `amountETHMin`, `to`, `deadline`, `overrides`?): `Promise`\<`ContractTransaction`\>

Payable: false
Constant: false
StateMutability: nonpayable
Type: function

#### Parameters

• **token**: `string`

Type: address, Indexed: false

• **liquidity**: `BigNumberish`

Type: uint256, Indexed: false

• **amountTokenMin**: `BigNumberish`

Type: uint256, Indexed: false

• **amountETHMin**: `BigNumberish`

Type: uint256, Indexed: false

• **to**: `string`

Type: address, Indexed: false

• **deadline**: `BigNumberish`

Type: uint256, Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

packages/types/src/abis/uniswap-router-v2.types.ts:217

***

### removeLiquidityETHSupportingFeeOnTransferTokens()

> **removeLiquidityETHSupportingFeeOnTransferTokens**(`token`, `liquidity`, `amountTokenMin`, `amountETHMin`, `to`, `deadline`, `overrides`?): `Promise`\<`ContractTransaction`\>

Payable: false
Constant: false
StateMutability: nonpayable
Type: function

#### Parameters

• **token**: `string`

Type: address, Indexed: false

• **liquidity**: `BigNumberish`

Type: uint256, Indexed: false

• **amountTokenMin**: `BigNumberish`

Type: uint256, Indexed: false

• **amountETHMin**: `BigNumberish`

Type: uint256, Indexed: false

• **to**: `string`

Type: address, Indexed: false

• **deadline**: `BigNumberish`

Type: uint256, Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

packages/types/src/abis/uniswap-router-v2.types.ts:238

***

### removeLiquidityETHWithPermit()

> **removeLiquidityETHWithPermit**(`token`, `liquidity`, `amountTokenMin`, `amountETHMin`, `to`, `deadline`, `approveMax`, `v`, `r`, `s`, `overrides`?): `Promise`\<`ContractTransaction`\>

Payable: false
Constant: false
StateMutability: nonpayable
Type: function

#### Parameters

• **token**: `string`

Type: address, Indexed: false

• **liquidity**: `BigNumberish`

Type: uint256, Indexed: false

• **amountTokenMin**: `BigNumberish`

Type: uint256, Indexed: false

• **amountETHMin**: `BigNumberish`

Type: uint256, Indexed: false

• **to**: `string`

Type: address, Indexed: false

• **deadline**: `BigNumberish`

Type: uint256, Indexed: false

• **approveMax**: `boolean`

Type: bool, Indexed: false

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

packages/types/src/abis/uniswap-router-v2.types.ts:263

***

### removeLiquidityETHWithPermitSupportingFeeOnTransferTokens()

> **removeLiquidityETHWithPermitSupportingFeeOnTransferTokens**(`token`, `liquidity`, `amountTokenMin`, `amountETHMin`, `to`, `deadline`, `approveMax`, `v`, `r`, `s`, `overrides`?): `Promise`\<`ContractTransaction`\>

Payable: false
Constant: false
StateMutability: nonpayable
Type: function

#### Parameters

• **token**: `string`

Type: address, Indexed: false

• **liquidity**: `BigNumberish`

Type: uint256, Indexed: false

• **amountTokenMin**: `BigNumberish`

Type: uint256, Indexed: false

• **amountETHMin**: `BigNumberish`

Type: uint256, Indexed: false

• **to**: `string`

Type: address, Indexed: false

• **deadline**: `BigNumberish`

Type: uint256, Indexed: false

• **approveMax**: `boolean`

Type: bool, Indexed: false

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

packages/types/src/abis/uniswap-router-v2.types.ts:292

***

### removeLiquidityWithPermit()

> **removeLiquidityWithPermit**(`tokenA`, `tokenB`, `liquidity`, `amountAMin`, `amountBMin`, `to`, `deadline`, `approveMax`, `v`, `r`, `s`, `overrides`?): `Promise`\<`ContractTransaction`\>

Payable: false
Constant: false
StateMutability: nonpayable
Type: function

#### Parameters

• **tokenA**: `string`

Type: address, Indexed: false

• **tokenB**: `string`

Type: address, Indexed: false

• **liquidity**: `BigNumberish`

Type: uint256, Indexed: false

• **amountAMin**: `BigNumberish`

Type: uint256, Indexed: false

• **amountBMin**: `BigNumberish`

Type: uint256, Indexed: false

• **to**: `string`

Type: address, Indexed: false

• **deadline**: `BigNumberish`

Type: uint256, Indexed: false

• **approveMax**: `boolean`

Type: bool, Indexed: false

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

packages/types/src/abis/uniswap-router-v2.types.ts:322

***

### swapETHForExactTokens()

> **swapETHForExactTokens**(`amountOut`, `path`, `to`, `deadline`, `overrides`?): `Promise`\<`ContractTransaction`\>

Payable: true
Constant: false
StateMutability: payable
Type: function

#### Parameters

• **amountOut**: `BigNumberish`

Type: uint256, Indexed: false

• **path**: `string`[]

Type: address[], Indexed: false

• **to**: `string`

Type: address, Indexed: false

• **deadline**: `BigNumberish`

Type: uint256, Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

packages/types/src/abis/uniswap-router-v2.types.ts:346

***

### swapExactETHForTokens()

> **swapExactETHForTokens**(`amountOutMin`, `path`, `to`, `deadline`, `overrides`?): `Promise`\<`ContractTransaction`\>

Payable: true
Constant: false
StateMutability: payable
Type: function

#### Parameters

• **amountOutMin**: `BigNumberish`

Type: uint256, Indexed: false

• **path**: `string`[]

Type: address[], Indexed: false

• **to**: `string`

Type: address, Indexed: false

• **deadline**: `BigNumberish`

Type: uint256, Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

packages/types/src/abis/uniswap-router-v2.types.ts:363

***

### swapExactETHForTokensSupportingFeeOnTransferTokens()

> **swapExactETHForTokensSupportingFeeOnTransferTokens**(`amountOutMin`, `path`, `to`, `deadline`, `overrides`?): `Promise`\<`ContractTransaction`\>

Payable: true
Constant: false
StateMutability: payable
Type: function

#### Parameters

• **amountOutMin**: `BigNumberish`

Type: uint256, Indexed: false

• **path**: `string`[]

Type: address[], Indexed: false

• **to**: `string`

Type: address, Indexed: false

• **deadline**: `BigNumberish`

Type: uint256, Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

packages/types/src/abis/uniswap-router-v2.types.ts:380

***

### swapExactTokensForETH()

> **swapExactTokensForETH**(`amountIn`, `amountOutMin`, `path`, `to`, `deadline`, `overrides`?): `Promise`\<`ContractTransaction`\>

Payable: false
Constant: false
StateMutability: nonpayable
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

• **deadline**: `BigNumberish`

Type: uint256, Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

packages/types/src/abis/uniswap-router-v2.types.ts:398

***

### swapExactTokensForETHSupportingFeeOnTransferTokens()

> **swapExactTokensForETHSupportingFeeOnTransferTokens**(`amountIn`, `amountOutMin`, `path`, `to`, `deadline`, `overrides`?): `Promise`\<`ContractTransaction`\>

Payable: false
Constant: false
StateMutability: nonpayable
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

• **deadline**: `BigNumberish`

Type: uint256, Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

packages/types/src/abis/uniswap-router-v2.types.ts:417

***

### swapExactTokensForTokens()

> **swapExactTokensForTokens**(`amountIn`, `amountOutMin`, `path`, `to`, `deadline`, `overrides`?): `Promise`\<`ContractTransaction`\>

Payable: false
Constant: false
StateMutability: nonpayable
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

• **deadline**: `BigNumberish`

Type: uint256, Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

packages/types/src/abis/uniswap-router-v2.types.ts:436

***

### swapExactTokensForTokensSupportingFeeOnTransferTokens()

> **swapExactTokensForTokensSupportingFeeOnTransferTokens**(`amountIn`, `amountOutMin`, `path`, `to`, `deadline`, `overrides`?): `Promise`\<`ContractTransaction`\>

Payable: false
Constant: false
StateMutability: nonpayable
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

• **deadline**: `BigNumberish`

Type: uint256, Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

packages/types/src/abis/uniswap-router-v2.types.ts:455

***

### swapTokensForExactETH()

> **swapTokensForExactETH**(`amountOut`, `amountInMax`, `path`, `to`, `deadline`, `overrides`?): `Promise`\<`ContractTransaction`\>

Payable: false
Constant: false
StateMutability: nonpayable
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

• **deadline**: `BigNumberish`

Type: uint256, Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

packages/types/src/abis/uniswap-router-v2.types.ts:474

***

### swapTokensForExactTokens()

> **swapTokensForExactTokens**(`amountOut`, `amountInMax`, `path`, `to`, `deadline`, `overrides`?): `Promise`\<`ContractTransaction`\>

Payable: false
Constant: false
StateMutability: nonpayable
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

• **deadline**: `BigNumberish`

Type: uint256, Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

packages/types/src/abis/uniswap-router-v2.types.ts:493
