import BigNumber from 'bignumber.js';
import {
  CallReturnContext,
  ContractCallContext,
  ContractCallResults,
} from 'ethereum-multicall';
import {
  ExactInputSingleRequest,
  ExactOutputSingleRequest,
} from '../../ABI/types/uniswap-router-v3';
import { CoinGecko } from '../../coin-gecko';
import { Constants } from '../../common/constants';
import { ErrorCodes } from '../../common/errors/error-codes';
import { UniswapError } from '../../common/errors/uniswap-error';
import { COMP } from '../../common/tokens/comp';
import { DAI } from '../../common/tokens/dai';
import {
  ETH_SYMBOL,
  isNativeEth,
  removeEthFromContractAddress,
  turnTokenIntoEthForResponse,
} from '../../common/tokens/eth';
import { USDC } from '../../common/tokens/usdc';
import { USDT } from '../../common/tokens/usdt';
import { WBTC } from '../../common/tokens/wbtc';
import { WETHContract } from '../../common/tokens/weth';
import { deepClone } from '../../common/utils/deep-clone';
import { formatEther } from '../../common/utils/format-ether';
import { hexlify } from '../../common/utils/hexlify';
import { onlyUnique } from '../../common/utils/only-unique';
import { parseEther } from '../../common/utils/parse-ether';
import { toEthersBigNumber } from '../../common/utils/to-ethers-big-number';
import { getTradePath } from '../../common/utils/trade-path';
import { CustomMulticall } from '../../custom-multicall';
import { ChainId } from '../../enums/chain-id';
import { TradePath } from '../../enums/trade-path';
import { UniswapVersion } from '../../enums/uniswap-version';
import { EthersProvider } from '../../ethers-provider';
import { uniswapContracts } from '../../uniswap-contract-context/get-uniswap-contracts';
import { UniswapContractContextV2 } from '../../uniswap-contract-context/uniswap-contract-context-v2';
import { UniswapContractContextV3 } from '../../uniswap-contract-context/uniswap-contract-context-v3';
import { TradeDirection } from '../pair/models/trade-direction';
import { Transaction } from '../pair/models/transaction';
import { UniswapPairSettings } from '../pair/models/uniswap-pair-settings';
import { AllowanceAndBalanceOf } from '../token/models/allowance-balance-of';
import { Token } from '../token/models/token';
import { TokensFactory } from '../token/tokens.factory';
import { RouterDirection } from './enums/router-direction';
import { AllPossibleRoutes } from './models/all-possible-routes';
import { BestRouteQuotes } from './models/best-route-quotes';
import { RouteContext } from './models/route-context';
import { RouteQuote } from './models/route-quote';
import { RouteQuoteTradeContext } from './models/route-quote-trade-context';
import { TokenRoutes } from './models/token-routes';
import { UniswapRouterContractFactoryV2 } from './v2/uniswap-router-contract.factory.v2';
import {
  FeeAmount,
  feeToPercent,
  percentToFeeAmount,
} from './v3/enums/fee-amount-v3';
import { UniswapRouterContractFactoryV3 } from './v3/uniswap-router-contract.factory.v3';

export class UniswapRouterFactory {
  private _multicall = new CustomMulticall(
    this._ethersProvider.provider,
    this._settings?.customNetwork?.multicallContractAddress
  );

  private _uniswapRouterContractFactoryV2 = new UniswapRouterContractFactoryV2(
    this._ethersProvider,
    uniswapContracts.v2.getRouterAddress(
      this._settings.cloneUniswapContractDetails
    )
  );

  private _uniswapRouterContractFactoryV3 = new UniswapRouterContractFactoryV3(
    this._ethersProvider,
    uniswapContracts.v3.getRouterAddress(
      this._settings.cloneUniswapContractDetails
    )
  );

  private _tokensFactory = new TokensFactory(
    this._ethersProvider,
    this._settings.customNetwork,
    this._settings.cloneUniswapContractDetails
  );

  private readonly LIQUIDITY_PROVIDER_FEE_V2 = 0.003;

  constructor(
    private _coinGecko: CoinGecko,
    private _ethereumAddress: string,
    private _fromToken: Token,
    private _toToken: Token,
    private _settings: UniswapPairSettings,
    private _ethersProvider: EthersProvider
  ) {}

  /**
   * Get all possible routes will only go up to 4 due to gas increase the more routes
   * you go.
   */
  public async getAllPossibleRoutes(): Promise<AllPossibleRoutes> {
    let findPairs: Token[][][] = [];

    if (!this._settings.disableMultihops) {
      findPairs = [
        this.mainCurrenciesPairsForFromToken,
        this.mainCurrenciesPairsForToToken,
        this.mainCurrenciesPairsForUSDT,
        this.mainCurrenciesPairsForCOMP,
        this.mainCurrenciesPairsForDAI,
        this.mainCurrenciesPairsForUSDC,
        this.mainCurrenciesPairsForWETH,
        this.mainCurrenciesPairsForWBTC,
        [[this._fromToken, this._toToken]],
      ];
    } else {
      // multihops turned off so only go direct
      findPairs = [[[this._fromToken, this._toToken]]];
    }

    // console.log(JSON.stringify(findPairs, null, 4));

    const contractCallContext: ContractCallContext[] = [];

    if (this._settings.uniswapVersions.includes(UniswapVersion.v2)) {
      contractCallContext.push({
        reference: UniswapVersion.v2,
        contractAddress: uniswapContracts.v2.getPairAddress(
          this._settings.cloneUniswapContractDetails
        ),
        abi: UniswapContractContextV2.pairAbi,
        calls: [],
      });

      for (let pairs = 0; pairs < findPairs.length; pairs++) {
        for (
          let tokenPairs = 0;
          tokenPairs < findPairs[pairs].length;
          tokenPairs++
        ) {
          const fromToken = findPairs[pairs][tokenPairs][0];
          const toToken = findPairs[pairs][tokenPairs][1];

          contractCallContext[0].calls.push({
            reference: `${fromToken.contractAddress}-${toToken.contractAddress}-${fromToken.symbol}/${toToken.symbol}`,
            methodName: 'getPair',
            methodParameters: [
              removeEthFromContractAddress(fromToken.contractAddress),
              removeEthFromContractAddress(toToken.contractAddress),
            ],
          });
        }
      }
    }

    // for now v3 quotes will just be direct aka UNI > AAVE etc!
    if (this._settings.uniswapVersions.includes(UniswapVersion.v3)) {
      contractCallContext.push({
        reference: UniswapVersion.v3,
        contractAddress: uniswapContracts.v3.getFactoryAddress(
          this._settings.cloneUniswapContractDetails
        ),
        abi: UniswapContractContextV3.factoryAbi,
        calls: [
          {
            reference: `${this._fromToken.contractAddress}-${this._toToken.contractAddress}-${this._fromToken.symbol}/${this._toToken.symbol}`,
            methodName: 'getPool',
            methodParameters: [
              removeEthFromContractAddress(this._fromToken.contractAddress),
              removeEthFromContractAddress(this._toToken.contractAddress),
              FeeAmount.LOW,
            ],
          },
          {
            reference: `${this._fromToken.contractAddress}-${this._toToken.contractAddress}-${this._fromToken.symbol}/${this._toToken.symbol}`,
            methodName: 'getPool',
            methodParameters: [
              removeEthFromContractAddress(this._fromToken.contractAddress),
              removeEthFromContractAddress(this._toToken.contractAddress),
              FeeAmount.MEDIUM,
            ],
          },
          {
            reference: `${this._fromToken.contractAddress}-${this._toToken.contractAddress}-${this._fromToken.symbol}/${this._toToken.symbol}`,
            methodName: 'getPool',
            methodParameters: [
              removeEthFromContractAddress(this._fromToken.contractAddress),
              removeEthFromContractAddress(this._toToken.contractAddress),
              FeeAmount.HIGH,
            ],
          },
        ],
      });
    }

    const allPossibleRoutes: AllPossibleRoutes = { v2: [], v3: [] };

    const contractCallResults = await this._multicall.call(contractCallContext);

    if (this._settings.uniswapVersions.includes(UniswapVersion.v2)) {
      const results = contractCallResults.results[UniswapVersion.v2];

      const availablePairs = results.callsReturnContext.filter(
        (c) =>
          c.returnValues[0] !== '0x0000000000000000000000000000000000000000'
      );

      // console.log(JSON.stringify(results.callsReturnContext, null, 4));

      const fromTokenRoutes: TokenRoutes = {
        token: this._fromToken,
        pairs: {
          fromTokenPairs: this.getTokenAvailablePairs(
            this._fromToken,
            availablePairs,
            RouterDirection.from
          ),
        },
      };

      const toTokenRoutes: TokenRoutes = {
        token: this._toToken,
        pairs: {
          toTokenPairs: this.getTokenAvailablePairs(
            this._toToken,
            availablePairs,
            RouterDirection.to
          ),
        },
      };

      // console.log(JSON.stringify(fromTokenRoutes, null, 4));
      // console.log('break');
      // console.log(JSON.stringify(toTokenRoutes, null, 4));
      // console.log('break');

      const allMainRoutes: TokenRoutes[] = [];

      for (let i = 0; i < this.allMainTokens.length; i++) {
        const fromTokenPairs = this.getTokenAvailablePairs(
          this.allMainTokens[i],
          availablePairs,
          RouterDirection.from
        );

        const toTokenPairs = this.getTokenAvailablePairs(
          this.allMainTokens[i],
          availablePairs,
          RouterDirection.to
        );

        allMainRoutes.push({
          token: this.allMainTokens[i],
          pairs: { fromTokenPairs, toTokenPairs },
        });
      }

      // console.log(JSON.stringify(allMainRoutes, null, 4));

      allPossibleRoutes.v2 = this.workOutAllPossibleRoutes(
        fromTokenRoutes,
        toTokenRoutes,
        allMainRoutes
      );
    }

    if (this._settings.uniswapVersions.includes(UniswapVersion.v3)) {
      const results = contractCallResults.results[UniswapVersion.v3];

      for (let i = 0; i < results.callsReturnContext.length; i++) {
        if (
          results.callsReturnContext[i].returnValues[0] !==
          '0x0000000000000000000000000000000000000000'
        ) {
          let liquidityProviderFee!: FeeAmount;
          switch (i) {
            case 0:
              liquidityProviderFee = FeeAmount.LOW;
              break;
            case 1:
              liquidityProviderFee = FeeAmount.MEDIUM;
              break;
            case 2:
              liquidityProviderFee = FeeAmount.HIGH;
              break;
          }

          allPossibleRoutes.v3.push({
            route: [this._fromToken, this._toToken],
            liquidityProviderFee: feeToPercent(liquidityProviderFee),
          });
        }
      }
    }

    // console.log(JSON.stringify(allPossibleRoutes, null, 4));

    return allPossibleRoutes;
  }

  /**
   * Get all possible routes with the quotes
   * @param amountToTrade The amount to trade
   * @param direction The direction you want to get the quote from
   */
  public async getAllPossibleRoutesWithQuotes(
    amountToTrade: BigNumber,
    direction: TradeDirection
  ): Promise<RouteQuote[]> {
    const tradeAmount = this.formatAmountToTrade(amountToTrade, direction);

    const routes = await this.getAllPossibleRoutes();

    const contractCallContext: ContractCallContext<RouteContext[]>[] = [];
    if (this._settings.uniswapVersions.includes(UniswapVersion.v2)) {
      contractCallContext.push({
        reference: UniswapVersion.v2,
        contractAddress: uniswapContracts.v2.getRouterAddress(
          this._settings.cloneUniswapContractDetails
        ),
        abi: UniswapContractContextV2.routerAbi,
        calls: [],
        context: routes.v2,
      });

      for (let i = 0; i < routes.v2.length; i++) {
        const routeCombo = routes.v2[i].route.map((c) => {
          return removeEthFromContractAddress(c.contractAddress);
        });

        contractCallContext[0].calls.push({
          reference: `route${i}`,
          methodName:
            direction === TradeDirection.input
              ? 'getAmountsOut'
              : 'getAmountsIn',
          methodParameters: [tradeAmount, routeCombo],
        });
      }
    }

    if (this._settings.uniswapVersions.includes(UniswapVersion.v3)) {
      contractCallContext.push({
        reference: UniswapVersion.v3,
        contractAddress: uniswapContracts.v3.getQuoterAddress(
          this._settings.cloneUniswapContractDetails
        ),
        abi: UniswapContractContextV3.quoterAbi,
        calls: [],
        context: routes.v3,
      });

      for (let i = 0; i < routes.v3.length; i++) {
        const routeCombo = routes.v3[i].route.map((c) => {
          return removeEthFromContractAddress(c.contractAddress);
        });

        contractCallContext[
          this._settings.uniswapVersions.includes(UniswapVersion.v2) ? 1 : 0
        ].calls.push({
          reference: `route${i}`,
          methodName:
            direction === TradeDirection.input
              ? 'quoteExactInputSingle'
              : 'quoteExactOutputSingle',
          methodParameters: [
            routeCombo[0],
            routeCombo[1],
            percentToFeeAmount(routes.v3[i].liquidityProviderFee),
            tradeAmount,
            0,
          ],
        });
      }
    }

    const contractCallResults = await this._multicall.call(contractCallContext);

    return this.buildRouteQuotesFromResults(
      amountToTrade,
      contractCallResults,
      direction
    );
  }

  /**
   * Finds the best route
   * @param amountToTrade The amount they want to trade
   * @param direction The direction you want to get the quote from
   */
  public async findBestRoute(
    amountToTrade: BigNumber,
    direction: TradeDirection
  ): Promise<BestRouteQuotes> {
    let allRoutes = await this.getAllPossibleRoutesWithQuotes(
      amountToTrade,
      direction
    );

    if (allRoutes.length === 0) {
      throw new UniswapError(
        `No routes found for ${this._fromToken.symbol} > ${this._toToken.symbol}`,
        ErrorCodes.noRoutesFound
      );
    }

    const allowanceAndBalances = await this.hasEnoughAllowanceAndBalance(
      amountToTrade,
      allRoutes[0],
      direction
    );

    if (
      this._ethersProvider.provider.network.chainId === ChainId.MAINNET &&
      this._settings.gasSettings &&
      allowanceAndBalances.enoughBalance
    ) {
      allRoutes = await this.filterWithTransactionFees(
        allRoutes,
        allowanceAndBalances.enoughV2Allowance,
        allowanceAndBalances.enoughV3Allowance
      );
    }

    return {
      bestRouteQuote: allRoutes[0],
      triedRoutesQuote: allRoutes.map((route) => {
        return {
          expectedConvertQuote: route.expectedConvertQuote,
          expectedConvertQuoteOrTokenAmountInMaxWithSlippage:
            route.expectedConvertQuoteOrTokenAmountInMaxWithSlippage,
          transaction: route.transaction,
          tradeExpires: route.tradeExpires,
          routePathArrayTokenMap: route.routePathArrayTokenMap,
          routeText: route.routeText,
          routePathArray: route.routePathArray,
          uniswapVersion: route.uniswapVersion,
          liquidityProviderFee: route.liquidityProviderFee,
          quoteDirection: route.quoteDirection,
          gasPriceEstimatedBy: route.gasPriceEstimatedBy,
        };
      }),
      hasEnoughBalance: allowanceAndBalances.enoughBalance,
      fromBalance: allowanceAndBalances.fromBalance,
      toBalance: allowanceAndBalances.toBalance,
      hasEnoughAllowance:
        allRoutes[0].uniswapVersion === UniswapVersion.v2
          ? allowanceAndBalances.enoughV2Allowance
          : allowanceAndBalances.enoughV3Allowance,
    };
  }

  /**
   * Generates the trade datetime unix time
   */
  public generateTradeDeadlineUnixTime(): number {
    const now = new Date();
    const expiryDate = new Date(
      now.getTime() + this._settings.deadlineMinutes * 60000
    );
    return (expiryDate.getTime() / 1e3) | 0;
  }

  /**
   * Get eth balance
   */
  public async getEthBalance(): Promise<BigNumber> {
    const balance = await this._ethersProvider.balanceOf(this._ethereumAddress);

    return new BigNumber(balance).shiftedBy(Constants.ETH_MAX_DECIMALS * -1);
  }

  /**
   * Generate trade data eth > erc20
   * @param ethAmountIn The eth amount in
   * @param tokenAmount The token amount
   * @param routeQuoteTradeContext The route quote trade context
   * @param deadline The deadline it expiries unix time
   */
  private generateTradeDataEthToErc20Input(
    ethAmountIn: BigNumber,
    tokenAmount: BigNumber,
    routeQuoteTradeContext: RouteQuoteTradeContext,
    deadline: string
  ): string {
    // uniswap adds extra digits on even if the token is say 8 digits long
    const convertedMinTokens = tokenAmount
      .shiftedBy(this._toToken.decimals)
      .decimalPlaces(0);

    switch (routeQuoteTradeContext.uniswapVersion) {
      case UniswapVersion.v2:
        return this._uniswapRouterContractFactoryV2.swapExactETHForTokens(
          hexlify(convertedMinTokens),
          routeQuoteTradeContext.routePathArray.map((r) =>
            removeEthFromContractAddress(r)
          ),
          this._ethereumAddress,
          deadline
        );
      case UniswapVersion.v3:
        return this.generateTradeDataForV3Input(
          parseEther(ethAmountIn),
          convertedMinTokens,
          routeQuoteTradeContext.liquidityProviderFee,
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
    routeQuoteTradeContext: RouteQuoteTradeContext,
    deadline: string
  ): string {
    const amountOut = tokenAmountOut
      .shiftedBy(this._toToken.decimals)
      .decimalPlaces(0);

    switch (routeQuoteTradeContext.uniswapVersion) {
      case UniswapVersion.v2:
        return this._uniswapRouterContractFactoryV2.swapETHForExactTokens(
          hexlify(amountOut),
          routeQuoteTradeContext.routePathArray.map((r) =>
            removeEthFromContractAddress(r)
          ),
          this._ethereumAddress,
          deadline
        );
      case UniswapVersion.v3:
        return this.generateTradeDataForV3Output(
          amountOut,
          parseEther(ethAmountInMax),
          routeQuoteTradeContext.liquidityProviderFee,
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
   * @param routeQuoteTradeContext The route quote trade context
   * @param deadline The deadline it expiries unix time
   */
  private generateTradeDataErc20ToEthInput(
    tokenAmount: BigNumber,
    ethAmountOutMin: BigNumber,
    routeQuoteTradeContext: RouteQuoteTradeContext,
    deadline: string
  ): string {
    // uniswap adds extra digits on even if the token is say 8 digits long
    const amountIn = tokenAmount
      .shiftedBy(this._fromToken.decimals)
      .decimalPlaces(0);

    switch (routeQuoteTradeContext.uniswapVersion) {
      case UniswapVersion.v2:
        return this._uniswapRouterContractFactoryV2.swapExactTokensForETH(
          hexlify(amountIn),
          hexlify(parseEther(ethAmountOutMin)),
          routeQuoteTradeContext.routePathArray.map((r) =>
            removeEthFromContractAddress(r)
          ),
          this._ethereumAddress,
          deadline
        );
      case UniswapVersion.v3:
        return this.generateTradeDataForV3Input(
          amountIn,
          parseEther(ethAmountOutMin),
          routeQuoteTradeContext.liquidityProviderFee,
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
   * @param routeQuoteTradeContext The route quote trade context
   * @param deadline The deadline it expiries unix time
   */
  private generateTradeDataErc20ToEthOutput(
    tokenAmountInMax: BigNumber,
    ethAmountOut: BigNumber,
    routeQuoteTradeContext: RouteQuoteTradeContext,
    deadline: string
  ): string {
    // uniswap adds extra digits on even if the token is say 8 digits long
    const amountInMax = tokenAmountInMax
      .shiftedBy(this._fromToken.decimals)
      .decimalPlaces(0);

    switch (routeQuoteTradeContext.uniswapVersion) {
      case UniswapVersion.v2:
        return this._uniswapRouterContractFactoryV2.swapTokensForExactETH(
          hexlify(parseEther(ethAmountOut)),
          hexlify(amountInMax),
          routeQuoteTradeContext.routePathArray.map((r) =>
            removeEthFromContractAddress(r)
          ),
          this._ethereumAddress,
          deadline
        );
      case UniswapVersion.v3:
        return this.generateTradeDataForV3Output(
          parseEther(ethAmountOut),
          amountInMax,
          routeQuoteTradeContext.liquidityProviderFee,
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
   * @param routeQuoteTradeContext The route quote trade context
   * @param deadline The deadline it expiries unix time
   */
  private generateTradeDataErc20ToErc20Input(
    tokenAmount: BigNumber,
    tokenAmountMin: BigNumber,
    routeQuoteTradeContext: RouteQuoteTradeContext,
    deadline: string
  ): string {
    // uniswap adds extra digits on even if the token is say 8 digits long
    const amountIn = tokenAmount
      .shiftedBy(this._fromToken.decimals)
      .decimalPlaces(0);
    const amountMin = tokenAmountMin
      .shiftedBy(this._toToken.decimals)
      .decimalPlaces(0);

    switch (routeQuoteTradeContext.uniswapVersion) {
      case UniswapVersion.v2:
        return this._uniswapRouterContractFactoryV2.swapExactTokensForTokens(
          hexlify(amountIn),
          hexlify(amountMin),
          routeQuoteTradeContext.routePathArray,
          this._ethereumAddress,
          deadline
        );
      case UniswapVersion.v3:
        return this.generateTradeDataForV3Input(
          amountIn,
          amountMin,
          routeQuoteTradeContext.liquidityProviderFee,
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
   * @param routeQuoteTradeContext The route quote trade context
   * @param deadline The deadline it expiries unix time
   */
  private generateTradeDataErc20ToErc20Output(
    tokenAmountInMax: BigNumber,
    tokenAmountOut: BigNumber,
    routeQuoteTradeContext: RouteQuoteTradeContext,
    deadline: string
  ): string {
    // uniswap adds extra digits on even if the token is say 8 digits long
    const amountInMax = tokenAmountInMax
      .shiftedBy(this._fromToken.decimals)
      .decimalPlaces(0);

    const amountOut = tokenAmountOut
      .shiftedBy(this._toToken.decimals)
      .decimalPlaces(0);

    switch (routeQuoteTradeContext.uniswapVersion) {
      case UniswapVersion.v2:
        return this._uniswapRouterContractFactoryV2.swapTokensForExactTokens(
          hexlify(amountOut),
          hexlify(amountInMax),
          routeQuoteTradeContext.routePathArray,
          this._ethereumAddress,
          deadline
        );
      case UniswapVersion.v3:
        return this.generateTradeDataForV3Output(
          amountOut,
          amountInMax,
          routeQuoteTradeContext.liquidityProviderFee,
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
    const isNativeReceivingNativeEth = isNativeEth(
      this._toToken.contractAddress
    );
    const params: ExactInputSingleRequest = {
      tokenIn: removeEthFromContractAddress(this._fromToken.contractAddress),
      tokenOut: removeEthFromContractAddress(this._toToken.contractAddress),
      fee: percentToFeeAmount(liquidityProviderFee),
      recipient:
        isNativeReceivingNativeEth === true
          ? '0x0000000000000000000000000000000000000000'
          : this._ethereumAddress,
      deadline,
      amountIn: hexlify(tokenAmount),
      amountOutMinimum: hexlify(tokenAmountMin),
      sqrtPriceLimitX96: 0,
    };

    const multicallData: string[] = [];

    multicallData.push(
      this._uniswapRouterContractFactoryV3.exactInputSingle(params)
    );
    if (isNativeEth(this._toToken.contractAddress)) {
      multicallData.push(
        this._uniswapRouterContractFactoryV3.unwrapWETH9(
          hexlify(tokenAmountMin),
          this._ethereumAddress
        )
      );
    }

    return this._uniswapRouterContractFactoryV3.multicall(multicallData);
  }

  /**
   * Generate trade data for v3
   * @param tokenAmountInMax The amount in max
   * @param ethAmountOut The amount to receive
   * @param liquidityProviderFee The liquidity provider fee
   * @param deadline The deadline it expiries unix time
   */
  private generateTradeDataForV3Output(
    amountOut: BigNumber,
    amountInMaximum: BigNumber,
    liquidityProviderFee: number,
    deadline: string
  ): string {
    const isNativeReceivingNativeEth = isNativeEth(
      this._toToken.contractAddress
    );

    const params: ExactOutputSingleRequest = {
      tokenIn: removeEthFromContractAddress(this._fromToken.contractAddress),
      tokenOut: removeEthFromContractAddress(this._toToken.contractAddress),
      fee: percentToFeeAmount(liquidityProviderFee),
      recipient:
        isNativeReceivingNativeEth === true
          ? '0x0000000000000000000000000000000000000000'
          : this._ethereumAddress,
      deadline,
      amountOut: hexlify(amountOut),
      amountInMaximum: hexlify(amountInMaximum),
      sqrtPriceLimitX96: 0,
    };

    const multicallData: string[] = [];

    multicallData.push(
      this._uniswapRouterContractFactoryV3.exactOutputSingle(params)
    );
    if (isNativeEth(this._toToken.contractAddress)) {
      multicallData.push(
        this._uniswapRouterContractFactoryV3.unwrapWETH9(
          hexlify(amountOut),
          this._ethereumAddress
        )
      );
    }

    return this._uniswapRouterContractFactoryV3.multicall(multicallData);
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
          ? uniswapContracts.v2.getRouterAddress(
              this._settings.cloneUniswapContractDetails
            )
          : uniswapContracts.v3.getRouterAddress(
              this._settings.cloneUniswapContractDetails
            ),
      from: this._ethereumAddress,
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
          ? uniswapContracts.v2.getRouterAddress(
              this._settings.cloneUniswapContractDetails
            )
          : uniswapContracts.v3.getRouterAddress(
              this._settings.cloneUniswapContractDetails
            ),
      from: this._ethereumAddress,
      data,
      value: toEthersBigNumber(parseEther(ethValue)).toHexString(),
    };
  }

  /**
   * Get the allowance and balance for the from and to token (will get balance for eth as well)
   */
  private async getAllowanceAndBalanceForTokens(): Promise<{
    fromToken: AllowanceAndBalanceOf;
    toToken: AllowanceAndBalanceOf;
  }> {
    const allowanceAndBalanceOfForTokens =
      await this._tokensFactory.getAllowanceAndBalanceOfForContracts(
        this._ethereumAddress,
        [this._fromToken.contractAddress, this._toToken.contractAddress],
        false
      );

    return {
      fromToken: allowanceAndBalanceOfForTokens.find(
        (c) =>
          c.token.contractAddress.toLowerCase() ===
          this._fromToken.contractAddress.toLowerCase()
      )!.allowanceAndBalanceOf,
      toToken: allowanceAndBalanceOfForTokens.find(
        (c) =>
          c.token.contractAddress.toLowerCase() ===
          this._toToken.contractAddress.toLowerCase()
      )!.allowanceAndBalanceOf,
    };
  }

  /**
   * Has got enough allowance to do the trade
   * @param amount The amount you want to swap
   */
  private hasGotEnoughAllowance(amount: string, allowance: string): boolean {
    if (this.tradePath() === TradePath.ethToErc20) {
      return true;
    }

    const bigNumberAllowance = new BigNumber(allowance).shiftedBy(
      this._fromToken.decimals * -1
    );

    if (new BigNumber(amount).isGreaterThan(bigNumberAllowance)) {
      return false;
    }

    return true;
  }

  private async hasEnoughAllowanceAndBalance(
    amountToTrade: BigNumber,
    bestRouteQuote: RouteQuote,
    direction: TradeDirection
  ): Promise<{
    enoughBalance: boolean;
    fromBalance: string;
    toBalance: string;
    enoughV2Allowance: boolean;
    enoughV3Allowance: boolean;
  }> {
    const allowanceAndBalancesForTokens =
      await this.getAllowanceAndBalanceForTokens();

    let enoughBalance = false;
    let fromBalance = allowanceAndBalancesForTokens.fromToken.balanceOf;

    switch (this.tradePath()) {
      case TradePath.ethToErc20:
        const result = await this.hasGotEnoughBalanceEth(
          direction === TradeDirection.input
            ? amountToTrade.toFixed()
            : bestRouteQuote.expectedConvertQuote
        );
        enoughBalance = result.hasEnough;
        fromBalance = result.balance;
        break;
      case TradePath.erc20ToErc20:
      case TradePath.erc20ToEth:
        if (direction == TradeDirection.input) {
          const result = this.hasGotEnoughBalanceErc20(
            amountToTrade.toFixed(),
            allowanceAndBalancesForTokens.fromToken.balanceOf
          );

          enoughBalance = result.hasEnough;
          fromBalance = result.balance;
        } else {
          const result = this.hasGotEnoughBalanceErc20(
            bestRouteQuote.expectedConvertQuote,
            allowanceAndBalancesForTokens.fromToken.balanceOf
          );

          enoughBalance = result.hasEnough;
          fromBalance = result.balance;
        }
    }

    const enoughV2Allowance =
      direction === TradeDirection.input
        ? this.hasGotEnoughAllowance(
            amountToTrade.toFixed(),
            allowanceAndBalancesForTokens.fromToken.allowanceV2
          )
        : this.hasGotEnoughAllowance(
            bestRouteQuote.expectedConvertQuote,
            allowanceAndBalancesForTokens.fromToken.allowanceV2
          );

    const enoughV3Allowance =
      direction === TradeDirection.input
        ? this.hasGotEnoughAllowance(
            amountToTrade.toFixed(),
            allowanceAndBalancesForTokens.fromToken.allowanceV3
          )
        : this.hasGotEnoughAllowance(
            bestRouteQuote.expectedConvertQuote,
            allowanceAndBalancesForTokens.fromToken.allowanceV3
          );

    return {
      enoughV2Allowance,
      enoughV3Allowance,
      enoughBalance,
      fromBalance,
      toBalance: allowanceAndBalancesForTokens.toToken.balanceOf,
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
      this._fromToken.decimals * -1
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
   * Work out trade fiat cost
   * @param allRoutes All the routes
   * @param enoughAllowanceV2 Has got enough allowance for v2
   * @param enoughAllowanceV3 Has got enough allowance for v3
   */
  private async filterWithTransactionFees(
    allRoutes: RouteQuote[],
    enoughAllowanceV2: boolean,
    enoughAllowanceV3: boolean
  ): Promise<RouteQuote[]> {
    if (this._settings.gasSettings && !this._settings.disableMultihops) {
      const ethContract = WETHContract.MAINNET().contractAddress;

      const fiatPrices = await this._coinGecko.getCoinGeckoFiatPrices([
        this._toToken.contractAddress,
        ethContract,
      ]);

      const toUsdValue = fiatPrices[this._toToken.contractAddress];
      const ethUsdValue = fiatPrices[WETHContract.MAINNET().contractAddress];

      if (toUsdValue && ethUsdValue) {
        const bestRouteQuoteHops = this.getBestRouteQuotesHops(
          allRoutes,
          enoughAllowanceV2,
          enoughAllowanceV3
        );

        const gasPriceGwei = await this._settings.gasSettings.getGasPrice();
        const gasPrice = new BigNumber(gasPriceGwei).times(1e9);

        let bestRoute:
          | {
              routeQuote: RouteQuote;
              expectedConvertQuoteMinusTxFees: BigNumber;
            }
          | undefined;
        for (let i = 0; i < bestRouteQuoteHops.length; i++) {
          const route = bestRouteQuoteHops[i];
          const expectedConvertQuoteFiatPrice = new BigNumber(
            route.expectedConvertQuote
          ).times(toUsdValue);

          const txFee = formatEther(
            new BigNumber(
              (
                await this._ethersProvider.provider.estimateGas(
                  route.transaction
                )
              ).toHexString()
            ).times(gasPrice)
          ).times(ethUsdValue);

          route.gasPriceEstimatedBy = gasPriceGwei;

          const expectedConvertQuoteMinusTxFees =
            expectedConvertQuoteFiatPrice.minus(txFee);

          if (bestRoute) {
            if (
              expectedConvertQuoteMinusTxFees.isGreaterThan(
                bestRoute.expectedConvertQuoteMinusTxFees
              )
            ) {
              bestRoute = {
                routeQuote: bestRouteQuoteHops[i],
                expectedConvertQuoteMinusTxFees,
              };
            }
          } else {
            bestRoute = {
              routeQuote: bestRouteQuoteHops[i],
              expectedConvertQuoteMinusTxFees,
            };
          }
        }

        if (bestRoute) {
          const routeIndex = allRoutes.findIndex(
            (r) =>
              r.expectedConvertQuote ===
                bestRoute!.routeQuote.expectedConvertQuote &&
              bestRoute!.routeQuote.routeText === r.routeText
          );

          allRoutes.splice(routeIndex, 1);
          allRoutes.unshift(bestRoute.routeQuote);
        }
      }
    }

    return allRoutes;
  }

  /**
   * Work out the best route quote hops aka the best direct, the best 3 hop and the best 4 hop
   * @param allRoutes All the routes
   * @param enoughAllowanceV2 Has got enough allowance for v2
   * @param enoughAllowanceV3 Has got enough allowance for v3
   */
  private getBestRouteQuotesHops(
    allRoutes: RouteQuote[],
    enoughAllowanceV2: boolean,
    enoughAllowanceV3: boolean
  ): RouteQuote[] {
    const routes: RouteQuote[] = [];
    for (let i = 0; i < allRoutes.length; i++) {
      if (
        routes.find((r) => r.routePathArray.length === 2) &&
        routes.find((r) => r.routePathArray.length === 3) &&
        routes.find((r) => r.routePathArray.length === 4)
      ) {
        break;
      }

      const route = allRoutes[i];
      if (
        route.uniswapVersion === UniswapVersion.v2
          ? enoughAllowanceV2
          : enoughAllowanceV3
      ) {
        if (
          route.routePathArray.length === 2 &&
          !routes.find((r) => r.routePathArray.length === 2)
        ) {
          routes.push(route);
          continue;
        }

        if (
          route.routePathArray.length === 3 &&
          !routes.find((r) => r.routePathArray.length === 3)
        ) {
          routes.push(route);
          continue;
        }

        if (
          route.routePathArray.length === 4 &&
          !routes.find((r) => r.routePathArray.length === 4)
        ) {
          routes.push(route);
          continue;
        }
      }
    }

    return routes;
  }

  // /**
  //  * Encode the route path for v3 ( WILL NEED WHEN WE SUPPORT V3 DOING NONE DIRECT ROUTES)
  //  * @param path The path
  //  * @param fees The fees
  //  */
  // public encodeRoutePathV3(path: string[], fees: FeeAmount[]): string {
  //   // to do move
  //   const FEE_SIZE = 3;

  //   if (path.length != fees.length + 1) {
  //     throw new Error('path/fee lengths do not match');
  //   }

  //   let encoded = '0x';
  //   for (let i = 0; i < fees.length; i++) {
  //     // 20 byte encoding of the address
  //     encoded += path[i].slice(2);
  //     // 3 byte encoding of the fee
  //     encoded += fees[i].toString(16).padStart(2 * FEE_SIZE, '0');
  //   }
  //   // encode the final token
  //   encoded += path[path.length - 1].slice(2);

  //   return encoded.toLowerCase();
  // }

  /**
   * Works out every possible route it can take - v2 only
   * @param fromTokenRoutes The from token routes
   * @param toTokenRoutes The to token routes
   * @param allMainRoutes All the main routes
   */
  private workOutAllPossibleRoutes(
    fromTokenRoutes: TokenRoutes,
    toTokenRoutes: TokenRoutes,
    allMainRoutes: TokenRoutes[]
  ): RouteContext[] {
    const jointCompatibleRoutes = toTokenRoutes.pairs.toTokenPairs!.filter(
      (t) =>
        fromTokenRoutes.pairs.fromTokenPairs!.find(
          (f) =>
            f.contractAddress.toLowerCase() === t.contractAddress.toLowerCase()
        )
    );

    const routes: RouteContext[] = [];
    if (
      fromTokenRoutes.pairs.fromTokenPairs!.find(
        (t) =>
          t.contractAddress.toLowerCase() ===
          toTokenRoutes.token.contractAddress.toLowerCase()
      )
    ) {
      routes.push({
        route: [fromTokenRoutes.token, toTokenRoutes.token],
        liquidityProviderFee: this.LIQUIDITY_PROVIDER_FEE_V2,
      });
    }

    for (let i = 0; i < allMainRoutes.length; i++) {
      const tokenRoute = allMainRoutes[i];
      if (
        jointCompatibleRoutes.find(
          (c) =>
            c.contractAddress.toLowerCase() ===
            tokenRoute.token.contractAddress.toLowerCase()
        )
      ) {
        routes.push({
          route: [fromTokenRoutes.token, tokenRoute.token, toTokenRoutes.token],
          liquidityProviderFee: this.LIQUIDITY_PROVIDER_FEE_V2,
        });

        for (let f = 0; f < fromTokenRoutes.pairs.fromTokenPairs!.length; f++) {
          const fromSupportedToken = fromTokenRoutes.pairs.fromTokenPairs![f];
          if (
            tokenRoute.pairs.toTokenPairs!.find(
              (pair) =>
                pair.contractAddress.toLowerCase() ===
                fromSupportedToken.contractAddress.toLowerCase()
            )
          ) {
            const workedOutFromRoute = [
              fromTokenRoutes.token,
              fromSupportedToken,
              tokenRoute.token,
              toTokenRoutes.token,
            ];
            if (
              workedOutFromRoute.filter(onlyUnique).length ===
              workedOutFromRoute.length
            ) {
              routes.push({
                route: workedOutFromRoute,
                liquidityProviderFee: this.LIQUIDITY_PROVIDER_FEE_V2,
              });
            }
          }
        }

        for (let f = 0; f < toTokenRoutes.pairs.toTokenPairs!.length; f++) {
          const toSupportedToken = toTokenRoutes.pairs.toTokenPairs![f];
          if (
            tokenRoute.pairs.fromTokenPairs!.find(
              (pair) =>
                pair.contractAddress.toLowerCase() ===
                toSupportedToken.contractAddress.toLowerCase()
            )
          ) {
            const workedOutToRoute = [
              fromTokenRoutes.token,
              tokenRoute.token,
              toSupportedToken,
              toTokenRoutes.token,
            ];

            if (
              workedOutToRoute.filter(onlyUnique).length ===
              workedOutToRoute.length
            ) {
              routes.push({
                route: workedOutToRoute,
                liquidityProviderFee: this.LIQUIDITY_PROVIDER_FEE_V2,
              });
            }
          }
        }
      }
    }

    return routes;
  }

  private getTokenAvailablePairs(
    token: Token,
    allAvailablePairs: CallReturnContext[],
    direction: RouterDirection
  ) {
    switch (direction) {
      case RouterDirection.from:
        return this.getFromRouterDirectionAvailablePairs(
          token,
          allAvailablePairs
        );
      case RouterDirection.to:
        return this.getToRouterDirectionAvailablePairs(
          token,
          allAvailablePairs
        );
    }
  }

  private getFromRouterDirectionAvailablePairs(
    token: Token,
    allAvailablePairs: CallReturnContext[]
  ): Token[] {
    const fromRouterDirection = allAvailablePairs.filter(
      (c) => c.reference.split('-')[0] === token.contractAddress
    );
    const tokens: Token[] = [];

    for (let index = 0; index < fromRouterDirection.length; index++) {
      const context = fromRouterDirection[index];
      tokens.push(
        this.allTokens.find(
          (t) => t.contractAddress === context.reference.split('-')[1]
        )!
      );
    }

    return tokens;
  }

  private getToRouterDirectionAvailablePairs(
    token: Token,
    allAvailablePairs: CallReturnContext[]
  ): Token[] {
    const toRouterDirection = allAvailablePairs.filter(
      (c) => c.reference.split('-')[1] === token.contractAddress
    );
    const tokens: Token[] = [];

    for (let index = 0; index < toRouterDirection.length; index++) {
      const context = toRouterDirection[index];
      tokens.push(
        this.allTokens.find(
          (t) => t.contractAddress === context.reference.split('-')[0]
        )!
      );
    }

    return tokens;
  }

  /**
   * Build up route quotes from results
   * @param contractCallResults The contract call results
   * @param direction The direction you want to get the quote from
   */
  private buildRouteQuotesFromResults(
    amountToTrade: BigNumber,
    contractCallResults: ContractCallResults,
    direction: TradeDirection
  ): RouteQuote[] {
    const tradePath = this.tradePath();

    const result: RouteQuote[] = [];

    for (const key in contractCallResults.results) {
      const contractCallReturnContext = contractCallResults.results[key];
      if (contractCallReturnContext) {
        for (
          let i = 0;
          i < contractCallReturnContext.callsReturnContext.length;
          i++
        ) {
          const callReturnContext =
            contractCallReturnContext.callsReturnContext[i];

          // console.log(JSON.stringify(callReturnContext, null, 4));

          if (!callReturnContext.success) {
            continue;
          }

          switch (tradePath) {
            case TradePath.ethToErc20:
              result.push(
                this.buildRouteQuoteForEthToErc20(
                  amountToTrade,
                  callReturnContext,
                  contractCallReturnContext.originalContractCallContext.context[
                    i
                  ],
                  direction,
                  contractCallReturnContext.originalContractCallContext
                    .reference as UniswapVersion
                )
              );
              break;
            case TradePath.erc20ToEth:
              result.push(
                this.buildRouteQuoteForErc20ToEth(
                  amountToTrade,
                  callReturnContext,
                  contractCallReturnContext.originalContractCallContext.context[
                    i
                  ],
                  direction,
                  contractCallReturnContext.originalContractCallContext
                    .reference as UniswapVersion
                )
              );
              break;
            case TradePath.erc20ToErc20:
              result.push(
                this.buildRouteQuoteForErc20ToErc20(
                  amountToTrade,
                  callReturnContext,
                  contractCallReturnContext.originalContractCallContext.context[
                    i
                  ],
                  direction,
                  contractCallReturnContext.originalContractCallContext
                    .reference as UniswapVersion
                )
              );
              break;
            default:
              throw new UniswapError(
                `${tradePath} not found`,
                ErrorCodes.tradePathIsNotSupported
              );
          }
        }
      }
    }

    if (direction === TradeDirection.input) {
      return result.sort((a, b) => {
        if (
          new BigNumber(a.expectedConvertQuote).isGreaterThan(
            b.expectedConvertQuote
          )
        ) {
          return -1;
        }
        return new BigNumber(a.expectedConvertQuote).isLessThan(
          b.expectedConvertQuote
        )
          ? 1
          : 0;
      });
    } else {
      return result.sort((a, b) => {
        if (
          new BigNumber(a.expectedConvertQuote).isLessThan(
            b.expectedConvertQuote
          )
        ) {
          return -1;
        }
        return new BigNumber(a.expectedConvertQuote).isGreaterThan(
          b.expectedConvertQuote
        )
          ? 1
          : 0;
      });
    }
  }

  /**
   * Build up the route quote for erc20 > eth (not shared with other method for safety reasons)
   * @param callReturnContext The call return context
   * @param routeContext The route context
   * @param direction The direction you want to get the quote from
   * @param uniswapVersion The uniswap version
   */
  private buildRouteQuoteForErc20ToErc20(
    amountToTrade: BigNumber,
    callReturnContext: CallReturnContext,
    routeContext: RouteContext,
    direction: TradeDirection,
    uniswapVersion: UniswapVersion
  ): RouteQuote {
    const convertQuoteUnformatted = this.getConvertQuoteUnformatted(
      callReturnContext,
      direction,
      uniswapVersion
    );

    const expectedConvertQuote =
      direction === TradeDirection.input
        ? convertQuoteUnformatted
            .shiftedBy(this._toToken.decimals * -1)
            .toFixed(this._toToken.decimals)
        : convertQuoteUnformatted
            .shiftedBy(this._fromToken.decimals * -1)
            .toFixed(this._fromToken.decimals);

    const expectedConvertQuoteOrTokenAmountInMaxWithSlippage =
      this.getExpectedConvertQuoteOrTokenAmountInMaxWithSlippage(
        expectedConvertQuote,
        direction,
        uniswapVersion
      );

    const tradeExpires = this.generateTradeDeadlineUnixTime();

    const routeQuoteTradeContext: RouteQuoteTradeContext = {
      uniswapVersion,
      liquidityProviderFee: routeContext.liquidityProviderFee,
      routePathArray: callReturnContext.methodParameters[1],
    };
    const data =
      direction === TradeDirection.input
        ? this.generateTradeDataErc20ToErc20Input(
            amountToTrade,
            new BigNumber(expectedConvertQuoteOrTokenAmountInMaxWithSlippage),
            routeQuoteTradeContext,
            tradeExpires.toString()
          )
        : this.generateTradeDataErc20ToErc20Output(
            new BigNumber(expectedConvertQuoteOrTokenAmountInMaxWithSlippage),
            amountToTrade,
            routeQuoteTradeContext,
            tradeExpires.toString()
          );

    const transaction = this.buildUpTransactionErc20(uniswapVersion, data);

    switch (uniswapVersion) {
      case UniswapVersion.v2:
        return {
          expectedConvertQuote,
          expectedConvertQuoteOrTokenAmountInMaxWithSlippage,
          transaction,
          tradeExpires,
          routePathArrayTokenMap: callReturnContext.methodParameters[1].map(
            (c: string) => {
              return this.allTokens.find((t) => t.contractAddress === c);
            }
          ),
          routeText: callReturnContext.methodParameters[1]
            .map((c: string) => {
              return this.allTokens.find((t) => t.contractAddress === c)!
                .symbol;
            })
            .join(' > '),
          // route array is always in the 1 index of the method parameters
          routePathArray: callReturnContext.methodParameters[1],
          uniswapVersion,
          liquidityProviderFee: routeContext.liquidityProviderFee,
          quoteDirection: direction,
        };
      case UniswapVersion.v3:
        return {
          expectedConvertQuote,
          expectedConvertQuoteOrTokenAmountInMaxWithSlippage,
          transaction,
          tradeExpires,
          routePathArrayTokenMap: [this._fromToken, this._toToken],
          routeText: `${this._fromToken.symbol} > ${this._toToken.symbol}`,
          routePathArray: [
            this._fromToken.contractAddress,
            this._toToken.contractAddress,
          ],
          uniswapVersion,
          liquidityProviderFee: routeContext.liquidityProviderFee,
          quoteDirection: direction,
        };
      default:
        throw new UniswapError('Invalid uniswap version', uniswapVersion);
    }
  }

  /**
   * Build up the route quote for eth > erc20 (not shared with other method for safety reasons)
   * @param callReturnContext The call return context
   * @param routeContext The route context
   * @param direction The direction you want to get the quote from
   * @param uniswapVersion The uniswap version
   */
  private buildRouteQuoteForEthToErc20(
    amountToTrade: BigNumber,
    callReturnContext: CallReturnContext,
    routeContext: RouteContext,
    direction: TradeDirection,
    uniswapVersion: UniswapVersion
  ): RouteQuote {
    const convertQuoteUnformatted = this.getConvertQuoteUnformatted(
      callReturnContext,
      direction,
      uniswapVersion
    );

    const expectedConvertQuote =
      direction === TradeDirection.input
        ? convertQuoteUnformatted
            .shiftedBy(this._toToken.decimals * -1)
            .toFixed(this._toToken.decimals)
        : new BigNumber(formatEther(convertQuoteUnformatted)).toFixed(
            this._fromToken.decimals
          );

    const expectedConvertQuoteOrTokenAmountInMaxWithSlippage =
      this.getExpectedConvertQuoteOrTokenAmountInMaxWithSlippage(
        expectedConvertQuote,
        direction,
        uniswapVersion
      );

    const tradeExpires = this.generateTradeDeadlineUnixTime();
    const routeQuoteTradeContext: RouteQuoteTradeContext = {
      uniswapVersion,
      liquidityProviderFee: routeContext.liquidityProviderFee,
      routePathArray: callReturnContext.methodParameters[1],
    };
    const data =
      direction === TradeDirection.input
        ? this.generateTradeDataEthToErc20Input(
            amountToTrade,
            new BigNumber(expectedConvertQuoteOrTokenAmountInMaxWithSlippage),
            routeQuoteTradeContext,
            tradeExpires.toString()
          )
        : this.generateTradeDataEthToErc20Output(
            new BigNumber(expectedConvertQuoteOrTokenAmountInMaxWithSlippage),
            amountToTrade,
            routeQuoteTradeContext,
            tradeExpires.toString()
          );

    const transaction = this.buildUpTransactionEth(
      uniswapVersion,
      direction === TradeDirection.input
        ? amountToTrade
        : new BigNumber(expectedConvertQuote),
      data
    );

    switch (uniswapVersion) {
      case UniswapVersion.v2:
        return {
          expectedConvertQuote,
          expectedConvertQuoteOrTokenAmountInMaxWithSlippage,
          transaction,
          tradeExpires,
          routePathArrayTokenMap: callReturnContext.methodParameters[1].map(
            (c: string, index: number) => {
              const token = deepClone(
                this.allTokens.find((t) => t.contractAddress === c)!
              );
              if (index === 0) {
                return turnTokenIntoEthForResponse(
                  token,
                  this._settings?.customNetwork?.nativeCurrency
                );
              }

              return token;
            }
          ),
          routeText: callReturnContext.methodParameters[1]
            .map((c: string, index: number) => {
              if (index === 0) {
                return this.getNativeTokenSymbol();
              }
              return this.allTokens.find((t) => t.contractAddress === c)!
                .symbol;
            })
            .join(' > '),
          // route array is always in the 1 index of the method parameters
          routePathArray: callReturnContext.methodParameters[1],
          uniswapVersion,
          liquidityProviderFee: routeContext.liquidityProviderFee,
          quoteDirection: direction,
        };
      case UniswapVersion.v3:
        return {
          expectedConvertQuote,
          expectedConvertQuoteOrTokenAmountInMaxWithSlippage,
          transaction,
          tradeExpires,
          routePathArrayTokenMap: [
            turnTokenIntoEthForResponse(
              this._fromToken,
              this._settings?.customNetwork?.nativeCurrency
            ),
            this._toToken,
          ],
          routeText: `${
            turnTokenIntoEthForResponse(
              this._fromToken,
              this._settings?.customNetwork?.nativeCurrency
            ).symbol
          } > ${this._toToken.symbol}`,
          routePathArray: [
            this._fromToken.contractAddress,
            this._toToken.contractAddress,
          ],
          uniswapVersion,
          liquidityProviderFee: routeContext.liquidityProviderFee,
          quoteDirection: direction,
        };
      default:
        throw new UniswapError('Invalid uniswap version', uniswapVersion);
    }
  }

  /**
   * Build up the route quote for erc20 > eth (not shared with other method for safety reasons)
   * @param callReturnContext The call return context
   * @param routeContext The route context
   * @param direction The direction you want to get the quote from
   * @param uniswapVersion The uniswap version
   */
  private buildRouteQuoteForErc20ToEth(
    amountToTrade: BigNumber,
    callReturnContext: CallReturnContext,
    routeContext: RouteContext,
    direction: TradeDirection,
    uniswapVersion: UniswapVersion
  ): RouteQuote {
    const convertQuoteUnformatted = this.getConvertQuoteUnformatted(
      callReturnContext,
      direction,
      uniswapVersion
    );

    const expectedConvertQuote =
      direction === TradeDirection.input
        ? new BigNumber(formatEther(convertQuoteUnformatted)).toFixed(
            this._toToken.decimals
          )
        : convertQuoteUnformatted
            .shiftedBy(this._fromToken.decimals * -1)
            .toFixed(this._fromToken.decimals);

    const expectedConvertQuoteOrTokenAmountInMaxWithSlippage =
      this.getExpectedConvertQuoteOrTokenAmountInMaxWithSlippage(
        expectedConvertQuote,
        direction,
        uniswapVersion
      );

    const tradeExpires = this.generateTradeDeadlineUnixTime();
    const routeQuoteTradeContext: RouteQuoteTradeContext = {
      uniswapVersion,
      liquidityProviderFee: routeContext.liquidityProviderFee,
      routePathArray: callReturnContext.methodParameters[1],
    };
    const data =
      direction === TradeDirection.input
        ? this.generateTradeDataErc20ToEthInput(
            amountToTrade,
            new BigNumber(expectedConvertQuoteOrTokenAmountInMaxWithSlippage),
            routeQuoteTradeContext,
            tradeExpires.toString()
          )
        : this.generateTradeDataErc20ToEthOutput(
            new BigNumber(expectedConvertQuoteOrTokenAmountInMaxWithSlippage),
            amountToTrade,
            routeQuoteTradeContext,
            tradeExpires.toString()
          );

    const transaction = this.buildUpTransactionErc20(uniswapVersion, data);

    switch (uniswapVersion) {
      case UniswapVersion.v2:
        return {
          expectedConvertQuote,
          expectedConvertQuoteOrTokenAmountInMaxWithSlippage,
          transaction,
          tradeExpires,
          routePathArrayTokenMap: callReturnContext.methodParameters[1].map(
            (c: string, index: number) => {
              const token = deepClone(
                this.allTokens.find((t) => t.contractAddress === c)!
              );
              if (index === callReturnContext.methodParameters[1].length - 1) {
                return turnTokenIntoEthForResponse(
                  token,
                  this._settings?.customNetwork?.nativeCurrency
                );
              }

              return token;
            }
          ),
          routeText: callReturnContext.methodParameters[1]
            .map((c: string, index: number) => {
              if (index === callReturnContext.methodParameters[1].length - 1) {
                return this.getNativeTokenSymbol();
              }
              return this.allTokens.find((t) => t.contractAddress === c)!
                .symbol;
            })
            .join(' > '),
          // route array is always in the 1 index of the method parameters
          routePathArray: callReturnContext.methodParameters[1],
          uniswapVersion,
          liquidityProviderFee: routeContext.liquidityProviderFee,
          quoteDirection: direction,
        };
      case UniswapVersion.v3:
        return {
          expectedConvertQuote,
          expectedConvertQuoteOrTokenAmountInMaxWithSlippage,
          transaction,
          tradeExpires,
          routePathArrayTokenMap: [
            this._fromToken,
            turnTokenIntoEthForResponse(
              this._toToken,
              this._settings?.customNetwork?.nativeCurrency
            ),
          ],
          routeText: `${this._fromToken.symbol} > ${
            turnTokenIntoEthForResponse(
              this._toToken,
              this._settings?.customNetwork?.nativeCurrency
            ).symbol
          }`,
          routePathArray: [
            this._fromToken.contractAddress,
            this._toToken.contractAddress,
          ],
          uniswapVersion,
          liquidityProviderFee: routeContext.liquidityProviderFee,
          quoteDirection: direction,
        };
      default:
        throw new UniswapError('Invalid uniswap version', uniswapVersion);
    }
  }

  /**
   * Get the convert quote unformatted from the call return context
   * @param callReturnContext The call return context
   * @param direction The direction you want to get the quote from
   * @param uniswapVersion The uniswap version
   */
  private getConvertQuoteUnformatted(
    callReturnContext: CallReturnContext,
    direction: TradeDirection,
    uniswapVersion: UniswapVersion
  ): BigNumber {
    switch (uniswapVersion) {
      case UniswapVersion.v2:
        if (direction === TradeDirection.input) {
          return new BigNumber(
            callReturnContext.returnValues[
              callReturnContext.returnValues.length - 1
            ].hex
          );
        } else {
          return new BigNumber(callReturnContext.returnValues[0].hex);
        }
      case UniswapVersion.v3:
        return new BigNumber(callReturnContext.returnValues[0].hex);
      default:
        throw new UniswapError('Invalid uniswap version', uniswapVersion);
    }
  }

  /**
   * Work out the expected convert quote taking off slippage
   * @param expectedConvertQuote The expected convert quote
   */
  private getExpectedConvertQuoteOrTokenAmountInMaxWithSlippage(
    expectedConvertQuote: string,
    tradeDirection: TradeDirection,
    uniswapVersion: UniswapVersion
  ): string {
    const decimals =
      tradeDirection === TradeDirection.input
        ? this._toToken.decimals
        : this._fromToken.decimals;

    if (
      tradeDirection === TradeDirection.output &&
      uniswapVersion === UniswapVersion.v3
    ) {
      return new BigNumber(expectedConvertQuote)
        .plus(
          new BigNumber(expectedConvertQuote)
            .times(this._settings.slippage)
            .toFixed(decimals)
        )
        .toFixed(decimals);
    }

    return new BigNumber(expectedConvertQuote)
      .minus(
        new BigNumber(expectedConvertQuote)
          .times(this._settings.slippage)
          .toFixed(decimals)
      )
      .toFixed(decimals);
  }

  /**
   * Format amount to trade into callable formats
   * @param amountToTrade The amount to trade
   * @param direction The direction you want to get the quote from
   */
  private formatAmountToTrade(
    amountToTrade: BigNumber,
    direction: TradeDirection
  ): string {
    switch (this.tradePath()) {
      case TradePath.ethToErc20:
        if (direction == TradeDirection.input) {
          const amountToTradeWei = parseEther(amountToTrade);
          return hexlify(amountToTradeWei);
        } else {
          return hexlify(amountToTrade.shiftedBy(this._toToken.decimals));
        }
      case TradePath.erc20ToEth:
        if (direction == TradeDirection.input) {
          return hexlify(amountToTrade.shiftedBy(this._fromToken.decimals));
        } else {
          const amountToTradeWei = parseEther(amountToTrade);
          return hexlify(amountToTradeWei);
        }
      case TradePath.erc20ToErc20:
        if (direction == TradeDirection.input) {
          return hexlify(amountToTrade.shiftedBy(this._fromToken.decimals));
        } else {
          return hexlify(amountToTrade.shiftedBy(this._toToken.decimals));
        }
      default:
        throw new UniswapError(
          `Internal trade path ${this.tradePath()} is not supported`,
          ErrorCodes.tradePathIsNotSupported
        );
    }
  }

  /**
   * Get the trade path
   */
  private tradePath(): TradePath {
    const network = this._ethersProvider.network();
    return getTradePath(
      network.chainId,
      this._fromToken,
      this._toToken,
      this._settings.customNetwork?.nativeWrappedTokenInfo
    );
  }

  private get allTokens(): Token[] {
    return [this._fromToken, this._toToken, ...this.allMainTokens];
  }

  private get allMainTokens(): Token[] {
    if (
      this._ethersProvider.provider.network.chainId === ChainId.MAINNET ||
      this._settings.customNetwork
    ) {
      const tokens: (Token | undefined)[] = [
        this.USDTTokenForConnectedNetwork,
        this.COMPTokenForConnectedNetwork,
        this.USDCTokenForConnectedNetwork,
        this.DAITokenForConnectedNetwork,
        this.WETHTokenForConnectedNetwork,
        this.WBTCTokenForConnectedNetwork,
      ];

      return tokens.filter((t) => t !== undefined) as Token[];
    }

    return [this.WETHTokenForConnectedNetwork];
  }

  private get mainCurrenciesPairsForFromToken(): Token[][] {
    if (
      this._ethersProvider.provider.network.chainId === ChainId.MAINNET ||
      this._settings.customNetwork
    ) {
      const pairs = [
        [this._fromToken, this.USDTTokenForConnectedNetwork],
        [this._fromToken, this.COMPTokenForConnectedNetwork],
        [this._fromToken, this.USDCTokenForConnectedNetwork],
        [this._fromToken, this.DAITokenForConnectedNetwork],
        [this._fromToken, this.WBTCTokenForConnectedNetwork],
      ];

      if (
        !isNativeEth(this._fromToken.contractAddress) &&
        !isNativeEth(this._toToken.contractAddress)
      ) {
        pairs.push([this._fromToken, this.WETHTokenForConnectedNetwork]);
      }

      return this.filterUndefinedTokens(pairs).filter(
        (t) => t[0].contractAddress !== t[1].contractAddress
      );
    }

    const pairs = [[this._fromToken, this.WETHTokenForConnectedNetwork]];
    return pairs.filter((t) => t[0].contractAddress !== t[1].contractAddress);
  }

  private get mainCurrenciesPairsForToToken(): Token[][] {
    if (
      this._ethersProvider.provider.network.chainId === ChainId.MAINNET ||
      this._settings.customNetwork
    ) {
      const pairs: (Token | undefined)[][] = [
        [this.USDTTokenForConnectedNetwork, this._toToken],
        [this.COMPTokenForConnectedNetwork, this._toToken],
        [this.USDCTokenForConnectedNetwork, this._toToken],
        [this.DAITokenForConnectedNetwork, this._toToken],
        [this.WBTCTokenForConnectedNetwork, this._toToken],
      ];

      if (
        !isNativeEth(this._toToken.contractAddress) &&
        !isNativeEth(this._toToken.contractAddress)
      ) {
        pairs.push([this.WETHTokenForConnectedNetwork, this._toToken]);
      }

      return this.filterUndefinedTokens(pairs).filter(
        (t) => t[0].contractAddress !== t[1].contractAddress
      );
    }

    const pairs: Token[][] = [
      [this.WETHTokenForConnectedNetwork, this._toToken],
    ];

    return pairs.filter((t) => t[0].contractAddress !== t[1].contractAddress);
  }

  private get mainCurrenciesPairsForUSDT(): Token[][] {
    if (
      this._ethersProvider.provider.network.chainId === ChainId.MAINNET ||
      this._settings.customNetwork
    ) {
      const pairs: (Token | undefined)[][] = [
        [this.USDTTokenForConnectedNetwork, this.COMPTokenForConnectedNetwork],
        [this.USDTTokenForConnectedNetwork, this.DAITokenForConnectedNetwork],
        [this.USDTTokenForConnectedNetwork, this.USDCTokenForConnectedNetwork],
        [this.USDTTokenForConnectedNetwork, this.WBTCTokenForConnectedNetwork],
      ];

      if (
        !isNativeEth(this._fromToken.contractAddress) &&
        !isNativeEth(this._toToken.contractAddress)
      ) {
        pairs.push([
          this.USDTTokenForConnectedNetwork,
          this.WETHTokenForConnectedNetwork,
        ]);
      }

      return this.filterUndefinedTokens(pairs);
    }

    return [];
  }

  private get mainCurrenciesPairsForCOMP(): Token[][] {
    if (
      this._ethersProvider.provider.network.chainId === ChainId.MAINNET ||
      this._settings.customNetwork
    ) {
      const pairs: (Token | undefined)[][] = [
        [this.COMPTokenForConnectedNetwork, this.USDTTokenForConnectedNetwork],
        [this.COMPTokenForConnectedNetwork, this.DAITokenForConnectedNetwork],
        [this.COMPTokenForConnectedNetwork, this.USDCTokenForConnectedNetwork],
      ];

      if (
        !isNativeEth(this._fromToken.contractAddress) &&
        !isNativeEth(this._toToken.contractAddress)
      ) {
        pairs.push([
          this.COMPTokenForConnectedNetwork,
          this.WETHTokenForConnectedNetwork,
        ]);
      }

      return this.filterUndefinedTokens(pairs);
    }

    return [];
  }

  private get mainCurrenciesPairsForDAI(): Token[][] {
    if (
      this._ethersProvider.provider.network.chainId === ChainId.MAINNET ||
      this._settings.customNetwork
    ) {
      const pairs: (Token | undefined)[][] = [
        [this.DAITokenForConnectedNetwork, this.COMPTokenForConnectedNetwork],
        [this.DAITokenForConnectedNetwork, this.WBTCTokenForConnectedNetwork],
        [this.DAITokenForConnectedNetwork, this.USDTTokenForConnectedNetwork],
        [this.DAITokenForConnectedNetwork, this.USDCTokenForConnectedNetwork],
      ];

      if (
        !isNativeEth(this._fromToken.contractAddress) &&
        !isNativeEth(this._toToken.contractAddress)
      ) {
        pairs.push([
          this.DAITokenForConnectedNetwork,
          this.WETHTokenForConnectedNetwork,
        ]);
      }

      return this.filterUndefinedTokens(pairs);
    }

    return [];
  }

  private get mainCurrenciesPairsForUSDC(): Token[][] {
    if (
      this._ethersProvider.provider.network.chainId === ChainId.MAINNET ||
      this._settings.customNetwork
    ) {
      const pairs: (Token | undefined)[][] = [
        [this.USDCTokenForConnectedNetwork, this.USDTTokenForConnectedNetwork],
        [this.USDCTokenForConnectedNetwork, this.COMPTokenForConnectedNetwork],
        [this.USDCTokenForConnectedNetwork, this.DAITokenForConnectedNetwork],
        [this.USDCTokenForConnectedNetwork, this.WBTCTokenForConnectedNetwork],
      ];

      if (
        !isNativeEth(this._fromToken.contractAddress) &&
        !isNativeEth(this._toToken.contractAddress)
      ) {
        pairs.push([
          this.USDCTokenForConnectedNetwork,
          this.WETHTokenForConnectedNetwork,
        ]);
      }

      return this.filterUndefinedTokens(pairs);
    }

    return [];
  }

  private get mainCurrenciesPairsForWBTC(): Token[][] {
    if (
      this._ethersProvider.provider.network.chainId === ChainId.MAINNET ||
      this._settings.customNetwork
    ) {
      const tokens: (Token | undefined)[][] = [
        [this.WBTCTokenForConnectedNetwork, this.USDTTokenForConnectedNetwork],
        [this.WBTCTokenForConnectedNetwork, this.DAITokenForConnectedNetwork],
        [this.WBTCTokenForConnectedNetwork, this.USDCTokenForConnectedNetwork],
        [this.WBTCTokenForConnectedNetwork, this.WETHTokenForConnectedNetwork],
      ];

      return this.filterUndefinedTokens(tokens);
    }

    return [];
  }

  private get mainCurrenciesPairsForWETH(): Token[][] {
    if (
      this._ethersProvider.provider.network.chainId === ChainId.MAINNET ||
      this._settings.customNetwork
    ) {
      const tokens: (Token | undefined)[][] = [
        [this.WETHTokenForConnectedNetwork, this.USDTTokenForConnectedNetwork],
        [this.WETHTokenForConnectedNetwork, this.COMPTokenForConnectedNetwork],
        [this.WETHTokenForConnectedNetwork, this.DAITokenForConnectedNetwork],
        [this.WETHTokenForConnectedNetwork, this.USDCTokenForConnectedNetwork],
        [this.WETHTokenForConnectedNetwork, this.WBTCTokenForConnectedNetwork],
      ];

      return this.filterUndefinedTokens(tokens);
    }

    return [];
  }

  private filterUndefinedTokens(tokens: (Token | undefined)[][]): Token[][] {
    return tokens.filter(
      (t) => t[0] !== undefined && t[1] !== undefined
    ) as Token[][];
  }

  private get USDTTokenForConnectedNetwork() {
    if (this._settings.customNetwork) {
      return this._settings.customNetwork.baseTokens?.usdt;
    }

    return USDT.token(this._ethersProvider.provider.network.chainId);
  }

  private get COMPTokenForConnectedNetwork() {
    if (this._settings.customNetwork) {
      return this._settings.customNetwork.baseTokens?.comp;
    }

    return COMP.token(this._ethersProvider.provider.network.chainId);
  }

  private get DAITokenForConnectedNetwork() {
    if (this._settings.customNetwork) {
      return this._settings.customNetwork.baseTokens?.dai;
    }

    return DAI.token(this._ethersProvider.provider.network.chainId);
  }

  private get USDCTokenForConnectedNetwork() {
    if (this._settings.customNetwork) {
      return this._settings.customNetwork.baseTokens?.usdc;
    }

    return USDC.token(this._ethersProvider.provider.network.chainId);
  }

  private get WETHTokenForConnectedNetwork() {
    if (this._settings.customNetwork) {
      return this._settings.customNetwork.nativeWrappedTokenInfo;
    }

    return WETHContract.token(this._ethersProvider.provider.network.chainId);
  }

  private get WBTCTokenForConnectedNetwork() {
    if (this._settings.customNetwork) {
      return this._settings.customNetwork.baseTokens?.wbtc;
    }

    return WBTC.token(this._ethersProvider.provider.network.chainId);
  }

  private getNativeTokenSymbol(): string {
    if (this._settings.customNetwork) {
      return this._settings.customNetwork.nativeCurrency.symbol;
    }

    return ETH_SYMBOL;
  }
}
