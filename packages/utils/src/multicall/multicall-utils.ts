import type { DexProtocol, DexTag, VersionTag } from '@dex-toolkit/types'

import { assertDexTag, assertProtocol } from '../utils/dex.utils'
import { assertVersionTag } from '../utils/version.utils'

/**
 * Creates a multicall reference string from the provided information.
 *
 * @param params - The parameters for creating the multicall reference.
 * @param params.dexTag - The dex tag.
 * @param params.protocol - The protocol of the DEX (v2, v3, etc.).
 * @param params.versionTag - The version represented as a string.
 * @returns The reference string.
 */
export function createMulticallReference({
  prefix,
  dexTag,
  protocol,
  versionTag,
}: {
  prefix: string
  dexTag: DexTag
  protocol: DexProtocol
  versionTag: VersionTag
}): string {
  return `${prefix}_${dexTag}_${protocol}_${versionTag}`
}

/**
 * Parses a multicall reference string into an object with the necessary information.
 *
 * @param reference - The reference string in the format `${prefix}_${dexTag}_${protocol}_${versionTag}`.
 * @returns An object containing the information extracted from the reference string.
 */
export function parseMulticallReference(reference: string): {
  prefix?: string
  dexTag: DexTag
  protocol: DexProtocol
  versionTag: VersionTag
} {
  const parts = reference.split('_')
  const prefix = parts[0]
  const dexTag = parts[1] as DexTag | undefined
  const protocol = parts[2] as DexProtocol | undefined
  const versionTag = parts[3] as VersionTag | undefined

  assertDexTag(dexTag)
  assertProtocol(protocol)
  assertVersionTag(versionTag)

  return {
    prefix,
    dexTag,
    protocol,
    versionTag,
  }
}
