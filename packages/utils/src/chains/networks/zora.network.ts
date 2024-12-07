import type { ChainConfig } from '@dex-toolkit/types'
import type { ChainId } from '@multicall-toolkit/types'

import { erc1155ABI, erc20ABI, erc721ABI, erc777ABI } from '../../abis/index'
import { ETHCoin } from '../../tokens/configs/eth.token'
import { WETHToken } from '../../tokens/configs/weth.token'
import { getImageUrlForToken } from '../../tokens/logo-urls/logo-urls'
import { dexTypeMap } from '../../utils/dex.utils'
import { getAllTokensForChainId } from '../../utils/token.utils'
import { zoraMainChainId, zoraSepoliaChainId } from '../chainIds'

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
  | 'multicallContractAddress'
  | 'tokens'
  | 'blockExplorerUrls'
> = {
  chainType: 'rollup',
  symbol: 'ETH',
  transactionTypes: ['legacy', 'eip2930', 'eip1559'],
  logoUrl: getImageUrlForToken({ tokenContractChainId: zoraMainChainId }),
  color: 'rgb(124, 124, 131)',
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
  supportedDexs: [dexTypeMap.UNISWAP],
}

export class ZoraNetwork {
  public static MAINNET = (): ChainConfig => {
    return {
      ...commonProps,
      chainId: zoraMainChainId,
      name: 'Zora Network',
      displayName: 'Zora',
      chainName: 'mainnet',
      nativeCurrency: ETHCoin.ZORA.MAINNET(),
      nativeWrappedTokenInfo: WETHToken.ZORA.MAINNET(),
      multicallContractAddress: '0xcA11bde05977b3631167028862bE2a173976CA11',
      tokens: getAllTokensForChainId(zoraMainChainId),
      blockExplorerUrls: [
        { name: 'Zora Explorer', url: 'https://explorer.zora.energy/' },
        { name: 'SuperScan', url: 'https://zora.superscan.network/' },
      ],
      nodes: {
        authenticated: {
          alchemy: {
            name: 'Alchemy',
            url: `https://zora-mainnet.g.alchemy.com/v2/`,
            isWSS: false,
            chunkLimit: 50_000,
            callDataLimit: 100_000,
            requiresAuth: true,
          },
        },
        public: [
          {
            name: 'Zora RPC',
            url: 'https://rpc.zora.energy',
            chunkLimit: 50_000,
            callDataLimit: 100_000,
            isWSS: false,
          },
          {
            name: 'DRPC',
            url: 'https://zora.drpc.org',
            chunkLimit: 50_000,
            callDataLimit: 100_000,
            isWSS: false,
          },
          {
            name: 'Zora WebSocket',
            url: 'wss://rpc.zora.energy',
            chunkLimit: 50_000,
            callDataLimit: 100_000,
            isWSS: true,
          },
          {
            name: 'DRPC WebSocket',
            url: 'wss://zora.drpc.org',
            chunkLimit: 50_000,
            callDataLimit: 100_000,
            isWSS: true,
          },
        ],
      },
      gasUrls: [],
    }
  }

  public static SEPOLIA = (): ChainConfig => {
    return {
      ...commonProps,
      chainId: zoraSepoliaChainId,
      name: 'Zora Network Sepolia',
      displayName: 'Zora Sepolia',
      chainName: 'sepolia',
      nativeCurrency: ETHCoin.ZORA.SEPOLIA(),
      nativeWrappedTokenInfo: WETHToken.ZORA.SEPOLIA(),
      multicallContractAddress: '0xcA11bde05977b3631167028862bE2a173976CA11',
      tokens: getAllTokensForChainId(zoraSepoliaChainId),
      blockExplorerUrls: [
        {
          name: 'Sepolia Zora Explorer',
          url: 'https://sepolia.explorer.zora.energy/',
        },
      ],
      nodes: {
        authenticated: {
          alchemy: {
            name: 'Alchemy',
            url: `https://zora-sepolia.g.alchemy.com/v2/`,
            isWSS: false,
            chunkLimit: 50_000,
            callDataLimit: 100_000,
            requiresAuth: true,
          },
        },
        public: [
          {
            name: 'Zora Sepolia RPC',
            url: 'https://sepolia.rpc.zora.energy',
            chunkLimit: 50_000,
            callDataLimit: 100_000,
            isWSS: false,
          },
          {
            name: 'Thirdweb RPC',
            url: 'https://999999999.rpc.thirdweb.com/',
            chunkLimit: 50_000,
            callDataLimit: 100_000,
            isWSS: false,
          },
          {
            name: 'Zora Sepolia WebSocket',
            url: 'wss://sepolia.rpc.zora.energy',
            chunkLimit: 50_000,
            callDataLimit: 100_000,
            isWSS: true,
          },
        ],
      },
      gasUrls: [],
      faucets: [
        {
          name: 'LearnWeb3',
          url: 'https://learnweb3.io/faucets/zora_sepolia/',
        },
        { name: 'thirdweb', url: 'https://thirdweb.com/zora-sepolia-testnet' },
      ],
    }
  }

  public static getChainConfig(chainId: ChainId): ChainConfig | undefined {
    switch (chainId) {
      case zoraMainChainId:
        return ZoraNetwork.MAINNET()
      case zoraSepoliaChainId:
        return ZoraNetwork.SEPOLIA()
      default:
        return undefined
    }
  }
}
