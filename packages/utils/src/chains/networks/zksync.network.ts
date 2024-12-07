import type { ChainConfig } from '@dex-toolkit/types'
import type { ChainId } from '@ethereum-multicall/types'

import { erc1155ABI, erc20ABI, erc721ABI, erc777ABI } from '../../abis/index'
import { ETHCoin } from '../../tokens/configs/eth.token'
import { WETHToken } from '../../tokens/configs/weth.token'
import { getImageUrlForToken } from '../../tokens/logo-urls/logo-urls'
import { dexTypeMap } from '../../utils/dex.utils'
import { getAllTokensForChainId } from '../../utils/token.utils'
import { zksyncMainChainId, zksyncSepoliaChainId } from '../chainIds'

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
  logoUrl: getImageUrlForToken({ tokenContractChainId: zksyncMainChainId }),
  color: 'rgb(32, 74, 247)',
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

export class ZKSyncNetwork {
  public static MAINNET = (): ChainConfig => {
    return {
      ...commonProps,
      chainId: zksyncMainChainId,
      name: 'ZKsync Era Mainnet',
      displayName: 'ZKsync Era Mainnet',
      chainName: 'mainnet',
      nativeCurrency: ETHCoin.ZKSYNC.MAINNET(),
      nativeWrappedTokenInfo: WETHToken.ZKSYNC.MAINNET(),
      multicallContractAddress: '0xF9cda624FBC7e059355ce98a31693d299FACd963',
      tokens: getAllTokensForChainId(zksyncMainChainId),
      blockExplorerUrls: [
        { name: 'ZKSync Explorer', url: 'https://era.zksync.network/' },
        { name: 'L2Scan', url: 'https://zksync-era.l2scan.co/' },
        { name: 'Blockscout', url: 'https://zksync.blockscout.com/' },
        { name: 'Hyperscan', url: 'https://hyperscan.xyz/' },
        { name: 'OKLink', url: 'https://www.oklink.com/zksync' },
        { name: 'NFTScan', url: 'https://zksync.nftscan.com/' },
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
          alchemy: {
            name: 'Alchemy',
            url: `https://zksync-mainnet.g.alchemy.com/v2/`,
            isWSS: false,
            chunkLimit: 50_000,
            callDataLimit: 100_000,
            requiresAuth: true,
          },
          alchemyWSS: {
            name: 'Alchemy WSS',
            url: `wss://zksync-mainnet.g.alchemy.com/v2/`,
            isWSS: true,
            chunkLimit: 50_000,
            callDataLimit: 100_000,
            requiresAuth: true,
          },
        },
        public: [
          {
            name: 'ZKSync Mainnet RPC',
            url: 'https://mainnet.era.zksync.io',
            chunkLimit: 50_000,
            callDataLimit: 100_000,
            isWSS: false,
          },
          {
            name: 'Blockpi Network',
            url: 'https://zksync-era.blockpi.network/v1/rpc/public',
            chunkLimit: 50_000,
            callDataLimit: 100_000,
            isWSS: false,
          },
          {
            name: 'Meow RPC',
            url: 'https://zksync.meowrpc.com',
            chunkLimit: 50_000,
            callDataLimit: 100_000,
            isWSS: false,
          },
          {
            name: '1RPC',
            url: 'https://1rpc.io/zksync2-era',
            chunkLimit: 50_000,
            callDataLimit: 100_000,
            isWSS: false,
          },
          {
            name: 'ZKSync Mainnet WebSocket',
            url: 'wss://mainnet.era.zksync.io/ws',
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
      chainId: zksyncSepoliaChainId,
      name: 'ZKsync Sepolia Testnet',
      displayName: 'ZKsync Sepolia Testnet',
      chainName: 'sepolia',
      nativeCurrency: ETHCoin.ZKSYNC.SEPOLIA(),
      nativeWrappedTokenInfo: WETHToken.ZKSYNC.SEPOLIA(),
      multicallContractAddress: '0xF9cda624FBC7e059355ce98a31693d299FACd963',
      tokens: getAllTokensForChainId(zksyncSepoliaChainId),
      blockExplorerUrls: [
        {
          name: 'Sepolia ZKSync Explorer',
          url: 'https://sepolia-era.zksync.network/',
        },
        {
          name: 'L2Scan Sepolia',
          url: 'https://zksync-era-sepolia.l2scan.co/',
        },
        {
          name: 'Blockscout Sepolia',
          url: 'https://zksync-sepolia.blockscout.com/',
        },
      ],
      nodes: {
        authenticated: {
          infura: {
            name: 'Infura Sepolia',
            url: `https://base-sepolia.infura.io/v3/`,
            chunkLimit: 50_000,
            callDataLimit: 100_000,
            isWSS: false,
            requiresAuth: true,
          },
          alchemy: {
            name: 'Alchemy',
            url: `https://zksync-sepolia.g.alchemy.com/v2/`,
            isWSS: false,
            chunkLimit: 50_000,
            callDataLimit: 100_000,
            requiresAuth: true,
          },
          alchemyWSS: {
            name: 'Alchemy WSS',
            url: `wss://zksync-sepolia.g.alchemy.com/v2/`,
            isWSS: true,
            chunkLimit: 50_000,
            callDataLimit: 100_000,
            requiresAuth: true,
          },
        },
        public: [
          {
            name: 'ZKSync Sepolia RPC',
            url: 'https://sepolia.era.zksync.dev',
            chunkLimit: 50_000,
            callDataLimit: 100_000,
            isWSS: false,
          },
          {
            name: 'DRPC Sepolia',
            url: 'https://zksync-sepolia.drpc.org',
            chunkLimit: 50_000,
            callDataLimit: 100_000,
            isWSS: false,
          },
          {
            name: 'Blockpi Network Sepolia',
            url: 'https://zksync-era-sepolia.blockpi.network/v1/rpc/public',
            chunkLimit: 50_000,
            callDataLimit: 100_000,
            isWSS: false,
          },
          {
            name: 'ZKSync Sepolia WebSocket',
            url: 'wss://sepolia.era.zksync.dev/ws',
            chunkLimit: 50_000,
            callDataLimit: 100_000,
            isWSS: true,
          },
          {
            name: 'DRPC Sepolia WebSocket',
            url: 'wss://zksync-sepolia.drpc.org',
            chunkLimit: 50_000,
            callDataLimit: 100_000,
            isWSS: true,
          },
        ],
      },
      gasUrls: [],
      faucets: [
        {
          name: 'Chainstack',
          url: 'https://faucet.chainstack.com/zksync-testnet-faucet',
        },
        {
          name: 'thirdweb',
          url: 'https://thirdweb.com/zksync-sepolia-testnet',
        },
        {
          name: 'LearnWeb3',
          url: 'https://learnweb3.io/faucets/zksync_sepolia/',
        },
        { name: 'GetBlock', url: 'https://getblock.io/faucet/zksync-sepolia/' },
        {
          name: 'Alchemy',
          url: 'https://www.alchemy.com/faucets/zksync-sepolia',
        },
      ],
    }
  }

  public static getChainConfig(chainId: ChainId): ChainConfig | undefined {
    switch (chainId) {
      case zksyncMainChainId:
        return ZKSyncNetwork.MAINNET()
      case zksyncSepoliaChainId:
        return ZKSyncNetwork.SEPOLIA()
      default:
        return undefined
    }
  }
}
