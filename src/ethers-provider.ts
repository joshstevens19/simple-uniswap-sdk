import { Contract, ContractInterface, providers } from 'ethers';
import { ErrorCodes } from './common/errors/error-codes';
import { UniswapError } from './common/errors/uniswap-error';
import { ChainId, ChainNames } from './enums/chain-id';

export interface ChainIdAndProvider {
  chainId: ChainId;
  providerUrl?: string | undefined;
}

export interface EthereumProvider {
  ethereumProvider: any;
}

export class EthersProvider {
  private _ethersProvider: providers.BaseProvider;
  constructor(private _providerContext: ChainIdAndProvider | EthereumProvider) {
    const chainId = (<ChainIdAndProvider>this._providerContext).chainId;
    if (chainId) {
      const chainName = ChainNames.get(chainId);
      if (!chainName) {
        throw new UniswapError(
          `Can not find chain name for ${chainId}`,
          ErrorCodes.canNotFindChainId
        );
      }

      const providerUrl = (<ChainIdAndProvider>this._providerContext)
        .providerUrl;
      if (providerUrl) {
        this._ethersProvider = new providers.StaticJsonRpcProvider(
          providerUrl,
          {
            name: chainName,
            chainId: chainId,
          }
        );
      } else {
        this._ethersProvider = new providers.InfuraProvider(
          chainId,
          this._getApiKey
        );
      }
    } else {
      const ethereumProvider = (<EthereumProvider>this._providerContext)
        .ethereumProvider;
      if (!ethereumProvider) {
        throw new UniswapError(
          'Wrong ethers provider context',
          ErrorCodes.wrongEthersProviderContext
        );
      }

      this._ethersProvider = new providers.Web3Provider(ethereumProvider);
    }
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
  public getProviderUrl(): string | undefined {
    const ethereumProvider = (<EthereumProvider>this._providerContext)
      .ethereumProvider;
    if (ethereumProvider) {
      return undefined;
    }

    const providerUrl = (<ChainIdAndProvider>this._providerContext).providerUrl;
    if (providerUrl) {
      return providerUrl;
    }

    const chainId = (<ChainIdAndProvider>this._providerContext).chainId;

    switch (chainId) {
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
        return undefined;
    }
  }

  /**
   * Get the api key
   */
  private get _getApiKey(): string {
    return '9aa3d95b3bc440fa88ea12eaa4456161';
  }
}
