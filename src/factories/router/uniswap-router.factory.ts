import BigNumber from 'bignumber.js';
import {
  CallReturnContext,
  ContractCallContext,
  ContractCallReturnContext,
  Multicall,
} from 'ethereum-multicall';
import { ContractContext } from '../../common/contract-context';
import { COMP } from '../../common/tokens/comp';
import { DAI } from '../../common/tokens/dai';
import { USDC } from '../../common/tokens/usdc';
import { USDT } from '../../common/tokens/usdt';
import { WETH } from '../../common/tokens/weth';
import { formatEther } from '../../common/utils/format-ether';
import { hexlify } from '../../common/utils/hexlify';
import { parseEther } from '../../common/utils/parse-ether';
import { getTradePath } from '../../common/utils/trade-path';
import { TradePath } from '../../enums/trade-path';
import { EthersProvider } from '../../ethers-provider';
import { Token } from '../token/models/token';
import { RouterDirection } from './enums/router-direction';
import { BestRouteQuotes } from './models/best-route-quotes';
import { RouteQuote } from './models/route-quote';
import { TokenRoutes } from './models/token-routes';

export class UniswapRouterFactory {
  private _multicall = new Multicall({
    ethersProvider: this._ethersProvider.provider,
  });

  constructor(
    private _fromToken: Token,
    private _toToken: Token,
    private _ethersProvider: EthersProvider
  ) {}

  /**
   * Get all possible routes will only go up to 4 due to gas increase the more routes
   * you go.
   */
  public async getAllPossibleRoutes(): Promise<Token[][]> {
    const findPairs: Token[][][] = [
      this.mainCurrenciesPairsForFromToken,
      this.mainCurrenciesPairsForToToken,
      this.mainCurrenciesPairsForUSDT,
      this.mainCurrenciesPairsForCOMP,
      this.mainCurrenciesPairsForDAI,
      this.mainCurrenciesPairsForUSDC,
      this.mainCurrenciesPairsForWETH,
      [[this._fromToken, this._toToken]],
    ];

    const contractCallContext: ContractCallContext = {
      reference: 'uniswap-pairs',
      contractAddress: ContractContext.pairAddress,
      abi: ContractContext.pairAbi,
      calls: [],
    };

    for (let pairs = 0; pairs < findPairs.length; pairs++) {
      for (
        let tokenPairs = 0;
        tokenPairs < findPairs[pairs].length;
        tokenPairs++
      ) {
        const fromToken = findPairs[pairs][tokenPairs][0];
        const toToken = findPairs[pairs][tokenPairs][1];

        contractCallContext.calls.push({
          reference: `${fromToken.contractAddress}-${toToken.contractAddress}-${fromToken.symbol}/${toToken.symbol}`,
          methodName: 'getPair',
          methodParameters: [
            fromToken.contractAddress,
            toToken.contractAddress,
          ],
        });
      }
    }

    const contractCallResults = await this._multicall.call(contractCallContext);

    const results = contractCallResults.results[contractCallContext.reference];

    const availablePairs = results.callsReturnContext.filter(
      (c) => c.returnValues[0] !== '0x0000000000000000000000000000000000000000'
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

    return this.workOutAllPossibleRoutes(
      fromTokenRoutes,
      toTokenRoutes,
      allMainRoutes
    );
  }

  public async getAllPossibleRoutesWithQuotes(
    amountToTrade: BigNumber
  ): Promise<RouteQuote[]> {
    const tradeAmount = this.formatAmountToTrade(amountToTrade);

    const routes = await this.getAllPossibleRoutes();

    const contractCallContext: ContractCallContext<Token[][]> = {
      reference: 'uniswap-route-quotes',
      contractAddress: ContractContext.routerAddress,
      abi: ContractContext.routerAbi,
      calls: [],
      context: routes,
    };

    for (let i = 0; i < routes.length; i++) {
      const routeCombo = routes[i];

      contractCallContext.calls.push({
        reference: `route${i}`,
        methodName: 'getAmountsOut',
        methodParameters: [
          tradeAmount,
          routeCombo.map((c) => {
            return c.contractAddress;
          }),
        ],
      });
    }

    const contractCallResults = await this._multicall.call(contractCallContext);

    const results = contractCallResults.results[contractCallContext.reference];
    return this.buildRouteQuotesFromResults(results);
  }

  public async findBestRoute(
    amountToTrade: BigNumber
  ): Promise<BestRouteQuotes> {
    const allRoutes = await this.getAllPossibleRoutesWithQuotes(amountToTrade);

    return {
      bestRouteQuote: allRoutes[0],
      triedRoutesQuote: allRoutes.map((route) => {
        return {
          expectedConvertQuote: route.expectedConvertQuote,
          routePathArrayTokenMap: route.routePathArrayTokenMap,
          routeText: route.routeText,
          routePathArray: route.routePathArray,
        };
      }),
    };
  }

  private workOutAllPossibleRoutes(
    fromTokenRoutes: TokenRoutes,
    toTokenRoutes: TokenRoutes,
    allMainRoutes: TokenRoutes[]
  ): Token[][] {
    const jointCompatibleRoutes = toTokenRoutes.pairs.toTokenPairs!.filter(
      (t) =>
        fromTokenRoutes.pairs.fromTokenPairs!.find(
          (f) => f.contractAddress === t.contractAddress
        )
    );

    const routes: Token[][] = [];
    if (
      fromTokenRoutes.pairs.fromTokenPairs!.find(
        (t) => t.contractAddress === toTokenRoutes.token.contractAddress
      )
    ) {
      routes.push([fromTokenRoutes.token, toTokenRoutes.token]);
    }

    for (let i = 0; i < allMainRoutes.length; i++) {
      const tokenRoute = allMainRoutes[i];
      if (
        jointCompatibleRoutes.find(
          (c) => c.contractAddress === tokenRoute.token.contractAddress
        )
      ) {
        routes.push([
          fromTokenRoutes.token,
          tokenRoute.token,
          toTokenRoutes.token,
        ]);

        for (let f = 0; f < fromTokenRoutes.pairs.fromTokenPairs!.length; f++) {
          const fromSupportedToken = fromTokenRoutes.pairs.fromTokenPairs![f];
          if (
            tokenRoute.pairs.toTokenPairs!.find(
              (pair) =>
                pair.contractAddress === fromSupportedToken.contractAddress
            )
          ) {
            routes.push([
              fromTokenRoutes.token,
              fromSupportedToken,
              tokenRoute.token,
              toTokenRoutes.token,
            ]);
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
            routes.push([
              fromTokenRoutes.token,
              tokenRoute.token,
              toSupportedToken,
              toTokenRoutes.token,
            ]);
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
   * @param uniswapFactoryContext The uniswap factory context
   * @param contractCallReturnContext The contract call return context
   */
  private buildRouteQuotesFromResults(
    contractCallReturnContext: ContractCallReturnContext
  ): RouteQuote[] {
    const tradePath = this.tradePath();

    const result: RouteQuote[] = [];

    for (
      let i = 0;
      i < contractCallReturnContext.callsReturnContext.length;
      i++
    ) {
      const callReturnContext = contractCallReturnContext.callsReturnContext[i];

      switch (tradePath) {
        case TradePath.ethToErc20:
          result.push(this.buildRouteQuoteForEthToErc20(callReturnContext));
          break;
        case TradePath.erc20ToEth:
          result.push(this.buildRouteQuoteForErc20ToEth(callReturnContext));
          break;
        case TradePath.erc20ToErc20:
          result.push(this.buildRouteQuoteForErc20ToErc20(callReturnContext));
          break;
        default:
          throw new Error(
            `${tradePath} not found in InternalTradePath defined`
          );
      }
    }

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
  }

  /**
   * Build up the route quote for erc20 > erc20
   * @param callReturnContext The call return context
   */
  private buildRouteQuoteForErc20ToErc20(
    callReturnContext: CallReturnContext
  ): RouteQuote {
    return this.buildRouteQuoteForEthToErc20(callReturnContext);
  }

  /**
   * Build up route quote for eth > erc20
   * @param callReturnContext The call return context
   */
  private buildRouteQuoteForEthToErc20(
    callReturnContext: CallReturnContext
  ): RouteQuote {
    const convertQuoteUnformatted = new BigNumber(
      callReturnContext.returnValues[
        callReturnContext.returnValues.length - 1
      ].hex
    );
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
          return this.allTokens.find((t) => t.contractAddress === c)!.symbol;
        })
        .join(' > '),
      // route array is always in the 1 index of the method parameters
      routePathArray: callReturnContext.methodParameters[1],
    };
  }

  /**
   * Build up the route quote for erc20 > eth
   * @param callReturnContext The call return context
   */
  private buildRouteQuoteForErc20ToEth(
    callReturnContext: CallReturnContext
  ): RouteQuote {
    const convertQuoteUnformatted = new BigNumber(
      callReturnContext.returnValues[
        callReturnContext.returnValues.length - 1
      ].hex
    );
    return {
      expectedConvertQuote: new BigNumber(
        formatEther(convertQuoteUnformatted)
      ).toFixed(this._toToken.decimals),
      routePathArrayTokenMap: callReturnContext.methodParameters[1].map(
        (c: string) => {
          return this.allTokens.find((t) => t.contractAddress === c);
        }
      ),
      routeText: callReturnContext.methodParameters[1]
        .map((c: string) => {
          return this.allTokens.find((t) => t.contractAddress === c)!.symbol;
        })
        .join(' > '),
      // route array is always in the 1 index of the method parameters
      routePathArray: callReturnContext.methodParameters[1],
    };
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
      case TradePath.erc20ToErc20:
        return hexlify(amountToTrade.shiftedBy(this._fromToken.decimals));
      default:
        throw new Error(
          `Internal trade path ${this.tradePath()} is not supported`
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
    return [
      this.USDTTokenForConnectedNetwork,
      this.COMPTokenForConnectedNetwork,
      this.USDCTokenForConnectedNetwork,
      this.DAITokenForConnectedNetwork,
      this.WETHTokenForConnectedNetwork,
    ];
  }

  private get mainCurrenciesPairsForFromToken(): Token[][] {
    const pairs = [
      [this._fromToken, this.USDTTokenForConnectedNetwork],
      [this._fromToken, this.COMPTokenForConnectedNetwork],
      [this._fromToken, this.USDCTokenForConnectedNetwork],
      [this._fromToken, this.DAITokenForConnectedNetwork],
      [this._fromToken, this.WETHTokenForConnectedNetwork],
    ];

    return pairs.filter((t) => t[0].contractAddress !== t[1].contractAddress);
  }

  private get mainCurrenciesPairsForToToken(): Token[][] {
    const pairs: Token[][] = [
      [this.USDTTokenForConnectedNetwork, this._toToken],
      [this.COMPTokenForConnectedNetwork, this._toToken],
      [this.USDCTokenForConnectedNetwork, this._toToken],
      [this.DAITokenForConnectedNetwork, this._toToken],
      [this.WETHTokenForConnectedNetwork, this._toToken],
    ];

    return pairs.filter((t) => t[0].contractAddress !== t[1].contractAddress);
  }

  private get mainCurrenciesPairsForUSDT(): Token[][] {
    return [
      [this.USDTTokenForConnectedNetwork, this.COMPTokenForConnectedNetwork],
      [this.USDTTokenForConnectedNetwork, this.DAITokenForConnectedNetwork],
      [this.USDTTokenForConnectedNetwork, this.USDCTokenForConnectedNetwork],
      [this.USDTTokenForConnectedNetwork, this.WETHTokenForConnectedNetwork],
    ];
  }

  private get mainCurrenciesPairsForCOMP(): Token[][] {
    return [
      [this.COMPTokenForConnectedNetwork, this.USDTTokenForConnectedNetwork],
      [this.COMPTokenForConnectedNetwork, this.DAITokenForConnectedNetwork],
      [this.COMPTokenForConnectedNetwork, this.USDCTokenForConnectedNetwork],
      [this.COMPTokenForConnectedNetwork, this.WETHTokenForConnectedNetwork],
    ];
  }

  private get mainCurrenciesPairsForDAI(): Token[][] {
    return [
      [this.DAITokenForConnectedNetwork, this.USDTTokenForConnectedNetwork],
      [this.DAITokenForConnectedNetwork, this.COMPTokenForConnectedNetwork],
      [this.DAITokenForConnectedNetwork, this.USDCTokenForConnectedNetwork],
      [this.DAITokenForConnectedNetwork, this.WETHTokenForConnectedNetwork],
    ];
  }

  private get mainCurrenciesPairsForUSDC(): Token[][] {
    return [
      [this.USDCTokenForConnectedNetwork, this.USDTTokenForConnectedNetwork],
      [this.USDCTokenForConnectedNetwork, this.COMPTokenForConnectedNetwork],
      [this.USDCTokenForConnectedNetwork, this.DAITokenForConnectedNetwork],
      [this.USDCTokenForConnectedNetwork, this.WETHTokenForConnectedNetwork],
    ];
  }

  private get mainCurrenciesPairsForWETH(): Token[][] {
    return [
      [this.WETHTokenForConnectedNetwork, this.USDTTokenForConnectedNetwork],
      [this.WETHTokenForConnectedNetwork, this.COMPTokenForConnectedNetwork],
      [this.WETHTokenForConnectedNetwork, this.DAITokenForConnectedNetwork],
      [this.WETHTokenForConnectedNetwork, this.USDCTokenForConnectedNetwork],
    ];
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
}
