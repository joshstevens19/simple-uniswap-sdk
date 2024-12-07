import type { Token } from '@dex-toolkit/types'
import type { ChainId } from '@ethereum-multicall/types'

import {
  arbitrumMainChainId,
  avaxMainChainId,
  baseMainChainId,
  bscMainChainId,
  celoMainChainId,
  ethMainChainId,
  ethSepoliaChainId,
  optimismMainChainId,
  plsMainChainId,
  plsTestChainId,
  polygonMainChainId,
  zkEVMMainChainId,
  zksyncMainChainId,
  zoraMainChainId,
} from '../../chains/chainIds'
import { getImageUrlForToken } from '../logo-urls/logo-urls'

export class USDCToken {
  private static commonProps: Omit<
    Token,
    'chainId' | 'contractAddress' | 'standard'
  > = {
    name: 'USD Coin',
    symbol: 'USDC',
    decimals: 6,
    color: 'rgb(39, 116, 200)',
  }

  public static ARBITRUM = {
    MAINNET: (): Token => {
      return {
        ...USDCToken.commonProps,
        chainId: arbitrumMainChainId,
        contractAddress: '0xaf88d065e77c8cC2239327C5EDb3A432268e5831',
        standard: 'ERC20',
        logoUri: getImageUrlForToken({
          tokenContractAddress: '0xaf88d065e77c8cC2239327C5EDb3A432268e5831',
          tokenContractChainId: arbitrumMainChainId,
        }),
      }
    },
  }

  public static AVALANCHE = {
    MAINNET: (): Token => {
      return {
        ...USDCToken.commonProps,
        chainId: avaxMainChainId,
        contractAddress: '0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E',
        standard: 'ERC20',
        logoUri: getImageUrlForToken({
          tokenContractAddress: '0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E',
          tokenContractChainId: avaxMainChainId,
        }),
      }
    },
  }

  public static BASE = {
    MAINNET: (): Token => {
      return {
        ...USDCToken.commonProps,
        chainId: baseMainChainId,
        contractAddress: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
        standard: 'ERC20',
        logoUri: getImageUrlForToken({
          tokenContractAddress: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
          tokenContractChainId: baseMainChainId,
        }),
      }
    },
  }

  public static BSC = {
    MAINNET: (): Token => {
      return {
        ...USDCToken.commonProps,
        chainId: bscMainChainId,
        decimals: 18,
        contractAddress: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
        standard: 'BEP20',
        logoUri: getImageUrlForToken({
          tokenContractAddress: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
          tokenContractChainId: bscMainChainId,
        }),
      }
    },
  }

  public static CELO = {
    MAINNET: (): Token => {
      return {
        ...USDCToken.commonProps,
        chainId: celoMainChainId,
        name: 'USDC',
        contractAddress: '0xcebA9300f2b948710d2653dD7B07f33A8B32118C',
        standard: 'ERC20',
        logoUri: getImageUrlForToken({
          tokenContractAddress: '0xcebA9300f2b948710d2653dD7B07f33A8B32118C',
          tokenContractChainId: celoMainChainId,
        }),
      }
    },
  }

  public static ETH = {
    MAINNET: (): Token => {
      return {
        ...USDCToken.commonProps,
        chainId: ethMainChainId,
        contractAddress: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
        standard: 'ERC20',
        logoUri: getImageUrlForToken({
          tokenContractAddress: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
          tokenContractChainId: ethMainChainId,
        }),
      }
    },
    SEPOLIA: (): Token => {
      return {
        ...USDCToken.commonProps,
        chainId: ethSepoliaChainId,
        contractAddress: '0xf08A50178dfcDe18524640EA6618a1f965821715',
        standard: 'ERC20',
        logoUri: getImageUrlForToken({
          tokenContractAddress: '0xf08A50178dfcDe18524640EA6618a1f965821715',
          tokenContractChainId: ethSepoliaChainId,
        }),
      }
    },
  }

  public static OPTIMISM = {
    MAINNET: (): Token => {
      return {
        ...USDCToken.commonProps,
        chainId: optimismMainChainId,
        contractAddress: '0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85',
        standard: 'ERC20',
        logoUri: getImageUrlForToken({
          tokenContractAddress: '0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85',
          tokenContractChainId: optimismMainChainId,
        }),
      }
    },
  }

  public static POLYGON = {
    MAINNET: (): Token => {
      return {
        ...USDCToken.commonProps,
        chainId: polygonMainChainId,
        // contractAddress: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174', // USDC.e
        contractAddress: '0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359',
        standard: 'ERC20',
        logoUri: getImageUrlForToken({
          tokenContractAddress: '0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359',
          tokenContractChainId: polygonMainChainId,
        }),
      }
    },
  }

  public static PULSE = {
    MAINNET: (): Token => {
      return {
        ...USDCToken.commonProps,
        chainId: plsMainChainId,
        name: 'USD Coin from Ethereum',
        contractAddress: '0x15D38573d2feeb82e7ad5187aB8c1D52810B1f07', // from Ethereum
        standard: 'PRC20',
        logoUri: getImageUrlForToken({
          tokenContractAddress: '0x15D38573d2feeb82e7ad5187aB8c1D52810B1f07',
          tokenContractChainId: plsMainChainId,
        }),
      }
    },
    TESTNET: (): Token => {
      return {
        ...USDCToken.commonProps,
        chainId: plsTestChainId,
        contractAddress: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
        standard: 'PRC20',
        logoUri: getImageUrlForToken({
          tokenContractAddress: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
          tokenContractChainId: plsTestChainId,
        }),
      }
    },
  }

  public static ZKEVM = {
    MAINNET: (): Token => {
      return {
        ...USDCToken.commonProps,
        chainId: zkEVMMainChainId,
        contractAddress: '0xA8CE8aee21bC2A48a5EF670afCc9274C7bbbC035',
        standard: 'ERC20',
      }
    },
  }

  public static ZKSYNC = {
    MAINNET: (): Token => {
      return {
        ...USDCToken.commonProps,
        chainId: zksyncMainChainId,
        name: 'USDC',
        contractAddress: '0x1d17CBcF0D6D143135aE902365D2E5e2A16538D4',
        standard: 'ERC20',
        logoUri: getImageUrlForToken({
          tokenContractAddress: '0x1d17CBcF0D6D143135aE902365D2E5e2A16538D4',
          tokenContractChainId: zksyncMainChainId,
        }),
      }
    },
  }

  public static ZORA = {
    MAINNET: (): Token => {
      return {
        ...USDCToken.commonProps,
        chainId: zoraMainChainId,
        name: 'USD Coin (Bridged from Ethereum)',
        symbol: 'USDzC',
        contractAddress: '0xCccCCccc7021b32EBb4e8C08314bD62F7c653EC4',
        standard: 'ERC20',
        logoUri: getImageUrlForToken({
          tokenContractAddress: '0xCccCCccc7021b32EBb4e8C08314bD62F7c653EC4',
          tokenContractChainId: zoraMainChainId,
        }),
      }
    },
  }

  public static getTokenForChainId(chainId: ChainId): Token | undefined {
    switch (chainId) {
      case arbitrumMainChainId:
        return USDCToken.ARBITRUM.MAINNET()
      case avaxMainChainId:
        return USDCToken.AVALANCHE.MAINNET()
      case baseMainChainId:
        return USDCToken.BASE.MAINNET()
      case bscMainChainId:
        return USDCToken.BSC.MAINNET()
      case celoMainChainId:
        return USDCToken.CELO.MAINNET()
      case ethMainChainId:
        return USDCToken.ETH.MAINNET()
      case ethSepoliaChainId:
        return USDCToken.ETH.SEPOLIA()
      case optimismMainChainId:
        return USDCToken.OPTIMISM.MAINNET()
      case polygonMainChainId:
        return USDCToken.POLYGON.MAINNET()
      case plsMainChainId:
        return USDCToken.PULSE.MAINNET()
      case plsTestChainId:
        return USDCToken.PULSE.TESTNET()
      case zkEVMMainChainId:
        return USDCToken.ZKEVM.MAINNET()
      case zksyncMainChainId:
        return USDCToken.ZKSYNC.MAINNET()
      case zoraMainChainId:
        return USDCToken.ZORA.MAINNET()
      default:
        return undefined
    }
  }
}
