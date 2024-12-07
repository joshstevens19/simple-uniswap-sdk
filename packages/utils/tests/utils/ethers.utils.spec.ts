import { ethers } from 'ethers'
import { describe, it, expect } from 'vitest'

import { ETHCoin } from '../../src/tokens'
import {
  getAddress,
  isAddress,
  isCoinAddress,
  isSameAddress,
} from '../../src/utils/address.utils'
import {
  decodeHexString,
  decodeHexToNumber,
  isExternalProvider,
  isJsonRpcProvider,
  isProvider,
} from '../../src/utils/ethers.utils'

describe('ethers.utils', () => {
  describe('Hex String Decoding', () => {
    describe('decodeHexString', () => {
      it('should decode a valid hex string to a UTF-8 string', () => {
        const hexValue = '0x48656c6c6f20576f726c64' // "Hello World"
        expect(decodeHexString(hexValue)).toBe('Hello World')
      })

      it('should return an empty string for undefined or null', () => {
        expect(decodeHexString()).toBe('')
        expect(decodeHexString(undefined)).toBe('')
      })

      it('should return the original string if it is not a hex string', () => {
        const nonHexValue = 'Hello'
        expect(decodeHexString(nonHexValue)).toBe(nonHexValue)
      })
    })

    describe('decodeHexToNumber', () => {
      it('should decode a valid hex string to a numeric string', () => {
        const hexValue = '0x12' // 18 in decimal
        expect(decodeHexToNumber(hexValue)).toBe('18')
      })

      it('should return "0" for undefined or null', () => {
        expect(decodeHexToNumber()).toBe('0')
        expect(decodeHexToNumber(undefined)).toBe('0')
      })

      it('should return the original value if it is not a hex string', () => {
        const nonHexValue = '123'
        expect(decodeHexToNumber(nonHexValue)).toBe(nonHexValue)
      })
    })
  })

  describe('getAddress', () => {
    it('should format coin address and remove the suffix', () => {
      expect(
        isCoinAddress(getAddress(ETHCoin.ETH.MAINNET().contractAddress)),
      ).toEqual(false)
    })

    it('should format coin address and keep the suffix', () => {
      expect(
        isCoinAddress(getAddress(ETHCoin.ETH.MAINNET().contractAddress, true)),
      ).toEqual(true)
    })

    it('should turn address to checksum', () => {
      expect(
        getAddress(ETHCoin.ETH.MAINNET().contractAddress.toLowerCase()),
      ).toEqual('0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2')
    })
  })

  describe('isAddress', () => {
    it('should return true if its a valid ethereum address type', () => {
      expect(isAddress('0x45Cd08334aeedd8a06265B2Ae302E3597d8fAA28')).toEqual(
        true,
      )
    })

    it('should return true if its a valid ethereum token', () => {
      expect(isAddress(ETHCoin.ETH.MAINNET().contractAddress)).toEqual(true)
    })

    it('should return true if its a valid contract address type', () => {
      expect(isAddress('0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984')).toEqual(
        true,
      )
    })

    it('should return false when its a invalid address', () => {
      expect(isAddress('0xC1912fEE45d61C87Cc5EA59DaE31190FFFFf232d')).toEqual(
        false,
      )
    })

    it('should return false when its a invalid address', () => {
      expect(isAddress('0x0')).toEqual(false)
    })
  })

  describe('isSameAddress', () => {
    it('should return true if they are all valid ethereum addresses', () => {
      expect(
        isSameAddress(
          '0x45Cd08334aeedd8a06265B2Ae302E3597d8fAA28',
          '0x45cd08334aeedd8a06265b2ae302e3597d8faa28',
        ),
      ).toEqual(true)
    })

    it('should return false when one of them is a invalid address', () => {
      expect(
        isSameAddress('0xC1912fEE45d61C87Cc5EA59DaE31190FFFFf232d', '0xaaaaa'),
      ).toEqual(false)
    })

    it('should return false when both of them are invalid address', () => {
      expect(isSameAddress('0x0', '0x1')).toEqual(false)
    })
  })

  describe('Provider Utilities', () => {
    it('should identify a Provider', () => {
      const mockProvider = new ethers.providers.JsonRpcProvider()
      expect(isProvider(mockProvider)).toBe(true)
    })

    it('should identify a JsonRpcProvider', () => {
      const mockProvider = new ethers.providers.JsonRpcProvider()
      expect(isJsonRpcProvider(mockProvider)).toBe(true)
    })

    it('should identify an ExternalProvider', () => {
      const mockProvider = {
        host: 'localhost',
        isMetaMask: true,
      }
      expect(isExternalProvider(mockProvider)).toBe(true)
    })
  })

  // Provider Tests
  describe('Provider Utilities', () => {
    it('should identify a Provider', () => {
      const mockProvider = new ethers.providers.JsonRpcProvider()
      expect(isProvider(mockProvider)).toBe(true)
    })

    it('should identify a JsonRpcProvider', () => {
      const mockProvider = new ethers.providers.JsonRpcProvider()
      expect(isJsonRpcProvider(mockProvider)).toBe(true)
    })

    it('should identify an ExternalProvider', () => {
      const mockProvider = {
        host: 'localhost',
        isMetaMask: true,
      }
      expect(isExternalProvider(mockProvider)).toBe(true)
    })
  })
})
