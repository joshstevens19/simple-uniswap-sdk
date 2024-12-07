import { DexProvider } from '@dex-toolkit/provider'
import {
  ErrorCodes,
  DexError,
  MAX_HEX_STRING,
  MIN_HEX_STRING,
  stripToken,
  getChainConfig,
  getDexConfig,
} from '@dex-toolkit/utils'
import { BigNumber } from 'ethers'
import { expect, describe, it } from 'vitest'

import {
  activeTestCases,
  MockWalletAddress,
} from '../../../test/testing-setup/src/mocks/mocks'
import { Tokens } from '../src/tokens'

describe('Tokens', () => {
  Object.entries(activeTestCases).forEach(([type, chainCases]) => {
    describe(type, () => {
      Object.values(chainCases).forEach((testCase) => {
        const { dexType, chainId, tokens, versions } = testCase

        const { primaryToken, noAllowanceToken, nativeCoin } = tokens

        const dexTag = dexType
        const walletAddress = MockWalletAddress

        const versionsV2 = versions.v2 ?? []
        const versionsV3 = versions.v3 ?? []

        const chainConfig = getChainConfig(chainId)
        const rpcUrl = chainConfig.nodes.public?.[0]?.url

        if (!rpcUrl) {
          throw new Error(`No provider url found for chainId ${chainId}`)
        }

        const dexContext = getDexConfig({
          dexType,
          chainId,
        })

        if (!dexContext) {
          throw new Error('Dex config not found')
        }

        const dexProvider = new DexProvider({
          chainId,
          rpcUrl,
          tryAggregate: true,
          enableBatching: true,
          maxCallDataSize: 100_000,
          maxCallsPerBatch: 50,
        })

        const { protocols } = dexContext

        if (!protocols) {
          throw new Error('protocols not found')
        }

        const { protocolV2, protocolV3 } = protocols

        if (!protocolV2 && !protocolV3) {
          throw new Error('V2 and V3 contract details not found')
        }

        const tokensFactory = new Tokens({
          dexProviderContext: dexProvider,
          dexContext,
        })

        describe('getTokens', () => {
          it('should return tokens', async () => {
            const result = await tokensFactory.getTokens([
              nativeCoin.contractAddress,
              primaryToken.contractAddress,
              noAllowanceToken.contractAddress,
            ])

            expect(stripToken(result[nativeCoin.contractAddress]!)).toEqual(
              stripToken(nativeCoin),
            )
            expect(stripToken(result[primaryToken.contractAddress]!)).toEqual(
              stripToken(primaryToken),
            )
            expect(
              stripToken(result[noAllowanceToken.contractAddress]!),
            ).toEqual(stripToken(noAllowanceToken))
          })

          it('should throw error if 1 of the contract addresses are invalid', async () => {
            const invalidAddress = '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E722c'

            await expect(
              tokensFactory.getTokens([
                invalidAddress,
                noAllowanceToken.contractAddress,
              ]),
            ).rejects.toThrowError(
              new DexError(
                `The following addresses are invalid: ${invalidAddress}`,
                ErrorCodes.invalidFromOrToContractToken,
              ),
            )
          })
        })

        describe('getAllowancesAndBalanceOf', () => {
          it('should return correct info - unformatted', async () => {
            const result = await tokensFactory.getAllowancesAndBalanceOf({
              walletAddress,
              tokenContractAddresses: [
                nativeCoin.contractAddress,
                primaryToken.contractAddress,
                noAllowanceToken.contractAddress,
              ],
              format: { type: 'dexnumber' },
            })

            const resultCoin = result[nativeCoin.contractAddress]
            const resultPrimaryToken = result[primaryToken.contractAddress]
            const resultNoAllowanceToken =
              result[noAllowanceToken.contractAddress]

            if (!resultCoin || !resultPrimaryToken || !resultNoAllowanceToken) {
              throw new Error('Invalid result')
            }

            // Tokens
            expect(stripToken(resultCoin.token)).toEqual(stripToken(nativeCoin))
            expect(stripToken(resultPrimaryToken.token)).toEqual(
              stripToken(primaryToken),
            )
            expect(stripToken(resultNoAllowanceToken.token)).toEqual(
              stripToken(noAllowanceToken),
            )

            // Allowance V2
            if (protocolV2) {
              versionsV2.forEach(({ versionTag }) => {
                describe(`version ${versionTag}`, () => {
                  const coinAllowance =
                    resultCoin.allowanceInfoByDex[dexTag]?.protocolV2?.[
                      versionTag
                    ]?.allowance
                  const tokenAllowance =
                    resultPrimaryToken.allowanceInfoByDex[dexTag]?.protocolV2?.[
                      versionTag
                    ]?.allowance
                  const otherAllowance =
                    resultNoAllowanceToken.allowanceInfoByDex[dexTag]
                      ?.protocolV2?.[versionTag]?.allowance

                  if (!coinAllowance || !tokenAllowance || !otherAllowance) {
                    throw new Error('Invalid allowance')
                  }

                  expect(coinAllowance.gt(0)).toEqual(true)
                  expect(tokenAllowance.gte(0)).toEqual(true)
                  expect(otherAllowance.gte(0)).toEqual(true)
                })
              })
            }

            // Allowance V3
            if (protocolV3) {
              versionsV3.forEach(({ versionTag }) => {
                describe(`version ${versionTag}`, () => {
                  const coinAllowance =
                    resultCoin.allowanceInfoByDex[dexTag]?.protocolV3?.[
                      versionTag
                    ]?.allowance
                  const tokenAllowance =
                    resultPrimaryToken.allowanceInfoByDex[dexTag]?.protocolV3?.[
                      versionTag
                    ]?.allowance
                  const otherAllowance =
                    resultNoAllowanceToken.allowanceInfoByDex[dexTag]
                      ?.protocolV3?.[versionTag]?.allowance

                  if (!coinAllowance || !tokenAllowance || !otherAllowance) {
                    throw new Error('Invalid allowance')
                  }

                  expect(coinAllowance.gt(0)).toEqual(true)
                  expect(tokenAllowance.gte(0)).toEqual(true)
                  expect(otherAllowance.gte(0)).toEqual(true)
                })
              })
            }

            // Balance
            expect(resultCoin.balanceInfo.balance.gt(0)).toEqual(true)
            expect(resultPrimaryToken.balanceInfo.balance.gte(0)).toEqual(true)
            expect(resultNoAllowanceToken.balanceInfo.balance.gte(0)).toEqual(
              true,
            )
          })

          it('should return correct info - formatted', async () => {
            const result = await tokensFactory.getAllowancesAndBalanceOf({
              walletAddress,
              tokenContractAddresses: [
                nativeCoin.contractAddress,
                primaryToken.contractAddress,
                noAllowanceToken.contractAddress,
              ],
              format: { type: 'hex' },
            })

            const resultCoin = result[nativeCoin.contractAddress]
            const resultPrimaryToken = result[primaryToken.contractAddress]
            const resultNoAllowanceToken =
              result[noAllowanceToken.contractAddress]

            if (!resultCoin || !resultPrimaryToken || !resultNoAllowanceToken) {
              throw new Error('Invalid result')
            }

            // Token Order
            expect(stripToken(resultCoin.token)).toEqual(stripToken(nativeCoin))
            expect(stripToken(resultPrimaryToken.token)).toEqual(
              stripToken(primaryToken),
            )
            expect(stripToken(resultNoAllowanceToken.token)).toEqual(
              stripToken(noAllowanceToken),
            )

            if (protocolV2) {
              versionsV2.forEach(({ versionTag }) => {
                describe(`version ${versionTag}`, () => {
                  const coinAllowance =
                    resultCoin.allowanceInfoByDex[dexTag]?.protocolV2?.[
                      versionTag
                    ]?.allowance
                  const tokenAllowance =
                    resultPrimaryToken.allowanceInfoByDex[dexTag]?.protocolV2?.[
                      versionTag
                    ]?.allowance
                  const otherAllowance =
                    resultNoAllowanceToken.allowanceInfoByDex[dexTag]
                      ?.protocolV2?.[versionTag]?.allowance

                  if (!coinAllowance || !tokenAllowance || !otherAllowance) {
                    throw new Error('Invalid allowance')
                  }

                  expect(coinAllowance).toEqual(MAX_HEX_STRING)
                  expect(tokenAllowance).toEqual(MAX_HEX_STRING)
                  expect(otherAllowance).toEqual(MIN_HEX_STRING)
                })
              })
            }

            if (protocolV3) {
              versionsV3.forEach(({ versionTag }) => {
                describe(`version ${versionTag}`, () => {
                  const coinAllowance =
                    resultCoin.allowanceInfoByDex[dexTag]?.protocolV3?.[
                      versionTag
                    ]?.allowance
                  const tokenAllowance =
                    resultPrimaryToken.allowanceInfoByDex[dexTag]?.protocolV3?.[
                      versionTag
                    ]?.allowance
                  const otherAllowance =
                    resultNoAllowanceToken.allowanceInfoByDex[dexTag]
                      ?.protocolV3?.[versionTag]?.allowance

                  if (!coinAllowance || !tokenAllowance || !otherAllowance) {
                    throw new Error('Invalid allowance')
                  }

                  expect(coinAllowance).toEqual(MAX_HEX_STRING)
                  expect(tokenAllowance).toEqual(MAX_HEX_STRING)
                  expect(otherAllowance).toEqual(MIN_HEX_STRING)
                })
              })
            }

            expect(
              BigNumber.from(resultCoin.balanceInfo.balance).gt(0),
            ).toEqual(true)
            expect(
              BigNumber.from(resultPrimaryToken.balanceInfo.balance).gt(0),
            ).toEqual(true)
            expect(
              BigNumber.from(resultNoAllowanceToken.balanceInfo.balance).gt(0),
            ).toEqual(false)
          })
        })
      })
    })
  })
})
