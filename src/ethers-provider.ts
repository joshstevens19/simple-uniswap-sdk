import { Contract, ContractInterface, providers } from 'ethers';
import { ErrorCodes } from './common/errors/error-codes';
import { UniswapError } from './common/errors/uniswap-error';
import { ChainId, ChainNames } from './enums/chain-id';

export class EthersProvider {
  private _ethersProvider: providers.BaseProvider;
  constructor(chainId: ChainId, providerUrl?: string | undefined) {
    if (providerUrl) {
      const chainName = ChainNames.get(chainId);
      if (!chainName) {
        throw new UniswapError(
          `Can not find chain name for ${chainId}`,
          ErrorCodes.canNotFindChainId
        );
      }

      this._ethersProvider = new providers.StaticJsonRpcProvider(providerUrl, {
        name: chainName,
        chainId,
      });
      return;
    }

    this._ethersProvider = new providers.InfuraProvider(chainId);
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

    return (contract as unknown) as TGeneratedTypedContext;
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
}
