import { ChainId } from '../../enums/chain-id';
import { EthersProvider } from '../../ethers-provider';
import { TokensFactory } from './tokens.factory';

export class TokensFactoryPublic extends TokensFactory {
  constructor(chainIdOrProviderUrl: ChainId | string) {
    super(new EthersProvider(chainIdOrProviderUrl));
  }
}
