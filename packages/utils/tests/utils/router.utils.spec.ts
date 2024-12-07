import { DexNumber } from '@dex-toolkit/number'
import type {
  RouteQuote,
  RouteQuotesByDex,
  RoutePath,
  DexTag,
  VersionedRoutePathsByDex,
} from '@dex-toolkit/types'
import { describe, it, expect } from 'vitest'

import {
  MockUniToken,
  MockAaveToken,
  MockFunToken,
} from '../../../../test/testing-setup/src/mocks/mocks'
import {
  feeToPercent,
  percentToFeeTier,
  isUniqueRoute,
  routeQuotesToRouteQuotesByDex,
  getBestQuoteFromRouteQuotesByDex,
  convertVersionedRoutePathsByDexToRoutePathsByDex,
  isLiquidityProviderFeeV2,
  isLiquidityProviderFeeV3,
  isLiquidityProviderFeePercentV2,
  isLiquidityProviderFeePercentV3,
} from '../../src/utils/router.utils'

describe('Router and Fee Utilities', () => {
  describe('Fee Amount Utilities', () => {
    it('should convert fee amount to percentage', () => {
      expect(feeToPercent(500)).toBe(0.0005)
      expect(feeToPercent(3000)).toBe(0.003)
      expect(feeToPercent(10000)).toBe(0.01)
    })

    it('should convert percentage to fee amount', () => {
      expect(percentToFeeTier(0.0005)).toBe(500)
      expect(percentToFeeTier(0.003)).toBe(3000)
      expect(percentToFeeTier(0.01)).toBe(10000)
    })
  })

  describe('Route Helpers', () => {
    it('should identify unique routes', () => {
      const route: RoutePath = {
        route: [MockFunToken, MockAaveToken],
        pairAddresses: ['0xabc'],
        liquidityProviderFeePercent: [0.003],
        dexTag: 'UNISWAP',
        protocol: 'protocolV2',
        version: { major: 1, minor: 0, patch: 0 },
      }
      const existingRoutes: RoutePath[] = [
        {
          route: [MockFunToken, MockUniToken],
          pairAddresses: ['0xdef'],
          liquidityProviderFeePercent: [0.003],
          dexTag: 'UNISWAP',
          protocol: 'protocolV2',
          version: { major: 1, minor: 0, patch: 0 },
        },
      ]
      expect(isUniqueRoute(route, existingRoutes)).toBe(true)
    })

    it('should convert route quotes to route quotes by dex', () => {
      const dexTag: DexTag = 'UNISWAP'

      const routeQuotes: RouteQuote[] = [
        {
          dexTag,
          protocol: 'protocolV2',
          version: { major: 1, minor: 0, patch: 0 },
          expectedConvertQuote: DexNumber.fromUnshifted(100, 18),
          expectedConvertQuoteOrTokenAmountInMaxWithSlippage:
            DexNumber.fromUnshifted(90, 18),
          transaction: {} as any,
          tradeExpires: Date.now(),
          routePathTokens: [],
          routePathText: '',
          routePathAddresses: [],
          pairAddresses: [],
          liquidityProviderFeePercent: 0.003,
          tradeDirection: 'input',
        },
      ]
      const result = routeQuotesToRouteQuotesByDex(routeQuotes)
      expect(result).toHaveProperty(dexTag)
      expect(result[dexTag]?.length).toBe(1)
    })

    it('should get the best quote from route quotes by dex', () => {
      const routeQuotesByDex: Partial<RouteQuotesByDex> = {
        UNISWAP: [
          {
            dexTag: 'UNISWAP',
            protocol: 'protocolV2',
            version: { major: 1, minor: 0, patch: 0 },
            expectedConvertQuote: DexNumber.fromUnshifted(100, 18),
            expectedConvertQuoteOrTokenAmountInMaxWithSlippage:
              DexNumber.fromUnshifted(90, 18),
            transaction: {} as any,
            tradeExpires: Date.now(),
            routePathTokens: [],
            routePathText: '',
            routePathAddresses: [],
            pairAddresses: [],
            liquidityProviderFeePercent: 0.003,
            tradeDirection: 'input',
          },
        ],
        SUSHISWAP: [
          {
            dexTag: 'SUSHISWAP',
            protocol: 'protocolV2',
            version: { major: 1, minor: 0, patch: 0 },
            expectedConvertQuote: DexNumber.fromUnshifted(200, 18),
            expectedConvertQuoteOrTokenAmountInMaxWithSlippage:
              DexNumber.fromUnshifted(180, 18),
            transaction: {} as any,
            tradeExpires: Date.now(),
            routePathTokens: [],
            routePathText: '',
            routePathAddresses: [],
            pairAddresses: [],
            liquidityProviderFeePercent: 0.003,
            tradeDirection: 'input',
          },
        ],
      }

      const bestQuote = getBestQuoteFromRouteQuotesByDex(
        routeQuotesByDex as RouteQuotesByDex,
      )

      expect(bestQuote?.expectedConvertQuote.toReadableString()).toBe(
        DexNumber.fromUnshifted(200, 18).toReadableString(),
      )
    })
  })

  describe('convertVersionedRoutePathsByDexToRoutePathsByDex', () => {
    const mockRoutePathV2: RoutePath = {
      route: [MockFunToken, MockAaveToken],
      pairAddresses: ['0xPair1'],
      liquidityProviderFeePercent: [0.003],
      dexTag: 'UNISWAP',
      protocol: 'protocolV3',
      version: { major: 1, minor: 0, patch: 0 },
    }

    const mockRoutePathV3: RoutePath = {
      route: [MockFunToken, MockUniToken],
      pairAddresses: ['0xPair2'],
      liquidityProviderFeePercent: [0.003],
      dexTag: 'UNISWAP',
      protocol: 'protocolV3',
      version: { major: 1, minor: 0, patch: 0 },
    }

    const versionedRoutePathsByDex: Partial<VersionedRoutePathsByDex> = {
      UNISWAP: { protocolV2: [mockRoutePathV2], protocolV3: [mockRoutePathV3] },
      SUSHISWAP: {
        protocolV2: [mockRoutePathV2],
        protocolV3: [mockRoutePathV3],
      },
    }

    it('should convert versioned route paths by dex to route paths by dex for v2', () => {
      const result = convertVersionedRoutePathsByDexToRoutePathsByDex(
        versionedRoutePathsByDex as VersionedRoutePathsByDex,
        'protocolV2',
      )

      expect(result).toHaveProperty('UNISWAP')
      expect(result.UNISWAP).toEqual([mockRoutePathV2])
      expect(result).toHaveProperty('SUSHISWAP')
      expect(result.SUSHISWAP).toEqual([mockRoutePathV2])
    })

    it('should convert versioned route paths by dex to route paths by dex for v3', () => {
      const result = convertVersionedRoutePathsByDexToRoutePathsByDex(
        versionedRoutePathsByDex as VersionedRoutePathsByDex,
        'protocolV3',
      )

      expect(result).toHaveProperty('UNISWAP')
      expect(result.UNISWAP).toEqual([mockRoutePathV3])
      expect(result).toHaveProperty('SUSHISWAP')
      expect(result.SUSHISWAP).toEqual([mockRoutePathV3])
    })

    it('should return an empty object if no route paths exist for the dex version', () => {
      const emptyVersionedRoutePathsByDex: Partial<VersionedRoutePathsByDex> = {
        UNISWAP: { protocolV2: [], protocolV3: [] },
      }

      const result = convertVersionedRoutePathsByDexToRoutePathsByDex(
        emptyVersionedRoutePathsByDex as VersionedRoutePathsByDex,
        'protocolV2',
      )

      expect(result).toEqual({ UNISWAP: [] })
    })
  })

  describe('Type Guards', () => {
    it('should identify v2 liquidity provider fee', () => {
      expect(isLiquidityProviderFeeV2('500')).toBe(true)
    })

    it('should identify v3 liquidity provider fee', () => {
      expect(isLiquidityProviderFeeV3(['500', '3000'])).toBe(true)
    })

    it('should identify v2 liquidity provider fee percent', () => {
      expect(isLiquidityProviderFeePercentV2(500)).toBe(true)
    })

    it('should identify v3 liquidity provider fee percent', () => {
      expect(isLiquidityProviderFeePercentV3([500, 3000])).toBe(true)
    })
  })
})
