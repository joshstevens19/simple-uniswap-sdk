import {
  ethMainChainId,
  plsMainChainId,
  plsTestChainId,
} from '@chain-toolkit/chains'
import type { ChainId } from '@chain-toolkit/schemas'
import type { Token } from '@dex-toolkit/types'

import { getImageUrlForToken } from '../logo-urls/logo-urls'

export class SKLToken {
  private static commonProps: Omit<
    Token,
    'chainId' | 'contractAddress' | 'standard'
  > = {
    name: 'SKALE',
    symbol: 'SKL',
    decimals: 18,
    color: 'rgb(163, 249, 219)',
  }

  public static ETH = {
    MAINNET: (): Token => {
      return {
        ...SKLToken.commonProps,
        chainId: ethMainChainId,
        contractAddress: '0x00c83aeCC790e8a4453e5dD3B0B4b3680501a7A7',
        standard: 'ERC777',
        logoUri: getImageUrlForToken({
          tokenContractAddress: '0x00c83aeCC790e8a4453e5dD3B0B4b3680501a7A7',
          tokenContractChainId: ethMainChainId,
        }),
      }
    },
  }

  public static PULSE = {
    MAINNET: (): Token => {
      return {
        ...SKLToken.commonProps,
        chainId: plsMainChainId,
        contractAddress: '0x00c83aeCC790e8a4453e5dD3B0B4b3680501a7A7',
        standard: 'PRC777',
        logoUri: getImageUrlForToken({
          tokenContractAddress: '0x00c83aeCC790e8a4453e5dD3B0B4b3680501a7A7',
          tokenContractChainId: plsMainChainId,
        }),
      }
    },
    TESTNET: (): Token => {
      return {
        ...SKLToken.commonProps,
        chainId: plsTestChainId,
        contractAddress: '0x00c83aeCC790e8a4453e5dD3B0B4b3680501a7A7',
        standard: 'PRC777',
        logoUri: getImageUrlForToken({
          tokenContractAddress: '0x00c83aeCC790e8a4453e5dD3B0B4b3680501a7A7',
          tokenContractChainId: plsTestChainId,
        }),
      }
    },
  }

  public static getTokenForChainId(chainId: ChainId): Token | undefined {
    switch (chainId) {
      case ethMainChainId:
        return SKLToken.ETH.MAINNET()
      case plsMainChainId:
        return SKLToken.PULSE.MAINNET()
      case plsTestChainId:
        return SKLToken.PULSE.TESTNET()
      default:
        return undefined
    }
  }
}
