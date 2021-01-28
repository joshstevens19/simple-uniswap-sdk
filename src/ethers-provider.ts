import { Contract, ContractInterface, providers } from 'ethers';
import { NetworkDetails } from './models/network-details';

export class EthersProvider {
  private _ethersProvider: providers.JsonRpcProvider;
  constructor(private _networkDetails: NetworkDetails) {
    this._ethersProvider = new providers.JsonRpcProvider(
      this._networkDetails.providerUrl // TODO USE FALLBACK NODE IF NONE PASSED IN
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
  public get provider(): providers.JsonRpcProvider {
    return this._ethersProvider;
  }
}
