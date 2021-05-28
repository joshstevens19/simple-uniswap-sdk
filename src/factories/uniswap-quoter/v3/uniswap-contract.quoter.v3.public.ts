import { ChainId } from '../../../enums/chain-id';
import { EthersProvider } from '../../../ethers-provider';
import { UniswapContractQuoterV3 } from './uniswap-contract.quoter.v3';

export class UniswapContractQuoterV3Public extends UniswapContractQuoterV3 {
  constructor(chainId: ChainId, providerUrl?: string | undefined) {
    super(new EthersProvider(chainId, providerUrl));
  }
}
