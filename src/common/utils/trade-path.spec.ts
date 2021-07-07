import { ChainId } from '../../enums/chain-id';
import { TradePath } from '../../enums/trade-path';
import { MOCKFUN } from '../../mocks/fun-token.mock';
import { MOCKREP } from '../../mocks/rep-token.mock';
import { ETH, WETHContract } from '../tokens';
import { getTradePath } from './trade-path';

describe('getTradePath', () => {
  it('should return `TradePath.ethToErc20`', () => {
    const result = getTradePath(ChainId.MAINNET, ETH.MAINNET(), MOCKFUN());
    expect(result).toEqual(TradePath.ethToErc20);
  });

  it('should return `TradePath.erc20ToEth`', () => {
    const result = getTradePath(ChainId.MAINNET, MOCKFUN(), ETH.MAINNET());
    expect(result).toEqual(TradePath.erc20ToEth);
  });

  it('should return `TradePath.erc20ToErc20`', () => {
    const result = getTradePath(
      ChainId.MAINNET,
      WETHContract.MAINNET(),
      MOCKFUN()
    );
    expect(result).toEqual(TradePath.erc20ToErc20);
  });

  it('should return `TradePath.erc20ToErc20`', () => {
    const result = getTradePath(
      ChainId.MAINNET,
      MOCKFUN(),
      WETHContract.MAINNET()
    );
    expect(result).toEqual(TradePath.erc20ToErc20);
  });

  it('should return `TradePath.erc20ToErc20`', () => {
    const result = getTradePath(ChainId.MAINNET, MOCKFUN(), MOCKREP());
    expect(result).toEqual(TradePath.erc20ToErc20);
  });
});
