import type { Token } from '@dex-toolkit/types'
import type { ChainId } from '@multicall-toolkit/types'

import { blastMainChainId } from '../../chains/chainIds'
import { getImageUrlForToken } from '../logo-urls/logo-urls'

export class YOLOToken {
  private static commonProps: Omit<
    Token,
    'chainId' | 'contractAddress' | 'standard'
  > = {
    name: 'YOLO',
    symbol: 'YOLO',
    decimals: 18,
    color: 'rgb(205, 253, 1)',
  }

  public static BLAST = {
    MAINNET: (): Token => {
      return {
        ...YOLOToken.commonProps,
        chainId: blastMainChainId,
        contractAddress: '0xf77dd21c5ce38ac08786BE35Ef1d1DeC1a6a15F3',
        standard: 'ERC20',
        logoUri: getImageUrlForToken({
          tokenContractAddress: '0xf77dd21c5ce38ac08786BE35Ef1d1DeC1a6a15F3',
          tokenContractChainId: blastMainChainId,
        }),
      }
    },
  }

  public static getTokenForChainId(chainId: ChainId): Token | undefined {
    switch (chainId) {
      case blastMainChainId:
        return YOLOToken.BLAST.MAINNET()
      default:
        return undefined
    }
  }
}
