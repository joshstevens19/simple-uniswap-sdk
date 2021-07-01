import { ChainId } from '../../../enums/chain-id';
import { EthersProvider } from '../../../ethers-provider';
import { UniswapContractFactoryV3 } from './uniswap-contract.factory.v3';

export class UniswapContractFactoryV3Public extends UniswapContractFactoryV3 {
  constructor(chainId: ChainId, providerUrl?: string | undefined) {
    super(new EthersProvider({ chainId, providerUrl }));
  }
}
