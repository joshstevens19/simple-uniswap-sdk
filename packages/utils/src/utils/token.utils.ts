import { parseDecimals } from '@dex-toolkit/number'
import type {
  Token,
  NativeWrappedTokenInfo,
  Bep20Types,
  Bep777Types,
  Erc1155Types,
  Erc721Types,
  Erc777Types,
  Erc20Types,
} from '@dex-toolkit/types'
import type { ChainId } from '@multicall-toolkit/types'

import {
  isAddress,
  isSameAddress,
  transformCoinAddressToWrappedAddress,
} from './address.utils'
import { decodeHexString } from './ethers.utils'
import { isStandard } from './standards.utils'
import { isChainId } from '../chains/chain-utils'
import { DexError, ErrorCodes } from '../errors'
import { tokenClasses } from '../tokens/tokenConfigs'

/**
 * Get the token by chain ID
 *
 * @param params - The parameters required to get the token by chain ID.
 * @param params.symbol - The symbol of the token
 * @param params.chainId - The chain ID of the token
 *
 * @returns Token info if it exists, undefined otherwise
 */
export function getTokenByChainId({
  symbol,
  chainId,
}: {
  symbol: string
  chainId: ChainId
}): Token | undefined {
  const tokenClass = tokenClasses[symbol]

  if (!tokenClass) {
    return undefined
  }

  return tokenClass.getTokenForChainId(chainId)
}

/**
 * Get all tokens for a chain ID
 *
 * @param chainId - The chain ID of the tokens
 *
 * @returns An array of tokens for the given chain ID
 */
export function getAllTokensForChainId(chainId: ChainId): Token[] {
  const tokens: Token[] = []

  for (const tokenClass of Object.values(tokenClasses)) {
    const token = tokenClass.getTokenForChainId(chainId)

    if (token) {
      tokens.push(token)
    }
  }

  return tokens
}

/**
 * Normalizes token attributes: name, symbol, and decimals.
 * - Converts decimals to a plain number.
 * - Decodes hex strings for name and symbol.
 *
 * @param token - The token object with attributes to normalize.
 *
 * @returns A token object with normalized name, symbol, and decimals.
 */
export function normalizeTokenAttributes(token: Token): Token {
  const { name, symbol, decimals, ...rest } = token

  return {
    ...rest,
    name: decodeHexString(name),
    symbol: decodeHexString(symbol),
    decimals: parseDecimals(decimals),
  }
}

/**
 * Strip token of any extra properties
 *
 * @param token - The token
 *
 * @returns The token without any extra properties
 */
export function stripToken(token: Token): Token {
  const { contractAddress, symbol, name, decimals, chainId, standard } =
    token ?? {}

  return {
    contractAddress,
    symbol,
    name,
    decimals,
    chainId,
    standard,
  }
}

/**
 * Filters out any undefined tokens from a two-dimensional array of tokens.
 *
 * @param tokens - A two-dimensional array of tokens where each pair may contain undefined values.
 *
 * @returns A two-dimensional array of tokens with all undefined values removed.
 */
export function filterUndefinedTokens(
  tokens: (Token | undefined)[][],
): Token[][] {
  return tokens.filter(
    (t) => t[0] !== undefined && t[1] !== undefined,
  ) as Token[][]
}

/**
 * Filters out the native currency and native wrapped token from an array of tokens.
 *
 * @param params - The parameters required to filter native tokens.
 * @param params.tokens - An array of tokens that may contain the native currency and native wrapped token.
 * @param params.nativeWrappedTokenInfo - The native wrapped token information.
 *
 * @returns An array of tokens excluding the native currency and native wrapped token.
 * @throws Throws an error if the native currency or wrapped token information is missing.
 */
export function filterNativeTokens({
  tokens,
  nativeWrappedTokenInfo,
}: {
  tokens: Token[]
  nativeWrappedTokenInfo: NativeWrappedTokenInfo
}): Token[] {
  return tokens.filter(
    (token) =>
      token?.contractAddress &&
      !isSameAddress(
        transformCoinAddressToWrappedAddress(token.contractAddress),
        nativeWrappedTokenInfo.contractAddress,
      ),
  )
}

/**
 * Filters out any tokens that are the same as the from or to token.
 *
 * @param params - The parameters required to filter trading tokens.
 * @param params.tokens - An array of tokens to filter.
 * @param params.fromToken - The from token.
 * @param params.toToken - The to token.
 *
 * @returns An array of tokens excluding the from and to tokens.
 */
export function filterTradingTokens({
  tokens,
  fromToken,
  toToken,
}: {
  tokens: Token[]
  fromToken: Token
  toToken: Token
}): Token[] {
  return tokens.filter(
    (token) =>
      token?.contractAddress &&
      !isSameAddress(token.contractAddress, fromToken.contractAddress) &&
      !isSameAddress(token.contractAddress, toToken.contractAddress),
  )
}

// ------------------------
// Type Guards
// ------------------------

/**
 * Type guard to check if a value is a valid `Token`.
 *
 * @param value - The value to check.
 *
 * @returns True if the value is a valid `Token`; otherwise, false.
 */
export function isToken(value: any): value is Token {
  if (!value || typeof value !== 'object') {
    return false
  }

  // Helper to check if a value is a valid hex color
  const isValidColor = (color: unknown): boolean => {
    return typeof color === 'string' && /^(#|rgb|rgba)/.test(color)
  }

  const token = value as Token

  // Required fields
  if (!isChainId(token.chainId)) {
    return false
  }

  if (!isAddress(token.contractAddress)) {
    return false
  }

  if (
    typeof token.decimals !== 'number' ||
    !Number.isInteger(token.decimals) ||
    token.decimals < 0
  ) {
    return false
  }

  if (typeof token.symbol !== 'string' || token.symbol.length === 0) {
    return false
  }

  if (typeof token.name !== 'string' || token.name.length === 0) {
    return false
  }

  if (!isStandard(token.standard)) {
    return false
  }

  // Optional fields - only validate if they exist
  if (
    'hasFeeOnTransfer' in token &&
    typeof token.hasFeeOnTransfer !== 'boolean'
  ) {
    return false
  }

  if (
    'logoUri' in token &&
    (typeof token.logoUri !== 'string' || token.logoUri.length === 0)
  ) {
    return false
  }

  if ('color' in token && !isValidColor(token.color)) {
    return false
  }

  if ('backgroundColor' in token && !isValidColor(token.backgroundColor)) {
    return false
  }

  return true
}

/**
 * Asserts that the provided value is a valid `Token`.
 *
 * @param value - The value to check.
 * @param errorCode - Optional error code to throw if assertion fails.
 * @throws `DexError` if the value is not provided or is not a valid `Token`.
 */
export function assertToken(
  value: any,
  errorCode = ErrorCodes.functionArgumentError,
): asserts value is Token {
  if (value === undefined || value === null) {
    throw new DexError('Token is required but was not provided', errorCode)
  }

  if (!isToken(value)) {
    throw new DexError('Invalid Token provided', errorCode)
  }
}

// ------------------------
// Method Names
// ------------------------

/**
 * Default method map for ERC-777 tokens.
 */
const baseErc777MethodMap: Omit<Erc777Types.MethodNameMap, 'granularity'> = {
  name: 'name',
  symbol: 'symbol',
  defaultOperators: 'defaultOperators',
  balanceOf: 'balanceOf',
  isOperatorFor: 'isOperatorFor',
  authorizeOperator: 'authorizeOperator',
  defaultOperatorsSend: 'defaultOperatorsSend',
  revokeOperator: 'revokeOperator',
  operatorSend: 'operatorSend',
  revokeDefaultOperators: 'revokeDefaultOperators',
  send: 'send',
  setDefaultOperators: 'setDefaultOperators',
} as const

// ERC

/**
 * Default method map for ERC-20 tokens.
 */
export const defaultErc20MethodMap: Erc20Types.MethodNameMap = {
  name: 'name',
  approve: 'approve',
  totalSupply: 'totalSupply',
  transferFrom: 'transferFrom',
  decimals: 'decimals',
  balanceOf: 'balanceOf',
  symbol: 'symbol',
  transfer: 'transfer',
  allowance: 'allowance',
} as const

/**
 * Default method map for ERC-777 tokens.
 */
export const defaultErc777MethodMap: Erc777Types.MethodNameMap = {
  ...baseErc777MethodMap,
  granularity: 'granularity',
} as const

/**
 * Default method map for ERC-721 tokens.
 */
export const defaultErc721MethodMap: Erc721Types.MethodNameMap = {
  approve: 'approve',
  balanceOf: 'balanceOf',
  getApproved: 'getApproved',
  isApprovedForAll: 'isApprovedForAll',
  name: 'name',
  owner: 'owner',
  ownerOf: 'ownerOf',
  renounceOwnership: 'renounceOwnership',
  safeTransferFrom: 'safeTransferFrom',
  setApprovalForAll: 'setApprovalForAll',
  supportsInterface: 'supportsInterface',
  symbol: 'symbol',
  tokenId: 'tokenId',
  tokenURI: 'tokenURI',
  transferFrom: 'transferFrom',
  transferOwnership: 'transferOwnership',
  mintNFT: 'mintNFT',
} as const

/**
 * Default method map for ERC-1155 tokens.
 */
export const defaultErc1155MethodMap: Erc1155Types.MethodNameMap = {
  balanceOf: 'balanceOf',
  balanceOfBatch: 'balanceOfBatch',
  isApprovedForAll: 'isApprovedForAll',
  safeBatchTransferFrom: 'safeBatchTransferFrom',
  safeTransferFrom: 'safeTransferFrom',
  setApprovalForAll: 'setApprovalForAll',
  supportsInterface: 'supportsInterface',
  uri: 'uri',
} as const

// BEP

/**
 * Default method map for BEP-20 tokens.
 */
export const defaultBep20MethodMap: Bep20Types.MethodNameMap = {
  ...defaultErc20MethodMap,
  getOwner: 'getOwner',
} as const

/**
 * Default method map for BEP-777 tokens.
 */
export const defaultBep777MethodMap: Bep777Types.MethodNameMap = {
  ...baseErc777MethodMap,
  decimals: 'decimals',
  allowance: 'allowance',
  approve: 'approve',
  decreaseAllowance: 'decreaseAllowance',
  increaseAllowance: 'increaseAllowance',
  transfer: 'transfer',
} as const
