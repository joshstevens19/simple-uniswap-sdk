import { getCurrentUnixTime } from './get-current-unix-time';

describe('getCurrentUnixTime', () => {
  it('should getCurrentUnixTime correctly', () => {
    const result = getCurrentUnixTime();
    expect(typeof result).toEqual('number');
  });
});
