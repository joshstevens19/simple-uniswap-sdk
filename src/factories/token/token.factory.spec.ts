import { ChainId } from '../..';
import { UniswapVersion } from '../../enums/uniswap-version';
import { EthersProvider } from '../../ethers-provider';
import { MockEthereumAddress } from '../../mocks/ethereum-address.mock';
import { MOCKFUN } from '../../mocks/fun-token.mock';
import { UniswapContractContextV2 } from '../../uniswap-contract-context/uniswap-contract-context-v2';
import { UniswapContractContextV3 } from '../../uniswap-contract-context/uniswap-contract-context-v3';
import { TokenFactory } from './token.factory';

describe('TokenFactory', () => {
  const ethersProvider = new EthersProvider(ChainId.MAINNET);
  const token = MOCKFUN();

  const tokenFactory = new TokenFactory(token.contractAddress, ethersProvider);

  it('getToken', async () => {
    const result = await tokenFactory.getToken();
    expect(result).toEqual(token);
  });

  describe('allowance', () => {
    describe('v2', () => {
      it('allowance', async () => {
        const result = await tokenFactory.allowance(
          UniswapVersion.v2,
          MockEthereumAddress()
        );
        expect(result).not.toBeUndefined();
      });
    });

    describe('v3', () => {
      it('allowance', async () => {
        const result = await tokenFactory.allowance(
          UniswapVersion.v3,
          MockEthereumAddress()
        );
        expect(result).not.toBeUndefined();
      });
    });
  });

  describe('generateApproveAllowanceData', () => {
    describe('v2', () => {
      it('generateApproveAllowanceData', () => {
        const result = tokenFactory.generateApproveAllowanceData(
          UniswapContractContextV2.routerAddress,
          '0x05'
        );
        expect(result).toEqual(
          '0x095ea7b30000000000000000000000007a250d5630b4cf539739df2c5dacb4c659f2488d0000000000000000000000000000000000000000000000000000000000000005'
        );
      });
    });

    describe('v3', () => {
      it('generateApproveAllowanceData', () => {
        const result = tokenFactory.generateApproveAllowanceData(
          UniswapContractContextV3.routerAddress,
          '0x05'
        );
        expect(result).toEqual(
          '0x095ea7b3000000000000000000000000e592427a0aece92de3edee1f18e0157c058615640000000000000000000000000000000000000000000000000000000000000005'
        );
      });
    });
  });

  it('balanceOf', async () => {
    const result = await tokenFactory.balanceOf(MockEthereumAddress());
    expect(result).not.toBeUndefined();
  });

  it('totalSupply', async () => {
    const result = await tokenFactory.totalSupply();
    expect(result).toEqual('0x0f43f0ad89c30bb6');
  });

  describe('v2', () => {
    it('getAllowanceAndBalanceOf', async () => {
      const result = await tokenFactory.getAllowanceAndBalanceOf(
        UniswapVersion.v2,
        MockEthereumAddress()
      );
      expect(result).toEqual({
        allowance: '0x2386c18764e720',
        balanceOf: '0x1eae4a62f7',
      });
    });

    it('getAllowanceAndBalanceOf', async () => {
      const result = await tokenFactory.getAllowanceAndBalanceOf(
        UniswapVersion.v3,
        MockEthereumAddress()
      );
      expect(result).toEqual({
        allowance: '0x00',
        balanceOf: '0x1eae4a62f7',
      });
    });
  });
});
