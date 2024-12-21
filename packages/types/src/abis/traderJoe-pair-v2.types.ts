import type { EthersContractContextV5 } from '@abi-toolkit/converter-typescript'
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
  | 'ApprovalForAll'
  | 'CollectedProtocolFees'
  | 'CompositionFees'
  | 'DepositedToBins'
  | 'FlashLoan'
  | 'ForcedDecay'
  | 'HooksParametersSet'
  | 'Initialized'
  | 'OracleLengthIncreased'
  | 'StaticFeeParametersSet'
  | 'Swap'
  | 'TransferBatch'
  | 'WithdrawnFromBins'
export interface EventsContext {
  ApprovalForAll(
    account: string,
    sender: string,
    approved: boolean,
  ): EventFilter
  CollectedProtocolFees(
    feeRecipient: string,
    protocolFees: BytesLike,
  ): EventFilter
  CompositionFees(
    sender: string,
    id: BigNumberish,
    totalFees: BytesLike,
    protocolFees: BytesLike,
  ): EventFilter
  DepositedToBins(
    sender: string,
    to: string,
    ids: BigNumberish[],
    amounts: BytesLike[],
  ): EventFilter
  FlashLoan(
    sender: string,
    receiver: string,
    activeId: BigNumberish,
    amounts: BytesLike,
    totalFees: BytesLike,
    protocolFees: BytesLike,
  ): EventFilter
  ForcedDecay(
    sender: string,
    idReference: BigNumberish,
    volatilityReference: BigNumberish,
  ): EventFilter
  HooksParametersSet(sender: string, hooksParameters: BytesLike): EventFilter
  Initialized(version: BigNumberish): EventFilter
  OracleLengthIncreased(sender: string, oracleLength: BigNumberish): EventFilter
  StaticFeeParametersSet(
    sender: string,
    baseFactor: BigNumberish,
    filterPeriod: BigNumberish,
    decayPeriod: BigNumberish,
    reductionFactor: BigNumberish,
    variableFeeControl: BigNumberish,
    protocolShare: BigNumberish,
    maxVolatilityAccumulator: BigNumberish,
  ): EventFilter
  Swap(
    sender: string,
    to: string,
    id: BigNumberish,
    amountsIn: BytesLike,
    amountsOut: BytesLike,
    volatilityAccumulator: BigNumberish,
    totalFees: BytesLike,
    protocolFees: BytesLike,
  ): EventFilter
  TransferBatch(
    sender: string,
    from: string,
    to: string,
    ids: BigNumberish[],
    amounts: BigNumberish[],
  ): EventFilter
  WithdrawnFromBins(
    sender: string,
    to: string,
    ids: BigNumberish[],
    amounts: BytesLike[],
  ): EventFilter
}
export type MethodNames =
  | 'approveForAll'
  | 'balanceOf'
  | 'balanceOfBatch'
  | 'batchTransferFrom'
  | 'burn'
  | 'collectProtocolFees'
  | 'flashLoan'
  | 'forceDecay'
  | 'getActiveId'
  | 'getBin'
  | 'getBinStep'
  | 'getFactory'
  | 'getIdFromPrice'
  | 'getLBHooksParameters'
  | 'getNextNonEmptyBin'
  | 'getOracleParameters'
  | 'getOracleSampleAt'
  | 'getPriceFromId'
  | 'getProtocolFees'
  | 'getReserves'
  | 'getStaticFeeParameters'
  | 'getSwapIn'
  | 'getSwapOut'
  | 'getTokenX'
  | 'getTokenY'
  | 'getVariableFeeParameters'
  | 'implementation'
  | 'increaseOracleLength'
  | 'initialize'
  | 'isApprovedForAll'
  | 'mint'
  | 'name'
  | 'setHooksParameters'
  | 'setStaticFeeParameters'
  | 'swap'
  | 'symbol'
  | 'totalSupply'
export type MethodNameMap = {
  [key in MethodNames]: string
}
export interface ApprovalForAllEventEmittedResponse {
  account: string
  sender: string
  approved: boolean
}
export interface CollectedProtocolFeesEventEmittedResponse {
  feeRecipient: string
  protocolFees: BytesLike
}
export interface CompositionFeesEventEmittedResponse {
  sender: string
  id: BigNumberish
  totalFees: BytesLike
  protocolFees: BytesLike
}
export interface DepositedToBinsEventEmittedResponse {
  sender: string
  to: string
  ids: BigNumberish[]
  amounts: BytesLike[]
}
export interface FlashLoanEventEmittedResponse {
  sender: string
  receiver: string
  activeId: BigNumberish
  amounts: BytesLike
  totalFees: BytesLike
  protocolFees: BytesLike
}
export interface ForcedDecayEventEmittedResponse {
  sender: string
  idReference: BigNumberish
  volatilityReference: BigNumberish
}
export interface HooksParametersSetEventEmittedResponse {
  sender: string
  hooksParameters: BytesLike
}
export interface InitializedEventEmittedResponse {
  version: BigNumberish
}
export interface OracleLengthIncreasedEventEmittedResponse {
  sender: string
  oracleLength: BigNumberish
}
export interface StaticFeeParametersSetEventEmittedResponse {
  sender: string
  baseFactor: BigNumberish
  filterPeriod: BigNumberish
  decayPeriod: BigNumberish
  reductionFactor: BigNumberish
  variableFeeControl: BigNumberish
  protocolShare: BigNumberish
  maxVolatilityAccumulator: BigNumberish
}
export interface SwapEventEmittedResponse {
  sender: string
  to: string
  id: BigNumberish
  amountsIn: BytesLike
  amountsOut: BytesLike
  volatilityAccumulator: BigNumberish
  totalFees: BytesLike
  protocolFees: BytesLike
}
export interface TransferBatchEventEmittedResponse {
  sender: string
  from: string
  to: string
  ids: BigNumberish[]
  amounts: BigNumberish[]
}
export interface WithdrawnFromBinsEventEmittedResponse {
  sender: string
  to: string
  ids: BigNumberish[]
  amounts: BytesLike[]
}
export interface GetBinResponse {
  binReserveX: BigNumber
  0: BigNumber
  binReserveY: BigNumber
  1: BigNumber
  length: 2
}
export interface GetOracleParametersResponse {
  sampleLifetime: number
  0: number
  size: number
  1: number
  activeSize: number
  2: number
  lastUpdated: number
  3: number
  firstTimestamp: number
  4: number
  length: 5
}
export interface GetOracleSampleAtResponse {
  cumulativeId: BigNumber
  0: BigNumber
  cumulativeVolatility: BigNumber
  1: BigNumber
  cumulativeBinCrossed: BigNumber
  2: BigNumber
  length: 3
}
export interface GetProtocolFeesResponse {
  protocolFeeX: BigNumber
  0: BigNumber
  protocolFeeY: BigNumber
  1: BigNumber
  length: 2
}
export interface GetReservesResponse {
  reserveX: BigNumber
  0: BigNumber
  reserveY: BigNumber
  1: BigNumber
  length: 2
}
export interface GetStaticFeeParametersResponse {
  baseFactor: number
  0: number
  filterPeriod: number
  1: number
  decayPeriod: number
  2: number
  reductionFactor: number
  3: number
  variableFeeControl: number
  4: number
  protocolShare: number
  5: number
  maxVolatilityAccumulator: number
  6: number
  length: 7
}
export interface GetSwapInResponse {
  amountIn: BigNumber
  0: BigNumber
  amountOutLeft: BigNumber
  1: BigNumber
  fee: BigNumber
  2: BigNumber
  length: 3
}
export interface GetSwapOutResponse {
  amountInLeft: BigNumber
  0: BigNumber
  amountOut: BigNumber
  1: BigNumber
  fee: BigNumber
  2: BigNumber
  length: 3
}
export interface GetVariableFeeParametersResponse {
  volatilityAccumulator: number
  0: number
  volatilityReference: number
  1: number
  idReference: number
  2: number
  timeOfLastUpdate: number
  3: number
  length: 4
}
export interface Contract {
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param spender Type: address, Indexed: false
   * @param approved Type: bool, Indexed: false
   */
  approveForAll(
    spender: string,
    approved: boolean,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param account Type: address, Indexed: false
   * @param id Type: uint256, Indexed: false
   */
  balanceOf(
    account: string,
    id: BigNumberish,
    overrides?: ContractCallOverrides,
  ): Promise<BigNumber>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param accounts Type: address[], Indexed: false
   * @param ids Type: uint256[], Indexed: false
   */
  balanceOfBatch(
    accounts: string[],
    ids: BigNumberish[],
    overrides?: ContractCallOverrides,
  ): Promise<BigNumber[]>
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param from Type: address, Indexed: false
   * @param to Type: address, Indexed: false
   * @param ids Type: uint256[], Indexed: false
   * @param amounts Type: uint256[], Indexed: false
   */
  batchTransferFrom(
    from: string,
    to: string,
    ids: BigNumberish[],
    amounts: BigNumberish[],
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param from Type: address, Indexed: false
   * @param to Type: address, Indexed: false
   * @param ids Type: uint256[], Indexed: false
   * @param amountsToBurn Type: uint256[], Indexed: false
   */
  burn(
    from: string,
    to: string,
    ids: BigNumberish[],
    amountsToBurn: BigNumberish[],
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   */
  collectProtocolFees(
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param receiver Type: address, Indexed: false
   * @param amounts Type: bytes32, Indexed: false
   * @param data Type: bytes, Indexed: false
   */
  flashLoan(
    receiver: string,
    amounts: BytesLike,
    data: BytesLike,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   */
  forceDecay(
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  getActiveId(overrides?: ContractCallOverrides): Promise<number>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param id Type: uint24, Indexed: false
   */
  getBin(
    id: BigNumberish,
    overrides?: ContractCallOverrides,
  ): Promise<GetBinResponse>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: pure
   * Type: function
   */
  getBinStep(overrides?: ContractCallOverrides): Promise<number>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  getFactory(overrides?: ContractCallOverrides): Promise<string>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: pure
   * Type: function
   * @param price Type: uint256, Indexed: false
   */
  getIdFromPrice(
    price: BigNumberish,
    overrides?: ContractCallOverrides,
  ): Promise<number>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  getLBHooksParameters(overrides?: ContractCallOverrides): Promise<string>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param swapForY Type: bool, Indexed: false
   * @param id Type: uint24, Indexed: false
   */
  getNextNonEmptyBin(
    swapForY: boolean,
    id: BigNumberish,
    overrides?: ContractCallOverrides,
  ): Promise<number>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  getOracleParameters(
    overrides?: ContractCallOverrides,
  ): Promise<GetOracleParametersResponse>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param lookupTimestamp Type: uint40, Indexed: false
   */
  getOracleSampleAt(
    lookupTimestamp: BigNumberish,
    overrides?: ContractCallOverrides,
  ): Promise<GetOracleSampleAtResponse>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: pure
   * Type: function
   * @param id Type: uint24, Indexed: false
   */
  getPriceFromId(
    id: BigNumberish,
    overrides?: ContractCallOverrides,
  ): Promise<BigNumber>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  getProtocolFees(
    overrides?: ContractCallOverrides,
  ): Promise<GetProtocolFeesResponse>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  getReserves(overrides?: ContractCallOverrides): Promise<GetReservesResponse>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  getStaticFeeParameters(
    overrides?: ContractCallOverrides,
  ): Promise<GetStaticFeeParametersResponse>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param amountOut Type: uint128, Indexed: false
   * @param swapForY Type: bool, Indexed: false
   */
  getSwapIn(
    amountOut: BigNumberish,
    swapForY: boolean,
    overrides?: ContractCallOverrides,
  ): Promise<GetSwapInResponse>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param amountIn Type: uint128, Indexed: false
   * @param swapForY Type: bool, Indexed: false
   */
  getSwapOut(
    amountIn: BigNumberish,
    swapForY: boolean,
    overrides?: ContractCallOverrides,
  ): Promise<GetSwapOutResponse>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: pure
   * Type: function
   */
  getTokenX(overrides?: ContractCallOverrides): Promise<string>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: pure
   * Type: function
   */
  getTokenY(overrides?: ContractCallOverrides): Promise<string>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  getVariableFeeParameters(
    overrides?: ContractCallOverrides,
  ): Promise<GetVariableFeeParametersResponse>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  implementation(overrides?: ContractCallOverrides): Promise<string>
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param newLength Type: uint16, Indexed: false
   */
  increaseOracleLength(
    newLength: BigNumberish,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param baseFactor Type: uint16, Indexed: false
   * @param filterPeriod Type: uint16, Indexed: false
   * @param decayPeriod Type: uint16, Indexed: false
   * @param reductionFactor Type: uint16, Indexed: false
   * @param variableFeeControl Type: uint24, Indexed: false
   * @param protocolShare Type: uint16, Indexed: false
   * @param maxVolatilityAccumulator Type: uint24, Indexed: false
   * @param activeId Type: uint24, Indexed: false
   */
  initialize(
    baseFactor: BigNumberish,
    filterPeriod: BigNumberish,
    decayPeriod: BigNumberish,
    reductionFactor: BigNumberish,
    variableFeeControl: BigNumberish,
    protocolShare: BigNumberish,
    maxVolatilityAccumulator: BigNumberish,
    activeId: BigNumberish,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param owner Type: address, Indexed: false
   * @param spender Type: address, Indexed: false
   */
  isApprovedForAll(
    owner: string,
    spender: string,
    overrides?: ContractCallOverrides,
  ): Promise<boolean>
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param to Type: address, Indexed: false
   * @param liquidityConfigs Type: bytes32[], Indexed: false
   * @param refundTo Type: address, Indexed: false
   */
  mint(
    to: string,
    liquidityConfigs: BytesLike[],
    refundTo: string,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  name(overrides?: ContractCallOverrides): Promise<string>
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param hooksParameters Type: bytes32, Indexed: false
   * @param onHooksSetData Type: bytes, Indexed: false
   */
  setHooksParameters(
    hooksParameters: BytesLike,
    onHooksSetData: BytesLike,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param baseFactor Type: uint16, Indexed: false
   * @param filterPeriod Type: uint16, Indexed: false
   * @param decayPeriod Type: uint16, Indexed: false
   * @param reductionFactor Type: uint16, Indexed: false
   * @param variableFeeControl Type: uint24, Indexed: false
   * @param protocolShare Type: uint16, Indexed: false
   * @param maxVolatilityAccumulator Type: uint24, Indexed: false
   */
  setStaticFeeParameters(
    baseFactor: BigNumberish,
    filterPeriod: BigNumberish,
    decayPeriod: BigNumberish,
    reductionFactor: BigNumberish,
    variableFeeControl: BigNumberish,
    protocolShare: BigNumberish,
    maxVolatilityAccumulator: BigNumberish,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param swapForY Type: bool, Indexed: false
   * @param to Type: address, Indexed: false
   */
  swap(
    swapForY: boolean,
    to: string,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  symbol(overrides?: ContractCallOverrides): Promise<string>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param id Type: uint256, Indexed: false
   */
  totalSupply(
    id: BigNumberish,
    overrides?: ContractCallOverrides,
  ): Promise<BigNumber>
}
