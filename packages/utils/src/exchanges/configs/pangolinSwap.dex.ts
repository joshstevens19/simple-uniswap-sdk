import type { DexConfig, UniswapRouterV2Types } from '@dex-toolkit/types'
import type { ChainId, ContractDetail } from '@ethereum-multicall/types'

import {
  pangolinRouterV2ABI,
  uniswapFactoryV2ABI,
  uniswapPairV2ABI,
} from '../../abis/index'
import { avaxFujiChainId, avaxMainChainId } from '../../chains/chainIds'
import { AVAXToken, WAVAXToken } from '../../tokens/configs/index'
import { dexTypeMap } from '../../utils/dex.utils'

/**
 * App:
 * [Pangolin Exchange](https://app.pangolin.exchange/)
 *
 * V2 Deployments:
 * [Avalanche Network Contracts](https://docs.pangolin.exchange/multichain/avalanche-network/contracts)
 */

const V2Router_1_0_0: ContractDetail<UniswapRouterV2Types.MethodNameMap>['methods'] =
  {
    WETH: 'WAVAX',
    factory: 'factory',

    // Liquidity
    addLiquidity: 'addLiquidity',
    addLiquidityETH: 'addLiquidityAVAX',
    removeLiquidity: 'removeLiquidity',
    removeLiquidityETH: 'removeLiquidityAVAX',
    removeLiquidityWithPermit: 'removeLiquidityWithPermit',
    removeLiquidityETHWithPermit: 'removeLiquidityAVAXWithPermit',
    removeLiquidityETHSupportingFeeOnTransferTokens:
      'removeLiquidityAVAXSupportingFeeOnTransferTokens',
    removeLiquidityETHWithPermitSupportingFeeOnTransferTokens:
      'removeLiquidityAVAXWithPermitSupportingFeeOnTransferTokens',

    // Swapping
    swapExactETHForTokens: 'swapExactAVAXForTokens',
    swapETHForExactTokens: 'swapAVAXForExactTokens',
    swapExactETHForTokensSupportingFeeOnTransferTokens:
      'swapExactAVAXForTokensSupportingFeeOnTransferTokens',
    swapExactTokensForETH: 'swapExactTokensForAVAX',
    swapTokensForExactETH: 'swapTokensForExactAVAX',
    swapExactTokensForETHSupportingFeeOnTransferTokens:
      'swapExactTokensForAVAXSupportingFeeOnTransferTokens',

    // Token Swapping
    swapExactTokensForTokens: 'swapExactTokensForTokens',
    swapTokensForExactTokens: 'swapTokensForExactTokens',
    swapExactTokensForTokensSupportingFeeOnTransferTokens:
      'swapExactTokensForTokensSupportingFeeOnTransferTokens',

    // Utility functions
    quote: 'quote',
    getAmountIn: 'getAmountIn',
    getAmountOut: 'getAmountOut',
    getAmountsIn: 'getAmountsIn',
    getAmountsOut: 'getAmountsOut',
  }

export class PangolinSwap {
  private static commonProps: Omit<DexConfig, 'chainId' | 'protocols'> = {
    dexType: dexTypeMap.PANGOLIN,
    dexTag: dexTypeMap.PANGOLIN,
    title: 'Pangolin',
    logoUrl: 'https://app.pangolin.exchange/assets/logoSloganDark-47c90ac8.svg',
    color: 'rgb(254, 200, 2)',
  }

  public static AVALANCHE = {
    MAINNET: (): DexConfig => {
      return {
        ...PangolinSwap.commonProps,
        chainId: avaxMainChainId,
        defaultPairs: {
          inputAddress: AVAXToken.AVALANCHE.MAINNET().contractAddress,
          outputAddress: WAVAXToken.AVALANCHE.MAINNET().contractAddress,
        },
        protocols: {
          protocolV2: {
            '1-0-0': {
              feePercent: 0.003,
              router: {
                // https://snowtrace.io/address/0xE54Ca86531e17Ef3616d22Ca28b0D458b6C89106/contract/43114/readContract?chainid=43114
                address: '0xE54Ca86531e17Ef3616d22Ca28b0D458b6C89106',
                abi: pangolinRouterV2ABI,
                methods: V2Router_1_0_0,
              },
              factory: {
                // https://snowtrace.io/address/0xefa94DE7a4656D787667C749f7E1223D71E9FD88/contract/43114/readContract?chainid=43114
                address: '0xefa94DE7a4656D787667C749f7E1223D71E9FD88',
                abi: uniswapFactoryV2ABI,
              },
              pair: {
                abi: uniswapPairV2ABI,
              },
            },
          },
        },
      }
    },
    TESTNET: (): DexConfig => {
      return {
        ...PangolinSwap.commonProps,
        chainId: avaxFujiChainId,
        defaultPairs: {
          inputAddress: AVAXToken.AVALANCHE.FUJI().contractAddress,
          outputAddress: WAVAXToken.AVALANCHE.FUJI().contractAddress,
        },
        protocols: {
          protocolV2: {
            '1-0-0': {
              feePercent: 0.003,
              router: {
                // https://testnet.snowtrace.io/address/0x2D99ABD9008Dc933ff5c0CD271B88309593aB921/contract/43113/readContract?chainid=43113
                address: '0x2D99ABD9008Dc933ff5c0CD271B88309593aB921',
                abi: pangolinRouterV2ABI,
                methods: V2Router_1_0_0,
              },
              factory: {
                // https://testnet.snowtrace.io/address/0xE4A575550C2b460d2307b82dCd7aFe84AD1484dd/contract/43113/readContract?chainid=43113
                address: '0xE4A575550C2b460d2307b82dCd7aFe84AD1484dd',
                abi: uniswapFactoryV2ABI,
              },
              pair: {
                abi: uniswapPairV2ABI,
              },
            },
          },
        },
      }
    },
  }

  public static getDexConfig(chainId: ChainId): DexConfig | undefined {
    switch (chainId) {
      case avaxMainChainId:
        return PangolinSwap.AVALANCHE.MAINNET()
      case avaxFujiChainId:
        return PangolinSwap.AVALANCHE.TESTNET()
      default:
        return undefined
    }
  }

  public static getAllDexConfigs(): DexConfig[] {
    return [PangolinSwap.AVALANCHE.MAINNET(), PangolinSwap.AVALANCHE.TESTNET()]
  }
}
