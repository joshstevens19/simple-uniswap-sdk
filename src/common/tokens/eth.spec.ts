import { MOCKFUN } from '../../mocks/fun-token.mock';
import {
  appendEthToContractAddress,
  ETH,
  isNativeEth,
  removeEthFromContractAddress,
  turnTokenIntoEthForResponse,
} from './eth';
import { WETHContract } from './weth';

describe('eth', () => {
  it('should append eth prefix to contract address', () => {
    expect(
      appendEthToContractAddress(WETHContract.MAINNET().contractAddress)
    ).toEqual(ETH.MAINNET().contractAddress);
  });

  it('should remove eth prefix to contract address', () => {
    expect(removeEthFromContractAddress(ETH.MAINNET().contractAddress)).toEqual(
      WETHContract.MAINNET().contractAddress
    );
  });

  it('should mark eth as native if it has a _eth prefix', () => {
    expect(isNativeEth(ETH.MAINNET().contractAddress)).toEqual(true);
  });

  it('should not mark eth as native if it has a _eth prefix doesnt exist', () => {
    expect(isNativeEth(MOCKFUN().contractAddress)).toEqual(false);
  });

  it('should turn token into ethereum', () => {
    expect(turnTokenIntoEthForResponse(WETHContract.MAINNET())).toEqual({
      chainId: 1,
      contractAddress: 'NO_CONTRACT_ADDRESS',
      decimals: 18,
      name: 'Ethers',
      symbol: 'ETH',
    });
  });
});
