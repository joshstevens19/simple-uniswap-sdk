import type { DexConfig } from '@dex-toolkit/types'
import type { ChainId } from '@ethereum-multicall/types'

export interface DexClass {
  getDexConfig(chainId: ChainId): DexConfig | undefined
  getAllDexConfigs(): DexConfig[]
}
