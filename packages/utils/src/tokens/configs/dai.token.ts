import type { Token } from '@dex-toolkit/types'
import type { ChainId } from '@multicall-toolkit/types'

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
  zkEVMMainChainId,
  zksyncMainChainId,
} from '../../chains/chainIds'
import { getImageUrlForToken } from '../logo-urls/logo-urls'

export class DAIToken {
  private static commonProps: Omit<
    Token,
    'chainId' | 'contractAddress' | 'standard'
  > = {
    name: 'Dai Stablecoin',
    symbol: 'DAI',
    decimals: 18,
    color: 'rgb(251, 178, 38)',
  }

  public static ARBITRUM = {
    MAINNET: (): Token => {
      return {
        ...DAIToken.commonProps,
        chainId: arbitrumMainChainId,
        contractAddress: '0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1',
        standard: 'ERC20',
        logoUri: getImageUrlForToken({
          tokenContractAddress: '0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1',
          tokenContractChainId: arbitrumMainChainId,
        }),
      }
    },
  }

  public static AVALANCHE = {
    MAINNET: (): Token => {
      return {
        ...DAIToken.commonProps,
        chainId: avaxMainChainId,
        symbol: 'DAI.e',
        contractAddress: '0xd586E7F844cEa2F87f50152665BCbc2C279D8d70',
        standard: 'ERC20',
        logoUri: getImageUrlForToken({
          tokenContractAddress: '0xd586E7F844cEa2F87f50152665BCbc2C279D8d70',
          tokenContractChainId: avaxMainChainId,
        }),
      }
    },
  }

  public static BASE = {
    MAINNET: (): Token => {
      return {
        ...DAIToken.commonProps,
        chainId: baseMainChainId,
        contractAddress: '0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb',
        standard: 'ERC20',
        logoUri: getImageUrlForToken({
          tokenContractAddress: '0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb',
          tokenContractChainId: baseMainChainId,
        }),
      }
    },
  }

  public static BSC = {
    MAINNET: (): Token => {
      return {
        ...DAIToken.commonProps,
        chainId: bscMainChainId,
        name: 'Dai Token',
        contractAddress: '0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3',
        standard: 'BEP20',
        logoUri: getImageUrlForToken({
          tokenContractAddress: '0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3',
          tokenContractChainId: bscMainChainId,
        }),
      }
    },
  }

  public static CELO = {
    MAINNET: (): Token => {
      return {
        ...DAIToken.commonProps,
        chainId: celoMainChainId,
        contractAddress: '0xE4fE50cdD716522A56204352f00AA110F731932d',
        standard: 'ERC20',
      }
    },
  }

  public static ENERGI = {
    MAINNET: (): Token => {
      return {
        ...DAIToken.commonProps,
        chainId: energiMainChainId,
        name: 'Dai',
        contractAddress: '0x0ee5893f434017d8881750101Ea2F7c49c0eb503',
        standard: 'ERC20',
        logoUri: getImageUrlForToken({
          tokenContractAddress: '0x0ee5893f434017d8881750101Ea2F7c49c0eb503',
          tokenContractChainId: energiMainChainId,
        }),
      }
    },
  }

  public static ETH = {
    MAINNET: (): Token => {
      return {
        ...DAIToken.commonProps,
        chainId: ethMainChainId,
        contractAddress: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
        standard: 'ERC20',
        logoUri: getImageUrlForToken({
          tokenContractAddress: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
          tokenContractChainId: ethMainChainId,
        }),
      }
    },
    SEPOLIA: (): Token => {
      return {
        ...DAIToken.commonProps,
        chainId: ethSepoliaChainId,
        name: 'DAI',
        contractAddress: '0x82fb927676b53b6eE07904780c7be9b4B50dB80b',
        standard: 'ERC20',
        logoUri: getImageUrlForToken({
          tokenContractAddress: '0x82fb927676b53b6eE07904780c7be9b4B50dB80b',
          tokenContractChainId: ethSepoliaChainId,
        }),
      }
    },
  }

  public static OPTIMISM = {
    MAINNET: (): Token => {
      return {
        ...DAIToken.commonProps,
        chainId: optimismMainChainId,
        contractAddress: '0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1',
        standard: 'ERC20',
        logoUri: getImageUrlForToken({
          tokenContractAddress: '0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1',
          tokenContractChainId: optimismMainChainId,
        }),
      }
    },
  }

  public static POLYGON = {
    MAINNET: (): Token => {
      return {
        ...DAIToken.commonProps,
        chainId: polygonMainChainId,
        name: '(PoS) Dai Stablecoin',
        contractAddress: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
        standard: 'ERC20',
        logoUri: getImageUrlForToken({
          tokenContractAddress: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
          tokenContractChainId: polygonMainChainId,
        }),
      }
    },
  }

  public static ZKEVM = {
    MAINNET: (): Token => {
      return {
        ...DAIToken.commonProps,
        chainId: zkEVMMainChainId,
        contractAddress: '0xC5015b9d9161Dca7e18e32f6f25C4aD850731Fd4',
        standard: 'ERC20',
        logoUri: getImageUrlForToken({
          tokenContractAddress: '0xC5015b9d9161Dca7e18e32f6f25C4aD850731Fd4',
          tokenContractChainId: zkEVMMainChainId,
        }),
      }
    },
  }

  public static PULSE = {
    MAINNET: (): Token => {
      return {
        ...DAIToken.commonProps,
        chainId: plsMainChainId,
        name: 'Dai Stablecoin from Ethereum',
        contractAddress: '0xefD766cCb38EaF1dfd701853BFCe31359239F305', // from Ethereum
        standard: 'PRC20',
        logoUri: getImageUrlForToken({
          tokenContractAddress: '0xefD766cCb38EaF1dfd701853BFCe31359239F305',
          tokenContractChainId: plsMainChainId,
        }),
      }
    },
    TESTNET: (): Token => {
      return {
        ...DAIToken.commonProps,
        name: 'DAI Mock from Sepolia',
        symbol: 'tDAI',
        chainId: plsTestChainId,
        contractAddress: '0x826e4e896CC2f5B371Cd7Bb0bd929DB3e3DB67c0', // from Sepolia
        standard: 'PRC20',
        logoUri: getImageUrlForToken({
          tokenContractAddress: '0x826e4e896CC2f5B371Cd7Bb0bd929DB3e3DB67c0',
          tokenContractChainId: plsTestChainId,
        }),
      }
    },
  }

  public static ZKSYNC = {
    MAINNET: (): Token => {
      return {
        ...DAIToken.commonProps,
        chainId: zksyncMainChainId,
        contractAddress: '0x4B9eb6c0b6ea15176BBF62841C6B2A8a398cb656',
        standard: 'PRC20',
        logoUri: getImageUrlForToken({
          tokenContractAddress: '0x4B9eb6c0b6ea15176BBF62841C6B2A8a398cb656',
          tokenContractChainId: zksyncMainChainId,
        }),
      }
    },
  }

  public static getTokenForChainId(chainId: ChainId): Token | undefined {
    switch (chainId) {
      case arbitrumMainChainId:
        return DAIToken.ARBITRUM.MAINNET()
      case avaxMainChainId:
        return DAIToken.AVALANCHE.MAINNET()
      case baseMainChainId:
        return DAIToken.BASE.MAINNET()
      case bscMainChainId:
        return DAIToken.BSC.MAINNET()
      case celoMainChainId:
        return DAIToken.CELO.MAINNET()
      case energiMainChainId:
        return DAIToken.ENERGI.MAINNET()
      case ethMainChainId:
        return DAIToken.ETH.MAINNET()
      case ethSepoliaChainId:
        return DAIToken.ETH.SEPOLIA()
      case optimismMainChainId:
        return DAIToken.OPTIMISM.MAINNET()
      case polygonMainChainId:
        return DAIToken.POLYGON.MAINNET()
      case zkEVMMainChainId:
        return DAIToken.ZKEVM.MAINNET()
      case plsMainChainId:
        return DAIToken.PULSE.MAINNET()
      case plsTestChainId:
        return DAIToken.PULSE.TESTNET()
      case zksyncMainChainId:
        return DAIToken.ZKSYNC.MAINNET()
      default:
        return undefined
    }
  }
}
