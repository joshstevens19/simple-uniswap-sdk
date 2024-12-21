import {
  arbitrumMainChainId,
  baseMainChainId,
  ethMainChainId,
  optimismMainChainId,
  polygonMainChainId,
  avaxMainChainId,
  bscMainChainId,
} from '@chain-toolkit/chains'
import type { ChainId } from '@chain-toolkit/schemas'
import type { Token } from '@dex-toolkit/types'

import { getImageUrlForToken } from '../logo-urls/logo-urls'

export class ZROToken {
  private static commonProps: Omit<
    Token,
    'chainId' | 'contractAddress' | 'standard'
  > = {
    name: 'LayerZero',
    symbol: 'ZRO',
    decimals: 18,
    logoUri: getImageUrlForToken({
      tokenContractAddress: '0x6985884C4392D348587B19cb9eAAf157F13271cd',
      tokenContractChainId: ethMainChainId,
    }),
    color: 'rgb(0, 0, 0)',
  }

  public static ARBITRUM = {
    MAINNET: (): Token => {
      return {
        ...ZROToken.commonProps,
        chainId: arbitrumMainChainId,
        contractAddress: '0x6985884C4392D348587B19cb9eAAf157F13271cd',
        standard: 'ERC20',
      }
    },
  }

  public static AVALANCHE = {
    MAINNET: (): Token => {
      return {
        ...ZROToken.commonProps,
        chainId: avaxMainChainId,
        contractAddress: '0x6985884C4392D348587B19cb9eAAf157F13271cd',
        standard: 'ERC20',
      }
    },
  }

  public static BASE = {
    MAINNET: (): Token => {
      return {
        ...ZROToken.commonProps,
        chainId: baseMainChainId,
        contractAddress: '0x6985884C4392D348587B19cb9eAAf157F13271cd',
        standard: 'ERC20',
      }
    },
  }

  public static BSC = {
    MAINNET: (): Token => {
      return {
        ...ZROToken.commonProps,
        chainId: bscMainChainId,
        contractAddress: '0x6985884C4392D348587B19cb9eAAf157F13271cd',
        standard: 'BEP20',
      }
    },
  }

  public static ETH = {
    MAINNET: (): Token => {
      return {
        ...ZROToken.commonProps,
        chainId: ethMainChainId,
        contractAddress: '0x6985884C4392D348587B19cb9eAAf157F13271cd',
        standard: 'ERC20',
      }
    },
  }

  public static OPTIMISM = {
    MAINNET: (): Token => {
      return {
        ...ZROToken.commonProps,
        chainId: optimismMainChainId,
        contractAddress: '0x6985884C4392D348587B19cb9eAAf157F13271cd',
        standard: 'ERC20',
      }
    },
  }

  public static POLYGON = {
    MAINNET: (): Token => {
      return {
        ...ZROToken.commonProps,
        chainId: polygonMainChainId,
        contractAddress: '0x6985884C4392D348587B19cb9eAAf157F13271cd',
        standard: 'ERC20',
      }
    },
  }

  public static getTokenForChainId(chainId: ChainId): Token | undefined {
    switch (chainId) {
      case arbitrumMainChainId:
        return ZROToken.ARBITRUM.MAINNET()

      case avaxMainChainId:
        return ZROToken.AVALANCHE.MAINNET()

      case baseMainChainId:
        return ZROToken.BASE.MAINNET()

      case bscMainChainId:
        return ZROToken.BSC.MAINNET()

      case ethMainChainId:
        return ZROToken.ETH.MAINNET()

      case optimismMainChainId:
        return ZROToken.OPTIMISM.MAINNET()

      case polygonMainChainId:
        return ZROToken.POLYGON.MAINNET()

      default:
        return undefined
    }
  }
}
