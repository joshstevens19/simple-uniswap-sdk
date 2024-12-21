import { blastMainChainId, blastSepoliaChainId } from '@chain-toolkit/chains'
import type { ChainId } from '@chain-toolkit/schemas'
import type { Token } from '@dex-toolkit/types'

import { getImageUrlForToken } from '../logo-urls/logo-urls'

export class USDBToken {
  private static commonProps: Omit<
    Token,
    'chainId' | 'contractAddress' | 'standard'
  > = {
    name: 'USDB',
    symbol: 'USDB',
    decimals: 18,
    color: 'rgb(253, 252, 0)',
  }

  public static BLAST = {
    MAINNET: (): Token => {
      return {
        ...USDBToken.commonProps,
        chainId: blastMainChainId,
        contractAddress: '0x4300000000000000000000000000000000000003',
        standard: 'ERC20',
        logoUri: getImageUrlForToken({
          tokenContractAddress: '0x4300000000000000000000000000000000000003',
          tokenContractChainId: blastMainChainId,
        }),
      }
    },
    SEPOLIA: (): Token => {
      return {
        ...USDBToken.commonProps,
        chainId: blastSepoliaChainId,
        name: 'USD on Blast',
        contractAddress: '0x83d0f53a26eb04082b0e187Df0d1f8c5a963e0C6',
        standard: 'ERC20',
        logoUri: getImageUrlForToken({
          tokenContractAddress: '0x83d0f53a26eb04082b0e187Df0d1f8c5a963e0C6',
          tokenContractChainId: blastSepoliaChainId,
        }),
      }
    },
  }

  public static getTokenForChainId(chainId: ChainId): Token | undefined {
    switch (chainId) {
      case blastMainChainId:
        return USDBToken.BLAST.MAINNET()
      case blastSepoliaChainId:
        return USDBToken.BLAST.SEPOLIA()
      default:
        return undefined
    }
  }
}
