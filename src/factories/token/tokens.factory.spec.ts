import { ChainId, ErrorCodes, UniswapError } from '../..';
import { EthersProvider } from '../../ethers-provider';
import { MOCKFUN } from '../../mocks/fun-token.mock';
import { MOCKREP } from '../../mocks/rep-token.mock';
import { TokensFactory } from './tokens.factory';

describe('TokensFactory', () => {
  const ethersProvider = new EthersProvider(ChainId.MAINNET);

  const tokensFactory = new TokensFactory(ethersProvider);

  describe('getTokens', () => {
    it('should return both token info', async () => {
      const result = await tokensFactory.getTokens([
        MOCKFUN().contractAddress,
        MOCKREP().contractAddress,
      ]);
      expect(result[0]).toEqual(MOCKFUN());
      expect(result[1]).toEqual(MOCKREP());
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
});
