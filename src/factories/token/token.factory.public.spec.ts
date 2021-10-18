import { ChainId, ETH, TokenFactoryPublic } from '../..';
import { UniswapVersion } from '../../enums/uniswap-version';
import { MockEthereumAddress } from '../../mocks/ethereum-address.mock';
import { MOCKFUN } from '../../mocks/fun-token.mock';
import { UniswapContractContextV2 } from '../../uniswap-contract-context/uniswap-contract-context-v2';
import { UniswapContractContextV3 } from '../../uniswap-contract-context/uniswap-contract-context-v3';

describe('TokenFactoryPublic', () => {
  const token = MOCKFUN();

  const tokenFactory = new TokenFactoryPublic(token.contractAddress, {
    chainId: ChainId.MAINNET,
  });
  const tokenFactoryEth = new TokenFactoryPublic(
    ETH.MAINNET().contractAddress,
    {
      chainId: ChainId.MAINNET,
    }
  );

  describe('getToken', () => {
    describe('erc20', () => {
      it('getToken', async () => {
        const result = await tokenFactory.getToken();
        expect(result).toEqual(token);
      });
    });

    describe('eth', () => {
      it('getToken', async () => {
        const result = await tokenFactoryEth.getToken();
        expect(result).toEqual(ETH.MAINNET());
      });
    });
  });

  describe('allowance', () => {
    describe('erc20', () => {
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

    describe('eth', () => {
      describe('v2', () => {
        it('allowance', async () => {
          const result = await tokenFactoryEth.allowance(
            UniswapVersion.v2,
            MockEthereumAddress()
          );
          expect(result).toEqual(
            '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
          );
        });
      });

      describe('v3', () => {
        it('allowance', async () => {
          const result = await tokenFactoryEth.allowance(
            UniswapVersion.v3,
            MockEthereumAddress()
          );
          expect(result).toEqual(
            '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
          );
        });
      });
    });
  });

  describe('generateApproveAllowanceData', () => {
    describe('erc20', () => {
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

    describe('eth', () => {
      describe('v2', () => {
        it('generateApproveAllowanceData', () => {
          expect(() => {
            tokenFactoryEth.generateApproveAllowanceData(
              UniswapContractContextV2.routerAddress,
              '0x05'
            );
          }).toThrowError('ETH does not need any allowance data');
        });
      });

      describe('v3', () => {
        it('generateApproveAllowanceData', () => {
          expect(() => {
            tokenFactoryEth.generateApproveAllowanceData(
              UniswapContractContextV3.routerAddress,
              '0x05'
            );
          }).toThrowError('ETH does not need any allowance data');
        });
      });
    });
  });

  describe('balanceOf', () => {
    xdescribe('erc20', () => {
      it('balanceOf', async () => {
        const spy = spyOn(
          // @ts-ignore
          tokenFactory._erc20TokenContract,
          'balanceOf'
        ).and.callThrough();
        const result = await tokenFactory.balanceOf(MockEthereumAddress());
        expect(result).not.toBeUndefined();
        expect(spy).toHaveBeenCalledTimes(1);
      });
    });

    describe('eth', () => {
      it('balanceOf', async () => {
        const spy = spyOn(
          // @ts-ignore
          tokenFactoryEth._ethersProvider,
          'balanceOf'
        ).and.callThrough();
        const result = await tokenFactoryEth.balanceOf(MockEthereumAddress());
        expect(result).not.toBeUndefined();
        expect(spy).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('totalSupply', () => {
    describe('erc20', () => {
      it('totalSupply', async () => {
        const result = await tokenFactory.totalSupply();
        expect(result).toEqual('0x0f4229ebe353e7b6');
      });
    });

    describe('eth', () => {
      it('totalSupply', async () => {
        const result = await tokenFactoryEth.totalSupply();
        expect(result).not.toBeUndefined();
      });
    });
  });

  describe('getAllowanceAndBalanceOf', () => {
    describe('erc20', () => {
      it('getAllowanceAndBalanceOf', async () => {
        const result = await tokenFactory.getAllowanceAndBalanceOf(
          MockEthereumAddress()
        );
        expect(result).toEqual({
          allowanceV2: '0x2386c18764e720',
          allowanceV3: '0x00',
          balanceOf: '0x00',
        });
      });
    });

    describe('eth', () => {
      it('getAllowanceAndBalanceOf', async () => {
        const result = await tokenFactoryEth.getAllowanceAndBalanceOf(
          MockEthereumAddress()
        );
        expect(result).toEqual({
          allowanceV2:
            '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
          allowanceV3:
            '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
          balanceOf: '0x00',
        });
      });
    });
  });
});
