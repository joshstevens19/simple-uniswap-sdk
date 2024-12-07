import type { DexConfig } from '@dex-toolkit/types'
import type { ChainId } from '@multicall-toolkit/types'

export interface DexClass {
  getDexConfig(chainId: ChainId): DexConfig | undefined
  getAllDexConfigs(): DexConfig[]
}
