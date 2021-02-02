import { Observable as UniswapStream } from 'rxjs';
import { RouteQuote } from '../../router/models/route-quote';
import { Token } from '../../token/models/token';
import { Transaction } from './transaction';

export interface TradeContext {
  baseConvertRequest: string;
  minAmountConvertQuote: string;
  expectedConvertQuote: string;
  liquidityProviderFee: string;
  tradeExpires: number;
  routePathTokenMap: Token[];
  routeText: string;
  routePath: string[];
  allTriedRoutesQuotes: RouteQuote[];
  hasEnoughAllowance: boolean;
  fromToken: Token;
  toToken: Token;
  fromBalance: {
    hasEnough: boolean;
    balance: string;
  };
  transaction: Transaction;
  quoteChanged$: UniswapStream<TradeContext>;
  destroy: () => void;
}
