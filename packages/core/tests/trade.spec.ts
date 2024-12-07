import { DexProvider } from '@dex-toolkit/provider'
import type { TradeInternalArgs, TradeSettings } from '@dex-toolkit/types'
import {
  DexError,
  protocolMap,
  ErrorCodes,
  getDexConfig,
  MAX_HEX_STRING,
  MIN_HEX_STRING,
  tradeDirectionMap,
  getChainConfig,
} from '@dex-toolkit/utils'
import { describe, it, expect } from 'vitest'

import {
  activeTestCases,
  MockWalletAddress,
} from '../../../test/testing-setup/src/mocks/mocks'
import { Trade } from '../src/trade'

describe('Trade', () => {
  Object.entries(activeTestCases).forEach(([type, chainCases]) => {
    describe(type, () => {
      Object.values(chainCases).forEach((testCase) => {
        const { dexType, chainId, tokens, versions } = testCase

        const { primaryToken, noAllowanceToken, nativeCoin, nativeWrapped } =
          tokens

        const dexTag = dexType
        const walletAddress = MockWalletAddress
        const tradeAmount = '0.0001'

        const versionsV2 = versions.v2 ?? []
        const versionsV3 = versions.v3 ?? []

        const chainConfig = getChainConfig(chainId)
        const rpcUrl = chainConfig.nodes.public?.[0]?.url

        const dexContext = getDexConfig({
          dexType,
          chainId,
        })

        if (!dexContext) {
          throw new Error('Dex config not found')
        }

        const { protocols } = dexContext

        if (!protocols) {
          throw new Error('protocols not found')
        }

        const { protocolV2, protocolV3 } = protocols

        if (!protocolV2 && !protocolV3) {
          throw new Error('V2 and V3 contract details not found')
        }

        const dexProvider = new DexProvider({
          chainId,
          rpcUrl,
          tryAggregate: true,
          enableBatching: true,
          maxCallDataSize: 100_000,
          maxCallsPerBatch: 50,
        })

        const settings: Partial<TradeSettings> = {
          slippage: 0.005,
          deadlineMinutes: 20,
          disableMultihops: false,
          disableObserver: false,
          gasSettings: {
            getGasPrice: async () => '90',
          },
        }

        describe('token > token', () => {
          const tradeArgs: TradeInternalArgs<'dexnumber'> = {
            fromToken: primaryToken,
            toToken: noAllowanceToken,
            walletAddress,
            settings,
            dexProvider,
            dexContext,
            multiPriceContext: undefined,
            tokenListContext: [],
            format: { type: 'dexnumber' },
          }

          const tradeCommon = new Trade(tradeArgs)

          it('`toToken` should return correctly', () => {
            expect(tradeCommon.toToken).toEqual(tradeArgs.toToken)
          })

          it('`fromToken` should return correctly', () => {
            expect(tradeCommon.fromToken).toEqual(tradeArgs.fromToken)
          })

          describe('findBestRouteQuote', () => {
            describe(tradeDirectionMap.input, () => {
              it('should return the best route', async () => {
                const result = await tradeCommon.findBestRouteQuote({
                  amountToTrade: tradeAmount,
                  tradeDirection: tradeDirectionMap.input,
                })
                expect(result).toBeDefined()
              })
            })

            describe(tradeDirectionMap.output, () => {
              it('should return the best route', async () => {
                const result = await tradeCommon.findBestRouteQuote({
                  amountToTrade: tradeAmount,
                  tradeDirection: tradeDirectionMap.output,
                })
                expect(result).toBeDefined()
              })
            })
          })

          describe('getRouteQuotes', () => {
            describe(tradeDirectionMap.input, () => {
              it('should return all possible routes with quotes', async () => {
                const result = await tradeCommon.getRouteQuotes({
                  amountToTrade: tradeAmount,
                  tradeDirection: tradeDirectionMap.input,
                })
                expect(result).toBeDefined()
              })
            })

            describe(tradeDirectionMap.output, () => {
              it('should return all possible routes with quotes', async () => {
                const result = await tradeCommon.getRouteQuotes({
                  amountToTrade: tradeAmount,
                  tradeDirection: tradeDirectionMap.output,
                })
                expect(result).toBeDefined()
              })
            })
          })

          describe('getVersionedRoutePathsByDex', () => {
            describe(tradeDirectionMap.input, () => {
              it('should return all possible routes', async () => {
                const result = await tradeCommon.getVersionedRoutePathsByDex()
                expect(result).toBeDefined()
              })
            })

            describe(tradeDirectionMap.output, () => {
              it('should return all possible routes', async () => {
                const result = await tradeCommon.getVersionedRoutePathsByDex()
                expect(result).toBeDefined()
              })
            })
          })

          describe('trade', () => {
            it('should return trade info', async () => {
              const result = await tradeCommon.quote(tradeAmount)
              expect(result).toBeDefined()
            })
          })

          describe('allowance', () => {
            if (protocolV2) {
              describe('protocolV2', () => {
                versionsV2.forEach(({ versionTag, tokenOverrides }) => {
                  describe(`version ${versionTag}`, () => {
                    const fromToken =
                      tokenOverrides?.primaryToken ?? primaryToken
                    const toToken =
                      tokenOverrides?.noAllowanceToken ?? noAllowanceToken

                    it('should return more than 0', async () => {
                      const trade = new Trade({
                        fromToken,
                        toToken,
                        walletAddress,
                        dexProvider,
                        dexContext,
                        format: { type: 'hex' },
                      })

                      const result = await trade.getFromTokenRouterAllowance({
                        protocol: protocolMap.protocolV2,
                        dexTag,
                        versionTag,
                      })

                      expect(result).not.toEqual(MIN_HEX_STRING)
                    })

                    it('should return 0 allowance', async () => {
                      const trade = new Trade({
                        fromToken: toToken,
                        toToken: fromToken,
                        walletAddress,
                        dexProvider,
                        dexContext,
                        format: { type: 'hex' },
                      })

                      const result = await trade.getFromTokenRouterAllowance({
                        protocol: protocolMap.protocolV2,
                        dexTag,
                        versionTag,
                      })

                      expect(result).toEqual(MIN_HEX_STRING)
                    })
                  })
                })
              })
            }

            if (protocolV3) {
              describe('protocolV3', () => {
                versionsV3.forEach(({ versionTag, tokenOverrides }) => {
                  describe(`version ${versionTag}`, () => {
                    const fromToken =
                      tokenOverrides?.primaryToken ?? primaryToken
                    const toToken =
                      tokenOverrides?.noAllowanceToken ?? noAllowanceToken

                    it('should return more than 0', async () => {
                      const trade = new Trade({
                        fromToken,
                        toToken,
                        walletAddress,
                        dexProvider,
                        dexContext,
                      })

                      const result = await trade.getFromTokenRouterAllowance({
                        protocol: protocolMap.protocolV3,
                        dexTag,
                        versionTag,
                      })

                      expect(result).not.toEqual(MIN_HEX_STRING)
                    })

                    it('should return 0 allowance', async () => {
                      const trade = new Trade({
                        fromToken: toToken,
                        toToken: fromToken,
                        walletAddress,
                        dexProvider,
                        dexContext,
                      })

                      const result = await trade.getFromTokenRouterAllowance({
                        protocol: protocolMap.protocolV3,
                        dexTag,
                        versionTag,
                      })

                      expect(result).toEqual(MIN_HEX_STRING)
                    })
                  })
                })
              })
            }
          })

          describe('generateApproveRouterAllowanceTransaction', () => {
            if (protocolV2) {
              describe('protocolV2', () => {
                versionsV2.forEach(
                  ({ versionTag, version, tokenOverrides }) => {
                    const fromToken =
                      tokenOverrides?.primaryToken ?? primaryToken
                    const toToken =
                      tokenOverrides?.noAllowanceToken ?? noAllowanceToken

                    describe(`version ${versionTag}`, () => {
                      const trade = new Trade({
                        fromToken,
                        toToken,
                        walletAddress,
                        dexProvider,
                        dexContext,
                      })

                      it('should generate the approve max allowance data', async () => {
                        const result =
                          await trade.generateApproveRouterAllowanceTransaction(
                            {
                              protocol: protocolMap.protocolV2,
                              dexTag,
                              version,
                            },
                          )

                        const functionSelector = '0x095ea7b3'
                        const maxUint256 = MAX_HEX_STRING.split('0x')[1]!

                        expect(result.data.length).toBe(138)
                        expect(result.data.startsWith(functionSelector)).toBe(
                          true,
                        )
                        expect(result.data.endsWith(maxUint256)).toBe(true)

                        expect(result.from).toBe(walletAddress)
                        expect(result.to).toBe(primaryToken.contractAddress)
                        expect(result.value).toBe(MIN_HEX_STRING)
                      })
                    })
                  },
                )
              })
            }

            if (protocolV3) {
              describe('protocolV3', () => {
                versionsV3.forEach(
                  ({ versionTag, version, tokenOverrides }) => {
                    const fromToken =
                      tokenOverrides?.primaryToken ?? primaryToken
                    const toToken =
                      tokenOverrides?.noAllowanceToken ?? noAllowanceToken

                    describe(`version ${versionTag}`, () => {
                      const trade = new Trade({
                        fromToken,
                        toToken,
                        walletAddress,
                        dexProvider,
                        dexContext,
                      })

                      it('should generate the approve max allowance data', async () => {
                        const result =
                          await trade.generateApproveRouterAllowanceTransaction(
                            {
                              protocol: protocolMap.protocolV3,
                              dexTag,
                              version,
                            },
                          )

                        const functionSelector = '0x095ea7b3'
                        const maxUint256 = MAX_HEX_STRING.split('0x')[1]!

                        expect(result.data.length).toBe(138)
                        expect(result.data.startsWith(functionSelector)).toBe(
                          true,
                        )
                        expect(result.data.endsWith(maxUint256)).toBe(true)

                        expect(result.from).toBe(walletAddress)
                        expect(result.to).toBe(primaryToken.contractAddress)
                        expect(result.value).toBe(MIN_HEX_STRING)
                      })
                    })
                  },
                )
              })
            }
          })
        })

        describe('token > coin', () => {
          const tradeArgs: TradeInternalArgs<'dexnumber'> = {
            fromToken: noAllowanceToken,
            toToken: nativeCoin,
            walletAddress,
            dexProvider,
            settings,
            dexContext,
            format: { type: 'dexnumber' },
          }

          const tradeCommon = new Trade(tradeArgs)

          it('`toToken` should return correctly', () => {
            expect(tradeCommon.toToken).toEqual(tradeArgs.toToken)
          })

          it('`fromToken` should return correctly', () => {
            expect(tradeCommon.fromToken).toEqual(tradeArgs.fromToken)
          })

          describe('trade', () => {
            it('should return trade info', async () => {
              const result = await tradeCommon.quote(tradeAmount)
              expect(result).toBeDefined()
            })
          })

          describe('findBestRouteQuote', () => {
            describe(tradeDirectionMap.input, () => {
              it('should return the best route', async () => {
                const result = await tradeCommon.findBestRouteQuote({
                  amountToTrade: tradeAmount,
                  tradeDirection: tradeDirectionMap.input,
                })
                expect(result).toBeDefined()
              })
            })

            describe(tradeDirectionMap.output, () => {
              it('should return the best route', async () => {
                const result = await tradeCommon.findBestRouteQuote({
                  amountToTrade: tradeAmount,
                  tradeDirection: tradeDirectionMap.output,
                })
                expect(result).toBeDefined()
              })
            })
          })

          describe('getRouteQuotes', () => {
            describe(tradeDirectionMap.input, () => {
              it('should return all possible routes with quotes', async () => {
                const result = await tradeCommon.getRouteQuotes({
                  amountToTrade: tradeAmount,
                  tradeDirection: tradeDirectionMap.input,
                })
                expect(result).toBeDefined()
              })
            })

            describe(tradeDirectionMap.output, () => {
              it('should return all possible routes with quotes', async () => {
                const result = await tradeCommon.getRouteQuotes({
                  amountToTrade: tradeAmount,
                  tradeDirection: tradeDirectionMap.output,
                })
                expect(result).toBeDefined()
              })
            })
          })

          describe('getVersionedRoutePathsByDex', () => {
            it('should return all possible routes', async () => {
              const result = await tradeCommon.getVersionedRoutePathsByDex()
              expect(result).toBeDefined()
            })
          })

          describe('allowance', () => {
            if (protocolV2) {
              describe('protocolV2', () => {
                versionsV2.forEach(({ versionTag, tokenOverrides }) => {
                  describe(`version ${versionTag}`, () => {
                    it('should return more than 0', async () => {
                      const fromToken =
                        tokenOverrides?.primaryToken ?? primaryToken

                      const trade = new Trade({
                        fromToken,
                        toToken: nativeCoin,
                        walletAddress,
                        dexProvider,
                        dexContext,
                      })

                      const result = await trade.getFromTokenRouterAllowance({
                        protocol: protocolMap.protocolV2,
                        dexTag,
                        versionTag,
                      })
                      expect(result).not.toEqual(MIN_HEX_STRING)
                    })

                    it('should return 0 allowance', async () => {
                      const fromToken =
                        tokenOverrides?.noAllowanceToken ?? noAllowanceToken

                      const trade = new Trade({
                        fromToken,
                        toToken: nativeCoin,
                        walletAddress,
                        dexProvider,
                        dexContext,
                        format: { type: 'hex' },
                      })

                      const result = await trade.getFromTokenRouterAllowance({
                        protocol: protocolMap.protocolV2,
                        dexTag,
                        versionTag,
                      })
                      expect(result).toEqual(MIN_HEX_STRING)
                    })
                  })
                })
              })
            }

            if (protocolV3) {
              describe('protocolV3', () => {
                versionsV3.forEach(({ versionTag, tokenOverrides }) => {
                  describe(`version ${versionTag}`, () => {
                    it('should return more than 0', async () => {
                      const fromToken =
                        tokenOverrides?.primaryToken ?? primaryToken

                      const trade = new Trade({
                        fromToken,
                        toToken: nativeCoin,
                        walletAddress,
                        dexProvider,
                        dexContext,
                      })

                      const result = await trade.getFromTokenRouterAllowance({
                        protocol: protocolMap.protocolV3,
                        dexTag,
                        versionTag,
                      })
                      expect(result).not.toEqual(MIN_HEX_STRING)
                    })

                    it('should return 0 allowance', async () => {
                      const fromToken =
                        tokenOverrides?.noAllowanceToken ?? noAllowanceToken

                      const trade = new Trade({
                        fromToken,
                        toToken: nativeCoin,
                        walletAddress,
                        dexProvider,
                        dexContext,
                      })

                      const result = await trade.getFromTokenRouterAllowance({
                        protocol: protocolMap.protocolV3,
                        dexTag,
                        versionTag,
                      })
                      expect(result).toEqual(MIN_HEX_STRING)
                    })
                  })
                })
              })
            }
          })

          describe('generateApproveRouterAllowanceTransaction', () => {
            if (protocolV2) {
              describe('protocolV2', () => {
                versionsV2.forEach(
                  ({ versionTag, version, tokenOverrides }) => {
                    const fromToken =
                      tokenOverrides?.noAllowanceToken ?? noAllowanceToken

                    const trade = new Trade({
                      fromToken,
                      toToken: nativeCoin,
                      walletAddress,
                      dexProvider,
                      dexContext,
                    })

                    describe(`version ${versionTag}`, () => {
                      it('should generate the approve max allowance data', async () => {
                        const result =
                          await trade.generateApproveRouterAllowanceTransaction(
                            {
                              protocol: protocolMap.protocolV2,
                              dexTag,
                              version,
                            },
                          )

                        // Check each property individually
                        expect(result.from).toBe(walletAddress)
                        expect(result.to).toBe(noAllowanceToken.contractAddress)
                        expect(result.value).toBe(MIN_HEX_STRING)

                        // For data, check that it is a valid hex string
                        expect(typeof result.data).toBe('string')
                        expect(result.data.startsWith('0x')).toBe(true)

                        // Optionally, check the function selector and maxUint256
                        const functionSelector = '0x095ea7b3' // Function selector for approve(address,uint256)
                        const maxUint256 = MAX_HEX_STRING.substring(2) // Remove '0x' prefix

                        expect(result.data.startsWith(functionSelector)).toBe(
                          true,
                        )
                        expect(result.data.endsWith(maxUint256)).toBe(true)
                        expect(result.data.length).toBe(138) // Expected length for approve transaction data
                      })
                    })
                  },
                )
              })
            }

            if (protocolV3) {
              describe('protocolV3', () => {
                versionsV3.forEach(
                  ({ versionTag, version, tokenOverrides }) => {
                    const fromToken =
                      tokenOverrides?.noAllowanceToken ?? noAllowanceToken

                    const trade = new Trade({
                      fromToken,
                      toToken: nativeCoin,
                      walletAddress,
                      dexProvider,
                      dexContext,
                    })

                    describe(`version ${versionTag}`, () => {
                      it('should generate the approve max allowance data', async () => {
                        const result =
                          await trade.generateApproveRouterAllowanceTransaction(
                            {
                              protocol: protocolMap.protocolV3,
                              dexTag,
                              version,
                            },
                          )

                        // Check each property individually
                        expect(result.from).toBe(walletAddress)
                        expect(result.to).toBe(noAllowanceToken.contractAddress)
                        expect(result.value).toBe(MIN_HEX_STRING)

                        // For data, check that it is a valid hex string
                        expect(typeof result.data).toBe('string')
                        expect(result.data.startsWith('0x')).toBe(true)

                        // Optionally, check the function selector and maxUint256
                        const functionSelector = '0x095ea7b3' // Function selector for approve(address,uint256)
                        const maxUint256 = MAX_HEX_STRING.substring(2) // Remove '0x' prefix

                        expect(result.data.startsWith(functionSelector)).toBe(
                          true,
                        )
                        expect(result.data.endsWith(maxUint256)).toBe(true)
                        expect(result.data.length).toBe(138) // Expected length for approve transaction data
                      })
                    })
                  },
                )
              })
            }
          })
        })

        describe('coin > token', () => {
          const tradeArgs: TradeInternalArgs<'dexnumber'> = {
            fromToken: nativeCoin,
            toToken: noAllowanceToken,
            walletAddress,
            dexProvider,
            dexContext,
            format: { type: 'dexnumber' },
          }

          const tradeCommon = new Trade(tradeArgs)

          it('`toToken` should return correctly', () => {
            expect(tradeCommon.toToken).toEqual(tradeArgs.toToken)
          })

          it('`fromToken` should return correctly', () => {
            expect(tradeCommon.fromToken).toEqual(tradeArgs.fromToken)
          })

          describe('trade', () => {
            it('should return trade info', async () => {
              const result = await tradeCommon.quote(tradeAmount)
              expect(result).toBeDefined()
            })
          })

          describe('findBestRouteQuote', () => {
            describe(tradeDirectionMap.input, () => {
              it('should return the best route', async () => {
                const result = await tradeCommon.findBestRouteQuote({
                  amountToTrade: tradeAmount,
                  tradeDirection: tradeDirectionMap.input,
                })
                expect(result).toBeDefined()
              })
            })

            describe(tradeDirectionMap.output, () => {
              it('should return the best route', async () => {
                const result = await tradeCommon.findBestRouteQuote({
                  amountToTrade: tradeAmount,
                  tradeDirection: tradeDirectionMap.output,
                })
                expect(result).toBeDefined()
              })
            })
          })

          describe('getRouteQuotes', () => {
            describe(tradeDirectionMap.input, () => {
              it('should return all possible routes with quotes', async () => {
                const result = await tradeCommon.getRouteQuotes({
                  amountToTrade: tradeAmount,
                  tradeDirection: tradeDirectionMap.input,
                })
                expect(result).toBeDefined()
              })
            })

            describe(tradeDirectionMap.output, () => {
              it('should return all possible routes with quotes', async () => {
                const result = await tradeCommon.getRouteQuotes({
                  amountToTrade: tradeAmount,
                  tradeDirection: tradeDirectionMap.output,
                })
                expect(result).toBeDefined()
              })
            })
          })

          describe('getVersionedRoutePathsByDex', () => {
            it('should return all possible routes', async () => {
              const result = await tradeCommon.getVersionedRoutePathsByDex()
              expect(result).toBeDefined()
            })
          })

          describe('allowance', () => {
            if (protocolV2) {
              describe('protocolV2', () => {
                versionsV2.forEach(({ versionTag, tokenOverrides }) => {
                  const toToken =
                    tokenOverrides?.noAllowanceToken ?? noAllowanceToken

                  const trade = new Trade({
                    fromToken: nativeCoin,
                    toToken,
                    walletAddress,
                    dexProvider,
                    dexContext,
                    format: { type: 'dexnumber' },
                  })

                  describe(`version ${versionTag}`, () => {
                    it('should always return max hex', async () => {
                      const result = await trade.getFromTokenRouterAllowance({
                        protocol: protocolMap.protocolV2,
                        dexTag,
                        versionTag,
                      })

                      expect(result.toHexString()).toEqual(MAX_HEX_STRING)
                    })
                  })
                })
              })
            }

            if (protocolV3) {
              describe('protocolV3', () => {
                versionsV3.forEach(({ versionTag, tokenOverrides }) => {
                  const toToken =
                    tokenOverrides?.noAllowanceToken ?? noAllowanceToken

                  const trade = new Trade({
                    fromToken: nativeCoin,
                    toToken,
                    walletAddress,
                    dexProvider,
                    dexContext,
                    format: { type: 'dexnumber' },
                  })

                  describe(`version ${versionTag}`, () => {
                    it('should always return max hex', async () => {
                      const result = await trade.getFromTokenRouterAllowance({
                        protocol: protocolMap.protocolV3,
                        dexTag,
                        versionTag,
                      })
                      expect(result.toHexString()).toEqual(MAX_HEX_STRING)
                    })
                  })
                })
              })
            }
          })

          describe('generateApproveRouterAllowanceTransaction', () => {
            if (protocolV2) {
              describe('protocolV2', () => {
                versionsV2.forEach(
                  ({ versionTag, version, tokenOverrides }) => {
                    const toToken =
                      tokenOverrides?.noAllowanceToken ?? noAllowanceToken

                    const trade = new Trade({
                      fromToken: nativeCoin,
                      toToken,
                      walletAddress,
                      dexProvider,
                      dexContext,
                    })

                    describe(`version ${versionTag}`, () => {
                      it('should throw when generating the approve max allowance data', async () => {
                        await expect(
                          trade.generateApproveRouterAllowanceTransaction({
                            protocol: protocolMap.protocolV2,
                            dexTag,
                            version,
                          }),
                        ).rejects.toThrowError(
                          new DexError(
                            'Approval not required for native coin trades',
                            ErrorCodes.generateApproveRouterAllowanceTransactionNotAllowed,
                          ),
                        )
                      })
                    })
                  },
                )
              })
            }

            if (protocolV3) {
              describe('protocolV3', () => {
                versionsV3.forEach(
                  ({ versionTag, version, tokenOverrides }) => {
                    const toToken =
                      tokenOverrides?.noAllowanceToken ?? noAllowanceToken

                    const trade = new Trade({
                      fromToken: nativeCoin,
                      toToken,
                      walletAddress,
                      dexProvider,
                      dexContext,
                    })

                    describe(`version ${versionTag}`, () => {
                      it('should throw when generating the approve max allowance data', async () => {
                        await expect(
                          trade.generateApproveRouterAllowanceTransaction({
                            protocol: protocolMap.protocolV3,
                            dexTag,
                            version,
                          }),
                        ).rejects.toThrowError(
                          new DexError(
                            'Approval not required for native coin trades',
                            ErrorCodes.generateApproveRouterAllowanceTransactionNotAllowed,
                          ),
                        )
                      })
                    })
                  },
                )
              })
            }
          })
        })

        describe('coin > wrapped', () => {
          const tradeArgs: TradeInternalArgs<'dexnumber'> = {
            fromToken: nativeCoin,
            toToken: nativeWrapped,
            walletAddress,
            dexProvider,
            dexContext,
            format: { type: 'dexnumber' },
          }

          const tradeCommon = new Trade(tradeArgs)

          it('`toToken` should return correctly', () => {
            expect(tradeCommon.toToken).toEqual(tradeArgs.toToken)
          })

          it('`fromToken` should return correctly', () => {
            expect(tradeCommon.fromToken).toEqual(tradeArgs.fromToken)
          })

          describe('trade', () => {
            it('should return trade info', async () => {
              const result = await tradeCommon.quote(tradeAmount)
              expect(result).toBeDefined()
            })
          })

          describe('findBestRouteQuote', () => {
            it('should return the best route', async () => {
              const result = await tradeCommon.findBestRouteQuote({
                amountToTrade: tradeAmount,
                tradeDirection: tradeDirectionMap.input,
              })
              expect(result).toBeDefined()
            })
          })

          describe('getRouteQuotes', () => {
            it('should return all possible routes with quotes', async () => {
              const result = await tradeCommon.getRouteQuotes({
                amountToTrade: tradeAmount,
                tradeDirection: tradeDirectionMap.input,
              })
              expect(result).toBeDefined()
            })
          })

          describe('getVersionedRoutePathsByDex', () => {
            it('should return all possible routes', async () => {
              const result = await tradeCommon.getVersionedRoutePathsByDex()
              expect(result).toBeDefined()
            })
          })
        })

        describe('wrapped > coin', () => {
          const tradeArgs: TradeInternalArgs<'dexnumber'> = {
            fromToken: nativeWrapped,
            toToken: nativeCoin,
            walletAddress,
            dexProvider,
            dexContext,
            format: { type: 'dexnumber' },
          }

          const tradeCommon = new Trade(tradeArgs)

          it('`toToken` should return correctly', () => {
            expect(tradeCommon.toToken).toEqual(tradeArgs.toToken)
          })

          it('`fromToken` should return correctly', () => {
            expect(tradeCommon.fromToken).toEqual(tradeArgs.fromToken)
          })

          describe('trade', () => {
            it('should return trade info', async () => {
              const result = await tradeCommon.quote(tradeAmount)
              expect(result).toBeDefined()
            })
          })

          describe('findBestRouteQuote', () => {
            it('should return the best route', async () => {
              const result = await tradeCommon.findBestRouteQuote({
                amountToTrade: tradeAmount,
                tradeDirection: tradeDirectionMap.input,
              })
              expect(result).toBeDefined()
            })
          })

          describe('getRouteQuotes', () => {
            it('should return all possible routes with quotes', async () => {
              const result = await tradeCommon.getRouteQuotes({
                amountToTrade: tradeAmount,
                tradeDirection: tradeDirectionMap.input,
              })
              expect(result).toBeDefined()
            })
          })

          describe('getVersionedRoutePathsByDex', () => {
            it('should return all possible routes', async () => {
              const result = await tradeCommon.getVersionedRoutePathsByDex()
              expect(result).toBeDefined()
            })
          })
        })
      })
    })
  })
})
