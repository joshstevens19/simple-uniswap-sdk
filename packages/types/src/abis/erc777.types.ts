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
    data: BytesLike,
    operatorData: BytesLike,
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
  | 'granularity'
  | 'defaultOperators'
  | 'balanceOf'
  | 'isOperatorFor'
  | 'authorizeOperator'
  | 'defaultOperatorsSend'
  | 'revokeOperator'
  | 'operatorSend'
  | 'revokeDefaultOperators'
  | 'send'
  | 'setDefaultOperators'
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
  data: BytesLike
  operatorData: BytesLike
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
  granularity(overrides?: ContractCallOverrides): Promise<BigNumber>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  defaultOperators(overrides?: ContractCallOverrides): Promise<string[]>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param _tokenHolder Type: address, Indexed: false
   */
  balanceOf(
    _tokenHolder: string,
    overrides?: ContractCallOverrides,
  ): Promise<BigNumber>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param _tokenHolder Type: address, Indexed: false
   * @param _operator Type: address, Indexed: false
   */
  isOperatorFor(
    _tokenHolder: string,
    _operator: string,
    overrides?: ContractCallOverrides,
  ): Promise<boolean>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param _tokenHolder Type: address, Indexed: false
   */
  authorizeOperator(
    _tokenHolder: string,
    overrides?: ContractCallOverrides,
  ): Promise<void>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  defaultOperatorsSend(overrides?: ContractCallOverrides): Promise<void>
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _operator Type: address, Indexed: false
   */
  revokeOperator(
    _operator: string,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _from Type: address, Indexed: false
   * @param _to Type: address, Indexed: false
   * @param _value Type: uint256, Indexed: false
   * @param _data Type: bytes, Indexed: false
   * @param _operatorData Type: bytes, Indexed: false
   */
  operatorSend(
    _from: string,
    _to: string,
    _value: BigNumberish,
    _data: BytesLike,
    _operatorData: BytesLike,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _defaultOperators Type: address[], Indexed: false
   */
  revokeDefaultOperators(
    _defaultOperators: string[],
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _newDefaultOperators Type: address[], Indexed: false
   */
  revokeOperator(
    _newDefaultOperators: string[],
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _from Type: address, Indexed: false
   * @param _to Type: address, Indexed: false
   * @param _value Type: uint256, Indexed: false
   * @param _data Type: bytes, Indexed: false
   */
  send(
    _from: string,
    _to: string,
    _value: BigNumberish,
    _data: BytesLike,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _defaultOperators Type: address[], Indexed: false
   */
  setDefaultOperators(
    _defaultOperators: string[],
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>
}
