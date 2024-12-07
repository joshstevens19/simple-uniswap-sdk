import type { UniswapPairV2Types } from '@dex-toolkit/types'
import { ErrorCodes, DexError } from '@dex-toolkit/utils'
import type { ContractDetail } from '@multicall-toolkit/types'
import { describe, it, expect } from 'vitest'

import {
  MockProviderUrl,
  MockChainId,
  MockWalletAddress,
  MockDexConfig,
  MockUNIToWPLSPairAddressV2,
  MockDexVersionTagV2,
} from '../../../test/testing-setup/src/mocks/mocks'
import { DexProvider } from '../src/dex-provider'

describe('DexProvider', () => {
  const { pair } =
    MockDexConfig.protocols.protocolV2?.[MockDexVersionTagV2] ?? {}

  const contractDetails: ContractDetail = {
    address: MockUNIToWPLSPairAddressV2,
    abi: pair?.abi ?? [],
    methods: pair?.methods,
  }

  if (!pair) {
    throw new Error('Pair not found')
  }

  describe('with chain id', () => {
    const dexProvider = new DexProvider({
      chainId: MockChainId,
      tryAggregate: true,
      enableBatching: true,
      maxCallDataSize: 100_000,
      maxCallsPerBatch: 50,
    })

    it('getContract', () => {
      const result =
        dexProvider.getContract<UniswapPairV2Types.ContractContext>(
          contractDetails,
        )

      expect(result).toBeDefined()
    })

    it('network', () => {
      const result = dexProvider.network

      expect(result.chainId).toEqual(MockChainId)
    })

    it('provider', () => {
      const result = dexProvider.provider

      expect(result.network.chainId).toEqual(MockChainId)
    })

    it('balanceOf', () => {
      const result = dexProvider.getCoinBalance({
        walletAddress: MockWalletAddress,
        format: {
          type: 'readable',
          options: {
            locales: 'en-US',
          },
        },
      })

      expect(result).toBeDefined()
    })
  })

  describe('with chain id and rpcUrl', () => {
    const dexProvider = new DexProvider({
      chainId: MockChainId,
      rpcUrl: MockProviderUrl,
      tryAggregate: true,
      enableBatching: true,
      maxCallDataSize: 100_000,
      maxCallsPerBatch: 50,
    })

    it('should throw error if chainId not be found', () => {
      expect(() => {
        new DexProvider({
          chainId: 10293, // Invalid chain id
          rpcUrl: MockProviderUrl,
        })
      }).toThrowError(
        new DexError(
          'Chain ID 10293 is not supported',
          ErrorCodes.canNotFindChainId,
        ),
      )
    })

    it('getContract', () => {
      const result =
        dexProvider.getContract<UniswapPairV2Types.ContractContext>(
          contractDetails,
        )

      expect(result).toBeDefined()
    })

    it('network', () => {
      const result = dexProvider.network

      expect(result.chainId).toEqual(MockChainId)
    })

    it('provider', () => {
      const result = dexProvider.provider

      expect(result.network.chainId).toEqual(MockChainId)
    })

    it('balanceOf', () => {
      const result = dexProvider.getCoinBalance({
        walletAddress: MockWalletAddress,
        format: {
          type: 'readable',
          options: {
            locales: 'en-US',
          },
        },
      })

      expect(result).toBeDefined()
    })
  })
})
