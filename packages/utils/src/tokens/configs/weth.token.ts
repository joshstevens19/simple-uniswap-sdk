import {
  arbitrumMainChainId,
  arbitrumSepoliaChainId,
  baseMainChainId,
  baseSepoliaChainId,
  blastMainChainId,
  blastSepoliaChainId,
  celoAlfajoresChainId,
  celoMainChainId,
  ethMainChainId,
  ethSepoliaChainId,
  optimismSepoliaChainId,
  optimismMainChainId,
  plsMainChainId,
  plsTestChainId,
  polygonMainChainId,
  zksyncMainChainId,
  zksyncSepoliaChainId,
  zoraMainChainId,
  zoraSepoliaChainId,
  ethHoleskyChainId,
  zkEVMMainChainId,
  zkEVMCardonaChainId,
} from '@chain-toolkit/chains'
import type { ChainId } from '@chain-toolkit/schemas'
import type { Token } from '@dex-toolkit/types'

import { getImageUrlForToken } from '../logo-urls/logo-urls'

export class WETHToken {
  private static commonProps: Omit<
    Token,
    'chainId' | 'contractAddress' | 'standard'
  > = {
    name: 'Wrapped Ether',
    symbol: 'WETH',
    decimals: 18,
    logoUri: getImageUrlForToken({
      tokenContractAddress: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
      tokenContractChainId: ethMainChainId,
    }),
    color: 'rgb(235, 28, 121)',
  }

  public static ARBITRUM = {
    MAINNET: (): Token => {
      return {
        ...WETHToken.commonProps,
        chainId: arbitrumMainChainId,
        contractAddress: '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1',
        standard: 'ERC20',
      }
    },
    SEPOLIA: (): Token => {
      return {
        ...WETHToken.commonProps,
        chainId: arbitrumSepoliaChainId,
        name: 'Wrapped Ether (odex.fi)',
        contractAddress: '0xBffF34654C083C36c2FE8E18dCD654457d4B96BB',
        standard: 'ERC20',
      }
    },
  }

  public static BASE = {
    MAINNET: (): Token => {
      return {
        ...WETHToken.commonProps,
        chainId: baseMainChainId,
        contractAddress: '0x4200000000000000000000000000000000000006',
        standard: 'ERC20',
      }
    },
    SEPOLIA: (): Token => {
      return {
        ...WETHToken.commonProps,
        chainId: baseSepoliaChainId,
        contractAddress: '0x4200000000000000000000000000000000000006',
        standard: 'ERC20',
      }
    },
  }

  public static BLAST = {
    MAINNET: (): Token => {
      return {
        ...WETHToken.commonProps,
        chainId: blastMainChainId,
        contractAddress: '0x4300000000000000000000000000000000000004',
        standard: 'ERC20',
      }
    },
    SEPOLIA: (): Token => {
      return {
        ...WETHToken.commonProps,
        chainId: blastSepoliaChainId,
        contractAddress: '0x4200000000000000000000000000000000000023',
        standard: 'ERC20',
      }
    },
  }

  public static CELO = {
    MAINNET: (): Token => {
      return {
        ...WETHToken.commonProps,
        chainId: celoMainChainId,
        contractAddress: '0x66803FB87aBd4aaC3cbB3fAd7C3aa01f6F3FB207',
        standard: 'ERC20',
      }
    },
    ALFAJORES: (): Token => {
      return {
        ...WETHToken.commonProps,
        chainId: celoAlfajoresChainId,
        name: 'Celo native asset',
        symbol: 'CELO',
        contractAddress: '0xF194afDf50B03e69Bd7D057c1Aa9e10c9954E4C9',
        standard: 'ERC20',
      }
    },
  }

  public static ETH = {
    MAINNET: (): Token => {
      return {
        ...WETHToken.commonProps,
        chainId: ethMainChainId,
        contractAddress: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
        standard: 'ERC20',
      }
    },
    HOLESKY: (): Token => {
      return {
        ...WETHToken.commonProps,
        chainId: ethHoleskyChainId,
        contractAddress: '0x94373a4919B3240D86eA41593D5eBa789FEF3848',
        standard: 'ERC20',
      }
    },
    SEPOLIA: (): Token => {
      return {
        ...WETHToken.commonProps,
        chainId: ethSepoliaChainId,
        contractAddress: '0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14',
        standard: 'ERC20',
      }
    },
  }

  public static OPTIMISM = {
    MAINNET: (): Token => {
      return {
        ...WETHToken.commonProps,
        chainId: optimismMainChainId,
        contractAddress: '0x4200000000000000000000000000000000000006',
        standard: 'ERC20',
      }
    },
    SEPOLIA: (): Token => {
      return {
        ...WETHToken.commonProps,
        chainId: optimismSepoliaChainId,
        contractAddress: '0x4200000000000000000000000000000000000006',
        standard: 'ERC20',
      }
    },
  }

  public static POLYGON = {
    MAINNET: (): Token => {
      return {
        ...WETHToken.commonProps,
        chainId: polygonMainChainId,
        contractAddress: '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619',
        standard: 'ERC20',
      }
    },
  }

  public static ZKEVM = {
    MAINNET: (): Token => {
      return {
        ...WETHToken.commonProps,
        chainId: zkEVMMainChainId,
        contractAddress: '0x4F9A0e7FD2Bf6067db6994CF12E4495Df938E6e9',
        standard: 'ERC20',
      }
    },
    CARDONA: (): Token => {
      return {
        ...WETHToken.commonProps,
        chainId: zkEVMCardonaChainId,
        contractAddress: '0x28d0683Ae04aD3b78929f32DccE70001FA146689',
        standard: 'ERC20',
      }
    },
  }

  public static PULSE = {
    MAINNET: (): Token => {
      return {
        ...WETHToken.commonProps,
        chainId: plsMainChainId,
        name: 'Wrapped Ether from Ethereum',
        contractAddress: '0x02DcdD04e3F455D838cd1249292C58f3B79e3C3C', // from Ethereum
        standard: 'PRC20',
      }
    },
    TESTNET: (): Token => {
      return {
        ...WETHToken.commonProps,
        chainId: plsTestChainId,
        contractAddress: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
        standard: 'PRC20',
      }
    },
  }

  public static ZKSYNC = {
    MAINNET: (): Token => {
      return {
        ...WETHToken.commonProps,
        chainId: zksyncMainChainId,
        contractAddress: '0x5AEa5775959fBC2557Cc8789bC1bf90A239D9a91',
        standard: 'ERC20',
      }
    },
    SEPOLIA: (): Token => {
      return {
        ...WETHToken.commonProps,
        chainId: zksyncSepoliaChainId,
        name: 'Ether',
        symbol: 'ETH',
        contractAddress: '0x000000000000000000000000000000000000800A',
        standard: 'ERC20',
      }
    },
  }

  public static ZORA = {
    MAINNET: (): Token => {
      return {
        ...WETHToken.commonProps,
        chainId: zoraMainChainId,
        contractAddress: '0x4200000000000000000000000000000000000006',
        standard: 'ERC20',
      }
    },
    SEPOLIA: (): Token => {
      return {
        ...WETHToken.commonProps,
        chainId: zoraSepoliaChainId,
        contractAddress: '0x4200000000000000000000000000000000000006',
        standard: 'ERC20',
      }
    },
  }

  public static getTokenForChainId(chainId: ChainId): Token | undefined {
    switch (chainId) {
      case arbitrumMainChainId:
        return WETHToken.ARBITRUM.MAINNET()
      case arbitrumSepoliaChainId:
        return WETHToken.ARBITRUM.SEPOLIA()

      case baseMainChainId:
        return WETHToken.BASE.MAINNET()
      case baseSepoliaChainId:
        return WETHToken.BASE.SEPOLIA()

      case blastMainChainId:
        return WETHToken.BLAST.MAINNET()
      case blastSepoliaChainId:
        return WETHToken.BLAST.SEPOLIA()

      case celoMainChainId:
        return WETHToken.CELO.MAINNET()
      case celoAlfajoresChainId:
        return WETHToken.CELO.ALFAJORES()

      case ethMainChainId:
        return WETHToken.ETH.MAINNET()
      case ethHoleskyChainId:
        return WETHToken.ETH.HOLESKY()
      case ethSepoliaChainId:
        return WETHToken.ETH.SEPOLIA()

      case optimismMainChainId:
        return WETHToken.OPTIMISM.MAINNET()
      case optimismSepoliaChainId:
        return WETHToken.OPTIMISM.SEPOLIA()

      case polygonMainChainId:
        return WETHToken.POLYGON.MAINNET()

      case plsMainChainId:
        return WETHToken.PULSE.MAINNET()
      case plsTestChainId:
        return WETHToken.PULSE.TESTNET()

      case zkEVMMainChainId:
        return WETHToken.ZKEVM.MAINNET()

      case zksyncMainChainId:
        return WETHToken.ZKSYNC.MAINNET()
      case zksyncSepoliaChainId:
        return WETHToken.ZKSYNC.SEPOLIA()

      case zoraMainChainId:
        return WETHToken.ZORA.MAINNET()
      case zoraSepoliaChainId:
        return WETHToken.ZORA.SEPOLIA()

      default:
        return undefined
    }
  }
}
