import type { Token } from '@dex-toolkit/types'
import type { ChainId } from '@ethereum-multicall/types'

import {
  arbitrumMainChainId,
  avaxMainChainId,
  bscMainChainId,
} from '../../chains/chainIds'
import { getImageUrlForToken } from '../logo-urls/logo-urls'

export class JOEToken {
  private static commonProps: Omit<
    Token,
    'chainId' | 'contractAddress' | 'standard'
  > = {
    name: 'JoeToken',
    symbol: 'JOE',
    decimals: 18,
    color: 'rgb(242, 113, 106)',
  }

  public static ARBITRUM = {
    MAINNET: (): Token => {
      return {
        ...JOEToken.commonProps,
        chainId: arbitrumMainChainId,
        contractAddress: '0x371c7ec6D8039ff7933a2AA28EB827Ffe1F52f07',
        standard: 'ERC20',
        logoUri: getImageUrlForToken({
          tokenContractAddress: '0x371c7ec6D8039ff7933a2AA28EB827Ffe1F52f07',
          tokenContractChainId: arbitrumMainChainId,
        }),
      }
    },
  }

  public static AVALANCHE = {
    MAINNET: (): Token => {
      return {
        ...JOEToken.commonProps,
        chainId: avaxMainChainId,
        contractAddress: '0x6e84a6216eA6dACC71eE8E6b0a5B7322EEbC0fDd',
        standard: 'ERC20',
        logoUri: getImageUrlForToken({
          tokenContractAddress: '0x6e84a6216eA6dACC71eE8E6b0a5B7322EEbC0fDd',
          tokenContractChainId: avaxMainChainId,
        }),
      }
    },
  }

  public static BSC = {
    MAINNET: (): Token => {
      return {
        ...JOEToken.commonProps,
        chainId: bscMainChainId,
        contractAddress: '0x371c7ec6D8039ff7933a2AA28EB827Ffe1F52f07',
        standard: 'BEP20',
        logoUri: getImageUrlForToken({
          tokenContractAddress: '0x371c7ec6D8039ff7933a2AA28EB827Ffe1F52f07',
          tokenContractChainId: bscMainChainId,
        }),
      }
    },
  }

  public static getTokenForChainId(chainId: ChainId): Token | undefined {
    switch (chainId) {
      case arbitrumMainChainId:
        return JOEToken.ARBITRUM.MAINNET()
      case avaxMainChainId:
        return JOEToken.AVALANCHE.MAINNET()
      case bscMainChainId:
        return JOEToken.BSC.MAINNET()
      default:
        return undefined
    }
  }
}
