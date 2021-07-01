import {
  ChainIdAndProvider,
  EthereumProvider,
  EthersProvider,
} from '../../../ethers-provider';
import { UniswapContractFactoryV2 } from './uniswap-contract.factory.v2';

export class UniswapContractFactoryV2Public extends UniswapContractFactoryV2 {
  constructor(providerContext: ChainIdAndProvider | EthereumProvider) {
    super(new EthersProvider(providerContext));
  }
}
