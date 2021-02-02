import { ContractCallContext, Multicall } from 'ethereum-multicall';
import { ContractContext } from '../../common/contract-context';
import { ErrorCodes } from '../../common/errors/error-codes';
import { UniswapError } from '../../common/errors/uniswap-error';
import { EthersProvider } from '../../ethers-provider';
import { Token } from './models/token';

export class TokensFactory {
  private _multicall = new Multicall({
    ethersProvider: this._ethersProvider.provider,
  });

  constructor(private _ethersProvider: EthersProvider) {}

  /**
   * Get the tokens details
   */
  public async getTokens(tokenContractAddresses: string[]): Promise<Token[]> {
    try {
      const SYMBOL = 0;
      const DECIMALS = 1;
      const NAME = 2;

      const contractCallContexts: ContractCallContext[] = [];
      for (let i = 0; i < tokenContractAddresses.length; i++) {
        const contractCallContext: ContractCallContext = {
          reference: `token${i}`,
          contractAddress: tokenContractAddresses[i],
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

        contractCallContexts.push(contractCallContext);
      }

      const contractCallResults = await this._multicall.call(
        contractCallContexts
      );

      const tokens: Token[] = [];

      for (const result in contractCallResults.results) {
        const tokenInfo = contractCallResults.results[result];

        tokens.push({
          chainId: this._ethersProvider.network().chainId,
          contractAddress:
            tokenInfo.originalContractCallContext.contractAddress,
          symbol: tokenInfo.callsReturnContext[SYMBOL].returnValues[0],
          decimals: tokenInfo.callsReturnContext[DECIMALS].returnValues[0],
          name: tokenInfo.callsReturnContext[NAME].returnValues[0],
        });
      }

      return tokens;
    } catch (error) {
      throw new UniswapError(
        'invalid from or to contract tokens',
        ErrorCodes.invalidFromOrToContractToken
      );
    }
  }
}
