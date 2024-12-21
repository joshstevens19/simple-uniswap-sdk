import { avaxMainChainId } from '@chain-toolkit/chains'
import type { ChainId } from '@chain-toolkit/schemas'
import type { Token } from '@dex-toolkit/types'

import { getImageUrlForToken } from '../logo-urls/logo-urls'

export class PNGToken {
  private static commonProps: Omit<
    Token,
    'chainId' | 'contractAddress' | 'standard'
  > = {
    name: 'Pangolin',
    symbol: 'PNG',
    decimals: 18,
    color: 'rgb(254, 125, 30)',
  }

  public static AVALANCHE = {
    MAINNET: (): Token => {
      return {
        ...PNGToken.commonProps,
        chainId: avaxMainChainId,
        contractAddress: '0x60781C2586D68229fde47564546784ab3fACA982',
        standard: 'ERC20',
        logoUri: getImageUrlForToken({
          tokenContractAddress: '0x60781C2586D68229fde47564546784ab3fACA982',
          tokenContractChainId: avaxMainChainId,
        }),
      }
    },
  }

  public static getTokenForChainId(chainId: ChainId): Token | undefined {
    switch (chainId) {
      case avaxMainChainId:
        return PNGToken.AVALANCHE.MAINNET()
      default:
        return undefined
    }
  }
}
