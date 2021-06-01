import { ChainId } from '../../../enums/chain-id';
import { EthersProvider } from '../../../ethers-provider';
import { UniswapContractFactoryV2 } from './uniswap-contract.factory.v2';

export class UniswapContractFactoryV2Public extends UniswapContractFactoryV2 {
  constructor(chainId: ChainId, providerUrl?: string | undefined) {
    super(new EthersProvider(chainId, providerUrl));
  }
}
