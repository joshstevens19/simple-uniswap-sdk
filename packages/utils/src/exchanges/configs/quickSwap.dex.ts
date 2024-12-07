import type {
  DexConfig,
  UniswapFactoryV3Types,
  UniswapPositionManagerV3Types,
  UniswapQuoterV3Types,
  UniswapRouterV3Types,
} from '@dex-toolkit/types'
import type { ChainId, ContractDetail } from '@ethereum-multicall/types'

import {
  uniswapFactoryV2ABI,
  uniswapPairV2ABI,
  uniswapPoolV3ABI,
  quickSwapRouterV2ABI,
  quickSwapRouterV3ABI,
  quickSwapFactoryV3ABI,
  quickSwapQuoterV3ABI,
  quickSwapPositionManagerV3ABI,
} from '../../abis/index'
import { polygonMainChainId, zkEVMMainChainId } from '../../chains/chainIds'
import { POLToken, WPOLToken } from '../../tokens/configs/index'
import { dexTypeMap } from '../../utils/dex.utils'

/**
 * App:
 * [QuickSwap](https://quickswap.exchange/#/swap)
 *
 * V2 / V3 Deployments:
 * [Contracts and Addresses](https://docs.quickswap.exchange/overview/contracts-and-addresses)
 */

const V3Router_1_0_0: ContractDetail<UniswapRouterV3Types.MethodNameMap>['methods'] =
  {
    WETH9: 'WNativeToken',
    factory: 'factory',

    // Swapping callbacks
    uniswapV3SwapCallback: 'algebraSwapCallback',

    // Swapping
    exactInput: 'exactInput',
    exactInputSingle: 'exactInputSingle',
    // exactInputSingleSupportingFeeOnTransferTokens:
    //   'exactInputSingleSupportingFeeOnTransferTokens',
    exactOutput: 'exactOutput',
    exactOutputSingle: 'exactOutputSingle',

    // Multicall
    multicall: 'multicall',

    // Sweep tokens
    sweepToken: 'sweepToken',
    sweepTokenWithFee: 'sweepTokenWithFee',

    // Unwrap native tokens
    unwrapWETH9: 'unwrapWNativeToken',
    unwrapWETH9WithFee: 'unwrapWNativeTokenWithFee',

    // Refund native tokens
    refundETH: 'refundNativeToken',

    // Self-permit
    selfPermit: 'selfPermit',
    selfPermitIfNecessary: 'selfPermitIfNecessary',
    selfPermitAllowed: 'selfPermitAllowed',
    selfPermitAllowedIfNecessary: 'selfPermitAllowedIfNecessary',
  }

const V3Factory_1_0_0: ContractDetail<UniswapFactoryV3Types.MethodNameMap>['methods'] =
  {
    // Core methods
    createPool: 'createPool',
    getPool: 'poolByPair',

    // Ownership
    owner: 'owner',
    setOwner: 'setOwner',

    // Disabled
    enableFeeTier: '',
    feeTierTickSpacing: '',
    parameters: '',
  }

const V3Quoter_1_0_0: ContractDetail<UniswapQuoterV3Types.MethodNameMap>['methods'] =
  {
    WETH9: 'WNativeToken',
    uniswapV3SwapCallback: 'algebraSwapCallback',
  }

const V3PositionManager_1_0_0: ContractDetail<UniswapPositionManagerV3Types.MethodNameMap>['methods'] =
  {
    WETH9: 'WNativeToken',
    refundETH: 'refundNativeToken',
    unwrapWETH9: 'unwrapWNativeToken',
    uniswapV3MintCallback: 'algebraMintCallback',
  }

export class QuickSwap {
  private static commonProps: Omit<DexConfig, 'chainId' | 'protocols'> = {
    dexType: dexTypeMap.QUICKSWAP,
    dexTag: dexTypeMap.QUICKSWAP,
    title: 'QuickSwap',
    logoUrl:
      'https://assets.coingecko.com/coins/images/31016/standard/Group_572_%282%29.png?1696529853',
    color: 'rgb(10, 214, 164)',
  }

  public static POLYGON = {
    MAINNET: (): DexConfig => {
      return {
        ...QuickSwap.commonProps,
        chainId: polygonMainChainId,
        defaultPairs: {
          inputAddress: POLToken.POLYGON.MAINNET().contractAddress,
          outputAddress: WPOLToken.POLYGON.MAINNET().contractAddress,
        },
        protocols: {
          protocolV2: {
            '1-0-0': {
              feePercent: 0.0025,
              router: {
                // https://polygonscan.com/address/0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff#readContract
                address: '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff',
                abi: quickSwapRouterV2ABI,
              },
              factory: {
                // https://polygonscan.com/address/0x5757371414417b8C6CAad45bAeF941aBc7d3Ab32#readContract
                address: '0x5757371414417b8C6CAad45bAeF941aBc7d3Ab32',
                abi: uniswapFactoryV2ABI,
              },
              pair: {
                abi: uniswapPairV2ABI,
              },
            },
          },
          protocolV3: {
            '1-0-0': {
              feeTiers: [
                0, 10, 59, 100, 360, 2_900, 8_500, 12_000, 60_000,
              ] as const,
              router: {
                // https://polygonscan.com/address/0xf5b509bB0909a69B1c207E495f687a596C168E12#readContract
                address: '0xf5b509bB0909a69B1c207E495f687a596C168E12',
                abi: quickSwapRouterV3ABI,
                methods: V3Router_1_0_0,
              },
              factory: {
                // https://polygonscan.com/address/0x411b0fAcC3489691f28ad58c47006AF5E3Ab3A28#readContract
                address: '0x411b0fAcC3489691f28ad58c47006AF5E3Ab3A28',
                abi: quickSwapFactoryV3ABI,
                methods: V3Factory_1_0_0,
              },
              quoter: {
                // https://polygonscan.com/address/0xa15F0D7377B2A0C0c10db057f641beD21028FC89#readContract
                address: '0xa15F0D7377B2A0C0c10db057f641beD21028FC89',
                abi: quickSwapQuoterV3ABI,
                methods: V3Quoter_1_0_0,
              },
              positionManager: {
                // https://polygonscan.com/address/0x8eF88E4c7CfbbaC1C163f7eddd4B578792201de6#readContract
                address: '0x8eF88E4c7CfbbaC1C163f7eddd4B578792201de6',
                abi: quickSwapPositionManagerV3ABI,
                methods: V3PositionManager_1_0_0,
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

  public static ZKEVM = {
    MAINNET: (): DexConfig => {
      return {
        ...QuickSwap.commonProps,
        chainId: zkEVMMainChainId,
        defaultPairs: {
          inputAddress: POLToken.ZKEVM.MAINNET().contractAddress,
          outputAddress: WPOLToken.ZKEVM.MAINNET().contractAddress,
        },
        protocols: {
          protocolV3: {
            '1-0-0': {
              feeTiers: [
                0, 10, 59, 100, 360, 2_900, 8_500, 12_000, 60_000,
              ] as const,
              router: {
                // https://zkevm.polygonscan.com/address/0xF6Ad3CcF71Abb3E12beCf6b3D2a74C963859ADCd#readContract
                address: '0xF6Ad3CcF71Abb3E12beCf6b3D2a74C963859ADCd',
                abi: quickSwapRouterV3ABI,
                methods: V3Router_1_0_0,
              },
              factory: {
                // https://zkevm.polygonscan.com/address/0x4B9f4d2435Ef65559567e5DbFC1BbB37abC43B57#readContract
                address: '0x4B9f4d2435Ef65559567e5DbFC1BbB37abC43B57',
                abi: quickSwapFactoryV3ABI,
                methods: V3Factory_1_0_0,
              },
              quoter: {
                // https://zkevm.polygonscan.com/address/0x55BeE1bD3Eb9986f6d2d963278de09eE92a3eF1D#readContract
                address: '0x55BeE1bD3Eb9986f6d2d963278de09eE92a3eF1D',
                abi: quickSwapQuoterV3ABI,
                methods: V3Quoter_1_0_0,
              },
              positionManager: {
                // https://zkevm.polygonscan.com/address/0xd8E1E7009802c914b0d39B31Fc1759A865b727B1#readContract
                address: '0xd8E1E7009802c914b0d39B31Fc1759A865b727B1',
                abi: quickSwapPositionManagerV3ABI,
                methods: V3PositionManager_1_0_0,
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
      case polygonMainChainId:
        return QuickSwap.POLYGON.MAINNET()
      case zkEVMMainChainId:
        return QuickSwap.ZKEVM.MAINNET()
      default:
        return undefined
    }
  }

  public static getAllDexConfigs(): DexConfig[] {
    return [QuickSwap.POLYGON.MAINNET(), QuickSwap.ZKEVM.MAINNET()]
  }
}
