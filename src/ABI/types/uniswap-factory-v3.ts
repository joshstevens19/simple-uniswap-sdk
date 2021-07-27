import { EthersContractContextV5 } from 'ethereum-abi-types-generator';
import { BigNumber, BigNumberish, ContractTransaction } from 'ethers';

export type ContractContext = EthersContractContextV5<
  UniswapFactoryV3,
  UniswapFactoryV3MethodNames,
  UniswapFactoryV3EventsContext,
  UniswapFactoryV3Events
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
export type UniswapFactoryV3Events =
  | 'FeeAmountEnabled'
  | 'OwnerChanged'
  | 'PoolCreated';
export interface UniswapFactoryV3EventsContext {
  FeeAmountEnabled(...parameters: any): EventFilter;
  OwnerChanged(...parameters: any): EventFilter;
  PoolCreated(...parameters: any): EventFilter;
}
export type UniswapFactoryV3MethodNames =
  | 'new'
  | 'createPool'
  | 'enableFeeAmount'
  | 'feeAmountTickSpacing'
  | 'getPool'
  | 'owner'
  | 'parameters'
  | 'setOwner';
export interface ParametersResponse {
  factory: string;
  0: string;
  token0: string;
  1: string;
  token1: string;
  2: string;
  fee: number;
  3: number;
  tickSpacing: number;
  4: number;
  length: 5;
}
export interface UniswapFactoryV3 {
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: constructor
   */
  'new'(overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param tokenA Type: address, Indexed: false
   * @param tokenB Type: address, Indexed: false
   * @param fee Type: uint24, Indexed: false
   */
  createPool(
    tokenA: string,
    tokenB: string,
    fee: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param fee Type: uint24, Indexed: false
   * @param tickSpacing Type: int24, Indexed: false
   */
  enableFeeAmount(
    fee: BigNumberish,
    tickSpacing: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: uint24, Indexed: false
   */
  feeAmountTickSpacing(
    parameter0: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<number>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: address, Indexed: false
   * @param parameter1 Type: address, Indexed: false
   * @param parameter2 Type: uint24, Indexed: false
   */
  getPool(
    parameter0: string,
    parameter1: string,
    parameter2: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  owner(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  parameters(overrides?: ContractCallOverrides): Promise<ParametersResponse>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _owner Type: address, Indexed: false
   */
  setOwner(
    _owner: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
}
