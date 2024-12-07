import type { ChainConfig } from '@dex-toolkit/types'
import type { ChainId } from '@ethereum-multicall/types'

import { erc1155ABI, erc20ABI, erc721ABI, erc777ABI } from '../../abis/index'
import { AVAXToken } from '../../tokens/configs/avax.token'
import { WAVAXToken } from '../../tokens/configs/wavax.token'
import { getImageUrlForToken } from '../../tokens/logo-urls/logo-urls'
import { dexTypeMap } from '../../utils/dex.utils'
import { getAllTokensForChainId } from '../../utils/token.utils'
import { avaxMainChainId, avaxFujiChainId } from '../chainIds'

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
  symbol: 'AVAX',
  transactionTypes: ['legacy', 'eip2930', 'eip1559'],
  logoUrl: getImageUrlForToken({ tokenContractChainId: avaxMainChainId }),
  color: 'rgb(236, 67, 67)',
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

export class AvalancheNetwork {
  public static MAINNET = (): ChainConfig => {
    return {
      chainId: avaxMainChainId,
      chainName: 'mainnet',
      name: 'Avalanche Network',
      displayName: 'Avalanche Network',
      nativeCurrency: AVAXToken.AVALANCHE.MAINNET(),
      nativeWrappedTokenInfo: WAVAXToken.AVALANCHE.MAINNET(),
      supportedDexs: [
        dexTypeMap.SUSHISWAP,
        dexTypeMap.YETISWAP,
        dexTypeMap.TRADERJOE,
      ],
      multicallContractAddress: '0xcA11bde05977b3631167028862bE2a173976CA11',
      tokens: getAllTokensForChainId(avaxMainChainId),
      blockExplorerUrls: [{ name: 'Snowtrace', url: 'https://snowtrace.io/' }],
      nodes: {
        authenticated: {
          infura: {
            name: 'Infura',
            url: `https://avalanche-mainnet.infura.io/v3/`,
            isWSS: false,
            chunkLimit: 2_048,
            callDataLimit: 100_000,
            requiresAuth: true,
          },
          infuraWSS: {
            name: 'Infura WSS',
            url: `wss://avalanche-mainnet.infura.io/ws/v3/`,
            isWSS: true,
            chunkLimit: 2_048,
            callDataLimit: 100_000,
            requiresAuth: true,
          },
          alchemy: {
            name: 'Alchemy',
            url: `https://avax-mainnet.g.alchemy.com/v2/`,
            isWSS: false,
            chunkLimit: 2_048,
            callDataLimit: 100_000,
            requiresAuth: true,
          },
          alchemyWSS: {
            name: 'Alchemy WSS',
            url: `wss://avax-mainnet.g.alchemy.com/v2/`,
            isWSS: true,
            chunkLimit: 2_048,
            callDataLimit: 100_000,
            requiresAuth: true,
          },
        },
        public: [
          {
            name: 'AVAX',
            url: 'https://api.avax.network/ext/bc/C/rpc',
            isWSS: false,
            chunkLimit: 2_048,
            callDataLimit: 100_000,
          },
        ],
      },
      gasUrls: [],
      ...commonProps,
    }
  }

  public static FUJI = (): ChainConfig => {
    return {
      chainId: avaxFujiChainId,
      chainName: 'fuji',
      name: 'Avalanche Fuji',
      displayName: 'Avalanche Fuji',
      nativeCurrency: AVAXToken.AVALANCHE.FUJI(),
      nativeWrappedTokenInfo: WAVAXToken.AVALANCHE.FUJI(),
      supportedDexs: [dexTypeMap.SUSHISWAP, dexTypeMap.YETISWAP],
      multicallContractAddress: '0xcA11bde05977b3631167028862bE2a173976CA11',
      tokens: getAllTokensForChainId(avaxFujiChainId),
      blockExplorerUrls: [
        { name: 'Snowtrace Testnet', url: 'https://testnet.snowtrace.io/' },
      ],
      nodes: {
        authenticated: {
          infura: {
            name: 'Infura',
            url: `https://avalanche-fuji.infura.io/v3/`,
            isWSS: false,
            chunkLimit: 2_048,
            callDataLimit: 100_000,
            requiresAuth: true,
          },
          infuraWSS: {
            name: 'Infura WSS',
            url: `wss://avalanche-fuji.infura.io/ws/v3/`,
            isWSS: true,
            chunkLimit: 2_048,
            callDataLimit: 100_000,
            requiresAuth: true,
          },
          alchemy: {
            name: 'Alchemy',
            url: `https://avax-fuji.g.alchemy.com/v2/`,
            isWSS: false,
            chunkLimit: 2_048,
            callDataLimit: 100_000,
            requiresAuth: true,
          },
          alchemyWSS: {
            name: 'Alchemy WSS',
            url: `wss://avax-fuji.g.alchemy.com/v2/`,
            isWSS: true,
            chunkLimit: 2_048,
            callDataLimit: 100_000,
            requiresAuth: true,
          },
        },
        public: [
          {
            name: 'Ankr',
            url: 'https://rpc.ankr.com/avalanche_fuji',
            isWSS: false,
            chunkLimit: 2_048,
            callDataLimit: 100_000,
          },
          {
            name: 'AVAX Testnet',
            url: 'https://api.avax-test.network/ext/bc/C/rpc',
            isWSS: false,
            chunkLimit: 2_048,
            callDataLimit: 100_000,
          },
        ],
      },
      gasUrls: [],
      faucets: [
        { name: 'Avax Faucet', url: 'https://faucet.avax.network/' },
        { name: 'ChainLink Faucet', url: 'https://faucets.chain.link/' },
      ],
      ...commonProps,
    }
  }

  public static getChainConfig(chainId: ChainId): ChainConfig | undefined {
    switch (chainId) {
      case avaxMainChainId:
        return AvalancheNetwork.MAINNET()
      case avaxFujiChainId:
        return AvalancheNetwork.FUJI()
      default:
        return undefined
    }
  }
}
