import { ChainId } from '../../enums/chain-id';
import { EthersProvider } from '../../ethers-provider';
import { UniswapContractFactory } from './uniswap-contract.factory';

export class UniswapContractFactoryPublic extends UniswapContractFactory {
  constructor(chainIdOrProviderUrl: ChainId | string) {
    super(new EthersProvider(chainIdOrProviderUrl));
  }
}
