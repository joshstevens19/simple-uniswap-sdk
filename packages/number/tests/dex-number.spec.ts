import type { DexNumberUnit } from '@dex-toolkit/types'
import { BigNumber as EthersBigNumber } from '@ethersproject/bignumber'
import BigNumber from 'bignumber.js'
import { describe, it, expect } from 'vitest'

import { MAX_HEX_STRING } from '../../utils/src/utils/constants'
import {
  DexNumber,
  dexNumberUnits,
  parseDecimals,
  parseValue,
} from '../src/dex-number'

/**
 * BN is a clone of BigNumber with a higher precision
 */
const BN = BigNumber.clone({
  DECIMAL_PLACES: 60,
  ROUNDING_MODE: BigNumber.ROUND_DOWN,
  EXPONENTIAL_AT: [-1e9, 1e9],
})

describe('DexNumber', () => {
  const DECIMALS_18 = 18
  const DECIMALS_8 = 8

  describe('Utility Functions', () => {
    describe('parseValue', () => {
      it('should handle hex strings', () => {
        const value = '0x123'
        const result = parseValue(value)
        expect(result).toEqual('291')
      })

      it('should handle EthersBigNumber instances', () => {
        const value = EthersBigNumber.from(456)
        const result = parseValue(value)
        expect(result).toEqual('456')
      })

      it('should handle other BigNumber.Value types', () => {
        const value = 123.45
        const result = parseValue(value)
        expect(result).toEqual(123.45)
      })
    })

    describe('parseDecimals', () => {
      it('should handle undefined, null, or empty string', () => {
        expect(parseDecimals(undefined)).toEqual(0)
        expect(parseDecimals(null as any)).toEqual(0)
        expect(parseDecimals('')).toEqual(0)
      })

      it('should handle hex strings', () => {
        const decimals = '0x12'
        const result = parseDecimals(decimals)
        expect(result).toEqual(18)
      })

      it('should handle EthersBigNumber instances', () => {
        const decimals = EthersBigNumber.from(9)
        const result = parseDecimals(decimals)
        expect(result).toEqual(9)
      })

      it('should handle BigNumber.js instances', () => {
        const decimals = new BigNumber(6)
        const result = parseDecimals(decimals)
        expect(result).toEqual(6)
      })

      it('should handle numbers', () => {
        const decimals = 18
        const result = parseDecimals(decimals)
        expect(result).toEqual(18)
      })

      it('should handle DexNumberUnit strings', () => {
        const decimals = 'gwei'
        const result = parseDecimals(decimals)
        expect(result).toEqual(9)
      })

      it('should throw error for invalid input', () => {
        expect(() => parseDecimals('invalid' as any)).toThrow(
          `Invalid decimals value 'invalid' with type 'string'. Must be a number, BigNumber.Value, or one of (${dexNumberUnits.join(', ')})`,
        )
      })
    })
  })

  // Initialization Tests
  describe('Initialization', () => {
    it('should throw error when invalid unit string is passed', () => {
      expect(() => DexNumber.fromUnshifted('1', 'invalid-unit' as any)).toThrow(
        `Invalid decimals value 'invalid-unit' with type 'string'. Must be a number, BigNumber.Value, or one of (wei, kwei, mwei, gwei, szabo, finney, ether)`,
      )
    })

    it('should initialize correctly with shifting using string-based decimals', () => {
      const bigNum = DexNumber.fromUnshifted('1', 'ether').shift()
      expect(bigNum.shiftedState).toEqual('shifted')
      expect(bigNum.toFixed()).toEqual('1000000000000000000')
    })

    it('should initialize correctly with an unshifted value', () => {
      const bigNum = DexNumber.fromShifted(
        '1000000000000000000',
        DECIMALS_18,
      ).unshift()
      expect(bigNum.shiftedState).toEqual('unshifted')
      expect(bigNum.toFixed()).toEqual('1')
    })

    describe('Initialization with Units', () => {
      const testCases: { unit: DexNumberUnit; decimals: number }[] = [
        { unit: 'wei', decimals: 0 },
        { unit: 'kwei', decimals: 3 },
        { unit: 'mwei', decimals: 6 },
        { unit: 'gwei', decimals: 9 },
        { unit: 'szabo', decimals: 12 },
        { unit: 'finney', decimals: 15 },
        { unit: 'ether', decimals: 18 },
      ]

      testCases.forEach(({ unit, decimals }) => {
        it(`should initialize correctly with decimals as a unit string (${unit})`, () => {
          const bigNum = DexNumber.fromUnshifted('1', unit)
          expect(bigNum.decimals).toEqual(decimals)
          expect(bigNum.shiftedState).toEqual('unshifted')
          expect(bigNum.toWeiString()).toEqual('1' + '0'.repeat(decimals))
        })

        it(`should initialize correctly with decimals as a unit string (${unit})`, () => {
          const bigNum = DexNumber.fromShifted('1' + '0'.repeat(decimals), unit)
          expect(bigNum.decimals).toEqual(decimals)
          expect(bigNum.shiftedState).toEqual('shifted')
          expect(bigNum.toFixed()).toEqual('1' + '0'.repeat(decimals))
          expect(bigNum.unshift().toFixed()).toEqual('1')
        })
      })

      it('should throw error when invalid unit string is passed', () => {
        expect(() =>
          DexNumber.fromUnshifted('1', 'invalid-unit' as any),
        ).toThrow(
          `Invalid decimals value 'invalid-unit' with type 'string'. Must be a number, BigNumber.Value, or one of (${dexNumberUnits.join(', ')})`,
        )
      })
    })
  })

  describe('State Management', () => {
    it('should correctly identify shifted state', () => {
      const shifted = DexNumber.fromShifted('1', DECIMALS_18)
      expect(shifted.isShifted()).toBe(true)
      expect(shifted.isUnshifted()).toBe(false)
      expect(shifted.isNeutral()).toBe(false)
    })

    it('should correctly identify unshifted state', () => {
      const unshifted = DexNumber.fromUnshifted('1', DECIMALS_18)
      expect(unshifted.isShifted()).toBe(false)
      expect(unshifted.isUnshifted()).toBe(true)
      expect(unshifted.isNeutral()).toBe(false)
    })

    // it('should correctly identify neutral state', () => {
    //   const neutral = new DexNumber(_constructorGuard, '1', DECIMALS_18);
    //   expect(neutral.isShifted()).toBe(false);
    //   expect(neutral.isUnshifted()).toBe(false);
    //   expect(neutral.isNeutral()).toBe(true);
    // });

    it('should clone correctly', () => {
      const original = DexNumber.fromUnshifted('1.2345', DECIMALS_18)
      const cloned = original.clone()
      expect(cloned.toFixed()).toEqual('1.2345')
      expect(cloned.shiftedState).toEqual('unshifted')
      expect(cloned).not.toBe(original) // Ensure it's a new instance
    })

    describe('normalizeToBigNumber', () => {
      it('should handle DexNumber with same decimals', () => {
        const num1 = DexNumber.fromUnshifted('1.23', DECIMALS_18)
        const num2 = DexNumber.fromShifted('456000000000000000000', DECIMALS_18) // 456.0
        const { base, other, decimalDifference } =
          num1.normalizeToBigNumber(num2)
        expect(base.toFixed()).toEqual('1230000000000000000')
        expect(other.toFixed()).toEqual('456000000000000000000')
        expect(decimalDifference).toEqual(0)
      })

      it('should handle DexNumber with different decimals', () => {
        const num1 = DexNumber.fromUnshifted('1.23', DECIMALS_18)
        const num2 = DexNumber.fromShifted('456000000', DECIMALS_8)
        const { base, other, decimalDifference } =
          num1.normalizeToBigNumber(num2)
        expect(base.toFixed()).toEqual('1230000000000000000')
        expect(other.toFixed()).toEqual('4560000000000000000')
        expect(decimalDifference).toEqual(10)
      })

      it('should handle non-DexNumber values', () => {
        const num1 = DexNumber.fromUnshifted('1.23', DECIMALS_18)
        const num2 = '456'
        const { base, other, decimalDifference } =
          num1.normalizeToBigNumber(num2)
        expect(base.toFixed()).toEqual('1230000000000000000')
        expect(other.toFixed()).toEqual('456000000000000000000')
        expect(decimalDifference).toEqual(18)
      })
    })

    it('should create result with correct state', () => {
      const num = DexNumber.fromShifted('1230000000000000000', DECIMALS_18)
      const result = new BN('456')
      const created = num.createResult(result, DECIMALS_18)
      expect(created instanceof DexNumber).toBe(true)
      expect(created.toFixed()).toEqual('456')
      expect(created.shiftedState).toEqual('shifted')
    })
  })

  // Shifting and Unshifting Tests
  describe('Shifting and Unshifting', () => {
    it('should shift a DexNumber by the stored decimals', () => {
      const bigNum = DexNumber.fromUnshifted('1', DECIMALS_18).shift()
      expect(bigNum.shiftedState).toEqual('shifted')
      expect(bigNum.toFixed()).toEqual('1000000000000000000')
    })

    it('should unshift a DexNumber back to its human-readable format', () => {
      const bigNum = DexNumber.fromShifted('1000000000000000000', DECIMALS_18)
      const unshifted = bigNum.unshift()
      expect(unshifted.shiftedState).toEqual('unshifted')
      expect(unshifted.toFixed()).toEqual('1')
    })

    it('should not shift if already shifted', () => {
      const bigNum = DexNumber.fromUnshifted('1', DECIMALS_18)
      const shifted = bigNum.shift().shift()
      expect(shifted.shiftedState).toEqual('shifted')
      expect(shifted.toFixed()).toEqual('1000000000000000000')
    })

    it('should not unshift if already unshifted', () => {
      const bigNum = DexNumber.fromShifted('1000000000000000000', DECIMALS_18)
      const unshifted = bigNum.unshift().unshift().unshift()
      expect(unshifted.shiftedState).toEqual('unshifted')
      expect(unshifted.toFixed()).toEqual('1')
    })

    it('should throw an error if initialized with a NaN value', () => {
      expect(() => DexNumber.fromUnshifted('abc', DECIMALS_18)).toThrow(
        'Invalid number',
      )
    })
  })

  // Getters Tests
  describe('Getters', () => {
    it('should return the correct shifted state', () => {
      const shifted = DexNumber.fromShifted('1', DECIMALS_18)
      expect(shifted.shiftedState).toEqual('shifted')
    })

    it('should return the correct decimals', () => {
      const num = DexNumber.fromUnshifted('1', DECIMALS_18)
      expect(num.decimals).toEqual(DECIMALS_18)
    })
  })

  // Comparison Methods Tests
  describe('Comparison Methods', () => {
    const num1 = DexNumber.fromUnshifted('1', DECIMALS_18)
    const num2 = DexNumber.fromUnshifted('2', DECIMALS_18)

    it('should correctly compare two DexNumbers', () => {
      expect(num1.comparedTo(num2)).toEqual(-1)
      expect(num2.comparedTo(num1)).toEqual(1)
      expect(num1.comparedTo(num1)).toEqual(0)
    })

    it('should correctly check equality', () => {
      expect(num1.eq(num1)).toEqual(true)
      expect(num1.isEqualTo(num1)).toEqual(true)
      expect(num1.eq(num2)).toEqual(false)
    })

    it('should correctly check greater than', () => {
      expect(num2.gt(num1)).toEqual(true)
      expect(num2.isGreaterThan(num1)).toEqual(true)
      expect(num1.gt(num2)).toEqual(false)
    })

    it('should correctly check greater than or equal to', () => {
      expect(num2.gte(num1)).toEqual(true)
      expect(num2.isGreaterThanOrEqualTo(num1)).toEqual(true)
      expect(num1.gte(num1)).toEqual(true)
    })

    it('should correctly check less than', () => {
      expect(num1.lt(num2)).toEqual(true)
      expect(num1.isLessThan(num2)).toEqual(true)
      expect(num2.lt(num1)).toEqual(false)
    })

    it('should correctly check less than or equal to', () => {
      expect(num1.lte(num2)).toEqual(true)
      expect(num1.isLessThanOrEqualTo(num2)).toEqual(true)
      expect(num1.lte(num1)).toEqual(true)
    })
  })

  // Arithmetic Methods Tests
  describe('Arithmetic Methods', () => {
    describe('Same Decimals (18)', () => {
      describe('Shifted/Shifted', () => {
        it('should add whole numbers correctly', () => {
          const num1 = DexNumber.fromShifted('1000000000000000000', DECIMALS_18)
          const num2 = DexNumber.fromShifted('2000000000000000000', DECIMALS_18)

          expect(num1.shiftedState).toEqual('shifted')
          expect(num2.shiftedState).toEqual('shifted')

          const result = num1.plus(num2)
          expect(result.shiftedState).toEqual('shifted')
          expect(result.toFixed()).toEqual('3000000000000000000')
          const unshifted = result.unshift()
          expect(unshifted.shiftedState).toEqual('unshifted')
          expect(unshifted.toFixed()).toEqual('3')
        })

        it('should add fractional numbers correctly', () => {
          const num1 = DexNumber.fromShifted('1500000000000000000', DECIMALS_18)
          const num2 = DexNumber.fromShifted('2500000000000000000', DECIMALS_18)
          const result = num1.plus(num2)
          expect(result.shiftedState).toEqual('shifted')
          expect(result.toFixed()).toEqual('4000000000000000000')
          expect(result.unshift().toFixed()).toEqual('4')
        })

        it('should subtract whole numbers correctly', () => {
          const num1 = DexNumber.fromShifted('2000000000000000000', DECIMALS_18)
          const num2 = DexNumber.fromShifted('1000000000000000000', DECIMALS_18)

          expect(num1.shiftedState).toEqual('shifted')
          expect(num2.shiftedState).toEqual('shifted')

          const result = num1.minus(num2)
          expect(result.shiftedState).toEqual('shifted')
          expect(result.toFixed()).toEqual('1000000000000000000')
          const unshifted = result.unshift()
          expect(unshifted.shiftedState).toEqual('unshifted')
          expect(unshifted.toFixed()).toEqual('1')
        })

        it('should subtract fractional numbers correctly', () => {
          const num1 = DexNumber.fromShifted('2500000000000000000', DECIMALS_18)
          const num2 = DexNumber.fromShifted('1500000000000000000', DECIMALS_18)
          const result = num1.minus(num2)
          expect(result.shiftedState).toEqual('shifted')
          expect(result.toFixed()).toEqual('1000000000000000000')
          expect(result.unshift().toFixed()).toEqual('1')
        })

        it('should multiply whole numbers correctly', () => {
          const num1 = DexNumber.fromShifted('2000000000000000000', DECIMALS_18)
          const num2 = DexNumber.fromShifted('3000000000000000000', DECIMALS_18)

          const result = num1.multipliedBy(num2)
          expect(result.shiftedState).toEqual('shifted')
          expect(result.toWeiString()).toEqual('6000000000000000000')
          const unshifted = result.unshift()
          expect(unshifted.shiftedState).toEqual('unshifted')
          expect(unshifted.toFixed()).toEqual('6')
        })

        it('should multiply fractional numbers correctly', () => {
          const num1 = DexNumber.fromShifted('1500000000000000000', DECIMALS_18)
          const num2 = DexNumber.fromShifted('2500000000000000000', DECIMALS_18)
          const result = num1.multipliedBy(num2)
          expect(result.shiftedState).toEqual('shifted')
          expect(result.toFixed()).toEqual('3750000000000000000')
          expect(result.unshift().toFixed()).toEqual('3.75')
        })

        it('should divide whole numbers correctly', () => {
          const num1 = DexNumber.fromShifted('3000000000000000000', DECIMALS_18)
          const num2 = DexNumber.fromShifted('2000000000000000000', DECIMALS_18)

          const result = num1.dividedBy(num2)
          expect(result.shiftedState).toEqual('shifted')
          expect(result.toFixed()).toEqual('1500000000000000000')
          const unshifted = result.unshift()
          expect(unshifted.shiftedState).toEqual('unshifted')
          expect(unshifted.toFixed()).toEqual('1.5')
        })

        it('should divide fractional numbers correctly', () => {
          const num1 = DexNumber.fromShifted('2500000000000000000', DECIMALS_18)
          const num2 = DexNumber.fromShifted('1500000000000000000', DECIMALS_18)
          const result = num1.dividedBy(num2)
          expect(result.shiftedState).toEqual('shifted')
          // Result is 1.666... with repeating 6, so round down to 18 decimals
          expect(result.toFixed()).toEqual('1666666666666666666')
          expect(result.unshift().toDecimalString()).toEqual(
            '1.666666666666666666',
          )
        })
      })

      describe('Unshifted/Unshifted', () => {
        it('should add whole numbers correctly', () => {
          const num1 = DexNumber.fromUnshifted('1', DECIMALS_18)
          const num2 = DexNumber.fromUnshifted('2', DECIMALS_18)
          const result = num1.plus(num2)
          expect(result.shiftedState).toEqual('unshifted')
          expect(result.toFixed()).toEqual('3')
          expect(result.toWeiString()).toEqual('3000000000000000000')
        })

        it('should add fractional numbers correctly', () => {
          const num1 = DexNumber.fromUnshifted('1.5', DECIMALS_18)
          const num2 = DexNumber.fromUnshifted('2.5', DECIMALS_18)
          const result = num1.plus(num2)
          expect(result.shiftedState).toEqual('unshifted')
          expect(result.toFixed()).toEqual('4')
          expect(result.toWeiString()).toEqual('4000000000000000000')
        })

        it('should subtract whole numbers correctly', () => {
          const num1 = DexNumber.fromUnshifted('2', DECIMALS_18)
          const num2 = DexNumber.fromUnshifted('1', DECIMALS_18)
          const result = num1.minus(num2)
          expect(result.shiftedState).toEqual('unshifted')
          expect(result.toFixed()).toEqual('1')
          expect(result.toWeiString()).toEqual('1000000000000000000')
        })

        it('should subtract fractional numbers correctly', () => {
          const num1 = DexNumber.fromUnshifted('2.5', DECIMALS_18)
          const num2 = DexNumber.fromUnshifted('1.5', DECIMALS_18)
          const result = num1.minus(num2)
          expect(result.shiftedState).toEqual('unshifted')
          expect(result.toFixed()).toEqual('1')
          expect(result.toWeiString()).toEqual('1000000000000000000')
        })

        it('should multiply whole numbers correctly', () => {
          const num1 = DexNumber.fromUnshifted('2', DECIMALS_18)
          const num2 = DexNumber.fromUnshifted('3', DECIMALS_18)

          const result = num1.multipliedBy(num2)
          expect(result.shiftedState).toEqual('unshifted')
          expect(result.toFixed()).toEqual('6')
          expect(result.toWeiString()).toEqual('6000000000000000000')
        })

        it('should multiply fractional numbers correctly', () => {
          const num1 = DexNumber.fromUnshifted('1.5', DECIMALS_18)
          const num2 = DexNumber.fromUnshifted('2.5', DECIMALS_18)
          const result = num1.multipliedBy(num2)
          expect(result.shiftedState).toEqual('unshifted')
          expect(result.toFixed()).toEqual('3.75')
          expect(result.toWeiString()).toEqual('3750000000000000000')
        })

        it('should divide whole numbers correctly', () => {
          const num1 = DexNumber.fromUnshifted('3', DECIMALS_18)
          const num2 = DexNumber.fromUnshifted('2', DECIMALS_18)

          const result = num1.dividedBy(num2)
          expect(result.shiftedState).toEqual('unshifted')
          expect(result.toFixed()).toEqual('1.5')
          expect(result.toWeiString()).toEqual('1500000000000000000')
        })

        it('should divide fractional numbers correctly', () => {
          const num1 = DexNumber.fromUnshifted('2.5', DECIMALS_18)
          const num2 = DexNumber.fromUnshifted('1.5', DECIMALS_18)
          const result = num1.dividedBy(num2)
          expect(result.shiftedState).toEqual('unshifted')
          expect(result.toDecimalString()).toEqual('1.666666666666666666')
          expect(result.toWeiString()).toEqual('1666666666666666666')
        })
      })

      describe('Shifted/Unshifted', () => {
        it('should add whole numbers correctly', () => {
          const num1 = DexNumber.fromShifted('1000000000000000000', DECIMALS_18)
          const num2 = DexNumber.fromUnshifted('2', DECIMALS_18)
          const result = num1.plus(num2)
          expect(result.shiftedState).toEqual('shifted')
          expect(result.toFixed()).toEqual('3000000000000000000')
          expect(result.unshift().toFixed()).toEqual('3')
        })

        it('should add fractional numbers correctly', () => {
          const num1 = DexNumber.fromShifted('1500000000000000000', DECIMALS_18)
          const num2 = DexNumber.fromUnshifted('2.5', DECIMALS_18)
          const result = num1.plus(num2)
          expect(result.shiftedState).toEqual('shifted')
          expect(result.toFixed()).toEqual('4000000000000000000')
          expect(result.unshift().toFixed()).toEqual('4')
        })

        it('should subtract whole numbers correctly', () => {
          const num1 = DexNumber.fromShifted('2000000000000000000', DECIMALS_18)
          const num2 = DexNumber.fromUnshifted('1', DECIMALS_18)
          const result = num1.minus(num2)
          expect(result.shiftedState).toEqual('shifted')
          expect(result.toFixed()).toEqual('1000000000000000000')
          expect(result.unshift().toFixed()).toEqual('1')
        })

        it('should subtract fractional numbers correctly', () => {
          const num1 = DexNumber.fromShifted('2500000000000000000', DECIMALS_18)
          const num2 = DexNumber.fromUnshifted('1.5', DECIMALS_18)
          const result = num1.minus(num2)
          expect(result.shiftedState).toEqual('shifted')
          expect(result.toFixed()).toEqual('1000000000000000000')
          expect(result.unshift().toFixed()).toEqual('1')
        })

        it('should multiply whole numbers correctly', () => {
          const num1 = DexNumber.fromShifted('2000000000000000000', DECIMALS_18)
          const num2 = DexNumber.fromUnshifted('3', DECIMALS_18)

          const result = num1.multipliedBy(num2)
          expect(result.shiftedState).toEqual('shifted')
          expect(result.toFixed()).toEqual('6000000000000000000')
          const unshifted = result.unshift()
          expect(unshifted.shiftedState).toEqual('unshifted')
          expect(unshifted.toFixed()).toEqual('6')
        })

        it('should multiply fractional numbers correctly', () => {
          const num1 = DexNumber.fromShifted('1500000000000000000', DECIMALS_18)
          const num2 = DexNumber.fromUnshifted('2.5', DECIMALS_18)
          const result = num1.multipliedBy(num2)
          expect(result.shiftedState).toEqual('shifted')
          expect(result.toFixed()).toEqual('3750000000000000000')
          expect(result.unshift().toFixed()).toEqual('3.75')
        })

        it('should divide whole numbers correctly', () => {
          const num1 = DexNumber.fromShifted('3000000000000000000', DECIMALS_18)
          const num2 = DexNumber.fromUnshifted('2', DECIMALS_18)

          const result = num1.dividedBy(num2)
          expect(result.shiftedState).toEqual('shifted')
          expect(result.toFixed()).toEqual('1500000000000000000')
          const unshifted = result.unshift()
          expect(unshifted.shiftedState).toEqual('unshifted')
          expect(unshifted.toFixed()).toEqual('1.5')
        })

        it('should divide fractional numbers correctly', () => {
          const num1 = DexNumber.fromShifted('2500000000000000000', DECIMALS_18)
          const num2 = DexNumber.fromUnshifted('1.5', DECIMALS_18)
          const result = num1.dividedBy(num2)
          expect(result.shiftedState).toEqual('shifted')
          // Result is 1.666... with repeating 6, so round down to 18 decimals
          expect(result.toFixed()).toEqual('1666666666666666666')
          expect(result.unshift().toDecimalString()).toEqual(
            '1.666666666666666666',
          )
        })
      })

      describe('Unshifted/Shifted', () => {
        it('should add whole numbers correctly', () => {
          const num1 = DexNumber.fromUnshifted('1', DECIMALS_18)
          const num2 = DexNumber.fromShifted('2000000000000000000', DECIMALS_18)
          const result = num1.plus(num2)
          expect(result.shiftedState).toEqual('unshifted')
          expect(result.toFixed()).toEqual('3')
          expect(result.toWeiString()).toEqual('3000000000000000000')
        })

        it('should add fractional numbers correctly', () => {
          const num1 = DexNumber.fromUnshifted('1.5', DECIMALS_18)
          const num2 = DexNumber.fromShifted('2500000000000000000', DECIMALS_18)
          const result = num1.plus(num2)
          expect(result.shiftedState).toEqual('unshifted')
          expect(result.toFixed()).toEqual('4')
          expect(result.toWeiString()).toEqual('4000000000000000000')
        })

        it('should subtract whole numbers correctly', () => {
          const num1 = DexNumber.fromUnshifted('10', DECIMALS_18)
          const num2 = DexNumber.fromShifted('2000000000000000000', DECIMALS_18)
          const result = num1.minus(num2)
          expect(result.shiftedState).toEqual('unshifted')
          expect(result.toFixed()).toEqual('8')
          expect(result.toWeiString()).toEqual('8000000000000000000')
        })

        it('should subtract fractional numbers correctly', () => {
          const num1 = DexNumber.fromUnshifted('2.5', DECIMALS_18)
          const num2 = DexNumber.fromShifted('1500000000000000000', DECIMALS_18)
          const result = num1.minus(num2)
          expect(result.shiftedState).toEqual('unshifted')
          expect(result.toFixed()).toEqual('1')
          expect(result.toWeiString()).toEqual('1000000000000000000')
        })

        it('should multiply whole numbers correctly', () => {
          const num1 = DexNumber.fromUnshifted('2', DECIMALS_18)
          const num2 = DexNumber.fromShifted('3000000000000000000', DECIMALS_18)

          const result = num1.multipliedBy(num2)
          expect(result.shiftedState).toEqual('unshifted')
          expect(result.toFixed()).toEqual('6')
          expect(result.toWeiString()).toEqual('6000000000000000000')
        })

        it('should multiply fractional numbers correctly', () => {
          const num1 = DexNumber.fromUnshifted('1.5', DECIMALS_18)
          const num2 = DexNumber.fromShifted('2500000000000000000', DECIMALS_18)
          const result = num1.multipliedBy(num2)
          expect(result.shiftedState).toEqual('unshifted')
          expect(result.toFixed()).toEqual('3.75')
          expect(result.toWeiString()).toEqual('3750000000000000000')
        })

        it('should divide whole numbers correctly', () => {
          const num1 = DexNumber.fromUnshifted('3', DECIMALS_18)
          const num2 = DexNumber.fromShifted('2000000000000000000', DECIMALS_18)

          const result = num1.dividedBy(num2)
          expect(result.shiftedState).toEqual('unshifted')
          expect(result.toFixed()).toEqual('1.5')
          expect(result.toWeiString()).toEqual('1500000000000000000')
        })

        it('should divide fractional numbers correctly', () => {
          const num1 = DexNumber.fromUnshifted('2.5', DECIMALS_18)
          const num2 = DexNumber.fromShifted('1500000000000000000', DECIMALS_18)
          const result = num1.dividedBy(num2)
          expect(result.shiftedState).toEqual('unshifted')
          // Result is 1.666... with repeating 6, so round down to 18 decimals
          expect(result.toDecimalString()).toEqual('1.666666666666666666')
          expect(result.toWeiString()).toEqual('1666666666666666666')
        })
      })

      describe('Operations with normal numbers', () => {
        const num = DexNumber.fromUnshifted('2.5', DECIMALS_18)

        it('should add a normal number correctly', () => {
          const result = num.plus(1)
          expect(result.toFixed()).toEqual('3.5')
        })

        it('should subtract a normal number correctly', () => {
          const result = num.minus(1)
          expect(result.toFixed()).toEqual('1.5')
        })

        it('should multiply by a normal number correctly', () => {
          const result = num.multipliedBy(2)
          expect(result.toFixed()).toEqual('5')
        })

        it('should divide by a normal number correctly', () => {
          const result = num.dividedBy(2)
          expect(result.toFixed()).toEqual('1.25')
        })
      })
    })

    describe('Different Decimals (18 and 8)', () => {
      describe('Shifted/Shifted', () => {
        it('should add whole numbers correctly', () => {
          const num1 = DexNumber.fromShifted('1000000000000000000', DECIMALS_18)
          const num2 = DexNumber.fromShifted('200000000', DECIMALS_8)
          const result = num1.plus(num2)
          expect(result.shiftedState).toEqual('shifted')
          expect(result.decimals).toEqual(DECIMALS_18)
          expect(result.unshift().toFixed()).toEqual('3')
        })

        it('should add fractional numbers correctly', () => {
          const num1 = DexNumber.fromShifted('1500000000000000000', DECIMALS_18)
          const num2 = DexNumber.fromShifted('250000000', DECIMALS_8)
          const result = num1.plus(num2)
          expect(result.shiftedState).toEqual('shifted')
          expect(result.decimals).toEqual(DECIMALS_18)
          expect(result.unshift().toFixed()).toEqual('4')
        })

        it('should subtract whole numbers correctly', () => {
          const num1 = DexNumber.fromShifted('2000000000000000000', DECIMALS_18)
          const num2 = DexNumber.fromShifted('100000000', DECIMALS_8)
          const result = num1.minus(num2)
          expect(result.shiftedState).toEqual('shifted')
          expect(result.decimals).toEqual(DECIMALS_18)
          expect(result.unshift().toFixed()).toEqual('1')
        })

        it('should subtract fractional numbers correctly', () => {
          const num1 = DexNumber.fromShifted('2500000000000000000', DECIMALS_18)
          const num2 = DexNumber.fromShifted('150000000', DECIMALS_8)
          const result = num1.minus(num2)
          expect(result.shiftedState).toEqual('shifted')
          expect(result.decimals).toEqual(DECIMALS_18)
          expect(result.unshift().toFixed()).toEqual('1')
        })

        it('should multiply whole numbers correctly', () => {
          const num1 = DexNumber.fromShifted('2000000000000000000', DECIMALS_18)
          const num2 = DexNumber.fromShifted('300000000', DECIMALS_8)
          const result = num1.multipliedBy(num2)
          expect(result.shiftedState).toEqual('shifted')
          expect(result.decimals).toEqual(DECIMALS_18)
          expect(result.toFixed()).toEqual('6000000000000000000')
          expect(result.unshift().toFixed()).toEqual('6')
        })

        it('should multiply fractional numbers correctly', () => {
          const num1 = DexNumber.fromShifted('1500000000000000000', DECIMALS_18)
          const num2 = DexNumber.fromShifted('250000000', DECIMALS_8)
          const result = num1.multipliedBy(num2)
          expect(result.shiftedState).toEqual('shifted')
          expect(result.decimals).toEqual(DECIMALS_18)
          expect(result.toFixed()).toEqual('3750000000000000000')
          expect(result.unshift().toFixed()).toEqual('3.75')
        })

        it('should divide whole numbers correctly', () => {
          const num1 = DexNumber.fromShifted('3000000000000000000', DECIMALS_18)
          const num2 = DexNumber.fromShifted('200000000', DECIMALS_8)
          const result = num1.dividedBy(num2)
          expect(result.shiftedState).toEqual('shifted')
          expect(result.decimals).toEqual(DECIMALS_18)
          expect(result.toFixed()).toEqual('1500000000000000000')
          expect(result.unshift().toFixed()).toEqual('1.5')
        })

        it('should divide fractional numbers correctly', () => {
          const num1 = DexNumber.fromShifted('2500000000000000000', DECIMALS_18) // 2.5
          const num2 = DexNumber.fromShifted('150000000', DECIMALS_8) // 1.5
          const result = num1.dividedBy(num2)
          expect(result.shiftedState).toEqual('shifted')
          expect(result.decimals).toEqual(DECIMALS_18)
          // Result is 16.666... with repeating 6, so round down to 18 decimals
          expect(result.toFixed()).toEqual('1666666666666666666') // 16.666... with 28 decimals (18 + 10 from division)
          expect(result.unshift().toDecimalString()).toEqual(
            '1.666666666666666666',
          )
        })
      })

      describe('Unshifted/Unshifted', () => {
        it('should add whole numbers correctly', () => {
          const num1 = DexNumber.fromUnshifted('1', DECIMALS_18)
          const num2 = DexNumber.fromUnshifted('2', DECIMALS_8)
          const result = num1.plus(num2)
          expect(result.shiftedState).toEqual('unshifted')
          expect(result.decimals).toEqual(DECIMALS_18)
          expect(result.toFixed()).toEqual('3')
        })

        it('should add fractional numbers correctly', () => {
          const num1 = DexNumber.fromUnshifted('1.5', DECIMALS_18)
          const num2 = DexNumber.fromUnshifted('2.5', DECIMALS_8)
          const result = num1.plus(num2)
          expect(result.shiftedState).toEqual('unshifted')
          expect(result.decimals).toEqual(DECIMALS_18)
          expect(result.toFixed()).toEqual('4')
        })

        it('should subtract whole numbers correctly', () => {
          const num1 = DexNumber.fromUnshifted('2', DECIMALS_18)
          const num2 = DexNumber.fromUnshifted('1', DECIMALS_8)
          const result = num1.minus(num2)
          expect(result.shiftedState).toEqual('unshifted')
          expect(result.decimals).toEqual(DECIMALS_18)
          expect(result.toFixed()).toEqual('1')
        })

        it('should subtract fractional numbers correctly', () => {
          const num1 = DexNumber.fromUnshifted('2.5', DECIMALS_18)
          const num2 = DexNumber.fromUnshifted('1.5', DECIMALS_8)
          const result = num1.minus(num2)
          expect(result.shiftedState).toEqual('unshifted')
          expect(result.decimals).toEqual(DECIMALS_18)
          expect(result.toFixed()).toEqual('1')
        })

        it('should multiply whole numbers correctly', () => {
          const num1 = DexNumber.fromUnshifted('2', DECIMALS_18)
          const num2 = DexNumber.fromUnshifted('3', DECIMALS_8)
          const result = num1.multipliedBy(num2)
          expect(result.shiftedState).toEqual('unshifted')
          expect(result.decimals).toEqual(DECIMALS_18)
          expect(result.toFixed()).toEqual('6')
        })

        it('should multiply fractional numbers correctly', () => {
          const num1 = DexNumber.fromUnshifted('1.5', DECIMALS_18)
          const num2 = DexNumber.fromUnshifted('2.5', DECIMALS_8)
          const result = num1.multipliedBy(num2)
          expect(result.shiftedState).toEqual('unshifted')
          expect(result.decimals).toEqual(DECIMALS_18)
          expect(result.toFixed()).toEqual('3.75')
        })

        it('should divide whole numbers correctly', () => {
          const num1 = DexNumber.fromUnshifted('3', DECIMALS_18)
          const num2 = DexNumber.fromUnshifted('2', DECIMALS_8)
          const result = num1.dividedBy(num2)
          expect(result.shiftedState).toEqual('unshifted')
          expect(result.decimals).toEqual(DECIMALS_18)
          expect(result.toFixed()).toEqual('1.5')
        })

        it('should divide fractional numbers correctly', () => {
          const num1 = DexNumber.fromUnshifted('2.5', DECIMALS_18)
          const num2 = DexNumber.fromUnshifted('1.5', DECIMALS_8)
          const result = num1.dividedBy(num2)
          expect(result.shiftedState).toEqual('unshifted')
          expect(result.decimals).toEqual(DECIMALS_18)
          // Result is 1.666... with repeating 6, so round down to 18 decimals
          expect(result.toDecimalString()).toEqual('1.666666666666666666')
        })
      })

      describe('Shifted/Unshifted', () => {
        it('should add whole numbers correctly', () => {
          const num1 = DexNumber.fromShifted('1000000000000000000', DECIMALS_18)
          const num2 = DexNumber.fromUnshifted('2', DECIMALS_8)
          const result = num1.plus(num2)
          expect(result.shiftedState).toEqual('shifted')
          expect(result.decimals).toEqual(DECIMALS_18)
          expect(result.unshift().toFixed()).toEqual('3')
        })

        it('should add fractional numbers correctly', () => {
          const num1 = DexNumber.fromShifted('1500000000000000000', DECIMALS_18)
          const num2 = DexNumber.fromUnshifted('2.5', DECIMALS_8)
          const result = num1.plus(num2)
          expect(result.shiftedState).toEqual('shifted')
          expect(result.decimals).toEqual(DECIMALS_18)
          expect(result.unshift().toFixed()).toEqual('4')
        })

        it('should subtract whole numbers correctly', () => {
          const num1 = DexNumber.fromShifted('2000000000000000000', DECIMALS_18)
          const num2 = DexNumber.fromUnshifted('1', DECIMALS_8)
          const result = num1.minus(num2)
          expect(result.shiftedState).toEqual('shifted')
          expect(result.decimals).toEqual(DECIMALS_18)
          expect(result.unshift().toFixed()).toEqual('1')
        })

        it('should subtract fractional numbers correctly', () => {
          const num1 = DexNumber.fromShifted('2500000000000000000', DECIMALS_18)
          const num2 = DexNumber.fromUnshifted('1.5', DECIMALS_8)
          const result = num1.minus(num2)
          expect(result.shiftedState).toEqual('shifted')
          expect(result.decimals).toEqual(DECIMALS_18)
          expect(result.unshift().toFixed()).toEqual('1')
        })

        it('should multiply whole numbers correctly', () => {
          const num1 = DexNumber.fromShifted('2000000000000000000', DECIMALS_18)
          const num2 = DexNumber.fromUnshifted('3', DECIMALS_8)
          const result = num1.multipliedBy(num2)
          expect(result.shiftedState).toEqual('shifted')
          expect(result.decimals).toEqual(DECIMALS_18)
          // The result will have 26 decimals (18 + 8), but we expect it to be adjusted back to 18
          expect(result.toFixed()).toEqual('6000000000000000000')
          expect(result.unshift().toFixed()).toEqual('6')
        })

        it('should multiply fractional numbers correctly', () => {
          const num1 = DexNumber.fromShifted('1500000000000000000', DECIMALS_18)
          const num2 = DexNumber.fromUnshifted('2.5', DECIMALS_8)
          const result = num1.multipliedBy(num2)
          expect(result.shiftedState).toEqual('shifted')
          expect(result.decimals).toEqual(DECIMALS_18)
          // The result will have 26 decimals (18 + 8), but we expect it to be adjusted back to 18
          expect(result.toFixed()).toEqual('3750000000000000000')
          expect(result.unshift().toFixed()).toEqual('3.75')
        })

        it('should divide whole numbers correctly', () => {
          const num1 = DexNumber.fromShifted('3000000000000000000', DECIMALS_18) // 3
          const num2 = DexNumber.fromUnshifted('2', DECIMALS_8)
          const result = num1.dividedBy(num2)
          expect(result.shiftedState).toEqual('shifted')
          expect(result.decimals).toEqual(DECIMALS_18)
          // The result will have 28 decimals (18 + 10 from division), but we expect it to be adjusted back to 18
          expect(result.toWeiString()).toEqual('1500000000000000000')
          expect(result.unshift().toFixed()).toEqual('1.5')
        })

        it('should divide fractional numbers correctly', () => {
          const num1 = DexNumber.fromShifted('2500000000000000000', DECIMALS_18) // 2.5
          const num2 = DexNumber.fromUnshifted('1.5', DECIMALS_8)
          const result = num1.dividedBy(num2)
          expect(result.shiftedState).toEqual('shifted')
          expect(result.decimals).toEqual(DECIMALS_18)
          expect(result.toFixed()).toEqual('1666666666666666666')
          expect(result.unshift().toDecimalString()).toEqual(
            '1.666666666666666666',
          )
        })
      })

      describe('Unshifted/Shifted', () => {
        it('should add whole numbers correctly', () => {
          const num1 = DexNumber.fromUnshifted('1', DECIMALS_18)
          const num2 = DexNumber.fromShifted('200000000', DECIMALS_8)
          const result = num1.plus(num2)
          expect(result.shiftedState).toEqual('unshifted')
          expect(result.decimals).toEqual(DECIMALS_18)
          expect(result.toFixed()).toEqual('3')
        })

        it('should add fractional numbers correctly', () => {
          const num1 = DexNumber.fromUnshifted('1.5', DECIMALS_18)
          const num2 = DexNumber.fromShifted('250000000', DECIMALS_8)
          const result = num1.plus(num2)
          expect(result.shiftedState).toEqual('unshifted')
          expect(result.decimals).toEqual(DECIMALS_18)
          expect(result.toFixed()).toEqual('4')
        })

        it('should subtract whole numbers correctly', () => {
          const num1 = DexNumber.fromUnshifted('1', DECIMALS_18)
          const num2 = DexNumber.fromShifted('200000000', DECIMALS_8)
          const result = num1.minus(num2)
          expect(result.shiftedState).toEqual('unshifted')
          expect(result.decimals).toEqual(DECIMALS_18)
          expect(result.toFixed()).toEqual('-1')
        })

        it('should subtract fractional numbers correctly', () => {
          const num1 = DexNumber.fromUnshifted('1.5', DECIMALS_18)
          const num2 = DexNumber.fromShifted('250000000', DECIMALS_8)
          const result = num1.minus(num2)
          expect(result.shiftedState).toEqual('unshifted')
          expect(result.decimals).toEqual(DECIMALS_18)
          expect(result.toFixed()).toEqual('-1')
        })

        it('should multiply whole numbers correctly', () => {
          const num1 = DexNumber.fromUnshifted('2', DECIMALS_18)
          const num2 = DexNumber.fromShifted('300000000', DECIMALS_8)
          const result = num1.multipliedBy(num2)
          expect(result.shiftedState).toEqual('unshifted')
          expect(result.decimals).toEqual(DECIMALS_18)
          // Result will have 18 decimals as it adjusts back from 26 (18 + 8)
          expect(result.toFixed()).toEqual('6')
        })

        it('should multiply fractional numbers correctly', () => {
          const num1 = DexNumber.fromUnshifted('1.5', DECIMALS_18)
          const num2 = DexNumber.fromShifted('250000000', DECIMALS_8)
          const result = num1.multipliedBy(num2)
          expect(result.shiftedState).toEqual('unshifted')
          expect(result.decimals).toEqual(DECIMALS_18)
          // Result will have 18 decimals as it adjusts back from 26 (18 + 8)
          expect(result.toFixed()).toEqual('3.75')
        })

        it('should divide whole numbers correctly', () => {
          const num1 = DexNumber.fromUnshifted('3', DECIMALS_18)
          const num2 = DexNumber.fromShifted('200000000', DECIMALS_8)
          const result = num1.dividedBy(num2)
          expect(result.shiftedState).toEqual('unshifted')
          expect(result.decimals).toEqual(DECIMALS_18)
          expect(result.toFixed()).toEqual('1.5')
        })

        it('should divide fractional numbers correctly', () => {
          const num1 = DexNumber.fromUnshifted('2.5', DECIMALS_18)
          const num2 = DexNumber.fromShifted('150000000', DECIMALS_8)
          const result = num1.dividedBy(num2)
          expect(result.shiftedState).toEqual('unshifted')
          expect(result.decimals).toEqual(DECIMALS_18)
          // Result is 16.666... with repeating 6, so round down to 18 decimals after adjustment from 28 (18 + 10 from division)
          expect(result.toDecimalString()).toEqual('1.666666666666666666')
        })
      })

      describe('Operations with normal numbers', () => {
        const num18 = DexNumber.fromUnshifted('2.5', DECIMALS_18)
        const num8 = DexNumber.fromUnshifted('1.2', DECIMALS_8)

        it('should add a normal number to a DexNumber with 18 decimals correctly', () => {
          const result = num18.plus(1)
          expect(result.toFixed()).toEqual('3.5')
        })

        it('should add a normal number to a DexNumber with 8 decimals correctly', () => {
          const result = num8.plus(1)
          expect(result.toFixed()).toEqual('2.2')
        })

        it('should subtract a normal number from a DexNumber with 18 decimals correctly', () => {
          const result = num18.minus(1)
          expect(result.toFixed()).toEqual('1.5')
        })

        it('should subtract a normal number from a DexNumber with 8 decimals correctly', () => {
          const result = num8.minus(1)
          expect(result.toFixed()).toEqual('0.2')
        })

        it('should multiply a DexNumber with 18 decimals by a normal number correctly', () => {
          const result = num18.multipliedBy(2)
          expect(result.toFixed()).toEqual('5')
        })

        it('should multiply a DexNumber with 8 decimals by a normal number correctly', () => {
          const result = num8.multipliedBy(2)
          expect(result.toFixed()).toEqual('2.4')
        })

        it('should divide a DexNumber with 18 decimals by a normal number correctly', () => {
          const result = num18.dividedBy(2)
          expect(result.toFixed()).toEqual('1.25')
        })

        it('should divide a DexNumber with 8 decimals by a normal number correctly', () => {
          const result = num8.dividedBy(2)
          expect(result.toFixed()).toEqual('0.6')
        })
      })
    })

    describe('Different Decimals (8 and 18)', () => {
      describe('Shifted/Shifted', () => {
        it('should add whole numbers correctly', () => {
          const num1 = DexNumber.fromShifted('200000000', DECIMALS_8)
          const num2 = DexNumber.fromShifted('1000000000000000000', DECIMALS_18)
          const result = num1.plus(num2)
          expect(result.shiftedState).toEqual('shifted')
          expect(result.decimals).toEqual(DECIMALS_8)
          expect(result.unshift().toFixed()).toEqual('3')
        })

        it('should add fractional numbers correctly', () => {
          const num1 = DexNumber.fromShifted('250000000', DECIMALS_8)
          const num2 = DexNumber.fromShifted('1500000000000000000', DECIMALS_18)
          const result = num1.plus(num2)
          expect(result.shiftedState).toEqual('shifted')
          expect(result.decimals).toEqual(DECIMALS_8)
          expect(result.unshift().toFixed()).toEqual('4')
        })

        it('should subtract whole numbers correctly', () => {
          const num1 = DexNumber.fromShifted('100000000', DECIMALS_8)
          const num2 = DexNumber.fromShifted('2000000000000000000', DECIMALS_18)
          const result = num1.minus(num2)
          expect(result.shiftedState).toEqual('shifted')
          expect(result.decimals).toEqual(DECIMALS_8)
          expect(result.unshift().toFixed()).toEqual('-1')
        })

        it('should subtract fractional numbers correctly', () => {
          const num1 = DexNumber.fromShifted('150000000', DECIMALS_8)
          const num2 = DexNumber.fromShifted('2500000000000000000', DECIMALS_18)
          const result = num1.minus(num2)
          expect(result.shiftedState).toEqual('shifted')
          expect(result.decimals).toEqual(DECIMALS_8)
          expect(result.unshift().toFixed()).toEqual('-1')
        })

        it('should multiply whole numbers correctly', () => {
          const num1 = DexNumber.fromShifted('300000000', DECIMALS_8)
          const num2 = DexNumber.fromShifted('2000000000000000000', DECIMALS_18)
          const result = num1.multipliedBy(num2)
          expect(result.shiftedState).toEqual('shifted')
          expect(result.decimals).toEqual(DECIMALS_8)
          expect(result.toFixed()).toEqual('600000000')
          expect(result.unshift().toFixed()).toEqual('6')
        })

        it('should multiply fractional numbers correctly', () => {
          const num1 = DexNumber.fromShifted('250000000', DECIMALS_8)
          const num2 = DexNumber.fromShifted('1500000000000000000', DECIMALS_18)
          const result = num1.multipliedBy(num2)
          expect(result.shiftedState).toEqual('shifted')
          expect(result.decimals).toEqual(DECIMALS_8)
          expect(result.toFixed()).toEqual('375000000')
          expect(result.unshift().toFixed()).toEqual('3.75')
        })

        it('should divide whole numbers correctly', () => {
          const num1 = DexNumber.fromShifted('200000000', DECIMALS_8)
          const num2 = DexNumber.fromShifted('3000000000000000000', DECIMALS_18)
          const result = num1.dividedBy(num2)
          expect(result.shiftedState).toEqual('shifted')
          expect(result.decimals).toEqual(DECIMALS_8)
          expect(result.toFixed()).toEqual('66666666')
          expect(result.unshift().toDecimalString()).toEqual('0.66666666')
        })

        it('should divide fractional numbers correctly', () => {
          const num1 = DexNumber.fromShifted('150000000', DECIMALS_8)
          const num2 = DexNumber.fromShifted('2500000000000000000', DECIMALS_18)
          const result = num1.dividedBy(num2)
          expect(result.shiftedState).toEqual('shifted')
          expect(result.decimals).toEqual(DECIMALS_8)
          expect(result.toFixed()).toEqual('60000000')
          expect(result.unshift().toDecimalString()).toEqual('0.60000000')
        })
      })

      describe('Unshifted/Unshifted', () => {
        it('should add whole numbers correctly', () => {
          const num1 = DexNumber.fromUnshifted('2', DECIMALS_8)
          const num2 = DexNumber.fromUnshifted('1', DECIMALS_18)
          const result = num1.plus(num2)
          expect(result.shiftedState).toEqual('unshifted')
          expect(result.decimals).toEqual(DECIMALS_8)
          expect(result.toFixed()).toEqual('3')
        })

        it('should add fractional numbers correctly', () => {
          const num1 = DexNumber.fromUnshifted('2.5', DECIMALS_8)
          const num2 = DexNumber.fromUnshifted('1.5', DECIMALS_18)
          const result = num1.plus(num2)
          expect(result.shiftedState).toEqual('unshifted')
          expect(result.decimals).toEqual(DECIMALS_8)
          expect(result.toFixed()).toEqual('4')
        })

        it('should subtract whole numbers correctly', () => {
          const num1 = DexNumber.fromUnshifted('1', DECIMALS_8)
          const num2 = DexNumber.fromUnshifted('2', DECIMALS_18)
          const result = num1.minus(num2)
          expect(result.shiftedState).toEqual('unshifted')
          expect(result.decimals).toEqual(DECIMALS_8)
          expect(result.toFixed()).toEqual('-1')
        })

        it('should subtract fractional numbers correctly', () => {
          const num1 = DexNumber.fromUnshifted('1.5', DECIMALS_8)
          const num2 = DexNumber.fromUnshifted('2.5', DECIMALS_18)
          const result = num1.minus(num2)
          expect(result.shiftedState).toEqual('unshifted')
          expect(result.decimals).toEqual(DECIMALS_8)
          expect(result.toFixed()).toEqual('-1')
        })

        it('should multiply whole numbers correctly', () => {
          const num1 = DexNumber.fromUnshifted('3', DECIMALS_8)
          const num2 = DexNumber.fromUnshifted('2', DECIMALS_18)
          const result = num1.multipliedBy(num2)
          expect(result.shiftedState).toEqual('unshifted')
          expect(result.decimals).toEqual(DECIMALS_8)
          expect(result.toFixed()).toEqual('6')
        })

        it('should multiply fractional numbers correctly', () => {
          const num1 = DexNumber.fromUnshifted('2.5', DECIMALS_8)
          const num2 = DexNumber.fromUnshifted('1.5', DECIMALS_18)
          const result = num1.multipliedBy(num2)
          expect(result.shiftedState).toEqual('unshifted')
          expect(result.decimals).toEqual(DECIMALS_8)
          expect(result.toFixed()).toEqual('3.75')
        })

        it('should divide whole numbers correctly', () => {
          const num1 = DexNumber.fromUnshifted('2', DECIMALS_8)
          const num2 = DexNumber.fromUnshifted('3', DECIMALS_18)
          const result = num1.dividedBy(num2)
          expect(result.shiftedState).toEqual('unshifted')
          expect(result.decimals).toEqual(DECIMALS_8)
          expect(result.toDecimalString()).toEqual('0.66666666')
        })

        it('should divide fractional numbers correctly', () => {
          const num1 = DexNumber.fromUnshifted('1.5', DECIMALS_8)
          const num2 = DexNumber.fromUnshifted('2.5', DECIMALS_18)
          const result = num1.dividedBy(num2)
          expect(result.shiftedState).toEqual('unshifted')
          expect(result.decimals).toEqual(DECIMALS_8)
          expect(result.toDecimalString()).toEqual('0.60000000')
        })
      })

      describe('Shifted/Unshifted', () => {
        it('should add whole numbers correctly', () => {
          const num1 = DexNumber.fromShifted('200000000', DECIMALS_8)
          const num2 = DexNumber.fromUnshifted('1', DECIMALS_18)
          const result = num1.plus(num2)
          expect(result.shiftedState).toEqual('shifted')
          expect(result.decimals).toEqual(DECIMALS_8)
          expect(result.unshift().toFixed()).toEqual('3')
        })

        it('should add fractional numbers correctly', () => {
          const num1 = DexNumber.fromShifted('250000000', DECIMALS_8)
          const num2 = DexNumber.fromUnshifted('1.5', DECIMALS_18)
          const result = num1.plus(num2)
          expect(result.shiftedState).toEqual('shifted')
          expect(result.decimals).toEqual(DECIMALS_8)
          expect(result.unshift().toFixed()).toEqual('4')
        })

        it('should subtract whole numbers correctly', () => {
          const num1 = DexNumber.fromShifted('100000000', DECIMALS_8)
          const num2 = DexNumber.fromUnshifted('2', DECIMALS_18)
          const result = num1.minus(num2)
          expect(result.shiftedState).toEqual('shifted')
          expect(result.decimals).toEqual(DECIMALS_8)
          expect(result.unshift().toFixed()).toEqual('-1')
        })

        it('should subtract fractional numbers correctly', () => {
          const num1 = DexNumber.fromShifted('150000000', DECIMALS_8)
          const num2 = DexNumber.fromUnshifted('2.5', DECIMALS_18)
          const result = num1.minus(num2)
          expect(result.shiftedState).toEqual('shifted')
          expect(result.decimals).toEqual(DECIMALS_8)
          expect(result.unshift().toFixed()).toEqual('-1')
        })

        it('should multiply whole numbers correctly', () => {
          const num1 = DexNumber.fromShifted('300000000', DECIMALS_8)
          const num2 = DexNumber.fromUnshifted('2', DECIMALS_18)
          const result = num1.multipliedBy(num2)
          expect(result.shiftedState).toEqual('shifted')
          expect(result.decimals).toEqual(DECIMALS_8)
          expect(result.toFixed()).toEqual('600000000')
          expect(result.unshift().toFixed()).toEqual('6')
        })

        it('should multiply fractional numbers correctly', () => {
          const num1 = DexNumber.fromShifted('250000000', DECIMALS_8)
          const num2 = DexNumber.fromUnshifted('1.5', DECIMALS_18)
          const result = num1.multipliedBy(num2)
          expect(result.shiftedState).toEqual('shifted')
          expect(result.decimals).toEqual(DECIMALS_8)
          expect(result.toFixed()).toEqual('375000000')
          expect(result.unshift().toFixed()).toEqual('3.75')
        })

        it('should divide whole numbers correctly', () => {
          const num1 = DexNumber.fromShifted('200000000', DECIMALS_8)
          const num2 = DexNumber.fromUnshifted('3', DECIMALS_18)
          const result = num1.dividedBy(num2)
          expect(result.shiftedState).toEqual('shifted')
          expect(result.decimals).toEqual(DECIMALS_8)
          expect(result.toWeiString()).toEqual('66666666')
          expect(result.unshift().toDecimalString()).toEqual('0.66666666')
        })

        it('should divide fractional numbers correctly', () => {
          const num1 = DexNumber.fromShifted('150000000', DECIMALS_8)
          const num2 = DexNumber.fromUnshifted('2.5', DECIMALS_18)
          const result = num1.dividedBy(num2)
          expect(result.shiftedState).toEqual('shifted')
          expect(result.decimals).toEqual(DECIMALS_8)
          expect(result.toFixed()).toEqual('60000000')
          expect(result.unshift().toDecimalString()).toEqual('0.60000000')
        })
      })

      describe('Unshifted/Shifted', () => {
        it('should add whole numbers correctly', () => {
          const num1 = DexNumber.fromUnshifted('1', DECIMALS_8)
          const num2 = DexNumber.fromShifted('2000000000000000000', DECIMALS_18)
          const result = num1.plus(num2)
          expect(result.shiftedState).toEqual('unshifted')
          expect(result.decimals).toEqual(DECIMALS_8)
          expect(result.toFixed()).toEqual('3')
        })

        it('should add fractional numbers correctly', () => {
          const num1 = DexNumber.fromUnshifted('1.5', DECIMALS_8)
          const num2 = DexNumber.fromShifted('2500000000000000000', DECIMALS_18)
          const result = num1.plus(num2)
          expect(result.shiftedState).toEqual('unshifted')
          expect(result.decimals).toEqual(DECIMALS_8)
          expect(result.toFixed()).toEqual('4')
        })

        it('should subtract whole numbers correctly', () => {
          const num1 = DexNumber.fromUnshifted('1', DECIMALS_8)
          const num2 = DexNumber.fromShifted('2000000000000000000', DECIMALS_18)
          const result = num1.minus(num2)
          expect(result.shiftedState).toEqual('unshifted')
          expect(result.decimals).toEqual(DECIMALS_8)
          expect(result.toFixed()).toEqual('-1')
        })

        it('should subtract fractional numbers correctly', () => {
          const num1 = DexNumber.fromUnshifted('1.5', DECIMALS_8)
          const num2 = DexNumber.fromShifted('2500000000000000000', DECIMALS_18)
          const result = num1.minus(num2)
          expect(result.shiftedState).toEqual('unshifted')
          expect(result.decimals).toEqual(DECIMALS_8)
          expect(result.toFixed()).toEqual('-1')
        })

        it('should multiply whole numbers correctly', () => {
          const num1 = DexNumber.fromUnshifted('2', DECIMALS_8)
          const num2 = DexNumber.fromShifted('3000000000000000000', DECIMALS_18)
          const result = num1.multipliedBy(num2)
          expect(result.shiftedState).toEqual('unshifted')
          expect(result.decimals).toEqual(DECIMALS_8)
          expect(result.toFixed()).toEqual('6')
        })

        it('should multiply fractional numbers correctly', () => {
          const num1 = DexNumber.fromUnshifted('1.5', DECIMALS_8)
          const num2 = DexNumber.fromShifted('2500000000000000000', DECIMALS_18)
          const result = num1.multipliedBy(num2)
          expect(result.shiftedState).toEqual('unshifted')
          expect(result.decimals).toEqual(DECIMALS_8)
          expect(result.toFixed()).toEqual('3.75')
        })

        it('should divide whole numbers correctly', () => {
          const num1 = DexNumber.fromUnshifted('3', DECIMALS_8)
          const num2 = DexNumber.fromShifted('2000000000000000000', DECIMALS_18)
          const result = num1.dividedBy(num2)
          expect(result.shiftedState).toEqual('unshifted')
          expect(result.decimals).toEqual(DECIMALS_8)
          expect(result.toFixed()).toEqual('1.5')
        })

        it('should divide fractional numbers correctly', () => {
          const num1 = DexNumber.fromUnshifted('2.5', DECIMALS_8)
          const num2 = DexNumber.fromShifted('1500000000000000000', DECIMALS_18)
          const result = num1.dividedBy(num2)
          expect(result.shiftedState).toEqual('unshifted')
          expect(result.decimals).toEqual(DECIMALS_8)
          expect(result.toDecimalString()).toEqual('1.66666666')
        })
      })

      describe('Operations with normal numbers (8 to 18)', () => {
        const num8 = DexNumber.fromUnshifted('2.5', DECIMALS_8)
        const num18 = DexNumber.fromUnshifted('1.2', DECIMALS_18)

        it('should add a normal number to a DexNumber with 8 decimals correctly', () => {
          const result = num8.plus(1)
          expect(result.toFixed()).toEqual('3.5')
        })

        it('should add a normal number to a DexNumber with 18 decimals correctly', () => {
          const result = num18.plus(1)
          expect(result.toFixed()).toEqual('2.2')
        })

        it('should subtract a normal number from a DexNumber with 8 decimals correctly', () => {
          const result = num8.minus(1)
          expect(result.toFixed()).toEqual('1.5')
        })

        it('should subtract a normal number from a DexNumber with 18 decimals correctly', () => {
          const result = num18.minus(1)
          expect(result.toFixed()).toEqual('0.2')
        })

        it('should multiply a DexNumber with 8 decimals by a normal number correctly', () => {
          const result = num8.multipliedBy(2)
          expect(result.toFixed()).toEqual('5')
        })

        it('should multiply a DexNumber with 18 decimals by a normal number correctly', () => {
          const result = num18.multipliedBy(2)
          expect(result.toFixed()).toEqual('2.4')
        })

        it('should divide a DexNumber with 8 decimals by a normal number correctly', () => {
          const result = num8.dividedBy(2)
          expect(result.toFixed()).toEqual('1.25')
        })

        it('should divide a DexNumber with 18 decimals by a normal number correctly', () => {
          const result = num18.dividedBy(2)
          expect(result.toFixed()).toEqual('0.6')
        })
      })
    })

    it('should calculate absolute value correctly', () => {
      const num1 = DexNumber.fromUnshifted('-1', DECIMALS_18)
      const absNum1 = num1.absoluteValue()
      expect(absNum1.toFixed()).toEqual('1')
      expect(absNum1.abs().toFixed()).toEqual('1')
    })

    it('should calculate decimal places correctly', () => {
      const num1 = DexNumber.fromUnshifted('1.2345', DECIMALS_18)
      expect(num1.decimalPlaces()).toEqual(4)
      const dpNum1 = num1.decimalPlaces(2, BigNumber.ROUND_UP)
      expect(dpNum1.toFixed()).toEqual('1.24')
    })

    it('should calculate dp (alias for decimalPlaces) correctly', () => {
      const num1 = DexNumber.fromUnshifted('1.2345', DECIMALS_18)
      expect(num1.dp()).toEqual(4)
      const dpNum1 = num1.dp(2, BigNumber.ROUND_UP)
      expect(dpNum1.toFixed()).toEqual('1.24')
    })

    it('should divide correctly', () => {
      const num1 = DexNumber.fromUnshifted('10', DECIMALS_18)
      const num2 = DexNumber.fromUnshifted('2', DECIMALS_18)
      const result = num1.dividedBy(num2)
      expect(result.toFixed()).toEqual('5')
      expect(result.div(num2).toFixed()).toEqual('2.5')
    })

    it('should divide to integer correctly', () => {
      const num1 = DexNumber.fromUnshifted('10', DECIMALS_18)
      const num2 = DexNumber.fromUnshifted('3', DECIMALS_18)
      const result = num1.dividedToIntegerBy(num2)
      expect(result.toFixed()).toEqual('3')
      expect(result.idiv(num2).toFixed()).toEqual('1')
    })

    it('should exponentiate correctly', () => {
      const num1 = DexNumber.fromUnshifted('2', DECIMALS_18)
      const result = num1.exponentiatedBy(3)
      expect(result.toFixed()).toEqual('8')
      expect(result.pow(2).toFixed()).toEqual('64')
    })

    it('should get integer value correctly', () => {
      const num1 = DexNumber.fromUnshifted('1.2345', DECIMALS_18)
      const result = num1.integerValue()
      expect(result.toFixed()).toEqual('1')
    })

    it('should calculate modulo correctly', () => {
      const num1 = DexNumber.fromUnshifted('10', DECIMALS_18)
      const num2 = DexNumber.fromUnshifted('3', DECIMALS_18)
      const result = num1.modulo(num2)
      expect(result.toFixed()).toEqual('1')
      expect(result.mod(num2).toFixed()).toEqual('1')
    })

    it('should multiply correctly', () => {
      const num1 = DexNumber.fromUnshifted('10', DECIMALS_18)
      const num2 = DexNumber.fromUnshifted('2', DECIMALS_18)
      const result = num1.multipliedBy(num2)
      expect(result.toFixed()).toEqual('20')
      expect(result.times(num2).toFixed()).toEqual('40')
    })

    it('should negate correctly', () => {
      const num1 = DexNumber.fromUnshifted('1', DECIMALS_18)
      const result = num1.negated()
      expect(result.toFixed()).toEqual('-1')
    })

    it('should calculate square root correctly', () => {
      const num1 = DexNumber.fromUnshifted('4', DECIMALS_18)
      const result = num1.squareRoot()
      expect(result.toFixed()).toEqual('2')
      expect(result.sqrt().toDecimalString()).toEqual('1.414213562373095048')
    })

    it('should convert to fraction correctly', () => {
      const num1 = DexNumber.fromUnshifted('1.5', DECIMALS_18)
      const [numerator, denominator] = num1.toFraction()
      expect(numerator.toFixed()).toEqual('3')
      expect(denominator.toFixed()).toEqual('2')
    })
  })

  // Static Methods Tests
  describe('Static Methods', () => {
    describe('maximum/max', () => {
      it('should find the maximum of several DexNumbers', () => {
        const num1 = DexNumber.fromUnshifted('1', DECIMALS_18)
        const num2 = DexNumber.fromUnshifted('3', DECIMALS_18)
        const num3 = DexNumber.fromUnshifted('2', DECIMALS_18)
        const maxNum = DexNumber.maximum(DECIMALS_18, num1, num2, num3)
        expect(maxNum.toFixed()).toEqual('3')
        expect(maxNum.decimals).toEqual(DECIMALS_18)
      })

      it('should find the maximum of mixed number types', () => {
        const num1 = DexNumber.fromUnshifted('1', DECIMALS_18)
        const num2 = '3'
        const num3 = new BigNumber('2')
        const maxNum = DexNumber.maximum(DECIMALS_18, num1, num2, num3)
        expect(maxNum.toFixed()).toEqual('3')
      })

      it('should handle negative numbers', () => {
        const maxNum = DexNumber.maximum(DECIMALS_18, '-1', '-3', '-2')
        expect(maxNum.toFixed()).toEqual('-1')
      })

      it('should throw error when no numbers provided', () => {
        expect(() => DexNumber.maximum(DECIMALS_18)).toThrow(
          'At least one number is required',
        )
      })

      it('max should be alias for maximum', () => {
        const num1 = '1'
        const num2 = '2'
        const maxNum1 = DexNumber.maximum(DECIMALS_18, num1, num2)
        const maxNum2 = DexNumber.max(DECIMALS_18, num1, num2)
        expect(maxNum1.toFixed()).toEqual(maxNum2.toFixed())
      })
    })

    describe('minimum/min', () => {
      it('should find the minimum of several DexNumbers', () => {
        const num1 = DexNumber.fromUnshifted('1', DECIMALS_18)
        const num2 = DexNumber.fromUnshifted('3', DECIMALS_18)
        const num3 = DexNumber.fromUnshifted('2', DECIMALS_18)
        const minNum = DexNumber.minimum(DECIMALS_18, num1, num2, num3)
        expect(minNum.toFixed()).toEqual('1')
        expect(minNum.decimals).toEqual(DECIMALS_18)
      })

      it('should find the minimum of mixed number types', () => {
        const num1 = DexNumber.fromUnshifted('1', DECIMALS_18)
        const num2 = '3'
        const num3 = new BigNumber('2')
        const minNum = DexNumber.minimum(DECIMALS_18, num1, num2, num3)
        expect(minNum.toFixed()).toEqual('1')
      })

      it('should handle negative numbers', () => {
        const minNum = DexNumber.minimum(DECIMALS_18, '-1', '-3', '-2')
        expect(minNum.toFixed()).toEqual('-3')
      })

      it('should throw error when no numbers provided', () => {
        expect(() => DexNumber.minimum(DECIMALS_18)).toThrow(
          'At least one number is required',
        )
      })

      it('min should be alias for minimum', () => {
        const num1 = '1'
        const num2 = '2'
        const minNum1 = DexNumber.minimum(DECIMALS_18, num1, num2)
        const minNum2 = DexNumber.min(DECIMALS_18, num1, num2)
        expect(minNum1.toFixed()).toEqual(minNum2.toFixed())
      })
    })

    describe('sum', () => {
      it('should sum several DexNumbers correctly', () => {
        const num1 = DexNumber.fromUnshifted('1', DECIMALS_18)
        const num2 = DexNumber.fromUnshifted('2', DECIMALS_18)
        const num3 = DexNumber.fromUnshifted('3', DECIMALS_18)
        const sumNum = DexNumber.sum(DECIMALS_18, num1, num2, num3)
        expect(sumNum.toFixed()).toEqual('6')
        expect(sumNum.decimals).toEqual(DECIMALS_18)
      })

      it('should sum mixed number types', () => {
        const num1 = DexNumber.fromUnshifted('1', DECIMALS_18)
        const num2 = '2'
        const num3 = new BigNumber('3')
        const sumNum = DexNumber.sum(DECIMALS_18, num1, num2, num3)
        expect(sumNum.toFixed()).toEqual('6')
      })

      it('should handle negative numbers', () => {
        const sumNum = DexNumber.sum(DECIMALS_18, '1', '-2', '3')
        expect(sumNum.toFixed()).toEqual('2')
      })

      it('should return zero when no numbers provided', () => {
        const sumNum = DexNumber.sum(DECIMALS_18)
        expect(sumNum.toFixed()).toEqual('0')
        expect(sumNum.decimals).toEqual(DECIMALS_18)
      })
    })

    describe('random', () => {
      it('should generate a random DexNumber', () => {
        const randomNum = DexNumber.random(DECIMALS_18)
        expect(randomNum instanceof DexNumber).toBe(true)
        expect(randomNum.decimals).toEqual(DECIMALS_18)
        expect(randomNum.gte(0)).toBe(true)
        expect(randomNum.lt(1)).toBe(true)
      })

      it('should use default decimals of 0 when not provided', () => {
        const randomNum = DexNumber.random()
        expect(randomNum.decimals).toEqual(0)
      })

      it('should generate different numbers on subsequent calls', () => {
        const random1 = DexNumber.random(DECIMALS_18)
        const random2 = DexNumber.random(DECIMALS_18)
        expect(random1.toFixed()).not.toEqual(random2.toFixed())
      })
    })

    it('should create a DexNumber from a string', () => {
      const bigNum = DexNumber.fromString(
        '1000000000000000000',
        DECIMALS_18,
        'shifted',
      )
      expect(bigNum.toFixed()).toEqual('1000000000000000000')
    })

    describe('fromShifted', () => {
      it('should convert a wei value in ethers BigNumber to a shifted DexNumber instance', () => {
        const weiBigNumber = EthersBigNumber.from('1000000000000000000') // 1 Ether in wei
        const dexNum = DexNumber.fromShifted(weiBigNumber, 18)
        expect(dexNum.shiftedState).toEqual('shifted')
        expect(dexNum.toReadableString()).toEqual('1.000000000000000000')
        expect(dexNum.toWeiString()).toEqual('1000000000000000000')
      })

      it('should handle conversion of MAX_HEX_STRING to a shifted DexNumber', () => {
        const maxHexDexNum = DexNumber.fromShifted(MAX_HEX_STRING, 18)
        expect(maxHexDexNum.shiftedState).toEqual('shifted')
        expect(maxHexDexNum.toDecimalString()).toEqual(
          '115792089237316195423570985008687907853269984665640564039457.584007913129639935',
        )
      })

      it('should correctly interpret "1" wei as a shifted DexNumber instance', () => {
        const oneWeiDexNum = DexNumber.fromShifted('1', 18)
        expect(oneWeiDexNum.shiftedState).toEqual('shifted')
        expect(oneWeiDexNum.toReadableString()).toEqual('0.000000000000000001')
        expect(oneWeiDexNum.toWeiString()).toEqual('1')
      })
    })

    describe('fromUnshifted', () => {
      it('should convert an Ether value to a DexNumber instance in wei', () => {
        const etherDexNum = DexNumber.fromUnshifted('1', 'ether')
        expect(etherDexNum.shiftedState).toEqual('unshifted')
        expect(etherDexNum.toWeiString()).toEqual('1000000000000000000')
        expect(etherDexNum.toReadableString()).toEqual('1.000000000000000000')
      })

      it('should handle gwei value input and convert it to wei correctly', () => {
        const gweiDexNum = DexNumber.fromUnshifted('90', 'gwei')
        expect(gweiDexNum.shiftedState).toEqual('unshifted')
        expect(gweiDexNum.toWeiString()).toEqual('90000000000') // 90 gwei in wei
        expect(gweiDexNum.toReadableString()).toEqual('90.000000000')
      })

      it('should convert mwei to wei accurately', () => {
        const mweiDexNum = DexNumber.fromUnshifted('123', 'mwei')
        expect(mweiDexNum.shiftedState).toEqual('unshifted')
        expect(mweiDexNum.toWeiString()).toEqual('123000000')
        expect(mweiDexNum.toReadableString()).toEqual('123.000000')
      })

      it('should handle arbitrary decimal units correctly', () => {
        const customDexNum = DexNumber.fromUnshifted('5000', 6)
        expect(customDexNum.shiftedState).toEqual('unshifted')
        expect(customDexNum.toWeiString()).toEqual('5000000000') // 5000 with 6 decimal places
        expect(customDexNum.toReadableString()).toEqual('5,000.000000')
      })
    })
  })

  // Conversions Tests
  describe('Conversions', () => {
    it('should serialize and deserialize correctly', () => {
      const num = DexNumber.fromUnshifted('1.2345', DECIMALS_18)
      const serialized = num.toSerialized()
      const deserialized = DexNumber.fromSerialized(serialized)
      expect(deserialized.toFixed()).toEqual('1.2345')
    })

    it('should convert to Ethers BigNumber correctly', () => {
      const num = DexNumber.fromUnshifted('1.2345', DECIMALS_18)
      const ethersBn = num.toEthersBigNumber()
      expect(ethersBn.toString()).toEqual('1234500000000000000')
    })

    it('should convert to BigNumber.js instance correctly', () => {
      const num = DexNumber.fromUnshifted('1.2345', DECIMALS_18)
      const bn = num.toBigNumber()
      expect(bn.toFixed()).toEqual('1234500000000000000')
    })

    it('should convert to bigint correctly', () => {
      const num = DexNumber.fromUnshifted('1.2345', DECIMALS_18)
      const bigInt = num.toBigInt()
      expect(bigInt).toEqual(BigInt('1234500000000000000'))
    })

    it('should convert to readable string correctly', () => {
      const num = DexNumber.fromUnshifted('1234.5678', DECIMALS_18)
      expect(num.toReadableString()).toEqual('1,234.567800000000000000')
      expect(num.toReadableString(2)).toEqual('1,234.56')
      expect(num.toReadableString(2, 'fr-FR')).toEqual('1 234,56')
    })

    it('should convert to decimal string correctly', () => {
      const num = DexNumber.fromUnshifted('1234.5678', DECIMALS_18)
      expect(num.toDecimalString()).toEqual('1234.567800000000000000')
      expect(num.toDecimalString(2)).toEqual('1234.56')
    })

    it('should convert to wei string correctly', () => {
      const num = DexNumber.fromUnshifted('1.2345', DECIMALS_18)
      expect(num.toWeiString()).toEqual('1234500000000000000')
    })

    it('should convert to hex string correctly', () => {
      const num = DexNumber.fromUnshifted('1', 0)
      expect(num.toHexString()).toEqual('0x01')
    })

    it('should convert to hex string correctly', () => {
      const num = DexNumber.fromShifted('1', 0)
      expect(num.toHexString()).toEqual('0x01')
    })

    it('should convert to hex string correctly', () => {
      const num = DexNumber.fromShifted('1234500000000000000', DECIMALS_18)
      expect(num.toHexString()).toEqual('0x1121d33597384000')
    })

    it('should convert to hex string correctly', () => {
      const num = DexNumber.fromUnshifted('1.2345', DECIMALS_18)
      expect(num.toHexString()).toEqual('0x1121d33597384000')
    })
  })

  describe('Edge Cases and Precision', () => {
    it('should handle large number arithmetic without losing precision', () => {
      const maxNum = DexNumber.fromShifted(MAX_HEX_STRING, DECIMALS_18)
      const halfMax = maxNum.dividedBy(2)
      expect(maxNum.minus(halfMax).plus(halfMax)).toEqual(maxNum)
    })

    it('should maintain precision through complex operation chains', () => {
      const num1 = DexNumber.fromUnshifted('123.456789', DECIMALS_18)
      const num2 = DexNumber.fromShifted('2000000000000000000', DECIMALS_18)
      const num3 = DexNumber.fromUnshifted('3.14159', DECIMALS_18)

      const result = num1
        .shift()
        .plus(num2)
        .dividedBy(num3.shift())
        .multipliedBy(num2.unshift())
        .unshift()

      // Verify against direct calculation
      const expected = num1
        .plus(num2.unshift())
        .dividedBy(num3)
        .multipliedBy(num2.unshift())
      expect(result.toFixed()).toEqual(expected.toFixed())
    })

    it('should handle repeated shift/unshift without precision loss', () => {
      const start = DexNumber.fromUnshifted('1.23456789', DECIMALS_18)
      const result = start.shift().unshift().shift().unshift().shift().unshift()

      expect(result.toFixed()).toEqual(start.toFixed())
    })

    it('should maintain precision in pool ratio calculations', () => {
      const liquidity = DexNumber.fromUnshifted('1234567.89', DECIMALS_18)
      const totalSupply = DexNumber.fromUnshifted('10000000', DECIMALS_18)
      const amount = DexNumber.fromUnshifted('50000', DECIMALS_18)
      const dust = DexNumber.fromShifted('1', DECIMALS_18) // 1 WEI

      const result = amount
        .multipliedBy(liquidity)
        .dividedBy(totalSupply)
        .shift()
        .plus(dust)
        .unshift()

      expect(result.toDecimalString()).toEqual('6172.839450000000000001')
    })

    it('should handle extreme values in swap calculations', () => {
      const reserve0 = DexNumber.fromUnshifted('1000000', DECIMALS_18)
      const reserve1 = DexNumber.fromUnshifted('1000', DECIMALS_18)
      const amount0 = DexNumber.fromUnshifted('1000', DECIMALS_18)
      const fee = DexNumber.fromUnshifted('0.003', DECIMALS_18) // 0.3% fee

      const amountWithFee = amount0.multipliedBy(
        DexNumber.fromUnshifted('1', DECIMALS_18).minus(fee),
      )
      const numerator = amountWithFee.multipliedBy(reserve1)
      const denominator = reserve0.plus(amountWithFee)
      const amount1 = numerator.dividedBy(denominator)

      expect(amount1.toDecimalString()).toEqual('0.996006981039903216')
    })
  })

  // Extra Tests
  describe('Extra Tests', () => {
    it('should handle very large numbers correctly', () => {
      const bigNum = DexNumber.fromShifted(
        '1000000000000000000000',
        DECIMALS_18,
      )
      expect(bigNum.toFixed()).toEqual('1000000000000000000000')
    })

    it('should handle very small numbers correctly', () => {
      const bigNum = DexNumber.fromUnshifted(
        '0.000000000000000001',
        DECIMALS_18,
      )
      expect(bigNum.toWeiString()).toEqual('1')
    })

    it('should maintain precision in pool share percentage calculation', () => {
      // Calculate: (15/105) * 100 = 14.285714285714285714...%
      const numerator = DexNumber.fromUnshifted('15', 18)
      const denominator = DexNumber.fromUnshifted('105', 18)

      // Direct division
      const result = numerator
        .dividedBy(denominator)
        .multipliedBy(DexNumber.fromUnshifted('100', 18))

      // Dex Number uses 60 precision
      expect(result.toFixed()).toBe(
        '14.2857142857142857142857142857142857142857142857142857142857',
      )
      // Verify we get exactly the correct EVM precision (18 decimals)
      expect(result.toDecimalString()).toBe('14.285714285714285714')
    })
  })

  describe('3-Hop Price Impact', () => {
    it('should calculate precise price impact across 3 hops', () => {
      const inputUNI = DexNumber.fromUnshifted('10', 18)

      // First pair: UNI/WPLS
      const uniReserve = DexNumber.fromUnshifted('38949', 18)
      const wplsReserve1 = DexNumber.fromUnshifted('954813', 18)

      // Second pair: WPLS/DAI
      const wplsReserve2 = DexNumber.fromUnshifted('2224583934', 18)
      const daiReserve = DexNumber.fromUnshifted('7580596843', 18)

      // Third pair: DAI/USDT
      const daiReserve2 = DexNumber.fromUnshifted('2934841', 18)
      const usdtReserve = DexNumber.fromUnshifted('369183', 6)

      // Fee calculation (0.3% for V2)
      const fee = DexNumber.fromUnshifted('0.003', 18)

      // First hop: UNI -> WPLS
      const spotPrice1 = wplsReserve1.dividedBy(uniReserve)

      const inputAfterFee = inputUNI.times(
        DexNumber.fromUnshifted('1', 18).minus(fee),
      )

      const wplsOutput = wplsReserve1
        .times(inputAfterFee)
        .dividedBy(uniReserve.plus(inputAfterFee))

      const newUniReserve = uniReserve.plus(inputAfterFee)
      const newWplsReserve1 = wplsReserve1.minus(wplsOutput)

      const spotPriceAfter1 = newWplsReserve1.dividedBy(newUniReserve)

      const impact1 = spotPrice1.minus(spotPriceAfter1).dividedBy(spotPrice1)

      // Second hop: WPLS -> DAI
      const spotPrice2 = daiReserve.dividedBy(wplsReserve2)

      const wplsAfterFee = wplsOutput.times(
        DexNumber.fromUnshifted('1', 18).minus(fee),
      )

      const daiOutput = daiReserve
        .times(wplsAfterFee)
        .dividedBy(wplsReserve2.plus(wplsAfterFee))

      const newWplsReserve2 = wplsReserve2.plus(wplsAfterFee)
      const newDaiReserve = daiReserve.minus(daiOutput)

      const spotPriceAfter2 = newDaiReserve.dividedBy(newWplsReserve2)
      const impact2 = spotPrice2.minus(spotPriceAfter2).dividedBy(spotPrice2)

      // Third hop: DAI -> USDT
      expect(usdtReserve.decimals).toEqual(6)
      expect(daiReserve2.decimals).toEqual(18)
      const spotPrice3 = usdtReserve.dividedBy(daiReserve2)

      const daiAfterFee = daiOutput.times(
        DexNumber.fromUnshifted('1', 18).minus(fee),
      )

      const usdtOutput = usdtReserve
        .times(daiAfterFee)
        .dividedBy(daiReserve2.plus(daiAfterFee))

      const newDaiReserve2 = daiReserve2.plus(daiAfterFee)
      const newUsdtReserve = usdtReserve.minus(usdtOutput)

      const spotPriceAfter3 = newUsdtReserve.dividedBy(newDaiReserve2)

      const impact3 = spotPrice3.minus(spotPriceAfter3).dividedBy(spotPrice3)

      // Total impact percentage
      const totalImpact = impact1
        .plus(impact2)
        .plus(impact3)
        .times(DexNumber.fromUnshifted('100', 18))

      expect(impact1.isNegative()).toBe(false)
      expect(impact2.isNegative()).toBe(false)
      expect(impact3.isNegative()).toBe(false)
      expect(totalImpact.dividedBy(2).toFixed(2)).toBe('0.05')
    })
  })
})
