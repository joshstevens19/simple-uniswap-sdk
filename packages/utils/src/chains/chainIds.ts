import type { ChainId } from '@multicall-toolkit/types'

/**
 * Chain IDs for various blockchain networks.
 */

export const arbitrumMainChainId: ChainId = 42161
export const arbitrumSepoliaChainId: ChainId = 421614

export const avaxMainChainId: ChainId = 43114
export const avaxFujiChainId: ChainId = 43113

export const baseMainChainId: ChainId = 8453
export const baseSepoliaChainId: ChainId = 84532

export const blastMainChainId: ChainId = 81457
export const blastSepoliaChainId: ChainId = 168587773

export const bscMainChainId: ChainId = 56
export const bscTestChainId: ChainId = 97

export const celoMainChainId: ChainId = 42220
export const celoAlfajoresChainId: ChainId = 44787

export const energiMainChainId: ChainId = 39797
export const energiTestChainId: ChainId = 49797

export const ethMainChainId: ChainId = 1
export const ethHoleskyChainId: ChainId = 17000
export const ethSepoliaChainId: ChainId = 11155111

export const optimismMainChainId: ChainId = 10
export const optimismSepoliaChainId: ChainId = 11155420

export const plsMainChainId: ChainId = 369
export const plsTestChainId: ChainId = 943

export const polygonMainChainId: ChainId = 137
export const polygonAmoyChainId: ChainId = 80002

export const zkEVMMainChainId: ChainId = 1101
export const zkEVMCardonaChainId: ChainId = 2442

export const zksyncMainChainId: ChainId = 324
export const zksyncSepoliaChainId: ChainId = 300

export const zoraMainChainId: ChainId = 7777777
export const zoraSepoliaChainId: ChainId = 999999999

/**
 * Arrays of chain IDs for various blockchain networks.
 */

export const arbitrumChains = [arbitrumMainChainId, arbitrumSepoliaChainId]
export const avaxChains = [avaxMainChainId, avaxFujiChainId]
export const baseChains = [baseMainChainId, baseSepoliaChainId]
export const blastChains = [blastMainChainId, blastSepoliaChainId]
export const bscChains = [bscMainChainId, bscTestChainId]
export const celoChains = [celoMainChainId, celoAlfajoresChainId]
export const energiChains = [energiMainChainId, energiTestChainId]
export const ethChains = [ethMainChainId, ethHoleskyChainId, ethSepoliaChainId]
export const optimismChains = [optimismMainChainId, optimismSepoliaChainId]
export const plsChains = [plsMainChainId, plsTestChainId]
export const polygonChains = [
  polygonMainChainId,
  zkEVMMainChainId,
  polygonAmoyChainId,
]
export const zksyncChains = [zksyncMainChainId, zksyncSepoliaChainId]
export const zoraChains = [zoraMainChainId, zoraSepoliaChainId]

export const allChains = [
  ...arbitrumChains,
  ...avaxChains,
  ...baseChains,
  ...blastChains,
  ...bscChains,
  ...celoChains,
  ...energiChains,
  ...ethChains,
  ...optimismChains,
  ...plsChains,
  ...polygonChains,
  ...zksyncChains,
  ...zoraChains,
]

export type AllChainId = (typeof allChains)[number]

/**
 * Arrays of chain IDs for main and test chains.
 */

export const dexMainChains = [
  arbitrumMainChainId,
  avaxMainChainId,
  baseMainChainId,
  blastMainChainId,
  bscMainChainId,
  celoAlfajoresChainId,
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

export const infuraChains = [
  arbitrumMainChainId,
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
  ethMainChainId,
  ethHoleskyChainId,
  ethSepoliaChainId,
  optimismMainChainId,
  arbitrumSepoliaChainId,
  polygonMainChainId,
  polygonAmoyChainId,
  zksyncMainChainId,
  zksyncSepoliaChainId,
]

export const alchemyChains = [
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
  ethMainChainId,
  ethHoleskyChainId,
  ethSepoliaChainId,
  optimismMainChainId,
  arbitrumSepoliaChainId,
  polygonMainChainId,
  zkEVMMainChainId,
  zkEVMCardonaChainId,
  polygonAmoyChainId,
  zksyncMainChainId,
  zksyncSepoliaChainId,
  zoraMainChainId,
  zoraSepoliaChainId,
]
