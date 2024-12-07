import type { DexConfig, UniswapRouterV2Types } from '@dex-toolkit/types'
import type { ChainId, ContractDetail } from '@ethereum-multicall/types'

import {
  energiSwapRouterV2ABI,
  uniswapFactoryV2ABI,
  uniswapPairV2ABI,
} from '../../abis/index'
import { energiMainChainId } from '../../chains/chainIds'
import { NRGToken, WNRGToken } from '../../tokens/configs/index'
import { dexTypeMap } from '../../utils/dex.utils'

/**
 * App
 * [Swap Interface](https://app.energiswap.exchange/#/swap)
 *
 * App Testnet:
 * [Testnet Interface](https://app.test.energiswap.exchange/)
 *
 * V2 Deployments:
 * Not available
 */

const V2Router_1_0_0: ContractDetail<UniswapRouterV2Types.MethodNameMap>['methods'] =
  {
    // WETH and factory are not included in Energiswap ABI
    WETH: '', // Disabled
    factory: '', // Disabled

    // Liquidity
    addLiquidity: 'addLiquidity',
    addLiquidityETH: 'addLiquidityNRG',
    removeLiquidity: 'removeLiquidity',
    removeLiquidityETH: 'removeLiquidityNRG',
    removeLiquidityWithPermit: 'removeLiquidityWithPermit',
    removeLiquidityETHWithPermit: 'removeLiquidityNRGWithPermit',
    removeLiquidityETHSupportingFeeOnTransferTokens:
      'removeLiquidityNRGSupportingFeeOnTransferTokens',
    removeLiquidityETHWithPermitSupportingFeeOnTransferTokens:
      'removeLiquidityNRGWithPermitSupportingFeeOnTransferTokens',

    // Swapping
    swapExactETHForTokens: 'swapExactNRGForTokens',
    swapETHForExactTokens: 'swapNRGForExactTokens',
    swapExactETHForTokensSupportingFeeOnTransferTokens:
      'swapExactNRGForTokensSupportingFeeOnTransferTokens',
    swapExactTokensForETH: 'swapExactTokensForNRG',
    swapTokensForExactETH: 'swapTokensForExactNRG',
    swapExactTokensForETHSupportingFeeOnTransferTokens:
      'swapExactTokensForNRGSupportingFeeOnTransferTokens',

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

export class EnergiSwap {
  private static commonProps: Omit<DexConfig, 'chainId' | 'protocols'> = {
    dexType: dexTypeMap.ENERGISWAP,
    dexTag: dexTypeMap.ENERGISWAP,
    title: 'Energiswap',
    logoUrl: 'https://app.energiswap.exchange/static/media/Logo.52d829a7.png',
    color: 'rgb(1, 230, 119)',
  }

  public static ENERGI = {
    MAINNET: (): DexConfig => {
      return {
        ...EnergiSwap.commonProps,
        chainId: energiMainChainId,
        defaultPairs: {
          inputAddress: NRGToken.ENERGI.MAINNET().contractAddress,
          outputAddress: WNRGToken.ENERGI.MAINNET().contractAddress,
        },
        protocols: {
          protocolV2: {
            '1-0-0': {
              feePercent: 0.003,
              router: {
                // https://explorer.energi.network/address/0x56054dD259EE91adD53a988C079cfb17bE9a2108/read-contract
                address: '0x56054dD259EE91adD53a988C079cfb17bE9a2108',
                abi: energiSwapRouterV2ABI,
                methods: V2Router_1_0_0,
              },
              factory: {
                // https://explorer.energi.network/address/0x875aDBaF8109c9CC9AbCC708a42607F573f594E4/read-contract
                address: '0x875aDBaF8109c9CC9AbCC708a42607F573f594E4',
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
      case energiMainChainId:
        return EnergiSwap.ENERGI.MAINNET()
      default:
        return undefined
    }
  }

  public static getAllDexConfigs(): DexConfig[] {
    return [EnergiSwap.ENERGI.MAINNET()]
  }
}
