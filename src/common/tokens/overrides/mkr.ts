import { ChainId } from '../../../enums/chain-id';
import { Token } from '../../../factories/token/models/token';

/**
 * MAI token contract
 */
export class MAI {
  public static MAINNET(): Token {
    return {
      chainId: ChainId.MAINNET,
      contractAddress: '0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2',
      decimals: 18,
      symbol: 'MAI',
      name: 'MAI token',
    };
  }
}
