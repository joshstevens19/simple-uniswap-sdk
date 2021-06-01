import BigNumber from 'bignumber.js';
import { Subject } from 'rxjs';
import { Constants } from '../../common/constants';
import { ErrorCodes } from '../../common/errors/error-codes';
import { UniswapError } from '../../common/errors/uniswap-error';
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
import { FeeAmount } from '../router/v3/enums/fee-amount-v3';
import { UniswapRouterContractFactoryV3 } from '../router/v3/uniswap-router-contract.factory.v3';
import { AllowanceAndBalanceOf } from '../token/models/allowance-balance-of';
import { Token } from '../token/models/token';
import { TokenFactory } from '../token/token.factory';
import { TradeContext } from './models/trade-context';
import { Transaction } from './models/transaction';
import { UniswapPairFactoryContext } from './models/uniswap-pair-factory-context';
import { UniswapPairContractFactoryV2 } from './v2/uniswap-pair-contract.factory.v2';

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

  private _uniswapPairFactoryV2 = new UniswapPairContractFactoryV2(
    this._uniswapPairFactoryContext.ethersProvider
  );

  private _uniswapRouterFactory = new UniswapRouterFactory(
    this._uniswapPairFactoryContext.fromToken,
    this._uniswapPairFactoryContext.toToken,
    this._uniswapPairFactoryContext.settings.disableMultihops,
    this._uniswapPairFactoryContext.uniswapVersions,
    this._uniswapPairFactoryContext.ethersProvider
  );

  private _quoteChangeTimeout: NodeJS.Timeout | undefined;
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
   * Get the contract calls
   */
  public get contractCalls(): UniswapPairContractFactoryV2 {
    return this._uniswapPairFactoryV2;
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
   */
  private async executeTradePath(amount: BigNumber): Promise<TradeContext> {
    switch (this.tradePath()) {
      case TradePath.erc20ToEth:
        return await this.getTokenTradeAmountErc20ToEth(amount);
      case TradePath.ethToErc20:
        return await this.getTokenTradeAmountEthToErc20(amount);
      case TradePath.erc20ToErc20:
        return await this.getTokenTradeAmountErc20ToErc20(amount);
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

    if (this._quoteChangeTimeout) {
      clearTimeout(this._quoteChangeTimeout);
    }
  }

  /**
   * Generate trade - this will return amount but you still need to send the transaction
   * if you want it to be executed on the blockchain
   * @amount The amount you want to swap, this is the FROM token amount.
   */
  public async trade(amount: string): Promise<TradeContext> {
    this.destroy();

    const tradeContext: TradeContext = await this.executeTradePath(
      new BigNumber(amount)
    );

    this.watchTradePrice(tradeContext);

    return tradeContext;
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
   */
  public async findBestRoute(amountToTrade: string): Promise<BestRouteQuotes> {
    return await this._routes.findBestRoute(new BigNumber(amountToTrade));
  }

  /**
   * Find the best route rate out of all the route quotes
   * @param amountToTrade The amount to trade
   */
  public async findAllPossibleRoutesWithQuote(
    amountToTrade: string
  ): Promise<RouteQuote[]> {
    return await this._routes.getAllPossibleRoutesWithQuotes(
      new BigNumber(amountToTrade)
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
   * Get the token trade amount for erc20 > eth
   * @param amount The amount
   */
  private async getTokenTradeAmountErc20ToEth(
    amount: BigNumber
  ): Promise<TradeContext> {
    return await this.findBestPriceAndPathErc20ToEth(amount);
  }

  /**
   * Gets how much token they will get for their trade minus all fees
   * @param ethAmount The eth amount
   */
  private async getTokenTradeAmountEthToErc20(
    ethAmount: BigNumber
  ): Promise<TradeContext> {
    return await this.findBestPriceAndPathEthToErc20(ethAmount);
  }

  /**
   * Get the token trade amount for erc20 > erc20
   * @param amount The amount
   */
  private async getTokenTradeAmountErc20ToErc20(
    amount: BigNumber
  ): Promise<TradeContext> {
    return await this.findBestPriceAndPathErc20ToErc20(amount);
  }

  /**
   * finds the best price and path for Erc20ToEth
   * @param amount the erc20Token amount being sent
   */
  private async findBestPriceAndPathErc20ToEth(
    erc20Amount: BigNumber
  ): Promise<TradeContext> {
    const bestRouteQuotes = await this._routes.findBestRoute(erc20Amount);
    const bestRouteQuote = bestRouteQuotes.bestRouteQuote;

    const convertQuoteWithSlippage = new BigNumber(
      bestRouteQuote.expectedConvertQuote
    ).minus(
      new BigNumber(bestRouteQuote.expectedConvertQuote)
        .times(this._uniswapPairFactoryContext.settings.slippage)
        .toFixed(this.fromToken.decimals)
    );

    const tradeExpires = this.generateTradeDeadlineUnixTime();

    const data = this.generateTradeDataErc20ToEth(
      erc20Amount,
      convertQuoteWithSlippage,
      bestRouteQuote,
      tradeExpires.toString()
    );

    const allowanceAndBalanceOf =
      await this.getAllowanceAndBalanceOfForFromToken(
        bestRouteQuote.uniswapVersion
      );

    const hasEnoughAllowance = this._hasGotEnoughAllowance(
      erc20Amount.toFixed(),
      allowanceAndBalanceOf.allowance
    );

    const tradeContext: TradeContext = {
      uniswapVersion: bestRouteQuote.uniswapVersion,
      baseConvertRequest: erc20Amount.toFixed(),
      minAmountConvertQuote: convertQuoteWithSlippage.toFixed(
        this.toToken.decimals
      ),
      expectedConvertQuote: bestRouteQuote.expectedConvertQuote,
      liquidityProviderFee: erc20Amount
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
      fromBalance: this.hasGotEnoughBalanceErc20(
        erc20Amount.toFixed(),
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
   * @param amount the erc20Token amount being sent
   */
  private async findBestPriceAndPathErc20ToErc20(
    erc20Amount: BigNumber
  ): Promise<TradeContext> {
    const bestRouteQuotes = await this._routes.findBestRoute(erc20Amount);
    const bestRouteQuote = bestRouteQuotes.bestRouteQuote;

    const convertQuoteWithSlippage = new BigNumber(
      bestRouteQuote.expectedConvertQuote
    ).minus(
      new BigNumber(bestRouteQuote.expectedConvertQuote)
        .times(this._uniswapPairFactoryContext.settings.slippage)
        .toFixed(this.fromToken.decimals)
    );

    const tradeExpires = this.generateTradeDeadlineUnixTime();

    const data = this.generateTradeDataErc20ToErc20(
      erc20Amount,
      convertQuoteWithSlippage,
      bestRouteQuote,
      tradeExpires.toString()
    );

    const allowanceAndBalanceOf =
      await this.getAllowanceAndBalanceOfForFromToken(
        bestRouteQuote.uniswapVersion
      );

    const hasEnoughAllowance = this._hasGotEnoughAllowance(
      erc20Amount.toFixed(),
      allowanceAndBalanceOf.allowance
    );

    const tradeContext: TradeContext = {
      uniswapVersion: bestRouteQuote.uniswapVersion,
      baseConvertRequest: erc20Amount.toFixed(),
      minAmountConvertQuote: convertQuoteWithSlippage.toFixed(
        this.toToken.decimals
      ),
      expectedConvertQuote: bestRouteQuote.expectedConvertQuote,
      liquidityProviderFee: erc20Amount
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
      fromBalance: this.hasGotEnoughBalanceErc20(
        erc20Amount.toFixed(),
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
   * @param ethAmount The eth amount
   */
  private async findBestPriceAndPathEthToErc20(
    ethAmount: BigNumber
  ): Promise<TradeContext> {
    const bestRouteQuotes = await this._routes.findBestRoute(ethAmount);
    const bestRouteQuote = bestRouteQuotes.bestRouteQuote;

    const convertQuoteWithSlippage = new BigNumber(
      bestRouteQuote.expectedConvertQuote
    ).minus(
      new BigNumber(bestRouteQuote.expectedConvertQuote)
        .times(this._uniswapPairFactoryContext.settings.slippage)
        .toFixed(this.toToken.decimals)
    );

    const tradeExpires = this.generateTradeDeadlineUnixTime();

    const data = this.generateTradeDataEthToErc20(
      convertQuoteWithSlippage,
      bestRouteQuote,
      tradeExpires.toString()
    );

    const tradeContext: TradeContext = {
      uniswapVersion: bestRouteQuote.uniswapVersion,
      baseConvertRequest: ethAmount.toFixed(),
      minAmountConvertQuote: convertQuoteWithSlippage.toFixed(
        this.toToken.decimals
      ),
      expectedConvertQuote: bestRouteQuote.expectedConvertQuote,
      liquidityProviderFee: ethAmount
        .times(bestRouteQuote.liquidityProviderFee)
        .toFixed(this.fromToken.decimals),
      liquidityProviderFeePercent: bestRouteQuote.liquidityProviderFee,
      tradeExpires,
      routePathTokenMap: bestRouteQuote.routePathArrayTokenMap,
      routeText: bestRouteQuote.routeText,
      routePath: bestRouteQuote.routePathArray,
      hasEnoughAllowance: true,
      toToken: this.toToken,
      fromToken: this.fromToken,
      fromBalance: await this.hasGotEnoughBalanceEth(ethAmount.toFixed()),
      transaction: this.buildUpTransactionEth(
        bestRouteQuote.uniswapVersion,
        ethAmount,
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
  private generateTradeDataEthToErc20(
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
          routeQuote.routePathArray,
          this._uniswapPairFactoryContext.ethereumAddress,
          deadline
        );
      case UniswapVersion.v3:
        return this.generateTradeDataForV3(
          tokenAmount,
          convertedMinTokens,
          routeQuote.routePathArray,
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
   * Generate trade amount erc20 > eth
   * @param tokenAmount The token amount
   * @param ethAmountOutMin The min eth in eth not wei this converts it
   * @param routeQuote The route quote
   * @param deadline The deadline it expiries unix time
   */
  private generateTradeDataErc20ToEth(
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
          routeQuote.routePathArray,
          this._uniswapPairFactoryContext.ethereumAddress,
          deadline
        );
      case UniswapVersion.v3:
        return this.generateTradeDataForV3(
          amountIn,
          parseEther(ethAmountOutMin),
          routeQuote.routePathArray,
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
   * Generate trade amount erc20 > erc20
   * @param tokenAmount The token amount
   * @param tokenAmountOut The min token amount out
   * @param routeQuote The route quote
   * @param deadline The deadline it expiries unix time
   */
  private generateTradeDataErc20ToErc20(
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
        return this.generateTradeDataForV3(
          amountIn,
          amountMin,
          routeQuote.routePathArray,
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
   * @param routePathArray The route path array
   * @param deadline The deadline it expiries unix time
   */
  private generateTradeDataForV3(
    tokenAmount: BigNumber,
    tokenAmountMin: BigNumber,
    routePathArray: string[],
    deadline: string
  ): string {
    const params = {
      path: this._uniswapRouterFactory.encodeRoutePathV3(
        routePathArray,
        new Array(routePathArray.length - 1).fill(FeeAmount.MEDIUM)
      ),
      // recipient: outputIsWETH9 ? router.address : trader.address,
      recipient: this._uniswapPairFactoryContext.ethereumAddress,
      deadline,
      amountIn: hexlify(tokenAmount),
      amountOutMinimum: hexlify(tokenAmountMin),
    };

    return this._uniswapRouterContractFactoryV3.exactInput(params);
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
   * @param tradeContext The old trade context aka the current one
   */
  private async watchTradePrice(tradeContext: TradeContext): Promise<void> {
    this._quoteChangeTimeout = setTimeout(async () => {
      if (this._quoteChanged$.observers.length > 0) {
        const trade = await this.executeTradePath(
          new BigNumber(tradeContext.baseConvertRequest)
        );
        if (
          !new BigNumber(trade.expectedConvertQuote).eq(
            tradeContext.expectedConvertQuote
          ) ||
          trade.routeText !== tradeContext.routeText
        ) {
          this._quoteChanged$.next(trade);
          this.watchTradePrice(trade);
          return;
        }

        // it has expired send another one to them
        if (tradeContext.tradeExpires > this.generateTradeDeadlineUnixTime()) {
          this._quoteChanged$.next(trade);
          this.watchTradePrice(trade);
          return;
        }

        this.watchTradePrice(tradeContext);
      } else {
        this.watchTradePrice(tradeContext);
      }
      // maybe make config???
      // query new prices every 10 seconds
    }, 10000);
  }
}
