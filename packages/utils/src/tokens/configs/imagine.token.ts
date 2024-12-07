import type { Token } from '@dex-toolkit/types'
import type { ChainId } from '@ethereum-multicall/types'

import { zoraMainChainId } from '../../chains/chainIds'
import { getImageUrlForToken } from '../logo-urls/logo-urls'

export class IMAGINEToken {
  private static commonProps: Omit<
    Token,
    'chainId' | 'contractAddress' | 'standard'
  > = {
    name: 'Imagine',
    symbol: 'Imagine',
    decimals: 18,
    color: 'rgb(11, 2, 245)',
  }

  public static ZORA = {
    MAINNET: (): Token => {
      return {
        ...IMAGINEToken.commonProps,
        chainId: zoraMainChainId,
        contractAddress: '0x078540eECC8b6d89949c9C7d5e8E91eAb64f6696',
        standard: 'ERC20',
        logoUri: getImageUrlForToken({
          tokenContractAddress: '0x078540eECC8b6d89949c9C7d5e8E91eAb64f6696',
          tokenContractChainId: zoraMainChainId,
        }),
      }
    },
  }

  public static getTokenForChainId(chainId: ChainId): Token | undefined {
    switch (chainId) {
      case zoraMainChainId:
        return IMAGINEToken.ZORA.MAINNET()
      default:
        return undefined
    }
  }
}
