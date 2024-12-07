import type { ChainConfig } from '@dex-toolkit/types'
import type { ChainId } from '@multicall-toolkit/types'

import { erc1155ABI, erc20ABI, erc721ABI, erc777ABI } from '../../abis/index'
import { NRGToken } from '../../tokens/configs/nrg.token'
import { WNRGToken } from '../../tokens/configs/wnrg.token'
import { getImageUrlForToken } from '../../tokens/logo-urls/logo-urls'
import { dexTypeMap } from '../../utils/dex.utils'
import { getAllTokensForChainId } from '../../utils/token.utils'
import { energiMainChainId, energiTestChainId } from '../chainIds'

const commonProps: Omit<
  ChainConfig,
  | 'name'
  | 'displayName'
  | 'chainId'
  | 'chainName'
  | 'nodes'
  | 'nativeCurrency'
  | 'nativeWrappedTokenInfo'
  | 'gasUrls'
  | 'supportedDexs'
  | 'multicallContractAddress'
  | 'tokens'
  | 'blockExplorerUrls'
> = {
  chainType: 'layer1',
  symbol: 'NRG',
  transactionTypes: ['legacy', 'eip2930', 'eip1559'],
  logoUrl: getImageUrlForToken({ tokenContractChainId: energiMainChainId }),
  color: 'rgb(0, 231, 119)',
  standards: {
    token20: {
      standard: 'ERC20',
      abi: erc20ABI,
    },
    token721: {
      standard: 'ERC721',
      abi: erc721ABI,
    },
    token777: {
      standard: 'ERC777',
      abi: erc777ABI,
    },
    token1155: {
      standard: 'ERC1155',
      abi: erc1155ABI,
    },
  },
}

export class EnergiNetwork {
  public static MAINNET = (): ChainConfig => {
    return {
      ...commonProps,
      chainId: energiMainChainId,
      name: 'Energi Mainnet',
      displayName: 'Energi Mainnet',
      chainName: 'mainnet',
      nativeCurrency: NRGToken.ENERGI.MAINNET(),
      nativeWrappedTokenInfo: WNRGToken.ENERGI.MAINNET(),
      supportedDexs: [dexTypeMap.UNISWAP, dexTypeMap.SUSHISWAP],
      multicallContractAddress: '0xbD6706747a7B6C8868Cf48735f48C341ea386d07', // Multicall2
      tokens: getAllTokensForChainId(energiMainChainId),
      blockExplorerUrls: [
        { name: 'Energi Explorer', url: 'https://explorer.energi.network/' },
      ],
      nodes: {
        public: [
          {
            name: 'Energi Node API',
            url: 'https://nodeapi.energi.network',
            chunkLimit: 5_000,
            callDataLimit: 100_000,
          },
        ],
      },
      gasUrls: [],
    }
  }

  public static TESTNET = (): ChainConfig => {
    return {
      ...commonProps,
      chainId: energiTestChainId,
      name: 'Energi Testnet',
      displayName: 'Energi Testnet',
      chainName: 'testnet',
      nativeCurrency: NRGToken.ENERGI.TESTNET(),
      nativeWrappedTokenInfo: WNRGToken.ENERGI.TESTNET(),
      supportedDexs: [dexTypeMap.UNISWAP, dexTypeMap.SUSHISWAP],
      multicallContractAddress: '',
      tokens: getAllTokensForChainId(energiTestChainId),
      blockExplorerUrls: [
        {
          name: 'Energi Testnet Explorer',
          url: 'https://explorer.test.energi.network/',
        },
      ],
      nodes: {
        public: [
          {
            name: 'Energi Test Node API',
            url: 'https://nodeapi.test.energi.network',
            chunkLimit: 5_000,
            callDataLimit: 100_000,
          },
        ],
      },
      gasUrls: [],
      faucets: [
        { name: 'Energi Faucet', url: 'https://faucet.energi.network/' },
      ],
    }
  }

  public static getChainConfig(chainId: ChainId): ChainConfig | undefined {
    switch (chainId) {
      case energiMainChainId:
        return EnergiNetwork.MAINNET()
      case energiTestChainId:
        return EnergiNetwork.TESTNET()
      default:
        return undefined
    }
  }
}
