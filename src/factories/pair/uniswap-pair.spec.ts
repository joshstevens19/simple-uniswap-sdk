import { providers } from 'ethers';
import { ChainId, ErrorCodes, UniswapError } from '../..';
import { ETH } from '../../common/tokens';
import { MockEthereumAddress } from '../../mocks/ethereum-address.mock';
import { MOCKFUN } from '../../mocks/fun-token.mock';
import { MOCK_PROVIDER_URL } from '../../mocks/provider-url.mock';
import { MOCKREP } from '../../mocks/rep-token.mock';
import {
  UniswapPairContextForChainId,
  UniswapPairContextForEthereumProvider,
  UniswapPairContextForProviderUrl,
} from './models/uniswap-pair-contexts';
import { UniswapPair } from './uniswap-pair';

describe('UniswapPair', () => {
  it('should throw if no fromTokenContractAddress is passed in', () => {
    // @ts-ignore
    const context: UniswapPairContextForChainId = {};
    expect(() => new UniswapPair(context)).toThrowError(
      new UniswapError(
        'Must have a `fromTokenContractAddress` on the context',
        ErrorCodes.fromTokenContractAddressRequired
      )
    );
  });

  it('should throw if fromTokenContractAddress is invalid address', () => {
    // @ts-ignore
    const context: UniswapPairContextForChainId = {
      fromTokenContractAddress: '1',
    };
    expect(() => new UniswapPair(context)).toThrowError(
      new UniswapError(
        '`fromTokenContractAddress` is not a valid contract address',
        ErrorCodes.fromTokenContractAddressNotValid
      )
    );
  });

  it('should throw if no toTokenContractAddress is passed in', () => {
    // @ts-ignore
    const context: UniswapPairContextForChainId = {
      fromTokenContractAddress: MOCKFUN().contractAddress,
    };
    expect(() => new UniswapPair(context)).toThrowError(
      new UniswapError(
        'Must have a `toTokenContractAddress` on the context',
        ErrorCodes.toTokenContractAddressRequired
      )
    );
  });

  it('should throw if toTokenContractAddress is invalid address', () => {
    // @ts-ignore
    const context: UniswapPairContextForChainId = {
      fromTokenContractAddress: MOCKFUN().contractAddress,
      toTokenContractAddress: '1',
    };
    expect(() => new UniswapPair(context)).toThrowError(
      new UniswapError(
        '`toTokenContractAddress` is not a valid contract address',
        ErrorCodes.toTokenContractAddressNotValid
      )
    );
  });

  it('should throw if no ethereumAddress is passed in', () => {
    // @ts-ignore
    const context: UniswapPairContextForChainId = {
      fromTokenContractAddress: MOCKFUN().contractAddress,
      toTokenContractAddress: MOCKREP().contractAddress,
    };
    expect(() => new UniswapPair(context)).toThrowError(
      new UniswapError(
        'Must have a `ethereumAddress` on the context',
        ErrorCodes.ethereumAddressRequired
      )
    );
  });

  it('should throw if ethereumAddress is invalid address', () => {
    // @ts-ignore
    const context: UniswapPairContextForChainId = {
      fromTokenContractAddress: MOCKFUN().contractAddress,
      toTokenContractAddress: MOCKREP().contractAddress,
      ethereumAddress: '1',
    };
    expect(() => new UniswapPair(context)).toThrowError(
      new UniswapError(
        '`ethereumAddress` is not a valid address',
        ErrorCodes.ethereumAddressNotValid
      )
    );
  });

  it('should throw if no chainId or ethereum provider passed in', () => {
    // @ts-ignore
    const context: UniswapPairContextForChainId = {
      fromTokenContractAddress: MOCKFUN().contractAddress,
      toTokenContractAddress: MOCKREP().contractAddress,
      ethereumAddress: MockEthereumAddress(),
    };
    expect(() => new UniswapPair(context)).toThrowError(
      new UniswapError(
        'Your must supply a chainId or a ethereum provider please look at types `UniswapPairContextForEthereumProvider`, `UniswapPairContextForChainId` and `UniswapPairContextForProviderUrl` to make sure your object is correct in what your passing in',
        ErrorCodes.invalidPairContext
      )
    );
  });

  it('should create ethers provider', () => {
    const context: UniswapPairContextForChainId = {
      fromTokenContractAddress: MOCKFUN().contractAddress,
      toTokenContractAddress: MOCKREP().contractAddress,
      ethereumAddress: MockEthereumAddress(),
      chainId: ChainId.MAINNET,
    };

    const uniswapPair = new UniswapPair(context);

    //@ts-ignore
    expect(typeof uniswapPair._ethersProvider).not.toBeUndefined();
  });

  it('should create ethers provider', () => {
    const context: UniswapPairContextForProviderUrl = {
      fromTokenContractAddress: MOCKFUN().contractAddress,
      toTokenContractAddress: MOCKREP().contractAddress,
      ethereumAddress: MockEthereumAddress(),
      chainId: ChainId.MAINNET,
      providerUrl: MOCK_PROVIDER_URL(),
    };

    const uniswapPair = new UniswapPair(context);

    //@ts-ignore
    expect(typeof uniswapPair._ethersProvider).not.toBeUndefined();
  });

  it('should create ethers provider', () => {
    const context: UniswapPairContextForEthereumProvider = {
      fromTokenContractAddress: MOCKFUN().contractAddress,
      toTokenContractAddress: MOCKREP().contractAddress,
      ethereumAddress: MockEthereumAddress(),
      ethereumProvider: new providers.JsonRpcProvider(MOCK_PROVIDER_URL()),
    };

    const uniswapPair = new UniswapPair(context);

    //@ts-ignore
    expect(typeof uniswapPair._ethersProvider).not.toBeUndefined();
  });

  describe('createFactory', () => {
    it('erc20 > erc20 > should create a uniswap pair factory', async () => {
      const context: UniswapPairContextForChainId = {
        fromTokenContractAddress: MOCKFUN().contractAddress,
        toTokenContractAddress: MOCKREP().contractAddress,
        ethereumAddress: MockEthereumAddress(),
        chainId: ChainId.MAINNET,
      };

      const uniswapPair = new UniswapPair(context);
      const factory = await uniswapPair.createFactory();
      expect(factory.toToken).toEqual(MOCKREP());
      expect(factory.fromToken).toEqual(MOCKFUN());
    });

    it('eth > erc20 > should create a uniswap pair factory', async () => {
      const context: UniswapPairContextForChainId = {
        fromTokenContractAddress: ETH.MAINNET().contractAddress,
        toTokenContractAddress: MOCKREP().contractAddress,
        ethereumAddress: MockEthereumAddress(),
        chainId: ChainId.MAINNET,
      };

      const uniswapPair = new UniswapPair(context);
      const factory = await uniswapPair.createFactory();
      expect(factory.toToken).toEqual(MOCKREP());
      expect(factory.fromToken).toEqual(ETH.MAINNET());
    });

    it('erc20 > eth > should create a uniswap pair factory', async () => {
      const context: UniswapPairContextForChainId = {
        fromTokenContractAddress: MOCKFUN().contractAddress,
        toTokenContractAddress: ETH.MAINNET().contractAddress,
        ethereumAddress: MockEthereumAddress(),
        chainId: ChainId.MAINNET,
      };

      const uniswapPair = new UniswapPair(context);
      const factory = await uniswapPair.createFactory();
      expect(factory.toToken).toEqual(ETH.MAINNET());
      expect(factory.fromToken).toEqual(MOCKFUN());
    });
  });
});
