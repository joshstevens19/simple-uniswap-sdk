import { DexProvider } from '@dex-toolkit/provider'
import type {
  ChainConfig,
  DexConfigBase,
  Token,
  DexConfigsByDex,
} from '@dex-toolkit/types'
import {
  AAVEToken,
  DAIToken,
  UNIToken,
  USDTToken,
  plsTestChainId,
  getChainConfig,
  getDexConfig,
  REPToken,
  FUNToken,
  SKLToken,
  getVersionTagFromVersion,
  ethMainChainId,
  dexMainChains,
  dexTestChains,
  plsMainChainId,
  arbitrumMainChainId,
  avaxMainChainId,
  baseMainChainId,
  blastMainChainId,
  bscMainChainId,
  polygonMainChainId,
  zksyncMainChainId,
  zoraMainChainId,
  celoMainChainId,
} from '@dex-toolkit/utils'

import { TestCases } from './mock-configs'
import { filterTestCases } from './mock-configs-filter'

// ------------------------
// Main keys for testing configurations
// ------------------------

export const MockChainId = plsTestChainId
export const MockDexType = 'PULSEX'
export const MockDexVersionV2 = { major: 1, minor: 0, patch: 0 }
export const MockDexVersionTagV2 = getVersionTagFromVersion(MockDexVersionV2)
export const MockDexVersionV3 = { major: 1, minor: 0, patch: 0 }
export const MockDexVersionTagV3 = getVersionTagFromVersion(MockDexVersionV3)

// ------------------------
// Derived configurations
// ------------------------

export const MockChainConfig: ChainConfig = getChainConfig(MockChainId)!

if (!MockChainConfig) {
  throw new Error(`No chain config found`)
}

export const MockProviderUrl = MockChainConfig.nodes.public?.[0]?.url

if (!MockProviderUrl) {
  throw new Error(`No provider url found`)
}

export const MockDexProvider = new DexProvider({
  chainId: MockChainId,
  tryAggregate: true,
  enableBatching: true,
  maxCallDataSize: 100_000,
  maxCallsPerBatch: 50,
})

if (!MockDexProvider) {
  throw new Error(`No dex provider found`)
}

export const MockDexConfig: DexConfigBase = getDexConfig({
  dexType: MockDexType,
  chainId: MockChainId,
})!

if (!MockDexConfig) {
  throw new Error(`No dex config found`)
}

export const MockDexConfigsByDex = {
  [MockDexType]: MockDexConfig,
} as DexConfigsByDex

export const MockCoin = MockChainConfig.nativeCurrency
export const MockWrapped = MockChainConfig.nativeWrappedTokenInfo

// ------------------------
// Can change per dexType/chainId
// ------------------------

export const MockFunToken: Token = FUNToken.getTokenForChainId(MockChainId)!
export const MockAaveToken: Token = AAVEToken.getTokenForChainId(MockChainId)!
export const MockUniToken: Token = UNIToken.getTokenForChainId(MockChainId)!
export const MockDaiToken: Token = DAIToken.getTokenForChainId(MockChainId)!
export const MockUsdtToken: Token = USDTToken.getTokenForChainId(MockChainId)!
export const MockTokenNoAllowance: Token =
  REPToken.getTokenForChainId(MockChainId)!
export const MockToken777: Token = SKLToken.getTokenForChainId(MockChainId)!

if (
  !MockCoin ||
  !MockWrapped ||
  !MockFunToken ||
  !MockAaveToken ||
  !MockUniToken ||
  !MockTokenNoAllowance
) {
  throw new Error('Some mock tokens were not found for chainId ' + MockChainId)
}

// NOTE: This all wallets have been generated using the testingSetup.ts script and shall not be used for any other purposes other than testing.
export const MockWalletAddress = '0xAcAe34847aB1c58E61f7CAA8a5f7e755a08195b1'
export const MockPk =
  '0xd3209c389da952b83d0f0042525481d10cad1bfbb2ae9e3863b5895ba61160f4'

export const MockRecipientAddress = '0xA716c8E0C48bd97CB9e90c6BDD3b09957F88A13F'
// export const MockRecipientPk =
//   '0x157e9c20140d970f0212c8f07bfe3c7c746afd993379a65cd025a4a6c9b9cb29'

export const MockOperatorAddress = '0xCc48e5B1739A07555444CB1D5619b653F9AFcaB3'
// export const MockOperatorAddressPk =
//   '0x68877d5083cfe9baba2cd889aa3d86bb1d94a12d8d36bb1f7ef39ad508e353d0'

export const MockOperatorAddress2 = '0xeAa0C398919F5De744aC8c67f59db8B894ca112E'
// export const MockOperatorAddress2Pk =
//   '0xd97c6fc9f220968fa901ed3114c74e72515bb01a84c1255217643e88035d2174'

export const MockTradeAmount = '0.0001'
export const MockTokenId = '1'

export const MockParableTokenToToken = [
  [MockAaveToken, MockDaiToken],
  [MockUsdtToken, MockDaiToken],
]

export const MockParableCoinToToken = [
  [MockCoin, MockFunToken],
  [MockCoin, MockAaveToken],
  [MockCoin, MockDaiToken],
  [MockCoin, MockUniToken],
]

export const MockFUNToWPLSPairAddressV2 =
  '0x8a0fc7af932e43041a75971f28371c3dbdff7b53'
export const MockAaveToWPLSPairAddressV2 =
  '0x2906D377Cc622FD63fb888aDeCD39a433a89E0DA'
export const MockAaveToDAIPairAddressV2 =
  '0xBa2dEE2861ddEAecd0ff1bAC44bc1f5DfCD35C0c'
export const MockREPToWPLSPairAddressV2 =
  '0x7fc044a63476cc6fb91f58a00868a08a57a2f629'
export const MockSKLToWPLSPairAddressV2 =
  '0x6c34db461f88d1b38dc363586e71423143ab0ccd'
export const MockPLSXToHEXPairAddressV2 =
  '0xf96b8c17610f379c021ec5565e45af82aa6391b2'

// uni 0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984
export const MockUNIToWPLSPairAddressV2 =
  '0x7b813BB8df019Cb351CdD31151C208E9c02885A1'
// wpls 0x70499adEBB11Efd915E3b69E700c331778628707
export const MockDAIToWPLSPairAddressV2 =
  '0xA2D510bf42D2B9766DB186F44a902228E76ef262'
// dai 0x826e4e896CC2f5B371Cd7Bb0bd929DB3e3DB67c0
export const MockDAIToUSDTPairAddressV2 =
  '0xDfB8224F112a5500306Df87a18Eec140332ee1Dd'
// usdt 0xdac17f958d2ee523a2206206994597c13d831ec7

// "routePathAddresses": [
//                 "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
//                 "0x70499adEBB11Efd915E3b69E700c331778628707",
//                 "0xdac17f958d2ee523a2206206994597c13d831ec7"
//             ],
//             "pairAddresses": [
//                 "0x7b813BB8df019Cb351CdD31151C208E9c02885A1",
//                 "0x362289D3Cf77BdD4c2523C83d0d6DB49231b5290"
//             ],

export const MockNFT721: Token | undefined = undefined

export const MockNFT1155: Token | undefined = undefined

/**
 * Test configuration utility for filtering DEX test cases based on different criteria.
 *
 * @example
 * Creating a custom filtered configuration:
 * ```typescript
 * const customConfig = filterTestCases(TestCases, {
 *   // Filter specific DEXes
 *   enabledDexes: ['UNISWAP', 'SUSHISWAP'],
 *
 *   // Filter specific chain IDs
 *   enabledChainIds: [1], // Ethereum mainnet
 *
 *   // Filter protocol versions
 *   enabledProtocols: {
 *     v2: true,
 *     v3: true
 *   },
 *
 *   // Filter specific version tags per DEX
 *   enabledVersions: {
 *     UNISWAP: {
 *       v2: ['1-0-0'],
 *       v3: ['1-0-0']
 *     }
 *   }
 * })
 * ```
 */
const TEST_CONFIGS = {
  // All
  all: TestCases,

  // PulseX Testnet
  pulseX: filterTestCases(TestCases, {
    enabledDexes: ['PULSEX'],
    enabledChainIds: [plsTestChainId],
  }),

  // Uniswap Mainnet
  uniswap: filterTestCases(TestCases, {
    enabledDexes: ['UNISWAP'],
    enabledChainIds: [ethMainChainId],
  }),

  // Testnet
  testnet: filterTestCases(TestCases, {
    enabledChainIds: dexTestChains,
  }),

  // Mainnet
  mainnet: filterTestCases(TestCases, {
    enabledChainIds: dexMainChains,
  }),

  single: filterTestCases(TestCases, {
    enabledDexes: ['TRADERJOE'],
    enabledProtocols: {
      v2: true,
      v3: false,
    },
    enabledChainIds: [bscMainChainId], //, arbitrumMainChainId],
  }),

  selected: filterTestCases(TestCases, {
    enabledChainIds: [
      arbitrumMainChainId,
      avaxMainChainId,
      baseMainChainId,
      blastMainChainId,
      bscMainChainId,
      celoMainChainId,
      // energiMainChainId, // TODO No contract results
      ethMainChainId,
      // optimismMainChainId, // TODO No contract results
      polygonMainChainId,
      plsMainChainId,
      zksyncMainChainId,
      zoraMainChainId,

      // Testnet
      // arbitrumSepoliaChainId,
      // avaxFujiChainId,
      // baseSepoliaChainId,
      // blastSepoliaChainId,
      // bscTestChainId,
      // celoAlfajoresChainId,
      // energiTestChainId,
      // ethSepoliaChainId,
      // optimismSepoliaChainId,
      // polygonAmoyChainId,
      plsTestChainId,
      // zksyncSepoliaChainId,
      // zoraSepoliaChainId,
    ],
  }),

  // V2 protocols
  v2Only: filterTestCases(TestCases, {
    enabledDexes: ['PANGOLIN', 'PULSEX', 'YETISWAP', 'TRADERJOE'],
    enabledProtocols: {
      v2: true,
      v3: false,
    },
  }),

  // V3 protocols
  v3Only: filterTestCases(TestCases, {
    enabledProtocols: {
      v2: false,
      v3: true,
    },
  }),
} as const

// Active test cases to run.
export const activeTestCases = TEST_CONFIGS['pulseX']
// Test configurations like tokens, networks and dexes.
export const testConfigurations = true
// Stress test all nodes to find their limits.
export const testForNodeLimits = false
