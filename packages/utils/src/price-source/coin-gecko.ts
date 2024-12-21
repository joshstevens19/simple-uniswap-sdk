import {
  arbitrumChains,
  avaxChains,
  bscChains,
  celoChains,
  ethChains,
  optimismChains,
  plsChains,
  polygonChains,
} from '@chain-toolkit/chains'
import type { ChainId } from '@chain-toolkit/schemas'
import type { CoinGeckoResponse, PriceCurrencies } from '@dex-toolkit/types'
import type { Address } from '@multicall-toolkit/types'
import fetch from 'node-fetch'

import { Price } from './price-source'
import { getAddress } from '../utils/address.utils'

const getCoinGeckoIdForChainId = (chainId: ChainId) => {
  if (ethChains.includes(chainId)) {
    return 'ethereum'
  }

  if (bscChains.includes(chainId)) {
    return 'binance-smart-chain'
  }

  if (polygonChains.includes(chainId)) {
    return 'polygon-pos'
  }

  if (plsChains.includes(chainId)) {
    return 'pulsechain'
  }

  if (avaxChains.includes(chainId)) {
    return 'avalanche'
  }

  if (arbitrumChains.includes(chainId)) {
    return 'arbitrum-one'
  }

  if (celoChains.includes(chainId)) {
    return 'celo'
  }

  if (optimismChains.includes(chainId)) {
    return 'optimistic-ethereum'
  }

  return 'ethereum'
}

export class CoinGecko extends Price {
  constructor(apiKey?: string) {
    super(apiKey)
  }

  protected async fetchFiatPrices({
    chainId,
    contractAddresses,
    currency = 'USD',
  }: {
    chainId: ChainId
    contractAddresses: Address[]
    currency?: PriceCurrencies
  }): Promise<Record<Address, number>> {
    const response = (await (
      await fetch(
        `https://api.coingecko.com/api/v3/simple/token_price/${getCoinGeckoIdForChainId(chainId)}?contract_addresses=${contractAddresses.join()}&vs_currencies=${currency.toLowerCase()}${this.apiKey ? `&api_key=${this.apiKey}` : ''}`,
      )
    ).json()) as Record<string, any>

    const coinGeckoResponse = {} as CoinGeckoResponse

    for (const [key, value] of Object.entries(response)) {
      const mappedKey = getAddress(key)
      coinGeckoResponse[mappedKey] = Number(value[currency.toLowerCase()])
    }

    return coinGeckoResponse
  }
}
