import { Token } from '../../token/models/token';

export interface PriceContext {
  baseConvertRequest: string;
  minAmountConvertQuote: string;
  expectedConvertQuote: string;
  routePathTokenMap: Token[];
  routeText: string;
  routePath: string[];
  data: string;
  hasEnoughAllowance: boolean;
}
