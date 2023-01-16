import { BigNumberish, BytesLike } from 'ethers';
import { JsonFragment } from '@ethersproject/abi';
import {
  ContractContext as RouterContractContext,
  ExactInputRequest,
  ExactInputSingleRequest,
  ExactOutputRequest,
  ExactOutputSingleRequest,
} from '../../../ABI/types/uniswap-router-v3';
import { EthersProvider } from '../../../ethers-provider';
import { UniswapContractContextV3 } from '../../../uniswap-contract-context/uniswap-contract-context-v3';

export class UniswapRouterContractFactoryV3 {
  private _uniswapRouterContract =
    this._ethersProvider.getContract<RouterContractContext>(
      JSON.stringify(this._routerAbi),
      this._routerAddress
    );

  constructor(
    private _ethersProvider: EthersProvider,
    public _routerAddress: string = UniswapContractContextV3.routerAddress,
    private _routerAbi: JsonFragment[] = UniswapContractContextV3.routerAbi
  ) {}

  /**
   * Exact input single
   * @param params The parameters
   */
  public exactInputSingle(params: ExactInputSingleRequest): string {
    return this._uniswapRouterContract.interface.encodeFunctionData(
      'exactInputSingle',
      [params]
    );
  }

  /**
   * The exact output single
   * @param params The parameters
   */
  public exactOutputSingle(params: ExactOutputSingleRequest): string {
    return this._uniswapRouterContract.interface.encodeFunctionData(
      'exactOutputSingle',
      [params]
    );
  }

  /**
   * Exact input
   * @param params The parameters
   */
   public exactInput(params: ExactInputRequest): string {
    return this._uniswapRouterContract.interface.encodeFunctionData(
      'exactInput',
      [params]
    );
  }

  /**
   * The exact output
   * @param params The parameters
   */
  public exactOutput(params: ExactOutputRequest): string {
    return this._uniswapRouterContract.interface.encodeFunctionData(
      'exactOutput',
      [params]
    );
  }

  /**
   * Unwrap eth
   * @param amountMinimum The amount min
   * @param recipient The recipient
   */
  public unwrapWETH9(amountMinimum: BigNumberish, recipient: string): string {
    return this._uniswapRouterContract.interface.encodeFunctionData(
      'unwrapWETH9',
      [amountMinimum, recipient]
    );
  }

  /**
   * Multicall used for uniswap v3
   * @param data The data array (many calls)
   */
  public multicall(data: BytesLike[]): string {
    return this._uniswapRouterContract.interface.encodeFunctionData(
      'multicall',
      [data]
    );
  }
}
