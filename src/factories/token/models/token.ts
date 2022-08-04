import { ChainId } from '../../../enums/chain-id';
import { FeeAmount } from '../../router/v3/enums/fee-amount-v3';

export interface Token {
  chainId: ChainId;
  contractAddress: string;
  decimals: number;
  symbol: string;
  name: string;
}

export interface Pool {
  token: Token;
  fee?: FeeAmount | undefined;
}
