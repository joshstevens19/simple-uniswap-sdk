import { UniswapVersion } from '../../../enums/uniswap-version';
import { TradeDirection } from '../../pair/models/trade-direction';
import { Transaction } from '../../pair/models/transaction';
import { Token } from '../../token/models/token';

export interface RouteQuote {
  description?: string;
  routerAddress: string;
  expectedConvertQuote: string;
  expectedConvertQuoteOrTokenAmountInMaxWithSlippage: string;
  transaction: Transaction;
  tradeExpires: number;
  routePathArrayTokenMap: Token[];
  routeText: string;
  routePathArray: string[];
  uniswapVersion: UniswapVersion;
  liquidityProviderFee: number;
  liquidityProviderFeesV3: number[];
  quoteDirection: TradeDirection;
  gasPriceEstimatedBy?: string | undefined;
}
