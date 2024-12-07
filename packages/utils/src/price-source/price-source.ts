import type { MultiPriceContext } from '@dex-toolkit/types'
import type { Address, ChainId } from '@ethereum-multicall/types'

import { transformCoinAddressToWrappedAddress } from '../utils/address.utils'

export const defaultMultiPriceContext: MultiPriceContext = {
  priceCtxs: [
    {
      sourceType: 'coingecko',
    },
  ],
  calculationMethod: 'median',
  currency: 'USD',
}

export abstract class Price {
  protected _cacheMilliseconds: number = 90000
  protected _fiatPriceCache?: {
    cachedResponse: Record<string, number>
    timestamp: number
  } = undefined
  protected apiKey?: string

  constructor(apiKey?: string) {
    this.apiKey = apiKey
  }

  /**
   * Get fiat prices for the given contract addresses.
   *
   * @param params - The parameters required to get fiat prices.
   * @param params.chainId The chain id.
   * @param params.contractAddresses The array of contract addresses.
   *
   * @returns A promise that resolves to an object containing the fiat prices.
   */
  public async getFiatPrices({
    chainId,
    contractAddresses,
  }: {
    chainId: ChainId
    contractAddresses: Address[]
  }): Promise<Record<string, number>> {
    contractAddresses = contractAddresses.map((address) =>
      transformCoinAddressToWrappedAddress(address),
    )

    if (this._fiatPriceCache) {
      const now = Date.now()
      if (this._fiatPriceCache.timestamp > now - this._cacheMilliseconds) {
        return this._fiatPriceCache.cachedResponse
      }
    }

    try {
      const fiatPrices = await this.fetchFiatPrices({
        chainId,
        contractAddresses,
      })

      this._fiatPriceCache = {
        cachedResponse: fiatPrices,
        timestamp: Date.now(),
      }

      return fiatPrices
    } catch (e) {
      if (this._fiatPriceCache) {
        return this._fiatPriceCache.cachedResponse
      }
      return {}
    }
  }

  /**
   * Fetch fiat prices from the specific price source.
   *
   * @param params - The parameters required to fetch fiat prices.
   * @param params.chainId The chain id.
   * @param params.contractAddresses The array of contract addresses.
   *
   * @returns A promise that resolves to an object containing the fiat prices.
   */
  protected abstract fetchFiatPrices({
    chainId,
    contractAddresses,
  }: {
    chainId: ChainId
    contractAddresses: Address[]
  }): Promise<Record<string, number>>
}
