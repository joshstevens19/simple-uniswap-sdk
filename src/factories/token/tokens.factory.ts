import BigNumber from 'bignumber.js';
import { ContractCallContext, Multicall } from 'ethereum-multicall';
import { BigNumber as EthersBigNumber } from 'ethers';
import { ContractContext } from '../../common/contract-context';
import { ErrorCodes } from '../../common/errors/error-codes';
import { UniswapError } from '../../common/errors/uniswap-error';
import { ETH, isNativeEth } from '../../common/tokens/eth';
import { getAddress } from '../../common/utils/get-address';
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
      const tokens: Token[] = [];

      const SYMBOL = 0;
      const DECIMALS = 1;
      const NAME = 2;

      const contractCallContexts: ContractCallContext[] = [];
      for (let i = 0; i < tokenContractAddresses.length; i++) {
        if (!isNativeEth(tokenContractAddresses[i])) {
          const contractCallContext: ContractCallContext = {
            reference: `token${i}`,
            contractAddress: getAddress(tokenContractAddresses[i]),
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
        } else {
          tokens.push(ETH.info(this._ethersProvider.network().chainId));
        }
      }

      const contractCallResults = await this._multicall.call(
        contractCallContexts
      );

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
   * @param ethereumAddress The ethereum address
   * @param tokenContractAddresses The token contract addresses
   * @param format If you want it to format it for you to the correct decimal place
   */
  public async getAllowanceAndBalanceOfForContracts(
    ethereumAddress: string,
    tokenContractAddresses: string[],
    format = false
  ): Promise<TokenWithAllowanceInfo[]> {
    const results: TokenWithAllowanceInfo[] = [];

    const ALLOWANCE = 0;
    const BALANCEOF = 1;
    const DECIMALS = 2;
    const SYMBOL = 3;
    const NAME = 4;

    const contractCallContexts: ContractCallContext[] = [];
    for (let i = 0; i < tokenContractAddresses.length; i++) {
      if (!isNativeEth(tokenContractAddresses[i])) {
        contractCallContexts.push(
          this.buildAllowanceAndBalanceContractCallContext(
            ethereumAddress,
            tokenContractAddresses[i],
            UniswapVersion.v2
          )
        );

        contractCallContexts.push(
          this.buildAllowanceAndBalanceContractCallContext(
            ethereumAddress,
            tokenContractAddresses[i],
            UniswapVersion.v3
          )
        );
      } else {
        const token = ETH.info(this._ethersProvider.network().chainId);
        if (format) {
          results.push({
            allowanceAndBalanceOf: {
              allowanceV2: new BigNumber(
                '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
              )
                .shiftedBy(18 * -1)
                .toFixed(),
              allowanceV3: new BigNumber(
                '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
              )
                .shiftedBy(18 * -1)
                .toFixed(),
              balanceOf: new BigNumber(
                await this._ethersProvider.balanceOf(ethereumAddress)
              )
                .shiftedBy(18 * -1)
                .toFixed(),
            },
            token,
          });
        } else {
          results.push({
            allowanceAndBalanceOf: {
              allowanceV2:
                '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
              allowanceV3:
                '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
              balanceOf: await this._ethersProvider.balanceOf(ethereumAddress),
            },
            token: ETH.info(this._ethersProvider.network().chainId),
          });
        }
      }
    }

    const contractCallResults = await this._multicall.call(
      contractCallContexts
    );

    for (const result in contractCallResults.results) {
      if (result.includes(`_${UniswapVersion.v2}`)) {
        const resultInfoV2 = contractCallResults.results[result];
        const resultInfoV3 =
          contractCallResults.results[
            result.replace(`_${UniswapVersion.v2}`, `_${UniswapVersion.v3}`)
          ];

        if (!format) {
          results.push({
            allowanceAndBalanceOf: {
              allowanceV2: EthersBigNumber.from(
                resultInfoV2.callsReturnContext[ALLOWANCE].returnValues[0]
              ).toHexString(),
              allowanceV3: EthersBigNumber.from(
                resultInfoV3.callsReturnContext[ALLOWANCE].returnValues[0]
              ).toHexString(),
              balanceOf: EthersBigNumber.from(
                resultInfoV3.callsReturnContext[BALANCEOF].returnValues[0]
              ).toHexString(),
            },
            token: {
              chainId: this._ethersProvider.network().chainId,
              contractAddress:
                resultInfoV3.originalContractCallContext.contractAddress,
              symbol: resultInfoV3.callsReturnContext[SYMBOL].returnValues[0],
              decimals:
                resultInfoV3.callsReturnContext[DECIMALS].returnValues[0],
              name: resultInfoV3.callsReturnContext[NAME].returnValues[0],
            },
          });
        } else {
          results.push({
            allowanceAndBalanceOf: {
              allowanceV2: new BigNumber(
                EthersBigNumber.from(
                  resultInfoV2.callsReturnContext[ALLOWANCE].returnValues[0]
                ).toHexString()
              )
                .shiftedBy(
                  resultInfoV2.callsReturnContext[DECIMALS].returnValues[0] * -1
                )
                .toFixed(),
              allowanceV3: new BigNumber(
                EthersBigNumber.from(
                  resultInfoV3.callsReturnContext[ALLOWANCE].returnValues[0]
                ).toHexString()
              )
                .shiftedBy(
                  resultInfoV3.callsReturnContext[DECIMALS].returnValues[0] * -1
                )
                .toFixed(),
              balanceOf: new BigNumber(
                EthersBigNumber.from(
                  resultInfoV3.callsReturnContext[BALANCEOF].returnValues[0]
                ).toHexString()
              )
                .shiftedBy(
                  resultInfoV3.callsReturnContext[DECIMALS].returnValues[0] * -1
                )
                .toFixed(),
            },
            token: {
              chainId: this._ethersProvider.network().chainId,
              contractAddress:
                resultInfoV3.originalContractCallContext.contractAddress,
              symbol: resultInfoV3.callsReturnContext[SYMBOL].returnValues[0],
              decimals:
                resultInfoV3.callsReturnContext[DECIMALS].returnValues[0],
              name: resultInfoV3.callsReturnContext[NAME].returnValues[0],
            },
          });
        }
      }
    }

    return results;
  }

  private buildAllowanceAndBalanceContractCallContext(
    ethereumAddress: string,
    tokenContractAddress: string,
    uniswapVersion: UniswapVersion
  ): ContractCallContext {
    return {
      reference: `${tokenContractAddress}_${uniswapVersion}`,
      contractAddress: getAddress(tokenContractAddress),
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
  }
}
