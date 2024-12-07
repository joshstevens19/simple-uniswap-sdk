import type {
  UniswapFactoryV2Types,
  UniswapFactoryV3Types,
} from '@dex-toolkit/types'

// ------------------------
// Method Names
// ------------------------

export const defaultFactoryMethodMapV2: UniswapFactoryV2Types.MethodNameMap = {
  allPairs: 'allPairs',
  allPairsLength: 'allPairsLength',
  createPair: 'createPair',
  feeTo: 'feeTo',
  feeToSetter: 'feeToSetter',
  getPair: 'getPair',
  setFeeTo: 'setFeeTo',
  setFeeToSetter: 'setFeeToSetter',
} as const

export const defaultFactoryMethodMapV3: UniswapFactoryV3Types.MethodNameMap = {
  createPool: 'createPool',
  enableFeeTier: 'enableFeeTier',
  feeTierTickSpacing: 'feeTierTickSpacing',
  getPool: 'getPool',
  owner: 'owner',
  parameters: 'parameters',
  setOwner: 'setOwner',
} as const
