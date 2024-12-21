import {
  arbitrumMainChainId,
  baseMainChainId,
  celoMainChainId,
  polygonMainChainId,
  avaxMainChainId,
  energiMainChainId,
  bscMainChainId,
} from '@chain-toolkit/chains'
import type { ChainId } from '@chain-toolkit/schemas'
import type { Token } from '@dex-toolkit/types'

import { getImageUrlForToken } from '../logo-urls/logo-urls'

export class SUSHIToken {
  private static commonProps: Omit<
    Token,
    'chainId' | 'contractAddress' | 'standard'
  > = {
    name: 'SushiToken',
    symbol: 'SUSHI',
    decimals: 18,
    logoUri: getImageUrlForToken({
      tokenContractAddress: '0xd4d42F0b6DEF4CE0383636770eF773390d85c61A',
      tokenContractChainId: arbitrumMainChainId,
    }),
    color: 'rgb(248, 85, 164)',
  }

  public static ARBITRUM = {
    MAINNET: (): Token => {
      return {
        ...SUSHIToken.commonProps,
        chainId: arbitrumMainChainId,
        contractAddress: '0xd4d42F0b6DEF4CE0383636770eF773390d85c61A',
        standard: 'ERC20',
      }
    },
    // SEPOLIA: (): Token => {
    //   return {
    //     ...SUSHIToken.commonProps,
    //     chainId: arbitrumSepoliaChainId,
    //     contractAddress: '',
    //     standard: 'ERC20',
    //   }
    // },
  }

  public static AVALANCHE = {
    MAINNET: (): Token => {
      return {
        ...SUSHIToken.commonProps,
        chainId: avaxMainChainId,
        symbol: 'SUSHI.e',
        contractAddress: '0x37B608519F91f70F2EeB0e5Ed9AF4061722e4F76',
        standard: 'ERC20',
      }
    },
    // FUJI: (): Token => {
    //   return {
    //     ...SUSHIToken.commonProps,
    //     chainId: avaxFujiChainId,
    //     contractAddress: '',
    //     standard: 'ERC20',
    //   }
    // },
  }

  public static BASE = {
    MAINNET: (): Token => {
      return {
        ...SUSHIToken.commonProps,
        chainId: baseMainChainId,
        contractAddress: '0x7D49a065D17d6d4a55dc13649901fdBB98B2AFBA',
        standard: 'ERC20',
      }
    },
    // SEPOLIA: (): Token => {
    //   return {
    //     ...SUSHIToken.commonProps,
    //     chainId: baseSepoliaChainId,
    //     contractAddress: '',
    //     standard: 'ERC20',
    //   }
    // },
  }

  public static BSC = {
    MAINNET: (): Token => {
      return {
        ...SUSHIToken.commonProps,
        chainId: bscMainChainId,
        contractAddress: '0x947950BcC74888a40Ffa2593C5798F11Fc9124C4',
        standard: 'BEP20',
      }
    },
  }

  public static CELO = {
    MAINNET: (): Token => {
      return {
        ...SUSHIToken.commonProps,
        chainId: celoMainChainId,
        contractAddress: '0xD15EC721C2A896512Ad29C671997DD68f9593226',
        standard: 'ERC20',
      }
    },
    // ALFAJORES: (): Token => {
    //   return {
    //     ...SUSHIToken.commonProps,
    //     chainId: celoAlfajoresChainId,
    //     contractAddress: '',
    //     standard: 'ERC20',
    //   }
    // },
  }

  public static ENERGI = {
    MAINNET: (): Token => {
      return {
        ...SUSHIToken.commonProps,
        chainId: energiMainChainId,
        contractAddress: '0x32Aff6ADC46331dAc93E608A9CD4b0332d93a23a',
        standard: 'ERC20',
      }
    },
    // TESTNET: (): Token => {
    //   return {
    //     ...SUSHIToken.commonProps,
    //     chainId: energiTestChainId,
    //     contractAddress: '',
    //     standard: 'ERC20',
    //   }
    // },
  }

  public static POLYGON = {
    MAINNET: (): Token => {
      return {
        ...SUSHIToken.commonProps,
        name: 'SushiToken (PoS)',
        chainId: polygonMainChainId,
        contractAddress: '0x0b3F868E0BE5597D5DB7fEB59E1CADBb0fdDa50a',
        standard: 'ERC20',
      }
    },
  }

  public static getTokenForChainId(chainId: ChainId): Token | undefined {
    switch (chainId) {
      case arbitrumMainChainId:
        return SUSHIToken.ARBITRUM.MAINNET()

      case avaxMainChainId:
        return SUSHIToken.AVALANCHE.MAINNET()

      case baseMainChainId:
        return SUSHIToken.BASE.MAINNET()

      case celoMainChainId:
        return SUSHIToken.CELO.MAINNET()

      case energiMainChainId:
        return SUSHIToken.ENERGI.MAINNET()

      case polygonMainChainId:
        return SUSHIToken.POLYGON.MAINNET()

      default:
        return undefined
    }
  }
}
