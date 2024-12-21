import { zoraMainChainId } from '@chain-toolkit/chains'
import type { ChainId } from '@chain-toolkit/schemas'
import type { Token } from '@dex-toolkit/types'

import { getImageUrlForToken } from '../logo-urls/logo-urls'

export class ENJOYToken {
  private static commonProps: Omit<
    Token,
    'chainId' | 'contractAddress' | 'standard'
  > = {
    name: 'Enjoy',
    symbol: 'ENJOY',
    decimals: 18,
    color: 'rgb(14, 212, 254)',
  }

  public static ZORA = {
    MAINNET: (): Token => {
      return {
        ...ENJOYToken.commonProps,
        chainId: zoraMainChainId,
        contractAddress: '0xa6B280B42CB0b7c4a4F789eC6cCC3a7609A1Bc39',
        standard: 'ERC20',
        logoUri: getImageUrlForToken({
          tokenContractAddress: '0xa6B280B42CB0b7c4a4F789eC6cCC3a7609A1Bc39',
          tokenContractChainId: zoraMainChainId,
        }),
      }
    },
  }

  public static getTokenForChainId(chainId: ChainId): Token | undefined {
    switch (chainId) {
      case zoraMainChainId:
        return ENJOYToken.ZORA.MAINNET()
      default:
        return undefined
    }
  }
}
