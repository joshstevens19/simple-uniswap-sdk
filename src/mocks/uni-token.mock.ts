import { Token } from '../factories/token/models/token';

export function MOCKUNI(): Token {
  return {
    chainId: 1,
    contractAddress: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
    decimals: 18,
    symbol: 'UNI',
    name: 'Uniswap',
  };
}
