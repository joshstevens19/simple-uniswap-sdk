import { Observable } from 'rxjs';
import { RouteQuote } from '../../router/models/route-quote';
import { Token } from '../../token/models/token';
import { Transaction } from './transaction';

export interface PriceContext {
  baseConvertRequest: string;
  minAmountConvertQuote: string;
  expectedConvertQuote: string;
  liquidityProviderFee: string;
  routePathTokenMap: Token[];
  routeText: string;
  routePath: string[];
  allTriedRoutesQuotes: RouteQuote[];
  hasEnoughAllowance: boolean;
  fromBalance: {
    hasEnough: boolean;
    balance: string;
  };
  transaction: Transaction;
  quoteChanged$: Observable<PriceContext>;
  destroy: () => void;
}
