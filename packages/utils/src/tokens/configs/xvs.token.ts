import type { Token } from '@dex-toolkit/types'
import type { ChainId } from '@multicall-toolkit/types'

import { zksyncMainChainId } from '../../chains/chainIds'
import { getImageUrlForToken } from '../logo-urls/logo-urls'

export class XVSToken {
  private static commonProps: Omit<
    Token,
    'chainId' | 'contractAddress' | 'standard'
  > = {
    name: 'Venus XVS',
    symbol: 'XVS',
    decimals: 18,
    color: 'rgb(56, 118, 247)',
  }

  public static ZKSYNC = {
    MAINNET: (): Token => {
      return {
        ...XVSToken.commonProps,
        chainId: zksyncMainChainId,
        contractAddress: '0xD78ABD81a3D57712a3af080dc4185b698Fe9ac5A',
        standard: 'ERC20',
        logoUri: getImageUrlForToken({
          tokenContractAddress: '0xD78ABD81a3D57712a3af080dc4185b698Fe9ac5A',
          tokenContractChainId: zksyncMainChainId,
        }),
      }
    },
  }

  public static getTokenForChainId(chainId: ChainId): Token | undefined {
    switch (chainId) {
      case zksyncMainChainId:
        return XVSToken.ZKSYNC.MAINNET()
      default:
        return undefined
    }
  }
}
