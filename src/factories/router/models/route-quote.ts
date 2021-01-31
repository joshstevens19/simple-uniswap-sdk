import { Token } from '../../token/models/token';

export interface RouteQuote {
  expectedConvertQuote: string;
  routePathArrayTokenMap: Token[];
  routeText: string;
  routePathArray: string[];
}
