import type { IDexProvider } from '@dex-toolkit/types'
import { Multicall } from '@multicall-toolkit/core'
import { multicallChainIds } from '@multicall-toolkit/utils'

import { getChainConfig } from '../chains/chainConfigs'

export class DexMulticall extends Multicall {
  constructor(dexProvider: IDexProvider) {
    const chainId = dexProvider.network.chainId
    const ethersProvider = dexProvider.provider
    const { customNetwork } = dexProvider

    let contractAddress = customNetwork?.multicallContractAddress

    if (!contractAddress) {
      if (multicallChainIds.includes(chainId)) {
        super({
          ethersProvider,
          tryAggregate: true,
        })
        return
      } else {
        const { multicallContractAddress } = getChainConfig(chainId) ?? {}

        if (multicallContractAddress) {
          contractAddress = multicallContractAddress
        } else {
          throw new Error(
            `Network - ${chainId} doesn't have a multicall contract address defined. Please provide a multicall contract address.`,
          )
        }
      }
    }

    super({
      ethersProvider,
      tryAggregate: true,
      customMulticallContractAddress: contractAddress,
    })
  }
}
