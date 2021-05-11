import { AllowanceAndBalanceOf } from './allowance-balance-of';
import { Token } from './token';

export interface TokenWithAllowanceInfo {
  allowanceAndBalanceOf: AllowanceAndBalanceOf;
  token: Token;
}
