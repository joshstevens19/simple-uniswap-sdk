import BigNumber from 'bignumber.js';
import {
  CallReturnContext,
  ContractCallContext,
  ContractCallResults,
  ContractCallReturnContext,
  Multicall,
} from 'ethereum-multicall';
import { ContractContext as ERC20ContractContext } from '../../ABI/types/erc20-contract';
import { ContractContext } from '../../common/contract-context';
import { formatEther } from '../../common/utils/format-ether';
import { getCurrentUnixTime } from '../../common/utils/get-current-unix-time';
import { hexlify } from '../../common/utils/hexlify';
import { parseEther } from '../../common/utils/parse-ether';
import { WETH } from '../../common/weth';
import { TradePath } from '../../enums/trade-path';
import { UniswapRouterContractFactory } from '../router/uniswap-router-contract.factory';
import { Token } from '../token/models/token';
import { BestRouteQuote } from './models/best-route-quote';
import { PriceContext } from './models/price-context';
import { UniswapPairContext } from './models/uniswap-pair-context';
import { UniswapPairContractFactory } from './uniswap-pair-contract-factory';

export class UniswapPairFactory {
  private _fromERC20TokenContract = this._uniswapPairContext.ethersProvider.getContract<ERC20ContractContext>(
    JSON.stringify(ContractContext.erc20Abi),
    this._uniswapPairContext.fromToken.contractAddress
  );

  private _uniswapRouterContractFactory = new UniswapRouterContractFactory(
    this._uniswapPairContext.ethersProvider
  );

  private _uniswapPairFactory = new UniswapPairContractFactory(
    this._uniswapPairContext.ethersProvider
  );

  private _multicall = new Multicall({
    ethersProvider: this._uniswapPairContext.ethersProvider.provider,
  });

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
   * @routes The routes it find the best route to take
   */
  public async trade(
    amount: string,
    routes: string[][]
  ): Promise<PriceContext> {
    const amountBigNumber = new BigNumber(amount);
    switch (this.tradePath()) {
      case TradePath.erc20ToEth:
        const allowance = await this.allowance();
        if (new BigNumber(allowance).isLessThan(amountBigNumber)) {
          throw new Error(
            `${this._uniswapPairContext.ethereumAddress} allowance to move ${this.fromToken.contractAddress}(${this.fromToken.name}) is less then the amount you want to move. Allowance is ${allowance}`
          );
        }
        return await this.getTokenTradeAmountErc20ToEth(
          amountBigNumber,
          routes
        );
      case TradePath.ethToErc20:
        return await this.getTokenTradeAmountEthToErc20(
          amountBigNumber,
          routes
        );
      case TradePath.erc20ToErc20:
        return await this.getTokenTradeAmountErc20ToErc20(
          amountBigNumber,
          routes
        );
      default:
        throw new Error(`${this.tradePath()} is not defined`);
    }
  }

  /**
   * Find the best route rate out of all the route quotes
   * @param amountToTrade The amount to trade
   * @param routes The routes you want to check
   */
  public async findBestRoute(
    amountToTrade: BigNumber,
    routes: string[][]
  ): Promise<BestRouteQuote> {
    const tradeAmount = this.formatAmountToTrade(amountToTrade);

    const contractCallContext: ContractCallContext = {
      reference: 'uniswap',
      contractAddress: ContractContext.routerAddress,
      abi: ContractContext.routerAbi,
      calls: [],
    };

    for (let i = 0; i < routes.length; i++) {
      const routeCombo = routes[i];

      contractCallContext.calls.push({
        reference: `route${i}`,
        methodName: 'getAmountsOut',
        methodParameters: [tradeAmount, routeCombo],
      });
    }

    const contractCallResults = await this._multicall.call(contractCallContext);

    return this.filterBestRouteQuoteFromResults(
      contractCallContext,
      contractCallResults
    );
  }

  /**
   * Has got enough allowance to do the trade
   * @param ethereumAddress The ethereum address
   * @param amount The amount you want to swap
   */
  public async hasGotEnoughAllowance(amount: string): Promise<boolean> {
    const allowance = await this.allowance();

    const bigNumberAllowance = new BigNumber(allowance).shiftedBy(
      this.fromToken.decimals * -1
    );

    if (new BigNumber(amount).isGreaterThan(bigNumberAllowance)) {
      return false;
    }

    return true;
  }

  /**
   * Get the allowance for the amount which can be moved from the `fromToken`
   * on the users behalf. Only valid when the `fromToken` is a ERC20 token.
   */
  public async allowance(): Promise<string> {
    const allowance = await this._fromERC20TokenContract.allowance(
      this._uniswapPairContext.ethereumAddress,
      ContractContext.routerAddress
    );

    return allowance.toHexString();
  }

  /**
   * Generate the from token approve data max allowance to move the tokens.
   * This will return the data for you to send as a transaction
   */
  public generateApproveUniswapAllowanceData(): string {
    return this._fromERC20TokenContract.interface.encodeFunctionData(
      'approve',
      [
        ContractContext.routerAddress,
        '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
      ]
    );
  }

  /**
   * Get the token trade amount for erc20 > eth
   * @param amount The amount
   */
  private async getTokenTradeAmountErc20ToEth(
    amount: BigNumber,
    routes: string[][]
  ): Promise<PriceContext> {
    return await this.findBestPriceAndPathErc20ToEth(amount, routes);
  }

  /**
   * Gets how much token they will get for their trade minus all fees
   * @param ethAmount The eth amount
   */
  private async getTokenTradeAmountEthToErc20(
    ethAmount: BigNumber,
    routes: string[][]
  ): Promise<PriceContext> {
    return await this.findBestPriceAndPathEthToErc20(ethAmount, routes);
  }

  /**
   * Get the token trade amount for erc20 > erc20
   * @param amount The amount
   */
  private async getTokenTradeAmountErc20ToErc20(
    amount: BigNumber,
    routes: string[][]
  ): Promise<PriceContext> {
    return await this.findBestPriceAndPathErc20ToErc20(amount, routes);
  }

  /**
   * finds the best price and path for Erc20ToEth
   * @param amount the erc20Token amount being sent
   */
  private async findBestPriceAndPathErc20ToEth(
    erc20Amount: BigNumber,
    routes: string[][]
  ): Promise<PriceContext> {
    const bestRouteQuote = await this.findBestRoute(erc20Amount, routes);

    const convertQuoteWithSlippage = new BigNumber(
      bestRouteQuote.convertQuote
    ).minus(
      bestRouteQuote.convertQuote
        .times(this._uniswapPairContext.settings.slippage)
        .toFixed(this.fromToken.decimals)
    );

    const priceContext: PriceContext = {
      baseConvertRequest: hexlify(erc20Amount),
      minAmountConvertQuote: hexlify(convertQuoteWithSlippage),
      expectedConvertQuote: hexlify(bestRouteQuote.convertQuote),
      routePath: bestRouteQuote.routePathArray,
      data: this.generateTradeDataErc20ToEth(
        erc20Amount,
        convertQuoteWithSlippage,
        bestRouteQuote.routePathArray
      ),
    };

    return priceContext;
  }

  /**
   * finds the best price and path for Erc20ToErc20
   * @param amount the erc20Token amount being sent
   */
  private async findBestPriceAndPathErc20ToErc20(
    erc20Amount: BigNumber,
    routes: string[][]
  ): Promise<PriceContext> {
    const bestRouteQuote = await this.findBestRoute(erc20Amount, routes);

    const convertQuoteWithSlippage = new BigNumber(
      bestRouteQuote.convertQuote
    ).minus(
      bestRouteQuote.convertQuote
        .times(this._uniswapPairContext.settings.slippage)
        .toFixed(this.fromToken.decimals)
    );

    const priceContext: PriceContext = {
      baseConvertRequest: hexlify(erc20Amount),
      minAmountConvertQuote: hexlify(convertQuoteWithSlippage),
      expectedConvertQuote: hexlify(bestRouteQuote.convertQuote),
      routePath: bestRouteQuote.routePathArray,
      data: this.generateTradeDataErc20ToErc20(
        erc20Amount,
        convertQuoteWithSlippage,
        bestRouteQuote.routePathArray
      ),
    };

    return priceContext;
  }

  /**
   * Find the best price and route path to take (will round down the slippage)
   * @param ethAmount The eth amount
   */
  private async findBestPriceAndPathEthToErc20(
    ethAmount: BigNumber,
    routes: string[][]
  ): Promise<PriceContext> {
    const bestRouteQuote = await this.findBestRoute(ethAmount, routes);

    const convertQuoteWithSlippage = new BigNumber(
      bestRouteQuote.convertQuote
    ).minus(
      bestRouteQuote.convertQuote
        .times(this._uniswapPairContext.settings.slippage)
        .toFixed(this.toToken.decimals)
    );

    const priceContext: PriceContext = {
      baseConvertRequest: hexlify(ethAmount),
      minAmountConvertQuote: hexlify(convertQuoteWithSlippage),
      expectedConvertQuote: hexlify(bestRouteQuote.convertQuote),
      routePath: bestRouteQuote.routePathArray,
      data: this.generateTradeDataEthToErc20(
        convertQuoteWithSlippage,
        bestRouteQuote.routePathArray
      ),
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
    const convertedMinTokens = tokenAmount.shiftedBy(this.toToken.decimals);

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
    const amountIn = tokenAmount.shiftedBy(this.fromToken.decimals);

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
    const amountIn = tokenAmount.shiftedBy(this.fromToken.decimals);
    const amountMin = tokenAmountMin.shiftedBy(this.fromToken.decimals);

    return this._uniswapRouterContractFactory.swapExactTokensForTokens(
      hexlify(amountIn),
      hexlify(amountMin),
      routePathArray,
      this._uniswapPairContext.ethereumAddress,
      this.generateTradeDeadlineUnixTime()
    );
  }

  /**
   * Filer best route from results
   * @param uniswapFactoryContext The uniswap factory context
   * @param contractCallContext The contract call context
   * @param contractCallResults The contract call results
   */
  private filterBestRouteQuoteFromResults(
    contractCallContext: ContractCallContext,
    contractCallResults: ContractCallResults
  ): BestRouteQuote {
    const uniswapResults =
      contractCallResults.results[contractCallContext.reference];

    return this.filterBestRouteFromResults(uniswapResults);
  }

  /**
   * Work out the best route from results
   * @param uniswapFactoryContext The uniswap factory context
   * @param contractCallReturnContext The contract call return context
   */
  private filterBestRouteFromResults(
    contractCallReturnContext: ContractCallReturnContext
  ): BestRouteQuote {
    const tradePath = this.tradePath();

    let result: BestRouteQuote | undefined;

    for (
      let i = 0;
      i < contractCallReturnContext.callsReturnContext.length;
      i++
    ) {
      const callReturnContext = contractCallReturnContext.callsReturnContext[i];
      let newResult;

      switch (tradePath) {
        case TradePath.ethToErc20:
          newResult = this.buildBestRouteQuoteForEthToErc20(callReturnContext);
          break;
        case TradePath.erc20ToEth:
          newResult = this.buildBestRouteQuoteForErc20ToEth(callReturnContext);
          break;
        case TradePath.erc20ToErc20:
          newResult = this.buildBestRouteQuoteForErc20ToErc20(
            callReturnContext
          );
          break;
        default:
          throw new Error(
            `${tradePath} not found in InternalTradePath defined`
          );
      }

      if (
        !result ||
        (result && newResult.convertQuote.isGreaterThan(result.convertQuote))
      ) {
        result = newResult;
      }
    }

    if (!result) {
      throw new Error('No quote found');
    }

    return result;
  }

  /**
   * Build up the best route quote for erc20 > erc20
   * @param callReturnContext The call return context
   */
  private buildBestRouteQuoteForErc20ToErc20(
    callReturnContext: CallReturnContext
  ): BestRouteQuote {
    return this.buildBestRouteQuoteForEthToErc20(callReturnContext);
  }

  /**
   * Build up the best route quote for eth > erc20
   * @param callReturnContext The call return context
   */
  private buildBestRouteQuoteForEthToErc20(
    callReturnContext: CallReturnContext
  ): BestRouteQuote {
    const convertQuoteUnformatted = new BigNumber(
      callReturnContext.returnValues[
        callReturnContext.returnValues.length - 1
      ].hex
    );
    return {
      convertQuote: convertQuoteUnformatted.shiftedBy(
        this.toToken.decimals * -1
      ),
      // route array is always in the 1 index of the method parameters
      routePathArray: callReturnContext.methodParameters[1],
    };
  }

  /**
   * Build up the best route quote for erc20 > eth
   * @param callReturnContext The call return context
   */
  private buildBestRouteQuoteForErc20ToEth(
    callReturnContext: CallReturnContext
  ): BestRouteQuote {
    const convertQuoteUnformatted = new BigNumber(
      callReturnContext.returnValues[
        callReturnContext.returnValues.length - 1
      ].hex
    );
    return {
      convertQuote: new BigNumber(formatEther(convertQuoteUnformatted)),
      // route array is always in the 1 index of the method parameters
      routePathArray: callReturnContext.methodParameters[1],
    };
  }

  /**
   * Get the trade path
   */
  private tradePath(): TradePath {
    const network = this._uniswapPairContext.ethersProvider.network();
    if (
      this.fromToken.contractAddress ===
      WETH.token(network.chainId).contractAddress
    ) {
      return TradePath.ethToErc20;
    }

    if (
      this.toToken.contractAddress ===
      WETH.token(network.chainId).contractAddress
    ) {
      return TradePath.erc20ToEth;
    }

    return TradePath.erc20ToErc20;
  }

  /**
   * Generates the trade dateline unix time
   */
  private generateTradeDeadlineUnixTime(): string {
    const timestamp =
      getCurrentUnixTime() + this._uniswapPairContext.settings.deadlineMinutes;
    return timestamp.toString();
  }

  /**
   * Format amount to trade into callable formats
   * @param amountToTrade The amount to trade
   * @param uniswapFactoryContext The uniswap factory context
   */
  private formatAmountToTrade(amountToTrade: BigNumber): string {
    switch (this.tradePath()) {
      case TradePath.ethToErc20:
        const amountToTradeWei = parseEther(amountToTrade);
        return hexlify(amountToTradeWei);
      case TradePath.erc20ToEth:
      case TradePath.ethToErc20:
        return hexlify(
          amountToTrade.shiftedBy(this._uniswapPairContext.fromToken.decimals)
        );
      default:
        throw new Error(
          `Internal trade path ${this.tradePath()} is not supported`
        );
    }
  }
}
