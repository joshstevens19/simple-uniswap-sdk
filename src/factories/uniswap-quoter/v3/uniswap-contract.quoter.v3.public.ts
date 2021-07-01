import {
  ChainIdAndProvider,
  EthereumProvider,
  EthersProvider,
} from '../../../ethers-provider';
import { UniswapContractQuoterV3 } from './uniswap-contract.quoter.v3';

export class UniswapContractQuoterV3Public extends UniswapContractQuoterV3 {
  constructor(providerContext: ChainIdAndProvider | EthereumProvider) {
    super(new EthersProvider(providerContext));
  }
}
