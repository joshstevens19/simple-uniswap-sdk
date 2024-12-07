import { DexNumber } from '@dex-toolkit/number'
import { DexProvider } from '@dex-toolkit/provider'
import type { LiquiditySettings } from '@dex-toolkit/types'
import {
  protocolMap,
  DexError,
  getChainConfig,
  getDexConfig,
} from '@dex-toolkit/utils'
import { expect, describe, it, beforeEach } from 'vitest'

import {
  activeTestCases,
  MockWalletAddress,
} from '../../../test/testing-setup/src/mocks/mocks'
import { Liquidity } from '../src/liquidity/liquidity'

describe('Liquidity', () => {
  Object.entries(activeTestCases).forEach(([type, chainCases]) => {
    describe(type, () => {
      Object.values(chainCases).forEach((testCase) => {
        const { dexType, chainId, versions, tokens } = testCase

        const { primaryToken, stableToken, nativeCoin } = tokens

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

        let liquidity: Liquidity<'readable'>

        const settings: Partial<LiquiditySettings> = {
          slippage: 0.01,
          deadlineMinutes: 20,
          recipient: MockWalletAddress,
          disableMultihops: false,
          disableObserver: false,
        }

        describe('Constructor', () => {
          const tokenA = primaryToken
          const tokenB = nativeCoin

          beforeEach(() => {
            liquidity = new Liquidity({
              tokenA,
              tokenB,
              walletAddress,
              dexProvider,
              dexContext,
              settings,
              format: { type: 'readable' },
            })
          })

          it('should initialize liquidity factory correctly', () => {
            expect(liquidity.tokenA).toEqual(tokenA)
            expect(liquidity.tokenB).toEqual(tokenB)
            expect(liquidity.dexProvider).toEqual(dexProvider)
          })

          it('should throw an error if tokenA or tokenB is missing', () => {
            expect(
              () =>
                new Liquidity({
                  tokenA: undefined as any,
                  tokenB,
                  walletAddress,
                  dexProvider,
                  dexContext,
                  settings,
                }),
            ).toThrow(DexError)
          })

          it('should throw an error if walletAddress is invalid', () => {
            expect(
              () =>
                new Liquidity({
                  tokenA,
                  tokenB,
                  walletAddress: 'invalid',
                  dexProvider,
                  dexContext,
                  settings,
                }),
            ).toThrow(DexError)
          })
        })

        describe('Add Liquidity', () => {
          describe('Token/Token Liquidity', () => {
            if (protocolV2) {
              describe('protocolV2', () => {
                versionsV2.forEach(
                  ({ versionTag, version, tokenOverrides }) => {
                    const tokenA = tokenOverrides?.primaryToken ?? primaryToken
                    const tokenB = tokenOverrides?.stableToken ?? stableToken

                    beforeEach(() => {
                      liquidity = new Liquidity({
                        tokenA,
                        tokenB,
                        walletAddress,
                        dexProvider,
                        dexContext,
                        settings,
                      })
                    })

                    describe(`version ${versionTag}`, () => {
                      it('should add liquidity for v2 (Token/Token)', async () => {
                        const quote = await liquidity.addLiquidity({
                          tokenAAmount: '100',
                          protocol: 'protocolV2',
                          dexTag,
                          version,
                        })

                        expect(quote.protocol).toEqual(protocolMap.protocolV2)
                      })

                      it('should throw an error when invalid token amounts are provided', async () => {
                        await expect(
                          liquidity.addLiquidity({
                            protocol: 'protocolV2',
                            dexTag,
                            version,
                            tokenAAmount: '-100',
                          }),
                        ).rejects.toThrow(DexError)
                      })

                      it('should throw an error when invalid dex version is provided', async () => {
                        await expect(
                          liquidity.addLiquidity({
                            protocol: 'invalid' as any,
                            dexTag,
                            version,
                            tokenAAmount: '100',
                          }),
                        ).rejects.toThrowError(DexError)
                      })

                      describe('Allowance and Balance', () => {
                        it('should retrieve token A balance', async () => {
                          const balance = await liquidity.getTokenABalanceOf()
                          expect(balance).toBeDefined()
                        })

                        it('should retrieve token B balance', async () => {
                          const balance = await liquidity.getTokenBBalanceOf()
                          expect(balance).toBeDefined()
                        })

                        it('should generate a min allowance transaction for token A', async () => {
                          const transaction =
                            await liquidity.generateApproveRouterAllowanceTransaction(
                              {
                                token: 'A',
                                protocol: 'protocolV2',
                                dexTag,
                                version,
                                amount: '0.2',
                              },
                            )

                          expect(transaction).toBeDefined()
                          expect(transaction).toHaveProperty(
                            'to',
                            expect.any(String),
                          )
                          expect(transaction).toHaveProperty(
                            'from',
                            walletAddress,
                          )
                          expect(transaction).toHaveProperty(
                            'data',
                            expect.any(String),
                          )
                          expect(transaction).toHaveProperty(
                            'value',
                            expect.any(String),
                          )

                          const amountHex = '0x' + transaction?.data.slice(-64)
                          expect(
                            DexNumber.fromShifted(
                              amountHex,
                              tokenA.decimals,
                            ).toReadableString(),
                          ).toEqual('0.200000000000000000')
                        })

                        it('should generate a max allowance transaction for token A', async () => {
                          const transaction =
                            await liquidity.generateApproveRouterAllowanceTransaction(
                              {
                                token: 'A',
                                protocol: 'protocolV2',
                                dexTag,
                                version,
                              },
                            )

                          expect(transaction).toBeDefined()
                          expect(transaction).toHaveProperty(
                            'to',
                            expect.any(String),
                          )
                          expect(transaction).toHaveProperty(
                            'from',
                            walletAddress,
                          )
                          expect(transaction).toHaveProperty(
                            'data',
                            expect.any(String),
                          )
                          expect(transaction).toHaveProperty(
                            'value',
                            expect.any(String),
                          )
                        })

                        it('should generate a min allowance transaction for token B', async () => {
                          const transaction =
                            await liquidity.generateApproveRouterAllowanceTransaction(
                              {
                                token: 'B',
                                protocol: 'protocolV2',
                                dexTag,
                                version,
                                amount: '0.2',
                              },
                            )

                          expect(transaction).toBeDefined()
                          expect(transaction).toHaveProperty(
                            'to',
                            expect.any(String),
                          )
                          expect(transaction).toHaveProperty(
                            'from',
                            walletAddress,
                          )
                          expect(transaction).toHaveProperty(
                            'data',
                            expect.any(String),
                          )
                          expect(transaction).toHaveProperty(
                            'value',
                            expect.any(String),
                          )

                          const amountHex = '0x' + transaction?.data.slice(-64)
                          expect(
                            DexNumber.fromShifted(
                              amountHex,
                              tokenA.decimals,
                            ).toReadableString(),
                          ).toEqual('0.200000000000000000')
                        })

                        it('should generate a max allowance transaction for token B', async () => {
                          const transaction =
                            await liquidity.generateApproveRouterAllowanceTransaction(
                              {
                                token: 'B',
                                protocol: 'protocolV2',
                                dexTag,
                                version,
                              },
                            )

                          expect(transaction).toBeDefined()
                          expect(transaction).toHaveProperty(
                            'to',
                            expect.any(String),
                          )
                          expect(transaction).toHaveProperty(
                            'from',
                            walletAddress,
                          )
                          expect(transaction).toHaveProperty(
                            'data',
                            expect.any(String),
                          )
                          expect(transaction).toHaveProperty(
                            'value',
                            expect.any(String),
                          )
                        })
                      })
                    })
                  },
                )
              })
            }

            if (protocolV3) {
              versionsV3.forEach(({ versionTag, version, tokenOverrides }) => {
                const tokenA = tokenOverrides?.primaryToken ?? primaryToken
                const tokenB = tokenOverrides?.stableToken ?? stableToken

                beforeEach(() => {
                  liquidity = new Liquidity({
                    tokenA,
                    tokenB,
                    walletAddress,
                    dexProvider,
                    dexContext,
                    settings,
                  })
                })

                describe(`version ${versionTag}`, () => {
                  describe('protocolV3', () => {
                    it('should add liquidity for v3 (Token/Token)', async () => {
                      const quote = await liquidity.addLiquidity({
                        protocol: 'protocolV3',
                        dexTag,
                        version,
                        tokenAAmount: '100',
                        feeTier: 500,
                        priceRange: {
                          tickLower: 0,
                          tickUpper: 10,
                        },
                      })

                      expect(quote.protocol).toEqual(protocolMap.protocolV3)
                    })

                    it('should throw an error when invalid token amounts are provided', async () => {
                      await expect(
                        liquidity.addLiquidity({
                          protocol: 'protocolV3',
                          dexTag,
                          version,
                          tokenAAmount: '-100',
                          feeTier: 500,
                          priceRange: {
                            tickLower: 0,
                            tickUpper: 10,
                          },
                        }),
                      ).rejects.toThrow(DexError)
                    })

                    it('should throw an error when invalid dex version is provided', async () => {
                      await expect(
                        liquidity.addLiquidity({
                          protocol: 'invalid' as any,
                          dexTag,
                          version,
                          tokenAAmount: '100',
                        }),
                      ).rejects.toThrowError(DexError)
                    })

                    describe('Allowance and Balance', () => {
                      it('should retrieve token A balance', async () => {
                        const balance = await liquidity.getTokenABalanceOf()
                        expect(balance).toBeDefined()
                      })

                      it('should retrieve token B balance', async () => {
                        const balance = await liquidity.getTokenBBalanceOf()
                        expect(balance).toBeDefined()
                      })

                      it('should generate a min allowance transaction for token A', async () => {
                        const transaction =
                          await liquidity.generateApproveRouterAllowanceTransaction(
                            {
                              token: 'A',
                              protocol: 'protocolV2',
                              dexTag,
                              version,
                              amount: '0.2',
                            },
                          )

                        expect(transaction).toBeDefined()
                        expect(transaction).toHaveProperty(
                          'to',
                          expect.any(String),
                        )
                        expect(transaction).toHaveProperty(
                          'from',
                          walletAddress,
                        )
                        expect(transaction).toHaveProperty(
                          'data',
                          expect.any(String),
                        )
                        expect(transaction).toHaveProperty(
                          'value',
                          expect.any(String),
                        )

                        const amountHex = '0x' + transaction?.data.slice(-64)
                        expect(
                          DexNumber.fromShifted(
                            amountHex,
                            tokenA.decimals,
                          ).toReadableString(),
                        ).toEqual('0.200000000000000000')
                      })

                      it('should generate a max allowance transaction for token A', async () => {
                        const transaction =
                          await liquidity.generateApproveRouterAllowanceTransaction(
                            {
                              token: 'A',
                              protocol: 'protocolV3',
                              dexTag,
                              version,
                            },
                          )
                        expect(transaction).toBeDefined()
                        expect(transaction).toHaveProperty(
                          'to',
                          expect.any(String),
                        )
                        expect(transaction).toHaveProperty(
                          'from',
                          walletAddress,
                        )
                        expect(transaction).toHaveProperty(
                          'data',
                          expect.any(String),
                        )
                        expect(transaction).toHaveProperty(
                          'value',
                          expect.any(String),
                        )
                      })

                      it('should generate a min allowance transaction for token B', async () => {
                        const transaction =
                          await liquidity.generateApproveRouterAllowanceTransaction(
                            {
                              token: 'B',
                              protocol: 'protocolV2',
                              dexTag,
                              version,
                              amount: '0.2',
                            },
                          )

                        expect(transaction).toBeDefined()
                        expect(transaction).toHaveProperty(
                          'to',
                          expect.any(String),
                        )
                        expect(transaction).toHaveProperty(
                          'from',
                          walletAddress,
                        )
                        expect(transaction).toHaveProperty(
                          'data',
                          expect.any(String),
                        )
                        expect(transaction).toHaveProperty(
                          'value',
                          expect.any(String),
                        )

                        const amountHex = '0x' + transaction?.data.slice(-64)
                        expect(
                          DexNumber.fromShifted(
                            amountHex,
                            tokenA.decimals,
                          ).toReadableString(),
                        ).toEqual('0.200000000000000000')
                      })

                      it('should generate a max allowance transaction for token B', async () => {
                        const transaction =
                          await liquidity.generateApproveRouterAllowanceTransaction(
                            {
                              token: 'B',
                              protocol: 'protocolV3',
                              dexTag,
                              version,
                            },
                          )
                        expect(transaction).toBeDefined()
                        expect(transaction).toHaveProperty(
                          'to',
                          expect.any(String),
                        )
                        expect(transaction).toHaveProperty(
                          'from',
                          walletAddress,
                        )
                        expect(transaction).toHaveProperty(
                          'data',
                          expect.any(String),
                        )
                        expect(transaction).toHaveProperty(
                          'value',
                          expect.any(String),
                        )
                      })
                    })
                  })
                })
              })
            }
          })

          describe('Coin/Token Liquidity', () => {
            if (protocolV2) {
              describe('protocolV2', () => {
                versionsV2.forEach(
                  ({ versionTag, version, tokenOverrides }) => {
                    const tokenA = nativeCoin
                    const tokenB = tokenOverrides?.stableToken ?? stableToken

                    beforeEach(() => {
                      liquidity = new Liquidity({
                        tokenA,
                        tokenB,
                        walletAddress,
                        dexProvider,
                        dexContext,
                        settings,
                      })
                    })

                    describe(`version ${versionTag}`, () => {
                      it('should add liquidity for v2 (Coin/Token)', async () => {
                        const quote = await liquidity.addLiquidity({
                          tokenAAmount: '1',
                          protocol: 'protocolV2',
                          dexTag,
                          version,
                        })

                        expect(quote.protocol).toEqual(protocolMap.protocolV2)
                      })

                      it('should throw an error when invalid token amounts are provided', async () => {
                        await expect(
                          liquidity.addLiquidity({
                            tokenAAmount: '-100',
                            protocol: 'protocolV2',
                            dexTag,
                            version,
                          }),
                        ).rejects.toThrow(DexError)
                      })

                      it('should throw an error when invalid dex version is provided', async () => {
                        await expect(
                          liquidity.addLiquidity({
                            protocol: 'invalid' as any,
                            dexTag,
                            version,
                            tokenAAmount: '100',
                          }),
                        ).rejects.toThrowError(DexError)
                      })

                      describe('Allowance and Balance', () => {
                        it('should retrieve token A balance', async () => {
                          const balance = await liquidity.getTokenABalanceOf()
                          expect(balance).toBeDefined()
                        })

                        it('should retrieve token B balance', async () => {
                          const balance = await liquidity.getTokenBBalanceOf()
                          expect(balance).toBeDefined()
                        })

                        it('should return undefined for max allowance transaction for token A (Coin)', async () => {
                          const transaction =
                            await liquidity.generateApproveRouterAllowanceTransaction(
                              {
                                token: 'A',
                                protocol: 'protocolV2',
                                dexTag,
                                version,
                              },
                            )
                          expect(transaction).toBeUndefined()
                        })

                        it('should generate a max allowance transaction for token B (Token)', async () => {
                          const transaction =
                            await liquidity.generateApproveRouterAllowanceTransaction(
                              {
                                token: 'B',
                                protocol: 'protocolV2',
                                dexTag,
                                version,
                              },
                            )
                          expect(transaction).toBeDefined()
                          expect(transaction).toHaveProperty(
                            'to',
                            expect.any(String),
                          )
                          expect(transaction).toHaveProperty(
                            'from',
                            walletAddress,
                          )
                          expect(transaction).toHaveProperty(
                            'data',
                            expect.any(String),
                          )
                          expect(transaction).toHaveProperty(
                            'value',
                            expect.any(String),
                          )
                        })
                      })
                    })
                  },
                )
              })
            }

            if (protocolV3) {
              describe('protocolV3', () => {
                versionsV3.forEach(({ versionTag, version }) => {
                  describe(`version ${versionTag}`, () => {
                    it('should add liquidity for v3 (Coin/Token)', async () => {
                      const quote = await liquidity.addLiquidity({
                        protocol: 'protocolV3',
                        dexTag,
                        version,
                        tokenAAmount: '1',
                        feeTier: 500,
                        priceRange: {
                          tickLower: 0,
                          tickUpper: 10,
                        },
                      })

                      expect(quote.protocol).toEqual(protocolMap.protocolV3)
                    })

                    it('should throw an error when invalid token amounts are provided', async () => {
                      await expect(
                        liquidity.addLiquidity({
                          protocol: 'protocolV3',
                          dexTag,
                          version,
                          tokenAAmount: '-100',
                          feeTier: 500,
                          priceRange: {
                            tickLower: 0,
                            tickUpper: 10,
                          },
                        }),
                      ).rejects.toThrow(DexError)
                    })

                    it('should throw an error when invalid dex version is provided', async () => {
                      await expect(
                        liquidity.addLiquidity({
                          protocol: 'invalid' as any,
                          dexTag,
                          version,
                          tokenAAmount: '100',
                          feeTier: 500,
                          priceRange: {
                            tickLower: 0,
                            tickUpper: 10,
                          },
                        }),
                      ).rejects.toThrowError(DexError)
                    })

                    describe('Allowance and Balance', () => {
                      it('should retrieve token A balance', async () => {
                        const balance = await liquidity.getTokenABalanceOf()
                        expect(balance).toBeDefined()
                      })

                      it('should retrieve token B balance', async () => {
                        const balance = await liquidity.getTokenBBalanceOf()
                        expect(balance).toBeDefined()
                      })

                      it('should return undefined for max allowance transaction for token A (Coin)', async () => {
                        const transaction =
                          await liquidity.generateApproveRouterAllowanceTransaction(
                            {
                              token: 'A',
                              dexTag,
                              protocol: 'protocolV3',
                              version,
                            },
                          )
                        expect(transaction).toBeUndefined()
                      })

                      it('should generate a max allowance transaction for token B', async () => {
                        const transaction =
                          await liquidity.generateApproveRouterAllowanceTransaction(
                            {
                              token: 'B',
                              dexTag,
                              protocol: 'protocolV3',
                              version,
                            },
                          )
                        expect(transaction).toBeDefined()
                        expect(transaction).toHaveProperty(
                          'to',
                          expect.any(String),
                        )
                        expect(transaction).toHaveProperty(
                          'from',
                          walletAddress,
                        )
                        expect(transaction).toHaveProperty(
                          'data',
                          expect.any(String),
                        )
                        expect(transaction).toHaveProperty(
                          'value',
                          expect.any(String),
                        )
                      })
                    })
                  })
                })
              })
            }
          })
        })

        describe('Remove Liquidity', () => {
          describe('Token/Token Liquidity', () => {
            if (protocolV2) {
              versionsV2.forEach(({ versionTag, version, tokenOverrides }) => {
                const tokenA = tokenOverrides?.primaryToken ?? primaryToken
                const tokenB = tokenOverrides?.stableToken ?? stableToken

                beforeEach(() => {
                  liquidity = new Liquidity({
                    tokenA,
                    tokenB,
                    walletAddress,
                    dexProvider,
                    dexContext,
                    settings,
                  })
                })

                describe(`version ${versionTag}`, () => {
                  describe('protocolV2', () => {
                    it('should remove liquidity for v2 (Token/Token)', async () => {
                      const quote = await liquidity.removeLiquidity({
                        dexTag,
                        protocol: 'protocolV2',
                        version,
                        lpTokenAmount: '0.1',
                        minTokenAAmount: '1',
                        minTokenBAmount: '5',
                        supportFeeOnTransferTokens: false,
                      })

                      const transaction = quote.transaction

                      expect(quote.protocol).toEqual(protocolMap.protocolV2)
                      expect(transaction).toHaveProperty(
                        'to',
                        expect.any(String),
                      )
                      expect(transaction).toHaveProperty(
                        'data',
                        expect.any(String),
                      )
                    })

                    it('should remove liquidity for v2 (Token/Token) with permit', async () => {
                      const quote = await liquidity.removeLiquidity({
                        dexTag,
                        protocol: 'protocolV2',
                        version,
                        lpTokenAmount: '0.1',
                        minTokenAAmount: '1',
                        minTokenBAmount: '5',
                        permit: {
                          approveMax: false,
                          permitData: {
                            v: 27, // v is typically 27 or 28
                            r: '0x0da3efbf28a589c2a0e4cf7b4f6bf8d1fb6d0b803ecf9f69f5724d8588f7b5e6',
                            s: '0x30f69d4a4e7f4e5b0a274147ca71c9b4bb212b2e11d2aefae8cfd3e64c2b2b9c',
                          },
                        },
                        supportFeeOnTransferTokens: false,
                      })

                      const transaction = quote.transaction

                      expect(quote.protocol).toEqual(protocolMap.protocolV2)
                      expect(transaction).toHaveProperty(
                        'to',
                        expect.any(String),
                      )
                      expect(transaction).toHaveProperty(
                        'data',
                        expect.any(String),
                      )
                    })

                    it('should throw an error when invalid token amounts are provided', async () => {
                      await expect(
                        liquidity.addLiquidity({
                          dexTag,
                          protocol: 'protocolV2',
                          version,
                          tokenAAmount: '-100',
                        }),
                      ).rejects.toThrow(DexError)
                    })

                    it('should throw an error when invalid dex version is provided', async () => {
                      await expect(
                        liquidity.addLiquidity({
                          dexTag,
                          protocol: 'invalid' as any,
                          version,
                          tokenAAmount: '100',
                        }),
                      ).rejects.toThrowError(DexError)
                    })

                    describe('Allowance and Balance', () => {
                      it('should retrieve token A balance', async () => {
                        const balance = await liquidity.getTokenABalanceOf()
                        expect(balance).toBeDefined()
                      })

                      it('should retrieve token B balance', async () => {
                        const balance = await liquidity.getTokenBBalanceOf()
                        expect(balance).toBeDefined()
                      })

                      it('should generate a max allowance transaction for token LP', async () => {
                        const transaction =
                          await liquidity.protocolV2?.generateLPTokenRouterAllowanceTransaction(
                            {
                              dexTag,
                              versionTag,
                            },
                          )
                        expect(transaction).toBeDefined()
                        expect(transaction).toHaveProperty(
                          'to',
                          expect.any(String),
                        )
                        expect(transaction).toHaveProperty(
                          'from',
                          walletAddress,
                        )
                        expect(transaction).toHaveProperty(
                          'data',
                          expect.any(String),
                        )
                        expect(transaction).toHaveProperty(
                          'value',
                          expect.any(String),
                        )
                      })
                    })
                  })
                })
              })
            }

            if (protocolV3) {
              versionsV3.forEach(({ versionTag, version }) => {
                describe(`version ${versionTag}`, () => {
                  describe('protocolV3', () => {
                    it('should remove liquidity for v3 (Token/Token)', async () => {
                      const quote = await liquidity.removeLiquidity({
                        dexTag,
                        protocol: 'protocolV3',
                        version,
                        lpTokenId: '123456789',
                        liquidityAmount: '0.1',
                        minTokenAAmount: '1',
                        minTokenBAmount: '5',
                      })

                      expect(quote.protocol).toEqual(protocolMap.protocolV3)
                    })

                    it('should throw an error when invalid token amounts are provided', async () => {
                      await expect(
                        liquidity.addLiquidity({
                          protocol: 'protocolV3',
                          dexTag,
                          version,
                          tokenAAmount: '-100',
                          feeTier: 500,
                          priceRange: {
                            tickLower: 0,
                            tickUpper: 10,
                          },
                        }),
                      ).rejects.toThrow(DexError)
                    })

                    it('should throw an error when invalid dex version is provided', async () => {
                      await expect(
                        liquidity.addLiquidity({
                          dexTag,
                          protocol: 'invalid' as any,
                          version,
                          tokenAAmount: '100',
                        }),
                      ).rejects.toThrowError(DexError)
                    })

                    describe('Allowance and Balance', () => {
                      it('should retrieve token A balance', async () => {
                        const balance = await liquidity.getTokenABalanceOf()
                        expect(balance).toBeDefined()
                      })

                      it('should retrieve token B balance', async () => {
                        const balance = await liquidity.getTokenBBalanceOf()
                        expect(balance).toBeDefined()
                      })
                    })
                  })
                })
              })
            }
          })

          describe('Coin/Token Liquidity', () => {
            if (protocolV2) {
              describe('protocolV2', () => {
                versionsV2.forEach(
                  ({ versionTag, version, tokenOverrides }) => {
                    const tokenA = nativeCoin
                    const tokenB = tokenOverrides?.stableToken ?? stableToken

                    beforeEach(() => {
                      liquidity = new Liquidity({
                        tokenA,
                        tokenB,
                        walletAddress,
                        dexProvider,
                        dexContext,
                        settings,
                      })
                    })

                    describe(`version ${versionTag}`, () => {
                      it('should remove liquidity for v2 (Coin/Token)', async () => {
                        const quote = await liquidity.removeLiquidity({
                          dexTag,
                          protocol: 'protocolV2',
                          version,
                          lpTokenAmount: '0.1',
                          minTokenAAmount: '1',
                          minTokenBAmount: '5',
                          supportFeeOnTransferTokens: false,
                        })

                        const transaction = quote.transaction

                        expect(quote.protocol).toEqual(protocolMap.protocolV2)
                        expect(transaction).toHaveProperty(
                          'to',
                          expect.any(String),
                        )
                        expect(transaction).toHaveProperty(
                          'data',
                          expect.any(String),
                        )
                      })

                      it('should remove liquidity for v2 (Coin/Token) with permit', async () => {
                        const quote = await liquidity.removeLiquidity({
                          dexTag,
                          protocol: 'protocolV2',
                          version,
                          lpTokenAmount: '0.1',
                          minTokenAAmount: '1',
                          minTokenBAmount: '5',
                          permit: {
                            approveMax: false,
                            permitData: {
                              v: 27, // v is typically 27 or 28
                              r: '0x0da3efbf28a589c2a0e4cf7b4f6bf8d1fb6d0b803ecf9f69f5724d8588f7b5e6',
                              s: '0x30f69d4a4e7f4e5b0a274147ca71c9b4bb212b2e11d2aefae8cfd3e64c2b2b9c',
                            },
                          },
                          supportFeeOnTransferTokens: false,
                        })

                        const transaction = quote.transaction

                        expect(quote.protocol).toEqual(protocolMap.protocolV2)
                        expect(transaction).toHaveProperty(
                          'to',
                          expect.any(String),
                        )
                        expect(transaction).toHaveProperty(
                          'data',
                          expect.any(String),
                        )
                      })

                      it('should throw an error when invalid token amounts are provided', async () => {
                        await expect(
                          liquidity.addLiquidity({
                            dexTag,
                            protocol: 'protocolV2',
                            version,
                            tokenAAmount: '-100',
                          }),
                        ).rejects.toThrow(DexError)
                      })

                      it('should throw an error when invalid dex version is provided', async () => {
                        await expect(
                          liquidity.addLiquidity({
                            dexTag,
                            protocol: 'invalid' as any,
                            version,
                            tokenAAmount: '100',
                          }),
                        ).rejects.toThrowError(DexError)
                      })

                      it('should throw an error if lpTokenAmount is missing', async () => {
                        await expect(
                          liquidity.removeLiquidity({
                            dexTag,
                            protocol: 'protocolV2',
                            version,
                            lpTokenAmount: '',
                            minTokenAAmount: '1',
                            minTokenBAmount: '5',
                          }),
                        ).rejects.toThrowError(DexError)
                      })

                      describe('Allowance and Balance', () => {
                        it('should retrieve token A balance', async () => {
                          const balance = await liquidity.getTokenABalanceOf()
                          expect(balance).toBeDefined()
                        })

                        it('should retrieve token B balance', async () => {
                          const balance = await liquidity.getTokenBBalanceOf()
                          expect(balance).toBeDefined()
                        })

                        it('should generate a max router allowance transaction for token LP', async () => {
                          const transaction =
                            await liquidity.protocolV2?.generateLPTokenRouterAllowanceTransaction(
                              {
                                dexTag,
                                versionTag,
                              },
                            )
                          expect(transaction).toBeDefined()
                          expect(transaction).toHaveProperty(
                            'to',
                            expect.any(String),
                          )
                          expect(transaction).toHaveProperty(
                            'from',
                            walletAddress,
                          )
                          expect(transaction).toHaveProperty(
                            'data',
                            expect.any(String),
                          )
                          expect(transaction).toHaveProperty(
                            'value',
                            expect.any(String),
                          )
                        })
                      })
                    })
                  },
                )
              })
            }

            if (protocolV3) {
              describe('protocolV3', () => {
                versionsV2.forEach(({ versionTag, version }) => {
                  describe(`version ${versionTag}`, () => {
                    it('should remove liquidity for v3 (Coin/Token)', async () => {
                      const quote = await liquidity.removeLiquidity({
                        dexTag,
                        protocol: 'protocolV3',
                        version,
                        lpTokenId: '123456789',
                        liquidityAmount: '0.1',
                        minTokenAAmount: '1',
                        minTokenBAmount: '5',
                      })

                      expect(quote.protocol).toEqual(protocolMap.protocolV3)
                    })

                    it('should throw an error when invalid token amounts are provided', async () => {
                      await expect(
                        liquidity.addLiquidity({
                          dexTag,
                          protocol: 'protocolV3',
                          version,
                          tokenAAmount: '-100',
                          feeTier: 500,
                          priceRange: {
                            tickLower: 0,
                            tickUpper: 10,
                          },
                        }),
                      ).rejects.toThrow(DexError)
                    })

                    it('should throw an error when invalid dex version is provided', async () => {
                      await expect(
                        liquidity.addLiquidity({
                          dexTag,
                          protocol: 'invalid' as any,
                          version,
                          tokenAAmount: '100',
                        }),
                      ).rejects.toThrowError(DexError)
                    })

                    describe('Allowance and Balance', () => {
                      it('should retrieve token A balance', async () => {
                        const balance = await liquidity.getTokenABalanceOf()
                        expect(balance).toBeDefined()
                      })

                      it('should retrieve token B balance', async () => {
                        const balance = await liquidity.getTokenBBalanceOf()
                        expect(balance).toBeDefined()
                      })
                    })
                  })
                })
              })
            }
          })
        })
      })
    })
  })
})
