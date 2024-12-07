import { describe, it, expect } from 'vitest'

import { DexNumber } from '../src/dex-number'

describe('DexNumber', () => {
  const cases = [
    { tokenA: 18, tokenB: 18 },
    { tokenA: 18, tokenB: 8 },
    { tokenA: 18, tokenB: 6 },
    { tokenA: 18, tokenB: 2 },
    { tokenA: 18, tokenB: 0 },
    { tokenA: 8, tokenB: 18 },
    { tokenA: 8, tokenB: 8 },
    { tokenA: 8, tokenB: 6 },
    { tokenA: 8, tokenB: 2 },
    { tokenA: 8, tokenB: 0 },
    { tokenA: 6, tokenB: 18 },
    { tokenA: 6, tokenB: 8 },
    { tokenA: 6, tokenB: 6 },
    { tokenA: 6, tokenB: 2 },
    { tokenA: 6, tokenB: 0 },
    { tokenA: 2, tokenB: 18 },
    { tokenA: 2, tokenB: 8 },
    { tokenA: 2, tokenB: 6 },
    { tokenA: 2, tokenB: 2 },
    { tokenA: 2, tokenB: 0 },
    { tokenA: 0, tokenB: 18 },
    { tokenA: 0, tokenB: 8 },
    { tokenA: 0, tokenB: 6 },
    { tokenA: 0, tokenB: 2 },
    { tokenA: 0, tokenB: 0 },
  ]

  describe('Decimal Variant Division Tests', () => {
    cases.forEach(({ tokenA, tokenB }) => {
      it(`should correctly divide DexNumbers with decimals ${tokenA} and ${tokenB}`, () => {
        const tokenAValue = DexNumber.fromUnshifted('2934841', tokenA)
        const tokenBValue = DexNumber.fromUnshifted('369183', tokenB)

        const result = tokenBValue.dividedBy(tokenAValue)

        if (tokenB === 18) {
          expect(result.toDecimalString()).toBe('0.125793186070386777')
          expect(result.toWeiString()).toBe('125793186070386777')
        } else if (tokenB === 8) {
          expect(result.toDecimalString()).toBe('0.12579318')
          expect(result.toWeiString()).toBe('12579318')
        } else if (tokenB === 6) {
          expect(result.toDecimalString()).toBe('0.125793')
          expect(result.toWeiString()).toBe('125793')
        } else if (tokenB === 2) {
          expect(result.toDecimalString()).toBe('0.12')
          expect(result.toWeiString()).toBe('12')
        } else if (tokenB === 0) {
          expect(result.toDecimalString()).toBe('0')
          expect(result.toWeiString()).toBe('0')
        }
      })
    })

    const num18 = DexNumber.fromUnshifted('2.5', 18)
    const num8 = DexNumber.fromUnshifted('1.2', 8)
    it('should divide a DexNumber with 18 decimals by a normal number correctly', () => {
      const result = num18.dividedBy(2)
      expect(result.toFixed()).toEqual('1.25')
    })

    it('should divide a DexNumber with 8 decimals by a normal number correctly', () => {
      const result = num8.dividedBy(2)
      expect(result.toFixed()).toEqual('0.6')
    })
  })

  describe('Decimal Variant Multiplication Tests', () => {
    cases.forEach(({ tokenA, tokenB }) => {
      it(`should correctly multiply DexNumbers with decimals ${tokenA} and ${tokenB}`, () => {
        const tokenAValue = DexNumber.fromUnshifted('2.5', tokenA)
        const tokenBValue = DexNumber.fromUnshifted('1.5', tokenB)

        const result = tokenAValue.multipliedBy(tokenBValue)

        if (tokenA === 18) {
          expect(result.toDecimalString()).toBe('3.750000000000000000')
          expect(result.toWeiString()).toBe('3750000000000000000')
        } else if (tokenA === 8) {
          expect(result.toDecimalString()).toBe('3.75000000')
          expect(result.toWeiString()).toBe('375000000')
        } else if (tokenA === 6) {
          expect(result.toDecimalString()).toBe('3.750000')
          expect(result.toWeiString()).toBe('3750000')
        } else if (tokenA === 2) {
          expect(result.toDecimalString()).toBe('3.75')
          expect(result.toWeiString()).toBe('375')
        } else if (tokenA === 0) {
          expect(result.toDecimalString()).toBe('3')
          expect(result.toWeiString()).toBe('3')
        }
      })
    })

    it('should multiply whole numbers correctly', () => {
      const num1 = DexNumber.fromShifted('2000000000000000000', 18)
      const num2 = DexNumber.fromShifted('3000000000000000000', 18)

      const result = num1.multipliedBy(num2)
      expect(result.shiftedState).toEqual('shifted')
      expect(result.toWeiString()).toEqual('6000000000000000000')
      const unshifted = result.unshift()
      expect(unshifted.shiftedState).toEqual('unshifted')
      expect(unshifted.toFixed()).toEqual('6')
    })

    it('should multiply fractional numbers correctly', () => {
      const num1 = DexNumber.fromShifted('1500000000000000000', 18)
      const num2 = DexNumber.fromShifted('2500000000000000000', 18)
      const result = num1.multipliedBy(num2)
      expect(result.shiftedState).toEqual('shifted')
      expect(result.toFixed()).toEqual('3750000000000000000')
      expect(result.unshift().toFixed()).toEqual('3.75')
    })

    it('should multiply whole numbers correctly', () => {
      const num1 = DexNumber.fromShifted('2000000000000000000', 18)
      const num2 = DexNumber.fromUnshifted('3', 18)

      const result = num1.multipliedBy(num2)
      expect(result.shiftedState).toEqual('shifted')
      expect(result.toFixed()).toEqual('6000000000000000000')
      const unshifted = result.unshift()
      expect(unshifted.shiftedState).toEqual('unshifted')
      expect(unshifted.toFixed()).toEqual('6')
    })

    it('should multiply fractional numbers correctly', () => {
      const num1 = DexNumber.fromShifted('1500000000000000000', 18)
      const num2 = DexNumber.fromUnshifted('2.5', 18)
      const result = num1.multipliedBy(num2)
      expect(result.shiftedState).toEqual('shifted')
      expect(result.toFixed()).toEqual('3750000000000000000')
      expect(result.unshift().toFixed()).toEqual('3.75')
    })

    it('should multiply whole numbers correctly', () => {
      const num1 = DexNumber.fromUnshifted('2', 18)
      const num2 = DexNumber.fromUnshifted('3', 18)

      const result = num1.multipliedBy(num2)
      expect(result.shiftedState).toEqual('unshifted')
      expect(result.toFixed()).toEqual('6')
      expect(result.toWeiString()).toEqual('6000000000000000000')
    })

    it('should multiply fractional numbers correctly', () => {
      const num1 = DexNumber.fromUnshifted('1.5', 18)
      const num2 = DexNumber.fromUnshifted('2.5', 18)
      const result = num1.multipliedBy(num2)
      expect(result.shiftedState).toEqual('unshifted')
      expect(result.toFixed()).toEqual('3.75')
      expect(result.toWeiString()).toEqual('3750000000000000000')
    })

    it('should multiply whole numbers correctly', () => {
      const num1 = DexNumber.fromUnshifted('2', 18)
      const num2 = DexNumber.fromShifted('3000000000000000000', 18)

      const result = num1.multipliedBy(num2)
      expect(result.shiftedState).toEqual('unshifted')
      expect(result.toFixed()).toEqual('6')
      expect(result.toWeiString()).toEqual('6000000000000000000')
    })

    it('should multiply fractional numbers correctly', () => {
      const num1 = DexNumber.fromUnshifted('1.5', 18)
      const num2 = DexNumber.fromShifted('2500000000000000000', 18)
      const result = num1.multipliedBy(num2)
      expect(result.shiftedState).toEqual('unshifted')
      expect(result.toFixed()).toEqual('3.75')
      expect(result.toWeiString()).toEqual('3750000000000000000')
    })

    const num18 = DexNumber.fromUnshifted('2.5', 18)
    const num8 = DexNumber.fromUnshifted('1.2', 8)
    it('should divide a DexNumber with 18 decimals by a normal number correctly', () => {
      const result = num18.multipliedBy(2)
      expect(result.toFixed()).toEqual('5')
    })

    it('should divide a DexNumber with 8 decimals by a normal number correctly', () => {
      const result = num8.multipliedBy(2)
      expect(result.toFixed()).toEqual('2.4')
    })

    it('slippage', () => {
      const amount = DexNumber.fromUnshifted('100', 18)
      const slippage = 0.01
      const result = amount.multipliedBy(1 + slippage)
      expect(result.toFixed()).toEqual('101')
    })
  })
})
