import {
  ChainIdAndProvider,
  EthereumProvider,
  EthersProvider,
} from '../../../ethers-provider';
import { UniswapRouterContractFactoryV2 } from './uniswap-router-contract.factory.v2';

export class UniswapRouterContractFactoryV2Public extends UniswapRouterContractFactoryV2 {
  constructor(providerContext: ChainIdAndProvider | EthereumProvider) {
    super(new EthersProvider(providerContext));
  }
}
