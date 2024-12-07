import type { Token } from '@dex-toolkit/types'
import type { ChainId } from '@multicall-toolkit/types'

import { avaxMainChainId } from '../../chains/chainIds'
import { getImageUrlForToken } from '../logo-urls/logo-urls'

export class NYAToken {
  private static commonProps: Omit<
    Token,
    'chainId' | 'contractAddress' | 'standard'
  > = {
    name: 'Nya',
    symbol: 'NYA',
    decimals: 18,
    color: 'rgb(254, 213, 109)',
  }

  public static AVALANCHE = {
    MAINNET: (): Token => {
      return {
        ...NYAToken.commonProps,
        chainId: avaxMainChainId,
        contractAddress: '0x38F9bf9dCe51833Ec7f03C9dC218197999999999',
        standard: 'ERC20',
        logoUri: getImageUrlForToken({
          tokenContractAddress: '0x38F9bf9dCe51833Ec7f03C9dC218197999999999',
          tokenContractChainId: avaxMainChainId,
        }),
      }
    },
  }

  public static getTokenForChainId(chainId: ChainId): Token | undefined {
    switch (chainId) {
      case avaxMainChainId:
        return NYAToken.AVALANCHE.MAINNET()
      default:
        return undefined
    }
  }
}
