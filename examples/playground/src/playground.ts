import { Erc20Contract, PairContract } from '@dex-toolkit/contracts'
import { Tokens, DexFactory, TokenContract, TokenList } from '@dex-toolkit/core'
import { DexNumber } from '@dex-toolkit/number'
import { DexProvider } from '@dex-toolkit/provider'
import type {
  DexCustomNetwork,
  DexType,
  DexChainIdAndProviderContext,
} from '@dex-toolkit/types'
import {
  tradeDirectionMap,
  plsTestChainId,
  pulseXRouterV2ABI,
  uniswapFactoryV2ABI,
  uniswapPairV2ABI,
  defaultRouterMethodMapV2,
  MAX_HEX_STRING,
  PLSCoin,
  getLatestVersionFromProtocol,
  getDexConfig,
  getVersionTagFromVersion,
  getAllTokenListSources,
  UNIToken,
  WPLSToken,
} from '@dex-toolkit/utils'
import type { EthersProviderContext } from '@multicall-toolkit/types'
import { ethers, providers, Wallet } from 'ethers'

const walletAddress = '0xAcAe34847aB1c58E61f7CAA8a5f7e755a08195b1' // From Mocks
const walletPk =
  '0xd3209c389da952b83d0f0042525481d10cad1bfbb2ae9e3863b5895ba61160f4' // From Mocks
const chainId = plsTestChainId

const uniTokenAddress = UNIToken.getTokenForChainId(chainId)!.contractAddress
const usdtTokenAddress = WPLSToken.getTokenForChainId(chainId)!.contractAddress

const fromTokenAddress = uniTokenAddress
const toTokenAddress = usdtTokenAddress
const tradeAmount = '100'

// ------------------------
// Trade Factory
// ------------------------

/**
 * Simplest trade you can do with built in configurations
 */
export async function simpleTrade() {
  try {
    const chainId = 943

    const provider = new DexProvider({
      chainId,
    })

    const dexFactory = new DexFactory({
      providerContext: provider,
      walletAddress,
      dexContext: 'PULSEX',
      // You can define what output format you'd like to use
      format: { type: 'readable' },
    })

    const trade = await dexFactory.createTrade({
      fromTokenAddress,
      toTokenAddress,
      settings: {
        disablePriceImpact: false,
      },
    })

    const quote = await trade.quote({
      direction: 'input',
      fromAmount: '100',
    })

    console.log(quote)
  } catch (error) {
    console.log(error)
  }
}

/**
 * Simple trade with multiple dexes, returning the best route quote
 */
export async function simpleMultiDexTrade() {
  const chainId = 1

  try {
    const dexFactory = new DexFactory({
      providerContext: { chainId },
      walletAddress,
      dexContext: ['UNISWAP', 'SUSHISWAP', 'PANCAKESWAP'],
    })

    const trade = await dexFactory.createTrade({
      fromTokenAddress,
      toTokenAddress,
    })
    const quote = await trade.quote('100')

    console.log(quote)
  } catch (error) {
    console.log(error)
  }
}

/**
 * How to make a trade with approve and swap
 */
export async function simpleTradeWithApproveAndSwap() {
  const chainId = 943

  const dexFactory = new DexFactory({
    providerContext: { chainId },
    walletAddress,
    dexContext: 'PULSEX',
  })

  const trade = await dexFactory.createTrade({
    fromTokenAddress,
    toTokenAddress,
    settings: {
      protocolSettings: {
        protocolV2: {
          enabled: true,
          includeVersions: [{ major: 1, minor: 0, patch: 0 }],
        },
      },
    },
  })

  const quote = await trade.quote('0.01')

  console.log(quote)

  const wallet = new Wallet(walletPk, trade.dexProvider.provider)

  if (quote.approvalTransaction) {
    try {
      const response = await wallet.sendTransaction(quote.approvalTransaction)
      const receipt = await response.wait(1)

      console.log('Approval receipt', receipt)
    } catch (error) {
      console.log(error)
    }
  }

  const response = await wallet.sendTransaction(quote.transaction)
  const receipt = await response.wait(1)

  console.log('Swap receipt', receipt)
}

/**
 * Simple trade with settings
 */
export async function simpleTradeWithSettings() {
  const chainId = 943

  const dexFactory = new DexFactory({
    providerContext: { chainId },
    walletAddress,
    dexContext: 'PULSEX',
    // Turn off price context
    multiPriceContext: undefined,
  })

  const trade = await dexFactory.createTrade({
    fromTokenAddress,
    toTokenAddress,
    // All settings are optional
    settings: {
      /**
       * The address that will receive the output tokens from the swap.
       * If not provided, the default is to send the output tokens to the address initiating the swap.
       */
      recipient: '',
      /**
       * Slippage in percentage, eg: a value 0.005 will be 0.5% or 50 bips
       */
      slippage: 0.005,
      /**
       * The number of minutes before the trade expires
       */
      deadlineMinutes: 20,
      /**
       * Disable multihops, only direct routes will be used
       */
      disableMultihops: false,
      /**
       * Prevent the built-in block listener.
       * To update the quote, you must manually call the `Trade.requote()` method
       */
      disableObserver: false,
      /**
       * Whether to disable price impact calculation
       */
      disablePriceImpact: false,
      /**
       * Filter to choose which dex versions to use.
       * If not provided, it will use all available versions.
       */
      protocolSettings: {
        protocolV2: {
          enabled: true,
          includeVersions: [{ major: 1, minor: 0, patch: 0 }],
          excludeVersions: [{ major: 2, minor: 0, patch: 0 }],
        },
        protocolV3: {
          enabled: true,
          includeVersions: [{ major: 1, minor: 0, patch: 0 }],
          excludeVersions: [{ major: 2, minor: 0, patch: 0 }],
        },
      },
      /**
       * Promise value must return gwei
       */
      gasSettings: {
        getGasPrice: async () => '90',
      },
      /**
       * Whether to enable fee on transfer, for deflationary tokens
       */
      hasFeeOnTransfer: false,
    },
  })

  const quote = await trade.quote('100')

  console.log(quote)
}

export async function simpleTradeWithPriceContext() {
  const chainId = 943

  const dexFactory = new DexFactory({
    providerContext: { chainId },
    walletAddress,
    dexContext: 'PULSEX',
    multiPriceContext: {
      priceCtxs: [
        {
          sourceType: 'coingecko',
          apiKey: 'your-api-key',
        },
        {
          sourceType: 'coinmarketcap',
          apiKey: 'your-api-key',
        },
        {
          sourceType: 'cryptocompare',
          apiKey: 'your-api-key',
        },
      ],
      /**
       * Describes the methods for calculating price from multiple sources.
       * - `min`: Select the minimum price.
       * - `max`: Select the maximum price.
       * - `median`: Select the median price.
       */
      calculationMethod: 'median',
    },
  })

  const trade = await dexFactory.createTrade({
    fromTokenAddress,
    toTokenAddress,
  })
  const quote = await trade.quote('100')

  console.log(quote)
}

/**
 * Advanced provider initialization
 */
export async function AdvancedProviderTrade() {
  // You can initialize a provider in various ways, and provide a custom network if not supported out of the box

  const rpcUrl = 'https://rpc.v4.testnet.pulsechain.com'

  // Custom Network example (Optional)
  const customNetwork: DexCustomNetwork = {
    name: 'PulseChain Testnet',
    multicallContractAddress: '0x5BA1e12693Dc8F9c48aAD8770482f4739bEeD696',
    nativeCurrency: {
      name: 'Pulse',
      symbol: 'tPLS',
    },
    nativeWrappedTokenInfo: {
      name: 'Wrapped PLS',
      symbol: 'WPLS',
      decimals: 18,
      chainId: 943,
      contractAddress: '0x70499adEBB11Efd915E3b69E700c331778628707',
      standard: 'PRC20',
    },
  }

  // By Chain Id
  const providerChainIdContext: DexChainIdAndProviderContext = {
    chainId,
    // Optional. Provide if chainId is not supported out of the box, or you want to override the default rpc url
    rpcUrl,
    // Optional. Provide if you want to use a custom network not supported out of the box, or you want to override the default network
    customNetwork,
  }

  const dexFactory = new DexFactory({
    providerContext: providerChainIdContext,
    walletAddress,
    dexContext: ['PULSEX'],
  })

  const trade1 = await dexFactory.createTrade({
    fromTokenAddress,
    toTokenAddress,
  })
  const quote1 = await trade1.quote('100')

  console.log(quote1)

  // By Ethers Provider
  const providerEthersContext: EthersProviderContext = {
    // Provider from Ethers.js
    ethersProvider: new providers.JsonRpcProvider(rpcUrl),
    // Optional. Provide if you want to use a custom network not supported out of the box, or you want to override the default network
    customNetwork,
  }

  const dexFactory2 = new DexFactory({
    providerContext: providerEthersContext,
    walletAddress,
    dexContext: ['PULSEX'],
  })

  const trade2 = await dexFactory2.createTrade({
    fromTokenAddress,
    toTokenAddress,
  })
  const quote2 = await trade2.quote('100')

  console.log(quote2)
}

/**
 * Test for using a custom dex and custom network to get the best route
 */
export async function customDexAndNetwork() {
  const chainId = 943
  const ethersProvider = new providers.JsonRpcProvider(
    'https://rpc.v4.testnet.pulsechain.com',
    chainId,
  )

  const dexFactory = new DexFactory({
    // DexProvider initialization
    // You could also use a chainId and custom rpc url instead of an ethers provider
    providerContext: {
      ethersProvider,
      customNetwork: {
        name: 'PulseChain Testnet',
        multicallContractAddress: '0x5BA1e12693Dc8F9c48aAD8770482f4739bEeD696',
        nativeCurrency: {
          name: 'Pulse',
          symbol: 'tPLS',
        },
        nativeWrappedTokenInfo: {
          name: 'Wrapped PLS',
          symbol: 'WPLS',
          decimals: 18,
          chainId,
          contractAddress: '0x70499adEBB11Efd915E3b69E700c331778628707',
          standard: 'PRC20',
        },
      },
    },
    // Trade initialization
    walletAddress,
    dexContext: [
      {
        dexType: 'CUSTOM',
        dexTag: 'CUSTOM_DEX_NAME',
        protocols: {
          protocolV2: {
            '2-0-0': {
              feePercent: 0.003,
              router: {
                address: '0xDaE9dd3d1A52CfCe9d5F2fAC7fDe164D500E50f7',
                abi: pulseXRouterV2ABI,
                methods: {
                  ...defaultRouterMethodMapV2,
                  // You can map custom method names to keep contracts compatible with other dexes
                  WETH: 'WPLS',
                },
              },
              factory: {
                address: '0xff0538782d122d3112f75dc7121f61562261c0f7',
                abi: uniswapFactoryV2ABI,
              },
              pair: {
                abi: uniswapPairV2ABI,
              },
            },
          },
        },
      },
    ],
  })

  const trade = await dexFactory.createTrade({
    fromTokenAddress,
    toTokenAddress,
  })
  const quote = await trade.quote(tradeAmount)

  console.log('customDexTest - Has generated trade', quote)
}

/**
 * Example using the built-in block listener
 */
export async function simpleTradeWithQuoteChangedSubscription() {
  const chainId = 943

  const dexFactory = new DexFactory({
    providerContext: { chainId },
    walletAddress,
    dexContext: 'PULSEX',
    format: { type: 'dexnumber' },
  })

  const trade = await dexFactory.createTrade({
    fromTokenAddress,
    toTokenAddress,
    settings: {
      observerBlockSkip: 3,
    },
  })

  const quote = await trade.quote('50')
  const targetAmount = '2000'

  // Listen for changes in our quote
  const subscription = quote.observer$.subscribe(
    async ({ blockNumber, latestQuote }) => {
      console.log('New quote generated for block number', blockNumber)

      const hitTargetAmount = latestQuote.expectedConvertQuote.gte(
        DexNumber.fromUnshifted(
          targetAmount,
          latestQuote.toTokenInfo.token.decimals,
        ),
      )

      if (hitTargetAmount) {
        subscription.unsubscribe()
        // Or call unsubscribe from the quote
        // quote.unsubscribe()
        // Or call destroy to clean up all trade quotes and subscriptions
        // trade.destroy()

        const wallet = new Wallet(walletPk, trade.dexProvider.provider)

        if (latestQuote.approvalTransaction) {
          try {
            const response = await wallet.sendTransaction(
              latestQuote.approvalTransaction,
            )
            const receipt = await response.wait(1)

            console.log('Approval receipt', receipt)
          } catch (error) {
            console.log(error)
          }
        }

        const response = await wallet.sendTransaction(latestQuote.transaction)
        const receipt = await response.wait(1)

        console.log(receipt)
      }
    },
  )
}

/**
 * Test for using an external observer (eg: block listener)
 */
export async function simpleTradeWithManualRequote() {
  const chainId = 943

  const dexFactory = new DexFactory({
    providerContext: { chainId },
    walletAddress,
    dexContext: 'PULSEX',
  })

  const trade = await dexFactory.createTrade({
    fromTokenAddress,
    toTokenAddress,
  })

  const quote = await trade.quote('100')

  let numberOfChanges = 0

  // Listen for changes in our quote
  const subscription = quote.observer$.subscribe(
    ({ blockNumber, latestQuote }) => {
      console.log('New quote generated for block number', blockNumber)

      numberOfChanges++

      console.log(
        `Quote changed: ${latestQuote.expectedConvertQuote} ${latestQuote.toTokenInfo.token.symbol}`,
      )

      if (numberOfChanges === 3) {
        subscription.unsubscribe()
        // Or call unsubscribe from the quote
        // quote.unsubscribe()
        // Or call destroy to clean up all trade quotes and subscriptions
        // trade.destroy()
      }
    },
  )

  // Manually requote for the newest prices
  trade.dexProvider.provider.on('block', async () => {
    console.log('Requoting...')
    await trade.requote(quote.id)
  })
}

export async function approvingMaxRouterAllowanceDirectly() {
  const dexFactory = new DexFactory({
    providerContext: { chainId },
    walletAddress,
    dexContext: ['PULSEX'],
  })

  const trade = await dexFactory.createTrade({
    fromTokenAddress,
    toTokenAddress,
  })

  const dexConfig = getDexConfig({ dexType: 'PULSEX', chainId: 943 })
  const protocolV2 = dexConfig?.protocols?.protocolV2

  if (!protocolV2) {
    throw new Error('Protocol V2 not found for PULSEX on chain 943')
  }

  const version = getLatestVersionFromProtocol(protocolV2)

  if (!version) {
    throw new Error('No version found')
  }

  const transaction = await trade.generateApproveRouterAllowanceTransaction({
    dexTag: 'PULSEX',
    protocol: 'protocolV2',
    version,
  })

  console.log(transaction)

  const wallet = new Wallet('0xPrivateKey', trade.dexProvider.provider)

  const response = await wallet.sendTransaction(transaction)
  const receipt = await response.wait(1)

  console.log('Approval receipt', receipt)
}

// ------------------------
// Router Factory
// ------------------------

export async function getVersionedRoutePathsByDex() {
  const chainId = 943

  const dexFactory = new DexFactory({
    providerContext: { chainId },
    walletAddress,
    dexContext: ['PULSEX'],
  })

  const trade = await dexFactory.createTrade({
    fromTokenAddress,
    toTokenAddress,
  })

  const versionedRoutePathsByDex = await trade.getVersionedRoutePathsByDex()

  console.log(versionedRoutePathsByDex)
}

export async function getRouteQuotes() {
  const chainId = 943
  const dexType: DexType = 'PULSEX'

  const dexFactory = new DexFactory({
    providerContext: { chainId },
    walletAddress,
    dexContext: dexType,
  })

  const trade = await dexFactory.createTrade({
    fromTokenAddress,
    toTokenAddress,
  })

  const routeQuotes = await trade.getRouteQuotes({
    amountToTrade: '100',
    tradeDirection: tradeDirectionMap.input,
  })

  console.log(routeQuotes)
}

export async function getPoolReserves() {
  const chainId = 943
  const dexType: DexType = 'PULSEX'

  const dexFactory = new DexFactory({
    providerContext: { chainId },
    walletAddress,
    dexContext: dexType,
  })

  const trade = await dexFactory.createTrade({
    fromTokenAddress,
    toTokenAddress,
  })

  const version = getLatestVersionFromProtocol(
    getDexConfig({ dexType, chainId })?.protocols.protocolV2 ?? {},
  )

  if (!version) {
    throw new Error('No version found')
  }

  // Getting reserves for a single pair
  const reserves = await trade.getPoolReserves({
    pairAddresses: ['0x7b813BB8df019Cb351CdD31151C208E9c02885A1'],
    dexTag: dexType,
    protocol: 'protocolV2',
    version,
  })

  console.log(reserves)
}

// ------------------------
// Token Factory
// ------------------------

/**
 * Getting the token
 */
export async function getToken() {
  const contract = new TokenContract({
    dexProviderContext: {
      chainId,
    },
    dexContext: 'PULSEX',
    tokenContractAddress: '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b', // UNIToken
  })

  const token = await contract.getToken()

  console.log(token)
}

/**
 * Getting the token using a custom token list
 */
export async function getTokenWithCustomTokenList() {
  const customTokenList = new TokenList({
    chainId,
    tokenListSources: [
      {
        name: 'Uniswap Labs Default',
        url: 'https://tokens.uniswap.org/',
        chainIds: [], // Filter by chainId, or leave empty to include all chains
      },
      // You could also extend the defaults by spreading the `getAllTokenListSources` from the utils package
      ...getAllTokenListSources(),
    ],
  })

  const contract = new TokenContract({
    dexProviderContext: {
      chainId,
    },
    dexContext: 'PULSEX',
    tokenContractAddress: '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b', // UNIToken
    tokenList: customTokenList,
  })

  const token = await contract.getToken()

  console.log(token)
}

/**
 * Getting the balance of a coin
 */
export async function getBalanceOfCoin() {
  const contract = new TokenContract({
    dexProviderContext: {
      chainId,
    },
    dexContext: 'PULSEX',
    tokenContractAddress: PLSCoin.getTokenForChainId(chainId)!.contractAddress,
  })

  const balance = await contract.balanceOf({
    walletAddress,
    format: { type: 'readable' },
  })

  console.log(balance)
}

/**
 * Getting the balance of a token
 */
export async function getBalanceOfToken() {
  const contract = new TokenContract({
    dexProviderContext: {
      chainId,
    },
    dexContext: 'PULSEX',
    tokenContractAddress: '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b', // UNIToken
  })

  const balance = await contract.balanceOf({
    walletAddress,
    format: { type: 'readable' },
  })

  console.log(balance)
}

/**
 * Test for approving max allowance through the tokens factory
 */
export async function encodeApproveAllowanceTxData() {
  const contract = new TokenContract({
    dexProviderContext: {
      chainId,
    },
    dexContext: 'PULSEX',
    tokenContractAddress: '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b', // UNIToken
  })

  // You can approve any spender, we are just using the router address for this example
  const { PULSEX } = contract.dexConfigsByDex ?? {}
  const { protocolV2 } = PULSEX?.protocols ?? {}

  if (!protocolV2) {
    throw new Error('No contract details found')
  }

  const versionTag = getVersionTagFromVersion(
    getLatestVersionFromProtocol(protocolV2),
  )

  if (!versionTag) {
    throw new Error('No version tag found')
  }

  const routerAddress = protocolV2?.[versionTag]?.router?.address

  if (!routerAddress) {
    throw new Error('No router address found')
  }

  // The amount you wish to allow them to move, this example just uses the max
  // hex. If not each time they do a operation which needs to move tokens then
  // it will cost them 2 transactions, 1 to approve the allowance then 1 to
  // actually do the contract call to move the tokens.
  const amount = MAX_HEX_STRING

  const data = contract.encodeApproveAllowanceData({
    spender: routerAddress,
    amount: DexNumber.fromShifted(amount, 18),
  })

  console.log(data)
}

/**
 * How to interact with the underlying token contract
 */
export async function interactingWithTokenContract() {
  const contract = new TokenContract({
    dexProviderContext: {
      chainId,
    },
    dexContext: 'PULSEX',
    tokenContractAddress: '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b', // UNIToken
  })

  const totalSupply = await contract.tokenContract.totalSupply()

  console.log(totalSupply)
}

/**
 * How to interact with the underlying token contract
 */
export async function interactingWithTokenContractMulticall() {
  const { tokenContract } = new TokenContract({
    dexProviderContext: {
      chainId,
    },
    dexContext: 'PULSEX',
    tokenContractAddress: '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b', // UNIToken
  })

  const { blockNumber, results } = await tokenContract.call({
    name: tokenContract.nameCallContext(),
    decimals: tokenContract.decimalsCallContext(),
    symbol: tokenContract.symbolCallContext(),
    totalSupply: tokenContract.totalSupplyCallContext(),
    balanceOf: tokenContract.balanceOfCallContext(walletAddress),
  })

  const balance = results.balanceOf.value
  const name = results.name.value
  const symbol = results.symbol.value
  const totalSupply = results.totalSupply.value

  console.log({
    blockNumber,
    balance,
    name,
    symbol,
    totalSupply,
  })
}

// ------------------------
// Tokens Factory
// ------------------------

/**
 * Getting the tokens in one call
 * If found in the networks tokens, or token list, it will return the cached token.
 * If not found, it will add the call to the multicall.
 */
export async function getTokens() {
  const tokensFactory = new Tokens({
    dexProviderContext: {
      chainId,
    },
    dexContext: 'PULSEX',
  })

  const tokens = await tokensFactory.getTokens([
    '0x8a810ea8B121d08342E9e7696f4a9915cBE494B7', // PLSX
    '0x2b591e99afE9f32eAA6214f7B7629768c40Eeb39', // HEX
    '0x1da01e84f3d4e6716f274c987ae4bee5dc3c8288', // BID
    '0xdac17f958d2ee523a2206206994597c13d831ec7', // USDTToken
    '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b', // UNIToken
  ])

  console.log(tokens)
}

/**
 * Getting the tokens in one call
 */
export async function getTokensWithCustomTokenList() {
  const customTokenList = new TokenList({
    chainId,
    tokenListSources: [
      {
        name: 'Uniswap Labs Default',
        url: 'https://tokens.uniswap.org/',
        chainIds: [], // Filter by chainId, or leave empty to include all chains
      },
      // You could also extend the defaults by spreading the `getAllTokenListSources` from the utils package
      // ...getAllTokenListSources()
    ],
  })

  const tokensFactory = new Tokens({
    dexProviderContext: {
      chainId,
    },
    dexContext: 'PULSEX',
    tokenList: customTokenList,
  })

  const tokens = await tokensFactory.getTokens([
    '0x8a810ea8B121d08342E9e7696f4a9915cBE494B7', // PLSXToken
    '0x2b591e99afE9f32eAA6214f7B7629768c40Eeb39', // HEXToken
    '0x1da01e84f3d4e6716f274c987ae4bee5dc3c8288', // BIDToken
    '0xdac17f958d2ee523a2206206994597c13d831ec7', // USDTToken
    '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b', // UNIToken
  ])

  console.log(tokens)
}

/**
 * Get the allowance and balances of multiple tokens in one call
 */
export async function getAllowancesAndBalanceOfForMultipleTokens() {
  const tokensFactory = new Tokens({
    dexProviderContext: {
      chainId,
    },
    dexContext: 'PULSEX',
  })

  const multiTokenAllowanceAndBalance =
    await tokensFactory.getAllowancesAndBalanceOf({
      walletAddress,
      tokenContractAddresses: [
        '0x8a810ea8B121d08342E9e7696f4a9915cBE494B7', // PLSXToken
        '0x2b591e99afE9f32eAA6214f7B7629768c40Eeb39', // HEXToken
        '0x1da01e84f3d4e6716f274c987ae4bee5dc3c8288', // BIDToken
        '0xdac17f958d2ee523a2206206994597c13d831ec7', // USDTToken
        '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b', // UNIToken
      ],
      format: { type: 'readable' },
    })

  console.log(
    multiTokenAllowanceAndBalance['0x8a810ea8B121d08342E9e7696f4a9915cBE494B7']
      ?.balanceInfo.balance,
  )
}

/**
 * Getting all tokens from the token list
 */
export async function getTokenListAllTokensWithBalance() {
  const tokensFactory = new Tokens({
    dexProviderContext: {
      chainId,
    },
    dexContext: 'PULSEX',
  })

  const tokenListWithAllowancesAndBalance =
    await tokensFactory.getTokenListWithAllowancesAndBalance({
      walletAddress,
      includeAllowance: true,
      format: { type: 'readable' },
    })

  console.log(tokenListWithAllowancesAndBalance)
}

// ------------------------
// Token List Factory
// ------------------------

/**
 * Getting all tokens from the token list
 */
export async function getTokenListAllTokens() {
  const tokenList = new TokenList({
    chainId: 943,
  })

  const tokens = await tokenList.getTokens()

  console.log(tokens)
}

/**
 * Get a single token from the token list
 */
export async function getTokenListToken() {
  const tokenList = new TokenList({
    chainId: 943,
  })

  const token = tokenList.getPredefinedToken({
    contractAddress: '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b', // UNIToken
  })

  console.log(token)
}

/**
 * Getting the token list factory with custom token list
 */
export async function getTokenListWithCustomTokenList() {
  const tokenList = new TokenList({
    chainId: plsTestChainId,
    tokenListSources: [
      {
        name: 'Uniswap Labs Default',
        url: 'https://tokens.uniswap.org/',
        chainIds: [], // Filter by chainId, or leave empty to include all chains
      },
      // You could also extend the defaults by spreading the `getAllTokenListSources` from the utils package
      // ...getAllTokenListSources()
    ],
  })

  const tokens = await tokenList.getTokens()

  console.log(tokens)
}

// ------------------------
// Contract Factory
// ------------------------

/**
 * How to interact with the underlying token contract
 */
export async function interactingWithErc20Contract() {
  const tokenContract = new Erc20Contract(
    {
      chainId,
    },
    {
      address: '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b', // UNIToken
    },
  )

  const totalSupply = await tokenContract.totalSupply()

  console.log(totalSupply)
}

/**
 * How to interact with the underlying token contract
 */
export async function interactingWithErc20ContractMulticall() {
  const tokenContract = new Erc20Contract(
    {
      chainId,
    },
    {
      address: '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b', // UNIToken
    },
  )

  const { blockNumber, results, originContext } = await tokenContract.call({
    balanceOf: {
      methodName: 'balanceOf',
      methodParameters: [walletAddress],
    },
    balanceOfFriend: tokenContract.balanceOfCallContext('0x5678...'),
    name: tokenContract.nameCallContext(),
    symbol: tokenContract.symbolCallContext(),
    totalSupply: tokenContract.totalSupplyCallContext(),
  })

  const balanceOf = results.balanceOf.value
  const balanceOfFriend = results.balanceOfFriend.value
  const name = results.name.value
  const symbol = results.symbol.value
  const totalSupply = results.totalSupply.value

  console.log({
    originContext,
    blockNumber,
    balanceOf,
    balanceOfFriend,
    name,
    symbol,
    totalSupply,
  })
}

/**
 * How to use multiple contracts in a single multicall
 */
export async function prepareContractContextsWithDexMulticall() {
  const dexProvider = new DexProvider({
    ethersProvider: undefined,
    chainId,
    rpcUrl: 'https://rpc.example.com',
    customNetwork: {
      multicallContractAddress: '0x1234...',
      name: 'Name of network',
    },
    tryAggregate: true,
    enableBatching: true,
    maxCallDataSize: 100_000,
    maxCallsPerBatch: 100,
  })

  const tokenContract = new Erc20Contract(dexProvider, {
    address: '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b', // UNIToken
  })

  const tokenContractCallContext = tokenContract.prepareContractContext({
    balanceOf: tokenContract.balanceOfCallContext(walletAddress),
    name: tokenContract.nameCallContext(),
    symbol: tokenContract.symbolCallContext(),
    totalSupply: tokenContract.totalSupplyCallContext(),
  })

  const pairContract = new PairContract(dexProvider, {
    address: '0xBa2dEE2861ddEAecd0ff1bAC44bc1f5DfCD35C0c', // AAVE/DAI pair
    abi: uniswapPairV2ABI,
  })

  const pairContractCallContext = pairContract.prepareContractContext({
    token0: pairContract.token0CallContext(),
    token1: pairContract.token1CallContext(),
    getReserves: pairContract.getReservesCallContext(),
  })

  const { blockNumber, contracts } = await dexProvider.call({
    tokenContract: tokenContractCallContext,
    pairContract: pairContractCallContext,
  })

  const { results: tokenResults, originContext } = contracts.tokenContract
  const { results: pairContractResults } = contracts.pairContract

  const balanceOf = tokenResults.balanceOf.value
  const name = tokenResults.name.value
  const symbol = tokenResults.symbol.value
  const totalSupply = tokenResults.totalSupply.value

  const token0 = pairContractResults.token0.value
  const token1 = pairContractResults.token1.value
  const reserves = pairContractResults.getReserves.value
  const { _reserve0, _reserve1, _blockTimestampLast } = reserves

  console.log({
    // Multicall
    originContext,
    blockNumber,
    // Token
    balanceOf,
    name,
    symbol,
    totalSupply,
    // Pair
    token0,
    token1,
    _reserve0,
    _reserve1,
    _blockTimestampLast,
  })
}

// ------------------------
// Liquidity
// ------------------------

/**
 * Simplest add liquidity you can do with built in configurations
 */
export async function addLiquidity() {
  const dexFactory = new DexFactory({
    providerContext: { chainId: 943 },
    walletAddress: '0xAcAe34847aB1c58E61f7CAA8a5f7e755a08195b1',
    dexContext: ['PULSEX'],
  })

  const liquidity = await dexFactory.createLiquidity({
    tokenAAddress: '0x8a810ea8B121d08342E9e7696f4a9915cBE494B7', // PLSX
    tokenBAddress: '0x2b591e99afE9f32eAA6214f7B7629768c40Eeb39', // HEX
  })

  const quote = await liquidity.addLiquidity({
    dexTag: 'PULSEX',
    protocol: 'protocolV2',
    version: { major: 1, minor: 0, patch: 0 },
    tokenAAmount: '100',
  })

  console.log(quote)
}

/**
 * Simplest remove liquidity you can do with built in configurations
 */
export async function removeLiquidity() {
  const dexFactory = new DexFactory({
    providerContext: { chainId: 943 },
    walletAddress: '0xAcAe34847aB1c58E61f7CAA8a5f7e755a08195b1', // From Mocks
    dexContext: ['PULSEX'],
  })

  const liquidity = await dexFactory.createLiquidity({
    tokenAAddress: '0x8a810ea8B121d08342E9e7696f4a9915cBE494B7', // PLSX
    tokenBAddress: '0x2b591e99afE9f32eAA6214f7B7629768c40Eeb39', // HEX
  })

  const quote = await liquidity.removeLiquidity({
    dexTag: 'PULSEX',
    protocol: 'protocolV2',
    version: { major: 1, minor: 0, patch: 0 },
    lpTokenAmount: '0.1',
    minTokenAAmount: '1',
    minTokenBAmount: '5',
    permit: false,
    supportFeeOnTransferTokens: false, // Deflationary tokens
  })

  console.log(quote)
}

/**
 * Simplest remove liquidity with permit you can do with built-in configurations
 */
export async function removeLiquidityWithPermit() {
  const provider = new ethers.providers.JsonRpcProvider(
    'https://rpc.v4.testnet.pulsechain.com',
    943,
  )
  const signer = new ethers.Wallet(walletPk, provider)

  const walletAddress = await signer.getAddress()

  const dexFactory = new DexFactory({
    // Must provide a signer for permit generation
    providerContext: { ethersSigner: signer },
    walletAddress,
    dexContext: 'PULSEX',
  })

  const liquidity = await dexFactory.createLiquidity({
    tokenAAddress: '0x8a810ea8B121d08342E9e7696f4a9915cBE494B7', // PLSX
    tokenBAddress: '0x2b591e99afE9f32eAA6214f7B7629768c40Eeb39', // HEX
    settings: {
      // Set this to true if you want the permit to approve the max amount
      approveMax: true,
    },
  })

  const quote = await liquidity.removeLiquidity({
    protocol: 'protocolV2',
    dexTag: 'PULSEX',
    version: { major: 1, minor: 0, patch: 0 },
    lpTokenAmount: '0.1',
    minTokenAAmount: '1',
    minTokenBAmount: '5',
    // Set this to true if you want to auto generate the permit signature
    // Or set to false or omit if you don't want to use permit
    permit: true,
    // If you want to manually provide the permit signature
    // permit: {
    //   approveMax: false,
    //   permitData: {
    //     v: 2,
    //     r: '0xYourPermitSignature',
    //     s: '0xYourPermitSignature',
    //   },
    // },
    supportFeeOnTransferTokens: false, // Deflationary tokens
  })

  console.log(quote)

  const { approvalReceipts, transactionReceipt } =
    (await quote.execute?.({
      approvalConfirmations: 1,
      transactionConfirmations: 1,
    })) ?? {}

  console.log('Approval receipts', approvalReceipts)
  console.log('Remove liquidity receipt', transactionReceipt)
}

/**
 * Simplest liquidity you can do with built in configurations
 */
export async function liquidityWithApproveAndAdd() {
  const dexFactory = new DexFactory({
    providerContext: { chainId: 943 },
    walletAddress: '0xAcAe34847aB1c58E61f7CAA8a5f7e755a08195b1', // From Mocks
    dexContext: 'PULSEX',
  })

  const liquidity = await dexFactory.createLiquidity({
    tokenAAddress: '0x8a810ea8B121d08342E9e7696f4a9915cBE494B7', // PLSX
    tokenBAddress: '0x2b591e99afE9f32eAA6214f7B7629768c40Eeb39', // HEX
  })
  const quote = await liquidity.addLiquidity({
    dexTag: 'PULSEX',
    protocol: 'protocolV2',
    version: { major: 1, minor: 0, patch: 0 },
    tokenAAmount: '100',
    tokenBAmount: '100',
  })

  const wallet = new Wallet(
    '0xYourWalletPrivateKey',
    liquidity.dexProvider.provider,
  )

  if (quote.enableTransactions) {
    const approvalResults = await Promise.all(
      Object.values(quote.enableTransactions).map((tx) =>
        wallet.sendTransaction(tx).then((res) => res.wait(1)),
      ),
    )

    console.log('Approval receipts:', approvalResults)
  }

  if (quote.transaction) {
    const response = await wallet.sendTransaction(quote.transaction)
    const receipt = await response.wait(1)

    console.log('Add liquidity receipt', receipt)
  }
}

/**
 * Simplest liquidity you can do with built in configurations
 */
export async function liquidityWithApproveAndRemove() {
  const dexFactory = new DexFactory({
    providerContext: { chainId: 943 },
    walletAddress: '0xAcAe34847aB1c58E61f7CAA8a5f7e755a08195b1', // From Mocks
    dexContext: 'PULSEX',
  })

  const liquidity = await dexFactory.createLiquidity({
    tokenAAddress: '0x8a810ea8B121d08342E9e7696f4a9915cBE494B7', // PLSX
    tokenBAddress: '0x2b591e99afE9f32eAA6214f7B7629768c40Eeb39', // HEX
  })
  const quote = await liquidity.removeLiquidity({
    lpTokenAmount: '0.1',
    minTokenAAmount: '1',
    minTokenBAmount: '5',
    protocol: 'protocolV2',
    dexTag: 'PULSEX',
    version: { major: 1, minor: 0, patch: 0 },
    permit: false,
    supportFeeOnTransferTokens: false, // Deflationary tokens
  })

  const wallet = new Wallet(
    '0xYourWalletPrivateKey',
    liquidity.dexProvider.provider,
  )

  if (quote.enableTransactions?.lpToken) {
    const approvalResponse = await wallet.sendTransaction(
      quote.enableTransactions.lpToken,
    )
    const approvalReceipt = await approvalResponse.wait(1)

    console.log('Approval receipt:', approvalReceipt)
  }

  if (quote.transaction) {
    try {
      const response = await wallet.sendTransaction(quote.transaction)
      const receipt = await response.wait(1)

      console.log('Remove liquidity receipt', receipt)
    } catch (error) {
      console.log(error)
    }
  }
}

/**
 * Example using the built-in block listener
 */
export async function liquidityAddWithSubscription() {
  console.log('simpleLiquidityWithQuoteChangedSubscription')
  const chainId = 1

  const dexFactory = new DexFactory({
    providerContext: { chainId, rpcUrl: 'https://rpc.payload.de' },
    walletAddress,
    dexContext: 'UNISWAP',
    format: { type: 'readable' },
  })

  const liquidity = await dexFactory.createLiquidity({
    tokenAAddress: '0x1dA01e84F3d4e6716F274c987Ae4bEE5DC3C8288', // BID
    tokenBAddress: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', // WETH

    // tokenAAddress: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599', // WBTC
    // tokenBAddress: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984', // UNI

    // tokenAAddress: '0x70499adEBB11Efd915E3b69E700c331778628707', // WPLS
    // tokenBAddress: '0x8a810ea8B121d08342E9e7696f4a9915cBE494B7', // PLSX
    // tokenBAddress: '0x2b591e99afE9f32eAA6214f7B7629768c40Eeb39', // HEX
    // settings: {
    //   observerBlockSkip: 3,
    // },
  })

  const quote = await liquidity.addLiquidity({
    tokenAAmount: '4000',
    protocol: 'protocolV2',
    dexTag: 'UNISWAP',
    version: { major: 1, minor: 0, patch: 0 },
  })

  const targetExpectedShareOfPool = '0.1'

  console.log(quote)

  // Listen for changes in our quote
  const subscription = quote.observer$.subscribe(
    async ({ blockNumber, latestQuote }) => {
      console.log(
        'New quote generated for block number',
        blockNumber,
        latestQuote,
      )

      const hitTargetExpectedShareOfPool = DexNumber.fromUnshifted(
        latestQuote.expectedShareOfPool,
      ).gte(DexNumber.fromUnshifted(targetExpectedShareOfPool))

      if (hitTargetExpectedShareOfPool) {
        subscription.unsubscribe()
        // Or call unsubscribe from the quote
        // quote.unsubscribe()
        // Or call destroy to clean up all liquidity quotes and subscriptions
        // liquidity.destroy()

        const wallet = new Wallet(walletPk, liquidity.dexProvider.provider)

        // If there are any approval transactions, process them first
        try {
          if (latestQuote.enableTransactions) {
            const approvalTransactions = []

            if (latestQuote.enableTransactions.tokenA) {
              approvalTransactions.push(
                wallet
                  .sendTransaction(latestQuote.enableTransactions.tokenA)
                  .then((response) => response.wait(1))
                  .then((receipt) => {
                    console.log('Token A approval receipt', receipt)
                  })
                  .catch((error) => {
                    console.log('Token A approval error:', error)
                  }),
              )
            }

            if (latestQuote.enableTransactions.tokenB) {
              approvalTransactions.push(
                wallet
                  .sendTransaction(latestQuote.enableTransactions.tokenB)
                  .then((response) => response.wait(1))
                  .then((receipt) => {
                    console.log('Token B approval receipt', receipt)
                  })
                  .catch((error) => {
                    console.log('Token B approval error:', error)
                  }),
              )
            }

            // Run all approval transactions concurrently
            // await Promise.all(approvalTransactions)
          }
        } catch (error) {
          console.log('Error processing approval transactions:', error)
        }

        // Send the main liquidity transaction
        try {
          // const response = await wallet.sendTransaction(
          //   latestQuote.transaction,
          // )
          // const receipt = await response.wait(1)
          // console.log('Add liquidity receipt:', receipt)
        } catch (error) {
          console.log('Error processing liquidity transaction:', error)
        }
      }
    },
  )
}

/**
 * Example using the built-in block listener and the execute function
 */
export async function liquidityAddWithSubscriptionAndExecute() {
  const provider = new ethers.providers.JsonRpcProvider(
    'https://rpc.v4.testnet.pulsechain.com',
    943,
  )
  const signer = new ethers.Wallet(walletPk, provider)

  const walletAddress = await signer.getAddress()

  const dexFactory = new DexFactory({
    // Must provide a signer to use the execute function
    providerContext: { ethersSigner: signer },
    walletAddress,
    dexContext: 'UNISWAP',
    format: { type: 'readable' },
  })

  const liquidity = await dexFactory.createLiquidity({
    tokenAAddress: '0x8a810ea8B121d08342E9e7696f4a9915cBE494B7', // PLSX
    tokenBAddress: '0x2b591e99afE9f32eAA6214f7B7629768c40Eeb39', // HEX
  })

  const quote = await liquidity.addLiquidity({
    dexTag: 'UNISWAP',
    protocol: 'protocolV2',
    version: { major: 1, minor: 0, patch: 0 },
    tokenAAmount: '4000',
  })

  console.log(quote)

  // Listen for changes in our quote
  const subscription = quote.observer$.subscribe(
    async ({ blockNumber, latestQuote }) => {
      console.log(
        'New quote generated for block number',
        blockNumber,
        latestQuote,
      )

      if (blockNumber && blockNumber > 9876543210) {
        subscription.unsubscribe()
        // Or call unsubscribe from the quote
        // quote.unsubscribe()
        // Or call destroy to clean up all trade quotes and subscriptions
        // trade.destroy()

        // Execute will use the latest quote data
        const { approvalReceipts, transactionReceipt } =
          (await quote.execute?.({
            approvalConfirmations: 1,
            transactionConfirmations: 1,
          })) ?? {}

        console.log('Approval receipts', approvalReceipts)
        console.log('Add liquidity receipt', transactionReceipt)
      }
    },
  )
}

/**
 * Example using the built-in block listener
 */
export async function liquidityRemoveWithSubscription() {
  console.log('simpleLiquidityWithQuoteChangedSubscription')
  const chainId = 1

  const dexFactory = new DexFactory({
    providerContext: { chainId, rpcUrl: 'https://rpc.payload.de' },
    walletAddress,
    dexContext: 'UNISWAP',
    format: { type: 'readable' },
  })

  const liquidity = await dexFactory.createLiquidity({
    tokenAAddress: '0x1dA01e84F3d4e6716F274c987Ae4bEE5DC3C8288', // BID
    tokenBAddress: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', // WETH

    // tokenAAddress: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599', // WBTC
    // tokenBAddress: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984', // UNI

    // tokenAAddress: '0x70499adEBB11Efd915E3b69E700c331778628707', // WPLS
    // tokenBAddress: '0x8a810ea8B121d08342E9e7696f4a9915cBE494B7', // PLSX
    // tokenBAddress: '0x2b591e99afE9f32eAA6214f7B7629768c40Eeb39', // HEX
    // settings: {
    //   observerBlockSkip: 3,
    // },
  })

  const quote = await liquidity.removeLiquidity({
    lpTokenAmount: '0.1',
    minTokenAAmount: '1',
    minTokenBAmount: '5',
    // permit: {
    //   approveMax: false,
    //   permitData: {
    //     v: 2,
    //     r: '0xYourPermitSignature',
    //     s: '0xYourPermitSignature',
    //   },
    // },
    supportFeeOnTransferTokens: false, // Deflationary tokens
    protocol: 'protocolV2',
    dexTag: 'UNISWAP',
    version: { major: 1, minor: 0, patch: 0 },
  })

  // const targetExpectedShareOfPool = '0.1'

  console.log(quote)

  // Listen for changes in our quote
  const subscription = quote.observer$.subscribe(
    async ({ blockNumber, latestQuote }) => {
      subscription.unsubscribe()
      // Or call unsubscribe from the quote
      // quote.unsubscribe()
      // Or call destroy to clean up all trade quotes and subscriptions
      // trade.destroy()

      console.log(
        'New quote generated for block number',
        blockNumber,
        latestQuote,
      )

      // const hitTargetExpectedShareOfPool = DexNumber.fromUnshifted(
      //   latestQuote.expectedShareOfPool,
      // ).gte(DexNumber.fromUnshifted(targetExpectedShareOfPool))

      // if (hitTargetExpectedShareOfPool) {
      //   subscription.unsubscribe()
      //   // Or call unsubscribe from the quote
      //   // quote.unsubscribe()
      //   // Or call destroy to clean up all liquidity quotes and subscriptions
      //   // liquidity.destroy()

      //   const wallet = new Wallet(walletPk, liquidity.dexProvider.provider)

      //   // If there are any approval transactions, process them first
      //   try {
      //     if (latestQuote.enableTransactions) {
      //       const approvalTransactions = []

      //       if (latestQuote.enableTransactions.tokenA) {
      //         approvalTransactions.push(
      //           wallet
      //             .sendTransaction(latestQuote.enableTransactions.tokenA)
      //             .then((response) => response.wait(1))
      //             .then((receipt) => {
      //               console.log('Token A approval receipt', receipt)
      //             })
      //             .catch((error) => {
      //               console.log('Token A approval error:', error)
      //             }),
      //         )
      //       }

      //       if (latestQuote.enableTransactions.tokenB) {
      //         approvalTransactions.push(
      //           wallet
      //             .sendTransaction(latestQuote.enableTransactions.tokenB)
      //             .then((response) => response.wait(1))
      //             .then((receipt) => {
      //               console.log('Token B approval receipt', receipt)
      //             })
      //             .catch((error) => {
      //               console.log('Token B approval error:', error)
      //             }),
      //         )
      //       }

      //       // Run all approval transactions concurrently
      //       // await Promise.all(approvalTransactions)
      //     }
      //   } catch (error) {
      //     console.log('Error processing approval transactions:', error)
      //   }

      //   // Send the main liquidity transaction
      //   try {
      //     // const response = await wallet.sendTransaction(
      //     //   latestQuote.transaction,
      //     // )
      //     // const receipt = await response.wait(1)
      //     // console.log('Add liquidity receipt:', receipt)
      //   } catch (error) {
      //     console.log('Error processing liquidity transaction:', error)
      //   }
      // }
    },
  )
}
