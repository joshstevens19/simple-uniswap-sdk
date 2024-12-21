import { avaxMainChainId } from '@chain-toolkit/chains'
import type { ChainId } from '@chain-toolkit/schemas'
import type { DexConfig, UniswapRouterV2Types } from '@dex-toolkit/types'
import type { ContractDetail } from '@multicall-toolkit/types'

import {
  uniswapFactoryV2ABI,
  uniswapPairV2ABI,
  yetiSwapRouterV2ABI,
} from '../../abis/index'
import { AVAXToken, WAVAXToken } from '../../tokens/configs/index'
import { dexTypeMap } from '../../utils/dex.utils'

/**
 * App:
 * [YetiSwap](https://exchange.yetiswap.app/#/swap)
 *
 * V2 Deployments:
 * [Exchange Contract Repository](https://github.com/YetiSwap/exchange-contract)
 */

const V2Router_1_0_0: ContractDetail<UniswapRouterV2Types.MethodNameMap>['methods'] =
  {
    WETH: 'WAVAX',

    addLiquidity: 'addLiquidityAVAX',
    removeLiquidity: 'removeLiquidityAVAX',
    removeLiquidityWithPermit: 'removeLiquidityAVAXWithPermit',

    removeLiquidityETHSupportingFeeOnTransferTokens:
      'removeLiquidityAVAXSupportingFeeOnTransferTokens',
    removeLiquidityETHWithPermit: 'removeLiquidityAVAXWithPermit',
    removeLiquidityETHWithPermitSupportingFeeOnTransferTokens:
      'removeLiquidityAVAXWithPermitSupportingFeeOnTransferTokens',

    swapExactETHForTokens: 'swapExactAVAXForTokens',
    swapETHForExactTokens: 'swapAVAXForExactTokens',
    swapExactETHForTokensSupportingFeeOnTransferTokens:
      'swapExactAVAXForTokensSupportingFeeOnTransferTokens',

    swapExactTokensForETH: 'swapExactTokensForAVAX',
    swapTokensForExactETH: 'swapTokensForExactAVAX',
    swapExactTokensForETHSupportingFeeOnTransferTokens:
      'swapExactTokensForAVAXSupportingFeeOnTransferTokens',

    swapExactTokensForTokens: 'swapExactTokensForTokens',
    swapTokensForExactTokens: 'swapTokensForExactTokens',
    swapExactTokensForTokensSupportingFeeOnTransferTokens:
      'swapExactTokensForTokensSupportingFeeOnTransferTokens',
  }

export class YetiSwap {
  private static commonProps: Omit<DexConfig, 'chainId' | 'protocols'> = {
    dexType: dexTypeMap.YETISWAP,
    dexTag: dexTypeMap.YETISWAP,
    title: 'YetiSwap',
    logoUrl:
      'https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x488F73cddDA1DE3664775fFd91623637383D6404/logo.png',
    color: 'rgb(152, 193, 217)',
  }

  public static AVALANCHE = {
    MAINNET: (): DexConfig => {
      return {
        ...YetiSwap.commonProps,
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
                // https://snowtrace.io/address/0x262DcFB36766C88E6A7a2953c16F8defc40c378A/contract/43114/readContract?chainid=43114
                address: '0x262DcFB36766C88E6A7a2953c16F8defc40c378A',
                abi: yetiSwapRouterV2ABI,
                methods: V2Router_1_0_0,
              },
              factory: {
                // https://snowtrace.io/address/0x58C8CD291Fa36130119E6dEb9E520fbb6AcA1c3a/contract/43114/readContract?chainid=43114
                address: '0x58C8CD291Fa36130119E6dEb9E520fbb6AcA1c3a',
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
        return YetiSwap.AVALANCHE.MAINNET()
      default:
        return undefined
    }
  }

  public static getAllDexConfigs(): DexConfig[] {
    return [YetiSwap.AVALANCHE.MAINNET()]
  }
}
