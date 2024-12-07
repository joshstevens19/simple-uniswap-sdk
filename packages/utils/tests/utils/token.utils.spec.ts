import type { Token } from '@dex-toolkit/types'
import { BigNumber } from 'ethers'
import { describe, it, expect } from 'vitest'

import {
  MockCoin,
  MockFunToken,
  MockWrapped,
  MockChainId,
} from '../../../../test/testing-setup/src/mocks/mocks'
import {
  getTokenByChainId,
  getAllTokensForChainId,
  stripToken,
  filterUndefinedTokens,
  filterNativeTokens,
  normalizeTokenAttributes,
} from '../../src/utils/token.utils'

describe('Token utils', () => {
  describe('getTokenByChainId', () => {
    it('should return a token when valid symbol and chainId are provided', () => {
      const result = getTokenByChainId({
        symbol: MockCoin.symbol,
        chainId: MockChainId,
      })

      expect(result).toBeDefined()
      expect(result?.contractAddress).toEqual(MockCoin.contractAddress)
    })

    it('should return undefined if token is not found for the provided symbol', () => {
      const result = getTokenByChainId({
        symbol: 'INVALID',
        chainId: MockChainId,
      })
      expect(result).toBeUndefined()
    })
  })

  describe('getAllTokensForChainId', () => {
    it('should return all tokens for a chainId', () => {
      const result = getAllTokensForChainId(MockChainId)
      expect(result.length).toBeGreaterThan(0)
      expect(result).toContainEqual(MockCoin)
    })
  })

  describe('normalizeTokenAttributes', () => {
    it('should normalize a token with valid hex strings and BigNumber decimals', () => {
      const inputToken = {
        name: '0x48656c6c6f20576f726c64', // "Hello World"
        symbol: '0x48574c44', // "HWLD"
        decimals: BigNumber.from('18'),
        contractAddress: '0x1234567890abcdef1234567890abcdef12345678',
        chainId: 1,
        standard: 'ERC20',
      } as unknown as Token

      const normalizedToken = normalizeTokenAttributes(inputToken)

      expect(normalizedToken).toEqual({
        name: 'Hello World',
        symbol: 'HWLD',
        decimals: 18,
        contractAddress: '0x1234567890abcdef1234567890abcdef12345678',
        chainId: 1,
        standard: 'ERC20',
      })
    })

    it('should handle undefined values gracefully', () => {
      const inputToken = {
        name: undefined,
        symbol: undefined,
        decimals: undefined,
        contractAddress: '0x1234567890abcdef1234567890abcdef12345678',
        chainId: 1,
        standard: 'ERC20',
      } as unknown as Token

      const normalizedToken = normalizeTokenAttributes(inputToken)

      expect(normalizedToken).toEqual({
        name: '',
        symbol: '',
        decimals: 0,
        contractAddress: '0x1234567890abcdef1234567890abcdef12345678',
        chainId: 1,
        standard: 'ERC20',
      })
    })

    it('should return the original name and symbol if not in hex format', () => {
      const inputToken = {
        name: 'Regular Name',
        symbol: 'RN',
        decimals: 6,
        contractAddress: '0x1234567890abcdef1234567890abcdef12345678',
        chainId: 1,
        standard: 'ERC20',
      } as unknown as Token

      const normalizedToken = normalizeTokenAttributes(inputToken)

      expect(normalizedToken).toEqual({
        name: 'Regular Name',
        symbol: 'RN',
        decimals: 6,
        contractAddress: '0x1234567890abcdef1234567890abcdef12345678',
        chainId: 1,
        standard: 'ERC20',
      })
    })
  })

  describe('stripToken', () => {
    it('should strip token of extra properties', () => {
      const strippedToken = stripToken(MockCoin)
      expect(strippedToken).toEqual({
        contractAddress: MockCoin.contractAddress,
        symbol: MockCoin.symbol,
        name: MockCoin.name,
        decimals: MockCoin.decimals,
        chainId: MockCoin.chainId,
        standard: MockCoin.standard,
      })
    })
  })

  describe('filterUndefinedTokens', () => {
    it('should filter out undefined tokens from a two-dimensional array', () => {
      const tokens = [
        [MockCoin, MockFunToken],
        [MockCoin, undefined],
      ]
      const filtered = filterUndefinedTokens(tokens)
      expect(filtered.length).toBe(1)
      expect(filtered[0]).toEqual([MockCoin, MockFunToken])
    })
  })

  describe('filterNativeTokens', () => {
    it('should filter out native tokens and return the rest', () => {
      const tokens = [MockCoin, MockWrapped, MockFunToken]
      const filtered = filterNativeTokens({
        tokens,
        nativeWrappedTokenInfo: MockWrapped,
      })
      expect(filtered).toEqual([MockFunToken])
    })
  })
})
