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
  | 'FeeRecipientSet'
  | 'FlashLoanFeeSet'
  | 'LBPairCreated'
  | 'LBPairIgnoredStateChanged'
  | 'LBPairImplementationSet'
  | 'OwnershipTransferStarted'
  | 'OwnershipTransferred'
  | 'PresetOpenStateChanged'
  | 'PresetRemoved'
  | 'PresetSet'
  | 'QuoteAssetAdded'
  | 'QuoteAssetRemoved'
  | 'RoleAdminChanged'
  | 'RoleGranted'
  | 'RoleRevoked'
export interface EventsContext {
  FeeRecipientSet(oldRecipient: string, newRecipient: string): EventFilter
  FlashLoanFeeSet(
    oldFlashLoanFee: BigNumberish,
    newFlashLoanFee: BigNumberish,
  ): EventFilter
  LBPairCreated(
    tokenX: string,
    tokenY: string,
    binStep: BigNumberish,
    LBPair: string,
    pid: BigNumberish,
  ): EventFilter
  LBPairIgnoredStateChanged(LBPair: string, ignored: boolean): EventFilter
  LBPairImplementationSet(
    oldLBPairImplementation: string,
    LBPairImplementation: string,
  ): EventFilter
  OwnershipTransferStarted(previousOwner: string, newOwner: string): EventFilter
  OwnershipTransferred(previousOwner: string, newOwner: string): EventFilter
  PresetOpenStateChanged(binStep: BigNumberish, isOpen: boolean): EventFilter
  PresetRemoved(binStep: BigNumberish): EventFilter
  PresetSet(
    binStep: BigNumberish,
    baseFactor: BigNumberish,
    filterPeriod: BigNumberish,
    decayPeriod: BigNumberish,
    reductionFactor: BigNumberish,
    variableFeeControl: BigNumberish,
    protocolShare: BigNumberish,
    maxVolatilityAccumulator: BigNumberish,
  ): EventFilter
  QuoteAssetAdded(quoteAsset: string): EventFilter
  QuoteAssetRemoved(quoteAsset: string): EventFilter
  RoleAdminChanged(
    role: Bytes,
    previousAdminRole: Bytes,
    newAdminRole: Bytes,
  ): EventFilter
  RoleGranted(role: Bytes, account: string, sender: string): EventFilter
  RoleRevoked(role: Bytes, account: string, sender: string): EventFilter
}
export type MethodNames =
  | 'DEFAULT_ADMIN_ROLE'
  | 'LB_HOOKS_MANAGER_ROLE'
  | 'acceptOwnership'
  | 'addQuoteAsset'
  | 'createLBPair'
  | 'forceDecay'
  | 'getAllBinSteps'
  | 'getAllLBPairs'
  | 'getFeeRecipient'
  | 'getFlashLoanFee'
  | 'getLBPairAtIndex'
  | 'getLBPairImplementation'
  | 'getLBPairInformation'
  | 'getMaxFlashLoanFee'
  | 'getMinBinStep'
  | 'getNumberOfLBPairs'
  | 'getNumberOfQuoteAssets'
  | 'getOpenBinSteps'
  | 'getPreset'
  | 'getQuoteAssetAtIndex'
  | 'getRoleAdmin'
  | 'grantRole'
  | 'hasRole'
  | 'isQuoteAsset'
  | 'owner'
  | 'pendingOwner'
  | 'removeLBHooksOnPair'
  | 'removePreset'
  | 'removeQuoteAsset'
  | 'renounceOwnership'
  | 'renounceRole'
  | 'revokeRole'
  | 'setFeeRecipient'
  | 'setFeesParametersOnPair'
  | 'setFlashLoanFee'
  | 'setLBHooksParametersOnPair'
  | 'setLBPairIgnored'
  | 'setLBPairImplementation'
  | 'setPreset'
  | 'setPresetOpenState'
  | 'supportsInterface'
  | 'transferOwnership'
export type MethodNameMap = {
  [key in MethodNames]: string
}
export interface FeeRecipientSetEventEmittedResponse {
  oldRecipient: string
  newRecipient: string
}
export interface FlashLoanFeeSetEventEmittedResponse {
  oldFlashLoanFee: BigNumberish
  newFlashLoanFee: BigNumberish
}
export interface LBPairCreatedEventEmittedResponse {
  tokenX: string
  tokenY: string
  binStep: BigNumberish
  LBPair: string
  pid: BigNumberish
}
export interface LBPairIgnoredStateChangedEventEmittedResponse {
  LBPair: string
  ignored: boolean
}
export interface LBPairImplementationSetEventEmittedResponse {
  oldLBPairImplementation: string
  LBPairImplementation: string
}
export interface OwnershipTransferStartedEventEmittedResponse {
  previousOwner: string
  newOwner: string
}
export interface OwnershipTransferredEventEmittedResponse {
  previousOwner: string
  newOwner: string
}
export interface PresetOpenStateChangedEventEmittedResponse {
  binStep: BigNumberish
  isOpen: boolean
}
export interface PresetRemovedEventEmittedResponse {
  binStep: BigNumberish
}
export interface PresetSetEventEmittedResponse {
  binStep: BigNumberish
  baseFactor: BigNumberish
  filterPeriod: BigNumberish
  decayPeriod: BigNumberish
  reductionFactor: BigNumberish
  variableFeeControl: BigNumberish
  protocolShare: BigNumberish
  maxVolatilityAccumulator: BigNumberish
}
export interface QuoteAssetAddedEventEmittedResponse {
  quoteAsset: string
}
export interface QuoteAssetRemovedEventEmittedResponse {
  quoteAsset: string
}
export interface RoleAdminChangedEventEmittedResponse {
  role: BytesLike
  previousAdminRole: BytesLike
  newAdminRole: BytesLike
}
export interface RoleGrantedEventEmittedResponse {
  role: BytesLike
  account: string
  sender: string
}
export interface RoleRevokedEventEmittedResponse {
  role: BytesLike
  account: string
  sender: string
}
export interface GetAllLBPairsLbPairsAvailableResponse {
  binStep: number
  0: number
  LBPair: string
  1: string
  createdByOwner: boolean
  2: boolean
  ignoredForRouting: boolean
  3: boolean
}
export interface GetLBPairInformationLbPairInformationResponse {
  binStep: number
  0: number
  LBPair: string
  1: string
  createdByOwner: boolean
  2: boolean
  ignoredForRouting: boolean
  3: boolean
}
export interface GetPresetResponse {
  baseFactor: BigNumber
  0: BigNumber
  filterPeriod: BigNumber
  1: BigNumber
  decayPeriod: BigNumber
  2: BigNumber
  reductionFactor: BigNumber
  3: BigNumber
  variableFeeControl: BigNumber
  4: BigNumber
  protocolShare: BigNumber
  5: BigNumber
  maxVolatilityAccumulator: BigNumber
  6: BigNumber
  isOpen: boolean
  7: boolean
  length: 8
}
export interface Contract {
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  DEFAULT_ADMIN_ROLE(overrides?: ContractCallOverrides): Promise<string>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  LB_HOOKS_MANAGER_ROLE(overrides?: ContractCallOverrides): Promise<string>
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   */
  acceptOwnership(
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param quoteAsset Type: address, Indexed: false
   */
  addQuoteAsset(
    quoteAsset: string,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param tokenX Type: address, Indexed: false
   * @param tokenY Type: address, Indexed: false
   * @param activeId Type: uint24, Indexed: false
   * @param binStep Type: uint16, Indexed: false
   */
  createLBPair(
    tokenX: string,
    tokenY: string,
    activeId: BigNumberish,
    binStep: BigNumberish,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param pair Type: address, Indexed: false
   */
  forceDecay(
    pair: string,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  getAllBinSteps(overrides?: ContractCallOverrides): Promise<BigNumber[]>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param tokenX Type: address, Indexed: false
   * @param tokenY Type: address, Indexed: false
   */
  getAllLBPairs(
    tokenX: string,
    tokenY: string,
    overrides?: ContractCallOverrides,
  ): Promise<LbPairsAvailableResponse[]>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  getFeeRecipient(overrides?: ContractCallOverrides): Promise<string>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  getFlashLoanFee(overrides?: ContractCallOverrides): Promise<BigNumber>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param index Type: uint256, Indexed: false
   */
  getLBPairAtIndex(
    index: BigNumberish,
    overrides?: ContractCallOverrides,
  ): Promise<string>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  getLBPairImplementation(overrides?: ContractCallOverrides): Promise<string>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param tokenA Type: address, Indexed: false
   * @param tokenB Type: address, Indexed: false
   * @param binStep Type: uint256, Indexed: false
   */
  getLBPairInformation(
    tokenA: string,
    tokenB: string,
    binStep: BigNumberish,
    overrides?: ContractCallOverrides,
  ): Promise<LbPairInformationResponse>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: pure
   * Type: function
   */
  getMaxFlashLoanFee(overrides?: ContractCallOverrides): Promise<BigNumber>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: pure
   * Type: function
   */
  getMinBinStep(overrides?: ContractCallOverrides): Promise<BigNumber>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  getNumberOfLBPairs(overrides?: ContractCallOverrides): Promise<BigNumber>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  getNumberOfQuoteAssets(overrides?: ContractCallOverrides): Promise<BigNumber>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  getOpenBinSteps(overrides?: ContractCallOverrides): Promise<BigNumber[]>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param binStep Type: uint256, Indexed: false
   */
  getPreset(
    binStep: BigNumberish,
    overrides?: ContractCallOverrides,
  ): Promise<GetPresetResponse>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param index Type: uint256, Indexed: false
   */
  getQuoteAssetAtIndex(
    index: BigNumberish,
    overrides?: ContractCallOverrides,
  ): Promise<string>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param role Type: bytes32, Indexed: false
   */
  getRoleAdmin(
    role: BytesLike,
    overrides?: ContractCallOverrides,
  ): Promise<string>
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param role Type: bytes32, Indexed: false
   * @param account Type: address, Indexed: false
   */
  grantRole(
    role: BytesLike,
    account: string,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param role Type: bytes32, Indexed: false
   * @param account Type: address, Indexed: false
   */
  hasRole(
    role: BytesLike,
    account: string,
    overrides?: ContractCallOverrides,
  ): Promise<boolean>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param token Type: address, Indexed: false
   */
  isQuoteAsset(
    token: string,
    overrides?: ContractCallOverrides,
  ): Promise<boolean>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  owner(overrides?: ContractCallOverrides): Promise<string>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  pendingOwner(overrides?: ContractCallOverrides): Promise<string>
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param tokenX Type: address, Indexed: false
   * @param tokenY Type: address, Indexed: false
   * @param binStep Type: uint16, Indexed: false
   */
  removeLBHooksOnPair(
    tokenX: string,
    tokenY: string,
    binStep: BigNumberish,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param binStep Type: uint16, Indexed: false
   */
  removePreset(
    binStep: BigNumberish,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param quoteAsset Type: address, Indexed: false
   */
  removeQuoteAsset(
    quoteAsset: string,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   */
  renounceOwnership(
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param role Type: bytes32, Indexed: false
   * @param callerConfirmation Type: address, Indexed: false
   */
  renounceRole(
    role: BytesLike,
    callerConfirmation: string,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param role Type: bytes32, Indexed: false
   * @param account Type: address, Indexed: false
   */
  revokeRole(
    role: BytesLike,
    account: string,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param feeRecipient Type: address, Indexed: false
   */
  setFeeRecipient(
    feeRecipient: string,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param tokenX Type: address, Indexed: false
   * @param tokenY Type: address, Indexed: false
   * @param binStep Type: uint16, Indexed: false
   * @param baseFactor Type: uint16, Indexed: false
   * @param filterPeriod Type: uint16, Indexed: false
   * @param decayPeriod Type: uint16, Indexed: false
   * @param reductionFactor Type: uint16, Indexed: false
   * @param variableFeeControl Type: uint24, Indexed: false
   * @param protocolShare Type: uint16, Indexed: false
   * @param maxVolatilityAccumulator Type: uint24, Indexed: false
   */
  setFeesParametersOnPair(
    tokenX: string,
    tokenY: string,
    binStep: BigNumberish,
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
   * @param flashLoanFee Type: uint256, Indexed: false
   */
  setFlashLoanFee(
    flashLoanFee: BigNumberish,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param tokenX Type: address, Indexed: false
   * @param tokenY Type: address, Indexed: false
   * @param binStep Type: uint16, Indexed: false
   * @param hooksParameters Type: bytes32, Indexed: false
   * @param onHooksSetData Type: bytes, Indexed: false
   */
  setLBHooksParametersOnPair(
    tokenX: string,
    tokenY: string,
    binStep: BigNumberish,
    hooksParameters: BytesLike,
    onHooksSetData: BytesLike,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param tokenX Type: address, Indexed: false
   * @param tokenY Type: address, Indexed: false
   * @param binStep Type: uint16, Indexed: false
   * @param ignored Type: bool, Indexed: false
   */
  setLBPairIgnored(
    tokenX: string,
    tokenY: string,
    binStep: BigNumberish,
    ignored: boolean,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param newLBPairImplementation Type: address, Indexed: false
   */
  setLBPairImplementation(
    newLBPairImplementation: string,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param binStep Type: uint16, Indexed: false
   * @param baseFactor Type: uint16, Indexed: false
   * @param filterPeriod Type: uint16, Indexed: false
   * @param decayPeriod Type: uint16, Indexed: false
   * @param reductionFactor Type: uint16, Indexed: false
   * @param variableFeeControl Type: uint24, Indexed: false
   * @param protocolShare Type: uint16, Indexed: false
   * @param maxVolatilityAccumulator Type: uint24, Indexed: false
   * @param isOpen Type: bool, Indexed: false
   */
  setPreset(
    binStep: BigNumberish,
    baseFactor: BigNumberish,
    filterPeriod: BigNumberish,
    decayPeriod: BigNumberish,
    reductionFactor: BigNumberish,
    variableFeeControl: BigNumberish,
    protocolShare: BigNumberish,
    maxVolatilityAccumulator: BigNumberish,
    isOpen: boolean,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param binStep Type: uint16, Indexed: false
   * @param isOpen Type: bool, Indexed: false
   */
  setPresetOpenState(
    binStep: BigNumberish,
    isOpen: boolean,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param interfaceId Type: bytes4, Indexed: false
   */
  supportsInterface(
    interfaceId: BytesLike,
    overrides?: ContractCallOverrides,
  ): Promise<boolean>
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param newOwner Type: address, Indexed: false
   */
  transferOwnership(
    newOwner: string,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>
}
