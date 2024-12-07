import type { Token } from '@dex-toolkit/types'
import type { ChainId } from '@ethereum-multicall/types'

import { bscMainChainId, bscTestChainId } from '../../chains/chainIds'
import { getImageUrlForToken } from '../logo-urls/logo-urls'

export class WBNBToken {
  private static commonProps: Omit<
    Token,
    'chainId' | 'contractAddress' | 'standard'
  > = {
    name: 'Wrapped BNB',
    symbol: 'WBNB',
    decimals: 18,
    color: 'rgb(234, 183, 40)',
  }

  public static BSC = {
    MAINNET: (): Token => {
      return {
        ...WBNBToken.commonProps,
        chainId: bscMainChainId,
        contractAddress: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
        standard: 'BEP20',
        logoUri: getImageUrlForToken({
          tokenContractAddress: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
          tokenContractChainId: bscMainChainId,
        }),
      }
    },
    TESTNET: (): Token => {
      return {
        ...WBNBToken.commonProps,
        chainId: bscTestChainId,
        contractAddress: '0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd',
        standard: 'BEP20',
        logoUri: getImageUrlForToken({
          tokenContractAddress: '0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd',
          tokenContractChainId: bscTestChainId,
        }),
      }
    },
  }

  public static getTokenForChainId(chainId: ChainId): Token | undefined {
    switch (chainId) {
      case bscMainChainId:
        return WBNBToken.BSC.MAINNET()
      case bscTestChainId:
        return WBNBToken.BSC.TESTNET()
      default:
        return undefined
    }
  }
}
