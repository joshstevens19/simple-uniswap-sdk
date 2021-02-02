import { ChainId } from '../../enums/chain-id';
import { EthersProvider } from '../../ethers-provider';
import { UniswapContractFactory } from './uniswap-contract.factory';

export class UniswapContractFactoryPublic extends UniswapContractFactory {
  constructor(chainId: ChainId, providerUrl?: string | undefined) {
    super(new EthersProvider(chainId, providerUrl));
  }
}
