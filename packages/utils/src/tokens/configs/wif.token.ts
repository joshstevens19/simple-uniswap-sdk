import { blastMainChainId } from '@chain-toolkit/chains'
import type { ChainId } from '@chain-toolkit/schemas'
import type { Token } from '@dex-toolkit/types'

import { getImageUrlForToken } from '../logo-urls/logo-urls'

export class WIFToken {
  private static commonProps: Omit<
    Token,
    'chainId' | 'contractAddress' | 'standard'
  > = {
    name: 'Dog Wif Blast',
    symbol: 'WIF',
    decimals: 18,
    color: 'rgb(183, 185, 69)',
  }

  public static BLAST = {
    MAINNET: (): Token => {
      return {
        ...WIFToken.commonProps,
        chainId: blastMainChainId,
        contractAddress: '0x2Ef6EE4884892b15DfCF53B33ed139FEF6141A49',
        standard: 'ERC20',
        logoUri: getImageUrlForToken({
          tokenContractAddress: '0x2Ef6EE4884892b15DfCF53B33ed139FEF6141A49',
          tokenContractChainId: blastMainChainId,
        }),
      }
    },
  }

  public static getTokenForChainId(chainId: ChainId): Token | undefined {
    switch (chainId) {
      case blastMainChainId:
        return WIFToken.BLAST.MAINNET()
      default:
        return undefined
    }
  }
}
