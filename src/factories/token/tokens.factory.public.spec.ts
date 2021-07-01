import { ChainId, ErrorCodes, TokensFactoryPublic, UniswapError } from '../..';
import { MOCKFUN } from '../../mocks/fun-token.mock';
import { MOCKREP } from '../../mocks/rep-token.mock';

describe('TokensFactoryPublic', () => {
  const tokensFactoryPublic = new TokensFactoryPublic({
    chainId: ChainId.MAINNET,
  });

  describe('getTokens', () => {
    it('should return both token info', async () => {
      const result = await tokensFactoryPublic.getTokens([
        MOCKFUN().contractAddress,
        MOCKREP().contractAddress,
      ]);
      expect(result[0]).toEqual(MOCKFUN());
      expect(result[1]).toEqual(MOCKREP());
    });

    it('should throw error if 1 of the contract addresses are invalid', async () => {
      await expect(
        tokensFactoryPublic.getTokens([
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
