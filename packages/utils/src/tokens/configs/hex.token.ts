import type { Token } from '@dex-toolkit/types'
import type { ChainId } from '@ethereum-multicall/types'

import { plsMainChainId, plsTestChainId } from '../../chains/chainIds'
import { getImageUrlForToken } from '../logo-urls/logo-urls'

export class HEXToken {
  private static commonProps: Omit<
    Token,
    'chainId' | 'contractAddress' | 'standard'
  > = {
    name: 'HEX',
    symbol: 'HEX',
    decimals: 8,
    color: 'rgb(255, 7, 184)',
  }

  public static PULSE = {
    MAINNET: (): Token => {
      return {
        ...HEXToken.commonProps,
        chainId: plsMainChainId,
        name: 'HEX from Ethereum',
        contractAddress: '0x57fde0a71132198BBeC939B98976993d8D89D225',
        standard: 'PRC20',
        logoUri: getImageUrlForToken({
          tokenContractAddress: '0x57fde0a71132198BBeC939B98976993d8D89D225',
          tokenContractChainId: plsMainChainId,
        }),
      }
    },
    TESTNET: (): Token => {
      return {
        ...HEXToken.commonProps,
        chainId: plsTestChainId,
        contractAddress: '0x2b591e99afE9f32eAA6214f7B7629768c40Eeb39',
        standard: 'PRC20',
        logoUri: getImageUrlForToken({
          tokenContractAddress: '0x2b591e99afE9f32eAA6214f7B7629768c40Eeb39',
          tokenContractChainId: plsTestChainId,
        }),
      }
    },
  }

  public static getTokenForChainId(chainId: ChainId): Token | undefined {
    switch (chainId) {
      case plsMainChainId:
        return HEXToken.PULSE.MAINNET()
      case plsTestChainId:
        return HEXToken.PULSE.TESTNET()
      default:
        return undefined
    }
  }
}
