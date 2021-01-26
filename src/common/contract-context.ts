import { JsonFragment } from '@ethersproject/abi';

export class ContractContext {
  /**
   * The uniswap router address MAINNET
   */
  public static routerAddress = '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D';

  /**
   * Uniswap v2 router
   */
  public static routerAbi: JsonFragment[] = require('../ABI/uniswap-router-v2.json');

  /**
   * ERC20 abi
   */
  public static erc20Abi: JsonFragment[] = require('../ABI/erc-20-abi.json');
}
