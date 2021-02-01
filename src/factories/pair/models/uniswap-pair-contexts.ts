import { ChainId } from '../../../enums/chain-id';
import { UniswapPairSettings } from './uniswap-pair-settings';

export interface UniswapPairContextForChainId extends UniswapPairContextBase {
  chainId: ChainId;
}

export interface UniswapPairContextForProviderUrl
  extends UniswapPairContextBase {
  providerUrl: string;
}

interface UniswapPairContextBase {
  fromTokenContractAddress: string;
  toTokenContractAddress: string;
  ethereumAddress: string;
  settings?: UniswapPairSettings | undefined;
}
