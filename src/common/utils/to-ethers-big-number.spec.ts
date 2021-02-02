import BigNumber from 'bignumber.js';
import { toEthersBigNumber } from './to-ethers-big-number';

describe('toEthersBigNumber', () => {
  it('should toEthersBigNumber correctly', () => {
    const result = toEthersBigNumber(new BigNumber(1));
    expect(result._isBigNumber).toEqual(true);
  });
});
