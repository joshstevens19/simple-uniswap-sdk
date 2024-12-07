import type { ChainConfig } from '@dex-toolkit/types'
import type { ChainId } from '@ethereum-multicall/types'

import { erc1155ABI, erc20ABI, erc721ABI, erc777ABI } from '../../abis/index'
import { ETHCoin } from '../../tokens/configs/eth.token'
import { WETHToken } from '../../tokens/configs/weth.token'
import { getImageUrlForToken } from '../../tokens/logo-urls/logo-urls'
import { dexTypeMap } from '../../utils/dex.utils'
import { getAllTokensForChainId } from '../../utils/token.utils'
import { baseMainChainId, baseSepoliaChainId } from '../chainIds'

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
  logoUrl: getImageUrlForToken({ tokenContractChainId: baseMainChainId }),
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

export class BaseNetwork {
  public static MAINNET = (): ChainConfig => {
    return {
      ...commonProps,
      chainId: baseMainChainId,
      name: 'Base Network',
      displayName: 'Base',
      chainName: 'mainnet',
      nativeCurrency: ETHCoin.BASE.MAINNET(),
      nativeWrappedTokenInfo: WETHToken.BASE.MAINNET(),
      multicallContractAddress: '0xcA11bde05977b3631167028862bE2a173976CA11',
      tokens: getAllTokensForChainId(baseMainChainId),
      blockExplorerUrls: [
        { name: 'Basescan', url: 'https://basescan.org/' },
        { name: 'Blockscout', url: 'https://base.blockscout.com/' },
        { name: 'Dex Guru', url: 'https://base.dex.guru/' },
        { name: 'OkLink', url: 'https://www.oklink.com/base' },
        { name: 'L2scan', url: 'https://base.l2scan.co/' },
        { name: 'Superscan', url: 'https://superscan.network/' },
      ],
      nodes: {
        authenticated: {
          infura: {
            name: 'Infura',
            url: `https://base-mainnet.infura.io/v3/`,
            chunkLimit: 50_000,
            callDataLimit: 100_000,
            isWSS: false,
            requiresAuth: true,
          },
          infuraWSS: {
            name: 'Infura WSS',
            url: `wss://base-mainnet.infura.io/ws/v3/`,
            isWSS: true,
            chunkLimit: 50_000,
            callDataLimit: 100_000,
            requiresAuth: true,
          },
          alchemy: {
            name: 'Alchemy',
            url: `https://base-mainnet.g.alchemy.com/v2/`,
            isWSS: false,
            chunkLimit: 2_048,
            callDataLimit: 100_000,
            requiresAuth: true,
          },
          alchemyWSS: {
            name: 'Alchemy WSS',
            url: `wss://base-mainnet.g.alchemy.com/v2/`,
            isWSS: true,
            chunkLimit: 2_048,
            callDataLimit: 100_000,
            requiresAuth: true,
          },
        },
        public: [
          {
            name: 'Public Node',
            url: 'https://base.llamarpc.com',
            chunkLimit: 50_000,
            callDataLimit: 100_000,
            isWSS: false,
          },
          {
            name: 'Tenderly',
            url: 'https://base.gateway.tenderly.co',
            chunkLimit: 50_000,
            callDataLimit: 100_000,
            isWSS: false,
          },
          {
            name: 'BlastAPI',
            url: 'https://base-mainnet.public.blastapi.io',
            chunkLimit: 50_000,
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
      chainId: baseSepoliaChainId,
      name: 'Base Network Sepolia',
      displayName: 'Base Sepolia',
      chainName: 'sepolia',
      nativeCurrency: ETHCoin.BASE.SEPOLIA(),
      nativeWrappedTokenInfo: WETHToken.BASE.SEPOLIA(),
      multicallContractAddress: '0xcA11bde05977b3631167028862bE2a173976CA11',
      tokens: getAllTokensForChainId(baseSepoliaChainId),
      blockExplorerUrls: [
        { name: 'Basescan Sepolia', url: 'https://sepolia.basescan.org/' },
        {
          name: 'Blockscout Sepolia',
          url: 'https://base-sepolia.blockscout.com/',
        },
      ],
      nodes: {
        authenticated: {
          infura: {
            name: 'Infura',
            url: `https://base-sepolia.infura.io/v3/`,
            chunkLimit: 50_000,
            callDataLimit: 100_000,
            isWSS: false,
            requiresAuth: true,
          },
          infuraWSS: {
            name: 'Infura WSS',
            url: `wss://base-sepolia.infura.io/ws/v3/`,
            isWSS: true,
            chunkLimit: 50_000,
            callDataLimit: 100_000,
            requiresAuth: true,
          },
          alchemy: {
            name: 'Alchemy',
            url: `https://base-sepolia.g.alchemy.com/v2/`,
            isWSS: false,
            chunkLimit: 2_048,
            callDataLimit: 100_000,
            requiresAuth: true,
          },
          alchemyWSS: {
            name: 'Alchemy WSS',
            url: `wss://base-sepolia.g.alchemy.com/v2/`,
            isWSS: true,
            chunkLimit: 2_048,
            callDataLimit: 100_000,
            requiresAuth: true,
          },
        },
        public: [
          {
            name: 'PublicNode',
            url: 'https://base-sepolia-rpc.publicnode.com',
            chunkLimit: 50_000,
            callDataLimit: 100_000,
            isWSS: false,
          },
          {
            name: 'BlockPi',
            url: 'https://base-sepolia.blockpi.network/v1/rpc/public',
            chunkLimit: 50_000,
            callDataLimit: 100_000,
            isWSS: false,
          },
          {
            name: 'Base Network',
            url: 'https://sepolia.base.org',
            chunkLimit: 50_000,
            callDataLimit: 100_000,
            isWSS: false,
          },
          {
            name: 'PublicNode WebSocket',
            url: 'wss://base-sepolia-rpc.publicnode.com',
            chunkLimit: 50_000,
            callDataLimit: 100_000,
            isWSS: true,
          },
        ],
      },
      gasUrls: [],
      faucets: [
        {
          name: 'Coinbase Developer Platform',
          url: 'https://portal.cdp.coinbase.com/products/faucet',
        },
        { name: 'Superchain Faucet', url: 'https://app.optimism.io/faucet' },
        { name: 'Alchemy Faucet', url: 'https://basefaucet.com/' },
        { name: 'Bware Labs Faucet', url: 'https://bwarelabs.com/faucets' },
        { name: 'QuickNode Faucet', url: 'https://faucet.quicknode.com/drip' },
        {
          name: 'LearnWeb3 Faucet',
          url: 'https://learnweb3.io/faucets/base_sepolia',
        },
        {
          name: 'Ethereum Ecosystem Faucet',
          url: 'https://www.ethereum-ecosystem.com/faucets/base-sepolia',
        },
      ],
    }
  }

  public static getChainConfig(chainId: ChainId): ChainConfig | undefined {
    switch (chainId) {
      case baseMainChainId:
        return BaseNetwork.MAINNET()
      case baseSepoliaChainId:
        return BaseNetwork.SEPOLIA()
      default:
        return undefined
    }
  }
}
