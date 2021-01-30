import { ContractContext as ERC20ContractContext } from '../../ABI/types/erc20-contract';
import { ContractContext } from '../../common/contract-context';
import { EthersProvider } from '../../ethers-provider';
import { Token } from './models/token';

export class TokenFactory {
  private _erc20TokenContracy = this._ethersProvider.getContract<ERC20ContractContext>(
    JSON.stringify(ContractContext.erc20Abi),
    this._tokenContractAddress
  );

  constructor(
    private _tokenContractAddress: string,
    private _ethersProvider: EthersProvider
  ) {}

  /**
   * Get the token details
   */
  public async getToken(): Promise<Token> {
    const symbol = await this._erc20TokenContracy.symbol();
    const decimals = await this._erc20TokenContracy.decimals();
    const name = await this._erc20TokenContracy.name();

    return {
      chainId: this._ethersProvider.network().chainId,
      contractAddress: this._tokenContractAddress,
      decimals,
      symbol,
      name,
    };
  }

  /**
   * Get the allowance for the amount which can be moved from the contract
   * for a user
   * @ethereumAddress The users ethereum address
   */
  public async allowance(ethereumAddress: string): Promise<string> {
    const allowance = await this._erc20TokenContracy.allowance(
      ethereumAddress,
      ContractContext.routerAddress
    );

    return allowance.toHexString();
  }

  /**
   * Generate the token approve data allowance to move the tokens.
   * This will return the data for you to send as a transaction
   * @spender The contract address for which you are allowing to move tokens on your behalf
   * @value The amount you want to allow them to do
   */
  public generateApproveAllowanceData(spender: string, value: string): string {
    return this._erc20TokenContracy.interface.encodeFunctionData('approve', [
      spender,
      value,
    ]);
  }

  /**
   * Get the balance the user has of this token
   * @ethereumAddress The users ethereum address
   */
  public async balanceOf(ethereumAddress: string): Promise<string> {
    const balance = await this._erc20TokenContracy.balanceOf(ethereumAddress);

    return balance.toHexString();
  }

  /**
   * Get the total supply of tokens which exist
   */
  public async totalSupply(): Promise<string> {
    const totalSupply = await this._erc20TokenContracy.totalSupply();

    return totalSupply.toHexString();
  }
}
