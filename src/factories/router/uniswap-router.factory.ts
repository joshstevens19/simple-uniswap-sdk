export class UniswapRouterFactory {
  constructor() {}

  //TODO work out routes for things in here!
  /**
   * Steps in flow of working this out:
   *
   * Known pairs:
   *
   * USDC:
   *
   * USDC > COMP
   * USDC > DAI
   * USDC > USDT
   * USDC > WETH
   *
   * - example
   * from - FUN
   * to - LOOM
   * 1) check pair between from and to exists, if so add it to the compare list
   * 2) check pair between FUN > USDT exists
   *        - if so then check USDT > LOOM exists
   *        - check USDT > DAI exists
   *            - if so check DAI > LOOM exists
   *        - check USDT > COMP exists
   *            - if so check COMP > LOOM exists
   *        - check USDT > USDC exists
   *            - if so check USDC > LOOM exists
   *        - check USDT > WETH exists
   *            - if so check WETH > LOOM exists
   * 3) check pair between FUN > DAI exists
   *        - if so then check DAI > LOOM exists
   *        - ... more logic here
   * 4) check pair between FUN > COMP exists
   *        - if so then check COMP > LOOM exists
   *        - ... more logic here
   * 5) check pair between FUN > USDC exists
   *        - if so then check USDC > LOOM exists
   *        - ... more logic here
   * 6) check pair between FUN > WETH exists
   *        - if so then check WETH > LOOM exists
   *        - ... more logic here
   *
   *
   *
   *
   *
   *
   *
   *
   *
   */
  public blah() {}
}
