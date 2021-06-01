import { Token } from '../factories/token/models/token';

export function MOCKAAVE(): Token {
  return {
    chainId: 1,
    contractAddress: '0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9',
    decimals: 18,
    symbol: 'AAVE',
    name: 'AAVE',
  };
}
