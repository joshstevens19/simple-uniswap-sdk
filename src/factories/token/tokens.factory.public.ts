import {
  ChainIdAndProvider,
  EthereumProvider,
  EthersProvider,
} from '../../ethers-provider';
import { TokensFactory } from './tokens.factory';

export class TokensFactoryPublic extends TokensFactory {
  constructor(providerContext: ChainIdAndProvider | EthereumProvider) {
    super(new EthersProvider(providerContext));
  }
}
