import type { ChainConfig } from '@dex-toolkit/types'
import type { ChainId } from '@ethereum-multicall/types'

import { erc1155ABI, erc20ABI, erc721ABI, erc777ABI } from '../../abis/index'
import { ETHCoin } from '../../tokens/configs/eth.token'
import { WETHToken } from '../../tokens/configs/weth.token'
import { getImageUrlForToken } from '../../tokens/logo-urls/logo-urls'
import { dexTypeMap } from '../../utils/dex.utils'
import { getAllTokensForChainId } from '../../utils/token.utils'
import { celoMainChainId, celoAlfajoresChainId } from '../chainIds'

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
  symbol: 'CELO',
  transactionTypes: ['legacy', 'eip2930', 'eip1559'],
  logoUrl: getImageUrlForToken({
    tokenContractChainId: celoMainChainId,
  }),
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
}

export class CeloNetwork {
  public static MAINNET = (): ChainConfig => {
    return {
      ...commonProps,
      chainId: celoMainChainId,
      name: 'Celo',
      displayName: 'Celo',
      chainName: 'mainnet',
      nativeCurrency: ETHCoin.CELO.MAINNET(),
      nativeWrappedTokenInfo: WETHToken.CELO.MAINNET(),
      supportedDexs: [dexTypeMap.UNISWAP, dexTypeMap.SUSHISWAP],
      multicallContractAddress: '0xcA11bde05977b3631167028862bE2a173976CA11',
      tokens: getAllTokensForChainId(celoMainChainId),
      blockExplorerUrls: [
        { name: 'Celoscan', url: 'https://celoscan.io/' },
        { name: 'Celo Explorer', url: 'https://explorer.celo.org/' },
      ],
      nodes: {
        authenticated: {
          infura: {
            name: 'Infura',
            url: `https://celo-mainnet.infura.io/v3/`,
            chunkLimit: 3_500,
            callDataLimit: 100_000,
            isWSS: false,
            requiresAuth: true,
          },
        },
        public: [
          {
            name: 'Celo',
            url: 'https://forno.celo.org',
            chunkLimit: 3_500,
            callDataLimit: 100_000,
            isWSS: false,
          },
          {
            name: 'Celo WSS',
            url: 'wss://forno.celo.org/ws',
            chunkLimit: 3_500,
            callDataLimit: 100_000,
            isWSS: true,
          },
        ],
      },
      gasUrls: [],
    }
  }

  public static ALFAJORES = (): ChainConfig => {
    return {
      ...commonProps,
      chainId: celoAlfajoresChainId,
      name: 'Celo Alfajores',
      displayName: 'Celo Alfajores',
      chainName: 'alfajores',
      nativeCurrency: ETHCoin.CELO.ALFAJORES(),
      nativeWrappedTokenInfo: WETHToken.CELO.ALFAJORES(),
      supportedDexs: [dexTypeMap.UNISWAP, dexTypeMap.SUSHISWAP],
      multicallContractAddress: '0xcA11bde05977b3631167028862bE2a173976CA11',
      tokens: getAllTokensForChainId(celoAlfajoresChainId),
      blockExplorerUrls: [
        {
          name: 'Celoscan',
          url: 'https://alfajores.celoscan.io/',
        },
        {
          name: 'Celo Alfajores Explorer',
          url: 'https://alfajores-blockscout.celo-testnet.org/',
        },
      ],
      nodes: {
        authenticated: {
          infura: {
            name: 'Infura',
            url: `https://celo-alfajores.infura.io/v3/`,
            chunkLimit: 3_500,
            callDataLimit: 100_000,
            isWSS: false,
            requiresAuth: true,
          },
        },
        public: [
          {
            name: 'Celo',
            url: 'https://alfajores-forno.celo-testnet.org',
            chunkLimit: 3_500,
            callDataLimit: 100_000,
            isWSS: false,
          },
          {
            name: 'Celo WSS',
            url: 'wss://alfajores-forno.celo-testnet.org/ws',
            chunkLimit: 3_500,
            callDataLimit: 100_000,
            isWSS: true,
          },
        ],
      },
      gasUrls: [],
    }
  }

  public static getChainConfig(chainId: ChainId): ChainConfig | undefined {
    switch (chainId) {
      case celoMainChainId:
        return CeloNetwork.MAINNET()
      case celoAlfajoresChainId:
        return CeloNetwork.ALFAJORES()
      default:
        return undefined
    }
  }
}
