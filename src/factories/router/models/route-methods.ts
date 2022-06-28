
export type IRouterMethodName =
| 'WETH'
| 'addLiquidity'
| 'addLiquidityETH'
| 'factory'
| 'getAmountIn'
| 'getAmountOut'
| 'getAmountsIn'
| 'getAmountsOut'
| 'quote'
| 'removeLiquidity'
| 'removeLiquidityETH'
| 'removeLiquidityETHSupportingFeeOnTransferTokens'
| 'removeLiquidityETHWithPermit'
| 'removeLiquidityETHWithPermitSupportingFeeOnTransferTokens'
| 'removeLiquidityWithPermit'
| 'swapETHForExactTokens'
| 'swapExactETHForTokens'
| 'swapExactETHForTokensSupportingFeeOnTransferTokens'
| 'swapExactTokensForETH'
| 'swapExactTokensForETHSupportingFeeOnTransferTokens'
| 'swapExactTokensForTokens'
| 'swapExactTokensForTokensSupportingFeeOnTransferTokens'
| 'swapTokensForExactETH'
| 'swapTokensForExactTokens';

export type IRouterMethods = {
[key in IRouterMethodName]: string;
};

export const DEFAULT_ROUTER_METHOD: IRouterMethods = {
WETH: 'WETH',
addLiquidity: 'addLiquidity',
addLiquidityETH: 'addLiquidityETH',
factory: 'factory',
getAmountIn: 'getAmountIn',
getAmountOut: 'getAmountOut',
getAmountsIn: 'getAmountsIn',
getAmountsOut: 'getAmountsOut',
quote: 'quote',
removeLiquidity: 'removeLiquidity',
removeLiquidityETH: 'removeLiquidityETH',
removeLiquidityETHSupportingFeeOnTransferTokens:
  'removeLiquidityETHSupportingFeeOnTransferTokens',
removeLiquidityETHWithPermit: 'removeLiquidityETHWithPermit',
removeLiquidityETHWithPermitSupportingFeeOnTransferTokens:
  'removeLiquidityETHWithPermitSupportingFeeOnTransferTokens',
removeLiquidityWithPermit: 'removeLiquidityWithPermit',
swapETHForExactTokens: 'swapETHForExactTokens',
swapExactETHForTokens: 'swapExactETHForTokens',
swapExactETHForTokensSupportingFeeOnTransferTokens:
  'swapExactETHForTokensSupportingFeeOnTransferTokens',
swapExactTokensForETH: 'swapExactTokensForETH',
swapExactTokensForETHSupportingFeeOnTransferTokens:
  'swapExactTokensForETHSupportingFeeOnTransferTokens',
swapExactTokensForTokens: 'swapExactTokensForTokens',
swapExactTokensForTokensSupportingFeeOnTransferTokens:
  'swapExactTokensForTokensSupportingFeeOnTransferTokens',
swapTokensForExactETH: 'swapTokensForExactETH',
swapTokensForExactTokens: 'swapTokensForExactTokens',
};