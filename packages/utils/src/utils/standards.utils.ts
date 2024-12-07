import type {
  Standard1155,
  Standard721,
  Standard20,
  Standard777,
  StandardNft,
  StandardToken,
  Standard,
} from '@dex-toolkit/types'

/**
 * Represents the types for ERC20-like tokens.
 */
export const standard20Map: { [key in Standard20]: Standard20 } = {
  ERC20: 'ERC20',
  BEP20: 'BEP20',
  PRC20: 'PRC20',
  TRC20: 'TRC20',
}

/**
 * Represents the types for ERC777-like tokens.
 */
export const standard777Map: { [key in Standard777]: Standard777 } = {
  ERC777: 'ERC777',
  BEP777: 'BEP777',
  PRC777: 'PRC777',
  TRC777: 'TRC777',
}

/**
 * Represents the types for NFT721 tokens.
 */
export const standard721Map: { [key in Standard721]: Standard721 } = {
  ERC721: 'ERC721',
  BEP721: 'BEP721',
  PRC721: 'PRC721',
  TRC721: 'TRC721',
}

/**
 * Represents the types for NFT1155 tokens.
 */
export const standard1155Map: { [key in Standard1155]: Standard1155 } = {
  ERC1155: 'ERC1155',
  BEP1155: 'BEP1155',
  PRC1155: 'PRC1155',
  TRC1155: 'TRC1155',
}

/**
 * Combined type map for all supported standard token types.
 */
export const tokenStandardTypeMap = { ...standard20Map, ...standard777Map }

/**
 * Combined type map for all supported NFT token types.
 */
export const nftStandardTypeMap = { ...standard721Map, ...standard1155Map }

/**
 * Represents all the token 20 standard types.
 */
export const standard20Tokens = Object.values(standard20Map)

/**
 * Represents all the token 777 standard types.
 */
export const standard777Tokens = Object.values(standard777Map)

/**
 * Represents all the token 721 standard types.
 */
export const standard721Tokens = Object.values(standard721Map)

/**
 * Represents all the token 1155 standard types.
 */
export const standard1155Tokens = Object.values(standard1155Map)

/**
 * Represents the combined types for all supported standard tokens.
 */
export const standardTokens: StandardToken[] = [
  ...standard20Tokens,
  ...standard777Tokens,
] as const

/**
 * Represents the combined types for all supported NFT tokens.
 */
export const standardNfts: StandardNft[] = [
  ...standard721Tokens,
  ...standard1155Tokens,
] as const

/**
 * Represents the combined types for all supported tokens.
 */
export const allStandards = [...standardTokens, ...standardNfts] as const

/**
 * Combined type map for all supported token types.
 */
export const standardMap = {
  ...nftStandardTypeMap,
  ...tokenStandardTypeMap,
}

/**
 * Type guard for Standard721.
 * @param type - The token type to check.
 * @returns Whether the token type is a Standard721.
 */
export function isStandard721(type: Standard): type is Standard721 {
  return standard721Tokens.includes(type as Standard721)
}

/**
 * Type guard for Standard1155.
 * @param type - The token type to check.
 * @returns Whether the token type is a Standard1155.
 */
export function isStandard1155(type: Standard): type is Standard1155 {
  return standard1155Tokens.includes(type as Standard1155)
}

/**
 * Type guard for StandardNft.
 * @param type - The token type to check.
 * @returns Whether the token type is a StandardNft.
 */
export function isStandardNft(type: Standard): type is StandardNft {
  return standardNfts.includes(type as StandardNft)
}

/**
 * Type guard for Standard20.
 * @param type - The token type to check.
 * @returns Whether the token type is a Standard20.
 */
export function isStandard20(type: Standard): type is Standard20 {
  return standard20Tokens.includes(type as Standard20)
}

/**
 * Type guard for Standard777.
 * @param type - The token type to check.
 * @returns Whether the token type is a Standard777.
 */
export function isStandard777(type: Standard): type is Standard777 {
  return standard777Tokens.includes(type as Standard777)
}

/**
 * Type guard for StandardToken.
 * @param type - The token type to check.
 * @returns Whether the token type is a StandardToken.
 */
export function isStandardToken(type?: Standard): type is StandardToken {
  return standardTokens.includes(type as StandardToken)
}

/**
 * Type guard for Standard.
 * @param type - The token type to check.
 * @returns Whether the token type is an Standard.
 */
export function isStandard(type: any): type is Standard {
  return allStandards.includes(type as Standard)
}
