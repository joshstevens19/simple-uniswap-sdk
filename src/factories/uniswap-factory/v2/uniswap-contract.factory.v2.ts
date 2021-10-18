import { BigNumberish } from 'ethers';
import { ContractContext as FactoryContractContext } from '../../../ABI/types/uniswap-factory-v2';
import { EthersProvider } from '../../../ethers-provider';
import { UniswapContractContextV2 } from '../../../uniswap-contract-context/uniswap-contract-context-v2';

export class UniswapContractFactoryV2 {
  private _uniswapFactoryContract =
    this._ethersProvider.getContract<FactoryContractContext>(
      JSON.stringify(UniswapContractContextV2.factoryAbi),
      this._factoryAddress
    );

  constructor(
    private _ethersProvider: EthersProvider,
    private _factoryAddress: string = UniswapContractContextV2.factoryAddress
  ) {}

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

  public async feeTo(): Promise<string> {
    return await this._uniswapFactoryContract.feeTo();
  }

  public async feeToSetter(): Promise<string> {
    return await this._uniswapFactoryContract.feeToSetter();
  }

  public async setFeeTo(_feeTo: string): Promise<string> {
    return this._uniswapFactoryContract.interface.encodeFunctionData(
      'setFeeTo',
      [_feeTo]
    );
  }

  public async setFeeToSetter(_feeToSetter: string): Promise<string> {
    return this._uniswapFactoryContract.interface.encodeFunctionData(
      'setFeeToSetter',
      [_feeToSetter]
    );
  }
}
