import BigNumber from 'bignumber.js';
import { ChainId, ErrorCodes, UniswapError, WETH } from '../..';
import { EthersProvider } from '../../ethers-provider';
import { MOCKFUN } from '../../mocks/fun-token.mock';
import { MOCKREP } from '../../mocks/rep-token.mock';
import { UniswapRouterFactory } from './uniswap-router.factory';

describe('UniswapRouterFactory', () => {
  const ethersProvider = new EthersProvider(ChainId.MAINNET);

  describe('erc20 > erc20', () => {
    const fromToken = MOCKFUN();
    const toToken = MOCKREP();

    const uniswapRouterFactory = new UniswapRouterFactory(
      fromToken,
      toToken,
      false,
      ethersProvider
    );

    describe('getAllPossibleRoutes', () => {
      it('should get all possible routes', async () => {
        const result = await uniswapRouterFactory.getAllPossibleRoutes();
        expect(result.length > 0).toEqual(true);
        expect(result.filter((c) => c.length > 2).length > 0).toEqual(true);
      });

      it('should only return direct routes (in this case return nothing as there is no direct route)', async () => {
        const factory = new UniswapRouterFactory(
          fromToken,
          toToken,
          true,
          ethersProvider
        );

        const result = await factory.getAllPossibleRoutes();
        expect(result.length === 0).toEqual(true);
      });
    });

    describe('getAllPossibleRoutesWithQuotes', () => {
      it('should get all possible routes with quote', async () => {
        const result = await uniswapRouterFactory.getAllPossibleRoutesWithQuotes(
          new BigNumber(1)
        );
        expect(result.length > 0).toEqual(true);
      });

      it('should only return direct routes (in this case return nothing as there is no direct route)', async () => {
        const factory = new UniswapRouterFactory(
          fromToken,
          toToken,
          true,
          ethersProvider
        );

        const result = await factory.getAllPossibleRoutesWithQuotes(
          new BigNumber(1)
        );
        expect(result.length === 0).toEqual(true);
      });
    });

    describe('findBestRoute', () => {
      it('should find best route', async () => {
        const result = await uniswapRouterFactory.findBestRoute(
          new BigNumber(100)
        );
        expect(result.bestRouteQuote.routeText).toEqual('FUN > WETH > REP');
      });

      it('should throw an error as there is no best route with disableMultihops turned on', async () => {
        const factory = new UniswapRouterFactory(
          fromToken,
          toToken,
          true,
          ethersProvider
        );

        await expect(
          factory.findBestRoute(new BigNumber(100))
        ).rejects.toThrowError(
          new UniswapError(
            `No routes found for ${fromToken.contractAddress} > ${toToken.contractAddress}`,
            ErrorCodes.noRoutesFound
          )
        );
      });
    });
  });

  describe('erc20 > eth', () => {
    const fromToken = MOCKFUN();
    const toToken = WETH.MAINNET();

    const uniswapRouterFactory = new UniswapRouterFactory(
      fromToken,
      toToken,
      false,
      ethersProvider
    );

    describe('getAllPossibleRoutes', () => {
      it('should get all possible routes', async () => {
        const result = await uniswapRouterFactory.getAllPossibleRoutes();
        expect(result.length > 0).toEqual(true);
        expect(result.filter((c) => c.length > 2).length > 0).toEqual(true);
      });

      it('should only return direct routes', async () => {
        const factory = new UniswapRouterFactory(
          fromToken,
          toToken,
          true,
          ethersProvider
        );

        const result = await factory.getAllPossibleRoutes();
        expect(result.length === 1).toEqual(true);
        expect(result[0][0]).toEqual(fromToken);
        expect(result[0][1]).toEqual(toToken);
        expect(result.filter((c) => c.length > 2).length > 0).toEqual(false);
      });
    });

    describe('getAllPossibleRoutesWithQuotes', () => {
      it('should get all possible routes with quote', async () => {
        const result = await uniswapRouterFactory.getAllPossibleRoutesWithQuotes(
          new BigNumber(1)
        );
        expect(result.length > 0).toEqual(true);
      });

      it('should only return direct routes', async () => {
        const factory = new UniswapRouterFactory(
          fromToken,
          toToken,
          true,
          ethersProvider
        );

        const result = await factory.getAllPossibleRoutesWithQuotes(
          new BigNumber(1)
        );
        expect(
          result.filter((c) => c.routePathArray.length > 2).length > 0
        ).toEqual(false);
      });
    });

    describe('findBestRoute', () => {
      it('should find best route', async () => {
        const result = await uniswapRouterFactory.findBestRoute(
          new BigNumber(100)
        );
        expect(result.bestRouteQuote.routeText).toEqual('FUN > WETH');
      });

      it('should return best route', async () => {
        const factory = new UniswapRouterFactory(
          fromToken,
          toToken,
          true,
          ethersProvider
        );

        const result = await factory.findBestRoute(new BigNumber(100));

        expect(result.bestRouteQuote.routeText).toEqual('FUN > WETH');
        expect(
          result.triedRoutesQuote.filter((c) => c.routePathArray.length > 2)
            .length > 0
        ).toEqual(false);
      });
    });
  });

  describe('eth > erc20', () => {
    const fromToken = WETH.MAINNET();
    const toToken = MOCKFUN();

    const uniswapRouterFactory = new UniswapRouterFactory(
      fromToken,
      toToken,
      false,
      ethersProvider
    );

    describe('getAllPossibleRoutes', () => {
      it('should get all possible routes', async () => {
        const result = await uniswapRouterFactory.getAllPossibleRoutes();
        expect(result.length > 0).toEqual(true);
        expect(result.filter((c) => c.length > 2).length > 0).toEqual(true);
      });

      it('should only return direct routes', async () => {
        const factory = new UniswapRouterFactory(
          fromToken,
          toToken,
          true,
          ethersProvider
        );

        const result = await factory.getAllPossibleRoutes();
        expect(result.length === 1).toEqual(true);
        expect(result[0][0]).toEqual(fromToken);
        expect(result[0][1]).toEqual(toToken);
        expect(result.filter((c) => c.length > 2).length > 0).toEqual(false);
      });
    });

    describe('getAllPossibleRoutesWithQuotes', () => {
      it('should get all possible routes with quote', async () => {
        const result = await uniswapRouterFactory.getAllPossibleRoutesWithQuotes(
          new BigNumber(1)
        );
        expect(result.length > 0).toEqual(true);
      });

      it('should only return direct routes', async () => {
        const factory = new UniswapRouterFactory(
          fromToken,
          toToken,
          true,
          ethersProvider
        );

        const result = await factory.getAllPossibleRoutesWithQuotes(
          new BigNumber(1)
        );
        expect(
          result.filter((c) => c.routePathArray.length > 2).length > 0
        ).toEqual(false);
      });
    });

    describe('findBestRoute', () => {
      it('should find best route', async () => {
        const result = await uniswapRouterFactory.findBestRoute(
          new BigNumber(100)
        );
        expect(result.bestRouteQuote.routeText).toEqual('WETH > FUN');
      });

      it('should return best route', async () => {
        const factory = new UniswapRouterFactory(
          fromToken,
          toToken,
          true,
          ethersProvider
        );

        const result = await factory.findBestRoute(new BigNumber(100));

        expect(result.bestRouteQuote.routeText).toEqual('WETH > FUN');
        expect(
          result.triedRoutesQuote.filter((c) => c.routePathArray.length > 2)
            .length > 0
        ).toEqual(false);
      });
    });
  });
});
