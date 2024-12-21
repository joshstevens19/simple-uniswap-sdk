import { plsMainChainId, plsTestChainId } from '@chain-toolkit/chains'
import { PulseNetwork as PulseNetworkBase } from '@chain-toolkit/networks'
import type { ChainId } from '@chain-toolkit/schemas'
import type { ChainConfig } from '@dex-toolkit/types'

import { erc1155ABI, erc20ABI, erc721ABI, erc777ABI } from '../../abis/index'
import { PLSCoin } from '../../tokens/configs/pls.token'
import { WPLSToken } from '../../tokens/configs/wpls.token'
import { getAllTokensForChainId } from '../../utils/token.utils'

const commonProps: Pick<ChainConfig, 'standards'> = {
  standards: {
    token20: {
      standard: 'PRC20',
      abi: erc20ABI,
    },
    token721: {
      standard: 'PRC721',
      abi: erc721ABI,
    },
    token777: {
      standard: 'PRC777',
      abi: erc777ABI,
    },
    token1155: {
      standard: 'PRC1155',
      abi: erc1155ABI,
    },
  },
}

export class PulseNetwork {
  public static MAINNET = (): ChainConfig => {
    return {
      ...PulseNetworkBase.MAINNET(),
      ...commonProps,
      nativeCurrency: PLSCoin.PULSE.MAINNET(),
      nativeWrappedTokenInfo: WPLSToken.PULSE.MAINNET(),
      tokens: getAllTokensForChainId(plsMainChainId),
      multicallContractAddress:
        PulseNetworkBase.MAINNET().contracts.multicall ?? '',
    }
  }

  public static TESTNET = (): ChainConfig => {
    return {
      ...PulseNetworkBase.TESTNET(),
      ...commonProps,
      nativeCurrency: PLSCoin.PULSE.TESTNET(),
      nativeWrappedTokenInfo: WPLSToken.PULSE.TESTNET(),
      tokens: getAllTokensForChainId(plsTestChainId),
      multicallContractAddress:
        PulseNetworkBase.TESTNET().contracts.multicall ?? '',
    }
  }

  public static getChainConfig(chainId: ChainId): ChainConfig | undefined {
    switch (chainId) {
      case plsMainChainId:
        return PulseNetwork.MAINNET()
      case plsTestChainId:
        return PulseNetwork.TESTNET()
      default:
        return undefined
    }
  }
}
