import { EthersProvider } from './ethers-provider';
import { UniswapFactoryContext } from './factory/models/uniswap-factory-context';
import { UniswapFactory } from './factory/uniswap-factory';
import { NetworkDetails } from './models/network-details';
import { UniswapPairSettings } from './models/uniswap-pair-settings';
import { TokenService } from './tokens/token.service';

export class UniswapPair {
  private _ethersProvider: EthersProvider;

  constructor(
    private _fromTokenContractAddress: string,
    private _toTokenContractAddress: string,
    private _networkDetails: NetworkDetails,
    private _settings: UniswapPairSettings = new UniswapPairSettings()
  ) {
    this._ethersProvider = new EthersProvider(this._networkDetails);
  }

  /**
   * Create factory to be able to call methods on the 2 tokens
   */
  public async createFactory(): Promise<UniswapFactory> {
    const fromTokenContext = new TokenService(
      this._fromTokenContractAddress,
      this._ethersProvider
    );

    const fromToken = await fromTokenContext.getToken();

    const toTokenContext = new TokenService(
      this._toTokenContractAddress,
      this._ethersProvider
    );

    const toToken = await toTokenContext.getToken();

    const uniswapFactoryContext: UniswapFactoryContext = {
      fromToken,
      toToken,
      settings: this._settings,
      ethersProvider: this._ethersProvider,
    };

    return new UniswapFactory(uniswapFactoryContext);
  }
}
