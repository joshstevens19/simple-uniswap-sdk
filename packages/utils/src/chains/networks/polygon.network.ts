import type { ChainConfig } from '@dex-toolkit/types'
import type { ChainId } from '@multicall-toolkit/types'

import { erc1155ABI, erc20ABI, erc721ABI, erc777ABI } from '../../abis/index'
import { POLToken } from '../../tokens/configs/pol.token'
import { WPOLToken } from '../../tokens/configs/wpol.token'
import { getImageUrlForToken } from '../../tokens/logo-urls/logo-urls'
import { dexTypeMap } from '../../utils/dex.utils'
import { getAllTokensForChainId } from '../../utils/token.utils'
import { polygonAmoyChainId, polygonMainChainId } from '../chainIds'

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
  symbol: 'POL',
  transactionTypes: ['legacy', 'eip2930', 'eip1559'],
  logoUrl: getImageUrlForToken({ tokenContractChainId: polygonMainChainId }),
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

export class PolygonNetwork {
  public static MAINNET = (): ChainConfig => {
    return {
      ...commonProps,
      chainId: polygonMainChainId,
      name: 'matic',
      displayName: 'Polygon',
      chainName: 'mainnet',
      nativeCurrency: POLToken.POLYGON.MAINNET(),
      nativeWrappedTokenInfo: WPOLToken.POLYGON.MAINNET(),
      multicallContractAddress: '0xcA11bde05977b3631167028862bE2a173976CA11',
      tokens: getAllTokensForChainId(polygonMainChainId),
      blockExplorerUrls: [
        { name: 'PolygonScan', url: 'https://polygonscan.com/' },
      ],
      bridgeUrls: [
        {
          name: 'Polygon Bridge',
          url: 'https://wallet.polygon.technology/bridge',
        },
      ],
      nodes: {
        authenticated: {
          infura: {
            name: 'Infura',
            url: `https://polygon-mainnet.infura.io/v3/`,
            chunkLimit: 50_000,
            callDataLimit: 100_000,
            isWSS: false,
            requiresAuth: true,
          },
          infuraWSS: {
            name: 'Infura WSS',
            url: `wss://polygon-mainnet.infura.io/ws/v3/`,
            chunkLimit: 50_000,
            callDataLimit: 100_000,
            isWSS: true,
            requiresAuth: true,
          },
          alchemy: {
            name: 'Alchemy',
            url: `https://polygon-mainnet.g.alchemy.com/v2/`,
            isWSS: false,
            chunkLimit: 50_000,
            callDataLimit: 100_000,
            requiresAuth: true,
          },
          alchemyWSS: {
            name: 'Alchemy WSS',
            url: `wss://polygon-mainnet.g.alchemy.com/v2/`,
            isWSS: true,
            chunkLimit: 50_000,
            callDataLimit: 100_000,
            requiresAuth: true,
          },
        },
        public: [
          {
            name: 'LlamaRPC',
            url: 'https://polygon.llamarpc.com',
            chunkLimit: 50_000,
            callDataLimit: 100_000,
            isWSS: false,
          },
          {
            name: '4everland',
            url: 'wss://polygon-mainnet.4everland.org/ws/v1/37fa9972c1b1cd5fab542c7bdd4cde2f',
            chunkLimit: 50_000,
            callDataLimit: 100_000,
            isWSS: true,
          },
          {
            name: 'MeowRPC',
            url: 'https://polygon.meowrpc.com',
            chunkLimit: 50_000,
            callDataLimit: 100_000,
            isWSS: false,
          },
          {
            name: 'DRPC.org',
            url: 'wss://polygon.drpc.org',
            chunkLimit: 50_000,
            callDataLimit: 100_000,
            isWSS: true,
          },
          {
            name: 'Zan API',
            url: 'https://api.zan.top/polygon-mainnet',
            chunkLimit: 50_000,
            callDataLimit: 100_000,
            isWSS: false,
          },
          {
            name: 'Publicnode',
            url: 'wss://polygon-bor-rpc.publicnode.com',
            chunkLimit: 50_000,
            callDataLimit: 100_000,
            isWSS: true,
          },
          {
            name: 'Blockpi',
            url: 'https://polygon.blockpi.network/v1/rpc/public',
            chunkLimit: 50_000,
            callDataLimit: 100_000,
            isWSS: false,
          },
          {
            name: 'DRPC.org',
            url: 'https://polygon.drpc.org',
            chunkLimit: 50_000,
            callDataLimit: 100_000,
            isWSS: false,
          },
          {
            name: '1RPC',
            url: 'https://1rpc.io/matic',
            chunkLimit: 50_000,
            callDataLimit: 100_000,
            isWSS: false,
          },
          {
            name: 'Publicnode',
            url: 'https://polygon-bor-rpc.publicnode.com',
            chunkLimit: 50_000,
            callDataLimit: 100_000,
            isWSS: false,
          },
          {
            name: 'Subquery',
            url: 'https://polygon.rpc.subquery.network/public',
            chunkLimit: 50_000,
            callDataLimit: 100_000,
            isWSS: false,
          },
          {
            name: 'Ankr',
            url: 'https://rpc.ankr.com/polygon',
            chunkLimit: 50_000,
            callDataLimit: 100_000,
            isWSS: false,
          },
          {
            name: 'Quicknode',
            url: 'https://rpc-mainnet.matic.quiknode.pro',
            chunkLimit: 50_000,
            callDataLimit: 100_000,
            isWSS: false,
          },
          {
            name: 'Polygon RPC',
            url: 'https://polygon-rpc.com',
            chunkLimit: 50_000,
            callDataLimit: 100_000,
            isWSS: false,
          },
          {
            name: 'Getblock.io',
            url: 'https://go.getblock.io/02667b699f05444ab2c64f9bff28f027',
            chunkLimit: 50_000,
            callDataLimit: 100_000,
            isWSS: false,
          },
          {
            name: 'Lava Build',
            url: 'https://polygon.lava.build',
            chunkLimit: 50_000,
            callDataLimit: 100_000,
            isWSS: false,
          },
          {
            name: 'OnFinality',
            url: 'https://polygon.api.onfinality.io/public',
            chunkLimit: 50_000,
            callDataLimit: 100_000,
            isWSS: false,
          },
          {
            name: 'Tenderly',
            url: 'https://polygon.gateway.tenderly.co',
            chunkLimit: 50_000,
            callDataLimit: 100_000,
            isWSS: false,
          },
          {
            name: 'Tenderly',
            url: 'https://gateway.tenderly.co/public/polygon',
            chunkLimit: 50_000,
            callDataLimit: 100_000,
            isWSS: false,
          },
          {
            name: 'BlastAPI',
            url: 'https://polygon-mainnet.public.blastapi.io',
            chunkLimit: 50_000,
            callDataLimit: 100_000,
            isWSS: false,
          },
        ],
      },
      gasUrls: [],
    }
  }

  public static AMOY = (): ChainConfig => {
    return {
      ...commonProps,
      chainId: polygonAmoyChainId,
      name: 'Polygon Amoy',
      displayName: 'Polygon Amoy',
      chainName: 'amoy',
      nativeCurrency: POLToken.POLYGON.AMOY(),
      nativeWrappedTokenInfo: WPOLToken.POLYGON.AMOY(),
      multicallContractAddress: '0xcA11bde05977b3631167028862bE2a173976CA11',
      tokens: getAllTokensForChainId(polygonAmoyChainId),
      blockExplorerUrls: [
        { name: 'Polygonscan', url: 'https://amoy.polygonscan.com/' },
        { name: 'OKLink', url: 'https://www.oklink.com/amoy' },
        { name: 'OKX', url: 'https://www.okx.com/web3/explorer/amoy' },
      ],
      bridgeUrls: [],
      nodes: {
        authenticated: {
          infura: {
            name: 'Infura',
            url: `https://polygon-amoy.infura.io/v3/`,
            chunkLimit: 50_000,
            callDataLimit: 100_000,
            isWSS: false,
            requiresAuth: true,
          },
          infuraWSS: {
            name: 'Infura WSS',
            url: `wss://polygon-amoy.infura.io/ws/v3/`,
            chunkLimit: 50_000,
            callDataLimit: 100_000,
            isWSS: true,
            requiresAuth: true,
          },
          alchemy: {
            name: 'Alchemy',
            url: `https://polygon-amoy.g.alchemy.com/v2/`,
            isWSS: false,
            chunkLimit: 50_000,
            callDataLimit: 100_000,
            requiresAuth: true,
          },
          alchemyWSS: {
            name: 'Alchemy WSS',
            url: `wss://polygon-amoy.g.alchemy.com/v2/`,
            isWSS: true,
            chunkLimit: 50_000,
            callDataLimit: 100_000,
            requiresAuth: true,
          },
        },
        public: [
          {
            name: 'Polygon Amoy Tenderly Gateway',
            url: 'https://polygon-amoy.gateway.tenderly.co',
            chunkLimit: 50_000,
            callDataLimit: 100_000,
            isWSS: false,
          },
          {
            name: 'Polygon Amoy PublicNode (HTTP)',
            url: 'https://polygon-amoy-bor-rpc.publicnode.com',
            chunkLimit: 50_000,
            callDataLimit: 100_000,
            isWSS: false,
          },
          {
            name: 'Polygon Amoy dRPC',
            url: 'https://polygon-amoy.drpc.org',
            chunkLimit: 50_000,
            callDataLimit: 100_000,
            isWSS: false,
          },
          {
            name: 'Polygon Amoy Technology RPC',
            url: 'https://rpc-amoy.polygon.technology',
            chunkLimit: 50_000,
            callDataLimit: 100_000,
            isWSS: false,
          },
          {
            name: 'Polygon Amoy BlockPi',
            url: 'https://polygon-amoy.blockpi.network/v1/rpc/public',
            chunkLimit: 50_000,
            callDataLimit: 100_000,
            isWSS: false,
          },
          {
            name: 'Polygon Amoy Ankr RPC',
            url: 'https://rpc.ankr.com/polygon_amoy',
            chunkLimit: 50_000,
            callDataLimit: 100_000,
            isWSS: false,
          },
          {
            name: 'Polygon Amoy Zan API',
            url: 'https://api.zan.top/polygon-amoy',
            chunkLimit: 50_000,
            callDataLimit: 100_000,
            isWSS: false,
          },
          {
            name: 'Polygon Amoy PublicNode (WebSocket)',
            url: 'wss://polygon-amoy-bor-rpc.publicnode.com',
            chunkLimit: 50_000,
            callDataLimit: 100_000,
            isWSS: true,
          },
        ],
      },
      gasUrls: [],
      faucets: [
        {
          name: 'Polygon Amoy Faucet',
          url: 'https://faucet.polygon.technology/',
        },
        {
          name: 'Chainlink Amoy Faucet',
          url: 'https://faucets.chain.link/polygon-amoy',
        },
      ],
    }
  }

  public static getChainConfig(chainId: ChainId): ChainConfig | undefined {
    switch (chainId) {
      case polygonMainChainId:
        return PolygonNetwork.MAINNET()
      case polygonAmoyChainId:
        return PolygonNetwork.AMOY()
      default:
        return undefined
    }
  }
}
