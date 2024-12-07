import { DexNumber } from '@dex-toolkit/number'
import type { Erc20Types } from '@dex-toolkit/types'
import type { ContractResults } from '@ethereum-multicall/types'
import { BigNumber as EthersBigNumber } from 'ethers'
import { parseUnits } from 'ethers/lib/utils'
import { describe, it, expect } from 'vitest'

import {
  MockDexProvider,
  MockCoin,
  MockWrapped,
  MockDexConfigsByDex,
  MockWalletAddress,
  MockDexType,
  MockDexVersionTagV2,
  MockDexVersionTagV3,
} from '../../../../test/testing-setup/src/mocks/mocks'
import { createMulticallReference } from '../../src/multicall/multicall-utils'
import {
  getCoinBalanceInfo,
  prepareAllowanceAndBalanceOfCallContext,
  processAllowanceAndBalanceOfCallResults,
} from '../../src/utils/balance.utils'
import { MAX_HEX_STRING, MIN_HEX_STRING } from '../../src/utils/constants'

describe('Balance and Allowance Utils', () => {
  describe('getCoinBalanceInfo', () => {
    it('should return balance info for native currency', async () => {
      const result = await getCoinBalanceInfo({
        dexProvider: MockDexProvider,
        dexConfigsByDex: MockDexConfigsByDex,
        walletAddress: MockWalletAddress,
        format: {
          type: 'readable',
          options: {
            locales: 'en-US',
          },
        },
      })

      expect(result.token).toEqual(MockCoin)
      expect(result.balanceInfo.balance).toBeDefined()
      expect(
        result.allowanceInfoByDex[MockDexType]?.protocolV2?.[
          MockDexVersionTagV2
        ]?.allowance,
      ).toBeDefined()
    })
  })

  describe('prepareAllowanceAndBalanceOfCallContext', () => {
    it('should prepare call context correctly', () => {
      const contractContext = prepareAllowanceAndBalanceOfCallContext({
        dexProvider: MockDexProvider,
        walletAddress: MockWalletAddress,
        tokenContractAddress: MockWrapped.contractAddress,
        dexConfigBases: Object.values(MockDexConfigsByDex),
      })

      expect(contractContext[MockWrapped.contractAddress]?.calls).toBeDefined()
      expect(
        contractContext[MockWrapped.contractAddress]?.contractAddress,
      ).toEqual(MockWrapped.contractAddress)
    })
  })

  describe('processAllowanceAndBalanceOfCallResults', () => {
    it('should process allowance and balance results correctly', async () => {
      const referenceV2 = createMulticallReference({
        prefix: 'allowance',
        dexTag: MockDexType,
        protocol: 'protocolV2',
        versionTag: MockDexVersionTagV2,
      })
      const referenceV3 = createMulticallReference({
        prefix: 'allowance',
        dexTag: MockDexType,
        protocol: 'protocolV3',
        versionTag: MockDexVersionTagV3,
      })

      const contractCallResults = {
        contracts: {
          [MockWrapped.contractAddress]: {
            originContext: {
              contractAddress: MockWrapped.contractAddress,
              abi: MockWrapped.abi ?? [],
            },
            results: {
              name: {
                methodName: 'name',
                value: MockWrapped.name,
              },
              symbol: {
                methodName: 'symbol',
                value: MockWrapped.symbol,
              },
              decimals: {
                methodName: 'decimals',
                value: MockWrapped.decimals,
              },
              balanceOf: {
                methodName: 'balanceOf',
                value: parseUnits('1000', MockWrapped.decimals),
              },
              [referenceV2]: {
                methodName: 'allowance',
                value: EthersBigNumber.from(MAX_HEX_STRING),
              },
              [referenceV3]: {
                methodName: 'allowance',
                value: EthersBigNumber.from(MIN_HEX_STRING),
              },
            },
          },
        },
        blockNumber: 1,
      } as Partial<ContractResults<Erc20Types.Contract, any>>

      const result = processAllowanceAndBalanceOfCallResults({
        dexConfigsByDex: MockDexConfigsByDex,
        tokenContractAddress: MockWrapped.contractAddress,
        contractCallResults: contractCallResults as any,
        chainId: MockDexProvider.network.chainId,
        format: {
          type: 'hex',
        },
      })

      expect(result.balanceInfo.balance).toEqual(
        DexNumber.fromUnshifted('1000', 18).toHexString(),
      )
      expect(
        result.allowanceInfoByDex[MockDexType]?.protocolV2?.[
          MockDexVersionTagV2
        ]?.allowance,
      ).toEqual(MAX_HEX_STRING)
      expect(
        result.allowanceInfoByDex[MockDexType]?.protocolV3?.[
          MockDexVersionTagV3
        ]?.allowance,
      ).toEqual(MIN_HEX_STRING)
    })
  })
})
