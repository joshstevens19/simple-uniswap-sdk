import { isAddress } from '../../common/utils/is-address';
import { EthersProvider } from '../../ethers-provider';
import { TokensFactory } from '../token/tokens.factory';
import {
  UniswapPairContextForChainId,
  UniswapPairContextForProviderUrl,
} from './models/uniswap-pair-contexts';
import { UniswapPairFactoryContext } from './models/uniswap-pair-factory-context';
import { UniswapPairSettings } from './models/uniswap-pair-settings';
import { UniswapPairFactory } from './uniswap-pair.factory';

export class UniswapPair {
  private _ethersProvider: EthersProvider;

  constructor(
    private _uniswapPairContext:
      | UniswapPairContextForChainId
      | UniswapPairContextForProviderUrl
  ) {
    if (!this._uniswapPairContext.fromTokenContractAddress) {
      throw new Error('Must have a `fromTokenContractAddress` on the context');
    }

    if (!isAddress(this._uniswapPairContext.fromTokenContractAddress)) {
      throw new Error(
        '`fromTokenContractAddress` is not a valid contract address'
      );
    }

    if (!this._uniswapPairContext.toTokenContractAddress) {
      throw new Error('Must have a `toTokenContractAddress` on the context');
    }

    if (!isAddress(this._uniswapPairContext.toTokenContractAddress)) {
      throw new Error(
        '`toTokenContractAddress` is not a valid contract address'
      );
    }

    if (!this._uniswapPairContext.ethereumAddress) {
      throw new Error('Must have a `ethereumAddress` on the context');
    }

    if (!isAddress(this._uniswapPairContext.ethereumAddress)) {
      throw new Error('`ethereumAddress` is not a valid address');
    }

    const chainId = (<UniswapPairContextForChainId>this._uniswapPairContext)
      .chainId;

    if (chainId) {
      this._ethersProvider = new EthersProvider(chainId);
      return;
    }

    const providerUrl = (<UniswapPairContextForProviderUrl>(
      this._uniswapPairContext
    )).providerUrl;

    if (providerUrl && chainId) {
      this._ethersProvider = new EthersProvider(chainId, providerUrl);
      return;
    }

    throw new Error('You must have a chainId or a providerUrl on the context.');
  }

  /**
   * Create factory to be able to call methods on the 2 tokens
   */
  public async createFactory(): Promise<UniswapPairFactory> {
    const tokensFactory = new TokensFactory(this._ethersProvider);
    const tokens = await tokensFactory.getTokens([
      this._uniswapPairContext.fromTokenContractAddress,
      this._uniswapPairContext.toTokenContractAddress,
    ]);

    const uniswapFactoryContext: UniswapPairFactoryContext = {
      fromToken: tokens.find(
        (t) =>
          t.contractAddress ===
          this._uniswapPairContext.fromTokenContractAddress
      )!,
      toToken: tokens.find(
        (t) =>
          t.contractAddress === this._uniswapPairContext.toTokenContractAddress
      )!,
      ethereumAddress: this._uniswapPairContext.ethereumAddress,
      settings: this._uniswapPairContext.settings || new UniswapPairSettings(),
      ethersProvider: this._ethersProvider,
    };

    return new UniswapPairFactory(uniswapFactoryContext);
  }
}
