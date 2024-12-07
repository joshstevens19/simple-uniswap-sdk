import { DexNumber } from '@dex-toolkit/number'
import { DexProvider } from '@dex-toolkit/provider'
import type {
  Token,
  TokenBalanceInfo,
  MultiPriceContext,
  NativeCurrencyInfo,
  DexConfigsByDex,
  NativeWrappedTokenInfo,
  TradeFormat,
  TradeFormatValue,
  LiquiditySettings,
  LiquidityInternalArgs,
  TradeFormatOptions,
  DexTag,
  DexProtocol,
  Version,
  DexTransaction,
  TokenAllowanceInfo,
} from '@dex-toolkit/types'
import {
  DexError,
  ErrorCodes,
  getChainConfig,
  populateTradeSettings,
  defaultMultiPriceContext,
  fetchAndCalculateFiatPrices,
  parseDexConfigsByDexFromDexContext,
  assertToken,
  assertIsAddress,
  assertDexTag,
  assertProtocol,
  assertVersion,
  formatVersionForDisplay,
  isCoinAddress,
  getVersionTagFromVersion,
  isAddress,
  MAX_HEX_STRING,
  MIN_HEX_STRING,
} from '@dex-toolkit/utils'
import type { Address } from '@ethereum-multicall/types'

import { TokenContract } from '../token-contract'
import { parseTokenListFromTokenListContext, TokenList } from '../token-list'
import { Tokens } from '../tokens'

/**
 * Arguments required to initialize a liquidity protocol instance.
 *
 * @template TFormat - The trade format type.
 */
export type LiquidityProtocolArgs<TFormat extends TradeFormat> =
  LiquidityInternalArgs<TFormat> & {
    /**
     * Optional token contract for the "from" token.
     */
    tokenAContract?: TokenContract

    /**
     * Optional token contract for the "to" token.
     */
    tokenBContract?: TokenContract

    /**
     * Optional `Tokens` factory for managing token-related operations.
     */
    tokens?: Tokens
  }

/**
 * Abstract class for managing liquidity-related operations in a decentralized exchange (DEX).
 *
 * @template TFormat - The trade format type.
 */
export abstract class LiquidityAbstract<TFormat extends TradeFormat> {
  /**
   * The wallet address associated with the liquidity operations.
   */
  protected _walletAddress: Address

  /**
   * The "from" token in liquidity operations.
   */
  protected _tokenA: Token

  /**
   * The "to" token in liquidity operations.
   */
  protected _tokenB: Token

  /**
   * The contract instance for the "from" token.
   */
  protected _tokenAContract: TokenContract

  /**
   * The contract instance for the "to" token.
   */
  protected _tokenBContract: TokenContract

  /**
   * Information about the native currency for the current network.
   */
  protected _nativeCurrencyInfo: NativeCurrencyInfo

  /**
   * Information about the wrapped native token for the current network.
   */
  protected _nativeWrappedTokenInfo: NativeWrappedTokenInfo

  /**
   * The DEX provider for managing blockchain interactions.
   */
  protected _dexProvider: DexProvider

  /**
   * Configuration settings for liquidity operations.
   */
  protected _settings: LiquiditySettings

  /**
   * DEX configurations indexed by DEX tag.
   */
  protected _dexConfigsByDex: DexConfigsByDex

  /**
   * Context for handling multiple price-related operations.
   */
  protected _multiPriceContext: MultiPriceContext

  /**
   * Factory for managing token-related operations.
   */
  protected _tokens: Tokens

  /**
   * Initializes a new instance of the `LiquidityAbstract` class.
   *
   * @param params - The parameters required to initialize the instance.
   */
  constructor({
    tokenA,
    tokenAContract,
    tokenB,
    tokenBContract,
    dexProvider,
    walletAddress,
    settings,
    dexContext,
    multiPriceContext,
    tokenListContext,
    tokens,
  }: LiquidityProtocolArgs<TFormat>) {
    assertToken(tokenA)
    assertToken(tokenB)
    assertIsAddress(walletAddress)

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

    this._tokenA = tokenA
    this._tokenB = tokenB
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

    this._tokens = new Tokens({
      dexProviderContext: this.dexProvider,
      dexContext,
      tokenList,
    })

    this._tokenAContract =
      tokenAContract ??
      new TokenContract({
        tokenContractAddress: tokenA.contractAddress,
        dexProviderContext: this._dexProvider,
        dexContext,
        tokenList,
      })

    this._tokenBContract =
      tokenBContract ??
      new TokenContract({
        tokenContractAddress: tokenB.contractAddress,
        dexProviderContext: this._dexProvider,
        dexContext,
        tokenList,
      })

    this._tokens =
      tokens ??
      new Tokens({
        dexProviderContext: this._dexProvider,
        dexContext,
        tokenList,
      })
  }

  /**
   * Get the from token
   */
  public get tokenA(): Token {
    return this._tokenA
  }

  /**
   * Get the to token
   */
  public get tokenB(): Token {
    return this._tokenB
  }

  /**
   * Get the tokens factory
   */
  public get tokensFactory(): Tokens {
    return this._tokens
  }

  /**
   * Get the token list factory
   */
  public get tokenList(): TokenList | undefined {
    return this._tokens.tokenList
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
   * @param params.amount - The amount you want to add.
   * @param params.allowance - The allowance you want to add.
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

    return {
      allowance: allowance.toTradeFormat(format),
      hasEnoughAllowance: amount.isGreaterThan(allowance),
      isMaxAllowance: allowance.toHexString() === MAX_HEX_STRING,
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
   * Get the token prices for the from and to tokens, indexed by contract address.
   */
  public async getTokenPrices(): Promise<Record<Address, number>> {
    const contractAddresses = [
      this._tokenA.contractAddress,
      this._tokenB.contractAddress,
      this._nativeWrappedTokenInfo.contractAddress,
    ]

    return fetchAndCalculateFiatPrices({
      chainId: this.dexProvider.network.chainId,
      multiPriceContext: this._multiPriceContext,
      contractAddresses,
    })
  }

  // ------------------------
  // Transaction Generation
  // ------------------------

  /**
   * Generates a transaction to approve the router contract to spend the maximum allowance for a token.
   *
   * @param params - The parameters for generating the approval transaction
   * @param params.token - The token to approve ('A' or 'B')
   * @param params.dexTag - The identifier/tag for the specific DEX configuration
   * @param params.protocol - The protocol of the DEX (v2, v3, etc.)
   * @param params.version - The version of the DEX
   * @param params.amount - The amount to approve. If not provided, the maximum amount will be used.
   *
   * @returns Promise resolving to the transaction data, or undefined if approval is not needed (e.g., for native coins)
   *
   * @throws {DexError}
   * - If required parameters are missing or invalid
   * - If DEX configuration is not found
   * - If contract details are missing
   * - If router address is invalid
   * - If token configuration is invalid
   */
  public async generateApproveRouterAllowanceTransaction({
    token,
    dexTag,
    protocol,
    version,
    amount,
  }: {
    token: 'A' | 'B'
    dexTag: DexTag
    protocol: DexProtocol
    version: Version
    amount?: string
  }): Promise<DexTransaction | undefined> {
    if (token !== 'A' && token !== 'B') {
      throw new DexError(
        'Invalid token provided',
        ErrorCodes.functionArgumentError,
      )
    }

    assertDexTag(dexTag)
    assertProtocol(protocol)
    assertVersion(version)

    const tokenContract =
      token === 'A' ? this._tokenAContract : this._tokenBContract
    const tokenInfo = token === 'A' ? this._tokenA : this._tokenB

    if (!tokenInfo) {
      throw new DexError(
        `Token ${token} configuration not found`,
        ErrorCodes.tokenAddressNotValid,
        { token },
      )
    }

    if (!tokenInfo.decimals && tokenInfo.decimals !== 0) {
      throw new DexError(
        `Decimals not found for token ${token}`,
        ErrorCodes.contractDetailsNotFound,
        {
          token,
          tokenAddress: tokenInfo.contractAddress,
        },
      )
    }

    if (isCoinAddress(tokenInfo.contractAddress)) {
      return undefined
    }

    const dexConfig = this._dexConfigsByDex[dexTag]
    if (!dexConfig) {
      throw new DexError(
        `DEX configuration not found for ${dexTag}`,
        ErrorCodes.dexConfigNotFound,
        {
          token,
          dexTag,
          protocol,
          version: formatVersionForDisplay(version),
        },
      )
    }

    const protocolDetails = dexConfig.protocols[protocol]
    if (!protocolDetails) {
      throw new DexError(
        `Protocol ${protocol} not supported for ${dexTag}`,
        ErrorCodes.protocolNotSupported,
        {
          token,
          dexTag,
          protocol,
          version: formatVersionForDisplay(version),
        },
      )
    }

    const versionTag = getVersionTagFromVersion(version)
    const versionDetails = protocolDetails[versionTag]
    if (!versionDetails) {
      throw new DexError(
        `Version ${formatVersionForDisplay(version)} not supported for ${dexTag} ${protocol}`,
        ErrorCodes.versionNotSupported,
        {
          token,
          dexTag,
          protocol,
          version: formatVersionForDisplay(version),
        },
      )
    }

    const routerConfig = versionDetails.router
    if (!routerConfig || !isAddress(routerConfig.address)) {
      throw new DexError(
        `Invalid router configuration for ${dexTag} ${protocol} ${formatVersionForDisplay(version)}`,
        ErrorCodes.contractAddressNotFound,
        {
          token,
          dexTag,
          protocol,
          version: formatVersionForDisplay(version),
          routerAddress: routerConfig?.address,
        },
      )
    }

    try {
      const decimals =
        token === 'A' ? this.tokenA.decimals : this.tokenB.decimals
      const approvalAmount = amount
        ? DexNumber.fromUnshifted(amount, decimals)
        : DexNumber.fromShifted(MAX_HEX_STRING, decimals)

      const approvalData = tokenContract.encodeApproveAllowanceData({
        spender: routerConfig.address,
        amount: approvalAmount,
      })

      if (!approvalData) {
        throw new DexError(
          'Failed to encode approval data',
          ErrorCodes.contractCallError,
          {
            token,
            tokenAddress: tokenInfo.contractAddress,
            spender: routerConfig.address,
          },
        )
      }

      return {
        to: tokenInfo.contractAddress,
        from: this._walletAddress,
        data: approvalData,
        value: MIN_HEX_STRING,
      }
    } catch (error) {
      throw new DexError(
        'Failed to generate approval transaction',
        ErrorCodes.contractCallError,
        {
          token,
          dexTag,
          protocol,
          version: formatVersionForDisplay(version),
          tokenAddress: tokenInfo.contractAddress,
          routerAddress: routerConfig.address,
        },
        error instanceof Error ? error : undefined,
      )
    }
  }
}
