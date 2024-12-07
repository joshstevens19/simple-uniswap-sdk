import type { EthersContractContextV5 } from '@abi-toolkit/converter-typescript'
import type { ContractTransaction, BigNumber, BigNumberish } from 'ethers'

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
  | 'FactoryLockedStatusUpdated'
  | 'FeeParametersSet'
  | 'FeeRecipientSet'
  | 'FlashLoanFeeSet'
  | 'LBPairCreated'
  | 'LBPairIgnoredStateChanged'
  | 'LBPairImplementationSet'
  | 'OwnershipTransferred'
  | 'PendingOwnerSet'
  | 'PresetRemoved'
  | 'PresetSet'
  | 'QuoteAssetAdded'
  | 'QuoteAssetRemoved'
export interface EventsContext {
  FactoryLockedStatusUpdated(unlocked: boolean): EventFilter
  FeeParametersSet(
    sender: string,
    LBPair: string,
    binStep: BigNumberish,
    baseFactor: BigNumberish,
    filterPeriod: BigNumberish,
    decayPeriod: BigNumberish,
    reductionFactor: BigNumberish,
    variableFeeControl: BigNumberish,
    protocolShare: BigNumberish,
    maxVolatilityAccumulated: BigNumberish,
  ): EventFilter
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
  OwnershipTransferred(previousOwner: string, newOwner: string): EventFilter
  PendingOwnerSet(pendingOwner: string): EventFilter
  PresetRemoved(binStep: BigNumberish): EventFilter
  PresetSet(
    binStep: BigNumberish,
    baseFactor: BigNumberish,
    filterPeriod: BigNumberish,
    decayPeriod: BigNumberish,
    reductionFactor: BigNumberish,
    variableFeeControl: BigNumberish,
    protocolShare: BigNumberish,
    maxVolatilityAccumulated: BigNumberish,
    sampleLifetime: BigNumberish,
  ): EventFilter
  QuoteAssetAdded(quoteAsset: string): EventFilter
  QuoteAssetRemoved(quoteAsset: string): EventFilter
}
export type MethodNames =
  | 'LBPairImplementation'
  | 'MAX_BIN_STEP'
  | 'MAX_FEE'
  | 'MAX_PROTOCOL_SHARE'
  | 'MIN_BIN_STEP'
  | 'addQuoteAsset'
  | 'allLBPairs'
  | 'becomeOwner'
  | 'createLBPair'
  | 'creationUnlocked'
  | 'feeRecipient'
  | 'flashLoanFee'
  | 'forceDecay'
  | 'getAllBinSteps'
  | 'getAllLBPairs'
  | 'getLBPairInformation'
  | 'getNumberOfLBPairs'
  | 'getNumberOfQuoteAssets'
  | 'getPreset'
  | 'getQuoteAsset'
  | 'isQuoteAsset'
  | 'owner'
  | 'pendingOwner'
  | 'removePreset'
  | 'removeQuoteAsset'
  | 'renounceOwnership'
  | 'revokePendingOwner'
  | 'setFactoryLockedState'
  | 'setFeeRecipient'
  | 'setFeesParametersOnPair'
  | 'setFlashLoanFee'
  | 'setLBPairIgnored'
  | 'setLBPairImplementation'
  | 'setPendingOwner'
  | 'setPreset'
export type MethodNameMap = {
  [key in MethodNames]: string
}
export interface FactoryLockedStatusUpdatedEventEmittedResponse {
  unlocked: boolean
}
export interface FeeParametersSetEventEmittedResponse {
  sender: string
  LBPair: string
  binStep: BigNumberish
  baseFactor: BigNumberish
  filterPeriod: BigNumberish
  decayPeriod: BigNumberish
  reductionFactor: BigNumberish
  variableFeeControl: BigNumberish
  protocolShare: BigNumberish
  maxVolatilityAccumulated: BigNumberish
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
export interface OwnershipTransferredEventEmittedResponse {
  previousOwner: string
  newOwner: string
}
export interface PendingOwnerSetEventEmittedResponse {
  pendingOwner: string
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
  maxVolatilityAccumulated: BigNumberish
  sampleLifetime: BigNumberish
}
export interface QuoteAssetAddedEventEmittedResponse {
  quoteAsset: string
}
export interface QuoteAssetRemovedEventEmittedResponse {
  quoteAsset: string
}
export interface GetAllLBPairsLBPairsAvailableResponse {
  binStep: number
  0: number
  LBPair: string
  1: string
  createdByOwner: boolean
  2: boolean
  ignoredForRouting: boolean
  3: boolean
}
export interface LBPairInformationResponse {
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
  maxVolatilityAccumulated: BigNumber
  6: BigNumber
  sampleLifetime: BigNumber
  7: BigNumber
  length: 8
}
export interface Contract {
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  LBPairImplementation(overrides?: ContractCallOverrides): Promise<string>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  MAX_BIN_STEP(overrides?: ContractCallOverrides): Promise<BigNumber>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  MAX_FEE(overrides?: ContractCallOverrides): Promise<BigNumber>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  MAX_PROTOCOL_SHARE(overrides?: ContractCallOverrides): Promise<BigNumber>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  MIN_BIN_STEP(overrides?: ContractCallOverrides): Promise<BigNumber>
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _quoteAsset Type: address, Indexed: false
   */
  addQuoteAsset(
    _quoteAsset: string,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: uint256, Indexed: false
   */
  allLBPairs(
    parameter0: BigNumberish,
    overrides?: ContractCallOverrides,
  ): Promise<string>
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   */
  becomeOwner(
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _tokenX Type: address, Indexed: false
   * @param _tokenY Type: address, Indexed: false
   * @param _activeId Type: uint24, Indexed: false
   * @param _binStep Type: uint16, Indexed: false
   */
  createLBPair(
    _tokenX: string,
    _tokenY: string,
    _activeId: BigNumberish,
    _binStep: BigNumberish,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  creationUnlocked(overrides?: ContractCallOverrides): Promise<boolean>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  feeRecipient(overrides?: ContractCallOverrides): Promise<string>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  flashLoanFee(overrides?: ContractCallOverrides): Promise<BigNumber>
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _LBPair Type: address, Indexed: false
   */
  forceDecay(
    _LBPair: string,
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
   * @param _tokenX Type: address, Indexed: false
   * @param _tokenY Type: address, Indexed: false
   */
  getAllLBPairs(
    _tokenX: string,
    _tokenY: string,
    overrides?: ContractCallOverrides,
  ): Promise<LBPairsAvailableResponse[]>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param _tokenA Type: address, Indexed: false
   * @param _tokenB Type: address, Indexed: false
   * @param _binStep Type: uint256, Indexed: false
   */
  getLBPairInformation(
    _tokenA: string,
    _tokenB: string,
    _binStep: BigNumberish,
    overrides?: ContractCallOverrides,
  ): Promise<LBPairInformationResponse>
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
   * @param _binStep Type: uint16, Indexed: false
   */
  getPreset(
    _binStep: BigNumberish,
    overrides?: ContractCallOverrides,
  ): Promise<GetPresetResponse>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param _index Type: uint256, Indexed: false
   */
  getQuoteAsset(
    _index: BigNumberish,
    overrides?: ContractCallOverrides,
  ): Promise<string>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param _token Type: address, Indexed: false
   */
  isQuoteAsset(
    _token: string,
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
   * @param _binStep Type: uint16, Indexed: false
   */
  removePreset(
    _binStep: BigNumberish,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _quoteAsset Type: address, Indexed: false
   */
  removeQuoteAsset(
    _quoteAsset: string,
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
   */
  revokePendingOwner(
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _locked Type: bool, Indexed: false
   */
  setFactoryLockedState(
    _locked: boolean,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _feeRecipient Type: address, Indexed: false
   */
  setFeeRecipient(
    _feeRecipient: string,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _tokenX Type: address, Indexed: false
   * @param _tokenY Type: address, Indexed: false
   * @param _binStep Type: uint16, Indexed: false
   * @param _baseFactor Type: uint16, Indexed: false
   * @param _filterPeriod Type: uint16, Indexed: false
   * @param _decayPeriod Type: uint16, Indexed: false
   * @param _reductionFactor Type: uint16, Indexed: false
   * @param _variableFeeControl Type: uint24, Indexed: false
   * @param _protocolShare Type: uint16, Indexed: false
   * @param _maxVolatilityAccumulated Type: uint24, Indexed: false
   */
  setFeesParametersOnPair(
    _tokenX: string,
    _tokenY: string,
    _binStep: BigNumberish,
    _baseFactor: BigNumberish,
    _filterPeriod: BigNumberish,
    _decayPeriod: BigNumberish,
    _reductionFactor: BigNumberish,
    _variableFeeControl: BigNumberish,
    _protocolShare: BigNumberish,
    _maxVolatilityAccumulated: BigNumberish,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _flashLoanFee Type: uint256, Indexed: false
   */
  setFlashLoanFee(
    _flashLoanFee: BigNumberish,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _tokenX Type: address, Indexed: false
   * @param _tokenY Type: address, Indexed: false
   * @param _binStep Type: uint256, Indexed: false
   * @param _ignored Type: bool, Indexed: false
   */
  setLBPairIgnored(
    _tokenX: string,
    _tokenY: string,
    _binStep: BigNumberish,
    _ignored: boolean,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _LBPairImplementation Type: address, Indexed: false
   */
  setLBPairImplementation(
    _LBPairImplementation: string,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param pendingOwner_ Type: address, Indexed: false
   */
  setPendingOwner(
    pendingOwner_: string,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _binStep Type: uint16, Indexed: false
   * @param _baseFactor Type: uint16, Indexed: false
   * @param _filterPeriod Type: uint16, Indexed: false
   * @param _decayPeriod Type: uint16, Indexed: false
   * @param _reductionFactor Type: uint16, Indexed: false
   * @param _variableFeeControl Type: uint24, Indexed: false
   * @param _protocolShare Type: uint16, Indexed: false
   * @param _maxVolatilityAccumulated Type: uint24, Indexed: false
   * @param _sampleLifetime Type: uint16, Indexed: false
   */
  setPreset(
    _binStep: BigNumberish,
    _baseFactor: BigNumberish,
    _filterPeriod: BigNumberish,
    _decayPeriod: BigNumberish,
    _reductionFactor: BigNumberish,
    _variableFeeControl: BigNumberish,
    _protocolShare: BigNumberish,
    _maxVolatilityAccumulated: BigNumberish,
    _sampleLifetime: BigNumberish,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>
}
