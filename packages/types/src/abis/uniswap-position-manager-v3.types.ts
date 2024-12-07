import type { EthersContractContextV5 } from '@abi-toolkit/converter-typescript'
import type {
  ContractTransaction,
  BytesLike,
  BigNumber,
  BigNumberish,
} from 'ethers'

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
  | 'Approval'
  | 'ApprovalForAll'
  | 'Collect'
  | 'DecreaseLiquidity'
  | 'IncreaseLiquidity'
  | 'Transfer'
export interface EventsContext {
  Approval(owner: string, approved: string, tokenId: BigNumberish): EventFilter
  ApprovalForAll(
    owner: string,
    operator: string,
    approved: boolean,
  ): EventFilter
  Collect(
    tokenId: BigNumberish,
    recipient: string,
    amount0: BigNumberish,
    amount1: BigNumberish,
  ): EventFilter
  DecreaseLiquidity(
    tokenId: BigNumberish,
    liquidity: BigNumberish,
    amount0: BigNumberish,
    amount1: BigNumberish,
  ): EventFilter
  IncreaseLiquidity(
    tokenId: BigNumberish,
    liquidity: BigNumberish,
    amount0: BigNumberish,
    amount1: BigNumberish,
  ): EventFilter
  Transfer(from: string, to: string, tokenId: BigNumberish): EventFilter
}
export type MethodNames =
  | 'DOMAIN_SEPARATOR'
  | 'PERMIT_TYPEHASH'
  | 'WETH9'
  | 'approve'
  | 'balanceOf'
  | 'baseURI'
  | 'burn'
  | 'collect'
  | 'createAndInitializePoolIfNecessary'
  | 'decreaseLiquidity'
  | 'factory'
  | 'getApproved'
  | 'increaseLiquidity'
  | 'isApprovedForAll'
  | 'mint'
  | 'multicall'
  | 'name'
  | 'ownerOf'
  | 'permit'
  | 'positions'
  | 'refundETH'
  | 'safeTransferFrom'
  | 'selfPermit'
  | 'selfPermitAllowed'
  | 'selfPermitAllowedIfNecessary'
  | 'selfPermitIfNecessary'
  | 'setApprovalForAll'
  | 'supportsInterface'
  | 'sweepToken'
  | 'symbol'
  | 'tokenByIndex'
  | 'tokenOfOwnerByIndex'
  | 'tokenURI'
  | 'totalSupply'
  | 'transferFrom'
  | 'uniswapV3MintCallback'
  | 'unwrapWETH9'
export type MethodNameMap = {
  [key in MethodNames]: string
}
export interface ApprovalEventEmittedResponse {
  owner: string
  approved: string
  tokenId: BigNumberish
}
export interface ApprovalForAllEventEmittedResponse {
  owner: string
  operator: string
  approved: boolean
}
export interface CollectEventEmittedResponse {
  tokenId: BigNumberish
  recipient: string
  amount0: BigNumberish
  amount1: BigNumberish
}
export interface DecreaseLiquidityEventEmittedResponse {
  tokenId: BigNumberish
  liquidity: BigNumberish
  amount0: BigNumberish
  amount1: BigNumberish
}
export interface IncreaseLiquidityEventEmittedResponse {
  tokenId: BigNumberish
  liquidity: BigNumberish
  amount0: BigNumberish
  amount1: BigNumberish
}
export interface TransferEventEmittedResponse {
  from: string
  to: string
  tokenId: BigNumberish
}
export interface CollectParamsRequest {
  tokenId: BigNumberish
  recipient: string
  amount0Max: BigNumberish
  amount1Max: BigNumberish
}
export interface DecreaseLiquidityParamsRequest {
  tokenId: BigNumberish
  liquidity: BigNumberish
  amount0Min: BigNumberish
  amount1Min: BigNumberish
  deadline: BigNumberish
}
export interface IncreaseLiquidityParamsRequest {
  tokenId: BigNumberish
  amount0Desired: BigNumberish
  amount1Desired: BigNumberish
  amount0Min: BigNumberish
  amount1Min: BigNumberish
  deadline: BigNumberish
}
export interface MintParamsRequest {
  token0: string
  token1: string
  fee: BigNumberish
  tickLower: BigNumberish
  tickUpper: BigNumberish
  amount0Desired: BigNumberish
  amount1Desired: BigNumberish
  amount0Min: BigNumberish
  amount1Min: BigNumberish
  recipient: string
  deadline: BigNumberish
}
export interface PositionsResponse {
  nonce: BigNumber
  0: BigNumber
  operator: string
  1: string
  token0: string
  2: string
  token1: string
  3: string
  fee: number
  4: number
  tickLower: number
  5: number
  tickUpper: number
  6: number
  liquidity: BigNumber
  7: BigNumber
  feeGrowthInside0LastX128: BigNumber
  8: BigNumber
  feeGrowthInside1LastX128: BigNumber
  9: BigNumber
  tokensOwed0: BigNumber
  10: BigNumber
  tokensOwed1: BigNumber
  11: BigNumber
  length: 12
}
export interface Contract {
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  DOMAIN_SEPARATOR(overrides?: ContractCallOverrides): Promise<string>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  PERMIT_TYPEHASH(overrides?: ContractCallOverrides): Promise<string>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  WETH9(overrides?: ContractCallOverrides): Promise<string>
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param to Type: address, Indexed: false
   * @param tokenId Type: uint256, Indexed: false
   */
  approve(
    to: string,
    tokenId: BigNumberish,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param owner Type: address, Indexed: false
   */
  balanceOf(
    owner: string,
    overrides?: ContractCallOverrides,
  ): Promise<BigNumber>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: pure
   * Type: function
   */
  baseURI(overrides?: ContractCallOverrides): Promise<string>
  /**
   * Payable: true
   * Constant: false
   * StateMutability: payable
   * Type: function
   * @param tokenId Type: uint256, Indexed: false
   */
  burn(
    tokenId: BigNumberish,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>
  /**
   * Payable: true
   * Constant: false
   * StateMutability: payable
   * Type: function
   * @param params Type: tuple, Indexed: false
   */
  collect(
    params: CollectParamsRequest,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>
  /**
   * Payable: true
   * Constant: false
   * StateMutability: payable
   * Type: function
   * @param token0 Type: address, Indexed: false
   * @param token1 Type: address, Indexed: false
   * @param fee Type: uint24, Indexed: false
   * @param sqrtPriceX96 Type: uint160, Indexed: false
   */
  createAndInitializePoolIfNecessary(
    token0: string,
    token1: string,
    fee: BigNumberish,
    sqrtPriceX96: BigNumberish,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>
  /**
   * Payable: true
   * Constant: false
   * StateMutability: payable
   * Type: function
   * @param params Type: tuple, Indexed: false
   */
  decreaseLiquidity(
    params: DecreaseLiquidityParamsRequest,
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
   * @param tokenId Type: uint256, Indexed: false
   */
  getApproved(
    tokenId: BigNumberish,
    overrides?: ContractCallOverrides,
  ): Promise<string>
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
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param owner Type: address, Indexed: false
   * @param operator Type: address, Indexed: false
   */
  isApprovedForAll(
    owner: string,
    operator: string,
    overrides?: ContractCallOverrides,
  ): Promise<boolean>
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
  name(overrides?: ContractCallOverrides): Promise<string>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param tokenId Type: uint256, Indexed: false
   */
  ownerOf(
    tokenId: BigNumberish,
    overrides?: ContractCallOverrides,
  ): Promise<string>
  /**
   * Payable: true
   * Constant: false
   * StateMutability: payable
   * Type: function
   * @param spender Type: address, Indexed: false
   * @param tokenId Type: uint256, Indexed: false
   * @param deadline Type: uint256, Indexed: false
   * @param v Type: uint8, Indexed: false
   * @param r Type: bytes32, Indexed: false
   * @param s Type: bytes32, Indexed: false
   */
  permit(
    spender: string,
    tokenId: BigNumberish,
    deadline: BigNumberish,
    v: BigNumberish,
    r: BytesLike,
    s: BytesLike,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param tokenId Type: uint256, Indexed: false
   */
  positions(
    tokenId: BigNumberish,
    overrides?: ContractCallOverrides,
  ): Promise<PositionsResponse>
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
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param from Type: address, Indexed: false
   * @param to Type: address, Indexed: false
   * @param tokenId Type: uint256, Indexed: false
   */
  safeTransferFrom(
    from: string,
    to: string,
    tokenId: BigNumberish,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param from Type: address, Indexed: false
   * @param to Type: address, Indexed: false
   * @param tokenId Type: uint256, Indexed: false
   * @param _data Type: bytes, Indexed: false
   */
  safeTransferFrom(
    from: string,
    to: string,
    tokenId: BigNumberish,
    _data: BytesLike,
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
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param operator Type: address, Indexed: false
   * @param approved Type: bool, Indexed: false
   */
  setApprovalForAll(
    operator: string,
    approved: boolean,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param interfaceId Type: bytes4, Indexed: false
   */
  supportsInterface(
    interfaceId: BytesLike,
    overrides?: ContractCallOverrides,
  ): Promise<boolean>
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
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  symbol(overrides?: ContractCallOverrides): Promise<string>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param index Type: uint256, Indexed: false
   */
  tokenByIndex(
    index: BigNumberish,
    overrides?: ContractCallOverrides,
  ): Promise<BigNumber>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param owner Type: address, Indexed: false
   * @param index Type: uint256, Indexed: false
   */
  tokenOfOwnerByIndex(
    owner: string,
    index: BigNumberish,
    overrides?: ContractCallOverrides,
  ): Promise<BigNumber>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param tokenId Type: uint256, Indexed: false
   */
  tokenURI(
    tokenId: BigNumberish,
    overrides?: ContractCallOverrides,
  ): Promise<string>
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
   * @param from Type: address, Indexed: false
   * @param to Type: address, Indexed: false
   * @param tokenId Type: uint256, Indexed: false
   */
  transferFrom(
    from: string,
    to: string,
    tokenId: BigNumberish,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param amount0Owed Type: uint256, Indexed: false
   * @param amount1Owed Type: uint256, Indexed: false
   * @param data Type: bytes, Indexed: false
   */
  uniswapV3MintCallback(
    amount0Owed: BigNumberish,
    amount1Owed: BigNumberish,
    data: BytesLike,
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
}
