import { describe, it, expect } from 'vitest'

import {
  MockChainId,
  MockCoin,
  MockTokenNoAllowance,
  MockAaveToken,
  MockWrapped,
  MockUniToken,
} from '../../../../test/testing-setup/src/mocks/mocks'
import {
  amountToTradeToDexNumber,
  getTradePath,
  tradeDirectionMap,
  tradePathMap,
} from '../../src/utils/trade.utils'

describe('trade.utils', () => {
  const chainId = MockChainId

  describe('getTradePath', () => {
    it('should return `TradePath.coinToToken`', () => {
      const result = getTradePath({
        chainId,
        fromToken: MockCoin,
        toToken: MockAaveToken,
        customNetworkNativeWrappedTokenInfo: undefined,
      })
      expect(result).toEqual(tradePathMap.coinToToken)
    })

    it('should return `TradePath.tokenToCoin`', () => {
      const result = getTradePath({
        chainId,
        fromToken: MockAaveToken,
        toToken: MockCoin,
        customNetworkNativeWrappedTokenInfo: undefined,
      })
      expect(result).toEqual(tradePathMap.tokenToCoin)
    })

    it('should return `TradePath.tokenToToken`', () => {
      const result = getTradePath({
        chainId,
        fromToken: MockWrapped,
        toToken: MockAaveToken,
        customNetworkNativeWrappedTokenInfo: undefined,
      })
      expect(result).toEqual(tradePathMap.tokenToToken)
    })

    it('should return `TradePath.tokenToToken`', () => {
      const result = getTradePath({
        chainId,
        fromToken: MockAaveToken,
        toToken: MockWrapped,
        customNetworkNativeWrappedTokenInfo: undefined,
      })
      expect(result).toEqual(tradePathMap.tokenToToken)
    })

    it('should return `TradePath.tokenToToken`', () => {
      const result = getTradePath({
        chainId,
        fromToken: MockAaveToken,
        toToken: MockTokenNoAllowance,
        customNetworkNativeWrappedTokenInfo: undefined,
      })
      expect(result).toEqual(tradePathMap.tokenToToken)
    })

    it('should return `TradePath.wrappedToCoin`', () => {
      const result = getTradePath({
        chainId,
        fromToken: MockWrapped,
        toToken: MockCoin,
        customNetworkNativeWrappedTokenInfo: undefined,
      })
      expect(result).toEqual(tradePathMap.wrappedToCoin)
    })

    it('should return `TradePath.coinToWrapped`', () => {
      const result = getTradePath({
        chainId,
        fromToken: MockCoin,
        toToken: MockWrapped,
        customNetworkNativeWrappedTokenInfo: undefined,
      })
      expect(result).toEqual(tradePathMap.coinToWrapped)
    })
  })

  describe('amountToTradeToDexNumber', () => {
    it('should throw an error if fromToken and toToken are the same', () => {
      expect(() =>
        amountToTradeToDexNumber({
          fromToken: MockAaveToken, // Same contract
          toToken: MockAaveToken, // Same contract
          amountToTrade: '100',
          tradeDirection: tradeDirectionMap.input,
        }),
      ).toThrow('fromToken and toToken must have a different contract address')
    })

    it('should throw an error if amountToTrade is not provided', () => {
      expect(() =>
        amountToTradeToDexNumber({
          fromToken: MockAaveToken,
          toToken: MockUniToken,
          amountToTrade: '0', // Invalid amount
          tradeDirection: tradeDirectionMap.input,
        }),
      ).toThrow('Must provide a valid amount to trade')
    })

    it('should throw an error if tradeDirection is not provided', () => {
      expect(() =>
        amountToTradeToDexNumber({
          fromToken: MockAaveToken,
          toToken: MockUniToken,
          amountToTrade: '1',
          tradeDirection: undefined as any,
        }),
      ).toThrow('Trade direction is undefined')
    })

    it('should throw an error if tradeDirection is not supported', () => {
      expect(() =>
        amountToTradeToDexNumber({
          fromToken: MockAaveToken,
          toToken: MockUniToken,
          amountToTrade: '1',
          tradeDirection: 'invalidDirection' as any,
        }),
      ).toThrow('Invalid trade direction')
    })

    describe('coin > token', () => {
      it('should format input amount', () => {
        const amount = amountToTradeToDexNumber({
          fromToken: MockCoin,
          toToken: MockAaveToken,
          amountToTrade: '1',
          tradeDirection: tradeDirectionMap.input,
        })

        expect(amount.toHexString()).toBe('0x0de0b6b3a7640000')
      })

      it('should format output amount', () => {
        const amount = amountToTradeToDexNumber({
          fromToken: MockCoin,
          toToken: MockAaveToken,
          amountToTrade: '1',
          tradeDirection: tradeDirectionMap.output,
        })

        expect(amount.toHexString()).toBe('0x0de0b6b3a7640000')
      })
    })

    describe('token > coin', () => {
      it('should format input amount', () => {
        const amount = amountToTradeToDexNumber({
          fromToken: MockAaveToken,
          toToken: MockCoin,
          amountToTrade: '1',
          tradeDirection: tradeDirectionMap.input,
        })

        expect(amount.toHexString()).toBe('0x0de0b6b3a7640000')
      })

      it('should format output amount', () => {
        const amount = amountToTradeToDexNumber({
          fromToken: MockAaveToken,
          toToken: MockCoin,
          amountToTrade: '1',
          tradeDirection: tradeDirectionMap.output,
        })

        expect(amount.toHexString()).toBe('0x0de0b6b3a7640000')
      })
    })

    describe('token > token', () => {
      it('should format input amount', () => {
        const amount = amountToTradeToDexNumber({
          fromToken: MockAaveToken,
          toToken: MockTokenNoAllowance,
          amountToTrade: '1',
          tradeDirection: tradeDirectionMap.input,
        })

        expect(amount.toHexString()).toBe('0x0de0b6b3a7640000')
      })

      it('should format output amount', () => {
        const amount = amountToTradeToDexNumber({
          fromToken: MockAaveToken,
          toToken: MockTokenNoAllowance,
          amountToTrade: '1',
          tradeDirection: tradeDirectionMap.output,
        })

        expect(amount.toHexString()).toBe('0x0de0b6b3a7640000')
      })
    })
  })
})
