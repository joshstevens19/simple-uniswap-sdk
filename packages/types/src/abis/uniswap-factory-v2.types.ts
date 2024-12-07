import type { EthersContractContextV5 } from '@ethereum-abi-types-generator/converter-typescript'
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
export type Events = 'PairCreated'
export interface EventsContext {
  PairCreated(
    token0: string,
    token1: string,
    pair: string,
    param3: BigNumberish,
  ): EventFilter
}
export type MethodNames =
  | 'allPairs'
  | 'allPairsLength'
  | 'createPair'
  | 'feeTo'
  | 'feeToSetter'
  | 'getPair'
  | 'setFeeTo'
  | 'setFeeToSetter'
export type MethodNameMap = {
  [key in MethodNames]: string
}
export interface PairCreatedEventEmittedResponse {
  token0: string
  token1: string
  pair: string
  param3: BigNumberish
}
export interface Contract {
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: uint256, Indexed: false
   */
  allPairs(
    parameter0: BigNumberish,
    overrides?: ContractCallOverrides,
  ): Promise<string>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  allPairsLength(overrides?: ContractCallOverrides): Promise<BigNumber>
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param tokenA Type: address, Indexed: false
   * @param tokenB Type: address, Indexed: false
   */
  createPair(
    tokenA: string,
    tokenB: string,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  feeTo(overrides?: ContractCallOverrides): Promise<string>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  feeToSetter(overrides?: ContractCallOverrides): Promise<string>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: address, Indexed: false
   * @param parameter1 Type: address, Indexed: false
   */
  getPair(
    parameter0: string,
    parameter1: string,
    overrides?: ContractCallOverrides,
  ): Promise<string>
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _feeTo Type: address, Indexed: false
   */
  setFeeTo(
    _feeTo: string,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _feeToSetter Type: address, Indexed: false
   */
  setFeeToSetter(
    _feeToSetter: string,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>
}
