import type { Token } from '@dex-toolkit/types'
import type { ChainId } from '@multicall-toolkit/types'

import { WPOLToken } from './wpol.token'
import {
  ethMainChainId,
  polygonAmoyChainId,
  polygonMainChainId,
  zkEVMCardonaChainId,
  zkEVMMainChainId,
} from '../../chains/chainIds'
import { transformWrappedAddressToCoinAddress } from '../../utils/address.utils'
import { getImageUrlForToken } from '../logo-urls/logo-urls'

export class POLToken {
  private static commonProps: Omit<
    Token,
    'chainId' | 'contractAddress' | 'standard'
  > = {
    name: 'Polygon Ecosystem Token',
    symbol: 'POL',
    decimals: 18,
    color: 'rgb(130, 71, 229)',
  }

  public static ETH = {
    MAINNET: (): Token => {
      return {
        ...POLToken.commonProps,
        chainId: ethMainChainId,
        contractAddress: '0x455e53CBB86018Ac2B8092FdCd39d8444aFFC3F6',
        standard: 'ERC20',
        logoUri: getImageUrlForToken({
          tokenContractChainId: ethMainChainId,
        }),
      }
    },
  }

  public static POLYGON = {
    MAINNET: (): Token => {
      return {
        ...POLToken.commonProps,
        chainId: polygonMainChainId,
        contractAddress: transformWrappedAddressToCoinAddress(
          WPOLToken.POLYGON.MAINNET().contractAddress,
        ),
        standard: 'ERC20',
        logoUri: getImageUrlForToken({
          tokenContractChainId: polygonMainChainId,
        }),
      }
    },
    AMOY: (): Token => {
      return {
        ...POLToken.commonProps,
        chainId: polygonAmoyChainId,
        name: 'POL',
        contractAddress: transformWrappedAddressToCoinAddress(
          WPOLToken.POLYGON.AMOY().contractAddress,
        ),
        standard: 'ERC20',
        logoUri: getImageUrlForToken({
          tokenContractChainId: polygonAmoyChainId,
        }),
      }
    },
  }

  public static ZKEVM = {
    MAINNET: (): Token => {
      return {
        ...POLToken.commonProps,
        chainId: zkEVMMainChainId,
        name: 'Matic Token',
        symbol: 'MATIC',
        contractAddress: transformWrappedAddressToCoinAddress(
          WPOLToken.ZKEVM.MAINNET().contractAddress,
        ),
        standard: 'ERC20',
        logoUri: getImageUrlForToken({
          tokenContractChainId: zkEVMMainChainId,
        }),
      }
    },
    CARDONA: (): Token => {
      return {
        ...POLToken.commonProps,
        chainId: zkEVMCardonaChainId,
        contractAddress: transformWrappedAddressToCoinAddress(
          WPOLToken.ZKEVM.CARDONA().contractAddress,
        ),
        standard: 'ERC20',
        logoUri: getImageUrlForToken({
          tokenContractChainId: zkEVMCardonaChainId,
        }),
      }
    },
  }

  public static getTokenForChainId(chainId: ChainId): Token | undefined {
    switch (chainId) {
      case ethMainChainId:
        return POLToken.ETH.MAINNET()
      case polygonMainChainId:
        return POLToken.POLYGON.MAINNET()
      case polygonAmoyChainId:
        return POLToken.POLYGON.AMOY()
      case zkEVMMainChainId:
        return POLToken.ZKEVM.MAINNET()
      case zkEVMCardonaChainId:
        return POLToken.ZKEVM.CARDONA()
      default:
        return undefined
    }
  }
}
