import { DexNumber } from '@dex-toolkit/number'
import type { Token, PoolReserve } from '@dex-toolkit/types'
import { describe, it, expect } from 'vitest'

import {
  MockAaveToken,
  MockUniToken,
  MockWrapped,
} from '../../../../test/testing-setup/src/mocks/mocks'
import {
  addReservesFetchToMulticallContext,
  calculateTokenPrice,
  DexError,
  ErrorCodes,
  getTokenPrice,
} from '../../src'

describe('Price Utilities', () => {
  // Mock pool reserves setup
  const mockDirectPool = {
    token0: {
      address: MockUniToken.contractAddress,
      reserve: DexNumber.fromUnshifted('1000', 18),
    },
    token1: {
      address: MockAaveToken.contractAddress,
      reserve: DexNumber.fromUnshifted('2000', 18),
    },
  } as PoolReserve

  describe('calculateTokenPrice', () => {
    it('should calculate direct price correctly', () => {
      const price = calculateTokenPrice(
        MockUniToken,
        MockAaveToken,
        mockDirectPool,
      )
      expect(price.toFixed()).toBe('2') // 2000/1000 = 2
    })

    it('should calculate price correctly when token positions are reversed', () => {
      const reversedPool = {
        token0: {
          address: MockAaveToken.contractAddress,
          reserve: DexNumber.fromUnshifted('2000', 18),
        },
        token1: {
          address: MockUniToken.contractAddress,
          reserve: DexNumber.fromUnshifted('1000', 18),
        },
      } as PoolReserve

      const price = calculateTokenPrice(
        MockUniToken,
        MockAaveToken,
        reversedPool,
      )
      expect(price.toFixed()).toBe('2')
    })

    it('should throw error when token not found in pool', () => {
      const invalidToken = {
        contractAddress: '0xinvalid',
        symbol: 'INVALID',
        decimals: 18,
      } as Token

      expect(() =>
        calculateTokenPrice(invalidToken, MockAaveToken, mockDirectPool),
      ).toThrow(
        new DexError(
          'Token not found in pool reserves',
          ErrorCodes.tokenNotFoundInReserves,
        ),
      )
    })

    it('should throw error when base token not found in pool', () => {
      const invalidBaseToken = {
        contractAddress: '0xinvalid',
        symbol: 'INVALID',
        decimals: 18,
      } as Token

      expect(() =>
        calculateTokenPrice(MockUniToken, invalidBaseToken, mockDirectPool),
      ).toThrow(
        new DexError(
          'Base token not found in pool reserves',
          ErrorCodes.tokenNotFoundInReserves,
        ),
      )
    })
  })

  describe('getTokenPrice', () => {
    const isolatedPool = {
      token0: {
        address: MockUniToken.contractAddress,
        reserve: DexNumber.fromUnshifted('1000', 18),
      },
      token1: {
        address: MockWrapped.contractAddress,
        reserve: DexNumber.fromUnshifted('1500', 18),
      },
    } as PoolReserve

    // Setup for multi-hop tests
    const mockPools = [
      // Direct pool: Token -> Base (1000:2000)
      mockDirectPool,
      // Intermediate pools
      isolatedPool,
      {
        token0: {
          address: MockWrapped.contractAddress,
          reserve: DexNumber.fromUnshifted('1500', 18),
        },
        token1: {
          address: MockAaveToken.contractAddress,
          reserve: DexNumber.fromUnshifted('3000', 18),
        },
      },
    ] as PoolReserve[]

    it('should find direct route when available', () => {
      const price = getTokenPrice(MockUniToken, MockAaveToken, [mockDirectPool])
      expect(price.toFixed()).toBe('2')
    })

    it('should find multi-hop route when direct route unavailable', () => {
      const poolsWithoutDirect = mockPools.slice(1) // Remove direct pool
      const price = getTokenPrice(
        MockUniToken,
        MockAaveToken,
        poolsWithoutDirect,
      )

      // Price should be (1500/1000) * (3000/1500) = 3
      expect(price.toFixed()).toBe('3')
    })

    it('should respect maxHops parameter', () => {
      const poolsWithoutDirect = mockPools.slice(1)

      expect(() =>
        getTokenPrice(MockUniToken, MockAaveToken, poolsWithoutDirect, 1),
      ).toThrow(
        new DexError(
          'No route found to calculate token price',
          ErrorCodes.noRoutesFound,
        ),
      )
    })

    it('should throw error when no route found', () => {
      expect(() =>
        getTokenPrice(MockUniToken, MockAaveToken, [isolatedPool]),
      ).toThrow(
        new DexError(
          'No route found to calculate token price',
          ErrorCodes.noRoutesFound,
        ),
      )
    })
  })

  describe('addReservesFetchToMulticallContext', () => {
    it('should add correct call to multicall context', () => {
      const factoryAddress = '0xfactory'
      const initialContext = { calls: [] }

      const updatedContext = addReservesFetchToMulticallContext(
        initialContext,
        MockUniToken,
        MockAaveToken,
        factoryAddress,
      )

      expect(updatedContext.calls).toHaveLength(1)
      expect(updatedContext.calls[0]).toEqual({
        reference: `getReserves-${MockUniToken.contractAddress}-${MockAaveToken.contractAddress}`,
        methodName: 'getPair',
        methodParameters: [
          MockUniToken.contractAddress,
          MockAaveToken.contractAddress,
        ],
        contractAddress: factoryAddress,
      })
    })

    it('should preserve existing context calls', () => {
      const factoryAddress = '0xfactory'
      const initialContext = {
        calls: [
          {
            reference: 'existingCall',
            methodName: 'existingMethod',
            methodParameters: [],
            contractAddress: '0xexisting',
          },
        ],
      }

      const updatedContext = addReservesFetchToMulticallContext(
        initialContext,
        MockUniToken,
        MockAaveToken,
        factoryAddress,
      )

      expect(updatedContext.calls).toHaveLength(2)
      expect(updatedContext.calls[0]).toEqual(initialContext.calls[0])
    })
  })
})
