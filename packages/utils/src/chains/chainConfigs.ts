import type { ChainConfig } from '@dex-toolkit/types'
import type { ChainId } from '@multicall-toolkit/types'

import {
  arbitrumMainChainId,
  arbitrumSepoliaChainId,
  avaxMainChainId,
  avaxFujiChainId,
  baseMainChainId,
  baseSepoliaChainId,
  blastMainChainId,
  blastSepoliaChainId,
  bscMainChainId,
  bscTestChainId,
  celoMainChainId,
  celoAlfajoresChainId,
  energiMainChainId,
  energiTestChainId,
  ethMainChainId,
  ethHoleskyChainId,
  ethSepoliaChainId,
  optimismMainChainId,
  optimismSepoliaChainId,
  plsMainChainId,
  plsTestChainId,
  polygonMainChainId,
  polygonAmoyChainId,
  zkEVMMainChainId,
  zkEVMCardonaChainId,
  zksyncMainChainId,
  zksyncSepoliaChainId,
  zoraMainChainId,
  zoraSepoliaChainId,
} from './chainIds'
import {
  ArbitrumNetwork,
  AvalancheNetwork,
  CeloNetwork,
  EnergiNetwork,
  EthereumNetwork,
  OptimismNetwork,
  PolygonNetwork,
  PulseNetwork,
  SmartNetwork,
  zkEVMNetwork,
} from './networks'
import { BaseNetwork } from './networks/base.network'
import { BlastNetwork } from './networks/blast.network'
import { ZKSyncNetwork } from './networks/zksync.network'
import { ZoraNetwork } from './networks/zora.network'
import { erc1155ABI, erc20ABI, erc721ABI, erc777ABI } from '../abis'

/**
 * Default configuration for a blockchain network.
 */
export const defaultChainConfig: ChainConfig = {
  chainType: 'layer1',
  chainId: 0,
  chainName: '',
  displayName: '',
  name: '',
  symbol: '',
  transactionTypes: ['legacy'],
  logoUrl: '',
  color: '',
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
  nativeCurrency: {
    name: '',
    symbol: '',
    decimals: 18,
    contractAddress: '',
    standard: 'ERC20',
    chainId: 0,
  },
  nativeWrappedTokenInfo: {
    name: '',
    symbol: '',
    decimals: 18,
    contractAddress: '',
    standard: 'ERC20',
    chainId: 0,
  },
  supportedDexs: [],
  multicallContractAddress: '',
  tokens: [],
  bridgeUrls: [],
  nodes: {
    public: [],
  },
  gasUrls: [],
  blockExplorerUrls: [],
  faucets: [],
}

/**
 * Retrieves the configuration for a given blockchain network identified by its chain ID.
 *
 * @param chainId - The ID of the blockchain network to get the configuration for.
 *
 * @returns {ChainConfig} The configuration object for the specified chain ID
 */
export function getChainConfig(chainId: ChainId): ChainConfig {
  const chain = +chainId

  switch (chain) {
    // ARBITRUM
    case arbitrumMainChainId:
      return ArbitrumNetwork.MAINNET()
    case arbitrumSepoliaChainId:
      return ArbitrumNetwork.SEPOLIA()

    // AVAX
    case avaxMainChainId:
      return AvalancheNetwork.MAINNET()
    case avaxFujiChainId:
      return AvalancheNetwork.FUJI()

    // BASE
    case baseMainChainId:
      return BaseNetwork.MAINNET()
    case baseSepoliaChainId:
      return BaseNetwork.SEPOLIA()

    // BLAST
    case blastMainChainId:
      return BlastNetwork.MAINNET()
    case blastSepoliaChainId:
      return BlastNetwork.SEPOLIA()

    // BSC
    case bscMainChainId:
      return SmartNetwork.MAINNET()
    case bscTestChainId:
      return SmartNetwork.TESTNET()

    // CELO
    case celoMainChainId:
      return CeloNetwork.MAINNET()
    case celoAlfajoresChainId:
      return CeloNetwork.ALFAJORES()

    // ENERGI
    case energiMainChainId:
      return EnergiNetwork.MAINNET()
    case energiTestChainId:
      return EnergiNetwork.TESTNET()

    // ETHEREUM
    case ethMainChainId:
      return EthereumNetwork.MAINNET()
    case ethHoleskyChainId:
      return EthereumNetwork.HOLESKY()
    case ethSepoliaChainId:
      return EthereumNetwork.SEPOLIA()

    // OPTIMISM
    case optimismMainChainId:
      return OptimismNetwork.MAINNET()
    case optimismSepoliaChainId:
      return OptimismNetwork.SEPOLIA()

    // PULSE
    case plsMainChainId:
      return PulseNetwork.MAINNET()
    case plsTestChainId:
      return PulseNetwork.TESTNET()

    // POLYGON
    case polygonMainChainId:
      return PolygonNetwork.MAINNET()
    case polygonAmoyChainId:
      return PolygonNetwork.AMOY()

    // ZKEVM
    case zkEVMMainChainId:
      return zkEVMNetwork.MAINNET()
    case zkEVMCardonaChainId:
      return zkEVMNetwork.CARDONA()

    // ZKSYNC
    case zksyncMainChainId:
      return ZKSyncNetwork.MAINNET()
    case zksyncSepoliaChainId:
      return ZKSyncNetwork.SEPOLIA()

    // ZORA
    case zoraMainChainId:
      return ZoraNetwork.MAINNET()
    case zoraSepoliaChainId:
      return ZoraNetwork.SEPOLIA()

    default: {
      throw new Error(`Chain ID ${chain} is not supported`)
    }
  }
}
