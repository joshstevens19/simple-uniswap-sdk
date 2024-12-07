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
export type Events =
  | 'AuthorizedOperator'
  | 'RevokedOperator'
  | 'Sent'
  | 'DefaultOperatorsSet'
export interface EventsContext {
  AuthorizedOperator(operator: string, tokenHolder: string): EventFilter
  RevokedOperator(operator: string, tokenHolder: string): EventFilter
  Sent(
    from: string,
    to: string,
    value: BigNumberish,
    userData: BytesLike,
  ): EventFilter
  DefaultOperatorsSet(
    operator: string,
    tokenHolder: string,
    newDefaultOperators: string[],
  ): EventFilter
}
export type MethodNames =
  | 'name'
  | 'symbol'
  | 'decimals'
  | 'balanceOf'
  | 'allowance'
  | 'approve'
  | 'transfer'
  | 'decreaseAllowance'
  | 'increaseAllowance'
  | 'send'
  | 'operatorSend'
  | 'defaultOperators'
  | 'setDefaultOperators'
  | 'authorizeOperator'
  | 'revokeOperator'
  | 'isOperatorFor'
  | 'revokeDefaultOperators'
  | 'defaultOperatorsSend'
export type MethodNameMap = {
  [key in MethodNames]: string
}
export interface AuthorizedOperatorEventEmittedResponse {
  operator: string
  tokenHolder: string
}
export interface RevokedOperatorEventEmittedResponse {
  operator: string
  tokenHolder: string
}
export interface SentEventEmittedResponse {
  from: string
  to: string
  value: BigNumberish
  userData: BytesLike
}
export interface DefaultOperatorsSetEventEmittedResponse {
  operator: string
  tokenHolder: string
  newDefaultOperators: string[]
}
export interface Contract {
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
   */
  symbol(overrides?: ContractCallOverrides): Promise<string>
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
   * @param tokenOwner Type: address, Indexed: false
   */
  balanceOf(
    tokenOwner: string,
    overrides?: ContractCallOverrides,
  ): Promise<BigNumber>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param spender Type: address, Indexed: false
   */
  allowance(
    spender: string,
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
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param from Type: address, Indexed: false
   * @param to Type: address, Indexed: false
   * @param value Type: uint256, Indexed: false
   */
  transfer(
    from: string,
    to: string,
    value: BigNumberish,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param spender Type: address, Indexed: false
   * @param subtractedValue Type: uint256, Indexed: false
   */
  decreaseAllowance(
    spender: string,
    subtractedValue: BigNumberish,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param spender Type: address, Indexed: false
   * @param addedValue Type: uint256, Indexed: false
   */
  increaseAllowance(
    spender: string,
    addedValue: BigNumberish,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>
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
   * @param amount Type: uint256, Indexed: false
   * @param userData Type: bytes, Indexed: false
   */
  send(
    amount: BigNumberish,
    userData: BytesLike,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param operator Type: address, Indexed: false
   * @param from Type: address, Indexed: false
   * @param amount Type: uint256, Indexed: false
   * @param userData Type: bytes, Indexed: false
   * @param operatorData Type: bytes, Indexed: false
   */
  operatorSend(
    operator: string,
    from: string,
    amount: BigNumberish,
    userData: BytesLike,
    operatorData: BytesLike,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param tokenHolder Type: address, Indexed: false
   */
  defaultOperators(
    tokenHolder: string,
    overrides?: ContractCallOverrides,
  ): Promise<string[]>
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param newDefaultOperators Type: address[], Indexed: false
   */
  setDefaultOperators(
    newDefaultOperators: string[],
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param tokenHolder Type: address, Indexed: false
   * @param operator Type: address, Indexed: false
   */
  authorizeOperator(
    tokenHolder: string,
    operator: string,
    overrides?: ContractCallOverrides,
  ): Promise<boolean>
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param operator Type: address, Indexed: false
   */
  revokeOperator(
    operator: string,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param operator Type: address, Indexed: false
   * @param tokenHolder Type: address, Indexed: false
   */
  isOperatorFor(
    operator: string,
    tokenHolder: string,
    overrides?: ContractCallOverrides,
  ): Promise<boolean>
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param defaultOperators Type: address[], Indexed: false
   * @param revokedOperator Type: address, Indexed: false
   */
  revokeDefaultOperators(
    defaultOperators: string[],
    revokedOperator: string,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param tokenHolder Type: address, Indexed: false
   * @param operator Type: address, Indexed: false
   */
  defaultOperatorsSend(
    tokenHolder: string,
    operator: string,
    overrides?: ContractCallOverrides,
  ): Promise<void>
}
