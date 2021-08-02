import { RouteQuote } from './route-quote';

export interface BestRouteQuotes {
  bestRouteQuote: RouteQuote;
  triedRoutesQuote: RouteQuote[];
  hasEnoughAllowance: boolean;
  hasEnoughBalance: boolean;
  fromBalance: string;
  toBalance: string;
}
