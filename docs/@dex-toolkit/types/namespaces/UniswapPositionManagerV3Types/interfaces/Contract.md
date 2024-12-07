[**@dex-toolkit/types v1.0.0**](../../../README.md) • **Docs**

***

[Documentation v1.0.0](../../../../../packages.md) / [@dex-toolkit/types](../../../README.md) / [UniswapPositionManagerV3Types](../README.md) / Contract

# Interface: Contract

## Methods

### DOMAIN\_SEPARATOR()

> **DOMAIN\_SEPARATOR**(`overrides`?): `Promise`\<`string`\>

Payable: false
Constant: true
StateMutability: view
Type: function

#### Parameters

• **overrides?**: [`ContractCallOverrides`](../../../type-aliases/ContractCallOverrides.md)

#### Returns

`Promise`\<`string`\>

#### Defined in

packages/types/src/abis/uniswap-position-manager-v3.types.ts:197

***

### PERMIT\_TYPEHASH()

> **PERMIT\_TYPEHASH**(`overrides`?): `Promise`\<`string`\>

Payable: false
Constant: true
StateMutability: view
Type: function

#### Parameters

• **overrides?**: [`ContractCallOverrides`](../../../type-aliases/ContractCallOverrides.md)

#### Returns

`Promise`\<`string`\>

#### Defined in

packages/types/src/abis/uniswap-position-manager-v3.types.ts:204

***

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

packages/types/src/abis/uniswap-position-manager-v3.types.ts:211

***

### approve()

> **approve**(`to`, `tokenId`, `overrides`?): `Promise`\<`ContractTransaction`\>

Payable: false
Constant: false
StateMutability: nonpayable
Type: function

#### Parameters

• **to**: `string`

Type: address, Indexed: false

• **tokenId**: `BigNumberish`

Type: uint256, Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

packages/types/src/abis/uniswap-position-manager-v3.types.ts:220

***

### balanceOf()

> **balanceOf**(`owner`, `overrides`?): `Promise`\<`BigNumber`\>

Payable: false
Constant: true
StateMutability: view
Type: function

#### Parameters

• **owner**: `string`

Type: address, Indexed: false

• **overrides?**: [`ContractCallOverrides`](../../../type-aliases/ContractCallOverrides.md)

#### Returns

`Promise`\<`BigNumber`\>

#### Defined in

packages/types/src/abis/uniswap-position-manager-v3.types.ts:232

***

### baseURI()

> **baseURI**(`overrides`?): `Promise`\<`string`\>

Payable: false
Constant: true
StateMutability: pure
Type: function

#### Parameters

• **overrides?**: [`ContractCallOverrides`](../../../type-aliases/ContractCallOverrides.md)

#### Returns

`Promise`\<`string`\>

#### Defined in

packages/types/src/abis/uniswap-position-manager-v3.types.ts:242

***

### burn()

> **burn**(`tokenId`, `overrides`?): `Promise`\<`ContractTransaction`\>

Payable: true
Constant: false
StateMutability: payable
Type: function

#### Parameters

• **tokenId**: `BigNumberish`

Type: uint256, Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

packages/types/src/abis/uniswap-position-manager-v3.types.ts:250

***

### collect()

> **collect**(`params`, `overrides`?): `Promise`\<`ContractTransaction`\>

Payable: true
Constant: false
StateMutability: payable
Type: function

#### Parameters

• **params**: [`CollectParamsRequest`](CollectParamsRequest.md)

Type: tuple, Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

packages/types/src/abis/uniswap-position-manager-v3.types.ts:261

***

### createAndInitializePoolIfNecessary()

> **createAndInitializePoolIfNecessary**(`token0`, `token1`, `fee`, `sqrtPriceX96`, `overrides`?): `Promise`\<`ContractTransaction`\>

Payable: true
Constant: false
StateMutability: payable
Type: function

#### Parameters

• **token0**: `string`

Type: address, Indexed: false

• **token1**: `string`

Type: address, Indexed: false

• **fee**: `BigNumberish`

Type: uint24, Indexed: false

• **sqrtPriceX96**: `BigNumberish`

Type: uint160, Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

packages/types/src/abis/uniswap-position-manager-v3.types.ts:275

***

### decreaseLiquidity()

> **decreaseLiquidity**(`params`, `overrides`?): `Promise`\<`ContractTransaction`\>

Payable: true
Constant: false
StateMutability: payable
Type: function

#### Parameters

• **params**: [`DecreaseLiquidityParamsRequest`](DecreaseLiquidityParamsRequest.md)

Type: tuple, Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

packages/types/src/abis/uniswap-position-manager-v3.types.ts:289

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

packages/types/src/abis/uniswap-position-manager-v3.types.ts:299

***

### getApproved()

> **getApproved**(`tokenId`, `overrides`?): `Promise`\<`string`\>

Payable: false
Constant: true
StateMutability: view
Type: function

#### Parameters

• **tokenId**: `BigNumberish`

Type: uint256, Indexed: false

• **overrides?**: [`ContractCallOverrides`](../../../type-aliases/ContractCallOverrides.md)

#### Returns

`Promise`\<`string`\>

#### Defined in

packages/types/src/abis/uniswap-position-manager-v3.types.ts:307

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

packages/types/src/abis/uniswap-position-manager-v3.types.ts:318

***

### isApprovedForAll()

> **isApprovedForAll**(`owner`, `operator`, `overrides`?): `Promise`\<`boolean`\>

Payable: false
Constant: true
StateMutability: view
Type: function

#### Parameters

• **owner**: `string`

Type: address, Indexed: false

• **operator**: `string`

Type: address, Indexed: false

• **overrides?**: [`ContractCallOverrides`](../../../type-aliases/ContractCallOverrides.md)

#### Returns

`Promise`\<`boolean`\>

#### Defined in

packages/types/src/abis/uniswap-position-manager-v3.types.ts:330

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

packages/types/src/abis/uniswap-position-manager-v3.types.ts:342

***

### multicall()

> **multicall**(`data`, `overrides`?): `Promise`\<`ContractTransaction`\>

Payable: true
Constant: false
StateMutability: payable
Type: function

#### Parameters

• **data**: `BytesLike`[]

Type: bytes[], Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

packages/types/src/abis/uniswap-position-manager-v3.types.ts:353

***

### name()

> **name**(`overrides`?): `Promise`\<`string`\>

Payable: false
Constant: true
StateMutability: view
Type: function

#### Parameters

• **overrides?**: [`ContractCallOverrides`](../../../type-aliases/ContractCallOverrides.md)

#### Returns

`Promise`\<`string`\>

#### Defined in

packages/types/src/abis/uniswap-position-manager-v3.types.ts:363

***

### ownerOf()

> **ownerOf**(`tokenId`, `overrides`?): `Promise`\<`string`\>

Payable: false
Constant: true
StateMutability: view
Type: function

#### Parameters

• **tokenId**: `BigNumberish`

Type: uint256, Indexed: false

• **overrides?**: [`ContractCallOverrides`](../../../type-aliases/ContractCallOverrides.md)

#### Returns

`Promise`\<`string`\>

#### Defined in

packages/types/src/abis/uniswap-position-manager-v3.types.ts:371

***

### permit()

> **permit**(`spender`, `tokenId`, `deadline`, `v`, `r`, `s`, `overrides`?): `Promise`\<`ContractTransaction`\>

Payable: true
Constant: false
StateMutability: payable
Type: function

#### Parameters

• **spender**: `string`

Type: address, Indexed: false

• **tokenId**: `BigNumberish`

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

packages/types/src/abis/uniswap-position-manager-v3.types.ts:387

***

### positions()

> **positions**(`tokenId`, `overrides`?): `Promise`\<[`PositionsResponse`](PositionsResponse.md)\>

Payable: false
Constant: true
StateMutability: view
Type: function

#### Parameters

• **tokenId**: `BigNumberish`

Type: uint256, Indexed: false

• **overrides?**: [`ContractCallOverrides`](../../../type-aliases/ContractCallOverrides.md)

#### Returns

`Promise`\<[`PositionsResponse`](PositionsResponse.md)\>

#### Defined in

packages/types/src/abis/uniswap-position-manager-v3.types.ts:403

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

packages/types/src/abis/uniswap-position-manager-v3.types.ts:413

***

### safeTransferFrom()

#### safeTransferFrom(from, to, tokenId, overrides)

> **safeTransferFrom**(`from`, `to`, `tokenId`, `overrides`?): `Promise`\<`ContractTransaction`\>

Payable: false
Constant: false
StateMutability: nonpayable
Type: function

##### Parameters

• **from**: `string`

Type: address, Indexed: false

• **to**: `string`

Type: address, Indexed: false

• **tokenId**: `BigNumberish`

Type: uint256, Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

##### Returns

`Promise`\<`ContractTransaction`\>

##### Defined in

packages/types/src/abis/uniswap-position-manager-v3.types.ts:425

#### safeTransferFrom(from, to, tokenId, _data, overrides)

> **safeTransferFrom**(`from`, `to`, `tokenId`, `_data`, `overrides`?): `Promise`\<`ContractTransaction`\>

Payable: false
Constant: false
StateMutability: nonpayable
Type: function

##### Parameters

• **from**: `string`

Type: address, Indexed: false

• **to**: `string`

Type: address, Indexed: false

• **tokenId**: `BigNumberish`

Type: uint256, Indexed: false

• **\_data**: `BytesLike`

Type: bytes, Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

##### Returns

`Promise`\<`ContractTransaction`\>

##### Defined in

packages/types/src/abis/uniswap-position-manager-v3.types.ts:441

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

packages/types/src/abis/uniswap-position-manager-v3.types.ts:460

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

packages/types/src/abis/uniswap-position-manager-v3.types.ts:481

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

packages/types/src/abis/uniswap-position-manager-v3.types.ts:502

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

packages/types/src/abis/uniswap-position-manager-v3.types.ts:523

***

### setApprovalForAll()

> **setApprovalForAll**(`operator`, `approved`, `overrides`?): `Promise`\<`ContractTransaction`\>

Payable: false
Constant: false
StateMutability: nonpayable
Type: function

#### Parameters

• **operator**: `string`

Type: address, Indexed: false

• **approved**: `boolean`

Type: bool, Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

packages/types/src/abis/uniswap-position-manager-v3.types.ts:540

***

### supportsInterface()

> **supportsInterface**(`interfaceId`, `overrides`?): `Promise`\<`boolean`\>

Payable: false
Constant: true
StateMutability: view
Type: function

#### Parameters

• **interfaceId**: `BytesLike`

Type: bytes4, Indexed: false

• **overrides?**: [`ContractCallOverrides`](../../../type-aliases/ContractCallOverrides.md)

#### Returns

`Promise`\<`boolean`\>

#### Defined in

packages/types/src/abis/uniswap-position-manager-v3.types.ts:552

***

### sweepToken()

> **sweepToken**(`token`, `amountMinimum`, `recipient`, `overrides`?): `Promise`\<`ContractTransaction`\>

Payable: true
Constant: false
StateMutability: payable
Type: function

#### Parameters

• **token**: `string`

Type: address, Indexed: false

• **amountMinimum**: `BigNumberish`

Type: uint256, Indexed: false

• **recipient**: `string`

Type: address, Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

packages/types/src/abis/uniswap-position-manager-v3.types.ts:565

***

### symbol()

> **symbol**(`overrides`?): `Promise`\<`string`\>

Payable: false
Constant: true
StateMutability: view
Type: function

#### Parameters

• **overrides?**: [`ContractCallOverrides`](../../../type-aliases/ContractCallOverrides.md)

#### Returns

`Promise`\<`string`\>

#### Defined in

packages/types/src/abis/uniswap-position-manager-v3.types.ts:577

***

### tokenByIndex()

> **tokenByIndex**(`index`, `overrides`?): `Promise`\<`BigNumber`\>

Payable: false
Constant: true
StateMutability: view
Type: function

#### Parameters

• **index**: `BigNumberish`

Type: uint256, Indexed: false

• **overrides?**: [`ContractCallOverrides`](../../../type-aliases/ContractCallOverrides.md)

#### Returns

`Promise`\<`BigNumber`\>

#### Defined in

packages/types/src/abis/uniswap-position-manager-v3.types.ts:585

***

### tokenOfOwnerByIndex()

> **tokenOfOwnerByIndex**(`owner`, `index`, `overrides`?): `Promise`\<`BigNumber`\>

Payable: false
Constant: true
StateMutability: view
Type: function

#### Parameters

• **owner**: `string`

Type: address, Indexed: false

• **index**: `BigNumberish`

Type: uint256, Indexed: false

• **overrides?**: [`ContractCallOverrides`](../../../type-aliases/ContractCallOverrides.md)

#### Returns

`Promise`\<`BigNumber`\>

#### Defined in

packages/types/src/abis/uniswap-position-manager-v3.types.ts:597

***

### tokenURI()

> **tokenURI**(`tokenId`, `overrides`?): `Promise`\<`string`\>

Payable: false
Constant: true
StateMutability: view
Type: function

#### Parameters

• **tokenId**: `BigNumberish`

Type: uint256, Indexed: false

• **overrides?**: [`ContractCallOverrides`](../../../type-aliases/ContractCallOverrides.md)

#### Returns

`Promise`\<`string`\>

#### Defined in

packages/types/src/abis/uniswap-position-manager-v3.types.ts:609

***

### totalSupply()

> **totalSupply**(`overrides`?): `Promise`\<`BigNumber`\>

Payable: false
Constant: true
StateMutability: view
Type: function

#### Parameters

• **overrides?**: [`ContractCallOverrides`](../../../type-aliases/ContractCallOverrides.md)

#### Returns

`Promise`\<`BigNumber`\>

#### Defined in

packages/types/src/abis/uniswap-position-manager-v3.types.ts:619

***

### transferFrom()

> **transferFrom**(`from`, `to`, `tokenId`, `overrides`?): `Promise`\<`ContractTransaction`\>

Payable: false
Constant: false
StateMutability: nonpayable
Type: function

#### Parameters

• **from**: `string`

Type: address, Indexed: false

• **to**: `string`

Type: address, Indexed: false

• **tokenId**: `BigNumberish`

Type: uint256, Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

packages/types/src/abis/uniswap-position-manager-v3.types.ts:629

***

### uniswapV3MintCallback()

> **uniswapV3MintCallback**(`amount0Owed`, `amount1Owed`, `data`, `overrides`?): `Promise`\<`ContractTransaction`\>

Payable: false
Constant: false
StateMutability: nonpayable
Type: function

#### Parameters

• **amount0Owed**: `BigNumberish`

Type: uint256, Indexed: false

• **amount1Owed**: `BigNumberish`

Type: uint256, Indexed: false

• **data**: `BytesLike`

Type: bytes, Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

packages/types/src/abis/uniswap-position-manager-v3.types.ts:644

***

### unwrapWETH9()

> **unwrapWETH9**(`amountMinimum`, `recipient`, `overrides`?): `Promise`\<`ContractTransaction`\>

Payable: true
Constant: false
StateMutability: payable
Type: function

#### Parameters

• **amountMinimum**: `BigNumberish`

Type: uint256, Indexed: false

• **recipient**: `string`

Type: address, Indexed: false

• **overrides?**: [`ContractTransactionOverrides`](../../../type-aliases/ContractTransactionOverrides.md)

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

packages/types/src/abis/uniswap-position-manager-v3.types.ts:658
