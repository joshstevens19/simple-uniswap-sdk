import {
  ChainId,
  ErrorCodes,
  TokensFactoryPublic,
  UniswapError,
  UniswapVersion,
} from '../..';
import { ETH } from '../../common/tokens';
import { MockEthereumAddress } from '../../mocks/ethereum-address.mock';
import { MOCKFUN } from '../../mocks/fun-token.mock';
import { MOCKREP } from '../../mocks/rep-token.mock';

describe('TokensFactoryPublic', () => {
  const tokensFactory = new TokensFactoryPublic({ chainId: ChainId.MAINNET });

  describe('getTokens', () => {
    it('should return correct token info', async () => {
      const result = await tokensFactory.getTokens([
        ETH.MAINNET().contractAddress,
        MOCKFUN().contractAddress,
        MOCKREP().contractAddress,
      ]);
      expect(result[0]).toEqual(ETH.MAINNET());
      expect(result[1]).toEqual(MOCKFUN());
      expect(result[2]).toEqual(MOCKREP());
    });

    it('should throw error if 1 of the contract addresses are invalid', async () => {
      await expect(
        tokensFactory.getTokens([
          '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E722c',
          MOCKREP().contractAddress,
        ])
      ).rejects.toThrowError(
        new UniswapError(
          'invalid from or to contract tokens',
          ErrorCodes.invalidFromOrToContractToken
        )
      );
    });
  });

  describe('getAllowanceAndBalanceOfForContracts', () => {
    describe('v2', () => {
      it('should return correct info - formatted', async () => {
        const result = await tokensFactory.getAllowanceAndBalanceOfForContracts(
          UniswapVersion.v2,
          MockEthereumAddress(),
          [
            ETH.MAINNET().contractAddress,
            MOCKFUN().contractAddress,
            MOCKREP().contractAddress,
          ],
          true
        );
        expect(result[0]).toEqual({
          token: ETH.MAINNET(),
          allowanceAndBalanceOf: {
            allowance:
              '115792089237316195423570985008687907853269984665640564039457.584007913129639935',
            balanceOf: '0.217093373250724513',
          },
        });
        expect(result[1]).toEqual({
          token: MOCKFUN(),
          allowanceAndBalanceOf: {
            allowance: '99997899.4322',
            balanceOf: '1307.73129463',
          },
        });
        expect(result[2]).toEqual({
          token: MOCKREP(),
          allowanceAndBalanceOf: {
            allowance: '0',
            balanceOf: '0',
          },
        });
      });

      it('should return correct info - unformatted', async () => {
        const result = await tokensFactory.getAllowanceAndBalanceOfForContracts(
          UniswapVersion.v2,
          MockEthereumAddress(),
          [
            ETH.MAINNET().contractAddress,
            MOCKFUN().contractAddress,
            MOCKREP().contractAddress,
          ],
          false
        );
        expect(result[0]).toEqual({
          token: ETH.MAINNET(),
          allowanceAndBalanceOf: {
            allowance:
              '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
            balanceOf: '0x03034545d3b362a1',
          },
        });
        expect(result[1]).toEqual({
          token: MOCKFUN(),
          allowanceAndBalanceOf: {
            allowance: '0x2386c18764e720',
            balanceOf: '0x1e72af98f7',
          },
        });
        expect(result[2]).toEqual({
          token: MOCKREP(),
          allowanceAndBalanceOf: {
            allowance: '0x00',
            balanceOf: '0x00',
          },
        });
      });
    });

    describe('v3', () => {
      it('should return correct info - formatted', async () => {
        const result = await tokensFactory.getAllowanceAndBalanceOfForContracts(
          UniswapVersion.v3,
          MockEthereumAddress(),
          [
            ETH.MAINNET().contractAddress,
            MOCKFUN().contractAddress,
            MOCKREP().contractAddress,
          ],
          true
        );
        expect(result[0]).toEqual({
          token: ETH.MAINNET(),
          allowanceAndBalanceOf: {
            allowance:
              '115792089237316195423570985008687907853269984665640564039457.584007913129639935',
            balanceOf: '0.217093373250724513',
          },
        });
        expect(result[1]).toEqual({
          token: MOCKFUN(),
          allowanceAndBalanceOf: {
            allowance: '0',
            balanceOf: '1307.73129463',
          },
        });
        expect(result[2]).toEqual({
          token: MOCKREP(),
          allowanceAndBalanceOf: {
            allowance: '0',
            balanceOf: '0',
          },
        });
      });

      it('should return correct info - unformatted', async () => {
        const result = await tokensFactory.getAllowanceAndBalanceOfForContracts(
          UniswapVersion.v3,
          MockEthereumAddress(),
          [
            ETH.MAINNET().contractAddress,
            MOCKFUN().contractAddress,
            MOCKREP().contractAddress,
          ],
          false
        );
        expect(result[0]).toEqual({
          token: ETH.MAINNET(),
          allowanceAndBalanceOf: {
            allowance:
              '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
            balanceOf: '0x03034545d3b362a1',
          },
        });
        expect(result[1]).toEqual({
          token: MOCKFUN(),
          allowanceAndBalanceOf: {
            allowance: '0x00',
            balanceOf: '0x1e72af98f7',
          },
        });
        expect(result[2]).toEqual({
          token: MOCKREP(),
          allowanceAndBalanceOf: {
            allowance: '0x00',
            balanceOf: '0x00',
          },
        });
      });
    });
  });
});
