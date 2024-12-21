import { polygonMainChainId, polygonAmoyChainId } from '@chain-toolkit/chains'
import { PolygonNetwork as PolygonNetworkBase } from '@chain-toolkit/networks'
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

export class PolygonNetwork {
  public static MAINNET = (): ChainConfig => {
    return {
      ...PolygonNetworkBase.MAINNET(),
      ...commonProps,
      nativeCurrency: POLToken.POLYGON.MAINNET(),
      nativeWrappedTokenInfo: WPOLToken.POLYGON.MAINNET(),
      tokens: getAllTokensForChainId(polygonMainChainId),
      multicallContractAddress:
        PolygonNetworkBase.MAINNET().contracts.multicall ?? '',
    }
  }

  public static AMOY = (): ChainConfig => {
    return {
      ...PolygonNetworkBase.AMOY(),
      ...commonProps,
      nativeCurrency: POLToken.POLYGON.AMOY(),
      nativeWrappedTokenInfo: WPOLToken.POLYGON.AMOY(),
      tokens: getAllTokensForChainId(polygonAmoyChainId),
      multicallContractAddress:
        PolygonNetworkBase.AMOY().contracts.multicall ?? '',
    }
  }

  public static getChainConfig(chainId: ChainId): ChainConfig | undefined {
    switch (chainId) {
      case polygonMainChainId:
        return PolygonNetwork.MAINNET()
      case polygonAmoyChainId:
        return PolygonNetwork.AMOY()
      default:
        return undefined
    }
  }
}
