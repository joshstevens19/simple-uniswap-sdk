import type { Token } from '@dex-toolkit/types'
import type { ChainId } from '@multicall-toolkit/types'

import {
  ethMainChainId,
  plsMainChainId,
  plsTestChainId,
} from '../../chains/chainIds'
import { getImageUrlForToken } from '../logo-urls/logo-urls'

export class BIDToken {
  private static commonProps: Omit<
    Token,
    'chainId' | 'contractAddress' | 'standard'
  > = {
    name: 'DefiBids',
    symbol: 'BID',
    decimals: 18,
    color: 'rgb(3, 151, 201)',
    hasFeeOnTransfer: true,
  }

  public static ETH = {
    MAINNET: (): Token => {
      return {
        ...BIDToken.commonProps,
        chainId: ethMainChainId,
        contractAddress: '0x1dA01e84F3d4e6716F274c987Ae4bEE5DC3C8288',
        standard: 'ERC20',
        logoUri: getImageUrlForToken({
          tokenContractAddress: '0x1dA01e84F3d4e6716F274c987Ae4bEE5DC3C8288',
          tokenContractChainId: ethMainChainId,
        }),
      }
    },
  }

  public static PULSE = {
    MAINNET: (): Token => {
      return {
        ...BIDToken.commonProps,
        chainId: plsMainChainId,
        contractAddress: '0x1dA01e84F3d4e6716F274c987Ae4bEE5DC3C8288',
        standard: 'PRC20',
        logoUri: getImageUrlForToken({
          tokenContractAddress: '0x1dA01e84F3d4e6716F274c987Ae4bEE5DC3C8288',
          tokenContractChainId: plsMainChainId,
        }),
      }
    },
    TESTNET: (): Token => {
      return {
        ...BIDToken.commonProps,
        chainId: plsTestChainId,
        contractAddress: '0x1dA01e84F3d4e6716F274c987Ae4bEE5DC3C8288',
        standard: 'PRC20',
        logoUri: getImageUrlForToken({
          tokenContractAddress: '0x1dA01e84F3d4e6716F274c987Ae4bEE5DC3C8288',
          tokenContractChainId: plsTestChainId,
        }),
      }
    },
  }

  public static getTokenForChainId(chainId: ChainId): Token | undefined {
    switch (chainId) {
      case ethMainChainId:
        return BIDToken.ETH.MAINNET()
      case plsMainChainId:
        return BIDToken.PULSE.MAINNET()
      case plsTestChainId:
        return BIDToken.PULSE.TESTNET()
      default:
        return undefined
    }
  }
}
