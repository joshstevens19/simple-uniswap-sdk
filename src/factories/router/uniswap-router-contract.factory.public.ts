import { ChainId } from '../../enums/chain-id';
import { EthersProvider } from '../../ethers-provider';
import { UniswapRouterContractFactory } from './uniswap-router-contract.factory';

export class UniswapRouterContractFactoryPublic extends UniswapRouterContractFactory {
  constructor(chainId: ChainId, providerUrl?: string | undefined) {
    super(new EthersProvider(chainId, providerUrl));
  }
}
