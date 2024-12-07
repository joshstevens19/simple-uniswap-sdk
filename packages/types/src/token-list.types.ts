import type { Address, ChainId } from '@ethereum-multicall/types'

import type { Token } from './token.types'
import type { DexCustomNetwork } from './trade.types'
import type { Version } from './version.types'

/**
 * Represents an asset in a token list.
 */
export type TokenListAsset = {
  /** The chain ID of the network where the token resides. */
  chainId: ChainId
  /** The contract address of the token. */
  address: Address
  /** The name of the token. */
  name: string
  /** The symbol of the token. */
  symbol: string
  /** The number of decimal places the token uses. */
  decimals: number
  /** (Optional) The URI of the token's logo image. */
  logoURI?: string
  /** (Optional) Indicates whether the token is custom (not predefined). */
  isCustom?: boolean
}

/**
 * Represents a token list, including metadata and the tokens themselves.
 */
export type TokenListMetadata = {
  /** The name of the token list. */
  name: string
  /** The timestamp of when the list was generated. */
  timestamp: string
  /** The version of the token list. */
  version: Version
  /** A list of keywords associated with the token list. */
  keywords: string[]
  /** A record of tags and their descriptions. */
  tags: Record<string, string>
  /** The URI of the token list's logo. */
  logoURI: string
  /** An array of tokens in the token list. */
  tokens: TokenListAsset[]
}

/**
 * Represents a source for token lists.
 */
export type TokenListSource = {
  /** The name of the token list. */
  name: string
  /** The URL where the token list can be fetched. */
  url: string
  /** Known supported chain IDs for the token list. */
  chainIds: ChainId[]
}

/**
 * Represents the context for managing token lists.
 * Can either be a token list factory instance or an array of token list sources.
 */
export type TokenListContext = ITokenList | TokenListSource[]

/**
 * Represents the supported sources for token lists.
 */
export type TokenListSourceKey =
  | 'DEFIBIDS'
  | 'UNISWAP'
  | 'AAVE'
  | 'COIN_GECKO'
  | 'COMPOUND'
  | 'SUSHI'
  | 'PANCAKE'
  | 'PANCAKE_EXT'
  | 'PANGOLIN'
  | 'OPTIMISM'
  | 'YETI'
  | 'TRADER_JOE'

/**
 * Represents the configuration for token list sources.
 * Maps token list source keys to `TokenListSource` objects.
 */
export type TokenListConfig = {
  [key in TokenListSourceKey]: TokenListSource
}

/**
 * Represents the interface for a token list factory.
 * A factory handles retrieving, fetching, and managing tokens and token lists.
 */
export interface ITokenList {
  /** The chain ID associated with the token list factory. */
  _chainId: number

  /** (Optional) Custom network settings for the token list. */
  _customNetwork?: DexCustomNetwork

  /** The list of token list sources being used by the factory. */
  _tokenListSources: TokenListSource[]

  /** The array of tokens managed by the factory. */
  _tokens: Token[]

  /**
   * Retrieves a predefined token based on the provided contract address.
   *
   * @param contractAddress - The contract address of the token to look up.
   * @returns The matching `Token` object if found; otherwise, `undefined`.
   */
  getPredefinedToken({
    contractAddress,
  }: {
    contractAddress: Address
  }): Token | undefined

  /**
   * Retrieves the complete list of tokens for the configured chain, including custom tokens.
   *
   * @returns A promise that resolves to an array of `TokenListAsset` objects.
   */
  getTokens(): Promise<Token[]>

  /**
   * Fetches the token lists from all configured sources.
   *
   * @returns A promise that resolves to an array of `TokenListAsset` objects.
   */
  fetchTokenLists(): Promise<Token[]>

  /**
   * Removes duplicate tokens from the provided list based on their contract addresses.
   *
   * @param tokens - An array of `Token` objects.
   * @returns An array of unique `Token` objects.
   */
  removeDuplicateTokens(tokens: Token[]): Token[]
}
