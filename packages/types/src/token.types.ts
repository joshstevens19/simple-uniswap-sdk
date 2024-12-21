import type { ChainId } from '@chain-toolkit/schemas'
import type { Address } from '@multicall-toolkit/types'

import type { DexProtocol, DexTag } from './dex.types'
import type { StandardToken } from './standard.types'
import type { TradeFormat, TradeFormatValue } from './trade.types'
import type { VersionTag } from './version.types'

/**
 * Represents a class that provides token information for different chains.
 */
export type TokenClass = {
  /**
   * Retrieves the token for the specified chain ID.
   *
   * @param chainId - The ID of the chain to get the token for.
   * @returns The token associated with the specified chain ID, or undefined if not found.
   */
  getTokenForChainId: (chainId: ChainId) => Token | undefined
}

/**
 * A stable coin symbol.
 */
export type StableCoinSymbol = 'DAI' | 'USDB' | 'USDC' | 'USDT'

/**
 * Represents a token on the blockchain.
 */
export type Token = {
  /** The chain ID on which the token exists. */
  chainId: ChainId
  /** The contract address of the token. */
  contractAddress: Address
  /** The number of decimals the token uses. */
  decimals: number
  /** The symbol of the token (e.g., "ETH", "DAI"). */
  symbol: string
  /** The name of the token. */
  name: string
  /** The standard of the token (e.g., ERC20, ERC721). */
  standard: StandardToken
  /** Indicates whether the token has a fee on transfer. */
  hasFeeOnTransfer?: boolean
  /** The URI for the token's logo. */
  logoUri?: string
  /** The primary color associated with the token. */
  color?: string
  /** The background color associated with the token. */
  backgroundColor?: string
}

/**
 * Represents the balance information of a token, including whether the balance is sufficient for the trade.
 */
export type TokenAllowanceInfo<TFormat extends TradeFormat> = {
  /** The allowance of the token. */
  allowance: TradeFormatValue<TFormat>
  /** Indicates whether the allowance is sufficient for the trade. */
  hasEnoughAllowance?: boolean
  /** Whether the token has the maximum allowance */
  isMaxAllowance: boolean
}

/**
 * Represents the balance information of a token, including whether the balance is sufficient for the trade.
 */
export type TokenBalanceInfo<TFormat extends TradeFormat> = {
  /** The balance of the token. */
  balance: TradeFormatValue<TFormat>
  /** Indicates whether the balance is sufficient for the trade. */
  hasEnoughBalance?: boolean
}

/**
 * Represents the allowance of a token for different DEX versions.
 */
export type AllowanceInfo<TFormat extends TradeFormat> = {
  [key in DexProtocol]: Record<VersionTag, TokenAllowanceInfo<TFormat>>
}

/**
 * Represents the allowances of a token across multiple DEXes.
 */
export type AllowancesByDex<TFormat extends TradeFormat> = {
  [key: DexTag]: AllowanceInfo<TFormat>
}

/**
 * Represents the balance and allowances of a token for a specific DEX.
 */
export type AllowanceAndBalanceOf<TFormat extends TradeFormat> = {
  /** The allowances of the token across multiple DEXes. */
  allowanceInfoByDex: AllowancesByDex<TFormat>
  /** The balance of the token. */
  balanceInfo: TokenBalanceInfo<TFormat>
}
/**
 * Represents a token with allowance and balance information across multiple DEXes.
 */
export type MultiDexTokenWithAllowanceInfo<TFormat extends TradeFormat> =
  AllowanceAndBalanceOf<TFormat> & {
    /** The token information. */
    token: Token
  }

/**
 * Represents allowances and balances for a pair of tokens across multiple DEXes.
 */
export type MultiTokenAllowancesAndBalance<TFormat extends TradeFormat> = {
  /** The source token information including balances and allowances. */
  fromToken: MultiDexTokenWithAllowanceInfo<TFormat>
  /** The destination token information including balances and allowances. */
  toToken: MultiDexTokenWithAllowanceInfo<TFormat>
}
