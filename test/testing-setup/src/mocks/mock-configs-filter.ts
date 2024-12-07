import type { DexType } from '@dex-toolkit/types'
import type { ChainId } from '@ethereum-multicall/types'

import type { DexTestCase, DexTestCaseFilter } from './mock.types'

export class DexConfigFilter {
  private readonly config: DexTestCaseFilter

  constructor(config: DexTestCaseFilter = {}) {
    this.config = config
  }

  filterTestCases(
    testCases: Record<DexType, Record<ChainId, DexTestCase>>,
  ): Record<DexType, Record<ChainId, DexTestCase>> {
    const filteredCases: Record<
      DexType,
      Record<ChainId, DexTestCase>
    > = {} as Record<DexType, Record<ChainId, DexTestCase>>

    // Filter DEX types
    const dexTypes =
      this.config.enabledDexes || (Object.keys(testCases) as DexType[])

    for (const type of dexTypes) {
      const dexType = type as DexType

      if (!testCases[dexType as DexType]) continue

      const filteredChains: Record<ChainId, DexTestCase> = {}

      // Filter chain IDs
      const chainIds =
        this.config.enabledChainIds ||
        (Object.keys(testCases[dexType]) as unknown as ChainId[])

      for (const chainId of chainIds) {
        const testCase = testCases[dexType][chainId]
        if (!testCase) continue

        // Filter protocols and their versions
        const filteredTestCase = this.filterProtocolsAndVersions(
          testCase,
          dexType,
        )

        if (this.hasValidProtocols(filteredTestCase)) {
          filteredChains[chainId] = filteredTestCase
        }
      }

      if (Object.keys(filteredChains).length > 0) {
        filteredCases[dexType] = filteredChains
      }
    }

    return filteredCases
  }

  private filterProtocolsAndVersions(
    testCase: DexTestCase,
    dexType: DexType,
  ): DexTestCase {
    const filteredCase = { ...testCase }
    const versions = { ...testCase.versions }

    // Filter protocols based on enabledProtocols
    if (this.config.enabledProtocols) {
      if (!this.config.enabledProtocols.v2) {
        delete versions.v2
      }
      if (!this.config.enabledProtocols.v3) {
        delete versions.v3
      }
    }

    // Filter versions based on enabledVersions
    if (this.config.enabledVersions?.[dexType]) {
      const dexVersions = this.config.enabledVersions[dexType]

      if (versions.v2 && dexVersions.v2) {
        versions.v2 = versions.v2.filter((v) =>
          dexVersions.v2?.includes(v.versionTag),
        )
        if (versions.v2.length === 0) delete versions.v2
      }

      if (versions.v3 && dexVersions.v3) {
        versions.v3 = versions.v3.filter((v) =>
          dexVersions.v3?.includes(v.versionTag),
        )
        if (versions.v3.length === 0) delete versions.v3
      }
    }

    filteredCase.versions = versions
    return filteredCase
  }

  private hasValidProtocols(testCase: DexTestCase): boolean {
    return !!(testCase.versions.v2?.length || testCase.versions.v3?.length)
  }
}

export const filterTestCases = (
  testCases: Record<DexType, Record<ChainId, DexTestCase>>,
  config: DexTestCaseFilter = {},
): Record<DexType, Record<ChainId, DexTestCase>> => {
  const filter = new DexConfigFilter(config)
  return filter.filterTestCases(testCases)
}
