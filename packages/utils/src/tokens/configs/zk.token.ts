import { zksyncMainChainId } from '@chain-toolkit/chains'
import type { ChainId } from '@chain-toolkit/schemas'
import type { Token } from '@dex-toolkit/types'

import { getImageUrlForToken } from '../logo-urls/logo-urls'

export class ZKToken {
  private static commonProps: Omit<
    Token,
    'chainId' | 'contractAddress' | 'standard'
  > = {
    name: 'ZKsync',
    symbol: 'ZK',
    decimals: 18,
    color: 'rgb(0, 0, 0)',
  }

  public static ZKSYNC = {
    MAINNET: (): Token => {
      return {
        ...ZKToken.commonProps,
        chainId: zksyncMainChainId,
        contractAddress: '0x5A7d6b2F92C77FAD6CCaBd7EE0624E64907Eaf3E',
        standard: 'ERC20',
        logoUri: getImageUrlForToken({
          tokenContractAddress: '0x5A7d6b2F92C77FAD6CCaBd7EE0624E64907Eaf3E',
          tokenContractChainId: zksyncMainChainId,
        }),
      }
    },
  }

  public static getTokenForChainId(chainId: ChainId): Token | undefined {
    switch (chainId) {
      case zksyncMainChainId:
        return ZKToken.ZKSYNC.MAINNET()
      default:
        return undefined
    }
  }
}
