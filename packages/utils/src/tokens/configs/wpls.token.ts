import type { Token } from '@dex-toolkit/types'
import type { ChainId } from '@multicall-toolkit/types'

import { plsMainChainId, plsTestChainId } from '../../chains/chainIds'
import { getImageUrlForToken } from '../logo-urls/logo-urls'

export class WPLSToken {
  private static commonProps: Omit<
    Token,
    'chainId' | 'contractAddress' | 'standard'
  > = {
    name: 'Wrapped Pulse',
    symbol: 'WPLS',
    decimals: 18,
    color: 'rgb(5, 185, 213)',
  }

  public static PULSE = {
    MAINNET: (): Token => {
      return {
        ...WPLSToken.commonProps,
        chainId: plsMainChainId,
        contractAddress: '0xA1077a294dDE1B09bB078844df40758a5D0f9a27',
        standard: 'PRC20',
        logoUri: getImageUrlForToken({
          tokenContractAddress: '0xA1077a294dDE1B09bB078844df40758a5D0f9a27',
          tokenContractChainId: plsMainChainId,
        }),
      }
    },
    TESTNET: (): Token => {
      return {
        ...WPLSToken.commonProps,
        chainId: plsTestChainId,
        contractAddress: '0x70499adEBB11Efd915E3b69E700c331778628707',
        standard: 'PRC20',
        logoUri: getImageUrlForToken({
          tokenContractAddress: '0x70499adEBB11Efd915E3b69E700c331778628707',
          tokenContractChainId: plsTestChainId,
        }),
      }
    },
  }

  public static getTokenForChainId(chainId: ChainId): Token | undefined {
    switch (chainId) {
      case plsMainChainId:
        return WPLSToken.PULSE.MAINNET()
      case plsTestChainId:
        return WPLSToken.PULSE.TESTNET()
      default:
        return undefined
    }
  }
}
