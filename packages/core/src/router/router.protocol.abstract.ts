import { DexNumber } from '@dex-toolkit/number'
import type {
  DexTransaction,
  TradeDirection,
  RouteQuote,
  RoutePath,
  RouteQuoteTradeContext,
  Token,
  DexProtocol,
  PriceImpactInfo,
  TokenAvailablePools,
  Pool,
  RoutePathsByDex,
  DexTag,
  TradeFormat,
  VersionTag,
} from '@dex-toolkit/types'
import {
  DexError,
  ErrorCodes,
  protocolMap,
  tradeDirectionMap,
  isWrappingCoin,
  isUnwrappingCoin,
  MIN_HEX_STRING,
  isWrappingOrUnwrappingCoin,
  calculatePriceImpact,
  getVersionFromVersionTag,
  isVersionTag,
  assertTradeDirection,
  assertDexTag,
  assertIsAddresses,
} from '@dex-toolkit/utils'
import type {
  Address,
  ContractContext,
  ContractResults,
  MethodCall,
  MethodCallUnion,
  MulticallResults,
  MethodResult,
} from '@ethereum-multicall/types'

import { RouterAbstract } from './router.abstract'

export abstract class RouterProtocolAbstract<
  TFormat extends TradeFormat,
> extends RouterAbstract<TFormat> {
  /**
   * Get the dex protocol
   */
  abstract get protocol(): DexProtocol

  // ------------------------
  // Transaction Builders
  // ------------------------

  /**
   * Build up a transaction for token from
   *
   * @param params - The parameters required to build the transaction.
   * @param params.data - The data.
   * @param params.dexTag - The dex tag.
   * @param params.versionTag - The dex version tag.
   * @returns The transaction.
   */
  protected buildUpTransactionTokenDirectionFrom({
    data,
    dexTag,
    versionTag,
  }: {
    data: string
    dexTag: DexTag
    versionTag: VersionTag
  }): DexTransaction {
    if (!data) {
      throw new DexError('Must provide data', ErrorCodes.functionArgumentError)
    }

    let routerAddress: Address | undefined

    switch (this.protocol) {
      case protocolMap.protocolV2:
        routerAddress =
          this._dexConfigsByDex[dexTag]?.protocols.protocolV2?.[versionTag]
            ?.router.address
        break
      case protocolMap.protocolV3:
        routerAddress =
          this._dexConfigsByDex[dexTag]?.protocols.protocolV3?.[versionTag]
            ?.router.address
        break
      default:
        throw new DexError(
          `Invalid DEX version ${this.protocol}`,
          ErrorCodes.protocolNotSupported,
        )
    }

    if (!routerAddress) {
      throw new DexError(
        `Router address not found for dexTag ${dexTag}`,
        ErrorCodes.protocolNotSupported,
      )
    }

    return {
      to: routerAddress,
      from: this._walletAddress,
      data,
      value: MIN_HEX_STRING,
    }
  }

  /**
   * Build up a transaction for coin from
   *
   * @param params - The parameters required to build the transaction.
   * @param params.coinAmount - The coin value.
   * @param params.data - The data.
   * @param params.dexTag - The dex tag.
   * @param params.versionTag - The dex version tag.
   * @returns The transaction.
   */
  protected buildUpTransactionCoinDirectionFrom({
    coinAmount,
    data,
    dexTag,
    versionTag,
  }: {
    coinAmount: DexNumber
    data: string
    dexTag: DexTag
    versionTag: VersionTag
  }): DexTransaction {
    if (!coinAmount) {
      throw new DexError(
        'Must provide coin value',
        ErrorCodes.functionArgumentError,
      )
    }

    if (!data) {
      throw new DexError('Must provide data', ErrorCodes.functionArgumentError)
    }

    let routerAddress: Address | undefined

    switch (this.protocol) {
      case protocolMap.protocolV2:
        routerAddress =
          this._dexConfigsByDex[dexTag]?.protocols.protocolV2?.[versionTag]
            ?.router.address
        break
      case protocolMap.protocolV3:
        routerAddress =
          this._dexConfigsByDex[dexTag]?.protocols.protocolV3?.[versionTag]
            ?.router.address
        break
      default:
        throw new DexError(
          `Invalid DEX version ${this.protocol}`,
          ErrorCodes.protocolNotSupported,
        )
    }

    if (!routerAddress) {
      throw new DexError(
        `Router address not found for dexTag ${dexTag}`,
        ErrorCodes.protocolNotSupported,
      )
    }

    return {
      to: routerAddress,
      from: this._walletAddress,
      data,
      value: coinAmount.toHexString(),
    }
  }

  // ------------------------
  // Transaction Data Encoding
  // ------------------------

  /**
   * Generates the trade data for various trade paths and directions.
   * The trade data is generated based on the provided route context, deadline, trade path, trade direction, and values.
   *
   * @param params - The parameters required to generate the trade data.
   * @param params.tradeDirection - The trade direction, indicating whether the trade is input or output based.
   * @param params.fromAmount - The amount for the from token or coin.
   * @param params.toAmount - The amount for the to token or coin.
   * @param params.routeQuoteTradeContext - The context of the route quote trade.
   * @param params.deadline - The deadline for the trade to be executed, in UNIX timestamp format.
   * @param params.dexTag - The dex tag.
   * @param params.versionTag - The dex version tag.
   *
   * @returns The encoded trade data string.
   *
   * @throws Throws an error if any of the required parameters are missing or if an invalid trade path or direction is provided.
   */
  protected encodeTradeData({
    tradeDirection,
    fromAmount,
    toAmount,
    routeQuoteTradeContext,
    deadline,
    dexTag,
    versionTag,
  }: {
    tradeDirection: TradeDirection
    fromAmount: DexNumber
    toAmount: DexNumber
    routeQuoteTradeContext: RouteQuoteTradeContext
    deadline: string
    dexTag: DexTag
    versionTag: VersionTag
  }): string {
    switch (tradeDirection) {
      case tradeDirectionMap.input: {
        return this.encodeTradeDataForExactInput({
          fromAmount,
          toAmount,
          routeQuoteTradeContext,
          deadline,
          dexTag,
          versionTag,
        })
      }
      case tradeDirectionMap.output: {
        return this.encodeTradeDataForExactOutput({
          fromAmount,
          toAmount,
          routeQuoteTradeContext,
          deadline,
          dexTag,
          versionTag,
        })
      }
      default:
        throw new DexError(
          `Invalid trade direction ${tradeDirection}`,
          ErrorCodes.functionArgumentError,
        )
    }
  }

  /**
   * Generate trade data
   *
   * @param params - The parameters required to generate the trade data.
   * @param params.fromAmount - The token/coin amount in.
   * @param params.toAmount - The token/coin amount out.
   * @param params.routeQuoteTradeContext - The route quote trade context.
   * @param params.deadline - The deadline it expiries unix time.
   * @param params.dexTag The dex tag.
   * @param params.versionTag - The dex version tag.
   */
  abstract encodeTradeDataForExactInput({
    fromAmount,
    toAmount,
    routeQuoteTradeContext,
    deadline,
    dexTag,
    versionTag,
  }: {
    fromAmount: DexNumber
    toAmount: DexNumber
    routeQuoteTradeContext: RouteQuoteTradeContext
    deadline: string
    dexTag: DexTag
    versionTag: VersionTag
  }): string

  /**
   * Generate trade data
   *
   * @param params - The parameters required to generate the trade data.
   * @param params.fromAmount - The token/coin amount in.
   * @param params.toAmount - The token/coin amount out.
   * @param params.routeQuoteTradeContext - The route quote trade context.
   * @param params.deadline - The deadline it expiries unix time.
   * @param params.dexTag - The dex tag.
   * @param params.versionTag - The dex version tag.
   */
  abstract encodeTradeDataForExactOutput({
    fromAmount,
    toAmount,
    routeQuoteTradeContext,
    deadline,
    dexTag,
    versionTag,
  }: {
    fromAmount: DexNumber
    toAmount: DexNumber
    routeQuoteTradeContext: RouteQuoteTradeContext
    deadline: string
    dexTag: DexTag
    versionTag: VersionTag
  }): string

  // ------------------------
  // Pools
  // ------------------------

  /**
   * Retrieves the available token pairs based on the given token and valid pair contexts.
   *
   * @param params - The parameters required to get the pools.
   * @param params.token - The token for which to find available pairs.
   * @param params.validPairContexts - The contexts returned from the contract calls representing valid token pairs.
   * @returns An array of `Pool` objects representing the available token pairs. Will return an empty array if no pairs are found.
   */
  abstract getPools({
    token,
    validPairContexts,
  }: {
    token: Token
    validPairContexts: Record<
      Address,
      ContractResults<any, Record<string, MethodCall<any, any>>>
    >
  }): Pool[]

  // ------------------------
  // Price Impact
  // ------------------------

  /**
   * Executes the main logic to fetch reserves and calculate price impact.
   *
   * @param params - The parameters required to calculate price impact.
   * @param params.tokenAmount - The amount of the input token being traded.
   * @param params.expectedConvertQuote - The expected output amount from the trade.
   * @param params.pairAddresses - The addresses of each pair in the route.
   * @param params.routePathTokens - The tokens involved in the route path.
   * @param params.liquidityProviderFeePercent - The liquidity provider fee as a percentage.
   * @param params.dexTag - The dex tag.
   * @param params.versionTag - The dex version tag.
   * @returns A promise that resolves to the price impact percentage as a string.
   */
  public async getPriceImpact({
    tokenAmount,
    expectedConvertQuote,
    pairAddresses,
    routePathTokens,
    liquidityProviderFeePercent,
    dexTag,
    versionTag,
  }: {
    tokenAmount: DexNumber
    expectedConvertQuote: DexNumber
    pairAddresses: Address[]
    routePathTokens: Token[]
    liquidityProviderFeePercent: number | number[]
    dexTag: DexTag
    versionTag: VersionTag
  }): Promise<PriceImpactInfo> {
    if (!tokenAmount) {
      throw new DexError(
        'Must provide amount to trade',
        ErrorCodes.functionArgumentError,
      )
    }

    if (!expectedConvertQuote) {
      throw new DexError(
        'Must provide expected convert quote',
        ErrorCodes.functionArgumentError,
      )
    }

    assertIsAddresses(pairAddresses)

    const reserves = await this.getPoolReserves({
      pairAddresses,
      dexTag,
      versionTag,
    })

    const priceImpact = await calculatePriceImpact({
      tokenAmount,
      expectedOutputAmount: expectedConvertQuote,
      reserves,
      routePathTokens,
      liquidityProviderFeePercent,
    })

    return priceImpact
  }

  // ------------------------
  // Route Paths
  // ------------------------

  /**
   * Get all possible routes will only go up to 4 due to gas increase the more routes you go.
   */
  abstract prepareRoutePathsCallContext(): Record<
    Address,
    ContractContext<any, Record<string, any>>
  >

  /**
   * Generates all possible trading routes based on the valid pair contexts.
   *
   * This method processes the valid pair contexts obtained from the Multicall
   * results.
   *
   * @param contractCallResults - The results of the Multicall call
   *
   * @returns An array of `RoutePath` objects representing all possible trading routes.
   */
  abstract processRoutePathsCallResults(
    contractCallResults: MulticallResults<
      Record<string, ContractContext<any, Record<string, MethodCall<any, any>>>>
    >,
  ): RoutePathsByDex

  /**
   * Works out every possible route path it can take with the provided pools
   * @param params - The parameters required to find valid route paths.
   * @param params.fromTokenAvailablePools - All pools that include the from token
   * @param params.toTokenAvailablePools - All pools that include the to token
   * @param params.intermediatePools - All pools found from the base tokens
   * @param params.dexTag - The dex tag
   * @param params.versionTag - The version tag
   */
  abstract findValidRoutePathConnections({
    fromTokenAvailablePools,
    toTokenAvailablePools,
    intermediatePools,
    dexTag,
    versionTag,
  }: {
    fromTokenAvailablePools: TokenAvailablePools
    toTokenAvailablePools: TokenAvailablePools
    intermediatePools: TokenAvailablePools[]
    dexTag?: DexTag
    versionTag?: VersionTag
  }): RoutePath[]

  /**
   * Get all possible routes will only go up to 4 due to gas increase the more routes you go.
   */
  public async getRoutePathsByDex(): Promise<RoutePathsByDex> {
    if (
      isWrappingOrUnwrappingCoin({
        fromToken: this._fromToken,
        toToken: this._toToken,
        dexProvider: this._dexProvider,
        customNetwork: this._dexProvider.customNetwork,
      })
    ) {
      // Return the same route context for all dexTags
      const routePathsByDex: RoutePathsByDex = Object.entries(
        this._dexConfigsByDex,
      ).reduce((acc, [dexTag, dexConfig]) => {
        if (!dexConfig.protocols.protocolV2) {
          return acc
        }

        const [versionTag, config] =
          Object.entries(dexConfig.protocols.protocolV2)?.[0] ?? []

        if (!isVersionTag(versionTag) || !config) {
          return acc
        }

        const routeCtx: RoutePath = {
          route: [this._fromToken, this._toToken],
          pairAddresses: [],
          liquidityProviderFeePercent: 0,
          version: getVersionFromVersionTag(versionTag as VersionTag),
          dexTag,
          protocol: this.protocol,
        }

        acc[dexTag as DexTag] = [routeCtx]

        return acc
      }, {} as RoutePathsByDex)

      return routePathsByDex
    }

    const factoryCallContext = this.prepareRoutePathsCallContext()

    const factoryCallResults = await this.dexProvider.call(factoryCallContext)

    const allPossibleRoutes =
      this.processRoutePathsCallResults(factoryCallResults)

    return allPossibleRoutes
  }

  // ------------------------
  // Route Quotes
  // ------------------------

  /**
   * Get all possible routes with the quotes
   *
   * @param params - The parameters required to get route quotes.
   * @param params.tokenAmount The amount to trade
   * @param params.tradeDirection The direction you want to get the quote from
   * @param params.routePathsByDex All possible routes keyed by dex type
   */
  abstract prepareRouteQuotesCallContext({
    tokenAmount,
    tradeDirection,
    routePathsByDex,
  }: {
    tokenAmount: DexNumber
    tradeDirection: TradeDirection
    routePathsByDex: RoutePathsByDex
  }): Record<
    Address,
    ContractContext<any, Record<string, MethodCallUnion<any, any>>>
  >

  /**
   * Build up route quotes from results
   * Expects the ContractCallResults key (reference) to be the DexTag
   *
   * @param params - The parameters required to process route quotes.
   * @param params.tokenAmount The amount to trade
   * @param params.contractCallResults The contract call results
   * @param params.tradeDirection The direction you want to get the quote from
   */
  abstract processRouteQuotesCallResults({
    tokenAmount,
    contractCallResults,
    tradeDirection,
  }: {
    tokenAmount: DexNumber
    contractCallResults: MulticallResults<
      Record<string, ContractContext<any, Record<string, MethodCall<any, any>>>>
    >
    tradeDirection: TradeDirection
  }): RouteQuote[]

  /**
   * Build up the route quote based on the trade path (Token to Token, Coin to Token, or Token to Coin).
   *
   * @param params - The parameters required to build the route quote.
   * @param params.tokenAmount The amount to trade
   * @param params.methodCallResult The call return context
   * @param params.routeContext The route context
   * @param params.tradeDirection The direction you want to get the quote from
   * @param params.dexTag The dex tag
   */
  abstract buildRouteQuote({
    tokenAmount,
    methodCallResult,
    routeContext,
    tradeDirection,
    dexTag,
  }: {
    tokenAmount: DexNumber
    methodCallResult: MethodResult<any, MethodCallUnion<any, any>>
    routeContext: RoutePath
    tradeDirection: TradeDirection
    dexTag: DexTag
  }): RouteQuote

  override async getRouteQuotes({
    tokenAmount,
    tradeDirection = tradeDirectionMap.input,
  }: {
    tokenAmount: DexNumber
    tradeDirection: TradeDirection
  }): Promise<RouteQuote[]> {
    const routePathsByDex = await this.getRoutePathsByDex()

    const isWrapping = isWrappingCoin({
      fromToken: this._fromToken,
      toToken: this._toToken,
      dexProvider: this._dexProvider,
      customNetwork: this._dexProvider.customNetwork,
    })

    const isUnwrapping = isUnwrappingCoin({
      fromToken: this._fromToken,
      toToken: this._toToken,
      dexProvider: this._dexProvider,
      customNetwork: this._dexProvider.customNetwork,
    })

    if (isWrapping || isUnwrapping) {
      // Grab first route context as it doesn't matter which one we use
      const [dexTag, routePaths] = Object.entries(routePathsByDex)[0] ?? []

      assertDexTag(dexTag)

      if (!routePaths || !routePaths.length) {
        throw new DexError(
          'Failed to find route paths for dexTag',
          ErrorCodes.internalError,
        )
      }

      const routeContext = routePaths[0]

      if (!routeContext) {
        throw new DexError(
          'Failed to find route context for dexTag',
          ErrorCodes.internalError,
        )
      }

      const routeQuote = isWrapping
        ? this.buildRouteQuoteForCoinToWrapped({
            tokenAmount,
            routeContext,
            tradeDirection,
          })
        : this.buildRouteQuoteForWrappedToCoin({
            tokenAmount,
            routeContext,
            tradeDirection,
          })

      return [routeQuote]
    }

    const routerOrQuoterCallContexts = this.prepareRouteQuotesCallContext({
      tokenAmount,
      tradeDirection,
      routePathsByDex,
    })

    const contractCallResults = await this.dexProvider.call(
      routerOrQuoterCallContexts,
    )

    return this.processRouteQuotesCallResults({
      tokenAmount,
      contractCallResults,
      tradeDirection,
    })
  }

  /**
   * Get the convert quote unformatted (wei) from the call return context
   *
   * @param params - The parameters required to get the convert quote.
   * @param params.methodCallResult The call return context
   * @param params.tradeDirection The direction you want to get the quote from
   */
  abstract getConvertQuoteUnshifted({
    methodCallResult,
    tradeDirection,
  }: {
    methodCallResult: MethodResult<any, MethodCallUnion<any, any>>
    tradeDirection: TradeDirection
  }): {
    quote: DexNumber
    sqrtPriceX96After?: DexNumber | DexNumber[]
  }

  /**
   * Work out the expected convert quote taking off slippage
   *
   * @param params - The parameters required to get the expected convert quote.
   * @param params.expectedConvertQuote The expected convert quote
   * @param params.tradeDirection The trade direction
   */
  protected getExpectedConvertQuoteOrTokenAmountInMaxWithSlippage({
    expectedConvertQuote,
    tradeDirection,
  }: {
    expectedConvertQuote: DexNumber
    tradeDirection: TradeDirection
  }): DexNumber {
    if (!expectedConvertQuote) {
      throw new DexError(
        'Must provide expected convert quote',
        ErrorCodes.functionArgumentError,
      )
    }

    assertTradeDirection(tradeDirection)

    const decimals =
      tradeDirection === tradeDirectionMap.input
        ? this._toToken.decimals
        : this._fromToken.decimals
    const slippage = this._settings.slippage

    // Apply slippage and round to token decimals

    if (
      tradeDirection === tradeDirectionMap.output &&
      this.protocol === protocolMap.protocolV3
    ) {
      // For output trades in Uniswap V3, we need to ensure the input amount is sufficient to cover the desired output plus slippage. V3's fee structure and precision handling require this extra calculation to avoid underfunding the trade.
      return expectedConvertQuote
        .plus(expectedConvertQuote.times(slippage))
        .decimalPlaces(decimals)
    }

    return expectedConvertQuote
      .minus(expectedConvertQuote.times(slippage))
      .decimalPlaces(decimals)
  }
}
