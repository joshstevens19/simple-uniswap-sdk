import { avaxFujiChainId, avaxMainChainId } from '@chain-toolkit/chains'
import type { ChainId } from '@chain-toolkit/schemas'
import type { Token } from '@dex-toolkit/types'

import { WAVAXToken } from './wavax.token'
import { transformWrappedAddressToCoinAddress } from '../../utils/address.utils'
import { getImageUrlForToken } from '../logo-urls/logo-urls'

export class AVAXToken {
  private static commonProps: Omit<
    Token,
    'chainId' | 'contractAddress' | 'standard'
  > = {
    name: 'AVAX',
    symbol: 'AVAX',
    decimals: 18,
    color: 'rgb(124, 124, 131)',
  }

  public static AVALANCHE = {
    MAINNET: (): Token => {
      return {
        ...AVAXToken.commonProps,
        chainId: avaxMainChainId,
        contractAddress: transformWrappedAddressToCoinAddress(
          WAVAXToken.AVALANCHE.MAINNET().contractAddress,
        ),
        standard: 'ERC20',
        logoUri: getImageUrlForToken({
          tokenContractAddress: transformWrappedAddressToCoinAddress(
            WAVAXToken.AVALANCHE.MAINNET().contractAddress,
          ),
          tokenContractChainId: avaxMainChainId,
        }),
      }
    },
    FUJI: (): Token => {
      return {
        ...AVAXToken.commonProps,
        chainId: avaxFujiChainId,
        contractAddress: transformWrappedAddressToCoinAddress(
          WAVAXToken.AVALANCHE.FUJI().contractAddress,
        ),
        standard: 'ERC20',
        logoUri: getImageUrlForToken({
          tokenContractAddress: transformWrappedAddressToCoinAddress(
            WAVAXToken.AVALANCHE.FUJI().contractAddress,
          ),
          tokenContractChainId: avaxFujiChainId,
        }),
      }
    },
  }

  public static getTokenForChainId(chainId: ChainId): Token | undefined {
    switch (chainId) {
      case avaxMainChainId:
        return AVAXToken.AVALANCHE.MAINNET()
      case avaxFujiChainId:
        return AVAXToken.AVALANCHE.FUJI()
      default:
        return undefined
    }
  }
}
