import { Observable as UniswapStream } from 'rxjs';
import { UniswapVersion } from '../../../enums/uniswap-version';
import { RouteQuote } from '../../router/models/route-quote';
import { Token } from '../../token/models/token';
import { TradeDirection } from './trade-direction';
import { Transaction } from './transaction';

export interface TradeContext {
  uniswapVersion: UniswapVersion;
  baseConvertRequest: string;
  minAmountConvertQuote: string | null;
  maximumSent: string | null;
  expectedConvertQuote: string;
  liquidityProviderFee: string;
  liquidityProviderFeePercent: number;
  tradeExpires: number;
  routePathTokenMap: Token[];
  routeText: string;
  routePath: string[];
  allTriedRoutesQuotes: RouteQuote[];
  hasEnoughAllowance: boolean;
  approvalTransaction?: Transaction | undefined;
  fromToken: Token;
  toToken: Token;
  fromBalance: {
    hasEnough: boolean;
    balance: string;
  };
  transaction: Transaction;
  quoteChanged$: UniswapStream<TradeContext>;
  destroy: () => void;
  quoteDirection: TradeDirection;
}
