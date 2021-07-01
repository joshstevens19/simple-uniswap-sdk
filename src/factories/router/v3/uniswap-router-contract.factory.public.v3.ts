import {
  ChainIdAndProvider,
  EthereumProvider,
  EthersProvider,
} from '../../../ethers-provider';
import { UniswapRouterContractFactoryV3 } from './uniswap-router-contract.factory.v3';

export class UniswapRouterContractFactoryV3Public extends UniswapRouterContractFactoryV3 {
  constructor(providerContext: ChainIdAndProvider | EthereumProvider) {
    super(new EthersProvider(providerContext));
  }
}
