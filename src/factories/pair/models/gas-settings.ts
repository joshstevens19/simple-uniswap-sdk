export interface GasSettings {
  /**
   * Must return GWEI!
   */
  getGasPrice: () => Promise<string>;
}
