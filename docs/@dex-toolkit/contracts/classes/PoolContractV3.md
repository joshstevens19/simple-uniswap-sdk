[**@dex-toolkit/contracts v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/contracts](../README.md) / PoolContractV3

# Class: PoolContractV3

## Extends

- `DexProviderBase`

## Implements

- `Contract`

## Constructors

### new PoolContractV3()

> **new PoolContractV3**(`dexProviderContext`, `contractDetailContext`): [`PoolContractV3`](PoolContractV3.md)

#### Parameters

• **dexProviderContext**: `DexMulticallProviderContext`

• **contractDetailContext**: `ContractDetailWithAddressContext`

#### Returns

[`PoolContractV3`](PoolContractV3.md)

#### Overrides

`DexProviderBase.constructor`

#### Defined in

packages/contracts/src/pool/pool.contract.ts:48

## Properties

### \_contract

> `protected` **\_contract**: `ContractContext`

#### Defined in

packages/contracts/src/pool/pool.contract.ts:44

***

### \_contractDetail

> `protected` **\_contractDetail**: `ContractDetail`

#### Inherited from

`DexProviderBase._contractDetail`

#### Defined in

submodules/ethereum-multicall/packages/provider/dist/esm/multicall-provider-base.d.ts:4

***

### \_methodNames

> `protected` **\_methodNames**: `MethodNameMap`

#### Defined in

packages/contracts/src/pool/pool.contract.ts:46

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

submodules/ethereum-multicall/packages/provider/dist/esm/multicall-provider-base.d.ts:18

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

packages/contracts/src/pool/pool.contract.ts:128

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

submodules/ethereum-multicall/packages/provider/dist/esm/multicall-provider-base.d.ts:12

***

### poolContract

> `get` **poolContract**(): `ContractContext`

Get the pool contract

#### Returns

`ContractContext`

#### Defined in

packages/contracts/src/pool/pool.contract.ts:123

## Methods

### burn()

> **burn**(`tickLower`, `tickUpper`, `amount`, `overrides`?): `Promise`\<`ContractTransaction`\>

Burns liquidity from the pool.

#### Parameters

• **tickLower**: `BigNumberish`

The lower tick range.

• **tickUpper**: `BigNumberish`

The upper tick range.

• **amount**: `BigNumberish`

The amount to burn.

• **overrides?**: `ContractTransactionOverrides`

Optional transaction overrides.

#### Returns

`Promise`\<`ContractTransaction`\>

The contract transaction.

#### Implementation of

`UniswapPoolV3Types.Contract.burn`

#### Defined in

packages/contracts/src/pool/pool.contract.ts:292

***

### call()

> **call**\<`TCalls`\>(`calls`, `options`): `Promise`\<`ExecutionResult`\<`Contract`, `TCalls`\>\>

Executes a multicall for the given contract methods.

#### Type Parameters

• **TCalls** *extends* `Record`\<`string`, `MethodCall`\<`Contract`, `"swap"`\> \| `MethodCall`\<`Contract`, `"initialize"`\> \| `MethodCall`\<`Contract`, `"factory"`\> \| `MethodCall`\<`Contract`, `"burn"`\> \| `MethodCall`\<`Contract`, `"mint"`\> \| `MethodCall`\<`Contract`, `"token0"`\> \| `MethodCall`\<`Contract`, `"token1"`\> \| `MethodCall`\<`Contract`, `"collect"`\> \| `MethodCall`\<`Contract`, `"collectProtocol"`\> \| `MethodCall`\<`Contract`, `"fee"`\> \| `MethodCall`\<`Contract`, `"feeGrowthGlobal0X128"`\> \| `MethodCall`\<`Contract`, `"feeGrowthGlobal1X128"`\> \| `MethodCall`\<`Contract`, `"flash"`\> \| `MethodCall`\<`Contract`, `"increaseObservationCardinalityNext"`\> \| `MethodCall`\<`Contract`, `"liquidity"`\> \| `MethodCall`\<`Contract`, `"maxLiquidityPerTick"`\> \| `MethodCall`\<`Contract`, `"observations"`\> \| `MethodCall`\<`Contract`, `"observe"`\> \| `MethodCall`\<`Contract`, `"positions"`\> \| `MethodCall`\<`Contract`, `"protocolFees"`\> \| `MethodCall`\<`Contract`, `"setFeeProtocol"`\> \| `MethodCall`\<`Contract`, `"slot0"`\> \| `MethodCall`\<`Contract`, `"snapshotCumulativesInside"`\> \| `MethodCall`\<`Contract`, `"tickBitmap"`\> \| `MethodCall`\<`Contract`, `"tickSpacing"`\> \| `MethodCall`\<`Contract`, `"ticks"`\>\>

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

packages/contracts/src/pool/pool.contract.ts:250

***

### collect()

> **collect**(`recipient`, `tickLower`, `tickUpper`, `amount0Requested`, `amount1Requested`, `overrides`?): `Promise`\<`ContractTransaction`\>

Collects fees from the pool.

#### Parameters

• **recipient**: `string`

The recipient of the fees.

• **tickLower**: `BigNumberish`

The lower tick range.

• **tickUpper**: `BigNumberish`

The upper tick range.

• **amount0Requested**: `BigNumberish`

The requested amount of token0.

• **amount1Requested**: `BigNumberish`

The requested amount of token1.

• **overrides?**: `ContractTransactionOverrides`

Optional transaction overrides.

#### Returns

`Promise`\<`ContractTransaction`\>

The contract transaction.

#### Implementation of

`UniswapPoolV3Types.Contract.collect`

#### Defined in

packages/contracts/src/pool/pool.contract.ts:331

***

### collectProtocol()

> **collectProtocol**(`recipient`, `amount0Requested`, `amount1Requested`, `overrides`?): `Promise`\<`ContractTransaction`\>

Collects protocol fees from the pool.

#### Parameters

• **recipient**: `string`

The recipient of the fees.

• **amount0Requested**: `BigNumberish`

The requested amount of token0.

• **amount1Requested**: `BigNumberish`

The requested amount of token1.

• **overrides?**: `ContractTransactionOverrides`

Optional transaction overrides.

#### Returns

`Promise`\<`ContractTransaction`\>

The contract transaction.

#### Implementation of

`UniswapPoolV3Types.Contract.collectProtocol`

#### Defined in

packages/contracts/src/pool/pool.contract.ts:382

***

### encodeBurn()

> **encodeBurn**(`tickLower`, `tickUpper`, `amount`): `string`

Encodes the function data for burning liquidity from the pool.

#### Parameters

• **tickLower**: `BigNumberish`

The lower tick range.

• **tickUpper**: `BigNumberish`

The upper tick range.

• **amount**: `BigNumberish`

The amount to burn.

#### Returns

`string`

The encoded function data.

#### Defined in

packages/contracts/src/pool/pool.contract.ts:313

***

### encodeCollect()

> **encodeCollect**(`recipient`, `tickLower`, `tickUpper`, `amount0Requested`, `amount1Requested`): `string`

Encodes the function data for collecting fees from the pool.

#### Parameters

• **recipient**: `string`

The recipient of the fees.

• **tickLower**: `BigNumberish`

The lower tick range.

• **tickUpper**: `BigNumberish`

The upper tick range.

• **amount0Requested**: `BigNumberish`

The requested amount of token0.

• **amount1Requested**: `BigNumberish`

The requested amount of token1.

#### Returns

`string`

The encoded function data.

#### Defined in

packages/contracts/src/pool/pool.contract.ts:358

***

### encodeCollectProtocol()

> **encodeCollectProtocol**(`recipient`, `amount0Requested`, `amount1Requested`): `string`

Encodes the function data for collecting protocol fees from the pool.

#### Parameters

• **recipient**: `string`

The recipient of the fees.

• **amount0Requested**: `BigNumberish`

The requested amount of token0.

• **amount1Requested**: `BigNumberish`

The requested amount of token1.

#### Returns

`string`

The encoded function data.

#### Defined in

packages/contracts/src/pool/pool.contract.ts:403

***

### encodeFlash()

> **encodeFlash**(`recipient`, `amount0`, `amount1`, `data`): `string`

Encodes the function data for flash loans.

#### Parameters

• **recipient**: `string`

The recipient of the flash loan.

• **amount0**: `BigNumberish`

The amount of token0.

• **amount1**: `BigNumberish`

The amount of token1.

• **data**: `BytesLike`

Any additional data required for the flash loan.

#### Returns

`string`

The encoded function data.

#### Defined in

packages/contracts/src/pool/pool.contract.ts:521

***

### encodeIncreaseObservationCardinalityNext()

> **encodeIncreaseObservationCardinalityNext**(`observationCardinalityNext`): `string`

Encodes the function data to increase the observation cardinality.

#### Parameters

• **observationCardinalityNext**: `BigNumberish`

The next observation cardinality.

#### Returns

`string`

The encoded function data.

#### Defined in

packages/contracts/src/pool/pool.contract.ts:551

***

### encodeInitialize()

> **encodeInitialize**(`sqrtPriceX96`, `tick`): `string`

Encodes the function data for pool initialization.

#### Parameters

• **sqrtPriceX96**: `BigNumberish`

The square root price.

• **tick**: `BigNumberish`

The tick to initialize at.

#### Returns

`string`

The encoded function data.

#### Defined in

packages/contracts/src/pool/pool.contract.ts:581

***

### encodeMint()

> **encodeMint**(`recipient`, `tickLower`, `tickUpper`, `amount`, `data`): `string`

Encodes the function data for minting liquidity.

#### Parameters

• **recipient**: `string`

The address of the recipient.

• **tickLower**: `BigNumberish`

The lower tick of the position.

• **tickUpper**: `BigNumberish`

The upper tick of the position.

• **amount**: `BigNumberish`

The amount of liquidity to mint.

• **data**: `BytesLike`

Additional data for the mint transaction.

#### Returns

`string`

The encoded function data.

#### Defined in

packages/contracts/src/pool/pool.contract.ts:663

***

### encodeSetFeeProtocol()

> **encodeSetFeeProtocol**(`feeProtocol0`, `feeProtocol1`): `string`

Encodes the function data to set the fee protocol.

#### Parameters

• **feeProtocol0**: `BigNumberish`

The fee protocol for token0.

• **feeProtocol1**: `BigNumberish`

The fee protocol for token1.

#### Returns

`string`

The encoded function data.

#### Defined in

packages/contracts/src/pool/pool.contract.ts:801

***

### encodeSwap()

> **encodeSwap**(`recipient`, `zeroForOne`, `amountSpecified`, `sqrtPriceLimitX96`, `data`): `string`

Encodes the function data for a swap.

#### Parameters

• **recipient**: `string`

The recipient address.

• **zeroForOne**: `boolean`

Boolean indicating the direction of the swap.

• **amountSpecified**: `BigNumberish`

The specified amount for the swap.

• **sqrtPriceLimitX96**: `BigNumberish`

The price limit for the swap.

• **data**: `BytesLike`

Additional swap data.

#### Returns

`string`

The encoded function data.

#### Defined in

packages/contracts/src/pool/pool.contract.ts:899

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

submodules/ethereum-multicall/packages/provider/dist/esm/multicall-provider-base.d.ts:31

***

### factory()

> **factory**(): `Promise`\<`string`\>

Returns the factory address.

#### Returns

`Promise`\<`string`\>

The factory address.

#### Implementation of

`UniswapPoolV3Types.Contract.factory`

#### Defined in

packages/contracts/src/pool/pool.contract.ts:419

***

### factoryCallContext()

> **factoryCallContext**(): `MethodCall`\<`Contract`, `"factory"`\>

Returns the call context for the `factory` method.

#### Returns

`MethodCall`\<`Contract`, `"factory"`\>

The call context.

#### Defined in

packages/contracts/src/pool/pool.contract.ts:427

***

### fee()

> **fee**(): `Promise`\<`number`\>

Returns the fee for the pool.

#### Returns

`Promise`\<`number`\>

The fee percentage for the pool.

#### Implementation of

`UniswapPoolV3Types.Contract.fee`

#### Defined in

packages/contracts/src/pool/pool.contract.ts:438

***

### feeCallContext()

> **feeCallContext**(): `MethodCall`\<`Contract`, `"fee"`\>

Returns the call context for the `fee` method.

#### Returns

`MethodCall`\<`Contract`, `"fee"`\>

The call context.

#### Defined in

packages/contracts/src/pool/pool.contract.ts:446

***

### feeGrowthGlobal0X128()

> **feeGrowthGlobal0X128**(): `Promise`\<`BigNumber`\>

Returns the global fee growth of token0.

#### Returns

`Promise`\<`BigNumber`\>

The fee growth of token0.

#### Implementation of

`UniswapPoolV3Types.Contract.feeGrowthGlobal0X128`

#### Defined in

packages/contracts/src/pool/pool.contract.ts:454

***

### feeGrowthGlobal0X128CallContext()

> **feeGrowthGlobal0X128CallContext**(): `MethodCall`\<`Contract`, `"feeGrowthGlobal0X128"`\>

Returns the call context for the `feeGrowthGlobal0X128` method.

#### Returns

`MethodCall`\<`Contract`, `"feeGrowthGlobal0X128"`\>

The call context.

#### Defined in

packages/contracts/src/pool/pool.contract.ts:462

***

### feeGrowthGlobal1X128()

> **feeGrowthGlobal1X128**(): `Promise`\<`BigNumber`\>

Returns the global fee growth of token1.

#### Returns

`Promise`\<`BigNumber`\>

The fee growth of token1.

#### Implementation of

`UniswapPoolV3Types.Contract.feeGrowthGlobal1X128`

#### Defined in

packages/contracts/src/pool/pool.contract.ts:473

***

### feeGrowthGlobal1X128CallContext()

> **feeGrowthGlobal1X128CallContext**(): `MethodCall`\<`Contract`, `"feeGrowthGlobal1X128"`\>

Returns the call context for the `feeGrowthGlobal1X128` method.

#### Returns

`MethodCall`\<`Contract`, `"feeGrowthGlobal1X128"`\>

The call context.

#### Defined in

packages/contracts/src/pool/pool.contract.ts:481

***

### flash()

> **flash**(`recipient`, `amount0`, `amount1`, `data`, `overrides`?): `Promise`\<`ContractTransaction`\>

Flash loans for token0 and token1.

#### Parameters

• **recipient**: `string`

The recipient of the flash loan.

• **amount0**: `BigNumberish`

The amount of token0.

• **amount1**: `BigNumberish`

The amount of token1.

• **data**: `BytesLike`

Any additional data required for the flash loan.

• **overrides?**: `ContractTransactionOverrides`

Optional transaction overrides.

#### Returns

`Promise`\<`ContractTransaction`\>

The contract transaction.

#### Implementation of

`UniswapPoolV3Types.Contract.flash`

#### Defined in

packages/contracts/src/pool/pool.contract.ts:497

***

### increaseObservationCardinalityNext()

> **increaseObservationCardinalityNext**(`observationCardinalityNext`, `overrides`?): `Promise`\<`ContractTransaction`\>

Increases the observation cardinality for the pool.

#### Parameters

• **observationCardinalityNext**: `BigNumberish`

The next observation cardinality.

• **overrides?**: `ContractTransactionOverrides`

Optional transaction overrides.

#### Returns

`Promise`\<`ContractTransaction`\>

The contract transaction.

#### Implementation of

`UniswapPoolV3Types.Contract.increaseObservationCardinalityNext`

#### Defined in

packages/contracts/src/pool/pool.contract.ts:536

***

### initialize()

> **initialize**(`sqrtPriceX96`, `overrides`?): `Promise`\<`ContractTransaction`\>

Initializes the pool with the sqrtPriceX96 and tick.

#### Parameters

• **sqrtPriceX96**: `BigNumberish`

The square root price.

• **overrides?**: `ContractTransactionOverrides`

Optional transaction overrides.

#### Returns

`Promise`\<`ContractTransaction`\>

The contract transaction.

#### Implementation of

`UniswapPoolV3Types.Contract.initialize`

#### Defined in

packages/contracts/src/pool/pool.contract.ts:565

***

### liquidity()

> **liquidity**(): `Promise`\<`BigNumber`\>

Fetches the liquidity of the pool.

#### Returns

`Promise`\<`BigNumber`\>

The current liquidity.

#### Implementation of

`UniswapPoolV3Types.Contract.liquidity`

#### Defined in

packages/contracts/src/pool/pool.contract.ts:592

***

### liquidityCallContext()

> **liquidityCallContext**(): `MethodCall`\<`Contract`, `"liquidity"`\>

Fetches the call context for the `liquidity` method.

#### Returns

`MethodCall`\<`Contract`, `"liquidity"`\>

The call context.

#### Defined in

packages/contracts/src/pool/pool.contract.ts:600

***

### maxLiquidityPerTick()

> **maxLiquidityPerTick**(): `Promise`\<`BigNumber`\>

Fetches the maximum liquidity per tick.

#### Returns

`Promise`\<`BigNumber`\>

The maximum liquidity per tick.

#### Implementation of

`UniswapPoolV3Types.Contract.maxLiquidityPerTick`

#### Defined in

packages/contracts/src/pool/pool.contract.ts:611

***

### maxLiquidityPerTickCallContext()

> **maxLiquidityPerTickCallContext**(): `MethodCall`\<`Contract`, `"maxLiquidityPerTick"`\>

Fetches the call context for the `maxLiquidityPerTick` method.

#### Returns

`MethodCall`\<`Contract`, `"maxLiquidityPerTick"`\>

The call context.

#### Defined in

packages/contracts/src/pool/pool.contract.ts:619

***

### mint()

> **mint**(`recipient`, `tickLower`, `tickUpper`, `amount`, `data`, `overrides`?): `Promise`\<`ContractTransaction`\>

Mints liquidity for the given recipient, tick range, and amount.

#### Parameters

• **recipient**: `string`

The address of the recipient.

• **tickLower**: `BigNumberish`

The lower tick of the position.

• **tickUpper**: `BigNumberish`

The upper tick of the position.

• **amount**: `BigNumberish`

The amount of liquidity to mint.

• **data**: `BytesLike`

Additional data for the mint transaction.

• **overrides?**: `ContractTransactionOverrides`

Optional transaction overrides.

#### Returns

`Promise`\<`ContractTransaction`\>

The contract transaction.

#### Implementation of

`UniswapPoolV3Types.Contract.mint`

#### Defined in

packages/contracts/src/pool/pool.contract.ts:636

***

### observations()

> **observations**(`parameter0`): `Promise`\<`ObservationsResponse`\>

Fetches the observation for a given index.

#### Parameters

• **parameter0**: `BigNumberish`

The observation index.

#### Returns

`Promise`\<`ObservationsResponse`\>

The observation data.

#### Implementation of

`UniswapPoolV3Types.Contract.observations`

#### Defined in

packages/contracts/src/pool/pool.contract.ts:684

***

### observationsCallContext()

> **observationsCallContext**(`parameter0`): `MethodCall`\<`Contract`, `"observations"`\>

Fetches the call context for the `observations` method.

#### Parameters

• **parameter0**: `BigNumberish`

The observation index.

#### Returns

`MethodCall`\<`Contract`, `"observations"`\>

The call context.

#### Defined in

packages/contracts/src/pool/pool.contract.ts:698

***

### observe()

> **observe**(`secondsAgos`): `Promise`\<`ObserveResponse`\>

Observes past oracles at different times.

#### Parameters

• **secondsAgos**: `BigNumberish`[]

Array of seconds ago to query.

#### Returns

`Promise`\<`ObserveResponse`\>

The observation result.

#### Implementation of

`UniswapPoolV3Types.Contract.observe`

#### Defined in

packages/contracts/src/pool/pool.contract.ts:709

***

### observeCallContext()

> **observeCallContext**(`secondsAgos`): `MethodCall`\<`Contract`, `"observe"`\>

Fetches the call context for the `observe` method.

#### Parameters

• **secondsAgos**: `BigNumberish`[]

Array of seconds ago to query.

#### Returns

`MethodCall`\<`Contract`, `"observe"`\>

The call context.

#### Defined in

packages/contracts/src/pool/pool.contract.ts:723

***

### positions()

> **positions**(`parameter0`): `Promise`\<`PositionsResponse`\>

Fetches the position data for a given position key.

#### Parameters

• **parameter0**: `BytesLike`

The position key.

#### Returns

`Promise`\<`PositionsResponse`\>

The position data.

#### Implementation of

`UniswapPoolV3Types.Contract.positions`

#### Defined in

packages/contracts/src/pool/pool.contract.ts:734

***

### positionsCallContext()

> **positionsCallContext**(`parameter0`): `MethodCall`\<`Contract`, `"positions"`\>

Fetches the call context for the `positions` method.

#### Parameters

• **parameter0**: `BytesLike`

The position key.

#### Returns

`MethodCall`\<`Contract`, `"positions"`\>

The call context.

#### Defined in

packages/contracts/src/pool/pool.contract.ts:748

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

packages/contracts/src/pool/pool.contract.ts:178

***

### prepareContractContext()

> `protected` **prepareContractContext**\<`TCalls`, `TCustomData`\>(`calls`, `customData`?): `ContractContext`\<`Contract`, `TCalls`, `TCustomData`\>

Helper function to dynamically prepare a contract context based on custom or default method names.

#### Type Parameters

• **TCalls** *extends* `Record`\<`string`, `MethodCall`\<`Contract`, `"swap"`\> \| `MethodCall`\<`Contract`, `"initialize"`\> \| `MethodCall`\<`Contract`, `"factory"`\> \| `MethodCall`\<`Contract`, `"burn"`\> \| `MethodCall`\<`Contract`, `"mint"`\> \| `MethodCall`\<`Contract`, `"token0"`\> \| `MethodCall`\<`Contract`, `"token1"`\> \| `MethodCall`\<`Contract`, `"collect"`\> \| `MethodCall`\<`Contract`, `"collectProtocol"`\> \| `MethodCall`\<`Contract`, `"fee"`\> \| `MethodCall`\<`Contract`, `"feeGrowthGlobal0X128"`\> \| `MethodCall`\<`Contract`, `"feeGrowthGlobal1X128"`\> \| `MethodCall`\<`Contract`, `"flash"`\> \| `MethodCall`\<`Contract`, `"increaseObservationCardinalityNext"`\> \| `MethodCall`\<`Contract`, `"liquidity"`\> \| `MethodCall`\<`Contract`, `"maxLiquidityPerTick"`\> \| `MethodCall`\<`Contract`, `"observations"`\> \| `MethodCall`\<`Contract`, `"observe"`\> \| `MethodCall`\<`Contract`, `"positions"`\> \| `MethodCall`\<`Contract`, `"protocolFees"`\> \| `MethodCall`\<`Contract`, `"setFeeProtocol"`\> \| `MethodCall`\<`Contract`, `"slot0"`\> \| `MethodCall`\<`Contract`, `"snapshotCumulativesInside"`\> \| `MethodCall`\<`Contract`, `"tickBitmap"`\> \| `MethodCall`\<`Contract`, `"tickSpacing"`\> \| `MethodCall`\<`Contract`, `"ticks"`\>\>

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

packages/contracts/src/pool/pool.contract.ts:207

***

### protocolFees()

> **protocolFees**(): `Promise`\<`ProtocolFeesResponse`\>

Fetches the protocol fees.

#### Returns

`Promise`\<`ProtocolFeesResponse`\>

The protocol fees for token0 and token1.

#### Implementation of

`UniswapPoolV3Types.Contract.protocolFees`

#### Defined in

packages/contracts/src/pool/pool.contract.ts:758

***

### protocolFeesCallContext()

> **protocolFeesCallContext**(): `MethodCall`\<`Contract`, `"protocolFees"`\>

Fetches the call context for the `protocolFees` method.

#### Returns

`MethodCall`\<`Contract`, `"protocolFees"`\>

The call context.

#### Defined in

packages/contracts/src/pool/pool.contract.ts:769

***

### setFeeProtocol()

> **setFeeProtocol**(`feeProtocol0`, `feeProtocol1`, `overrides`?): `Promise`\<`ContractTransaction`\>

Sets the fee protocol for the pool.

#### Parameters

• **feeProtocol0**: `BigNumberish`

The fee protocol for token0.

• **feeProtocol1**: `BigNumberish`

The fee protocol for token1.

• **overrides?**: `ContractTransactionOverrides`

Optional transaction overrides.

#### Returns

`Promise`\<`ContractTransaction`\>

The contract transaction.

#### Implementation of

`UniswapPoolV3Types.Contract.setFeeProtocol`

#### Defined in

packages/contracts/src/pool/pool.contract.ts:783

***

### slot0()

> **slot0**(): `Promise`\<`Slot0Response`\>

Fetches the slot0 data (price, tick, observation, and other pool details).

#### Returns

`Promise`\<`Slot0Response`\>

The slot0 data.

#### Implementation of

`UniswapPoolV3Types.Contract.slot0`

#### Defined in

packages/contracts/src/pool/pool.contract.ts:815

***

### slot0CallContext()

> **slot0CallContext**(): `MethodCall`\<`Contract`, `"slot0"`\>

Fetches the call context for the `slot0` method.

#### Returns

`MethodCall`\<`Contract`, `"slot0"`\>

The call context.

#### Defined in

packages/contracts/src/pool/pool.contract.ts:826

***

### snapshotCumulativesInside()

> **snapshotCumulativesInside**(`tickLower`, `tickUpper`): `Promise`\<`SnapshotCumulativesInsideResponse`\>

Fetches cumulative data inside a given tick range.

#### Parameters

• **tickLower**: `BigNumberish`

The lower tick of the range.

• **tickUpper**: `BigNumberish`

The upper tick of the range.

#### Returns

`Promise`\<`SnapshotCumulativesInsideResponse`\>

The cumulative snapshot inside the range.

#### Implementation of

`UniswapPoolV3Types.Contract.snapshotCumulativesInside`

#### Defined in

packages/contracts/src/pool/pool.contract.ts:836

***

### snapshotCumulativesInsideCallContext()

> **snapshotCumulativesInsideCallContext**(`tickLower`, `tickUpper`): `MethodCall`\<`Contract`, `"snapshotCumulativesInside"`\>

Fetches the call context for the `snapshotCumulativesInside` method.

#### Parameters

• **tickLower**: `BigNumberish`

The lower tick of the range.

• **tickUpper**: `BigNumberish`

The upper tick of the range.

#### Returns

`MethodCall`\<`Contract`, `"snapshotCumulativesInside"`\>

The call context.

#### Defined in

packages/contracts/src/pool/pool.contract.ts:852

***

### swap()

> **swap**(`recipient`, `zeroForOne`, `amountSpecified`, `sqrtPriceLimitX96`, `data`, `overrides`?): `Promise`\<`ContractTransaction`\>

Swaps tokens in the pool.

#### Parameters

• **recipient**: `string`

The recipient address.

• **zeroForOne**: `boolean`

Boolean indicating the direction of the swap.

• **amountSpecified**: `BigNumberish`

The specified amount for the swap.

• **sqrtPriceLimitX96**: `BigNumberish`

The price limit for the swap.

• **data**: `BytesLike`

Additional swap data.

• **overrides?**: `ContractTransactionOverrides`

Optional transaction overrides.

#### Returns

`Promise`\<`ContractTransaction`\>

The contract transaction.

#### Implementation of

`UniswapPoolV3Types.Contract.swap`

#### Defined in

packages/contracts/src/pool/pool.contract.ts:872

***

### tickBitmap()

> **tickBitmap**(`parameter0`): `Promise`\<`BigNumber`\>

Fetches the tick bitmap for a given position.

#### Parameters

• **parameter0**: `BigNumberish`

The position of the tick bitmap.

#### Returns

`Promise`\<`BigNumber`\>

The tick bitmap value.

#### Implementation of

`UniswapPoolV3Types.Contract.tickBitmap`

#### Defined in

packages/contracts/src/pool/pool.contract.ts:920

***

### tickBitmapCallContext()

> **tickBitmapCallContext**(`parameter0`): `MethodCall`\<`Contract`, `"tickBitmap"`\>

Fetches the tick bitmap for a given position using call context.

#### Parameters

• **parameter0**: `BigNumberish`

The position of the tick bitmap.

#### Returns

`MethodCall`\<`Contract`, `"tickBitmap"`\>

The CallContext object to be used with Multicall.

#### Defined in

packages/contracts/src/pool/pool.contract.ts:929

***

### tickSpacing()

> **tickSpacing**(): `Promise`\<`number`\>

Fetches the tick spacing of the pool.

#### Returns

`Promise`\<`number`\>

The tick spacing value.

#### Implementation of

`UniswapPoolV3Types.Contract.tickSpacing`

#### Defined in

packages/contracts/src/pool/pool.contract.ts:939

***

### tickSpacingCallContext()

> **tickSpacingCallContext**(): `MethodCall`\<`Contract`, `"tickSpacing"`\>

Fetches the call context for the `tickSpacing` method.

#### Returns

`MethodCall`\<`Contract`, `"tickSpacing"`\>

The call context.

#### Defined in

packages/contracts/src/pool/pool.contract.ts:947

***

### ticks()

> **ticks**(`parameter0`): `Promise`\<`TicksResponse`\>

Fetches the tick data for a specific tick.

#### Parameters

• **parameter0**: `BigNumberish`

The tick index.

#### Returns

`Promise`\<`TicksResponse`\>

The tick data.

#### Implementation of

`UniswapPoolV3Types.Contract.ticks`

#### Defined in

packages/contracts/src/pool/pool.contract.ts:959

***

### ticksCallContext()

> **ticksCallContext**(`parameter0`): `MethodCall`\<`Contract`, `"ticks"`\>

Fetches the call context for the `ticks` method.

#### Parameters

• **parameter0**: `BigNumberish`

The tick index.

#### Returns

`MethodCall`\<`Contract`, `"ticks"`\>

The call context.

#### Defined in

packages/contracts/src/pool/pool.contract.ts:972

***

### token0()

> **token0**(): `Promise`\<`string`\>

Fetches the address of token0.

#### Returns

`Promise`\<`string`\>

The address of token0.

#### Implementation of

`UniswapPoolV3Types.Contract.token0`

#### Defined in

packages/contracts/src/pool/pool.contract.ts:982

***

### token0CallContext()

> **token0CallContext**(): `MethodCall`\<`Contract`, `"token0"`\>

Fetches the call context for the `token0` method.

#### Returns

`MethodCall`\<`Contract`, `"token0"`\>

The call context.

#### Defined in

packages/contracts/src/pool/pool.contract.ts:990

***

### token1()

> **token1**(): `Promise`\<`string`\>

Fetches the address of token1.

#### Returns

`Promise`\<`string`\>

The address of token1.

#### Implementation of

`UniswapPoolV3Types.Contract.token1`

#### Defined in

packages/contracts/src/pool/pool.contract.ts:1001

***

### token1CallContext()

> **token1CallContext**(): `MethodCall`\<`Contract`, `"token1"`\>

Fetches the call context for the `token1` method.

#### Returns

`MethodCall`\<`Contract`, `"token1"`\>

The call context.

#### Defined in

packages/contracts/src/pool/pool.contract.ts:1009
