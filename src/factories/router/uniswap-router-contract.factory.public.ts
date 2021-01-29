import { ChainId } from '../../enums/chain-id';
import { EthersProvider } from '../../ethers-provider';
import { UniswapRouterContractFactory } from './uniswap-router-contract.factory';

export class UniswapRouterContractFactoryPublic extends UniswapRouterContractFactory {
  constructor(chainIdOrProviderUrl: ChainId | string) {
    super(new EthersProvider(chainIdOrProviderUrl));
  }
}
