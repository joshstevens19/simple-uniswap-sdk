import { ChainId, ErrorCodes, UniswapError } from '../..';
import { ETH } from '../../common/tokens';
import { EthersProvider } from '../../ethers-provider';
import { MockEthereumAddress } from '../../mocks/ethereum-address.mock';
import { MOCKFUN } from '../../mocks/fun-token.mock';
import { MOCKREP } from '../../mocks/rep-token.mock';
import { TokensFactory } from './tokens.factory';

describe('TokensFactory', () => {
  const ethersProvider = new EthersProvider({ chainId: ChainId.MAINNET });

  const tokensFactory = new TokensFactory(ethersProvider);

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
    it('should return correct info - formatted', async () => {
      const result = await tokensFactory.getAllowanceAndBalanceOfForContracts(
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
          allowanceV2:
            '115792089237316195423570985008687907853269984665640564039457.584007913129639935',
          allowanceV3:
            '115792089237316195423570985008687907853269984665640564039457.584007913129639935',
          balanceOf: '0',
        },
      });
      expect(result[1]).toEqual({
        token: MOCKFUN(),
        allowanceAndBalanceOf: {
          allowanceV2: '99997899.4322',
          allowanceV3: '0',
          balanceOf: '0',
        },
      });
      expect(result[2]).toEqual({
        token: MOCKREP(),
        allowanceAndBalanceOf: {
          allowanceV2: '0',
          allowanceV3: '0',
          balanceOf: '0',
        },
      });
    });

    it('should return correct info - unformatted', async () => {
      const result = await tokensFactory.getAllowanceAndBalanceOfForContracts(
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
          allowanceV2:
            '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
          allowanceV3:
            '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
          balanceOf: '0x00',
        },
      });
      expect(result[1]).toEqual({
        token: MOCKFUN(),
        allowanceAndBalanceOf: {
          allowanceV2: '0x2386c18764e720',
          allowanceV3: '0x00',
          balanceOf: '0x00',
        },
      });
      expect(result[2]).toEqual({
        token: MOCKREP(),
        allowanceAndBalanceOf: {
          allowanceV2: '0x00',
          allowanceV3: '0x00',
          balanceOf: '0x00',
        },
      });
    });
  });
});
