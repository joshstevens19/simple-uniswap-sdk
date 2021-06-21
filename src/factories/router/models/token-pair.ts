import { BigNumber } from 'bignumber.js';
import { Token } from '../../token/models/token';

export interface TokenPair {
  from: {
    token: Token;
    reserve: BigNumber;
  };
  to: {
    token: Token;
    reserve: BigNumber;
  };
  poolAddress: string;
}
