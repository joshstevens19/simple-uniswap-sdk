import type { IDexProvider, Token } from '@dex-toolkit/types'
import { Multicall } from '@ethereum-multicall/core'
import { describe, it, expect } from 'vitest'

import { DexMulticall } from '../../src/multicall/dex-multicall'
import {
  createRouteMulticallReference,
  parseRouteMulticallReference,
} from '../../src/multicall/router-multicall.utils'

describe('Multicall Utilities', () => {
  describe('createRouteMulticallReference', () => {
    it('should create a correct reference string for v2 DEX', () => {
      const result = createRouteMulticallReference({
        dexTag: 'UNISWAP',
        protocol: 'protocolV2',
        versionTag: '1-0-0',
        fromToken: { contractAddress: '0x123', symbol: 'ETH' } as Token,
        toToken: { contractAddress: '0x456', symbol: 'DAI' } as Token,
      })
      expect(result).toEqual('UNISWAP_protocolV2_1-0-0_0x123_0x456_ETH-DAI_')
    })

    it('should handle missing tokens', () => {
      const result = createRouteMulticallReference({
        dexTag: 'SUSHISWAP',
        protocol: 'protocolV3',
        versionTag: '1-0-0',
      })
      expect(result).toEqual('SUSHISWAP_protocolV3_1-0-0____')
    })

    it('should include fee for v3 DEX', () => {
      const result = createRouteMulticallReference({
        dexTag: 'UNISWAP',
        protocol: 'protocolV3',
        versionTag: '1-0-0',
        fromToken: { contractAddress: '0x123', symbol: 'ETH' } as Token,
        toToken: { contractAddress: '0x456', symbol: 'DAI' } as Token,
        feeTier: 500,
      })
      expect(result).toEqual('UNISWAP_protocolV3_1-0-0_0x123_0x456_ETH-DAI_500')
    })
  })

  describe('parseRouteMulticallReference', () => {
    it('should parse a valid reference string', () => {
      const result = parseRouteMulticallReference(
        'UNISWAP_protocolV2_1-0-0_0x123_0x456_ETH-DAI_',
      )
      expect(result).toEqual({
        dexTag: 'UNISWAP',
        protocol: 'protocolV2',
        fromTokenAddress: '0x123',
        toTokenAddress: '0x456',
        pairSymbols: 'ETH-DAI',
        feeTier: undefined,
        versionTag: '1-0-0',
      })
    })

    it('should parse a reference with fee amount', () => {
      const result = parseRouteMulticallReference(
        'UNISWAP_protocolV3_1-0-0_0x123_0x456_ETH-DAI_500',
      )
      expect(result).toEqual({
        dexTag: 'UNISWAP',
        protocol: 'protocolV3',
        fromTokenAddress: '0x123',
        toTokenAddress: '0x456',
        pairSymbols: 'ETH-DAI',
        feeTier: 500,
        versionTag: '1-0-0',
      })
    })
  })
})

describe('DexMulticall Class', () => {
  it('should initialize DexMulticall with a custom multicall contract address', () => {
    const mockDexProvider = {
      network: { chainId: 1 },
      provider: {},
      customNetwork: {
        multicallContractAddress: '0xMulticallAddress',
      },
    } as IDexProvider

    const dexMulticall = new DexMulticall(mockDexProvider)

    expect(dexMulticall._options.customMulticallContractAddress).toEqual(
      '0xMulticallAddress',
    )
  })

  it('should initialize with native multicall contract when chain ID is supported', () => {
    const mockDexProvider = {
      network: { chainId: 1 }, // Chain ID 1 supports native multicall
      provider: {},
    } as IDexProvider

    const dexMulticall = new DexMulticall(mockDexProvider)

    expect(dexMulticall).toBeInstanceOf(Multicall)
  })

  it('should throw an error for unsupported chain ID', () => {
    const mockDexProvider = {
      network: { chainId: 99999 }, // Unsupported chain ID
      provider: {},
    } as IDexProvider

    expect(() => new DexMulticall(mockDexProvider)).toThrow(
      'Chain ID 99999 is not supported',
    )
  })
})
