import type { ChainConfig } from '@dex-toolkit/types'
import type { ChainId } from '@multicall-toolkit/types'

import { erc1155ABI, erc20ABI, erc721ABI, erc777ABI } from '../../abis/index'
import { POLToken } from '../../tokens/configs/pol.token'
import { WPOLToken } from '../../tokens/configs/wpol.token'
import { getImageUrlForToken } from '../../tokens/logo-urls/logo-urls'
import { dexTypeMap } from '../../utils/dex.utils'
import { getAllTokensForChainId } from '../../utils/token.utils'
import { zkEVMCardonaChainId, zkEVMMainChainId } from '../chainIds'

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
  symbol: 'POL',
  transactionTypes: ['legacy', 'eip2930', 'eip1559'],
  logoUrl: getImageUrlForToken({ tokenContractChainId: zkEVMMainChainId }),
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
  supportedDexs: [dexTypeMap.UNISWAP, dexTypeMap.SUSHISWAP],
}

export class zkEVMNetwork {
  public static MAINNET = (): ChainConfig => {
    return {
      ...commonProps,
      chainId: zkEVMMainChainId,
      name: 'Polygon zkEVM',
      displayName: 'Polygon zkEVM',
      chainName: 'zkevm',
      nativeCurrency: POLToken.ZKEVM.MAINNET(),
      nativeWrappedTokenInfo: WPOLToken.ZKEVM.MAINNET(),
      multicallContractAddress: '0xcA11bde05977b3631167028862bE2a173976CA11',
      tokens: getAllTokensForChainId(zkEVMMainChainId),
      blockExplorerUrls: [
        { name: 'Polygonscan', url: 'https://zkevm.polygonscan.com/' },
        { name: 'OKLink', url: 'https://www.oklink.com/polygon-zkevm' },
        { name: 'OKX', url: 'https://www.okx.com/web3/explorer/polygon-zkevm' },
        { name: '3XPL', url: 'https://3xpl.com/polygon-zkevm' },
      ],
      bridgeUrls: [
        {
          name: 'Polygon Bridge',
          url: 'https://portal.polygon.technology/bridge',
        },
      ],
      nodes: {
        authenticated: {
          alchemy: {
            name: 'Alchemy',
            url: `https://polygonzkevm-mainnet.g.alchemy.com/v2/`,
            isWSS: false,
            chunkLimit: 50_000,
            callDataLimit: 100_000,
            requiresAuth: true,
          },
        },
        public: [
          {
            name: 'ZKEVM RPC',
            url: 'https://zkevm-rpc.com',
            chunkLimit: 50_000,
            callDataLimit: 100_000,
            isWSS: false,
          },
          {
            name: 'Ankr',
            url: 'https://rpc.ankr.com/polygon_zkevm',
            chunkLimit: 50_000,
            callDataLimit: 100_000,
            isWSS: false,
          },
          {
            name: 'BlastAPI',
            url: 'https://polygon-zkevm-mainnet.public.blastapi.io',
            chunkLimit: 50_000,
            callDataLimit: 100_000,
            isWSS: false,
          },
          {
            name: 'Blockpi',
            url: 'https://polygon-zkevm.blockpi.network/v1/rpc/public',
            chunkLimit: 50_000,
            callDataLimit: 100_000,
            isWSS: false,
          },
          {
            name: 'Gateway.fm',
            url: 'https://rpc.polygon-zkevm.gateway.fm',
            chunkLimit: 50_000,
            callDataLimit: 100_000,
            isWSS: false,
          },
          {
            name: 'DRPC.org (WSS)',
            url: 'wss://polygon-zkevm.drpc.org',
            chunkLimit: 50_000,
            callDataLimit: 100_000,
            isWSS: true,
          },
          {
            name: 'DRPC.org',
            url: 'https://polygon-zkevm.drpc.org',
            chunkLimit: 50_000,
            callDataLimit: 100_000,
            isWSS: false,
          },
        ],
      },
      gasUrls: [],
      faucets: [
        {
          name: 'Polygon zkEVM Faucet',
          url: 'https://faucet.polygon.technology/',
        },
        {
          name: 'Chainlink zkEVM Faucet',
          url: 'https://faucets.chain.link/polygon-zkevm-cardona',
        },
      ],
    }
  }

  public static CARDONA = (): ChainConfig => {
    return {
      ...commonProps,
      chainId: zkEVMCardonaChainId,
      name: 'Polygon Cardona',
      displayName: 'Polygon Cardona',
      chainName: 'amoy',
      nativeCurrency: POLToken.ZKEVM.CARDONA(),
      nativeWrappedTokenInfo: WPOLToken.ZKEVM.CARDONA(),
      multicallContractAddress: '0xcA11bde05977b3631167028862bE2a173976CA11',
      tokens: getAllTokensForChainId(zkEVMCardonaChainId),
      blockExplorerUrls: [
        { name: 'Polygonscan', url: 'https://cardona-zkevm.polygonscan.com/' },
      ],
      bridgeUrls: [],
      nodes: {
        authenticated: {
          alchemy: {
            name: 'Alchemy',
            url: `https://polygonzkevm-cardona.g.alchemy.com/v2/`,
            isWSS: false,
            chunkLimit: 50_000,
            callDataLimit: 100_000,
            requiresAuth: true,
          },
        },
        public: [
          {
            name: 'zkEVM Cardona RPC',
            url: 'https://rpc.cardona.zkevm-rpc.com',
            chunkLimit: 50_000,
            callDataLimit: 100_000,
            isWSS: false,
          },
          {
            name: 'zkEVM Cardona BlockPi',
            url: 'https://polygon-zkevm-cardona.blockpi.network/v1/rpc/public',
            chunkLimit: 50_000,
            callDataLimit: 100_000,
            isWSS: false,
          },
        ],
      },
      gasUrls: [],
      faucets: [
        {
          name: 'Polygon Faucet',
          url: 'https://faucet.polygon.technology/',
        },
        {
          name: 'Chainlink Faucet',
          url: 'https://faucets.chain.link/polygon-zkevm-cardona',
        },
      ],
    }
  }

  public static getChainConfig(chainId: ChainId): ChainConfig | undefined {
    switch (chainId) {
      case zkEVMMainChainId:
        return zkEVMNetwork.MAINNET()
      case zkEVMMainChainId:
        return zkEVMNetwork.CARDONA()
      default:
        return undefined
    }
  }
}
