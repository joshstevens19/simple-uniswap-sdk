import { ContractContext as ERC20ContractContext } from '../ABI/types/erc20-contract';
import { ContractContext } from '../common/contract-context';
import { EthersProvider } from '../ethers-provider';
import { Token } from './models/token';

export class TokenService {
  constructor(
    private _tokenContractAddress: string,
    private _ethersProvider: EthersProvider
  ) {}

  /**
   * Get the token details
   */
  public async getToken(): Promise<Token> {
    const contract = this._ethersProvider.getContract<ERC20ContractContext>(
      JSON.stringify(ContractContext.erc20Abi),
      this._tokenContractAddress
    );

    const symbol = await contract.symbol();
    const decimals = await contract.decimals();
    const name = await contract.name();

    return {
      chainId: this._ethersProvider.network().chainId,
      contractAddress: this._tokenContractAddress,
      decimals,
      symbol,
      name,
    };
  }
}
