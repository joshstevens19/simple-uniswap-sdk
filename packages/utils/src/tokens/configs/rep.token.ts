import type { Token } from '@dex-toolkit/types'
import type { ChainId } from '@ethereum-multicall/types'

import {
  ethMainChainId,
  energiMainChainId,
  plsMainChainId,
  plsTestChainId,
} from '../../chains/chainIds'
import { getImageUrlForToken } from '../logo-urls/logo-urls'

export class REPToken {
  private static commonProps: Omit<
    Token,
    'chainId' | 'contractAddress' | 'standard'
  > = {
    name: 'Reputation',
    symbol: 'REPv2',
    decimals: 18,
    color: 'rgb(37, 196, 146)',
  }

  public static ETH = {
    MAINNET: (): Token => {
      return {
        ...REPToken.commonProps,
        chainId: ethMainChainId,
        contractAddress: '0x221657776846890989a759BA2973e427DfF5C9bB',
        standard: 'ERC20',
        logoUri: getImageUrlForToken({
          tokenContractAddress: '0x221657776846890989a759BA2973e427DfF5C9bB',
          tokenContractChainId: ethMainChainId,
        }),
      }
    },
  }

  public static ENERGI = {
    MAINNET: (): Token => {
      return {
        ...REPToken.commonProps,
        chainId: energiMainChainId,
        name: 'Augur',
        symbol: 'REP',
        contractAddress: '0x2A2666F62157769D09A64488Bbb51bD77036F6CE',
        standard: 'ERC20',
        logoUri: getImageUrlForToken({
          tokenContractAddress: '0x2A2666F62157769D09A64488Bbb51bD77036F6CE',
          tokenContractChainId: energiMainChainId,
        }),
      }
    },
  }

  public static PULSE = {
    MAINNET: (): Token => {
      return {
        ...REPToken.commonProps,
        chainId: plsMainChainId,
        contractAddress: '0x221657776846890989a759BA2973e427DfF5C9bB',
        standard: 'PRC20',
        logoUri: getImageUrlForToken({
          tokenContractAddress: '0x221657776846890989a759BA2973e427DfF5C9bB',
          tokenContractChainId: plsMainChainId,
        }),
      }
    },
    TESTNET: (): Token => {
      return {
        ...REPToken.commonProps,
        chainId: plsTestChainId,
        contractAddress: '0x221657776846890989a759BA2973e427DfF5C9bB',
        standard: 'PRC20',
        logoUri: getImageUrlForToken({
          tokenContractAddress: '0x221657776846890989a759BA2973e427DfF5C9bB',
          tokenContractChainId: plsTestChainId,
        }),
      }
    },
  }

  public static getTokenForChainId(chainId: ChainId): Token | undefined {
    switch (chainId) {
      case ethMainChainId:
        return REPToken.ETH.MAINNET()
      case energiMainChainId:
        return REPToken.ENERGI.MAINNET()
      case plsMainChainId:
        return REPToken.PULSE.MAINNET()
      case plsTestChainId:
        return REPToken.PULSE.TESTNET()
      default:
        return undefined
    }
  }
}
