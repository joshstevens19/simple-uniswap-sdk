import type { ChainConfig } from '@dex-toolkit/types'
import { JsonRpcProvider } from '@ethersproject/providers'
import { multicall3ABI } from '@multicall-toolkit/utils'
import { Contract, providers } from 'ethers'
import { describe, it, expect } from 'vitest'

import { testConfigurations } from '../../../../test/testing-setup/src/mocks/mocks'
import {
  dexChains,
  defaultChainConfig,
  getAddress,
  getChainConfig,
  nftStandardTypeMap,
  tokenStandardTypeMap,
  transformCoinAddressToWrappedAddress,
} from '../../src'

const infuraKey = '515c18f92061457183548a0cbda9f0cf'
const alchemyKey = 'EtNvJcrAysTYKol9ICC6yT35ZvYD09M9'

function isValidChecksumAddress(address: string): boolean {
  try {
    return transformCoinAddressToWrappedAddress(address) === getAddress(address)
  } catch {
    return false
  }
}

async function isValidContract(
  address: string,
  abi: any[],
  method: string,
  provider: any,
): Promise<boolean> {
  try {
    const contract = new Contract(address, abi, provider)
    await contract[method]()
    return true
  } catch (error) {
    console.error(
      `Contract check failed for ${address}:`,
      (error as any)?.message,
    )
    return false
  }
}

async function isValidRpcUrl(
  url: string,
  isWSS = false,
  timeout = 10_000,
): Promise<boolean> {
  const nodeTest = new Promise<boolean>(async (resolve) => {
    try {
      const provider = isWSS
        ? new providers.WebSocketProvider(url)
        : new providers.JsonRpcProvider(url)
      await provider.getBlockNumber()
      resolve(true)
    } catch {
      resolve(false)
    }
  })

  const timeoutPromise = new Promise<boolean>((resolve) =>
    setTimeout(() => resolve(false), timeout),
  )

  return Promise.race([nodeTest, timeoutPromise])
}

describe('Chain Configurations', () => {
  if (!testConfigurations) {
    it.skip('Skipping chain configuration tests')
    return
  }

  dexChains.forEach((chainId) => {
    // Filter
    // if (![39797, 49797].includes(+chainId)) {
    //   return
    // }

    describe(`Chain ID: ${chainId}`, () => {
      const config: ChainConfig = getChainConfig(chainId)

      it('should have a valid chain name matching ethers.js', async () => {
        const provider = new providers.JsonRpcProvider(
          config.nodes.public?.[0]?.url || '',
        )
        const network = await provider.getNetwork()
        expect(network.chainId).toBe(Number(chainId))
        if (network.name && network.name !== 'unknown') {
          expect(network.name).toBe(config.name)
        }
      })

      it('should have valid public RPC URLs', async () => {
        const publicNodes = config.nodes.public || []
        const results = await Promise.all(
          publicNodes.map((node) =>
            isValidRpcUrl(node.url, node.isWSS).then((isValid) => ({
              url: node.url,
              isWSS: node.isWSS,
              isValid,
            })),
          ),
        )

        results.forEach(({ url, isValid, isWSS }) => {
          expect(
            isValid,
            `Failed RPC URL validation for ${url} (isWSS: ${isWSS})`,
          ).toBe(true)
        })
      }, 60_000)

      if (config.nodes.authenticated) {
        it('should have valid authenticated RPC URLs', async () => {
          const authenticatedNodes = Object.values(config.nodes.authenticated!)
          const results = await Promise.all(
            authenticatedNodes.map((node) => {
              const url = `${node.url}${
                node.name.toLowerCase().startsWith('infura')
                  ? infuraKey
                  : node.name.toLowerCase().startsWith('alchemy')
                    ? alchemyKey
                    : ''
              }`

              return isValidRpcUrl(url, node.isWSS).then((isValid) => ({
                url,
                isWSS: node.isWSS,
                isValid,
              }))
            }),
          )

          results.forEach(({ url, isValid, isWSS }) => {
            expect(
              isValid,
              `Failed authenticated RPC URL validation for ${url} (isWSS: ${isWSS})`,
            ).toBe(true)
          })
        }, 60_000)
      }

      it('should have a valid chainId', () => {
        expect(config.chainId).toBe(chainId)
      })

      it('should have a valid multicallContractAddress', async () => {
        const isValidChecksum = isValidChecksumAddress(
          config.multicallContractAddress,
        )
        expect(
          isValidChecksum,
          `Invalid checksum for multicallContractAddress: ${config.multicallContractAddress}`,
        ).toBe(true)

        const provider = new JsonRpcProvider(
          getChainConfig(chainId).nodes.public?.[0]?.url,
        )
        expect(provider).toBeDefined()

        const blockNumber = await provider.getBlockNumber()
        expect(blockNumber).toBeGreaterThan(0)

        const isValid = await isValidContract(
          config.multicallContractAddress,
          multicall3ABI,
          'getBlockNumber',
          provider,
        )
        expect(isValid).toBe(true)
      })

      it('should have a valid nativeCurrency', () => {
        const { nativeCurrency } = config
        expect(nativeCurrency).toBeDefined()
        expect(nativeCurrency.name).toBeTruthy()
        expect(nativeCurrency.symbol).toBeTruthy()
        expect(nativeCurrency.decimals).toBe(18)
      })

      it('should have a valid nativeWrappedTokenInfo', () => {
        const { nativeWrappedTokenInfo } = config
        expect(nativeWrappedTokenInfo).toBeDefined()
        expect(nativeWrappedTokenInfo.name).toBeTruthy()
        expect(nativeWrappedTokenInfo.symbol).toBeTruthy()
        expect(nativeWrappedTokenInfo.decimals).toBe(18)
        expect(nativeWrappedTokenInfo.contractAddress).toBeTruthy()
      })

      it('should have valid token standards defined', () => {
        const { standards } = config
        expect(standards).toBeDefined()

        expect(standards.token20).toBeDefined()
        expect(
          Object.values(tokenStandardTypeMap).includes(
            standards.token20.standard,
          ),
        ).toBe(true)
        expect(standards.token20.abi).toBeDefined()

        expect(standards.token721).toBeDefined()
        expect(
          Object.values(nftStandardTypeMap).includes(
            standards.token721.standard,
          ),
        ).toBe(true)
        expect(standards.token721.abi).toBeDefined()
      })

      it('should have valid optional configurations', () => {
        if (config.blockExplorerUrls) {
          config.blockExplorerUrls.forEach((url) => {
            expect(url.name).toBeTruthy()
            expect(url.url).toBeTruthy()
          })
        }

        if (config.faucets) {
          config.faucets.forEach((faucet) => {
            expect(faucet.name).toBeTruthy()
            expect(faucet.url).toBeTruthy()
          })
        }

        if (config.gasUrls) {
          config.gasUrls.forEach((gasUrl) => {
            expect(gasUrl).toBeTruthy()
          })
        }
      })

      it('should throw an error for unsupported chainId', () => {
        const unsupportedChainId = 999999
        expect(() => getChainConfig(unsupportedChainId)).toThrow(
          `Chain ID ${unsupportedChainId} is not supported`,
        )
        expect(defaultChainConfig).toBeTruthy()
      })
    })
  })
})
