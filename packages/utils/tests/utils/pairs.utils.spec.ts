import { DexNumber } from '@dex-toolkit/number'
import type { PoolReserve } from '@dex-toolkit/types'
import { describe, it, expect } from 'vitest'

import {
  MockCoin,
  MockFunToken,
  MockUniToken,
  MockWrapped,
  MockUNIToWPLSPairAddressV2,
  MockDAIToWPLSPairAddressV2,
  MockDAIToUSDTPairAddressV2,
  MockDaiToken,
  MockUsdtToken,
  MockAaveToken,
  MockAaveToWPLSPairAddressV2,
} from '../../../../test/testing-setup/src/mocks/mocks'
import {
  calculateLiquidityProviderFee,
  calculatePriceImpact,
} from '../../src/utils/pairs.utils'
import { tradeDirectionMap } from '../../src/utils/trade.utils'

describe('Pair and Fee Calculations', () => {
  describe('calculateLiquidityProviderFee', () => {
    const baseConvertRequest = DexNumber.fromUnshifted(1, 18)
    const expectedConvertQuote = DexNumber.fromUnshifted(1000, 18)
    const fromTokenDecimals = 18

    it('should calculate liquidity provider fee for V2 correctly with input direction', () => {
      const result = calculateLiquidityProviderFee({
        tradeDirection: tradeDirectionMap.input,
        baseConvertRequest, // Fee is calculated based on this
        expectedConvertQuote,
        liquidityProviderFeePercent: 0.003, // 0.3% fee for V2
        fromTokenDecimals,
      })
      expect(result).toEqual('0.003000000000000000') // Expected fee
    })

    it('should calculate liquidity provider fee for V2 correctly with output direction', () => {
      const result = calculateLiquidityProviderFee({
        tradeDirection: tradeDirectionMap.output,
        baseConvertRequest,
        expectedConvertQuote, // Fee is calculated based on this
        liquidityProviderFeePercent: 0.003, // 0.3% fee
        fromTokenDecimals,
      })
      expect(result).toEqual('3.000000000000000000') // Correct fee (1000 * 0.003)
    })

    it('should calculate liquidity provider fee for V3 correctly with input direction', () => {
      const result = calculateLiquidityProviderFee({
        tradeDirection: tradeDirectionMap.input,
        baseConvertRequest, // Fee is calculated based on this
        expectedConvertQuote,
        liquidityProviderFeePercent: [0.003, 0.001], // Multiple fees for V3
        fromTokenDecimals,
      })
      expect(result).toEqual(['0.003000000000000000', '0.001000000000000000'])
    })

    it('should calculate liquidity provider fee for V3 correctly with output direction', () => {
      const result = calculateLiquidityProviderFee({
        tradeDirection: tradeDirectionMap.output,
        baseConvertRequest,
        expectedConvertQuote, // Fee is calculated based on this
        liquidityProviderFeePercent: [0.003, 0.001], // Multiple fees for V3
        fromTokenDecimals,
      })
      expect(result).toEqual(['3.000000000000000000', '1.000000000000000000'])
    })

    it('should throw an error if an invalid trade direction is passed', () => {
      expect(() =>
        calculateLiquidityProviderFee({
          tradeDirection: 'invalid' as any,
          baseConvertRequest,
          expectedConvertQuote,
          liquidityProviderFeePercent: 0.003,
          fromTokenDecimals,
        }),
      ).toThrow('Invalid trade direction: invalid')
    })
  })

  describe('calculatePriceImpact', async () => {
    it('should calculate the price impact correctly (1 hop)', async () => {
      const reserves: PoolReserve[] = [
        {
          token0: {
            address: MockUniToken.contractAddress,
            reserve: DexNumber.fromUnshifted(38949, MockUniToken.decimals),
          },
          token1: {
            address: MockWrapped.contractAddress,
            reserve: DexNumber.fromUnshifted(954813, MockWrapped.decimals),
          },
          pairAddress: MockUNIToWPLSPairAddressV2,
        },
      ]

      const result = await calculatePriceImpact({
        tokenAmount: DexNumber.fromUnshifted(100, MockUniToken.decimals),
        expectedOutputAmount: DexNumber.fromUnshifted(
          2438,
          MockWrapped.decimals,
        ),
        reserves,
        routePathTokens: [MockUniToken, MockWrapped, MockAaveToken],
        liquidityProviderFeePercent: 0.003,
      })

      expect(result.isMinimal).toBe(false)
      expect(result.percentage).toBe('0.25')
    })

    it('should calculate the price impact correctly (2 hops)', async () => {
      const reserves: PoolReserve[] = [
        {
          token0: {
            address: MockUniToken.contractAddress,
            reserve: DexNumber.fromUnshifted(38949, MockUniToken.decimals),
          },
          token1: {
            address: MockWrapped.contractAddress,
            reserve: DexNumber.fromUnshifted(954813, MockWrapped.decimals),
          },
          pairAddress: MockUNIToWPLSPairAddressV2,
        },
        {
          token0: {
            address: MockWrapped.contractAddress,
            reserve: DexNumber.fromUnshifted(1276581, MockWrapped.decimals),
          },
          token1: {
            address: MockAaveToken.contractAddress,
            reserve: DexNumber.fromUnshifted(709, MockAaveToken.decimals),
          },
          pairAddress: MockAaveToWPLSPairAddressV2,
        },
      ]

      const result = await calculatePriceImpact({
        tokenAmount: DexNumber.fromUnshifted(100, MockUniToken.decimals),
        expectedOutputAmount: DexNumber.fromUnshifted(
          1,
          MockAaveToken.decimals,
        ),
        reserves,
        routePathTokens: [MockUniToken, MockWrapped, MockAaveToken],
        liquidityProviderFeePercent: 0.003,
      })

      expect(result.isMinimal).toBe(false)
      expect(result.percentage).toBe('0.44')
    })

    it('should calculate the price impact correctly (3 hops)', async () => {
      const reserves: PoolReserve[] = [
        {
          token0: {
            address: MockUniToken.contractAddress,
            reserve: DexNumber.fromUnshifted(38949, MockUniToken.decimals),
          },
          token1: {
            address: MockWrapped.contractAddress,
            reserve: DexNumber.fromUnshifted(954813, MockWrapped.decimals),
          },
          pairAddress: MockUNIToWPLSPairAddressV2,
        },
        {
          token0: {
            address: MockWrapped.contractAddress,
            reserve: DexNumber.fromUnshifted(2224583934, MockWrapped.decimals),
          },
          token1: {
            address: MockDaiToken.contractAddress,
            reserve: DexNumber.fromUnshifted(7580596843, MockDaiToken.decimals),
          },
          pairAddress: MockDAIToWPLSPairAddressV2,
        },
        {
          token0: {
            address: MockDaiToken.contractAddress,
            reserve: DexNumber.fromUnshifted(2934841, MockDaiToken.decimals),
          },
          token1: {
            address: MockUsdtToken.contractAddress,
            reserve: DexNumber.fromUnshifted(369183, MockUsdtToken.decimals),
          },
          pairAddress: MockDAIToUSDTPairAddressV2,
        },
      ]

      const result = await calculatePriceImpact({
        tokenAmount: DexNumber.fromUnshifted('10', MockUniToken.decimals),
        expectedOutputAmount: DexNumber.fromUnshifted(
          '104',
          MockUsdtToken.decimals,
        ),
        reserves,
        routePathTokens: [
          MockUniToken,
          MockWrapped,
          MockDaiToken,
          MockUsdtToken,
        ],
        liquidityProviderFeePercent: 0.003,
      })

      expect(result.isMinimal).toBe(false)
      expect(result.percentage).toBe('0.05')
    })

    it('should return 0 if amountToTrade is zero', async () => {
      const result = await calculatePriceImpact({
        tokenAmount: DexNumber.fromUnshifted(0, MockUniToken.decimals),
        expectedOutputAmount: DexNumber.fromUnshifted(
          90,
          MockUsdtToken.decimals,
        ),
        reserves: [],
        routePathTokens: [],
        liquidityProviderFeePercent: 0.003,
      })
      expect(result.isMinimal).toBe(false)
      expect(result.percentage).toBe('0')
    })

    it('should throw an error if token decimals are missing', async () => {
      const reserves = [
        {
          token0: {
            address: MockCoin.contractAddress,
            reserve: DexNumber.fromUnshifted(1000, MockCoin.decimals),
          },
          token1: {
            address: MockFunToken.contractAddress,
            reserve: DexNumber.fromUnshifted(5000, MockFunToken.decimals),
          },
          pairAddress: '',
        },
      ]
      await expect(
        calculatePriceImpact({
          tokenAmount: DexNumber.fromUnshifted(100, MockCoin.decimals),
          expectedOutputAmount: DexNumber.fromUnshifted(
            90,
            MockFunToken.decimals,
          ),
          reserves,
          routePathTokens: [
            { ...MockCoin, decimals: undefined as unknown as number },
            MockFunToken,
          ],
          liquidityProviderFeePercent: 0.003,
        }),
      ).rejects.toThrowError(
        `Token decimals not found for token: ${MockCoin.contractAddress} or ${MockFunToken.contractAddress}`,
      )
    })
  })
})
