import { EthersProvider } from '../../ethers-provider';
import { NetworkDetails } from '../../models/network-details';
import { TokenFactory } from '../token/token.factory';
import { UniswapPairContext } from './models/uniswap-pair-context';
import { UniswapPairSettings } from './models/uniswap-pair-settings';
import { UniswapPairFactory } from './uniswap-pair.factory';

export class UniswapPair {
  private _ethersProvider: EthersProvider;

  constructor(
    private _fromTokenContractAddress: string,
    private _toTokenContractAddress: string,
    private _ethereumAddress: string,
    private _networkDetails: NetworkDetails,
    private _settings: UniswapPairSettings = new UniswapPairSettings()
  ) {
    this._ethersProvider = new EthersProvider(this._networkDetails);
  }

  /**
   * Create factory to be able to call methods on the 2 tokens
   */
  public async createFactory(): Promise<UniswapPairFactory> {
    const fromTokenContext = new TokenFactory(
      this._fromTokenContractAddress,
      this._ethersProvider
    );

    const fromToken = await fromTokenContext.getToken();

    const toTokenContext = new TokenFactory(
      this._toTokenContractAddress,
      this._ethersProvider
    );

    const toToken = await toTokenContext.getToken();

    const uniswapFactoryContext: UniswapPairContext = {
      fromToken,
      toToken,
      ethereumAddress: this._ethereumAddress,
      settings: this._settings,
      ethersProvider: this._ethersProvider,
    };

    return new UniswapPairFactory(uniswapFactoryContext);
  }
}
