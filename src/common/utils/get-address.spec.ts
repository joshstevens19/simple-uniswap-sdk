import { ETH, isNativeEth } from '../tokens';
import { getAddress } from './get-address';

describe('getAddress', () => {
  it('should format eth address and remove the prefix', () => {
    expect(isNativeEth(getAddress(ETH.MAINNET().contractAddress))).toEqual(
      false
    );
  });

  it('should format eth address and keep the prefix', () => {
    expect(
      isNativeEth(getAddress(ETH.MAINNET().contractAddress, true))
    ).toEqual(true);
  });

  it('should turn addres to checksum', () => {
    expect(getAddress(ETH.MAINNET().contractAddress.toLowerCase())).toEqual(
      '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'
    );
  });
});
