import type { ChainConfig } from '@dex-toolkit/types'
import type { ChainId } from '@multicall-toolkit/types'

import { erc1155ABI, erc20ABI, erc721ABI, erc777ABI } from '../../abis/index'
import { ETHCoin } from '../../tokens/configs/eth.token'
import { WETHToken } from '../../tokens/configs/weth.token'
import { getImageUrlForToken } from '../../tokens/logo-urls/logo-urls'
import { dexTypeMap } from '../../utils/dex.utils'
import { getAllTokensForChainId } from '../../utils/token.utils'
import {
  ethHoleskyChainId,
  ethMainChainId,
  ethSepoliaChainId,
} from '../chainIds'

const commonProps: Omit<
  ChainConfig,
  | 'chainId'
  | 'name'
  | 'displayName'
  | 'chainName'
  | 'nodes'
  | 'nativeCurrency'
  | 'nativeWrappedTokenInfo'
  | 'gasUrls'
  | 'multicallContractAddress'
  | 'tokens'
  | 'blockExplorerUrls'
> = {
  chainType: 'layer1',
  symbol: 'ETH',
  transactionTypes: ['legacy', 'eip2930', 'eip1559'],
  logoUrl: getImageUrlForToken({ tokenContractChainId: ethMainChainId }),
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
  supportedDexs: [
    dexTypeMap.UNISWAP,
    dexTypeMap.SUSHISWAP,
    dexTypeMap.PANCAKESWAP,
  ],
}

export class EthereumNetwork {
  public static MAINNET = (): ChainConfig => {
    return {
      ...commonProps,
      chainId: ethMainChainId,
      name: 'homestead',
      displayName: 'Ethereum',
      chainName: 'mainnet',
      nativeCurrency: ETHCoin.ETH.MAINNET(),
      nativeWrappedTokenInfo: WETHToken.ETH.MAINNET(),
      multicallContractAddress: '0xcA11bde05977b3631167028862bE2a173976CA11',
      tokens: getAllTokensForChainId(ethMainChainId),
      blockExplorerUrls: [{ name: 'Etherscan', url: 'https://etherscan.io/' }],
      nodes: {
        authenticated: {
          infura: {
            name: 'Infura',
            url: `https://mainnet.infura.io/v3/`,
            isWSS: false,
            chunkLimit: 50_000,
            callDataLimit: 100_000,
            requiresAuth: true,
          },
          infuraWSS: {
            name: 'Infura WSS',
            url: `wss://mainnet.infura.io/ws/v3/`,
            chunkLimit: 50_000,
            callDataLimit: 100_000,
            isWSS: true,
            requiresAuth: true,
          },
          alchemy: {
            name: 'Alchemy',
            url: `https://eth-mainnet.g.alchemy.com/v2/`,
            isWSS: false,
            chunkLimit: 2_048,
            callDataLimit: 100_000,
            requiresAuth: true,
          },
          alchemyWSS: {
            name: 'Alchemy WSS',
            url: `wss://eth-mainnet.g.alchemy.com/v2/`,
            isWSS: true,
            chunkLimit: 2_048,
            callDataLimit: 100_000,
            requiresAuth: true,
          },
        },
        public: [
          {
            name: 'Payload',
            url: 'https://rpc.payload.de',
            isWSS: false,
            chunkLimit: 50_000,
            callDataLimit: 100_000,
          },
          {
            name: 'LlamaRPC',
            url: 'https://eth.llamarpc.com',
            isWSS: false,
            chunkLimit: 50_000,
            callDataLimit: 100_000,
          },
          {
            name: 'Public Node',
            url: 'https://ethereum.publicnode.com',
            isWSS: false,
            chunkLimit: 50_000,
            callDataLimit: 100_000,
          },
          {
            name: '1RPC',
            url: 'https://1rpc.io/eth',
            isWSS: false,
            chunkLimit: 50_000,
            callDataLimit: 100_000,
          },
          {
            name: 'MEVBlocker',
            url: 'https://rpc.mevblocker.io',
            isWSS: false,
            chunkLimit: 50_000,
            callDataLimit: 100_000,
          },
          {
            name: 'Flashbots',
            url: 'https://rpc.flashbots.net',
            isWSS: false,
            chunkLimit: 50_000,
            callDataLimit: 100_000,
          },
        ],
      },
      gasUrls: [],
    }
  }

  public static HOLESKY = (): ChainConfig => {
    return {
      ...commonProps,
      chainId: ethHoleskyChainId,
      name: 'holesky',
      displayName: 'Ethereum Holesky',
      chainName: 'holesky',
      nativeCurrency: ETHCoin.ETH.HOLESKY(),
      nativeWrappedTokenInfo: WETHToken.ETH.HOLESKY(),
      multicallContractAddress: '0xcA11bde05977b3631167028862bE2a173976CA11',
      tokens: getAllTokensForChainId(ethHoleskyChainId),
      blockExplorerUrls: [
        { name: 'Etherscan Holesky', url: 'https://holesky.etherscan.io/' },
        { name: 'OtterScan', url: 'https://holesky.otterscan.io/' },
      ],
      nodes: {
        authenticated: {
          infura: {
            name: 'Infura',
            url: `https://holesky.infura.io/v3/`,
            isWSS: false,
            chunkLimit: 50_000,
            callDataLimit: 100_000,
            requiresAuth: true,
          },
          infuraWSS: {
            name: 'Infura WSS',
            url: `wss://holesky.infura.io/ws/v3/`,
            chunkLimit: 50_000,
            callDataLimit: 100_000,
            isWSS: true,
            requiresAuth: true,
          },
          alchemy: {
            name: 'Alchemy',
            url: `https://eth-holesky.g.alchemy.com/v2/`,
            isWSS: false,
            chunkLimit: 2_048,
            callDataLimit: 100_000,
            requiresAuth: true,
          },
          alchemyWSS: {
            name: 'Alchemy WSS',
            url: `wss://eth-holesky.g.alchemy.com/v2/`,
            isWSS: true,
            chunkLimit: 2_048,
            callDataLimit: 100_000,
            requiresAuth: true,
          },
        },
        public: [
          {
            name: 'PublicNode (HTTP)',
            url: 'https://ethereum-holesky-rpc.publicnode.com',
            isWSS: false,
            chunkLimit: 50_000,
            callDataLimit: 100_000,
          },
          {
            name: 'Tenderly Gateway',
            url: 'https://holesky.gateway.tenderly.co',
            isWSS: false,
            chunkLimit: 50_000,
            callDataLimit: 100_000,
          },
          {
            name: 'BlockPI',
            url: 'https://ethereum-holesky.blockpi.network/v1/rpc/public',
            isWSS: false,
            chunkLimit: 50_000,
            callDataLimit: 100_000,
          },
          {
            name: 'DRPC (HTTP)',
            url: 'https://holesky.drpc.org',
            isWSS: false,
            chunkLimit: 50_000,
            callDataLimit: 100_000,
          },
          {
            name: '1RPC',
            url: 'https://1rpc.io/holesky',
            isWSS: false,
            chunkLimit: 50_000,
            callDataLimit: 100_000,
          },
          {
            name: 'RockX',
            url: 'https://rpc-holesky.rockx.com',
            isWSS: false,
            chunkLimit: 50_000,
            callDataLimit: 100_000,
          },
          {
            name: 'PublicNode (WebSocket)',
            url: 'wss://ethereum-holesky-rpc.publicnode.com',
            isWSS: true,
            chunkLimit: 50_000,
            callDataLimit: 100_000,
          },
          {
            name: 'DRPC (WebSocket)',
            url: 'wss://holesky.drpc.org',
            isWSS: true,
            chunkLimit: 50_000,
            callDataLimit: 100_000,
          },
        ],
      },
      gasUrls: [],
      faucets: [
        {
          name: 'PublicNode Faucet',
          url: 'https://ethereum-holesky-rpc.publicnode.com',
        },
        {
          name: 'Tenderly Faucet',
          url: 'https://holesky.gateway.tenderly.co',
        },
        {
          name: 'BlockPI Faucet',
          url: 'https://ethereum-holesky.blockpi.network/v1/rpc/public',
        },
        {
          name: 'DRPC Faucet',
          url: 'https://holesky.drpc.org',
        },
        {
          name: 'OmniaTech Faucet',
          url: 'https://endpoints.omniatech.io/v1/eth/holesky/public',
        },
        {
          name: '1RPC Faucet',
          url: 'https://1rpc.io/holesky',
        },
        {
          name: 'RockX Faucet',
          url: 'https://rpc-holesky.rockx.com',
        },
        {
          name: 'PublicNode WebSocket Faucet',
          url: 'wss://ethereum-holesky-rpc.publicnode.com',
        },
        {
          name: 'DRPC WebSocket Faucet',
          url: 'wss://holesky.drpc.org',
        },
      ],
    }
  }

  public static SEPOLIA = (): ChainConfig => {
    return {
      ...commonProps,
      chainId: ethSepoliaChainId,
      name: 'sepolia',
      displayName: 'Ethereum Sepolia',
      chainName: 'sepolia',
      nativeCurrency: ETHCoin.ETH.SEPOLIA(),
      nativeWrappedTokenInfo: WETHToken.ETH.SEPOLIA(),
      multicallContractAddress: '0xcA11bde05977b3631167028862bE2a173976CA11',
      tokens: getAllTokensForChainId(ethSepoliaChainId),
      blockExplorerUrls: [
        { name: 'Etherscan Sepolia', url: 'https://sepolia.etherscan.io/' },
        { name: 'OtterScan', url: 'https://sepolia.otterscan.io/' },
      ],
      nodes: {
        authenticated: {
          infura: {
            name: 'Infura',
            url: `https://sepolia.infura.io/v3/`,
            isWSS: false,
            chunkLimit: 50_000,
            callDataLimit: 100_000,
            requiresAuth: true,
          },
          infuraWSS: {
            name: 'Infura WSS',
            url: `wss://sepolia.infura.io/ws/v3/`,
            chunkLimit: 50_000,
            callDataLimit: 100_000,
            isWSS: true,
            requiresAuth: true,
          },
          alchemy: {
            name: 'Alchemy',
            url: `https://eth-sepolia.g.alchemy.com/v2/`,
            isWSS: false,
            chunkLimit: 2_048,
            callDataLimit: 100_000,
            requiresAuth: true,
          },
          alchemyWSS: {
            name: 'Alchemy WSS',
            url: `wss://eth-sepolia.g.alchemy.com/v2/`,
            isWSS: true,
            chunkLimit: 2_048,
            callDataLimit: 100_000,
            requiresAuth: true,
          },
        },
        public: [
          {
            name: 'Sepolia RPC Org',
            url: 'https://rpc.sepolia.org/',
            isWSS: false,
            chunkLimit: 50_000,
            callDataLimit: 100_000,
          },
          {
            name: 'Sepolia RPC 2',
            url: 'https://rpc2.sepolia.org/',
            isWSS: false,
            chunkLimit: 50_000,
            callDataLimit: 100_000,
          },
          {
            name: 'RockX',
            url: 'https://rpc-sepolia.rockx.com/',
            isWSS: false,
            chunkLimit: 50_000,
            callDataLimit: 100_000,
          },
        ],
      },
      gasUrls: [],
      faucets: [
        { name: 'Alchemy', url: 'https://sepoliafaucet.com/' },
        {
          name: 'ChainLink',
          url: 'https://faucet.chainstack.com/sepolia-faucet',
        },
        {
          name: 'QuickNode',
          url: 'https://faucet.quicknode.com/ethereum/sepolia',
        },
        { name: 'Grabteeth', url: 'https://grabteeth.xyz/' },
        { name: 'PoW Faucet', url: 'https://sepolia-faucet.pk910.de/' },
        { name: 'FaucETH', url: 'https://fauceth.komputing.org/' },
        {
          name: 'Coinbase Faucet',
          url: 'https://coinbase.com/faucets/ethereum-sepolia-faucet',
        },
        { name: 'Infura Faucet', url: 'https://www.infura.io/faucet' },
        {
          name: 'Chainstack Faucet',
          url: 'https://faucet.chainstack.com/sepolia-faucet',
        },
        { name: 'Testnet Faucet', url: 'https://testnet-faucet.com/sepolia/' },
      ],
    }
  }

  public static getChainConfig(chainId: ChainId): ChainConfig | undefined {
    switch (chainId) {
      case ethMainChainId:
        return EthereumNetwork.MAINNET()
      case ethHoleskyChainId:
        return EthereumNetwork.HOLESKY()
      case ethSepoliaChainId:
        return EthereumNetwork.SEPOLIA()
      default:
        return undefined
    }
  }
}
