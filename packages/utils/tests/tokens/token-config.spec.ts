import { parseDecimals } from '@dex-toolkit/number'
import type { Token, TokenClass } from '@dex-toolkit/types'
import type {
  Address,
  ContractContext,
  DiscriminatedMethodCalls,
  Erc20Types,
  MulticallResults,
} from '@ethereum-multicall/types'
import { describe, it, expect } from 'vitest'

import { testConfigurations } from '../../../../test/testing-setup/src/mocks/mocks'
import { Erc20Contract } from '../../../contracts/src/token/erc20.contract'
import { DexProvider } from '../../../provider/src'
import {
  energiTestChainId,
  getAddress,
  getChainConfig,
  isCoinAddress,
  standardTokens,
  tokenClasses,
  transformCoinAddressToWrappedAddress,
} from '../../src'

type TokenMethodCalls = {
  name: DiscriminatedMethodCalls<Erc20Types.Contract>['name']
  symbol: DiscriminatedMethodCalls<Erc20Types.Contract>['symbol']
  decimals: DiscriminatedMethodCalls<Erc20Types.Contract>['decimals']
}

function isValidChecksumAddress(address: string): boolean {
  try {
    return (
      transformCoinAddressToWrappedAddress(address) ===
      getAddress(address, false)
    )
  } catch {
    return false
  }
}

// function isValidUri(uri: string): boolean {
//   try {
//     new URL(uri) // Attempt to parse the URI
//     return true
//   } catch {
//     return false
//   }
// }

// async function isImageAccessible(uri: string): Promise<boolean> {
//   try {
//     const response = await fetch(uri, { method: 'HEAD' }) // Perform a HEAD request
//     const contentType = response.headers.get('content-type') || ''
//     return response.ok && contentType.startsWith('image/')
//   } catch {
//     return false
//   }
// }

function groupTokensByChain(
  tokenClasses: Record<string, TokenClass>,
): Record<number, Token[]> {
  const tokensByChain: Record<number, Token[]> = {}

  Object.values(tokenClasses).forEach((TokenClass) => {
    const methods = Object.getOwnPropertyNames(TokenClass).filter(
      (name) =>
        name !== 'commonProps' &&
        name !== 'getTokenForChainId' &&
        name !== 'prototype' &&
        name !== 'constructor',
    )

    methods.forEach((network) => {
      const chainConfigs = TokenClass[network as keyof typeof TokenClass]
      if (typeof chainConfigs === 'object') {
        Object.values(chainConfigs).forEach((getTokenFn) => {
          if (typeof getTokenFn === 'function') {
            const token = getTokenFn()
            if (!tokensByChain[token.chainId]) {
              tokensByChain[token.chainId] = []
            }
            tokensByChain[token.chainId]?.push(token)
          }
        })
      }
    })
  })

  return tokensByChain
}

const configs = Object.entries(groupTokensByChain(tokenClasses))

describe('Token Configurations', () => {
  if (!testConfigurations) {
    it.skip('Skipping token configuration tests')
    return
  }

  configs.forEach(([chainId, tokens]) => {
    const filter = [
      energiTestChainId, // No multicall address or DEX
    ]
    if (filter.includes(parseInt(chainId))) {
      return
    }

    describe(`Chain ${chainId} (${getChainConfig(+chainId).displayName})`, () => {
      const validTokens = tokens.filter(
        (token): token is Token =>
          !!token.contractAddress && standardTokens.includes(token.standard),
      )

      if (validTokens.length === 0) {
        it(`should skip as chain ${chainId} has no valid tokens`, () => {
          expect(validTokens.length).toBe(0)
        })
        return
      }

      it(`should verify ${validTokens.length} tokens on chain ${chainId}`, async () => {
        const dexProvider = new DexProvider({
          chainId: parseInt(chainId),
          tryAggregate: true,
          enableBatching: true,
        })

        const contractContexts: Record<
          Address,
          ContractContext<Erc20Types.Contract, TokenMethodCalls>
        > = {}

        validTokens.forEach((token) => {
          const contract = new Erc20Contract(dexProvider, {
            address: transformCoinAddressToWrappedAddress(
              token.contractAddress,
            ),
          })

          contractContexts[token.contractAddress] =
            contract.prepareContractContext({
              name: contract.nameCallContext(),
              symbol: contract.symbolCallContext(),
              decimals: contract.decimalsCallContext(),
            })
        })

        let results: MulticallResults<
          Record<string, ContractContext<Erc20Types.Contract, TokenMethodCalls>>
        >

        try {
          results = await dexProvider.call(contractContexts)
        } catch (error) {
          console.error(`Chain ${chainId} failed multicall:`, error)
          throw error
        }

        const errors: string[] = []

        validTokens.forEach(async (token) => {
          const contractResults = results.contracts[token.contractAddress]
          if (!contractResults) {
            errors.push(`No results for token ${token.contractAddress}`)
            return
          }

          expect(contractResults.results).toBeDefined()
          expect(contractResults.results.name).toBeDefined()

          try {
            const name = isCoinAddress(token.contractAddress)
              ? contractResults.results.name!.value.replace('Wrapped ', '')
              : contractResults.results.name!.value
            if (token.name !== name) {
              errors.push(
                `Token ${token.contractAddress} name mismatch: expected ${token.name}, got ${name}`,
              )
            }

            const symbol = isCoinAddress(token.contractAddress)
              ? contractResults.results.symbol!.value.replace('W', '')
              : contractResults.results.symbol!.value
            if (token.symbol !== symbol) {
              errors.push(
                `Token ${token.contractAddress} symbol mismatch: expected ${token.symbol}, got ${symbol}`,
              )
            }

            try {
              const decimals = parseDecimals(
                contractResults.results.decimals.value!,
              )
              if (token.decimals !== decimals) {
                errors.push(
                  `Token ${token.contractAddress} decimals mismatch: expected ${token.decimals}, got ${decimals}`,
                )
              }
            } catch (error) {
              errors.push(
                `Token ${token.contractAddress} decimals mismatch: expected ${token.decimals}, got ${contractResults.results.decimals.value}`,
              )
            }

            const isValid = isValidChecksumAddress(
              transformCoinAddressToWrappedAddress(token.contractAddress),
            )
            if (!isValid) {
              errors.push(
                `Invalid checksum for token ${token.contractAddress}. Expected: ${getAddress(
                  token.contractAddress,
                  true,
                )}`,
              )
            }

            if (!token.color) {
              errors.push(`Token ${token.contractAddress} missing color`)
            }

            // if (!token.logoUri) {
            //   errors.push(`Token ${token.contractAddress} missing logoUri`)
            // }

            // try {
            //   if (!token.logoUri || !isValidUri(token.logoUri)) {
            //     errors.push(
            //       `Invalid URI format for token ${token.contractAddress}: ${token.logoUri}`,
            //     )
            //   } else {
            //     const accessible = await isImageAccessible(token.logoUri)
            //     if (!accessible) {
            //       errors.push(
            //         `Image not accessible for token ${token.contractAddress}: ${token.logoUri}`,
            //       )
            //     }
            //   }
            // } catch (error) {
            //   errors.push(
            //     `Error checking logoUri for token ${token.contractAddress}: ${(error as any).message}`,
            //   )
            // }
          } catch (error) {
            errors.push(
              `Error testing token ${token.contractAddress}: ${(error as any)?.message}`,
            )
          }
        })

        if (errors.length > 0) {
          throw new Error(
            `Test failed with the following issues:\n${errors.join('\n\n')}`,
          )
        }
      })
    })
  })
})
