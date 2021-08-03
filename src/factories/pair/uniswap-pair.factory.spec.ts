import {
  ChainId,
  ErrorCodes,
  ETH,
  UniswapError,
  UniswapPairFactory,
  UniswapPairSettings,
} from '../..';
import { CoinGecko } from '../../coin-gecko';
import { UniswapVersion } from '../../enums/uniswap-version';
import { EthersProvider } from '../../ethers-provider';
import { MockEthereumAddress } from '../../mocks/ethereum-address.mock';
import { MOCKFUN } from '../../mocks/fun-token.mock';
import { MOCK_PROVIDER_URL } from '../../mocks/provider-url.mock';
import { MOCKREP } from '../../mocks/rep-token.mock';
import { TradeDirection } from './models/trade-direction';
import { UniswapPairFactoryContext } from './models/uniswap-pair-factory-context';

describe('UniswapPairFactory', () => {
  const ethersProvider = new EthersProvider({
    chainId: ChainId.MAINNET,
    providerUrl: MOCK_PROVIDER_URL(),
  });
  describe('erc20 > erc20', () => {
    const uniswapPairFactoryContext: UniswapPairFactoryContext = {
      fromToken: MOCKFUN(),
      toToken: MOCKREP(),
      ethereumAddress: MockEthereumAddress(),
      settings: new UniswapPairSettings(),
      ethersProvider,
    };

    const uniswapPairFactory = new UniswapPairFactory(
      new CoinGecko(),
      uniswapPairFactoryContext
    );

    it('`toToken` should retun correctly', () => {
      expect(uniswapPairFactory.toToken).toEqual(
        uniswapPairFactoryContext.toToken
      );
    });

    it('`fromToken` should retun correctly', () => {
      expect(uniswapPairFactory.fromToken).toEqual(
        uniswapPairFactoryContext.fromToken
      );
    });

    describe('trade', () => {
      it('should return trade info', async () => {
        const result = await uniswapPairFactory.trade('1');
        expect(result).not.toBeUndefined();
      });
    });

    describe('findBestRoute', () => {
      describe(TradeDirection.input, () => {
        it('should return the best route', async () => {
          const result = await uniswapPairFactory.findBestRoute(
            '1',
            TradeDirection.input
          );
          expect(result).not.toBeUndefined();
        });
      });

      describe(TradeDirection.output, () => {
        it('should return the best route', async () => {
          const result = await uniswapPairFactory.findBestRoute(
            '1',
            TradeDirection.output
          );
          expect(result).not.toBeUndefined();
        });
      });
    });

    describe('findAllPossibleRoutesWithQuote', () => {
      describe(TradeDirection.input, () => {
        it('should return all possible routes with quotes', async () => {
          const result =
            await uniswapPairFactory.findAllPossibleRoutesWithQuote(
              '1',
              TradeDirection.input
            );
          expect(result).not.toBeUndefined();
        });
      });

      describe(TradeDirection.output, () => {
        it('should return all possible routes with quotes', async () => {
          const result =
            await uniswapPairFactory.findAllPossibleRoutesWithQuote(
              '1',
              TradeDirection.output
            );
          expect(result).not.toBeUndefined();
        });
      });
    });

    describe('findAllPossibleRoutes', () => {
      it('should return all possible routes', async () => {
        const result = await uniswapPairFactory.findAllPossibleRoutes();
        expect(result).not.toBeUndefined();
      });
    });

    describe('allowance', () => {
      describe('v2', () => {
        it('should return more then 0', async () => {
          const factory = new UniswapPairFactory(new CoinGecko(), {
            fromToken: MOCKFUN(),
            toToken: MOCKREP(),
            ethereumAddress: '0x5ab9d116a53ef41063e3eae26a7ebe736720e9ba',
            settings: new UniswapPairSettings(),
            ethersProvider,
          });

          const result = await factory.allowance(UniswapVersion.v2);
          expect(result).not.toEqual('0x00');
        });

        it('should return 0 allowance', async () => {
          const factory = new UniswapPairFactory(new CoinGecko(), {
            fromToken: MOCKREP(),
            toToken: MOCKFUN(),
            ethereumAddress: MockEthereumAddress(),
            settings: new UniswapPairSettings(),
            ethersProvider,
          });

          const result = await factory.allowance(UniswapVersion.v2);
          expect(result).toEqual('0x00');
        });
      });

      describe('v3', () => {
        xit('should return more then 0', async () => {
          const factory = new UniswapPairFactory(new CoinGecko(), {
            fromToken: MOCKFUN(),
            toToken: MOCKREP(),
            ethereumAddress: '0x5ab9d116a53ef41063e3eae26a7ebe736720e9ba',
            settings: new UniswapPairSettings(),
            ethersProvider,
          });

          const result = await factory.allowance(UniswapVersion.v3);
          expect(result).not.toEqual('0x00');
        });

        it('should return 0 allowance', async () => {
          const factory = new UniswapPairFactory(new CoinGecko(), {
            fromToken: MOCKREP(),
            toToken: MOCKFUN(),
            ethereumAddress: MockEthereumAddress(),
            settings: new UniswapPairSettings(),
            ethersProvider,
          });

          const result = await factory.allowance(UniswapVersion.v3);
          expect(result).toEqual('0x00');
        });
      });
    });

    describe('generateApproveMaxAllowanceData', () => {
      describe('v2', () => {
        it('should generate the approve max allowance data', async () => {
          const result =
            await uniswapPairFactory.generateApproveMaxAllowanceData(
              UniswapVersion.v2
            );
          expect(result).toEqual({
            data: '0x095ea7b30000000000000000000000007a250d5630b4cf539739df2c5dacb4c659f2488dffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
            from: '0xB1E6079212888f0bE0cf55874B2EB9d7a5e02cD9',
            to: '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
            value: '0x00',
          });
        });
      });

      describe('v2', () => {
        it('should generate the approve max allowance data', async () => {
          const result =
            await uniswapPairFactory.generateApproveMaxAllowanceData(
              UniswapVersion.v3
            );
          expect(result).toEqual({
            data: '0x095ea7b3000000000000000000000000e592427a0aece92de3edee1f18e0157c05861564ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
            from: '0xB1E6079212888f0bE0cf55874B2EB9d7a5e02cD9',
            to: '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
            value: '0x00',
          });
        });
      });
    });
  });

  describe('erc20 > eth', () => {
    const uniswapPairFactoryContext: UniswapPairFactoryContext = {
      fromToken: MOCKFUN(),
      toToken: ETH.MAINNET(),
      ethereumAddress: MockEthereumAddress(),
      settings: new UniswapPairSettings(),
      ethersProvider,
    };

    const uniswapPairFactory = new UniswapPairFactory(
      new CoinGecko(),
      uniswapPairFactoryContext
    );

    it('`toToken` should retun correctly', () => {
      expect(uniswapPairFactory.toToken).toEqual(
        uniswapPairFactoryContext.toToken
      );
    });

    it('`fromToken` should retun correctly', () => {
      expect(uniswapPairFactory.fromToken).toEqual(
        uniswapPairFactoryContext.fromToken
      );
    });

    describe('trade', () => {
      it('should return trade info', async () => {
        const result = await uniswapPairFactory.trade('1');
        expect(result).not.toBeUndefined();
      });
    });

    describe('findBestRoute', () => {
      describe(TradeDirection.input, () => {
        it('should return the best route', async () => {
          const result = await uniswapPairFactory.findBestRoute(
            '1',
            TradeDirection.input
          );
          expect(result).not.toBeUndefined();
        });
      });

      describe(TradeDirection.output, () => {
        it('should return the best route', async () => {
          const result = await uniswapPairFactory.findBestRoute(
            '1',
            TradeDirection.output
          );
          expect(result).not.toBeUndefined();
        });
      });
    });

    describe('findAllPossibleRoutesWithQuote', () => {
      describe(TradeDirection.input, () => {
        it('should return all possible routes with quotes', async () => {
          const result =
            await uniswapPairFactory.findAllPossibleRoutesWithQuote(
              '1',
              TradeDirection.input
            );
          expect(result).not.toBeUndefined();
        });
      });

      describe(TradeDirection.output, () => {
        it('should return all possible routes with quotes', async () => {
          const result =
            await uniswapPairFactory.findAllPossibleRoutesWithQuote(
              '1',
              TradeDirection.output
            );
          expect(result).not.toBeUndefined();
        });
      });
    });

    describe('findAllPossibleRoutes', () => {
      it('should return all possible routes', async () => {
        const result = await uniswapPairFactory.findAllPossibleRoutes();
        expect(result).not.toBeUndefined();
      });
    });

    describe('allowance', () => {
      describe('v2', () => {
        it('should return more then 0', async () => {
          const factory = new UniswapPairFactory(new CoinGecko(), {
            fromToken: MOCKFUN(),
            toToken: ETH.MAINNET(),
            ethereumAddress: '0x5ab9d116a53ef41063e3eae26a7ebe736720e9ba',
            settings: new UniswapPairSettings(),
            ethersProvider,
          });

          const result = await factory.allowance(UniswapVersion.v2);
          expect(result).not.toEqual('0x00');
        });

        it('should return 0 allowance', async () => {
          const factory = new UniswapPairFactory(new CoinGecko(), {
            fromToken: MOCKREP(),
            toToken: ETH.MAINNET(),
            ethereumAddress: MockEthereumAddress(),
            settings: new UniswapPairSettings(),
            ethersProvider,
          });

          const result = await factory.allowance(UniswapVersion.v2);
          expect(result).toEqual('0x00');
        });
      });

      describe('v3', () => {
        xit('should return more then 0', async () => {
          const factory = new UniswapPairFactory(new CoinGecko(), {
            fromToken: MOCKFUN(),
            toToken: ETH.MAINNET(),
            ethereumAddress: '0x5ab9d116a53ef41063e3eae26a7ebe736720e9ba',
            settings: new UniswapPairSettings(),
            ethersProvider,
          });

          const result = await factory.allowance(UniswapVersion.v3);
          expect(result).not.toEqual('0x00');
        });

        it('should return 0 allowance', async () => {
          const factory = new UniswapPairFactory(new CoinGecko(), {
            fromToken: MOCKREP(),
            toToken: ETH.MAINNET(),
            ethereumAddress: MockEthereumAddress(),
            settings: new UniswapPairSettings(),
            ethersProvider,
          });

          const result = await factory.allowance(UniswapVersion.v3);
          expect(result).toEqual('0x00');
        });
      });
    });

    describe('generateApproveMaxAllowanceData', () => {
      describe('v2', () => {
        it('should generate the approve max allowance data', async () => {
          const result =
            await uniswapPairFactory.generateApproveMaxAllowanceData(
              UniswapVersion.v2
            );
          expect(result).toEqual({
            data: '0x095ea7b30000000000000000000000007a250d5630b4cf539739df2c5dacb4c659f2488dffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
            from: '0xB1E6079212888f0bE0cf55874B2EB9d7a5e02cD9',
            to: '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
            value: '0x00',
          });
        });
      });

      describe('v3', () => {
        it('should generate the approve max allowance data', async () => {
          const result =
            await uniswapPairFactory.generateApproveMaxAllowanceData(
              UniswapVersion.v3
            );
          expect(result).toEqual({
            data: '0x095ea7b3000000000000000000000000e592427a0aece92de3edee1f18e0157c05861564ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
            from: '0xB1E6079212888f0bE0cf55874B2EB9d7a5e02cD9',
            to: '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
            value: '0x00',
          });
        });
      });
    });
  });

  describe('eth > erc20', () => {
    const uniswapPairFactoryContext: UniswapPairFactoryContext = {
      fromToken: ETH.MAINNET(),
      toToken: MOCKFUN(),
      ethereumAddress: MockEthereumAddress(),
      settings: new UniswapPairSettings(),
      ethersProvider,
    };

    const uniswapPairFactory = new UniswapPairFactory(
      new CoinGecko(),
      uniswapPairFactoryContext
    );

    it('`toToken` should retun correctly', () => {
      expect(uniswapPairFactory.toToken).toEqual(
        uniswapPairFactoryContext.toToken
      );
    });

    it('`fromToken` should retun correctly', () => {
      expect(uniswapPairFactory.fromToken).toEqual(
        uniswapPairFactoryContext.fromToken
      );
    });

    describe('trade', () => {
      it('should return trade info', async () => {
        const result = await uniswapPairFactory.trade('1');
        expect(result).not.toBeUndefined();
      });
    });

    describe('findBestRoute', () => {
      describe(TradeDirection.input, () => {
        it('should return the best route', async () => {
          const result = await uniswapPairFactory.findBestRoute(
            '1',
            TradeDirection.input
          );
          expect(result).not.toBeUndefined();
        });
      });

      describe(TradeDirection.output, () => {
        it('should return the best route', async () => {
          const result = await uniswapPairFactory.findBestRoute(
            '1',
            TradeDirection.output
          );
          expect(result).not.toBeUndefined();
        });
      });
    });

    describe('findAllPossibleRoutesWithQuote', () => {
      describe(TradeDirection.input, () => {
        it('should return all possible routes with quotes', async () => {
          const result =
            await uniswapPairFactory.findAllPossibleRoutesWithQuote(
              '1',
              TradeDirection.input
            );
          expect(result).not.toBeUndefined();
        });
      });

      describe(TradeDirection.output, () => {
        it('should return all possible routes with quotes', async () => {
          const result =
            await uniswapPairFactory.findAllPossibleRoutesWithQuote(
              '1',
              TradeDirection.output
            );
          expect(result).not.toBeUndefined();
        });
      });
    });

    describe('findAllPossibleRoutes', () => {
      it('should return all possible routes', async () => {
        const result = await uniswapPairFactory.findAllPossibleRoutes();
        expect(result).not.toBeUndefined();
      });
    });

    describe('allowance', () => {
      describe('v2', () => {
        it('should always return max hex', async () => {
          const result = await uniswapPairFactory.allowance(UniswapVersion.v2);
          expect(result).toEqual(
            '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
          );
        });
      });

      describe('v3', () => {
        it('should always return max hex', async () => {
          const result = await uniswapPairFactory.allowance(UniswapVersion.v3);
          expect(result).toEqual(
            '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
          );
        });
      });
    });

    describe('generateApproveMaxAllowanceData', () => {
      describe('v2', () => {
        it('should throw when generating the approve max allowance data', async () => {
          await expect(
            uniswapPairFactory.generateApproveMaxAllowanceData(
              UniswapVersion.v2
            )
          ).rejects.toThrowError(
            new UniswapError(
              'You do not need to generate approve uniswap allowance when doing eth > erc20',
              ErrorCodes.generateApproveMaxAllowanceDataNotAllowed
            )
          );
        });
      });

      describe('v3', () => {
        it('should throw when generating the approve max allowance data', async () => {
          await expect(
            uniswapPairFactory.generateApproveMaxAllowanceData(
              UniswapVersion.v3
            )
          ).rejects.toThrowError(
            new UniswapError(
              'You do not need to generate approve uniswap allowance when doing eth > erc20',
              ErrorCodes.generateApproveMaxAllowanceDataNotAllowed
            )
          );
        });
      });
    });
  });
});
