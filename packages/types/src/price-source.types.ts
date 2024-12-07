import type { Address } from '@multicall-toolkit/types'

import type { StableCoinSymbol } from './token.types'

/**
 * Represents the supported price data sources.
 * - `coingecko`: Price source from CoinGecko API.
 * - `coinmarketcap`: Price source from CoinMarketCap API.
 * - `cryptocompare`: Price source from CryptoCompare API.
 * - `stablecoin`: Indicates a stablecoin price source.
 */
export type PriceType =
  | 'coingecko'
  | 'coinmarketcap'
  | 'cryptocompare'
  | 'stablecoin'

/**
 * Defines the context for API-based price data.
 */
export type ApiPriceContext = {
  /** The source type (excluding 'stablecoin'). */
  sourceType: Exclude<PriceType, 'stablecoin'>
  /** Optional API key for accessing the data source. */
  apiKey?: string
}

/**
 * Defines the context for stablecoin price data.
 */
export type StableCoinPriceContext = {
  /** Fixed to 'stablecoin' for this type. */
  sourceType: 'stablecoin'
  /** The address or symbol of the stablecoin. */
  addressOrSymbol: Address | StableCoinSymbol
}

/**
 * Represents the context for price data, which can either be API-based or stablecoin-based.
 */
export type PriceContext = ApiPriceContext | StableCoinPriceContext

/**
 * Describes the methods for calculating price from multiple sources.
 * - `min`: Select the minimum price.
 * - `max`: Select the maximum price.
 * - `median`: Select the median price.
 */
export type PriceCalculationMethod = 'min' | 'max' | 'median'

/**
 * Supported currencies for price conversion.
 * - `USD`: United States Dollar.
 * - `EUR`: Euro.
 */
export type PriceCurrencies = 'USD' | 'EUR'

/**
 * Defines the context for obtaining prices from multiple sources.
 */
export type MultiPriceContext = {
  /** An array of price contexts to use for the calculation. */
  priceCtxs: PriceContext[]
  /** The method for calculating the price (min, max, or median). */
  calculationMethod: PriceCalculationMethod
  /** Optional currency when including an ApiPriceContext, in which the price is quoted (USD or EUR). */
  currency?: PriceCurrencies
}

/**
 * Represents the response from the CoinGecko API.
 * The key is the address of the token, and the value is the price.
 */
export type CoinGeckoResponse = {
  [key: Address]: number
}

/**
 * Represents the response from the CoinMarketCap API.
 */
export type CoinMarketCapResponse = {
  /** Contains metadata about the API request. */
  status: {
    timestamp: string
    error_code: number
    error_message?: string
    elapsed: number
    credit_count: number
  }
  /** Contains the price and market data for each token. */
  data: {
    [key: Address]: {
      id: number
      name: string
      symbol: string
      slug: string
      num_market_pairs: number
      date_added: string
      tags: string[]
      max_supply?: number
      circulating_supply: number
      total_supply: number
      platform: {
        id: number
        name: string
        symbol: string
        slug: string
        token_address: Address
      }
      cmc_rank: number
      last_updated: string
      quote: {
        [key in PriceCurrencies]: {
          price: number
          volume_24h: number
          percent_change_1h: number
          percent_change_24h: number
          percent_change_7d: number
          market_cap: number
          last_updated: string
        }
      }
    }
  }
}

/**
 * Represents the response from the CryptoCompare API.
 * The key is the token address, and the value contains price data in various currencies.
 */
export type CryptoCompareResponse = {
  [key: Address]: {
    [key in PriceCurrencies]: number
  }
}
