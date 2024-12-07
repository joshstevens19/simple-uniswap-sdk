import type { EthersContractContextV5 } from '@abi-toolkit/converter-typescript'
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
export type Events =
  | 'FarmingAddress'
  | 'FeeConfiguration'
  | 'Owner'
  | 'Pool'
  | 'VaultAddress'
export interface EventsContext {
  FarmingAddress(newFarmingAddress: string): EventFilter
  FeeConfiguration(
    alpha1: BigNumberish,
    alpha2: BigNumberish,
    beta1: BigNumberish,
    beta2: BigNumberish,
    gamma1: BigNumberish,
    gamma2: BigNumberish,
    volumeBeta: BigNumberish,
    volumeGamma: BigNumberish,
    baseFee: BigNumberish,
  ): EventFilter
  Owner(newOwner: string): EventFilter
  Pool(token0: string, token1: string, pool: string): EventFilter
  VaultAddress(newVaultAddress: string): EventFilter
}
export type MethodNames =
  | 'baseFeeConfiguration'
  | 'createPool'
  | 'farmingAddress'
  | 'owner'
  | 'poolByPair'
  | 'poolDeployer'
  | 'setBaseFeeConfiguration'
  | 'setFarmingAddress'
  | 'setOwner'
  | 'setVaultAddress'
  | 'vaultAddress'
export type MethodNameMap = {
  [key in MethodNames]: string
}
export interface FarmingAddressEventEmittedResponse {
  newFarmingAddress: string
}
export interface FeeConfigurationEventEmittedResponse {
  alpha1: BigNumberish
  alpha2: BigNumberish
  beta1: BigNumberish
  beta2: BigNumberish
  gamma1: BigNumberish
  gamma2: BigNumberish
  volumeBeta: BigNumberish
  volumeGamma: BigNumberish
  baseFee: BigNumberish
}
export interface OwnerEventEmittedResponse {
  newOwner: string
}
export interface PoolEventEmittedResponse {
  token0: string
  token1: string
  pool: string
}
export interface VaultAddressEventEmittedResponse {
  newVaultAddress: string
}
export interface BaseFeeConfigurationResponse {
  alpha1: number
  0: number
  alpha2: number
  1: number
  beta1: number
  2: number
  beta2: number
  3: number
  gamma1: number
  4: number
  gamma2: number
  5: number
  volumeBeta: number
  6: number
  volumeGamma: number
  7: number
  baseFee: number
  8: number
  length: 9
}
export interface Contract {
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  baseFeeConfiguration(
    overrides?: ContractCallOverrides,
  ): Promise<BaseFeeConfigurationResponse>
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param tokenA Type: address, Indexed: false
   * @param tokenB Type: address, Indexed: false
   */
  createPool(
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
  farmingAddress(overrides?: ContractCallOverrides): Promise<string>
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
   * @param parameter0 Type: address, Indexed: false
   * @param parameter1 Type: address, Indexed: false
   */
  poolByPair(
    parameter0: string,
    parameter1: string,
    overrides?: ContractCallOverrides,
  ): Promise<string>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  poolDeployer(overrides?: ContractCallOverrides): Promise<string>
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param alpha1 Type: uint16, Indexed: false
   * @param alpha2 Type: uint16, Indexed: false
   * @param beta1 Type: uint32, Indexed: false
   * @param beta2 Type: uint32, Indexed: false
   * @param gamma1 Type: uint16, Indexed: false
   * @param gamma2 Type: uint16, Indexed: false
   * @param volumeBeta Type: uint32, Indexed: false
   * @param volumeGamma Type: uint16, Indexed: false
   * @param baseFee Type: uint16, Indexed: false
   */
  setBaseFeeConfiguration(
    alpha1: BigNumberish,
    alpha2: BigNumberish,
    beta1: BigNumberish,
    beta2: BigNumberish,
    gamma1: BigNumberish,
    gamma2: BigNumberish,
    volumeBeta: BigNumberish,
    volumeGamma: BigNumberish,
    baseFee: BigNumberish,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _farmingAddress Type: address, Indexed: false
   */
  setFarmingAddress(
    _farmingAddress: string,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>
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
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _vaultAddress Type: address, Indexed: false
   */
  setVaultAddress(
    _vaultAddress: string,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  vaultAddress(overrides?: ContractCallOverrides): Promise<string>
}
