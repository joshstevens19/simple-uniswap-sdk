import type { PriceContext } from '@dex-toolkit/types'
import { describe, it, expect, vi } from 'vitest'

import { DexError } from '../../src/errors/dex-error'
import { ErrorCodes } from '../../src/errors/error-codes'
import { CoinGecko } from '../../src/price-source/coin-gecko'
import { CoinMarketCap } from '../../src/price-source/coin-marketcap'
import { CryptoCompare } from '../../src/price-source/crypto-compare'
import {
  createPriceSource,
  calculatePrice,
} from '../../src/price-source/price-source.utils'

vi.mock('../coin-gecko')
vi.mock('../coin-marketcap')
vi.mock('../crypto-compare')

describe('Price Source Utilities', () => {
  describe('createPriceSource', () => {
    it('should return a CoinGecko instance when sourceType is "coingecko"', () => {
      const priceCtx: PriceContext = {
        sourceType: 'coingecko',
        apiKey: 'api-key',
      }
      const result = createPriceSource(priceCtx)
      expect(result).toBeInstanceOf(CoinGecko)
    })

    it('should return a CoinMarketCap instance when sourceType is "coinmarketcap"', () => {
      const priceCtx: PriceContext = {
        sourceType: 'coinmarketcap',
        apiKey: 'api-key',
      }
      const result = createPriceSource(priceCtx)
      expect(result).toBeInstanceOf(CoinMarketCap)
    })

    it('should return a CryptoCompare instance when sourceType is "cryptocompare"', () => {
      const priceCtx: PriceContext = {
        sourceType: 'cryptocompare',
        apiKey: 'api-key',
      }
      const result = createPriceSource(priceCtx)
      expect(result).toBeInstanceOf(CryptoCompare)
    })

    it('should throw a DexError for an invalid sourceType', () => {
      const priceCtx = {
        sourceType: 'unknown',
        apiKey: 'api-key',
      } as unknown as PriceContext
      expect(() => createPriceSource(priceCtx)).toThrowError(DexError)
    })

    it('should throw an error for stablecoin sourceType', () => {
      const priceCtx = { sourceType: 'stablecoin' } as unknown as PriceContext
      expect(() => createPriceSource(priceCtx)).toThrowError(
        new DexError(
          'Price source stablecoin should be taken care of by the Router',
          ErrorCodes.invalidPrice,
        ),
      )
    })
  })

  describe('calculatePrice', () => {
    it('should calculate the minimum price', () => {
      const result = calculatePrice([100, 200, 300], 'min')
      expect(result).toEqual(100)
    })

    it('should calculate the maximum price', () => {
      const result = calculatePrice([100, 200, 300], 'max')
      expect(result).toEqual(300)
    })

    it('should calculate the median price for odd length array', () => {
      const result = calculatePrice([300, 100, 200], 'median')
      expect(result).toEqual(200)
    })

    it('should calculate the median price for even length array', () => {
      const result = calculatePrice([300, 100, 200, 400], 'median')
      expect(result).toEqual(250)
    })

    it('should return 0 if the price array is empty', () => {
      const result = calculatePrice([], 'min')
      expect(result).toEqual(0)
    })

    it('should throw an error for an unknown calculation method', () => {
      expect(() => calculatePrice([100, 200], 'unknown' as any)).toThrowError(
        'Unknown price calculation method: unknown',
      )
    })
  })

  // TODO
  // describe('fetchAndCalculateFiatPrices', () => {
  //   it('should fetch and calculate fiat prices correctly', async () => {
  //     const multiPriceContext: MultiPriceContext = {
  //       priceCtxs: [
  //         { sourceType: 'coingecko' },
  //         { sourceType: 'coinmarketcap' },
  //         { sourceType: 'cryptocompare' },
  //       ],
  //       calculationMethod: 'max',
  //     }

  //     const result = await fetchAndCalculateFiatPrices({
  //       chainId: 1,
  //       multiPriceContext,
  //       contractAddresses: [MockFunToken.contractAddress],
  //     })
  //     console.log(result)
  //   })
  // })
})
