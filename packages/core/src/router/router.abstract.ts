import { WrappedContract } from '@dex-toolkit/contracts'
import { DexNumber } from '@dex-toolkit/number'
import { DexProvider } from '@dex-toolkit/provider'
import type {
  DexTransaction,
  TradeDirection,
  BestRouteQuoteContext,
  RouteQuote,
  RoutePath,
  Token,
  TokenAllowanceInfo,
  TokenBalanceInfo,
  RouterInternalArgs,
  TradeSettings,
  MultiPriceContext,
  NativeCurrencyInfo,
  TradePath,
  MultiTokenAllowancesAndBalance,
  DexConfigsByDex,
  NativeWrappedTokenInfo,
  DexTag,
  PoolReserve,
  TradeFormat,
  TradeFormatValue,
  AllowanceAndBalanceOf,
  AllowancesByDex,
  VersionTag,
  TradeFormatOptions,
  PriceImpactInfo,
} from '@dex-toolkit/types'
import {
  DexError,
  ErrorCodes,
  MIN_HEX_STRING,
  getChainConfig,
  isAddress,
  populateTradeSettings,
  defaultMultiPriceContext,
  isSameAddress,
  isCoinAddress,
  fetchAndCalculateFiatPrices,
  getTradePath,
  isTradePathFromCoin,
  tradeDirectionMap,
  parseDexConfigsByDexFromDexContext,
  filterNativeTokens,
  filterUndefinedTokens,
  filterTradingTokens,
  routeQuotesToRouteQuotesByDex,
  dexChains,
  isProtocol,
  isVersion,
  getVersionTagFromVersion,
  assertTradeDirection,
  assertVersion,
  assertDexTag,
  assertProtocol,
  MAX_HEX_STRING,
} from '@dex-toolkit/utils'
import type { Address } from '@multicall-toolkit/types'

import { parseTokenListFromTokenListContext, TokenList } from '../token-list'
import { Tokens } from '../tokens'

export abstract class RouterAbstract<TFormat extends TradeFormat> {
  protected _walletAddress: Address

  protected _fromToken: Token

  protected _toToken: Token

  protected _nativeCurrencyInfo: NativeCurrencyInfo

  protected _nativeWrappedTokenInfo: NativeWrappedTokenInfo

  protected _wrappedContract: WrappedContract

  protected _dexProvider: DexProvider

  protected _settings: TradeSettings

  protected _dexConfigsByDex: DexConfigsByDex

  protected _multiPriceContext: MultiPriceContext

  protected _tokensFactory: Tokens

  constructor({
    fromToken,
    toToken,
    dexProvider,
    walletAddress,
    settings,
    dexContext,
    multiPriceContext,
    tokenListContext,
  }: RouterInternalArgs<TFormat>) {
    if (!fromToken) {
      throw new DexError(
        'fromToken is required.',
        ErrorCodes.functionArgumentError,
      )
    }

    if (!isAddress(fromToken?.contractAddress)) {
      throw new DexError(
        'fromToken contractAddress is not a valid address',
        ErrorCodes.functionArgumentError,
      )
    }

    if (!toToken) {
      throw new DexError(
        'toToken is required',
        ErrorCodes.functionArgumentError,
      )
    }

    if (!isAddress(toToken?.contractAddress)) {
      throw new DexError(
        'toToken contractAddress is not a valid address',
        ErrorCodes.functionArgumentError,
      )
    }

    if (!isAddress(walletAddress)) {
      throw new DexError(
        'walletAddress is required',
        ErrorCodes.functionArgumentError,
      )
    }

    if (!isAddress(walletAddress)) {
      throw new DexError(
        'walletAddress is not a valid address',
        ErrorCodes.functionArgumentError,
      )
    }

    if (!dexProvider) {
      throw new DexError(
        'dexProvider is required',
        ErrorCodes.functionArgumentError,
      )
    }

    if (!dexContext) {
      throw new DexError(
        'dexContext is required',
        ErrorCodes.functionArgumentError,
      )
    }

    this._fromToken = fromToken
    this._toToken = toToken
    this._walletAddress = walletAddress
    this._settings = populateTradeSettings(settings)

    this._dexProvider = dexProvider
    const { chainId } = this.dexProvider.network

    if (this.dexProvider.customNetwork?.nativeCurrency) {
      this._nativeCurrencyInfo = this.dexProvider.customNetwork.nativeCurrency
    } else {
      const chainConfig = getChainConfig(chainId)

      if (!chainConfig) {
        throw new DexError(
          `No chain config for chainId ${chainId}`,
          ErrorCodes.chainIdNotSupported,
        )
      }

      this._nativeCurrencyInfo = chainConfig.nativeCurrency
    }

    if (this.dexProvider.customNetwork?.nativeWrappedTokenInfo) {
      this._nativeWrappedTokenInfo =
        this.dexProvider.customNetwork.nativeWrappedTokenInfo
    } else {
      const chainConfig = getChainConfig(chainId)

      if (!chainConfig) {
        throw new DexError(
          `No chain config for chainId ${chainId}`,
          ErrorCodes.chainIdNotSupported,
        )
      }

      this._nativeWrappedTokenInfo = chainConfig.nativeWrappedTokenInfo
    }

    this._dexConfigsByDex = parseDexConfigsByDexFromDexContext({
      dexContext,
      chainId,
      protocolSettings: this._settings.protocolSettings,
    })

    const tokenList = parseTokenListFromTokenListContext({
      dexProvider: this.dexProvider,
      tokenListContext,
    })

    this._multiPriceContext = multiPriceContext ?? defaultMultiPriceContext

    this._tokensFactory = new Tokens({
      dexProviderContext: this.dexProvider,
      dexContext,
      tokenList,
    })

    this._wrappedContract = new WrappedContract(this.dexProvider)
  }

  /**
   * Get the from token
   */
  public get fromToken(): Token {
    return this._fromToken
  }

  /**
   * Get the to token
   */
  public get toToken(): Token {
    return this._toToken
  }

  /**
   * Get the tokens factory
   */
  public get tokensFactory(): Tokens {
    return this._tokensFactory
  }

  /**
   * Get the token list factory
   */
  public get tokenList(): TokenList | undefined {
    return this._tokensFactory.tokenList
  }

  /**
   * Get the dex provider
   */
  public get dexProvider(): DexProvider {
    return this._dexProvider
  }

  /**
   * Retrieves the native wrapped token information for the current network.
   *
   * @returns The native wrapped token information.
   */
  public get nativeWrappedTokenInfo() {
    return this._nativeWrappedTokenInfo
  }

  /**
   * Retrieves the native currency information for the current network.
   *
   * @returns The native currency information.
   */
  public get nativeCurrency(): NativeCurrencyInfo {
    return this._nativeCurrencyInfo
  }

  /**
   * Retrieves the dex configs by dex type.
   *
   * @returns The dex configs by dex type.
   */
  public get dexConfigsByDex(): DexConfigsByDex {
    return this._dexConfigsByDex
  }

  /**
   * Get the trade path
   */
  public get tradePath(): TradePath {
    const network = this.dexProvider.network

    return getTradePath({
      chainId: network.chainId,
      fromToken: this._fromToken,
      toToken: this._toToken,
      customNetworkNativeWrappedTokenInfo: this._nativeWrappedTokenInfo,
    })
  }

  // ------------------------
  // Transaction Builders
  // ------------------------

  /**
   * Build up a transaction for wrapped
   *
   * @param params - The parameters required to build the transaction.
   * @param params.data - The data.
   * @param params.coinAmount - The coin value.
   *
   * @returns A `DexTransaction` object representing the transaction.
   */
  protected buildUpTransactionCoinToWrapped({
    data,
    coinAmount,
  }: {
    data: string
    coinAmount: DexNumber
  }): DexTransaction {
    if (!data) {
      throw new DexError('Must provide data', ErrorCodes.functionArgumentError)
    }

    if (!coinAmount) {
      throw new DexError(
        'Must provide coin amount',
        ErrorCodes.functionArgumentError,
      )
    }

    const { contractAddress } = this._nativeWrappedTokenInfo

    if (!contractAddress) {
      throw new DexError(
        'Native wrapped token info is missing contract address',
        ErrorCodes.functionArgumentError,
      )
    }

    return {
      to: contractAddress,
      from: this._walletAddress,
      data,
      value: coinAmount.toHexString(),
    }
  }

  /**
   * Build up a transaction for wrapped
   * @param data The data
   *
   * @returns A `DexTransaction` object representing the transaction.
   */
  protected buildUpTransactionWrappedToCoin(data: string): DexTransaction {
    if (!data) {
      throw new DexError('Must provide data', ErrorCodes.functionArgumentError)
    }

    const { contractAddress } = this._nativeWrappedTokenInfo

    if (!contractAddress) {
      throw new DexError(
        'Native wrapped token info is missing contract address',
        ErrorCodes.functionArgumentError,
      )
    }

    return {
      to: contractAddress,
      from: this._walletAddress,
      data,
      value: MIN_HEX_STRING,
    }
  }

  /**
   * Build up a route quote for coin > wrapped
   *
   * @param params - The parameters required to build the route quote.
   * @param params.tokenAmount - The amount to trade.
   * @param params.routeContext - The route context.
   * @param params.tradeDirection - The trade direction.
   *
   * @returns A promise that resolves to a `RouteQuote` object representing the route quote.
   */
  protected buildRouteQuoteForCoinToWrapped({
    tokenAmount,
    routeContext,
    tradeDirection,
  }: {
    tokenAmount: DexNumber
    routeContext: RoutePath
    tradeDirection: TradeDirection
  }): RouteQuote {
    const {
      route,
      pairAddresses,
      liquidityProviderFeePercent,
      version,
      protocol,
      dexTag,
    } = routeContext

    const routePathAddresses = route.map((c: Token) => c.contractAddress)
    const routePathText = route.map((c) => c.symbol).join(' > ')

    const transaction = this.buildUpTransactionCoinToWrapped({
      data: this._wrappedContract.encodeDeposit(),
      coinAmount: tokenAmount,
    })

    const routeQuote: RouteQuote = {
      tradeDirection,
      expectedConvertQuote: tokenAmount,
      expectedConvertQuoteOrTokenAmountInMaxWithSlippage: tokenAmount,
      liquidityProviderFeePercent,
      tradeExpires: 0,
      routePathTokens: route,
      routePathText,
      routePathAddresses,
      pairAddresses,
      transaction,
      dexTag,
      version,
      protocol,
    }

    return routeQuote
  }

  /**
   * Build up a route quote for wrapped > coin
   *
   * @param params - The parameters required to build the route quote.
   * @param params.tokenAmount - The amount to trade.
   * @param params.routeContext - The route context.
   * @param params.tradeDirection - The trade direction.
   *
   * @returns A promise that resolves to a `RouteQuote` object representing the route quote.
   */
  protected buildRouteQuoteForWrappedToCoin({
    tokenAmount,
    routeContext,
    tradeDirection,
  }: {
    tokenAmount: DexNumber
    routeContext: RoutePath
    tradeDirection: TradeDirection
  }): RouteQuote {
    const {
      route,
      pairAddresses,
      liquidityProviderFeePercent,
      version,
      protocol,
      dexTag,
    } = routeContext

    const routePathAddresses = route.map((c: Token) => c.contractAddress)
    const routePathText = route.map((c) => c.symbol).join(' > ')

    const data = this._wrappedContract.encodeWithdraw(
      tokenAmount.toEthersBigNumber(),
    )
    const transaction = this.buildUpTransactionWrappedToCoin(data)

    const routeQuote: RouteQuote = {
      tradeDirection,
      expectedConvertQuote: tokenAmount,
      expectedConvertQuoteOrTokenAmountInMaxWithSlippage: tokenAmount,
      liquidityProviderFeePercent,
      tradeExpires: 0,
      routePathTokens: route,
      routePathText,
      routePathAddresses,
      pairAddresses,
      transaction,
      dexTag,
      version,
      protocol,
    }

    return routeQuote
  }

  // ------------------------
  // Route Quotes
  // ------------------------

  /**
   * Get all possible routes with the quotes
   *
   * @param params - The parameters required to get route quotes.
   * @param params.tokenAmount - The amount to trade.
   * @param params.tradeDirection - The direction you want to get the quote from.
   *
   * @returns A promise that resolves to an array of `RouteQuote` objects representing the possible routes with quotes.
   */
  abstract getRouteQuotes({
    tokenAmount,
    tradeDirection,
  }: {
    tokenAmount: DexNumber
    tradeDirection: TradeDirection
  }): Promise<RouteQuote[]>

  /**
   * Find the best route rate out of all the route quotes
   *
   * @param params - The parameters required to find the best route quote.
   * @param params.tokenAmount - The amount to trade.
   * @param params.tradeDirection - The direction you want to get the quote from.
   *
   * @returns A promise that resolves to a `BestRouteQuoteContext` object containing the best route quote, allowance, and all possible routes with quotes.
   */
  public async findBestRouteQuote({
    tokenAmount,
    tradeDirection = tradeDirectionMap.input,
  }: {
    tokenAmount: DexNumber
    tradeDirection: TradeDirection
  }): Promise<BestRouteQuoteContext> {
    if (!tokenAmount) {
      throw new DexError(
        'Must provide amount to trade',
        ErrorCodes.functionArgumentError,
      )
    }

    let allRouteQuotes = await this.getRouteQuotes({
      tokenAmount,
      tradeDirection,
    })

    if (!allRouteQuotes.length) {
      throw new DexError(
        `No routes found for ${this._fromToken.symbol} > ${this._toToken.symbol}`,
        ErrorCodes.noRoutesFound,
      )
    }

    const { toTokenInfo, fromTokenInfo } =
      await this.getFromAndToTokenBalanceAndFromTokenAllowances({
        tokenAmount,
        allRouteQuotes,
        tradeDirection,
        format: { type: 'dexnumber' },
      })

    const tokenPrices = await this.getTokenPrices()

    if (
      dexChains.includes(this.dexProvider.network.chainId) &&
      this._settings.gasSettings &&
      fromTokenInfo.balanceInfo.hasEnoughBalance
    ) {
      allRouteQuotes = await this.filterRouteQuotesWithTransactionFees({
        allRouteQuotes,
        fromTokenInfo,
        tokenPrices,
      })
    }

    const bestRouteQuote = allRouteQuotes[0]

    if (!bestRouteQuote) {
      throw new DexError(
        `No route best route quote found for ${this._fromToken.symbol} > ${this._toToken.symbol}`,
        ErrorCodes.noRoutesFound,
      )
    }

    const { dexTag, protocol, version } = bestRouteQuote

    assertDexTag(dexTag)
    assertProtocol(protocol)
    assertVersion(version)

    const versionTag = getVersionTagFromVersion(version)
    const fromTokenAllowanceInfo =
      fromTokenInfo.allowanceInfoByDex[dexTag]?.[protocol]?.[versionTag]

    if (!fromTokenAllowanceInfo) {
      throw new DexError(
        'Invalid route quote configuration',
        ErrorCodes.internalError,
      )
    }

    const { allowance, hasEnoughAllowance, isMaxAllowance } =
      fromTokenAllowanceInfo

    if (!allowance) {
      throw new DexError(
        'Allowance is missing in fromTokenInfo for trade',
        ErrorCodes.internalError,
      )
    }

    if (hasEnoughAllowance === undefined) {
      throw new DexError(
        'Invalid route quote configuration',
        ErrorCodes.internalError,
      )
    }

    const otherQuotes = allRouteQuotes
      .slice(1, allRouteQuotes.length)
      .map((routes) => ({
        ...routes,
        tradeDirection,
      }))

    const attemptedRouteQuotes = routeQuotesToRouteQuotesByDex(otherQuotes)

    return {
      bestRouteQuote,
      attemptedRouteQuotes,
      hasEnoughBalance: fromTokenInfo.balanceInfo.hasEnoughBalance ?? false,
      fromBalance: fromTokenInfo.balanceInfo.balance,
      fromValue: tokenPrices[this._fromToken.contractAddress],
      toBalance: toTokenInfo.balanceInfo.balance,
      toValue: tokenPrices[this._toToken.contractAddress],
      allowance,
      hasEnoughAllowance,
      isMaxAllowance,
    }
  }

  /**
   * Filters route quotes by incorporating transaction fees to determine the most cost-effective trade in fiat value.
   *
   * @param params - An object containing the necessary parameters to filter route quotes.
   * @param params.allRouteQuotes - An array of all possible route quotes for the trade.
   * @param params.fromTokenInfo - Balance and allowance info for the from token.
   * @param params.tokenPrices - A record of token prices.
   *
   * @returns A promise that resolves to an array of `RouteQuote` objects, sorted by the most cost-effective routes after considering transaction fees.
   */
  protected async filterRouteQuotesWithTransactionFees({
    allRouteQuotes,
    fromTokenInfo,
    tokenPrices,
  }: {
    allRouteQuotes: RouteQuote[]
    fromTokenInfo: AllowanceAndBalanceOf<'dexnumber'>
    tokenPrices: Record<Address, number>
  }): Promise<RouteQuote[]> {
    if (!allRouteQuotes) {
      throw new DexError(
        'Must provide all routes',
        ErrorCodes.functionArgumentError,
      )
    }

    if (this._settings.gasSettings && !this._settings.disableMultihops) {
      const toUsdValue = tokenPrices[this._toToken.contractAddress]
      const coinUsdValue =
        tokenPrices[this._nativeWrappedTokenInfo.contractAddress]

      if (toUsdValue && coinUsdValue) {
        const bestRouteQuoteHops = this.getBestRouteQuotesHops({
          allRouteQuotes,
          fromTokenInfo,
        })

        const gasPriceGwei = await this._settings.gasSettings.getGasPrice()
        const gasPrice = DexNumber.fromUnshifted(gasPriceGwei, 'gwei')

        const routePromises = bestRouteQuoteHops.map(async (route) => {
          const expectedConvertQuoteFiatPrice =
            route.expectedConvertQuote.times(toUsdValue)

          const estimatedGas = DexNumber.fromShifted(
            await this.dexProvider.provider.estimateGas(route.transaction),
            // Will always match the chains native token decimals
            this.nativeWrappedTokenInfo.decimals,
          )

          const txFee = estimatedGas.times(gasPrice).times(coinUsdValue)

          route.gasPriceEstimatedBy = DexNumber.fromUnshifted(
            gasPriceGwei,
            'gwei',
          )

          const expectedConvertQuoteMinusTxFees =
            expectedConvertQuoteFiatPrice.minus(txFee)

          return { route, expectedConvertQuoteMinusTxFees }
        })

        const resolvedRoutes = await Promise.all(routePromises)

        let bestRoute:
          | {
              route: RouteQuote
              expectedConvertQuoteMinusTxFees: DexNumber
            }
          | undefined

        for (const {
          route,
          expectedConvertQuoteMinusTxFees,
        } of resolvedRoutes) {
          if (!bestRoute) {
            bestRoute = { route, expectedConvertQuoteMinusTxFees }
          } else if (
            expectedConvertQuoteMinusTxFees.isGreaterThan(
              bestRoute.expectedConvertQuoteMinusTxFees,
            )
          ) {
            bestRoute = { route, expectedConvertQuoteMinusTxFees }
          }
        }

        if (bestRoute) {
          const routeIndex = allRouteQuotes.findIndex(
            (r) =>
              r.expectedConvertQuote ===
                bestRoute!.route.expectedConvertQuote &&
              bestRoute!.route.routePathText === r.routePathText,
          )

          allRouteQuotes.splice(routeIndex, 1)
          allRouteQuotes.unshift(bestRoute.route)
        }
      }
    }

    return allRouteQuotes
  }

  /**
   * Work out the best route quote hops aka the best direct, the best 3 hop and the best 4 hop
   *
   * @param params - The parameters required to get the best route quotes.
   * @param params.allRouteQuotes - All the routes.
   * @param params.fromTokenInfo - Balance and allowance info for the from token.
   *
   * @returns An array of `RouteQuote` objects representing the best route quotes.
   */
  protected getBestRouteQuotesHops({
    allRouteQuotes,
    fromTokenInfo,
  }: {
    allRouteQuotes: RouteQuote[]
    fromTokenInfo: AllowanceAndBalanceOf<'dexnumber'>
  }): RouteQuote[] {
    if (!allRouteQuotes?.length) {
      throw new DexError(
        'Must provide all routes',
        ErrorCodes.functionArgumentError,
      )
    }

    const routeQuotes: RouteQuote[] = []

    for (let i = 0; i < allRouteQuotes.length; i++) {
      if (
        routeQuotes.find((r) => r.routePathAddresses.length === 2) &&
        routeQuotes.find((r) => r.routePathAddresses.length === 3) &&
        routeQuotes.find((r) => r.routePathAddresses.length === 4)
      ) {
        break
      }

      const routeQuote = allRouteQuotes[i]

      if (!routeQuote) {
        continue
      }

      const { dexTag, protocol, version } = routeQuote

      assertDexTag(dexTag)
      assertProtocol(protocol)
      assertVersion(version)

      const versionTag = getVersionTagFromVersion(version)
      const { hasEnoughAllowance } =
        fromTokenInfo.allowanceInfoByDex[dexTag]?.[protocol]?.[versionTag] ?? {}

      if (hasEnoughAllowance) {
        if (
          routeQuote.routePathAddresses.length === 2 &&
          !routeQuotes.find((r) => r.routePathAddresses.length === 2)
        ) {
          routeQuotes.push(routeQuote)
          continue
        }

        if (
          routeQuote.routePathAddresses.length === 3 &&
          !routeQuotes.find((r) => r.routePathAddresses.length === 3)
        ) {
          routeQuotes.push(routeQuote)
          continue
        }

        if (
          routeQuote.routePathAddresses.length === 4 &&
          !routeQuotes.find((r) => r.routePathAddresses.length === 4)
        ) {
          routeQuotes.push(routeQuote)
          continue
        }
      }
    }

    return routeQuotes
  }

  // ------------------------
  // Pools
  // ------------------------

  /**
   * Gets the pool reserves for a given token pair and DEX version.
   *
   * @param params - The parameters required to get the pool reserves.
   * @param params.pairAddresses - The addresses of each pair in the route.
   * @param params.dexTag - The dex tag.
   * @param params.versionTag - The version tag.
   *
   * @returns A promise that resolves to an array of objects containing the reserves of token0 and token1 for each pair.
   */
  abstract getPoolReserves({
    pairAddresses,
    dexTag,
    versionTag,
  }: {
    pairAddresses: Address[]
    dexTag: DexTag
    versionTag: VersionTag
  }): Promise<PoolReserve[]>

  // ------------------------
  // Price Impact
  // ------------------------

  /**
   * Executes the main logic to fetch reserves and calculate price impact.
   *
   * @param params - The parameters required to calculate the price impact.
   * @param params.tokenAmount - The amount of the input token being traded.
   * @param params.expectedConvertQuote - The expected output amount from the trade.
   * @param params.pairAddresses - The addresses of each pair in the route.
   * @param params.routePathTokens - The tokens involved in the route path.
   * @param params.liquidityProviderFeePercent - The liquidity provider fee as a percentage.
   * @param params.dexTag - The dex tag
   *
   * @returns A promise that resolves to the price impact percentage as a string.
   */
  abstract getPriceImpact({
    tokenAmount,
    expectedConvertQuote,
    pairAddresses,
    routePathTokens,
    liquidityProviderFeePercent,
    dexTag,
  }: {
    tokenAmount: DexNumber
    expectedConvertQuote: DexNumber
    pairAddresses: Address[]
    routePathTokens: Token[]
    liquidityProviderFeePercent: number | number[]
    dexTag: DexTag
  }): Promise<PriceImpactInfo>

  // ------------------------
  // Token Pairs
  // ------------------------

  /**
   * Generates all possible token pairs for a given token from a list of base tokens.
   *
   * @param params - The parameters required to generate token pairs.
   * @param params.token - The token for which pairs are to be generated.
   * @param params.baseTokens - An array of tokens to be paired with the given token.
   *
   * @returns A two-dimensional array where each sub-array is a pair of tokens.
   */
  protected generatePairsForToken({
    token,
    baseTokens,
  }: {
    token: Token
    baseTokens: Token[]
  }): Token[][] {
    return baseTokens
      .filter(
        (pairedToken) =>
          !!pairedToken &&
          !isSameAddress(token.contractAddress, pairedToken.contractAddress),
      )
      .map((pairedToken) => [token, pairedToken])
  }

  /**
   * Retrieves all tokens including the `fromToken`, `toToken`, and the base tokens.
   *
   * @returns An array of all tokens including the `fromToken`, `toToken`, and the base tokens.
   */
  protected get allTokens(): Token[] {
    return [
      this._fromToken,
      this._toToken,
      ...this.allBaseTokens({ includeWrappedToken: true }),
    ]
  }

  /**
   * Retrieves the base tokens, optionally including the native wrapped token.
   *
   * @param params - The parameters required to retrieve the base tokens.
   * @param params.includeWrappedToken - If true, the native wrapped token is included in the result.
   *
   * @returns An array of base tokens, optionally including the native wrapped token.
   */
  protected allBaseTokens({
    includeWrappedToken,
  }: {
    includeWrappedToken: boolean
  }): Token[] {
    let baseTokens =
      this.dexProvider.customNetwork?.tokens ??
      getChainConfig(this.dexProvider.network.chainId).tokens ??
      []

    baseTokens = filterNativeTokens({
      tokens: baseTokens,
      nativeWrappedTokenInfo: this.nativeWrappedTokenInfo,
    })

    baseTokens = filterTradingTokens({
      tokens: baseTokens,
      fromToken: this._fromToken,
      toToken: this._toToken,
    })

    return includeWrappedToken
      ? [this.nativeWrappedTokenInfo, ...baseTokens]
      : baseTokens
  }

  /**
   * Retrieves all possible pairs for the trade.
   *
   * @returns An array of all possible pairs for the trade.
   */
  protected get allPairs(): Token[][][] {
    return this._settings.disableMultihops
      ? [[[this._fromToken, this._toToken]]]
      : [
          this.fromPairs,
          this.toPairs,
          ...this.intermediatePairs,
          [[this._fromToken, this._toToken]],
        ]
  }

  /**
   * Generates all possible token pairs from the base tokens.
   *
   * @returns A three-dimensional array where each sub-array contains pairs of tokens.
   */
  protected get intermediatePairs(): Token[][][] {
    const baseTokens = this.allBaseTokens({
      includeWrappedToken: false,
    })

    if (!baseTokens?.length) return []

    return baseTokens.reduce<Token[][][]>((accumulator, token) => {
      // Get the remaining tokens after the current one
      // const remainingTokens = originalArray.slice(index + 1)

      const pairs = this.generatePairsForToken({
        token,
        baseTokens, //: remainingTokens,
      })

      // Optionally include the native wrapped token pair
      if (
        !isCoinAddress(this._fromToken.contractAddress) &&
        !isCoinAddress(this._toToken.contractAddress)
      ) {
        pairs.push([token, this.nativeWrappedTokenInfo])
      }

      // Filter out any invalid pairs
      const filteredPairs = filterUndefinedTokens(pairs).filter(
        (t) =>
          !!t[0] &&
          !!t[1] &&
          !isSameAddress(t[0].contractAddress, t[1].contractAddress),
      )

      return [...accumulator, filteredPairs]
    }, [])
  }

  /**
   * Generates all possible pairs involving the `fromToken` and the base tokens.
   *
   * @returns A two-dimensional array where each sub-array is a pair involving the `fromToken`.
   */
  protected get fromPairs(): Token[][] {
    const baseTokens = this.allBaseTokens({ includeWrappedToken: false })

    if (baseTokens?.length > 0) {
      const pairs = this.generatePairsForToken({
        token: this._fromToken,
        baseTokens,
      })

      if (
        !isCoinAddress(this._fromToken.contractAddress) &&
        !isCoinAddress(this._toToken.contractAddress)
      ) {
        pairs.push([this._fromToken, this.nativeWrappedTokenInfo])
      }

      return filterUndefinedTokens(pairs).filter(
        (t) =>
          !!t[0] &&
          !!t[1] &&
          !isSameAddress(t[0].contractAddress, t[1].contractAddress),
      )
    }

    const pairs = [
      [this._fromToken, this.nativeWrappedTokenInfo].filter((t) => !!t),
    ]

    return pairs.filter(
      (t) =>
        !!t[0] &&
        !!t[1] &&
        !isSameAddress(t[0].contractAddress, t[1].contractAddress),
    )
  }

  /**
   * Generates all possible pairs involving the `toToken` and the base tokens.
   *
   * @returns A two-dimensional array where each sub-array is a pair involving the `toToken`.
   */
  protected get toPairs(): Token[][] {
    const baseTokens = this.allBaseTokens({ includeWrappedToken: false })

    if (baseTokens?.length > 0) {
      const pairs = this.generatePairsForToken({
        token: this._toToken,
        baseTokens,
      })

      if (
        !isCoinAddress(this._toToken.contractAddress) &&
        !isCoinAddress(this._toToken.contractAddress)
      ) {
        pairs.push([this.nativeWrappedTokenInfo, this._toToken])
      }

      return filterUndefinedTokens(pairs).filter(
        (t) =>
          !!t[0] &&
          !!t[1] &&
          !isSameAddress(t[0].contractAddress, t[1].contractAddress),
      )
    }

    const pairs: Token[][] = this.nativeWrappedTokenInfo
      ? [[this.nativeWrappedTokenInfo, this._toToken]]
      : []

    return pairs.filter(
      (t) =>
        !!t[0] &&
        !!t[1] &&
        !isSameAddress(t[0].contractAddress, t[1].contractAddress),
    )
  }

  // ------------------------
  // Token Balance, Allowances, and Prices
  // ------------------------

  /**
   * Get coin balance
   */
  public async getCoinBalance<TFormat extends TradeFormat>(
    format: TradeFormatOptions<TFormat>,
  ): Promise<TradeFormatValue<TFormat>> {
    return this.dexProvider.getCoinBalance({
      walletAddress: this._walletAddress,
      format,
    })
  }

  /**
   * Has got enough allowance to do the trade
   *
   * @param params - The parameters required to check if the allowance is enough.
   * @param params.amount - The amount you want to swap.
   * @param params.allowance - The allowance you want to swap.
   * @param params.format - The format in which the allowance value is returned.
   *
   * @returns A `TokenBalanceInfo` object containing the allowance and a boolean indicating if it has enough allowance.
   */
  protected hasGotEnoughFromTokenAllowance<TFormat extends TradeFormat>({
    amount,
    allowance,
    format,
  }: {
    amount: DexNumber
    allowance: DexNumber
    format: TradeFormatOptions<TFormat>
  }): TokenAllowanceInfo<TFormat> {
    if (!amount) {
      throw new DexError(
        'Must provide amount',
        ErrorCodes.functionArgumentError,
      )
    }

    if (!allowance) {
      throw new DexError(
        'Must provide allowance',
        ErrorCodes.functionArgumentError,
      )
    }

    const hasEnoughAllowance =
      isTradePathFromCoin(this.tradePath) ||
      allowance.isGreaterThanOrEqualTo(amount)

    const isMaxAllowance = allowance.toHexString() === MAX_HEX_STRING

    return {
      allowance: allowance.toTradeFormat(format),
      hasEnoughAllowance,
      isMaxAllowance,
    }
  }

  /**
   * Has got enough balance to do the trade (token check only)
   *
   * @param params - The parameters required to check if the balance is enough.
   * @param params.amount - The amount you want to swap.
   * @param params.balance - The balance you want to swap.
   * @param params.format - The format in which the balance value is returned.
   *
   * @returns A `TokenBalanceInfo` object containing the balance and a boolean indicating if it has enough balance.
   *
   * @throws DexError if the amount is not provided.
   * @throws DexError if the balance is not provided.
   */
  protected hasGotEnoughFromBalance<TFormat extends TradeFormat>({
    amount,
    balance,
    format,
  }: {
    amount: DexNumber
    balance: DexNumber
    format: TradeFormatOptions<TFormat>
  }): TokenBalanceInfo<TFormat> {
    if (!amount) {
      throw new DexError(
        'Must provide amount',
        ErrorCodes.functionArgumentError,
      )
    }

    if (!balance) {
      throw new DexError(
        'Must provide balance',
        ErrorCodes.functionArgumentError,
      )
    }

    return {
      balance: balance.toTradeFormat(format),
      hasEnoughBalance: balance.isGreaterThan(amount),
    }
  }

  /**
   * Get the allowance and balance for the from and to token (will get balance for coin as well)
   *
   * @param format - The format in which the allowance and balance values are returned.
   *
   * @returns A promise that resolves to an object containing the allowance and balance information for the from and to tokens.
   *
   * @throws DexError if the from token contract address is not found.
   * @throws DexError if the to token contract address is not found.
   */
  protected async getFromAndToTokenAllowancesAndBalance<
    TFormat extends TradeFormat,
  >(
    format: TradeFormatOptions<TFormat>,
  ): Promise<MultiTokenAllowancesAndBalance<TFormat>> {
    const allowanceAndBalanceOfForTokens =
      await this._tokensFactory.getAllowancesAndBalanceOf({
        walletAddress: this._walletAddress,
        tokenContractAddresses: [
          this._fromToken.contractAddress,
          this._toToken.contractAddress,
        ],
        format,
      })

    const fromTokenInfo =
      allowanceAndBalanceOfForTokens[this._fromToken.contractAddress]

    const toTokenInfo =
      allowanceAndBalanceOfForTokens[this._toToken.contractAddress]

    if (!fromTokenInfo) {
      throw new DexError(
        `Could not find allowance and balance for 'fromToken' ${this._fromToken.symbol}`,
        ErrorCodes.internalError,
      )
    }

    if (!toTokenInfo) {
      throw new DexError(
        `Could not find allowance and balance for 'toToken' ${this._toToken.symbol}`,
        ErrorCodes.internalError,
      )
    }

    return {
      fromToken: fromTokenInfo,
      toToken: toTokenInfo,
    }
  }

  /**
   * Get the balance and allowance for the from and to token (will get balance for coin as well)
   *
   * @param params - The parameters required to get the balance and allowance for the from and to token.
   * @param params.tokenAmount - The amount of the from token to be traded.
   * @param params.allRouteQuotes - All valid route quotes.
   * @param params.tradeDirection - The trade direction (input or output).
   * @param params.format - The format in which the allowance and balance values are returned.
   *
   * @returns A promise that resolves to an object containing the balance and allowance information for the from and to tokens.
   */
  protected async getFromAndToTokenBalanceAndFromTokenAllowances<
    TFormat extends TradeFormat,
  >({
    tokenAmount,
    allRouteQuotes,
    tradeDirection,
    format,
  }: {
    tokenAmount: DexNumber
    allRouteQuotes: RouteQuote[]
    tradeDirection: TradeDirection
    format: TradeFormatOptions<TFormat>
  }): Promise<{
    toTokenInfo: Pick<AllowanceAndBalanceOf<TFormat>, 'balanceInfo'>
    fromTokenInfo: AllowanceAndBalanceOf<TFormat>
  }> {
    // Input validation
    if (!tokenAmount) {
      throw new DexError(
        'Must provide amount to trade',
        ErrorCodes.functionArgumentError,
      )
    }

    if (!allRouteQuotes?.length) {
      throw new DexError(
        'Must provide at least one route quote',
        ErrorCodes.functionArgumentError,
      )
    }

    assertTradeDirection(tradeDirection)

    // Get initial balances and allowances
    const multiAllowanceAndBalance =
      await this.getFromAndToTokenAllowancesAndBalance({ type: 'dexnumber' })
    const toBalance = multiAllowanceAndBalance.toToken.balanceInfo.balance

    // Group route quotes by dex for processing
    const routeQuotesByDex = allRouteQuotes.reduce(
      (acc, quote) => {
        const { dexTag } = quote

        assertDexTag(dexTag)

        if (!acc[dexTag]) {
          acc[dexTag] = []
        }
        acc[dexTag].push(quote)
        return acc
      },
      {} as Record<DexTag, RouteQuote[]>,
    )

    // Process balances based on trade path
    const balanceResult = this.processBalances({
      tokenAmount,
      tradeDirection,
      fromBalance: multiAllowanceAndBalance.fromToken.balanceInfo.balance,
      routeQuotes: allRouteQuotes,
    })

    // Process allowances for each DEX concurrently
    const allowanceInfoByDex: AllowancesByDex<TFormat> = {}

    Object.entries(routeQuotesByDex).map(([dexTag, dexRouteQuotes]) => {
      const allowancesForDex =
        multiAllowanceAndBalance.fromToken.allowanceInfoByDex[dexTag]

      if (!allowancesForDex) {
        throw new DexError(
          `No allowances found for dexTag ${dexTag}`,
          ErrorCodes.internalError,
        )
      }

      // Initialize allowance info for this DEX
      allowanceInfoByDex[dexTag] = {
        protocolV2: {},
        protocolV3: {},
      }

      // Process all quotes for this DEX
      for (const routeQuote of dexRouteQuotes) {
        const { protocol, version } = routeQuote

        if (!isProtocol(protocol) || !isVersion(version)) {
          continue
        }

        const versionTag = getVersionTagFromVersion(version)

        const allowanceForVersion =
          allowancesForDex[protocol][versionTag]?.allowance

        if (!allowanceForVersion) {
          throw new DexError(
            `No allowance found for protocol ${protocol} and version ${version}`,
            ErrorCodes.internalError,
          )
        }

        const amount =
          tradeDirection === tradeDirectionMap.input
            ? tokenAmount
            : routeQuote.expectedConvertQuote

        const { allowance, hasEnoughAllowance, isMaxAllowance } =
          this.hasGotEnoughFromTokenAllowance({
            amount,
            allowance: allowanceForVersion,
            format,
          })

        // Set allowance info for this protocol and version
        allowanceInfoByDex[dexTag][protocol][versionTag] = {
          allowance,
          hasEnoughAllowance,
          isMaxAllowance,
        }
      }
    })

    return {
      toTokenInfo: {
        balanceInfo: {
          balance: toBalance.toTradeFormat(format),
        },
      },
      fromTokenInfo: {
        balanceInfo: {
          balance: balanceResult.balance.toTradeFormat(format),
          hasEnoughBalance: balanceResult.hasEnoughBalance,
        },
        allowanceInfoByDex,
      },
    }
  }

  private processBalances({
    tokenAmount,
    tradeDirection,
    fromBalance,
    routeQuotes,
  }: {
    tokenAmount: DexNumber
    tradeDirection: TradeDirection
    fromBalance: DexNumber
    routeQuotes: RouteQuote[]
  }): {
    balance: DexNumber
    hasEnoughBalance?: boolean
  } {
    const expectedConvertQuote = routeQuotes[0]?.expectedConvertQuote

    if (tradeDirection === tradeDirectionMap.output && !expectedConvertQuote) {
      throw new DexError(
        'Invalid expected convert quote',
        ErrorCodes.internalError,
      )
    }

    const amount =
      tradeDirection === tradeDirectionMap.input
        ? tokenAmount
        : expectedConvertQuote

    if (!amount) {
      throw new DexError('Invalid token amount', ErrorCodes.internalError)
    }

    return this.hasGotEnoughFromBalance({
      amount,
      balance: fromBalance,
      format: { type: 'dexnumber' },
    })
  }

  /**
   * Get the token prices for the from and to tokens, indexed by contract address.
   */
  public async getTokenPrices(): Promise<Record<Address, number>> {
    const contractAddresses = [
      this._fromToken.contractAddress,
      this._toToken.contractAddress,
      this._nativeWrappedTokenInfo.contractAddress,
    ]

    return fetchAndCalculateFiatPrices({
      chainId: this.dexProvider.network.chainId,
      multiPriceContext: this._multiPriceContext,
      contractAddresses,
    })
  }
}
