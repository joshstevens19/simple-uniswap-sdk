import { ContractCallContext, Multicall } from 'ethereum-multicall';
import { BigNumber, ethers } from 'ethers';
import { ContractContext as ERC20ContractContext } from '../../ABI/types/erc20-contract';
import { ContractContext } from '../../common/contract-context';
import { EthersProvider } from '../../ethers-provider';
import { UniswapContractContextV2 } from '../../uniswap-contract-context/uniswap-contract-context-v2';
import { AllowanceAndBalanceOf } from './models/allowance-balance-of';
import { Token } from './models/token';

export class TokenFactory {
  private _multicall = new Multicall({
    ethersProvider: this._ethersProvider.provider,
  });

  private _erc20TokenContract = this._ethersProvider.getContract<ERC20ContractContext>(
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
    const SYMBOL = 0;
    const DECIMALS = 1;
    const NAME = 2;

    const contractCallContext: ContractCallContext = {
      reference: 'token',
      contractAddress: ethers.utils.getAddress(this._tokenContractAddress),
      abi: ContractContext.erc20Abi,
      calls: [
        {
          reference: `symbol`,
          methodName: 'symbol',
          methodParameters: [],
        },
        {
          reference: `decimals`,
          methodName: 'decimals',
          methodParameters: [],
        },
        {
          reference: `name`,
          methodName: 'name',
          methodParameters: [],
        },
      ],
    };

    const contractCallResults = await this._multicall.call(contractCallContext);
    const results = contractCallResults.results[contractCallContext.reference];

    return {
      chainId: this._ethersProvider.network().chainId,
      contractAddress: results.originalContractCallContext.contractAddress,
      symbol: results.callsReturnContext[SYMBOL].returnValues[0],
      decimals: results.callsReturnContext[DECIMALS].returnValues[0],
      name: results.callsReturnContext[NAME].returnValues[0],
    };
  }

  /**
   * Get the allowance for the amount which can be moved from the contract
   * for a user
   * @ethereumAddress The users ethereum address
   */
  public async allowance(ethereumAddress: string): Promise<string> {
    const allowance = await this._erc20TokenContract.allowance(
      ethereumAddress,
      UniswapContractContextV2.routerAddress
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
    return this._erc20TokenContract.interface.encodeFunctionData('approve', [
      spender,
      value,
    ]);
  }

  /**
   * Get the balance the user has of this token
   * @ethereumAddress The users ethereum address
   */
  public async balanceOf(ethereumAddress: string): Promise<string> {
    const balance = await this._erc20TokenContract.balanceOf(ethereumAddress);

    return balance.toHexString();
  }

  /**
   * Get the total supply of tokens which exist
   */
  public async totalSupply(): Promise<string> {
    const totalSupply = await this._erc20TokenContract.totalSupply();

    return totalSupply.toHexString();
  }

  /**
   * Get allowance and balance
   * @param ethereumAddress
   */
  public async getAllowanceAndBalanceOf(
    ethereumAddress: string
  ): Promise<AllowanceAndBalanceOf> {
    const ALLOWANCE = 0;
    const BALANCEOF = 1;

    const contractCallContext: ContractCallContext = {
      reference: 'allowance-and-balance-of',
      contractAddress: ethers.utils.getAddress(this._tokenContractAddress),
      abi: ContractContext.erc20Abi,
      calls: [
        {
          reference: 'allowance',
          methodName: 'allowance',
          methodParameters: [
            ethereumAddress,
            UniswapContractContextV2.routerAddress,
          ],
        },
        {
          reference: 'balanceOf',
          methodName: 'balanceOf',
          methodParameters: [ethereumAddress],
        },
      ],
    };

    const contractCallResults = await this._multicall.call(contractCallContext);
    const results = contractCallResults.results[contractCallContext.reference];

    return {
      allowance: BigNumber.from(
        results.callsReturnContext[ALLOWANCE].returnValues[0]
      ).toHexString(),
      balanceOf: BigNumber.from(
        results.callsReturnContext[BALANCEOF].returnValues[0]
      ).toHexString(),
    };
  }
}
