import type { Token } from '@dex-toolkit/types'
import type { ChainId } from '@ethereum-multicall/types'

import { avaxMainChainId } from '../../chains/chainIds'
import { getImageUrlForToken } from '../logo-urls/logo-urls'

export class COQToken {
  private static commonProps: Omit<
    Token,
    'chainId' | 'contractAddress' | 'standard'
  > = {
    name: 'COQINU',
    symbol: 'COQ',
    decimals: 18,
    color: 'rgb(229, 73, 72)',
  }

  public static AVALANCHE = {
    MAINNET: (): Token => {
      return {
        ...COQToken.commonProps,
        chainId: avaxMainChainId,
        contractAddress: '0x420FcA0121DC28039145009570975747295f2329',
        standard: 'ERC20',
        logoUri: getImageUrlForToken({
          tokenContractAddress: '0x420FcA0121DC28039145009570975747295f2329',
          tokenContractChainId: avaxMainChainId,
        }),
      }
    },
  }

  public static getTokenForChainId(chainId: ChainId): Token | undefined {
    switch (chainId) {
      case avaxMainChainId:
        return COQToken.AVALANCHE.MAINNET()
      default:
        return undefined
    }
  }
}
