import { ChainId } from '../../../enums/chain-id';
import { EthersProvider } from '../../../ethers-provider';
import { UniswapPairContractFactoryV2 } from './uniswap-pair-contract.factory.v2';

export class UniswapPairContractFactoryPublicV2 extends UniswapPairContractFactoryV2 {
  constructor(chainId: ChainId, providerUrl?: string | undefined) {
    super(new EthersProvider({ chainId, providerUrl }));
  }
}
