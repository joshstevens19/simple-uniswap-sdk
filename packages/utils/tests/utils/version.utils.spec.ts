import type { Version, VersionTag } from '@dex-toolkit/types'
import type { ContractDetailsV2, ContractDetailsV3 } from '@dex-toolkit/types'
import { describe, it, expect } from 'vitest'

import { MockDexConfig } from '../../../../test/testing-setup/src/mocks/mocks'
import {
  isVersion,
  isVersionTag,
  getVersionTagFromVersion,
  getVersionFromVersionTag,
  normalizeVersion,
  isSameVersion,
  isVersionGreaterThan,
  getLatestVersion,
  getLatestVersionFromProtocol,
  compareVersions,
  getVersionsFromDexProtocol,
  createVersionRange,
  isVersionInRange,
  formatVersionForDisplay,
} from '../../src/utils/version.utils'

describe('Version Utils', () => {
  const validVersion: Version = { major: 1, minor: 2, patch: 3 }
  const validVersionTag: VersionTag = '1-2-3'
  const invalidVersion = { major: '1', minor: 2, patch: 3 }
  const invalidVersionTag = '1.2.3'

  describe('isVersion', () => {
    it('should return true for valid Version objects', () => {
      expect(isVersion(validVersion)).toBe(true)
      expect(isVersion({ major: 0, minor: 0, patch: 0 })).toBe(true)
      expect(isVersion({ major: 1, minor: 0, patch: 5, extra: 'field' })).toBe(
        true,
      )
    })

    it('should return false for invalid Version objects', () => {
      expect(isVersion({ minor: 2, patch: 3 })).toBe(false) // missing major
      expect(isVersion({ major: '1', minor: 2, patch: 3 })).toBe(false) // wrong type
      expect(isVersion({ major: 1, minor: '2', patch: 3 })).toBe(false) // wrong type
      expect(isVersion({ major: 1, minor: 2, patch: '3' })).toBe(false) // wrong type
    })

    it('should return false for null/undefined/non-objects', () => {
      expect(isVersion(null)).toBe(false)
      expect(isVersion(undefined)).toBe(false)
      expect(isVersion('1-2-3')).toBe(false)
      expect(isVersion(123)).toBe(false)
      expect(isVersion([])).toBe(false)
      expect(isVersion(true)).toBe(false)
    })
  })

  describe('isVersionTag', () => {
    it('should return true for valid VersionTag strings', () => {
      expect(isVersionTag(validVersionTag)).toBe(true)
      expect(isVersionTag('0-0-1')).toBe(true)
      expect(isVersionTag('10-20-30')).toBe(true)
    })

    it('should return false for invalid VersionTag strings', () => {
      expect(isVersionTag(invalidVersionTag)).toBe(false)
      expect(isVersionTag('1-2')).toBe(false)
      expect(isVersionTag('1-2-')).toBe(false)
      expect(isVersionTag('-1-2')).toBe(false)
      expect(isVersionTag('1-2-3-4')).toBe(false)
      expect(isVersionTag('abc')).toBe(false)
      expect(isVersionTag('')).toBe(false)
    })

    it('should return false for non-strings', () => {
      expect(isVersionTag(null)).toBe(false)
      expect(isVersionTag(undefined)).toBe(false)
      expect(isVersionTag(123)).toBe(false)
      expect(isVersionTag({})).toBe(false)
      expect(isVersionTag([])).toBe(false)
      expect(isVersionTag(true)).toBe(false)
    })
  })

  describe('getVersionTagFromVersion', () => {
    it('should convert Version to VersionTag', () => {
      expect(getVersionTagFromVersion(validVersion)).toBe(validVersionTag)
    })

    it('should throw error for invalid Version', () => {
      expect(() =>
        getVersionTagFromVersion(invalidVersion as unknown as Version),
      ).toThrow()
    })
  })

  describe('getVersionFromVersionTag', () => {
    it('should convert VersionTag to Version', () => {
      expect(getVersionFromVersionTag(validVersionTag)).toEqual(validVersion)
    })

    it('should throw error for invalid VersionTag', () => {
      expect(() =>
        getVersionFromVersionTag(invalidVersionTag as VersionTag),
      ).toThrow()
    })
  })

  describe('normalizeVersion', () => {
    it('should handle Version objects', () => {
      expect(normalizeVersion(validVersion)).toEqual(validVersion)
    })

    it('should handle VersionTag strings', () => {
      expect(normalizeVersion(validVersionTag)).toEqual(validVersion)
    })

    it('should throw error for invalid input', () => {
      expect(() => normalizeVersion(invalidVersionTag as VersionTag)).toThrow()
    })
  })

  describe('isSameVersion', () => {
    it('should correctly compare equal versions', () => {
      expect(isSameVersion(validVersion, validVersionTag)).toBe(true)
      expect(isSameVersion(validVersionTag, validVersion)).toBe(true)
    })

    it('should correctly compare different versions', () => {
      expect(isSameVersion(validVersion, '2-2-3')).toBe(false)
    })
  })

  describe('isVersionGreaterThan', () => {
    it('should correctly compare versions', () => {
      expect(isVersionGreaterThan('2-0-0', '1-9-9')).toBe(true)
      expect(isVersionGreaterThan('1-2-3', '1-2-4')).toBe(false)
      expect(isVersionGreaterThan('1-3-0', '1-2-9')).toBe(true)
    })
  })

  describe('getLatestVersion', () => {
    it('should find the highest version', () => {
      const versions: VersionTag[] = ['1-0-0', '2-0-0', '1-5-0']
      expect(getLatestVersion(versions)).toEqual({
        major: 2,
        minor: 0,
        patch: 0,
      })
    })

    it('should throw error for empty array', () => {
      expect(() => getLatestVersion([])).toThrow()
    })
  })

  describe('getLatestVersionFromProtocol', () => {
    it('should find the latest version from protocol', () => {
      const protocol = {
        '1-0-0': {} as ContractDetailsV2,
        '2-0-0': {} as ContractDetailsV3,
        '1-5-0': {} as ContractDetailsV2,
      }
      expect(getLatestVersionFromProtocol(protocol)).toEqual({
        major: 2,
        minor: 0,
        patch: 0,
      })
    })

    it('should throw error for empty protocol', () => {
      expect(() => getLatestVersionFromProtocol({})).toThrow()
    })
  })

  describe('compareVersions', () => {
    it('should correctly compare versions', () => {
      expect(compareVersions('1-0-0', '2-0-0')).toBeLessThan(0)
      expect(compareVersions('2-0-0', '1-0-0')).toBeGreaterThan(0)
      expect(compareVersions('1-0-0', '1-0-0')).toBe(0)
    })
  })

  describe('getVersionsFromDexProtocol', () => {
    it('should get versions from dex protocol', () => {
      expect(getVersionsFromDexProtocol(MockDexConfig, 'protocolV2')).toEqual([
        { major: 1, minor: 0, patch: 0 },
        { major: 2, minor: 0, patch: 0 },
      ])
    })

    it('should return version tags when asTag is true', () => {
      expect(
        getVersionsFromDexProtocol(MockDexConfig, 'protocolV2', true),
      ).toEqual(['1-0-0', '2-0-0'])
    })

    it('should throw error for invalid protocol', () => {
      const dexConfig = { ...MockDexConfig, protocols: {} }
      expect(() =>
        getVersionsFromDexProtocol(dexConfig, 'protocolV2'),
      ).toThrow()
    })
  })

  describe('createVersionRange', () => {
    it('should create correct version range', () => {
      const range = createVersionRange('1-0-0', '1-0-2')
      expect(range).toEqual([
        { major: 1, minor: 0, patch: 0 },
        { major: 1, minor: 0, patch: 1 },
        { major: 1, minor: 0, patch: 2 },
      ])
    })

    it('should throw error for invalid range', () => {
      expect(() => createVersionRange('2-0-0', '1-0-0')).toThrow()
    })
  })

  describe('isVersionInRange', () => {
    it('should correctly check if version is in range', () => {
      const range = { min: '1-0-0', max: '2-0-0' } as {
        min: VersionTag
        max: VersionTag
      }
      expect(isVersionInRange('1-5-0', range)).toBe(true)
      expect(isVersionInRange('0-9-9', range)).toBe(false)
      expect(isVersionInRange('2-1-0', range)).toBe(false)
    })
  })

  describe('formatVersionForDisplay', () => {
    it('should format version correctly', () => {
      expect(formatVersionForDisplay(validVersion)).toBe('1.2.3')
      expect(formatVersionForDisplay(validVersionTag)).toBe('1.2.3')
    })

    it('should throw error for invalid version', () => {
      expect(() =>
        formatVersionForDisplay(invalidVersionTag as VersionTag),
      ).toThrow()
    })
  })
})
