import type { EthersContractContextV5 } from '@ethereum-abi-types-generator/converter-typescript'
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
  | 'WETH9'
  | 'approveMax'
  | 'approveMaxMinusOne'
  | 'approveZeroThenMax'
  | 'approveZeroThenMaxMinusOne'
  | 'callPositionManager'
  | 'checkOracleSlippage'
  | 'exactInput'
  | 'exactInputSingle'
  | 'exactOutput'
  | 'exactOutputSingle'
  | 'factory'
  | 'factoryV2'
  | 'getApprovalType'
  | 'increaseLiquidity'
  | 'mint'
  | 'multicall'
  | 'positionManager'
  | 'pull'
  | 'refundETH'
  | 'selfPermit'
  | 'selfPermitAllowed'
  | 'selfPermitAllowedIfNecessary'
  | 'selfPermitIfNecessary'
  | 'swapExactTokensForTokens'
  | 'swapTokensForExactTokens'
  | 'sweepToken'
  | 'sweepTokenWithFee'
  | 'uniswapV3SwapCallback'
  | 'unwrapWETH9'
  | 'unwrapWETH9WithFee'
  | 'wrapETH'
export type MethodNameMap = {
  [key in MethodNames]: string
}
export interface ExactInputParamsRequest {
  path: BytesLike
  recipient: string
  amountIn: BigNumberish
  amountOutMinimum: BigNumberish
}
export interface ExactInputSingleParamsRequest {
  tokenIn: string
  tokenOut: string
  fee: BigNumberish
  recipient: string
  amountIn: BigNumberish
  amountOutMinimum: BigNumberish
  sqrtPriceLimitX96: BigNumberish
}
export interface ExactOutputParamsRequest {
  path: BytesLike
  recipient: string
  amountOut: BigNumberish
  amountInMaximum: BigNumberish
}
export interface ExactOutputSingleParamsRequest {
  tokenIn: string
  tokenOut: string
  fee: BigNumberish
  recipient: string
  amountOut: BigNumberish
  amountInMaximum: BigNumberish
  sqrtPriceLimitX96: BigNumberish
}
export interface IncreaseLiquidityParamsRequest {
  token0: string
  token1: string
  tokenId: BigNumberish
  amount0Min: BigNumberish
  amount1Min: BigNumberish
}
export interface MintParamsRequest {
  token0: string
  token1: string
  fee: BigNumberish
  tickLower: BigNumberish
  tickUpper: BigNumberish
  amount0Min: BigNumberish
  amount1Min: BigNumberish
  recipient: string
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
   * Payable: true
   * Constant: false
   * StateMutability: payable
   * Type: function
   * @param token Type: address, Indexed: false
   */
  approveMax(
    token: string,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>
  /**
   * Payable: true
   * Constant: false
   * StateMutability: payable
   * Type: function
   * @param token Type: address, Indexed: false
   */
  approveMaxMinusOne(
    token: string,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>
  /**
   * Payable: true
   * Constant: false
   * StateMutability: payable
   * Type: function
   * @param token Type: address, Indexed: false
   */
  approveZeroThenMax(
    token: string,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>
  /**
   * Payable: true
   * Constant: false
   * StateMutability: payable
   * Type: function
   * @param token Type: address, Indexed: false
   */
  approveZeroThenMaxMinusOne(
    token: string,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>
  /**
   * Payable: true
   * Constant: false
   * StateMutability: payable
   * Type: function
   * @param data Type: bytes, Indexed: false
   */
  callPositionManager(
    data: BytesLike,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param paths Type: bytes[], Indexed: false
   * @param amounts Type: uint128[], Indexed: false
   * @param maximumTickDivergence Type: uint24, Indexed: false
   * @param secondsAgo Type: uint32, Indexed: false
   */
  checkOracleSlippage(
    paths: BytesLike[],
    amounts: BigNumberish[],
    maximumTickDivergence: BigNumberish,
    secondsAgo: BigNumberish,
    overrides?: ContractCallOverrides,
  ): Promise<void>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param path Type: bytes, Indexed: false
   * @param maximumTickDivergence Type: uint24, Indexed: false
   * @param secondsAgo Type: uint32, Indexed: false
   */
  checkOracleSlippage(
    path: BytesLike,
    maximumTickDivergence: BigNumberish,
    secondsAgo: BigNumberish,
    overrides?: ContractCallOverrides,
  ): Promise<void>
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
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  factoryV2(overrides?: ContractCallOverrides): Promise<string>
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param token Type: address, Indexed: false
   * @param amount Type: uint256, Indexed: false
   */
  getApprovalType(
    token: string,
    amount: BigNumberish,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>
  /**
   * Payable: true
   * Constant: false
   * StateMutability: payable
   * Type: function
   * @param params Type: tuple, Indexed: false
   */
  increaseLiquidity(
    params: IncreaseLiquidityParamsRequest,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>
  /**
   * Payable: true
   * Constant: false
   * StateMutability: payable
   * Type: function
   * @param params Type: tuple, Indexed: false
   */
  mint(
    params: MintParamsRequest,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>
  /**
   * Payable: true
   * Constant: false
   * StateMutability: payable
   * Type: function
   * @param previousBlockhash Type: bytes32, Indexed: false
   * @param data Type: bytes[], Indexed: false
   */
  multicall(
    previousBlockhash: BytesLike,
    data: BytesLike[],
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>
  /**
   * Payable: true
   * Constant: false
   * StateMutability: payable
   * Type: function
   * @param deadline Type: uint256, Indexed: false
   * @param data Type: bytes[], Indexed: false
   */
  multicall(
    deadline: BigNumberish,
    data: BytesLike[],
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>
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
  positionManager(overrides?: ContractCallOverrides): Promise<string>
  /**
   * Payable: true
   * Constant: false
   * StateMutability: payable
   * Type: function
   * @param token Type: address, Indexed: false
   * @param value Type: uint256, Indexed: false
   */
  pull(
    token: string,
    value: BigNumberish,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>
  /**
   * Payable: true
   * Constant: false
   * StateMutability: payable
   * Type: function
   */
  refundETH(
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
   * @param amountIn Type: uint256, Indexed: false
   * @param amountOutMin Type: uint256, Indexed: false
   * @param path Type: address[], Indexed: false
   * @param to Type: address, Indexed: false
   */
  swapExactTokensForTokens(
    amountIn: BigNumberish,
    amountOutMin: BigNumberish,
    path: string[],
    to: string,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>
  /**
   * Payable: true
   * Constant: false
   * StateMutability: payable
   * Type: function
   * @param amountOut Type: uint256, Indexed: false
   * @param amountInMax Type: uint256, Indexed: false
   * @param path Type: address[], Indexed: false
   * @param to Type: address, Indexed: false
   */
  swapTokensForExactTokens(
    amountOut: BigNumberish,
    amountInMax: BigNumberish,
    path: string[],
    to: string,
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
   */
  sweepToken(
    token: string,
    amountMinimum: BigNumberish,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>
  /**
   * Payable: true
   * Constant: false
   * StateMutability: payable
   * Type: function
   * @param token Type: address, Indexed: false
   * @param amountMinimum Type: uint256, Indexed: false
   * @param feeBips Type: uint256, Indexed: false
   * @param feeRecipient Type: address, Indexed: false
   */
  sweepTokenWithFee(
    token: string,
    amountMinimum: BigNumberish,
    feeBips: BigNumberish,
    feeRecipient: string,
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
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param amount0Delta Type: int256, Indexed: false
   * @param amount1Delta Type: int256, Indexed: false
   * @param _data Type: bytes, Indexed: false
   */
  uniswapV3SwapCallback(
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
   * @param amountMinimum Type: uint256, Indexed: false
   * @param recipient Type: address, Indexed: false
   */
  unwrapWETH9(
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
   */
  unwrapWETH9(
    amountMinimum: BigNumberish,
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
  unwrapWETH9WithFee(
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
   * @param feeBips Type: uint256, Indexed: false
   * @param feeRecipient Type: address, Indexed: false
   */
  unwrapWETH9WithFee(
    amountMinimum: BigNumberish,
    feeBips: BigNumberish,
    feeRecipient: string,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>
  /**
   * Payable: true
   * Constant: false
   * StateMutability: payable
   * Type: function
   * @param value Type: uint256, Indexed: false
   */
  wrapETH(
    value: BigNumberish,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>
}
