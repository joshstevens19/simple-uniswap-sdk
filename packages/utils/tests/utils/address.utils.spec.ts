import { ethers } from 'ethers'
import { describe, it, expect } from 'vitest'

import { MockWrapped } from '../../../../test/testing-setup/src/mocks/mocks'
import { isAddresses } from '../../dist/esm'
import {
  COIN_SUFFIX,
  transformWrappedAddressToCoinAddress,
  transformCoinAddressToWrappedAddress,
  isCoinAddress,
  getAddress,
  isAddress,
  isSameAddress,
} from '../../src/utils/address.utils'

describe('Address Utils', () => {
  const wrappedAddress = MockWrapped.contractAddress
  const coinAddress = `${wrappedAddress}${COIN_SUFFIX}`
  const checksumAddress = ethers.utils.getAddress(wrappedAddress)

  describe('transformWrappedAddressToCoinAddress', () => {
    it('should append COIN suffix to contract address', () => {
      expect(transformWrappedAddressToCoinAddress(wrappedAddress)).toEqual(
        coinAddress,
      )
    })

    it('should return the same address if COIN suffix already exists', () => {
      expect(transformWrappedAddressToCoinAddress(coinAddress)).toEqual(
        coinAddress,
      )
    })
  })

  describe('transformCoinAddressToWrappedAddress', () => {
    it('should remove COIN suffix from contract address', () => {
      expect(transformCoinAddressToWrappedAddress(coinAddress)).toEqual(
        wrappedAddress,
      )
    })

    it('should return the same address if COIN suffix does not exist', () => {
      expect(transformCoinAddressToWrappedAddress(wrappedAddress)).toEqual(
        wrappedAddress,
      )
    })
  })

  describe('isCoinAddress', () => {
    it('should return true for COIN address', () => {
      expect(isCoinAddress(coinAddress)).toEqual(true)
    })

    it('should return false for wrapped token address', () => {
      expect(isCoinAddress(wrappedAddress)).toEqual(false)
    })
  })

  describe('getAddress', () => {
    it('should return checksummed address', () => {
      const result = getAddress(wrappedAddress)
      expect(result).toEqual(checksumAddress)
    })

    it('should return COIN address if keepEthPrefix is true', () => {
      const result = getAddress(coinAddress, true)
      expect(result).toEqual(coinAddress)
    })
  })

  describe('isAddress', () => {
    it('should return true for valid Ethereum address', () => {
      expect(isAddress(wrappedAddress)).toEqual(true)
    })

    it('should return false for invalid Ethereum address', () => {
      expect(isAddress('invalid_address')).toEqual(false)
    })
  })

  describe('isAddresses', () => {
    it('should return true for valid Ethereum addresses', () => {
      expect(isAddresses([wrappedAddress, coinAddress])).toEqual(true)
    })

    it('should return false for invalid Ethereum addresses', () => {
      expect(isAddresses(['invalid_address', 'invalid_address'])).toEqual(false)
    })
  })

  describe('isSameAddress', () => {
    it('should return true for identical addresses', () => {
      expect(isSameAddress(wrappedAddress, wrappedAddress)).toEqual(true)
    })

    it('should return false for different addresses', () => {
      expect(isSameAddress(wrappedAddress, coinAddress)).toEqual(false)
    })

    it('should return true for the same address with different case', () => {
      const lowerCaseAddress = wrappedAddress.toLowerCase()
      const upperCaseAddress = `0x${wrappedAddress.slice(2).toUpperCase()}`
      expect(isSameAddress(lowerCaseAddress, upperCaseAddress)).toEqual(true)
    })
  })
})
