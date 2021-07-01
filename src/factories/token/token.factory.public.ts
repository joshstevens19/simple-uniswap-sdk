import { ChainId } from '../../enums/chain-id';
import { EthersProvider } from '../../ethers-provider';
import { TokenFactory } from './token.factory';

export class TokenFactoryPublic extends TokenFactory {
  constructor(
    tokenContractAddress: string,
    chainId: ChainId,
    providerUrl?: string | undefined
  ) {
    super(tokenContractAddress, new EthersProvider({ chainId, providerUrl }));
  }
}
