import { formatEther } from './format-ether';

describe('formatEther', () => {
  it('should formatEther correctly', () => {
    const result = formatEther('1000000000');
    expect(result.toFixed()).toEqual('0.000000001');
  });
});
