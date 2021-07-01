import {
  ChainIdAndProvider,
  EthereumProvider,
  EthersProvider,
} from '../../../ethers-provider';
import { UniswapContractFactoryV3 } from './uniswap-contract.factory.v3';

export class UniswapContractFactoryV3Public extends UniswapContractFactoryV3 {
  constructor(providerContext: ChainIdAndProvider | EthereumProvider) {
    super(new EthersProvider(providerContext));
  }
}
