import { blastMainChainId } from '@chain-toolkit/chains'
import type { ChainId } from '@chain-toolkit/schemas'
import type { Token } from '@dex-toolkit/types'

import { getImageUrlForToken } from '../logo-urls/logo-urls'

export class BLASTToken {
  private static commonProps: Omit<
    Token,
    'chainId' | 'contractAddress' | 'standard'
  > = {
    name: 'Blast',
    symbol: 'BLAST',
    decimals: 18,
    color: 'rgb(253, 253, 0)',
  }

  public static BLAST = {
    MAINNET: (): Token => {
      return {
        ...BLASTToken.commonProps,
        chainId: blastMainChainId,
        contractAddress: '0xb1a5700fA2358173Fe465e6eA4Ff52E36e88E2ad',
        standard: 'ERC20',
        logoUri: getImageUrlForToken({
          tokenContractAddress: '0xb1a5700fA2358173Fe465e6eA4Ff52E36e88E2ad',
          tokenContractChainId: blastMainChainId,
        }),
      }
    },
  }

  public static getTokenForChainId(chainId: ChainId): Token | undefined {
    switch (chainId) {
      case blastMainChainId:
        return BLASTToken.BLAST.MAINNET()
      default:
        return undefined
    }
  }
}
