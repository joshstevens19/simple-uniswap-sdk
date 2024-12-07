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
  | 'WETH9'
  | 'factory'
  | 'quoteExactInput'
  | 'quoteExactInputSingle'
  | 'quoteExactOutput'
  | 'quoteExactOutputSingle'
  | 'uniswapV3SwapCallback'
export type MethodNameMap = {
  [key in MethodNames]: string
}
export interface QuoteExactInputResponse {
  amountOut: BigNumber
  0: BigNumber
  sqrtPriceX96AfterList: BigNumber[]
  1: BigNumber[]
  initializedTicksCrossedList: number[]
  2: number[]
  gasEstimate: BigNumber
  3: BigNumber
  length: 4
}
export interface QuoteExactInputSingleParamsRequest {
  tokenIn: string
  tokenOut: string
  amountIn: BigNumberish
  fee: BigNumberish
  sqrtPriceLimitX96: BigNumberish
}
export interface QuoteExactInputSingleResponse {
  amountOut: BigNumber
  0: BigNumber
  sqrtPriceX96After: BigNumber
  1: BigNumber
  initializedTicksCrossed: number
  2: number
  gasEstimate: BigNumber
  3: BigNumber
  length: 4
}
export interface QuoteExactOutputResponse {
  amountIn: BigNumber
  0: BigNumber
  sqrtPriceX96AfterList: BigNumber[]
  1: BigNumber[]
  initializedTicksCrossedList: number[]
  2: number[]
  gasEstimate: BigNumber
  3: BigNumber
  length: 4
}
export interface QuoteExactOutputSingleParamsRequest {
  tokenIn: string
  tokenOut: string
  amount: BigNumberish
  fee: BigNumberish
  sqrtPriceLimitX96: BigNumberish
}
export interface QuoteExactOutputSingleResponse {
  amountIn: BigNumber
  0: BigNumber
  sqrtPriceX96After: BigNumber
  1: BigNumber
  initializedTicksCrossed: number
  2: number
  gasEstimate: BigNumber
  3: BigNumber
  length: 4
}
export interface Contract {
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  WETH9(overrides?: ContractCallOverrides): Promise<string>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  factory(overrides?: ContractCallOverrides): Promise<string>
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
   * @param params Type: tuple, Indexed: false
   */
  quoteExactInputSingle(
    params: QuoteExactInputSingleParamsRequest,
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
   * @param params Type: tuple, Indexed: false
   */
  quoteExactOutputSingle(
    params: QuoteExactOutputSingleParamsRequest,
    overrides?: ContractTransactionOverrides,
  ): Promise<QuoteExactOutputSingleResponse>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param amount0Delta Type: int256, Indexed: false
   * @param amount1Delta Type: int256, Indexed: false
   * @param path Type: bytes, Indexed: false
   */
  uniswapV3SwapCallback(
    amount0Delta: BigNumberish,
    amount1Delta: BigNumberish,
    path: BytesLike,
    overrides?: ContractCallOverrides,
  ): Promise<void>
}
