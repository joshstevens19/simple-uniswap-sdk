import { energiMainChainId, energiTestChainId } from '@chain-toolkit/chains'
import { EnergiNetwork as EnergiNetworkBase } from '@chain-toolkit/networks'
import type { ChainId } from '@chain-toolkit/schemas'
import type { ChainConfig } from '@dex-toolkit/types'

import { erc1155ABI, erc20ABI, erc721ABI, erc777ABI } from '../../abis/index'
import { NRGToken } from '../../tokens/configs/nrg.token'
import { WNRGToken } from '../../tokens/configs/wnrg.token'
import { getAllTokensForChainId } from '../../utils/token.utils'

const commonProps: Pick<ChainConfig, 'standards'> = {
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
}

export class EnergiNetwork {
  public static MAINNET = (): ChainConfig => {
    return {
      ...EnergiNetworkBase.MAINNET(),
      ...commonProps,
      nativeCurrency: NRGToken.ENERGI.MAINNET(),
      nativeWrappedTokenInfo: WNRGToken.ENERGI.MAINNET(),
      tokens: getAllTokensForChainId(energiMainChainId),
      multicallContractAddress:
        EnergiNetworkBase.MAINNET().contracts.multicall ?? '',
    }
  }

  public static TESTNET = (): ChainConfig => {
    return {
      ...EnergiNetworkBase.TESTNET(),
      ...commonProps,
      nativeCurrency: NRGToken.ENERGI.TESTNET(),
      nativeWrappedTokenInfo: WNRGToken.ENERGI.TESTNET(),
      tokens: getAllTokensForChainId(energiTestChainId),
      multicallContractAddress:
        EnergiNetworkBase.TESTNET().contracts.multicall ?? '',
    }
  }

  public static getChainConfig(chainId: ChainId): ChainConfig | undefined {
    switch (chainId) {
      case energiMainChainId:
        return EnergiNetwork.MAINNET()
      case energiTestChainId:
        return EnergiNetwork.TESTNET()
      default:
        return undefined
    }
  }
}
