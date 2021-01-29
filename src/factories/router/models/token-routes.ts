import { Token } from '../../token/models/token';

export interface TokenRoutes {
  token: Token;
  pairs: {
    fromTokenPairs?: Token[] | undefined;
    toTokenPairs?: Token[] | undefined;
  };
}
