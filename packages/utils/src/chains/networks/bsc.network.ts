import type { ChainConfig } from '@dex-toolkit/types'
import type { ChainId } from '@multicall-toolkit/types'

import { bep20ABI, bep777ABI, erc1155ABI, erc721ABI } from '../../abis/index'
import { BNBToken } from '../../tokens/configs/bnb.token'
import { WBNBToken } from '../../tokens/configs/wbnb.token'
import { getImageUrlForToken } from '../../tokens/logo-urls/logo-urls'
import { dexTypeMap } from '../../utils/dex.utils'
import { getAllTokensForChainId } from '../../utils/token.utils'
import { bscMainChainId, bscTestChainId } from '../chainIds'

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
  chainType: 'sidechain',
  symbol: 'BNB',
  transactionTypes: ['legacy', 'eip2930'],
  logoUrl: getImageUrlForToken({ tokenContractChainId: bscMainChainId }),
  color: 'rgb(240, 185, 11)',
  standards: {
    token20: {
      standard: 'BEP20',
      abi: bep20ABI,
    },
    token721: {
      standard: 'BEP721',
      abi: erc721ABI,
    },
    token777: {
      standard: 'BEP777',
      abi: bep777ABI,
    },
    token1155: {
      standard: 'BEP1155',
      abi: erc1155ABI,
    },
  },
  supportedDexs: [dexTypeMap.PANCAKESWAP, dexTypeMap.SUSHISWAP],
}

export class SmartNetwork {
  public static MAINNET = (): ChainConfig => {
    return {
      ...commonProps,
      chainId: bscMainChainId,
      name: 'bnb',
      displayName: 'BSC',
      chainName: 'mainnet',
      nativeCurrency: BNBToken.BSC.MAINNET(),
      nativeWrappedTokenInfo: WBNBToken.BSC.MAINNET(),
      multicallContractAddress: '0xcA11bde05977b3631167028862bE2a173976CA11',
      tokens: getAllTokensForChainId(bscMainChainId),
      blockExplorerUrls: [{ name: 'BscScan', url: 'https://bscscan.com/' }],
      bridgeUrls: [
        {
          name: 'BNB Bridge',
          url: 'https://www.bnbchain.world/en/bridge',
        },
      ],
      nodes: {
        authenticated: {
          infura: {
            name: 'Infura',
            url: `https://bsc-mainnet.infura.io/v3/`,
            chunkLimit: 50_000,
            callDataLimit: 100_000,
            isWSS: false,
            requiresAuth: true,
          },
          infuraWSS: {
            name: 'Infura WSS',
            url: `wss://bsc-mainnet.infura.io/ws/v3/`,
            chunkLimit: 50_000,
            callDataLimit: 100_000,
            isWSS: true,
            requiresAuth: true,
          },
          alchemy: {
            name: 'Alchemy',
            url: `https://bnb-mainnet.g.alchemy.com/v2/`,
            isWSS: false,
            chunkLimit: 2_048,
            callDataLimit: 100_000,
            requiresAuth: true,
          },
          alchemyWSS: {
            name: 'Alchemy WSS',
            url: `wss://bnb-mainnet.g.alchemy.com/v2/`,
            isWSS: true,
            chunkLimit: 2_048,
            callDataLimit: 100_000,
            requiresAuth: true,
          },
        },
        public: [
          {
            name: 'Binance RPC 1',
            url: 'https://bsc-dataseed1.binance.org:443',
            chunkLimit: 5_000,
            callDataLimit: 100_000,
            isWSS: false,
          },
          {
            name: 'Binance RPC 2',
            url: 'https://bsc-dataseed.binance.org/',
            chunkLimit: 5_000,
            callDataLimit: 100_000,
            isWSS: false,
          },
          {
            name: 'Defibit',
            url: 'https://bsc-dataseed1.defibit.io/',
            chunkLimit: 5_000,
            callDataLimit: 100_000,
            isWSS: false,
          },
          {
            name: 'Ninicoin',
            url: 'https://bsc-dataseed1.ninicoin.io/',
            chunkLimit: 5_000,
            callDataLimit: 100_000,
            isWSS: false,
          },
        ],
      },
      gasUrls: [],
    }
  }

  public static TESTNET = (): ChainConfig => {
    return {
      ...commonProps,
      chainId: bscTestChainId,
      name: 'bnbt',
      displayName: 'BSC Testnet',
      chainName: 'testnet',
      nativeCurrency: BNBToken.BSC.TESTNET(),
      nativeWrappedTokenInfo: WBNBToken.BSC.TESTNET(),
      multicallContractAddress: '0xcA11bde05977b3631167028862bE2a173976CA11',
      tokens: getAllTokensForChainId(bscTestChainId),
      blockExplorerUrls: [
        { name: 'BscScan Testnet', url: 'https://testnet.bscscan.com/' },
      ],
      bridgeUrls: [
        {
          name: 'BNB Bridge',
          url: 'https://www.bnbchain.world/en/bridge',
        },
      ],
      nodes: {
        authenticated: {
          infura: {
            name: 'Infura',
            url: `https://bsc-testnet.infura.io/v3/`,
            chunkLimit: 50_000,
            callDataLimit: 100_000,
            isWSS: false,
            requiresAuth: true,
          },
          alchemy: {
            name: 'Alchemy',
            url: `https://bnb-testnet.g.alchemy.com/v2/`,
            isWSS: false,
            chunkLimit: 2_048,
            callDataLimit: 100_000,
            requiresAuth: true,
          },
          alchemyWSS: {
            name: 'Alchemy WSS',
            url: `wss://bnb-testnet.g.alchemy.com/v2/`,
            isWSS: true,
            chunkLimit: 2_048,
            callDataLimit: 100_000,
            requiresAuth: true,
          },
        },
        public: [
          {
            name: 'Binance Testnet RPC 1',
            url: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
            chunkLimit: 5_000,
            callDataLimit: 100_000,
            isWSS: false,
          },
          {
            name: 'Binance Testnet RPC 2',
            url: 'https://data-seed-prebsc-1-s3.binance.org:8545/',
            chunkLimit: 5_000,
            callDataLimit: 100_000,
            isWSS: false,
          },
          {
            name: 'Binance Testnet RPC 3',
            url: 'https://data-seed-prebsc-2-s1.binance.org:8545/',
            chunkLimit: 5_000,
            callDataLimit: 100_000,
            isWSS: false,
          },
          {
            name: 'Defibit Testnet',
            url: 'https://bsc-dataseed1.defibit.io/',
            chunkLimit: 5_000,
            callDataLimit: 100_000,
            isWSS: false,
          },
          {
            name: 'Ninicoin Testnet',
            url: 'https://bsc-dataseed1.ninicoin.io/',
            chunkLimit: 5_000,
            callDataLimit: 100_000,
            isWSS: false,
          },
        ],
      },
      gasUrls: [],
      faucets: [
        { name: 'ChainLink Faucet', url: 'https://faucets.chain.link/' },
        {
          name: 'Binance Faucet',
          url: 'https://testnet.bnbchain.org/faucet-smart',
        },
      ],
    }
  }

  public static getChainConfig(chainId: ChainId): ChainConfig | undefined {
    switch (chainId) {
      case bscMainChainId:
        return SmartNetwork.MAINNET()
      case bscTestChainId:
        return SmartNetwork.TESTNET()
      default:
        return undefined
    }
  }
}
