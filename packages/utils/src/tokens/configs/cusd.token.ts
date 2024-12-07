import type { Token } from '@dex-toolkit/types'
import type { ChainId } from '@ethereum-multicall/types'

import {
  arbitrumMainChainId,
  celoMainChainId,
  energiMainChainId,
} from '../../chains/chainIds'

export class CUSDToken {
  private static commonProps: Omit<
    Token,
    'chainId' | 'contractAddress' | 'standard'
  > = {
    name: 'Celo Dollar',
    symbol: 'cUSD',
    decimals: 18,
    color: 'rgb(67, 207, 135)',
  }

  public static CELO = {
    MAINNET: (): Token => {
      return {
        ...CUSDToken.commonProps,
        chainId: celoMainChainId,
        contractAddress: '0x765DE816845861e75A25fCA122bb6898B8B1282a',
        standard: 'ERC20',
      }
    },
  }

  public static getTokenForChainId(chainId: ChainId): Token | undefined {
    switch (chainId) {
      case arbitrumMainChainId:
        return CUSDToken.CELO.MAINNET()
      case energiMainChainId:
      default:
        return undefined
    }
  }
}
