import BigNumber from 'bignumber.js';
import { Token } from '../../token/models/token';

export interface RouteQuote {
  convertQuote: BigNumber;
  routePathArrayTokenMap: Token[];
  /**
   * If you just wanted to render the route without doing anything more with
   * context above
   */
  routeText: string;
  routePathArray: string[];
}
