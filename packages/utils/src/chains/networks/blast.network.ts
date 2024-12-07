import type { ChainConfig } from '@dex-toolkit/types'
import type { ChainId } from '@multicall-toolkit/types'

import { erc1155ABI, erc20ABI, erc721ABI, erc777ABI } from '../../abis/index'
import { ETHCoin } from '../../tokens/configs/eth.token'
import { WETHToken } from '../../tokens/configs/weth.token'
import { getImageUrlForToken } from '../../tokens/logo-urls/logo-urls'
import { dexTypeMap } from '../../utils/dex.utils'
import { getAllTokensForChainId } from '../../utils/token.utils'
import { blastMainChainId, blastSepoliaChainId } from '../chainIds'

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
  logoUrl: getImageUrlForToken({ tokenContractChainId: blastMainChainId }),
  color: 'rgb(252, 252, 7)',
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

export class BlastNetwork {
  public static MAINNET = (): ChainConfig => {
    return {
      ...commonProps,
      chainId: blastMainChainId,
      name: 'Blast',
      displayName: 'Blast',
      chainName: 'mainnet',
      nativeCurrency: ETHCoin.BLAST.MAINNET(),
      nativeWrappedTokenInfo: WETHToken.BLAST.MAINNET(),
      multicallContractAddress: '0xcA11bde05977b3631167028862bE2a173976CA11',
      tokens: getAllTokensForChainId(blastMainChainId),
      blockExplorerUrls: [
        { name: 'Blastscan', url: 'https://blastscan.io/' },
        { name: 'Voyager', url: 'https://voyager.parsec.fi/' },
        { name: 'Dex Guru', url: 'https://blast.dex.guru/' },
        { name: 'Blockscout', url: 'https://blast.blockscout.com/' },
        {
          name: 'Arkham Intelligence',
          url: 'https://platform.arkhamintelligence.com/',
        },
        { name: 'Blast Explorer', url: 'https://blastexplorer.io/' },
        {
          name: 'Mainnet Explorer',
          url: 'https://mainnet.blastblockchain.com/',
        },
        { name: 'Blastplorer', url: 'https://blastplorer.info/' },
      ],
      nodes: {
        authenticated: {
          infura: {
            name: 'Infura',
            url: `https://blast-mainnet.infura.io/v3/`,
            chunkLimit: 50_000,
            callDataLimit: 100_000,
            isWSS: false,
            requiresAuth: true,
          },
          infuraWSS: {
            name: 'Infura WSS',
            url: `wss://blast-mainnet.infura.io/ws/v3/`,
            isWSS: true,
            chunkLimit: 50_000,
            callDataLimit: 100_000,
            requiresAuth: true,
          },
          alchemy: {
            name: 'Alchemy',
            url: `https://blast-mainnet.g.alchemy.com/v2/`,
            isWSS: false,
            chunkLimit: 2_048,
            callDataLimit: 100_000,
            requiresAuth: true,
          },
          alchemyWSS: {
            name: 'Alchemy WSS',
            url: `wss://blast-mainnet.g.alchemy.com/v2/`,
            isWSS: true,
            chunkLimit: 2_048,
            callDataLimit: 100_000,
            requiresAuth: true,
          },
        },
        public: [
          {
            name: 'Public Node',
            url: 'https://rpc.blast.io',
            chunkLimit: 50_000,
            callDataLimit: 100_000,
          },
          {
            name: 'Ankr',
            url: 'https://rpc.ankr.com/blast',
            chunkLimit: 50_000,
            callDataLimit: 100_000,
          },
          {
            name: 'DIN RPC',
            url: 'https://blast.din.dev/rpc',
            chunkLimit: 50_000,
            callDataLimit: 100_000,
          },
          {
            name: 'Blast Public API',
            url: 'https://blastl2-mainnet.public.blastapi.io',
            chunkLimit: 50_000,
            callDataLimit: 100_000,
          },
          {
            name: 'BlockPi Network',
            url: 'https://blast.blockpi.network/v1/rpc/public',
            chunkLimit: 50_000,
            callDataLimit: 100_000,
          },
          {
            name: 'Envelop RPC',
            url: 'https://rpc.envelop.is/blast',
            chunkLimit: 50_000,
            callDataLimit: 100_000,
          },
        ],
      },
      gasUrls: [],
    }
  }

  public static SEPOLIA = (): ChainConfig => {
    return {
      ...commonProps,
      chainId: blastSepoliaChainId,
      name: 'Blast Sepolia',
      displayName: 'Blast Sepolia',
      chainName: 'sepolia',
      nativeCurrency: ETHCoin.BLAST.SEPOLIA(),
      nativeWrappedTokenInfo: WETHToken.BLAST.SEPOLIA(),
      multicallContractAddress: '0xcA11bde05977b3631167028862bE2a173976CA11',
      tokens: getAllTokensForChainId(blastSepoliaChainId),
      blockExplorerUrls: [
        { name: 'Blastscan', url: 'https://sepolia.blastscan.io/' },
        { name: 'Blast Explorer', url: 'https://sepolia.blastexplorer.io' },
        { name: 'Dex Guru', url: 'https://blast-test.dex.guru/' },
      ],
      nodes: {
        authenticated: {
          infura: {
            name: 'Infura',
            url: `https://blast-sepolia.infura.io/v3/`,
            chunkLimit: 3_500,
            callDataLimit: 100_000,
            isWSS: false,
            requiresAuth: true,
          },
          alchemy: {
            name: 'Alchemy',
            url: `https://blast-sepolia.g.alchemy.com/v2/`,
            isWSS: false,
            chunkLimit: 2_048,
            callDataLimit: 100_000,
            requiresAuth: true,
          },
          alchemyWSS: {
            name: 'Alchemy WSS',
            url: `wss://blast-sepolia.g.alchemy.com/v2/`,
            isWSS: true,
            chunkLimit: 2_048,
            callDataLimit: 100_000,
            requiresAuth: true,
          },
        },
        public: [
          {
            name: 'Public Node',
            url: 'https://sepolia.blast.io',
            chunkLimit: 3_500,
            callDataLimit: 100_000,
          },
          {
            name: 'Ankr Testnet',
            url: 'https://rpc.ankr.com/blast_testnet_sepolia',
            chunkLimit: 3_500,
            callDataLimit: 100_000,
          },
          {
            name: 'DIN RPC Testnet',
            url: 'https://testnet.blast.din.dev/rpc',
            chunkLimit: 3_500,
            callDataLimit: 100_000,
          },
          {
            name: 'BlockPi Network Testnet',
            url: 'https://blast-sepolia.blockpi.network/v1/rpc/public',
            chunkLimit: 3_500,
            callDataLimit: 100_000,
          },
        ],
      },
      gasUrls: [],
      faucets: [
        {
          name: 'QuickNode Faucet',
          url: 'https://faucet.quicknode.com/blast/sepolia',
        },
      ],
    }
  }

  public static getChainConfig(chainId: ChainId): ChainConfig | undefined {
    switch (chainId) {
      case blastMainChainId:
        return BlastNetwork.MAINNET()
      case blastSepoliaChainId:
        return BlastNetwork.SEPOLIA()
      default:
        return undefined
    }
  }
}
