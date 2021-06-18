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
      UniswapContractContextV3.routerAddress
    );

  constructor(private _ethersProvider: EthersProvider) {}

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
}
