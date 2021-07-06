import { isHexString } from 'ethers/lib/utils';
import { ChainId, WETHContract } from '../../..';
import { EthersProvider } from '../../../ethers-provider';
import { MOCKFUN } from '../../../mocks/fun-token.mock';
import { UniswapPairContractFactoryV2 } from './uniswap-pair-contract.factory.v2';

describe('UniswapPairContractFactoryV2', () => {
  const ethersProvider = new EthersProvider({ chainId: ChainId.MAINNET });

  const uniswapPairContractFactory = new UniswapPairContractFactoryV2(
    ethersProvider
  );

  it('allPairs', async () => {
    const result = await uniswapPairContractFactory.allPairs('0x01');
    expect(result).toEqual('0x3139Ffc91B99aa94DA8A2dc13f1fC36F9BDc98eE');
  });

  it('allPairsLength', async () => {
    const result = await uniswapPairContractFactory.allPairsLength();
    expect(isHexString(result)).toEqual(true);
  });

  it('createPair', () => {
    const result = uniswapPairContractFactory.createPair(
      MOCKFUN().contractAddress,
      WETHContract.MAINNET().contractAddress
    );
    expect(result).toEqual(
      '0xc9c65396000000000000000000000000419d0d8bdd9af5e606ae2232ed285aff190e711b000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'
    );
  });

  it('feeTo', async () => {
    const result = await uniswapPairContractFactory.feeTo();
    expect(isHexString(result)).toEqual(true);
  });

  it('feeToSetter', async () => {
    const result = await uniswapPairContractFactory.feeToSetter();
    expect(isHexString(result)).toEqual(true);
  });

  it('getPair', async () => {
    const result = await uniswapPairContractFactory.getPair(
      WETHContract.MAINNET().contractAddress,
      MOCKFUN().contractAddress
    );
    expect(result).toEqual('0x05B0c1D8839eF3a989B33B6b63D3aA96cB7Ec142');
  });

  it('setFeeTo', async () => {
    const result = await uniswapPairContractFactory.setFeeTo(
      '0x05B0c1D8839eF3a989B33B6b63D3aA96cB7Ec142'
    );
    expect(result).toEqual(
      '0xf46901ed00000000000000000000000005b0c1d8839ef3a989b33b6b63d3aa96cb7ec142'
    );
  });

  it('setFeeToSetter', async () => {
    const result = await uniswapPairContractFactory.setFeeToSetter(
      '0x05B0c1D8839eF3a989B33B6b63D3aA96cB7Ec142'
    );
    expect(result).toEqual(
      '0xa2e74af600000000000000000000000005b0c1d8839ef3a989b33b6b63d3aa96cb7ec142'
    );
  });
});
