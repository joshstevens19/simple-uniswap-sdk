import type { ChainConfig } from '@dex-toolkit/types'
import type { ChainId } from '@ethereum-multicall/types'

import { erc1155ABI, erc20ABI, erc721ABI, erc777ABI } from '../../abis/index'
import { ETHCoin } from '../../tokens/configs/eth.token'
import { WETHToken } from '../../tokens/configs/weth.token'
import { getImageUrlForToken } from '../../tokens/logo-urls/logo-urls'
import { dexTypeMap } from '../../utils/dex.utils'
import { getAllTokensForChainId } from '../../utils/token.utils'
import { optimismMainChainId, optimismSepoliaChainId } from '../chainIds'

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
  symbol: 'OP',
  transactionTypes: ['legacy', 'eip2930', 'eip1559'],
  logoUrl: getImageUrlForToken({ tokenContractChainId: optimismMainChainId }),
  color: 'rgb(255, 4, 32)',
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

export class OptimismNetwork {
  public static MAINNET = (): ChainConfig => {
    return {
      ...commonProps,
      chainId: optimismMainChainId,
      name: 'optimism',
      displayName: 'Optimism',
      chainName: 'mainnet',
      nativeCurrency: ETHCoin.OPTIMISM.MAINNET(),
      nativeWrappedTokenInfo: WETHToken.OPTIMISM.MAINNET(),
      supportedDexs: [dexTypeMap.UNISWAP],
      multicallContractAddress: '0xcA11bde05977b3631167028862bE2a173976CA11',
      tokens: getAllTokensForChainId(optimismMainChainId),
      blockExplorerUrls: [
        { name: 'Optimism Etherscan', url: 'https://optimistic.etherscan.io/' },
      ],
      nodes: {
        authenticated: {
          infura: {
            name: 'Infura',
            url: `https://optimism-mainnet.infura.io/v3/`,
            chunkLimit: 3_500,
            callDataLimit: 100_000,
            isWSS: false,
            requiresAuth: true,
          },
          infuraWSS: {
            name: 'Infura WSS',
            url: `wss://optimism-mainnet.infura.io/ws/v3/`,
            chunkLimit: 3_500,
            callDataLimit: 100_000,
            isWSS: true,
            requiresAuth: true,
          },
          alchemy: {
            name: 'Alchemy',
            url: `https://opt-mainnet.g.alchemy.com/v2/`,
            isWSS: false,
            chunkLimit: 3_500,
            callDataLimit: 100_000,
            requiresAuth: true,
          },
          alchemyWSS: {
            name: 'Alchemy WSS',
            url: `wss://opt-mainnet.g.alchemy.com/v2/`,
            isWSS: true,
            chunkLimit: 3_500,
            callDataLimit: 100_000,
            requiresAuth: true,
          },
        },
        public: [
          {
            name: 'Optimism',
            url: 'https://mainnet.optimism.io',
            chunkLimit: 3_500,
            callDataLimit: 100_000,
            isWSS: false,
          },
        ],
      },
      gasUrls: [],
    }
  }

  public static SEPOLIA = (): ChainConfig => {
    return {
      ...commonProps,
      chainId: optimismSepoliaChainId,
      name: 'optimism sepolia',
      displayName: 'Optimism Sepolia',
      chainName: 'sepolia',
      nativeCurrency: ETHCoin.OPTIMISM.SEPOLIA(),
      nativeWrappedTokenInfo: WETHToken.OPTIMISM.SEPOLIA(),
      supportedDexs: [dexTypeMap.UNISWAP],
      multicallContractAddress: '0xcA11bde05977b3631167028862bE2a173976CA11',
      tokens: getAllTokensForChainId(optimismSepoliaChainId),
      blockExplorerUrls: [
        {
          name: 'Sepolia Optimism Etherscan',
          url: 'https://sepolia-optimistic.etherscan.io/',
        },
      ],
      nodes: {
        authenticated: {
          infura: {
            name: 'Infura',
            url: `https://optimism-sepolia.infura.io/v3/`,
            chunkLimit: 3_500,
            callDataLimit: 100_000,
            isWSS: false,
            requiresAuth: true,
          },
          infuraWSS: {
            name: 'Infura WSS',
            url: `wss://optimism-sepolia.infura.io/ws/v3/`,
            chunkLimit: 3_500,
            callDataLimit: 100_000,
            isWSS: true,
            requiresAuth: true,
          },
          alchemy: {
            name: 'Alchemy',
            url: `https://opt-sepolia.g.alchemy.com/v2/`,
            isWSS: false,
            chunkLimit: 3_500,
            callDataLimit: 100_000,
            requiresAuth: true,
          },
          alchemyWSS: {
            name: 'Alchemy WSS',
            url: `wss://opt-sepolia.g.alchemy.com/v2/`,
            isWSS: true,
            chunkLimit: 3_500,
            callDataLimit: 100_000,
            requiresAuth: true,
          },
        },
        public: [
          {
            name: 'Optimism Sepolia',
            url: 'https://sepolia.optimism.io',
            chunkLimit: 3_500,
            callDataLimit: 100_000,
            isWSS: false,
          },
          {
            name: 'BlockPi',
            url: 'https://optimism-sepolia.blockpi.network/v1/rpc/public',
            chunkLimit: 3_500,
            callDataLimit: 100_000,
            isWSS: false,
          },
          {
            name: 'Tenderly',
            url: 'https://optimism-sepolia.gateway.tenderly.co',
            chunkLimit: 3_500,
            callDataLimit: 100_000,
            isWSS: false,
          },
        ],
      },
      gasUrls: [],
      faucets: [],
    }
  }

  public static getChainConfig(chainId: ChainId): ChainConfig | undefined {
    switch (chainId) {
      case optimismMainChainId:
        return OptimismNetwork.MAINNET()
      case optimismSepoliaChainId:
        return OptimismNetwork.SEPOLIA()
      default:
        return undefined
    }
  }
}
