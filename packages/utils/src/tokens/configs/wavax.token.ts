import type { Token } from '@dex-toolkit/types'
import type { ChainId } from '@multicall-toolkit/types'

import { avaxFujiChainId, avaxMainChainId } from '../../chains/chainIds'
import { getImageUrlForToken } from '../logo-urls/logo-urls'

export class WAVAXToken {
  private static commonProps: Omit<
    Token,
    'chainId' | 'contractAddress' | 'standard'
  > = {
    name: 'Wrapped AVAX',
    symbol: 'WAVAX',
    decimals: 18,
    color: 'rgb(236, 67, 67)',
  }

  public static AVALANCHE = {
    MAINNET: (): Token => {
      return {
        ...WAVAXToken.commonProps,
        chainId: avaxMainChainId,
        contractAddress: '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7',
        standard: 'ERC20',
        logoUri: getImageUrlForToken({
          tokenContractAddress: '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7',
          tokenContractChainId: avaxMainChainId,
        }),
      }
    },
    FUJI: (): Token => {
      return {
        ...WAVAXToken.commonProps,
        chainId: avaxFujiChainId,
        contractAddress: '0xd00ae08403B9bbb9124bB305C09058E32C39A48c',
        standard: 'ERC20',
        logoUri: getImageUrlForToken({
          tokenContractAddress: '0xd00ae08403B9bbb9124bB305C09058E32C39A48c',
          tokenContractChainId: avaxFujiChainId,
        }),
      }
    },
  }

  public static getTokenForChainId(chainId: ChainId): Token | undefined {
    switch (chainId) {
      case avaxMainChainId:
        return WAVAXToken.AVALANCHE.MAINNET()
      case avaxFujiChainId:
        return WAVAXToken.AVALANCHE.FUJI()
      default:
        return undefined
    }
  }
}
