import { ETH } from '../tokens';
import { isAddress } from './is-address';

describe('isAddress', () => {
  it('should return true if its a valid ethereum address type', () => {
    expect(isAddress('0x45Cd08334aeedd8a06265B2Ae302E3597d8fAA28')).toEqual(
      true
    );
  });

  it('should return true if its a valid ethereum token', () => {
    expect(isAddress(ETH.MAINNET().contractAddress)).toEqual(true);
  });

  it('should return true if its a valid contract address type', () => {
    expect(isAddress('0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984')).toEqual(
      true
    );
  });

  it('should return false when its a invalid address', () => {
    expect(isAddress('0xC1912fEE45d61C87Cc5EA59DaE31190FFFFf232d')).toEqual(
      false
    );
  });

  it('should return false when its a invalid address', () => {
    expect(isAddress('0x0')).toEqual(false);
  });
});
