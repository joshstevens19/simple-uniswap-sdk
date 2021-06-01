import { EthersProvider } from '../../../ethers-provider';
import { Token } from '../../token/models/token';
import { UniswapPairSettings } from './uniswap-pair-settings';

export interface UniswapPairFactoryContext {
  fromToken: Token;
  toToken: Token;
  ethereumAddress: string;
  settings: UniswapPairSettings;
  ethersProvider: EthersProvider;
}
