import type { Token } from '@dex-toolkit/types'
import type { ChainId } from '@ethereum-multicall/types'

import { energiMainChainId, energiTestChainId } from '../../chains/chainIds'
import { getImageUrlForToken } from '../logo-urls/logo-urls'

export class WNRGToken {
  private static commonProps: Omit<
    Token,
    'chainId' | 'contractAddress' | 'standard'
  > = {
    name: 'Wrapped NRG',
    symbol: 'WNRG',
    decimals: 18,
    color: 'rgb(4, 230, 112)',
  }

  public static ENERGI = {
    MAINNET: (): Token => {
      return {
        ...WNRGToken.commonProps,
        chainId: energiMainChainId,
        contractAddress: '0xA55F26319462355474A9F2c8790860776a329aA4',
        standard: 'ERC20',
        logoUri: getImageUrlForToken({
          tokenContractAddress: '0xA55F26319462355474A9F2c8790860776a329aA4',
          tokenContractChainId: energiMainChainId,
        }),
      }
    },
    TESTNET: (): Token => {
      return {
        ...WNRGToken.commonProps,
        chainId: energiTestChainId,
        contractAddress: '0x184F7b12f29d675f34ff816528ADBfd0E0501Ad4',
        standard: 'ERC20',
        logoUri: getImageUrlForToken({
          tokenContractAddress: '0x184F7b12f29d675f34ff816528ADBfd0E0501Ad4',
          tokenContractChainId: energiTestChainId,
        }),
      }
    },
  }

  public static getTokenForChainId(chainId: ChainId): Token | undefined {
    switch (chainId) {
      case energiMainChainId:
        return WNRGToken.ENERGI.MAINNET()
      case energiTestChainId:
        return WNRGToken.ENERGI.TESTNET()
      default:
        return undefined
    }
  }
}
