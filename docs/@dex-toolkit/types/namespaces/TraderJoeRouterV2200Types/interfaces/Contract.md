[**@dex-toolkit/types v1.0.0**](../../../README.md) • **Docs**

***

[Documentation v1.0.0](../../../../../packages.md) / [@dex-toolkit/types](../../../README.md) / [TraderJoeRouterV2200Types](../README.md) / Contract

# Interface: Contract

## Methods

### addLiquidity()

> **addLiquidity**(`_liquidityParameters`, `overrides`?): `Promise`\<`ContractTransaction`\>

Payable: false
Constant: false
StateMutability: nonpayable
Type: function

#### Parameters

• **\_liquidityParameters**: [`AddLiquidity_liquidityParametersRequest`](AddLiquidity_liquidityParametersRequest.md)

Type: tuple, Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

packages/types/src/abis/traderJoe-router-v2-2-0-0.types.ts:97

***

### addLiquidityAVAX()

> **addLiquidityAVAX**(`_liquidityParameters`, `overrides`?): `Promise`\<`ContractTransaction`\>

Payable: true
Constant: false
StateMutability: payable
Type: function

#### Parameters

• **\_liquidityParameters**: [`AddLiquidityAVAX_liquidityParametersRequest`](AddLiquidityAVAX_liquidityParametersRequest.md)

Type: tuple, Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

packages/types/src/abis/traderJoe-router-v2-2-0-0.types.ts:108

***

### createLBPair()

> **createLBPair**(`_tokenX`, `_tokenY`, `_activeId`, `_binStep`, `overrides`?): `Promise`\<`ContractTransaction`\>

Payable: false
Constant: false
StateMutability: nonpayable
Type: function

#### Parameters

• **\_tokenX**: `string`

Type: address, Indexed: false

• **\_tokenY**: `string`

Type: address, Indexed: false

• **\_activeId**: `BigNumberish`

Type: uint24, Indexed: false

• **\_binStep**: `BigNumberish`

Type: uint16, Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

packages/types/src/abis/traderJoe-router-v2-2-0-0.types.ts:122

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

packages/types/src/abis/traderJoe-router-v2-2-0-0.types.ts:135

***

### getIdFromPrice()

> **getIdFromPrice**(`_LBPair`, `_price`, `overrides`?): `Promise`\<`number`\>

Payable: false
Constant: true
StateMutability: view
Type: function

#### Parameters

• **\_LBPair**: `string`

Type: address, Indexed: false

• **\_price**: `BigNumberish`

Type: uint256, Indexed: false

• **overrides?**: [`ContractCallOverrides`](../../../type-aliases/ContractCallOverrides.md)

#### Returns

`Promise`\<`number`\>

#### Defined in

packages/types/src/abis/traderJoe-router-v2-2-0-0.types.ts:144

***

### getPriceFromId()

> **getPriceFromId**(`_LBPair`, `_id`, `overrides`?): `Promise`\<`BigNumber`\>

Payable: false
Constant: true
StateMutability: view
Type: function

#### Parameters

• **\_LBPair**: `string`

Type: address, Indexed: false

• **\_id**: `BigNumberish`

Type: uint24, Indexed: false

• **overrides?**: [`ContractCallOverrides`](../../../type-aliases/ContractCallOverrides.md)

#### Returns

`Promise`\<`BigNumber`\>

#### Defined in

packages/types/src/abis/traderJoe-router-v2-2-0-0.types.ts:157

***

### getSwapIn()

> **getSwapIn**(`_LBPair`, `_amountOut`, `_swapForY`, `overrides`?): `Promise`\<[`GetSwapInResponse`](GetSwapInResponse.md)\>

Payable: false
Constant: true
StateMutability: view
Type: function

#### Parameters

• **\_LBPair**: `string`

Type: address, Indexed: false

• **\_amountOut**: `BigNumberish`

Type: uint256, Indexed: false

• **\_swapForY**: `boolean`

Type: bool, Indexed: false

• **overrides?**: [`ContractCallOverrides`](../../../type-aliases/ContractCallOverrides.md)

#### Returns

`Promise`\<[`GetSwapInResponse`](GetSwapInResponse.md)\>

#### Defined in

packages/types/src/abis/traderJoe-router-v2-2-0-0.types.ts:171

***

### getSwapOut()

> **getSwapOut**(`_LBPair`, `_amountIn`, `_swapForY`, `overrides`?): `Promise`\<[`GetSwapOutResponse`](GetSwapOutResponse.md)\>

Payable: false
Constant: true
StateMutability: view
Type: function

#### Parameters

• **\_LBPair**: `string`

Type: address, Indexed: false

• **\_amountIn**: `BigNumberish`

Type: uint256, Indexed: false

• **\_swapForY**: `boolean`

Type: bool, Indexed: false

• **overrides?**: [`ContractCallOverrides`](../../../type-aliases/ContractCallOverrides.md)

#### Returns

`Promise`\<[`GetSwapOutResponse`](GetSwapOutResponse.md)\>

#### Defined in

packages/types/src/abis/traderJoe-router-v2-2-0-0.types.ts:186

***

### oldFactory()

> **oldFactory**(`overrides`?): `Promise`\<`string`\>

Payable: false
Constant: true
StateMutability: view
Type: function

#### Parameters

• **overrides?**: [`ContractCallOverrides`](../../../type-aliases/ContractCallOverrides.md)

#### Returns

`Promise`\<`string`\>

#### Defined in

packages/types/src/abis/traderJoe-router-v2-2-0-0.types.ts:198

***

### removeLiquidity()

> **removeLiquidity**(`_tokenX`, `_tokenY`, `_binStep`, `_amountXMin`, `_amountYMin`, `_ids`, `_amounts`, `_to`, `_deadline`, `overrides`?): `Promise`\<`ContractTransaction`\>

Payable: false
Constant: false
StateMutability: nonpayable
Type: function

#### Parameters

• **\_tokenX**: `string`

Type: address, Indexed: false

• **\_tokenY**: `string`

Type: address, Indexed: false

• **\_binStep**: `BigNumberish`

Type: uint16, Indexed: false

• **\_amountXMin**: `BigNumberish`

Type: uint256, Indexed: false

• **\_amountYMin**: `BigNumberish`

Type: uint256, Indexed: false

• **\_ids**: `BigNumberish`[]

Type: uint256[], Indexed: false

• **\_amounts**: `BigNumberish`[]

Type: uint256[], Indexed: false

• **\_to**: `string`

Type: address, Indexed: false

• **\_deadline**: `BigNumberish`

Type: uint256, Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

packages/types/src/abis/traderJoe-router-v2-2-0-0.types.ts:214

***

### removeLiquidityAVAX()

> **removeLiquidityAVAX**(`_token`, `_binStep`, `_amountTokenMin`, `_amountAVAXMin`, `_ids`, `_amounts`, `_to`, `_deadline`, `overrides`?): `Promise`\<`ContractTransaction`\>

Payable: false
Constant: false
StateMutability: nonpayable
Type: function

#### Parameters

• **\_token**: `string`

Type: address, Indexed: false

• **\_binStep**: `BigNumberish`

Type: uint16, Indexed: false

• **\_amountTokenMin**: `BigNumberish`

Type: uint256, Indexed: false

• **\_amountAVAXMin**: `BigNumberish`

Type: uint256, Indexed: false

• **\_ids**: `BigNumberish`[]

Type: uint256[], Indexed: false

• **\_amounts**: `BigNumberish`[]

Type: uint256[], Indexed: false

• **\_to**: `string`

Type: address, Indexed: false

• **\_deadline**: `BigNumberish`

Type: uint256, Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

packages/types/src/abis/traderJoe-router-v2-2-0-0.types.ts:240

***

### swapAVAXForExactTokens()

> **swapAVAXForExactTokens**(`_amountOut`, `_pairBinSteps`, `_tokenPath`, `_to`, `_deadline`, `overrides`?): `Promise`\<`ContractTransaction`\>

Payable: true
Constant: false
StateMutability: payable
Type: function

#### Parameters

• **\_amountOut**: `BigNumberish`

Type: uint256, Indexed: false

• **\_pairBinSteps**: `BigNumberish`[]

Type: uint256[], Indexed: false

• **\_tokenPath**: `string`[]

Type: address[], Indexed: false

• **\_to**: `string`

Type: address, Indexed: false

• **\_deadline**: `BigNumberish`

Type: uint256, Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

packages/types/src/abis/traderJoe-router-v2-2-0-0.types.ts:262

***

### swapExactAVAXForTokens()

> **swapExactAVAXForTokens**(`_amountOutMin`, `_pairBinSteps`, `_tokenPath`, `_to`, `_deadline`, `overrides`?): `Promise`\<`ContractTransaction`\>

Payable: true
Constant: false
StateMutability: payable
Type: function

#### Parameters

• **\_amountOutMin**: `BigNumberish`

Type: uint256, Indexed: false

• **\_pairBinSteps**: `BigNumberish`[]

Type: uint256[], Indexed: false

• **\_tokenPath**: `string`[]

Type: address[], Indexed: false

• **\_to**: `string`

Type: address, Indexed: false

• **\_deadline**: `BigNumberish`

Type: uint256, Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

packages/types/src/abis/traderJoe-router-v2-2-0-0.types.ts:281

***

### swapExactAVAXForTokensSupportingFeeOnTransferTokens()

> **swapExactAVAXForTokensSupportingFeeOnTransferTokens**(`_amountOutMin`, `_pairBinSteps`, `_tokenPath`, `_to`, `_deadline`, `overrides`?): `Promise`\<`ContractTransaction`\>

Payable: true
Constant: false
StateMutability: payable
Type: function

#### Parameters

• **\_amountOutMin**: `BigNumberish`

Type: uint256, Indexed: false

• **\_pairBinSteps**: `BigNumberish`[]

Type: uint256[], Indexed: false

• **\_tokenPath**: `string`[]

Type: address[], Indexed: false

• **\_to**: `string`

Type: address, Indexed: false

• **\_deadline**: `BigNumberish`

Type: uint256, Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

packages/types/src/abis/traderJoe-router-v2-2-0-0.types.ts:300

***

### swapExactTokensForAVAX()

> **swapExactTokensForAVAX**(`_amountIn`, `_amountOutMinAVAX`, `_pairBinSteps`, `_tokenPath`, `_to`, `_deadline`, `overrides`?): `Promise`\<`ContractTransaction`\>

Payable: false
Constant: false
StateMutability: nonpayable
Type: function

#### Parameters

• **\_amountIn**: `BigNumberish`

Type: uint256, Indexed: false

• **\_amountOutMinAVAX**: `BigNumberish`

Type: uint256, Indexed: false

• **\_pairBinSteps**: `BigNumberish`[]

Type: uint256[], Indexed: false

• **\_tokenPath**: `string`[]

Type: address[], Indexed: false

• **\_to**: `string`

Type: address, Indexed: false

• **\_deadline**: `BigNumberish`

Type: uint256, Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

packages/types/src/abis/traderJoe-router-v2-2-0-0.types.ts:320

***

### swapExactTokensForAVAXSupportingFeeOnTransferTokens()

> **swapExactTokensForAVAXSupportingFeeOnTransferTokens**(`_amountIn`, `_amountOutMinAVAX`, `_pairBinSteps`, `_tokenPath`, `_to`, `_deadline`, `overrides`?): `Promise`\<`ContractTransaction`\>

Payable: false
Constant: false
StateMutability: nonpayable
Type: function

#### Parameters

• **\_amountIn**: `BigNumberish`

Type: uint256, Indexed: false

• **\_amountOutMinAVAX**: `BigNumberish`

Type: uint256, Indexed: false

• **\_pairBinSteps**: `BigNumberish`[]

Type: uint256[], Indexed: false

• **\_tokenPath**: `string`[]

Type: address[], Indexed: false

• **\_to**: `string`

Type: address, Indexed: false

• **\_deadline**: `BigNumberish`

Type: uint256, Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

packages/types/src/abis/traderJoe-router-v2-2-0-0.types.ts:341

***

### swapExactTokensForTokens()

> **swapExactTokensForTokens**(`_amountIn`, `_amountOutMin`, `_pairBinSteps`, `_tokenPath`, `_to`, `_deadline`, `overrides`?): `Promise`\<`ContractTransaction`\>

Payable: false
Constant: false
StateMutability: nonpayable
Type: function

#### Parameters

• **\_amountIn**: `BigNumberish`

Type: uint256, Indexed: false

• **\_amountOutMin**: `BigNumberish`

Type: uint256, Indexed: false

• **\_pairBinSteps**: `BigNumberish`[]

Type: uint256[], Indexed: false

• **\_tokenPath**: `string`[]

Type: address[], Indexed: false

• **\_to**: `string`

Type: address, Indexed: false

• **\_deadline**: `BigNumberish`

Type: uint256, Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

packages/types/src/abis/traderJoe-router-v2-2-0-0.types.ts:362

***

### swapExactTokensForTokensSupportingFeeOnTransferTokens()

> **swapExactTokensForTokensSupportingFeeOnTransferTokens**(`_amountIn`, `_amountOutMin`, `_pairBinSteps`, `_tokenPath`, `_to`, `_deadline`, `overrides`?): `Promise`\<`ContractTransaction`\>

Payable: false
Constant: false
StateMutability: nonpayable
Type: function

#### Parameters

• **\_amountIn**: `BigNumberish`

Type: uint256, Indexed: false

• **\_amountOutMin**: `BigNumberish`

Type: uint256, Indexed: false

• **\_pairBinSteps**: `BigNumberish`[]

Type: uint256[], Indexed: false

• **\_tokenPath**: `string`[]

Type: address[], Indexed: false

• **\_to**: `string`

Type: address, Indexed: false

• **\_deadline**: `BigNumberish`

Type: uint256, Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

packages/types/src/abis/traderJoe-router-v2-2-0-0.types.ts:383

***

### swapTokensForExactAVAX()

> **swapTokensForExactAVAX**(`_amountAVAXOut`, `_amountInMax`, `_pairBinSteps`, `_tokenPath`, `_to`, `_deadline`, `overrides`?): `Promise`\<`ContractTransaction`\>

Payable: false
Constant: false
StateMutability: nonpayable
Type: function

#### Parameters

• **\_amountAVAXOut**: `BigNumberish`

Type: uint256, Indexed: false

• **\_amountInMax**: `BigNumberish`

Type: uint256, Indexed: false

• **\_pairBinSteps**: `BigNumberish`[]

Type: uint256[], Indexed: false

• **\_tokenPath**: `string`[]

Type: address[], Indexed: false

• **\_to**: `string`

Type: address, Indexed: false

• **\_deadline**: `BigNumberish`

Type: uint256, Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

packages/types/src/abis/traderJoe-router-v2-2-0-0.types.ts:404

***

### swapTokensForExactTokens()

> **swapTokensForExactTokens**(`_amountOut`, `_amountInMax`, `_pairBinSteps`, `_tokenPath`, `_to`, `_deadline`, `overrides`?): `Promise`\<`ContractTransaction`\>

Payable: false
Constant: false
StateMutability: nonpayable
Type: function

#### Parameters

• **\_amountOut**: `BigNumberish`

Type: uint256, Indexed: false

• **\_amountInMax**: `BigNumberish`

Type: uint256, Indexed: false

• **\_pairBinSteps**: `BigNumberish`[]

Type: uint256[], Indexed: false

• **\_tokenPath**: `string`[]

Type: address[], Indexed: false

• **\_to**: `string`

Type: address, Indexed: false

• **\_deadline**: `BigNumberish`

Type: uint256, Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

packages/types/src/abis/traderJoe-router-v2-2-0-0.types.ts:425

***

### sweep()

> **sweep**(`_token`, `_to`, `_amount`, `overrides`?): `Promise`\<`ContractTransaction`\>

Payable: false
Constant: false
StateMutability: nonpayable
Type: function

#### Parameters

• **\_token**: `string`

Type: address, Indexed: false

• **\_to**: `string`

Type: address, Indexed: false

• **\_amount**: `BigNumberish`

Type: uint256, Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

packages/types/src/abis/traderJoe-router-v2-2-0-0.types.ts:443

***

### wavax()

> **wavax**(`overrides`?): `Promise`\<`string`\>

Payable: false
Constant: true
StateMutability: view
Type: function

#### Parameters

• **overrides?**: [`ContractCallOverrides`](../../../type-aliases/ContractCallOverrides.md)

#### Returns

`Promise`\<`string`\>

#### Defined in

packages/types/src/abis/traderJoe-router-v2-2-0-0.types.ts:455
