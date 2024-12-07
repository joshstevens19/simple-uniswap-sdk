import type {
  DexProtocol,
  DexType,
  DexSettings,
  Protocols,
  DexTag,
} from '@dex-toolkit/types'

import { DexError, ErrorCodes } from '../errors'

/**
 * Types of DEX versions.
 */
export const protocolMap: { [key in DexProtocol]: DexProtocol } = {
  protocolV2: 'protocolV2',
  protocolV3: 'protocolV3',
}

export const protocols: DexProtocol[] = ['protocolV2', 'protocolV3'] as const

/**
 * Types of decentralized exchanges.
 */
export const dexTypeMap: { [key in DexType]: DexType } = {
  DOVESWAP: 'DOVESWAP',
  ENERGISWAP: 'ENERGISWAP',
  PANCAKESWAP: 'PANCAKESWAP',
  PANGOLIN: 'PANGOLIN',
  PULSEX: 'PULSEX',
  QUICKSWAP: 'QUICKSWAP',
  SUSHISWAP: 'SUSHISWAP',
  TRADERJOE: 'TRADERJOE',
  UNISWAP: 'UNISWAP',
  YETISWAP: 'YETISWAP',
} as const

/**
 * Array of decentralized exchange types.
 */
export const dexTypes: DexType[] = [
  dexTypeMap.DOVESWAP,
  dexTypeMap.ENERGISWAP,
  dexTypeMap.PANCAKESWAP,
  dexTypeMap.PANGOLIN,
  dexTypeMap.PULSEX,
  dexTypeMap.QUICKSWAP,
  dexTypeMap.SUSHISWAP,
  dexTypeMap.TRADERJOE,
  dexTypeMap.UNISWAP,
  dexTypeMap.YETISWAP,
] as const

// ------------------------
// Type Guards
// ------------------------

/**
 * Type guard to check if the provided settings conform to the base `DexSettings` structure.
 *
 * This is useful when you want to ensure the settings object contains the base fields
 * required by any settings derived from `DexSettings`.
 *
 * @param settings - The settings object to check.
 * @returns A boolean indicating whether the settings object is of type `DexSettings`.
 */
export function isDexSettings(settings: any): settings is DexSettings {
  return (
    'recipient' in settings &&
    'slippage' in settings &&
    'deadlineMinutes' in settings &&
    'disableMultihops' in settings &&
    'disableObserver' in settings &&
    'protocols' in settings
  )
}

/**
 * Type guard for DexProtocol.
 * @param protocol - The token protocols to check.
 * @returns True if the protocol is a DexProtocol.
 */
export function isProtocol(protocol: any): protocol is DexProtocol {
  return protocols.includes(protocol as DexProtocol)
}

/**
 * Type guard for DexProtocol V2.
 * @param protocol - The token protocols to check.
 * @returns True if the protocol is a DexProtocol V2.
 */
export function isProtocolV2(protocol: any): protocol is DexProtocol {
  return (
    protocols.includes(protocol as DexProtocol) && protocol === 'protocolV2'
  )
}

/**
 * Type guard for DexProtocol V3.
 * @param protocol - The token protocols to check.
 * @returns True if the protocol is a DexProtocol V3.
 */
export function isProtocolV3(protocol: any): protocol is DexProtocol {
  return (
    protocols.includes(protocol as DexProtocol) && protocol === 'protocolV3'
  )
}

/**
 * Asserts that a given value is a valid DexProtocol.
 *
 * @param protocol - The protocol value to check.
 * @throws DexError if the protocol is undefined or not a valid DexProtocol.
 */
export function assertProtocol(
  protocol: unknown,
): asserts protocol is DexProtocol {
  if (protocol === undefined) {
    throw new DexError(
      'Must provide dex protocol',
      ErrorCodes.functionArgumentError,
    )
  }
  if (!isProtocol(protocol)) {
    throw new DexError(
      'Invalid DexProtocol value',
      ErrorCodes.functionArgumentError,
    )
  }
}

/**
 * Checks if the given context is of type Protocols.
 *
 * @param context - The context to check.
 * @returns True if the context is of type Protocols, false otherwise.
 */
export function isProtocols(context: any): context is Protocols {
  return (
    (context as Protocols).protocolV2 !== undefined ||
    (context as Protocols).protocolV3 !== undefined
  )
}

/**
 * Asserts that the given context is of type Protocols.
 *
 * @param context - The context to check.
 * @throws DexError if the context is undefined or not of type Protocols.
 */
export function assertProtocols(
  context: unknown,
): asserts context is Protocols {
  if (context === undefined) {
    throw new DexError('Context is undefined', ErrorCodes.functionArgumentError)
  }

  if (!isProtocols(context)) {
    throw new DexError(
      'Invalid Protocols context',
      ErrorCodes.functionArgumentError,
    )
  }
}

/**
 * Type guard for DexType.
 * @param dexType - The token exchange to check.
 * @returns True if the dexType is a DexType.
 */
export function isDexType(dexType: any): dexType is DexType {
  return Object.values(dexTypeMap).includes(dexType as DexType)
}

/**
 * Asserts that a given value is a valid DexType.
 *
 * @param dexType - The dexType value to check.
 * @throws DexError if the dexType is undefined or not a valid DexType.
 */
export function assertDexType(dexType: unknown): asserts dexType is DexType {
  if (dexType === undefined) {
    throw new DexError('DexType is undefined', ErrorCodes.functionArgumentError)
  }
  if (!isDexType(dexType)) {
    throw new DexError(
      'Invalid DexType value',
      ErrorCodes.functionArgumentError,
    )
  }
}

/**
 * Asserts that a given value is a valid DexTag.
 *
 * @param dexTag - The dexTag value to check.
 * @throws DexError if the dexTag is undefined or not a valid DexType.
 */
export function assertDexTag(dexTag: unknown): asserts dexTag is DexTag {
  if (dexTag === undefined) {
    throw new DexError('DexType is undefined', ErrorCodes.functionArgumentError)
  }
  if (typeof dexTag !== 'string') {
    throw new DexError('Invalid DexTag value', ErrorCodes.functionArgumentError)
  }
}
