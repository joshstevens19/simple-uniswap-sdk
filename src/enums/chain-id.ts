export enum ChainId {
  MAINNET = 1,
  GÖRLI = 5,
  SEPOLIA = 11155111
}

export const ChainNames = new Map<number, string>([
  [ChainId.MAINNET, 'mainnet'],
  [ChainId.GÖRLI, 'görli'],
  [ChainId.SEPOLIA, 'sepolia'],
]);
