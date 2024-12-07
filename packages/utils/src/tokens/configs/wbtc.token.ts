import type { Token } from '@dex-toolkit/types'
import type { ChainId } from '@ethereum-multicall/types'

import {
  arbitrumMainChainId,
  avaxMainChainId,
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

export class WBTCToken {
  private static commonProps: Omit<
    Token,
    'chainId' | 'contractAddress' | 'standard'
  > = {
    name: 'Wrapped BTC',
    symbol: 'WBTC',
    decimals: 8,
    color: 'rgb(25, 27, 27)',
  }

  public static ARBITRUM = {
    MAINNET: (): Token => {
      return {
        ...WBTCToken.commonProps,
        chainId: arbitrumMainChainId,
        contractAddress: '0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f',
        standard: 'ERC20',
        logoUri: getImageUrlForToken({
          tokenContractAddress: '0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f',
          tokenContractChainId: arbitrumMainChainId,
        }),
      }
    },
  }

  public static AVALANCHE = {
    MAINNET: (): Token => {
      return {
        ...WBTCToken.commonProps,
        chainId: avaxMainChainId,
        symbol: 'WBTC.e',
        contractAddress: '0x50b7545627a5162F82A992c33b87aDc75187B218',
        standard: 'ERC20',
        logoUri: getImageUrlForToken({
          tokenContractAddress: '0x50b7545627a5162F82A992c33b87aDc75187B218',
          tokenContractChainId: avaxMainChainId,
        }),
      }
    },
  }

  public static BSC = {
    MAINNET: (): Token => {
      return {
        ...WBTCToken.commonProps,
        chainId: bscMainChainId,
        contractAddress: '0x0555E30da8f98308EdB960aa94C0Db47230d2B9c',
        standard: 'BEP20',
        logoUri: getImageUrlForToken({
          tokenContractAddress: '0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f',
          tokenContractChainId: bscMainChainId,
        }),
      }
    },
  }

  public static ENERGI = {
    MAINNET: (): Token => {
      return {
        ...WBTCToken.commonProps,
        chainId: energiMainChainId,
        name: 'Bitcoin',
        symbol: 'BTC',
        contractAddress: '0x29a791703e5A5A8D1578F8611b4D3691377CEbc0',
        standard: 'ERC20',
        logoUri: getImageUrlForToken({
          tokenContractAddress: '0x29a791703e5A5A8D1578F8611b4D3691377CEbc0',
          tokenContractChainId: energiMainChainId,
        }),
      }
    },
  }

  public static CELO = {
    MAINNET: (): Token => {
      return {
        ...WBTCToken.commonProps,
        chainId: celoMainChainId,
        contractAddress: '0xd71Ffd0940c920786eC4DbB5A12306669b5b81EF',
        standard: 'ERC20',
        logoUri: getImageUrlForToken({
          tokenContractAddress: '0xd71Ffd0940c920786eC4DbB5A12306669b5b81EF',
          tokenContractChainId: energiMainChainId,
        }),
      }
    },
  }

  public static ETH = {
    MAINNET: (): Token => {
      return {
        ...WBTCToken.commonProps,
        chainId: ethMainChainId,
        contractAddress: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
        standard: 'ERC20',
        logoUri: getImageUrlForToken({
          tokenContractAddress: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
          tokenContractChainId: ethMainChainId,
        }),
      }
    },
    SEPOLIA: (): Token => {
      return {
        ...WBTCToken.commonProps,
        chainId: ethSepoliaChainId,
        name: 'wBTC',
        symbol: 'wBTC',
        contractAddress: '0xFF82bB6DB46Ad45F017e2Dfb478102C7671B13b3',
        standard: 'ERC20',
        logoUri: getImageUrlForToken({
          tokenContractAddress: '0xFF82bB6DB46Ad45F017e2Dfb478102C7671B13b3',
          tokenContractChainId: ethSepoliaChainId,
        }),
      }
    },
  }

  public static OPTIMISM = {
    MAINNET: (): Token => {
      return {
        ...WBTCToken.commonProps,
        chainId: optimismMainChainId,
        contractAddress: '0x68f180fcCe6836688e9084f035309E29Bf0A2095',
        standard: 'ERC20',
        logoUri: getImageUrlForToken({
          tokenContractAddress: '0x68f180fcCe6836688e9084f035309E29Bf0A2095',
          tokenContractChainId: optimismMainChainId,
        }),
      }
    },
  }

  public static POLYGON = {
    MAINNET: (): Token => {
      return {
        ...WBTCToken.commonProps,
        chainId: polygonMainChainId,
        name: '(PoS) Wrapped BTC',
        contractAddress: '0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6',
        standard: 'ERC20',
        logoUri: getImageUrlForToken({
          tokenContractAddress: '0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6',
          tokenContractChainId: polygonMainChainId,
        }),
      }
    },
  }

  public static PULSE = {
    MAINNET: (): Token => {
      return {
        ...WBTCToken.commonProps,
        chainId: plsMainChainId,
        contractAddress: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599', // from Ethereum
        standard: 'PRC20',
        logoUri: getImageUrlForToken({
          tokenContractAddress: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
          tokenContractChainId: plsMainChainId,
        }),
      }
    },
    TESTNET: (): Token => {
      return {
        ...WBTCToken.commonProps,
        chainId: plsTestChainId,
        contractAddress: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
        standard: 'PRC20',
        logoUri: getImageUrlForToken({
          tokenContractAddress: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
          tokenContractChainId: plsTestChainId,
        }),
      }
    },
  }

  public static ZKEVM = {
    MAINNET: (): Token => {
      return {
        ...WBTCToken.commonProps,
        chainId: zkEVMMainChainId,
        contractAddress: '0xEA034fb02eB1808C2cc3adbC15f447B93CbE08e1',
        standard: 'ERC20',
      }
    },
  }

  public static ZKSYNC = {
    MAINNET: (): Token => {
      return {
        ...WBTCToken.commonProps,
        chainId: zksyncMainChainId,
        contractAddress: '0xBBeB516fb02a01611cBBE0453Fe3c580D7281011',
        standard: 'ERC20',
        logoUri: getImageUrlForToken({
          tokenContractAddress: '0xBBeB516fb02a01611cBBE0453Fe3c580D7281011',
          tokenContractChainId: zksyncMainChainId,
        }),
      }
    },
  }

  public static getTokenForChainId(chainId: ChainId): Token | undefined {
    switch (chainId) {
      case arbitrumMainChainId:
        return WBTCToken.ARBITRUM.MAINNET()
      case avaxMainChainId:
        return WBTCToken.AVALANCHE.MAINNET()
      case energiMainChainId:
        return WBTCToken.ENERGI.MAINNET()
      case celoMainChainId:
        return WBTCToken.CELO.MAINNET()
      case ethMainChainId:
        return WBTCToken.ETH.MAINNET()
      case ethSepoliaChainId:
        return WBTCToken.ETH.SEPOLIA()
      case optimismMainChainId:
        return WBTCToken.OPTIMISM.MAINNET()
      case polygonMainChainId:
        return WBTCToken.POLYGON.MAINNET()
      case plsMainChainId:
        return WBTCToken.PULSE.MAINNET()
      case plsTestChainId:
        return WBTCToken.PULSE.TESTNET()
      case zkEVMMainChainId:
        return WBTCToken.ZKEVM.MAINNET()
      case zksyncMainChainId:
        return WBTCToken.ZKSYNC.MAINNET()
      default:
        return undefined
    }
  }
}
