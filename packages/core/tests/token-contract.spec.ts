import { DexNumber } from '@dex-toolkit/number'
import { DexProvider } from '@dex-toolkit/provider'
import {
  protocolMap,
  MAX_HEX_STRING,
  stripToken,
  getDexConfig,
  getChainConfig,
} from '@dex-toolkit/utils'
import { BigNumber } from 'ethers'
import { expect, describe, it, vi } from 'vitest'

import {
  activeTestCases,
  MockWalletAddress,
} from '../../../test/testing-setup/src/mocks/mocks'
import { TokenContract } from '../src/token-contract'

describe('TokenContract', () => {
  Object.entries(activeTestCases).forEach(([type, chainCases]) => {
    describe(type, () => {
      Object.values(chainCases).forEach((testCase) => {
        const { dexType, chainId, tokens, versions } = testCase ?? {}
        const { primaryToken, nativeCoin } = tokens

        const dexTag = dexType

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

        const tokenContractCoin = new TokenContract({
          dexProviderContext: dexProvider,
          dexContext,
          tokenContractAddress: nativeCoin.contractAddress,
        })

        describe(`${chainId}`, () => {
          describe('general token contract', () => {
            const tokenContractToken = new TokenContract({
              dexProviderContext: dexProvider,
              dexContext,
              tokenContractAddress: primaryToken.contractAddress,
            })

            describe('getToken', () => {
              describe('token', () => {
                it('should get token', async () => {
                  const result = await tokenContractToken.getToken()
                  expect(stripToken(result)).toEqual(stripToken(primaryToken))
                })
              })

              describe('coin', () => {
                it('should get coin', async () => {
                  const result = await tokenContractCoin.getToken()
                  expect(stripToken(result)).toEqual(stripToken(nativeCoin))
                })
              })
            })

            describe('totalSupply', () => {
              describe('token', () => {
                it('should get token totalSupply', async () => {
                  const result = await tokenContractToken.totalSupply()
                  expect(BigNumber.from(result).gt(0)).toBe(true)
                })
              })

              describe('coin', () => {
                it('should get coin totalSupply', async () => {
                  const result = await tokenContractCoin.totalSupply()
                  expect(BigNumber.from(result).gt(0)).toBe(true)
                })
              })

              describe('balanceOf', () => {
                describe('token', () => {
                  it('balanceOf', async () => {
                    const spy = vi
                      .spyOn(dexProvider, 'getCoinBalance')
                      .mockImplementation(() => Promise.resolve('100'))
                    const result = await tokenContractToken.balanceOf({
                      walletAddress: MockWalletAddress,
                      format: { type: 'readable' },
                    })

                    expect(result).toBeDefined()
                    expect(spy).not.toHaveBeenCalled()

                    spy.mockRestore()
                  })
                })

                describe('coin', () => {
                  it('balanceOf', async () => {
                    const spy = vi
                      .spyOn(dexProvider, 'getCoinBalance')
                      .mockImplementation(() => Promise.resolve('100'))
                    const result = await tokenContractCoin.balanceOf({
                      walletAddress: MockWalletAddress,
                      format: { type: 'readable' },
                    })

                    expect(result).toBeDefined()
                    expect(spy).toHaveBeenCalledTimes(1)

                    spy.mockRestore()
                  })
                })
              })
            })

            describe('getAllowancesAndBalanceOf', () => {
              describe('token', async () => {
                const { allowanceInfoByDex, balanceInfo } =
                  await tokenContractToken.getAllowancesAndBalanceOf({
                    walletAddress: MockWalletAddress,
                    format: { type: 'hex' },
                  })

                if (protocolV2) {
                  it('V2', async () => {
                    versionsV2.forEach(({ versionTag }) => {
                      const allowanceV2 =
                        allowanceInfoByDex[dexType]?.protocolV2?.[versionTag]
                          ?.allowance

                      expect(allowanceV2?.startsWith('0x')).toBe(true)
                      expect(balanceInfo.balance.startsWith('0x')).toBe(true)
                    })
                  })
                }

                if (protocolV3) {
                  it('V3', async () => {
                    versionsV3.forEach(({ versionTag }) => {
                      const allowanceV3 =
                        allowanceInfoByDex[dexType]?.protocolV3?.[versionTag]
                          ?.allowance

                      expect(allowanceV3?.startsWith('0x')).toBe(true)
                      expect(balanceInfo.balance.startsWith('0x')).toBe(true)
                    })
                  })
                }
              })

              describe('coin', async () => {
                const { allowanceInfoByDex, balanceInfo } =
                  await tokenContractCoin.getAllowancesAndBalanceOf({
                    walletAddress: MockWalletAddress,
                    format: { type: 'hex' },
                  })

                if (protocolV2) {
                  it('V2', async () => {
                    versionsV2.forEach(({ versionTag }) => {
                      const allowanceV2 =
                        allowanceInfoByDex[dexType]?.protocolV2?.[versionTag]
                          ?.allowance

                      expect(BigNumber.from(allowanceV2).gt(0)).toBe(true)
                      expect(allowanceV2).toEqual(MAX_HEX_STRING)

                      expect(balanceInfo.balance.startsWith('0x')).toBe(true)
                    })
                  })
                }

                if (protocolV3) {
                  it('V3', async () => {
                    versionsV3.forEach(({ versionTag }) => {
                      const allowanceV3 =
                        allowanceInfoByDex[dexType]?.protocolV3?.[versionTag]
                          ?.allowance

                      expect(BigNumber.from(allowanceV3).gt(0)).toBe(true)
                      expect(allowanceV3).toEqual(MAX_HEX_STRING)

                      expect(balanceInfo.balance.startsWith('0x')).toBe(true)
                    })
                  })
                }
              })
            })
          })

          describe('versioned token contract', () => {
            describe('allowance', () => {
              describe('token', () => {
                if (protocolV2) {
                  versionsV2.forEach(({ versionTag, tokenOverrides }) => {
                    const token = tokenOverrides?.primaryToken ?? primaryToken

                    const tokenContractToken = new TokenContract({
                      dexProviderContext: dexProvider,
                      dexContext,
                      tokenContractAddress: token.contractAddress,
                    })

                    describe(`version ${versionTag}`, () => {
                      describe('protocolV2', () => {
                        it('should get token allowance', async () => {
                          const result =
                            await tokenContractToken.allowanceForRouter({
                              dexTag,
                              protocol: protocolMap.protocolV2,
                              versionTag,
                              walletAddress: MockWalletAddress,
                              format: { type: 'readable' },
                            })
                          expect(result).toBeDefined()
                        })
                      })
                    })
                  })
                }

                if (protocolV3) {
                  versionsV3.forEach(({ versionTag, tokenOverrides }) => {
                    const token = tokenOverrides?.primaryToken ?? primaryToken

                    const tokenContractToken = new TokenContract({
                      dexProviderContext: dexProvider,
                      dexContext,
                      tokenContractAddress: token.contractAddress,
                    })

                    describe(`version ${versionTag}`, () => {
                      describe('protocolV3', () => {
                        it('should get token allowance', async () => {
                          const result =
                            await tokenContractToken.allowanceForRouter({
                              dexTag,
                              protocol: protocolMap.protocolV3,
                              versionTag,
                              walletAddress: MockWalletAddress,
                              format: { type: 'readable' },
                            })
                          expect(result).toBeDefined()
                        })
                      })
                    })
                  })
                }
              })

              describe('coin', () => {
                if (protocolV2) {
                  versionsV2.forEach(({ versionTag }) => {
                    describe(`version ${versionTag}`, () => {
                      describe('protocolV2', () => {
                        it('should get coin allowance', async () => {
                          const result =
                            await tokenContractCoin.allowanceForRouter({
                              dexTag,
                              protocol: protocolMap.protocolV2,
                              versionTag,
                              walletAddress: MockWalletAddress,
                              format: { type: 'hex' },
                            })
                          expect(result).toEqual(MAX_HEX_STRING)
                        })
                      })
                    })
                  })
                }

                if (protocolV3) {
                  versionsV3.forEach(({ versionTag }) => {
                    describe(`version ${versionTag}`, () => {
                      describe('protocolV3', () => {
                        it('should get coin allowance', async () => {
                          const result =
                            await tokenContractCoin.allowanceForRouter({
                              dexTag,
                              protocol: protocolMap.protocolV3,
                              versionTag,
                              walletAddress: MockWalletAddress,
                              format: { type: 'hex' },
                            })
                          expect(result).toEqual(MAX_HEX_STRING)
                        })
                      })
                    })
                  })
                }
              })
            })

            describe('encodeApproveAllowanceData', () => {
              describe('token', () => {
                if (protocolV2) {
                  versionsV2.forEach(({ versionTag, tokenOverrides }) => {
                    const token = tokenOverrides?.primaryToken ?? primaryToken

                    const tokenContractToken = new TokenContract({
                      dexProviderContext: dexProvider,
                      dexContext,
                      tokenContractAddress: token.contractAddress,
                    })

                    describe(`version ${versionTag}`, () => {
                      describe('protocolV2', () => {
                        it('should encode the approve allowance data', () => {
                          const result =
                            tokenContractToken.encodeApproveAllowanceData({
                              spender: protocolV2[versionTag]!.router.address,
                              amount: DexNumber.fromShifted(
                                '0x05',
                                primaryToken.decimals,
                              ),
                            })
                          expect(typeof result).toBe('string')
                          expect(result.startsWith('0x')).toBe(true)
                          expect(result.length).toBe(138)
                        })
                      })
                    })
                  })
                }

                if (protocolV3) {
                  versionsV3.forEach(({ versionTag, tokenOverrides }) => {
                    const token = tokenOverrides?.primaryToken ?? primaryToken

                    const tokenContractToken = new TokenContract({
                      dexProviderContext: dexProvider,
                      dexContext,
                      tokenContractAddress: token.contractAddress,
                    })

                    describe(`version ${versionTag}`, () => {
                      describe('protocolV3', () => {
                        it('should encode the approve allowance data', () => {
                          const result =
                            tokenContractToken.encodeApproveAllowanceData({
                              spender: protocolV3[versionTag]!.router.address,
                              amount: DexNumber.fromShifted(
                                '0x05',
                                primaryToken.decimals,
                              ),
                            })
                          expect(typeof result).toBe('string')
                          expect(result.startsWith('0x')).toBe(true)
                          expect(result.length).toBe(138)
                        })
                      })
                    })
                  })
                }
              })

              describe('coin', () => {
                if (protocolV2) {
                  versionsV2.forEach(({ versionTag }) => {
                    describe(`version ${versionTag}`, () => {
                      describe('protocolV2', () => {
                        it('should encode the approve allowance data', () => {
                          expect(() => {
                            tokenContractCoin.encodeApproveAllowanceData({
                              spender: protocolV2[versionTag]!.router.address,
                              amount: DexNumber.fromShifted(
                                '0x05',
                                nativeCoin.decimals,
                              ),
                            })
                          }).toThrowError(
                            'Coin does not need any allowance data',
                          )
                        })
                      })
                    })
                  })
                }

                if (protocolV3) {
                  versionsV3.forEach(({ versionTag }) => {
                    describe(`version ${versionTag}`, () => {
                      describe('protocolV3', () => {
                        it('should encode the approve allowance data', () => {
                          expect(() => {
                            tokenContractCoin.encodeApproveAllowanceData({
                              spender: protocolV3[versionTag]!.router.address,
                              amount: DexNumber.fromShifted(
                                '0x05',
                                nativeCoin.decimals,
                              ),
                            })
                          }).toThrowError(
                            'Coin does not need any allowance data',
                          )
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
  })
})
