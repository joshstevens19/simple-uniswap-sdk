import type { EthersContractContextV5 } from '@abi-toolkit/converter-typescript'
import type { ContractTransaction, BytesLike, BigNumberish } from 'ethers'

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
  | 'exactInput'
  | 'exactInputSingle'
  | 'exactInputSingleSupportingFeeOnTransferTokens'
  | 'exactOutput'
  | 'exactOutputSingle'
  | 'factory'
  | 'multicall'
  | 'poolDeployer'
  | 'refundNativeToken'
  | 'selfPermit'
  | 'selfPermitAllowed'
  | 'selfPermitAllowedIfNecessary'
  | 'selfPermitIfNecessary'
  | 'sweepToken'
  | 'sweepTokenWithFee'
  | 'unwrapWNativeToken'
  | 'unwrapWNativeTokenWithFee'
export type MethodNameMap = {
  [key in MethodNames]: string
}
export interface ExactInputParamsRequest {
  path: BytesLike
  recipient: string
  deadline: BigNumberish
  amountIn: BigNumberish
  amountOutMinimum: BigNumberish
}
export interface ExactInputSingleParamsRequest {
  tokenIn: string
  tokenOut: string
  recipient: string
  deadline: BigNumberish
  amountIn: BigNumberish
  amountOutMinimum: BigNumberish
  limitSqrtPrice: BigNumberish
}
export interface ExactInputSingleSupportingFeeOnTransferTokensParamsRequest {
  tokenIn: string
  tokenOut: string
  recipient: string
  deadline: BigNumberish
  amountIn: BigNumberish
  amountOutMinimum: BigNumberish
  limitSqrtPrice: BigNumberish
}
export interface ExactOutputParamsRequest {
  path: BytesLike
  recipient: string
  deadline: BigNumberish
  amountOut: BigNumberish
  amountInMaximum: BigNumberish
}
export interface ExactOutputSingleParamsRequest {
  tokenIn: string
  tokenOut: string
  fee: BigNumberish
  recipient: string
  deadline: BigNumberish
  amountOut: BigNumberish
  amountInMaximum: BigNumberish
  limitSqrtPrice: BigNumberish
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
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param amount0Delta Type: int256, Indexed: false
   * @param amount1Delta Type: int256, Indexed: false
   * @param _data Type: bytes, Indexed: false
   */
  algebraSwapCallback(
    amount0Delta: BigNumberish,
    amount1Delta: BigNumberish,
    _data: BytesLike,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>
  /**
   * Payable: true
   * Constant: false
   * StateMutability: payable
   * Type: function
   * @param params Type: tuple, Indexed: false
   */
  exactInput(
    params: ExactInputParamsRequest,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>
  /**
   * Payable: true
   * Constant: false
   * StateMutability: payable
   * Type: function
   * @param params Type: tuple, Indexed: false
   */
  exactInputSingle(
    params: ExactInputSingleParamsRequest,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param params Type: tuple, Indexed: false
   */
  exactInputSingleSupportingFeeOnTransferTokens(
    params: ExactInputSingleSupportingFeeOnTransferTokensParamsRequest,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>
  /**
   * Payable: true
   * Constant: false
   * StateMutability: payable
   * Type: function
   * @param params Type: tuple, Indexed: false
   */
  exactOutput(
    params: ExactOutputParamsRequest,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>
  /**
   * Payable: true
   * Constant: false
   * StateMutability: payable
   * Type: function
   * @param params Type: tuple, Indexed: false
   */
  exactOutputSingle(
    params: ExactOutputSingleParamsRequest,
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
   * Payable: true
   * Constant: false
   * StateMutability: payable
   * Type: function
   * @param data Type: bytes[], Indexed: false
   */
  multicall(
    data: BytesLike[],
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  poolDeployer(overrides?: ContractCallOverrides): Promise<string>
  /**
   * Payable: true
   * Constant: false
   * StateMutability: payable
   * Type: function
   */
  refundNativeToken(
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>
  /**
   * Payable: true
   * Constant: false
   * StateMutability: payable
   * Type: function
   * @param token Type: address, Indexed: false
   * @param value Type: uint256, Indexed: false
   * @param deadline Type: uint256, Indexed: false
   * @param v Type: uint8, Indexed: false
   * @param r Type: bytes32, Indexed: false
   * @param s Type: bytes32, Indexed: false
   */
  selfPermit(
    token: string,
    value: BigNumberish,
    deadline: BigNumberish,
    v: BigNumberish,
    r: BytesLike,
    s: BytesLike,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>
  /**
   * Payable: true
   * Constant: false
   * StateMutability: payable
   * Type: function
   * @param token Type: address, Indexed: false
   * @param nonce Type: uint256, Indexed: false
   * @param expiry Type: uint256, Indexed: false
   * @param v Type: uint8, Indexed: false
   * @param r Type: bytes32, Indexed: false
   * @param s Type: bytes32, Indexed: false
   */
  selfPermitAllowed(
    token: string,
    nonce: BigNumberish,
    expiry: BigNumberish,
    v: BigNumberish,
    r: BytesLike,
    s: BytesLike,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>
  /**
   * Payable: true
   * Constant: false
   * StateMutability: payable
   * Type: function
   * @param token Type: address, Indexed: false
   * @param nonce Type: uint256, Indexed: false
   * @param expiry Type: uint256, Indexed: false
   * @param v Type: uint8, Indexed: false
   * @param r Type: bytes32, Indexed: false
   * @param s Type: bytes32, Indexed: false
   */
  selfPermitAllowedIfNecessary(
    token: string,
    nonce: BigNumberish,
    expiry: BigNumberish,
    v: BigNumberish,
    r: BytesLike,
    s: BytesLike,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>
  /**
   * Payable: true
   * Constant: false
   * StateMutability: payable
   * Type: function
   * @param token Type: address, Indexed: false
   * @param value Type: uint256, Indexed: false
   * @param deadline Type: uint256, Indexed: false
   * @param v Type: uint8, Indexed: false
   * @param r Type: bytes32, Indexed: false
   * @param s Type: bytes32, Indexed: false
   */
  selfPermitIfNecessary(
    token: string,
    value: BigNumberish,
    deadline: BigNumberish,
    v: BigNumberish,
    r: BytesLike,
    s: BytesLike,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>
  /**
   * Payable: true
   * Constant: false
   * StateMutability: payable
   * Type: function
   * @param token Type: address, Indexed: false
   * @param amountMinimum Type: uint256, Indexed: false
   * @param recipient Type: address, Indexed: false
   */
  sweepToken(
    token: string,
    amountMinimum: BigNumberish,
    recipient: string,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>
  /**
   * Payable: true
   * Constant: false
   * StateMutability: payable
   * Type: function
   * @param token Type: address, Indexed: false
   * @param amountMinimum Type: uint256, Indexed: false
   * @param recipient Type: address, Indexed: false
   * @param feeBips Type: uint256, Indexed: false
   * @param feeRecipient Type: address, Indexed: false
   */
  sweepTokenWithFee(
    token: string,
    amountMinimum: BigNumberish,
    recipient: string,
    feeBips: BigNumberish,
    feeRecipient: string,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>
  /**
   * Payable: true
   * Constant: false
   * StateMutability: payable
   * Type: function
   * @param amountMinimum Type: uint256, Indexed: false
   * @param recipient Type: address, Indexed: false
   */
  unwrapWNativeToken(
    amountMinimum: BigNumberish,
    recipient: string,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>
  /**
   * Payable: true
   * Constant: false
   * StateMutability: payable
   * Type: function
   * @param amountMinimum Type: uint256, Indexed: false
   * @param recipient Type: address, Indexed: false
   * @param feeBips Type: uint256, Indexed: false
   * @param feeRecipient Type: address, Indexed: false
   */
  unwrapWNativeTokenWithFee(
    amountMinimum: BigNumberish,
    recipient: string,
    feeBips: BigNumberish,
    feeRecipient: string,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>
}
