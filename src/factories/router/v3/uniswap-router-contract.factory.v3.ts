import {
  ContractContext as RouterContractContext,
  ExactInputRequest,
} from '../../../ABI/types/uniswap-router-v3';
import { EthersProvider } from '../../../ethers-provider';
import { UniswapContractContextV3 } from '../../../uniswap-contract-context/uniswap-contract-context-v3';

export class UniswapRouterContractFactoryV3 {
  private _uniswapRouterContract = this._ethersProvider.getContract<RouterContractContext>(
    JSON.stringify(UniswapContractContextV3.routerAbi),
    UniswapContractContextV3.routerAddress
  );

  constructor(private _ethersProvider: EthersProvider) {}

  // https://github.com/Uniswap/uniswap-v3-periphery/blob/9ca9575d09b0b8d985cc4d9a0f689f7a4470ecb7/test/SwapRouter.spec.ts#L130
  public exactInput(params: ExactInputRequest): string {
    return this._uniswapRouterContract.interface.encodeFunctionData(
      'exactInput',
      [params]
    );
  }
}
