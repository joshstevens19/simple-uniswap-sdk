import {
  arbitrumMainChainId,
  avaxMainChainId,
  bscMainChainId,
  energiMainChainId,
  ethMainChainId,
  ethSepoliaChainId,
  optimismMainChainId,
  plsMainChainId,
  plsTestChainId,
  polygonMainChainId,
} from '@chain-toolkit/chains'
import type { ChainId } from '@chain-toolkit/schemas'
import type { Token } from '@dex-toolkit/types'

import { getImageUrlForToken } from '../logo-urls/logo-urls'

export class UNIToken {
  private static commonProps: Omit<
    Token,
    'chainId' | 'contractAddress' | 'standard'
  > = {
    name: 'Uniswap',
    symbol: 'UNI',
    decimals: 18,
    color: 'rgb(247, 30, 185)',
  }

  public static ARBITRUM = {
    MAINNET: (): Token => {
      return {
        ...UNIToken.commonProps,
        chainId: arbitrumMainChainId,
        contractAddress: '0xFa7F8980b0f1E64A2062791cc3b0871572f1F7f0',
        standard: 'ERC20',
        logoUri: getImageUrlForToken({
          tokenContractAddress: '0xFa7F8980b0f1E64A2062791cc3b0871572f1F7f0',
          tokenContractChainId: arbitrumMainChainId,
        }),
      }
    },
  }

  public static AVALANCHE = {
    MAINNET: (): Token => {
      return {
        ...UNIToken.commonProps,
        chainId: avaxMainChainId,
        symbol: 'UNI.e',
        contractAddress: '0x8eBAf22B6F053dFFeaf46f4Dd9eFA95D89ba8580',
        standard: 'ERC20',
        logoUri: getImageUrlForToken({
          tokenContractAddress: '0x8eBAf22B6F053dFFeaf46f4Dd9eFA95D89ba8580',
          tokenContractChainId: avaxMainChainId,
        }),
      }
    },
  }

  public static BSC = {
    MAINNET: (): Token => {
      return {
        ...UNIToken.commonProps,
        chainId: bscMainChainId,
        contractAddress: '0xBf5140A22578168FD562DCcF235E5D43A02ce9B1',
        standard: 'BEP20',
        logoUri: getImageUrlForToken({
          tokenContractAddress: '0xBf5140A22578168FD562DCcF235E5D43A02ce9B1',
          tokenContractChainId: bscMainChainId,
        }),
      }
    },
  }

  public static ENERGI = {
    MAINNET: (): Token => {
      return {
        ...UNIToken.commonProps,
        chainId: energiMainChainId,
        contractAddress: '0x665B3A802979eC24e076c80025bFF33c18eB6007',
        standard: 'ERC20',
        logoUri: getImageUrlForToken({
          tokenContractAddress: '0x665B3A802979eC24e076c80025bFF33c18eB6007',
          tokenContractChainId: energiMainChainId,
        }),
      }
    },
  }

  public static ETH = {
    MAINNET: (): Token => {
      return {
        ...UNIToken.commonProps,
        chainId: ethMainChainId,
        contractAddress: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
        standard: 'ERC20',
        logoUri: getImageUrlForToken({
          tokenContractAddress: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
          tokenContractChainId: ethMainChainId,
        }),
      }
    },
    SEPOLIA: (): Token => {
      return {
        ...UNIToken.commonProps,
        chainId: ethSepoliaChainId,
        contractAddress: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
        standard: 'ERC20',
        logoUri: getImageUrlForToken({
          tokenContractAddress: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
          tokenContractChainId: ethSepoliaChainId,
        }),
      }
    },
  }

  public static OPTIMISM = {
    MAINNET: (): Token => {
      return {
        ...UNIToken.commonProps,
        chainId: optimismMainChainId,
        contractAddress: '0x6fd9d7AD17242c41f7131d257212c54A0e816691',
        standard: 'ERC20',
        logoUri: getImageUrlForToken({
          tokenContractAddress: '0x6fd9d7AD17242c41f7131d257212c54A0e816691',
          tokenContractChainId: optimismMainChainId,
        }),
      }
    },
  }

  public static POLYGON = {
    MAINNET: (): Token => {
      return {
        ...UNIToken.commonProps,
        chainId: polygonMainChainId,
        name: 'Uniswap (PoS)',
        contractAddress: '0xb33EaAd8d922B1083446DC23f610c2567fB5180f',
        standard: 'ERC20',
        logoUri: getImageUrlForToken({
          tokenContractAddress: '0xb33EaAd8d922B1083446DC23f610c2567fB5180f',
          tokenContractChainId: polygonMainChainId,
        }),
      }
    },
  }

  public static PULSE = {
    MAINNET: (): Token => {
      return {
        ...UNIToken.commonProps,
        name: 'Uniswap',
        chainId: plsMainChainId,
        contractAddress: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
        standard: 'PRC20',
        logoUri: getImageUrlForToken({
          tokenContractAddress: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
          tokenContractChainId: plsMainChainId,
        }),
      }
    },
    TESTNET: (): Token => {
      return {
        ...UNIToken.commonProps,
        name: 'Uniswap',
        chainId: plsTestChainId,
        contractAddress: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
        standard: 'PRC20',
        logoUri: getImageUrlForToken({
          tokenContractAddress: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
          tokenContractChainId: plsTestChainId,
        }),
      }
    },
  }

  public static getTokenForChainId(chainId: ChainId): Token | undefined {
    switch (chainId) {
      case arbitrumMainChainId:
        return UNIToken.ARBITRUM.MAINNET()
      case avaxMainChainId:
        return UNIToken.AVALANCHE.MAINNET()
      case bscMainChainId:
        return UNIToken.BSC.MAINNET()
      case energiMainChainId:
        return UNIToken.ENERGI.MAINNET()
      case ethMainChainId:
        return UNIToken.ETH.MAINNET()
      case ethSepoliaChainId:
        return UNIToken.ETH.SEPOLIA()
      case optimismMainChainId:
        return UNIToken.OPTIMISM.MAINNET()
      case polygonMainChainId:
        return UNIToken.POLYGON.MAINNET()
      case plsMainChainId:
        return UNIToken.PULSE.MAINNET()
      case plsTestChainId:
        return UNIToken.PULSE.TESTNET()
      default:
        return undefined
    }
  }
}
