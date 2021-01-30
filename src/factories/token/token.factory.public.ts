import { ChainId } from '../../enums/chain-id';
import { EthersProvider } from '../../ethers-provider';
import { TokenFactory } from './token.factory';

export class TokenFactoryPublic extends TokenFactory {
  constructor(
    tokenContractAddress: string,
    chainIdOrProviderUrl: ChainId | string
  ) {
    super(tokenContractAddress, new EthersProvider(chainIdOrProviderUrl));
  }
}
