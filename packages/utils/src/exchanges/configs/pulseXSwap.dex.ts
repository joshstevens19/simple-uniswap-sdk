import type { DexConfig } from '@dex-toolkit/types'
import type { ChainId } from '@ethereum-multicall/types'

import {
  pulseXRouterV2ABI,
  uniswapFactoryV2ABI,
  uniswapPairV2ABI,
} from '../../abis/index'
import { plsMainChainId, plsTestChainId } from '../../chains/chainIds'
import { BIDToken, PLSXToken } from '../../tokens/configs/index'
import { dexTypeMap } from '../../utils/dex.utils'

/**
 * App:
 * [PulseX App](https://app.pulsex.com/)
 *
 * V2 Deployments:
 * Not available
 */

export class PulseXSwap {
  private static commonProps: Omit<DexConfig, 'chainId' | 'protocols'> = {
    dexType: dexTypeMap.PULSEX,
    dexTag: dexTypeMap.PULSEX,
    title: 'PulseX',
    logoUrl: 'https://pulsex.com/brand/downloads/logo/PulseX_X.png',
    color: 'rgb(0, 255, 120)',
  }

  public static PULSE = {
    MAINNET: (): DexConfig => {
      return {
        ...PulseXSwap.commonProps,
        chainId: plsMainChainId,
        defaultPairs: {
          inputAddress: PLSXToken.PULSE.MAINNET().contractAddress,
          outputAddress: BIDToken.PULSE.MAINNET().contractAddress,
        },
        protocols: {
          protocolV2: {
            '1-0-0': {
              feePercent: 0.003,
              router: {
                // http://localhost:3694/#/address/0x98bf93ebf5c380C0e6Ae8e192A7e2AE08edAcc02?tab=read_contract
                address: '0x98bf93ebf5c380C0e6Ae8e192A7e2AE08edAcc02',
                abi: pulseXRouterV2ABI,
                methods: {
                  WETH: 'WPLS',
                },
              },
              factory: {
                // http://localhost:3694/#/address/0x1715a3E4A142d8b698131108995174F37aEBA10D?tab=read_contract
                address: '0x1715a3E4A142d8b698131108995174F37aEBA10D',
                abi: uniswapFactoryV2ABI,
              },
              pair: {
                abi: uniswapPairV2ABI,
              },
            },
            '2-0-0': {
              feePercent: 0.003,
              router: {
                // http://localhost:3694/#/address/0x165C3410fC91EF562C50559f7d2289fEbed552d9?tab=read_contract
                address: '0x165C3410fC91EF562C50559f7d2289fEbed552d9',
                abi: pulseXRouterV2ABI,
                methods: {
                  WETH: 'WPLS',
                },
              },
              factory: {
                // http://localhost:3694/#/address/0x29eA7545DEf87022BAdc76323F373EA1e707C523?tab=read_contract
                address: '0x29eA7545DEf87022BAdc76323F373EA1e707C523',
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
        ...PulseXSwap.commonProps,
        chainId: plsTestChainId,
        defaultPairs: {
          inputAddress: PLSXToken.PULSE.TESTNET().contractAddress,
          outputAddress: BIDToken.PULSE.TESTNET().contractAddress,
        },
        protocols: {
          protocolV2: {
            '1-0-0': {
              feePercent: 0.003,
              router: {
                // https://scan.v4.testnet.pulsechain.com/#/address/0xDaE9dd3d1A52CfCe9d5F2fAC7fDe164D500E50f7?tab=read_contract
                address: '0xDaE9dd3d1A52CfCe9d5F2fAC7fDe164D500E50f7',
                abi: pulseXRouterV2ABI,
                methods: {
                  WETH: 'WPLS',
                },
              },
              factory: {
                // https://scan.v4.testnet.pulsechain.com/#/address/0xFf0538782D122d3112F75dc7121F61562261c0f7?tab=read_contract
                address: '0xFf0538782D122d3112F75dc7121F61562261c0f7',
                abi: uniswapFactoryV2ABI,
              },
              pair: {
                abi: uniswapPairV2ABI,
              },
            },
            '2-0-0': {
              feePercent: 0.003,
              router: {
                // https://scan.v4.testnet.pulsechain.com/#/address/0x636f6407B90661b73b1C0F7e24F4C79f624d0738?tab=read_contract
                address: '0x636f6407B90661b73b1C0F7e24F4C79f624d0738',
                abi: pulseXRouterV2ABI,
                methods: {
                  WETH: 'WPLS',
                },
              },
              factory: {
                // https://scan.v4.testnet.pulsechain.com/#/address/0x3B53e9270d0210214B9c242eb16C252474c5be01?tab=read_contract
                address: '0x3B53e9270d0210214B9c242eb16C252474c5be01',
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
      case plsMainChainId:
        return PulseXSwap.PULSE.MAINNET()
      case plsTestChainId:
        return PulseXSwap.PULSE.TESTNET()
      default:
        return undefined
    }
  }

  public static getAllDexConfigs(): DexConfig[] {
    return [PulseXSwap.PULSE.MAINNET(), PulseXSwap.PULSE.TESTNET()]
  }
}
