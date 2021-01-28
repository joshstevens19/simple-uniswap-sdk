import { BigNumberish } from 'ethers';
import { ContractContext as RouterContractContext } from '../../ABI/types/uniswap-router';
import { ContractContext } from '../../common/contract-context';
import { EthersProvider } from '../../ethers-provider';

export class UniswapRouterFactory {
  private _uniswapRouterContract = this._ethersProvider.getContract<RouterContractContext>(
    JSON.stringify(ContractContext.routerAbi),
    ContractContext.routerAddress
  );

  constructor(private _ethersProvider: EthersProvider) {}

  public swapExactETHForTokens(
    amountOutMin: BigNumberish,
    path: string[],
    to: string,
    deadline: BigNumberish
  ): string {
    return this._uniswapRouterContract.interface.encodeFunctionData(
      'swapExactETHForTokens',
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
      'swapETHForExactTokens',
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
      'swapExactETHForTokensSupportingFeeOnTransferTokens',
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
      'swapExactTokensForETH',
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
      'swapTokensForExactETH',
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
      'swapExactTokensForETHSupportingFeeOnTransferTokens',
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
      'swapExactTokensForTokens',
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
      'swapTokensForExactTokens',
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
      'swapExactTokensForTokensSupportingFeeOnTransferTokens',
      [amountIn, amountOutMin, path, to, deadline]
    );
  }
}
