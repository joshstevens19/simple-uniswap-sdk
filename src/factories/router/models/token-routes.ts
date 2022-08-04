import { Pool, Token } from "../../token/models/token";

export interface TokenRoutes {
  token: Token;
  pairs: {
    fromTokenPairs?: Pool[] | undefined;
    toTokenPairs?: Pool[] | undefined;
  };
}
