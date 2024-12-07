import type { EthersContractContextV5 } from '@ethereum-abi-types-generator/converter-typescript'
import type {
  ContractTransaction,
  BytesLike,
  BigNumber,
  BigNumberish,
} from 'ethers'

import type {
  EventFilter,
  ContractTransactionOverrides,
  ContractCallOverrides,
} from './common.types'

export type ContractContext = EthersContractContextV5<
  Contract,
  MethodNames,
  EventsContext,
  Events
>
export type Events =
  | 'Burn'
  | 'Collect'
  | 'CollectProtocol'
  | 'Flash'
  | 'IncreaseObservationCardinalityNext'
  | 'Initialize'
  | 'Mint'
  | 'SetFeeProtocol'
  | 'Swap'
export interface EventsContext {
  Burn(
    owner: string,
    tickLower: BigNumberish,
    tickUpper: BigNumberish,
    amount: BigNumberish,
    amount0: BigNumberish,
    amount1: BigNumberish,
  ): EventFilter
  Collect(
    owner: string,
    recipient: string,
    tickLower: BigNumberish,
    tickUpper: BigNumberish,
    amount0: BigNumberish,
    amount1: BigNumberish,
  ): EventFilter
  CollectProtocol(
    sender: string,
    recipient: string,
    amount0: BigNumberish,
    amount1: BigNumberish,
  ): EventFilter
  Flash(
    sender: string,
    recipient: string,
    amount0: BigNumberish,
    amount1: BigNumberish,
    paid0: BigNumberish,
    paid1: BigNumberish,
  ): EventFilter
  IncreaseObservationCardinalityNext(
    observationCardinalityNextOld: BigNumberish,
    observationCardinalityNextNew: BigNumberish,
  ): EventFilter
  Initialize(sqrtPriceX96: BigNumberish, tick: BigNumberish): EventFilter
  Mint(
    sender: string,
    owner: string,
    tickLower: BigNumberish,
    tickUpper: BigNumberish,
    amount: BigNumberish,
    amount0: BigNumberish,
    amount1: BigNumberish,
  ): EventFilter
  SetFeeProtocol(
    feeProtocol0Old: BigNumberish,
    feeProtocol1Old: BigNumberish,
    feeProtocol0New: BigNumberish,
    feeProtocol1New: BigNumberish,
  ): EventFilter
  Swap(
    sender: string,
    recipient: string,
    amount0: BigNumberish,
    amount1: BigNumberish,
    sqrtPriceX96: BigNumberish,
    liquidity: BigNumberish,
    tick: BigNumberish,
  ): EventFilter
}
export type MethodNames =
  | 'burn'
  | 'collect'
  | 'collectProtocol'
  | 'factory'
  | 'fee'
  | 'feeGrowthGlobal0X128'
  | 'feeGrowthGlobal1X128'
  | 'flash'
  | 'increaseObservationCardinalityNext'
  | 'initialize'
  | 'liquidity'
  | 'maxLiquidityPerTick'
  | 'mint'
  | 'observations'
  | 'observe'
  | 'positions'
  | 'protocolFees'
  | 'setFeeProtocol'
  | 'slot0'
  | 'snapshotCumulativesInside'
  | 'swap'
  | 'tickBitmap'
  | 'tickSpacing'
  | 'ticks'
  | 'token0'
  | 'token1'
export type MethodNameMap = {
  [key in MethodNames]: string
}
export interface BurnEventEmittedResponse {
  owner: string
  tickLower: BigNumberish
  tickUpper: BigNumberish
  amount: BigNumberish
  amount0: BigNumberish
  amount1: BigNumberish
}
export interface CollectEventEmittedResponse {
  owner: string
  recipient: string
  tickLower: BigNumberish
  tickUpper: BigNumberish
  amount0: BigNumberish
  amount1: BigNumberish
}
export interface CollectProtocolEventEmittedResponse {
  sender: string
  recipient: string
  amount0: BigNumberish
  amount1: BigNumberish
}
export interface FlashEventEmittedResponse {
  sender: string
  recipient: string
  amount0: BigNumberish
  amount1: BigNumberish
  paid0: BigNumberish
  paid1: BigNumberish
}
export interface IncreaseObservationCardinalityNextEventEmittedResponse {
  observationCardinalityNextOld: BigNumberish
  observationCardinalityNextNew: BigNumberish
}
export interface InitializeEventEmittedResponse {
  sqrtPriceX96: BigNumberish
  tick: BigNumberish
}
export interface MintEventEmittedResponse {
  sender: string
  owner: string
  tickLower: BigNumberish
  tickUpper: BigNumberish
  amount: BigNumberish
  amount0: BigNumberish
  amount1: BigNumberish
}
export interface SetFeeProtocolEventEmittedResponse {
  feeProtocol0Old: BigNumberish
  feeProtocol1Old: BigNumberish
  feeProtocol0New: BigNumberish
  feeProtocol1New: BigNumberish
}
export interface SwapEventEmittedResponse {
  sender: string
  recipient: string
  amount0: BigNumberish
  amount1: BigNumberish
  sqrtPriceX96: BigNumberish
  liquidity: BigNumberish
  tick: BigNumberish
}
export interface ObservationsResponse {
  blockTimestamp: number
  0: number
  tickCumulative: BigNumber
  1: BigNumber
  secondsPerLiquidityCumulativeX128: BigNumber
  2: BigNumber
  initialized: boolean
  3: boolean
  length: 4
}
export interface ObserveResponse {
  tickCumulatives: BigNumber[]
  0: BigNumber[]
  secondsPerLiquidityCumulativeX128s: BigNumber[]
  1: BigNumber[]
  length: 2
}
export interface PositionsResponse {
  liquidity: BigNumber
  0: BigNumber
  feeGrowthInside0LastX128: BigNumber
  1: BigNumber
  feeGrowthInside1LastX128: BigNumber
  2: BigNumber
  tokensOwed0: BigNumber
  3: BigNumber
  tokensOwed1: BigNumber
  4: BigNumber
  length: 5
}
export interface ProtocolFeesResponse {
  token0: BigNumber
  0: BigNumber
  token1: BigNumber
  1: BigNumber
  length: 2
}
export interface Slot0Response {
  sqrtPriceX96: BigNumber
  0: BigNumber
  tick: number
  1: number
  observationIndex: number
  2: number
  observationCardinality: number
  3: number
  observationCardinalityNext: number
  4: number
  feeProtocol: number
  5: number
  unlocked: boolean
  6: boolean
  length: 7
}
export interface SnapshotCumulativesInsideResponse {
  tickCumulativeInside: BigNumber
  0: BigNumber
  secondsPerLiquidityInsideX128: BigNumber
  1: BigNumber
  secondsInside: number
  2: number
  length: 3
}
export interface TicksResponse {
  liquidityGross: BigNumber
  0: BigNumber
  liquidityNet: BigNumber
  1: BigNumber
  feeGrowthOutside0X128: BigNumber
  2: BigNumber
  feeGrowthOutside1X128: BigNumber
  3: BigNumber
  tickCumulativeOutside: BigNumber
  4: BigNumber
  secondsPerLiquidityOutsideX128: BigNumber
  5: BigNumber
  secondsOutside: number
  6: number
  initialized: boolean
  7: boolean
  length: 8
}
export interface Contract {
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param tickLower Type: int24, Indexed: false
   * @param tickUpper Type: int24, Indexed: false
   * @param amount Type: uint128, Indexed: false
   */
  burn(
    tickLower: BigNumberish,
    tickUpper: BigNumberish,
    amount: BigNumberish,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param recipient Type: address, Indexed: false
   * @param tickLower Type: int24, Indexed: false
   * @param tickUpper Type: int24, Indexed: false
   * @param amount0Requested Type: uint128, Indexed: false
   * @param amount1Requested Type: uint128, Indexed: false
   */
  collect(
    recipient: string,
    tickLower: BigNumberish,
    tickUpper: BigNumberish,
    amount0Requested: BigNumberish,
    amount1Requested: BigNumberish,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param recipient Type: address, Indexed: false
   * @param amount0Requested Type: uint128, Indexed: false
   * @param amount1Requested Type: uint128, Indexed: false
   */
  collectProtocol(
    recipient: string,
    amount0Requested: BigNumberish,
    amount1Requested: BigNumberish,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  factory(overrides?: ContractCallOverrides): Promise<string>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  fee(overrides?: ContractCallOverrides): Promise<number>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  feeGrowthGlobal0X128(overrides?: ContractCallOverrides): Promise<BigNumber>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  feeGrowthGlobal1X128(overrides?: ContractCallOverrides): Promise<BigNumber>
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param recipient Type: address, Indexed: false
   * @param amount0 Type: uint256, Indexed: false
   * @param amount1 Type: uint256, Indexed: false
   * @param data Type: bytes, Indexed: false
   */
  flash(
    recipient: string,
    amount0: BigNumberish,
    amount1: BigNumberish,
    data: BytesLike,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param observationCardinalityNext Type: uint16, Indexed: false
   */
  increaseObservationCardinalityNext(
    observationCardinalityNext: BigNumberish,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param sqrtPriceX96 Type: uint160, Indexed: false
   */
  initialize(
    sqrtPriceX96: BigNumberish,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  liquidity(overrides?: ContractCallOverrides): Promise<BigNumber>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  maxLiquidityPerTick(overrides?: ContractCallOverrides): Promise<BigNumber>
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param recipient Type: address, Indexed: false
   * @param tickLower Type: int24, Indexed: false
   * @param tickUpper Type: int24, Indexed: false
   * @param amount Type: uint128, Indexed: false
   * @param data Type: bytes, Indexed: false
   */
  mint(
    recipient: string,
    tickLower: BigNumberish,
    tickUpper: BigNumberish,
    amount: BigNumberish,
    data: BytesLike,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: uint256, Indexed: false
   */
  observations(
    parameter0: BigNumberish,
    overrides?: ContractCallOverrides,
  ): Promise<ObservationsResponse>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param secondsAgos Type: uint32[], Indexed: false
   */
  observe(
    secondsAgos: BigNumberish[],
    overrides?: ContractCallOverrides,
  ): Promise<ObserveResponse>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: bytes32, Indexed: false
   */
  positions(
    parameter0: BytesLike,
    overrides?: ContractCallOverrides,
  ): Promise<PositionsResponse>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  protocolFees(overrides?: ContractCallOverrides): Promise<ProtocolFeesResponse>
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param feeProtocol0 Type: uint8, Indexed: false
   * @param feeProtocol1 Type: uint8, Indexed: false
   */
  setFeeProtocol(
    feeProtocol0: BigNumberish,
    feeProtocol1: BigNumberish,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  slot0(overrides?: ContractCallOverrides): Promise<Slot0Response>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param tickLower Type: int24, Indexed: false
   * @param tickUpper Type: int24, Indexed: false
   */
  snapshotCumulativesInside(
    tickLower: BigNumberish,
    tickUpper: BigNumberish,
    overrides?: ContractCallOverrides,
  ): Promise<SnapshotCumulativesInsideResponse>
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param recipient Type: address, Indexed: false
   * @param zeroForOne Type: bool, Indexed: false
   * @param amountSpecified Type: int256, Indexed: false
   * @param sqrtPriceLimitX96 Type: uint160, Indexed: false
   * @param data Type: bytes, Indexed: false
   */
  swap(
    recipient: string,
    zeroForOne: boolean,
    amountSpecified: BigNumberish,
    sqrtPriceLimitX96: BigNumberish,
    data: BytesLike,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: int16, Indexed: false
   */
  tickBitmap(
    parameter0: BigNumberish,
    overrides?: ContractCallOverrides,
  ): Promise<BigNumber>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  tickSpacing(overrides?: ContractCallOverrides): Promise<number>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: int24, Indexed: false
   */
  ticks(
    parameter0: BigNumberish,
    overrides?: ContractCallOverrides,
  ): Promise<TicksResponse>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  token0(overrides?: ContractCallOverrides): Promise<string>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  token1(overrides?: ContractCallOverrides): Promise<string>
}
