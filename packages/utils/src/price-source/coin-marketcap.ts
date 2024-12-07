import type { CoinMarketCapResponse, PriceCurrencies } from '@dex-toolkit/types'
import type { Address, ChainId } from '@multicall-toolkit/types'
import fetch from 'node-fetch'

import { Price } from './price-source'
import { getAddress } from '../utils'

export class CoinMarketCap extends Price {
  constructor(apiKey?: string) {
    super(apiKey)
  }

  protected async fetchFiatPrices({
    contractAddresses,
    currency = 'USD',
  }: {
    chainId: ChainId
    contractAddresses: Address[]
    currency?: PriceCurrencies
  }): Promise<Record<Address, number>> {
    const coinMarketCapResponse: Record<string, number> = {}
    const headers: HeadersInit = this.apiKey
      ? { 'X-CMC_PRO_API_KEY': this.apiKey }
      : {}
    const response = (await (
      await fetch(
        `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=${contractAddresses.join()}`,
        { headers },
      )
    ).json()) as CoinMarketCapResponse

    for (const [key, value] of Object.entries(response.data)) {
      const mappedKey = getAddress(key)
      coinMarketCapResponse[mappedKey] = Number(value.quote[currency].price)
    }

    return coinMarketCapResponse
  }
}
