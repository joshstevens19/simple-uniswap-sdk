import type { EthersContractContextV5 } from '@ethereum-abi-types-generator/converter-typescript'
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
export type Events = 'Approval' | 'Burn' | 'Mint' | 'Swap' | 'Sync' | 'Transfer'
export interface EventsContext {
  Approval(owner: string, spender: string, value: BigNumberish): EventFilter
  Burn(
    sender: string,
    amount0: BigNumberish,
    amount1: BigNumberish,
    to: string,
  ): EventFilter
  Mint(
    sender: string,
    amount0: BigNumberish,
    amount1: BigNumberish,
  ): EventFilter
  Swap(
    sender: string,
    amount0In: BigNumberish,
    amount1In: BigNumberish,
    amount0Out: BigNumberish,
    amount1Out: BigNumberish,
    to: string,
  ): EventFilter
  Sync(reserve0: BigNumberish, reserve1: BigNumberish): EventFilter
  Transfer(from: string, to: string, value: BigNumberish): EventFilter
}
export type MethodNames =
  | 'DOMAIN_SEPARATOR'
  | 'MINIMUM_LIQUIDITY'
  | 'PERMIT_TYPEHASH'
  | 'allowance'
  | 'approve'
  | 'balanceOf'
  | 'burn'
  | 'decimals'
  | 'factory'
  | 'getReserves'
  | 'initialize'
  | 'kLast'
  | 'mint'
  | 'name'
  | 'nonces'
  | 'permit'
  | 'price0CumulativeLast'
  | 'price1CumulativeLast'
  | 'skim'
  | 'swap'
  | 'symbol'
  | 'sync'
  | 'token0'
  | 'token1'
  | 'totalSupply'
  | 'transfer'
  | 'transferFrom'
export type MethodNameMap = {
  [key in MethodNames]: string
}
export interface ApprovalEventEmittedResponse {
  owner: string
  spender: string
  value: BigNumberish
}
export interface BurnEventEmittedResponse {
  sender: string
  amount0: BigNumberish
  amount1: BigNumberish
  to: string
}
export interface MintEventEmittedResponse {
  sender: string
  amount0: BigNumberish
  amount1: BigNumberish
}
export interface SwapEventEmittedResponse {
  sender: string
  amount0In: BigNumberish
  amount1In: BigNumberish
  amount0Out: BigNumberish
  amount1Out: BigNumberish
  to: string
}
export interface SyncEventEmittedResponse {
  reserve0: BigNumberish
  reserve1: BigNumberish
}
export interface TransferEventEmittedResponse {
  from: string
  to: string
  value: BigNumberish
}
export interface GetReservesResponse {
  _reserve0: BigNumber
  0: BigNumber
  _reserve1: BigNumber
  1: BigNumber
  _blockTimestampLast: number
  2: number
  length: 3
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
  MINIMUM_LIQUIDITY(overrides?: ContractCallOverrides): Promise<BigNumber>
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
   * @param parameter0 Type: address, Indexed: false
   * @param parameter1 Type: address, Indexed: false
   */
  allowance(
    parameter0: string,
    parameter1: string,
    overrides?: ContractCallOverrides,
  ): Promise<BigNumber>
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param spender Type: address, Indexed: false
   * @param value Type: uint256, Indexed: false
   */
  approve(
    spender: string,
    value: BigNumberish,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: address, Indexed: false
   */
  balanceOf(
    parameter0: string,
    overrides?: ContractCallOverrides,
  ): Promise<BigNumber>
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param to Type: address, Indexed: false
   */
  burn(
    to: string,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  decimals(overrides?: ContractCallOverrides): Promise<number | BigNumber>
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
  getReserves(overrides?: ContractCallOverrides): Promise<GetReservesResponse>
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _token0 Type: address, Indexed: false
   * @param _token1 Type: address, Indexed: false
   */
  initialize(
    _token0: string,
    _token1: string,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  kLast(overrides?: ContractCallOverrides): Promise<BigNumber>
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param to Type: address, Indexed: false
   */
  mint(
    to: string,
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
   * @param parameter0 Type: address, Indexed: false
   */
  nonces(
    parameter0: string,
    overrides?: ContractCallOverrides,
  ): Promise<BigNumber>
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param owner Type: address, Indexed: false
   * @param spender Type: address, Indexed: false
   * @param value Type: uint256, Indexed: false
   * @param deadline Type: uint256, Indexed: false
   * @param v Type: uint8, Indexed: false
   * @param r Type: bytes32, Indexed: false
   * @param s Type: bytes32, Indexed: false
   */
  permit(
    owner: string,
    spender: string,
    value: BigNumberish,
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
   */
  price0CumulativeLast(overrides?: ContractCallOverrides): Promise<BigNumber>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  price1CumulativeLast(overrides?: ContractCallOverrides): Promise<BigNumber>
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param to Type: address, Indexed: false
   */
  skim(
    to: string,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param amount0Out Type: uint256, Indexed: false
   * @param amount1Out Type: uint256, Indexed: false
   * @param to Type: address, Indexed: false
   * @param data Type: bytes, Indexed: false
   */
  swap(
    amount0Out: BigNumberish,
    amount1Out: BigNumberish,
    to: string,
    data: BytesLike,
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
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   */
  sync(overrides?: ContractTransactionOverrides): Promise<ContractTransaction>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  token0(overrides?: ContractCallOverrides): Promise<string>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  token1(overrides?: ContractCallOverrides): Promise<string>
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
   * @param to Type: address, Indexed: false
   * @param value Type: uint256, Indexed: false
   */
  transfer(
    to: string,
    value: BigNumberish,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param from Type: address, Indexed: false
   * @param to Type: address, Indexed: false
   * @param value Type: uint256, Indexed: false
   */
  transferFrom(
    from: string,
    to: string,
    value: BigNumberish,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>
}
