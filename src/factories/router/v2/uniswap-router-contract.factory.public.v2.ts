import { ChainId } from '../../../enums/chain-id';
import { EthersProvider } from '../../../ethers-provider';
import { UniswapRouterContractFactoryV2 } from './uniswap-router-contract.factory.v2';

export class UniswapRouterContractFactoryPublic extends UniswapRouterContractFactoryV2 {
  constructor(chainId: ChainId, providerUrl?: string | undefined) {
    super(new EthersProvider(chainId, providerUrl));
  }
}
