import type { EthersContractContextV5 } from '@abi-toolkit/converter-typescript'
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
  | 'addLiquidityNATIVE'
  | 'createLBPair'
  | 'getFactory'
  | 'getFactoryV2_1'
  | 'getIdFromPrice'
  | 'getLegacyFactory'
  | 'getLegacyRouter'
  | 'getPriceFromId'
  | 'getSwapIn'
  | 'getSwapOut'
  | 'getV1Factory'
  | 'getWNATIVE'
  | 'removeLiquidity'
  | 'removeLiquidityNATIVE'
  | 'swapExactNATIVEForTokens'
  | 'swapExactNATIVEForTokensSupportingFeeOnTransferTokens'
  | 'swapExactTokensForNATIVE'
  | 'swapExactTokensForNATIVESupportingFeeOnTransferTokens'
  | 'swapExactTokensForTokens'
  | 'swapExactTokensForTokensSupportingFeeOnTransferTokens'
  | 'swapNATIVEForExactTokens'
  | 'swapTokensForExactNATIVE'
  | 'swapTokensForExactTokens'
  | 'sweep'
  | 'sweepLBToken'
export type MethodNameMap = {
  [key in MethodNames]: string
}
export interface AddLiquidityLiquidityParametersRequest {
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
  refundTo: string
  deadline: BigNumberish
}
export interface AddLiquidityNATIVELiquidityParametersRequest {
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
  refundTo: string
  deadline: BigNumberish
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
export interface SwapExactNATIVEForTokensPathRequest {
  pairBinSteps: BigNumberish[]
  versions: BigNumberish[]
  tokenPath: string[]
}
export interface SwapExactNATIVEForTokensSupportingFeeOnTransferTokensPathRequest {
  pairBinSteps: BigNumberish[]
  versions: BigNumberish[]
  tokenPath: string[]
}
export interface SwapExactTokensForNATIVEPathRequest {
  pairBinSteps: BigNumberish[]
  versions: BigNumberish[]
  tokenPath: string[]
}
export interface SwapExactTokensForNATIVESupportingFeeOnTransferTokensPathRequest {
  pairBinSteps: BigNumberish[]
  versions: BigNumberish[]
  tokenPath: string[]
}
export interface SwapExactTokensForTokensPathRequest {
  pairBinSteps: BigNumberish[]
  versions: BigNumberish[]
  tokenPath: string[]
}
export interface SwapExactTokensForTokensSupportingFeeOnTransferTokensPathRequest {
  pairBinSteps: BigNumberish[]
  versions: BigNumberish[]
  tokenPath: string[]
}
export interface SwapNATIVEForExactTokensPathRequest {
  pairBinSteps: BigNumberish[]
  versions: BigNumberish[]
  tokenPath: string[]
}
export interface SwapTokensForExactNATIVEPathRequest {
  pairBinSteps: BigNumberish[]
  versions: BigNumberish[]
  tokenPath: string[]
}
export interface SwapTokensForExactTokensPathRequest {
  pairBinSteps: BigNumberish[]
  versions: BigNumberish[]
  tokenPath: string[]
}
export interface Contract {
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param liquidityParameters Type: tuple, Indexed: false
   */
  addLiquidity(
    liquidityParameters: AddLiquidityLiquidityParametersRequest,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>
  /**
   * Payable: true
   * Constant: false
   * StateMutability: payable
   * Type: function
   * @param liquidityParameters Type: tuple, Indexed: false
   */
  addLiquidityNATIVE(
    liquidityParameters: AddLiquidityNATIVELiquidityParametersRequest,
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
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  getFactory(overrides?: ContractCallOverrides): Promise<string>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  getFactoryV2_1(overrides?: ContractCallOverrides): Promise<string>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param pair Type: address, Indexed: false
   * @param price Type: uint256, Indexed: false
   */
  getIdFromPrice(
    pair: string,
    price: BigNumberish,
    overrides?: ContractCallOverrides,
  ): Promise<number>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  getLegacyFactory(overrides?: ContractCallOverrides): Promise<string>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  getLegacyRouter(overrides?: ContractCallOverrides): Promise<string>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param pair Type: address, Indexed: false
   * @param id Type: uint24, Indexed: false
   */
  getPriceFromId(
    pair: string,
    id: BigNumberish,
    overrides?: ContractCallOverrides,
  ): Promise<BigNumber>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param pair Type: address, Indexed: false
   * @param amountOut Type: uint128, Indexed: false
   * @param swapForY Type: bool, Indexed: false
   */
  getSwapIn(
    pair: string,
    amountOut: BigNumberish,
    swapForY: boolean,
    overrides?: ContractCallOverrides,
  ): Promise<GetSwapInResponse>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param pair Type: address, Indexed: false
   * @param amountIn Type: uint128, Indexed: false
   * @param swapForY Type: bool, Indexed: false
   */
  getSwapOut(
    pair: string,
    amountIn: BigNumberish,
    swapForY: boolean,
    overrides?: ContractCallOverrides,
  ): Promise<GetSwapOutResponse>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  getV1Factory(overrides?: ContractCallOverrides): Promise<string>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  getWNATIVE(overrides?: ContractCallOverrides): Promise<string>
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param tokenX Type: address, Indexed: false
   * @param tokenY Type: address, Indexed: false
   * @param binStep Type: uint16, Indexed: false
   * @param amountXMin Type: uint256, Indexed: false
   * @param amountYMin Type: uint256, Indexed: false
   * @param ids Type: uint256[], Indexed: false
   * @param amounts Type: uint256[], Indexed: false
   * @param to Type: address, Indexed: false
   * @param deadline Type: uint256, Indexed: false
   */
  removeLiquidity(
    tokenX: string,
    tokenY: string,
    binStep: BigNumberish,
    amountXMin: BigNumberish,
    amountYMin: BigNumberish,
    ids: BigNumberish[],
    amounts: BigNumberish[],
    to: string,
    deadline: BigNumberish,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param token Type: address, Indexed: false
   * @param binStep Type: uint16, Indexed: false
   * @param amountTokenMin Type: uint256, Indexed: false
   * @param amountNATIVEMin Type: uint256, Indexed: false
   * @param ids Type: uint256[], Indexed: false
   * @param amounts Type: uint256[], Indexed: false
   * @param to Type: address, Indexed: false
   * @param deadline Type: uint256, Indexed: false
   */
  removeLiquidityNATIVE(
    token: string,
    binStep: BigNumberish,
    amountTokenMin: BigNumberish,
    amountNATIVEMin: BigNumberish,
    ids: BigNumberish[],
    amounts: BigNumberish[],
    to: string,
    deadline: BigNumberish,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>
  /**
   * Payable: true
   * Constant: false
   * StateMutability: payable
   * Type: function
   * @param amountOutMin Type: uint256, Indexed: false
   * @param path Type: tuple, Indexed: false
   * @param to Type: address, Indexed: false
   * @param deadline Type: uint256, Indexed: false
   */
  swapExactNATIVEForTokens(
    amountOutMin: BigNumberish,
    path: SwapExactNATIVEForTokensPathRequest,
    to: string,
    deadline: BigNumberish,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>
  /**
   * Payable: true
   * Constant: false
   * StateMutability: payable
   * Type: function
   * @param amountOutMin Type: uint256, Indexed: false
   * @param path Type: tuple, Indexed: false
   * @param to Type: address, Indexed: false
   * @param deadline Type: uint256, Indexed: false
   */
  swapExactNATIVEForTokensSupportingFeeOnTransferTokens(
    amountOutMin: BigNumberish,
    path: SwapExactNATIVEForTokensSupportingFeeOnTransferTokensPathRequest,
    to: string,
    deadline: BigNumberish,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param amountIn Type: uint256, Indexed: false
   * @param amountOutMinNATIVE Type: uint256, Indexed: false
   * @param path Type: tuple, Indexed: false
   * @param to Type: address, Indexed: false
   * @param deadline Type: uint256, Indexed: false
   */
  swapExactTokensForNATIVE(
    amountIn: BigNumberish,
    amountOutMinNATIVE: BigNumberish,
    path: SwapExactTokensForNATIVEPathRequest,
    to: string,
    deadline: BigNumberish,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param amountIn Type: uint256, Indexed: false
   * @param amountOutMinNATIVE Type: uint256, Indexed: false
   * @param path Type: tuple, Indexed: false
   * @param to Type: address, Indexed: false
   * @param deadline Type: uint256, Indexed: false
   */
  swapExactTokensForNATIVESupportingFeeOnTransferTokens(
    amountIn: BigNumberish,
    amountOutMinNATIVE: BigNumberish,
    path: SwapExactTokensForNATIVESupportingFeeOnTransferTokensPathRequest,
    to: string,
    deadline: BigNumberish,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param amountIn Type: uint256, Indexed: false
   * @param amountOutMin Type: uint256, Indexed: false
   * @param path Type: tuple, Indexed: false
   * @param to Type: address, Indexed: false
   * @param deadline Type: uint256, Indexed: false
   */
  swapExactTokensForTokens(
    amountIn: BigNumberish,
    amountOutMin: BigNumberish,
    path: SwapExactTokensForTokensPathRequest,
    to: string,
    deadline: BigNumberish,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param amountIn Type: uint256, Indexed: false
   * @param amountOutMin Type: uint256, Indexed: false
   * @param path Type: tuple, Indexed: false
   * @param to Type: address, Indexed: false
   * @param deadline Type: uint256, Indexed: false
   */
  swapExactTokensForTokensSupportingFeeOnTransferTokens(
    amountIn: BigNumberish,
    amountOutMin: BigNumberish,
    path: SwapExactTokensForTokensSupportingFeeOnTransferTokensPathRequest,
    to: string,
    deadline: BigNumberish,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>
  /**
   * Payable: true
   * Constant: false
   * StateMutability: payable
   * Type: function
   * @param amountOut Type: uint256, Indexed: false
   * @param path Type: tuple, Indexed: false
   * @param to Type: address, Indexed: false
   * @param deadline Type: uint256, Indexed: false
   */
  swapNATIVEForExactTokens(
    amountOut: BigNumberish,
    path: SwapNATIVEForExactTokensPathRequest,
    to: string,
    deadline: BigNumberish,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param amountNATIVEOut Type: uint256, Indexed: false
   * @param amountInMax Type: uint256, Indexed: false
   * @param path Type: tuple, Indexed: false
   * @param to Type: address, Indexed: false
   * @param deadline Type: uint256, Indexed: false
   */
  swapTokensForExactNATIVE(
    amountNATIVEOut: BigNumberish,
    amountInMax: BigNumberish,
    path: SwapTokensForExactNATIVEPathRequest,
    to: string,
    deadline: BigNumberish,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param amountOut Type: uint256, Indexed: false
   * @param amountInMax Type: uint256, Indexed: false
   * @param path Type: tuple, Indexed: false
   * @param to Type: address, Indexed: false
   * @param deadline Type: uint256, Indexed: false
   */
  swapTokensForExactTokens(
    amountOut: BigNumberish,
    amountInMax: BigNumberish,
    path: SwapTokensForExactTokensPathRequest,
    to: string,
    deadline: BigNumberish,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param token Type: address, Indexed: false
   * @param to Type: address, Indexed: false
   * @param amount Type: uint256, Indexed: false
   */
  sweep(
    token: string,
    to: string,
    amount: BigNumberish,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param lbToken Type: address, Indexed: false
   * @param to Type: address, Indexed: false
   * @param ids Type: uint256[], Indexed: false
   * @param amounts Type: uint256[], Indexed: false
   */
  sweepLBToken(
    lbToken: string,
    to: string,
    ids: BigNumberish[],
    amounts: BigNumberish[],
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>
}
