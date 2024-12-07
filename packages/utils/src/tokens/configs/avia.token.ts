import type { Token } from '@dex-toolkit/types'
import type { ChainId } from '@multicall-toolkit/types'

import { avaxMainChainId } from '../../chains/chainIds'
import { getImageUrlForToken } from '../logo-urls/logo-urls'

export class AVIAToken {
  private static commonProps: Omit<
    Token,
    'chainId' | 'contractAddress' | 'standard'
  > = {
    name: 'Kepler',
    symbol: 'AVIA',
    decimals: 18,
    color: 'rgb(89, 221, 134)',
  }

  public static AVALANCHE = {
    MAINNET: (): Token => {
      return {
        ...AVIAToken.commonProps,
        chainId: avaxMainChainId,
        contractAddress: '0xb9A98894FfBfA98c73a818B5B044E5b1C8666f56',
        standard: 'ERC20',
        logoUri: getImageUrlForToken({
          tokenContractAddress: '0xb9A98894FfBfA98c73a818B5B044E5b1C8666f56',
          tokenContractChainId: avaxMainChainId,
        }),
      }
    },
  }

  public static getTokenForChainId(chainId: ChainId): Token | undefined {
    switch (chainId) {
      case avaxMainChainId:
        return AVIAToken.AVALANCHE.MAINNET()
      default:
        return undefined
    }
  }
}
