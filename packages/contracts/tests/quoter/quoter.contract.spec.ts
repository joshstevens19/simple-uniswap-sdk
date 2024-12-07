import { describe, it, expect } from 'vitest'

import {
  MockChainId,
  MockWrapped,
  MockFunToken,
  MockDexConfig,
  MockDexProvider,
  MockDexVersionTagV3,
} from '../../../../test/testing-setup/src/mocks/mocks'
import { QuoterContractV3 } from '../../src/quoter/quoter.contract'

if (MockDexConfig.protocols.protocolV3) {
  describe('QuoterContractV3', () => {
    const { quoter, factory } =
      MockDexConfig.protocols.protocolV3?.[MockDexVersionTagV3] ?? {}

    if (!quoter) {
      throw new Error('Quoter not found')
    }

    if (!factory) {
      throw new Error('Factory not found')
    }

    const contract = new QuoterContractV3(
      {
        chainId: MockChainId,
        provider: MockDexProvider.provider,
        tryAggregate: true,
      },
      quoter,
    )
    // ------------------------
    // Testing read methods
    // ------------------------

    it('should return the correct WETH9 address', async () => {
      const result = await contract.WETH9()
      expect(result).toEqual(MockWrapped.contractAddress)
    })

    it('should return the correct factory address', async () => {
      const result = await contract.factory()
      expect(result).toEqual(factory?.address)
    })

    // ------------------------
    // Testing encode methods
    // ------------------------

    // it('should correctly encode the new function', () => {
    //   const result = contract.encodeNew(
    //     quoter.address,
    //     MockWrapped.contractAddress,
    //   )
    //   expect(result).toMatch(/^0x[a-fA-F0-9]+$/)
    // })

    it('should correctly encode the quoteExactInput function', () => {
      const result = contract.encodeQuoteExactInput(
        '0x0000000000000000000000000000000000000000000000000000000000000000',
        '1000000000000000000',
      )
      expect(result).toMatch(/^0x[a-fA-F0-9]+$/)
    })

    it('should correctly encode the quoteExactInputSingle function', () => {
      const result = contract.encodeQuoteExactInputSingle(
        MockFunToken.contractAddress,
        MockWrapped.contractAddress,
        3000,
        '1000000000000000000',
        '0',
      )
      expect(result).toMatch(/^0x[a-fA-F0-9]+$/)
    })

    it('should correctly encode the quoteExactOutput function', () => {
      const result = contract.encodeQuoteExactOutput(
        '0x0000000000000000000000000000000000000000000000000000000000000000',
        '1000000000000000000',
      )
      expect(result).toMatch(/^0x[a-fA-F0-9]+$/)
    })

    it('should correctly encode the quoteExactOutputSingle function', () => {
      const result = contract.encodeQuoteExactOutputSingle(
        MockFunToken.contractAddress,
        MockWrapped.contractAddress,
        3000,
        '1000000000000000000',
        '0',
      )
      expect(result).toMatch(/^0x[a-fA-F0-9]+$/)
    })

    // ------------------------
    // Testing Multicall
    // ------------------------

    it('should correctly perform a multicall', async () => {
      const {
        results: { weth, factoryAddress },
      } = await contract.call({
        weth: contract.WETH9CallContext(),
        factoryAddress: contract.factoryCallContext(),
      })

      expect(weth.value).toEqual(MockWrapped.contractAddress)
      expect(factoryAddress.value).toEqual(factory.address)
    })
  })
} else {
  describe.skip('QuoterContractV3')
}
