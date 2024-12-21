import {
  arbitrumMainChainId,
  baseMainChainId,
  bscMainChainId,
  bscTestChainId,
  ethMainChainId,
  zkEVMMainChainId,
  zksyncMainChainId,
} from '@chain-toolkit/chains'
import type { ChainId } from '@chain-toolkit/schemas'
import type { DexConfig } from '@dex-toolkit/types'

import {
  uniswapFactoryV2ABI,
  uniswapFactoryV3ABI,
  uniswapPairV2ABI,
  uniswapPoolV3ABI,
  uniswapPositionManagerV3ABI,
  uniswapQuoterV3ABI,
  uniswapRouterV2ABI,
  uniswapRouterV3ABI,
} from '../../abis/index'
import {
  BNBToken,
  ETHCoin,
  POLToken,
  WBNBToken,
  WETHToken,
  WPOLToken,
} from '../../tokens/configs/index'
import { dexTypeMap } from '../../utils/dex.utils'

/**
 * App:
 * [PancakeSwap](https://pancakeswap.finance/)
 *
 * V2 Deployments:
 * [Developer Docs](https://docs.pancakeswap.finance/developers/smart-contracts/pancakeswap-exchange/v2-contracts)
 *
 * V3 Deployments:
 * [Developer Docs](https://docs.pancakeswap.finance/developers/smart-contracts/pancakeswap-exchange/v3-contracts)
 */

export class PancakeSwap {
  private static commonProps: Omit<DexConfig, 'chainId' | 'protocols'> = {
    dexType: dexTypeMap.PANCAKESWAP,
    dexTag: dexTypeMap.PANCAKESWAP,
    title: 'PancakeSwap',
    logoUrl:
      'https://github.com/trustwallet/assets/blob/master/dapps/pancakeswap.finance.png?raw=true',
    color: 'rgb(12, 237, 237)',
  }

  public static ARBITRUM = {
    MAINNET: (): DexConfig => {
      return {
        ...PancakeSwap.commonProps,
        dexType: dexTypeMap.PANCAKESWAP,
        chainId: arbitrumMainChainId,
        defaultPairs: {
          inputAddress: ETHCoin.ARBITRUM.MAINNET().contractAddress,
          outputAddress: WETHToken.ARBITRUM.MAINNET().contractAddress,
        },
        protocols: {
          protocolV2: {
            '1-0-0': {
              feePercent: 0.0025,
              router: {
                // https://arbiscan.io/address/0x8cFe327CEc66d1C090Dd72bd0FF11d690C33a2Eb#readContract
                address: '0x8cFe327CEc66d1C090Dd72bd0FF11d690C33a2Eb',
                abi: uniswapRouterV2ABI,
              },
              factory: {
                // https://arbiscan.io/address/0x02a84c1b3BBD7401a5f7fa98a384EBC70bB5749E#readContract
                address: '0x02a84c1b3BBD7401a5f7fa98a384EBC70bB5749E',
                abi: uniswapFactoryV2ABI,
              },
              pair: {
                abi: uniswapPairV2ABI,
              },
            },
          },
          protocolV3: {
            '1-0-0': {
              feeTiers: [100, 500, 2_500, 10_000] as const,
              router: {
                // address: '0x32226588378236Fd0c7c4053999F88aC0e5cAc77', // Smart Router
                // https://arbiscan.io/address/0x1b81D678ffb9C0263b24A97847620C99d213eB14#readContract
                address: '0x1b81D678ffb9C0263b24A97847620C99d213eB14',
                abi: uniswapRouterV3ABI,
              },
              factory: {
                // https://arbiscan.io/address/0x0BFbCF9fa4f9C56B0F40a671Ad40E0805A091865#readContract
                address: '0x0BFbCF9fa4f9C56B0F40a671Ad40E0805A091865',
                abi: uniswapFactoryV3ABI,
              },
              quoter: {
                // https://arbiscan.io/address/0xB048Bbc1Ee6b733FFfCFb9e9CeF7375518e25997#readContract
                address: '0xB048Bbc1Ee6b733FFfCFb9e9CeF7375518e25997',
                abi: uniswapQuoterV3ABI,
              },
              positionManager: {
                // https://arbiscan.io/address/0x46A15B0b27311cedF172AB29E4f4766fbE7F4364#readContract
                address: '0x46A15B0b27311cedF172AB29E4f4766fbE7F4364',
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

  public static BASE = {
    MAINNET: (): DexConfig => {
      return {
        ...PancakeSwap.commonProps,
        chainId: baseMainChainId,
        defaultPairs: {
          inputAddress: ETHCoin.BASE.MAINNET().contractAddress,
          outputAddress: WETHToken.BASE.MAINNET().contractAddress,
        },
        protocols: {
          protocolV2: {
            '1-0-0': {
              feePercent: 0.0025,
              router: {
                // https://basescan.org/address/0x02a84c1b3BBD7401a5f7fa98a384EBC70bB5749E#readContract
                address: '0x8cFe327CEc66d1C090Dd72bd0FF11d690C33a2Eb',
                abi: uniswapRouterV2ABI,
              },
              factory: {
                // https://basescan.org/address/0x02a84c1b3BBD7401a5f7fa98a384EBC70bB5749E#readContract
                address: '0x02a84c1b3BBD7401a5f7fa98a384EBC70bB5749E',
                abi: uniswapFactoryV2ABI,
              },
              pair: {
                abi: uniswapPairV2ABI,
              },
            },
          },
          protocolV3: {
            '1-0-0': {
              feeTiers: [100, 500, 2_500, 10_000] as const,
              router: {
                // https://basescan.org/address/0x1b81D678ffb9C0263b24A97847620C99d213eB14#readContract
                // address: '0x678Aa4bF4E210cf2166753e054d5b7c31cc7fa86', // Smart Router
                address: '0x1b81D678ffb9C0263b24A97847620C99d213eB14',
                abi: uniswapRouterV3ABI,
              },
              factory: {
                // https://basescan.org/address/0x0BFbCF9fa4f9C56B0F40a671Ad40E0805A091865#readContract
                address: '0x0BFbCF9fa4f9C56B0F40a671Ad40E0805A091865',
                abi: uniswapFactoryV3ABI,
              },
              quoter: {
                // https://basescan.org/address/0xB048Bbc1Ee6b733FFfCFb9e9CeF7375518e25997#readContract
                address: '0xB048Bbc1Ee6b733FFfCFb9e9CeF7375518e25997',
                abi: uniswapQuoterV3ABI,
              },
              positionManager: {
                // https://basescan.org/address/0x46A15B0b27311cedF172AB29E4f4766fbE7F4364#readContract
                address: '0x46A15B0b27311cedF172AB29E4f4766fbE7F4364',
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

  public static BSC = {
    MAINNET: (): DexConfig => {
      return {
        ...PancakeSwap.commonProps,
        chainId: bscMainChainId,
        defaultPairs: {
          inputAddress: BNBToken.BSC.MAINNET().contractAddress,
          outputAddress: WBNBToken.BSC.MAINNET().contractAddress,
        },
        protocols: {
          protocolV2: {
            '1-0-0': {
              feePercent: 0.0025,
              router: {
                // https://bscscan.com/address/0x10ED43C718714eb63d5aA57B78B54704E256024E#readContract
                address: '0x10ED43C718714eb63d5aA57B78B54704E256024E',
                abi: uniswapRouterV2ABI,
              },
              factory: {
                // https://bscscan.com/address/0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73#readContract
                address: '0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73',
                abi: uniswapFactoryV2ABI,
              },
              pair: {
                abi: uniswapPairV2ABI,
              },
            },
          },
          protocolV3: {
            '1-0-0': {
              feeTiers: [100, 500, 2_500, 10_000] as const,
              router: {
                // address: '0x13f4EA83D0bd40E75C8222255bc855a974568Dd4', // Smart Router
                // https://bscscan.com/address/0x1b81D678ffb9C0263b24A97847620C99d213eB14#readContract
                address: '0x1b81D678ffb9C0263b24A97847620C99d213eB14',
                abi: uniswapRouterV3ABI,
              },
              factory: {
                // https://bscscan.com/address/0x0BFbCF9fa4f9C56B0F40a671Ad40E0805A091865#readContract
                address: '0x0BFbCF9fa4f9C56B0F40a671Ad40E0805A091865',
                abi: uniswapFactoryV3ABI,
              },
              quoter: {
                // https://bscscan.com/address/0xB048Bbc1Ee6b733FFfCFb9e9CeF7375518e25997#readContract
                address: '0xB048Bbc1Ee6b733FFfCFb9e9CeF7375518e25997',
                abi: uniswapQuoterV3ABI,
              },
              positionManager: {
                // https://bscscan.com/address/0x46A15B0b27311cedF172AB29E4f4766fbE7F4364#readContract
                address: '0x46A15B0b27311cedF172AB29E4f4766fbE7F4364',
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
    TESTNET: (): DexConfig => {
      return {
        ...PancakeSwap.commonProps,
        chainId: bscTestChainId,
        defaultPairs: {
          inputAddress: BNBToken.BSC.TESTNET().contractAddress,
          outputAddress: WBNBToken.BSC.TESTNET().contractAddress,
        },
        protocols: {
          protocolV2: {
            '1-0-0': {
              feePercent: 0.0025,
              router: {
                address: '0xD99D1c33F9fC3444f8101754aBC46c52416550D1',
                abi: uniswapRouterV2ABI,
              },
              factory: {
                address: '0x6725F303b657a9451d8BA641348b6761A6CC7a17',
                abi: uniswapFactoryV2ABI,
              },
              pair: {
                abi: uniswapPairV2ABI,
              },
            },
          },
          protocolV3: {
            '1-0-0': {
              feeTiers: [100, 500, 2_500, 10_000] as const,
              router: {
                // address: '0x9a489505a00cE272eAa5e07Dba6491314CaE3796', // Smart Router
                address: '0x1b81D678ffb9C0263b24A97847620C99d213eB14',
                abi: uniswapRouterV3ABI,
              },
              factory: {
                address: '0x0BFbCF9fa4f9C56B0F40a671Ad40E0805A091865',
                abi: uniswapFactoryV3ABI,
              },
              quoter: {
                address: '0xbC203d7f83677c7ed3F7acEc959963E7F4ECC5C2',
                abi: uniswapQuoterV3ABI,
              },
              positionManager: {
                address: '0x427bF5b37357632377eCbEC9de3626C71A5396c1',
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

  public static ETH = {
    MAINNET: (): DexConfig => {
      return {
        ...PancakeSwap.commonProps,
        chainId: ethMainChainId,
        defaultPairs: {
          inputAddress: ETHCoin.ETH.MAINNET().contractAddress,
          outputAddress: WETHToken.ETH.MAINNET().contractAddress,
        },
        protocols: {
          protocolV2: {
            '1-0-0': {
              feePercent: 0.0025,
              router: {
                // https://etherscan.io/address/0xEfF92A263d31888d860bD50809A8D171709b7b1c#readContract
                address: '0xEfF92A263d31888d860bD50809A8D171709b7b1c',
                abi: uniswapRouterV2ABI,
              },
              factory: {
                // https://etherscan.io/address/0x1097053Fd2ea711dad45caCcc45EfF7548fCB362#readContract
                address: '0x1097053Fd2ea711dad45caCcc45EfF7548fCB362',
                abi: uniswapFactoryV2ABI,
              },
              pair: {
                abi: uniswapPairV2ABI,
              },
            },
          },
          protocolV3: {
            '1-0-0': {
              feeTiers: [100, 500, 2_500, 10_000] as const,
              router: {
                // address: '0x13f4EA83D0bd40E75C8222255bc855a974568Dd4', // Smart Router
                // https://etherscan.io/address/0x1b81D678ffb9C0263b24A97847620C99d213eB14#readContract
                address: '0x1b81D678ffb9C0263b24A97847620C99d213eB14',
                abi: uniswapRouterV3ABI,
              },
              factory: {
                // https://etherscan.io/address/0x0BFbCF9fa4f9C56B0F40a671Ad40E0805A091865#readContract
                address: '0x0BFbCF9fa4f9C56B0F40a671Ad40E0805A091865',
                abi: uniswapFactoryV3ABI,
              },
              quoter: {
                // https://etherscan.io/address/0xB048Bbc1Ee6b733FFfCFb9e9CeF7375518e25997#readContract
                address: '0xB048Bbc1Ee6b733FFfCFb9e9CeF7375518e25997',
                abi: uniswapQuoterV3ABI,
              },
              positionManager: {
                // https://etherscan.io/address/0x46A15B0b27311cedF172AB29E4f4766fbE7F4364#readContract
                address: '0x46A15B0b27311cedF172AB29E4f4766fbE7F4364',
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

  public static ZKEVM = {
    MAINNET: (): DexConfig => {
      return {
        ...PancakeSwap.commonProps,
        chainId: zkEVMMainChainId,
        defaultPairs: {
          inputAddress: POLToken.ZKEVM.MAINNET().contractAddress,
          outputAddress: WPOLToken.ZKEVM.MAINNET().contractAddress,
        },
        protocols: {
          protocolV2: {
            '1-0-0': {
              feePercent: 0.0025,
              router: {
                // https://zkevm.polygonscan.com/address/0x8cFe327CEc66d1C090Dd72bd0FF11d690C33a2Eb#readContract
                address: '0x8cFe327CEc66d1C090Dd72bd0FF11d690C33a2Eb',
                abi: uniswapRouterV2ABI,
              },
              factory: {
                // https://zkevm.polygonscan.com/address/0x02a84c1b3BBD7401a5f7fa98a384EBC70bB5749E#readContract
                address: '0x02a84c1b3BBD7401a5f7fa98a384EBC70bB5749E',
                abi: uniswapFactoryV2ABI,
              },
              pair: {
                abi: uniswapPairV2ABI,
              },
            },
          },
          protocolV3: {
            '1-0-0': {
              feeTiers: [100, 500, 2_500, 10_000] as const,
              router: {
                // address: '0x678Aa4bF4E210cf2166753e054d5b7c31cc7fa86', // Smart Router
                // https://zkevm.polygonscan.com/address/0x1b81D678ffb9C0263b24A97847620C99d213eB14#readContract
                address: '0x1b81D678ffb9C0263b24A97847620C99d213eB14',
                abi: uniswapRouterV3ABI,
              },
              factory: {
                // https://zkevm.polygonscan.com/address/0x0BFbCF9fa4f9C56B0F40a671Ad40E0805A091865#readContract
                address: '0x0BFbCF9fa4f9C56B0F40a671Ad40E0805A091865',
                abi: uniswapFactoryV3ABI,
              },
              quoter: {
                // https://zkevm.polygonscan.com/address/0xB048Bbc1Ee6b733FFfCFb9e9CeF7375518e25997#readContract
                address: '0xB048Bbc1Ee6b733FFfCFb9e9CeF7375518e25997',
                abi: uniswapQuoterV3ABI,
              },
              positionManager: {
                // https://zkevm.polygonscan.com/address/0x46A15B0b27311cedF172AB29E4f4766fbE7F4364#readContract
                address: '0x46A15B0b27311cedF172AB29E4f4766fbE7F4364',
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

  public static ZKSYNC = {
    MAINNET: (): DexConfig => {
      return {
        ...PancakeSwap.commonProps,
        chainId: zksyncMainChainId,
        defaultPairs: {
          inputAddress: ETHCoin.ZKSYNC.MAINNET().contractAddress,
          outputAddress: WETHToken.ZKSYNC.MAINNET().contractAddress,
        },
        protocols: {
          protocolV2: {
            '1-0-0': {
              feePercent: 0.0025,
              router: {
                // https://era.zksync.network/address/0x5aEaF2883FBf30f3D62471154eDa3C0c1b05942d#readContract
                address: '0x5aEaF2883FBf30f3D62471154eDa3C0c1b05942d',
                abi: uniswapRouterV2ABI,
              },
              factory: {
                // https://era.zksync.network/address/0xd03D8D566183F0086d8D09A84E1e30b58Dd5619d#readContract
                address: '0xd03D8D566183F0086d8D09A84E1e30b58Dd5619d',
                abi: uniswapFactoryV2ABI,
              },
              pair: {
                abi: uniswapPairV2ABI,
              },
            },
          },
          protocolV3: {
            '1-0-0': {
              feeTiers: [100, 500, 2_500, 10_000] as const,
              router: {
                // address: '0xf8b59f3c3Ab33200ec80a8A58b2aA5F5D2a8944C', // Smart Router
                // https://era.zksync.network/address/0xD70C70AD87aa8D45b8D59600342FB3AEe76E3c68#readContract
                address: '0xD70C70AD87aa8D45b8D59600342FB3AEe76E3c68',
                abi: uniswapRouterV3ABI,
              },
              factory: {
                // https://era.zksync.network/address/0x1BB72E0CbbEA93c08f535fc7856E0338D7F7a8aB#readContract
                address: '0x1BB72E0CbbEA93c08f535fc7856E0338D7F7a8aB',
                abi: uniswapFactoryV3ABI,
              },
              quoter: {
                // https://era.zksync.network/address/0x3d146FcE6c1006857750cBe8aF44f76a28041CCc#readContract
                address: '0x3d146FcE6c1006857750cBe8aF44f76a28041CCc',
                abi: uniswapQuoterV3ABI,
              },
              positionManager: {
                // https://era.zksync.network/address/0xa815e2eD7f7d5B0c49fda367F249232a1B9D2883#readContract
                address: '0xa815e2eD7f7d5B0c49fda367F249232a1B9D2883',
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
      case arbitrumMainChainId:
        return PancakeSwap.ARBITRUM.MAINNET()
      case baseMainChainId:
        return PancakeSwap.BASE.MAINNET()
      case bscMainChainId:
        return PancakeSwap.BSC.MAINNET()
      case bscTestChainId:
        return PancakeSwap.BSC.TESTNET()
      case ethMainChainId:
        return PancakeSwap.ETH.MAINNET()
      case zkEVMMainChainId:
        return PancakeSwap.ZKEVM.MAINNET()
      case zksyncMainChainId:
        return PancakeSwap.ZKSYNC.MAINNET()
      default:
        return undefined
    }
  }

  public static getAllDexConfigs(): DexConfig[] {
    return [
      PancakeSwap.ARBITRUM.MAINNET(),
      PancakeSwap.BASE.MAINNET(),
      PancakeSwap.BSC.MAINNET(),
      PancakeSwap.BSC.TESTNET(),
      PancakeSwap.ETH.MAINNET(),
      PancakeSwap.ZKEVM.MAINNET(),
      PancakeSwap.ZKSYNC.MAINNET(),
    ]
  }
}
