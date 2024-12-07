[**@dex-toolkit/types v1.0.0**](../../../README.md) • **Docs**

***

[Documentation v1.0.0](../../../../../packages.md) / [@dex-toolkit/types](../../../README.md) / [UniswapQuoterV3Types](../README.md) / Contract

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

packages/types/src/abis/uniswap-quoter-v3.types.ts:93

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

packages/types/src/abis/uniswap-quoter-v3.types.ts:100

***

### quoteExactInput()

> **quoteExactInput**(`path`, `amountIn`, `overrides`?): `Promise`\<[`QuoteExactInputResponse`](QuoteExactInputResponse.md)\>

Payable: false
Constant: false
StateMutability: nonpayable
Type: function

#### Parameters

• **path**: `BytesLike`

Type: bytes, Indexed: false

• **amountIn**: `BigNumberish`

Type: uint256, Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

#### Returns

`Promise`\<[`QuoteExactInputResponse`](QuoteExactInputResponse.md)\>

#### Defined in

packages/types/src/abis/uniswap-quoter-v3.types.ts:109

***

### quoteExactInputSingle()

> **quoteExactInputSingle**(`params`, `overrides`?): `Promise`\<[`QuoteExactInputSingleResponse`](QuoteExactInputSingleResponse.md)\>

Payable: false
Constant: false
StateMutability: nonpayable
Type: function

#### Parameters

• **params**: [`QuoteExactInputSingleParamsRequest`](QuoteExactInputSingleParamsRequest.md)

Type: tuple, Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

#### Returns

`Promise`\<[`QuoteExactInputSingleResponse`](QuoteExactInputSingleResponse.md)\>

#### Defined in

packages/types/src/abis/uniswap-quoter-v3.types.ts:121

***

### quoteExactOutput()

> **quoteExactOutput**(`path`, `amountOut`, `overrides`?): `Promise`\<[`QuoteExactOutputResponse`](QuoteExactOutputResponse.md)\>

Payable: false
Constant: false
StateMutability: nonpayable
Type: function

#### Parameters

• **path**: `BytesLike`

Type: bytes, Indexed: false

• **amountOut**: `BigNumberish`

Type: uint256, Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

#### Returns

`Promise`\<[`QuoteExactOutputResponse`](QuoteExactOutputResponse.md)\>

#### Defined in

packages/types/src/abis/uniswap-quoter-v3.types.ts:133

***

### quoteExactOutputSingle()

> **quoteExactOutputSingle**(`params`, `overrides`?): `Promise`\<[`QuoteExactOutputSingleResponse`](QuoteExactOutputSingleResponse.md)\>

Payable: false
Constant: false
StateMutability: nonpayable
Type: function

#### Parameters

• **params**: [`QuoteExactOutputSingleParamsRequest`](QuoteExactOutputSingleParamsRequest.md)

Type: tuple, Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

#### Returns

`Promise`\<[`QuoteExactOutputSingleResponse`](QuoteExactOutputSingleResponse.md)\>

#### Defined in

packages/types/src/abis/uniswap-quoter-v3.types.ts:145

***

### uniswapV3SwapCallback()

> **uniswapV3SwapCallback**(`amount0Delta`, `amount1Delta`, `path`, `overrides`?): `Promise`\<`void`\>

Payable: false
Constant: true
StateMutability: view
Type: function

#### Parameters

• **amount0Delta**: `BigNumberish`

Type: int256, Indexed: false

• **amount1Delta**: `BigNumberish`

Type: int256, Indexed: false

• **path**: `BytesLike`

Type: bytes, Indexed: false

• **overrides?**: [`ContractCallOverrides`](../../../type-aliases/ContractCallOverrides.md)

#### Returns

`Promise`\<`void`\>

#### Defined in

packages/types/src/abis/uniswap-quoter-v3.types.ts:158
