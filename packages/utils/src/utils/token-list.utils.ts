import {
  avaxFujiChainId,
  avaxMainChainId,
  bscMainChainId,
  bscTestChainId,
  ethHoleskyChainId,
  ethMainChainId,
  ethSepoliaChainId,
  optimismMainChainId,
  optimismSepoliaChainId,
  plsMainChainId,
  plsTestChainId,
} from '@chain-toolkit/chains'
import type { ChainId } from '@chain-toolkit/schemas'
import type {
  ITokenList,
  StandardToken,
  Token,
  TokenListAsset,
  TokenListConfig,
  TokenListContext,
  TokenListSource,
} from '@dex-toolkit/types'

export const tokenListConfig: TokenListConfig = {
  DEFIBIDS: {
    name: 'DefiBids Token List',
    url: 'https://assets.defibids.com/tokenlists/defibidstokenlist',
    chainIds: [plsMainChainId, plsTestChainId],
  },
  UNISWAP: {
    name: 'Uniswap Labs Default',
    url: 'https://tokens.uniswap.org/',
    chainIds: [],
  },
  AAVE: {
    name: 'Aave Token List',
    url: 'https://bafybeick5mozllkwessstgvebwvqcallrkoiiakrl3agh2lghwapg53dmy.ipfs.dweb.link/',
    chainIds: [],
  },
  COIN_GECKO: {
    name: 'CoinGecko',
    url: 'https://tokens.coingecko.com/uniswap/all.json',
    chainIds: [],
  },
  // COIN_GECKO_BASE: {
  //   name: 'CoinGecko',
  //   url: 'https://tokens.coingecko.com/base/all.json',
  //   chainIds: [],
  // },
  COMPOUND: {
    name: 'Compound',
    url: 'https://raw.githubusercontent.com/compound-finance/token-list/master/compound.tokenlist.json',
    chainIds: [
      ethMainChainId,
      ethHoleskyChainId,
      ethSepoliaChainId,
      optimismMainChainId,
      optimismSepoliaChainId,
    ],
  },
  SUSHI: {
    name: 'SushiSwap Menu',
    url: 'https://token-list.sushi.com/',
    chainIds: [],
  },
  PANCAKE: {
    name: 'PancakeSwap Top 100',
    url: 'https://tokens.pancakeswap.finance/pancakeswap-top-100.json',
    chainIds: [bscMainChainId, bscTestChainId],
  },
  PANCAKE_EXT: {
    name: 'PancakeSwap Extended',
    url: 'https://tokens.pancakeswap.finance/pancakeswap-extended.json',
    chainIds: [bscMainChainId, bscTestChainId],
  },
  PANGOLIN: {
    name: 'Pangolin',
    url: 'https://raw.githubusercontent.com/pangolindex/tokenlists/main/pangolin.tokenlist.json',
    chainIds: [avaxMainChainId, avaxFujiChainId],
  },
  OPTIMISM: {
    name: 'Optimism',
    url: 'https://static.optimism.io/optimism.tokenlist.json',
    chainIds: [optimismMainChainId, optimismSepoliaChainId],
  },
  YETI: {
    name: 'Top Tokens',
    url: 'https://raw.githubusercontent.com/YetiSwap/tokenlists/main/top15.tokenlist.json',
    chainIds: [avaxMainChainId, avaxFujiChainId],
  },
  TRADER_JOE: {
    name: 'Trader Joe',
    url: 'https://raw.githubusercontent.com/traderjoe-xyz/joe-tokenlists/main/src/joe.tokenlist-v2.json',
    chainIds: [avaxMainChainId, avaxFujiChainId],
  },
}

/**
 * Returns all token list sources.
 *
 * @returns An array of token list sources.
 */
export const getAllTokenListSources = (): TokenListSource[] => {
  return Object.values(tokenListConfig)
}

/**
 * Returns all token list sources for a given chain id.
 *
 * @param chainId - The chain id.
 * @returns An array of token list sources.
 */
export const getAllTokenListSourcesForChainId = (
  chainId: ChainId,
): TokenListSource[] => {
  return Object.values(tokenListConfig).filter(
    (source) => !source.chainIds.length || source.chainIds.includes(chainId),
  )
}

/**
 * Converts a `Token` object to a `TokenListAsset` object.
 *
 * @param token - The `Token` object to convert.
 * @returns The converted `TokenListAsset` object.
 */
export function tokenToTokenListAsset(token: Token): TokenListAsset {
  return {
    chainId: token.chainId,
    address: token.contractAddress,
    name: token.name,
    symbol: token.symbol,
    decimals: token.decimals,
    logoURI: token.logoUri,
    isCustom: false,
  }
}

/**
 * Converts a `TokenListAsset` object to a `Token` object.
 *
 * @param asset - The `TokenListAsset` object to convert.
 * @param standard - The token standard (e.g., ERC20, ERC721) to assign to the `Token` object.
 * @param hasFeeOnTransfer - Optional flag to indicate if the token has a fee on transfer.
 * @param color - Optional color to associate with the token.
 * @param backgroundColor - Optional background color to associate with the token.
 * @returns The converted `Token` object.
 */
export function tokenListAssetToToken(
  asset: TokenListAsset,
  standard: StandardToken,
  hasFeeOnTransfer?: boolean,
  color?: string,
  backgroundColor?: string,
): Token {
  return {
    chainId: asset.chainId,
    contractAddress: asset.address,
    name: asset.name,
    symbol: asset.symbol,
    decimals: asset.decimals,
    standard,
    hasFeeOnTransfer,
    logoUri: asset.logoURI,
    color,
    backgroundColor,
  }
}

/**
 * Type guard to check if a given object is a TokenListSource.
 *
 * @param obj - The object to check.
 * @returns True if the object is a TokenListSource, otherwise false.
 */
export function isTokenListSource(obj: any): obj is TokenListSource {
  return (
    obj &&
    typeof obj.name === 'string' &&
    typeof obj.url === 'string' &&
    Array.isArray(obj.chainIds) &&
    obj.chainIds.every((chainId: any) => typeof chainId === 'number')
  )
}

/**
 * Type guard to check if a given object is an array of TokenListSource.
 *
 * @param obj - The object to check.
 * @returns True if the object is an array of TokenListSource, otherwise false.
 */
export function isTokenListSourceArray(obj: any): obj is TokenListSource[] {
  return Array.isArray(obj) && obj.every(isTokenListSource)
}

/**
 * Type guard to check if a given object is an ITokenList.
 *
 * @param obj - The object to check.
 * @returns True if the object is an ITokenList, otherwise false.
 */
export function isTokenList(obj: any): obj is ITokenList {
  return (
    obj &&
    typeof obj._chainId === 'number' &&
    Array.isArray(obj._tokenListSources) &&
    obj._tokenListSources.every(isTokenListSource) &&
    Array.isArray(obj._tokens) &&
    typeof obj.getPredefinedToken === 'function' &&
    typeof obj.getTokens === 'function' &&
    typeof obj.fetchTokenLists === 'function' &&
    typeof obj.removeDuplicateTokens === 'function'
  )
}

/**
 * Type guard to check if a given object is a TokenListContext.
 *
 * @param obj - The object to check.
 * @returns True if the object is a TokenListContext, otherwise false.
 */
export function isTokenListContext(obj: any): obj is TokenListContext {
  return isTokenList(obj) || isTokenListSourceArray(obj)
}
