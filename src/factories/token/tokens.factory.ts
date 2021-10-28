import BigNumber from 'bignumber.js';
import { ContractCallContext } from 'ethereum-multicall';
import { BigNumber as EthersBigNumber } from 'ethers';
import { ContractContext } from '../../common/contract-context';
import { ErrorCodes } from '../../common/errors/error-codes';
import { UniswapError } from '../../common/errors/uniswap-error';
import { ETH, isNativeEth } from '../../common/tokens/eth';
import { isTokenOverrideInfo } from '../../common/tokens/overrides';
import { getAddress } from '../../common/utils/get-address';
import { CustomMulticall } from '../../custom-multicall';
import { UniswapVersion } from '../../enums/uniswap-version';
import { EthersProvider } from '../../ethers-provider';
import { uniswapContracts } from '../../uniswap-contract-context/get-uniswap-contracts';
import { CloneUniswapContractDetails } from '../pair/models/clone-uniswap-contract-details';
import { CustomNetwork } from '../pair/models/custom-network';
import { Token } from './models/token';
import { TokenWithAllowanceInfo } from './models/token-with-allowance-info';

export class TokensFactory {
  private _multicall = new CustomMulticall(
    this._ethersProvider.provider,
    this._customNetwork?.multicallContractAddress
  );

  constructor(
    private _ethersProvider: EthersProvider,
    private _customNetwork?: CustomNetwork | undefined,
    private _cloneUniswapContractDetails?:
      | CloneUniswapContractDetails
      | undefined
  ) {}

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
          const overridenToken = isTokenOverrideInfo(tokenContractAddresses[i]);
          if (overridenToken) {
            tokens.push(overridenToken);
            continue;
          }

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
          tokens.push(
            ETH.info(
              this._ethersProvider.network().chainId,
              this._customNetwork?.nativeWrappedTokenInfo
            )
          );
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
        const token = ETH.info(
          this._ethersProvider.network().chainId,
          this._customNetwork?.nativeWrappedTokenInfo
        );

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
            token: ETH.info(
              this._ethersProvider.network().chainId,
              this._customNetwork?.nativeWrappedTokenInfo
            ),
          });
        }
      }
    }

    const contractCallResults = await this._multicall.call(
      contractCallContexts
    );

    for (const result in contractCallResults.results) {
      if (result.includes(`_${UniswapVersion.v2}`)) {
        const overridenTokenInfo =
          contractCallResults.results[result].originalContractCallContext
            .context?.overridenToken;

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
            token:
              overridenTokenInfo !== undefined
                ? overridenTokenInfo
                : {
                    chainId: this._ethersProvider.network().chainId,
                    contractAddress:
                      resultInfoV3.originalContractCallContext.contractAddress,
                    symbol:
                      resultInfoV3.callsReturnContext[SYMBOL].returnValues[0],
                    decimals:
                      resultInfoV3.callsReturnContext[DECIMALS].returnValues[0],
                    name: resultInfoV3.callsReturnContext[NAME].returnValues[0],
                  },
          });
        } else {
          const decimals =
            overridenTokenInfo !== undefined
              ? overridenTokenInfo.decimals
              : resultInfoV2.callsReturnContext[DECIMALS].returnValues[0];

          results.push({
            allowanceAndBalanceOf: {
              allowanceV2: new BigNumber(
                EthersBigNumber.from(
                  resultInfoV2.callsReturnContext[ALLOWANCE].returnValues[0]
                ).toHexString()
              )
                .shiftedBy(decimals * -1)
                .toFixed(),
              allowanceV3: new BigNumber(
                EthersBigNumber.from(
                  resultInfoV3.callsReturnContext[ALLOWANCE].returnValues[0]
                ).toHexString()
              )
                .shiftedBy(decimals * -1)
                .toFixed(),
              balanceOf: new BigNumber(
                EthersBigNumber.from(
                  resultInfoV3.callsReturnContext[BALANCEOF].returnValues[0]
                ).toHexString()
              )
                .shiftedBy(decimals * -1)
                .toFixed(),
            },
            token:
              overridenTokenInfo !== undefined
                ? overridenTokenInfo
                : {
                    chainId: this._ethersProvider.network().chainId,
                    contractAddress:
                      resultInfoV3.originalContractCallContext.contractAddress,
                    symbol:
                      resultInfoV3.callsReturnContext[SYMBOL].returnValues[0],
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
    const defaultCallContext: ContractCallContext = {
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
              ? uniswapContracts.v2.getRouterAddress(
                  this._cloneUniswapContractDetails
                )
              : uniswapContracts.v3.getRouterAddress(
                  this._cloneUniswapContractDetails
                ),
          ],
        },
        {
          reference: 'balanceOf',
          methodName: 'balanceOf',
          methodParameters: [ethereumAddress],
        },
      ],
    };

    const overridenToken = isTokenOverrideInfo(tokenContractAddress);
    if (overridenToken) {
      defaultCallContext.context = { overridenToken };
    } else {
      defaultCallContext.calls.push(
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
        }
      );
    }

    return defaultCallContext;
  }
}
