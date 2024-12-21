[**@dex-toolkit/types v1.0.0**](../../../README.md) • **Docs**

***

[Documentation v1.0.0](../../../../../packages.md) / [@dex-toolkit/types](../../../README.md) / [TraderJoeRouterV2210Types](../README.md) / Contract

# Interface: Contract

## Methods

### addLiquidity()

> **addLiquidity**(`liquidityParameters`, `overrides`?): `Promise`\<`ContractTransaction`\>

Payable: false
Constant: false
StateMutability: nonpayable
Type: function

#### Parameters

• **liquidityParameters**: [`AddLiquidityLiquidityParametersRequest`](AddLiquidityLiquidityParametersRequest.md)

Type: tuple, Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

[packages/types/src/abis/traderJoe-router-v2-2-1-0.types.ts:151](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-router-v2-2-1-0.types.ts#L151)

***

### addLiquidityNATIVE()

> **addLiquidityNATIVE**(`liquidityParameters`, `overrides`?): `Promise`\<`ContractTransaction`\>

Payable: true
Constant: false
StateMutability: payable
Type: function

#### Parameters

• **liquidityParameters**: [`AddLiquidityNATIVELiquidityParametersRequest`](AddLiquidityNATIVELiquidityParametersRequest.md)

Type: tuple, Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

[packages/types/src/abis/traderJoe-router-v2-2-1-0.types.ts:162](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-router-v2-2-1-0.types.ts#L162)

***

### createLBPair()

> **createLBPair**(`tokenX`, `tokenY`, `activeId`, `binStep`, `overrides`?): `Promise`\<`ContractTransaction`\>

Payable: false
Constant: false
StateMutability: nonpayable
Type: function

#### Parameters

• **tokenX**: `string`

Type: address, Indexed: false

• **tokenY**: `string`

Type: address, Indexed: false

• **activeId**: `BigNumberish`

Type: uint24, Indexed: false

• **binStep**: `BigNumberish`

Type: uint16, Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

[packages/types/src/abis/traderJoe-router-v2-2-1-0.types.ts:176](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-router-v2-2-1-0.types.ts#L176)

***

### getFactory()

> **getFactory**(`overrides`?): `Promise`\<`string`\>

Payable: false
Constant: true
StateMutability: view
Type: function

#### Parameters

• **overrides?**: [`ContractCallOverrides`](../../../type-aliases/ContractCallOverrides.md)

#### Returns

`Promise`\<`string`\>

#### Defined in

[packages/types/src/abis/traderJoe-router-v2-2-1-0.types.ts:189](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-router-v2-2-1-0.types.ts#L189)

***

### getIdFromPrice()

> **getIdFromPrice**(`pair`, `price`, `overrides`?): `Promise`\<`number`\>

Payable: false
Constant: true
StateMutability: view
Type: function

#### Parameters

• **pair**: `string`

Type: address, Indexed: false

• **price**: `BigNumberish`

Type: uint256, Indexed: false

• **overrides?**: [`ContractCallOverrides`](../../../type-aliases/ContractCallOverrides.md)

#### Returns

`Promise`\<`number`\>

#### Defined in

[packages/types/src/abis/traderJoe-router-v2-2-1-0.types.ts:198](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-router-v2-2-1-0.types.ts#L198)

***

### getLegacyFactory()

> **getLegacyFactory**(`overrides`?): `Promise`\<`string`\>

Payable: false
Constant: true
StateMutability: view
Type: function

#### Parameters

• **overrides?**: [`ContractCallOverrides`](../../../type-aliases/ContractCallOverrides.md)

#### Returns

`Promise`\<`string`\>

#### Defined in

[packages/types/src/abis/traderJoe-router-v2-2-1-0.types.ts:209](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-router-v2-2-1-0.types.ts#L209)

***

### getLegacyRouter()

> **getLegacyRouter**(`overrides`?): `Promise`\<`string`\>

Payable: false
Constant: true
StateMutability: view
Type: function

#### Parameters

• **overrides?**: [`ContractCallOverrides`](../../../type-aliases/ContractCallOverrides.md)

#### Returns

`Promise`\<`string`\>

#### Defined in

[packages/types/src/abis/traderJoe-router-v2-2-1-0.types.ts:216](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-router-v2-2-1-0.types.ts#L216)

***

### getPriceFromId()

> **getPriceFromId**(`pair`, `id`, `overrides`?): `Promise`\<`BigNumber`\>

Payable: false
Constant: true
StateMutability: view
Type: function

#### Parameters

• **pair**: `string`

Type: address, Indexed: false

• **id**: `BigNumberish`

Type: uint24, Indexed: false

• **overrides?**: [`ContractCallOverrides`](../../../type-aliases/ContractCallOverrides.md)

#### Returns

`Promise`\<`BigNumber`\>

#### Defined in

[packages/types/src/abis/traderJoe-router-v2-2-1-0.types.ts:225](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-router-v2-2-1-0.types.ts#L225)

***

### getSwapIn()

> **getSwapIn**(`pair`, `amountOut`, `swapForY`, `overrides`?): `Promise`\<[`GetSwapInResponse`](GetSwapInResponse.md)\>

Payable: false
Constant: true
StateMutability: view
Type: function

#### Parameters

• **pair**: `string`

Type: address, Indexed: false

• **amountOut**: `BigNumberish`

Type: uint128, Indexed: false

• **swapForY**: `boolean`

Type: bool, Indexed: false

• **overrides?**: [`ContractCallOverrides`](../../../type-aliases/ContractCallOverrides.md)

#### Returns

`Promise`\<[`GetSwapInResponse`](GetSwapInResponse.md)\>

#### Defined in

[packages/types/src/abis/traderJoe-router-v2-2-1-0.types.ts:239](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-router-v2-2-1-0.types.ts#L239)

***

### getSwapOut()

> **getSwapOut**(`pair`, `amountIn`, `swapForY`, `overrides`?): `Promise`\<[`GetSwapOutResponse`](GetSwapOutResponse.md)\>

Payable: false
Constant: true
StateMutability: view
Type: function

#### Parameters

• **pair**: `string`

Type: address, Indexed: false

• **amountIn**: `BigNumberish`

Type: uint128, Indexed: false

• **swapForY**: `boolean`

Type: bool, Indexed: false

• **overrides?**: [`ContractCallOverrides`](../../../type-aliases/ContractCallOverrides.md)

#### Returns

`Promise`\<[`GetSwapOutResponse`](GetSwapOutResponse.md)\>

#### Defined in

[packages/types/src/abis/traderJoe-router-v2-2-1-0.types.ts:254](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-router-v2-2-1-0.types.ts#L254)

***

### getV1Factory()

> **getV1Factory**(`overrides`?): `Promise`\<`string`\>

Payable: false
Constant: true
StateMutability: view
Type: function

#### Parameters

• **overrides?**: [`ContractCallOverrides`](../../../type-aliases/ContractCallOverrides.md)

#### Returns

`Promise`\<`string`\>

#### Defined in

[packages/types/src/abis/traderJoe-router-v2-2-1-0.types.ts:266](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-router-v2-2-1-0.types.ts#L266)

***

### getWNATIVE()

> **getWNATIVE**(`overrides`?): `Promise`\<`string`\>

Payable: false
Constant: true
StateMutability: view
Type: function

#### Parameters

• **overrides?**: [`ContractCallOverrides`](../../../type-aliases/ContractCallOverrides.md)

#### Returns

`Promise`\<`string`\>

#### Defined in

[packages/types/src/abis/traderJoe-router-v2-2-1-0.types.ts:273](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-router-v2-2-1-0.types.ts#L273)

***

### removeLiquidity()

> **removeLiquidity**(`tokenX`, `tokenY`, `binStep`, `amountXMin`, `amountYMin`, `ids`, `amounts`, `to`, `deadline`, `overrides`?): `Promise`\<`ContractTransaction`\>

Payable: false
Constant: false
StateMutability: nonpayable
Type: function

#### Parameters

• **tokenX**: `string`

Type: address, Indexed: false

• **tokenY**: `string`

Type: address, Indexed: false

• **binStep**: `BigNumberish`

Type: uint16, Indexed: false

• **amountXMin**: `BigNumberish`

Type: uint256, Indexed: false

• **amountYMin**: `BigNumberish`

Type: uint256, Indexed: false

• **ids**: `BigNumberish`[]

Type: uint256[], Indexed: false

• **amounts**: `BigNumberish`[]

Type: uint256[], Indexed: false

• **to**: `string`

Type: address, Indexed: false

• **deadline**: `BigNumberish`

Type: uint256, Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

[packages/types/src/abis/traderJoe-router-v2-2-1-0.types.ts:289](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-router-v2-2-1-0.types.ts#L289)

***

### removeLiquidityNATIVE()

> **removeLiquidityNATIVE**(`token`, `binStep`, `amountTokenMin`, `amountNATIVEMin`, `ids`, `amounts`, `to`, `deadline`, `overrides`?): `Promise`\<`ContractTransaction`\>

Payable: false
Constant: false
StateMutability: nonpayable
Type: function

#### Parameters

• **token**: `string`

Type: address, Indexed: false

• **binStep**: `BigNumberish`

Type: uint16, Indexed: false

• **amountTokenMin**: `BigNumberish`

Type: uint256, Indexed: false

• **amountNATIVEMin**: `BigNumberish`

Type: uint256, Indexed: false

• **ids**: `BigNumberish`[]

Type: uint256[], Indexed: false

• **amounts**: `BigNumberish`[]

Type: uint256[], Indexed: false

• **to**: `string`

Type: address, Indexed: false

• **deadline**: `BigNumberish`

Type: uint256, Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

[packages/types/src/abis/traderJoe-router-v2-2-1-0.types.ts:315](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-router-v2-2-1-0.types.ts#L315)

***

### swapExactNATIVEForTokens()

> **swapExactNATIVEForTokens**(`amountOutMin`, `path`, `to`, `deadline`, `overrides`?): `Promise`\<`ContractTransaction`\>

Payable: true
Constant: false
StateMutability: payable
Type: function

#### Parameters

• **amountOutMin**: `BigNumberish`

Type: uint256, Indexed: false

• **path**: [`SwapExactNATIVEForTokensPathRequest`](SwapExactNATIVEForTokensPathRequest.md)

Type: tuple, Indexed: false

• **to**: `string`

Type: address, Indexed: false

• **deadline**: `BigNumberish`

Type: uint256, Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

[packages/types/src/abis/traderJoe-router-v2-2-1-0.types.ts:336](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-router-v2-2-1-0.types.ts#L336)

***

### swapExactNATIVEForTokensSupportingFeeOnTransferTokens()

> **swapExactNATIVEForTokensSupportingFeeOnTransferTokens**(`amountOutMin`, `path`, `to`, `deadline`, `overrides`?): `Promise`\<`ContractTransaction`\>

Payable: true
Constant: false
StateMutability: payable
Type: function

#### Parameters

• **amountOutMin**: `BigNumberish`

Type: uint256, Indexed: false

• **path**: [`SwapExactNATIVEForTokensSupportingFeeOnTransferTokensPathRequest`](SwapExactNATIVEForTokensSupportingFeeOnTransferTokensPathRequest.md)

Type: tuple, Indexed: false

• **to**: `string`

Type: address, Indexed: false

• **deadline**: `BigNumberish`

Type: uint256, Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

[packages/types/src/abis/traderJoe-router-v2-2-1-0.types.ts:353](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-router-v2-2-1-0.types.ts#L353)

***

### swapExactTokensForNATIVE()

> **swapExactTokensForNATIVE**(`amountIn`, `amountOutMinNATIVE`, `path`, `to`, `deadline`, `overrides`?): `Promise`\<`ContractTransaction`\>

Payable: false
Constant: false
StateMutability: nonpayable
Type: function

#### Parameters

• **amountIn**: `BigNumberish`

Type: uint256, Indexed: false

• **amountOutMinNATIVE**: `BigNumberish`

Type: uint256, Indexed: false

• **path**: [`SwapExactTokensForNATIVEPathRequest`](SwapExactTokensForNATIVEPathRequest.md)

Type: tuple, Indexed: false

• **to**: `string`

Type: address, Indexed: false

• **deadline**: `BigNumberish`

Type: uint256, Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

[packages/types/src/abis/traderJoe-router-v2-2-1-0.types.ts:371](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-router-v2-2-1-0.types.ts#L371)

***

### swapExactTokensForNATIVESupportingFeeOnTransferTokens()

> **swapExactTokensForNATIVESupportingFeeOnTransferTokens**(`amountIn`, `amountOutMinNATIVE`, `path`, `to`, `deadline`, `overrides`?): `Promise`\<`ContractTransaction`\>

Payable: false
Constant: false
StateMutability: nonpayable
Type: function

#### Parameters

• **amountIn**: `BigNumberish`

Type: uint256, Indexed: false

• **amountOutMinNATIVE**: `BigNumberish`

Type: uint256, Indexed: false

• **path**: [`SwapExactTokensForNATIVESupportingFeeOnTransferTokensPathRequest`](SwapExactTokensForNATIVESupportingFeeOnTransferTokensPathRequest.md)

Type: tuple, Indexed: false

• **to**: `string`

Type: address, Indexed: false

• **deadline**: `BigNumberish`

Type: uint256, Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

[packages/types/src/abis/traderJoe-router-v2-2-1-0.types.ts:390](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-router-v2-2-1-0.types.ts#L390)

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

• **path**: [`SwapExactTokensForTokensPathRequest`](SwapExactTokensForTokensPathRequest.md)

Type: tuple, Indexed: false

• **to**: `string`

Type: address, Indexed: false

• **deadline**: `BigNumberish`

Type: uint256, Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

[packages/types/src/abis/traderJoe-router-v2-2-1-0.types.ts:409](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-router-v2-2-1-0.types.ts#L409)

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

• **path**: [`SwapExactTokensForTokensSupportingFeeOnTransferTokensPathRequest`](SwapExactTokensForTokensSupportingFeeOnTransferTokensPathRequest.md)

Type: tuple, Indexed: false

• **to**: `string`

Type: address, Indexed: false

• **deadline**: `BigNumberish`

Type: uint256, Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

[packages/types/src/abis/traderJoe-router-v2-2-1-0.types.ts:428](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-router-v2-2-1-0.types.ts#L428)

***

### swapNATIVEForExactTokens()

> **swapNATIVEForExactTokens**(`amountOut`, `path`, `to`, `deadline`, `overrides`?): `Promise`\<`ContractTransaction`\>

Payable: true
Constant: false
StateMutability: payable
Type: function

#### Parameters

• **amountOut**: `BigNumberish`

Type: uint256, Indexed: false

• **path**: [`SwapNATIVEForExactTokensPathRequest`](SwapNATIVEForExactTokensPathRequest.md)

Type: tuple, Indexed: false

• **to**: `string`

Type: address, Indexed: false

• **deadline**: `BigNumberish`

Type: uint256, Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

[packages/types/src/abis/traderJoe-router-v2-2-1-0.types.ts:446](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-router-v2-2-1-0.types.ts#L446)

***

### swapTokensForExactNATIVE()

> **swapTokensForExactNATIVE**(`amountNATIVEOut`, `amountInMax`, `path`, `to`, `deadline`, `overrides`?): `Promise`\<`ContractTransaction`\>

Payable: false
Constant: false
StateMutability: nonpayable
Type: function

#### Parameters

• **amountNATIVEOut**: `BigNumberish`

Type: uint256, Indexed: false

• **amountInMax**: `BigNumberish`

Type: uint256, Indexed: false

• **path**: [`SwapTokensForExactNATIVEPathRequest`](SwapTokensForExactNATIVEPathRequest.md)

Type: tuple, Indexed: false

• **to**: `string`

Type: address, Indexed: false

• **deadline**: `BigNumberish`

Type: uint256, Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

[packages/types/src/abis/traderJoe-router-v2-2-1-0.types.ts:464](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-router-v2-2-1-0.types.ts#L464)

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

• **path**: [`SwapTokensForExactTokensPathRequest`](SwapTokensForExactTokensPathRequest.md)

Type: tuple, Indexed: false

• **to**: `string`

Type: address, Indexed: false

• **deadline**: `BigNumberish`

Type: uint256, Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

[packages/types/src/abis/traderJoe-router-v2-2-1-0.types.ts:483](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-router-v2-2-1-0.types.ts#L483)

***

### sweep()

> **sweep**(`token`, `to`, `amount`, `overrides`?): `Promise`\<`ContractTransaction`\>

Payable: false
Constant: false
StateMutability: nonpayable
Type: function

#### Parameters

• **token**: `string`

Type: address, Indexed: false

• **to**: `string`

Type: address, Indexed: false

• **amount**: `BigNumberish`

Type: uint256, Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

[packages/types/src/abis/traderJoe-router-v2-2-1-0.types.ts:500](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-router-v2-2-1-0.types.ts#L500)

***

### sweepLBToken()

> **sweepLBToken**(`lbToken`, `to`, `ids`, `amounts`, `overrides`?): `Promise`\<`ContractTransaction`\>

Payable: false
Constant: false
StateMutability: nonpayable
Type: function

#### Parameters

• **lbToken**: `string`

Type: address, Indexed: false

• **to**: `string`

Type: address, Indexed: false

• **ids**: `BigNumberish`[]

Type: uint256[], Indexed: false

• **amounts**: `BigNumberish`[]

Type: uint256[], Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

[packages/types/src/abis/traderJoe-router-v2-2-1-0.types.ts:516](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/traderJoe-router-v2-2-1-0.types.ts#L516)
