import { Token } from '../../token/models/token';

export interface RouteContext {
  route: Token[];
  liquidityProviderFee: number;
}
