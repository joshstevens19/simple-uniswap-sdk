import { EthersContractContextV5 } from 'ethereum-abi-types-generator';
import { BigNumber, BigNumberish, ContractTransaction } from 'ethers';

export type ContractContext = EthersContractContextV5<
  UniswapFactoryV2,
  UniswapFactoryV2MethodNames,
  UniswapFactoryV2EventsContext,
  UniswapFactoryV2Events
>;

export declare type EventFilter = {
  address?: string;
  topics?: Array<string>;
  fromBlock?: string | number;
  toBlock?: string | number;
};

export interface ContractTransactionOverrides {
  /**
   * The maximum units of gas for the transaction to use
   */
  gasLimit?: number;
  /**
   * The price (in wei) per unit of gas
   */
  gasPrice?: BigNumber | string | number | Promise<any>;
  /**
   * The nonce to use in the transaction
   */
  nonce?: number;
  /**
   * The amount to send with the transaction (i.e. msg.value)
   */
  value?: BigNumber | string | number | Promise<any>;
  /**
   * The chain ID (or network ID) to use
   */
  chainId?: number;
}

export interface ContractCallOverrides {
  /**
   * The address to execute the call as
   */
  from?: string;
  /**
   * The maximum units of gas for the transaction to use
   */
  gasLimit?: number;
}
export type UniswapFactoryV2Events = 'PairCreated';
export interface UniswapFactoryV2EventsContext {
  PairCreated(...parameters: any): EventFilter;
}
export type UniswapFactoryV2MethodNames =
  | 'new'
  | 'allPairs'
  | 'allPairsLength'
  | 'createPair'
  | 'feeTo'
  | 'feeToSetter'
  | 'getPair'
  | 'setFeeTo'
  | 'setFeeToSetter';
export interface UniswapFactoryV2 {
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: constructor
   * @param _feeToSetter Type: address, Indexed: false
   */
  'new'(
    _feeToSetter: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: uint256, Indexed: false
   */
  allPairs(
    parameter0: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  allPairsLength(overrides?: ContractCallOverrides): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param tokenA Type: address, Indexed: false
   * @param tokenB Type: address, Indexed: false
   */
  createPair(
    tokenA: string,
    tokenB: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  feeTo(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  feeToSetter(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: address, Indexed: false
   * @param parameter1 Type: address, Indexed: false
   */
  getPair(
    parameter0: string,
    parameter1: string,
    overrides?: ContractCallOverrides
  ): Promise<string>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _feeTo Type: address, Indexed: false
   */
  setFeeTo(
    _feeTo: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _feeToSetter Type: address, Indexed: false
   */
  setFeeToSetter(
    _feeToSetter: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
}
