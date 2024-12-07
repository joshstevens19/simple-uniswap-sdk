import type { Token } from '@dex-toolkit/types'
import type { ChainId } from '@multicall-toolkit/types'

import { plsMainChainId, plsTestChainId } from '../../chains/chainIds'
import { getImageUrlForToken } from '../logo-urls/logo-urls'

export class INCToken {
  private static commonProps: Omit<
    Token,
    'chainId' | 'contractAddress' | 'standard'
  > = {
    name: 'Incentive',
    symbol: 'INC',
    decimals: 18,
    color: 'rgb(255, 217, 67)',
  }

  public static PULSE = {
    MAINNET: (): Token => {
      return {
        ...INCToken.commonProps,
        chainId: plsMainChainId,
        contractAddress: '0x2fa878Ab3F87CC1C9737Fc071108F904c0B0C95d',
        standard: 'PRC20',
        logoUri: getImageUrlForToken({
          tokenContractAddress: '0x2fa878Ab3F87CC1C9737Fc071108F904c0B0C95d',
          tokenContractChainId: plsMainChainId,
        }),
      }
    },
    TESTNET: (): Token => {
      return {
        ...INCToken.commonProps,
        chainId: plsTestChainId,
        contractAddress: '0x6eFAfcb715F385c71d8AF763E8478FeEA6faDF63',
        standard: 'PRC20',
        logoUri: getImageUrlForToken({
          tokenContractAddress: '0x6eFAfcb715F385c71d8AF763E8478FeEA6faDF63',
          tokenContractChainId: plsTestChainId,
        }),
      }
    },
  }

  public static getTokenForChainId(chainId: ChainId): Token | undefined {
    switch (chainId) {
      case plsMainChainId:
        return INCToken.PULSE.MAINNET()
      case plsTestChainId:
        return INCToken.PULSE.TESTNET()
      default:
        return undefined
    }
  }
}
