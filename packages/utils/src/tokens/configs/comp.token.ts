import type { Token } from '@dex-toolkit/types'
import type { ChainId } from '@multicall-toolkit/types'

import {
  arbitrumMainChainId,
  avaxMainChainId,
  baseMainChainId,
  bscMainChainId,
  energiMainChainId,
  ethMainChainId,
  ethSepoliaChainId,
  plsMainChainId,
  plsTestChainId,
  polygonMainChainId,
} from '../../chains/chainIds'
import { getImageUrlForToken } from '../logo-urls/logo-urls'

export class COMPToken {
  private static commonProps: Omit<
    Token,
    'chainId' | 'contractAddress' | 'standard'
  > = {
    name: 'Compound',
    symbol: 'COMP',
    decimals: 18,
    color: 'rgb(1, 210, 149)',
  }

  public static ARBITRUM = {
    MAINNET: (): Token => {
      return {
        ...COMPToken.commonProps,
        chainId: arbitrumMainChainId,
        contractAddress: '0x354A6dA3fcde098F8389cad84b0182725c6C91dE',
        standard: 'ERC20',
        logoUri: getImageUrlForToken({
          tokenContractAddress: '0x354A6dA3fcde098F8389cad84b0182725c6C91dE',
          tokenContractChainId: arbitrumMainChainId,
        }),
      }
    },
  }

  public static AVALANCHE = {
    MAINNET: (): Token => {
      return {
        ...COMPToken.commonProps,
        chainId: avaxMainChainId,
        symbol: 'COMP.e',
        contractAddress: '0xc3048E19E76CB9a3Aa9d77D8C03c29Fc906e2437',
        standard: 'ERC20',
        logoUri: getImageUrlForToken({
          tokenContractAddress: '0xc3048E19E76CB9a3Aa9d77D8C03c29Fc906e2437',
          tokenContractChainId: avaxMainChainId,
        }),
      }
    },
  }

  public static BASE = {
    MAINNET: (): Token => {
      return {
        ...COMPToken.commonProps,
        chainId: baseMainChainId,
        contractAddress: '0x9e1028F5F1D5eDE59748FFceE5532509976840E0',
        standard: 'ERC20',
        logoUri: getImageUrlForToken({
          tokenContractAddress: '0x9e1028F5F1D5eDE59748FFceE5532509976840E0',
          tokenContractChainId: baseMainChainId,
        }),
      }
    },
  }

  public static BSC = {
    MAINNET: (): Token => {
      return {
        ...COMPToken.commonProps,
        chainId: bscMainChainId,
        name: 'Compound Coin',
        contractAddress: '0x52CE071Bd9b1C4B00A0b92D298c512478CaD67e8',
        standard: 'BEP20',
        logoUri: getImageUrlForToken({
          tokenContractAddress: '0x52CE071Bd9b1C4B00A0b92D298c512478CaD67e8',
          tokenContractChainId: bscMainChainId,
        }),
      }
    },
  }

  public static ENERGI = {
    MAINNET: (): Token => {
      return {
        ...COMPToken.commonProps,
        chainId: energiMainChainId,
        contractAddress: '0x66bC411714e16B6F0C68be12bD9c666cc4576063',
        standard: 'ERC20',
        logoUri: getImageUrlForToken({
          tokenContractAddress: '0x66bC411714e16B6F0C68be12bD9c666cc4576063',
          tokenContractChainId: energiMainChainId,
        }),
      }
    },
  }

  public static ETH = {
    MAINNET: (): Token => {
      return {
        ...COMPToken.commonProps,
        chainId: ethMainChainId,
        contractAddress: '0xc00e94Cb662C3520282E6f5717214004A7f26888',
        standard: 'ERC20',
        logoUri: getImageUrlForToken({
          tokenContractAddress: '0xc00e94Cb662C3520282E6f5717214004A7f26888',
          tokenContractChainId: ethMainChainId,
        }),
      }
    },
    SEPOLIA: (): Token => {
      return {
        ...COMPToken.commonProps,
        chainId: ethSepoliaChainId,
        contractAddress: '0x43E83569A7cAa56206a39c1296d8f97d88555FfC',
        standard: 'ERC20',
        logoUri: getImageUrlForToken({
          tokenContractAddress: '0x43E83569A7cAa56206a39c1296d8f97d88555FfC',
          tokenContractChainId: ethSepoliaChainId,
        }),
      }
    },
  }

  public static POLYGON = {
    MAINNET: (): Token => {
      return {
        ...COMPToken.commonProps,
        chainId: polygonMainChainId,
        name: '(PoS) Compound',
        contractAddress: '0x8505b9d2254A7Ae468c0E9dd10Ccea3A837aef5c',
        standard: 'ERC20',
        logoUri: getImageUrlForToken({
          tokenContractAddress: '0x8505b9d2254A7Ae468c0E9dd10Ccea3A837aef5c',
          tokenContractChainId: polygonMainChainId,
        }),
      }
    },
  }

  public static PULSE = {
    MAINNET: (): Token => {
      return {
        ...COMPToken.commonProps,
        chainId: plsMainChainId,
        contractAddress: '0xc00e94Cb662C3520282E6f5717214004A7f26888',
        standard: 'PRC20',
        logoUri: getImageUrlForToken({
          tokenContractAddress: '0xc00e94Cb662C3520282E6f5717214004A7f26888',
          tokenContractChainId: plsMainChainId,
        }),
      }
    },
    TESTNET: (): Token => {
      return {
        ...COMPToken.commonProps,
        chainId: plsTestChainId,
        contractAddress: '0xc00e94Cb662C3520282E6f5717214004A7f26888',
        standard: 'PRC20',
        logoUri: getImageUrlForToken({
          tokenContractAddress: '0xc00e94Cb662C3520282E6f5717214004A7f26888',
          tokenContractChainId: plsTestChainId,
        }),
      }
    },
  }

  public static getTokenForChainId(chainId: ChainId): Token | undefined {
    switch (chainId) {
      case arbitrumMainChainId:
        return COMPToken.ARBITRUM.MAINNET()
      case avaxMainChainId:
        return COMPToken.AVALANCHE.MAINNET()
      case baseMainChainId:
        return COMPToken.BASE.MAINNET()
      case bscMainChainId:
        return COMPToken.BSC.MAINNET()
      case energiMainChainId:
        return COMPToken.ENERGI.MAINNET()
      case ethMainChainId:
        return COMPToken.ETH.MAINNET()
      case ethSepoliaChainId:
        return COMPToken.ETH.SEPOLIA()
      case polygonMainChainId:
        return COMPToken.POLYGON.MAINNET()
      case plsMainChainId:
        return COMPToken.PULSE.MAINNET()
      case plsTestChainId:
        return COMPToken.PULSE.TESTNET()
      default:
        return undefined
    }
  }
}
