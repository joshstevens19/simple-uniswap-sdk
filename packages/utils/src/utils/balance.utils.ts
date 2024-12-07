import { DexNumber, parseDecimals } from '@dex-toolkit/number'
import type {
  DexConfigsByDex,
  IDexProvider,
  AllowancesByDex,
  MultiDexTokenWithAllowanceInfo,
  Token,
  TradeFormat,
  DexConfigBase,
  Erc20Types,
  TokenCalls,
  VersionTag,
  DexTag,
  DexProtocol,
  TradeFormatOptions,
} from '@dex-toolkit/types'
import type {
  Address,
  ContractContext,
  MulticallResults,
} from '@multicall-toolkit/types'

import { getAbiForStandard } from './abi.utils'
import {
  getAddress,
  isAddress,
  transformWrappedAddressToCoinAddress,
} from './address.utils'
import { MAX_HEX_STRING } from './constants'
import { getChainConfig } from '../chains/chainConfigs'
import { DexError } from '../errors/dex-error'
import { ErrorCodes } from '../errors/error-codes'
import {
  prepareTokenCallContext,
  processTokenCallResults,
} from '../multicall/token-multicall.utils'

/**
 * Retrieves the balance information for the native coin of the current chain.
 * This method is used when the provided token contract address corresponds to the native coin rather than a token contract.
 *
 * @template TFormat - The format in which the balance and allowance values are returned.
 *
 * @param params - The parameters for retrieving the balance information.
 * @param params.dexProvider - The dex provider
 * @param params.dexConfigsByDex - The dexConfigsByDex object containing the contract details for each DEX type.
 * @param params.walletAddress - The address of the wallet to retrieve balance information for.
 * @param params.format - The format in which the balance and allowance values are returned.
 * @returns A promise that resolves to a MultiDexTokenWithAllowanceInfo object containing the balance and a fixed allowance value.
 * @throws If the native currency cannot be found for the provided chain ID.
 */
export async function getCoinBalanceInfo<TFormat extends TradeFormat>({
  dexProvider,
  dexConfigsByDex,
  walletAddress,
  format,
}: {
  dexProvider: IDexProvider
  dexConfigsByDex: DexConfigsByDex
  walletAddress: Address
  format: TradeFormatOptions<TFormat>
}): Promise<MultiDexTokenWithAllowanceInfo<TFormat>> {
  if (!dexProvider) {
    throw new DexError(
      'dexProvider is required',
      ErrorCodes.functionArgumentError,
    )
  }

  if (!dexConfigsByDex) {
    throw new DexError(
      'dexConfigsByDex is required',
      ErrorCodes.functionArgumentError,
    )
  }

  if (!isAddress(walletAddress)) {
    throw new DexError(
      'walletAddress is required',
      ErrorCodes.functionArgumentError,
    )
  }

  if (!format) {
    throw new DexError('format is required', ErrorCodes.functionArgumentError)
  }

  const customNetwork = dexProvider?.customNetwork
  const chainId = dexProvider.network.chainId
  const chainConfig = getChainConfig(chainId)

  let token: Token

  if (customNetwork?.nativeWrappedTokenInfo) {
    token = {
      ...customNetwork.nativeWrappedTokenInfo,
      contractAddress: transformWrappedAddressToCoinAddress(
        customNetwork.nativeWrappedTokenInfo.contractAddress,
      ),
    }
  } else {
    const { nativeCurrency } = chainConfig ?? {}

    if (!nativeCurrency) {
      throw new DexError(
        `No native currency for chainId ${chainId}`,
        ErrorCodes.canNotFindChainId,
      )
    }

    token = nativeCurrency
  }

  const balanceOf = await dexProvider.getCoinBalance({ walletAddress, format })
  const allowance = DexNumber.fromShifted(
    MAX_HEX_STRING,
    token.decimals,
  ).toTradeFormat(format)

  const allowanceInfoByDex = Object.entries(dexConfigsByDex).reduce(
    (acc, [dexType, dexConfig]) => {
      acc[dexType as DexTag] = { protocolV2: {}, protocolV3: {} }

      for (const [protocol, protocolConfig] of Object.entries(
        dexConfig.protocols,
      )) {
        for (const versionTag of Object.keys(protocolConfig)) {
          acc[dexType as DexTag]![protocol as DexProtocol][
            versionTag as VersionTag
          ] = { allowance, hasEnoughAllowance: true, isMaxAllowance: true }
        }
      }

      return acc
    },
    {} as AllowancesByDex<TFormat>,
  )

  return {
    allowanceInfoByDex,
    balanceInfo: {
      balance: balanceOf,
    },
    token,
  }
}

/**
 * Builds contract call contexts for querying token balances and allowances across multiple DEX versions.
 *
 * @template IncludeAllowance - Whether to include allowance calls. Defaults to true.
 *
 * @param params - The parameters for building the contract call contexts.
 * @param params.dexProvider - The dex provider
 * @param params.walletAddress - The address of the wallet to retrieve allowance and balance information for.
 * @param params.tokenContractAddress - The address of the token contract to query.
 * @param params.dexConfigBases - An array of `DexConfigBase` objects containing contract details for each DEX type.
 * @param params.includeAllowance - Whether to include allowance calls. Defaults to true.
 *
 * @returns A `ContractCallContext` object that includes the necessary calls for querying token details, balance, and allowances for the provided DEX types.
 * @throws If no token standard is found for the current chain ID, or if no ABI is available for the token standard.
 */
export function prepareAllowanceAndBalanceOfCallContext<
  IncludeAllowance extends boolean,
>({
  dexProvider,
  walletAddress,
  tokenContractAddress,
  dexConfigBases,
  includeAllowance = true as IncludeAllowance,
}: {
  dexProvider: IDexProvider
  walletAddress: Address
  tokenContractAddress: Address
  dexConfigBases: DexConfigBase[]
  includeAllowance?: IncludeAllowance
}): Record<
  string,
  ContractContext<Erc20Types.Contract, TokenCalls<true, IncludeAllowance>>
> {
  if (!dexProvider) {
    throw new DexError(
      'dexProvider is required',
      ErrorCodes.functionArgumentError,
    )
  }

  if (!isAddress(walletAddress)) {
    throw new DexError(
      'walletAddress is required',
      ErrorCodes.functionArgumentError,
    )
  }

  if (!isAddress(tokenContractAddress)) {
    throw new DexError(
      'tokenContractAddress is required',
      ErrorCodes.functionArgumentError,
    )
  }

  if (!dexConfigBases?.length) {
    throw new DexError(
      'dexConfigBases is required',
      ErrorCodes.functionArgumentError,
    )
  }

  const chainId = dexProvider.network.chainId
  const standard = getChainConfig(chainId)?.standards.token20.standard

  if (!standard) {
    throw new DexError(
      `No token standard for chainId ${chainId}`,
      ErrorCodes.chainIdNotSupported,
    )
  }

  const abi = getAbiForStandard(standard)

  if (!abi) {
    throw new DexError(
      `No ABI for standard ${standard}`,
      ErrorCodes.chainIdNotSupported,
    )
  }

  let calls: TokenCalls<true, IncludeAllowance> = prepareTokenCallContext({
    includes: ['symbol', 'decimals', 'name', 'balanceOf'],
    walletAddress,
  })

  if (includeAllowance) {
    for (const dexConfigBase of dexConfigBases) {
      const { dexTag, protocols } = dexConfigBase

      if (protocols.protocolV2) {
        for (const [versionTag, contractDetails] of Object.entries(
          protocols.protocolV2,
        )) {
          const routerAddress = contractDetails.router.address

          calls = {
            ...calls,
            ...prepareTokenCallContext({
              includes: ['allowance'],
              walletAddress,
              routerAddress,
              dexTag,
              protocol: 'protocolV2',
              versionTag: versionTag as VersionTag,
            }),
          }
        }
      }

      if (protocols.protocolV3) {
        for (const [versionTag, contractDetails] of Object.entries(
          protocols.protocolV3,
        )) {
          const routerAddress = contractDetails.router.address

          calls = {
            ...calls,
            ...prepareTokenCallContext({
              includes: ['allowance'],
              walletAddress,
              routerAddress,
              dexTag,
              protocol: 'protocolV3',
              versionTag: versionTag as VersionTag,
            }),
          }
        }
      }
    }
  }

  const callContext: ContractContext<Erc20Types.Contract, typeof calls> = {
    contractAddress: getAddress(tokenContractAddress),
    abi,
    calls,
  }

  return {
    [tokenContractAddress]: callContext,
  }
}

/**
 * Combines the allowance and balance results from both v2 and v3 contract calls into a single MultiDexTokenWithAllowanceInfo object. If data is missing for either v2 or v3, it assigns a default value of MIN_HEX_STRING.
 *
 * @template TFormat - The format in which the balance and allowance values are returned.
 *
 * @param params - The parameters for processing the allowance and balance call results.
 * @param params.dexConfigsByDex - The dexConfigsByDex object containing the contract details for each DEX type.
 * @param params.tokenContractAddress - The address of the token contract being queried.
 * @param params.contractCallResults - The combined results from the multicall.
 * @param params.chainId - The ID of the chain the contracts are deployed on.
 * @param params.format - The format in which the balance and allowance values are returned.
 * @returns A MultiDexTokenWithAllowanceInfo object combining v2 and v3 data.
 */
export function processAllowanceAndBalanceOfCallResults<
  TFormat extends TradeFormat,
>({
  dexConfigsByDex,
  tokenContractAddress,
  contractCallResults,
  chainId,
  format,
}: {
  dexConfigsByDex: DexConfigsByDex
  tokenContractAddress: Address
  contractCallResults: MulticallResults<
    Record<Address, ContractContext<Erc20Types.Contract, any>>
  >
  chainId: number
  format: TradeFormatOptions<TFormat>
}): MultiDexTokenWithAllowanceInfo<TFormat> {
  if (!dexConfigsByDex) {
    throw new DexError(
      'dexConfigsByDex is required',
      ErrorCodes.functionArgumentError,
    )
  }

  if (!isAddress(tokenContractAddress)) {
    throw new DexError(
      'tokenContractAddress is required',
      ErrorCodes.functionArgumentError,
    )
  }

  if (!contractCallResults) {
    throw new DexError(
      'contractCallResults is required',
      ErrorCodes.functionArgumentError,
    )
  }

  if (!chainId) {
    throw new DexError('chainId is required', ErrorCodes.functionArgumentError)
  }

  if (!format) {
    throw new DexError('format is required', ErrorCodes.functionArgumentError)
  }

  const chainConfig = getChainConfig(chainId)
  const standard = chainConfig?.standards.token20.standard

  if (!standard) {
    throw new DexError(
      `No token standard for chainId ${chainId}`,
      ErrorCodes.chainIdNotSupported,
    )
  }
  const contractResults = contractCallResults.contracts[tokenContractAddress]

  if (!contractResults) {
    throw new DexError(
      `No contract results for ${tokenContractAddress}`,
      ErrorCodes.internalError,
      {
        contractResults,
      },
    )
  }

  const { symbol, decimals, name, balanceOf, allowanceInfoByDex } =
    processTokenCallResults({
      contractResults,
      format,
    })

  if (!symbol || !decimals || !name || !balanceOf || !allowanceInfoByDex) {
    throw new DexError(
      `Failed getting token info for ${tokenContractAddress}`,
      ErrorCodes.internalError,
      {
        symbol,
        decimals,
        name,
        balanceOf,
      },
    )
  }

  const token = {
    chainId,
    contractAddress: tokenContractAddress,
    symbol,
    decimals: parseDecimals(decimals),
    name,
    standard,
  }

  return {
    allowanceInfoByDex,
    balanceInfo: {
      balance: balanceOf,
    },
    token,
  }
}
