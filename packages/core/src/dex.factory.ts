import {
  type DexProvider,
  parseDexProviderFromContext,
} from '@dex-toolkit/provider'
import type {
  LiquiditySenderPublicArgs,
  DexArgs,
  TradeFormat,
  TradeSenderPublicArgs,
} from '@dex-toolkit/types'
import { DexError, ErrorCodes, getAddress } from '@dex-toolkit/utils'

import { Liquidity } from './liquidity/liquidity'
import { parseTokenListFromTokenListContext } from './token-list'
import { Tokens } from './tokens'
import { Trade } from './trade'

/**
 * The `DexFactory` class serves as the entry point for interacting with decentralized exchanges (DEXs).
 * It provides methods to create instances of `Trade` and `Liquidity` for token swaps and liquidity management.
 *
 * @template TFormat - The format in which numerical values (e.g., balances, amounts) are returned.
 */
export class DexFactory<TFormat extends TradeFormat> {
  /**
   * The underlying `DexProvider` instance used for DEX operations.
   */
  protected _dexProvider: DexProvider

  constructor(protected _context: DexArgs<TFormat>) {
    this._context.walletAddress = getAddress(this._context?.walletAddress)
    this._dexProvider = parseDexProviderFromContext(
      this._context.providerContext,
    )
  }

  /**
   * Returns the underlying `DexProvider`.
   */
  public get dexProvider(): DexProvider {
    return this._dexProvider
  }

  /**
   * Creates an instance of the `Trade` that can be used for token trades.
   *
   * @param args The arguments for creating the factory.
   *
   * @returns A promise resolving to a `Trade` instance.
   *
   * @throws {DexError} if the token addresses are invalid or not found in the token list.
   */
  public async createTrade(
    args: TradeSenderPublicArgs,
  ): Promise<Trade<TFormat>> {
    const clonedArgs = structuredClone(args)

    const { settings } = clonedArgs ?? {}

    const fromTokenAddress = getAddress(clonedArgs?.fromTokenAddress)
    const toTokenAddress = getAddress(clonedArgs?.toTokenAddress)

    const {
      walletAddress,
      dexContext,
      format,
      multiPriceContext,
      tokenListContext,
    } = this._context ?? {}

    const tokenList = parseTokenListFromTokenListContext({
      dexProvider: this._dexProvider,
      tokenListContext,
    })

    const tokensFactory = new Tokens({
      dexProviderContext: this._dexProvider,
      dexContext,
      tokenList,
    })

    const tokens = await tokensFactory.getTokens([
      fromTokenAddress,
      toTokenAddress,
    ])

    const fromToken = tokens[fromTokenAddress]

    const toToken = tokens[toTokenAddress]

    if (!fromToken) {
      throw new DexError(
        `Could not find from token ${fromTokenAddress} in tokens ${Object.values(
          tokens,
        ).map((t) => t.contractAddress)}`,
        ErrorCodes.fromTokenAddressNotValid,
      )
    }

    if (!toToken) {
      throw new DexError(
        `Could not find to token ${toTokenAddress} in tokens ${Object.values(
          tokens,
        ).map((t) => t.contractAddress)}`,
        ErrorCodes.toTokenAddressNotValid,
      )
    }

    const tradeFactory = new Trade({
      dexProvider: this._dexProvider,
      fromToken,
      toToken,
      walletAddress,
      dexContext,
      settings,
      format,
      multiPriceContext,
      tokenListContext: tokenList,
    })

    return tradeFactory
  }

  /**
   * Creates an instance of the `Trade` that can be used for token trades.
   *
   * @param args - The arguments for creating the factory.
   *
   * @returns A promise resolving to a `Trade` instance.
   *
   * @throws {DexError} if the token addresses are invalid or not found in the token list.
   */
  public async createLiquidity(
    args: LiquiditySenderPublicArgs,
  ): Promise<Liquidity<TFormat>> {
    const clonedArgs = structuredClone(args)

    const { settings } = clonedArgs ?? {}

    const tokenAAddress = getAddress(clonedArgs?.tokenAAddress)
    const tokenBAddress = getAddress(clonedArgs?.tokenBAddress)

    const {
      walletAddress,
      dexContext,
      multiPriceContext,
      tokenListContext,
      format,
    } = this._context ?? {}

    const tokenList = parseTokenListFromTokenListContext({
      dexProvider: this._dexProvider,
      tokenListContext,
    })

    const tokensFactory = new Tokens({
      dexProviderContext: this._dexProvider,
      dexContext,
      tokenList,
    })

    const tokens = await tokensFactory.getTokens([tokenAAddress, tokenBAddress])

    const tokenA = tokens[tokenAAddress]

    const tokenB = tokens[tokenBAddress]

    if (!tokenA) {
      throw new DexError(
        `Could not find token A ${tokenAAddress} in tokens ${Object.values(
          tokens,
        ).map((t) => t.contractAddress)}`,
        ErrorCodes.tokenAddressNotValid,
      )
    }

    if (!tokenB) {
      throw new DexError(
        `Could not find token B ${tokenBAddress} in tokens ${Object.values(
          tokens,
        ).map((t) => t.contractAddress)}`,
        ErrorCodes.tokenAddressNotValid,
      )
    }

    const liquidityFactory = new Liquidity({
      tokenA,
      tokenB,
      walletAddress,
      dexContext,
      multiPriceContext,
      settings,
      format,
      dexProvider: this._dexProvider,
      tokenListContext: tokenList,
    })

    return liquidityFactory
  }
}
