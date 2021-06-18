import BigNumber from 'bignumber.js';
import {
  CallReturnContext,
  ContractCallContext,
  ContractCallResults,
  Multicall,
} from 'ethereum-multicall';
import { ErrorCodes } from '../../common/errors/error-codes';
import { UniswapError } from '../../common/errors/uniswap-error';
import { COMP } from '../../common/tokens/comp';
import { DAI } from '../../common/tokens/dai';
import { USDC } from '../../common/tokens/usdc';
import { USDT } from '../../common/tokens/usdt';
import { WETH } from '../../common/tokens/weth';
import { formatEther } from '../../common/utils/format-ether';
import { hexlify } from '../../common/utils/hexlify';
import { onlyUnique } from '../../common/utils/only-unique';
import { parseEther } from '../../common/utils/parse-ether';
import { getTradePath } from '../../common/utils/trade-path';
import { ChainId } from '../../enums/chain-id';
import { TradePath } from '../../enums/trade-path';
import { UniswapVersion } from '../../enums/uniswap-version';
import { EthersProvider } from '../../ethers-provider';
import { UniswapContractContextV2 } from '../../uniswap-contract-context/uniswap-contract-context-v2';
import { UniswapContractContextV3 } from '../../uniswap-contract-context/uniswap-contract-context-v3';
import { TradeDirection } from '../pair/models/trade-direction';
import { Token } from '../token/models/token';
import { RouterDirection } from './enums/router-direction';
import { AllPossibleRoutes } from './models/all-possible-routes';
import { BestRouteQuotes } from './models/best-route-quotes';
import { RouteContext } from './models/route-context';
import { RouteQuote } from './models/route-quote';
import { TokenRoutes } from './models/token-routes';
import {
  FeeAmount,
  feeToPercent,
  percentToFeeAmount,
} from './v3/enums/fee-amount-v3';

export class UniswapRouterFactory {
  private _multicall = new Multicall({
    ethersProvider: this._ethersProvider.provider,
    tryAggregate: true,
  });

  private readonly LIQUIDITY_PROVIDER_FEE_V2 = 0.003;

  constructor(
    private _fromToken: Token,
    private _toToken: Token,
    private _disableMultihops: boolean,
    private _uniswapVersions: UniswapVersion[],
    private _ethersProvider: EthersProvider
  ) {}

  /**
   * Get all possible routes will only go up to 4 due to gas increase the more routes
   * you go.
   */
  public async getAllPossibleRoutes(): Promise<AllPossibleRoutes> {
    let findPairs: Token[][][] = [];

    if (!this._disableMultihops) {
      findPairs = [
        this.mainCurrenciesPairsForFromToken,
        this.mainCurrenciesPairsForToToken,
        this.mainCurrenciesPairsForUSDT,
        this.mainCurrenciesPairsForCOMP,
        this.mainCurrenciesPairsForDAI,
        this.mainCurrenciesPairsForUSDC,
        this.mainCurrenciesPairsForWETH,
        // this.mainCurrenciesPairsForWBTC,
        [[this._fromToken, this._toToken]],
      ];
    } else {
      // multihops turned off so only go direct
      findPairs = [[[this._fromToken, this._toToken]]];
    }

    const contractCallContext: ContractCallContext[] = [];

    if (this._uniswapVersions.includes(UniswapVersion.v2)) {
      contractCallContext.push({
        reference: UniswapVersion.v2,
        contractAddress: UniswapContractContextV2.pairAddress,
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
              fromToken.contractAddress,
              toToken.contractAddress,
            ],
          });
        }
      }
    }

    // for now v3 quotes will just be direct aka UNI > AAVE etc!
    if (this._uniswapVersions.includes(UniswapVersion.v3)) {
      contractCallContext.push({
        reference: UniswapVersion.v3,
        contractAddress: UniswapContractContextV3.factoryAddress,
        abi: UniswapContractContextV3.factoryAbi,
        calls: [
          {
            reference: `${this._fromToken.contractAddress}-${this._toToken.contractAddress}-${this._fromToken.symbol}/${this._toToken.symbol}`,
            methodName: 'getPool',
            methodParameters: [
              this._fromToken.contractAddress,
              this._toToken.contractAddress,
              FeeAmount.LOW,
            ],
          },
          {
            reference: `${this._fromToken.contractAddress}-${this._toToken.contractAddress}-${this._fromToken.symbol}/${this._toToken.symbol}`,
            methodName: 'getPool',
            methodParameters: [
              this._fromToken.contractAddress,
              this._toToken.contractAddress,
              FeeAmount.MEDIUM,
            ],
          },
          {
            reference: `${this._fromToken.contractAddress}-${this._toToken.contractAddress}-${this._fromToken.symbol}/${this._toToken.symbol}`,
            methodName: 'getPool',
            methodParameters: [
              this._fromToken.contractAddress,
              this._toToken.contractAddress,
              FeeAmount.HIGH,
            ],
          },
        ],
      });
    }

    const allPossibleRoutes: AllPossibleRoutes = { v2: [], v3: [] };

    const contractCallResults = await this._multicall.call(contractCallContext);

    if (this._uniswapVersions.includes(UniswapVersion.v2)) {
      const results = contractCallResults.results[UniswapVersion.v2];

      const availablePairs = results.callsReturnContext.filter(
        (c) =>
          c.returnValues[0] !== '0x0000000000000000000000000000000000000000'
      );

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

      allPossibleRoutes.v2 = this.workOutAllPossibleRoutes(
        fromTokenRoutes,
        toTokenRoutes,
        allMainRoutes
      );
    }

    if (this._uniswapVersions.includes(UniswapVersion.v3)) {
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
    if (this._uniswapVersions.includes(UniswapVersion.v2)) {
      contractCallContext.push({
        reference: UniswapVersion.v2,
        contractAddress: UniswapContractContextV2.routerAddress,
        abi: UniswapContractContextV2.routerAbi,
        calls: [],
        context: routes.v2,
      });

      for (let i = 0; i < routes.v2.length; i++) {
        const routeCombo = routes.v2[i].route.map((c) => {
          return c.contractAddress;
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

    if (this._uniswapVersions.includes(UniswapVersion.v3)) {
      contractCallContext.push({
        reference: UniswapVersion.v3,
        contractAddress: UniswapContractContextV3.quoterAddress,
        abi: UniswapContractContextV3.quoterAbi,
        calls: [],
        context: routes.v3,
      });

      for (let i = 0; i < routes.v3.length; i++) {
        const routeCombo = routes.v3[i].route.map((c) => {
          return c.contractAddress;
        });

        contractCallContext[
          this._uniswapVersions.includes(UniswapVersion.v2) ? 1 : 0
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

    return this.buildRouteQuotesFromResults(contractCallResults, direction);
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
    const allRoutes = await this.getAllPossibleRoutesWithQuotes(
      amountToTrade,
      direction
    );
    if (allRoutes.length === 0) {
      throw new UniswapError(
        `No routes found for ${this._fromToken.contractAddress} > ${this._toToken.contractAddress}`,
        ErrorCodes.noRoutesFound
      );
    }

    return {
      bestRouteQuote: allRoutes[0],
      triedRoutesQuote: allRoutes.map((route) => {
        return {
          expectedConvertQuote: route.expectedConvertQuote,
          routePathArrayTokenMap: route.routePathArrayTokenMap,
          routeText: route.routeText,
          routePathArray: route.routePathArray,
          uniswapVersion: route.uniswapVersion,
          liquidityProviderFee: route.liquidityProviderFee,
          quoteDirection: route.quoteDirection,
        };
      }),
    };
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
          (f) => f.contractAddress === t.contractAddress
        )
    );

    const routes: RouteContext[] = [];
    if (
      fromTokenRoutes.pairs.fromTokenPairs!.find(
        (t) => t.contractAddress === toTokenRoutes.token.contractAddress
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
          (c) => c.contractAddress === tokenRoute.token.contractAddress
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
                pair.contractAddress === fromSupportedToken.contractAddress
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
                pair.contractAddress === toSupportedToken.contractAddress
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

          if (!callReturnContext.success) {
            continue;
          }

          switch (tradePath) {
            case TradePath.ethToErc20:
              result.push(
                this.buildRouteQuoteForEthToErc20(
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
   * Build up the route quote for erc20 > eth
   * @param callReturnContext The call return context
   * @param routeContext The route context
   * @param direction The direction you want to get the quote from
   * @param uniswapVersion The uniswap version
   */
  private buildRouteQuoteForErc20ToErc20(
    callReturnContext: CallReturnContext,
    routeContext: RouteContext,
    direction: TradeDirection,
    uniswapVersion: UniswapVersion
  ): RouteQuote {
    return this.buildRouteQuoteForEthToErc20(
      callReturnContext,
      routeContext,
      direction,
      uniswapVersion
    );
  }

  /**
   * Build up the route quote for erc20 > eth
   * @param callReturnContext The call return context
   * @param routeContext The route context
   * @param direction The direction you want to get the quote from
   * @param uniswapVersion The uniswap version
   */
  private buildRouteQuoteForEthToErc20(
    callReturnContext: CallReturnContext,
    routeContext: RouteContext,
    direction: TradeDirection,
    uniswapVersion: UniswapVersion
  ): RouteQuote {
    const convertQuoteUnformatted = this.getConvertQuoteUnformatted(
      callReturnContext,
      uniswapVersion
    );

    switch (uniswapVersion) {
      case UniswapVersion.v2:
        return {
          expectedConvertQuote: convertQuoteUnformatted
            .shiftedBy(this._toToken.decimals * -1)
            .toFixed(this._toToken.decimals),
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
          expectedConvertQuote: convertQuoteUnformatted
            .shiftedBy(this._toToken.decimals * -1)
            .toFixed(this._toToken.decimals),
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
   * Build up the route quote for erc20 > eth
   * @param callReturnContext The call return context
   * @param routeContext The route context
   * @param direction The direction you want to get the quote from
   * @param uniswapVersion The uniswap version
   */
  private buildRouteQuoteForErc20ToEth(
    callReturnContext: CallReturnContext,
    routeContext: RouteContext,
    direction: TradeDirection,
    uniswapVersion: UniswapVersion
  ): RouteQuote {
    const convertQuoteUnformatted = this.getConvertQuoteUnformatted(
      callReturnContext,
      uniswapVersion
    );

    switch (uniswapVersion) {
      case UniswapVersion.v2:
        return {
          expectedConvertQuote:
            direction === TradeDirection.input
              ? new BigNumber(formatEther(convertQuoteUnformatted)).toFixed(
                  this._toToken.decimals
                )
              : convertQuoteUnformatted
                  .shiftedBy(this._fromToken.decimals * -1)
                  .toFixed(this._fromToken.decimals),
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
          expectedConvertQuote: convertQuoteUnformatted
            .shiftedBy(this._toToken.decimals * -1)
            .toFixed(this._toToken.decimals),
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
   * Get the convert quote unformatted from the call return context
   * @param callReturnContext The call return context
   * @param uniswapVersion The uniswap version
   */
  private getConvertQuoteUnformatted(
    callReturnContext: CallReturnContext,
    uniswapVersion: UniswapVersion
  ): BigNumber {
    switch (uniswapVersion) {
      case UniswapVersion.v2:
        return new BigNumber(callReturnContext.returnValues[0].hex);
      case UniswapVersion.v3:
        return new BigNumber(
          callReturnContext.returnValues[
            callReturnContext.returnValues.length - 1
          ].hex
        );
      default:
        throw new UniswapError('Invalid uniswap version', uniswapVersion);
    }
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
    return getTradePath(network.chainId, this._fromToken, this._toToken);
  }

  private get allTokens(): Token[] {
    return [this._fromToken, this._toToken, ...this.allMainTokens];
  }

  private get allMainTokens(): Token[] {
    if (this._ethersProvider.provider.network.chainId === ChainId.MAINNET) {
      return [
        this.USDTTokenForConnectedNetwork,
        this.COMPTokenForConnectedNetwork,
        this.USDCTokenForConnectedNetwork,
        this.DAITokenForConnectedNetwork,
        this.WETHTokenForConnectedNetwork,
      ];
    }

    return [this.WETHTokenForConnectedNetwork];
  }

  private get mainCurrenciesPairsForFromToken(): Token[][] {
    if (this._ethersProvider.provider.network.chainId === ChainId.MAINNET) {
      const pairs = [
        [this._fromToken, this.USDTTokenForConnectedNetwork],
        [this._fromToken, this.COMPTokenForConnectedNetwork],
        [this._fromToken, this.USDCTokenForConnectedNetwork],
        [this._fromToken, this.DAITokenForConnectedNetwork],
        [this._fromToken, this.WETHTokenForConnectedNetwork],
        // [this._fromToken, this.WBTCTokenForConnectedNetwork],
      ];

      return pairs.filter((t) => t[0].contractAddress !== t[1].contractAddress);
    }

    const pairs = [[this._fromToken, this.WETHTokenForConnectedNetwork]];
    return pairs.filter((t) => t[0].contractAddress !== t[1].contractAddress);
  }

  private get mainCurrenciesPairsForToToken(): Token[][] {
    if (this._ethersProvider.provider.network.chainId === ChainId.MAINNET) {
      const pairs: Token[][] = [
        [this.USDTTokenForConnectedNetwork, this._toToken],
        [this.COMPTokenForConnectedNetwork, this._toToken],
        [this.USDCTokenForConnectedNetwork, this._toToken],
        [this.DAITokenForConnectedNetwork, this._toToken],
        [this.WETHTokenForConnectedNetwork, this._toToken],
        // [this.WBTCTokenForConnectedNetwork, this._toToken],
      ];

      return pairs.filter((t) => t[0].contractAddress !== t[1].contractAddress);
    }

    const pairs: Token[][] = [
      [this.WETHTokenForConnectedNetwork, this._toToken],
    ];

    return pairs.filter((t) => t[0].contractAddress !== t[1].contractAddress);
  }

  private get mainCurrenciesPairsForUSDT(): Token[][] {
    if (this._ethersProvider.provider.network.chainId === ChainId.MAINNET) {
      return [
        [this.USDTTokenForConnectedNetwork, this.COMPTokenForConnectedNetwork],
        [this.USDTTokenForConnectedNetwork, this.DAITokenForConnectedNetwork],
        [this.USDTTokenForConnectedNetwork, this.USDCTokenForConnectedNetwork],
        [this.USDTTokenForConnectedNetwork, this.WETHTokenForConnectedNetwork],
      ];
    }

    return [];
  }

  private get mainCurrenciesPairsForCOMP(): Token[][] {
    if (this._ethersProvider.provider.network.chainId === ChainId.MAINNET) {
      return [
        [this.COMPTokenForConnectedNetwork, this.USDTTokenForConnectedNetwork],
        [this.COMPTokenForConnectedNetwork, this.DAITokenForConnectedNetwork],
        [this.COMPTokenForConnectedNetwork, this.USDCTokenForConnectedNetwork],
        [this.COMPTokenForConnectedNetwork, this.WETHTokenForConnectedNetwork],
      ];
    }

    return [];
  }

  private get mainCurrenciesPairsForDAI(): Token[][] {
    if (this._ethersProvider.provider.network.chainId === ChainId.MAINNET) {
      return [
        [this.DAITokenForConnectedNetwork, this.COMPTokenForConnectedNetwork],
        [this.DAITokenForConnectedNetwork, this.WETHTokenForConnectedNetwork],
      ];
    }

    return [];
  }

  private get mainCurrenciesPairsForUSDC(): Token[][] {
    if (this._ethersProvider.provider.network.chainId === ChainId.MAINNET) {
      return [
        [this.USDCTokenForConnectedNetwork, this.USDTTokenForConnectedNetwork],
        [this.USDCTokenForConnectedNetwork, this.COMPTokenForConnectedNetwork],
        [this.USDCTokenForConnectedNetwork, this.DAITokenForConnectedNetwork],
        [this.USDCTokenForConnectedNetwork, this.WETHTokenForConnectedNetwork],
      ];
    }

    return [];
  }

  // private get mainCurrenciesPairsForWBTC(): Token[][] {
  //   if (this._ethersProvider.provider.network.chainId === ChainId.MAINNET) {
  //     return [
  //       [this.WBTCTokenForConnectedNetwork, this.WETHTokenForConnectedNetwork],
  //     ];
  //   }

  //   return [];
  // }

  private get mainCurrenciesPairsForWETH(): Token[][] {
    if (this._ethersProvider.provider.network.chainId === ChainId.MAINNET) {
      return [
        [this.WETHTokenForConnectedNetwork, this.USDTTokenForConnectedNetwork],
        [this.WETHTokenForConnectedNetwork, this.COMPTokenForConnectedNetwork],
        [this.WETHTokenForConnectedNetwork, this.DAITokenForConnectedNetwork],
        [this.WETHTokenForConnectedNetwork, this.USDCTokenForConnectedNetwork],
        // [this.WETHTokenForConnectedNetwork, this.WBTCTokenForConnectedNetwork],
      ];
    }

    return [];
  }

  private get USDTTokenForConnectedNetwork() {
    return USDT.token(this._ethersProvider.provider.network.chainId);
  }

  private get COMPTokenForConnectedNetwork() {
    return COMP.token(this._ethersProvider.provider.network.chainId);
  }

  private get DAITokenForConnectedNetwork() {
    return DAI.token(this._ethersProvider.provider.network.chainId);
  }

  private get USDCTokenForConnectedNetwork() {
    return USDC.token(this._ethersProvider.provider.network.chainId);
  }

  private get WETHTokenForConnectedNetwork() {
    return WETH.token(this._ethersProvider.provider.network.chainId);
  }

  // private get WBTCTokenForConnectedNetwork() {
  //   return WBTC.token(this._ethersProvider.provider.network.chainId);
  // }
}
