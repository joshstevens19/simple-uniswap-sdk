import {
  ChainIdAndProvider,
  EthereumProvider,
  EthersProvider,
} from '../../../ethers-provider';
import { UniswapContractContextV2 } from '../../../uniswap-contract-context/uniswap-contract-context-v2';
import { UniswapContractFactoryV2 } from './uniswap-contract.factory.v2';

export class UniswapContractFactoryV2Public extends UniswapContractFactoryV2 {
  constructor(
    providerContext: ChainIdAndProvider | EthereumProvider,
    factoryAddress: string = UniswapContractContextV2.factoryAddress
  ) {
    super(new EthersProvider(providerContext), factoryAddress);
  }
}
