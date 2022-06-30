import { isSameAddress } from './is-same-address';

describe('isSameAddress', () => {
  it('should return true if they are all valid ethereum addresses', () => {
    expect(isSameAddress('0x45Cd08334aeedd8a06265B2Ae302E3597d8fAA28', '0x45cd08334aeedd8a06265b2ae302e3597d8faa28')).toEqual(
      true
    );
  });

  it('should return false when one of them is a invalid address', () => {
    expect(isSameAddress('0xC1912fEE45d61C87Cc5EA59DaE31190FFFFf232d', '0xaaaaa')).toEqual(
      false
    );
  });

  it('should return false when both of them are invalid address', () => {
    expect(isSameAddress('0x0', '0x1')).toEqual(false);
  });
});
