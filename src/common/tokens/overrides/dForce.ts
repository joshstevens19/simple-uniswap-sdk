import { ChainId } from '../../../enums/chain-id';
import { Token } from '../../../factories/token/models/token';

/**
 * DFORCE token contract
 */
export class DFORCE {
  public static MAINNET(): Token {
    return {
      chainId: ChainId.MAINNET,
      contractAddress: '0x431ad2ff6a9C365805eBaD47Ee021148d6f7DBe0',
      decimals: 18,
      symbol: 'DF',
      name: 'dForce token',
    };
  }
}
