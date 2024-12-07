import { ethers } from 'ethers'
import { isHexString } from 'ethers/lib/utils'
import { describe, it, expect } from 'vitest'

import {
  MockChainId,
  MockWrapped,
  MockFunToken,
  MockDexConfig,
  MockDexProvider,
  MockDexVersionTagV2,
} from '../../../../test/testing-setup/src/mocks/mocks'
import { FactoryContractV2 } from '../../src/factory/factory-v2.contract'

if (MockDexConfig.protocols.protocolV2) {
  describe('FactoryContractV2', () => {
    const { factory } =
      MockDexConfig.protocols.protocolV2?.[MockDexVersionTagV2] ?? {}

    if (!factory) {
      throw new Error('Factory not found')
    }

    const contract = new FactoryContractV2(
      {
        chainId: MockChainId,
        provider: MockDexProvider.provider,
        tryAggregate: true,
      },
      factory,
    )

    // ------------------------
    // Testing read methods
    // ------------------------

    it('should return the correct allPairs address', async () => {
      const result = await contract.allPairs('0x01')
      expect(result).toMatch(/^0x[a-fA-F0-9]{40}$/)
    })

    it('should return the correct allPairsLength', async () => {
      const result = await contract.allPairsLength()
      expect(result?._isBigNumber).toEqual(true)
    })

    it('should return the correct feeTo address', async () => {
      const result = await contract.feeTo()
      expect(isHexString(result)).toEqual(true)
    })

    it('should return the correct feeToSetter address', async () => {
      const result = await contract.feeToSetter()
      expect(isHexString(result)).toEqual(true)
    })

    it('should return the correct pair address for given tokens', async () => {
      const result = await contract.getPair(
        MockWrapped.contractAddress,
        MockFunToken.contractAddress,
      )
      expect(result).toMatch(/^0x[a-fA-F0-9]{40}$/)
    })

    // ------------------------
    // Testing encode methods
    // ------------------------

    it('should correctly encode the createPair function', () => {
      const result = contract.encodeCreatePair(
        MockFunToken.contractAddress,
        MockWrapped.contractAddress,
      )
      expect(result).toMatch(/^0x[a-fA-F0-9]+$/)
    })

    it('should correctly encode the setFeeTo function', () => {
      const result = contract.encodeSetFeeTo(
        '0x05B0c1D8839eF3a989B33B6b63D3aA96cB7Ec142',
      )
      expect(result).toEqual(
        '0xf46901ed00000000000000000000000005b0c1d8839ef3a989b33b6b63d3aa96cb7ec142',
      )
    })

    it('should correctly encode the setFeeToSetter function', () => {
      const result = contract.encodeSetFeeToSetter(
        '0x05B0c1D8839eF3a989B33B6b63D3aA96cB7Ec142',
      )
      expect(result).toEqual(
        '0xa2e74af600000000000000000000000005b0c1d8839ef3a989b33b6b63d3aa96cb7ec142',
      )
    })

    // ------------------------
    // Testing Multicall
    // ------------------------

    it('should correctly perform a multicall', async () => {
      const {
        results: { allPairs, allPairsLength, feeTo, feeToSetter, getPair },
      } = await contract.call({
        allPairs: contract.allPairsCallContext('0x01'),
        allPairsLength: contract.allPairsLengthCallContext(),
        feeTo: contract.feeToCallContext(),
        feeToSetter: contract.feeToSetterCallContext(),
        getPair: contract.getPairCallContext(
          MockWrapped.contractAddress,
          MockFunToken.contractAddress,
        ),
      })

      expect(allPairs.value).toMatch(/^0x[a-fA-F0-9]{40}$/)
      expect(ethers.BigNumber.isBigNumber(allPairsLength.value)).toEqual(true)
      expect(isHexString(feeTo.value)).toEqual(true)
      expect(isHexString(feeToSetter.value)).toEqual(true)
      expect(getPair.value).toMatch(/^0x[a-fA-F0-9]{40}$/)
    })
  })
} else {
  describe.skip('FactoryContractV2')
}
