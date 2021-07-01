import { ChainId } from '../../enums/chain-id';
import { EthersProvider } from '../../ethers-provider';
import { TokensFactory } from './tokens.factory';

export class TokensFactoryPublic extends TokensFactory {
  constructor(chainId: ChainId, providerUrl?: string | undefined) {
    super(new EthersProvider({ chainId, providerUrl }));
  }
}
