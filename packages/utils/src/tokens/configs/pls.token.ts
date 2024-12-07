import type { Token } from '@dex-toolkit/types'
import type { ChainId } from '@ethereum-multicall/types'

import { WPLSToken } from './wpls.token'
import { plsMainChainId, plsTestChainId } from '../../chains/chainIds'
import { transformWrappedAddressToCoinAddress } from '../../utils/address.utils'
import { getImageUrlForToken } from '../logo-urls/logo-urls'

export class PLSCoin {
  private static commonProps: Omit<
    Token,
    'chainId' | 'contractAddress' | 'standard'
  > = {
    name: 'Pulse',
    symbol: 'PLS',
    decimals: 18,
    color: 'rgb(5, 185, 213)',
  }

  public static PULSE = {
    MAINNET: (): Token => {
      return {
        ...PLSCoin.commonProps,
        chainId: plsMainChainId,
        contractAddress: transformWrappedAddressToCoinAddress(
          WPLSToken.PULSE.MAINNET().contractAddress,
        ),
        standard: 'PRC20',
        logoUri: getImageUrlForToken({
          tokenContractChainId: plsMainChainId,
        }),
      }
    },
    TESTNET: (): Token => {
      return {
        ...PLSCoin.commonProps,
        chainId: plsTestChainId,
        contractAddress: transformWrappedAddressToCoinAddress(
          WPLSToken.PULSE.TESTNET().contractAddress,
        ),
        standard: 'PRC20',
        logoUri: getImageUrlForToken({
          tokenContractChainId: plsTestChainId,
        }),
      }
    },
  }

  public static getTokenForChainId(chainId: ChainId): Token | undefined {
    switch (chainId) {
      case plsMainChainId:
        return PLSCoin.PULSE.MAINNET()
      case plsTestChainId:
        return PLSCoin.PULSE.TESTNET()
      default:
        return undefined
    }
  }
}
