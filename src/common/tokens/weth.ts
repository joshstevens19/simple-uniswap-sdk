import { ChainId } from '../../enums/chain-id';
import { Token } from '../../factories/token/models/token';
import { ErrorCodes } from '../errors/error-codes';
import { UniswapError } from '../errors/uniswap-error';

const ETH_PREFIX = '_ETH';
export const ETH_SYMBOL = 'ETH';

export const appendEthToContractAddress = (contractAddress: string): string => {
  return `${contractAddress}${ETH_PREFIX}`;
};

export const removeEthFromContractAddress = (
  contractAddress: string
): string => {
  return contractAddress.replace(ETH_PREFIX, '');
};

export const isNativeEthToContractAddress = (
  contractAddress: string
): boolean => {
  return contractAddress.includes(ETH_PREFIX);
};

export const turnTokenIntoEth = (token: Token): Token => {
  token.symbol = ETH_SYMBOL;
  token.name = 'Native Ether';
  token.contractAddress = 'NO_CONTRACT_ADDRESS';

  return token;
};

/**
 * WETH/ETH token context
 */
export class WETH {
  public static MAINNET(erc20 = false): Token {
    return {
      chainId: ChainId.MAINNET,
      contractAddress:
        erc20 === true
          ? '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'
          : appendEthToContractAddress(
              '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'
            ),
      decimals: 18,
      symbol: erc20 === true ? 'WETH' : ETH_SYMBOL,
      name: erc20 === true ? 'Wrapped Ether' : 'Native Ether',
    };
  }

  public static ROPSTEN(erc20 = false) {
    return {
      chainId: ChainId.ROPSTEN,
      contractAddress:
        erc20 === true
          ? '0xc778417E063141139Fce010982780140Aa0cD5Ab'
          : appendEthToContractAddress(
              '0xc778417E063141139Fce010982780140Aa0cD5Ab'
            ),
      decimals: 18,
      symbol: erc20 === true ? 'WETH' : ETH_SYMBOL,
      name: erc20 === true ? 'Wrapped Ether' : 'Native Ether',
    };
  }

  public static RINKEBY(erc20 = false) {
    return {
      chainId: ChainId.RINKEBY,
      contractAddress:
        erc20 === true
          ? '0xc778417E063141139Fce010982780140Aa0cD5Ab'
          : appendEthToContractAddress(
              '0xc778417E063141139Fce010982780140Aa0cD5Ab'
            ),
      decimals: 18,
      symbol: erc20 === true ? 'WETH' : ETH_SYMBOL,
      name: erc20 === true ? 'Wrapped Ether' : 'Native Ether',
    };
  }

  public static GORLI(erc20 = false) {
    return {
      chainId: ChainId.GÖRLI,
      contractAddress:
        erc20 === true
          ? '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6'
          : appendEthToContractAddress(
              '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6'
            ),
      decimals: 18,
      symbol: erc20 === true ? 'WETH' : ETH_SYMBOL,
      name: erc20 === true ? 'Wrapped Ether' : 'Native Ether',
    };
  }

  public static KOVAN(erc20 = false) {
    return {
      chainId: ChainId.KOVAN,
      contractAddress:
        erc20 === true
          ? '0xd0A1E359811322d97991E03f863a0C30C2cF029C'
          : appendEthToContractAddress(
              '0xd0A1E359811322d97991E03f863a0C30C2cF029C'
            ),
      decimals: 18,
      symbol: erc20 === true ? 'WETH' : ETH_SYMBOL,
      name: erc20 === true ? 'Wrapped Ether' : 'Native Ether',
    };
  }

  /**
   * Get WETH/ETH token info by chain id
   * @param chainId The chain id
   */
  public static token(chainId: ChainId | number, erc20 = false) {
    switch (chainId) {
      case ChainId.MAINNET:
        return this.MAINNET(erc20);
      case ChainId.ROPSTEN:
        return this.ROPSTEN(erc20);
      case ChainId.RINKEBY:
        return this.RINKEBY(erc20);
      case ChainId.GÖRLI:
        return this.GORLI(erc20);
      case ChainId.KOVAN:
        return this.KOVAN(erc20);
      default:
        throw new UniswapError(
          `${chainId} is not allowed`,
          ErrorCodes.tokenChainIdContractDoesNotExist
        );
    }
  }
}
