import { BigNumber, BigNumberish, BytesLike as Arrayish } from 'ethers';
import { ContractContext as QuoterContractContext } from '../../../ABI/types/uniswap-quoter-v3';
import { EthersProvider } from '../../../ethers-provider';
import { UniswapContractContextV3 } from '../../../uniswap-contract-context/uniswap-contract-context-v3';

export class UniswapContractQuoterV3 {
  private _uniswapQuoterContract =
    this._ethersProvider.getContract<QuoterContractContext>(
      JSON.stringify(UniswapContractContextV3.quoterAbi),
      this._quoterAddress
    );

  constructor(
    private _ethersProvider: EthersProvider,
    private _quoterAddress: string = UniswapContractContextV3.quoterAddress
  ) {}

  public async WETH9(): Promise<string> {
    return await this._uniswapQuoterContract.WETH9();
  }

  public async factory(): Promise<string> {
    return await this._uniswapQuoterContract.factory();
  }

  public async quoteExactInput(
    path: Arrayish,
    amountIn: BigNumberish
  ): Promise<BigNumber> {
    return await this._uniswapQuoterContract.callStatic.quoteExactInput(
      path,
      amountIn
    );
  }
}
