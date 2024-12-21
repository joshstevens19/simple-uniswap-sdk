import type { ChainId } from '@chain-toolkit/schemas'
import type {
  ContractDetailsV2,
  ContractDetailsV3,
  DexConfig,
  DexType,
} from '@dex-toolkit/types'
import { ethers } from 'ethers'
import { describe, it, expect } from 'vitest'

import {
  RouterContractV2,
  RouterContractV3,
  FactoryContractV2,
  FactoryContractV3,
  QuoterContractV3,
  PositionManagerContractV3,
} from './../../../contracts/src/index'
import { testConfigurations } from '../../../../test/testing-setup/src/mocks/mocks'
import { DexProvider } from '../../../provider/src/index'
import { getAllDexConfigs, getChainConfig } from '../../src'

type ContractTestCase = {
  name: string
  versionTag: string
  address: string
  contract: any
  methods: string[]
}

function shouldTestDex(dexType: DexType, chainId: ChainId) {
  const filter: { dexType: DexType; chainId: ChainId }[] = [
    // { dexType: 'DOVESWAP', chainId: 1101 },
    // { dexType: 'ENERGISWAP', chainId: 39797 },
    // { dexType: 'PANCAKESWAP', chainId: 42161 },
    // { dexType: 'PANCAKESWAP', chainId: 8453 },
    // { dexType: 'PANCAKESWAP', chainId: 56 },
    // { dexType: 'PANCAKESWAP', chainId: 97 },
    // { dexType: 'PANCAKESWAP', chainId: 1 },
    // { dexType: 'PANCAKESWAP', chainId: 1101 },
    // { dexType: 'PANCAKESWAP', chainId: 324 },
    // { dexType: 'PANGOLIN', chainId: 43114 },
    // { dexType: 'PANGOLIN', chainId: 43113 },
    // { dexType: 'PULSEX', chainId: 369 },
    // { dexType: 'PULSEX', chainId: 943 },
    // { dexType: 'QUICKSWAP', chainId: 137 },
    // { dexType: 'QUICKSWAP', chainId: 1101 },
    // { dexType: 'SUSHISWAP', chainId: 42161 },
    // { dexType: 'SUSHISWAP', chainId: 43114 },
    // { dexType: 'SUSHISWAP', chainId: 43113 },
    // { dexType: 'SUSHISWAP', chainId: 8453 },
    // { dexType: 'SUSHISWAP', chainId: 81457 },
    // { dexType: 'SUSHISWAP', chainId: 56 },
    // { dexType: 'SUSHISWAP', chainId: 97 },
    // { dexType: 'SUSHISWAP', chainId: 42220 },
    // { dexType: 'SUSHISWAP', chainId: 1 },
    // { dexType: 'SUSHISWAP', chainId: 11155111 },
    // { dexType: 'SUSHISWAP', chainId: 10 },
    // { dexType: 'SUSHISWAP', chainId: 137 },
    // { dexType: 'SUSHISWAP', chainId: 1101 },
    // { dexType: 'TRADERJOE', chainId: 43114 },
    // { dexType: 'TRADERJOE', chainId: 43113 },
    // { dexType: 'TRADERJOE', chainId: 42161 },
    // { dexType: 'TRADERJOE', chainId: 56 },
    // { dexType: 'TRADERJOE', chainId: 97 },
    // { dexType: 'TRADERJOE', chainId: 1 },
    // { dexType: 'UNISWAP', chainId: 42161 },
    // { dexType: 'UNISWAP', chainId: 421614 },
    // { dexType: 'UNISWAP', chainId: 43114 },
    // { dexType: 'UNISWAP', chainId: 8453 },
    // { dexType: 'UNISWAP', chainId: 84532 },
    // { dexType: 'UNISWAP', chainId: 81457 },
    // { dexType: 'UNISWAP', chainId: 42220 },
    // { dexType: 'UNISWAP', chainId: 44787 },
    // { dexType: 'UNISWAP', chainId: 1 },
    // { dexType: 'UNISWAP', chainId: 11155111 },
    // { dexType: 'UNISWAP', chainId: 137 },
    // { dexType: 'UNISWAP', chainId: 7777777 },
    // { dexType: 'UNISWAP', chainId: 999999999 },
    // { dexType: 'UNISWAP', chainId: 324 },
    // { dexType: 'YETISWAP', chainId: 43114 },
  ]

  if (filter.length === 0) {
    return true
  }

  return filter.some(
    (entry) => entry.dexType === dexType && entry.chainId === chainId,
  )
}

function createProvider(chainId: number, rpcUrl: string): DexProvider {
  return new DexProvider({
    chainId,
    rpcUrl,
    tryAggregate: true,
    enableBatching: true,
    maxCallDataSize: 100_000,
  })
}

function getContractTestCases(
  dexConfig: DexConfig,
  provider: DexProvider,
): ContractTestCase[] {
  const testCases: ContractTestCase[] = []

  // Process V2 Protocol
  if (dexConfig.protocols.protocolV2) {
    Object.entries(dexConfig.protocols.protocolV2).forEach(
      ([versionTag, v2Protocol]: [
        string,
        ContractDetailsV2<any, any, any>,
      ]) => {
        if (v2Protocol.router) {
          testCases.push({
            name: 'RouterV2',
            versionTag,
            address: v2Protocol.router.address,
            contract: new RouterContractV2(provider, v2Protocol.router),
            methods: [
              ...(v2Protocol.router.methods?.factory !== '' ? ['factory'] : []),
              ...(v2Protocol.router.methods?.WETH !== '' ? ['WETH'] : []),
            ],
          })
        }
        if (v2Protocol.factory) {
          testCases.push({
            name: 'FactoryV2',
            versionTag,
            address: v2Protocol.factory.address,
            contract: new FactoryContractV2(provider, v2Protocol.factory),
            methods: ['allPairsLength'],
          })
        }
      },
    )
  }

  // Process V3 Protocol
  if (dexConfig.protocols.protocolV3) {
    Object.entries(dexConfig.protocols.protocolV3).forEach(
      ([versionTag, v3Protocol]: [
        string,
        ContractDetailsV3<any, any, any, any, any>,
      ]) => {
        if (v3Protocol.router) {
          testCases.push({
            name: 'RouterV3',
            versionTag,
            address: v3Protocol.router.address,
            contract: new RouterContractV3(provider, v3Protocol.router),
            methods: [
              ...(v3Protocol.router.methods?.factory !== '' ? ['factory'] : []),
              ...(v3Protocol.router.methods?.WETH9 !== '' ? ['WETH9'] : []),
            ],
          })
        }
        if (v3Protocol.factory) {
          testCases.push({
            name: 'FactoryV3',
            versionTag,
            address: v3Protocol.factory.address,
            contract: new FactoryContractV3(provider, v3Protocol.factory),
            methods: ['owner'],
          })
        }
        if (v3Protocol.quoter) {
          testCases.push({
            name: 'QuoterV3',
            versionTag,
            address: v3Protocol.quoter.address,
            contract: new QuoterContractV3(provider, v3Protocol.quoter),
            methods: ['factory'],
          })
        }
        if (v3Protocol.positionManager) {
          testCases.push({
            name: 'PositionManagerV3',
            versionTag,
            address: v3Protocol.positionManager.address,
            contract: new PositionManagerContractV3(
              provider,
              v3Protocol.positionManager,
            ),
            methods: ['factory'],
          })
        }
      },
    )
  }

  return testCases
}

describe('DEX Configuration Validation', () => {
  if (!testConfigurations) {
    it.skip('Skipping DEX configuration tests')
    return
  }

  const dexConfigs = getAllDexConfigs()

  describe('Address Checksum Validation', () => {
    dexConfigs.forEach((dexConfig) => {
      it(`should have valid checksummed addresses for ${dexConfig.dexType} on chain ${dexConfig.chainId}`, () => {
        const addresses: string[] = []

        // Collect V2 addresses
        if (dexConfig.protocols.protocolV2) {
          Object.values(dexConfig.protocols.protocolV2).forEach((protocol) => {
            if (protocol.router) addresses.push(protocol.router.address)
            if (protocol.factory) addresses.push(protocol.factory.address)
          })
        }

        // Collect V3 addresses
        if (dexConfig.protocols.protocolV3) {
          Object.values(dexConfig.protocols.protocolV3).forEach((protocol) => {
            if (protocol.router) addresses.push(protocol.router.address)
            if (protocol.factory) addresses.push(protocol.factory.address)
            if (protocol.quoter) addresses.push(protocol.quoter.address)
            if (protocol.positionManager)
              addresses.push(protocol.positionManager.address)
          })
        }

        // Verify checksums
        addresses.forEach((address) => {
          expect(ethers.utils.getAddress(address)).toBe(address)
        })
      })
    })
  })

  describe('Contract Existence and Method Validation', () => {
    dexConfigs.forEach((dexConfig) => {
      const { dexType, chainId } = dexConfig

      if (!shouldTestDex(dexType, chainId)) {
        // console.log(`Skipping tests for ${dexType} on chain ${chainId}`)
        return
      }

      const chainConfig = getChainConfig(chainId)
      const rpcUrl = chainConfig.nodes.public?.[0]?.url

      if (!rpcUrl) {
        // console.log(
        //   `Skipping tests for chain ${dexConfig.chainId} - No RPC URL available`,
        // )
        return
      }

      const provider = createProvider(chainId, rpcUrl)
      const testCases = getContractTestCases(dexConfig, provider)

      describe(`${dexType} on chain ${chainId} (${chainConfig.name})`, () => {
        testCases.forEach((testCase) => {
          describe(`${testCase.name} ${testCase.versionTag} (${testCase.address})`, () => {
            if (!testCase.methods.length) {
              it.skip('No pure methods found for this contract')
            }

            testCase.methods.forEach((method) => {
              it(`should verify method "${method}"`, async () => {
                const callContext = `${method}CallContext`
                if (typeof testCase.contract[callContext] !== 'function') {
                  throw new Error(
                    `Method context for "${method}" not found. Check the configs ABI. Available methods: ${Object.keys(
                      testCase.contract.methodNames,
                    ).join(', ')}`,
                  )
                }

                // Prepare and execute the call
                const calls = {
                  [method]: testCase.contract[callContext](),
                }
                const contractContext =
                  testCase.contract.prepareContractContext(calls)

                const { contracts } = await provider.call({
                  [testCase.name]: contractContext,
                })

                const methodResult = contracts[testCase.name]?.results?.[method]
                // Validate the method call
                expect(methodResult).toBeDefined()
                expect(methodResult?.success).toBe(true)
                expect(methodResult?.value).toBeDefined()
              })
            })
          })
        })
      })
    })
  })
})
