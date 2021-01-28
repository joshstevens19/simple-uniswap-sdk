import BigNumber from 'bignumber.js';
import { BigNumber as EthersBigNumber } from 'ethers';
import { hexlify as EthersHexlify } from 'ethers/lib/utils';

/**
 * Convert to hex
 * @param value The value
 */
export function hexlify(value: number | Uint8Array | BigNumber): string {
  if (value instanceof BigNumber) {
    return EthersHexlify(EthersBigNumber.from(value.toFixed()));
  }

  return EthersHexlify(EthersBigNumber.from(value));
}
