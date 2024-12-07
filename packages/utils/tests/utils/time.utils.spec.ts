import { describe, it, expect } from 'vitest'

import {
  generateDeadlineUnixTime,
  getCurrentUnixTime,
  getUnixTime,
} from '../..'

describe('time.utils', () => {
  describe('generateDeadlineUnixTime', () => {
    it('should generate the correct deadline unix time based on current time', () => {
      const deadlineMinutes = 30
      const currentUnixTime = getCurrentUnixTime()
      const generatedDeadlineUnixTime =
        generateDeadlineUnixTime(deadlineMinutes)

      expect(generatedDeadlineUnixTime).toBeGreaterThan(currentUnixTime)
      expect(generatedDeadlineUnixTime).toBeLessThanOrEqual(
        currentUnixTime + deadlineMinutes * 60,
      )
    })

    it('should generate the correct deadline unix time when given a specific minute count', () => {
      const deadlineMinutes = 10
      const expectedDeadline = getCurrentUnixTime() + deadlineMinutes * 60
      const actualDeadline = generateDeadlineUnixTime(deadlineMinutes)

      expect(actualDeadline).toEqual(expectedDeadline)
    })
  })

  describe('getUnixTime', () => {
    it('should getUnixTime correctly', () => {
      const result = getUnixTime(new Date('2015-03-25'))
      expect(result).toEqual(1427241600)
    })
  })

  describe('getCurrentUnixTime', () => {
    it('should getCurrentUnixTime correctly', () => {
      const result = getCurrentUnixTime()
      expect(typeof result).toEqual('number')
    })
  })
})
