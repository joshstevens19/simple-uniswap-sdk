export interface GasSettings {
  getGasPrice: () => Promise<number>;
}
