import type {
  PriceContext,
  PriceCalculationMethod,
  MultiPriceContext,
} from '@dex-toolkit/types'
import type { ChainId } from '@multicall-toolkit/types'

import { CoinGecko } from './coin-gecko'
import { CoinMarketCap } from './coin-marketcap'
import { CryptoCompare } from './crypto-compare'
import { Price } from './price-source'
import { DexError } from '../errors/dex-error'
import { ErrorCodes } from '../errors/error-codes'

/**
 * Creates an instance of a price source based on the given price context.
 *
 * @param priceCtx - The price context containing the source type and optional API key.
 *
 * @returns A price source instance.
 * @throws Will throw an error if the source type is unknown.
 */
export function createPriceSource(priceCtx: PriceContext): Price {
  switch (priceCtx.sourceType) {
    case 'coingecko':
      return new CoinGecko(priceCtx.apiKey)
    case 'coinmarketcap':
      return new CoinMarketCap(priceCtx.apiKey)
    case 'cryptocompare':
      return new CryptoCompare(priceCtx.apiKey)
    case 'stablecoin':
      throw new DexError(
        `Price source ${priceCtx.sourceType} should be taken care of by the Router`,
        ErrorCodes.invalidPrice,
      )
    default:
      throw new DexError(`Invalid price source`, ErrorCodes.invalidPrice)
  }
}

/**
 * Calculates the price based on the given method.
 *
 * @param prices - An array of prices to calculate from.
 * @param method - The calculation method ('min', 'max', 'median').
 *
 * @returns The calculated price.
 * @throws Will throw an error if the calculation method is unknown.
 */
export function calculatePrice(
  prices: number[],
  method: PriceCalculationMethod,
): number {
  if (prices.length === 0) return 0

  switch (method) {
    case 'min':
      return Math.min(...prices)
    case 'max':
      return Math.max(...prices)
    case 'median': {
      const sortedPrices = prices.slice().sort((a, b) => a - b)
      const mid = Math.floor(sortedPrices.length / 2)

      if (sortedPrices.length % 2 !== 0) {
        return sortedPrices[mid] ?? 0
      } else {
        const lowerMid = sortedPrices[mid - 1] ?? 0
        const upperMid = sortedPrices[mid] ?? 0
        return (lowerMid + upperMid) / 2
      }
    }
    default:
      throw new Error(`Unknown price calculation method: ${method}`)
  }
}

/**
 * Fetches and calculates fiat prices from multiple price contexts.
 *
 * @param params - The parameters required to fetch and calculate fiat prices.
 * @param params.chainId - The chain ID.
 * @param params.multiPriceContext - The multi price context containing multiple price contexts and a calculation method.
 * @param params.contractAddresses - An array of contract addresses to fetch prices for.
 *
 * @returns A promise that resolves to an object with contract addresses as keys and their calculated prices as values.
 */
export async function fetchAndCalculateFiatPrices({
  chainId,
  multiPriceContext,
  contractAddresses,
}: {
  chainId: ChainId
  multiPriceContext: MultiPriceContext
  contractAddresses: string[]
}): Promise<Record<string, number>> {
  const allPrices: Record<string, number[]> = {}

  const fetchPromises = multiPriceContext.priceCtxs.map((priceCtx) => {
    const source = createPriceSource(priceCtx)

    return source.getFiatPrices({ chainId, contractAddresses })
  })

  const results = await Promise.all(fetchPromises)

  results.forEach((fiatPrices) => {
    for (const address of contractAddresses) {
      if (!allPrices[address]) {
        allPrices[address] = []
      }
      if (fiatPrices[address] !== undefined) {
        allPrices[address].push(fiatPrices[address])
      }
    }
  })

  const calculatedPrices: Record<string, number> = {}

  for (const address of contractAddresses) {
    const prices = allPrices[address]

    if (!prices || prices.length === 0) {
      continue
    }

    calculatedPrices[address] = calculatePrice(
      prices,
      multiPriceContext.calculationMethod,
    )
  }

  return calculatedPrices
}
