import { Token } from '../factories/token/models/token';

export function MOCKREP(): Token {
  return {
    chainId: 1,
    contractAddress: '0x1985365e9f78359a9B6AD760e32412f4a445E862',
    decimals: 18,
    symbol: 'REP',
    name: 'Reputation',
  };
}
