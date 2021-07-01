import { ChainId } from '../../../enums/chain-id';
import { EthersProvider } from '../../../ethers-provider';
import { UniswapRouterContractFactoryV3 } from './uniswap-router-contract.factory.v3';

export class UniswapRouterContractFactoryV3Public extends UniswapRouterContractFactoryV3 {
  constructor(chainId: ChainId, providerUrl?: string | undefined) {
    super(new EthersProvider({ chainId, providerUrl }));
  }
}
