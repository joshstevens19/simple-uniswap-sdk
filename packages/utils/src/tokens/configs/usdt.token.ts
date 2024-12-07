import type { Token } from '@dex-toolkit/types'
import type { ChainId } from '@ethereum-multicall/types'

import {
  arbitrumMainChainId,
  avaxMainChainId,
  baseMainChainId,
  bscMainChainId,
  celoMainChainId,
  energiMainChainId,
  ethMainChainId,
  ethSepoliaChainId,
  optimismMainChainId,
  plsMainChainId,
  plsTestChainId,
  polygonMainChainId,
  zkEVMCardonaChainId,
  zkEVMMainChainId,
  zksyncMainChainId,
} from '../../chains/chainIds'
import { getImageUrlForToken } from '../logo-urls/logo-urls'

export class USDTToken {
  private static commonProps: Omit<
    Token,
    'chainId' | 'contractAddress' | 'standard'
  > = {
    name: 'Tether USD',
    symbol: 'USDT',
    decimals: 6,
    color: 'rgb(1, 147, 146)',
  }

  public static ARBITRUM = {
    MAINNET: (): Token => {
      return {
        ...USDTToken.commonProps,
        chainId: arbitrumMainChainId,
        contractAddress: '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9',
        standard: 'ERC20',
        logoUri: getImageUrlForToken({
          tokenContractAddress: '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9',
          tokenContractChainId: arbitrumMainChainId,
        }),
      }
    },
  }

  public static AVALANCHE = {
    MAINNET: (): Token => {
      return {
        ...USDTToken.commonProps,
        chainId: avaxMainChainId,
        symbol: 'USDT.e',
        contractAddress: '0xc7198437980c041c805A1EDcbA50c1Ce5db95118',
        standard: 'ERC20',
        logoUri: getImageUrlForToken({
          tokenContractAddress: '0xc7198437980c041c805A1EDcbA50c1Ce5db95118',
          tokenContractChainId: avaxMainChainId,
        }),
      }
    },
  }

  public static BASE = {
    MAINNET: (): Token => {
      return {
        ...USDTToken.commonProps,
        chainId: baseMainChainId,
        contractAddress: '0xfde4C96c8593536E31F229EA8f37b2ADa2699bb2',
        standard: 'ERC20',
        logoUri: getImageUrlForToken({
          tokenContractAddress: '0xfde4C96c8593536E31F229EA8f37b2ADa2699bb2',
          tokenContractChainId: baseMainChainId,
        }),
      }
    },
  }

  public static BSC = {
    MAINNET: (): Token => {
      return {
        ...USDTToken.commonProps,
        chainId: bscMainChainId,
        decimals: 18,
        contractAddress: '0x55d398326f99059fF775485246999027B3197955',
        standard: 'BEP20',
        logoUri: getImageUrlForToken({
          tokenContractAddress: '0x55d398326f99059fF775485246999027B3197955',
          tokenContractChainId: bscMainChainId,
        }),
      }
    },
  }

  public static CELO = {
    MAINNET: (): Token => {
      return {
        ...USDTToken.commonProps,
        chainId: celoMainChainId,
        symbol: 'USD₮',
        contractAddress: '0x48065fbBE25f71C9282ddf5e1cD6D6A887483D5e',
        standard: 'ERC20',
        logoUri: getImageUrlForToken({
          tokenContractAddress: '0x48065fbBE25f71C9282ddf5e1cD6D6A887483D5e',
          tokenContractChainId: celoMainChainId,
        }),
      }
    },
  }

  public static ENERGI = {
    MAINNET: (): Token => {
      return {
        ...USDTToken.commonProps,
        chainId: energiMainChainId,
        contractAddress: '0x470075Cf46e6132aaD78C40a1BE53a494b05E831',
        standard: 'ERC20',
        logoUri: getImageUrlForToken({
          tokenContractAddress: '0x470075Cf46e6132aaD78C40a1BE53a494b05E831',
          tokenContractChainId: energiMainChainId,
        }),
      }
    },
  }

  public static ETH = {
    MAINNET: (): Token => {
      return {
        ...USDTToken.commonProps,
        chainId: ethMainChainId,
        contractAddress: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
        standard: 'ERC20',
        logoUri: getImageUrlForToken({
          tokenContractAddress: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
          tokenContractChainId: ethMainChainId,
        }),
      }
    },
    SEPOLIA: (): Token => {
      return {
        ...USDTToken.commonProps,
        chainId: ethSepoliaChainId,
        name: 'USDT',
        contractAddress: '0xAdd8Ad605fE57064903a3DeFC3b4ed676992bba6',
        standard: 'ERC20',
        logoUri: getImageUrlForToken({
          tokenContractAddress: '0xAdd8Ad605fE57064903a3DeFC3b4ed676992bba6',
          tokenContractChainId: ethSepoliaChainId,
        }),
      }
    },
  }

  public static OPTIMISM = {
    MAINNET: (): Token => {
      return {
        ...USDTToken.commonProps,
        chainId: optimismMainChainId,
        contractAddress: '0x94b008aA00579c1307B0EF2c499aD98a8ce58e58',
        standard: 'ERC20',
        logoUri: getImageUrlForToken({
          tokenContractAddress: '0x94b008aA00579c1307B0EF2c499aD98a8ce58e58',
          tokenContractChainId: optimismMainChainId,
        }),
      }
    },
  }

  public static POLYGON = {
    MAINNET: (): Token => {
      return {
        ...USDTToken.commonProps,
        chainId: polygonMainChainId,
        name: '(PoS) Tether USD',
        contractAddress: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
        standard: 'ERC20',
        logoUri: getImageUrlForToken({
          tokenContractAddress: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
          tokenContractChainId: polygonMainChainId,
        }),
      }
    },
  }

  public static PULSE = {
    MAINNET: (): Token => {
      return {
        ...USDTToken.commonProps,
        chainId: plsMainChainId,
        name: 'Tether USD from Ethereum',
        contractAddress: '0x0Cb6F5a34ad42ec934882A05265A7d5F59b51A2f', // from Ethereum
        standard: 'PRC20',
        logoUri: getImageUrlForToken({
          tokenContractAddress: '0x0Cb6F5a34ad42ec934882A05265A7d5F59b51A2f',
          tokenContractChainId: plsMainChainId,
        }),
      }
    },
    TESTNET: (): Token => {
      return {
        ...USDTToken.commonProps,
        chainId: plsTestChainId,
        contractAddress: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
        standard: 'PRC20',
        logoUri: getImageUrlForToken({
          tokenContractAddress: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
          tokenContractChainId: plsTestChainId,
        }),
      }
    },
  }

  public static ZKEVM = {
    MAINNET: (): Token => {
      return {
        ...USDTToken.commonProps,
        chainId: zkEVMMainChainId,
        contractAddress: '0x1E4a5963aBFD975d8c9021ce480b42188849D41d',
        standard: 'ERC20',
      }
    },
    CARDONA: (): Token => {
      return {
        ...USDTToken.commonProps,
        chainId: zkEVMCardonaChainId,
        name: 'USDT',
        contractAddress: '0x314C01e758a7911E7339aa4F960c7749E8947775',
        standard: 'ERC20',
      }
    },
  }

  public static ZKSYNC = {
    MAINNET: (): Token => {
      return {
        ...USDTToken.commonProps,
        chainId: zksyncMainChainId,
        contractAddress: '0x493257fD37EDB34451f62EDf8D2a0C418852bA4C', // from Ethereum
        standard: 'ERC20',
        logoUri: getImageUrlForToken({
          tokenContractAddress: '0x493257fD37EDB34451f62EDf8D2a0C418852bA4C',
          tokenContractChainId: zksyncMainChainId,
        }),
      }
    },
  }

  public static getTokenForChainId(chainId: ChainId): Token | undefined {
    switch (chainId) {
      case arbitrumMainChainId:
        return USDTToken.ARBITRUM.MAINNET()
      case avaxMainChainId:
        return USDTToken.AVALANCHE.MAINNET()
      case baseMainChainId:
        return USDTToken.BASE.MAINNET()
      case bscMainChainId:
        return USDTToken.BSC.MAINNET()
      case celoMainChainId:
        return USDTToken.CELO.MAINNET()
      case energiMainChainId:
        return USDTToken.ENERGI.MAINNET()
      case ethMainChainId:
        return USDTToken.ETH.MAINNET()
      case ethSepoliaChainId:
        return USDTToken.ETH.SEPOLIA()
      case optimismMainChainId:
        return USDTToken.OPTIMISM.MAINNET()
      case polygonMainChainId:
        return USDTToken.POLYGON.MAINNET()
      case plsMainChainId:
        return USDTToken.PULSE.MAINNET()
      case plsTestChainId:
        return USDTToken.PULSE.TESTNET()
      case zkEVMMainChainId:
        return USDTToken.ZKEVM.MAINNET()
      case zkEVMCardonaChainId:
        return USDTToken.ZKEVM.CARDONA()
      case zksyncMainChainId:
        return USDTToken.ZKSYNC.MAINNET()
      default:
        return undefined
    }
  }
}
