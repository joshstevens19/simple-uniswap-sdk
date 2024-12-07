import { describe, it, expect } from 'vitest'

import {
  isCoinAddress,
  transformCoinAddressToWrappedAddress,
  transformWrappedAddressToCoinAddress,
  transformWrappedTokenToCoin,
  isWrappingCoin,
  isUnwrappingCoin,
  isWrappingOrUnwrappingCoin,
  stripToken,
} from '../..'
import {
  MockCoin,
  MockFunToken,
  MockWrapped,
  MockDexProvider,
} from '../../../../test/testing-setup/src/mocks/mocks'

describe('Wrapped utils', () => {
  it('should append COIN suffix to contract address', () => {
    expect(
      transformWrappedAddressToCoinAddress(MockWrapped.contractAddress),
    ).toEqual(MockCoin.contractAddress)
  })

  it('should remove COIN suffix from contract address', () => {
    expect(
      transformCoinAddressToWrappedAddress(MockCoin.contractAddress),
    ).toEqual(MockWrapped.contractAddress)
  })

  it('should mark address as native coin if it has a -COIN suffix', () => {
    expect(isCoinAddress(MockCoin.contractAddress)).toEqual(true)
  })

  it('should not mark address as native coin if it does not have -COIN suffix', () => {
    expect(isCoinAddress(MockFunToken.contractAddress)).toEqual(false)
  })

  it('should transform wrapped token into coin representation', () => {
    const coin = transformWrappedTokenToCoin(MockWrapped, {
      name: MockCoin.name,
      symbol: MockCoin.symbol,
    })

    const { chainId, contractAddress, decimals, name, symbol, standard } = coin

    expect({
      chainId,
      contractAddress,
      decimals,
      name,
      symbol,
      standard,
    }).toEqual(stripToken(MockCoin))
  })

  it('should identify wrapping coin process', () => {
    expect(
      isWrappingCoin({
        fromToken: MockCoin,
        toToken: MockWrapped,
        dexProvider: MockDexProvider,
      }),
    ).toEqual(true)
  })

  it('should identify unwrapping coin process', () => {
    expect(
      isUnwrappingCoin({
        fromToken: MockWrapped,
        toToken: MockCoin,
        dexProvider: MockDexProvider,
      }),
    ).toEqual(true)
  })

  it('should identify both wrapping and unwrapping coin process', () => {
    expect(
      isWrappingOrUnwrappingCoin({
        fromToken: MockWrapped,
        toToken: MockCoin,
        dexProvider: MockDexProvider,
      }),
    ).toEqual(true)
  })
})
