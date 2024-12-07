import { DexNumber } from '@dex-toolkit/number'
import type { Token, LiquidityTokenInfo } from '@dex-toolkit/types'
import { describe, it, expect } from 'vitest'

import {
  calculateSlippageAmount,
  calculateCurrentShareOfPoolV2,
  calculateExpectedShareAfterAddV2,
  calculateExpectedShareAfterRemoveV2,
  calculateCurrentShareOfPoolV3,
  calculateMultiPositionShareOfPoolV3,
  calculatePricesV3,
  calculatePrices,
  populateLiquiditySettings,
  compareLiquidityTokenInfo,
  isLiquidityDirection,
  isLiquidityDirectionAdd,
  isLiquidityDirectionRemove,
  isLPTokenInfoV2,
  isLPTokenInfoV3,
} from '../../src'

describe('Liquidity Utilities', () => {
  describe('Slippage Calculations', () => {
    it('should calculate maximum amount with slippage', () => {
      const amount = DexNumber.fromUnshifted('100', 18)
      const slippage = 0.01 // 1%

      const result = calculateSlippageAmount({
        amount,
        slippage,
        isMaximum: true,
      })

      expect(result.toFixed()).toBe('101')
    })

    it('should calculate minimum amount with slippage', () => {
      const amount = DexNumber.fromUnshifted('100', 18)
      const slippage = 0.01 // 1%

      const result = calculateSlippageAmount({
        amount,
        slippage,
        isMaximum: false,
      })

      expect(result.toFixed()).toBe('99')
    })

    it('should throw error for negative slippage', () => {
      const amount = DexNumber.fromUnshifted('100', 18)
      const slippage = -0.01

      expect(() =>
        calculateSlippageAmount({
          amount,
          slippage,
          isMaximum: true,
        }),
      ).toThrow('Slippage must be non-negative')
    })

    it('should throw error for zero amount', () => {
      const amount = DexNumber.fromUnshifted('0', 18)
      const slippage = 0.01

      expect(() =>
        calculateSlippageAmount({
          amount,
          slippage,
          isMaximum: true,
        }),
      ).toThrow('Amount must be greater than zero')
    })
  })

  describe('V2 Pool Share Calculations', () => {
    it('should calculate current share of pool', () => {
      const lpTokenBalance = DexNumber.fromUnshifted('10', 18)
      const totalSupply = DexNumber.fromUnshifted('100', 18)

      const result = calculateCurrentShareOfPoolV2({
        lpTokenBalance,
        lpTokenDecimals: 18,
        totalSupply,
      })

      expect(result.toFixed()).toBe('10')
    })

    it('should return zero share for zero balance', () => {
      const lpTokenBalance = DexNumber.fromUnshifted('0', 18)
      const totalSupply = DexNumber.fromUnshifted('100', 18)

      const result = calculateCurrentShareOfPoolV2({
        lpTokenBalance,
        lpTokenDecimals: 18,
        totalSupply,
      })

      expect(result.toFixed()).toBe('0')
    })

    it('should calculate expected share after adding liquidity', () => {
      const lpTokenBalance = DexNumber.fromUnshifted('10', 18)
      const liquidityToAdd = DexNumber.fromUnshifted('5', 18)
      const currentTotalSupply = DexNumber.fromUnshifted('100', 18)

      const result = calculateExpectedShareAfterAddV2({
        lpTokenBalance,
        lpTokenDecimals: 18,
        liquidityToAdd,
        currentTotalSupply,
      })

      expect(result.toReadableString()).toBe('14.285714285714285714')
    })

    it('should calculate expected share after removing liquidity', () => {
      const lpTokenBalance = DexNumber.fromUnshifted('10', 18)
      const liquidityToRemove = DexNumber.fromUnshifted('5', 18)
      const currentTotalSupply = DexNumber.fromUnshifted('100', 18)

      const result = calculateExpectedShareAfterRemoveV2({
        lpTokenBalance,
        lpTokenDecimals: 18,
        liquidityToRemove,
        currentTotalSupply,
      })

      expect(result.toReadableString()).toBe('5.263157894736842105')
    })
  })

  describe('V3 Pool Share Calculations', () => {
    it('should calculate current share of pool when position is in range', () => {
      const positionLiquidity = DexNumber.fromUnshifted('10', 18)
      const poolLiquidity = DexNumber.fromUnshifted('100', 18)
      const currentTick = 0

      const result = calculateCurrentShareOfPoolV3({
        positionLiquidity,
        tickLower: -10,
        tickUpper: 10,
        currentTick,
        poolLiquidity,
      })

      expect(result.toFixed()).toBe('10')
    })

    it('should return zero share when position is out of range', () => {
      const positionLiquidity = DexNumber.fromUnshifted('10', 18)
      const poolLiquidity = DexNumber.fromUnshifted('100', 18)
      const currentTick = 20

      const result = calculateCurrentShareOfPoolV3({
        positionLiquidity,
        tickLower: -10,
        tickUpper: 10,
        currentTick,
        poolLiquidity,
      })

      expect(result.toFixed()).toBe('0')
    })

    it('should calculate multi-position share of pool', () => {
      const positions = [
        {
          liquidity: DexNumber.fromUnshifted('10', 18),
          tickLower: -10,
          tickUpper: 10,
        },
        {
          liquidity: DexNumber.fromUnshifted('20', 18),
          tickLower: -5,
          tickUpper: 5,
        },
      ]
      const poolLiquidity = DexNumber.fromUnshifted('100', 18)
      const currentTick = 0

      const result = calculateMultiPositionShareOfPoolV3({
        positions,
        currentTick,
        poolLiquidity,
      })

      expect(result.toFixed()).toBe('30')
    })
  })

  describe('Price Calculations', () => {
    const mockTokenA = {
      contractAddress: '0x1',
      decimals: 18,
      symbol: 'TOKENA',
    } as Token

    const mockTokenB = {
      contractAddress: '0x2',
      decimals: 18,
      symbol: 'TOKENB',
    } as Token

    it('should calculate V2 prices (Same decimal)', () => {
      const reserveA = DexNumber.fromUnshifted('100', 18)
      const reserveB = DexNumber.fromUnshifted('200', 18)

      const result = calculatePrices({
        tokenA: mockTokenA,
        tokenB: mockTokenB,
        reserveA,
        reserveB,
      })

      expect(result.aTokenPerBToken.toFixed()).toBe('0.5')
      expect(result.bTokenPerAToken.toFixed()).toBe('2')
    })

    it('should calculate V2 prices (A Decimal > B Decimal)', () => {
      const reserveA = DexNumber.fromUnshifted('100', 18)
      const reserveB = DexNumber.fromUnshifted('200', 6)

      const result = calculatePrices({
        tokenA: mockTokenA,
        tokenB: mockTokenB,
        reserveA,
        reserveB,
      })

      expect(result.aTokenPerBToken.toFixed()).toBe('0.5')
      expect(result.bTokenPerAToken.toFixed()).toBe('2')
    })

    it('should calculate V2 prices (A Decimal < B Decimal)', () => {
      const reserveA = DexNumber.fromUnshifted('100', 6)
      const reserveB = DexNumber.fromUnshifted('200', 18)

      const result = calculatePrices({
        tokenA: mockTokenA,
        tokenB: mockTokenB,
        reserveA,
        reserveB,
      })

      expect(result.aTokenPerBToken.toFixed()).toBe('0.5')
      expect(result.bTokenPerAToken.toFixed()).toBe('2')
    })

    it('should calculate V3 prices (Same decimal)', () => {
      const reserveA = DexNumber.fromUnshifted('100', 18)
      const reserveB = DexNumber.fromUnshifted('200', 18)

      const result = calculatePricesV3(reserveA, reserveB)

      expect(result.aTokenPerBToken.toFixed()).toBeCloseTo(0.5, 18)
      expect(result.bTokenPerAToken.toFixed()).toBeCloseTo(2, 18)
    })

    it('should calculate V3 prices (A Decimal > B Decimal', () => {
      const reserveA = DexNumber.fromUnshifted('100', 18)
      const reserveB = DexNumber.fromUnshifted('200', 6)

      const result = calculatePricesV3(reserveA, reserveB)

      expect(result.aTokenPerBToken.toFixed()).toBeCloseTo(0.5, 18)
      expect(result.bTokenPerAToken.toFixed()).toBeCloseTo(2, 6)
    })

    it('should calculate V3 prices (A Decimal < B Decimal', () => {
      const reserveA = DexNumber.fromUnshifted('100', 6)
      const reserveB = DexNumber.fromUnshifted('200', 18)

      const result = calculatePricesV3(reserveA, reserveB)

      expect(result.aTokenPerBToken.toFixed()).toBeCloseTo(0.5, 6)
      expect(result.bTokenPerAToken.toFixed()).toBeCloseTo(2, 18)
    })
  })

  describe('Settings and Context Comparisons', () => {
    it('should populate default liquidity settings', () => {
      const settings = populateLiquiditySettings()

      expect(settings.slippage).toBe(0.005)
      expect(settings.deadlineMinutes).toBe(20)
      expect(settings.approveMax).toBe(true)
    })

    it('should compare liquidity token info', () => {
      const tokenInfoA: LiquidityTokenInfo<'dexnumber'> = {
        token: {
          contractAddress: '0x1',
          decimals: 18,
          symbol: 'TOKEN',
        } as Token,
        amount: DexNumber.fromUnshifted('100', 18),
        balance: DexNumber.fromUnshifted('1000', 18),
        allowance: DexNumber.fromUnshifted('2000', 18),
        hasEnoughBalance: true,
        hasEnoughAllowance: true,
        isMaxAllowance: false,
        isCoin: false,
      }

      const tokenInfoB = { ...tokenInfoA }

      expect(compareLiquidityTokenInfo(tokenInfoA, tokenInfoB)).toBe(true)
    })

    it('should identify liquidity directions correctly', () => {
      expect(isLiquidityDirection('add')).toBe(true)
      expect(isLiquidityDirection('remove')).toBe(true)
      expect(isLiquidityDirection('invalid')).toBe(false)

      expect(isLiquidityDirectionAdd('add')).toBe(true)
      expect(isLiquidityDirectionAdd('remove')).toBe(false)

      expect(isLiquidityDirectionRemove('remove')).toBe(true)
      expect(isLiquidityDirectionRemove('add')).toBe(false)
    })

    it('should identify LP token info types correctly', () => {
      const v2Info = {
        token: { contractAddress: '0x1', decimals: 18, symbol: 'LP' },
        amount: DexNumber.fromUnshifted('100', 18),
        balance: DexNumber.fromUnshifted('1000', 18),
        totalSupply: DexNumber.fromUnshifted('10000', 18),
      }

      const v3Info = {
        tokenId: '123',
        amount: DexNumber.fromUnshifted('100', 18),
        totalSupply: DexNumber.fromUnshifted('10000', 18),
        feeTier: 500,
      }

      expect(isLPTokenInfoV2(v2Info)).toBe(true)
      expect(isLPTokenInfoV2(v3Info)).toBe(false)

      expect(isLPTokenInfoV3(v3Info)).toBe(true)
      expect(isLPTokenInfoV3(v2Info)).toBe(false)
    })
  })
})
