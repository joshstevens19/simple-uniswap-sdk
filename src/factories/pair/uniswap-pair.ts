import { ChainId } from '../../enums/chain-id';
import { EthersProvider } from '../../ethers-provider';
import { TokensFactory } from '../token/tokens.factory';
import { UniswapPairContext } from './models/uniswap-pair-context';
import { UniswapPairSettings } from './models/uniswap-pair-settings';
import { UniswapPairFactory } from './uniswap-pair.factory';

export class UniswapPair {
  private _ethersProvider: EthersProvider;

  constructor(
    private _fromTokenContractAddress: string,
    private _toTokenContractAddress: string,
    private _ethereumAddress: string,
    private _chainIdOrProviderUrl: ChainId | string,
    private _settings: UniswapPairSettings = new UniswapPairSettings()
  ) {
    this._ethersProvider = new EthersProvider(this._chainIdOrProviderUrl);
  }

  /**
   * Create factory to be able to call methods on the 2 tokens
   */
  public async createFactory(): Promise<UniswapPairFactory> {
    const tokensFactory = new TokensFactory(this._ethersProvider);
    const tokens = await tokensFactory.getTokens([
      this._fromTokenContractAddress,
      this._toTokenContractAddress,
    ]);

    const uniswapFactoryContext: UniswapPairContext = {
      fromToken: tokens.find(
        (t) => t.contractAddress === this._fromTokenContractAddress
      )!,
      toToken: tokens.find(
        (t) => t.contractAddress === this._toTokenContractAddress
      )!,
      ethereumAddress: this._ethereumAddress,
      settings: this._settings,
      ethersProvider: this._ethersProvider,
    };

    return new UniswapPairFactory(uniswapFactoryContext);
  }
}
