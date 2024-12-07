import type { Token } from '@dex-toolkit/types'
import type { ChainId } from '@ethereum-multicall/types'

import { blastMainChainId, ethMainChainId } from '../../chains/chainIds'
import { getImageUrlForToken } from '../logo-urls/logo-urls'

export class ESEToken {
  private static commonProps: Omit<
    Token,
    'chainId' | 'contractAddress' | 'standard'
  > = {
    name: 'eesee',
    symbol: 'ESE',
    decimals: 18,
    color: 'rgb(177, 234, 4)',
  }

  public static BLAST = {
    MAINNET: (): Token => {
      return {
        ...ESEToken.commonProps,
        chainId: blastMainChainId,
        contractAddress: '0x491e6DE43b55c8EAE702EDC263E32339da42f58c',
        standard: 'ERC20',
        logoUri: getImageUrlForToken({
          tokenContractAddress: '0x491e6DE43b55c8EAE702EDC263E32339da42f58c',
          tokenContractChainId: blastMainChainId,
        }),
      }
    },
  }

  public static ETH = {
    MAINNET: (): Token => {
      return {
        ...ESEToken.commonProps,
        chainId: ethMainChainId,
        contractAddress: '0x908dDb096BFb3AcB19e2280aAD858186ea4935C4',
        standard: 'ERC20',
        logoUri: getImageUrlForToken({
          tokenContractAddress: '0x908dDb096BFb3AcB19e2280aAD858186ea4935C4',
          tokenContractChainId: ethMainChainId,
        }),
      }
    },
  }

  public static getTokenForChainId(chainId: ChainId): Token | undefined {
    switch (chainId) {
      case blastMainChainId:
        return ESEToken.BLAST.MAINNET()
      case ethMainChainId:
        return ESEToken.ETH.MAINNET()
      default:
        return undefined
    }
  }
}
