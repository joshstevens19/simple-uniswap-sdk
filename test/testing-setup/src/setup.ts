/* eslint-disable no-await-in-loop */
import {
  erc20ABI,
  MAX_HEX_STRING,
  getChainConfig,
  getDexConfig,
} from '@dex-toolkit/utils'
import { providers, Wallet, Contract, BigNumber } from 'ethers'

import type { DexTestCase } from './mocks/mock.types'
import { activeTestCases, MockPk, MockWalletAddress } from './mocks/mocks'

/**
 * Before running the setup, make sure the wallet `0xAcAe34847aB1c58E61f7CAA8a5f7e755a08195b1` from the mocks.ts is funded with enough native coins for approving/disapproving allowances.
 *
 * Set the configs for setup in the mocks.ts file at the `activeTestCases` property.
 */

async function setupAllowancesForChain(testCase: DexTestCase) {
  const { chainId, dexType, tokens, versions } = testCase
  const chainConfig = getChainConfig(chainId)
  const dexConfig = getDexConfig({ dexType, chainId })

  if (!chainConfig?.nodes.public?.[0]?.url) {
    console.error(`No RPC URL found for chain ${chainId}`)
    return
  }

  if (!dexConfig) {
    console.error(`No DEX config found for ${dexType} on chain ${chainId}`)
    return
  }

  const provider = new providers.JsonRpcProvider(
    chainConfig.nodes.public[0].url,
    chainId,
  )
  const wallet = new Wallet(MockPk, provider)

  const balance = await wallet.getBalance()
  if (balance.lte(BigNumber.from('10000000000000000'))) {
    console.error(`Insufficient balance for chain ${chainId}`)
    return
  }

  console.log(`\nSetting up ${dexType} on chain ${chainId}`)
  console.log(`Native balance: ${balance.toString()}`)

  async function manageAllowance(
    tokenAddress: string,
    symbol: string,
    shouldHaveAllowance: boolean,
    routerAddress: string,
    version: string,
  ) {
    const token = new Contract(tokenAddress, erc20ABI, wallet)

    try {
      const currentAllowance: BigNumber = await token.allowance(
        MockWalletAddress,
        routerAddress,
      )

      if (shouldHaveAllowance && currentAllowance.eq(0)) {
        console.log(
          `Setting allowance for ${symbol} to ${version} router ${routerAddress}`,
        )
        const tx = await token.approve(routerAddress, MAX_HEX_STRING)
        await tx.wait()
        console.log(`✓ Allowance set for ${symbol} (${version})`)
      } else if (!shouldHaveAllowance && currentAllowance.gt(0)) {
        console.log(
          `Removing allowance for ${symbol} from ${version} router ${routerAddress}`,
        )
        const tx = await token.approve(routerAddress, 0)
        await tx.wait()
        console.log(`✓ Allowance removed for ${symbol} (${version})`)
      } else {
        console.log(
          `${symbol} allowance already ${shouldHaveAllowance ? 'set' : 'removed'} for ${version} router ${routerAddress}`,
        )
      }
    } catch (error) {
      console.error(
        `Error managing allowance for ${symbol} (${version}):`,
        error,
      )
    }
  }

  // Handle V2
  if (versions.v2 && dexConfig.protocols.protocolV2) {
    for (const [versionTag, config] of Object.entries(
      dexConfig.protocols.protocolV2,
    )) {
      if (config.router?.address) {
        const v2PrimaryToken =
          versions.v2.find((v) => v.versionTag === versionTag)?.tokenOverrides
            ?.primaryToken || tokens.primaryToken
        const v2NoAllowanceToken =
          versions.v2.find((v) => v.versionTag === versionTag)?.tokenOverrides
            ?.noAllowanceToken || tokens.noAllowanceToken

        await Promise.all([
          manageAllowance(
            v2PrimaryToken.contractAddress,
            v2PrimaryToken.symbol,
            true,
            config.router.address,
            `V2-${versionTag}`,
          ),
          manageAllowance(
            v2NoAllowanceToken.contractAddress,
            v2NoAllowanceToken.symbol,
            false,
            config.router.address,
            `V2-${versionTag}`,
          ),
        ])
      }
    }
  }

  // Handle V3
  if (versions.v3 && dexConfig.protocols.protocolV3) {
    for (const [versionTag, config] of Object.entries(
      dexConfig.protocols.protocolV3,
    )) {
      if (config.router?.address) {
        const v3PrimaryToken =
          versions.v3.find((v) => v.versionTag === versionTag)?.tokenOverrides
            ?.primaryToken || tokens.primaryToken
        const v3NoAllowanceToken =
          versions.v3.find((v) => v.versionTag === versionTag)?.tokenOverrides
            ?.noAllowanceToken || tokens.noAllowanceToken

        await Promise.all([
          manageAllowance(
            v3PrimaryToken.contractAddress,
            v3PrimaryToken.symbol,
            true,
            config.router.address,
            `V3-${versionTag}`,
          ),
          manageAllowance(
            v3NoAllowanceToken.contractAddress,
            v3NoAllowanceToken.symbol,
            false,
            config.router.address,
            `V3-${versionTag}`,
          ),
        ])
      }
    }
  }
}

async function setupAllChains() {
  console.log('Starting multi-chain setup...')

  for (const chainConfigs of Object.values(activeTestCases)) {
    for (const testCase of Object.values(chainConfigs)) {
      await setupAllowancesForChain(testCase)
    }
  }

  console.log('Multi-chain setup complete')
}

setupAllChains()
