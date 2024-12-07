import type { Token } from '@dex-toolkit/types'
import type { ChainId } from '@ethereum-multicall/types'

import {
  arbitrumMainChainId,
  avaxMainChainId,
  bscMainChainId,
  energiMainChainId,
  ethMainChainId,
  optimismMainChainId,
  plsMainChainId,
  plsTestChainId,
  polygonMainChainId,
} from '../../chains/chainIds'
import { getImageUrlForToken } from '../logo-urls/logo-urls'

export class AAVEToken {
  private static commonProps: Omit<
    Token,
    'chainId' | 'contractAddress' | 'standard'
  > = {
    name: 'Aave Token',
    symbol: 'AAVE',
    decimals: 18,
    color: 'rgb(146, 145, 255)',
    logoUri: getImageUrlForToken({
      tokenContractAddress: '0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9',
      tokenContractChainId: ethMainChainId,
    }),
  }

  public static ARBITRUM = {
    MAINNET: (): Token => {
      return {
        ...AAVEToken.commonProps,
        chainId: arbitrumMainChainId,
        contractAddress: '0xba5DdD1f9d7F570dc94a51479a000E3BCE967196',
        standard: 'ERC20',
        logoUri: getImageUrlForToken({
          tokenContractAddress: '0xba5DdD1f9d7F570dc94a51479a000E3BCE967196',
          tokenContractChainId: arbitrumMainChainId,
        }),
      }
    },
  }

  public static AVALANCHE = {
    MAINNET: (): Token => {
      return {
        ...AAVEToken.commonProps,
        chainId: avaxMainChainId,
        symbol: 'AAVE.e',
        contractAddress: '0x63a72806098Bd3D9520cC43356dD78afe5D386D9',
        standard: 'ERC20',
        logoUri: getImageUrlForToken({
          tokenContractAddress: '0x63a72806098Bd3D9520cC43356dD78afe5D386D9',
          tokenContractChainId: avaxMainChainId,
        }),
      }
    },
  }

  public static BSC = {
    MAINNET: (): Token => {
      return {
        ...AAVEToken.commonProps,
        chainId: bscMainChainId,
        contractAddress: '0xfb6115445Bff7b52FeB98650C87f44907E58f802',
        standard: 'BEP20',
        logoUri: getImageUrlForToken({
          tokenContractAddress: '0xfb6115445Bff7b52FeB98650C87f44907E58f802',
          tokenContractChainId: bscMainChainId,
        }),
      }
    },
  }
  public static ETH = {
    MAINNET: (): Token => {
      return {
        ...AAVEToken.commonProps,
        chainId: ethMainChainId,
        contractAddress: '0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9',
        standard: 'ERC20',
        logoUri: getImageUrlForToken({
          tokenContractAddress: '0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9',
          tokenContractChainId: ethMainChainId,
        }),
      }
    },
  }

  public static ENERGI = {
    MAINNET: (): Token => {
      return {
        ...AAVEToken.commonProps,
        chainId: energiMainChainId,
        name: 'Aave',
        contractAddress: '0xA7F2f790355E0C32CAb03f92F6EB7f488E6F049a',
        standard: 'ERC20',
        logoUri: getImageUrlForToken({
          tokenContractAddress: '0xA7F2f790355E0C32CAb03f92F6EB7f488E6F049a',
          tokenContractChainId: energiMainChainId,
        }),
      }
    },
  }

  public static OPTIMISM = {
    MAINNET: (): Token => {
      return {
        ...AAVEToken.commonProps,
        chainId: optimismMainChainId,
        contractAddress: '0x76FB31fb4af56892A25e32cFC43De717950c9278',
        standard: 'ERC20',
        logoUri: getImageUrlForToken({
          tokenContractAddress: '0x76FB31fb4af56892A25e32cFC43De717950c9278',
          tokenContractChainId: optimismMainChainId,
        }),
      }
    },
  }

  public static POLYGON = {
    MAINNET: (): Token => {
      return {
        ...AAVEToken.commonProps,
        chainId: polygonMainChainId,
        name: 'Aave (PoS)',
        contractAddress: '0xD6DF932A45C0f255f85145f286eA0b292B21C90B',
        standard: 'ERC20',
        logoUri: getImageUrlForToken({
          tokenContractAddress: '0xD6DF932A45C0f255f85145f286eA0b292B21C90B',
          tokenContractChainId: polygonMainChainId,
        }),
      }
    },
  }

  public static PULSE = {
    MAINNET: (): Token => {
      return {
        ...AAVEToken.commonProps,
        chainId: plsMainChainId,
        contractAddress: '0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9',
        standard: 'PRC20',
        logoUri: getImageUrlForToken({
          tokenContractAddress: '0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9',
          tokenContractChainId: plsMainChainId,
        }),
      }
    },
    TESTNET: (): Token => {
      return {
        ...AAVEToken.commonProps,
        chainId: plsTestChainId,
        contractAddress: '0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9',
        standard: 'PRC20',
        logoUri: getImageUrlForToken({
          tokenContractAddress: '0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9',
          tokenContractChainId: plsTestChainId,
        }),
      }
    },
  }

  public static getTokenForChainId(chainId: ChainId): Token | undefined {
    switch (chainId) {
      case arbitrumMainChainId:
        return AAVEToken.ARBITRUM.MAINNET()
      case avaxMainChainId:
        return AAVEToken.AVALANCHE.MAINNET()
      case bscMainChainId:
        return AAVEToken.BSC.MAINNET()
      case energiMainChainId:
        return AAVEToken.ENERGI.MAINNET()
      case ethMainChainId:
        return AAVEToken.ETH.MAINNET()
      case optimismMainChainId:
        return AAVEToken.OPTIMISM.MAINNET()
      case polygonMainChainId:
        return AAVEToken.POLYGON.MAINNET()
      case plsMainChainId:
        return AAVEToken.PULSE.MAINNET()
      case plsTestChainId:
        return AAVEToken.PULSE.TESTNET()
      default:
        return undefined
    }
  }
}
