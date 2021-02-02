import { ChainId, ErrorCodes, UniswapError } from '.';
import { ContractContext as PairContractContext } from './ABI/types/uniswap-pair';
import { ContractContext } from './common/contract-context';
import { EthersProvider } from './ethers-provider';
import { MockEthereumAddress } from './mocks/ethereum-address.mock';
import { MOCK_PROVIDER_URL } from './mocks/provider-url.mock';

describe('EthersProvider', () => {
  describe('with chain id', () => {
    const ethersProvider = new EthersProvider(ChainId.MAINNET);

    it('getContract', () => {
      const result = ethersProvider.getContract<PairContractContext>(
        JSON.stringify(ContractContext.pairAbi),
        ContractContext.pairAddress
      );

      expect(result).not.toBeUndefined();
    });

    it('network', () => {
      const result = ethersProvider.network();

      expect(result.chainId).toEqual(ChainId.MAINNET);
    });

    it('provider', () => {
      const result = ethersProvider.provider;

      expect(result.network.chainId).toEqual(ChainId.MAINNET);
    });

    it('balanceOf', () => {
      const result = ethersProvider.balanceOf(MockEthereumAddress());

      expect(result).not.toBeUndefined();
    });
  });

  describe('with chain id and providerUrl', () => {
    const ethersProvider = new EthersProvider(
      ChainId.MAINNET,
      MOCK_PROVIDER_URL()
    );

    it('should throw error if chainId not be found', () => {
      expect(() => {
        new EthersProvider(10293, MOCK_PROVIDER_URL());
      }).toThrowError(
        new UniswapError(
          'Can not find chain name for 10293',
          ErrorCodes.canNotFindChainId
        )
      );
    });

    it('getContract', () => {
      const result = ethersProvider.getContract<PairContractContext>(
        JSON.stringify(ContractContext.pairAbi),
        ContractContext.pairAddress
      );

      expect(result).not.toBeUndefined();
    });

    it('network', () => {
      const result = ethersProvider.network();

      expect(result.chainId).toEqual(ChainId.MAINNET);
    });

    it('provider', () => {
      const result = ethersProvider.provider;

      expect(result.network.chainId).toEqual(ChainId.MAINNET);
    });

    it('balanceOf', () => {
      const result = ethersProvider.balanceOf(MockEthereumAddress());

      expect(result).not.toBeUndefined();
    });
  });
});
