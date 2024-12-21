import type { ChainId } from '@chain-toolkit/schemas'
import type { DexProvider } from '@dex-toolkit/provider'
import type {
  TokenListAsset,
  TokenListMetadata,
  TokenListSource,
  Token,
  DexCustomNetwork,
  ITokenList,
  TokenListContext,
} from '@dex-toolkit/types'
import {
  getAddress,
  getAllTokenListSourcesForChainId,
  isSameAddress,
  isTokenList,
  isTokenListSourceArray,
  tokenClasses,
  tokenListAssetToToken,
} from '@dex-toolkit/utils'
import type { Address } from '@multicall-toolkit/types'

/**
 * Represents a collection of tokens for a specific chain and provides utility methods
 * to fetch and manage token metadata.
 */
export class TokenList implements ITokenList {
  /**
   * The chain ID for which the token list is relevant.
   */
  _chainId: number

  /**
   * Custom network configuration, if applicable.
   */
  _customNetwork?: DexCustomNetwork

  /**
   * A list of token list sources providing token metadata.
   */
  _tokenListSources: TokenListSource[]

  /**
   * An internal cache of fetched tokens.
   */
  _tokens: Token[] = []

  constructor({
    chainId,
    customNetwork,
    tokenListSources,
  }: {
    chainId: ChainId
    customNetwork?: DexCustomNetwork
    tokenListSources?: TokenListSource[]
  }) {
    this._chainId = chainId
    this._customNetwork = customNetwork
    this._tokenListSources = tokenListSources?.length
      ? tokenListSources
      : getAllTokenListSourcesForChainId(chainId)
  }

  public getPredefinedToken({
    contractAddress,
  }: {
    contractAddress: Address
  }): Token | undefined {
    // Check the custom network tokens
    if (this._customNetwork?.tokens) {
      const token = this._customNetwork.tokens.find((t) =>
        isSameAddress(t.contractAddress, contractAddress),
      )

      if (token) {
        return token
      }
    }

    // Check the built-in token classes
    for (const tokenClass of Object.values(tokenClasses)) {
      const token = tokenClass.getTokenForChainId(this._chainId)

      if (token && isSameAddress(token.contractAddress, contractAddress)) {
        return token
      }
    }

    // Check the token list
    for (const token of this._tokens) {
      if (isSameAddress(token.contractAddress, contractAddress)) {
        return token
      }
    }

    return undefined
  }

  /**
   * Retrieves the list of tokens, either from the cache or by fetching from sources.
   *
   * @returns A promise resolving to an array of `Token` objects.
   */
  public async getTokens(): Promise<Token[]> {
    if (this._tokens.length > 0) {
      return this._tokens
    }

    let tokenListData: Token[] = []

    const combinedTokensFromLists = await this.fetchTokenLists()

    if (
      !combinedTokensFromLists.length &&
      !this._customNetwork?.tokens?.length
    ) {
      return tokenListData
    }

    tokenListData = [...combinedTokensFromLists]

    if (this._customNetwork?.tokens) {
      tokenListData = this._customNetwork.tokens.reduce((tokens, token) => {
        if (token.chainId === this._chainId) {
          tokens.push(token)
        }

        return tokens
      }, tokenListData)
    }

    const uniqueTokens = this.removeDuplicateTokens(tokenListData)

    this._tokens = uniqueTokens

    return uniqueTokens
  }

  /**
   * Fetches token data from all configured token list sources.
   *
   * @returns A promise resolving to an array of `Token` objects retrieved from the sources.
   */
  public async fetchTokenLists(): Promise<Token[]> {
    const tokenLists = await Promise.all(
      this._tokenListSources.map(async (source) => {
        const response = await fetch(source.url)
        const tokenList = (await response.json()) as TokenListMetadata

        return tokenList.tokens.filter(
          (token: TokenListAsset) => token.chainId === this._chainId,
        )
      }),
    )

    return tokenLists
      .flat()
      .map((token) => tokenListAssetToToken(token, 'ERC20'))
  }

  /**
   * Removes duplicate tokens based on their contract addresses.
   *
   * @param tokens - The array of tokens to deduplicate.
   * @returns An array of unique `Token` objects.
   */
  public removeDuplicateTokens(tokens: Token[]): Token[] {
    const uniqueTokensMap = tokens.reduce(
      (acc, token) => {
        acc[getAddress(token.contractAddress)] = token
        return acc
      },
      {} as Record<string, Token>,
    )

    return Object.values(uniqueTokensMap)
  }
}

/**
 * Parses the `TokenListContext` and creates an instance of `TokenList` or returns the provided `ITokenList` instance.
 *
 * @param params - The parameters required to parse the token list.
 * @param params.dexProvider - The `DexProvider` instance providing network details and custom network configuration.
 * @param params.tokenListContext - The context for the token list. It can be:
 * - An instance of `ITokenList`.
 * - An array of `TokenListSource` objects.
 * - `undefined` to disable the token list.
 *
 * @returns An instance of `TokenList` if the context is valid, or `undefined` if the token list is disabled.
 */
export function parseTokenListFromTokenListContext({
  dexProvider,
  tokenListContext,
}: {
  dexProvider: DexProvider
  tokenListContext?: TokenListContext
}): TokenList | undefined {
  if (isTokenList(tokenListContext)) {
    return tokenListContext
  }

  if (isTokenListSourceArray(tokenListContext)) {
    return new TokenList({
      customNetwork: dexProvider.customNetwork,
      chainId: dexProvider.network.chainId,
      tokenListSources: tokenListContext,
    })
  }

  return undefined
}
