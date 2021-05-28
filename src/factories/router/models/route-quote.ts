import { UniswapVersion } from '../../../enums/uniswap-version';
import { Token } from '../../token/models/token';

export interface RouteQuote {
  expectedConvertQuote: string;
  routePathArrayTokenMap: Token[];
  routeText: string;
  routePathArray: string[];
  uniswapVersion: UniswapVersion;
  //liquidityProviderPercent: number;
}
