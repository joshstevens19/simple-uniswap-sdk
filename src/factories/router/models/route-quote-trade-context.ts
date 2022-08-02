import { UniswapVersion } from '../../../enums/uniswap-version';

export interface RouteQuoteTradeContext {
  uniswapVersion: UniswapVersion;
  routePathArray: string[];
  liquidityProviderFee: number;
  liquidityProviderFeesV3: number[];
}
