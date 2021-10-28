import { ChainId } from '../../enums/chain-id';
import { NativeCurrencyInfo } from '../../factories/pair/models/custom-network';
import { Token } from '../../factories/token/models/token';
import { ErrorCodes } from '../errors/error-codes';
import { UniswapError } from '../errors/uniswap-error';
import { deepClone } from '../utils/deep-clone';

const ETH_PREFIX = '_ETH';
export const ETH_SYMBOL = 'ETH';
export const ETH_NAME = 'Ethers';

export const appendEthToContractAddress = (contractAddress: string): string => {
  return `${contractAddress}${ETH_PREFIX}`;
};

export const removeEthFromContractAddress = (
  contractAddress: string
): string => {
  return contractAddress
    .replace(ETH_PREFIX, '')
    .replace(ETH_PREFIX.toLowerCase(), '');
};

export const isNativeEth = (contractAddress: string): boolean => {
  return contractAddress.includes(ETH_PREFIX);
};

export const turnTokenIntoEthForResponse = (
  token: Token,
  nativeCurrencyInfo: NativeCurrencyInfo | undefined
): Token => {
  const clone = deepClone(token);
  // clear down contract address
  clone.contractAddress = 'NO_CONTRACT_ADDRESS';
  if (nativeCurrencyInfo) {
    clone.symbol = nativeCurrencyInfo.symbol;
    clone.name = nativeCurrencyInfo.name;
  } else {
    clone.symbol = ETH_SYMBOL;
    clone.name = ETH_NAME;
  }

  return clone;
};

/**
 * ETH token info
 */
export class ETH {
  public static MAINNET(): Token {
    return {
      chainId: ChainId.MAINNET,
      contractAddress: appendEthToContractAddress(
        '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'
      ),
      decimals: 18,
      symbol: ETH_SYMBOL,
      name: ETH_NAME,
    };
  }

  public static ROPSTEN(): Token {
    return {
      chainId: ChainId.ROPSTEN,
      contractAddress: appendEthToContractAddress(
        '0xc778417E063141139Fce010982780140Aa0cD5Ab'
      ),
      decimals: 18,
      symbol: ETH_SYMBOL,
      name: ETH_NAME,
    };
  }

  public static RINKEBY(): Token {
    return {
      chainId: ChainId.RINKEBY,
      contractAddress: appendEthToContractAddress(
        '0xc778417E063141139Fce010982780140Aa0cD5Ab'
      ),
      decimals: 18,
      symbol: ETH_SYMBOL,
      name: ETH_NAME,
    };
  }

  public static GORLI(): Token {
    return {
      chainId: ChainId.GÖRLI,
      contractAddress: appendEthToContractAddress(
        '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6'
      ),
      decimals: 18,
      symbol: ETH_SYMBOL,
      name: ETH_NAME,
    };
  }

  public static KOVAN(): Token {
    return {
      chainId: ChainId.KOVAN,
      contractAddress: appendEthToContractAddress(
        '0xd0A1E359811322d97991E03f863a0C30C2cF029C'
      ),
      decimals: 18,
      symbol: ETH_SYMBOL,
      name: ETH_NAME,
    };
  }

  /**
   * Get ETH token info by chain id
   * @param chainId The chain id
   */
  public static info(
    chainId: ChainId | number,
    customNetworkNativeWrappedTokenInfo: Token | undefined = undefined
  ): Token {
    if (customNetworkNativeWrappedTokenInfo) {
      return {
        ...customNetworkNativeWrappedTokenInfo,
        contractAddress: appendEthToContractAddress(
          customNetworkNativeWrappedTokenInfo.contractAddress
        ),
      };
    }
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
        throw new UniswapError(
          `${chainId} is not allowed`,
          ErrorCodes.tokenChainIdContractDoesNotExist
        );
    }
  }
}
