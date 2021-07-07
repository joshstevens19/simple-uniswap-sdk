import BigNumber from 'bignumber.js';
import { Subject } from 'rxjs';
import {
  ExactInputSingleRequest,
  ExactOutputSingleRequest,
} from '../../ABI/types/uniswap-router-v3';
import { Constants } from '../../common/constants';
import { ErrorCodes } from '../../common/errors/error-codes';
import { UniswapError } from '../../common/errors/uniswap-error';
import {
  removeEthFromContractAddress,
  turnTokenIntoEthForResponse,
} from '../../common/tokens/eth';
import { hexlify } from '../../common/utils/hexlify';
import { parseEther } from '../../common/utils/parse-ether';
import { toEthersBigNumber } from '../../common/utils/to-ethers-big-number';
import { getTradePath } from '../../common/utils/trade-path';
import { TradePath } from '../../enums/trade-path';
import { UniswapVersion } from '../../enums/uniswap-version';
import { UniswapContractContextV2 } from '../../uniswap-contract-context/uniswap-contract-context-v2';
import { UniswapContractContextV3 } from '../../uniswap-contract-context/uniswap-contract-context-v3';
import { AllPossibleRoutes } from '../router/models/all-possible-routes';
import { BestRouteQuotes } from '../router/models/best-route-quotes';
import { RouteQuote } from '../router/models/route-quote';
import { UniswapRouterFactory } from '../router/uniswap-router.factory';
import { UniswapRouterContractFactoryV2 } from '../router/v2/uniswap-router-contract.factory.v2';
import { percentToFeeAmount } from '../router/v3/enums/fee-amount-v3';
import { UniswapRouterContractFactoryV3 } from '../router/v3/uniswap-router-contract.factory.v3';
import { AllowanceAndBalanceOf } from '../token/models/allowance-balance-of';
import { Token } from '../token/models/token';
import { TokenFactory } from '../token/token.factory';
import { TradeContext } from './models/trade-context';
import { TradeDirection } from './models/trade-direction';
import { Transaction } from './models/transaction';
import { UniswapPairFactoryContext } from './models/uniswap-pair-factory-context';

export class UniswapPairFactory {
  private _fromTokenFactory = new TokenFactory(
    this._uniswapPairFactoryContext.fromToken.contractAddress,
    this._uniswapPairFactoryContext.ethersProvider
  );

  private _toTokenFactory = new TokenFactory(
    this._uniswapPairFactoryContext.toToken.contractAddress,
    this._uniswapPairFactoryContext.ethersProvider
  );

  private _uniswapRouterContractFactoryV2 = new UniswapRouterContractFactoryV2(
    this._uniswapPairFactoryContext.ethersProvider
  );
  private _uniswapRouterContractFactoryV3 = new UniswapRouterContractFactoryV3(
    this._uniswapPairFactoryContext.ethersProvider
  );

  private _uniswapRouterFactory = new UniswapRouterFactory(
    this._uniswapPairFactoryContext.fromToken,
    this._uniswapPairFactoryContext.toToken,
    this._uniswapPairFactoryContext.settings.disableMultihops,
    this._uniswapPairFactoryContext.settings.uniswapVersions,
    this._uniswapPairFactoryContext.ethersProvider
  );

  private _currentTradeContext: TradeContext | undefined;
  private _quoteChangeInternal: NodeJS.Timeout | undefined;
  private _quoteChanged$: Subject<TradeContext> = new Subject<TradeContext>();

  constructor(private _uniswapPairFactoryContext: UniswapPairFactoryContext) {}

  /**
   * The to token
   */
  public get toToken(): Token {
    return this._uniswapPairFactoryContext.toToken;
  }

  /**
   * The from token
   */
  public get fromToken(): Token {
    return this._uniswapPairFactoryContext.fromToken;
  }

  /**
   * Get the provider url
   */
  public get providerUrl(): string | undefined {
    return this._uniswapPairFactoryContext.ethersProvider.getProviderUrl();
  }

  /**
   * Get the to token balance
   */
  public async getFromTokenBalance(): Promise<string> {
    if (this.tradePath() === TradePath.ethToErc20) {
      const ethBalanceContext = await this.getEthBalance();
      return ethBalanceContext.toFixed();
    }

    const erc20BalanceContext = await this._fromTokenFactory.balanceOf(
      this._uniswapPairFactoryContext.ethereumAddress
    );

    return new BigNumber(erc20BalanceContext)
      .shiftedBy(this.fromToken.decimals * -1)
      .toFixed();
  }

  /**
   * Get the to token balance
   */
  public async getToTokenBalance(): Promise<string> {
    if (this.tradePath() === TradePath.erc20ToEth) {
      const ethBalanceContext = await this.getEthBalance();
      return ethBalanceContext.toFixed();
    }

    const erc20BalanceContext = await this._toTokenFactory.balanceOf(
      this._uniswapPairFactoryContext.ethereumAddress
    );

    return new BigNumber(erc20BalanceContext)
      .shiftedBy(this.toToken.decimals * -1)
      .toFixed();
  }

  /**
   * Execute the trade path
   * @param amount The amount
   * @param direction The direction you want to get the quote from
   */
  private async executeTradePath(
    amount: BigNumber,
    direction: TradeDirection
  ): Promise<TradeContext> {
    switch (this.tradePath()) {
      case TradePath.erc20ToEth:
        return await this.findBestPriceAndPathErc20ToEth(amount, direction);
      case TradePath.ethToErc20:
        return await this.findBestPriceAndPathEthToErc20(amount, direction);
      case TradePath.erc20ToErc20:
        return await this.findBestPriceAndPathErc20ToErc20(amount, direction);
      default:
        throw new UniswapError(
          `${this.tradePath()} is not defined`,
          ErrorCodes.tradePathIsNotSupported
        );
    }
  }

  /**
   * Destroy the trade instance watchers + subscriptions
   */
  private destroy(): void {
    for (let i = 0; i < this._quoteChanged$.observers.length; i++) {
      this._quoteChanged$.observers[i].complete();
    }
  }

  /**
   * Generate trade - this will return amount but you still need to send the transaction
   * if you want it to be executed on the blockchain
   * @param amount The amount you want to swap
   * @param direction The direction you want to get the quote from
   */
  public async trade(
    amount: string,
    direction: TradeDirection = TradeDirection.input
  ): Promise<TradeContext> {
    this.destroy();
    if (this._quoteChangeInternal) {
      clearInterval(this._quoteChangeInternal);
    }

    this._currentTradeContext = await this.executeTradePath(
      new BigNumber(amount),
      direction
    );

    this.watchTradePrice();

    return this._currentTradeContext;
  }

  /**
   * Route getter
   */
  private get _routes(): UniswapRouterFactory {
    return this._uniswapRouterFactory;
  }

  /**
   * Find the best route rate out of all the route quotes
   * @param amountToTrade The amount to trade
   * @param direction The direction you want to get the quote from
   */
  public async findBestRoute(
    amountToTrade: string,
    direction: TradeDirection
  ): Promise<BestRouteQuotes> {
    return await this._routes.findBestRoute(
      new BigNumber(amountToTrade),
      direction
    );
  }

  /**
   * Find the best route rate out of all the route quotes
   * @param amountToTrade The amount to trade
   * @param direction The direction you want to get the quote from
   */
  public async findAllPossibleRoutesWithQuote(
    amountToTrade: string,
    direction: TradeDirection
  ): Promise<RouteQuote[]> {
    return await this._routes.getAllPossibleRoutesWithQuotes(
      new BigNumber(amountToTrade),
      direction
    );
  }

  /**
   * Find all possible routes
   */
  public async findAllPossibleRoutes(): Promise<AllPossibleRoutes> {
    return await this._routes.getAllPossibleRoutes();
  }

  /**
   * Has got enough allowance to do the trade
   * @param uniswapVersion The uniswap version
   * @param amount The amount you want to swap
   */
  public async hasGotEnoughAllowance(
    uniswapVersion: UniswapVersion,
    amount: string
  ): Promise<boolean> {
    if (this.tradePath() === TradePath.ethToErc20) {
      return true;
    }

    const allowance = await this.allowance(uniswapVersion);

    return this._hasGotEnoughAllowance(amount, allowance);
  }

  /**
   * Has got enough allowance to do the trade
   * @param amount The amount you want to swap
   */
  private _hasGotEnoughAllowance(amount: string, allowance: string): boolean {
    if (this.tradePath() === TradePath.ethToErc20) {
      return true;
    }

    const bigNumberAllowance = new BigNumber(allowance).shiftedBy(
      this.fromToken.decimals * -1
    );

    if (new BigNumber(amount).isGreaterThan(bigNumberAllowance)) {
      return false;
    }

    return true;
  }

  /**
   * Has got enough balance to do the trade (erc20 check only)
   * @param amount The amount you want to swap
   */
  private hasGotEnoughBalanceErc20(
    amount: string,
    balance: string
  ): {
    hasEnough: boolean;
    balance: string;
  } {
    const bigNumberBalance = new BigNumber(balance).shiftedBy(
      this.fromToken.decimals * -1
    );

    if (new BigNumber(amount).isGreaterThan(bigNumberBalance)) {
      return {
        hasEnough: false,
        balance: bigNumberBalance.toFixed(),
      };
    }

    return {
      hasEnough: true,
      balance: bigNumberBalance.toFixed(),
    };
  }

  /**
   * Has got enough balance to do the trade (eth check only)
   * @param amount The amount you want to swap
   */
  private async hasGotEnoughBalanceEth(amount: string): Promise<{
    hasEnough: boolean;
    balance: string;
  }> {
    const balance = await this.getEthBalance();

    if (new BigNumber(amount).isGreaterThan(balance)) {
      return {
        hasEnough: false,
        balance: balance.toFixed(),
      };
    }

    return {
      hasEnough: true,
      balance: balance.toFixed(),
    };
  }

  /**
   * Get eth balance
   */
  private async getEthBalance(): Promise<BigNumber> {
    const balance =
      await this._uniswapPairFactoryContext.ethersProvider.balanceOf(
        this._uniswapPairFactoryContext.ethereumAddress
      );

    return new BigNumber(balance).shiftedBy(Constants.ETH_MAX_DECIMALS * -1);
  }

  /**
   * Get the allowance and balance for the from token (erc20 > blah) only
   * @param uniswapVersion The uniswap version
   */
  public async getAllowanceAndBalanceOfForFromToken(
    uniswapVersion: UniswapVersion
  ): Promise<AllowanceAndBalanceOf> {
    return await this._fromTokenFactory.getAllowanceAndBalanceOf(
      uniswapVersion,
      this._uniswapPairFactoryContext.ethereumAddress
    );
  }

  /**
   * Get the allowance and balance for to from token (eth > erc20) only
   * @param uniswapVersion The uniswap version
   */
  public async getAllowanceAndBalanceOfForToToken(
    uniswapVersion: UniswapVersion
  ): Promise<AllowanceAndBalanceOf> {
    return await this._toTokenFactory.getAllowanceAndBalanceOf(
      uniswapVersion,
      this._uniswapPairFactoryContext.ethereumAddress
    );
  }

  /**
   * Get the allowance for the amount which can be moved from the `fromToken`
   * on the users behalf. Only valid when the `fromToken` is a ERC20 token.
   * @param uniswapVersion The uniswap version
   */
  public async allowance(uniswapVersion: UniswapVersion): Promise<string> {
    if (this.tradePath() === TradePath.ethToErc20) {
      return '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff';
    }

    const allowance = await this._fromTokenFactory.allowance(
      uniswapVersion,
      this._uniswapPairFactoryContext.ethereumAddress
    );

    return allowance;
  }

  /**
   * Generate the from token approve data max allowance to move the tokens.
   * This will return the data for you to send as a transaction
   * @param uniswapVersion The uniswap version
   */
  public async generateApproveMaxAllowanceData(
    uniswapVersion: UniswapVersion
  ): Promise<Transaction> {
    if (this.tradePath() === TradePath.ethToErc20) {
      throw new UniswapError(
        'You do not need to generate approve uniswap allowance when doing eth > erc20',
        ErrorCodes.generateApproveMaxAllowanceDataNotAllowed
      );
    }

    const data = this._fromTokenFactory.generateApproveAllowanceData(
      uniswapVersion === UniswapVersion.v2
        ? UniswapContractContextV2.routerAddress
        : UniswapContractContextV3.routerAddress,
      '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
    );

    return {
      to: this.fromToken.contractAddress,
      from: this._uniswapPairFactoryContext.ethereumAddress,
      data,
      value: Constants.EMPTY_HEX_STRING,
    };
  }

  /**
   * finds the best price and path for Erc20ToEth
   * @param baseConvertRequest The base convert request can be both input or output direction
   * @param direction The direction you want to get the quote from
   */
  private async findBestPriceAndPathErc20ToEth(
    baseConvertRequest: BigNumber,
    direction: TradeDirection
  ): Promise<TradeContext> {
    const bestRouteQuotes = await this._routes.findBestRoute(
      baseConvertRequest,
      direction
    );

    const bestRouteQuote = bestRouteQuotes.bestRouteQuote;

    const convertQuoteWithSlippage = new BigNumber(
      bestRouteQuote.expectedConvertQuote
    ).minus(
      new BigNumber(bestRouteQuote.expectedConvertQuote)
        .times(this._uniswapPairFactoryContext.settings.slippage)
        .toFixed(this.fromToken.decimals)
    );

    const tokenAmountInMax = new BigNumber(
      bestRouteQuote.expectedConvertQuote
    ).plus(
      new BigNumber(bestRouteQuote.expectedConvertQuote)
        .times(this._uniswapPairFactoryContext.settings.slippage)
        .toFixed(this.fromToken.decimals)
    );

    const tradeExpires = this.generateTradeDeadlineUnixTime();

    const data =
      direction === TradeDirection.input
        ? this.generateTradeDataErc20ToEthInput(
            baseConvertRequest,
            convertQuoteWithSlippage,
            bestRouteQuote,
            tradeExpires.toString()
          )
        : this.generateTradeDataErc20ToEthOutput(
            tokenAmountInMax,
            baseConvertRequest,
            bestRouteQuote,
            tradeExpires.toString()
          );

    const allowanceAndBalanceOf =
      await this.getAllowanceAndBalanceOfForFromToken(
        bestRouteQuote.uniswapVersion
      );

    const hasEnoughAllowance =
      direction === TradeDirection.input
        ? this._hasGotEnoughAllowance(
            baseConvertRequest.toFixed(),
            allowanceAndBalanceOf.allowance
          )
        : this._hasGotEnoughAllowance(
            bestRouteQuote.expectedConvertQuote,
            allowanceAndBalanceOf.allowance
          );

    const tradeContext: TradeContext = {
      uniswapVersion: bestRouteQuote.uniswapVersion,
      quoteDirection: direction,
      baseConvertRequest: baseConvertRequest.toFixed(),
      minAmountConvertQuote:
        direction === TradeDirection.input
          ? convertQuoteWithSlippage.toFixed(this.toToken.decimals)
          : null,
      maximumSent:
        direction === TradeDirection.input
          ? null
          : tokenAmountInMax.toFixed(this.toToken.decimals),
      expectedConvertQuote: bestRouteQuote.expectedConvertQuote,
      liquidityProviderFee:
        direction === TradeDirection.input
          ? baseConvertRequest
              .times(bestRouteQuote.liquidityProviderFee)
              .toFixed(this.fromToken.decimals)
          : new BigNumber(bestRouteQuote.expectedConvertQuote)
              .times(bestRouteQuote.liquidityProviderFee)
              .toFixed(this.fromToken.decimals),
      liquidityProviderFeePercent: bestRouteQuote.liquidityProviderFee,
      tradeExpires,
      routePathTokenMap: bestRouteQuote.routePathArrayTokenMap,
      routeText: bestRouteQuote.routeText,
      routePath: bestRouteQuote.routePathArray.map((r) =>
        removeEthFromContractAddress(r)
      ),
      hasEnoughAllowance,
      approvalTransaction: !hasEnoughAllowance
        ? await this.generateApproveMaxAllowanceData(
            bestRouteQuote.uniswapVersion
          )
        : undefined,
      toToken: turnTokenIntoEthForResponse(this.toToken),
      fromToken: this.fromToken,
      fromBalance:
        direction === TradeDirection.input
          ? this.hasGotEnoughBalanceErc20(
              baseConvertRequest.toFixed(),
              allowanceAndBalanceOf.balanceOf
            )
          : this.hasGotEnoughBalanceErc20(
              bestRouteQuote.expectedConvertQuote,
              allowanceAndBalanceOf.balanceOf
            ),
      transaction: this.buildUpTransactionErc20(
        bestRouteQuote.uniswapVersion,
        data
      ),
      allTriedRoutesQuotes: bestRouteQuotes.triedRoutesQuote,
      quoteChanged$: this._quoteChanged$,
      destroy: () => this.destroy(),
    };

    return tradeContext;
  }

  /**
   * finds the best price and path for Erc20ToErc20
   * @param baseConvertRequest The base convert request can be both input or output direction
   * @param direction The direction you want to get the quote from
   */
  private async findBestPriceAndPathErc20ToErc20(
    baseConvertRequest: BigNumber,
    direction: TradeDirection
  ): Promise<TradeContext> {
    const bestRouteQuotes = await this._routes.findBestRoute(
      baseConvertRequest,
      direction
    );
    const bestRouteQuote = bestRouteQuotes.bestRouteQuote;

    const convertQuoteWithSlippage = new BigNumber(
      bestRouteQuote.expectedConvertQuote
    ).minus(
      new BigNumber(bestRouteQuote.expectedConvertQuote)
        .times(this._uniswapPairFactoryContext.settings.slippage)
        .toFixed(this.fromToken.decimals)
    );

    const tokenAmountInMax = new BigNumber(
      bestRouteQuote.expectedConvertQuote
    ).plus(
      new BigNumber(bestRouteQuote.expectedConvertQuote)
        .times(this._uniswapPairFactoryContext.settings.slippage)
        .toFixed(this.fromToken.decimals)
    );

    const tradeExpires = this.generateTradeDeadlineUnixTime();

    const data =
      direction === TradeDirection.input
        ? this.generateTradeDataErc20ToErc20Input(
            baseConvertRequest,
            convertQuoteWithSlippage,
            bestRouteQuote,
            tradeExpires.toString()
          )
        : this.generateTradeDataErc20ToErc20Output(
            tokenAmountInMax,
            baseConvertRequest,
            bestRouteQuote,
            tradeExpires.toString()
          );

    const allowanceAndBalanceOf =
      await this.getAllowanceAndBalanceOfForFromToken(
        bestRouteQuote.uniswapVersion
      );

    const hasEnoughAllowance =
      direction === TradeDirection.input
        ? this._hasGotEnoughAllowance(
            baseConvertRequest.toFixed(),
            allowanceAndBalanceOf.allowance
          )
        : this._hasGotEnoughAllowance(
            bestRouteQuote.expectedConvertQuote,
            allowanceAndBalanceOf.allowance
          );

    const tradeContext: TradeContext = {
      uniswapVersion: bestRouteQuote.uniswapVersion,
      quoteDirection: direction,
      baseConvertRequest: baseConvertRequest.toFixed(),
      minAmountConvertQuote:
        direction === TradeDirection.input
          ? convertQuoteWithSlippage.toFixed(this.toToken.decimals)
          : null,
      maximumSent:
        direction === TradeDirection.input
          ? null
          : tokenAmountInMax.toFixed(this.toToken.decimals),
      expectedConvertQuote: bestRouteQuote.expectedConvertQuote,
      liquidityProviderFee:
        direction === TradeDirection.input
          ? baseConvertRequest
              .times(bestRouteQuote.liquidityProviderFee)
              .toFixed(this.fromToken.decimals)
          : new BigNumber(bestRouteQuote.expectedConvertQuote)
              .times(bestRouteQuote.liquidityProviderFee)
              .toFixed(this.fromToken.decimals),
      liquidityProviderFeePercent: bestRouteQuote.liquidityProviderFee,
      tradeExpires,
      routePathTokenMap: bestRouteQuote.routePathArrayTokenMap,
      routeText: bestRouteQuote.routeText,
      routePath: bestRouteQuote.routePathArray,
      hasEnoughAllowance,
      approvalTransaction: !hasEnoughAllowance
        ? await this.generateApproveMaxAllowanceData(
            bestRouteQuote.uniswapVersion
          )
        : undefined,
      toToken: this.toToken,
      fromToken: this.fromToken,
      fromBalance:
        direction === TradeDirection.input
          ? this.hasGotEnoughBalanceErc20(
              baseConvertRequest.toFixed(),
              allowanceAndBalanceOf.balanceOf
            )
          : this.hasGotEnoughBalanceErc20(
              bestRouteQuote.expectedConvertQuote,
              allowanceAndBalanceOf.balanceOf
            ),
      transaction: this.buildUpTransactionErc20(
        bestRouteQuote.uniswapVersion,
        data
      ),
      allTriedRoutesQuotes: bestRouteQuotes.triedRoutesQuote,
      quoteChanged$: this._quoteChanged$,
      destroy: () => this.destroy(),
    };

    return tradeContext;
  }

  /**
   * Find the best price and route path to take (will round down the slippage)
   * @param baseConvertRequest The base convert request can be both input or output direction
   * @param direction The direction you want to get the quote from
   */
  private async findBestPriceAndPathEthToErc20(
    baseConvertRequest: BigNumber,
    direction: TradeDirection
  ): Promise<TradeContext> {
    const bestRouteQuotes = await this._routes.findBestRoute(
      baseConvertRequest,
      direction
    );
    const bestRouteQuote = bestRouteQuotes.bestRouteQuote;

    const convertQuoteWithSlippage = new BigNumber(
      bestRouteQuote.expectedConvertQuote
    ).minus(
      new BigNumber(bestRouteQuote.expectedConvertQuote)
        .times(this._uniswapPairFactoryContext.settings.slippage)
        .toFixed(this.toToken.decimals)
    );

    const tokenAmountInMax = new BigNumber(
      bestRouteQuote.expectedConvertQuote
    ).plus(
      new BigNumber(bestRouteQuote.expectedConvertQuote)
        .times(this._uniswapPairFactoryContext.settings.slippage)
        .toFixed(this.fromToken.decimals)
    );

    const tradeExpires = this.generateTradeDeadlineUnixTime();

    const data =
      direction === TradeDirection.input
        ? this.generateTradeDataEthToErc20Input(
            baseConvertRequest,
            convertQuoteWithSlippage,
            bestRouteQuote,
            tradeExpires.toString()
          )
        : this.generateTradeDataEthToErc20Output(
            tokenAmountInMax,
            baseConvertRequest,
            bestRouteQuote,
            tradeExpires.toString()
          );

    const tradeContext: TradeContext = {
      uniswapVersion: bestRouteQuote.uniswapVersion,
      quoteDirection: direction,
      baseConvertRequest: baseConvertRequest.toFixed(),
      minAmountConvertQuote:
        direction === TradeDirection.input
          ? convertQuoteWithSlippage.toFixed(this.toToken.decimals)
          : null,
      maximumSent:
        direction === TradeDirection.input
          ? null
          : tokenAmountInMax.toFixed(this.toToken.decimals),
      expectedConvertQuote: bestRouteQuote.expectedConvertQuote,
      liquidityProviderFee:
        direction === TradeDirection.input
          ? baseConvertRequest
              .times(bestRouteQuote.liquidityProviderFee)
              .toFixed(this.fromToken.decimals)
          : new BigNumber(bestRouteQuote.expectedConvertQuote)
              .times(bestRouteQuote.liquidityProviderFee)
              .toFixed(this.fromToken.decimals),
      liquidityProviderFeePercent: bestRouteQuote.liquidityProviderFee,
      tradeExpires,
      routePathTokenMap: bestRouteQuote.routePathArrayTokenMap,
      routeText: bestRouteQuote.routeText,
      routePath: bestRouteQuote.routePathArray.map((r) =>
        removeEthFromContractAddress(r)
      ),
      hasEnoughAllowance: true,
      toToken: this.toToken,
      fromToken: turnTokenIntoEthForResponse(this.fromToken),
      fromBalance: await this.hasGotEnoughBalanceEth(
        direction === TradeDirection.input
          ? baseConvertRequest.toFixed()
          : bestRouteQuote.expectedConvertQuote
      ),
      transaction: this.buildUpTransactionEth(
        bestRouteQuote.uniswapVersion,
        direction === TradeDirection.input
          ? baseConvertRequest
          : new BigNumber(bestRouteQuote.expectedConvertQuote),
        data
      ),
      allTriedRoutesQuotes: bestRouteQuotes.triedRoutesQuote,
      quoteChanged$: this._quoteChanged$,
      destroy: () => this.destroy(),
    };

    return tradeContext;
  }

  /**
   * Generate trade data eth > erc20
   * @param tokenAmount The token amount
   * @param routeQuote The route quote
   * @param deadline The deadline it expiries unix time
   */
  private generateTradeDataEthToErc20Input(
    ethAmountIn: BigNumber,
    tokenAmount: BigNumber,
    routeQuote: RouteQuote,
    deadline: string
  ): string {
    // uniswap adds extra digits on even if the token is say 8 digits long
    const convertedMinTokens = tokenAmount
      .shiftedBy(this.toToken.decimals)
      .decimalPlaces(0);

    switch (routeQuote.uniswapVersion) {
      case UniswapVersion.v2:
        return this._uniswapRouterContractFactoryV2.swapExactETHForTokens(
          hexlify(convertedMinTokens),
          routeQuote.routePathArray.map((r) => removeEthFromContractAddress(r)),
          this._uniswapPairFactoryContext.ethereumAddress,
          deadline
        );
      case UniswapVersion.v3:
        return this.generateTradeDataForV3Input(
          parseEther(ethAmountIn),
          convertedMinTokens,
          routeQuote.liquidityProviderFee,
          deadline
        );
      default:
        throw new UniswapError(
          'Uniswap version not supported',
          ErrorCodes.uniswapVersionNotSupported
        );
    }
  }

  /**
   * Generate trade data eth > erc20
   * @param tokenAmountInMax The amount in max
   * @param ethAmountOut The amount to receive
   * @param routeQuote The route quote
   * @param deadline The deadline it expiries unix time
   */
  private generateTradeDataEthToErc20Output(
    ethAmountInMax: BigNumber,
    tokenAmountOut: BigNumber,
    routeQuote: RouteQuote,
    deadline: string
  ): string {
    const amountOut = tokenAmountOut
      .shiftedBy(this.toToken.decimals)
      .decimalPlaces(0);

    switch (routeQuote.uniswapVersion) {
      case UniswapVersion.v2:
        return this._uniswapRouterContractFactoryV2.swapETHForExactTokens(
          hexlify(amountOut),
          routeQuote.routePathArray.map((r) => removeEthFromContractAddress(r)),
          this._uniswapPairFactoryContext.ethereumAddress,
          deadline
        );
      case UniswapVersion.v3:
        return this.generateTradeDataForV3Output(
          amountOut,
          parseEther(ethAmountInMax),
          routeQuote,
          deadline
        );
      default:
        throw new UniswapError(
          'Uniswap version not supported',
          ErrorCodes.uniswapVersionNotSupported
        );
    }
  }

  /**
   * Generate trade amount erc20 > eth for input direction
   * @param tokenAmount The amount in
   * @param ethAmountOutMin The min amount to receive
   * @param routeQuote The route quote
   * @param deadline The deadline it expiries unix time
   */
  private generateTradeDataErc20ToEthInput(
    tokenAmount: BigNumber,
    ethAmountOutMin: BigNumber,
    routeQuote: RouteQuote,
    deadline: string
  ): string {
    // uniswap adds extra digits on even if the token is say 8 digits long
    const amountIn = tokenAmount
      .shiftedBy(this.fromToken.decimals)
      .decimalPlaces(0);

    switch (routeQuote.uniswapVersion) {
      case UniswapVersion.v2:
        return this._uniswapRouterContractFactoryV2.swapExactTokensForETH(
          hexlify(amountIn),
          hexlify(parseEther(ethAmountOutMin)),
          routeQuote.routePathArray.map((r) => removeEthFromContractAddress(r)),
          this._uniswapPairFactoryContext.ethereumAddress,
          deadline
        );
      case UniswapVersion.v3:
        return this.generateTradeDataForV3Input(
          amountIn,
          parseEther(ethAmountOutMin),
          routeQuote.liquidityProviderFee,
          deadline
        );
      default:
        throw new UniswapError(
          'Uniswap version not supported',
          ErrorCodes.uniswapVersionNotSupported
        );
    }
  }

  /**
   * Generate trade amount erc20 > eth for input direction
   * @param tokenAmountInMax The amount in max
   * @param ethAmountOut The amount to receive
   * @param routeQuote The route quote
   * @param deadline The deadline it expiries unix time
   */
  private generateTradeDataErc20ToEthOutput(
    tokenAmountInMax: BigNumber,
    ethAmountOut: BigNumber,
    routeQuote: RouteQuote,
    deadline: string
  ): string {
    // uniswap adds extra digits on even if the token is say 8 digits long
    const amountInMax = tokenAmountInMax
      .shiftedBy(this.fromToken.decimals)
      .decimalPlaces(0);

    switch (routeQuote.uniswapVersion) {
      case UniswapVersion.v2:
        return this._uniswapRouterContractFactoryV2.swapTokensForExactETH(
          hexlify(parseEther(ethAmountOut)),
          hexlify(amountInMax),
          routeQuote.routePathArray.map((r) => removeEthFromContractAddress(r)),
          this._uniswapPairFactoryContext.ethereumAddress,
          deadline
        );
      case UniswapVersion.v3:
        return this.generateTradeDataForV3Output(
          parseEther(ethAmountOut),
          amountInMax,
          routeQuote,
          deadline
        );
      default:
        throw new UniswapError(
          'Uniswap version not supported',
          ErrorCodes.uniswapVersionNotSupported
        );
    }
  }

  /**
   * Generate trade amount erc20 > erc20 for input
   * @param tokenAmount The token amount
   * @param tokenAmountOut The min token amount out
   * @param routeQuote The route quote
   * @param deadline The deadline it expiries unix time
   */
  private generateTradeDataErc20ToErc20Input(
    tokenAmount: BigNumber,
    tokenAmountMin: BigNumber,
    routeQuote: RouteQuote,
    deadline: string
  ): string {
    // uniswap adds extra digits on even if the token is say 8 digits long
    const amountIn = tokenAmount
      .shiftedBy(this.fromToken.decimals)
      .decimalPlaces(0);
    const amountMin = tokenAmountMin
      .shiftedBy(this.toToken.decimals)
      .decimalPlaces(0);

    switch (routeQuote.uniswapVersion) {
      case UniswapVersion.v2:
        return this._uniswapRouterContractFactoryV2.swapExactTokensForTokens(
          hexlify(amountIn),
          hexlify(amountMin),
          routeQuote.routePathArray,
          this._uniswapPairFactoryContext.ethereumAddress,
          deadline
        );
      case UniswapVersion.v3:
        return this.generateTradeDataForV3Input(
          amountIn,
          amountMin,
          routeQuote.liquidityProviderFee,
          deadline
        );
      default:
        throw new UniswapError(
          'Uniswap version not supported',
          ErrorCodes.uniswapVersionNotSupported
        );
    }
  }

  /**
   * Generate trade amount erc20 > erc20 for output
   * @param tokenAmount The token amount
   * @param tokenAmountOut The min token amount out
   * @param routeQuote The route quote
   * @param deadline The deadline it expiries unix time
   */
  private generateTradeDataErc20ToErc20Output(
    tokenAmountInMax: BigNumber,
    tokenAmountOut: BigNumber,
    routeQuote: RouteQuote,
    deadline: string
  ): string {
    // uniswap adds extra digits on even if the token is say 8 digits long
    const amountInMax = tokenAmountInMax
      .shiftedBy(this.fromToken.decimals)
      .decimalPlaces(0);

    const amountOut = tokenAmountOut
      .shiftedBy(this.toToken.decimals)
      .decimalPlaces(0);

    switch (routeQuote.uniswapVersion) {
      case UniswapVersion.v2:
        return this._uniswapRouterContractFactoryV2.swapTokensForExactTokens(
          hexlify(amountOut),
          hexlify(amountInMax),
          routeQuote.routePathArray,
          this._uniswapPairFactoryContext.ethereumAddress,
          deadline
        );
      case UniswapVersion.v3:
        return this.generateTradeDataForV3Output(
          amountOut,
          amountInMax,
          routeQuote,
          deadline
        );
      default:
        throw new UniswapError(
          'Uniswap version not supported',
          ErrorCodes.uniswapVersionNotSupported
        );
    }
  }

  /**
   * Generate trade data for v3
   * @param tokenAmount The token amount
   * @param tokenAmountOut The min token amount out
   * @param liquidityProviderFee The liquidity provider fee
   * @param deadline The deadline it expiries unix time
   */
  private generateTradeDataForV3Input(
    tokenAmount: BigNumber,
    tokenAmountMin: BigNumber,
    liquidityProviderFee: number,
    deadline: string
  ): string {
    const params: ExactInputSingleRequest = {
      tokenIn: removeEthFromContractAddress(
        this._uniswapPairFactoryContext.fromToken.contractAddress
      ),
      tokenOut: removeEthFromContractAddress(
        this._uniswapPairFactoryContext.toToken.contractAddress
      ),
      fee: percentToFeeAmount(liquidityProviderFee),
      recipient: this._uniswapPairFactoryContext.ethereumAddress,
      deadline,
      amountIn: hexlify(tokenAmount),
      amountOutMinimum: hexlify(tokenAmountMin),
      sqrtPriceLimitX96: 0,
    };

    return this._uniswapRouterContractFactoryV3.exactInputSingle(params);
  }

  /**
   * Generate trade data for v3
   * @param tokenAmountInMax The amount in max
   * @param ethAmountOut The amount to receive
   * @param routeQuote The route quote
   * @param deadline The deadline it expiries unix time
   */
  private generateTradeDataForV3Output(
    amountOut: BigNumber,
    amountInMaximum: BigNumber,
    routeQuote: RouteQuote,
    deadline: string
  ): string {
    const params: ExactOutputSingleRequest = {
      tokenIn: removeEthFromContractAddress(
        this._uniswapPairFactoryContext.fromToken.contractAddress
      ),
      tokenOut: removeEthFromContractAddress(
        this._uniswapPairFactoryContext.toToken.contractAddress
      ),
      fee: percentToFeeAmount(routeQuote.liquidityProviderFee),
      recipient: this._uniswapPairFactoryContext.ethereumAddress,
      deadline,
      amountOut: hexlify(amountOut),
      amountInMaximum: hexlify(amountInMaximum),
      sqrtPriceLimitX96: 0,
    };

    return this._uniswapRouterContractFactoryV3.exactOutputSingle(params);
  }

  /**
   * Build up a transaction for erc20 from
   * @param data The data
   */
  private buildUpTransactionErc20(
    uniswapVersion: UniswapVersion,
    data: string
  ): Transaction {
    return {
      to:
        uniswapVersion === UniswapVersion.v2
          ? UniswapContractContextV2.routerAddress
          : UniswapContractContextV3.routerAddress,
      from: this._uniswapPairFactoryContext.ethereumAddress,
      data,
      value: Constants.EMPTY_HEX_STRING,
    };
  }

  /**
   * Build up a transaction for eth from
   * @param ethValue The eth value
   * @param data The data
   */
  private buildUpTransactionEth(
    uniswapVersion: UniswapVersion,
    ethValue: BigNumber,
    data: string
  ): Transaction {
    return {
      to:
        uniswapVersion === UniswapVersion.v2
          ? UniswapContractContextV2.routerAddress
          : UniswapContractContextV3.routerAddress,
      from: this._uniswapPairFactoryContext.ethereumAddress,
      data,
      value: toEthersBigNumber(parseEther(ethValue)).toHexString(),
    };
  }

  /**
   * Get the trade path
   */
  private tradePath(): TradePath {
    const network = this._uniswapPairFactoryContext.ethersProvider.network();
    return getTradePath(network.chainId, this.fromToken, this.toToken);
  }

  /**
   * Generates the trade datetime unix time
   */
  private generateTradeDeadlineUnixTime(): number {
    const now = new Date();
    const expiryDate = new Date(
      now.getTime() +
        this._uniswapPairFactoryContext.settings.deadlineMinutes * 60000
    );
    return (expiryDate.getTime() / 1e3) | 0;
  }

  /**
   * Watch trade price move automatically emitting the stream if it changes
   */
  private watchTradePrice(): void {
    this._quoteChangeInternal = setInterval(async () => {
      if (
        this._quoteChanged$.observers.length > 0 &&
        this._currentTradeContext
      ) {
        const trade = await this.executeTradePath(
          new BigNumber(this._currentTradeContext.baseConvertRequest),
          this._currentTradeContext.quoteDirection
        );
        if (
          trade.expectedConvertQuote !==
            this._currentTradeContext.expectedConvertQuote ||
          trade.routeText !== this._currentTradeContext.routeText
        ) {
          this._currentTradeContext = trade;
          this._quoteChanged$.next(trade);
          return;
        }

        // it has expired send another one to them
        if (
          this._currentTradeContext.tradeExpires >
          this.generateTradeDeadlineUnixTime()
        ) {
          this._currentTradeContext = trade;
          this._quoteChanged$.next(trade);
          return;
        }
      }
      // maybe make config???
      // query new prices every 25 seconds
    }, 25000);
  }
}
