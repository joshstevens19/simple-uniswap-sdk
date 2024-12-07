import type { UniswapPoolV3Types } from '@dex-toolkit/types'

// ------------------------
// Method Names
// ------------------------

export const defaultPoolMethodMapV3: UniswapPoolV3Types.MethodNameMap = {
  burn: 'burn',
  collect: 'collect',
  collectProtocol: 'collectProtocol',
  factory: 'factory',
  fee: 'fee',
  feeGrowthGlobal0X128: 'feeGrowthGlobal0X128',
  feeGrowthGlobal1X128: 'feeGrowthGlobal1X128',
  flash: 'flash',
  increaseObservationCardinalityNext: 'increaseObservationCardinalityNext',
  initialize: 'initialize',
  liquidity: 'liquidity',
  maxLiquidityPerTick: 'maxLiquidityPerTick',
  mint: 'mint',
  observations: 'observations',
  observe: 'observe',
  positions: 'positions',
  protocolFees: 'protocolFees',
  setFeeProtocol: 'setFeeProtocol',
  slot0: 'slot0',
  snapshotCumulativesInside: 'snapshotCumulativesInside',
  swap: 'swap',
  tickBitmap: 'tickBitmap',
  tickSpacing: 'tickSpacing',
  ticks: 'ticks',
  token0: 'token0',
  token1: 'token1',
} as const
