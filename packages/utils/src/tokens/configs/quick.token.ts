import type { Token } from '@dex-toolkit/types'
import type { ChainId } from '@multicall-toolkit/types'

import { zkEVMMainChainId } from '../../chains/chainIds'
import { getImageUrlForToken } from '../logo-urls/logo-urls'

export class QUICKToken {
  private static commonProps: Omit<
    Token,
    'chainId' | 'contractAddress' | 'standard'
  > = {
    name: 'Quickswap',
    symbol: 'QUICK',
    decimals: 18,
    logoUri: getImageUrlForToken({
      tokenContractAddress: '0x831753DD7087CaC61aB5644b308642cc1c33Dc13',
      tokenContractChainId: zkEVMMainChainId,
    }),
    color: 'rgb(10, 214, 164)',
  }

  public static ZKEVM = {
    MAINNET: (): Token => {
      return {
        ...QUICKToken.commonProps,
        chainId: zkEVMMainChainId,
        contractAddress: '0x831753DD7087CaC61aB5644b308642cc1c33Dc13',
        standard: 'ERC20',
        logoUri: getImageUrlForToken({
          tokenContractAddress: '0x831753DD7087CaC61aB5644b308642cc1c33Dc13',
          tokenContractChainId: zkEVMMainChainId,
        }),
      }
    },
  }

  public static getTokenForChainId(chainId: ChainId): Token | undefined {
    switch (chainId) {
      case zkEVMMainChainId:
        return QUICKToken.ZKEVM.MAINNET()

      default:
        return undefined
    }
  }
}
