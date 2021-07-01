import {
  ChainIdAndProvider,
  EthereumProvider,
  EthersProvider,
} from '../../ethers-provider';
import { TokenFactory } from './token.factory';

export class TokenFactoryPublic extends TokenFactory {
  constructor(
    tokenContractAddress: string,
    providerContext: ChainIdAndProvider | EthereumProvider
  ) {
    super(tokenContractAddress, new EthersProvider(providerContext));
  }
}
