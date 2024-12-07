import type {
  ContractDetailsV2,
  ContractDetailsV3,
  DexConfigBase,
  Version,
  VersionTag,
} from '@dex-toolkit/types'
import type { DexProtocol } from '@dex-toolkit/types'

import { DexError, ErrorCodes } from '../errors'

/**
 * Type guard to check if a value is a Version object
 *
 * @param value - The value to check
 * @returns True if the value is a Version object
 */
export function isVersion(value: unknown): value is Version {
  if (!value || typeof value !== 'object') {
    return false
  }

  const v = value as Record<string, unknown>
  return (
    'major' in v &&
    'minor' in v &&
    'patch' in v &&
    typeof v.major === 'number' &&
    typeof v.minor === 'number' &&
    typeof v.patch === 'number'
  )
}

/**
 * Asserts that a given value is a valid Version object.
 *
 * @param value - The value to check.
 * @throws DexError if the value is undefined or not a valid Version object.
 */
export function assertVersion(value: unknown): asserts value is Version {
  if (value === undefined) {
    throw new DexError('Version is undefined', ErrorCodes.functionArgumentError)
  }
  if (!isVersion(value)) {
    throw new DexError(
      'Invalid version object',
      ErrorCodes.functionArgumentError,
    )
  }
}

/**
 * Type guard to check if a value is a VersionTag string
 *
 * @param value - The value to check
 * @returns True if the value is a VersionTag string
 */
export function isVersionTag(value: any): value is VersionTag {
  return typeof value === 'string' && /^\d+-\d+-\d+$/.test(value)
}

/**
 * Asserts that a given value is a valid VersionTag.
 *
 * @param value - The value to check.
 * @throws DexError if the value is undefined or not a valid VersionTag.
 */
export function assertVersionTag(value: any): asserts value is VersionTag {
  if (value === undefined) {
    throw new DexError(
      'Version tag is undefined',
      ErrorCodes.functionArgumentError,
    )
  }
  if (!isVersionTag(value)) {
    throw new DexError(
      `Invalid version tag: ${value}`,
      ErrorCodes.functionArgumentError,
    )
  }
}

/**
 * Converts a Version object into a standardized version tag string.
 * Format: "major-minor-patch"
 *
 * @param version - The version object containing major, minor, and patch numbers
 * @returns A string in the format "major-minor-patch"
 * @throws Error if version object is invalid
 *
 * @example
 * getVersionTagFromVersion({ major: 1, minor: 2, patch: 3 }) // returns "1-2-3"
 */
export function getVersionTagFromVersion(version: Version): VersionTag {
  if (!isVersion(version)) {
    throw new Error('Invalid version object')
  }
  return `${version.major}-${version.minor}-${version.patch}`
}

/**
 * Converts a version tag string into a Version object.
 * Format: "major-minor-patch"
 *
 * @param versionTag - The version tag string in the format "major-minor-patch"
 * @returns A Version object containing major, minor, and patch numbers
 * @throws Error if version tag is invalid
 *
 * @example
 * getVersionFromVersionTag("1-2-3") // returns { major: 1, minor: 2, patch: 3 }
 */
export function getVersionFromVersionTag(versionTag: VersionTag): Version {
  if (!isVersionTag(versionTag)) {
    throw new Error('Invalid version tag format')
  }

  const [major, minor, patch] = versionTag.split('-')

  if (!major || !minor || !patch) {
    throw new Error('Invalid version tag format')
  }

  return {
    major: parseInt(major),
    minor: parseInt(minor),
    patch: parseInt(patch),
  }
}

/**
 * Normalizes a Version or VersionTag into a Version object
 *
 * @param version - Either a Version object or VersionTag string
 * @returns A Version object
 * @throws Error if the input is invalid
 */
export function normalizeVersion(version: Version | VersionTag): Version {
  if (isVersion(version)) {
    return version
  }
  if (isVersionTag(version)) {
    return getVersionFromVersionTag(version)
  }
  throw new Error('Invalid version format')
}

/**
 * Compares two versions for equality. Accepts both Version objects and VersionTag strings.
 * Versions are considered equal if all their components (major, minor, patch) match.
 *
 * @param versionA - First version to compare (Version object or VersionTag string)
 * @param versionB - Second version to compare (Version object or VersionTag string)
 * @returns True if versions are identical, false otherwise
 *
 * @example
 * isSameVersion({ major: 1, minor: 0, patch: 0 }, "1-0-0") // returns true
 * isSameVersion("1-0-0", "1-0-1") // returns false
 */
export function isSameVersion(
  versionA: Version | VersionTag,
  versionB: Version | VersionTag,
): boolean {
  const normalizedA = normalizeVersion(versionA)
  const normalizedB = normalizeVersion(versionB)

  return (
    normalizedA.major === normalizedB.major &&
    normalizedA.minor === normalizedB.minor &&
    normalizedA.patch === normalizedB.patch
  )
}

/**
 * Checks if one version is greater than another using semantic versioning rules.
 * Accepts both Version objects and VersionTag strings.
 *
 * @param versionA - Version to check if greater (Version object or VersionTag string)
 * @param versionB - Version to check against (Version object or VersionTag string)
 * @returns True if versionA is greater than versionB, false otherwise
 */
export function isVersionGreaterThan(
  versionA: Version | VersionTag,
  versionB: Version | VersionTag,
): boolean {
  const normalizedA = normalizeVersion(versionA)
  const normalizedB = normalizeVersion(versionB)

  return (
    normalizedA.major > normalizedB.major ||
    (normalizedA.major === normalizedB.major &&
      normalizedA.minor > normalizedB.minor) ||
    (normalizedA.major === normalizedB.major &&
      normalizedA.minor === normalizedB.minor &&
      normalizedA.patch > normalizedB.patch)
  )
}

/**
 * Finds the highest version from an array of versions using semantic versioning rules.
 * Accepts both Version objects and VersionTag strings.
 *
 * @param versions - Array of versions to compare (can mix Version objects and VersionTag strings)
 * @returns The highest version as a Version object
 * @throws Error if the versions array is empty
 */
export function getLatestVersion(versions: (Version | VersionTag)[]): Version {
  if (!versions.length) {
    throw new Error('Versions array is empty')
  }

  const normalizedVersions = versions.map(normalizeVersion)
  return normalizedVersions.reduce((maxVersion, version) => {
    if (isVersionGreaterThan(maxVersion, version)) {
      return maxVersion
    }
    return version
  })
}

/**
 * Finds the most recent version from an array of contract details using semantic versioning rules.
 * Extracts versions from the contract details and compares them to find the highest version number.
 *
 * @param protocol - Object containing contract details with version tags as keys
 * @returns The highest version found as a {@link Version} object
 *
 * @throws Error if the protocol array is empty
 */
export function getLatestVersionFromProtocol(
  protocol: Record<VersionTag, ContractDetailsV2 | ContractDetailsV3>,
): Version {
  if (!protocol) {
    throw new Error('Contract details are empty')
  }

  const versionTags = Object.keys(protocol) as VersionTag[]

  return getLatestVersion(versionTags)
}

/**
 * Compares version strings or objects according to semver rules.
 * Returns negative if versionA < versionB, 0 if equal, positive if versionA > versionB
 *
 * @param versionA - First version to compare
 * @param versionB - Second version to compare
 * @returns Negative number if versionA < versionB, 0 if equal, positive if versionA > versionB
 */
export function compareVersions(
  versionA: Version | VersionTag,
  versionB: Version | VersionTag,
): number {
  const a = normalizeVersion(versionA)
  const b = normalizeVersion(versionB)

  if (a.major !== b.major) return a.major - b.major
  if (a.minor !== b.minor) return a.minor - b.minor
  return a.patch - b.patch
}

/**
 * Retrieves and sorts versions for a specific DEX protocol from a configuration.
 * Returns array of Version objects sorted by semantic version (lowest to highest).
 *
 * @param dexConfig - The base DEX configuration containing contract details
 * @param protocol - The DEX protocol version to get configurations for
 * @param asTag - If true, returns VersionTag strings instead of Version objects
 * @returns Sorted array of versions (as Version objects or VersionTag strings)
 */
export function getVersionsFromDexProtocol<T extends boolean = false>(
  dexConfig: DexConfigBase,
  protocol: DexProtocol,
  asTag?: T,
): T extends true ? VersionTag[] : Version[] {
  const contractDetails = dexConfig.protocols?.[protocol]

  if (!contractDetails) {
    throw new Error(`No contract details found for protocol: ${protocol}`)
  }

  const versionTags = Object.keys(contractDetails) as VersionTag[]

  if (asTag) {
    return versionTags as T extends true ? VersionTag[] : Version[]
  }

  return versionTags.map(getVersionFromVersionTag) as T extends true
    ? VersionTag[]
    : Version[]
}

/**
 * Creates a range of versions between start and end versions (inclusive).
 * Useful for checking if a version falls within a supported range.
 *
 * @param start - Starting version (inclusive)
 * @param end - Ending version (inclusive)
 * @returns Array of Version objects representing the range
 */
export function createVersionRange(
  start: Version | VersionTag,
  end: Version | VersionTag,
): Version[] {
  const startVer = normalizeVersion(start)
  const endVer = normalizeVersion(end)

  if (isVersionGreaterThan(startVer, endVer)) {
    throw new Error('Start version cannot be greater than end version')
  }

  const versions: Version[] = []
  const current = { ...startVer }

  while (!isVersionGreaterThan(current, endVer)) {
    versions.push({ ...current })
    current.patch++
    if (current.patch > 9) {
      current.patch = 0
      current.minor++
      if (current.minor > 9) {
        current.minor = 0
        current.major++
      }
    }
  }

  return versions
}

/**
 * Checks if a version falls within a version range (inclusive).
 *
 * @param version - Version to check
 * @param range - Object containing min and max versions
 * @returns True if version is within range, false otherwise
 */
export function isVersionInRange(
  version: Version | VersionTag,
  range: { min: Version | VersionTag; max: Version | VersionTag },
): boolean {
  const ver = normalizeVersion(version)
  const min = normalizeVersion(range.min)
  const max = normalizeVersion(range.max)

  return !isVersionGreaterThan(min, ver) && !isVersionGreaterThan(ver, max)
}

/**
 * Formats a version for display in logs and error messages using dot notation.
 * Converts either a Version object or VersionTag string into the format "major.minor.patch".
 *
 * @param version - Version to format (Version object or VersionTag string)
 * @returns A string in the format "major.minor.patch"
 *
 * @example
 * formatVersionForDisplay({ major: 1, minor: 2, patch: 3 }) // returns "1.2.3"
 * formatVersionForDisplay("1-2-3") // returns "1.2.3"
 *
 * // Usage in error messages:
 * throw new DexError(
 *   `Fee not found for dexTag ${dexTag} and version ${formatVersionForDisplay(version)}`,
 *   ErrorCodes.internalError
 * )
 */
export function formatVersionForDisplay(version: Version | VersionTag): string {
  const normalized = normalizeVersion(version)
  return `${normalized.major}.${normalized.minor}.${normalized.patch}`
}
