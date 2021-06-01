import { JsonFragment } from '@ethersproject/abi';

export class UniswapContractContextV3 {
  /**
   * The uniswap router address
   */
  public static routerAddress = '0xE592427A0AEce92De3Edee1F18E0157C05861564';

  /**
   * The uniswap factory address
   */
  public static factoryAddress = '0x1F98431c8aD98523631AE4a59f267346ea31F984';

  /**
   * The uniswap quoter address
   */
  public static quoterAddress = '0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6';

  /**
   * Uniswap router
   */
  public static routerAbi: JsonFragment[] = require('../ABI/uniswap-router-v3.json');

  /**
   * Uniswap factory
   */
  public static factoryAbi: JsonFragment[] = require('../ABI/uniswap-factory-v3.json');

  /**
   * Uniswap quoter
   */
  public static quoterAbi: JsonFragment[] = require('../ABI/uniswap-quoter-v3.json');
}
