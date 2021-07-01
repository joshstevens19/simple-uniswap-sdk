import {
  ChainIdAndProvider,
  EthereumProvider,
  EthersProvider,
} from '../../../ethers-provider';
import { UniswapPairContractFactoryV2 } from './uniswap-pair-contract.factory.v2';

export class UniswapPairContractFactoryPublicV2 extends UniswapPairContractFactoryV2 {
  constructor(providerContext: ChainIdAndProvider | EthereumProvider) {
    super(new EthersProvider(providerContext));
  }
}
