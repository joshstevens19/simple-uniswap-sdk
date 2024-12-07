import type { DexMulticallProviderContext } from '@dex-toolkit/types'
import { MulticallProviderBase } from '@ethereum-multicall/provider'
import type { ContractDetail } from '@ethereum-multicall/types'

import { DexProvider, parseDexProviderFromContext } from './dex-provider'

export abstract class DexProviderBase extends MulticallProviderBase {
  protected override _multicallProvider: DexProvider

  constructor(
    dexProviderContext: DexMulticallProviderContext,
    contractDetail?: ContractDetail,
  ) {
    const dexProvider = parseDexProviderFromContext(dexProviderContext)

    super(dexProvider._providerContext, contractDetail)

    this._multicallProvider = dexProvider
  }

  /**
   * Returns the underlying `DexProvider`.
   */
  public get dexProvider(): DexProvider {
    return this._multicallProvider
  }
}
