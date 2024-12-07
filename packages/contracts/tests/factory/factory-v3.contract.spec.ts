import type { FeeTier } from '@dex-toolkit/types'
import { assertIsAddress } from '@dex-toolkit/utils'
import { describe, it, expect } from 'vitest'

import {
  MockChainConfig,
  MockChainId,
  MockDexConfig,
  MockDexProvider,
  MockDexVersionTagV3,
  MockFunToken,
} from '../../../../test/testing-setup/src/mocks/mocks'
import { FactoryContractV3 } from '../../src/factory/factory-v3.contract'

if (MockDexConfig.protocols.protocolV3) {
  describe('FactoryContractV3', () => {
    const { factory } =
      MockDexConfig.protocols.protocolV3?.[MockDexVersionTagV3] ?? {}

    if (!factory) {
      throw new Error('Factory not found')
    }

    const contract = new FactoryContractV3(
      {
        chainId: MockChainId,
        provider: MockDexProvider.provider,
        tryAggregate: true,
      },
      factory,
    )

    const fee: FeeTier = 500
    const tickSpacing = 60
    const tokenAAddress = MockFunToken.contractAddress
    const tokenBAddress =
      MockChainConfig.nativeWrappedTokenInfo?.contractAddress

    assertIsAddress(tokenAAddress)
    assertIsAddress(tokenBAddress)

    // ------------------------
    // Testing read methods
    // ------------------------

    it('should return the correct owner address', async () => {
      const result = await contract.owner()
      expect(result).toMatch(/^0x[a-fA-F0-9]+$/)
    })

    it('should return the correct feeTierTickSpacing', async () => {
      const feeTier = 500
      const result = await contract.feeTierTickSpacing(feeTier)
      expect(result).toBe(tickSpacing)
    })

    it('should return the correct pool address', async () => {
      const result = await contract.getPool(tokenAAddress, tokenBAddress, fee)
      expect(result).toMatch(/^0x[a-fA-F0-9]+$/)
    })

    // ------------------------
    // Testing encode methods
    // ------------------------

    it('should correctly encode the createPool function', () => {
      const result = contract.encodeCreatePool(
        tokenAAddress,
        tokenBAddress,
        fee,
      )
      expect(result).toMatch(/^0x[a-fA-F0-9]+$/)
    })

    it('should correctly encode the enableFeeTier function', () => {
      const result = contract.encodeEnableFeeTier(fee, tickSpacing)
      expect(result).toMatch(/^0x[a-fA-F0-9]+$/)
    })

    it('should correctly encode the setOwner function', () => {
      const newOwner = '0x0000000000000000000000000000000000000001'
      const result = contract.encodeSetOwner(newOwner)
      expect(result).toMatch(/^0x[a-fA-F0-9]+$/)
    })

    // ------------------------
    // Testing Multicall
    // ------------------------

    it('should correctly perform a multicall', async () => {
      const {
        results: { owner, feeTierTickSpacing, getPool },
      } = await contract.call({
        owner: contract.ownerCallContext(),
        feeTierTickSpacing: contract.feeTierTickSpacingCallContext(fee),
        getPool: contract.getPoolCallContext(tokenAAddress, tokenBAddress, fee),
      })

      expect(owner.value).toMatch(/^0x[a-fA-F0-9]{40}$/)
      expect(feeTierTickSpacing.value).toBe(tickSpacing)
      expect(getPool.value).toMatch(/^0x[a-fA-F0-9]{40}$/)
    })
  })
} else {
  describe.skip('FactoryContractV3')
}
