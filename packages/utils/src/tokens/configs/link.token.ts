import type { Token } from '@dex-toolkit/types'
import type { ChainId } from '@ethereum-multicall/types'

import {
  arbitrumMainChainId,
  ethMainChainId,
  optimismMainChainId,
  plsMainChainId,
  plsTestChainId,
  polygonMainChainId,
  avaxMainChainId,
  energiMainChainId,
  bscMainChainId,
  zkEVMMainChainId,
  zkEVMCardonaChainId,
  ethHoleskyChainId,
  ethSepoliaChainId,
  avaxFujiChainId,
  arbitrumSepoliaChainId,
  optimismSepoliaChainId,
  polygonAmoyChainId,
  baseMainChainId,
  baseSepoliaChainId,
  blastSepoliaChainId,
  blastMainChainId,
  celoMainChainId,
  celoAlfajoresChainId,
  zksyncMainChainId,
  zksyncSepoliaChainId,
  bscTestChainId,
} from '../../chains/chainIds'
import { getImageUrlForToken } from '../logo-urls/logo-urls'

/**
 * [ChainLink](https://docs.chain.link/resources/link-token-contracts)
 */

export class LINKToken {
  private static commonProps: Omit<
    Token,
    'chainId' | 'contractAddress' | 'standard'
  > = {
    name: 'ChainLink Token',
    symbol: 'LINK',
    decimals: 18,
    logoUri: getImageUrlForToken({
      tokenContractAddress: '0x514910771AF9Ca656af840dff83E8264EcF986CA',
      tokenContractChainId: ethMainChainId,
    }),
    color: 'rgb(42, 90, 217)',
  }

  public static ARBITRUM = {
    MAINNET: (): Token => {
      return {
        ...LINKToken.commonProps,
        chainId: arbitrumMainChainId,
        contractAddress: '0xf97f4df75117a78c1A5a0DBb814Af92458539FB4',
        standard: 'ERC20',
      }
    },
    SEPOLIA: (): Token => {
      return {
        ...LINKToken.commonProps,
        chainId: arbitrumSepoliaChainId,
        contractAddress: '0xb1D4538B4571d411F07960EF2838Ce337FE1E80E',
        standard: 'ERC20',
      }
    },
  }

  public static AVALANCHE = {
    MAINNET: (): Token => {
      return {
        ...LINKToken.commonProps,
        chainId: avaxMainChainId,
        name: 'Chainlink Token',
        symbol: 'LINK.e',
        contractAddress: '0x5947BB275c521040051D82396192181b413227A3',
        standard: 'ERC20',
      }
    },
    FUJI: (): Token => {
      return {
        ...LINKToken.commonProps,
        chainId: avaxFujiChainId,
        name: 'ChainLink Token',
        symbol: 'LINK',
        contractAddress: '0x0b9d5D9136855f6FEc3c0993feE6E9CE8a297846',
        standard: 'ERC20',
      }
    },
  }

  public static BASE = {
    MAINNET: (): Token => {
      return {
        ...LINKToken.commonProps,
        chainId: baseMainChainId,
        contractAddress: '0x88Fb150BDc53A65fe94Dea0c9BA0a6dAf8C6e196',
        standard: 'ERC20',
      }
    },
    SEPOLIA: (): Token => {
      return {
        ...LINKToken.commonProps,
        chainId: baseSepoliaChainId,
        contractAddress: '0xE4aB69C077896252FAFBD49EFD26B5D171A32410',
        standard: 'ERC20',
      }
    },
  }

  public static BLAST = {
    MAINNET: (): Token => {
      return {
        ...LINKToken.commonProps,
        chainId: blastMainChainId,
        contractAddress: '0x93202eC683288a9EA75BB829c6baCFb2BfeA9013',
        standard: 'ERC20',
      }
    },
    SEPOLIA: (): Token => {
      return {
        ...LINKToken.commonProps,
        chainId: blastSepoliaChainId,
        contractAddress: '0x02c359ebf98fc8BF793F970F9B8302bb373BdF32',
        standard: 'ERC20',
      }
    },
  }

  public static BSC = {
    MAINNET: (): Token => {
      return {
        ...LINKToken.commonProps,
        chainId: bscMainChainId,
        contractAddress: '0x404460C6A5EdE2D891e8297795264fDe62ADBB75',
        standard: 'BEP20',
      }
    },
    TESTNET: (): Token => {
      return {
        ...LINKToken.commonProps,
        chainId: bscTestChainId,
        contractAddress: '0x84b9B910527Ad5C03A9Ca831909E21e236EA7b06',
        standard: 'BEP20',
      }
    },
  }

  public static CELO = {
    MAINNET: (): Token => {
      return {
        ...LINKToken.commonProps,
        chainId: celoMainChainId,
        contractAddress: '0xd07294e6E917e07dfDcee882dd1e2565085C2ae0',
        standard: 'ERC20',
      }
    },
    ALFAJORES: (): Token => {
      return {
        ...LINKToken.commonProps,
        chainId: celoAlfajoresChainId,
        contractAddress: '0x32E08557B14FaD8908025619797221281D439071',
        standard: 'ERC20',
      }
    },
  }

  public static ENERGI = {
    MAINNET: (): Token => {
      return {
        ...LINKToken.commonProps,
        chainId: energiMainChainId,
        name: 'Chainlink',
        contractAddress: '0x68Ca48cA2626c415A89756471D4ADe2CC9034008',
        standard: 'ERC20',
      }
    },
  }

  public static ETH = {
    MAINNET: (): Token => {
      return {
        ...LINKToken.commonProps,
        chainId: ethMainChainId,
        contractAddress: '0x514910771AF9Ca656af840dff83E8264EcF986CA',
        standard: 'ERC20',
      }
    },
    HOLESKY: (): Token => {
      return {
        ...LINKToken.commonProps,
        chainId: ethHoleskyChainId,
        contractAddress: '0x685cE6742351ae9b618F383883D6d1e0c5A31B4B',
        standard: 'ERC20',
      }
    },
    SEPOLIA: (): Token => {
      return {
        ...LINKToken.commonProps,
        chainId: ethSepoliaChainId,
        contractAddress: '0x779877A7B0D9E8603169DdbD7836e478b4624789',
        standard: 'ERC20',
      }
    },
  }

  public static OPTIMISM = {
    MAINNET: (): Token => {
      return {
        ...LINKToken.commonProps,
        chainId: optimismMainChainId,
        contractAddress: '0x350a791Bfc2C21F9Ed5d10980Dad2e2638ffa7f6',
        standard: 'ERC20',
      }
    },
    SEPOLIA: (): Token => {
      return {
        ...LINKToken.commonProps,
        chainId: optimismSepoliaChainId,
        contractAddress: '0xE4aB69C077896252FAFBD49EFD26B5D171A32410',
        standard: 'ERC20',
      }
    },
  }

  public static POLYGON = {
    MAINNET: (): Token => {
      return {
        ...LINKToken.commonProps,
        chainId: polygonMainChainId,
        contractAddress: '0xb0897686c545045aFc77CF20eC7A532E3120E0F1',
        standard: 'ERC20',
      }
    },
    AMOY: (): Token => {
      return {
        ...LINKToken.commonProps,
        chainId: polygonAmoyChainId,
        contractAddress: '0x0Fd9e8d3aF1aaee056EB9e802c3A762a667b1904',
        standard: 'ERC20',
      }
    },
  }

  public static PULSE = {
    MAINNET: (): Token => {
      return {
        ...LINKToken.commonProps,
        chainId: plsMainChainId,
        contractAddress: '0x514910771AF9Ca656af840dff83E8264EcF986CA',
        standard: 'PRC20',
      }
    },
    TESTNET: (): Token => {
      return {
        ...LINKToken.commonProps,
        chainId: plsTestChainId,
        contractAddress: '0x514910771AF9Ca656af840dff83E8264EcF986CA',
        standard: 'PRC20',
      }
    },
  }

  public static ZKEVM = {
    MAINNET: (): Token => {
      return {
        ...LINKToken.commonProps,
        chainId: zkEVMMainChainId,
        contractAddress: '0x4B16e4752711A7ABEc32799C976F3CeFc0111f2B',
        standard: 'ERC20',
        logoUri: getImageUrlForToken({
          tokenContractAddress: '0x4B16e4752711A7ABEc32799C976F3CeFc0111f2B',
          tokenContractChainId: zkEVMMainChainId,
        }),
      }
    },
    CARDONA: (): Token => {
      return {
        ...LINKToken.commonProps,
        chainId: zkEVMCardonaChainId,
        contractAddress: '0x5576815a38A3706f37bf815b261cCc7cCA77e975',
        standard: 'ERC20',
        logoUri: getImageUrlForToken({
          tokenContractAddress: '0x5576815a38A3706f37bf815b261cCc7cCA77e975',
          tokenContractChainId: zkEVMCardonaChainId,
        }),
      }
    },
  }

  public static ZKSYNC = {
    MAINNET: (): Token => {
      return {
        ...LINKToken.commonProps,
        chainId: zksyncMainChainId,
        contractAddress: '0x52869bae3E091e36b0915941577F2D47d8d8B534',
        standard: 'ERC20',
        logoUri: getImageUrlForToken({
          tokenContractAddress: '0x52869bae3E091e36b0915941577F2D47d8d8B534',
          tokenContractChainId: zksyncMainChainId,
        }),
      }
    },
    SEPOLIA: (): Token => {
      return {
        ...LINKToken.commonProps,
        chainId: zksyncSepoliaChainId,
        contractAddress: '0x23A1aFD896c8c8876AF46aDc38521f4432658d1e',
        standard: 'ERC20',
        logoUri: getImageUrlForToken({
          tokenContractAddress: '0x23A1aFD896c8c8876AF46aDc38521f4432658d1e',
          tokenContractChainId: zksyncSepoliaChainId,
        }),
      }
    },
  }

  public static getTokenForChainId(chainId: ChainId): Token | undefined {
    switch (chainId) {
      case arbitrumMainChainId:
        return LINKToken.ARBITRUM.MAINNET()
      case arbitrumSepoliaChainId:
        return LINKToken.ARBITRUM.SEPOLIA()

      case avaxMainChainId:
        return LINKToken.AVALANCHE.MAINNET()
      case avaxFujiChainId:
        return LINKToken.AVALANCHE.FUJI()

      case baseMainChainId:
        return LINKToken.BASE.MAINNET()
      case baseSepoliaChainId:
        return LINKToken.BASE.SEPOLIA()

      case bscMainChainId:
        return LINKToken.BSC.MAINNET()
      case bscTestChainId:
        return LINKToken.BSC.TESTNET()

      case blastMainChainId:
        return LINKToken.BLAST.MAINNET()
      case blastSepoliaChainId:
        return LINKToken.BLAST.SEPOLIA()

      case celoMainChainId:
        return LINKToken.CELO.MAINNET()
      case celoAlfajoresChainId:
        return LINKToken.CELO.ALFAJORES()

      case energiMainChainId:
        return LINKToken.ENERGI.MAINNET()

      case ethMainChainId:
        return LINKToken.ETH.MAINNET()
      case ethHoleskyChainId:
        return LINKToken.ETH.HOLESKY()
      case ethSepoliaChainId:
        return LINKToken.ETH.SEPOLIA()

      case optimismMainChainId:
        return LINKToken.OPTIMISM.MAINNET()
      case optimismSepoliaChainId:
        return LINKToken.OPTIMISM.SEPOLIA()

      case polygonMainChainId:
        return LINKToken.POLYGON.MAINNET()
      case polygonAmoyChainId:
        return LINKToken.POLYGON.AMOY()

      case plsMainChainId:
        return LINKToken.PULSE.MAINNET()
      case plsTestChainId:
        return LINKToken.PULSE.TESTNET()

      case zkEVMMainChainId:
        return LINKToken.ZKEVM.MAINNET()
      case zkEVMCardonaChainId:
        return LINKToken.ZKEVM.CARDONA()

      case zksyncMainChainId:
        return LINKToken.ZKSYNC.MAINNET()
      case zksyncSepoliaChainId:
        return LINKToken.ZKSYNC.SEPOLIA()

      default:
        return undefined
    }
  }
}
