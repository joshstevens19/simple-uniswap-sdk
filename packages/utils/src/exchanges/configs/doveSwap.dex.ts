import { zkEVMMainChainId } from '@chain-toolkit/chains'
import type { ChainId } from '@chain-toolkit/schemas'
import type { DexConfig } from '@dex-toolkit/types'

import {
  uniswapFactoryV3ABI,
  uniswapPoolV3ABI,
  uniswapPositionManagerV3ABI,
  uniswapQuoterV3ABI,
  uniswapRouterV3ABI,
} from '../../abis/index'
import { POLToken, WPOLToken } from '../../tokens/configs/index'
import { dexTypeMap } from '../../utils/dex.utils'

/**
 * App
 * [Swap Interface](https://swap.dovish.finance/#/swap)
 *
 * V3 Deployments:
 * [Deployment Details](https://dovish.gitbook.io/doveswap-v3/technical-reference/deployment-addresses)
 */

export class DoveSwap {
  private static commonProps: Omit<DexConfig, 'chainId' | 'protocols'> = {
    dexType: dexTypeMap.DOVESWAP,
    dexTag: dexTypeMap.DOVESWAP,
    title: 'DoveSwap',
    logoUrl:
      'https://assets.coingecko.com/coins/images/31016/standard/Group_572_%282%29.png?1696529853',
    color: 'rgb(10, 214, 164)',
  }

  public static ZKEVM = {
    MAINNET: (): DexConfig => {
      return {
        ...DoveSwap.commonProps,
        chainId: zkEVMMainChainId,
        defaultPairs: {
          inputAddress: POLToken.ZKEVM.MAINNET().contractAddress,
          outputAddress: WPOLToken.ZKEVM.MAINNET().contractAddress,
        },
        protocols: {
          protocolV3: {
            '1-0-0': {
              feeTiers: [100, 500, 3000, 10_000] as const,
              router: {
                //0x7481C16E7782608CcBa70029c0Fd41D78Aa6B56E - Universal Router
                // https://zkevm.polygonscan.com/address/0x95bF28C6502a0544c7ADc154BC60D886d9A80a5c#readContract
                address: '0x95bF28C6502a0544c7ADc154BC60D886d9A80a5c',
                abi: uniswapRouterV3ABI,
              },
              factory: {
                // https://zkevm.polygonscan.com/address/0xdE474Db1Fa59898BC91314328D29507AcD0D593c#readContract
                address: '0xdE474Db1Fa59898BC91314328D29507AcD0D593c',
                abi: uniswapFactoryV3ABI,
              },
              quoter: {
                // https://zkevm.polygonscan.com/address/0x3F886B1274bB2ec14e0543c51fe0F9b73C975219#readContract
                address: '0x3F886B1274bB2ec14e0543c51fe0F9b73C975219',
                abi: uniswapQuoterV3ABI,
              },
              positionManager: {
                // https://zkevm.polygonscan.com/address/0x8Bd4AB4cF017e15D630F325aa4F6362c224b864b#readContract
                address: '0x8Bd4AB4cF017e15D630F325aa4F6362c224b864b',
                abi: uniswapPositionManagerV3ABI,
              },
              pool: {
                abi: uniswapPoolV3ABI,
              },
            },
          },
        },
      }
    },
  }

  public static getDexConfig(chainId: ChainId): DexConfig | undefined {
    switch (chainId) {
      case zkEVMMainChainId:
        return DoveSwap.ZKEVM.MAINNET()
      default:
        return undefined
    }
  }

  public static getAllDexConfigs(): DexConfig[] {
    return [DoveSwap.ZKEVM.MAINNET()]
  }
}
