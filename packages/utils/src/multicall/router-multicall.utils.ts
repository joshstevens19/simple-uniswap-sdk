import type {
  DexTag,
  DexProtocol,
  FeeTier,
  Token,
  VersionTag,
} from '@dex-toolkit/types'
import type { Address } from '@multicall-toolkit/types'

import { assertDexTag, assertProtocol, assertVersionTag } from '../utils'

/**
 * Creates a route multicall reference string from the provided information.
 *
 * @param params - The parameters for creating the route multicall reference.
 * @param params.dexTag - The dex tag.
 * @param params.protocol - The protocol of the DEX (v2, v3, etc.).
 * @param params.versionTag - The version represented as a string.
 * @param params.fromToken - The from token.
 * @param params.toToken - The to token.
 * @param params.feeTier - The fee amount for V3.
 * @returns The route reference string.
 */
export function createRouteMulticallReference({
  dexTag,
  protocol,
  versionTag,
  fromToken,
  toToken,
  feeTier,
}: {
  dexTag: DexTag
  protocol: DexProtocol
  versionTag: VersionTag
  fromToken?: Token
  toToken?: Token
  feeTier?: FeeTier // V3 only
}): string {
  const fromTokenAddress = fromToken?.contractAddress
    ? `${fromToken.contractAddress}`
    : ''
  const toTokenAddress = toToken?.contractAddress
    ? `${toToken.contractAddress}`
    : ''
  const pairSymbols =
    fromToken?.symbol && toToken?.symbol
      ? `${fromToken.symbol}-${toToken.symbol}`
      : ''
  const fee = feeTier ? `${feeTier}` : ''

  return `${dexTag}_${protocol}_${versionTag}_${fromTokenAddress}_${toTokenAddress}_${pairSymbols}_${fee}`
}

/**
 * Parses a route multicall reference string into an object with the necessary information.
 *
 * @param reference - The reference string in the format `${dexTag}_${protocol}_${versionTag}_${fromToken.contractAddress}_${toToken.contractAddress}_${fromToken.symbol}_${toToken.symbol}`.
 * @returns An object containing the information extracted from the reference string.
 */
export function parseRouteMulticallReference(reference: string): {
  dexTag: DexTag
  protocol: DexProtocol
  versionTag: VersionTag
  fromTokenAddress?: Address
  toTokenAddress?: Address
  pairSymbols?: string
  feeTier?: FeeTier // V3 only
} {
  const parts = reference.split('_')
  const dexTag = parts[0] as DexTag | undefined
  const protocol = parts[1] as DexProtocol | undefined
  const versionTag = parts[2] as VersionTag | undefined
  const fromTokenAddress = parts[3] as Address | undefined
  const toTokenAddress = parts[4] as Address | undefined
  const pairSymbols = parts[5] as string | undefined

  assertDexTag(dexTag)
  assertProtocol(protocol)
  assertVersionTag(versionTag)

  const fee = parts?.[6]
  const feeTier = fee ? (parseInt(fee) as FeeTier) : undefined

  return {
    dexTag,
    protocol,
    versionTag,
    fromTokenAddress,
    toTokenAddress,
    pairSymbols,
    feeTier,
  }
}
