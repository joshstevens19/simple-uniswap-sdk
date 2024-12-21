import type { ChainId } from '@chain-toolkit/schemas'
import type { DexConfig } from '@dex-toolkit/types'

export interface DexClass {
  getDexConfig(chainId: ChainId): DexConfig | undefined
  getAllDexConfigs(): DexConfig[]
}
