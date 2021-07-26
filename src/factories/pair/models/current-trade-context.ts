import { Token } from '../../token/models/token';
import { TradeDirection } from './trade-direction';
import { Transaction } from './transaction';

export interface CurrentTradeContext {
  baseConvertRequest: string;
  expectedConvertQuote: string;
  quoteDirection: TradeDirection;
  fromToken: Token;
  toToken: Token;
  liquidityProviderFee: string;
  transaction: Transaction;
  routeText: string;
  tradeExpires: number;
}
