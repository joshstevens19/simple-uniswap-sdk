import {
  arbitrumMainChainId,
  avaxFujiChainId,
  avaxMainChainId,
  bscMainChainId,
  bscTestChainId,
  ethMainChainId,
} from '@chain-toolkit/chains'
import type { ChainId } from '@chain-toolkit/schemas'
import type {
  DexConfig,
  UniswapFactoryV2Types,
  UniswapPairV2Types,
  UniswapRouterV2Types,
} from '@dex-toolkit/types'
import type { ContractDetail } from '@multicall-toolkit/types'

import {
  traderJoeRouterV2100ABI,
  traderJoeRouterV2200ABI,
  traderJoeRouterV2210ABI,
  traderJoeRouterV2220ABI,
  traderJoeFactoryV2200ABI,
  traderJoeFactoryV2210ABI,
  traderJoeFactoryV2220ABI,
  tradeJoePairV2ABI,
  uniswapFactoryV2ABI,
  uniswapPairV2ABI,
} from '../../abis/index'
import {
  AVAXToken,
  BNBToken,
  ETHCoin,
  WAVAXToken,
  WBNBToken,
  WETHToken,
} from '../../tokens/configs/index'
import { dexTypeMap } from '../../utils/dex.utils'

/**
 * App:
 * [LFJ.gg](https://lfj.gg/avalanche/trade)
 *
 * V2 Deployments:
 * [Avalanche Deployment Addresses](https://docs.lfj.gg/deployment-addresses/avalanche)
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

const V2Router_2_0_0: ContractDetail<UniswapRouterV2Types.MethodNameMap>['methods'] =
  {
    WETH: 'wavax',
    factory: 'factory',

    // Disabled
    quote: '',
    getAmountIn: '',
    getAmountOut: '',
    getAmountsIn: '',
    getAmountsOut: '',
    removeLiquidityWithPermit: '',
    removeLiquidityETHWithPermit: '',
    removeLiquidityETHSupportingFeeOnTransferTokens: '',
    removeLiquidityETHWithPermitSupportingFeeOnTransferTokens: '',

    // Liquidity
    addLiquidity: 'addLiquidity',
    addLiquidityETH: 'addLiquidityAVAX',
    removeLiquidity: 'removeLiquidity',
    removeLiquidityETH: 'removeLiquidityAVAX',

    // Swapping
    swapExactETHForTokens: 'swapExactAVAXForTokens',
    swapETHForExactTokens: 'swapAVAXForExactTokens',
    swapExactETHForTokensSupportingFeeOnTransferTokens:
      'swapExactAVAXForTokensSupportingFeeOnTransferTokens',
    swapExactTokensForETH: 'swapExactTokensForAVAX',
    swapTokensForExactETH: 'swapTokensForExactAVAX',
    swapExactTokensForETHSupportingFeeOnTransferTokens:
      'swapExactTokensForAVAXSupportingFeeOnTransferTokens',

    // Token-to-token swaps
    swapExactTokensForTokens: 'swapExactTokensForTokens',
    swapTokensForExactTokens: 'swapTokensForExactTokens',
    swapExactTokensForTokensSupportingFeeOnTransferTokens:
      'swapExactTokensForTokensSupportingFeeOnTransferTokens',
  }

const V2Factory_2_0_0: ContractDetail<UniswapFactoryV2Types.MethodNameMap>['methods'] =
  {
    // Factory methods
    createPair: 'createLBPair',
    getPair: 'getLBPairInformation',

    // Pair and Factory Info
    allPairs: 'allLBPairs',
    allPairsLength: 'getNumberOfLBPairs',
    feeTo: 'feeRecipient',
    feeToSetter: '',

    // Fee Management
    setFeeTo: 'setFeeRecipient',
    setFeeToSetter: '',
  }

const V2Router_2_1_0: ContractDetail<UniswapRouterV2Types.MethodNameMap>['methods'] =
  {
    WETH: 'getWNATIVE',
    factory: 'getFactory',

    // Disabled
    quote: '',
    getAmountIn: '',
    getAmountOut: '',
    getAmountsIn: '',
    getAmountsOut: '',
    removeLiquidityWithPermit: '',
    removeLiquidityETHWithPermit: '',
    removeLiquidityETHSupportingFeeOnTransferTokens: '',
    removeLiquidityETHWithPermitSupportingFeeOnTransferTokens: '',

    // Liquidity
    addLiquidity: 'addLiquidity',
    addLiquidityETH: 'addLiquidityNATIVE',
    removeLiquidity: 'removeLiquidity',
    removeLiquidityETH: 'removeLiquidityNATIVE',

    // Swapping
    swapExactETHForTokens: 'swapExactNATIVEForTokens',
    swapETHForExactTokens: 'swapNATIVEForExactTokens',
    swapExactETHForTokensSupportingFeeOnTransferTokens:
      'swapExactNATIVEForTokensSupportingFeeOnTransferTokens',
    swapExactTokensForETH: 'swapExactTokensForNATIVE',
    swapTokensForExactETH: 'swapTokensForExactNATIVE',
    swapExactTokensForETHSupportingFeeOnTransferTokens:
      'swapExactTokensForNATIVESupportingFeeOnTransferTokens',

    // Token-to-token swaps
    swapExactTokensForTokens: 'swapExactTokensForTokens',
    swapTokensForExactTokens: 'swapTokensForExactTokens',
    swapExactTokensForTokensSupportingFeeOnTransferTokens:
      'swapExactTokensForTokensSupportingFeeOnTransferTokens',
  }

const V2Factory_2_1_0: ContractDetail<UniswapFactoryV2Types.MethodNameMap>['methods'] =
  {
    // Factory methods
    createPair: 'createLBPair',
    getPair: 'getLBPairInformation',

    // Pair and Factory Info
    allPairs: 'getAllLBPairs',
    allPairsLength: 'getNumberOfLBPairs',
    feeTo: 'getFeeRecipient',
    feeToSetter: '',

    // Fee Management
    setFeeTo: 'setFeeRecipient',
    setFeeToSetter: '',
  }

const V2Router_2_2_0: ContractDetail<UniswapRouterV2Types.MethodNameMap>['methods'] =
  {
    WETH: 'getWNATIVE',
    factory: 'getFactory',

    // Disabled
    quote: '',
    getAmountIn: '',
    getAmountOut: '',
    getAmountsIn: '',
    getAmountsOut: '',
    removeLiquidityWithPermit: '',
    removeLiquidityETHWithPermit: '',
    removeLiquidityETHSupportingFeeOnTransferTokens: '',
    removeLiquidityETHWithPermitSupportingFeeOnTransferTokens: '',

    // Liquidity
    addLiquidity: 'addLiquidity',
    addLiquidityETH: 'addLiquidityNATIVE',
    removeLiquidity: 'removeLiquidity',
    removeLiquidityETH: 'removeLiquidityNATIVE',

    // Swapping
    swapExactETHForTokens: 'swapExactNATIVEForTokens',
    swapETHForExactTokens: 'swapNATIVEForExactTokens',
    swapExactETHForTokensSupportingFeeOnTransferTokens:
      'swapExactNATIVEForTokensSupportingFeeOnTransferTokens',
    swapExactTokensForETH: 'swapExactTokensForNATIVE',
    swapTokensForExactETH: 'swapTokensForExactNATIVE',
    swapExactTokensForETHSupportingFeeOnTransferTokens:
      'swapExactTokensForNATIVESupportingFeeOnTransferTokens',

    // Token-to-token swaps
    swapExactTokensForTokens: 'swapExactTokensForTokens',
    swapTokensForExactTokens: 'swapTokensForExactTokens',
    swapExactTokensForTokensSupportingFeeOnTransferTokens:
      'swapExactTokensForTokensSupportingFeeOnTransferTokens',
  }

const V2Factory_2_2_0: ContractDetail<UniswapFactoryV2Types.MethodNameMap>['methods'] =
  {
    // Factory methods
    createPair: 'createLBPair',
    getPair: 'getLBPairInformation',

    // Pair and Factory Info
    allPairs: 'getLBPairAtIndex',
    allPairsLength: 'getNumberOfLBPairs',
    feeTo: 'getFeeRecipient',
    feeToSetter: '',

    // Fee Management
    setFeeTo: 'setFeeRecipient',
    setFeeToSetter: '',
  }

const V2PairMethods: ContractDetail<UniswapPairV2Types.MethodNameMap>['methods'] =
  {
    // General methods
    name: 'name',
    symbol: 'symbol',
    decimals: '',

    // Factory and token addresses
    factory: 'getFactory',
    token0: 'getTokenX',
    token1: 'getTokenY',

    // Reserves
    getReserves: 'getReserves',
    kLast: '',

    // Liquidity and supply
    totalSupply: 'totalSupply',

    // Swaps
    skim: '',
    sync: '',

    // Allowance and approval
    approve: 'approveForAll', // Different signature but similar functionality
    transfer: '',
    transferFrom: '',
    allowance: '',

    // Permit and DOMAIN_SEPARATOR
    DOMAIN_SEPARATOR: '',
    PERMIT_TYPEHASH: '',
    nonces: '',
    permit: '',
  }

export class TraderJoeSwap {
  private static commonProps: Omit<DexConfig, 'chainId' | 'protocols'> = {
    dexType: dexTypeMap.TRADERJOE,
    dexTag: dexTypeMap.TRADERJOE,
    title: 'Trader Joe',
    logoUrl:
      'https://traderjoexyz.com/static/media/trader-joe_2x.2da4ef949b2c16313bb3.webp',
    color: 'rgb(242, 112, 107)',
  }

  public static AVALANCHE = {
    MAINNET: (): DexConfig => {
      return {
        ...TraderJoeSwap.commonProps,
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
                // https://snowtrace.io/address/0x60aE616a2155Ee3d9A68541Ba4544862310933d4/contract/43114/readContract?chainid=43114
                address: '0x60aE616a2155Ee3d9A68541Ba4544862310933d4',
                abi: traderJoeRouterV2100ABI,
                methods: V2Router_1_0_0,
              },
              factory: {
                // https://snowtrace.io/address/0x9Ad6C38BE94206cA50bb0d90783181662f0Cfa10/contract/43114/readContract?chainid=43114
                address: '0x9Ad6C38BE94206cA50bb0d90783181662f0Cfa10',
                abi: uniswapFactoryV2ABI,
              },
              pair: {
                abi: uniswapPairV2ABI,
              },
            },
            '2-0-0': {
              feePercent: 0.003,
              router: {
                // https://snowtrace.io/address/0xE3Ffc583dC176575eEA7FD9dF2A7c65F7E23f4C3/contract/43114/readContract?chainid=43114
                address: '0xE3Ffc583dC176575eEA7FD9dF2A7c65F7E23f4C3',
                abi: traderJoeRouterV2200ABI,
                methods: V2Router_2_0_0,
              },
              factory: {
                // https://snowtrace.io/address/0x6E77932A92582f504FF6c4BdbCef7Da6c198aEEf/contract/43114/readContract?chainid=43114
                address: '0x6E77932A92582f504FF6c4BdbCef7Da6c198aEEf',
                abi: traderJoeFactoryV2200ABI,
                methods: V2Factory_2_0_0,
              },
              pair: {
                abi: tradeJoePairV2ABI,
                methods: V2PairMethods,
              },
            },
            '2-1-0': {
              feePercent: 0.003,
              router: {
                // https://snowtrace.io/address/0xb4315e873dBcf96Ffd0acd8EA43f689D8c20fB30/contract/43114/readContract?chainid=43114
                address: '0xb4315e873dBcf96Ffd0acd8EA43f689D8c20fB30',
                abi: traderJoeRouterV2210ABI,
                methods: V2Router_2_1_0,
              },
              factory: {
                // https://snowtrace.io/address/0x8e42f2F4101563bF679975178e880FD87d3eFd4e/contract/43114/readContract?chainid=43114
                address: '0x8e42f2F4101563bF679975178e880FD87d3eFd4e',
                abi: traderJoeFactoryV2210ABI,
                methods: V2Factory_2_1_0,
              },
              pair: {
                abi: tradeJoePairV2ABI,
                methods: V2PairMethods,
              },
            },
            '2-2-0': {
              feePercent: 0.003,
              router: {
                // https://snowtrace.io/address/0x18556DA13313f3532c54711497A8FedAC273220E/contract/43114/readContract?chainid=43114
                address: '0x18556DA13313f3532c54711497A8FedAC273220E',
                abi: traderJoeRouterV2220ABI,
                methods: V2Router_2_2_0,
              },
              factory: {
                // https://snowtrace.io/address/0xb43120c4745967fa9b93E79C149E66B0f2D6Fe0c/contract/43114/readContract?chainid=43114
                address: '0xb43120c4745967fa9b93E79C149E66B0f2D6Fe0c',
                abi: traderJoeFactoryV2220ABI,
                methods: V2Factory_2_2_0,
              },
              pair: {
                abi: tradeJoePairV2ABI,
                methods: V2PairMethods,
              },
            },
          },
        },
      }
    },
    FUJI: (): DexConfig => {
      return {
        ...TraderJoeSwap.commonProps,
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
                // https://testnet.snowtrace.io/address/0xd7f655E3376cE2D7A2b08fF01Eb3B1023191A901/contract/43113/readContract?chainid=43113
                address: '0xd7f655E3376cE2D7A2b08fF01Eb3B1023191A901',
                abi: traderJoeRouterV2100ABI,
                methods: V2Router_1_0_0,
              },
              factory: {
                // https://testnet.snowtrace.io/address/0xF5c7d9733e5f53abCC1695820c4818C59B457C2C/contract/43113/readContract?chainid=43113
                address: '0xF5c7d9733e5f53abCC1695820c4818C59B457C2C',
                abi: uniswapFactoryV2ABI,
              },
              pair: {
                abi: uniswapPairV2ABI,
              },
            },
            '2-0-0': {
              feePercent: 0.003,
              router: {
                // https://testnet.snowtrace.io/address/0x7b50046cEC8252ca835b148b1eDD997319120a12/contract/43113/readContract?chainid=43113
                address: '0x7b50046cEC8252ca835b148b1eDD997319120a12',
                abi: traderJoeRouterV2200ABI,
                methods: V2Router_2_0_0,
              },
              factory: {
                // https://testnet.snowtrace.io/address/0x6B8E020098cd1B3Ec9f811024bc24e51C660F768/contract/43113/readContract?chainid=43113
                address: '0x6B8E020098cd1B3Ec9f811024bc24e51C660F768',
                abi: traderJoeFactoryV2200ABI,
                methods: V2Factory_2_0_0,
              },
              pair: {
                abi: tradeJoePairV2ABI,
                methods: V2PairMethods,
              },
            },
            '2-1-0': {
              feePercent: 0.003,
              router: {
                // https://testnet.snowtrace.io/address/0xb4315e873dBcf96Ffd0acd8EA43f689D8c20fB30/contract/43113/readContract?chainid=43113
                address: '0xb4315e873dBcf96Ffd0acd8EA43f689D8c20fB30',
                abi: traderJoeRouterV2210ABI,
                methods: V2Router_2_1_0,
              },
              factory: {
                // https://testnet.snowtrace.io/address/0x8e42f2F4101563bF679975178e880FD87d3eFd4e/contract/43113/readContract?chainid=43113
                address: '0x8e42f2F4101563bF679975178e880FD87d3eFd4e',
                abi: traderJoeFactoryV2210ABI,
                methods: V2Factory_2_1_0,
              },
              pair: {
                abi: tradeJoePairV2ABI,
                methods: V2PairMethods,
              },
            },
            '2-2-0': {
              feePercent: 0.003,
              router: {
                // https://testnet.snowtrace.io/address/0x18556DA13313f3532c54711497A8FedAC273220E/contract/43113/readContract?chainid=43113
                address: '0x18556DA13313f3532c54711497A8FedAC273220E',
                abi: traderJoeRouterV2220ABI,
                methods: V2Router_2_2_0,
              },
              factory: {
                // https://testnet.snowtrace.io/address/0xb43120c4745967fa9b93E79C149E66B0f2D6Fe0c/contract/43113/readContract?chainid=43113
                address: '0xb43120c4745967fa9b93E79C149E66B0f2D6Fe0c',
                abi: traderJoeFactoryV2220ABI,
                methods: V2Factory_2_2_0,
              },
              pair: {
                abi: tradeJoePairV2ABI,
                methods: V2PairMethods,
              },
            },
          },
        },
      }
    },
  }

  public static ARBITRUM = {
    MAINNET: (): DexConfig => {
      return {
        ...TraderJoeSwap.commonProps,
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
                // https://arbiscan.io/address/0xbeE5c10Cf6E4F68f831E11C1D9E59B43560B3642#readContract
                address: '0xbeE5c10Cf6E4F68f831E11C1D9E59B43560B3642',
                abi: traderJoeRouterV2100ABI,
                methods: V2Router_1_0_0,
              },
              factory: {
                // https://arbiscan.io/address/0xaE4EC9901c3076D0DdBe76A520F9E90a6227aCB7#readContract
                address: '0xaE4EC9901c3076D0DdBe76A520F9E90a6227aCB7',
                abi: uniswapFactoryV2ABI,
              },
              pair: {
                abi: uniswapPairV2ABI,
              },
            },
            '2-0-0': {
              feePercent: 0.003,
              router: {
                // https://arbiscan.io/address/0x7BFd7192E76D950832c77BB412aaE841049D8D9B#readContract
                address: '0x7BFd7192E76D950832c77BB412aaE841049D8D9B',
                abi: traderJoeRouterV2200ABI,
                methods: V2Router_2_0_0,
              },
              factory: {
                // https://arbiscan.io/address/0x1886D09C9Ade0c5DB822D85D21678Db67B6c2982#readContract
                address: '0x1886D09C9Ade0c5DB822D85D21678Db67B6c2982',
                abi: traderJoeFactoryV2200ABI,
                methods: V2Factory_2_0_0,
              },
              pair: {
                abi: tradeJoePairV2ABI,
                methods: V2PairMethods,
              },
            },
            '2-1-0': {
              feePercent: 0.003,
              router: {
                // https://arbiscan.io/address/0xb4315e873dBcf96Ffd0acd8EA43f689D8c20fB30#readContract
                address: '0xb4315e873dBcf96Ffd0acd8EA43f689D8c20fB30',
                abi: traderJoeRouterV2210ABI,
                methods: V2Router_2_1_0,
              },
              factory: {
                // https://arbiscan.io/address/0x8e42f2F4101563bF679975178e880FD87d3eFd4e#readContract
                address: '0x8e42f2F4101563bF679975178e880FD87d3eFd4e',
                abi: traderJoeFactoryV2210ABI,
                methods: V2Factory_2_1_0,
              },
              pair: {
                abi: tradeJoePairV2ABI,
                methods: V2PairMethods,
              },
            },
            '2-2-0': {
              feePercent: 0.003,
              router: {
                // https://arbiscan.io/address/0x18556DA13313f3532c54711497A8FedAC273220E#readContract
                address: '0x18556DA13313f3532c54711497A8FedAC273220E',
                abi: traderJoeRouterV2220ABI,
                methods: V2Router_2_2_0,
              },
              factory: {
                // https://arbiscan.io/address/0xb43120c4745967fa9b93E79C149E66B0f2D6Fe0c#readContract
                address: '0xb43120c4745967fa9b93E79C149E66B0f2D6Fe0c',
                abi: traderJoeFactoryV2220ABI,
                methods: V2Factory_2_2_0,
              },
              pair: {
                abi: tradeJoePairV2ABI,
                methods: V2PairMethods,
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
        ...TraderJoeSwap.commonProps,
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
                // https://bscscan.com/address/0x89Fa1974120d2a7F83a0cb80df3654721c6a38Cd#readContract
                address: '0x89Fa1974120d2a7F83a0cb80df3654721c6a38Cd',
                abi: traderJoeRouterV2100ABI,
                methods: V2Router_1_0_0,
              },
              factory: {
                // https://bscscan.com/address/0x4f8bdc85E3eec5b9dE67097c3f59B6Db025d9986#readContract
                address: '0x4f8bdc85E3eec5b9dE67097c3f59B6Db025d9986',
                abi: uniswapFactoryV2ABI,
              },
              pair: {
                abi: uniswapPairV2ABI,
              },
            },
            '2-0-0': {
              feePercent: 0.003,
              router: {
                // https://bscscan.com/address/0xb66A2704a0dabC1660941628BE987B4418f7a9E8#readContract
                address: '0xb66A2704a0dabC1660941628BE987B4418f7a9E8',
                abi: traderJoeRouterV2200ABI,
                methods: V2Router_2_0_0,
              },
              factory: {
                // https://bscscan.com/address/0x43646A8e839B2f2766392C1BF8f60F6e587B6960#readContract
                address: '0x43646A8e839B2f2766392C1BF8f60F6e587B6960',
                abi: traderJoeFactoryV2200ABI,
                methods: V2Factory_2_0_0,
              },
              pair: {
                abi: tradeJoePairV2ABI,
                methods: V2PairMethods,
              },
            },
            '2-1-0': {
              feePercent: 0.003,
              router: {
                // https://bscscan.com/address/0xb4315e873dBcf96Ffd0acd8EA43f689D8c20fB30#readContract
                address: '0xb4315e873dBcf96Ffd0acd8EA43f689D8c20fB30',
                abi: traderJoeRouterV2210ABI,
                methods: V2Router_2_1_0,
              },
              factory: {
                // https://bscscan.com/address/0x8e42f2F4101563bF679975178e880FD87d3eFd4e#readContract
                address: '0x8e42f2F4101563bF679975178e880FD87d3eFd4e',
                abi: traderJoeFactoryV2210ABI,
                methods: V2Factory_2_1_0,
              },
              pair: {
                abi: tradeJoePairV2ABI,
                methods: V2PairMethods,
              },
            },
          },
        },
      }
    },
    TESTNET: (): DexConfig => {
      return {
        ...TraderJoeSwap.commonProps,
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
                // https://testnet.bscscan.com/address/0x0007963AE06b1771Ee5E979835D82d63504Cf11d#readContract
                address: '0x0007963AE06b1771Ee5E979835D82d63504Cf11d',
                abi: traderJoeRouterV2100ABI,
                methods: V2Router_1_0_0,
              },
              factory: {
                // https://testnet.bscscan.com/address/0x4f953EFDbcE2B8CAe76e5b4779A682d9ab0c941c#readContract
                address: '0x4f953EFDbcE2B8CAe76e5b4779A682d9ab0c941c',
                abi: uniswapFactoryV2ABI,
              },
              pair: {
                abi: uniswapPairV2ABI,
              },
            },
            '2-0-0': {
              feePercent: 0.003,
              router: {
                // https://testnet.bscscan.com/address/0xf7C6d73336f333b63144644944176072D94128F5#readContract
                address: '0xf7C6d73336f333b63144644944176072D94128F5',
                abi: traderJoeRouterV2200ABI,
                methods: V2Router_2_0_0,
              },
              factory: {
                // https://testnet.bscscan.com/address/0xE082a032Fa1cE68b24594bee0fC57DfE819D107c#readContract
                address: '0xE082a032Fa1cE68b24594bee0fC57DfE819D107c',
                abi: traderJoeFactoryV2200ABI,
                methods: V2Factory_2_0_0,
              },
              pair: {
                abi: tradeJoePairV2ABI,
                methods: V2PairMethods,
              },
            },
            '2-1-0': {
              feePercent: 0.003,
              router: {
                // https://testnet.bscscan.com/address/0x8FABE13D95F28f7478Dc655d8D4BA99935D50e02#readContract
                address: '0x8FABE13D95F28f7478Dc655d8D4BA99935D50e02',
                abi: traderJoeRouterV2210ABI,
                methods: V2Router_2_1_0,
              },
              factory: {
                // https://testnet.bscscan.com/address/0x8e42f2F4101563bF679975178e880FD87d3eFd4e#readContract
                address: '0x8e42f2F4101563bF679975178e880FD87d3eFd4e',
                abi: traderJoeFactoryV2210ABI,
                methods: V2Factory_2_1_0,
              },
              pair: {
                abi: tradeJoePairV2ABI,
                methods: V2PairMethods,
              },
            },
          },
        },
      }
    },
  }

  public static ETHEREUM = {
    MAINNET: (): DexConfig => {
      return {
        ...TraderJoeSwap.commonProps,
        chainId: ethMainChainId,
        defaultPairs: {
          inputAddress: ETHCoin.ETH.MAINNET().contractAddress,
          outputAddress: WETHToken.ETH.MAINNET().contractAddress,
        },
        protocols: {
          protocolV2: {
            '2-1-0': {
              feePercent: 0.003,
              router: {
                // https://etherscan.io/address/0x9A93a421b74F1c5755b83dD2C211614dC419C44b#readContract
                address: '0x9A93a421b74F1c5755b83dD2C211614dC419C44b',
                abi: traderJoeRouterV2210ABI,
                methods: V2Router_2_1_0,
              },
              factory: {
                // https://etherscan.io/address/0xdc8d77b69155c7e68a95a4fb0f06a71ff90b943a#readContract
                address: '0xDC8d77b69155c7E68A95a4fb0f06a71FF90B943a',
                abi: traderJoeFactoryV2210ABI,
                methods: V2Factory_2_1_0,
              },
              pair: {
                abi: tradeJoePairV2ABI,
                methods: V2PairMethods,
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
        return TraderJoeSwap.AVALANCHE.MAINNET()
      case avaxFujiChainId:
        return TraderJoeSwap.AVALANCHE.FUJI()
      case arbitrumMainChainId:
        return TraderJoeSwap.ARBITRUM.MAINNET()
      case bscMainChainId:
        return TraderJoeSwap.BSC.MAINNET()
      case bscTestChainId:
        return TraderJoeSwap.BSC.TESTNET()
      case ethMainChainId:
        return TraderJoeSwap.ETHEREUM.MAINNET()
      default:
        return undefined
    }
  }

  public static getAllDexConfigs(): DexConfig[] {
    return [
      TraderJoeSwap.AVALANCHE.MAINNET(),
      TraderJoeSwap.AVALANCHE.FUJI(),
      TraderJoeSwap.ARBITRUM.MAINNET(),
      TraderJoeSwap.BSC.MAINNET(),
      TraderJoeSwap.BSC.TESTNET(),
      TraderJoeSwap.ETHEREUM.MAINNET(),
    ]
  }
}
