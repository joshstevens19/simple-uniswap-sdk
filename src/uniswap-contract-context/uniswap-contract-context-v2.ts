import { JsonFragment } from '@ethersproject/abi';

export class UniswapContractContextV2 {
  /**
   * The uniswap router address
   */
  public static routerAddress = '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D';

  /**
   * The uniswap factory address
   */
  public static factoryAddress = '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f';

  /**
   * The uniswap pair address
   */
  public static pairAddress = '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f';

  /**
   * Uniswap v2 router
   */
  public static routerAbi: JsonFragment[] = require('../ABI/uniswap-router-v2.json');

  /**
   * Uniswap v2 factory
   */
  public static factoryAbi: JsonFragment[] = require('../ABI/uniswap-factory-v2.json');

  /**
   * Uniswap v2 pair
   */
  public static pairAbi: JsonFragment[] = require('../ABI/uniswap-pair-v2.json');
}
