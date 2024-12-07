import type { Token } from '@dex-toolkit/types'
import type { ChainId } from '@ethereum-multicall/types'

import {
  avaxMainChainId,
  energiMainChainId,
  ethMainChainId,
  plsMainChainId,
  plsTestChainId,
  polygonMainChainId,
} from '../../chains/chainIds'
import { getImageUrlForToken } from '../logo-urls/logo-urls'

export class MKRToken {
  private static commonProps: Omit<
    Token,
    'chainId' | 'contractAddress' | 'standard'
  > = {
    name: 'MKR token',
    symbol: 'MKR',
    decimals: 18,
    color: 'rgb(47, 179, 164)',
  }

  public static AVALANCHE = {
    MAINNET: (): Token => {
      return {
        ...MKRToken.commonProps,
        chainId: avaxMainChainId,
        name: 'Maker',
        symbol: 'MKR.e',
        contractAddress: '0x88128fd4b259552A9A1D457f435a6527AAb72d42',
        standard: 'ERC20',
        logoUri: getImageUrlForToken({
          tokenContractAddress: '0x88128fd4b259552A9A1D457f435a6527AAb72d42',
          tokenContractChainId: avaxMainChainId,
        }),
      }
    },
  }

  public static ENERGI = {
    MAINNET: (): Token => {
      return {
        ...MKRToken.commonProps,
        chainId: energiMainChainId,
        name: 'Maker',
        contractAddress: '0x050317d93f29D1bA5FF3EaC3b8157fD4E345588D',
        standard: 'ERC20',
        logoUri: getImageUrlForToken({
          tokenContractAddress: '0x050317d93f29D1bA5FF3EaC3b8157fD4E345588D',
          tokenContractChainId: energiMainChainId,
        }),
      }
    },
  }

  public static ETH = {
    MAINNET: (): Token => {
      return {
        ...MKRToken.commonProps,
        chainId: ethMainChainId,
        name: 'Maker',
        contractAddress: '0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2',
        standard: 'ERC20',
        logoUri: getImageUrlForToken({
          tokenContractAddress: '0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2',
          tokenContractChainId: ethMainChainId,
        }),
      }
    },
  }

  public static POLYGON = {
    MAINNET: (): Token => {
      return {
        ...MKRToken.commonProps,
        chainId: polygonMainChainId,
        name: 'MAKER (PoS)',
        contractAddress: '0x6f7C932e7684666C9fd1d44527765433e01fF61d',
        standard: 'ERC20',
        logoUri: getImageUrlForToken({
          tokenContractAddress: '0x6f7C932e7684666C9fd1d44527765433e01fF61d',
          tokenContractChainId: polygonMainChainId,
        }),
      }
    },
  }

  public static PULSE = {
    MAINNET: (): Token => {
      return {
        ...MKRToken.commonProps,
        chainId: plsMainChainId,
        name: 'Maker',
        contractAddress: '0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2',
        standard: 'PRC20',
        logoUri: getImageUrlForToken({
          tokenContractAddress: '0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2',
          tokenContractChainId: plsMainChainId,
        }),
      }
    },
    TESTNET: (): Token => {
      return {
        ...MKRToken.commonProps,
        chainId: plsTestChainId,
        name: 'Maker',
        contractAddress: '0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2',
        standard: 'PRC20',
        logoUri: getImageUrlForToken({
          tokenContractAddress: '0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2',
          tokenContractChainId: plsTestChainId,
        }),
      }
    },
  }

  public static getTokenForChainId(chainId: ChainId): Token | undefined {
    switch (chainId) {
      case avaxMainChainId:
        return MKRToken.AVALANCHE.MAINNET()
      case energiMainChainId:
        return MKRToken.ENERGI.MAINNET()
      case ethMainChainId:
        return MKRToken.ETH.MAINNET()
      case polygonMainChainId:
        return MKRToken.POLYGON.MAINNET()
      case plsMainChainId:
        return MKRToken.PULSE.MAINNET()
      case plsTestChainId:
        return MKRToken.PULSE.TESTNET()
      default:
        return undefined
    }
  }
}
