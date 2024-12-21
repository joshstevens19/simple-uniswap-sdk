import { zkEVMMainChainId, zkEVMCardonaChainId } from '@chain-toolkit/chains'
import { zkEVMNetwork as zkEVMNetworkBase } from '@chain-toolkit/networks'
import type { ChainId } from '@chain-toolkit/schemas'
import type { ChainConfig } from '@dex-toolkit/types'

import { erc1155ABI, erc20ABI, erc721ABI, erc777ABI } from '../../abis/index'
import { POLToken } from '../../tokens/configs/pol.token'
import { WPOLToken } from '../../tokens/configs/wpol.token'
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

export class zkEVMNetwork {
  public static MAINNET = (): ChainConfig => {
    return {
      ...zkEVMNetworkBase.MAINNET(),
      ...commonProps,
      nativeCurrency: POLToken.ZKEVM.MAINNET(),
      nativeWrappedTokenInfo: WPOLToken.ZKEVM.MAINNET(),
      tokens: getAllTokensForChainId(zkEVMMainChainId),
      multicallContractAddress:
        zkEVMNetworkBase.MAINNET().contracts.multicall ?? '',
    }
  }

  public static CARDONA = (): ChainConfig => {
    return {
      ...zkEVMNetworkBase.CARDONA(),
      ...commonProps,
      nativeCurrency: POLToken.ZKEVM.CARDONA(),
      nativeWrappedTokenInfo: WPOLToken.ZKEVM.CARDONA(),
      tokens: getAllTokensForChainId(zkEVMCardonaChainId),
      multicallContractAddress:
        zkEVMNetworkBase.CARDONA().contracts.multicall ?? '',
    }
  }

  public static getChainConfig(chainId: ChainId): ChainConfig | undefined {
    switch (chainId) {
      case zkEVMMainChainId:
        return zkEVMNetwork.MAINNET()
      case zkEVMCardonaChainId:
        return zkEVMNetwork.CARDONA()
      default:
        return undefined
    }
  }
}
