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
  ethMainChainId,
  ethSepoliaChainId,
  optimismMainChainId,
  optimismSepoliaChainId,
  polygonMainChainId,
  polygonAmoyChainId,
  zkEVMMainChainId,
  zksyncSepoliaChainId,
  plsMainChainId,
  plsTestChainId,
  zksyncMainChainId,
  zoraMainChainId,
  zoraSepoliaChainId,
} from '@chain-toolkit/chains'

/**
 * Arrays of chain IDs for main and test chains.
 */

export const dexMainChains = [
  arbitrumMainChainId,
  avaxMainChainId,
  baseMainChainId,
  blastMainChainId,
  bscMainChainId,
  celoMainChainId,
  energiMainChainId,
  ethMainChainId,
  optimismMainChainId,
  polygonMainChainId,
  zkEVMMainChainId,
  plsMainChainId,
  zksyncMainChainId,
  zoraMainChainId,
]

export const dexTestChains = [
  arbitrumSepoliaChainId,
  avaxFujiChainId,
  baseSepoliaChainId,
  blastSepoliaChainId,
  bscTestChainId,
  celoAlfajoresChainId,
  ethSepoliaChainId,
  optimismSepoliaChainId,
  polygonAmoyChainId,
  plsTestChainId,
  zksyncSepoliaChainId,
  zoraSepoliaChainId,
]

export const dexChains = [...dexMainChains, ...dexTestChains]
