import { avaxMainChainId } from '@chain-toolkit/chains'
import type { ChainId } from '@chain-toolkit/schemas'
import type { Token } from '@dex-toolkit/types'

import { getImageUrlForToken } from '../logo-urls/logo-urls'

export class YTSToken {
  private static commonProps: Omit<
    Token,
    'chainId' | 'contractAddress' | 'standard'
  > = {
    name: 'YetiSwap',
    symbol: 'YTS',
    decimals: 18,
    color: 'rgb(153, 193, 216)',
  }

  public static AVALANCHE = {
    MAINNET: (): Token => {
      return {
        ...YTSToken.commonProps,
        chainId: avaxMainChainId,
        contractAddress: '0x488F73cddDA1DE3664775fFd91623637383D6404',
        standard: 'ERC20',
        logoUri: getImageUrlForToken({
          tokenContractAddress: '0x488F73cddDA1DE3664775fFd91623637383D6404',
          tokenContractChainId: avaxMainChainId,
        }),
      }
    },
  }

  public static getTokenForChainId(chainId: ChainId): Token | undefined {
    switch (chainId) {
      case avaxMainChainId:
        return YTSToken.AVALANCHE.MAINNET()
      default:
        return undefined
    }
  }
}
