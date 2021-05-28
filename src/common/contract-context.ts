import { JsonFragment } from '@ethersproject/abi';

export class ContractContext {
  /**
   * ERC20 abi
   */
  public static erc20Abi: JsonFragment[] = require('../ABI/erc-20-abi.json');
}
