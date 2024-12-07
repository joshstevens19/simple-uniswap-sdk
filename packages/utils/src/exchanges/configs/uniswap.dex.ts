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
  arbitrumSepoliaChainId,
  avaxMainChainId,
  baseMainChainId,
  baseSepoliaChainId,
  blastMainChainId,
  celoAlfajoresChainId,
  celoMainChainId,
  ethMainChainId,
  ethSepoliaChainId,
  polygonMainChainId,
  zksyncMainChainId,
  zoraMainChainId,
  zoraSepoliaChainId,
} from '../../chains/chainIds'
import { AVAXToken, ETHCoin, WAVAXToken, WETHToken } from '../../tokens/index'
import { dexTypeMap } from '../../utils/dex.utils'

/**
 * App:
 * [Uniswap](https://app.uniswap.org/swap)
 *
 * V2 Deployments:
 * [V2 Deployment Addresses](https://docs.uniswap.org/contracts/v2/reference/smart-contracts/v2-deployments)
 *
 * V3 Deployments:
 * [V3 Deployment Addresses](https://docs.uniswap.org/contracts/v3/reference/deployments/)
 */

export class Uniswap {
  private static commonProps: Omit<DexConfig, 'chainId' | 'protocols'> = {
    dexType: dexTypeMap.UNISWAP,
    dexTag: dexTypeMap.UNISWAP,
    title: 'Uniswap',
    logoUrl:
      'https://github.com/trustwallet/assets/blob/master/dapps/app.uniswap.org.png?raw=true',
    color: 'rgb(252, 6, 124)',
  }

  public static ARBITRUM = {
    MAINNET: (): DexConfig => {
      return {
        ...Uniswap.commonProps,
        chainId: arbitrumMainChainId,
        protocols: {
          protocolV2: {
            '1-0-0': {
              feePercent: 0.003,
              router: {
                // https://arbiscan.io/address/0x4752ba5DBc23f44D87826276BF6Fd6b1C372aD24#readContract
                address: '0x4752ba5DBc23f44D87826276BF6Fd6b1C372aD24',
                abi: uniswapRouterV2ABI,
              },
              factory: {
                // https://arbiscan.io/address/0xf1D7CC64Fb4452F05c498126312eBE29f30Fbcf9#readContract
                address: '0xf1D7CC64Fb4452F05c498126312eBE29f30Fbcf9',
                abi: uniswapFactoryV2ABI,
              },
              pair: {
                abi: uniswapPairV2ABI,
              },
            },
          },
          protocolV3: {
            '1-0-0': {
              feeTiers: [500, 3000, 10000] as const,
              router: {
                // https://arbiscan.io/address/0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45#readContract
                address: '0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45',
                abi: uniswapRouterV3ABI,
              },
              factory: {
                // https://arbiscan.io/address/0x1F98431c8aD98523631AE4a59f267346ea31F984#readContract
                address: '0x1F98431c8aD98523631AE4a59f267346ea31F984',
                abi: uniswapFactoryV3ABI,
              },
              quoter: {
                // https://arbiscan.io/address/0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6#readContract
                address: '0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6',
                abi: uniswapQuoterV3ABI,
              },
              positionManager: {
                // https://arbiscan.io/address/0xC36442b4a4522E871399CD717aBDD847Ab11FE88#readContract
                address: '0xC36442b4a4522E871399CD717aBDD847Ab11FE88',
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
        ...Uniswap.commonProps,
        chainId: arbitrumSepoliaChainId,
        protocols: {
          protocolV3: {
            '1-0-0': {
              feeTiers: [500, 3000, 10000] as const,
              router: {
                // https://sepolia.arbiscan.io/address/0x101F443B4d1b059569D643917553c771E1b9663E#readContract
                address: '0x101F443B4d1b059569D643917553c771E1b9663E',
                abi: uniswapRouterV3ABI,
              },
              factory: {
                // https://sepolia.arbiscan.io/address/0x248AB79Bbb9bC29bB72f7Cd42F17e054Fc40188e#readContract
                address: '0x248AB79Bbb9bC29bB72f7Cd42F17e054Fc40188e',
                abi: uniswapFactoryV3ABI,
              },
              quoter: {
                // https://sepolia.arbiscan.io/address/0x2779a0CC1c3e0E44D2542EC3e79e3864Ae93Ef0B#readContract
                address: '0x2779a0CC1c3e0E44D2542EC3e79e3864Ae93Ef0B',
                abi: uniswapQuoterV3ABI,
              },
              positionManager: {
                // https://sepolia.arbiscan.io/address/0x6b2937Bde17889EDCf8fbD8dE31C3C2a70Bc4d65#readContract
                address: '0x6b2937Bde17889EDCf8fbD8dE31C3C2a70Bc4d65',
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
        ...Uniswap.commonProps,
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
                // https://snowtrace.io/address/0x4752ba5DBc23f44D87826276BF6Fd6b1C372aD24/contract/43114/readContract?chainid=43114
                address: '0x4752ba5DBc23f44D87826276BF6Fd6b1C372aD24',
                abi: uniswapRouterV2ABI,
              },
              factory: {
                // https://snowtrace.io/address/0x9e5A52f57b3038F1B8EeE45F28b3C1967e22799C/contract/43114/readContract?chainid=43114
                address: '0x9e5A52f57b3038F1B8EeE45F28b3C1967e22799C',
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
                // https://snowtrace.io/address/0xbb00FF08d01D300023C629E8fFfFcb65A5a578cE/contract/43114/readContract?chainid=43114
                address: '0xbb00FF08d01D300023C629E8fFfFcb65A5a578cE',
                abi: uniswapRouterV3ABI,
              },
              factory: {
                // https://snowtrace.io/address/0x740b1c1de25031C31FF4fC9A62f554A55cdC1baD/contract/43114/readContract?chainid=43114
                address: '0x740b1c1de25031C31FF4fC9A62f554A55cdC1baD',
                abi: uniswapFactoryV3ABI,
              },
              quoter: {
                // https://snowtrace.io/address/0xbe0F5544EC67e9B3b2D979aaA43f18Fd87E6257F/contract/43114/readContract?chainid=43114
                address: '0xbe0F5544EC67e9B3b2D979aaA43f18Fd87E6257F',
                abi: uniswapQuoterV3ABI,
              },
              positionManager: {
                // https://snowtrace.io/address/0x655C406EBFa14EE2006250925e54ec43AD184f8B/contract/43114/readContract?chainid=43114
                address: '0x655C406EBFa14EE2006250925e54ec43AD184f8B',
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
        ...Uniswap.commonProps,
        chainId: baseMainChainId,
        protocols: {
          protocolV2: {
            '1-0-0': {
              feePercent: 0.003,
              router: {
                // https://basescan.org/address/0x4752ba5DBc23f44D87826276BF6Fd6b1C372aD24#readContract
                address: '0x4752ba5DBc23f44D87826276BF6Fd6b1C372aD24',
                abi: uniswapRouterV2ABI,
              },
              factory: {
                // https://basescan.org/address/0x8909Dc15e40173Ff4699343b6eB8132c65e18eC6#readContract
                address: '0x8909Dc15e40173Ff4699343b6eB8132c65e18eC6',
                abi: uniswapFactoryV2ABI,
              },
              pair: {
                abi: uniswapPairV2ABI,
              },
            },
          },
          protocolV3: {
            '1-0-0': {
              feeTiers: [500, 3000, 10000] as const,
              router: {
                // https://basescan.org/address/0x2626664c2603336E57B271c5C0b26F421741e481#readContract
                address: '0x2626664c2603336E57B271c5C0b26F421741e481',
                abi: uniswapRouterV3ABI,
              },
              factory: {
                // https://basescan.org/address/0x33128a8fC17869897dcE68Ed026d694621f6FDfD#readContract
                address: '0x33128a8fC17869897dcE68Ed026d694621f6FDfD',
                abi: uniswapFactoryV3ABI,
              },
              quoter: {
                // https://basescan.org/address/0x3d4e44Eb1374240CE5F1B871ab261CD16335B76a#readContract
                address: '0x3d4e44Eb1374240CE5F1B871ab261CD16335B76a',
                abi: uniswapQuoterV3ABI,
              },
              positionManager: {
                // https://basescan.org/address/0x03a520b32C04BF3bEEf7BEb72E919cf822Ed34f1#readContract
                address: '0x03a520b32C04BF3bEEf7BEb72E919cf822Ed34f1',
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
        ...Uniswap.commonProps,
        chainId: baseSepoliaChainId,
        protocols: {
          protocolV3: {
            '1-0-0': {
              feeTiers: [500, 3000, 10000] as const,
              router: {
                // https://sepolia.basescan.org/address/0x94cC0AaC535CCDB3C01d6787D6413C739ae12bc4#readContract
                address: '0x94cC0AaC535CCDB3C01d6787D6413C739ae12bc4',
                abi: uniswapRouterV3ABI,
              },
              factory: {
                // https://sepolia.basescan.org/address/0x4752ba5DBc23f44D87826276BF6Fd6b1C372aD24#readContract
                address: '0x4752ba5DBc23f44D87826276BF6Fd6b1C372aD24',
                abi: uniswapFactoryV3ABI,
              },
              quoter: {
                // https://sepolia.basescan.org/address/0xC5290058841028F1614F3A6F0F5816cAd0df5E27#readContract
                address: '0xC5290058841028F1614F3A6F0F5816cAd0df5E27',
                abi: uniswapQuoterV3ABI,
              },
              positionManager: {
                // https://sepolia.basescan.org/address/0x27F971cb582BF9E50F397e4d29a5C7A34f11faA2#readContract
                address: '0x27F971cb582BF9E50F397e4d29a5C7A34f11faA2',
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
        ...Uniswap.commonProps,
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
                // https://blastscan.io/address/0xBB66Eb1c5e875933D44DAe661dbD80e5D9B03035#readContract
                address: '0xBB66Eb1c5e875933D44DAe661dbD80e5D9B03035',
                abi: uniswapRouterV2ABI,
              },
              factory: {
                // https://blastscan.io/address/0x5C346464d33F90bABaf70dB6388507CC889C1070#readContract
                address: '0x5C346464d33F90bABaf70dB6388507CC889C1070',
                abi: uniswapFactoryV2ABI,
              },
              pair: {
                abi: uniswapPairV2ABI,
              },
            },
          },
          protocolV3: {
            '1-0-0': {
              feeTiers: [500, 3000, 10000] as const,
              router: {
                // https://blastscan.io/address/0x549FEB8c9bd4c12Ad2AB27022dA12492aC452B66#readContract
                address: '0x549FEB8c9bd4c12Ad2AB27022dA12492aC452B66',
                abi: uniswapRouterV3ABI,
              },
              factory: {
                // https://blastscan.io/address/0x792edAdE80af5fC680d96a2eD80A44247D2Cf6Fd#readContract
                address: '0x792edAdE80af5fC680d96a2eD80A44247D2Cf6Fd',
                abi: uniswapFactoryV3ABI,
              },
              quoter: {
                // https://blastscan.io/address/0x6Cdcd65e03c1CEc3730AeeCd45bc140D57A25C77#readContract
                address: '0x6Cdcd65e03c1CEc3730AeeCd45bc140D57A25C77',
                abi: uniswapQuoterV3ABI,
              },
              positionManager: {
                // https://blastscan.io/address/0xB218e4f7cF0533d4696fDfC419A0023D33345F28#readContract
                address: '0xB218e4f7cF0533d4696fDfC419A0023D33345F28',
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

  public static CELO = {
    MAINNET: (): DexConfig => {
      return {
        ...Uniswap.commonProps,
        chainId: celoMainChainId,
        defaultPairs: {
          inputAddress: ETHCoin.CELO.MAINNET().contractAddress,
          outputAddress: WETHToken.CELO.MAINNET().contractAddress,
        },
        protocols: {
          protocolV3: {
            '1-0-0': {
              feeTiers: [500, 3000, 10000] as const,
              router: {
                // https://celoscan.io/address/0x5615CDAb10dc425a742d643d949a7F474C01abc4#readContract
                address: '0x5615CDAb10dc425a742d643d949a7F474C01abc4',
                abi: uniswapRouterV3ABI,
              },
              factory: {
                // https://celoscan.io/address/0xAfE208a311B21f13EF87E33A90049fC17A7acDEc#readContract
                address: '0xAfE208a311B21f13EF87E33A90049fC17A7acDEc',
                abi: uniswapFactoryV3ABI,
              },
              quoter: {
                // https://celoscan.io/address/0x82825d0554fA07f7FC52Ab63c961F330fdEFa8E8#readContract
                address: '0x82825d0554fA07f7FC52Ab63c961F330fdEFa8E8',
                abi: uniswapQuoterV3ABI,
              },
              positionManager: {
                // https://celoscan.io/address/0x3d79EdAaBC0EaB6F08ED885C05Fc0B014290D95A#readContract
                address: '0x3d79EdAaBC0EaB6F08ED885C05Fc0B014290D95A',
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
    ALFAJORES: (): DexConfig => {
      return {
        ...Uniswap.commonProps,
        chainId: celoAlfajoresChainId,
        defaultPairs: {
          inputAddress: ETHCoin.CELO.ALFAJORES().contractAddress,
          outputAddress: WETHToken.CELO.ALFAJORES().contractAddress,
        },
        protocols: {
          protocolV3: {
            '1-0-0': {
              feeTiers: [500, 3000, 10000] as const,
              router: {
                // https://celo-alfajores.blockscout.com/address/0x5615CDAb10dc425a742d643d949a7F474C01abc4?tab=read_write_contract
                address: '0x5615CDAb10dc425a742d643d949a7F474C01abc4',
                abi: uniswapRouterV3ABI,
              },
              factory: {
                // https://celo-alfajores.blockscout.com/address/0xAfE208a311B21f13EF87E33A90049fC17A7acDEc?tab=read_write_contract
                address: '0xAfE208a311B21f13EF87E33A90049fC17A7acDEc',
                abi: uniswapFactoryV3ABI,
              },
              quoter: {
                // https://celo-alfajores.blockscout.com/address/0x82825d0554fA07f7FC52Ab63c961F330fdEFa8E8?tab=read_write_contract
                address: '0x82825d0554fA07f7FC52Ab63c961F330fdEFa8E8',
                abi: uniswapQuoterV3ABI,
              },
              positionManager: {
                // https://celo-alfajores.blockscout.com/address/0x3d79EdAaBC0EaB6F08ED885C05Fc0B014290D95A?tab=read_write_contract
                address: '0x3d79EdAaBC0EaB6F08ED885C05Fc0B014290D95A',
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
        ...Uniswap.commonProps,
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
                // https://etherscan.io/address/0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D#readContract
                address: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
                abi: uniswapRouterV2ABI,
              },
              factory: {
                // https://etherscan.io/address/0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f#readContract
                address: '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f',
                abi: uniswapFactoryV2ABI,
              },
              pair: {
                abi: uniswapPairV2ABI,
              },
            },
          },
          protocolV3: {
            '1-0-0': {
              feeTiers: [500, 3000, 10000] as const,
              router: {
                // https://etherscan.io/address/0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45#readContract
                address: '0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45',
                abi: uniswapRouterV3ABI,
              },
              factory: {
                // https://etherscan.io/address/0x1F98431c8aD98523631AE4a59f267346ea31F984#readContract
                address: '0x1F98431c8aD98523631AE4a59f267346ea31F984',
                abi: uniswapFactoryV3ABI,
              },
              quoter: {
                // https://etherscan.io/address/0x61fFE014bA17989E743c5F6cB21bF9697530B21e#readContract
                address: '0x61fFE014bA17989E743c5F6cB21bF9697530B21e',
                abi: uniswapQuoterV3ABI,
              },
              positionManager: {
                // https://etherscan.io/address/0xC36442b4a4522E871399CD717aBDD847Ab11FE88#readContract
                address: '0xC36442b4a4522E871399CD717aBDD847Ab11FE88',
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
        ...Uniswap.commonProps,
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
                // https://sepolia.etherscan.io/address/0xeE567Fe1712Faf6149d80dA1E6934E354124CfE3#readContract
                address: '0xeE567Fe1712Faf6149d80dA1E6934E354124CfE3',
                abi: uniswapRouterV2ABI,
              },
              factory: {
                // https://sepolia.etherscan.io/address/0xF62c03E08ada871A0bEb309762E260a7a6a880E6#readContract
                address: '0xF62c03E08ada871A0bEb309762E260a7a6a880E6',
                abi: uniswapFactoryV2ABI,
              },
              pair: {
                abi: uniswapPairV2ABI,
              },
            },
          },
          protocolV3: {
            '1-0-0': {
              feeTiers: [500, 3000, 10000] as const,
              router: {
                // https://sepolia.etherscan.io/address/0x3bFA4769FB09eefC5a80d6E87c3B9C650f7Ae48E#readContract
                address: '0x3bFA4769FB09eefC5a80d6E87c3B9C650f7Ae48E',
                abi: uniswapRouterV3ABI,
              },
              factory: {
                // https://sepolia.etherscan.io/address/0x0227628f3F023bb0B980b67D528571c95c6DaC1c#readContract
                address: '0x0227628f3F023bb0B980b67D528571c95c6DaC1c',
                abi: uniswapFactoryV3ABI,
              },
              quoter: {
                // https://sepolia.etherscan.io/address/0xEd1f6473345F45b75F8179591dd5bA1888cf2FB3#readContract
                address: '0xEd1f6473345F45b75F8179591dd5bA1888cf2FB3',
                abi: uniswapQuoterV3ABI,
              },
              positionManager: {
                // https://sepolia.etherscan.io/address/0x1238536071E1c677A632429e3655c799b22cDA52#readContract
                address: '0x1238536071E1c677A632429e3655c799b22cDA52',
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
        ...Uniswap.commonProps,
        chainId: polygonMainChainId,
        defaultPairs: {
          inputAddress: ETHCoin.POLYGON.MAINNET().contractAddress,
          outputAddress: WETHToken.POLYGON.MAINNET().contractAddress,
        },
        protocols: {
          protocolV2: {
            '1-0-0': {
              feePercent: 0.003,
              router: {
                // https://polygonscan.com/address/0xedf6066a2b290C185783862C7F4776A2C8077AD1#readContract
                address: '0xedf6066a2b290C185783862C7F4776A2C8077AD1',
                abi: uniswapRouterV2ABI,
              },
              factory: {
                // https://polygonscan.com/address/0x9e5A52f57b3038F1B8EeE45F28b3C1967e22799C#readContract
                address: '0x9e5A52f57b3038F1B8EeE45F28b3C1967e22799C',
                abi: uniswapFactoryV2ABI,
              },
              pair: {
                abi: uniswapPairV2ABI,
              },
            },
          },
          protocolV3: {
            '1-0-0': {
              feeTiers: [500, 3000, 10000] as const,
              router: {
                // https://polygonscan.com/address/0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45#readContract
                address: '0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45',
                abi: uniswapRouterV3ABI,
              },
              factory: {
                // https://polygonscan.com/address/0x1F98431c8aD98523631AE4a59f267346ea31F984#readContract
                address: '0x1F98431c8aD98523631AE4a59f267346ea31F984',
                abi: uniswapFactoryV3ABI,
              },
              quoter: {
                // https://polygonscan.com/address/0x61fFE014bA17989E743c5F6cB21bF9697530B21e#readContract
                address: '0x61fFE014bA17989E743c5F6cB21bF9697530B21e',
                abi: uniswapQuoterV3ABI,
              },
              positionManager: {
                // https://polygonscan.com/address/0xC36442b4a4522E871399CD717aBDD847Ab11FE88#readContract
                address: '0xC36442b4a4522E871399CD717aBDD847Ab11FE88',
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

  public static ZORA = {
    MAINNET: (): DexConfig => {
      return {
        ...Uniswap.commonProps,
        chainId: zoraMainChainId,
        defaultPairs: {
          inputAddress: ETHCoin.ZORA.MAINNET().contractAddress,
          outputAddress: WETHToken.ZORA.MAINNET().contractAddress,
        },
        protocols: {
          protocolV2: {
            '1-0-0': {
              feePercent: 0.003,
              router: {
                // https://explorer.zora.energy/address/0xa00F34A632630EFd15223B1968358bA4845bEEC7?tab=read_contract
                address: '0xa00F34A632630EFd15223B1968358bA4845bEEC7',
                abi: uniswapRouterV2ABI,
              },
              factory: {
                // https://explorer.zora.energy/address/0x0F797dC7efaEA995bB916f268D919d0a1950eE3C?tab=read_contract
                address: '0x0F797dC7efaEA995bB916f268D919d0a1950eE3C',
                abi: uniswapFactoryV2ABI,
              },
              pair: {
                abi: uniswapPairV2ABI,
              },
            },
          },
          protocolV3: {
            '1-0-0': {
              feeTiers: [500, 3000, 10000] as const,
              router: {
                // https://explorer.zora.energy/address/0x7De04c96BE5159c3b5CeffC82aa176dc81281557?tab=read_contract
                address: '0x7De04c96BE5159c3b5CeffC82aa176dc81281557',
                abi: uniswapRouterV3ABI,
              },
              factory: {
                // https://explorer.zora.energy/address/0x7145F8aeef1f6510E92164038E1B6F8cB2c42Cbb?tab=read_contract
                address: '0x7145F8aeef1f6510E92164038E1B6F8cB2c42Cbb',
                abi: uniswapFactoryV3ABI,
              },
              quoter: {
                // https://explorer.zora.energy/address/0x11867e1b3348F3ce4FcC170BC5af3d23E07E64Df?tab=read_contract
                address: '0x11867e1b3348F3ce4FcC170BC5af3d23E07E64Df',
                abi: uniswapQuoterV3ABI,
              },
              positionManager: {
                // https://explorer.zora.energy/address/0xbC91e8DfA3fF18De43853372A3d7dfe585137D78?tab=read_contract
                address: '0xbC91e8DfA3fF18De43853372A3d7dfe585137D78',
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
        ...Uniswap.commonProps,
        chainId: zoraSepoliaChainId,
        defaultPairs: {
          inputAddress: ETHCoin.ZORA.SEPOLIA().contractAddress,
          outputAddress: WETHToken.ZORA.SEPOLIA().contractAddress,
        },
        protocols: {
          protocolV3: {
            '1-0-0': {
              feeTiers: [500, 3000, 10000] as const,
              router: {
                // https://sepolia.explorer.zora.energy/address/0x6B36d761981d82B1e07cF3c4daF4cB4615c4850a?tab=read_contract
                address: '0x6B36d761981d82B1e07cF3c4daF4cB4615c4850a',
                abi: uniswapRouterV3ABI,
              },
              factory: {
                // https://sepolia.explorer.zora.energy/address/0x4324A677D74764f46f33ED447964252441aA8Db6?tab=read_contract
                address: '0x4324A677D74764f46f33ED447964252441aA8Db6',
                abi: uniswapFactoryV3ABI,
              },
              quoter: {
                // https://sepolia.explorer.zora.energy/address/0xC195976fEF0985886E37036E2DF62bF371E12Df0?tab=read_contract
                address: '0xC195976fEF0985886E37036E2DF62bF371E12Df0',
                abi: uniswapQuoterV3ABI,
              },
              positionManager: {
                // https://sepolia.explorer.zora.energy/address/0xB8458EaAe43292e3c1F7994EFd016bd653d23c20?tab=read_contract
                address: '0xB8458EaAe43292e3c1F7994EFd016bd653d23c20',
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
        ...Uniswap.commonProps,
        chainId: zksyncMainChainId,
        defaultPairs: {
          inputAddress: ETHCoin.ZKSYNC.MAINNET().contractAddress,
          outputAddress: WETHToken.ZKSYNC.MAINNET().contractAddress,
        },
        protocols: {
          protocolV3: {
            '1-0-0': {
              feeTiers: [500, 3000, 10000] as const,
              router: {
                // https://era.zksync.network/address/0x99c56385daBCE3E81d8499d0b8d0257aBC07E8A3#readContract
                address: '0x99c56385daBCE3E81d8499d0b8d0257aBC07E8A3',
                abi: uniswapRouterV3ABI,
              },
              factory: {
                // https://era.zksync.network/address/0x8FdA5a7a8dCA67BBcDd10F02Fa0649A937215422#readContract
                address: '0x8FdA5a7a8dCA67BBcDd10F02Fa0649A937215422',
                abi: uniswapFactoryV3ABI,
              },
              quoter: {
                // https://era.zksync.network/address/0x8Cb537fc92E26d8EBBb760E632c95484b6Ea3e28#readContract
                address: '0x8Cb537fc92E26d8EBBb760E632c95484b6Ea3e28',
                abi: uniswapQuoterV3ABI,
              },
              positionManager: {
                // https://era.zksync.network/address/0x0616e5762c1E7Dc3723c50663dF10a162D690a86#readContract
                address: '0x0616e5762c1E7Dc3723c50663dF10a162D690a86',
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
        return Uniswap.ARBITRUM.MAINNET()
      case arbitrumSepoliaChainId:
        return Uniswap.ARBITRUM.SEPOLIA()
      case avaxMainChainId:
        return Uniswap.AVALANCHE.MAINNET()
      case baseMainChainId:
        return Uniswap.BASE.MAINNET()
      case baseSepoliaChainId:
        return Uniswap.BASE.SEPOLIA()
      case blastMainChainId:
        return Uniswap.BLAST.MAINNET()
      case celoMainChainId:
        return Uniswap.CELO.MAINNET()
      case celoAlfajoresChainId:
        return Uniswap.CELO.ALFAJORES()
      case ethMainChainId:
        return Uniswap.ETH.MAINNET()
      case ethSepoliaChainId:
        return Uniswap.ETH.SEPOLIA()
      case polygonMainChainId:
        return Uniswap.POLYGON.MAINNET()
      case zoraMainChainId:
        return Uniswap.ZORA.MAINNET()
      case zoraSepoliaChainId:
        return Uniswap.ZORA.SEPOLIA()
      case zksyncMainChainId:
        return Uniswap.ZKSYNC.MAINNET()
      default:
        return undefined
    }
  }

  public static getAllDexConfigs(): DexConfig[] {
    return [
      Uniswap.ARBITRUM.MAINNET(),
      Uniswap.ARBITRUM.SEPOLIA(),
      Uniswap.AVALANCHE.MAINNET(),
      Uniswap.BASE.MAINNET(),
      Uniswap.BASE.SEPOLIA(),
      Uniswap.BLAST.MAINNET(),
      Uniswap.CELO.MAINNET(),
      Uniswap.CELO.ALFAJORES(),
      Uniswap.ETH.MAINNET(),
      Uniswap.ETH.SEPOLIA(),
      Uniswap.POLYGON.MAINNET(),
      Uniswap.ZORA.MAINNET(),
      Uniswap.ZORA.SEPOLIA(),
      Uniswap.ZKSYNC.MAINNET(),
    ]
  }
}
