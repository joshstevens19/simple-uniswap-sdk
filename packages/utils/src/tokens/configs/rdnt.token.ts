import type { Token } from '@dex-toolkit/types'
import type { ChainId } from '@multicall-toolkit/types'

import {
  arbitrumMainChainId,
  ethMainChainId,
  bscMainChainId,
  baseMainChainId,
} from '../../chains/chainIds'
import { getImageUrlForToken } from '../logo-urls/logo-urls'

export class RDNTToken {
  private static commonProps: Omit<
    Token,
    'chainId' | 'contractAddress' | 'standard'
  > = {
    name: 'Radiant',
    symbol: 'RDNT',
    decimals: 18,
    logoUri: getImageUrlForToken({
      tokenContractAddress: '0x137dDB47Ee24EaA998a535Ab00378d6BFa84F893',
      tokenContractChainId: ethMainChainId,
    }),
    color: 'rgb(40, 144, 202)',
  }

  public static ARBITRUM = {
    MAINNET: (): Token => {
      return {
        ...RDNTToken.commonProps,
        chainId: arbitrumMainChainId,
        contractAddress: '0x3082CC23568eA640225c2467653dB90e9250AaA0',
        standard: 'ERC20',
      }
    },
  }

  public static BASE = {
    MAINNET: (): Token => {
      return {
        ...RDNTToken.commonProps,
        chainId: baseMainChainId,
        contractAddress: '0xd722E55C1d9D9fA0021A5215Cbb904b92B3dC5d4',
        standard: 'ERC20',
      }
    },
  }

  public static BSC = {
    MAINNET: (): Token => {
      return {
        ...RDNTToken.commonProps,
        chainId: bscMainChainId,
        contractAddress: '0xf7DE7E8A6bd59ED41a4b5fe50278b3B7f31384dF',
        standard: 'ERC20',
      }
    },
  }

  public static ETH = {
    MAINNET: (): Token => {
      return {
        ...RDNTToken.commonProps,
        chainId: ethMainChainId,
        contractAddress: '0x137dDB47Ee24EaA998a535Ab00378d6BFa84F893',
        standard: 'ERC20',
      }
    },
  }

  public static getTokenForChainId(chainId: ChainId): Token | undefined {
    switch (chainId) {
      case arbitrumMainChainId:
        return RDNTToken.ARBITRUM.MAINNET()

      case baseMainChainId:
        return RDNTToken.BASE.MAINNET()

      case bscMainChainId:
        return RDNTToken.BSC.MAINNET()

      case ethMainChainId:
        return RDNTToken.ETH.MAINNET()

      default:
        return undefined
    }
  }
}
