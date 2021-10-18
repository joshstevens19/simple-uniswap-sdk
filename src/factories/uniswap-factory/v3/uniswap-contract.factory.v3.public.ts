import {
  ChainIdAndProvider,
  EthereumProvider,
  EthersProvider,
} from '../../../ethers-provider';
import { UniswapContractContextV3 } from '../../../uniswap-contract-context/uniswap-contract-context-v3';
import { UniswapContractFactoryV3 } from './uniswap-contract.factory.v3';

export class UniswapContractFactoryV3Public extends UniswapContractFactoryV3 {
  constructor(
    providerContext: ChainIdAndProvider | EthereumProvider,
    factoryAddress: string = UniswapContractContextV3.factoryAddress
  ) {
    super(new EthersProvider(providerContext), factoryAddress);
  }
}
