/**
 * Represents the version of a DEX or token list.
 */
export type Version = {
  /** The major version number. */
  major: number
  /** The minor version number. */
  minor: number
  /** The patch version number. */
  patch: number
}

/**
 * Represents a version or the string "latest" to indicate the latest version.
 */
export type VersionOrLatest = Version | 'latest'

/** Represents a version tag in the format of "major-minor-patch". */
export type VersionTag =
  `${Version['major']}-${Version['minor']}-${Version['patch']}`
