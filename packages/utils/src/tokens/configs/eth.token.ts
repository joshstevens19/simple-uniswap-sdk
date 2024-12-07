import type { Token } from '@dex-toolkit/types'
import type { ChainId } from '@ethereum-multicall/types'

import { WETHToken } from './weth.token'
import {
  arbitrumMainChainId,
  arbitrumSepoliaChainId,
  celoAlfajoresChainId,
  celoMainChainId,
  ethMainChainId,
  ethSepoliaChainId,
  optimismMainChainId,
  optimismSepoliaChainId,
  polygonMainChainId,
  baseMainChainId,
  baseSepoliaChainId,
  zksyncMainChainId,
  zksyncSepoliaChainId,
  zoraMainChainId,
  zoraSepoliaChainId,
  blastMainChainId,
  blastSepoliaChainId,
  ethHoleskyChainId,
  zkEVMMainChainId,
} from '../../chains/chainIds'
import { transformWrappedAddressToCoinAddress } from '../../utils/address.utils'
import { getImageUrlForToken } from '../logo-urls/logo-urls'

export class ETHCoin {
  private static commonProps: Omit<
    Token,
    'chainId' | 'contractAddress' | 'standard'
  > = {
    name: 'Ether',
    symbol: 'ETH',
    decimals: 18,
    logoUri: getImageUrlForToken({
      tokenContractChainId: ethMainChainId,
    }),
    color: 'rgb(124, 124, 131)',
  }

  public static ARBITRUM = {
    MAINNET: (): Token => {
      return {
        ...ETHCoin.commonProps,
        chainId: arbitrumMainChainId,
        contractAddress: transformWrappedAddressToCoinAddress(
          WETHToken.ARBITRUM.MAINNET().contractAddress,
        ),
        standard: 'ERC20',
      }
    },
    SEPOLIA: (): Token => {
      return {
        ...ETHCoin.commonProps,
        chainId: arbitrumSepoliaChainId,
        name: 'Ether (odex.fi)',
        contractAddress: transformWrappedAddressToCoinAddress(
          WETHToken.ARBITRUM.SEPOLIA().contractAddress,
        ),
        standard: 'ERC20',
      }
    },
  }

  public static BASE = {
    MAINNET: (): Token => {
      return {
        ...ETHCoin.commonProps,
        chainId: baseMainChainId,
        contractAddress: transformWrappedAddressToCoinAddress(
          WETHToken.BASE.MAINNET().contractAddress,
        ),
        standard: 'ERC20',
      }
    },
    SEPOLIA: (): Token => {
      return {
        ...ETHCoin.commonProps,
        chainId: baseSepoliaChainId,
        contractAddress: transformWrappedAddressToCoinAddress(
          WETHToken.BASE.SEPOLIA().contractAddress,
        ),
        standard: 'ERC20',
      }
    },
  }

  public static BLAST = {
    MAINNET: (): Token => {
      return {
        ...ETHCoin.commonProps,
        chainId: blastMainChainId,
        contractAddress: transformWrappedAddressToCoinAddress(
          WETHToken.BLAST.MAINNET().contractAddress,
        ),
        standard: 'ERC20',
      }
    },
    SEPOLIA: (): Token => {
      return {
        ...ETHCoin.commonProps,
        chainId: blastSepoliaChainId,
        contractAddress: transformWrappedAddressToCoinAddress(
          WETHToken.BLAST.SEPOLIA().contractAddress,
        ),
        standard: 'ERC20',
      }
    },
  }

  public static CELO = {
    MAINNET: (): Token => {
      return {
        ...ETHCoin.commonProps,
        chainId: celoMainChainId,
        name: 'Ether',
        contractAddress: transformWrappedAddressToCoinAddress(
          WETHToken.CELO.MAINNET().contractAddress,
        ),
        standard: 'ERC20',
      }
    },
    ALFAJORES: (): Token => {
      return {
        ...ETHCoin.commonProps,
        chainId: celoAlfajoresChainId,
        name: 'Celo native asset',
        symbol: 'CELO',
        contractAddress: transformWrappedAddressToCoinAddress(
          WETHToken.CELO.ALFAJORES().contractAddress,
        ),
        standard: 'ERC20',
      }
    },
  }

  public static ETH = {
    MAINNET: (): Token => {
      return {
        ...ETHCoin.commonProps,
        chainId: ethMainChainId,
        contractAddress: transformWrappedAddressToCoinAddress(
          WETHToken.ETH.MAINNET().contractAddress,
        ),
        standard: 'ERC20',
      }
    },
    HOLESKY: (): Token => {
      return {
        ...ETHCoin.commonProps,
        chainId: ethHoleskyChainId,
        contractAddress: transformWrappedAddressToCoinAddress(
          WETHToken.ETH.HOLESKY().contractAddress,
        ),
        standard: 'ERC20',
      }
    },
    SEPOLIA: (): Token => {
      return {
        ...ETHCoin.commonProps,
        chainId: ethSepoliaChainId,
        contractAddress: transformWrappedAddressToCoinAddress(
          WETHToken.ETH.SEPOLIA().contractAddress,
        ),
        standard: 'ERC20',
      }
    },
  }

  public static OPTIMISM = {
    MAINNET: (): Token => {
      return {
        ...ETHCoin.commonProps,
        chainId: optimismMainChainId,
        contractAddress: transformWrappedAddressToCoinAddress(
          WETHToken.OPTIMISM.MAINNET().contractAddress,
        ),
        standard: 'ERC20',
      }
    },
    SEPOLIA: (): Token => {
      return {
        ...ETHCoin.commonProps,
        chainId: optimismSepoliaChainId,
        contractAddress: transformWrappedAddressToCoinAddress(
          WETHToken.OPTIMISM.SEPOLIA().contractAddress,
        ),
        standard: 'ERC20',
      }
    },
  }

  public static POLYGON = {
    MAINNET: (): Token => {
      return {
        ...ETHCoin.commonProps,
        chainId: polygonMainChainId,
        contractAddress: transformWrappedAddressToCoinAddress(
          WETHToken.POLYGON.MAINNET().contractAddress,
        ),
        standard: 'ERC20',
      }
    },
  }

  public static ZKEVM = {
    MAINNET: (): Token => {
      return {
        ...ETHCoin.commonProps,
        chainId: zkEVMMainChainId,
        contractAddress: transformWrappedAddressToCoinAddress(
          WETHToken.ZKEVM.MAINNET().contractAddress,
        ),
        standard: 'ERC20',
      }
    },
  }

  public static ZKSYNC = {
    MAINNET: (): Token => {
      return {
        ...ETHCoin.commonProps,
        chainId: zksyncMainChainId,
        contractAddress: transformWrappedAddressToCoinAddress(
          WETHToken.ZKSYNC.MAINNET().contractAddress,
        ),
        standard: 'ERC20',
      }
    },
    SEPOLIA: (): Token => {
      return {
        ...ETHCoin.commonProps,
        chainId: zksyncSepoliaChainId,
        contractAddress: transformWrappedAddressToCoinAddress(
          WETHToken.ZKSYNC.SEPOLIA().contractAddress,
        ),
        standard: 'ERC20',
      }
    },
  }

  public static ZORA = {
    MAINNET: (): Token => {
      return {
        ...ETHCoin.commonProps,
        chainId: zoraMainChainId,
        contractAddress: transformWrappedAddressToCoinAddress(
          WETHToken.ZORA.MAINNET().contractAddress,
        ),
        standard: 'ERC20',
      }
    },
    SEPOLIA: (): Token => {
      return {
        ...ETHCoin.commonProps,
        chainId: zoraSepoliaChainId,
        contractAddress: transformWrappedAddressToCoinAddress(
          WETHToken.ZORA.SEPOLIA().contractAddress,
        ),
        standard: 'ERC20',
      }
    },
  }

  public static getTokenForChainId(chainId: ChainId): Token | undefined {
    switch (chainId) {
      case arbitrumMainChainId:
        return ETHCoin.ARBITRUM.MAINNET()
      case arbitrumSepoliaChainId:
        return ETHCoin.ARBITRUM.SEPOLIA()

      case baseMainChainId:
        return ETHCoin.BASE.MAINNET()
      case baseSepoliaChainId:
        return ETHCoin.BASE.SEPOLIA()

      case blastMainChainId:
        return ETHCoin.BLAST.MAINNET()
      case blastSepoliaChainId:
        return ETHCoin.BLAST.SEPOLIA()

      case celoMainChainId:
        return ETHCoin.CELO.MAINNET()
      case celoAlfajoresChainId:
        return ETHCoin.CELO.ALFAJORES()

      case ethMainChainId:
        return ETHCoin.ETH.MAINNET()
      case ethHoleskyChainId:
        return ETHCoin.ETH.HOLESKY()
      case ethSepoliaChainId:
        return ETHCoin.ETH.SEPOLIA()

      case optimismMainChainId:
        return ETHCoin.OPTIMISM.MAINNET()
      case optimismSepoliaChainId:
        return ETHCoin.OPTIMISM.SEPOLIA()

      case polygonMainChainId:
        return ETHCoin.POLYGON.MAINNET()

      case zkEVMMainChainId:
        return ETHCoin.ZKEVM.MAINNET()

      case zksyncMainChainId:
        return ETHCoin.ZKSYNC.MAINNET()
      case zksyncSepoliaChainId:
        return ETHCoin.ZKSYNC.SEPOLIA()

      case zoraMainChainId:
        return ETHCoin.ZORA.MAINNET()
      case zoraSepoliaChainId:
        return ETHCoin.ZORA.SEPOLIA()

      default:
        return undefined
    }
  }
}
