import { BigNumberish, BytesLike } from 'ethers';
import {
  ContractContext as RouterContractContext,
  ExactInputSingleRequest,
  ExactOutputSingleRequest,
} from '../../../ABI/types/uniswap-router-v3';
import { EthersProvider } from '../../../ethers-provider';
import { UniswapContractContextV3 } from '../../../uniswap-contract-context/uniswap-contract-context-v3';

export class UniswapRouterContractFactoryV3 {
  private _uniswapRouterContract =
    this._ethersProvider.getContract<RouterContractContext>(
      JSON.stringify(UniswapContractContextV3.routerAbi),
      this._routerAddress
    );

  constructor(
    private _ethersProvider: EthersProvider,
    private _routerAddress: string = UniswapContractContextV3.routerAddress
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
