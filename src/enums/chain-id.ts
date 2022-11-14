export enum ChainId {
  MAINNET = 1,
  RINKEBY = 4,
  GÖRLI = 5,
  KOVAN = 42,
}

export const ChainNames = new Map<number, string>([
  [ChainId.MAINNET, 'mainnet'],
  [ChainId.RINKEBY, 'rinkeby'],
  [ChainId.GÖRLI, 'görli'],
  [ChainId.KOVAN, 'kovan'],
]);
