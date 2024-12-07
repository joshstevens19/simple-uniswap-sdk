import { DexNumber } from '@dex-toolkit/number'
import type { DexProvider } from '@dex-toolkit/provider'
import type {
  BestRouteQuoteContext,
  DexConfigsByDex,
  DexProtocol,
  DexTag,
  DexTransaction,
  InternalTradeContext,
  ObservableTradeContext,
  MultiDexTokenWithAllowanceInfo,
  NativeCurrencyInfo,
  NativeWrappedTokenInfo,
  PoolReserve,
  PriceImpactInfo,
  TradeSubscription,
  RouteQuote,
  Token,
  TradeContext,
  TradeDirection,
  TradeFormat,
  TradeFormatOptions,
  TradeFormatValue,
  TradeFromTokenInfo,
  TradeInternalArgs,
  TradeParams,
  TradePath,
  TradeSettings,
  TradeToTokenInfo,
  Version,
  VersionedRoutePathsByDex,
  VersionTag,
  TradeParamsAmount,
} from '@dex-toolkit/types'
import {
  amountToTradeToDexNumber,
  assertDexConfigBase,
  assertDexTag,
  assertIsAddresses,
  assertProtocol,
  assertToken,
  assertVersion,
  calculateLiquidityProviderFee,
  compareLiquidityProviderFee,
  compareTradeValues,
  defaultTradeSettings,
  DexError,
  ErrorCodes,
  formatTradeContext,
  formatVersionForDisplay,
  getChainConfig,
  getVersionTagFromVersion,
  isAddress,
  isSameAddress,
  isSameVersion,
  isTradeParamsAmount,
  isTradeParamsInput,
  isTradeParamsOutput,
  isTradePathFromCoin,
  isTradePathFromToken,
  isTradePathFromWrappedToken,
  isTradePathSwapping,
  isTradePathToCoin,
  isTradePathToWrappedToken,
  isTradePathWrappingOrUnwrapping,
  MAX_HEX_STRING,
  MIN_HEX_STRING,
  parseDexConfigsByDexFromDexContext,
  populateTradeSettings,
  tradeDirectionMap,
  transformCoinAddressToWrappedAddress,
  transformWrappedTokenToCoin,
} from '@dex-toolkit/utils'
import type { Address } from '@ethereum-multicall/types'
import { ethers } from 'ethers'
import { finalize, Observable, Subject } from 'rxjs'
import { v4 as generateId } from 'uuid'

import { Router } from './router/router'
import { TokenContract } from './token-contract'
import { parseTokenListFromTokenListContext, TokenList } from './token-list'

/**
 * Represents a trading abstraction for DEXs, enabling users to:
 * - Find the best trade routes.
 * - Execute trades.
 * - Fetch detailed trade information.
 *
 * @template TFormat - Specifies the format type for numeric values in class methods.
 */
export class Trade<TFormat extends TradeFormat = 'readable'> {
  /**
   * The token being traded from.
   */
  protected _fromToken: Token

  /**
   * The token being traded to.
   */
  protected _toToken: Token

  /**
   * Information about the native currency on the network.
   */
  protected _nativeCurrencyInfo: NativeCurrencyInfo

  /**
   * Information about the wrapped version of the native currency.
   */
  protected _nativeWrappedTokenInfo: NativeWrappedTokenInfo

  /**
   * Configurations for supported DEXs.
   */
  protected _dexConfigsByDex: DexConfigsByDex

  /**
   * The user's wallet address.
   */
  protected _walletAddress: Address

  /**
   * Provider instance for interacting with the blockchain and DEX.
   */
  protected _dexProvider: DexProvider

  /**
   * Configuration settings for the trade.
   */
  protected _settings: TradeSettings

  /**
   * Contract instance for the "from" token.
   */
  protected _fromTokenContract: TokenContract

  /**
   * Contract instance for the "to" token.
   */
  protected _toTokenContract: TokenContract

  /**
   * Router instance for managing trade paths and operations.
   */
  protected _router: Router<'dexnumber'>

  /**
   * Last block number processed by the trade watcher.
   */
  protected _lastProcessedBlock: number = 0

  /**
   * Flag indicating whether the trade is monitoring new blocks.
   */
  protected _watchingBlocks: boolean = false

  /**
   * Format settings for numeric values.
   */
  protected _format: TradeFormatOptions<TFormat>

  /**
   * Active trade subscriptions.
   */
  protected _subscriptions: Map<string, TradeSubscription<TFormat>> = new Map()

  /**
   * Listener for new block events.
   */
  protected _listener: ethers.providers.Listener

  constructor({
    fromToken,
    toToken,
    walletAddress,
    dexProvider,
    dexContext,
    settings,
    format,
    multiPriceContext,
    tokenListContext,
  }: TradeInternalArgs<TFormat>) {
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
    const { chainId } = this._dexProvider.network

    if (this._dexProvider.customNetwork?.nativeCurrency) {
      this._nativeCurrencyInfo = this._dexProvider.customNetwork.nativeCurrency
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

    if (this._dexProvider.customNetwork?.nativeWrappedTokenInfo) {
      this._nativeWrappedTokenInfo =
        this._dexProvider.customNetwork.nativeWrappedTokenInfo
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
      dexProvider: this._dexProvider,
      tokenListContext,
    })

    this._fromTokenContract = new TokenContract({
      tokenContractAddress: fromToken.contractAddress,
      dexProviderContext: this._dexProvider,
      dexContext,
      tokenList,
      protocolSettings: this._settings.protocolSettings,
    })

    this._toTokenContract = new TokenContract({
      tokenContractAddress: toToken.contractAddress,
      dexProviderContext: this._dexProvider,
      dexContext,
      tokenList,
      protocolSettings: this._settings.protocolSettings,
    })

    this._router = new Router<'dexnumber'>({
      fromToken,
      toToken,
      walletAddress,
      dexProvider,
      dexContext,
      settings: this._settings,
      // format,
      multiPriceContext,
      tokenListContext: tokenList,
    })

    this._format = format ?? { type: 'readable' as TFormat }

    this._listener = (blockNumber) => this.handleNewBlock(blockNumber)
  }

  // ------------------------
  // Getters
  // ------------------------

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
   * Get the from token factory
   */
  public get fromTokenContract(): TokenContract {
    return this._fromTokenContract
  }

  /**
   * Get the to token factory
   */
  public get toTokenContract(): TokenContract {
    return this._toTokenContract
  }

  /**
   * Get the token list factory
   */
  public get tokenList(): TokenList | undefined {
    return this._router.tokensFactory.tokenList
  }

  /**
   * Get the router factory
   */
  public get router(): Router<TFormat> {
    return this._router
  }

  /**
   * Get the dex provider
   */
  public get dexProvider(): DexProvider {
    return this._dexProvider
  }

  /**
   * Retrieves the native wrapped token information for the current network.
   */
  public get nativeWrappedTokenInfo() {
    return this._nativeWrappedTokenInfo
  }

  /**
   * Retrieves the native currency information for the current network.
   */
  public get nativeCurrency(): NativeCurrencyInfo {
    return this._nativeCurrencyInfo
  }

  /**
   * Get the trade path
   */
  public get tradePath(): TradePath {
    return this.router.tradePath
  }

  // ------------------------
  // Route Paths
  // ------------------------

  /**
   * Find the best route rate out of all the route quotes
   *
   * @param params - The parameters required to find the best route quote.
   * @param params.amountToTrade - The amount to trade.
   * @param params.tradeDirection - The direction you want to get the quote from.
   *
   * @returns A promise that resolves to the best route quote.
   */
  public async findBestRouteQuote({
    amountToTrade,
    tradeDirection = tradeDirectionMap.input,
  }: {
    amountToTrade: TradeParamsAmount
    tradeDirection: TradeDirection
  }): Promise<BestRouteQuoteContext> {
    const tokenAmount = amountToTradeToDexNumber({
      fromToken: this.fromToken,
      toToken: this.toToken,
      amountToTrade,
      tradeDirection,
    })

    return this._router.findBestRouteQuote({
      tokenAmount,
      tradeDirection,
    })
  }

  /**
   * Get all possible routes with the quotes
   *
   * @param params - The parameters required to get the route quotes.
   * @param params.amountToTrade - The amount to trade
   * @param params.tradeDirection - The direction you want to get the quote from
   *
   * @returns A promise that resolves to the route quotes.
   */
  public async getRouteQuotes({
    amountToTrade,
    tradeDirection = tradeDirectionMap.input,
  }: {
    amountToTrade: TradeParamsAmount
    tradeDirection: TradeDirection
  }): Promise<RouteQuote[]> {
    const tokenAmount = amountToTradeToDexNumber({
      fromToken: this.fromToken,
      toToken: this.toToken,
      amountToTrade,
      tradeDirection,
    })

    return this._router.getRouteQuotes({
      tokenAmount,
      tradeDirection,
    })
  }

  /**
   * Find all possible routes
   */
  public async getVersionedRoutePathsByDex(): Promise<VersionedRoutePathsByDex> {
    return this._router.getVersionedRoutePathsByDex()
  }

  // ------------------------
  // Balances and Allowances
  // ------------------------

  /**
   * Gets the pool reserves for a given token pair and DEX version.
   *
   * @param params - The parameters required to get the pool reserves.
   * @param params.pairAddresses - The addresses of each pair in the route.
   * @param params.protocol - The protocol of the DEX (v2, v3, etc.).
   * @param params.dexTag - The dex tag.
   * @param params.version - The version.
   *
   * @returns A promise that resolves to an array of tuples containing the reserves of token0 and token1 for each pair.
   */
  public async getPoolReserves({
    pairAddresses,
    protocol,
    dexTag,
    version,
  }: {
    pairAddresses: Address[]
    protocol: DexProtocol
    dexTag: DexTag
    version: Version
  }): Promise<PoolReserve[]> {
    assertIsAddresses(pairAddresses)
    assertProtocol(protocol)
    assertDexTag(dexTag)
    assertVersion(version)

    const versionTag = getVersionTagFromVersion(version)

    return this._router.getPoolReserves({
      pairAddresses,
      protocol,
      dexTag,
      versionTag,
    })
  }

  /**
   * Get the to token balance
   *
   * @param format - The format in which the balance value is returned.
   *
   * @returns A promise that resolves to the balance of the from token.
   */
  public async getFromTokenBalanceOf<TFormatOverride extends TFormat>(
    format?: TradeFormatOptions<TFormatOverride>,
  ): Promise<TradeFormatValue<TFormatOverride>> {
    if (isTradePathFromCoin(this.tradePath)) {
      return this._router.getCoinBalance(format || this._format)
    }

    const tokenBalance = await this._fromTokenContract.balanceOf({
      walletAddress: this._walletAddress,
      format: format || this._format,
    })

    return tokenBalance
  }

  /**
   * Get the to token balance
   *
   * @param format - The format in which the balance value is returned.
   *
   * @returns A promise that resolves to the balance of the to token.
   */
  public async getToTokenBalanceOf<TFormatOverride extends TFormat>(
    format?: TradeFormatOptions<TFormatOverride>,
  ): Promise<TradeFormatValue<TFormatOverride>> {
    if (isTradePathToCoin(this.tradePath)) {
      return this._router.getCoinBalance(format || this._format)
    }

    return this._toTokenContract.balanceOf({
      walletAddress: this._walletAddress,
      format: format || this._format,
    })
  }

  /**
   * Get the allowance for the amount which can be moved from the `fromToken` on the users behalf.
   *
   * @param params - The parameters required to get the allowance.
   * @param params.dexTag - The dex tag.
   * @param params.protocol - The protocol of the DEX (v2, v3, etc.).
   * @param params.versionTag - The version tag.
   * @param params.format - The format in which the allowance value is returned.
   *
   * @returns A promise that resolves to the allowance.
   */
  public async getFromTokenRouterAllowance<TFormatOverride extends TFormat>({
    dexTag,
    protocol,
    versionTag,
    format,
  }: {
    dexTag: DexTag
    protocol: DexProtocol
    versionTag: VersionTag
    format?: TradeFormatOptions<TFormatOverride>
  }): Promise<TradeFormatValue<TFormatOverride>> {
    if (isTradePathFromCoin(this.tradePath)) {
      return DexNumber.fromShifted(
        MAX_HEX_STRING,
        this._fromToken.decimals,
      ).toTradeFormat(format || this._format)
    }

    const allowance = await this._fromTokenContract.allowanceForRouter({
      dexTag,
      protocol,
      versionTag,
      walletAddress: this._walletAddress,
      format: format || this._format,
    })

    return allowance
  }

  /**
   * Get the allowance for the amount which can be moved from the `toToken` on the users behalf.
   *
   * @param params - The parameters required to get the allowance.
   * @param params.dexTag - The dex tag.
   * @param params.protocol - The protocol of the DEX (v2, v3, etc.).
   * @param params.versionTag - The version tag.
   * @param params.format - The format in which the allowance value is returned.
   *
   * @returns A promise that resolves to the allowance.
   */
  public async getToTokenRouterAllowance<TFormatOverride extends TFormat>({
    dexTag,
    protocol,
    versionTag,
    format,
  }: {
    dexTag: DexTag
    protocol: DexProtocol
    versionTag: VersionTag
    format?: TradeFormatOptions<TFormatOverride>
  }): Promise<TradeFormatValue<TFormat>> {
    if (isTradePathFromCoin(this.tradePath)) {
      return DexNumber.fromShifted(
        MAX_HEX_STRING,
        this._toToken.decimals,
      ).toTradeFormat(format || this._format)
    }

    const allowance = await this._toTokenContract.allowanceForRouter({
      dexTag,
      protocol,
      versionTag,
      walletAddress: this._walletAddress,
      format: format || this._format,
    })

    return allowance
  }

  /**
   * Get the allowance and balance for the from token
   *
   * @param format - The format in which the allowance and balance values are returned.
   *
   * @returns A promise that resolves to an object containing the allowance and balance information for the from token.
   */
  public async getFromTokenBalanceAndRouterAllowance<
    TFormatOverride extends TFormat,
  >(
    format?: TradeFormatOptions<TFormatOverride>,
  ): Promise<MultiDexTokenWithAllowanceInfo<TFormatOverride>> {
    return this._fromTokenContract.getAllowancesAndBalanceOf({
      walletAddress: this._walletAddress,
      format: format || this._format,
    })
  }

  /**
   * Get the allowance and balance for to from token
   *
   * @param format - The format in which the allowance and balance values are returned.
   *
   * @returns A promise that resolves to an object containing the allowance and balance information for the to token.
   */
  public async getToTokenBalanceAndRouterAllowance<
    TFormatOverride extends TFormat,
  >(
    format?: TradeFormatOptions<TFormatOverride>,
  ): Promise<MultiDexTokenWithAllowanceInfo<TFormatOverride>> {
    return this._toTokenContract.getAllowancesAndBalanceOf({
      walletAddress: this._walletAddress,
      format: format || this._format,
    })
  }

  /**
   * Generates transaction data to approve maximum allowance for a router to move tokens.
   *
   * @param params - Configuration parameters
   * @param params.dexTag - The DEX identifier
   * @param params.protocol - The protocol version (v2, v3)
   * @param params.version - The specific version configuration
   * @param params.amount - The amount to approve. If not provided, the maximum amount will be used.
   *
   * @returns Promise resolving to transaction data for approval
   *
   * @throws {DexError}
   * - If approval is not needed (e.g., for native coins)
   * - If DEX configuration is missing or invalid
   * - If router configuration is not found
   * - If token configuration is invalid
   */
  public async generateApproveRouterAllowanceTransaction({
    dexTag,
    protocol,
    version,
    amount,
  }: {
    dexTag: DexTag
    protocol: DexProtocol
    version: Version
    amount?: string
  }): Promise<DexTransaction> {
    if (isTradePathFromCoin(this.tradePath)) {
      throw new DexError(
        'Approval not required for native coin trades',
        ErrorCodes.generateApproveRouterAllowanceTransactionNotAllowed,
        { tradePath: this.tradePath },
      )
    }

    assertDexTag(dexTag)
    assertProtocol(protocol)
    assertVersion(version)
    assertToken(this.fromToken)

    const dexConfig = this._dexConfigsByDex[dexTag]
    assertDexConfigBase(dexConfig)

    const protocolDetails = dexConfig.protocols[protocol]
    if (!protocolDetails) {
      throw new DexError(
        `Protocol ${protocol} not supported for ${dexTag}`,
        ErrorCodes.protocolNotSupported,
        { dexTag, protocol },
      )
    }

    const versionTag = getVersionTagFromVersion(version)
    const versionDetails = protocolDetails[versionTag]
    if (!versionDetails) {
      throw new DexError(
        `Version ${formatVersionForDisplay(version)} not supported for ${dexTag} ${protocol}`,
        ErrorCodes.versionNotSupported,
        { dexTag, protocol, version: formatVersionForDisplay(version) },
      )
    }

    const contractDetail = versionDetails.router
    if (!contractDetail || !isAddress(contractDetail.address)) {
      throw new DexError(
        `Invalid router configuration for ${dexTag} ${protocol} ${formatVersionForDisplay(version)}`,
        ErrorCodes.contractDetailsNotFound,
        {
          dexTag,
          protocol,
          version: formatVersionForDisplay(version),
          routerAddress: contractDetail?.address,
        },
      )
    }

    try {
      const approvalAmount = amount
        ? DexNumber.fromUnshifted(amount, this.fromToken.decimals)
        : DexNumber.fromShifted(MAX_HEX_STRING, this.fromToken.decimals)

      const approvalData = this._fromTokenContract.encodeApproveAllowanceData({
        spender: contractDetail.address,
        amount: approvalAmount,
      })

      if (!approvalData) {
        throw new DexError(
          'Failed to generate approval data',
          ErrorCodes.internalError,
        )
      }

      return {
        to: this.fromToken.contractAddress,
        from: this._walletAddress,
        data: approvalData,
        value: MIN_HEX_STRING,
      }
    } catch (error) {
      throw new DexError(
        'Failed to generate approval transaction',
        ErrorCodes.internalError,
        {
          dexTag,
          protocol,
          version: formatVersionForDisplay(version),
          error: error instanceof Error ? error.message : 'Unknown error',
          tokenAddress: this.fromToken.contractAddress,
          routerAddress: contractDetail.address,
        },
      )
    }
  }

  // ------------------------
  // Trade Context Generation
  // ------------------------

  /**
   * Generates a swap quote between two tokens.
   *
   * @param params - The parameters required to generate the quote.
   *
   * @returns A promise that resolves to a `TradeContext` object containing detailed information about the trade, including the route taken, expected output, fees, and transaction data required to execute the trade.
   *
   * @throws If any required parameter is missing or invalid, or if the trade path is not supported.
   */
  public async quote(params: TradeParams): Promise<TradeContext<TFormat>> {
    // Determine the trade direction and amount to trade based on type guards
    const tradeDirection = isTradeParamsInput(params)
      ? 'input'
      : isTradeParamsOutput(params)
        ? 'output'
        : 'input'

    const amountToTrade = isTradeParamsAmount(params)
      ? params
      : isTradeParamsInput(params)
        ? params.fromAmount
        : isTradeParamsOutput(params)
          ? params.toAmount
          : ''

    // Convert the amount to the appropriate token amount format
    const tokenAmount = amountToTradeToDexNumber({
      fromToken: this.fromToken,
      toToken: this.toToken,
      amountToTrade,
      tradeDirection,
    })

    // Generate trade context and return it with additional utilities
    const context = await this.generateContext({
      tokenAmount,
      tradeDirection,
    })

    return {
      ...formatTradeContext(context, this._format),
      ...this.createObservable(context),
      execute: this.createExecuteFunction(context),
    }
  }

  /**
   * Generate the trade context based on the trade path and direction.
   *
   * @param params - The parameters required to generate the trade context.
   * @param params.id - The quote ID.
   * @param params.tradeDirection - The direction of the trade (input or output).
   * @param params.tokenAmount - The amount of tokens to be traded.
   *
   * @returns A promise that resolves to the TradeContext.
   *
   * @throws DexError if the trade path is not supported or if the trade context could not be generated.
   */
  protected async generateContext({
    id,
    tradeDirection,
    tokenAmount,
  }: {
    id?: string
    tradeDirection: TradeDirection
    tokenAmount: DexNumber
  }): Promise<InternalTradeContext<'dexnumber'>> {
    let tradeContext: InternalTradeContext<'dexnumber'> | undefined

    const quoteId = id || generateId()

    if (isTradePathSwapping(this.tradePath)) {
      tradeContext = await this.generateContextForSwap({
        id: quoteId,
        tokenAmount,
        tradeDirection,
      })
    } else if (isTradePathWrappingOrUnwrapping(this.tradePath)) {
      tradeContext = await this.generateContextForWrapOrUnwrap({
        id: quoteId,
        baseConvertRequest: tokenAmount,
      })
    } else {
      throw new DexError(
        `Trade path ${this.tradePath} is not supported`,
        ErrorCodes.tradePathIsNotSupported,
      )
    }

    if (!tradeContext) {
      throw new DexError(
        `Trade context not found for ${this.tradePath}`,
        ErrorCodes.tradePathIsNotSupported,
      )
    }

    // Return trade context without setting up observable
    return tradeContext
  }

  /**
   * Generate the trade context for a swap operation.
   *
   * @param params - The parameters required to generate the trade context for swap.
   * @param params.id - The quote id.
   * @param params.tradeDirection - The direction of the trade (input or output).
   * @param params.tokenAmount - The amount to be converted in the trade.
   *
   * @returns A promise that resolves to the TradeContext.
   *
   * @throws DexError if the trade path is not supported.
   */
  protected async generateContextForSwap({
    id,
    tradeDirection,
    tokenAmount,
  }: {
    id: string
    tradeDirection: TradeDirection
    tokenAmount: DexNumber
  }): Promise<InternalTradeContext<'dexnumber'>> {
    const {
      bestRouteQuote,
      allowance,
      hasEnoughAllowance,
      isMaxAllowance,
      fromBalance,
      fromValue,
      hasEnoughBalance,
      toBalance,
      toValue,
      attemptedRouteQuotes,
    } = await this._router.findBestRouteQuote({
      tokenAmount,
      tradeDirection,
    })

    const {
      dexTag,
      protocol,
      version,
      expectedConvertQuote,
      expectedConvertQuoteOrTokenAmountInMaxWithSlippage,
      liquidityProviderFeePercent,
      tradeExpires,
      routePathTokens,
      routePathText,
      routePathAddresses,
      pairAddresses,
      transaction,
      gasPriceEstimatedBy,
    } = bestRouteQuote

    assertDexTag(dexTag)
    assertProtocol(protocol)
    assertVersion(version)

    let approvalTransaction: DexTransaction | undefined

    if (!hasEnoughAllowance && isTradePathFromToken(this.tradePath)) {
      approvalTransaction =
        await this.generateApproveRouterAllowanceTransaction({
          dexTag,
          protocol,
          version,
          amount: this._settings.approveMax
            ? undefined
            : tokenAmount
                .multipliedBy(
                  this._settings?.approvalBufferFactor ??
                    defaultTradeSettings.approvalBufferFactor,
                )
                .toHexString(),
        })
    }

    const calculatedLiquidityProviderFee = calculateLiquidityProviderFee({
      tradeDirection,
      baseConvertRequest: tokenAmount,
      expectedConvertQuote,
      liquidityProviderFeePercent,
      fromTokenDecimals: this.fromToken.decimals,
    })

    const fromTokenInfo: TradeFromTokenInfo<'dexnumber'> = {
      token: isTradePathFromCoin(this.tradePath)
        ? transformWrappedTokenToCoin(this.fromToken, this._nativeCurrencyInfo)
        : this.fromToken,
      balance: fromBalance,
      hasEnoughBalance,
      allowance,
      hasEnoughAllowance,
      isMaxAllowance,
      value: fromValue,
    }

    const toTokenInfo: TradeToTokenInfo<'dexnumber'> = {
      token: isTradePathToCoin(this.tradePath)
        ? transformWrappedTokenToCoin(this.toToken, this._nativeCurrencyInfo)
        : this.toToken,
      balance: toBalance,
      value: toValue,
    }

    let priceImpact: PriceImpactInfo | undefined

    if (!this._settings.disablePriceImpact) {
      priceImpact = await this._router.getPriceImpact({
        tokenAmount,
        expectedConvertQuote,
        routePathTokens,
        pairAddresses,
        liquidityProviderFeePercent,
        protocol,
        dexTag,
        version,
      })
    }

    const tradeContext: InternalTradeContext<'dexnumber'> = {
      id,
      dexTag,
      protocol,
      version,
      tradeDirection,
      baseConvertRequest: tokenAmount,
      minAmountConvertQuote:
        tradeDirection === tradeDirectionMap.input
          ? expectedConvertQuoteOrTokenAmountInMaxWithSlippage
          : undefined,
      maximumSent:
        tradeDirection === tradeDirectionMap.input
          ? undefined
          : expectedConvertQuoteOrTokenAmountInMaxWithSlippage,
      expectedConvertQuote,
      liquidityProviderFee: calculatedLiquidityProviderFee,
      liquidityProviderFeePercent,
      tradeExpires,
      routePathTokens,
      routePathText,
      routePathAddresses: routePathAddresses.map((r: string) =>
        transformCoinAddressToWrappedAddress(r),
      ),
      pairAddresses,
      priceImpact,
      approvalTransaction,
      toTokenInfo,
      fromTokenInfo,
      transaction,
      gasPriceEstimatedBy: gasPriceEstimatedBy
        ? gasPriceEstimatedBy
        : undefined,
      attemptedRouteQuotes,
    }

    return tradeContext
  }

  /**
   * Generate the trade context for a wrap or unwrap operation.
   *
   * @param params - The parameters required to generate the trade context for wrap or unwrap.
   * @param params.baseConvertRequest - The amount to be wrapped or unwrapped.
   * @param params.id - The quote id.
   *
   * @returns A promise that resolves to the TradeContext.
   * @throws DexError if the trade path is not supported.
   */
  protected async generateContextForWrapOrUnwrap({
    baseConvertRequest,
    id,
  }: {
    baseConvertRequest: DexNumber
    id: string
  }): Promise<InternalTradeContext<'dexnumber'>> {
    const {
      bestRouteQuote,
      allowance,
      hasEnoughAllowance,
      isMaxAllowance,
      fromBalance,
      fromValue,
      hasEnoughBalance,
      toBalance,
      toValue,
      attemptedRouteQuotes,
    } = await this._router.findBestRouteQuote({
      tokenAmount: baseConvertRequest,
      tradeDirection: tradeDirectionMap.input,
    })

    const {
      dexTag,
      protocol,
      version,
      tradeDirection,
      expectedConvertQuote,
      expectedConvertQuoteOrTokenAmountInMaxWithSlippage,
      tradeExpires,
      routePathTokens,
      routePathText,
      routePathAddresses,
      pairAddresses,
      transaction,
      gasPriceEstimatedBy,
    } = bestRouteQuote

    const fromTokenInfo: TradeFromTokenInfo<'dexnumber'> = {
      token: isTradePathToWrappedToken(this.tradePath)
        ? transformWrappedTokenToCoin(this._fromToken, this._nativeCurrencyInfo)
        : this._fromToken,
      balance: fromBalance,
      hasEnoughBalance,
      allowance,
      hasEnoughAllowance,
      isMaxAllowance,
      value: fromValue,
    }

    const toTokenInfo: TradeToTokenInfo<'dexnumber'> = {
      token: isTradePathFromWrappedToken(this.tradePath)
        ? transformWrappedTokenToCoin(this._toToken, this._nativeCurrencyInfo)
        : this._toToken,
      balance: toBalance,
      value: toValue,
    }

    const tradeContext: InternalTradeContext<'dexnumber'> = {
      id,
      dexTag,
      protocol,
      version,
      tradeDirection,
      baseConvertRequest,
      minAmountConvertQuote: expectedConvertQuoteOrTokenAmountInMaxWithSlippage,
      maximumSent: expectedConvertQuoteOrTokenAmountInMaxWithSlippage,
      expectedConvertQuote,
      tradeExpires,
      routePathTokens,
      routePathText,
      routePathAddresses,
      pairAddresses,
      attemptedRouteQuotes,
      approvalTransaction: undefined,
      fromTokenInfo,
      toTokenInfo,
      transaction,
      gasPriceEstimatedBy: gasPriceEstimatedBy
        ? gasPriceEstimatedBy
        : undefined,
    }

    return tradeContext
  }

  // ------------------------
  // Trade Watcher (Block Listener)
  // ------------------------

  /**
   * Manually triggers a requote for a specific subscription.
   * This allows forcing an update of liquidity quotes outside the normal block-based update cycle.
   *
   * @param id - The unique identifier of the subscription to requote
   * @param currentBlockNumber - Optional current block number to include in the update
   *
   * @throws {DexError} If the subscription cannot be processed
   *
   * @example
   * ```typescript
   * // Force an immediate requote for a specific subscription
   * await liquidity.requote("subscription-123", 15372648);
   * ```
   */
  public async requote(id: string, currentBlockNumber?: number): Promise<void> {
    const subscription = this._subscriptions.get(id)

    if (subscription?.isActive) {
      await this.processSubscriptionUpdate(subscription, currentBlockNumber)
    }
  }

  /**
   * Starts watching for new blocks on the blockchain.
   * This sets up an event listener for block updates and manages the watching state.
   * Only starts watching if not already watching blocks.
   *
   * @remarks
   * This is an internal mechanism used to trigger quote updates based on new blocks.
   * The watcher is automatically managed based on active subscriptions.
   */
  protected watchBlocks(): void {
    if (!this._watchingBlocks) {
      this._dexProvider.provider.on('block', this._listener)
      this._watchingBlocks = true
      this._lastProcessedBlock = 0
    }
  }

  /**
   * Stops watching for new blocks on the blockchain.
   * This removes the block event listener and updates the watching state.
   * Only stops watching if currently watching blocks.
   *
   * @remarks
   * This is automatically called when there are no more active subscriptions
   * to prevent unnecessary block processing.
   */
  protected unwatchBlocks(): void {
    if (this._watchingBlocks) {
      this._dexProvider.provider.off('block', this._listener)
      this._watchingBlocks = false
      this._lastProcessedBlock = 0
    }
  }

  /**
   * Sets up a subscription for trade quote updates.
   * Creates a new subscription entry with the provided subject and context,
   * and starts block watching if needed.
   *
   * @param params - The subscription setup parameters
   *
   * @remarks
   * The context is cloned to prevent external modifications affecting the internal state.
   * Block watching is started unless explicitly disabled in settings.
   */
  protected setupTradeSubscription({
    subject,
    context,
  }: Omit<TradeSubscription<TFormat>, 'isActive'>): void {
    const {
      id,
      dexTag,
      protocol,
      version,
      tradeDirection,
      baseConvertRequest,
      expectedConvertQuote,
      liquidityProviderFeePercent,
      tradeExpires,
      priceImpact,
      pairAddresses,
      routePathTokens,
      routePathText,
      routePathAddresses,
      attemptedRouteQuotes,
      fromTokenInfo,
      toTokenInfo,
      transaction,
    } = context

    const { hasEnoughBalance, hasEnoughAllowance, isMaxAllowance } =
      fromTokenInfo

    if (hasEnoughAllowance === undefined) {
      throw new DexError(
        'hasEnoughAllowance is missing in fromTokenInfo for trade',
        ErrorCodes.internalError,
      )
    }

    if (hasEnoughBalance === undefined) {
      throw new DexError(
        'hasEnoughBalance is missing in fromTokenInfo for trade',
        ErrorCodes.internalError,
      )
    }

    const clonedContext = {
      ...structuredClone({
        id,
        dexTag,
        protocol,
        version,
        tradeDirection,
        liquidityProviderFeePercent,
        tradeExpires,
        priceImpact,
        pairAddresses,
        hasEnoughBalance,
        hasEnoughAllowance,
        isMaxAllowance,
        fromTokenAddress: fromTokenInfo.token.contractAddress,
        toTokenAddress: toTokenInfo.token.contractAddress,
        routePathTokens,
        routePathText,
        routePathAddresses,
        attemptedRouteQuotes,
        fromTokenInfo,
        toTokenInfo,
        transaction,
      }),
      // DexNumber shouldn't be cloned with structuredClone
      baseConvertRequest: baseConvertRequest.clone(),
      expectedConvertQuote: expectedConvertQuote.clone(),
    }

    this._subscriptions.set(id, {
      subject,
      context: clonedContext,
      isActive: true,
    })

    if (!this._watchingBlocks && !this._settings.disableObserver) {
      this.watchBlocks()
    }
  }

  /**
   * Creates an observable for liquidity quote updates with proper cleanup handling.
   * Sets up the subscription and returns an observable that will emit quote updates,
   * along with an unsubscribe function for manual cleanup.
   *
   * @param context - The initial liquidity context in DexNumber format
   * @returns An object containing:
   * - observer$: The Observable that emits quote updates
   * - unsubscribe: Function to manually clean up the subscription
   *
   * @remarks
   * The observable automatically handles cleanup when unsubscribed using RxJS finalize operator.
   * The context is maintained internally in DexNumber format for accurate comparisons.
   */
  protected createObservable(context: InternalTradeContext<'dexnumber'>): {
    observer$: Observable<ObservableTradeContext<TFormat>>
    unsubscribe: () => void
  } {
    const subject = new Subject<ObservableTradeContext<TFormat>>()

    // Set up subscription with DexNumber format internally
    this.setupTradeSubscription({ subject, context })

    return {
      observer$: subject.pipe(
        finalize(() => {
          this.cleanupTradeSubscription(context.id)
        }),
      ),
      unsubscribe: () => {
        this.cleanupTradeSubscription(context.id)
      },
    }
  }

  /**
   * Creates a function to execute the trade operation.
   * This function handles approvals and main transactions, returning the receipts of each.
   *
   * @param context - The trade context to execute
   * @returns A function that executes the trade operation
   */
  protected createExecuteFunction(context: InternalTradeContext<'dexnumber'>):
    | undefined
    | (({
        approvalConfirmations,
        transactionConfirmations,
      }: {
        approvalConfirmations?: number
        transactionConfirmations?: number
      }) => Promise<{
        approvalReceipt?: ethers.ContractReceipt
        transactionReceipt?: ethers.ContractReceipt
      }>) {
    if (!this._dexProvider.signer) {
      return undefined
    }

    return async ({
      approvalConfirmations = 1,
      transactionConfirmations = 1,
    }: {
      approvalConfirmations?: number
      transactionConfirmations?: number
    }) => {
      if (!this._dexProvider.signer) {
        throw new DexError(
          'No signer available. Must provide a signer via dexProvider to execute transactions.',
          ErrorCodes.functionArgumentError,
        )
      }

      // Get the latest subscription data if it exists
      const subscription = this._subscriptions.get(context.id)
      const latestContext = subscription?.context ?? context

      const results: {
        approvalReceipt?: ethers.ContractReceipt
        transactionReceipt?: ethers.ContractReceipt
      } = {}

      try {
        if (latestContext.approvalTransaction) {
          const response = await this._dexProvider.signer.sendTransaction(
            latestContext.approvalTransaction,
          )
          results.approvalReceipt = await response.wait(approvalConfirmations)
        }

        if (latestContext.transaction) {
          const response = await this._dexProvider.signer.sendTransaction(
            latestContext.transaction,
          )
          results.transactionReceipt = await response.wait(
            transactionConfirmations,
          )
        } else {
          throw new DexError(
            'No trade transaction available to execute',
            ErrorCodes.internalError,
          )
        }

        return results
      } catch (error) {
        throw new DexError(
          'Failed to execute trade transaction',
          ErrorCodes.transactionError,
          {
            context: {
              tradeDirection: latestContext.tradeDirection,
              dexTag: latestContext.dexTag,
              protocol: latestContext.protocol,
            },
          },
          error instanceof Error ? error : undefined,
        )
      }
    }
  }

  /**
   * Cleans up a subscription and its resources.
   * Completes the subject, removes the subscription from tracking,
   * and stops block watching if no more active subscriptions exist.
   *
   * @param id - The unique identifier of the subscription to clean up
   *
   * @remarks
   * This is called automatically when:
   * - The observable is unsubscribed
   * - The unsubscribe function is called manually
   * - The subscription is invalidated
   */
  protected cleanupTradeSubscription(id: string): void {
    const subscription = this._subscriptions.get(id)
    if (subscription) {
      subscription.isActive = false
      subscription.subject.complete()
      this._subscriptions.delete(id)
    }

    // If no more active subscriptions, stop watching blocks
    if (!Array.from(this._subscriptions.values()).some((sub) => sub.isActive)) {
      this.unwatchBlocks()
    }
  }

  /**
   * Retrieves the RxJS Subject for a specific quote subscription.
   *
   * @param id - The unique identifier of the subscription
   * @returns The Subject associated with the subscription
   * @throws {DexError} If the subscription is not found
   *
   * @remarks
   * This should never throw in normal operation as subscriptions are created
   * before they're accessed. If it throws, it indicates an internal state issue.
   */
  protected getTradeSubscription(
    id: string,
  ): TradeSubscription<TFormat>['subject'] {
    const subscription = this._subscriptions.get(id)

    if (!subscription) {
      throw new DexError(
        'Quote subscription not found',
        ErrorCodes.internalError,
        { id },
      )
    }

    return subscription.subject
  }

  /**
   * Destroys and cleans up all active subscriptions.
   * This provides a way to completely shut down all quote monitoring and free associated resources.
   *
   * @remarks
   * This method:
   * - Completes all subscription subjects
   * - Removes all subscriptions from tracking
   * - Stops the block watcher
   * - Clears all internal subscription state
   */
  public destroy(): void {
    // Complete and clean up all subscriptions
    for (const [id] of this._subscriptions) {
      this.cleanupTradeSubscription(id)
    }

    this._subscriptions.clear()
    this.unwatchBlocks()
  }

  /**
   * Processes an update for a single subscription, generating and emitting new quotes if needed.
   * This is the core update mechanism that generates new liquidity quotes when conditions change.
   *
   * @param subscription - The subscription to process
   * @param currentBlockNumber - Optional block number for the update
   *
   * @remarks
   * The process includes:
   * 1. Checking if the subscription is still active and observed
   * 2. Generating a new context with current data
   * 3. Comparing with previous context to detect changes
   * 4. Formatting and emitting updates if changes are detected
   *
   * The context is maintained in DexNumber format internally for accurate comparisons,
   * but formatted to the user's chosen format before emission.
   *
   * @throws {DexError} If there's an error generating or processing the new context
   */
  protected async processSubscriptionUpdate(
    subscription: TradeSubscription<TFormat>,
    currentBlockNumber?: number,
  ): Promise<void> {
    if (!subscription.isActive || !subscription.subject.observed) {
      subscription.isActive = false
      return
    }

    const { subject, context } = subscription
    const {
      id,
      dexTag,
      protocol,
      version,
      tradeDirection,
      fromTokenInfo,
      toTokenInfo,
      baseConvertRequest,
      expectedConvertQuote,
      liquidityProviderFeePercent,
      priceImpact,
    } = context

    // Generate the updated trade context without creating a new observable
    const newContext = await this.generateContext({
      id,
      tokenAmount: baseConvertRequest,
      tradeDirection,
    })

    const isSameDexTag = newContext.dexTag === dexTag
    const isSameProtocol = newContext.protocol === protocol
    const sameVersion = isSameVersion(newContext.version, version)

    const transactionFilter =
      isSameAddress(
        newContext.fromTokenInfo.token.contractAddress,
        fromTokenInfo.token.contractAddress,
      ) &&
      isSameAddress(
        newContext.toTokenInfo.token.contractAddress,
        toTokenInfo.token.contractAddress,
      ) &&
      newContext.transaction.from &&
      isSameAddress(newContext.transaction.from, this._walletAddress)

    if (!transactionFilter) {
      return
    }

    const isBaseConvertRequestSame = compareTradeValues(
      baseConvertRequest,
      newContext.baseConvertRequest,
    )

    const isExpectedConvertQuoteSame = compareTradeValues(
      expectedConvertQuote,
      newContext.expectedConvertQuote,
    )

    const isLiquidityProviderFeeTheSame = compareLiquidityProviderFee(
      liquidityProviderFeePercent ?? 0,
      newContext.liquidityProviderFeePercent,
    )

    const isPriceImpactTheSame = newContext.priceImpact === priceImpact

    if (
      !isSameDexTag ||
      !isSameProtocol ||
      !sameVersion ||
      !isBaseConvertRequestSame ||
      !isExpectedConvertQuoteSame ||
      !isLiquidityProviderFeeTheSame ||
      !isPriceImpactTheSame
    ) {
      subject.next({
        blockNumber: currentBlockNumber,
        latestQuote: formatTradeContext(newContext, this._format),
      })
    }
  }

  /**
   * Handles updates when a new block is mined on the blockchain.
   * This is the main entry point for processing subscription updates based on new blocks.
   *
   * @param currentBlockNumber - The number of the new block
   *
   * @remarks
   * The handler includes several optimizations:
   * - Skips processing if there are no active subscriptions
   * - Supports block skipping to reduce update frequency (configured via settings)
   * - Only processes active subscriptions
   * - Processes all active subscriptions in parallel
   *
   * Block skipping behavior:
   * - If observerBlockSkip > 0, updates only occur every N blocks
   * - This helps reduce processing load for applications that don't need
   *   updates on every block
   *
   * Error handling:
   * - Throws if there's an error processing the block
   * - Automatically cleans up block watching if no active subscriptions remain
   *
   * @throws {DexError} If there's an error processing subscription updates
   */
  protected async handleNewBlock(currentBlockNumber: number): Promise<void> {
    // If no active subscriptions, don't process
    if (!this._subscriptions.size) {
      return
    }

    try {
      if (this._settings.observerBlockSkip > 0) {
        // Only process if enough blocks have passed
        if (
          this._lastProcessedBlock === 0 ||
          currentBlockNumber >=
            this._lastProcessedBlock + this._settings.observerBlockSkip
        ) {
          this._lastProcessedBlock = currentBlockNumber
        } else {
          // Skip this block
          return
        }
      }

      // Only process active subscriptions
      const activeSubscriptions = Array.from(
        this._subscriptions.entries(),
      ).filter(([, sub]) => sub.isActive)

      await Promise.all(
        activeSubscriptions.map(([, subscription]) =>
          this.processSubscriptionUpdate(subscription),
        ),
      )
    } catch (error) {
      throw new DexError(
        'Error processing new block',
        ErrorCodes.internalError,
        error as Error,
      )
    }

    // Clean up if no active subscriptions
    if (!Array.from(this._subscriptions.values()).some((sub) => sub.isActive)) {
      this.unwatchBlocks()
    }
  }
}
