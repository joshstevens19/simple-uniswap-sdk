import { Contract, ContractInterface, providers } from 'ethers';
import { ErrorCodes } from './common/errors/error-codes';
import { UniswapError } from './common/errors/uniswap-error';
import { ChainId, ChainNames } from './enums/chain-id';

export class EthersProvider {
  private _ethersProvider: providers.BaseProvider;
  constructor(
    private _chainId: ChainId,
    private _providerUrl?: string | undefined
  ) {
    if (_providerUrl) {
      const chainName = ChainNames.get(_chainId);
      if (!chainName) {
        throw new UniswapError(
          `Can not find chain name for ${_chainId}`,
          ErrorCodes.canNotFindChainId
        );
      }

      this._ethersProvider = new providers.StaticJsonRpcProvider(_providerUrl, {
        name: chainName,
        chainId: _chainId,
      });
      return;
    }

    this._ethersProvider = new providers.InfuraProvider(
      _chainId,
      this._getApiKey
    );
  }

  /**
   * Creates a contract instance
   * @param abi The ABI
   * @param contractAddress The contract address
   */
  public getContract<TGeneratedTypedContext>(
    abi: ContractInterface,
    contractAddress: string
  ): TGeneratedTypedContext {
    const contract = new Contract(contractAddress, abi, this._ethersProvider);

    return contract as unknown as TGeneratedTypedContext;
  }

  /**
   * Get the network
   */
  public network(): providers.Network {
    return this._ethersProvider.network;
  }

  /**
   * Get the ethers provider
   */
  public get provider(): providers.BaseProvider {
    return this._ethersProvider;
  }

  /**
   * Get eth amount
   * @param ethereumAddress The ethereum address
   */
  public async balanceOf(ethereumAddress: string): Promise<string> {
    return (
      await this._ethersProvider.getBalance(ethereumAddress)
    ).toHexString();
  }

  /**
   * Get provider url
   */
  public getProviderUrl(): string {
    if (this._providerUrl) {
      return this._providerUrl;
    }

    switch (this._chainId) {
      case ChainId.MAINNET:
        return `https://mainnet.infura.io/v3/${this._getApiKey}`;
      case ChainId.ROPSTEN:
        return `https://ropsten.infura.io/v3/${this._getApiKey}`;
      case ChainId.RINKEBY:
        return `https://rinkeby.infura.io/v3/${this._getApiKey}`;
      case ChainId.GÖRLI:
        return `https://goerli.infura.io/v3/${this._getApiKey}`;
      case ChainId.KOVAN:
        return `https://kovan.infura.io/v3/${this._getApiKey}`;
      default:
        throw new UniswapError(
          'Can not find provider url',
          ErrorCodes.canNotFindProviderUrl
        );
    }
  }

  /**
   * Get the api key
   */
  private get _getApiKey(): string {
    return '9aa3d95b3bc440fa88ea12eaa4456161';
  }
}
