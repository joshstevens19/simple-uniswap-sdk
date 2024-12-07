import type { EthersContractContextV5 } from '@ethereum-abi-types-generator/converter-typescript'
import type { ContractTransaction, BigNumber, BigNumberish } from 'ethers'

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
  | 'addLiquidity'
  | 'addLiquidityAVAX'
  | 'createLBPair'
  | 'factory'
  | 'getIdFromPrice'
  | 'getPriceFromId'
  | 'getSwapIn'
  | 'getSwapOut'
  | 'oldFactory'
  | 'removeLiquidity'
  | 'removeLiquidityAVAX'
  | 'swapAVAXForExactTokens'
  | 'swapExactAVAXForTokens'
  | 'swapExactAVAXForTokensSupportingFeeOnTransferTokens'
  | 'swapExactTokensForAVAX'
  | 'swapExactTokensForAVAXSupportingFeeOnTransferTokens'
  | 'swapExactTokensForTokens'
  | 'swapExactTokensForTokensSupportingFeeOnTransferTokens'
  | 'swapTokensForExactAVAX'
  | 'swapTokensForExactTokens'
  | 'sweep'
  | 'wavax'
export type MethodNameMap = {
  [key in MethodNames]: string
}
export interface AddLiquidity_liquidityParametersRequest {
  tokenX: string
  tokenY: string
  binStep: BigNumberish
  amountX: BigNumberish
  amountY: BigNumberish
  amountXMin: BigNumberish
  amountYMin: BigNumberish
  activeIdDesired: BigNumberish
  idSlippage: BigNumberish
  deltaIds: BigNumberish[]
  distributionX: BigNumberish[]
  distributionY: BigNumberish[]
  to: string
  deadline: BigNumberish
}
export interface AddLiquidityAVAX_liquidityParametersRequest {
  tokenX: string
  tokenY: string
  binStep: BigNumberish
  amountX: BigNumberish
  amountY: BigNumberish
  amountXMin: BigNumberish
  amountYMin: BigNumberish
  activeIdDesired: BigNumberish
  idSlippage: BigNumberish
  deltaIds: BigNumberish[]
  distributionX: BigNumberish[]
  distributionY: BigNumberish[]
  to: string
  deadline: BigNumberish
}
export interface GetSwapInResponse {
  amountIn: BigNumber
  0: BigNumber
  feesIn: BigNumber
  1: BigNumber
  length: 2
}
export interface GetSwapOutResponse {
  amountOut: BigNumber
  0: BigNumber
  feesIn: BigNumber
  1: BigNumber
  length: 2
}
export interface Contract {
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _liquidityParameters Type: tuple, Indexed: false
   */
  addLiquidity(
    _liquidityParameters: AddLiquidity_liquidityParametersRequest,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>
  /**
   * Payable: true
   * Constant: false
   * StateMutability: payable
   * Type: function
   * @param _liquidityParameters Type: tuple, Indexed: false
   */
  addLiquidityAVAX(
    _liquidityParameters: AddLiquidityAVAX_liquidityParametersRequest,
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
  factory(overrides?: ContractCallOverrides): Promise<string>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param _LBPair Type: address, Indexed: false
   * @param _price Type: uint256, Indexed: false
   */
  getIdFromPrice(
    _LBPair: string,
    _price: BigNumberish,
    overrides?: ContractCallOverrides,
  ): Promise<number>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param _LBPair Type: address, Indexed: false
   * @param _id Type: uint24, Indexed: false
   */
  getPriceFromId(
    _LBPair: string,
    _id: BigNumberish,
    overrides?: ContractCallOverrides,
  ): Promise<BigNumber>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param _LBPair Type: address, Indexed: false
   * @param _amountOut Type: uint256, Indexed: false
   * @param _swapForY Type: bool, Indexed: false
   */
  getSwapIn(
    _LBPair: string,
    _amountOut: BigNumberish,
    _swapForY: boolean,
    overrides?: ContractCallOverrides,
  ): Promise<GetSwapInResponse>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param _LBPair Type: address, Indexed: false
   * @param _amountIn Type: uint256, Indexed: false
   * @param _swapForY Type: bool, Indexed: false
   */
  getSwapOut(
    _LBPair: string,
    _amountIn: BigNumberish,
    _swapForY: boolean,
    overrides?: ContractCallOverrides,
  ): Promise<GetSwapOutResponse>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  oldFactory(overrides?: ContractCallOverrides): Promise<string>
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _tokenX Type: address, Indexed: false
   * @param _tokenY Type: address, Indexed: false
   * @param _binStep Type: uint16, Indexed: false
   * @param _amountXMin Type: uint256, Indexed: false
   * @param _amountYMin Type: uint256, Indexed: false
   * @param _ids Type: uint256[], Indexed: false
   * @param _amounts Type: uint256[], Indexed: false
   * @param _to Type: address, Indexed: false
   * @param _deadline Type: uint256, Indexed: false
   */
  removeLiquidity(
    _tokenX: string,
    _tokenY: string,
    _binStep: BigNumberish,
    _amountXMin: BigNumberish,
    _amountYMin: BigNumberish,
    _ids: BigNumberish[],
    _amounts: BigNumberish[],
    _to: string,
    _deadline: BigNumberish,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _token Type: address, Indexed: false
   * @param _binStep Type: uint16, Indexed: false
   * @param _amountTokenMin Type: uint256, Indexed: false
   * @param _amountAVAXMin Type: uint256, Indexed: false
   * @param _ids Type: uint256[], Indexed: false
   * @param _amounts Type: uint256[], Indexed: false
   * @param _to Type: address, Indexed: false
   * @param _deadline Type: uint256, Indexed: false
   */
  removeLiquidityAVAX(
    _token: string,
    _binStep: BigNumberish,
    _amountTokenMin: BigNumberish,
    _amountAVAXMin: BigNumberish,
    _ids: BigNumberish[],
    _amounts: BigNumberish[],
    _to: string,
    _deadline: BigNumberish,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>
  /**
   * Payable: true
   * Constant: false
   * StateMutability: payable
   * Type: function
   * @param _amountOut Type: uint256, Indexed: false
   * @param _pairBinSteps Type: uint256[], Indexed: false
   * @param _tokenPath Type: address[], Indexed: false
   * @param _to Type: address, Indexed: false
   * @param _deadline Type: uint256, Indexed: false
   */
  swapAVAXForExactTokens(
    _amountOut: BigNumberish,
    _pairBinSteps: BigNumberish[],
    _tokenPath: string[],
    _to: string,
    _deadline: BigNumberish,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>
  /**
   * Payable: true
   * Constant: false
   * StateMutability: payable
   * Type: function
   * @param _amountOutMin Type: uint256, Indexed: false
   * @param _pairBinSteps Type: uint256[], Indexed: false
   * @param _tokenPath Type: address[], Indexed: false
   * @param _to Type: address, Indexed: false
   * @param _deadline Type: uint256, Indexed: false
   */
  swapExactAVAXForTokens(
    _amountOutMin: BigNumberish,
    _pairBinSteps: BigNumberish[],
    _tokenPath: string[],
    _to: string,
    _deadline: BigNumberish,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>
  /**
   * Payable: true
   * Constant: false
   * StateMutability: payable
   * Type: function
   * @param _amountOutMin Type: uint256, Indexed: false
   * @param _pairBinSteps Type: uint256[], Indexed: false
   * @param _tokenPath Type: address[], Indexed: false
   * @param _to Type: address, Indexed: false
   * @param _deadline Type: uint256, Indexed: false
   */
  swapExactAVAXForTokensSupportingFeeOnTransferTokens(
    _amountOutMin: BigNumberish,
    _pairBinSteps: BigNumberish[],
    _tokenPath: string[],
    _to: string,
    _deadline: BigNumberish,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _amountIn Type: uint256, Indexed: false
   * @param _amountOutMinAVAX Type: uint256, Indexed: false
   * @param _pairBinSteps Type: uint256[], Indexed: false
   * @param _tokenPath Type: address[], Indexed: false
   * @param _to Type: address, Indexed: false
   * @param _deadline Type: uint256, Indexed: false
   */
  swapExactTokensForAVAX(
    _amountIn: BigNumberish,
    _amountOutMinAVAX: BigNumberish,
    _pairBinSteps: BigNumberish[],
    _tokenPath: string[],
    _to: string,
    _deadline: BigNumberish,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _amountIn Type: uint256, Indexed: false
   * @param _amountOutMinAVAX Type: uint256, Indexed: false
   * @param _pairBinSteps Type: uint256[], Indexed: false
   * @param _tokenPath Type: address[], Indexed: false
   * @param _to Type: address, Indexed: false
   * @param _deadline Type: uint256, Indexed: false
   */
  swapExactTokensForAVAXSupportingFeeOnTransferTokens(
    _amountIn: BigNumberish,
    _amountOutMinAVAX: BigNumberish,
    _pairBinSteps: BigNumberish[],
    _tokenPath: string[],
    _to: string,
    _deadline: BigNumberish,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _amountIn Type: uint256, Indexed: false
   * @param _amountOutMin Type: uint256, Indexed: false
   * @param _pairBinSteps Type: uint256[], Indexed: false
   * @param _tokenPath Type: address[], Indexed: false
   * @param _to Type: address, Indexed: false
   * @param _deadline Type: uint256, Indexed: false
   */
  swapExactTokensForTokens(
    _amountIn: BigNumberish,
    _amountOutMin: BigNumberish,
    _pairBinSteps: BigNumberish[],
    _tokenPath: string[],
    _to: string,
    _deadline: BigNumberish,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _amountIn Type: uint256, Indexed: false
   * @param _amountOutMin Type: uint256, Indexed: false
   * @param _pairBinSteps Type: uint256[], Indexed: false
   * @param _tokenPath Type: address[], Indexed: false
   * @param _to Type: address, Indexed: false
   * @param _deadline Type: uint256, Indexed: false
   */
  swapExactTokensForTokensSupportingFeeOnTransferTokens(
    _amountIn: BigNumberish,
    _amountOutMin: BigNumberish,
    _pairBinSteps: BigNumberish[],
    _tokenPath: string[],
    _to: string,
    _deadline: BigNumberish,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _amountAVAXOut Type: uint256, Indexed: false
   * @param _amountInMax Type: uint256, Indexed: false
   * @param _pairBinSteps Type: uint256[], Indexed: false
   * @param _tokenPath Type: address[], Indexed: false
   * @param _to Type: address, Indexed: false
   * @param _deadline Type: uint256, Indexed: false
   */
  swapTokensForExactAVAX(
    _amountAVAXOut: BigNumberish,
    _amountInMax: BigNumberish,
    _pairBinSteps: BigNumberish[],
    _tokenPath: string[],
    _to: string,
    _deadline: BigNumberish,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _amountOut Type: uint256, Indexed: false
   * @param _amountInMax Type: uint256, Indexed: false
   * @param _pairBinSteps Type: uint256[], Indexed: false
   * @param _tokenPath Type: address[], Indexed: false
   * @param _to Type: address, Indexed: false
   * @param _deadline Type: uint256, Indexed: false
   */
  swapTokensForExactTokens(
    _amountOut: BigNumberish,
    _amountInMax: BigNumberish,
    _pairBinSteps: BigNumberish[],
    _tokenPath: string[],
    _to: string,
    _deadline: BigNumberish,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _token Type: address, Indexed: false
   * @param _to Type: address, Indexed: false
   * @param _amount Type: uint256, Indexed: false
   */
  sweep(
    _token: string,
    _to: string,
    _amount: BigNumberish,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  wavax(overrides?: ContractCallOverrides): Promise<string>
}
