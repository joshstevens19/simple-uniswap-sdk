import { ChainId } from '../../enums/chain-id';
import { EthersProvider } from '../../ethers-provider';
import { UniswapPairContractFactory } from './uniswap-pair-contract.factory';

export class UniswapPairContractFactoryPublic extends UniswapPairContractFactory {
  constructor(chainId: ChainId, providerUrl?: string | undefined) {
    super(new EthersProvider(chainId, providerUrl));
  }
}
