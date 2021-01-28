import { BigNumberish } from 'ethers';
import { ContractContext as FactoryContractContext } from '../../ABI/types/uniswap-factory';
import { ContractContext } from '../../common/contract-context';
import { EthersProvider } from '../../ethers-provider';

export class UniswapContractFactory {
  private _uniswapFactoryContract = this._ethersProvider.getContract<FactoryContractContext>(
    JSON.stringify(ContractContext.factoryAbi),
    ContractContext.factoryAddress
  );

  constructor(private _ethersProvider: EthersProvider) {}

  public async allPairs(parameter0: BigNumberish): Promise<string> {
    return await this._uniswapFactoryContract.allPairs(parameter0);
  }

  public async allPairsLength(): Promise<string> {
    return (await this._uniswapFactoryContract.allPairsLength()).toHexString();
  }

  public createPair(tokenA: string, tokenB: string): string {
    return this._uniswapFactoryContract.interface.encodeFunctionData(
      'createPair',
      [tokenA, tokenB]
    );
  }

  public async getPair(token0: string, token1: string): Promise<string> {
    return await this._uniswapFactoryContract.getPair(token0, token1);
  }
}
