import { energiMainChainId, energiTestChainId } from '@chain-toolkit/chains'
import type { ChainId } from '@chain-toolkit/schemas'
import type { Token } from '@dex-toolkit/types'

import { WNRGToken } from './wnrg.token'
import { transformWrappedAddressToCoinAddress } from '../../utils/address.utils'
import { getImageUrlForToken } from '../logo-urls/logo-urls'

export class NRGToken {
  private static commonProps: Omit<
    Token,
    'chainId' | 'contractAddress' | 'standard'
  > = {
    name: 'Energi',
    symbol: 'NRG',
    decimals: 18,
    color: 'rgb(0, 231, 119)',
  }

  public static ENERGI = {
    MAINNET: (): Token => {
      return {
        ...NRGToken.commonProps,
        chainId: energiMainChainId,
        name: 'NRG',
        contractAddress: transformWrappedAddressToCoinAddress(
          WNRGToken.ENERGI.MAINNET().contractAddress,
        ),
        standard: 'ERC20',
        logoUri: getImageUrlForToken({
          tokenContractChainId: energiMainChainId,
        }),
      }
    },
    TESTNET: (): Token => {
      return {
        ...NRGToken.commonProps,
        chainId: energiTestChainId,
        contractAddress: transformWrappedAddressToCoinAddress(
          WNRGToken.ENERGI.TESTNET().contractAddress,
        ),
        standard: 'ERC20',
        logoUri: getImageUrlForToken({
          tokenContractChainId: energiTestChainId,
        }),
      }
    },
  }

  public static getTokenForChainId(chainId: ChainId): Token | undefined {
    switch (chainId) {
      case energiMainChainId:
        return NRGToken.ENERGI.MAINNET()
      case energiTestChainId:
        return NRGToken.ENERGI.TESTNET()
      default:
        return undefined
    }
  }
}
