import { getUnixTime } from './get-unix-time';

describe('getUnixTime', () => {
  it('should getUnixTime correctly', () => {
    const result = getUnixTime(new Date('2015-03-25'));
    expect(result).toEqual(1427241600);
  });
});
