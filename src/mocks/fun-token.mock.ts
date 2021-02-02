import { Token } from '../factories/token/models/token';

export function MOCKFUN(): Token {
  return {
    chainId: 1,
    contractAddress: '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b',
    decimals: 8,
    symbol: 'FUN',
    name: 'FunFair',
  };
}
