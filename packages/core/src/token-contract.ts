import { Erc20Contract } from '@dex-toolkit/contracts'
import { DexNumber, parseDecimals } from '@dex-toolkit/number'
import { DexProviderBase } from '@dex-toolkit/provider'
import type {
  Token,
  DexConfigsByDex,
  MultiDexTokenWithAllowanceInfo,
  DexProtocol,
  DexTag,
  DexContext,
  DexMulticallProviderContext,
  TradeFormat,
  TradeFormatValue,
  Erc20Types,
  VersionTag,
  ProtocolSettings,
  TradeFormatOptions,
} from '@dex-toolkit/types'
import {
  ErrorCodes,
  DexError,
  DexMulticall,
  getAddress,
  getChainConfig,
  getAbiForStandard,
  transformWrappedAddressToCoinAddress,
  isCoinAddress,
  erc20ABI,
  prepareAllowanceAndBalanceOfCallContext,
  processAllowanceAndBalanceOfCallResults,
  getCoinBalanceInfo,
  MAX_HEX_STRING,
  parseDexConfigsByDexFromDexContext,
  isAddress,
  isSameAddress,
  ZERO_ADDRESS,
  transformCoinAddressToWrappedAddress,
  assertProtocol,
  assertVersionTag,
  assertDexTag,
  assertIsAddress,
} from '@dex-toolkit/utils'
import type { Address } from '@ethereum-multicall/types'

import { TokenList } from './token-list'

/**
 * Represents a token contract on the blockchain and provides various utilities to interact with it.
 */
export class TokenContract extends DexProviderBase {
  /**
   * Configuration details for different DEXs.
   */
  protected _dexConfigsByDex: DexConfigsByDex

  /**
   * Instance of `DexMulticall` for batch contract calls.
   */
  protected _multicall: DexMulticall

  /**
   * Address of the token contract.
   */
  protected _tokenContractAddress: Address

  /**
   * Instance of `Erc20Contract` for interacting with the token contract.
   */
  protected _tokenContract: Erc20Contract

  /**
   * Token list containing metadata about available tokens.
   */
  protected _tokenList: TokenList

  /**
   * Cache for the token details.
   */
  protected _tokenCache?: Token

  constructor({
    dexProviderContext,
    dexContext,
    tokenContractAddress,
    tokenList,
    protocolSettings,
  }: {
    dexProviderContext: DexMulticallProviderContext
    dexContext: DexContext
    tokenContractAddress: Address
    tokenList?: TokenList
    protocolSettings?: ProtocolSettings
  }) {
    super(dexProviderContext)

    if (!dexContext) {
      throw new DexError(
        'dexConfigContext is required',
        ErrorCodes.functionArgumentError,
      )
    }

    assertIsAddress(tokenContractAddress)

    if (isSameAddress(tokenContractAddress, ZERO_ADDRESS)) {
      throw new DexError(
        'tokenContractAddress cannot be zero address',
        ErrorCodes.functionArgumentError,
      )
    }

    const { chainId } = this.dexProvider.network

    this._dexConfigsByDex = parseDexConfigsByDexFromDexContext({
      dexContext,
      chainId,
      protocolSettings,
    })

    this._tokenList =
      tokenList ??
      new TokenList({
        chainId,
      })

    this._multicall = new DexMulticall(this.dexProvider)

    this._tokenContractAddress = tokenContractAddress

    const standard = getChainConfig(chainId)?.standards.token20.standard

    if (!standard) {
      throw new DexError(
        `No token standard for chainId ${chainId}`,
        ErrorCodes.chainIdNotSupported,
      )
    }

    const abi = getAbiForStandard(standard) ?? erc20ABI

    this._contractDetail = {
      address: transformCoinAddressToWrappedAddress(this._tokenContractAddress),
      abi,
    }

    this._tokenContract = new Erc20Contract(
      this.dexProvider,
      this._contractDetail,
    )
  }

  /** Get the dex configs keyed */
  public get dexConfigsByDex(): DexConfigsByDex {
    return this._dexConfigsByDex
  }

  /** Get the token contract address */
  public get tokenContractAddress(): Address {
    return this._tokenContractAddress
  }

  /** Get the token contract */
  public get tokenContract(): Erc20Contract {
    return this._tokenContract
  }

  /** Get the token list factory */
  public get tokenList(): TokenList {
    return this._tokenList
  }

  /**
   * Get the total supply of tokens which exist
   */
  public async totalSupply(): Promise<DexNumber> {
    const token = await this.getToken()
    const totalSupply = await this._tokenContract.totalSupply()

    return DexNumber.fromShifted(totalSupply, token.decimals)
  }

  /**
   * Get the balance the user has of this token or coin
   *
   * @param params - The parameters for getting the balance.
   * @param params.walletAddress - The user's Ethereum address.
   * @param params.format - The format in which the balance value is returned.
   *
   * @returns The balance of the user.
   */
  public async balanceOf<TFormat extends TradeFormat>({
    walletAddress,
    format,
  }: {
    walletAddress: Address
    format: TradeFormatOptions<TFormat>
  }): Promise<TradeFormatValue<TFormat>> {
    if (isCoinAddress(this._tokenContractAddress)) {
      return this.dexProvider.getCoinBalance({ walletAddress, format })
    } else {
      const token = await this.getToken()
      const balance = await this._tokenContract.balanceOf(walletAddress)

      return DexNumber.fromShifted(balance, token.decimals).toTradeFormat(
        format,
      )
    }
  }

  /**
   * Get allowance and balance for a token across all DEX versions
   *
   * @param params - The parameters for getting the allowance and balance.
   * @param params.walletAddress - The user's Ethereum address.
   * @param params.format - The format in which the balance and allowance values are returned.
   *
   * @returns A promise that resolves to an AllowanceAndBalanceOf object
   */
  public async getAllowancesAndBalanceOf<TFormat extends TradeFormat>({
    walletAddress,
    format,
  }: {
    walletAddress: Address
    format: TradeFormatOptions<TFormat>
  }): Promise<MultiDexTokenWithAllowanceInfo<TFormat>> {
    if (isCoinAddress(this._tokenContractAddress)) {
      return getCoinBalanceInfo({
        dexProvider: this.dexProvider,
        dexConfigsByDex: this._dexConfigsByDex,
        walletAddress,
        format,
      })
    }

    const chainId = this.dexProvider.network.chainId

    const contractCallContext = prepareAllowanceAndBalanceOfCallContext({
      dexProvider: this.dexProvider,
      walletAddress,
      tokenContractAddress: this._tokenContractAddress,
      dexConfigBases: Object.values(this._dexConfigsByDex),
    })

    const contractCallResults = await this._multicall.call(contractCallContext)

    return processAllowanceAndBalanceOfCallResults<TFormat>({
      dexConfigsByDex: this._dexConfigsByDex,
      tokenContractAddress: this._tokenContractAddress,
      contractCallResults,
      chainId,
      format,
    })
  }

  /**
   * Get the allowance for the amount of tokens which can be moved by the router contract
   *
   * @param params - The parameters for getting the allowance.
   * @param params.dexTag - The dex tag.
   * @param params.protocol - The protocol of the DEX (v2, v3, etc.).
   * @param params.versionTag - The version tag.
   * @param params.walletAddress - The users ethereum address.
   * @param params.format - The format in which the allowance value is returned.
   *
   * @throws {DexError} If token information is missing or invalid
   * @throws {DexError} If contract details are not found
   * @throws {DexError} If router configuration is missing
   *
   * @returns The allowance for the router contract.
   */
  public async allowanceForRouter<TFormat extends TradeFormat>({
    dexTag,
    protocol,
    versionTag,
    walletAddress,
    format,
  }: {
    dexTag: DexTag
    protocol: DexProtocol
    versionTag: VersionTag
    walletAddress: Address
    format: TradeFormatOptions<TFormat>
  }): Promise<TradeFormatValue<TFormat>> {
    assertDexTag(dexTag)
    assertProtocol(protocol)
    assertVersionTag(versionTag)
    assertIsAddress(walletAddress)

    // Get and validate token
    const token = await this.getToken()
    if (!token) {
      const availableTokens = Object.values(
        this.dexProvider.customNetwork?.tokens ?? {},
      )
        .map((t) => t.contractAddress)
        .join(', ')

      throw new DexError(
        `Token ${this._tokenContractAddress} not found. Available tokens: ${availableTokens}`,
        ErrorCodes.tokenAddressNotValid,
      )
    }

    if (!token.decimals && token.decimals !== 0) {
      throw new DexError(
        `Decimals not found for token ${this._tokenContractAddress}`,
        ErrorCodes.internalError,
      )
    }

    if (isCoinAddress(this._tokenContractAddress)) {
      return DexNumber.fromShifted(
        MAX_HEX_STRING,
        token.decimals,
      ).toTradeFormat(format)
    }

    const dexConfig = this._dexConfigsByDex[dexTag]
    if (!dexConfig) {
      throw new DexError(
        `DEX configuration not found for ${dexTag}`,
        ErrorCodes.dexConfigNotFound,
      )
    }

    const protocolDetails = dexConfig.protocols[protocol]
    if (!protocolDetails) {
      throw new DexError(
        `Protocol ${protocol} not supported for ${dexTag}`,
        ErrorCodes.protocolNotSupported,
      )
    }

    const versionDetails = protocolDetails[versionTag]
    if (!versionDetails) {
      throw new DexError(
        `Version ${versionTag} not supported for ${dexTag} ${protocol}`,
        ErrorCodes.versionNotSupported,
      )
    }

    const routerConfig = versionDetails.router
    if (!routerConfig) {
      throw new DexError(
        `Router configuration missing for ${dexTag} ${protocol} ${versionTag}`,
        ErrorCodes.contractDetailsNotFound,
      )
    }

    if (!isAddress(routerConfig.address)) {
      throw new DexError(
        `Invalid router address for ${dexTag} ${protocol} ${versionTag}`,
        ErrorCodes.internalError,
      )
    }

    try {
      const allowance = await this._tokenContract.allowance(
        walletAddress,
        routerConfig.address,
      )

      return DexNumber.fromShifted(allowance, token.decimals).toTradeFormat(
        format,
      )
    } catch (error) {
      throw new DexError(
        `Failed to get allowance for token ${this._tokenContractAddress}: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`,
        ErrorCodes.internalError,
      )
    }
  }

  /**
   * Generate the token approve data allowance to move the tokens.
   * This will return the data for you to send as a transaction
   *
   * @param params - The parameters for generating the approve data.
   * @param params.spender - The contract address for which you are allowing to move tokens on your behalf.
   * @param params.amount - The amount you want to allow them to do.
   *
   * @returns The encoded approve data.
   */
  public encodeApproveAllowanceData({
    spender,
    amount,
  }: {
    spender: string
    amount: DexNumber
  }): string {
    if (isCoinAddress(this._tokenContractAddress)) {
      throw new Error('Coin does not need any allowance data')
    }

    return this._tokenContract.encodeApprove(spender, amount.toHexString())
  }

  /**
   * Get the token details
   */
  public async getToken(): Promise<Token> {
    if (this._tokenCache) {
      return this._tokenCache
    }

    let token: Token | undefined = undefined

    const chainId = this.dexProvider.network.chainId
    const chainConfig = getChainConfig(chainId) ?? {}

    if (!chainConfig) {
      throw new DexError(
        `No chain config for chainId ${chainId}`,
        ErrorCodes.chainIdNotSupported,
      )
    }

    if (isCoinAddress(this._tokenContractAddress)) {
      if (this.dexProvider.customNetwork?.nativeWrappedTokenInfo) {
        token = {
          ...this.dexProvider.customNetwork.nativeWrappedTokenInfo,
          contractAddress: transformWrappedAddressToCoinAddress(
            this.dexProvider.customNetwork.nativeWrappedTokenInfo
              .contractAddress,
          ),
        }
      }

      const { nativeCurrency } = chainConfig

      if (!nativeCurrency) {
        throw new DexError(
          `No native currency for chainId ${chainId}`,
          ErrorCodes.canNotFindChainId,
        )
      }

      token = nativeCurrency
    } else {
      const predefinedToken = this._tokenList.getPredefinedToken({
        contractAddress: this._tokenContractAddress,
      })

      if (predefinedToken) {
        token = predefinedToken
      }

      const standard = chainConfig.standards.token20.standard

      if (!standard) {
        throw new DexError(
          `No token standard for chainId ${chainId}`,
          ErrorCodes.chainIdNotSupported,
        )
      }

      const abi = getAbiForStandard(standard) ?? erc20ABI

      const contractCallContext =
        this._multicall.createCallContext<Erc20Types.Contract>()({
          contractAddress: getAddress(this._tokenContractAddress),
          abi,
          calls: {
            symbol: {
              methodName: 'symbol',
              methodParameters: [],
            },
            decimals: {
              methodName: 'decimals',
              methodParameters: [],
            },
            name: {
              methodName: 'name',
              methodParameters: [],
            },
          },
        })

      const { contracts } = await this._multicall.call({
        tokenContext: contractCallContext,
      })

      const { symbol, decimals, name } = contracts.tokenContext.results

      if (!symbol.success) {
        throw new DexError(
          `No symbol for ${this._tokenContractAddress}`,
          ErrorCodes.internalError,
        )
      }

      if (!decimals.success) {
        throw new DexError(
          `No decimals for ${this._tokenContractAddress}`,
          ErrorCodes.internalError,
        )
      }

      if (!name.success) {
        throw new DexError(
          `No name for ${this._tokenContractAddress}`,
          ErrorCodes.internalError,
        )
      }

      token = {
        chainId,
        contractAddress: this._tokenContractAddress,
        symbol: symbol.value,
        decimals: parseDecimals(decimals.value),
        name: name.value,
        standard,
      }
    }

    this._tokenCache = token

    return this._tokenCache
  }
}
