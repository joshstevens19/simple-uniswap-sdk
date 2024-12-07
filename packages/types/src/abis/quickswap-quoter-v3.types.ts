import type { EthersContractContextV5 } from '@abi-toolkit/converter-typescript'
import type { BytesLike, BigNumber, BigNumberish } from 'ethers'

import type {
  ContractTransactionOverrides,
  ContractCallOverrides,
} from './common.types'

export type ContractContext = EthersContractContextV5<
  Contract,
  MethodNames,
  EventsContext,
  Events
>
export type Events = undefined
export interface EventsContext {}
export type MethodNames =
  | 'WNativeToken'
  | 'algebraSwapCallback'
  | 'factory'
  | 'poolDeployer'
  | 'quoteExactInput'
  | 'quoteExactInputSingle'
  | 'quoteExactOutput'
  | 'quoteExactOutputSingle'
export type MethodNameMap = {
  [key in MethodNames]: string
}
export interface QuoteExactInputResponse {
  amountOut: BigNumber
  0: BigNumber
  fees: number[]
  1: number[]
  length: 2
}
export interface QuoteExactInputSingleResponse {
  amountOut: BigNumber
  0: BigNumber
  fee: number
  1: number
  length: 2
}
export interface QuoteExactOutputResponse {
  amountIn: BigNumber
  0: BigNumber
  fees: number[]
  1: number[]
  length: 2
}
export interface QuoteExactOutputSingleResponse {
  amountIn: BigNumber
  0: BigNumber
  fee: number
  1: number
  length: 2
}
export interface Contract {
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  WNativeToken(overrides?: ContractCallOverrides): Promise<string>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param amount0Delta Type: int256, Indexed: false
   * @param amount1Delta Type: int256, Indexed: false
   * @param path Type: bytes, Indexed: false
   */
  algebraSwapCallback(
    amount0Delta: BigNumberish,
    amount1Delta: BigNumberish,
    path: BytesLike,
    overrides?: ContractCallOverrides,
  ): Promise<void>
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
  poolDeployer(overrides?: ContractCallOverrides): Promise<string>
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param path Type: bytes, Indexed: false
   * @param amountIn Type: uint256, Indexed: false
   */
  quoteExactInput(
    path: BytesLike,
    amountIn: BigNumberish,
    overrides?: ContractTransactionOverrides,
  ): Promise<QuoteExactInputResponse>
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param tokenIn Type: address, Indexed: false
   * @param tokenOut Type: address, Indexed: false
   * @param amountIn Type: uint256, Indexed: false
   * @param limitSqrtPrice Type: uint160, Indexed: false
   */
  quoteExactInputSingle(
    tokenIn: string,
    tokenOut: string,
    amountIn: BigNumberish,
    limitSqrtPrice: BigNumberish,
    overrides?: ContractTransactionOverrides,
  ): Promise<QuoteExactInputSingleResponse>
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param path Type: bytes, Indexed: false
   * @param amountOut Type: uint256, Indexed: false
   */
  quoteExactOutput(
    path: BytesLike,
    amountOut: BigNumberish,
    overrides?: ContractTransactionOverrides,
  ): Promise<QuoteExactOutputResponse>
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param tokenIn Type: address, Indexed: false
   * @param tokenOut Type: address, Indexed: false
   * @param amountOut Type: uint256, Indexed: false
   * @param limitSqrtPrice Type: uint160, Indexed: false
   */
  quoteExactOutputSingle(
    tokenIn: string,
    tokenOut: string,
    amountOut: BigNumberish,
    limitSqrtPrice: BigNumberish,
    overrides?: ContractTransactionOverrides,
  ): Promise<QuoteExactOutputSingleResponse>
}
