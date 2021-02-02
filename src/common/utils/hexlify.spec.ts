import BigNumber from 'bignumber.js';
import { hexlify } from './hexlify';

describe('hexlify', () => {
  it('should hexlify correctly', () => {
    const result = hexlify(new BigNumber(2));
    expect(result).toEqual('0x02');
  });

  it('should hexlify correctly', () => {
    const result = hexlify(new BigNumber(2342312));
    expect(result).toEqual('0x23bda8');
  });
});
