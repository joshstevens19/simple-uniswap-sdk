[**@dex-toolkit/types v1.0.0**](../../../README.md) • **Docs**

***

[Documentation v1.0.0](../../../../../packages.md) / [@dex-toolkit/types](../../../README.md) / [EnergiswapRouterV2Types](../README.md) / Contract

# Interface: Contract

## Methods

### \_storage()

> **\_storage**(`overrides`?): `Promise`\<`string`\>

Payable: false
Constant: true
StateMutability: view
Type: function

#### Parameters

• **overrides?**: [`ContractCallOverrides`](../../../type-aliases/ContractCallOverrides.md)

#### Returns

`Promise`\<`string`\>

#### Defined in

[packages/types/src/abis/energiswap-router-v2.types.ts:59](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/energiswap-router-v2.types.ts#L59)

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

[packages/types/src/abis/energiswap-router-v2.types.ts:74](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/energiswap-router-v2.types.ts#L74)

***

### addLiquidityNRG()

> **addLiquidityNRG**(`token`, `amountTokenDesired`, `amountTokenMin`, `amountNRGMin`, `to`, `deadline`, `overrides`?): `Promise`\<`ContractTransaction`\>

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

• **amountNRGMin**: `BigNumberish`

Type: uint256, Indexed: false

• **to**: `string`

Type: address, Indexed: false

• **deadline**: `BigNumberish`

Type: uint256, Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

[packages/types/src/abis/energiswap-router-v2.types.ts:97](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/energiswap-router-v2.types.ts#L97)

***

### destroy()

> **destroy**(`_newImpl`, `overrides`?): `Promise`\<`ContractTransaction`\>

Payable: false
Constant: false
StateMutability: nonpayable
Type: function

#### Parameters

• **\_newImpl**: `string`

Type: address, Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

[packages/types/src/abis/energiswap-router-v2.types.ts:113](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/energiswap-router-v2.types.ts#L113)

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

[packages/types/src/abis/energiswap-router-v2.types.ts:126](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/energiswap-router-v2.types.ts#L126)

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

[packages/types/src/abis/energiswap-router-v2.types.ts:141](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/energiswap-router-v2.types.ts#L141)

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

[packages/types/src/abis/energiswap-router-v2.types.ts:155](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/energiswap-router-v2.types.ts#L155)

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

[packages/types/src/abis/energiswap-router-v2.types.ts:168](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/energiswap-router-v2.types.ts#L168)

***

### migrate()

> **migrate**(`_oldImpl`, `overrides`?): `Promise`\<`ContractTransaction`\>

Payable: false
Constant: false
StateMutability: nonpayable
Type: function

#### Parameters

• **\_oldImpl**: `string`

Type: address, Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

[packages/types/src/abis/energiswap-router-v2.types.ts:180](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/energiswap-router-v2.types.ts#L180)

***

### proxy()

> **proxy**(`overrides`?): `Promise`\<`string`\>

Payable: false
Constant: true
StateMutability: view
Type: function

#### Parameters

• **overrides?**: [`ContractCallOverrides`](../../../type-aliases/ContractCallOverrides.md)

#### Returns

`Promise`\<`string`\>

#### Defined in

[packages/types/src/abis/energiswap-router-v2.types.ts:190](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/energiswap-router-v2.types.ts#L190)

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

[packages/types/src/abis/energiswap-router-v2.types.ts:200](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/energiswap-router-v2.types.ts#L200)

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

[packages/types/src/abis/energiswap-router-v2.types.ts:219](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/energiswap-router-v2.types.ts#L219)

***

### removeLiquidityNRG()

> **removeLiquidityNRG**(`token`, `liquidity`, `amountTokenMin`, `amountNRGMin`, `to`, `deadline`, `overrides`?): `Promise`\<`ContractTransaction`\>

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

• **amountNRGMin**: `BigNumberish`

Type: uint256, Indexed: false

• **to**: `string`

Type: address, Indexed: false

• **deadline**: `BigNumberish`

Type: uint256, Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

[packages/types/src/abis/energiswap-router-v2.types.ts:241](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/energiswap-router-v2.types.ts#L241)

***

### removeLiquidityNRGSupportingFeeOnTransferTokens()

> **removeLiquidityNRGSupportingFeeOnTransferTokens**(`token`, `liquidity`, `amountTokenMin`, `amountNRGMin`, `to`, `deadline`, `overrides`?): `Promise`\<`ContractTransaction`\>

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

• **amountNRGMin**: `BigNumberish`

Type: uint256, Indexed: false

• **to**: `string`

Type: address, Indexed: false

• **deadline**: `BigNumberish`

Type: uint256, Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

[packages/types/src/abis/energiswap-router-v2.types.ts:262](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/energiswap-router-v2.types.ts#L262)

***

### removeLiquidityNRGWithPermit()

> **removeLiquidityNRGWithPermit**(`token`, `liquidity`, `amountTokenMin`, `amountNRGMin`, `to`, `deadline`, `approveMax`, `v`, `r`, `s`, `overrides`?): `Promise`\<`ContractTransaction`\>

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

• **amountNRGMin**: `BigNumberish`

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

[packages/types/src/abis/energiswap-router-v2.types.ts:287](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/energiswap-router-v2.types.ts#L287)

***

### removeLiquidityNRGWithPermitSupportingFeeOnTransferTokens()

> **removeLiquidityNRGWithPermitSupportingFeeOnTransferTokens**(`token`, `liquidity`, `amountTokenMin`, `amountNRGMin`, `to`, `deadline`, `approveMax`, `v`, `r`, `s`, `overrides`?): `Promise`\<`ContractTransaction`\>

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

• **amountNRGMin**: `BigNumberish`

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

[packages/types/src/abis/energiswap-router-v2.types.ts:316](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/energiswap-router-v2.types.ts#L316)

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

[packages/types/src/abis/energiswap-router-v2.types.ts:346](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/energiswap-router-v2.types.ts#L346)

***

### swapExactNRGForTokens()

> **swapExactNRGForTokens**(`amountOutMin`, `path`, `to`, `deadline`, `overrides`?): `Promise`\<`ContractTransaction`\>

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

[packages/types/src/abis/energiswap-router-v2.types.ts:370](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/energiswap-router-v2.types.ts#L370)

***

### swapExactNRGForTokensSupportingFeeOnTransferTokens()

> **swapExactNRGForTokensSupportingFeeOnTransferTokens**(`amountOutMin`, `path`, `to`, `deadline`, `overrides`?): `Promise`\<`ContractTransaction`\>

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

[packages/types/src/abis/energiswap-router-v2.types.ts:387](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/energiswap-router-v2.types.ts#L387)

***

### swapExactTokensForNRG()

> **swapExactTokensForNRG**(`amountIn`, `amountOutMin`, `path`, `to`, `deadline`, `overrides`?): `Promise`\<`ContractTransaction`\>

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

[packages/types/src/abis/energiswap-router-v2.types.ts:405](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/energiswap-router-v2.types.ts#L405)

***

### swapExactTokensForNRGSupportingFeeOnTransferTokens()

> **swapExactTokensForNRGSupportingFeeOnTransferTokens**(`amountIn`, `amountOutMin`, `path`, `to`, `deadline`, `overrides`?): `Promise`\<`ContractTransaction`\>

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

[packages/types/src/abis/energiswap-router-v2.types.ts:424](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/energiswap-router-v2.types.ts#L424)

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

[packages/types/src/abis/energiswap-router-v2.types.ts:443](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/energiswap-router-v2.types.ts#L443)

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

[packages/types/src/abis/energiswap-router-v2.types.ts:462](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/energiswap-router-v2.types.ts#L462)

***

### swapNRGForExactTokens()

> **swapNRGForExactTokens**(`amountOut`, `path`, `to`, `deadline`, `overrides`?): `Promise`\<`ContractTransaction`\>

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

[packages/types/src/abis/energiswap-router-v2.types.ts:480](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/energiswap-router-v2.types.ts#L480)

***

### swapTokensForExactNRG()

> **swapTokensForExactNRG**(`amountOut`, `amountInMax`, `path`, `to`, `deadline`, `overrides`?): `Promise`\<`ContractTransaction`\>

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

[packages/types/src/abis/energiswap-router-v2.types.ts:498](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/energiswap-router-v2.types.ts#L498)

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

[packages/types/src/abis/energiswap-router-v2.types.ts:517](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/energiswap-router-v2.types.ts#L517)
