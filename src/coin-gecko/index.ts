import fetch from 'node-fetch';
import { removeEthFromContractAddress } from '../common/tokens';
import { deepClone } from '../common/utils/deep-clone';
import { getAddress } from '../common/utils/get-address';
import { CoinGeckoResponse } from './models/coin-gecko-response';

export class CoinGecko {
  private _fiatPriceCache:
    | {
        cachedResponse: CoinGeckoResponse;
        timestamp: number;
      }
    | undefined = undefined;
  // 90 seconds cache
  private _cacheMilliseconds = 90000;
  constructor() {}

  /**
   * Get the coin gecko fiat price
   * @param contractAddress The array of contract addresses
   */
  public async getCoinGeckoFiatPrices(
    contractAddresses: string[]
  ): Promise<CoinGeckoResponse> {
    contractAddresses = contractAddresses.map((address) =>
      removeEthFromContractAddress(address)
    );

    if (this._fiatPriceCache) {
      const now = Date.now();
      if (
        deepClone(this._fiatPriceCache.timestamp) >
        now - this._cacheMilliseconds
      ) {
        return this._fiatPriceCache.cachedResponse;
      }
    }

    try {
      const coinGeckoResponse: CoinGeckoResponse = {};

      const response = await (
        await fetch(
          `https://api.coingecko.com/api/v3/simple/token_price/ethereum?contract_addresses=${contractAddresses.join()}&vs_currencies=usd`
        )
      ).json();

      for (const [key, value] of Object.entries(response)) {
        for (let i = 0; i < contractAddresses.length; i++) {
          const mappedKey = getAddress(key);
          // @ts-ignore
          coinGeckoResponse[mappedKey] = Number(value['usd']);
        }
      }

      this._fiatPriceCache = {
        cachedResponse: coinGeckoResponse,
        timestamp: Date.now(),
      };

      return coinGeckoResponse;
    } catch (e) {
      // if coin gecko is down for any reason still allow the swapper to work
      if (this._fiatPriceCache) {
        return this._fiatPriceCache.cachedResponse;
      }

      return {};
    }
  }
}
