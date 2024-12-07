import type { ChainConfig } from '@dex-toolkit/types'
import type { ChainId } from '@ethereum-multicall/types'

import { erc1155ABI, erc20ABI, erc721ABI, erc777ABI } from '../../abis/index'
import { ETHCoin, WETHToken } from '../../tokens/configs/index'
import { getImageUrlForToken } from '../../tokens/logo-urls/logo-urls'
import { dexTypeMap } from '../../utils/dex.utils'
import { getAllTokensForChainId } from '../../utils/token.utils'
import { arbitrumMainChainId, arbitrumSepoliaChainId } from '../chainIds'

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
  chainType: 'rollup',
  symbol: 'AGOR',
  transactionTypes: ['legacy', 'eip2930', 'eip1559'],
  logoUrl: getImageUrlForToken({ tokenContractChainId: arbitrumMainChainId }),
  color: 'rgb(40, 161, 241)',
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

export class ArbitrumNetwork {
  public static MAINNET = (): ChainConfig => {
    return {
      chainId: arbitrumMainChainId,
      name: 'arbitrum',
      displayName: 'Arbitrum One',
      chainName: 'mainnet',
      nativeCurrency: ETHCoin.ARBITRUM.MAINNET(),
      nativeWrappedTokenInfo: WETHToken.ARBITRUM.MAINNET(),
      supportedDexs: [dexTypeMap.UNISWAP, dexTypeMap.SUSHISWAP],
      multicallContractAddress: '0xcA11bde05977b3631167028862bE2a173976CA11',
      tokens: getAllTokensForChainId(arbitrumMainChainId),
      blockExplorerUrls: [
        { name: 'Abiscan', url: 'https://arbiscan.io/' },
        { name: 'Arbitrum Explorer', url: 'https://explorer.arbitrum.io/' },
      ],
      nodes: {
        authenticated: {
          infura: {
            name: 'Infura',
            url: `https://arbitrum-mainnet.infura.io/v3/`,
            isWSS: false,
            chunkLimit: 3_500,
            callDataLimit: 100_000,
            requiresAuth: true,
          },
          infuraWSS: {
            name: 'Infura WSS',
            url: `wss://arbitrum-mainnet.infura.io/ws/v3/`,
            isWSS: true,
            chunkLimit: 3_500,
            callDataLimit: 100_000,
            requiresAuth: true,
          },
          alchemy: {
            name: 'Alchemy',
            url: `https://arb-mainnet.g.alchemy.com/v2/`,
            isWSS: false,
            chunkLimit: 3_500,
            callDataLimit: 100_000,
            requiresAuth: true,
          },
          alchemyWSS: {
            name: 'Alchemy WSS',
            url: `wss://arb-mainnet.g.alchemy.com/v2/`,
            isWSS: true,
            chunkLimit: 3_500,
            callDataLimit: 100_000,
            requiresAuth: true,
          },
        },
        public: [
          {
            name: 'Arbitrum',
            url: 'https://arb1.arbitrum.io/rpc',
            isWSS: false,
            chunkLimit: 3_500,
            callDataLimit: 100_000,
          },
        ],
      },
      gasUrls: [],
      ...commonProps,
    }
  }

  public static SEPOLIA = (): ChainConfig => {
    return {
      chainId: arbitrumSepoliaChainId,
      name: 'arbitrum sepolia',
      displayName: 'Arbitrum Sepolia',
      chainName: 'sepolia',
      nativeCurrency: ETHCoin.ARBITRUM.SEPOLIA(),
      nativeWrappedTokenInfo: WETHToken.ARBITRUM.SEPOLIA(),
      supportedDexs: [],
      multicallContractAddress: '0xcA11bde05977b3631167028862bE2a173976CA11',
      tokens: getAllTokensForChainId(arbitrumSepoliaChainId),
      nodes: {
        authenticated: {
          infura: {
            name: 'Infura',
            url: `https://arbitrum-sepolia.infura.io/v3/`,
            isWSS: false,
            chunkLimit: 3_500,
            callDataLimit: 100_000,
            requiresAuth: true,
          },
          infuraWSS: {
            name: 'Infura WSS',
            url: `wss://arbitrum-sepolia.infura.io/ws/v3/`,
            isWSS: true,
            chunkLimit: 3_500,
            callDataLimit: 100_000,
            requiresAuth: true,
          },
          alchemy: {
            name: 'Alchemy',
            url: `https://arb-sepolia.g.alchemy.com/v2/`,
            isWSS: false,
            chunkLimit: 3_500,
            callDataLimit: 100_000,
            requiresAuth: true,
          },
          alchemyWSS: {
            name: 'Alchemy WSS',
            url: `wss://arb-sepolia.g.alchemy.com/v2/`,
            isWSS: true,
            chunkLimit: 3_500,
            callDataLimit: 100_000,
            requiresAuth: true,
          },
        },
        public: [
          {
            name: 'Arbitrum',
            url: 'https://sepolia-rollup.arbitrum.io/rpc',
            isWSS: false,
            chunkLimit: 3_500,
            callDataLimit: 100_000,
          },
        ],
      },
      gasUrls: [],
      blockExplorerUrls: [
        {
          name: 'Arbitrum Sepolia Explorer',
          url: 'https://sepolia-explorer.arbitrum.io/',
        },
      ],
      faucets: [
        {
          name: 'QuickNode',
          url: 'https://faucet.quicknode.com/arbitrum/sepolia',
        },
      ],
      ...commonProps,
    }
  }

  public static getChainConfig(chainId: ChainId): ChainConfig | undefined {
    switch (chainId) {
      case arbitrumMainChainId:
        return ArbitrumNetwork.MAINNET()
      case arbitrumSepoliaChainId:
        return ArbitrumNetwork.SEPOLIA()
      default:
        return undefined
    }
  }
}
