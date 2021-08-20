import { ChainId } from '../../enums/chain-id';
import { Token } from '../../factories/token/models/token';
import { ErrorCodes } from '../errors/error-codes';
import { UniswapError } from '../errors/uniswap-error';

/**
 * WBTC token context
 */
export class WBTC {
  public static MAINNET(): Token {
    return {
      chainId: ChainId.MAINNET,
      contractAddress: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',
      decimals: 8,
      symbol: 'WBTC',
      name: 'Wrapped BTC',
    };
  }

  /**
   * Get WBTC token info by chain id
   * @param chainId The chain id
   */
  public static token(chainId: ChainId | number): Token {
    switch (chainId) {
      case ChainId.MAINNET:
        return this.MAINNET();
      default:
        throw new UniswapError(
          `${chainId} is not allowed`,
          ErrorCodes.tokenChainIdContractDoesNotExist
        );
    }
  }
}
