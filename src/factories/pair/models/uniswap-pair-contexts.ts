import { ChainId } from '../../../enums/chain-id';
import { UniswapVersion } from '../../../enums/uniswap-version';
import { UniswapPairSettings } from './uniswap-pair-settings';

interface UniswapPairContextBase {
  fromTokenContractAddress: string;
  toTokenContractAddress: string;
  ethereumAddress: string;
  settings?: UniswapPairSettings | undefined;
  // if undefined then it use all uniswap versions
  uniswapVersions?: UniswapVersion[] | undefined;
}

export interface UniswapPairContextForChainId extends UniswapPairContextBase {
  chainId: ChainId | number;
}

export interface UniswapPairContextForProviderUrl
  extends UniswapPairContextForChainId {
  providerUrl: string;
}
