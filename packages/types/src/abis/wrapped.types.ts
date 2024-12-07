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
export type Events = 'Approval' | 'Transfer' | 'Deposit' | 'Withdrawal'
export interface EventsContext {
  Approval(src: string, guy: string, wad: BigNumberish): EventFilter
  Transfer(src: string, dst: string, wad: BigNumberish): EventFilter
  Deposit(dst: string, wad: BigNumberish): EventFilter
  Withdrawal(src: string, wad: BigNumberish): EventFilter
}
export type MethodNames =
  | 'name'
  | 'approve'
  | 'totalSupply'
  | 'transferFrom'
  | 'withdraw'
  | 'decimals'
  | 'balanceOf'
  | 'symbol'
  | 'transfer'
  | 'deposit'
  | 'allowance'
export type MethodNameMap = {
  [key in MethodNames]: string
}
export interface ApprovalEventEmittedResponse {
  src: string
  guy: string
  wad: BigNumberish
}
export interface TransferEventEmittedResponse {
  src: string
  dst: string
  wad: BigNumberish
}
export interface DepositEventEmittedResponse {
  dst: string
  wad: BigNumberish
}
export interface WithdrawalEventEmittedResponse {
  src: string
  wad: BigNumberish
}
export interface Contract {
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
   * @param guy Type: address, Indexed: false
   * @param wad Type: uint256, Indexed: false
   */
  approve(
    guy: string,
    wad: BigNumberish,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  totalSupply(overrides?: ContractCallOverrides): Promise<BigNumber>
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param src Type: address, Indexed: false
   * @param dst Type: address, Indexed: false
   * @param wad Type: uint256, Indexed: false
   */
  transferFrom(
    src: string,
    dst: string,
    wad: BigNumberish,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param wad Type: uint256, Indexed: false
   */
  withdraw(
    wad: BigNumberish,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  decimals(overrides?: ContractCallOverrides): Promise<number | BigNumber>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: address, Indexed: false
   */
  balanceOf(
    parameter0: string,
    overrides?: ContractCallOverrides,
  ): Promise<BigNumber>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  symbol(overrides?: ContractCallOverrides): Promise<string>
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param dst Type: address, Indexed: false
   * @param wad Type: uint256, Indexed: false
   */
  transfer(
    dst: string,
    wad: BigNumberish,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>
  /**
   * Payable: true
   * Constant: false
   * StateMutability: payable
   * Type: function
   */
  deposit(
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: address, Indexed: false
   * @param parameter1 Type: address, Indexed: false
   */
  allowance(
    parameter0: string,
    parameter1: string,
    overrides?: ContractCallOverrides,
  ): Promise<BigNumber>
}
