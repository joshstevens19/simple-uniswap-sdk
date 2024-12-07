import type { DexConfig } from '@dex-toolkit/types'
import type { ChainId } from '@ethereum-multicall/types'

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
  arbitrumMainChainId,
  avaxFujiChainId,
  avaxMainChainId,
  baseMainChainId,
  blastMainChainId,
  bscMainChainId,
  bscTestChainId,
  celoMainChainId,
  ethMainChainId,
  ethSepoliaChainId,
  optimismMainChainId,
  polygonMainChainId,
  zkEVMMainChainId,
} from '../../chains/chainIds'
import {
  AVAXToken,
  BNBToken,
  ETHCoin,
  POLToken,
  WAVAXToken,
  WBNBToken,
  WETHToken,
  WPOLToken,
} from '../../tokens/configs/index'
import { dexTypeMap } from '../../utils/dex.utils'
import { defaultFactoryMethodMapV2 } from '../../utils/factory.utils'
import { defaultPairMethodMapV2 } from '../../utils/pairs.utils'
import { defaultRouterMethodMapV2 } from '../../utils/router.utils'

/**
 * App:
 * [Sushi Swap](https://www.sushi.com/ethereum/swap)
 *
 * V2 Deployments:
 * [Classic AMM Deployment Addresses](https://docs.sushi.com/docs/Products/Classic%20AMM/Deployment%20Addresses)
 *
 * V3 Deployments:
 * [Core Deployment Addresses](https://dev.sushi.com/docs/Products/V3%20AMM/Core/Deployment%20Addresses)
 * [Periphery Deployment Addresses](https://docs.sushi.com/docs/Products/V3%20AMM/Periphery/Deployment%20Addresses)
 */

export class SushiSwap {
  private static commonProps: Omit<DexConfig, 'chainId' | 'protocols'> = {
    dexType: dexTypeMap.SUSHISWAP,
    dexTag: dexTypeMap.SUSHISWAP,
    title: 'SushiSwap',
    logoUrl:
      'https://github.com/trustwallet/assets/blob/master/dapps/app.sushi.com.png?raw=true',
    color: 'rgb(248, 85, 164)',
  }

  public static ARBITRUM = {
    MAINNET: (): DexConfig => {
      return {
        ...SushiSwap.commonProps,
        chainId: arbitrumMainChainId,
        defaultPairs: {
          inputAddress: ETHCoin.ARBITRUM.MAINNET().contractAddress,
          outputAddress: WETHToken.ARBITRUM.MAINNET().contractAddress,
        },
        protocols: {
          protocolV2: {
            '1-0-0': {
              feePercent: 0.003,
              router: {
                // https://arbiscan.io/address/0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506#readContract
                address: '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506',
                abi: uniswapRouterV2ABI,
              },
              factory: {
                // https://arbiscan.io/address/0xc35DADB65012eC5796536bD9864eD8773aBc74C4#readContract
                address: '0xc35DADB65012eC5796536bD9864eD8773aBc74C4',
                abi: uniswapFactoryV2ABI,
              },
              pair: {
                abi: uniswapPairV2ABI,
              },
            },
          },
          protocolV3: {
            '1-0-0': {
              feeTiers: [100, 500, 3000, 10000] as const,
              router: {
                // https://arbiscan.io/address/0x8A21F6768C1f8075791D08546Dadf6daA0bE820c#readContract
                address: '0x8A21F6768C1f8075791D08546Dadf6daA0bE820c',
                abi: uniswapRouterV3ABI,
              },
              factory: {
                // https://arbiscan.io/address/0x1af415a1EbA07a4986a52B6f2e7dE7003D82231e#readContract
                address: '0x1af415a1EbA07a4986a52B6f2e7dE7003D82231e',
                abi: uniswapFactoryV3ABI,
              },
              quoter: {
                // https://arbiscan.io/address/0x0524E833cCD057e4d7A296e3aaAb9f7675964Ce1#readContract
                address: '0x0524E833cCD057e4d7A296e3aaAb9f7675964Ce1',
                abi: uniswapQuoterV3ABI,
              },
              positionManager: {
                // https://arbiscan.io/address/0xF0cBce1942A68BEB3d1b73F0dd86C8DCc363eF49#readContract
                address: '0xF0cBce1942A68BEB3d1b73F0dd86C8DCc363eF49',
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

  public static AVALANCHE = {
    MAINNET: (): DexConfig => {
      return {
        ...SushiSwap.commonProps,
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
                // https://snowtrace.io/address/0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506/contract/43114/readContract?chainid=43114
                address: '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506',
                abi: uniswapRouterV2ABI,
              },
              factory: {
                // https://snowtrace.io/address/0xc35DADB65012eC5796536bD9864eD8773aBc74C4/contract/43114/readContract?chainid=43114
                address: '0xc35DADB65012eC5796536bD9864eD8773aBc74C4',
                abi: uniswapFactoryV2ABI,
              },
              pair: {
                abi: uniswapPairV2ABI,
              },
            },
          },
          protocolV3: {
            '1-0-0': {
              feeTiers: [100, 500, 3000, 10000] as const,
              router: {
                // https://arbiscan.io/address/0x8E4638eefee96732C56291fBF48bBB98725c6b31#readContract
                address: '0x8E4638eefee96732C56291fBF48bBB98725c6b31',
                abi: uniswapRouterV3ABI,
              },
              factory: {
                // https://arbiscan.io/address/0x3e603C14aF37EBdaD31709C4f848Fc6aD5BEc715#readContract
                address: '0x3e603C14aF37EBdaD31709C4f848Fc6aD5BEc715',
                abi: uniswapFactoryV3ABI,
              },
              quoter: {
                // https://arbiscan.io/address/0xb1E835Dc2785b52265711e17fCCb0fd018226a6e#readContract
                address: '0xb1E835Dc2785b52265711e17fCCb0fd018226a6e',
                abi: uniswapQuoterV3ABI,
              },
              positionManager: {
                // https://arbiscan.io/address/0x18350b048AB366ed601fFDbC669110Ecb36016f3#readContract
                address: '0x18350b048AB366ed601fFDbC669110Ecb36016f3',
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
    FUJI: (): DexConfig => {
      return {
        ...SushiSwap.commonProps,
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
                address: '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506',
                abi: uniswapRouterV2ABI,
              },
              factory: {
                address: '0xc35DADB65012eC5796536bD9864eD8773aBc74C4',
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

  public static BASE = {
    MAINNET: (): DexConfig => {
      return {
        ...SushiSwap.commonProps,
        chainId: baseMainChainId,
        defaultPairs: {
          inputAddress: ETHCoin.BASE.MAINNET().contractAddress,
          outputAddress: WETHToken.BASE.MAINNET().contractAddress,
        },
        protocols: {
          protocolV2: {
            '1-0-0': {
              feePercent: 0.003,
              router: {
                // https://basescan.org/address/0x6BDED42c6DA8FBf0d2bA55B2fa120C5e0c8D7891#readContract
                address: '0x6BDED42c6DA8FBf0d2bA55B2fa120C5e0c8D7891',
                abi: uniswapRouterV2ABI,
              },
              factory: {
                // https://basescan.org/address/0x71524B4f93c58fcbF659783284E38825f0622859#readContract
                address: '0x71524B4f93c58fcbF659783284E38825f0622859',
                abi: uniswapFactoryV2ABI,
              },
              pair: {
                abi: uniswapPairV2ABI,
              },
            },
          },
          protocolV3: {
            '1-0-0': {
              feeTiers: [100, 500, 3000, 10000] as const,
              router: {
                // https://basescan.org/address/0xFB7eF66a7e61224DD6FcD0D7d9C3be5C8B049b9f#readContract
                address: '0xFB7eF66a7e61224DD6FcD0D7d9C3be5C8B049b9f',
                abi: uniswapRouterV3ABI,
              },
              factory: {
                // https://basescan.org/address/0xc35DADB65012eC5796536bD9864eD8773aBc74C4#readContract
                address: '0xc35DADB65012eC5796536bD9864eD8773aBc74C4',
                abi: uniswapFactoryV3ABI,
              },
              quoter: {
                // https://basescan.org/address/0xb1E835Dc2785b52265711e17fCCb0fd018226a6e#readContract
                address: '0xb1E835Dc2785b52265711e17fCCb0fd018226a6e',
                abi: uniswapQuoterV3ABI,
              },
              positionManager: {
                // https://basescan.org/address/0x80C7DD17B01855a6D2347444a0FCC36136a314de#readContract
                address: '0x80C7DD17B01855a6D2347444a0FCC36136a314de',
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

  public static BLAST = {
    MAINNET: (): DexConfig => {
      return {
        ...SushiSwap.commonProps,
        chainId: blastMainChainId,
        defaultPairs: {
          inputAddress: ETHCoin.BLAST.MAINNET().contractAddress,
          outputAddress: WETHToken.BLAST.MAINNET().contractAddress,
        },
        protocols: {
          protocolV2: {
            '1-0-0': {
              feePercent: 0.003,
              router: {
                // https://blastscan.io/address/0x54CF3d259a06601b5bC45F61A16443ed5404DD64#readContract
                address: '0x54CF3d259a06601b5bC45F61A16443ed5404DD64',
                abi: uniswapRouterV2ABI,
              },
              factory: {
                // https://blastscan.io/address/0x42Fa929fc636e657AC568C0b5Cf38E203b67aC2b#readContract
                address: '0x42Fa929fc636e657AC568C0b5Cf38E203b67aC2b',
                abi: uniswapFactoryV2ABI,
              },
              pair: {
                abi: uniswapPairV2ABI,
              },
            },
          },
          protocolV3: {
            '1-0-0': {
              feeTiers: [100, 500, 3000, 10000] as const,
              router: {
                // https://blastscan.io/address/0x5D0aA5dD03199D80089278B261167ffF24C304ca#readContract
                address: '0x5D0aA5dD03199D80089278B261167ffF24C304ca',
                abi: uniswapRouterV3ABI,
              },
              factory: {
                // https://blastscan.io/address/0x7680D4B43f3d1d54d6cfEeB2169463bFa7a6cf0d#readContract
                address: '0x7680D4B43f3d1d54d6cfEeB2169463bFa7a6cf0d',
                abi: uniswapFactoryV3ABI,
              },
              quoter: {
                // https://blastscan.io/address/0xD93a91442Afd80243cF12f7110f48aB276fFf33F#readContract
                address: '0xD93a91442Afd80243cF12f7110f48aB276fFf33F',
                abi: uniswapQuoterV3ABI,
              },
              positionManager: {
                // https://blastscan.io/address/0x51edb3e5bcE8618B77b60215F84aD3DB14709051#readContract
                address: '0x51edb3e5bcE8618B77b60215F84aD3DB14709051',
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
        ...SushiSwap.commonProps,
        chainId: bscMainChainId,
        defaultPairs: {
          inputAddress: BNBToken.BSC.MAINNET().contractAddress,
          outputAddress: WBNBToken.BSC.MAINNET().contractAddress,
        },
        protocols: {
          protocolV2: {
            '1-0-0': {
              feePercent: 0.003,
              router: {
                // https://bscscan.com/address/0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506#readContract
                address: '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506',
                abi: uniswapRouterV2ABI,
              },
              factory: {
                // https://bscscan.com/address/0xc35DADB65012eC5796536bD9864eD8773aBc74C4#readContract
                address: '0xc35DADB65012eC5796536bD9864eD8773aBc74C4',
                abi: uniswapFactoryV2ABI,
              },
              pair: {
                abi: uniswapPairV2ABI,
              },
            },
          },
          protocolV3: {
            '1-0-0': {
              feeTiers: [100, 500, 3000, 10000] as const,
              router: {
                // https://bscscan.com/address/0x909662a99605382dB1E8d69cc1f182bb577d9038#readContract
                address: '0x909662a99605382dB1E8d69cc1f182bb577d9038',
                abi: uniswapRouterV3ABI,
              },
              factory: {
                // https://bscscan.com/address/0x126555dd55a39328F69400d6aE4F782Bd4C34ABb#readContract
                address: '0x126555dd55a39328F69400d6aE4F782Bd4C34ABb',
                abi: uniswapFactoryV3ABI,
              },
              quoter: {
                // https://bscscan.com/address/0xb1E835Dc2785b52265711e17fCCb0fd018226a6e#readContract
                address: '0xb1E835Dc2785b52265711e17fCCb0fd018226a6e',
                abi: uniswapQuoterV3ABI,
              },
              positionManager: {
                // https://bscscan.com/address/0xF70c086618dcf2b1A461311275e00D6B722ef914#readContract
                address: '0xF70c086618dcf2b1A461311275e00D6B722ef914',
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
        ...SushiSwap.commonProps,
        chainId: bscTestChainId,
        defaultPairs: {
          inputAddress: BNBToken.BSC.TESTNET().contractAddress,
          outputAddress: WBNBToken.BSC.TESTNET().contractAddress,
        },
        protocols: {
          protocolV2: {
            '1-0-0': {
              feePercent: 0.003,
              router: {
                address: '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506',
                abi: uniswapRouterV2ABI,
              },
              factory: {
                address: '0xc35DADB65012eC5796536bD9864eD8773aBc74C4',
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

  public static CELO = {
    MAINNET: (): DexConfig => {
      return {
        ...SushiSwap.commonProps,
        chainId: celoMainChainId,
        defaultPairs: {
          inputAddress: ETHCoin.CELO.MAINNET().contractAddress,
          outputAddress: WETHToken.CELO.MAINNET().contractAddress,
        },
        protocols: {
          protocolV2: {
            '1-0-0': {
              feePercent: 0.003,
              router: {
                // https://explorer.celo.org/mainnet/address/0x1421bDe4B10e8dd459b3BCb598810B1337D56842/read-contract
                address: '0x1421bDe4B10e8dd459b3BCb598810B1337D56842',
                abi: uniswapRouterV2ABI,
                methods: {
                  WETH: '', // Disabled
                },
              },
              factory: {
                // https://explorer.celo.org/mainnet/address/0xc35DADB65012eC5796536bD9864eD8773aBc74C4/read-contract
                address: '0xc35DADB65012eC5796536bD9864eD8773aBc74C4',
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

  public static ETH = {
    MAINNET: (): DexConfig => {
      return {
        ...SushiSwap.commonProps,
        chainId: ethMainChainId,
        defaultPairs: {
          inputAddress: ETHCoin.ETH.MAINNET().contractAddress,
          outputAddress: WETHToken.ETH.MAINNET().contractAddress,
        },
        protocols: {
          protocolV2: {
            '1-0-0': {
              feePercent: 0.003,
              router: {
                // https://etherscan.io/address/0xd9e1cE17f2641f24aE83637ab66a2cca9C378B9F#readContract
                address: '0xd9e1cE17f2641f24aE83637ab66a2cca9C378B9F',
                abi: uniswapRouterV2ABI,
              },
              factory: {
                // https://etherscan.io/address/0xC0AEe478e3658e2610c5F7A4A2E1777cE9e4f2Ac#readContract
                address: '0xC0AEe478e3658e2610c5F7A4A2E1777cE9e4f2Ac',
                abi: uniswapFactoryV2ABI,
              },
              pair: {
                abi: uniswapPairV2ABI,
              },
            },
          },
          protocolV3: {
            '1-0-0': {
              feeTiers: [100, 500, 3000, 10000] as const,
              router: {
                // https://etherscan.io/address/0x2E6cd2d30aa43f40aa81619ff4b6E0a41479B13F#readContract
                address: '0x2E6cd2d30aa43f40aa81619ff4b6E0a41479B13F',
                abi: uniswapRouterV3ABI,
              },
              factory: {
                // https://etherscan.io/address/0xbACEB8eC6b9355Dfc0269C18bac9d6E2Bdc29C4F#readContract
                address: '0xbACEB8eC6b9355Dfc0269C18bac9d6E2Bdc29C4F',
                abi: uniswapFactoryV3ABI,
              },
              quoter: {
                // https://etherscan.io/address/0x64e8802FE490fa7cc61d3463958199161Bb608A7#readContract
                address: '0x64e8802FE490fa7cc61d3463958199161Bb608A7',
                abi: uniswapQuoterV3ABI,
              },
              positionManager: {
                // https://etherscan.io/address/0x2214A42d8e2A1d20635c2cb0664422c528B6A432#readContract
                address: '0x2214A42d8e2A1d20635c2cb0664422c528B6A432',
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
    SEPOLIA: (): DexConfig => {
      return {
        ...SushiSwap.commonProps,
        chainId: ethSepoliaChainId,
        defaultPairs: {
          inputAddress: ETHCoin.ETH.SEPOLIA().contractAddress,
          outputAddress: WETHToken.ETH.SEPOLIA().contractAddress,
        },
        protocols: {
          protocolV2: {
            '1-0-0': {
              feePercent: 0.003,
              router: {
                address: '0xeaBcE3E74EF41FB40024a21Cc2ee2F5dDc615791',
                abi: uniswapRouterV2ABI,
              },
              factory: {
                address: '0x734583f62Bb6ACe3c9bA9bd5A53143CA2Ce8C55A',
                abi: uniswapFactoryV2ABI,
              },
              pair: {
                abi: uniswapPairV2ABI,
              },
            },
          },
          protocolV3: {
            '1-0-0': {
              feeTiers: [100, 500, 3000, 10000] as const,
              router: {
                address: '0x93c31c9C729A249b2877F7699e178F4720407733',
                abi: uniswapRouterV3ABI,
              },
              factory: {
                address: '0x1f2FCf1d036b375b384012e61D3AA33F8C256bbE',
                abi: uniswapFactoryV3ABI,
              },
              quoter: {
                address: '0x039e87AB90205F9d87c5b40d4B28e2Be45dA4a20',
                abi: uniswapQuoterV3ABI,
              },
              positionManager: {
                address: '0x544bA588efD839d2692Fc31EA991cD39993c135F',
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

  public static OPTIMISM = {
    MAINNET: (): DexConfig => {
      return {
        ...SushiSwap.commonProps,
        chainId: optimismMainChainId,
        defaultPairs: {
          inputAddress: ETHCoin.OPTIMISM.MAINNET().contractAddress,
          outputAddress: WETHToken.OPTIMISM.MAINNET().contractAddress,
        },
        protocols: {
          protocolV2: {
            '1-0-0': {
              feePercent: 0.003,
              router: {
                // https://optimistic.etherscan.io/address/0x2ABf469074dc0b54d793850807E6eb5Faf2625b1#readContract
                address: '0x2ABf469074dc0b54d793850807E6eb5Faf2625b1',
                abi: uniswapRouterV2ABI,
              },
              factory: {
                // https://optimistic.etherscan.io/address/0xFbc12984689e5f15626Bad03Ad60160Fe98B303C#readContract
                address: '0xFbc12984689e5f15626Bad03Ad60160Fe98B303C',
                abi: uniswapFactoryV2ABI,
              },
              pair: {
                abi: uniswapPairV2ABI,
              },
            },
          },
          protocolV3: {
            '1-0-0': {
              feeTiers: [100, 500, 3000, 10000] as const,
              router: {
                // https://optimistic.etherscan.io/address/0x8c32Fd078B89Eccb06B40289A539D84A4aA9FDA6#readContract
                address: '0x8c32Fd078B89Eccb06B40289A539D84A4aA9FDA6',
                abi: uniswapRouterV3ABI,
              },
              factory: {
                // https://optimistic.etherscan.io/address/0x9c6522117e2ed1fE5bdb72bb0eD5E3f2bdE7DBe0#readContract
                address: '0x9c6522117e2ed1fE5bdb72bb0eD5E3f2bdE7DBe0',
                abi: uniswapFactoryV3ABI,
              },
              quoter: {
                // https://optimistic.etherscan.io/address/0xb1E835Dc2785b52265711e17fCCb0fd018226a6e#readContract
                address: '0xb1E835Dc2785b52265711e17fCCb0fd018226a6e',
                abi: uniswapQuoterV3ABI,
              },
              positionManager: {
                // https://optimistic.etherscan.io/address/0x1af415a1EbA07a4986a52B6f2e7dE7003D82231e#readContract
                address: '0x1af415a1EbA07a4986a52B6f2e7dE7003D82231e',
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

  public static POLYGON = {
    MAINNET: (): DexConfig => {
      return {
        ...SushiSwap.commonProps,
        chainId: polygonMainChainId,
        defaultPairs: {
          inputAddress: POLToken.POLYGON.MAINNET().contractAddress,
          outputAddress: WPOLToken.POLYGON.MAINNET().contractAddress,
        },
        protocols: {
          protocolV2: {
            '1-0-0': {
              feePercent: 0.003,
              router: {
                // https://polygonscan.com/address/0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506#readContract
                address: '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506',
                abi: uniswapRouterV2ABI,
                methods: defaultRouterMethodMapV2,
              },
              factory: {
                // https://polygonscan.com/address/0xc35DADB65012eC5796536bD9864eD8773aBc74C4#readContract
                address: '0xc35DADB65012eC5796536bD9864eD8773aBc74C4',
                abi: uniswapFactoryV2ABI,
                methods: defaultFactoryMethodMapV2,
              },
              pair: {
                abi: uniswapPairV2ABI,
                methods: defaultPairMethodMapV2,
              },
            },
          },
          protocolV3: {
            '1-0-0': {
              feeTiers: [100, 500, 3000, 10000] as const,
              router: {
                // https://polygonscan.com/address/0x0aF89E1620b96170e2a9D0b68fEebb767eD044c3#readContract
                address: '0x0aF89E1620b96170e2a9D0b68fEebb767eD044c3',
                abi: uniswapRouterV3ABI,
              },
              factory: {
                // https://polygonscan.com/address/0x917933899c6a5F8E37F31E19f92CdBFF7e8FF0e2#readContract
                address: '0x917933899c6a5F8E37F31E19f92CdBFF7e8FF0e2',
                abi: uniswapFactoryV3ABI,
              },
              quoter: {
                // https://polygonscan.com/address/0xb1E835Dc2785b52265711e17fCCb0fd018226a6e#readContract
                address: '0xb1E835Dc2785b52265711e17fCCb0fd018226a6e',
                abi: uniswapQuoterV3ABI,
              },
              positionManager: {
                // https://polygonscan.com/address/0xb7402ee99F0A008e461098AC3A27F4957Df89a40#readContract
                address: '0xb7402ee99F0A008e461098AC3A27F4957Df89a40',
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
        ...SushiSwap.commonProps,
        chainId: zkEVMMainChainId,
        defaultPairs: {
          inputAddress: POLToken.ZKEVM.MAINNET().contractAddress,
          outputAddress: WPOLToken.ZKEVM.MAINNET().contractAddress,
        },
        protocols: {
          protocolV2: {
            '1-0-0': {
              feePercent: 0.003,
              router: {
                // https://zkevm.polygonscan.com/address/0x9B3336186a38E1b6c21955d112dbb0343Ee061eE#readContract
                address: '0x9B3336186a38E1b6c21955d112dbb0343Ee061eE',
                abi: uniswapRouterV2ABI,
                methods: defaultRouterMethodMapV2,
              },
              factory: {
                // https://zkevm.polygonscan.com/address/0xB45e53277a7e0F1D35f2a77160e91e25507f1763#readContract
                address: '0xB45e53277a7e0F1D35f2a77160e91e25507f1763',
                abi: uniswapFactoryV2ABI,
                methods: defaultFactoryMethodMapV2,
              },
              pair: {
                abi: uniswapPairV2ABI,
                methods: defaultPairMethodMapV2,
              },
            },
          },
          protocolV3: {
            '1-0-0': {
              feeTiers: [100, 500, 3000, 10000] as const,
              router: {
                // https://zkevm.polygonscan.com/address/0xc14Ee6B248787847527e11b8d7Cf257b212f7a9F#readContract
                address: '0xc14Ee6B248787847527e11b8d7Cf257b212f7a9F',
                abi: uniswapRouterV3ABI,
              },
              factory: {
                // https://zkevm.polygonscan.com/address/0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506#readContract
                address: '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506',
                abi: uniswapFactoryV3ABI,
              },
              quoter: {
                // https://zkevm.polygonscan.com/address/0xb1E835Dc2785b52265711e17fCCb0fd018226a6e#readContract
                address: '0xb1E835Dc2785b52265711e17fCCb0fd018226a6e',
                abi: uniswapQuoterV3ABI,
              },
              positionManager: {
                // https://zkevm.polygonscan.com/address/0xF4d73326C13a4Fc5FD7A064217e12780e9Bd62c3#readContract
                address: '0xF4d73326C13a4Fc5FD7A064217e12780e9Bd62c3',
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
        return SushiSwap.ARBITRUM.MAINNET()
      case avaxMainChainId:
        return SushiSwap.AVALANCHE.MAINNET()
      case avaxFujiChainId:
        return SushiSwap.AVALANCHE.FUJI()
      case baseMainChainId:
        return SushiSwap.BASE.MAINNET()
      case blastMainChainId:
        return SushiSwap.BLAST.MAINNET()
      case bscMainChainId:
        return SushiSwap.BSC.MAINNET()
      case bscTestChainId:
        return SushiSwap.BSC.TESTNET()
      case celoMainChainId:
        return SushiSwap.CELO.MAINNET()
      case ethMainChainId:
        return SushiSwap.ETH.MAINNET()
      case ethSepoliaChainId:
        return SushiSwap.ETH.SEPOLIA()
      case optimismMainChainId:
        return SushiSwap.OPTIMISM.MAINNET()
      case polygonMainChainId:
        return SushiSwap.POLYGON.MAINNET()
      case zkEVMMainChainId:
        return SushiSwap.ZKEVM.MAINNET()
      default:
        return undefined
    }
  }

  public static getAllDexConfigs(): DexConfig[] {
    return [
      SushiSwap.ARBITRUM.MAINNET(),
      SushiSwap.AVALANCHE.MAINNET(),
      SushiSwap.AVALANCHE.FUJI(),
      SushiSwap.BASE.MAINNET(),
      SushiSwap.BLAST.MAINNET(),
      SushiSwap.BSC.MAINNET(),
      SushiSwap.BSC.TESTNET(),
      SushiSwap.CELO.MAINNET(),
      SushiSwap.ETH.MAINNET(),
      SushiSwap.ETH.SEPOLIA(),
      SushiSwap.OPTIMISM.MAINNET(),
      SushiSwap.POLYGON.MAINNET(),
      SushiSwap.ZKEVM.MAINNET(),
    ]
  }
}
