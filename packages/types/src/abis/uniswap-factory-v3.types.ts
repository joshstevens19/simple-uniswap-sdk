import type { EthersContractContextV5 } from '@ethereum-abi-types-generator/converter-typescript'
import type { ContractTransaction, BigNumberish } from 'ethers'

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
export type Events = 'FeeTierEnabled' | 'OwnerChanged' | 'PoolCreated'
export interface EventsContext {
  FeeTierEnabled(fee: BigNumberish, tickSpacing: BigNumberish): EventFilter
  OwnerChanged(oldOwner: string, newOwner: string): EventFilter
  PoolCreated(
    token0: string,
    token1: string,
    fee: BigNumberish,
    tickSpacing: BigNumberish,
    pool: string,
  ): EventFilter
}
export type MethodNames =
  | 'createPool'
  | 'enableFeeTier'
  | 'feeTierTickSpacing'
  | 'getPool'
  | 'owner'
  | 'parameters'
  | 'setOwner'
export type MethodNameMap = {
  [key in MethodNames]: string
}
export interface FeeTierEnabledEventEmittedResponse {
  fee: BigNumberish
  tickSpacing: BigNumberish
}
export interface OwnerChangedEventEmittedResponse {
  oldOwner: string
  newOwner: string
}
export interface PoolCreatedEventEmittedResponse {
  token0: string
  token1: string
  fee: BigNumberish
  tickSpacing: BigNumberish
  pool: string
}
export interface ParametersResponse {
  factory: string
  0: string
  token0: string
  1: string
  token1: string
  2: string
  fee: number
  3: number
  tickSpacing: number
  4: number
  length: 5
}
export interface Contract {
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param tokenA Type: address, Indexed: false
   * @param tokenB Type: address, Indexed: false
   * @param fee Type: uint24, Indexed: false
   */
  createPool(
    tokenA: string,
    tokenB: string,
    fee: BigNumberish,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param fee Type: uint24, Indexed: false
   * @param tickSpacing Type: int24, Indexed: false
   */
  enableFeeTier(
    fee: BigNumberish,
    tickSpacing: BigNumberish,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: uint24, Indexed: false
   */
  feeTierTickSpacing(
    parameter0: BigNumberish,
    overrides?: ContractCallOverrides,
  ): Promise<number>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: address, Indexed: false
   * @param parameter1 Type: address, Indexed: false
   * @param parameter2 Type: uint24, Indexed: false
   */
  getPool(
    parameter0: string,
    parameter1: string,
    parameter2: BigNumberish,
    overrides?: ContractCallOverrides,
  ): Promise<string>
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
  parameters(overrides?: ContractCallOverrides): Promise<ParametersResponse>
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _owner Type: address, Indexed: false
   */
  setOwner(
    _owner: string,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>
}
