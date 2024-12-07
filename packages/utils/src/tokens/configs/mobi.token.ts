import type { Token } from '@dex-toolkit/types'
import type { ChainId } from '@ethereum-multicall/types'

import {
  arbitrumMainChainId,
  celoMainChainId,
  energiMainChainId,
} from '../../chains/chainIds'

export class MOBIToken {
  private static commonProps: Omit<
    Token,
    'chainId' | 'contractAddress' | 'standard'
  > = {
    name: 'Mobius DAO Token',
    symbol: 'MOBI',
    decimals: 18,
    color: 'rgb(72, 225, 154)',
  }

  public static CELO = {
    MAINNET: (): Token => {
      return {
        ...MOBIToken.commonProps,
        chainId: celoMainChainId,
        contractAddress: '0x73a210637f6F6B7005512677Ba6B3C96bb4AA44B',
        standard: 'ERC20',
      }
    },
  }

  public static getTokenForChainId(chainId: ChainId): Token | undefined {
    switch (chainId) {
      case arbitrumMainChainId:
        return MOBIToken.CELO.MAINNET()
      case energiMainChainId:
      default:
        return undefined
    }
  }
}
