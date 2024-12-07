import type {
  DexConfig,
  DexType,
  DexChainConfig,
  DexConfigContext,
  DexConfigsByDex,
  DexContext,
  DexConfigBase,
  ProtocolSettings,
  DexProtocol,
  VersionTag,
} from '@dex-toolkit/types'
import type { ChainId } from '@ethereum-multicall/types'

import type { DexClass } from './configs/abstractDex'
import { DoveSwap } from './configs/doveSwap.dex'
import { EnergiSwap } from './configs/energiswap.dex'
import { PancakeSwap } from './configs/pancakeSwap.dex'
import { PangolinSwap } from './configs/pangolinSwap.dex'
import { PulseXSwap } from './configs/pulseXSwap.dex'
import { QuickSwap } from './configs/quickSwap.dex'
import { SushiSwap } from './configs/sushiSwap.dex'
import { TraderJoeSwap } from './configs/traderJoeSwap.dex'
import { Uniswap } from './configs/uniswap.dex'
import { YetiSwap } from './configs/yetiSwap.dex'
import { DexError, ErrorCodes } from '../errors'
import { isDexType, isSameVersion } from '../utils'

// ------------------------
// DEX Configs
// ------------------------

const dexClasses: Record<DexType, DexClass> = {
  DOVESWAP: DoveSwap,
  ENERGISWAP: EnergiSwap,
  PANCAKESWAP: PancakeSwap,
  PANGOLIN: PangolinSwap,
  PULSEX: PulseXSwap,
  QUICKSWAP: QuickSwap,
  SUSHISWAP: SushiSwap,
  TRADERJOE: TraderJoeSwap,
  UNISWAP: Uniswap,
  YETISWAP: YetiSwap,
}

export function getDexConfig({
  dexType,
  chainId,
}: DexChainConfig): DexConfig | undefined {
  if (!dexType || !chainId) {
    return undefined
  }

  const DexClass = dexClasses[dexType]
  return DexClass?.getDexConfig(chainId)
}

export function getAllDexConfigs(): DexConfig[] {
  return Object.values(dexClasses).flatMap((DexClass) =>
    DexClass.getAllDexConfigs(),
  )
}

export function getAllDexConfigsForChainId(chainId: ChainId): DexConfig[] {
  return Object.values(dexClasses).flatMap((DexClass) =>
    DexClass.getAllDexConfigs().filter((config) => config.chainId === chainId),
  )
}

// ------------------------
// Type Guards
// ------------------------

/**
 * Type guard to check if an object is of type `DexChainConfig`.
 *
 * @param context - The context to check.
 * @returns True if the context is a `DexChainConfig`, false otherwise.
 */
export function isDexChainConfig(context: any): context is DexChainConfig {
  return (
    typeof context === 'object' &&
    !!context &&
    'dexType' in context &&
    'chainId' in context
  )
}

/**
 * Asserts that the provided context is a valid `DexChainConfig`.
 *
 * @param context - The context to check.
 * @param errorCode - Optional error code to throw if assertion fails.
 * @throws `DexError` if the context is not provided or is not a valid `DexChainConfig`.
 */
export function assertDexChainConfig(
  context: any,
  errorCode = ErrorCodes.functionArgumentError,
): asserts context is DexChainConfig {
  if (context === undefined || context === null) {
    throw new DexError(
      'DexChainConfig context is required but was not provided',
      errorCode,
    )
  }

  if (!isDexChainConfig(context)) {
    throw new DexError('Invalid DexChainConfig context provided', errorCode)
  }
}

/**
 * Type guard to check if an object is of type `DexConfigBase`.
 *
 * @param context - The context to check.
 * @returns True if the context is a `DexConfigBase`, false otherwise.
 */
export function isDexConfigBase(context: any): context is DexConfigBase {
  return (
    typeof context === 'object' &&
    !!context &&
    'dexType' in context &&
    'protocols' in context
  )
}

/**
 * Asserts that the provided context is a valid `DexConfigBase`.
 *
 * @param context - The context to check.
 * @param errorCode - Optional error code to throw if assertion fails.
 * @throws `DexError` if the context is not provided or is not a valid `DexConfigBase`.
 */
export function assertDexConfigBase(
  context: any,
  errorCode = ErrorCodes.functionArgumentError,
): asserts context is DexConfigBase {
  if (context === undefined || context === null) {
    throw new DexError(
      'DexConfigBase context is required but was not provided',
      errorCode,
    )
  }

  if (!isDexConfigBase(context)) {
    throw new DexError('Invalid DexConfigBase context provided', errorCode)
  }
}

/**
 * Type guard to check if an array is of type `DexContext`.
 *
 * @param context - The context to check.
 * @returns True if the context is a `DexContext`, false otherwise.
 */
export function isDexContext(context: any): context is DexContext {
  return (
    Array.isArray(context) &&
    context.every((item) => isDexChainConfig(item) || isDexConfigBase(item))
  )
}

/**
 * Asserts that the provided context is a valid `DexContext`.
 *
 * @param context - The context to check.
 * @param errorCode - Optional error code to throw if assertion fails.
 * @throws `DexError` if the context is not provided or is not a valid `DexContext`.
 */
export function assertDexContext(
  context: any,
  errorCode = ErrorCodes.functionArgumentError,
): asserts context is DexContext {
  if (context === undefined || context === null) {
    throw new DexError('DexContext is required but was not provided', errorCode)
  }

  if (!isDexContext(context)) {
    throw new DexError('Invalid DexContext provided', errorCode)
  }
}

// ------------------------
// DexConfigContext
// ------------------------

/**
 * Converts a DexConfigContext (either a single DexConfigBase or an array of DexConfigBase objects) into a DexConfigsByDex object where the keys are the dexType values.
 *
 * @param context - The DexConfigContext to convert, which can be a single DexConfigBase object or an array of DexConfigBase objects.
 * @returns A DexConfigsByDex object where each dexType is a key and the corresponding DexConfigBase is the value.
 */
export function convertDexConfigContextToByDex(
  context: DexConfigContext,
): DexConfigsByDex {
  const keyedConfigs: DexConfigsByDex = {} as DexConfigsByDex

  if (Array.isArray(context)) {
    for (const config of context) {
      keyedConfigs[config.dexType] = config
    }
  } else {
    keyedConfigs[context.dexType] = context
  }

  return keyedConfigs
}

/**
 * Parses a `DexContext` into a `DexConfigsByDex` object, where the keys are `dexType` values.
 * This function combines the processes of converting a `DexContext` to a `DexConfigContext`
 * and then mapping it into a `DexConfigsByDex` object.
 *
 * @param params - The parameters for the parsing.
 * @param params.dexContext - The `DexContext` to parse, which can be a single `DexChainConfig` or `DexConfigBase`, or an array of them.
 * @param params.chainId - The chain id
 * @param params.protocolSettings - The protocol settings (optional)
 * @returns A `DexConfigsByDex` object where each `dexType` is a key and the corresponding `DexConfigBase` is the value.
 * @throws If no matching `DexConfig` is found for a `DexChainConfig`, or if the context is invalid.
 */

export function parseDexConfigsByDexFromDexContext({
  dexContext,
  chainId,
  protocolSettings,
}: {
  dexContext: DexContext
  chainId: ChainId
  protocolSettings?: ProtocolSettings
}): DexConfigsByDex {
  // Convert DexContext into an array of DexConfigBase objects
  const dexConfigContext: DexConfigBase[] = Array.isArray(dexContext)
    ? dexContext.map((context) => {
        if (isDexType(context)) {
          const dexConfig = getDexConfig({ dexType: context, chainId })

          if (!dexConfig) {
            throw new Error(`No DexConfig found for dexType: ${context}`)
          }

          return dexConfig
        }

        if (isDexConfigBase(context)) {
          return context
        }

        throw new Error(
          `Invalid DexContext context item: ${JSON.stringify(context)}`,
        )
      })
    : [
        isDexType(dexContext)
          ? (() => {
              const dexConfig = getDexConfig({ dexType: dexContext, chainId })
              if (!dexConfig) {
                throw new Error(`No DexConfig found for dexType: ${dexContext}`)
              }
              return dexConfig
            })()
          : isDexConfigBase(dexContext)
            ? dexContext
            : (() => {
                throw new Error(
                  `Invalid DexContext: ${JSON.stringify(dexContext)}`,
                )
              })(),
      ]

  // Parse each DexConfigBase to build DexConfigsByDex
  return dexConfigContext.reduce((acc, dexConfig) => {
    const { dexTag, protocols } = dexConfig

    Object.entries(protocols).forEach(([protocolKey, config]) => {
      const settings = protocolSettings?.[protocolKey as DexProtocol]

      if (settings) {
        // Apply include and exclude versions filters
        const { includeVersions, excludeVersions } = settings

        const filteredConfig = Object.entries(config)
          .filter(
            ([version]) =>
              (includeVersions?.length
                ? includeVersions.some((includedVersion) =>
                    isSameVersion(includedVersion, version as VersionTag),
                  )
                : true) &&
              (excludeVersions?.length
                ? !excludeVersions.some((excludedVersion) =>
                    isSameVersion(excludedVersion, version as VersionTag),
                  )
                : true),
          )
          .reduce(
            (obj, [version, details]) => {
              obj[version as VersionTag] = details
              return obj
            },
            {} as typeof config,
          )

        acc[dexTag] = {
          ...dexConfig,
          protocols: { ...protocols, [protocolKey]: filteredConfig },
        }
      } else {
        acc[dexTag] = { ...dexConfig, protocols }
      }
    })

    return acc
  }, {} as DexConfigsByDex)
}
