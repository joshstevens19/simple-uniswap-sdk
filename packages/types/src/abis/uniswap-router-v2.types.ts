import type { EthersContractContextV5 } from '@ethereum-abi-types-generator/converter-typescript'
import type {
  ContractTransaction,
  BytesLike,
  BigNumber,
  BigNumberish,
} from 'ethers'

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
  | 'WETH'
  | 'addLiquidity'
  | 'addLiquidityETH'
  | 'factory'
  | 'getAmountIn'
  | 'getAmountOut'
  | 'getAmountsIn'
  | 'getAmountsOut'
  | 'quote'
  | 'removeLiquidity'
  | 'removeLiquidityETH'
  | 'removeLiquidityETHSupportingFeeOnTransferTokens'
  | 'removeLiquidityETHWithPermit'
  | 'removeLiquidityETHWithPermitSupportingFeeOnTransferTokens'
  | 'removeLiquidityWithPermit'
  | 'swapETHForExactTokens'
  | 'swapExactETHForTokens'
  | 'swapExactETHForTokensSupportingFeeOnTransferTokens'
  | 'swapExactTokensForETH'
  | 'swapExactTokensForETHSupportingFeeOnTransferTokens'
  | 'swapExactTokensForTokens'
  | 'swapExactTokensForTokensSupportingFeeOnTransferTokens'
  | 'swapTokensForExactETH'
  | 'swapTokensForExactTokens'
export type MethodNameMap = {
  [key in MethodNames]: string
}
export interface Contract {
  /**
   * Payable: false
   * Constant: true
   * StateMutability: pure
   * Type: function
   */
  WETH(overrides?: ContractCallOverrides): Promise<string>
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param tokenA Type: address, Indexed: false
   * @param tokenB Type: address, Indexed: false
   * @param amountADesired Type: uint256, Indexed: false
   * @param amountBDesired Type: uint256, Indexed: false
   * @param amountAMin Type: uint256, Indexed: false
   * @param amountBMin Type: uint256, Indexed: false
   * @param to Type: address, Indexed: false
   * @param deadline Type: uint256, Indexed: false
   */
  addLiquidity(
    tokenA: string,
    tokenB: string,
    amountADesired: BigNumberish,
    amountBDesired: BigNumberish,
    amountAMin: BigNumberish,
    amountBMin: BigNumberish,
    to: string,
    deadline: BigNumberish,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>
  /**
   * Payable: true
   * Constant: false
   * StateMutability: payable
   * Type: function
   * @param token Type: address, Indexed: false
   * @param amountTokenDesired Type: uint256, Indexed: false
   * @param amountTokenMin Type: uint256, Indexed: false
   * @param amountETHMin Type: uint256, Indexed: false
   * @param to Type: address, Indexed: false
   * @param deadline Type: uint256, Indexed: false
   */
  addLiquidityETH(
    token: string,
    amountTokenDesired: BigNumberish,
    amountTokenMin: BigNumberish,
    amountETHMin: BigNumberish,
    to: string,
    deadline: BigNumberish,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: pure
   * Type: function
   */
  factory(overrides?: ContractCallOverrides): Promise<string>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: pure
   * Type: function
   * @param amountOut Type: uint256, Indexed: false
   * @param reserveIn Type: uint256, Indexed: false
   * @param reserveOut Type: uint256, Indexed: false
   */
  getAmountIn(
    amountOut: BigNumberish,
    reserveIn: BigNumberish,
    reserveOut: BigNumberish,
    overrides?: ContractCallOverrides,
  ): Promise<BigNumber>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: pure
   * Type: function
   * @param amountIn Type: uint256, Indexed: false
   * @param reserveIn Type: uint256, Indexed: false
   * @param reserveOut Type: uint256, Indexed: false
   */
  getAmountOut(
    amountIn: BigNumberish,
    reserveIn: BigNumberish,
    reserveOut: BigNumberish,
    overrides?: ContractCallOverrides,
  ): Promise<BigNumber>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param amountOut Type: uint256, Indexed: false
   * @param path Type: address[], Indexed: false
   */
  getAmountsIn(
    amountOut: BigNumberish,
    path: string[],
    overrides?: ContractCallOverrides,
  ): Promise<BigNumber[]>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param amountIn Type: uint256, Indexed: false
   * @param path Type: address[], Indexed: false
   */
  getAmountsOut(
    amountIn: BigNumberish,
    path: string[],
    overrides?: ContractCallOverrides,
  ): Promise<BigNumber[]>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: pure
   * Type: function
   * @param amountA Type: uint256, Indexed: false
   * @param reserveA Type: uint256, Indexed: false
   * @param reserveB Type: uint256, Indexed: false
   */
  quote(
    amountA: BigNumberish,
    reserveA: BigNumberish,
    reserveB: BigNumberish,
    overrides?: ContractCallOverrides,
  ): Promise<BigNumber>
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param tokenA Type: address, Indexed: false
   * @param tokenB Type: address, Indexed: false
   * @param liquidity Type: uint256, Indexed: false
   * @param amountAMin Type: uint256, Indexed: false
   * @param amountBMin Type: uint256, Indexed: false
   * @param to Type: address, Indexed: false
   * @param deadline Type: uint256, Indexed: false
   */
  removeLiquidity(
    tokenA: string,
    tokenB: string,
    liquidity: BigNumberish,
    amountAMin: BigNumberish,
    amountBMin: BigNumberish,
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
   * @param liquidity Type: uint256, Indexed: false
   * @param amountTokenMin Type: uint256, Indexed: false
   * @param amountETHMin Type: uint256, Indexed: false
   * @param to Type: address, Indexed: false
   * @param deadline Type: uint256, Indexed: false
   */
  removeLiquidityETH(
    token: string,
    liquidity: BigNumberish,
    amountTokenMin: BigNumberish,
    amountETHMin: BigNumberish,
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
   * @param liquidity Type: uint256, Indexed: false
   * @param amountTokenMin Type: uint256, Indexed: false
   * @param amountETHMin Type: uint256, Indexed: false
   * @param to Type: address, Indexed: false
   * @param deadline Type: uint256, Indexed: false
   */
  removeLiquidityETHSupportingFeeOnTransferTokens(
    token: string,
    liquidity: BigNumberish,
    amountTokenMin: BigNumberish,
    amountETHMin: BigNumberish,
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
   * @param liquidity Type: uint256, Indexed: false
   * @param amountTokenMin Type: uint256, Indexed: false
   * @param amountETHMin Type: uint256, Indexed: false
   * @param to Type: address, Indexed: false
   * @param deadline Type: uint256, Indexed: false
   * @param approveMax Type: bool, Indexed: false
   * @param v Type: uint8, Indexed: false
   * @param r Type: bytes32, Indexed: false
   * @param s Type: bytes32, Indexed: false
   */
  removeLiquidityETHWithPermit(
    token: string,
    liquidity: BigNumberish,
    amountTokenMin: BigNumberish,
    amountETHMin: BigNumberish,
    to: string,
    deadline: BigNumberish,
    approveMax: boolean,
    v: BigNumberish,
    r: BytesLike,
    s: BytesLike,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param token Type: address, Indexed: false
   * @param liquidity Type: uint256, Indexed: false
   * @param amountTokenMin Type: uint256, Indexed: false
   * @param amountETHMin Type: uint256, Indexed: false
   * @param to Type: address, Indexed: false
   * @param deadline Type: uint256, Indexed: false
   * @param approveMax Type: bool, Indexed: false
   * @param v Type: uint8, Indexed: false
   * @param r Type: bytes32, Indexed: false
   * @param s Type: bytes32, Indexed: false
   */
  removeLiquidityETHWithPermitSupportingFeeOnTransferTokens(
    token: string,
    liquidity: BigNumberish,
    amountTokenMin: BigNumberish,
    amountETHMin: BigNumberish,
    to: string,
    deadline: BigNumberish,
    approveMax: boolean,
    v: BigNumberish,
    r: BytesLike,
    s: BytesLike,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param tokenA Type: address, Indexed: false
   * @param tokenB Type: address, Indexed: false
   * @param liquidity Type: uint256, Indexed: false
   * @param amountAMin Type: uint256, Indexed: false
   * @param amountBMin Type: uint256, Indexed: false
   * @param to Type: address, Indexed: false
   * @param deadline Type: uint256, Indexed: false
   * @param approveMax Type: bool, Indexed: false
   * @param v Type: uint8, Indexed: false
   * @param r Type: bytes32, Indexed: false
   * @param s Type: bytes32, Indexed: false
   */
  removeLiquidityWithPermit(
    tokenA: string,
    tokenB: string,
    liquidity: BigNumberish,
    amountAMin: BigNumberish,
    amountBMin: BigNumberish,
    to: string,
    deadline: BigNumberish,
    approveMax: boolean,
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
   * @param amountOut Type: uint256, Indexed: false
   * @param path Type: address[], Indexed: false
   * @param to Type: address, Indexed: false
   * @param deadline Type: uint256, Indexed: false
   */
  swapETHForExactTokens(
    amountOut: BigNumberish,
    path: string[],
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
   * @param path Type: address[], Indexed: false
   * @param to Type: address, Indexed: false
   * @param deadline Type: uint256, Indexed: false
   */
  swapExactETHForTokens(
    amountOutMin: BigNumberish,
    path: string[],
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
   * @param path Type: address[], Indexed: false
   * @param to Type: address, Indexed: false
   * @param deadline Type: uint256, Indexed: false
   */
  swapExactETHForTokensSupportingFeeOnTransferTokens(
    amountOutMin: BigNumberish,
    path: string[],
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
   * @param path Type: address[], Indexed: false
   * @param to Type: address, Indexed: false
   * @param deadline Type: uint256, Indexed: false
   */
  swapExactTokensForETH(
    amountIn: BigNumberish,
    amountOutMin: BigNumberish,
    path: string[],
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
   * @param path Type: address[], Indexed: false
   * @param to Type: address, Indexed: false
   * @param deadline Type: uint256, Indexed: false
   */
  swapExactTokensForETHSupportingFeeOnTransferTokens(
    amountIn: BigNumberish,
    amountOutMin: BigNumberish,
    path: string[],
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
   * @param path Type: address[], Indexed: false
   * @param to Type: address, Indexed: false
   * @param deadline Type: uint256, Indexed: false
   */
  swapExactTokensForTokens(
    amountIn: BigNumberish,
    amountOutMin: BigNumberish,
    path: string[],
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
   * @param path Type: address[], Indexed: false
   * @param to Type: address, Indexed: false
   * @param deadline Type: uint256, Indexed: false
   */
  swapExactTokensForTokensSupportingFeeOnTransferTokens(
    amountIn: BigNumberish,
    amountOutMin: BigNumberish,
    path: string[],
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
   * @param path Type: address[], Indexed: false
   * @param to Type: address, Indexed: false
   * @param deadline Type: uint256, Indexed: false
   */
  swapTokensForExactETH(
    amountOut: BigNumberish,
    amountInMax: BigNumberish,
    path: string[],
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
   * @param path Type: address[], Indexed: false
   * @param to Type: address, Indexed: false
   * @param deadline Type: uint256, Indexed: false
   */
  swapTokensForExactTokens(
    amountOut: BigNumberish,
    amountInMax: BigNumberish,
    path: string[],
    to: string,
    deadline: BigNumberish,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>
}
