import BigNumber from 'bignumber.js';

export interface BestRouteQuote {
  convertQuote: BigNumber;
  routePathArray: string[];
}
