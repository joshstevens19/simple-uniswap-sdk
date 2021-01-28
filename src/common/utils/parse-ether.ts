import BigNumber from 'bignumber.js';
import { parseEther as EthersParseEther } from 'ethers/lib/utils';

/**
 * Convert a string value to wei
 * @param value The value
 */
export function parseEther(value: BigNumber): BigNumber {
  return new BigNumber(
    EthersParseEther(new BigNumber(value).toFixed()).toHexString()
  );
}
