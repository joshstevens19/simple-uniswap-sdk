import BigNumber from 'bignumber.js';
import { ContractContext } from '../../common/contract-context';
import { getCurrentUnixTime } from '../../common/utils/get-current-unix-time';
import { hexlify } from '../../common/utils/hexlify';
import { parseEther } from '../../common/utils/parse-ether';
import { getTradePath } from '../../common/utils/trade-path';
import { TradePath } from '../../enums/trade-path';
import { RouteQuote } from '../router/models/route-quote';
import { UniswapRouterContractFactory } from '../router/uniswap-router-contract.factory';
import { UniswapRouterFactory } from '../router/uniswap-router.factory';
import { AllowanceAndBalanceOf } from '../token/models/allowance-balance-of';
import { Token } from '../token/models/token';
import { TokenFactory } from '../token/token.factory';
import { PriceContext } from './models/price-context';
import { UniswapPairContext } from './models/uniswap-pair-context';
import { UniswapPairContractFactory } from './uniswap-pair-contract-factory';

export class UniswapPairFactory {
  private _fromTokenFactory = new TokenFactory(
    this._uniswapPairContext.fromToken.contractAddress,
    this._uniswapPairContext.ethersProvider
  );

  private _uniswapRouterContractFactory = new UniswapRouterContractFactory(
    this._uniswapPairContext.ethersProvider
  );

  private _uniswapPairFactory = new UniswapPairContractFactory(
    this._uniswapPairContext.ethersProvider
  );

  private _uniswapRouterFactory = new UniswapRouterFactory(
    this._uniswapPairContext.fromToken,
    this._uniswapPairContext.toToken,
    this._uniswapPairContext.ethersProvider
  );

  constructor(private _uniswapPairContext: UniswapPairContext) {}

  /**
   * The to token
   */
  public get toToken(): Token {
    return this._uniswapPairContext.toToken;
  }

  /**
   * The from token
   */
  public get fromToken(): Token {
    return this._uniswapPairContext.fromToken;
  }

  /**
   * Get the contract calls
   */
  public get contractCalls(): UniswapPairContractFactory {
    return this._uniswapPairFactory;
  }

  /**
   * Generate trade - this will return amount but you still need to send the transaction
   * if you want it to be executed on the blockchain
   * @amount The amount you want to swap, this is the FROM token amount.
   */
  public async trade(amount: string): Promise<PriceContext> {
    const amountBigNumber = new BigNumber(amount);

    switch (this.tradePath()) {
      case TradePath.erc20ToEth:
        return await this.getTokenTradeAmountErc20ToEth(amountBigNumber);
      case TradePath.ethToErc20:
        return await this.getTokenTradeAmountEthToErc20(amountBigNumber);
      case TradePath.erc20ToErc20:
        return await this.getTokenTradeAmountErc20ToErc20(amountBigNumber);
      default:
        throw new Error(`${this.tradePath()} is not defined`);
    }
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
  public async findBestRoute(amountToTrade: string): Promise<RouteQuote> {
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
  public async findAllPossibleRoutes(): Promise<Token[][]> {
    return await this._routes.getAllPossibleRoutes();
  }

  /**
   * Has got enough allowance to do the trade
   * @param amount The amount you want to swap
   */
  public hasGotEnoughAllowance(amount: string, allowance: string): boolean {
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
  public hasGotEnoughBalanceErc20(
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
  public async hasGotEnoughBalanceEth(
    amount: string
  ): Promise<{
    hasEnough: boolean;
    balance: string;
  }> {
    const balance = await this._uniswapPairContext.ethersProvider.balanceOf(
      this._uniswapPairContext.ethereumAddress
    );

    const bigNumberBalance = new BigNumber(balance).shiftedBy(18 * -1);

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
   * Get the allowance and balance for the from token (erc20 > blah) only
   */
  public async getAllowanceAndBalanceOfForFromToken(): Promise<AllowanceAndBalanceOf> {
    return await this._fromTokenFactory.getAllowanceAndBalanceOf(
      this._uniswapPairContext.ethereumAddress
    );
  }

  /**
   * Get the allowance for the amount which can be moved from the `fromToken`
   * on the users behalf. Only valid when the `fromToken` is a ERC20 token.
   */
  public async allowance(): Promise<string> {
    if (this.tradePath() === TradePath.ethToErc20) {
      return '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff';
    }

    const allowance = await this._fromTokenFactory.allowance(
      this._uniswapPairContext.ethereumAddress
    );

    return allowance;
  }

  /**
   * Generate the from token approve data max allowance to move the tokens.
   * This will return the data for you to send as a transaction
   */
  public generateApproveMaxAllowanceData(): string {
    if (this.tradePath() === TradePath.ethToErc20) {
      throw new Error(
        'You do not need to generate approve uniswap allowance when doing eth > erc20'
      );
    }

    return this._fromTokenFactory.generateApproveAllowanceData(
      ContractContext.routerAddress,
      '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
    );
  }

  /**
   * Get the token trade amount for erc20 > eth
   * @param amount The amount
   */
  private async getTokenTradeAmountErc20ToEth(
    amount: BigNumber
  ): Promise<PriceContext> {
    return await this.findBestPriceAndPathErc20ToEth(amount);
  }

  /**
   * Gets how much token they will get for their trade minus all fees
   * @param ethAmount The eth amount
   */
  private async getTokenTradeAmountEthToErc20(
    ethAmount: BigNumber
  ): Promise<PriceContext> {
    return await this.findBestPriceAndPathEthToErc20(ethAmount);
  }

  /**
   * Get the token trade amount for erc20 > erc20
   * @param amount The amount
   */
  private async getTokenTradeAmountErc20ToErc20(
    amount: BigNumber
  ): Promise<PriceContext> {
    return await this.findBestPriceAndPathErc20ToErc20(amount);
  }

  /**
   * finds the best price and path for Erc20ToEth
   * @param amount the erc20Token amount being sent
   */
  private async findBestPriceAndPathErc20ToEth(
    erc20Amount: BigNumber
  ): Promise<PriceContext> {
    const bestRouteQuote = await this._routes.findBestRoute(erc20Amount);

    const convertQuoteWithSlippage = new BigNumber(
      bestRouteQuote.convertQuote
    ).minus(
      bestRouteQuote.convertQuote
        .times(this._uniswapPairContext.settings.slippage)
        .toFixed(this.fromToken.decimals)
    );

    const allowanceAndBalanceOf = await this.getAllowanceAndBalanceOfForFromToken();

    const priceContext: PriceContext = {
      baseConvertRequest: erc20Amount.toFixed(),
      minAmountConvertQuote: convertQuoteWithSlippage.toFixed(),
      expectedConvertQuote: bestRouteQuote.convertQuote.toFixed(),
      routePathTokenMap: bestRouteQuote.routePathArrayTokenMap,
      routeText: bestRouteQuote.routeText,
      routePath: bestRouteQuote.routePathArray,
      data: this.generateTradeDataErc20ToEth(
        erc20Amount,
        convertQuoteWithSlippage,
        bestRouteQuote.routePathArray
      ),
      hasEnoughAllowance: this.hasGotEnoughAllowance(
        erc20Amount.toFixed(),
        allowanceAndBalanceOf.allowance
      ),
      fromBalance: this.hasGotEnoughBalanceErc20(
        erc20Amount.toFixed(),
        allowanceAndBalanceOf.balanceOf
      ),
    };

    return priceContext;
  }

  /**
   * finds the best price and path for Erc20ToErc20
   * @param amount the erc20Token amount being sent
   */
  private async findBestPriceAndPathErc20ToErc20(
    erc20Amount: BigNumber
  ): Promise<PriceContext> {
    const bestRouteQuote = await this._routes.findBestRoute(erc20Amount);

    const convertQuoteWithSlippage = new BigNumber(
      bestRouteQuote.convertQuote
    ).minus(
      bestRouteQuote.convertQuote
        .times(this._uniswapPairContext.settings.slippage)
        .toFixed(this.fromToken.decimals)
    );

    const allowanceAndBalanceOf = await this.getAllowanceAndBalanceOfForFromToken();

    const priceContext: PriceContext = {
      baseConvertRequest: erc20Amount.toFixed(),
      minAmountConvertQuote: convertQuoteWithSlippage.toFixed(),
      expectedConvertQuote: bestRouteQuote.convertQuote.toFixed(),
      routePathTokenMap: bestRouteQuote.routePathArrayTokenMap,
      routeText: bestRouteQuote.routeText,
      routePath: bestRouteQuote.routePathArray,
      data: this.generateTradeDataErc20ToErc20(
        erc20Amount,
        convertQuoteWithSlippage,
        bestRouteQuote.routePathArray
      ),
      hasEnoughAllowance: this.hasGotEnoughAllowance(
        erc20Amount.toFixed(),
        allowanceAndBalanceOf.allowance
      ),
      fromBalance: this.hasGotEnoughBalanceErc20(
        erc20Amount.toFixed(),
        allowanceAndBalanceOf.balanceOf
      ),
    };

    return priceContext;
  }

  /**
   * Find the best price and route path to take (will round down the slippage)
   * @param ethAmount The eth amount
   */
  private async findBestPriceAndPathEthToErc20(
    ethAmount: BigNumber
  ): Promise<PriceContext> {
    const bestRouteQuote = await this._routes.findBestRoute(ethAmount);

    const convertQuoteWithSlippage = new BigNumber(
      bestRouteQuote.convertQuote
    ).minus(
      bestRouteQuote.convertQuote
        .times(this._uniswapPairContext.settings.slippage)
        .toFixed(this.toToken.decimals)
    );

    const priceContext: PriceContext = {
      baseConvertRequest: ethAmount.toFixed(),
      minAmountConvertQuote: convertQuoteWithSlippage.toFixed(),
      expectedConvertQuote: bestRouteQuote.convertQuote.toFixed(),
      routePathTokenMap: bestRouteQuote.routePathArrayTokenMap,
      routeText: bestRouteQuote.routeText,
      routePath: bestRouteQuote.routePathArray,
      data: this.generateTradeDataEthToErc20(
        convertQuoteWithSlippage,
        bestRouteQuote.routePathArray
      ),
      hasEnoughAllowance: true,
      fromBalance: await this.hasGotEnoughBalanceEth(ethAmount.toFixed()),
    };

    return priceContext;
  }

  /**
   * Generate trade data eth > erc20
   * @param tokenAmount The token amount
   * @param routePath The route path
   */
  private generateTradeDataEthToErc20(
    tokenAmount: BigNumber,
    routePathArray: string[]
  ): string {
    // uniswap adds extra digits on even if the token is say 8 digits long
    const convertedMinTokens = tokenAmount
      .shiftedBy(this.toToken.decimals)
      .decimalPlaces(0);

    const hex = hexlify(convertedMinTokens);

    return this._uniswapRouterContractFactory.swapExactETHForTokens(
      hex,
      routePathArray,
      this._uniswapPairContext.ethereumAddress,
      this.generateTradeDeadlineUnixTime()
    );
  }

  /**
   * Generate trade amount erc20 > eth
   * @param tokenAmount The token amount
   * @param ethAmountOutMin The min eth in eth not wei this converts it
   * @param routePathArray The route path array
   */
  private generateTradeDataErc20ToEth(
    tokenAmount: BigNumber,
    ethAmountOutMin: BigNumber,
    routePathArray: string[]
  ): string {
    // uniswap adds extra digits on even if the token is say 8 digits long
    const amountIn = tokenAmount
      .shiftedBy(this.fromToken.decimals)
      .decimalPlaces(0);

    const ethAmountOutWei = hexlify(parseEther(ethAmountOutMin));

    return this._uniswapRouterContractFactory.swapExactTokensForETH(
      hexlify(amountIn),
      ethAmountOutWei,
      routePathArray,
      this._uniswapPairContext.ethereumAddress,
      this.generateTradeDeadlineUnixTime()
    );
  }

  /**
   * Generate trade amount erc20 > erc20
   * @param tokenAmount The token amount
   * @param tokenAmountOut The min token amount out
   * @param routePathArray The route path array
   */
  private generateTradeDataErc20ToErc20(
    tokenAmount: BigNumber,
    tokenAmountMin: BigNumber,
    routePathArray: string[]
  ): string {
    // uniswap adds extra digits on even if the token is say 8 digits long
    const amountIn = tokenAmount
      .shiftedBy(this.fromToken.decimals)
      .decimalPlaces(0);
    const amountMin = tokenAmountMin
      .shiftedBy(this.toToken.decimals)
      .decimalPlaces(0);

    return this._uniswapRouterContractFactory.swapExactTokensForTokens(
      hexlify(amountIn),
      hexlify(amountMin),
      routePathArray,
      this._uniswapPairContext.ethereumAddress,
      this.generateTradeDeadlineUnixTime()
    );
  }

  /**
   * Get the trade path
   */
  private tradePath(): TradePath {
    const network = this._uniswapPairContext.ethersProvider.network();
    return getTradePath(network.chainId, this.fromToken, this.toToken);
  }

  /**
   * Generates the trade dateline unix time
   */
  private generateTradeDeadlineUnixTime(): string {
    const timestamp =
      getCurrentUnixTime() + this._uniswapPairContext.settings.deadlineMinutes;
    return timestamp.toString();
  }
}
