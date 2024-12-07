import type { Token } from '@dex-toolkit/types'
import type { ChainId } from '@multicall-toolkit/types'

import { plsMainChainId, plsTestChainId } from '../../chains/chainIds'
import { getImageUrlForToken } from '../logo-urls/logo-urls'

export class PLSXToken {
  private static commonProps: Omit<
    Token,
    'chainId' | 'contractAddress' | 'standard'
  > = {
    name: 'PulseX',
    symbol: 'PLSX',
    decimals: 18,
    color: 'rgb(0, 254, 112)',
  }

  public static PULSE = {
    MAINNET: (): Token => {
      return {
        ...PLSXToken.commonProps,
        chainId: plsMainChainId,
        contractAddress: '0x95B303987A60C71504D99Aa1b13B4DA07b0790ab',
        standard: 'PRC20',
        logoUri: getImageUrlForToken({
          tokenContractAddress: '0x95B303987A60C71504D99Aa1b13B4DA07b0790ab',
          tokenContractChainId: plsMainChainId,
        }),
      }
    },
    TESTNET: (): Token => {
      return {
        ...PLSXToken.commonProps,
        chainId: plsTestChainId,
        contractAddress: '0x8a810ea8B121d08342E9e7696f4a9915cBE494B7',
        standard: 'PRC20',
        logoUri: getImageUrlForToken({
          tokenContractAddress: '0x8a810ea8B121d08342E9e7696f4a9915cBE494B7',
          tokenContractChainId: plsTestChainId,
        }),
      }
    },
  }

  public static getTokenForChainId(chainId: ChainId): Token | undefined {
    switch (chainId) {
      case plsMainChainId:
        return PLSXToken.PULSE.MAINNET()
      case plsTestChainId:
        return PLSXToken.PULSE.TESTNET()
      default:
        return undefined
    }
  }
}
