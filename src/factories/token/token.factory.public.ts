import { ChainId } from '../../enums/chain-id';
import { EthersProvider } from '../../ethers-provider';
import { TokenFactory } from './token.factory';

export class TokenFactoryPublic extends TokenFactory {
  constructor(
    chainIdOrProviderUrl: ChainId | string,
    tokenContractAddress: string
  ) {
    super(tokenContractAddress, new EthersProvider(chainIdOrProviderUrl));
  }
}
