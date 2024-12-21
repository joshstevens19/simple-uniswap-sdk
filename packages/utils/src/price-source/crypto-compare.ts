import type { ChainId } from '@chain-toolkit/schemas'
import type { CryptoCompareResponse, PriceCurrencies } from '@dex-toolkit/types'
import type { Address } from '@multicall-toolkit/types'
import fetch from 'node-fetch'

import { Price } from './price-source'
import { getAddress } from '../utils'

export class CryptoCompare extends Price {
  constructor(apiKey?: string) {
    super(apiKey)
  }

  protected async fetchFiatPrices({
    // chainId,
    contractAddresses,
    currency = 'USD',
  }: {
    chainId: ChainId
    contractAddresses: Address[]
    currency?: PriceCurrencies
  }): Promise<Record<Address, number>> {
    const cryptoCompareResponse: Record<string, number> = {}
    const headers: HeadersInit = this.apiKey
      ? { authorization: `Apikey ${this.apiKey}` }
      : {}
    const response = (await (
      await fetch(
        `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${contractAddresses.join()}&tsyms=${currency}`,
        { headers },
      )
    ).json()) as CryptoCompareResponse

    for (const [key, value] of Object.entries(response)) {
      const mappedKey = getAddress(key)
      cryptoCompareResponse[mappedKey] = Number(value[currency])
    }

    return cryptoCompareResponse
  }
}
