import { describe, it, expect } from 'vitest'

import {
  MockChainConfig,
  MockChainId,
  MockDexConfig,
  MockDexProvider,
  MockDexVersionTagV3,
} from '../../../../test/testing-setup/src/mocks/mocks'
import { RouterContractV3 } from '../../src/router/router-v3.contract'

if (MockDexConfig.protocols.protocolV3) {
  describe('RouterContractV3', () => {
    const { router, factory } =
      MockDexConfig.protocols.protocolV3?.[MockDexVersionTagV3] ?? {}

    if (!router) {
      throw new Error('Router contract not found')
    }

    if (!factory) {
      throw new Error('Factory not found')
    }

    const contract = new RouterContractV3(
      {
        chainId: MockChainId,
        provider: MockDexProvider.provider,
        tryAggregate: true,
      },
      router,
    )

    const WETH9 = MockChainConfig.nativeWrappedTokenInfo?.contractAddress

    if (!WETH9) {
      throw new Error('WETH9 (wrapped token address) not found in chain config')
    }

    // ------------------------
    // Testing read methods
    // ------------------------

    it('should return the correct WETH9 address', async () => {
      const result = await contract.WETH9()
      expect(result).toBe(WETH9)
    })

    it('should return the correct factory address', async () => {
      const result = await contract.factory()
      expect(result).toBe(factory.address)
    })

    // ------------------------
    // Testing encode methods
    // ------------------------

    it('should correctly encode the exactInput function', () => {
      const result = contract.encodeExactInput({
        path: '0x0000000000000000000000000000000000000000',
        recipient: router.address,
        amountIn: '1000000000000000000',
        amountOutMinimum: '500000000000000000',
      })
      expect(result).toMatch(/^0x[a-fA-F0-9]+$/)
    })

    it('should correctly encode the exactOutput function', () => {
      const result = contract.encodeExactOutput({
        path: '0x0000000000000000000000000000000000000000',
        recipient: router.address,
        amountOut: '1000000000000000000',
        amountInMaximum: '500000000000000000',
      })
      expect(result).toMatch(/^0x[a-fA-F0-9]+$/)
    })

    it('should correctly encode the unwrapWETH9 function', () => {
      const result = contract.encodeUnwrapWETH9(
        '1000000000000000000',
        router.address,
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

      expect(weth.value).toBe(WETH9)
      expect(factoryAddress.value).toBe(factory.address)
    })
  })
} else {
  describe.skip('RouterContractV3')
}
