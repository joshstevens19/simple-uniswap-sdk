import type { Token } from '@dex-toolkit/types'
import type { ChainId } from '@multicall-toolkit/types'

import {
  polygonAmoyChainId,
  polygonMainChainId,
  zkEVMCardonaChainId,
  zkEVMMainChainId,
} from '../../chains/chainIds'
import { getImageUrlForToken } from '../logo-urls/logo-urls'

export class WPOLToken {
  private static commonProps: Omit<
    Token,
    'chainId' | 'contractAddress' | 'standard'
  > = {
    name: 'Wrapped Polygon Ecosystem Token',
    symbol: 'WPOL',
    decimals: 18,
    color: 'rgb(130, 71, 229)',
  }

  public static POLYGON = {
    MAINNET: (): Token => {
      return {
        ...WPOLToken.commonProps,
        chainId: polygonMainChainId,
        contractAddress: '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270',
        standard: 'ERC20',
        logoUri: getImageUrlForToken({
          tokenContractAddress: '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270',
          tokenContractChainId: polygonMainChainId,
        }),
      }
    },
    AMOY: (): Token => {
      return {
        ...WPOLToken.commonProps,
        chainId: polygonAmoyChainId,
        name: 'Wrapped POL',
        contractAddress: '0xA5733b3A8e62A8faF43b0376d5fAF46E89B3033E',
        standard: 'ERC20',
        logoUri: getImageUrlForToken({
          tokenContractAddress: '0xA5733b3A8e62A8faF43b0376d5fAF46E89B3033E',
          tokenContractChainId: polygonAmoyChainId,
        }),
      }
    },
  }

  public static ZKEVM = {
    MAINNET: (): Token => {
      return {
        ...WPOLToken.commonProps,
        chainId: zkEVMMainChainId,
        name: 'Matic Token',
        symbol: 'MATIC',
        contractAddress: '0xa2036f0538221a77A3937F1379699f44945018d0',
        standard: 'ERC20',
        logoUri: getImageUrlForToken({
          tokenContractAddress: '0xa2036f0538221a77A3937F1379699f44945018d0',
          tokenContractChainId: zkEVMMainChainId,
        }),
      }
    },
    CARDONA: (): Token => {
      return {
        ...WPOLToken.commonProps,
        chainId: zkEVMCardonaChainId,
        name: 'Polygon Ecosystem Token',
        symbol: 'POL',
        contractAddress: '0x5Ee025376797aa49a8B4D93ab1A900BF5dA38a9E',
        standard: 'ERC20',
        logoUri: getImageUrlForToken({
          tokenContractAddress: '0x5Ee025376797aa49a8B4D93ab1A900BF5dA38a9E',
          tokenContractChainId: zkEVMCardonaChainId,
        }),
      }
    },
  }

  public static getTokenForChainId(chainId: ChainId): Token | undefined {
    switch (chainId) {
      case polygonMainChainId:
        return WPOLToken.POLYGON.MAINNET()
      case polygonAmoyChainId:
        return WPOLToken.POLYGON.AMOY()
      case zkEVMMainChainId:
        return WPOLToken.ZKEVM.MAINNET()
      case zkEVMCardonaChainId:
        return WPOLToken.ZKEVM.CARDONA()
      default:
        return undefined
    }
  }
}
