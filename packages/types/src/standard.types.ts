/**
 * Type definition for Token 20 standards.
 */
export type Standard20 = 'ERC20' | 'BEP20' | 'PRC20' | 'TRC20'

/**
 * Type definition for Token 777 standards.
 */
export type Standard777 = 'ERC777' | 'BEP777' | 'PRC777' | 'TRC777'

/**
 * Type definition for NFT 721 standards.
 */
export type Standard721 = 'ERC721' | 'BEP721' | 'PRC721' | 'TRC721'

/**
 * Type definition for NFT 1155 standards.
 */
export type Standard1155 = 'ERC1155' | 'BEP1155' | 'PRC1155' | 'TRC1155'

/**
 * Combined type definition for all supported token standards.
 */
export type StandardToken = Standard20 | Standard777

/**
 * Combined type definition for all supported NFT token standards.
 */
export type StandardNft = Standard721 | Standard1155

/**
 * Combined type definition for all supported token standards.
 */
export type Standard = StandardNft | StandardToken
