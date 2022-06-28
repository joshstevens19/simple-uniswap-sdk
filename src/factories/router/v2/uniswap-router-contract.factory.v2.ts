import { BigNumber, BigNumberish, BytesLike, Contract } from 'ethers';
import { JsonFragment } from '@ethersproject/abi';
import { EthersProvider } from '../../../ethers-provider';
import { UniswapContractContextV2 } from '../../../uniswap-contract-context/uniswap-contract-context-v2';
import { DEFAULT_ROUTER_METHOD, IRouterMethods } from '../models/route-methods';

export class UniswapRouterContractFactoryV2 {
  private _uniswapRouterContract = this._ethersProvider.getContract<Contract>(
    JSON.stringify(this._routerAbi),
    this._routerAddress
  );

  private _uniswapRouterNames: IRouterMethods = {
    ...DEFAULT_ROUTER_METHOD,
    ...this._routerMethods,
  };

  constructor(
    private _ethersProvider: EthersProvider,
    private _routerAddress: string = UniswapContractContextV2.routerAddress,
    private _routerAbi: JsonFragment[] = UniswapContractContextV2.routerAbi,
    private _routerMethods: Partial<IRouterMethods> = DEFAULT_ROUTER_METHOD
  ) {}

  public addLiquidity(
    tokenA: string,
    tokenB: string,
    amountADesired: BigNumberish,
    amountBDesired: BigNumberish,
    amountAMin: BigNumberish,
    amountBMin: BigNumberish,
    to: string,
    deadline: BigNumberish
  ): string {
    return this._uniswapRouterContract.interface.encodeFunctionData(
      this._uniswapRouterNames['addLiquidity'],
      [
        tokenA,
        tokenB,
        amountADesired,
        amountBDesired,
        amountAMin,
        amountBMin,
        to,
        deadline,
      ]
    );
  }

  public addLiquidityETH(
    token: string,
    amountTokenDesired: BigNumberish,
    amountTokenMin: BigNumberish,
    amountETHMin: BigNumberish,
    to: string,
    deadline: BigNumberish
  ): string {
    return this._uniswapRouterContract.interface.encodeFunctionData(
      this._uniswapRouterNames['addLiquidityETH'],
      [token, amountTokenDesired, amountTokenMin, amountETHMin, to, deadline]
    );
  }

  public async factory(): Promise<string> {
    return await this._uniswapRouterContract.factory();
  }

  public async getAmountsOut(
    amountIn: BigNumberish,
    path: string[]
  ): Promise<string[]> {
    const amounts = await this._uniswapRouterContract.getAmountsOut(
      amountIn,
      path
    );
    return amounts.map((c: BigNumber) => c.toHexString());
  }

  public async quote(
    amountA: BigNumberish,
    reserveA: BigNumberish,
    reserveB: BigNumberish
  ): Promise<string> {
    return (
      await this._uniswapRouterContract.quote(amountA, reserveA, reserveB)
    ).toHexString();
  }

  public removeLiquidity(
    tokenA: string,
    tokenB: string,
    liquidity: BigNumberish,
    amountAMin: BigNumberish,
    amountBMin: BigNumberish,
    to: string,
    deadline: BigNumberish
  ): string {
    return this._uniswapRouterContract.interface.encodeFunctionData(
      this._uniswapRouterNames['removeLiquidity'],
      [tokenA, tokenB, liquidity, amountAMin, amountBMin, to, deadline]
    );
  }

  public removeLiquidityETH(
    token: string,
    liquidity: BigNumberish,
    amountTokenMin: BigNumberish,
    amountETHMin: BigNumberish,
    to: string,
    deadline: BigNumberish
  ): string {
    return this._uniswapRouterContract.interface.encodeFunctionData(
      this._uniswapRouterNames['removeLiquidity'],
      [token, liquidity, amountTokenMin, amountETHMin, to, deadline]
    );
  }

  public removeLiquidityETHSupportingFeeOnTransferTokens(
    token: string,
    liquidity: BigNumberish,
    amountTokenMin: BigNumberish,
    amountETHMin: BigNumberish,
    to: string,
    deadline: BigNumberish
  ): string {
    return this._uniswapRouterContract.interface.encodeFunctionData(
      this._uniswapRouterNames[
        'removeLiquidityETHSupportingFeeOnTransferTokens'
      ],
      [token, liquidity, amountTokenMin, amountETHMin, to, deadline]
    );
  }

  public removeLiquidityETHWithPermit(
    token: string,
    liquidity: BigNumberish,
    amountTokenMin: BigNumberish,
    amountETHMin: BigNumberish,
    to: string,
    deadline: BigNumberish,
    approveMax: boolean,
    v: BigNumberish,
    r: BytesLike,
    s: BytesLike
  ): string {
    return this._uniswapRouterContract.interface.encodeFunctionData(
      this._uniswapRouterNames['removeLiquidityETHWithPermit'],
      [
        token,
        liquidity,
        amountTokenMin,
        amountETHMin,
        to,
        deadline,
        approveMax,
        v,
        r,
        s,
      ]
    );
  }

  public removeLiquidityETHWithPermitSupportingFeeOnTransferTokens(
    token: string,
    liquidity: BigNumberish,
    amountTokenMin: BigNumberish,
    amountETHMin: BigNumberish,
    to: string,
    deadline: BigNumberish,
    approveMax: boolean,
    v: BigNumberish,
    r: BytesLike,
    s: BytesLike
  ): string {
    return this._uniswapRouterContract.interface.encodeFunctionData(
      this._uniswapRouterNames[
        'removeLiquidityETHWithPermitSupportingFeeOnTransferTokens'
      ],
      [
        token,
        liquidity,
        amountTokenMin,
        amountETHMin,
        to,
        deadline,
        approveMax,
        v,
        r,
        s,
      ]
    );
  }

  public removeLiquidityWithPermit(
    tokenA: string,
    tokenB: string,
    liquidity: BigNumberish,
    amountAMin: BigNumberish,
    amountBMin: BigNumberish,
    to: string,
    deadline: BigNumberish,
    approveMax: boolean,
    v: BigNumberish,
    r: BytesLike,
    s: BytesLike
  ): string {
    return this._uniswapRouterContract.interface.encodeFunctionData(
      this._uniswapRouterNames['removeLiquidityWithPermit'],
      [
        tokenA,
        tokenB,
        liquidity,
        amountAMin,
        amountBMin,
        to,
        deadline,
        approveMax,
        v,
        r,
        s,
      ]
    );
  }

  public swapExactETHForTokens(
    amountOutMin: BigNumberish,
    path: string[],
    to: string,
    deadline: BigNumberish
  ): string {
    return this._uniswapRouterContract.interface.encodeFunctionData(
      this._uniswapRouterNames['swapExactETHForTokens'],
      [amountOutMin, path, to, deadline]
    );
  }

  public swapETHForExactTokens(
    amountOut: BigNumberish,
    path: string[],
    to: string,
    deadline: BigNumberish
  ): string {
    return this._uniswapRouterContract.interface.encodeFunctionData(
      this._uniswapRouterNames['swapETHForExactTokens'],
      [amountOut, path, to, deadline]
    );
  }

  public swapExactETHForTokensSupportingFeeOnTransferTokens(
    amountIn: BigNumberish,
    amountOutMin: BigNumberish,
    path: string[],
    to: string,
    deadline: BigNumberish
  ): string {
    return this._uniswapRouterContract.interface.encodeFunctionData(
      this._uniswapRouterNames[
        'swapExactETHForTokensSupportingFeeOnTransferTokens'
      ],
      [amountIn, amountOutMin, path, to, deadline]
    );
  }

  public swapExactTokensForETH(
    amountIn: BigNumberish,
    amountOutMin: BigNumberish,
    path: string[],
    to: string,
    deadline: BigNumberish
  ): string {
    return this._uniswapRouterContract.interface.encodeFunctionData(
      this._uniswapRouterNames['swapExactTokensForETH'],
      [amountIn, amountOutMin, path, to, deadline]
    );
  }

  public swapTokensForExactETH(
    amountOut: BigNumberish,
    amountInMax: BigNumberish,
    path: string[],
    to: string,
    deadline: BigNumberish
  ): string {
    return this._uniswapRouterContract.interface.encodeFunctionData(
      this._uniswapRouterNames['swapTokensForExactETH'],
      [amountOut, amountInMax, path, to, deadline]
    );
  }

  public swapExactTokensForETHSupportingFeeOnTransferTokens(
    amountIn: BigNumberish,
    amountOutMin: BigNumberish,
    path: string[],
    to: string,
    deadline: BigNumberish
  ): string {
    return this._uniswapRouterContract.interface.encodeFunctionData(
      this._uniswapRouterNames[
        'swapExactTokensForETHSupportingFeeOnTransferTokens'
      ],
      [amountIn, amountOutMin, path, to, deadline]
    );
  }

  public swapExactTokensForTokens(
    amountIn: BigNumberish,
    amountOutMin: BigNumberish,
    path: string[],
    to: string,
    deadline: BigNumberish
  ): string {
    return this._uniswapRouterContract.interface.encodeFunctionData(
      this._uniswapRouterNames['swapExactTokensForTokens'],
      [amountIn, amountOutMin, path, to, deadline]
    );
  }

  public swapTokensForExactTokens(
    amountOut: BigNumberish,
    amountInMax: BigNumberish,
    path: string[],
    to: string,
    deadline: BigNumberish
  ): string {
    return this._uniswapRouterContract.interface.encodeFunctionData(
      this._uniswapRouterNames['swapTokensForExactTokens'],
      [amountOut, amountInMax, path, to, deadline]
    );
  }

  public swapExactTokensForTokensSupportingFeeOnTransferTokens(
    amountIn: BigNumberish,
    amountOutMin: BigNumberish,
    path: string[],
    to: string,
    deadline: BigNumberish
  ): string {
    return this._uniswapRouterContract.interface.encodeFunctionData(
      this._uniswapRouterNames[
        'swapExactTokensForTokensSupportingFeeOnTransferTokens'
      ],
      [amountIn, amountOutMin, path, to, deadline]
    );
  }
}
