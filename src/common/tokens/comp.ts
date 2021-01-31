import { ChainId } from '../../enums/chain-id';

/**
 * COMP token context CHANGE CONTRACT ADDRESS INFO ETC
 */
export class COMP {
  public static MAINNET() {
    return {
      chainId: ChainId.MAINNET,
      contractAddress: '0xc00e94Cb662C3520282E6f5717214004A7f26888',
      decimals: 18,
      symbol: 'COMP',
      name: 'Compound',
    };
  }

  public static ROPSTEN() {
    return {
      chainId: ChainId.ROPSTEN,
      contractAddress: '0xc778417E063141139Fce010982780140Aa0cD5Ab',
      decimals: 18,
      symbol: 'COMP',
      name: 'Compound',
    };
  }

  public static RINKEBY() {
    return {
      chainId: ChainId.RINKEBY,
      contractAddress: '0xc778417E063141139Fce010982780140Aa0cD5Ab',
      decimals: 18,
      symbol: 'COMP',
      name: 'Compound',
    };
  }

  public static GORLI() {
    return {
      chainId: ChainId.GÖRLI,
      contractAddress: '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6',
      decimals: 18,
      symbol: 'COMP',
      name: 'Compound',
    };
  }

  public static KOVAN() {
    return {
      chainId: ChainId.KOVAN,
      contractAddress: '0xd0A1E359811322d97991E03f863a0C30C2cF029C',
      decimals: 18,
      symbol: 'COMP',
      name: 'Compound',
    };
  }

  /**
   * Get WETH token info by chain id
   * @param chainId The chain id
   */
  public static token(chainId: ChainId) {
    switch (chainId) {
      case ChainId.MAINNET:
        return this.MAINNET();
      case ChainId.ROPSTEN:
        return this.ROPSTEN();
      case ChainId.RINKEBY:
        return this.RINKEBY();
      case ChainId.GÖRLI:
        return this.GORLI();
      case ChainId.KOVAN:
        return this.KOVAN();
      default:
        throw new Error(`${chainId} is not allowed`);
    }
  }
}
