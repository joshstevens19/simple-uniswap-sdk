import {
  ChainIdAndProvider,
  EthereumProvider,
  EthersProvider,
} from '../../../ethers-provider';
import { UniswapContractContextV2 } from '../../../uniswap-contract-context/uniswap-contract-context-v2';
import { UniswapPairContractFactoryV2 } from './uniswap-pair-contract.factory.v2';

export class UniswapPairContractFactoryPublicV2 extends UniswapPairContractFactoryV2 {
  constructor(
    providerContext: ChainIdAndProvider | EthereumProvider,
    pairAddress: string = UniswapContractContextV2.pairAddress
  ) {
    super(new EthersProvider(providerContext), pairAddress);
  }
}
