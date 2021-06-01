import BigNumber from 'bignumber.js';
import { ContractCallContext, Multicall } from 'ethereum-multicall';
import { BigNumber as EthersBigNumber, ethers } from 'ethers';
import { ContractContext } from '../../common/contract-context';
import { ErrorCodes } from '../../common/errors/error-codes';
import { UniswapError } from '../../common/errors/uniswap-error';
import { UniswapVersion } from '../../enums/uniswap-version';
import { EthersProvider } from '../../ethers-provider';
import { UniswapContractContextV2 } from '../../uniswap-contract-context/uniswap-contract-context-v2';
import { UniswapContractContextV3 } from '../../uniswap-contract-context/uniswap-contract-context-v3';
import { Token } from './models/token';
import { TokenWithAllowanceInfo } from './models/token-with-allowance-info';

export class TokensFactory {
  private _multicall = new Multicall({
    ethersProvider: this._ethersProvider.provider,
    tryAggregate: true,
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
          contractAddress: ethers.utils.getAddress(tokenContractAddresses[i]),
          abi: ContractContext.erc20Abi,
          calls: [
            {
              reference: 'symbol',
              methodName: 'symbol',
              methodParameters: [],
            },
            {
              reference: 'decimals',
              methodName: 'decimals',
              methodParameters: [],
            },
            {
              reference: 'name',
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

  /**
   * Get allowance and balance for many contracts
   * @param uniswapVersion The uniswap version
   * @param ethereumAddress The ethereum address
   * @param tokenContractAddresses The token contract addresses
   * @param format If you want it to format it for you to the correct decimal place
   */
  public async getAllowanceAndBalanceOfForContracts(
    uniswapVersion: UniswapVersion,
    ethereumAddress: string,
    tokenContractAddresses: string[],
    format = false
  ): Promise<TokenWithAllowanceInfo[]> {
    const ALLOWANCE = 0;
    const BALANCEOF = 1;
    const DECIMALS = 2;
    const SYMBOL = 3;
    const NAME = 4;

    const contractCallContexts: ContractCallContext[] = [];
    for (let i = 0; i < tokenContractAddresses.length; i++) {
      const contractCallContext: ContractCallContext = {
        reference: `allowance-and-balance-of-${i}`,
        contractAddress: ethers.utils.getAddress(tokenContractAddresses[i]),
        abi: ContractContext.erc20Abi,
        calls: [
          {
            reference: 'allowance',
            methodName: 'allowance',
            methodParameters: [
              ethereumAddress,
              uniswapVersion === UniswapVersion.v2
                ? UniswapContractContextV2.routerAddress
                : UniswapContractContextV3.routerAddress,
            ],
          },
          {
            reference: 'balanceOf',
            methodName: 'balanceOf',
            methodParameters: [ethereumAddress],
          },
          {
            reference: 'decimals',
            methodName: 'decimals',
            methodParameters: [],
          },
          {
            reference: 'symbol',
            methodName: 'symbol',
            methodParameters: [],
          },
          {
            reference: 'name',
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

    const results: TokenWithAllowanceInfo[] = [];

    for (const result in contractCallResults.results) {
      const resultInfo = contractCallResults.results[result];

      if (!format) {
        results.push({
          allowanceAndBalanceOf: {
            allowance: EthersBigNumber.from(
              resultInfo.callsReturnContext[ALLOWANCE].returnValues[0]
            ).toHexString(),
            balanceOf: EthersBigNumber.from(
              resultInfo.callsReturnContext[BALANCEOF].returnValues[0]
            ).toHexString(),
          },
          token: {
            chainId: this._ethersProvider.network().chainId,
            contractAddress:
              resultInfo.originalContractCallContext.contractAddress,
            symbol: resultInfo.callsReturnContext[SYMBOL].returnValues[0],
            decimals: resultInfo.callsReturnContext[DECIMALS].returnValues[0],
            name: resultInfo.callsReturnContext[NAME].returnValues[0],
          },
        });
      } else {
        results.push({
          allowanceAndBalanceOf: {
            allowance: new BigNumber(
              EthersBigNumber.from(
                resultInfo.callsReturnContext[ALLOWANCE].returnValues[0]
              ).toHexString()
            )
              .shiftedBy(
                resultInfo.callsReturnContext[DECIMALS].returnValues[0] * -1
              )
              .toFixed(),
            balanceOf: new BigNumber(
              EthersBigNumber.from(
                resultInfo.callsReturnContext[BALANCEOF].returnValues[0]
              ).toHexString()
            )
              .shiftedBy(
                resultInfo.callsReturnContext[DECIMALS].returnValues[0] * -1
              )
              .toFixed(),
          },
          token: {
            chainId: this._ethersProvider.network().chainId,
            contractAddress:
              resultInfo.originalContractCallContext.contractAddress,
            symbol: resultInfo.callsReturnContext[SYMBOL].returnValues[0],
            decimals: resultInfo.callsReturnContext[DECIMALS].returnValues[0],
            name: resultInfo.callsReturnContext[NAME].returnValues[0],
          },
        });
      }
    }

    return results;
  }
}
