import { Contract, ContractInterface, providers } from 'ethers';
import { ChainId } from './enums/chain-id';

export class EthersProvider {
  private _ethersProvider: providers.BaseProvider;
  constructor(private _chainIdOrProviderUrl: ChainId | string) {
    if (typeof this._chainIdOrProviderUrl === 'string') {
      this._ethersProvider = new providers.JsonRpcProvider(
        this._chainIdOrProviderUrl
      );
      return;
    }

    this._ethersProvider = new providers.InfuraProvider(
      this._chainIdOrProviderUrl
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

  /**
   * Get the current nonce
   * @param ethereumAddress The ethereum address
   */
  public async nonce(ethereumAddress: string): Promise<number> {
    return this._ethersProvider.getTransactionCount(ethereumAddress);
  }
}
