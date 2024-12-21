[**@dex-toolkit/types v1.0.0**](../../../README.md) • **Docs**

***

[Documentation v1.0.0](../../../../../packages.md) / [@dex-toolkit/types](../../../README.md) / [QuickswapQuoterV3Types](../README.md) / Contract

# Interface: Contract

## Methods

### WNativeToken()

> **WNativeToken**(`overrides`?): `Promise`\<`string`\>

Payable: false
Constant: true
StateMutability: view
Type: function

#### Parameters

• **overrides?**: [`ContractCallOverrides`](../../../type-aliases/ContractCallOverrides.md)

#### Returns

`Promise`\<`string`\>

#### Defined in

[packages/types/src/abis/quickswap-quoter-v3.types.ts:64](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/quickswap-quoter-v3.types.ts#L64)

***

### algebraSwapCallback()

> **algebraSwapCallback**(`amount0Delta`, `amount1Delta`, `path`, `overrides`?): `Promise`\<`void`\>

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

[packages/types/src/abis/quickswap-quoter-v3.types.ts:74](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/quickswap-quoter-v3.types.ts#L74)

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

[packages/types/src/abis/quickswap-quoter-v3.types.ts:86](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/quickswap-quoter-v3.types.ts#L86)

***

### poolDeployer()

> **poolDeployer**(`overrides`?): `Promise`\<`string`\>

Payable: false
Constant: true
StateMutability: view
Type: function

#### Parameters

• **overrides?**: [`ContractCallOverrides`](../../../type-aliases/ContractCallOverrides.md)

#### Returns

`Promise`\<`string`\>

#### Defined in

[packages/types/src/abis/quickswap-quoter-v3.types.ts:93](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/quickswap-quoter-v3.types.ts#L93)

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

[packages/types/src/abis/quickswap-quoter-v3.types.ts:102](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/quickswap-quoter-v3.types.ts#L102)

***

### quoteExactInputSingle()

> **quoteExactInputSingle**(`tokenIn`, `tokenOut`, `amountIn`, `limitSqrtPrice`, `overrides`?): `Promise`\<[`QuoteExactInputSingleResponse`](QuoteExactInputSingleResponse.md)\>

Payable: false
Constant: false
StateMutability: nonpayable
Type: function

#### Parameters

• **tokenIn**: `string`

Type: address, Indexed: false

• **tokenOut**: `string`

Type: address, Indexed: false

• **amountIn**: `BigNumberish`

Type: uint256, Indexed: false

• **limitSqrtPrice**: `BigNumberish`

Type: uint160, Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

#### Returns

`Promise`\<[`QuoteExactInputSingleResponse`](QuoteExactInputSingleResponse.md)\>

#### Defined in

[packages/types/src/abis/quickswap-quoter-v3.types.ts:117](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/quickswap-quoter-v3.types.ts#L117)

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

[packages/types/src/abis/quickswap-quoter-v3.types.ts:132](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/quickswap-quoter-v3.types.ts#L132)

***

### quoteExactOutputSingle()

> **quoteExactOutputSingle**(`tokenIn`, `tokenOut`, `amountOut`, `limitSqrtPrice`, `overrides`?): `Promise`\<[`QuoteExactOutputSingleResponse`](QuoteExactOutputSingleResponse.md)\>

Payable: false
Constant: false
StateMutability: nonpayable
Type: function

#### Parameters

• **tokenIn**: `string`

Type: address, Indexed: false

• **tokenOut**: `string`

Type: address, Indexed: false

• **amountOut**: `BigNumberish`

Type: uint256, Indexed: false

• **limitSqrtPrice**: `BigNumberish`

Type: uint160, Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

#### Returns

`Promise`\<[`QuoteExactOutputSingleResponse`](QuoteExactOutputSingleResponse.md)\>

#### Defined in

[packages/types/src/abis/quickswap-quoter-v3.types.ts:147](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/quickswap-quoter-v3.types.ts#L147)
