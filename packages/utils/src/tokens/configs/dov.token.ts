import type { Token } from '@dex-toolkit/types'
import type { ChainId } from '@multicall-toolkit/types'

import { zkEVMMainChainId } from '../../chains/chainIds'
import { getImageUrlForToken } from '../logo-urls/logo-urls'

export class DOVToken {
  private static commonProps: Omit<
    Token,
    'chainId' | 'contractAddress' | 'standard'
  > = {
    name: 'DoveSwap',
    symbol: 'DOV',
    decimals: 18,
    color: 'rgb(10, 214, 164)',
  }

  public static ZKEVM = {
    MAINNET: (): Token => {
      return {
        ...DOVToken.commonProps,
        chainId: zkEVMMainChainId,
        contractAddress: '0x696c0bA235444607A1c4b93E6b34Ba14928c1B60',
        standard: 'ERC20',
        logoUri: getImageUrlForToken({
          tokenContractAddress: '0x696c0bA235444607A1c4b93E6b34Ba14928c1B60',
          tokenContractChainId: zkEVMMainChainId,
        }),
      }
    },
  }

  public static getTokenForChainId(chainId: ChainId): Token | undefined {
    switch (chainId) {
      case zkEVMMainChainId:
        return DOVToken.ZKEVM.MAINNET()
      default:
        return undefined
    }
  }
}
