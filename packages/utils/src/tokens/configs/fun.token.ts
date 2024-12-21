import {
  ethMainChainId,
  energiMainChainId,
  plsMainChainId,
  plsTestChainId,
} from '@chain-toolkit/chains'
import type { ChainId } from '@chain-toolkit/schemas'
import type { Token } from '@dex-toolkit/types'

import { getImageUrlForToken } from '../logo-urls/logo-urls'

export class FUNToken {
  private static commonProps: Omit<
    Token,
    'chainId' | 'contractAddress' | 'standard'
  > = {
    name: 'FunFair',
    symbol: 'FUN',
    decimals: 8,
    color: 'rgb(236, 25, 102)',
  }

  public static ETH = {
    MAINNET: (): Token => {
      return {
        ...FUNToken.commonProps,
        chainId: ethMainChainId,
        contractAddress: '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
        standard: 'ERC20',
        logoUri: getImageUrlForToken({
          tokenContractAddress: '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
          tokenContractChainId: ethMainChainId,
        }),
      }
    },
  }

  public static ENERGI = {
    MAINNET: (): Token => {
      return {
        ...FUNToken.commonProps,
        chainId: energiMainChainId,
        contractAddress: '0x04cd06cf05b816F09395375f0143584B4A95eA9f',
        standard: 'ERC20',
        logoUri: getImageUrlForToken({
          tokenContractAddress: '0x04cd06cf05b816F09395375f0143584B4A95eA9f',
          tokenContractChainId: energiMainChainId,
        }),
      }
    },
  }

  public static PULSE = {
    MAINNET: (): Token => {
      return {
        ...FUNToken.commonProps,
        chainId: plsMainChainId,
        contractAddress: '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
        standard: 'PRC20',
        logoUri: getImageUrlForToken({
          tokenContractAddress: '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
          tokenContractChainId: plsMainChainId,
        }),
      }
    },
    TESTNET: (): Token => {
      return {
        ...FUNToken.commonProps,
        chainId: plsTestChainId,
        contractAddress: '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
        standard: 'PRC20',
        logoUri: getImageUrlForToken({
          tokenContractAddress: '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
          tokenContractChainId: plsTestChainId,
        }),
      }
    },
  }

  public static getTokenForChainId(chainId: ChainId): Token | undefined {
    switch (chainId) {
      case ethMainChainId:
        return FUNToken.ETH.MAINNET()
      case energiMainChainId:
        return FUNToken.ENERGI.MAINNET()
      case plsMainChainId:
        return FUNToken.PULSE.MAINNET()
      case plsTestChainId:
        return FUNToken.PULSE.TESTNET()
      default:
        return undefined
    }
  }
}
