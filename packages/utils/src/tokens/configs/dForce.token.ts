import type { Token } from '@dex-toolkit/types'
import type { ChainId } from '@ethereum-multicall/types'

import {
  arbitrumMainChainId,
  bscMainChainId,
  energiMainChainId,
  ethMainChainId,
} from '../../chains/chainIds'
import { getImageUrlForToken } from '../logo-urls/logo-urls'

export class DFORCEToken {
  private static commonProps: Omit<
    Token,
    'chainId' | 'contractAddress' | 'standard'
  > = {
    name: 'dForce',
    symbol: 'DF',
    decimals: 18,
    color: 'rgb(211, 168, 96)',
  }

  public static ARBITRUM = {
    MAINNET: (): Token => {
      return {
        ...DFORCEToken.commonProps,
        chainId: arbitrumMainChainId,
        contractAddress: '0xaE6aab43C4f3E0cea4Ab83752C278f8dEbabA689',
        standard: 'ERC20',
        logoUri: getImageUrlForToken({
          tokenContractAddress: '0xaE6aab43C4f3E0cea4Ab83752C278f8dEbabA689',
          tokenContractChainId: arbitrumMainChainId,
        }),
      }
    },
  }

  public static BNB = {
    MAINNET: (): Token => {
      return {
        ...DFORCEToken.commonProps,
        chainId: bscMainChainId,
        contractAddress: '0x4A9A2b2b04549C3927dd2c9668A5eF3fCA473623',
        standard: 'ERC20',
        logoUri: getImageUrlForToken({
          tokenContractAddress: '0x4A9A2b2b04549C3927dd2c9668A5eF3fCA473623',
          tokenContractChainId: bscMainChainId,
        }),
      }
    },
  }

  public static ENERGI = {
    MAINNET: (): Token => {
      return {
        ...DFORCEToken.commonProps,
        chainId: energiMainChainId,
        name: 'dForce Token',
        contractAddress: '0x94ba03615D0cbFC549a1480cAb65C9162f6bF2B1',
        standard: 'ERC20',
        logoUri: getImageUrlForToken({
          tokenContractAddress: '0x94ba03615D0cbFC549a1480cAb65C9162f6bF2B1',
          tokenContractChainId: energiMainChainId,
        }),
      }
    },
  }

  public static ETH = {
    MAINNET: (): Token => {
      return {
        ...DFORCEToken.commonProps,
        chainId: ethMainChainId,
        contractAddress: '0x431ad2ff6a9C365805eBaD47Ee021148d6f7DBe0',
        standard: 'ERC20',
        logoUri: getImageUrlForToken({
          tokenContractAddress: '0x431ad2ff6a9C365805eBaD47Ee021148d6f7DBe0',
          tokenContractChainId: ethMainChainId,
        }),
      }
    },
  }

  public static getTokenForChainId(chainId: ChainId): Token | undefined {
    switch (chainId) {
      case arbitrumMainChainId:
        return DFORCEToken.ARBITRUM.MAINNET()
      case bscMainChainId:
        return DFORCEToken.BNB.MAINNET()
      case energiMainChainId:
        return DFORCEToken.ENERGI.MAINNET()
      case ethMainChainId:
        return DFORCEToken.ETH.MAINNET()
      default:
        return undefined
    }
  }
}
