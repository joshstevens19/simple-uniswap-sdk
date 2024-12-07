import type { Token } from '@dex-toolkit/types'
import type { ChainId } from '@multicall-toolkit/types'

import {
  arbitrumMainChainId,
  baseMainChainId,
  bscMainChainId,
  ethMainChainId,
  zkEVMMainChainId,
  zksyncMainChainId,
} from '../../chains/chainIds'
import { getImageUrlForToken } from '../logo-urls/logo-urls'

export class CAKEToken {
  private static commonProps: Omit<
    Token,
    'chainId' | 'contractAddress' | 'standard'
  > = {
    name: 'PancakeSwap Token',
    symbol: 'Cake',
    decimals: 18,
    color: 'rgb(54, 210, 223)',
  }

  public static ARBITRUM = {
    MAINNET: (): Token => {
      return {
        ...CAKEToken.commonProps,
        chainId: arbitrumMainChainId,
        contractAddress: '0x1b896893dfc86bb67Cf57767298b9073D2c1bA2c',
        standard: 'ERC20',
        logoUri: getImageUrlForToken({
          tokenContractAddress: '0x1b896893dfc86bb67Cf57767298b9073D2c1bA2c',
          tokenContractChainId: arbitrumMainChainId,
        }),
      }
    },
  }

  public static BASE = {
    MAINNET: (): Token => {
      return {
        ...CAKEToken.commonProps,
        chainId: baseMainChainId,
        contractAddress: '0x3055913c90Fcc1A6CE9a358911721eEb942013A1',
        standard: 'ERC20',
        logoUri: getImageUrlForToken({
          tokenContractAddress: '0x3055913c90Fcc1A6CE9a358911721eEb942013A1',
          tokenContractChainId: baseMainChainId,
        }),
      }
    },
  }

  public static BSC = {
    MAINNET: (): Token => {
      return {
        ...CAKEToken.commonProps,
        chainId: bscMainChainId,
        contractAddress: '0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82',
        standard: 'BEP20',
        logoUri: getImageUrlForToken({
          tokenContractAddress: '0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82',
          tokenContractChainId: bscMainChainId,
        }),
      }
    },
  }

  public static ETH = {
    MAINNET: (): Token => {
      return {
        ...CAKEToken.commonProps,
        chainId: ethMainChainId,
        contractAddress: '0x152649eA73beAb28c5b49B26eb48f7EAD6d4c898',
        standard: 'ERC20',
        logoUri: getImageUrlForToken({
          tokenContractAddress: '0x152649eA73beAb28c5b49B26eb48f7EAD6d4c898',
          tokenContractChainId: ethMainChainId,
        }),
      }
    },
  }

  public static ZKEVM = {
    MAINNET: (): Token => {
      return {
        ...CAKEToken.commonProps,
        chainId: zkEVMMainChainId,
        contractAddress: '0x0D1E753a25eBda689453309112904807625bEFBe',
        standard: 'ERC20',
        logoUri: getImageUrlForToken({
          tokenContractAddress: '0x0D1E753a25eBda689453309112904807625bEFBe',
          tokenContractChainId: zkEVMMainChainId,
        }),
      }
    },
  }

  public static ZKSYNC = {
    MAINNET: (): Token => {
      return {
        ...CAKEToken.commonProps,
        chainId: zksyncMainChainId,
        contractAddress: '0x3A287a06c66f9E95a56327185cA2BDF5f031cEcD',
        standard: 'ERC20',
        logoUri: getImageUrlForToken({
          tokenContractAddress: '0x3A287a06c66f9E95a56327185cA2BDF5f031cEcD',
          tokenContractChainId: zksyncMainChainId,
        }),
      }
    },
  }

  public static getTokenForChainId(chainId: ChainId): Token | undefined {
    switch (chainId) {
      case arbitrumMainChainId:
        return CAKEToken.ARBITRUM.MAINNET()
      case baseMainChainId:
        return CAKEToken.BASE.MAINNET()
      case bscMainChainId:
        return CAKEToken.BSC.MAINNET()
      case ethMainChainId:
        return CAKEToken.ETH.MAINNET()
      case zkEVMMainChainId:
        return CAKEToken.ZKEVM.MAINNET()
      case zksyncMainChainId:
        return CAKEToken.ZKSYNC.MAINNET()
      default:
        return undefined
    }
  }
}
