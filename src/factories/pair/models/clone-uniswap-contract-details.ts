export interface CloneUniswapContractDetailsV2 {
  routerAddress: string;
  factoryAddress: string;
  pairAddress: string;
}

export interface CloneUniswapContractDetailsV3 {
  routerAddress: string;
  factoryAddress: string;
  quoterAddress: string;
}

export interface CloneUniswapContractDetails {
  v2Override?: CloneUniswapContractDetailsV2 | undefined;
  v3Override?: CloneUniswapContractDetailsV3 | undefined;
}
