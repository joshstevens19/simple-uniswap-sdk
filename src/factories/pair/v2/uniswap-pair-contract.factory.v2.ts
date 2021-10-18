import { BigNumberish } from 'ethers';
import { ContractContext as PairContractContext } from '../../../ABI/types/uniswap-pair-v2';
import { EthersProvider } from '../../../ethers-provider';
import { UniswapContractContextV2 } from '../../../uniswap-contract-context/uniswap-contract-context-v2';

export class UniswapPairContractFactoryV2 {
  private _uniswapPairFactory =
    this._ethersProvider.getContract<PairContractContext>(
      JSON.stringify(UniswapContractContextV2.pairAbi),
      this._pairAddress
    );

  constructor(
    private _ethersProvider: EthersProvider,
    private _pairAddress: string = UniswapContractContextV2.pairAddress
  ) {}

  public async allPairs(parameter0: BigNumberish): Promise<string> {
    return await this._uniswapPairFactory.allPairs(parameter0);
  }

  public async allPairsLength(): Promise<string> {
    return (await this._uniswapPairFactory.allPairsLength()).toHexString();
  }

  public createPair(tokenA: string, tokenB: string): string {
    return this._uniswapPairFactory.interface.encodeFunctionData('createPair', [
      tokenA,
      tokenB,
    ]);
  }

  public async feeTo(): Promise<string> {
    return await this._uniswapPairFactory.feeTo();
  }

  public async feeToSetter(): Promise<string> {
    return await this._uniswapPairFactory.feeToSetter();
  }

  public async getPair(
    parameter0: string,
    parameter1: string
  ): Promise<string> {
    return await this._uniswapPairFactory.getPair(parameter0, parameter1);
  }

  public async setFeeTo(_feeTo: string): Promise<string> {
    return this._uniswapPairFactory.interface.encodeFunctionData('setFeeTo', [
      _feeTo,
    ]);
  }

  public async setFeeToSetter(_feeToSetter: string): Promise<string> {
    return this._uniswapPairFactory.interface.encodeFunctionData(
      'setFeeToSetter',
      [_feeToSetter]
    );
  }
}
