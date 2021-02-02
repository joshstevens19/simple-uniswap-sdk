import BigNumber from 'bignumber.js';
import { parseEther } from './parse-ether';

describe('parseEther', () => {
  it('should parseEther correctly', () => {
    const result = parseEther(new BigNumber(1));
    expect(result.toFixed()).toEqual('1000000000000000000');
  });
});
