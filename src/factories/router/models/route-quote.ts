import { UniswapVersion } from '../../../enums/uniswap-version';
import { TradeDirection } from '../../pair/models/trade-direction';
import { Token } from '../../token/models/token';

export interface RouteQuote {
  expectedConvertQuote: string;
  routePathArrayTokenMap: Token[];
  routeText: string;
  routePathArray: string[];
  uniswapVersion: UniswapVersion;
  liquidityProviderFee: number;
  quoteDirection: TradeDirection;
}
