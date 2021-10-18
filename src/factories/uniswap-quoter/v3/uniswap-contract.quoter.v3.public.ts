import {
  ChainIdAndProvider,
  EthereumProvider,
  EthersProvider,
} from '../../../ethers-provider';
import { UniswapContractContextV3 } from '../../../uniswap-contract-context/uniswap-contract-context-v3';
import { UniswapContractQuoterV3 } from './uniswap-contract.quoter.v3';

export class UniswapContractQuoterV3Public extends UniswapContractQuoterV3 {
  constructor(
    providerContext: ChainIdAndProvider | EthereumProvider,
    quoterAddress: string = UniswapContractContextV3.quoterAddress
  ) {
    super(new EthersProvider(providerContext), quoterAddress);
  }
}
