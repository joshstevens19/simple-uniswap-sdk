import { EthersProvider } from '../../ethers-provider';
import { UniswapPairSettings } from '../../models/uniswap-pair-settings';
import { Token } from '../../tokens/models/token';

export interface UniswapFactoryContext {
  fromToken: Token;
  toToken: Token;
  settings: UniswapPairSettings;
  ethersProvider: EthersProvider;
}
