import { parseDecimals } from '@dex-toolkit/number'
import {
  type DexProvider,
  parseDexProviderFromContext,
} from '@dex-toolkit/provider'
import type {
  Token,
  DexConfigsByDex,
  MultiDexTokenWithAllowanceInfo,
  DexContext,
  DexMulticallProviderContext,
  TradeFormat,
  Erc20Types,
  TokenCalls,
  ProtocolSettings,
  TradeFormatOptions,
} from '@dex-toolkit/types'
import {
  ErrorCodes,
  DexError,
  getAddress,
  getChainConfig,
  getAbiForStandard,
  isCoinAddress,
  prepareAllowanceAndBalanceOfCallContext,
  processAllowanceAndBalanceOfCallResults,
  getCoinBalanceInfo,
  parseDexConfigsByDexFromDexContext,
  isSameAddress,
  ZERO_ADDRESS,
  prepareTokenCallContext,
  processTokenCallResults,
  assertIsAddresses,
} from '@dex-toolkit/utils'
import type { Address } from '@multicall-toolkit/types'
import type { ContractContext, MethodCallUnion } from '@multicall-toolkit/types'

import { TokenList } from './token-list'

/**
 * A utility class for interacting with tokens in the DEX ecosystem.
 * It provides functionalities to retrieve token details, balances, allowances, and more.
 */
export class Tokens {
  /**
   * The underlying `DexProvider` instance for interacting with the blockchain.
   */
  protected _dexProvider: DexProvider

  /**
   * DEX configurations grouped by DEX tag.
   */
  protected _dexConfigsByDex: DexConfigsByDex

  /**
   * An instance of `TokenList` for managing token metadata.
   */
  protected _tokenList: TokenList

  constructor({
    dexProviderContext,
    dexContext,
    tokenList,
    protocolSettings,
  }: {
    dexProviderContext: DexMulticallProviderContext
    dexContext: DexContext
    tokenList?: TokenList
    protocolSettings?: ProtocolSettings
  }) {
    if (!dexProviderContext) {
      throw new DexError(
        'dexProviderContext is required',
        ErrorCodes.functionArgumentError,
      )
    }

    this._dexProvider = parseDexProviderFromContext(dexProviderContext)

    const { chainId } = this._dexProvider.network

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
  }

  /**
   * Returns the underlying `DexProvider`.
   */
  public get dexProvider(): DexProvider {
    return this._dexProvider
  }

  /** Get the dex configs keyed */
  public get dexConfigsByDex(): DexConfigsByDex {
    return this._dexConfigsByDex
  }

  /** Get the token list factory */
  public get tokenList(): TokenList {
    return this._tokenList
  }

  /**
   * Retrieves the allowances and balances for the provided list of tokens.
   *
   * @template TFormat - The trade format type.
   *
   * @param params - The parameters for fetching token allowances and balances.
   * @param params.walletAddress - The wallet address to fetch data for.
   * @param params.includeAllowance - Whether to include allowances in the response.
   * @param params.format - The desired format for balance and allowance values.
   *
   * @returns A promise resolving to an array of `MultiDexTokenWithAllowanceInfo` objects.
   */
  public async getTokenListWithAllowancesAndBalance<
    TFormat extends TradeFormat,
  >({
    walletAddress,
    includeAllowance = false,
    format,
  }: {
    walletAddress: Address
    includeAllowance?: boolean
    format: TradeFormatOptions<TFormat>
  }): Promise<MultiDexTokenWithAllowanceInfo<TFormat>[]> {
    const chainId = this._dexProvider.network.chainId

    const coinPromises: Promise<MultiDexTokenWithAllowanceInfo<TFormat>>[] = []
    let contractCallContexts: Record<
      string,
      ContractContext<Erc20Types.Contract, any>
    > = {}

    const tokens = await this._tokenList.getTokens()

    // Prepare multicall for each token in the list
    for (const token of tokens) {
      if (isCoinAddress(token.contractAddress)) {
        const coinPromise = getCoinBalanceInfo({
          dexProvider: this._dexProvider,
          dexConfigsByDex: this._dexConfigsByDex,
          walletAddress,
          format,
        })
        coinPromises.push(coinPromise)
      } else {
        contractCallContexts = {
          ...contractCallContexts,
          ...prepareAllowanceAndBalanceOfCallContext({
            dexProvider: this._dexProvider,
            walletAddress,
            tokenContractAddress: token.contractAddress,
            dexConfigBases: Object.values(this._dexConfigsByDex),
            includeAllowance,
          }),
        }
      }
    }

    // Execute the contract calls
    const [contractCallResults, ...coinResults] = await Promise.all([
      this._dexProvider.call(contractCallContexts),
      ...coinPromises,
    ])

    const results: MultiDexTokenWithAllowanceInfo<TFormat>[] = [...coinResults]

    // Process each token's multicall result
    for (const token of tokens) {
      const tokenResult = processAllowanceAndBalanceOfCallResults({
        dexConfigsByDex: this._dexConfigsByDex,
        tokenContractAddress: token.contractAddress,
        contractCallResults,
        chainId,
        format,
      })

      results.push(tokenResult)
    }

    return results
  }

  /**
   * Retrieves allowance and balance information for a specified list of token contract addresses.
   * Includes both v2 and v3 data if available.
   *
   * @template TFormat - The trade format type.
   * @template TAddress - The array of token contract addresses.
   *
   * @param params - The parameters for fetching allowance and balance information.
   * @param params.walletAddress - The wallet address to fetch data for.
   * @param params.tokenContractAddresses - A list of token contract addresses to query.
   * @param params.format - The desired format for balance and allowance values.
   *
   * @returns A promise resolving to an object mapping token contract addresses to their corresponding information.
   */
  public async getAllowancesAndBalanceOf<
    TFormat extends TradeFormat,
    TAddress extends readonly Address[],
  >({
    walletAddress,
    tokenContractAddresses,
    format,
  }: {
    walletAddress: Address
    tokenContractAddresses: TAddress
    format: TradeFormatOptions<TFormat>
  }): Promise<
    Record<TAddress[number], MultiDexTokenWithAllowanceInfo<TFormat>>
  > {
    const chainId = this._dexProvider.network.chainId

    let contractCallContexts: Record<
      Address,
      ContractContext<Erc20Types.Contract, TokenCalls<true, true>>
    > = {}

    const promisesByAddress: Record<
      Address,
      Promise<MultiDexTokenWithAllowanceInfo<TFormat>>
    > = {}

    // Prepare call contexts and promises
    for (const tokenContractAddress of tokenContractAddresses) {
      if (isCoinAddress(tokenContractAddress)) {
        // For coins, create a promise to get the coin balance info
        promisesByAddress[tokenContractAddress] = getCoinBalanceInfo({
          dexProvider: this._dexProvider,
          dexConfigsByDex: this._dexConfigsByDex,
          walletAddress,
          format,
        })
      } else {
        // For tokens, prepare the contract call context
        contractCallContexts = {
          ...contractCallContexts,
          ...prepareAllowanceAndBalanceOfCallContext({
            dexProvider: this._dexProvider,
            walletAddress,
            tokenContractAddress,
            dexConfigBases: Object.values(this._dexConfigsByDex),
          }),
        }

        // Placeholder for the promise to be resolved after multicall
        promisesByAddress[tokenContractAddress] = null as any
      }
    }

    // Execute multicall for all token addresses
    const contractCallResults =
      await this._dexProvider.call(contractCallContexts)

    // Process the results for token addresses
    for (const tokenContractAddress of tokenContractAddresses) {
      if (!isCoinAddress(tokenContractAddress)) {
        const tokenResult = processAllowanceAndBalanceOfCallResults({
          dexConfigsByDex: this._dexConfigsByDex,
          tokenContractAddress,
          contractCallResults,
          chainId,
          format,
        })
        promisesByAddress[tokenContractAddress] = Promise.resolve(tokenResult)
      }
    }

    // Wait for all promises to resolve and assemble the results
    const entries = await Promise.all(
      Object.entries(promisesByAddress).map(async ([address, promise]) => {
        const result = await promise
        return [address, result] as [
          Address,
          MultiDexTokenWithAllowanceInfo<TFormat>,
        ]
      }),
    )

    // Convert entries back to an object
    const results = entries.reduce(
      (acc, [address, result]) => {
        acc[address] = result
        return acc
      },
      {} as Record<Address, MultiDexTokenWithAllowanceInfo<TFormat>>,
    )

    return results
  }

  /**
   * Retrieves metadata and details for a given list of token contract addresses.
   *
   * @param tokenContractAddresses - A list of token contract addresses to query.
   *
   * @returns A promise resolving to an object mapping token contract addresses to `Token` objects.
   *
   * @throws {DexError} if the token standard or ABI is not found.
   * @throws {DexError} if contract call contexts are not available.
   */
  public async getTokens(
    tokenContractAddresses: Address[],
  ): Promise<Record<Address, Token>> {
    assertIsAddresses(tokenContractAddresses)

    try {
      const chainId = this._dexProvider.network.chainId
      const { standards } = getChainConfig(chainId) ?? {}
      const standard = standards.token20.standard

      if (!standard) {
        throw new DexError(
          `No token standard for chainId ${chainId}`,
          ErrorCodes.chainIdNotSupported,
        )
      }

      const tokens: Record<Address, Token> = {}
      const contractCallContexts: Record<
        Address,
        ContractContext<
          Erc20Types.Contract,
          Record<
            string,
            MethodCallUnion<Erc20Types.Contract, 'symbol' | 'decimals' | 'name'>
          >
        >
      > = {}

      for (const tokenContractAddress of tokenContractAddresses) {
        if (isSameAddress(tokenContractAddress, ZERO_ADDRESS)) continue

        if (isCoinAddress(tokenContractAddress)) {
          const coin =
            this._dexProvider.customNetwork?.nativeWrappedTokenInfo ||
            getChainConfig(chainId)?.nativeCurrency

          if (!coin) {
            throw new DexError(
              `No native currency for chainId ${chainId}`,
              ErrorCodes.canNotFindChainId,
            )
          }

          tokens[tokenContractAddress] = coin
          continue
        }

        const predefinedToken = this._tokenList.getPredefinedToken({
          contractAddress: tokenContractAddress,
        })

        if (predefinedToken) {
          tokens[tokenContractAddress] = predefinedToken
          continue
        }

        const abi = getAbiForStandard(standard)

        if (!abi) {
          throw new DexError(
            `No ABI for standard ${standard}`,
            ErrorCodes.chainIdNotSupported,
          )
        }

        const calls = prepareTokenCallContext({
          includes: ['symbol', 'decimals', 'name'],
        })

        contractCallContexts[tokenContractAddress] = {
          contractAddress: getAddress(tokenContractAddress),
          abi,
          calls,
        }
      }

      if (Object.keys(contractCallContexts).length > 0) {
        const contractCallResults =
          await this._dexProvider.call(contractCallContexts)

        for (const [contractAddress, contractResults] of Object.entries(
          contractCallResults.contracts,
        )) {
          const { symbol, decimals, name } = processTokenCallResults({
            contractResults,
          })

          tokens[contractAddress] = {
            chainId,
            contractAddress,
            symbol: symbol ?? '',
            decimals: parseDecimals(decimals ?? 0),
            name: name ?? '',
            standard,
          }
        }
      }

      return tokens
    } catch (error) {
      throw new DexError(
        'invalid from or to contract tokens',
        ErrorCodes.invalidFromOrToContractToken,
      )
    }
  }
}
