import type { Token } from '@dex-toolkit/types'
import type { ChainId } from '@ethereum-multicall/types'

import { WBNBToken } from './wbnb.token'
import { bscMainChainId, bscTestChainId } from '../../chains/chainIds'
import { transformWrappedAddressToCoinAddress } from '../../utils/address.utils'
import { getImageUrlForToken } from '../logo-urls/logo-urls'

export class BNBToken {
  private static commonProps: Omit<
    Token,
    'chainId' | 'contractAddress' | 'standard'
  > = {
    name: 'BNB',
    symbol: 'BNB',
    decimals: 18,
    color: 'rgb(234, 183, 40)',
  }

  public static BSC = {
    MAINNET: (): Token => {
      return {
        ...BNBToken.commonProps,
        chainId: bscMainChainId,
        contractAddress: transformWrappedAddressToCoinAddress(
          WBNBToken.BSC.MAINNET().contractAddress,
        ),
        standard: 'BEP20',
        logoUri: getImageUrlForToken({
          tokenContractAddress: transformWrappedAddressToCoinAddress(
            WBNBToken.BSC.MAINNET().contractAddress,
          ),
          tokenContractChainId: bscMainChainId,
        }),
      }
    },
    TESTNET: (): Token => {
      return {
        ...BNBToken.commonProps,
        chainId: bscTestChainId,
        contractAddress: transformWrappedAddressToCoinAddress(
          WBNBToken.BSC.TESTNET().contractAddress,
        ),
        standard: 'BEP20',
        logoUri: getImageUrlForToken({
          tokenContractChainId: bscTestChainId,
        }),
      }
    },
  }

  public static getTokenForChainId(chainId: ChainId): Token | undefined {
    switch (chainId) {
      case bscMainChainId:
        return BNBToken.BSC.MAINNET()
      case bscTestChainId:
        return BNBToken.BSC.TESTNET()
      default:
        return undefined
    }
  }
}
