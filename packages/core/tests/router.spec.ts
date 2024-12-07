import { DexNumber } from '@dex-toolkit/number'
import { DexProvider } from '@dex-toolkit/provider'
import type {
  BestRouteQuoteContext,
  Token,
  TradeInternalArgs,
  TradeSettings,
} from '@dex-toolkit/types'
import { plsChains } from '@dex-toolkit/utils'
import {
  defaultMultiPriceContext,
  DexError,
  protocolMap,
  ErrorCodes,
  tradeDirectionMap,
  getChainConfig,
  getDexConfig,
  ZERO_ADDRESS,
  isSameAddress,
} from '@dex-toolkit/utils'
import { expect, describe, it } from 'vitest'

import {
  activeTestCases,
  MockWalletAddress,
} from '../../../test/testing-setup/src/mocks/mocks'
import { Router } from '../src/router/router'

function validateBestRoute(
  result: BestRouteQuoteContext,
  fromToken: Token,
  toToken: Token,
) {
  // Check if a best route quote is returned
  expect(result.bestRouteQuote).toBeDefined()

  // Check if the route starts with the from token and ends with the to token
  const routePath = result.bestRouteQuote.routePathText.split(' > ')
  expect(routePath[0]).toBe(fromToken.symbol)
  expect(routePath[routePath.length - 1]).toBe(toToken.symbol)

  // Check if the route has at least two tokens (from and to)
  expect(routePath.length).toBeGreaterThanOrEqual(2)

  // Check if all tokens in the path are unique (no loops)
  const uniqueTokens = new Set(routePath)
  expect(uniqueTokens.size).toBe(routePath.length)

  // Check if the expected converted quote is greater than zero
  expect(result.bestRouteQuote.expectedConvertQuote.gt(0)).toEqual(true)
}

describe('Router', () => {
  Object.entries(activeTestCases).forEach(([type, chainCases]) => {
    describe(type, () => {
      Object.values(chainCases).forEach((testCase) => {
        const { dexType, chainId, tokens, versions } = testCase

        const {
          primaryToken,
          noAllowanceToken,
          noDirectToken,
          nativeCoin,
          nativeWrapped,
        } = tokens

        const dexTag = dexType
        const walletAddress = MockWalletAddress
        const tradeAmount = '1'

        const versionsV2 = versions.v2
        const versionsV3 = versions.v3

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

        const multiPriceContext = defaultMultiPriceContext

        const settings: Partial<TradeSettings> = {
          slippage: 0.005,
          deadlineMinutes: 20,
          disableMultihops: false,
          disableObserver: false,
          gasSettings: {
            getGasPrice: async () => '90',
          },
        }

        describe(`${chainConfig.displayName} (${chainId})`, () => {
          describe('Constructor', () => {
            const fromToken = primaryToken
            const toToken = noAllowanceToken

            it('should initialize router correctly', () => {
              const router = new Router({
                fromToken,
                toToken,
                dexContext,
                walletAddress,
                settings,
                dexProvider,
                multiPriceContext,
                format: { type: 'dexnumber' },
              })
              expect(router.fromToken).toEqual(fromToken)
              expect(router.toToken).toEqual(toToken)
              expect(router.dexProvider).toEqual(dexProvider)
            })

            it('should throw an error if fromToken or toToken is missing', () => {
              expect(
                () =>
                  new Router({
                    fromToken: undefined as any,
                    toToken,
                    dexContext,
                    walletAddress,
                    settings,
                    dexProvider,
                    multiPriceContext,
                    format: { type: 'dexnumber' },
                  }),
              ).toThrow(DexError)
            })

            it('should throw an error if walletAddress is invalid', () => {
              expect(
                () =>
                  new Router({
                    fromToken,
                    toToken,
                    dexContext,
                    walletAddress: 'invalid',
                    settings,
                    dexProvider,
                    multiPriceContext,
                    format: { type: 'dexnumber' },
                  }),
              ).toThrow(DexError)
            })

            // Only test chain that are known to have multiple sub protocols
            if (
              ['PULSEX'].includes(dexTag) &&
              [...plsChains].includes(chainId)
            ) {
              describe('Sub protocols', () => {
                it('should have more than one protocolV2 version', () => {
                  const router = new Router({
                    fromToken,
                    toToken,
                    dexContext,
                    walletAddress,
                    settings,
                    dexProvider,
                    multiPriceContext,
                    format: { type: 'dexnumber' },
                  })

                  expect(
                    Object.keys(
                      router.dexConfigsByDex[dexTag]?.protocols?.protocolV2 ??
                        {},
                    ).length,
                  ).toBeGreaterThan(1)
                })

                it('should have one protocolV2 version via includeVersions', () => {
                  const router = new Router({
                    fromToken,
                    toToken,
                    dexContext,
                    walletAddress,
                    settings: {
                      ...settings,
                      protocolSettings: {
                        protocolV2: {
                          enabled: true,
                          includeVersions: [{ major: 1, minor: 0, patch: 0 }],
                        },
                      },
                    },
                    dexProvider,
                    multiPriceContext,
                    format: { type: 'dexnumber' },
                  })

                  expect(
                    Object.keys(
                      router.dexConfigsByDex[dexTag]?.protocols?.protocolV2 ??
                        {},
                    ).length,
                  ).toEqual(1)
                })

                it('should have one protocolV2 version via excludeVersions', () => {
                  const router = new Router({
                    fromToken,
                    toToken,
                    dexContext,
                    walletAddress,
                    settings: {
                      ...settings,
                      protocolSettings: {
                        protocolV2: {
                          enabled: true,
                          excludeVersions: [{ major: 2, minor: 0, patch: 0 }],
                        },
                      },
                    },
                    dexProvider,
                    multiPriceContext,
                    format: { type: 'dexnumber' },
                  })

                  expect(
                    Object.keys(
                      router.dexConfigsByDex[dexTag]?.protocols?.protocolV2 ??
                        {},
                    ).length,
                  ).toEqual(1)
                })
              })
            }
          })

          describe('token > token', () => {
            const fromToken = primaryToken
            const toToken = noAllowanceToken

            const routerCtx: TradeInternalArgs<'dexnumber'> = {
              fromToken,
              toToken,
              dexContext,
              walletAddress,
              settings,
              dexProvider,
              multiPriceContext,
              format: { type: 'dexnumber' },
            }

            describe('getVersionedRoutePathsByDex', () => {
              if (versionsV2) {
                describe('protocolV2', () => {
                  it('should get all possible routes', async () => {
                    const router = new Router(routerCtx)
                    const result = await router.getVersionedRoutePathsByDex()

                    expect(result[dexTag]?.protocolV2.length).toBeGreaterThan(0)
                    expect(
                      result[dexTag]?.protocolV2.filter(
                        (routePath) => routePath.route.length > 2,
                      ).length,
                    ).toBeGreaterThan(0)
                  })

                  it('disableMultihops should only return direct routes (in this case return nothing as there is no direct route)', async () => {
                    const router = new Router({
                      ...routerCtx,
                      toToken: noDirectToken,
                      settings: {
                        ...settings,
                        disableMultihops: true,
                      },
                    })
                    const result = await router.getVersionedRoutePathsByDex()

                    expect(
                      result[dexTag]?.protocolV2.filter(
                        (routePath) => routePath.route.length > 2,
                      ).length,
                    ).toEqual(0)
                  })
                })
              }

              if (versionsV3) {
                describe('protocolV3', () => {
                  it('should get all possible routes', async () => {
                    const router = new Router(routerCtx)
                    const result = await router.getVersionedRoutePathsByDex()

                    expect(result[dexTag]?.protocolV3.length).toBeGreaterThan(0)
                    expect(
                      result[dexTag]?.protocolV3.filter(
                        (routePath) => routePath.route.length > 2,
                      ).length,
                    ).toBeGreaterThan(0)
                  })

                  it('disableMultihops should only return direct routes (in this case return nothing as there is no direct route)', async () => {
                    const router = new Router({
                      ...routerCtx,
                      toToken: noDirectToken,
                      settings: {
                        ...settings,
                        disableMultihops: true,
                      },
                    })
                    const result = await router.getVersionedRoutePathsByDex()

                    expect(
                      result[dexTag]?.protocolV3.filter(
                        (routePath) => routePath.route.length > 2,
                      ).length,
                    ).toEqual(0)
                  })
                })
              }
            })

            describe('getRouteQuotes', () => {
              describe(tradeDirectionMap.input, () => {
                it('should get all possible routes with quote', async () => {
                  const router = new Router(routerCtx)
                  const result = await router.getRouteQuotes({
                    tokenAmount: DexNumber.fromUnshifted(
                      tradeAmount,
                      fromToken.decimals,
                    ),
                    tradeDirection: tradeDirectionMap.input,
                  })

                  expect(result.length).toBeGreaterThan(0)
                })

                it('should only return direct routes (in this case return nothing as there is no direct route)', async () => {
                  const router = new Router({
                    ...routerCtx,
                    settings: {
                      ...settings,
                      disableMultihops: true,
                    },
                  })

                  const result = await router.getRouteQuotes({
                    tokenAmount: DexNumber.fromUnshifted(
                      tradeAmount,
                      fromToken.decimals,
                    ),
                    tradeDirection: tradeDirectionMap.input,
                  })

                  expect(
                    result.filter(
                      (routePath) => routePath.routePathAddresses.length > 2,
                    ).length,
                  ).toEqual(0)
                })
              })

              describe(tradeDirectionMap.output, () => {
                it('should get all possible routes with quote', async () => {
                  const router = new Router(routerCtx)
                  const result = await router.getRouteQuotes({
                    tokenAmount: DexNumber.fromUnshifted(
                      tradeAmount,
                      toToken.decimals,
                    ),
                    tradeDirection: tradeDirectionMap.output,
                  })

                  expect(result.length).toBeGreaterThan(0)
                })

                it('should only return direct routes (in this case return nothing as there is no direct route)', async () => {
                  const router = new Router({
                    ...routerCtx,
                    settings: {
                      ...settings,
                      disableMultihops: true,
                    },
                  })

                  const result = await router.getRouteQuotes({
                    tokenAmount: DexNumber.fromUnshifted(
                      tradeAmount,
                      toToken.decimals,
                    ),
                    tradeDirection: tradeDirectionMap.output,
                  })

                  expect(
                    result.filter(
                      (routePath) => routePath.routePathAddresses.length > 2,
                    ).length,
                  ).toEqual(0)
                })
              })
            })

            describe('findBestRouteQuote', () => {
              if (versionsV2) {
                describe('protocolV2', () => {
                  describe(tradeDirectionMap.input, () => {
                    it('should find best route', async () => {
                      const router = new Router({
                        ...routerCtx,
                        fromToken: primaryToken,
                        toToken: noAllowanceToken,
                        settings: {
                          ...routerCtx.settings,
                          protocolSettings: {
                            protocolV2: {
                              enabled: true,
                            },
                          },
                        },
                      })

                      const result = await router.findBestRouteQuote({
                        tokenAmount: DexNumber.fromUnshifted(
                          tradeAmount,
                          primaryToken.decimals,
                        ),
                        tradeDirection: tradeDirectionMap.input,
                      })

                      validateBestRoute(result, primaryToken, noAllowanceToken)
                    })

                    it('should throw an error as there is no best route with disableMultihops turned on', async () => {
                      const router = new Router({
                        ...routerCtx,
                        fromToken: primaryToken,
                        toToken: noDirectToken,
                        settings: {
                          ...routerCtx.settings,
                          protocolSettings: {
                            protocolV2: {
                              enabled: true,
                            },
                          },
                          disableMultihops: true,
                        },
                      })

                      await expect(
                        router.findBestRouteQuote({
                          tokenAmount: DexNumber.fromUnshifted(
                            tradeAmount,
                            primaryToken.decimals,
                          ),
                          tradeDirection: tradeDirectionMap.input,
                        }),
                      ).rejects.toThrowError(
                        new DexError(
                          `No routes found for ${primaryToken.symbol} > ${noDirectToken.symbol}`,
                          ErrorCodes.noRoutesFound,
                        ),
                      )
                    })
                  })

                  describe(tradeDirectionMap.output, () => {
                    it('should find best route', async () => {
                      const router = new Router({
                        ...routerCtx,
                        fromToken: primaryToken,
                        toToken: noAllowanceToken,
                        settings: {
                          ...routerCtx.settings,
                          protocolSettings: {
                            protocolV2: {
                              enabled: true,
                            },
                          },
                        },
                      })

                      const result = await router.findBestRouteQuote({
                        tokenAmount: DexNumber.fromUnshifted(
                          tradeAmount,
                          noAllowanceToken.decimals,
                        ),
                        tradeDirection: tradeDirectionMap.output,
                      })

                      validateBestRoute(result, primaryToken, noAllowanceToken)
                    })

                    it('should throw an error as there is no best route with disableMultihops turned on', async () => {
                      const router = new Router({
                        ...routerCtx,
                        fromToken: primaryToken,
                        toToken: noDirectToken,
                        settings: {
                          ...settings,
                          protocolSettings: {
                            protocolV2: {
                              enabled: true,
                            },
                          },
                          disableMultihops: true,
                        },
                      })

                      await expect(
                        router.findBestRouteQuote({
                          tokenAmount: DexNumber.fromUnshifted(
                            tradeAmount,
                            noDirectToken.decimals,
                          ),
                          tradeDirection: tradeDirectionMap.output,
                        }),
                      ).rejects.toThrowError(
                        new DexError(
                          `No routes found for ${primaryToken.symbol} > ${noDirectToken.symbol}`,
                          ErrorCodes.noRoutesFound,
                        ),
                      )
                    })
                  })
                })

                if (versionsV3) {
                  describe('protocolV3', () => {
                    describe(tradeDirectionMap.input, () => {
                      it('should find best route', async () => {
                        const router = new Router({
                          ...routerCtx,
                          settings: {
                            ...routerCtx.settings,
                            protocolSettings: {
                              protocolV3: {
                                enabled: true,
                              },
                            },
                          },
                        })

                        const result = await router.findBestRouteQuote({
                          tokenAmount: DexNumber.fromUnshifted(
                            tradeAmount,
                            primaryToken.decimals,
                          ),
                          tradeDirection: tradeDirectionMap.input,
                        })

                        validateBestRoute(
                          result,
                          primaryToken,
                          noAllowanceToken,
                        )
                      })

                      it('should throw an error as there is no best route with disableMultihops turned on', async () => {
                        const router = new Router({
                          ...routerCtx,
                          fromToken: primaryToken,
                          toToken: noDirectToken,
                          settings: {
                            ...routerCtx.settings,
                            protocolSettings: {
                              protocolV3: {
                                enabled: true,
                              },
                            },
                            disableMultihops: true,
                          },
                        })

                        await expect(
                          router.findBestRouteQuote({
                            tokenAmount: DexNumber.fromUnshifted(
                              tradeAmount,
                              primaryToken.decimals,
                            ),
                            tradeDirection: tradeDirectionMap.input,
                          }),
                        ).rejects.toThrowError(
                          new DexError(
                            `No routes found for ${primaryToken.symbol} > ${noDirectToken.symbol}`,
                            ErrorCodes.noRoutesFound,
                          ),
                        )
                      })
                    })

                    describe(tradeDirectionMap.output, () => {
                      it('should find best route', async () => {
                        const router = new Router({
                          ...routerCtx,
                          settings: {
                            ...routerCtx.settings,
                            protocolSettings: {
                              protocolV3: {
                                enabled: true,
                              },
                            },
                          },
                        })

                        const result = await router.findBestRouteQuote({
                          tokenAmount: DexNumber.fromUnshifted(
                            tradeAmount,
                            noAllowanceToken.decimals,
                          ),
                          tradeDirection: tradeDirectionMap.output,
                        })

                        validateBestRoute(
                          result,
                          primaryToken,
                          noAllowanceToken,
                        )
                      })

                      it('should throw an error as there is no best route with disableMultihops turned on', async () => {
                        const router = new Router({
                          ...routerCtx,
                          fromToken: primaryToken,
                          toToken: noDirectToken,
                          settings: {
                            ...settings,
                            protocolSettings: {
                              protocolV3: {
                                enabled: true,
                              },
                            },
                            disableMultihops: true,
                          },
                        })

                        await expect(
                          router.findBestRouteQuote({
                            tokenAmount: DexNumber.fromUnshifted(
                              tradeAmount,
                              noDirectToken.decimals,
                            ),
                            tradeDirection: tradeDirectionMap.output,
                          }),
                        ).rejects.toThrowError(
                          new DexError(
                            `No routes found for ${primaryToken.symbol} > ${noDirectToken.symbol}`,
                            ErrorCodes.noRoutesFound,
                          ),
                        )
                      })
                    })
                  })
                }
              }
            })

            describe('getPriceImpact', () => {
              if (versionsV2) {
                describe('protocolV2', () => {
                  versionsV2.forEach(
                    ({
                      versionTag,
                      version,
                      tokenOverrides,
                      pairAddresses: {
                        primaryToWrapped,
                        secondaryToWrapped,
                        fee,
                      },
                    }) => {
                      describe(`version ${versionTag}`, () => {
                        const fromToken =
                          tokenOverrides?.primaryToken ?? primaryToken
                        const toToken =
                          tokenOverrides?.noAllowanceToken ?? noAllowanceToken

                        const pairAddresses = [
                          primaryToWrapped,
                          secondaryToWrapped,
                        ]
                        const liquidityProviderFeePercent = fee
                        const protocol = protocolMap.protocolV2
                        const tokenAmount = DexNumber.fromUnshifted(
                          1_000,
                          fromToken.decimals,
                        )
                        const expectedConvertQuote = DexNumber.fromUnshifted(
                          950,
                          toToken.decimals,
                        )
                        const routePathTokens = [
                          fromToken,
                          nativeWrapped,
                          toToken,
                        ]

                        if (
                          isSameAddress(primaryToWrapped, ZERO_ADDRESS) ||
                          isSameAddress(secondaryToWrapped, ZERO_ADDRESS)
                        ) {
                          it.skip(
                            'should return the price impact for a given trade. Skipped as no pairs configured in the mock-configs.ts',
                          )
                          return
                        }

                        it('should return the price impact for a given trade', async () => {
                          const router = new Router(routerCtx)
                          const priceImpact = await router.getPriceImpact({
                            tokenAmount,
                            expectedConvertQuote,
                            pairAddresses,
                            liquidityProviderFeePercent,
                            routePathTokens,
                            protocol,
                            dexTag,
                            version,
                          })

                          expect(priceImpact).toBeDefined()
                          expect(typeof priceImpact.percentage).toBe('string')
                        })

                        it('should throw an error if no amount to trade is provided', async () => {
                          const router = new Router(routerCtx)

                          await expect(
                            router.getPriceImpact({
                              dexTag,
                              protocol,
                              version,
                              tokenAmount: undefined as any,
                              expectedConvertQuote,
                              pairAddresses,
                              liquidityProviderFeePercent,
                              routePathTokens,
                            }),
                          ).rejects.toThrowError(
                            new DexError(
                              'Must provide amount to trade',
                              ErrorCodes.functionArgumentError,
                            ),
                          )
                        })

                        it('should throw an error if no expected convert quote is provided', async () => {
                          const router = new Router(routerCtx)

                          await expect(
                            router.getPriceImpact({
                              dexTag,
                              protocol,
                              version,
                              tokenAmount,
                              expectedConvertQuote: undefined as any,
                              pairAddresses,
                              liquidityProviderFeePercent,
                              routePathTokens,
                            }),
                          ).rejects.toThrowError(
                            new DexError(
                              'Must provide expected convert quote',
                              ErrorCodes.functionArgumentError,
                            ),
                          )
                        })

                        it('should throw an error if no pair addresses are provided', async () => {
                          const router = new Router(routerCtx)

                          await expect(
                            router.getPriceImpact({
                              dexTag,
                              protocol,
                              version,
                              tokenAmount,
                              expectedConvertQuote,
                              pairAddresses: [],
                              liquidityProviderFeePercent,
                              routePathTokens,
                            }),
                          ).rejects.toThrowError(
                            new DexError(
                              'Must provide addresses',
                              ErrorCodes.functionArgumentError,
                            ),
                          )
                        })

                        it('should throw an error if no dex version is provided', async () => {
                          const router = new Router(routerCtx)

                          await expect(
                            router.getPriceImpact({
                              dexTag,
                              protocol: undefined as any,
                              version,
                              tokenAmount,
                              expectedConvertQuote,
                              pairAddresses,
                              liquidityProviderFeePercent,
                              routePathTokens,
                            }),
                          ).rejects.toThrowError(
                            new DexError(
                              'Must provide dex protocol',
                              ErrorCodes.functionArgumentError,
                            ),
                          )
                        })
                      })
                    },
                  )
                })
              }

              if (versionsV3) {
                describe('protocolV3', () => {
                  versionsV3.forEach(
                    ({
                      versionTag,
                      version,
                      tokenOverrides,
                      poolAddresses: { primaryToWrapped, secondaryToWrapped },
                    }) => {
                      describe(`version ${versionTag}`, () => {
                        const fromToken =
                          tokenOverrides?.primaryToken ?? primaryToken
                        const toToken =
                          tokenOverrides?.noAllowanceToken ?? noAllowanceToken

                        const pairAddresses = [
                          primaryToWrapped.address,
                          secondaryToWrapped.address,
                        ]
                        const liquidityProviderFeePercent = [
                          primaryToWrapped.feeTier,
                          secondaryToWrapped.feeTier,
                        ]

                        const protocol = protocolMap.protocolV3
                        const tokenAmount = DexNumber.fromUnshifted(
                          1_000,
                          fromToken.decimals,
                        )
                        const expectedConvertQuote = DexNumber.fromUnshifted(
                          950,
                          toToken.decimals,
                        )
                        const routePathTokens = [
                          fromToken,
                          nativeWrapped,
                          toToken,
                        ]

                        it('should return the price impact for a given trade', async () => {
                          const router = new Router(routerCtx)
                          const priceImpact = await router.getPriceImpact({
                            tokenAmount,
                            expectedConvertQuote,
                            pairAddresses,
                            liquidityProviderFeePercent,
                            routePathTokens,
                            protocol,
                            dexTag,
                            version,
                          })

                          expect(priceImpact).toBeDefined()
                          expect(typeof priceImpact).toBe('string')
                        })

                        it('should throw an error if no amount to trade is provided', async () => {
                          const router = new Router(routerCtx)

                          await expect(
                            router.getPriceImpact({
                              tokenAmount: undefined as any,
                              expectedConvertQuote,
                              pairAddresses,
                              liquidityProviderFeePercent,
                              routePathTokens,
                              protocol,
                              dexTag,
                              version,
                            }),
                          ).rejects.toThrowError(
                            new DexError(
                              'Must provide amount to trade',
                              ErrorCodes.functionArgumentError,
                            ),
                          )
                        })

                        it('should throw an error if no expected convert quote is provided', async () => {
                          const router = new Router(routerCtx)

                          await expect(
                            router.getPriceImpact({
                              tokenAmount,
                              expectedConvertQuote: undefined as any,
                              pairAddresses,
                              liquidityProviderFeePercent,
                              routePathTokens,
                              protocol,
                              dexTag,
                              version,
                            }),
                          ).rejects.toThrowError(
                            new DexError(
                              'Must provide expected convert quote',
                              ErrorCodes.functionArgumentError,
                            ),
                          )
                        })

                        it('should throw an error if no pair addresses are provided', async () => {
                          const router = new Router(routerCtx)

                          await expect(
                            router.getPriceImpact({
                              tokenAmount,
                              expectedConvertQuote,
                              pairAddresses: [],
                              liquidityProviderFeePercent,
                              routePathTokens,
                              protocol,
                              dexTag,
                              version,
                            }),
                          ).rejects.toThrowError(
                            new DexError(
                              'Must provide addresses',
                              ErrorCodes.functionArgumentError,
                            ),
                          )
                        })

                        it('should throw an error if no dex version is provided', async () => {
                          const router = new Router(routerCtx)

                          await expect(
                            router.getPriceImpact({
                              tokenAmount,
                              expectedConvertQuote,
                              pairAddresses,
                              liquidityProviderFeePercent,
                              routePathTokens,
                              protocol: undefined as any,
                              dexTag,
                              version,
                            }),
                          ).rejects.toThrowError(
                            new DexError(
                              'Must provide dex protocol',
                              ErrorCodes.functionArgumentError,
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

          describe('token > coin', () => {
            const fromToken = primaryToken
            const toToken = nativeCoin

            const routerCtx: TradeInternalArgs<'dexnumber'> = {
              fromToken,
              toToken,
              dexContext,
              walletAddress,
              settings,
              dexProvider,
              multiPriceContext,
              format: { type: 'dexnumber' },
            }

            describe('getRoutePaths', () => {
              if (versionsV2) {
                describe('protocolV2', () => {
                  it('should get all possible routes with all V2 protocol versions', async () => {
                    const router = new Router({
                      ...routerCtx,
                      settings: {
                        ...routerCtx.settings,
                        protocolSettings: {
                          protocolV2: {
                            enabled: true,
                          },
                        },
                      },
                    })
                    const result = await router.getVersionedRoutePathsByDex()

                    expect(result[dexTag]?.protocolV2.length).toBeGreaterThan(1)

                    // Make sure there are no duplicate pair addresses
                    for (const route of result[dexTag]!.protocolV2) {
                      expect(route.pairAddresses.length).toEqual(
                        new Set(route.pairAddresses).size,
                      )
                    }
                  })

                  it('should only return direct routes', async () => {
                    const router = new Router({
                      ...routerCtx,
                      settings: {
                        ...routerCtx.settings,
                        protocolSettings: {
                          protocolV2: {
                            enabled: true,
                          },
                        },
                        disableMultihops: true,
                      },
                    })

                    const result = await router.getVersionedRoutePathsByDex()

                    const routeTokens = result[dexTag]?.protocolV2?.[0]?.route

                    expect(routeTokens?.length).toEqual(2)
                    expect(routeTokens?.[0]).toEqual(fromToken)
                    expect(routeTokens?.[1]).toEqual(toToken)
                    expect(
                      result[dexTag]?.protocolV2.filter(
                        (routePath) => routePath.route.length > 2,
                      ).length,
                    ).toEqual(0)
                  })
                })
              }

              if (versionsV3) {
                describe('protocolV3', () => {
                  it('should get all possible routes', async () => {
                    const router = new Router({
                      ...routerCtx,
                      settings: {
                        ...routerCtx.settings,
                        protocolSettings: {
                          protocolV3: {
                            enabled: true,
                          },
                        },
                      },
                    })
                    const result = await router.getVersionedRoutePathsByDex()

                    expect(result[dexTag]?.protocolV3.length).toBeGreaterThan(0)
                  })

                  it('should only return direct routes', async () => {
                    const router = new Router({
                      ...routerCtx,
                      settings: {
                        ...routerCtx.settings,
                        protocolSettings: {
                          protocolV3: {
                            enabled: true,
                          },
                        },
                        disableMultihops: true,
                      },
                    })

                    const result = await router.getVersionedRoutePathsByDex()

                    const routeTokens = result[dexTag]?.protocolV3?.[0]?.route

                    expect(routeTokens?.length).toEqual(2)
                    expect(routeTokens?.[0]).toEqual(fromToken)
                    expect(routeTokens?.[1]).toEqual(toToken)
                    expect(
                      result[dexTag]?.protocolV2.filter(
                        (routePath) => routePath.route.length > 2,
                      ).length,
                    ).toEqual(0)
                  })
                })
              }
            })

            describe('getRouteQuotes', () => {
              describe(tradeDirectionMap.input, () => {
                it('should get all possible routes with quote', async () => {
                  const router = new Router(routerCtx)
                  const result = await router.getRouteQuotes({
                    tokenAmount: DexNumber.fromUnshifted(
                      tradeAmount,
                      fromToken.decimals,
                    ),
                    tradeDirection: tradeDirectionMap.input,
                  })

                  expect(result.length).toBeGreaterThan(0)
                })

                it('should only return direct routes', async () => {
                  const router = new Router({
                    ...routerCtx,
                    settings: {
                      ...routerCtx.settings,
                      disableMultihops: true,
                    },
                  })
                  const result = await router.getRouteQuotes({
                    tokenAmount: DexNumber.fromUnshifted(
                      tradeAmount,
                      fromToken.decimals,
                    ),
                    tradeDirection: tradeDirectionMap.input,
                  })

                  expect(
                    result.filter(
                      (routePath) => routePath.routePathAddresses.length > 2,
                    ).length,
                  ).toEqual(0)
                })
              })

              describe(tradeDirectionMap.output, () => {
                it('should get all possible routes with quote', async () => {
                  const router = new Router(routerCtx)
                  const result = await router.getRouteQuotes({
                    tokenAmount: DexNumber.fromUnshifted(
                      tradeAmount,
                      toToken.decimals,
                    ),
                    tradeDirection: tradeDirectionMap.output,
                  })

                  expect(result.length).toBeGreaterThan(0)
                })

                it('should only return direct routes', async () => {
                  const router = new Router({
                    ...routerCtx,
                    settings: {
                      ...routerCtx.settings,
                      disableMultihops: true,
                    },
                  })
                  const result = await router.getRouteQuotes({
                    tokenAmount: DexNumber.fromUnshifted(
                      tradeAmount,
                      toToken.decimals,
                    ),
                    tradeDirection: tradeDirectionMap.output,
                  })

                  expect(
                    result.filter(
                      (routePath) => routePath.routePathAddresses.length > 2,
                    ).length,
                  ).toEqual(0)
                })
              })
            })

            describe('findBestRouteQuote', () => {
              if (versionsV2) {
                describe('protocolV2', () => {
                  describe(tradeDirectionMap.input, () => {
                    it('should find best route', async () => {
                      const router = new Router({
                        ...routerCtx,
                        fromToken: primaryToken,
                      })

                      const result = await router.findBestRouteQuote({
                        tokenAmount: DexNumber.fromUnshifted(
                          tradeAmount,
                          primaryToken.decimals,
                        ),
                        tradeDirection: tradeDirectionMap.input,
                      })

                      validateBestRoute(result, primaryToken, toToken)
                    })
                  })

                  describe(tradeDirectionMap.output, () => {
                    it('should find best route', async () => {
                      const router = new Router({
                        ...routerCtx,
                        fromToken: primaryToken,
                      })

                      const result = await router.findBestRouteQuote({
                        tokenAmount: DexNumber.fromUnshifted(
                          tradeAmount,
                          toToken.decimals,
                        ),
                        tradeDirection: tradeDirectionMap.output,
                      })

                      validateBestRoute(result, primaryToken, toToken)
                    })
                  })
                })
              }

              if (versionsV3) {
                describe('protocolV3', () => {
                  describe(tradeDirectionMap.input, () => {
                    it('should find best route', async () => {
                      const router = new Router({
                        ...routerCtx,
                        fromToken: primaryToken,
                      })

                      const result = await router.findBestRouteQuote({
                        tokenAmount: DexNumber.fromUnshifted(
                          tradeAmount,
                          primaryToken.decimals,
                        ),
                        tradeDirection: tradeDirectionMap.input,
                      })

                      validateBestRoute(result, primaryToken, toToken)
                    })
                  })

                  describe(tradeDirectionMap.output, () => {
                    it('should find best route', async () => {
                      const router = new Router({
                        ...routerCtx,
                        fromToken: primaryToken,
                      })

                      const result = await router.findBestRouteQuote({
                        tokenAmount: DexNumber.fromUnshifted(
                          tradeAmount,
                          toToken.decimals,
                        ),
                        tradeDirection: tradeDirectionMap.output,
                      })

                      validateBestRoute(result, primaryToken, toToken)
                    })
                  })
                })
              }

              describe(tradeDirectionMap.input, () => {
                it('should find best route', async () => {
                  const router = new Router(routerCtx)
                  const result = await router.findBestRouteQuote({
                    tokenAmount: DexNumber.fromUnshifted(
                      tradeAmount,
                      fromToken.decimals,
                    ),
                    tradeDirection: tradeDirectionMap.input,
                  })

                  validateBestRoute(result, fromToken, toToken)
                })
              })

              describe(tradeDirectionMap.output, () => {
                it('should find best route', async () => {
                  const router = new Router({
                    ...routerCtx,
                    settings: {
                      ...routerCtx.settings,
                    },
                  })
                  const result = await router.findBestRouteQuote({
                    tokenAmount: DexNumber.fromUnshifted(
                      tradeAmount,
                      toToken.decimals,
                    ),
                    tradeDirection: tradeDirectionMap.output,
                  })

                  validateBestRoute(result, fromToken, toToken)
                })
              })
            })
          })

          describe('coin > token', () => {
            const fromToken = nativeCoin
            const toToken = primaryToken

            const routerCtx: TradeInternalArgs<'dexnumber'> = {
              fromToken,
              toToken,
              dexContext,
              walletAddress,
              settings,
              dexProvider,
              multiPriceContext,
              format: { type: 'dexnumber' },
            }

            describe('getRoutePaths', () => {
              if (versionsV2) {
                describe('protocolV2', () => {
                  it('should get all possible routes', async () => {
                    const router = new Router({
                      ...routerCtx,
                      settings: {
                        ...settings,
                        protocolSettings: {
                          protocolV2: {
                            enabled: true,
                          },
                        },
                      },
                    })
                    const result = await router.getVersionedRoutePathsByDex()

                    expect(result[dexTag]?.protocolV2.length).toBeGreaterThan(0)
                    expect(
                      result[dexTag]?.protocolV2.filter(
                        (routePath) => routePath.route.length > 2,
                      ).length,
                    ).toBeGreaterThan(0)
                  })

                  it('should only return direct routes', async () => {
                    const router = new Router({
                      ...routerCtx,
                      settings: {
                        ...settings,
                        protocolSettings: {
                          protocolV2: {
                            enabled: true,
                          },
                        },
                        disableMultihops: true,
                      },
                    })
                    const result = await router.getVersionedRoutePathsByDex()

                    const routeTokens = result[dexTag]?.protocolV2?.[0]?.route

                    expect(routeTokens?.length).toEqual(2)
                    expect(routeTokens?.[0]).toEqual(fromToken)
                    expect(routeTokens?.[1]).toEqual(toToken)
                    expect(
                      result[dexTag]?.protocolV2.filter(
                        (routePath) => routePath.route.length > 2,
                      ).length,
                    ).toEqual(0)
                  })
                })
              }

              if (versionsV3) {
                describe('protocolV3', () => {
                  it('should get all possible routes', async () => {
                    const router = new Router({
                      ...routerCtx,
                      settings: {
                        ...settings,
                        protocolSettings: {
                          protocolV3: {
                            enabled: true,
                          },
                        },
                      },
                    })
                    const result = await router.getVersionedRoutePathsByDex()

                    expect(result[dexTag]?.protocolV3.length).toBeGreaterThan(0)
                  })

                  it('should only return direct routes', async () => {
                    const router = new Router({
                      ...routerCtx,
                      settings: {
                        ...settings,
                        protocolSettings: {
                          protocolV3: {
                            enabled: true,
                          },
                        },
                        disableMultihops: true,
                      },
                    })

                    const result = await router.getVersionedRoutePathsByDex()

                    const routeTokens = result[dexTag]?.protocolV3?.[0]?.route

                    expect(routeTokens?.length).toEqual(2)
                    expect(routeTokens?.[0]).toEqual(fromToken)
                    expect(routeTokens?.[1]).toEqual(toToken)
                    expect(
                      result[dexTag]?.protocolV2.filter(
                        (routePath) => routePath.route.length > 2,
                      ).length,
                    ).toEqual(0)
                  })
                })
              }
            })

            describe('getRouteQuotes', () => {
              describe(tradeDirectionMap.input, () => {
                it('should get all possible routes with quote', async () => {
                  const router = new Router(routerCtx)
                  const result = await router.getRouteQuotes({
                    tokenAmount: DexNumber.fromUnshifted(
                      tradeAmount,
                      fromToken.decimals,
                    ),
                    tradeDirection: tradeDirectionMap.input,
                  })

                  expect(result.length).toBeGreaterThan(0)
                })

                it('should only return direct routes', async () => {
                  const router = new Router({
                    ...routerCtx,
                    settings: {
                      ...settings,
                      disableMultihops: true,
                    },
                  })
                  const result = await router.getRouteQuotes({
                    tokenAmount: DexNumber.fromUnshifted(
                      tradeAmount,
                      fromToken.decimals,
                    ),
                    tradeDirection: tradeDirectionMap.input,
                  })

                  expect(
                    result.filter(
                      (routePath) => routePath.routePathAddresses.length > 2,
                    ).length,
                  ).toEqual(0)
                })
              })
              describe(tradeDirectionMap.output, () => {
                it('should get all possible routes with quote', async () => {
                  const router = new Router(routerCtx)
                  const result = await router.getRouteQuotes({
                    tokenAmount: DexNumber.fromUnshifted(
                      tradeAmount,
                      toToken.decimals,
                    ),
                    tradeDirection: tradeDirectionMap.output,
                  })

                  expect(result.length).toBeGreaterThan(0)
                })

                it('should only return direct routes', async () => {
                  const router = new Router({
                    ...routerCtx,
                    settings: {
                      ...settings,
                      disableMultihops: true,
                    },
                  })
                  const result = await router.getRouteQuotes({
                    tokenAmount: DexNumber.fromUnshifted(
                      tradeAmount,
                      toToken.decimals,
                    ),
                    tradeDirection: tradeDirectionMap.output,
                  })

                  expect(
                    result.filter(
                      (routePath) => routePath.routePathAddresses.length > 2,
                    ).length,
                  ).toEqual(0)
                })
              })
            })

            describe('findBestRouteQuote', () => {
              if (versionsV2) {
                describe('protocolV2', () => {
                  describe(tradeDirectionMap.input, () => {
                    it('should find best route', async () => {
                      const router = new Router({
                        ...routerCtx,
                        settings: {
                          ...settings,
                          protocolSettings: {
                            protocolV2: {
                              enabled: true,
                            },
                          },
                        },
                      })
                      const result = await router.findBestRouteQuote({
                        tokenAmount: DexNumber.fromUnshifted(
                          tradeAmount,
                          fromToken.decimals,
                        ),
                        tradeDirection: tradeDirectionMap.input,
                      })

                      validateBestRoute(result, fromToken, primaryToken)
                    })
                  })

                  describe(tradeDirectionMap.output, () => {
                    it('should find best route', async () => {
                      const router = new Router({
                        ...routerCtx,
                        settings: {
                          ...settings,
                          protocolSettings: {
                            protocolV2: {
                              enabled: true,
                            },
                          },
                        },
                      })

                      const result = await router.findBestRouteQuote({
                        tokenAmount: DexNumber.fromUnshifted(
                          tradeAmount,
                          primaryToken.decimals,
                        ),
                        tradeDirection: tradeDirectionMap.output,
                      })

                      validateBestRoute(result, fromToken, primaryToken)
                    })
                  })
                })
              }

              if (versionsV3) {
                describe('protocolV3', () => {
                  describe(tradeDirectionMap.input, () => {
                    it('should find best route', async () => {
                      const router = new Router({
                        ...routerCtx,
                        settings: {
                          ...settings,
                          protocolSettings: {
                            protocolV3: {
                              enabled: true,
                            },
                          },
                        },
                      })
                      const result = await router.findBestRouteQuote({
                        tokenAmount: DexNumber.fromUnshifted(
                          tradeAmount,
                          fromToken.decimals,
                        ),
                        tradeDirection: tradeDirectionMap.input,
                      })

                      validateBestRoute(result, fromToken, toToken)
                    })
                  })

                  describe(tradeDirectionMap.output, () => {
                    it('should find best route', async () => {
                      const router = new Router({
                        ...routerCtx,
                        settings: {
                          ...settings,
                          protocolSettings: {
                            protocolV3: {
                              enabled: true,
                            },
                          },
                        },
                      })
                      const result = await router.findBestRouteQuote({
                        tokenAmount: DexNumber.fromUnshifted(
                          tradeAmount,
                          toToken.decimals,
                        ),
                        tradeDirection: tradeDirectionMap.output,
                      })

                      validateBestRoute(result, fromToken, toToken)
                    })
                  })
                })
              }

              describe(tradeDirectionMap.input, () => {
                it('should return a valid best route', async () => {
                  const router = new Router(routerCtx)
                  const result = await router.findBestRouteQuote({
                    tokenAmount: DexNumber.fromUnshifted(
                      tradeAmount,
                      fromToken.decimals,
                    ),
                    tradeDirection: tradeDirectionMap.input,
                  })

                  validateBestRoute(result, fromToken, toToken)
                })
              })

              describe(tradeDirectionMap.output, () => {
                it('should return a valid best route', async () => {
                  const router = new Router(routerCtx)
                  const result = await router.findBestRouteQuote({
                    tokenAmount: DexNumber.fromUnshifted(
                      tradeAmount,
                      toToken.decimals,
                    ),
                    tradeDirection: tradeDirectionMap.output,
                  })

                  validateBestRoute(result, fromToken, toToken)
                })
              })
            })
          })
        })
      })
    })
  })
})
