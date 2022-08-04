import { JsonFragment } from '@ethersproject/abi';
import { IRouterMethods } from '../../router/models/route-methods';

export interface CloneUniswapContractDetailsV2 {
  routerAddress: string;
  factoryAddress: string;
  pairAddress: string;
  routerAbi?: JsonFragment[];
  routerMethods?: Partial<IRouterMethods>;
}

export interface CloneUniswapContractDetailsV3 {
  routerAddress: string;
  factoryAddress: string;
  quoterAddress: string;
  routerAbi?: JsonFragment[];
}

export interface CloneUniswapContractDetails {
  v2Override?: CloneUniswapContractDetailsV2 | undefined;
  v3Override?: CloneUniswapContractDetailsV3 | undefined;
}
